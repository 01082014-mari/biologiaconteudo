/**
 * Agregação do progresso do estudante.
 *
 * Constrói o retrato (`snapshot`) usado pelo dashboard, pela página de
 * progresso, pelo sistema de conquistas e pelas recomendações.
 */

import { ALL_LESSONS } from '../data/lessons.js'
import { QUESTIONS } from '../data/questions.js'
import { dateKey } from './utils.js'
import { levelForXp, totalXp } from './xp.js'

/** Calcula a sequência de dias estudados com base no histórico de atividades. */
export function computeStreak(activity, today = new Date()) {
  const dates = new Set(
    (activity ?? []).map((entry) => (entry.createdAt ?? '').slice(0, 10)).filter(Boolean),
  )

  const todayKey = dateKey(today)
  let current = 0
  const cursor = new Date(today)

  // Se hoje ainda não houve atividade, a sequência conta a partir de ontem.
  if (!dates.has(todayKey)) {
    cursor.setDate(cursor.getDate() - 1)
  }

  while (dates.has(dateKey(cursor))) {
    current += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  const sorted = Array.from(dates).sort()
  let longest = 0
  let run = 0
  let previous = null

  for (const day of sorted) {
    if (previous) {
      const diff = (new Date(day) - new Date(previous)) / 86400000
      run = diff === 1 ? run + 1 : 1
    } else {
      run = 1
    }
    longest = Math.max(longest, run)
    previous = day
  }

  return { current, longest, days: sorted, lastStudyDate: sorted[sorted.length - 1] ?? null }
}

/** Monta o retrato completo de progresso a partir do estado persistido. */
export function buildSnapshot(state) {
  const lessonProgress = state?.lessonProgress ?? {}
  const attempts = state?.attempts ?? []
  const exams = state?.exams ?? []
  const activity = state?.activity ?? []
  const xpEvents = state?.xpEvents ?? []
  const flashcardReviews = state?.flashcardReviews ?? []

  const lessonsCompleted = Object.values(lessonProgress).filter((item) => item.completed).length
  const lessonsStarted = Object.values(lessonProgress).filter((item) => item.startedAt).length

  const questionsAnswered = attempts.reduce((sum, attempt) => sum + (attempt.totalQuestions ?? 0), 0)
  const correctAnswers = attempts.reduce((sum, attempt) => sum + (attempt.correctAnswers ?? 0), 0)
  const accuracyPercent = questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0

  const lessonsByTopic = {}
  for (const lesson of ALL_LESSONS) {
    const progress = lessonProgress[lesson.id]
    if (progress?.completed) {
      lessonsByTopic[lesson.topicId] = (lessonsByTopic[lesson.topicId] ?? 0) + 1
    }
  }

  const topicsTouched = Object.keys(lessonsByTopic).length
  const xp = totalXp(xpEvents)
  const level = levelForXp(xp)
  const streak = computeStreak(activity)
  const perfectScores = exams.filter((exam) => exam.scorePercent >= 100).length

  const topicStats = buildTopicStats(attempts)

  const totalStudySeconds =
    activity.reduce((sum, entry) => sum + (entry.studySeconds ?? 0), 0) +
    attempts.reduce((sum, attempt) => sum + (attempt.elapsedSeconds ?? 0), 0)

  return {
    lessonsCompleted,
    lessonsStarted,
    questionsAnswered,
    correctAnswers,
    accuracyPercent,
    examsCompleted: exams.length,
    flashcardsReviewed: flashcardReviews.length,
    labsCompleted: Object.keys(state?.labsCompleted ?? {}).length,
    xpTotal: xp,
    level: level.level,
    levelTitle: level.title,
    streakDays: streak.current,
    streakLongest: streak.longest,
    streak,
    totalStudySeconds,
    topicsTouched,
    perfectScores,
    lessonsByTopic,
    topicStats,
    attempts,
    exams,
    activity,
  }
}

/** Estatísticas de acerto por assunto, a partir das tentativas. */
export function buildTopicStats(attempts) {
  const buckets = new Map()

  for (const attempt of attempts ?? []) {
    const answers = attempt.answers ?? []
    for (const answer of answers) {
      const question = QUESTIONS.find((item) => item.id === answer.questionId)
      if (!question) continue
      const bucket = buckets.get(question.topic) ?? { topic: question.topic, total: 0, correct: 0 }
      bucket.total += 1
      if (answer.correct) bucket.correct += 1
      buckets.set(question.topic, bucket)
    }
  }

  return Array.from(buckets.values())
    .map((bucket) => ({
      ...bucket,
      percent: bucket.total > 0 ? (bucket.correct / bucket.total) * 100 : 0,
    }))
    .sort((a, b) => b.percent - a.percent)
}

/**
 * Gera recomendações personalizadas com base em regras sobre os dados locais.
 * Não depende de nenhuma API externa.
 */
export function buildRecommendations(snapshot, state) {
  const recommendations = []

  const weakTopics = (snapshot.topicStats ?? [])
    .filter((stat) => stat.total >= 3 && stat.percent < 70)
    .sort((a, b) => a.percent - b.percent)

  for (const topic of weakTopics.slice(0, 3)) {
    const lesson = ALL_LESSONS.find((item) => item.topicId === topic.topic)
    recommendations.push({
      type: 'reforco',
      title: `Reforce ${topic.topic}`,
      description: `Seu aproveitamento neste assunto é de ${Math.round(topic.percent)}%. Revise a aula "${lesson?.title ?? 'do assunto'}" e refaça as questões.`,
      action: { label: 'Abrir aula', href: `#/aula/${lesson?.id ?? ''}` },
      weight: 100 - topic.percent,
    })
  }

  const pending = Object.values(state?.flashcardSchedules ?? {}).filter(
    (schedule) => schedule.dueAt <= Date.now(),
  )
  if (pending.length > 0) {
    recommendations.push({
      type: 'revisao',
      title: `${pending.length} flashcards aguardam revisão`,
      description: 'Manter a rotina de revisão espaçada evita o esquecimento do conteúdo já estudado.',
      action: { label: 'Revisar agora', href: '#/flashcards' },
      weight: 60 + Math.min(pending.length, 20),
    })
  }

  const nextLesson = ALL_LESSONS.find((lesson) => !state?.lessonProgress?.[lesson.id]?.completed)
  if (nextLesson) {
    recommendations.push({
      type: 'estudo',
      title: 'Continue sua jornada',
      description: `A próxima aula é "${nextLesson.title}" (${nextLesson.estimatedMinutes} min).`,
      action: { label: 'Estudar agora', href: `#/aula/${nextLesson.id}` },
      weight: 50,
    })
  }

  const strongTopics = (snapshot.topicStats ?? []).filter((stat) => stat.total >= 5 && stat.percent >= 85)
  if (strongTopics.length > 0) {
    const topic = strongTopics[0]
    const lesson = ALL_LESSONS.find((item) => item.topicId === topic.topic)
    recommendations.push({
      type: 'avanco',
      title: 'Você já domina este tema',
      description: `Seu aproveitamento em ${topic.topic} é de ${Math.round(topic.percent)}%. Avance para o simulado e teste seus conhecimentos.`,
      action: { label: 'Montar simulado', href: '#/simulados' },
      weight: 40,
    })
  }

  if (snapshot.examsCompleted === 0 && snapshot.questionsAnswered > 0) {
    recommendations.push({
      type: 'simulado',
      title: 'Agora experimente um simulado',
      description: 'Você já respondeu questões avulsas. Monte um simulado cronometrado para consolidar o conteúdo.',
      action: { label: 'Criar simulado', href: '#/simulados' },
      weight: 55,
    })
  }

  return recommendations.sort((a, b) => b.weight - a.weight)
}

/** Progresso (0 a 1) de cada trilha, para a biblioteca. */
export function topicProgress(topicId, state) {
  const lessons = ALL_LESSONS.filter((lesson) => lesson.topicId === topicId)
  if (lessons.length === 0) return { total: 0, completed: 0, percent: 0 }
  const completed = lessons.filter(
    (lesson) => state?.lessonProgress?.[lesson.id]?.completed,
  ).length
  return {
    total: lessons.length,
    completed,
    percent: Math.round((completed / lessons.length) * 100),
  }
}
