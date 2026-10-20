/**
 * Ações de negócio do BioLab.
 *
 * Todas as mutações de estado passam por aqui, o que concentra as regras de
 * XP, conquistas, metas diárias e sequências em um único lugar — e garante
 * que o XP nunca seja creditado duas vezes para a mesma referência.
 */

import { ACHIEVEMENTS } from '../data/achievements.js'
import { ALL_LESSONS } from '../data/lessons.js'
import { QUESTIONS } from '../data/questions.js'
import { getState, updateState } from './store.js'
import { buildSnapshot, computeStreak } from './progress.js'
import {
  XP_REWARDS,
  evaluateAchievement,
  examXp,
  levelForXp,
  quizXp,
  totalXp,
} from './xp.js'
import { createId, dateKey } from './utils.js'

/** Concede XP uma única vez por referência. Devolve o XP efetivamente-added. */
export function awardXp(draft, { reason, amount, reference, description }) {
  const events = draft.xpEvents ?? []
  if (events.some((event) => event.reference === reference)) return 0

  const event = {
    id: createId('xp'),
    reason,
    amount,
    reference,
    description,
    createdAt: new Date().toISOString(),
  }
  draft.xpEvents = [...events, event]
  registerDailyGoal(draft, amount)
  return amount
}

/** Registra a atividade do dia na meta diária. */
function registerDailyGoal(draft, amount) {
  const key = dateKey()
  const goalXp = draft.settings?.dailyGoalXp ?? 50
  const current = draft.dailyGoals?.[key] ?? { xpEarned: 0, goalXp, completed: false }
  const xpEarned = (current.xpEarned ?? 0) + amount
  const completed = xpEarned >= (current.goalXp ?? goalXp)

  draft.dailyGoals = {
    ...(draft.dailyGoals ?? {}),
    [key]: { xpEarned, goalXp: current.goalXp ?? goalXp, completed },
  }

  if (completed && !current.completed) {
    awardXp(draft, {
      reason: 'meta-diaria',
      amount: XP_REWARDS['meta-diaria'],
      reference: `meta:${key}`,
      description: 'Meta diária de estudos atingida!',
    })
  }
}

/** Registra uma entrada no histórico de atividades. */
export function logActivity(draft, { type, description, topicId = null, xp = 0, reference, studySeconds = 0 }) {
  draft.activity = [
    ...(draft.activity ?? []),
    {
      id: createId('act'),
      createdAt: new Date().toISOString(),
      type,
      description,
      topicId,
      xp,
      reference,
      studySeconds,
    },
  ]
}

/** Atualiza a sequência de dias estudados. */
export function refreshStreak(draft) {
  const streak = computeStreak(draft.activity ?? [])
  draft.streak = {
    current: streak.current,
    longest: Math.max(streak.longest, draft.streak?.longest ?? 0),
    lastStudyDate: streak.lastStudyDate,
    days: streak.days,
  }
}

/**
 * Verifica as conquistas e desbloqueia as que atingiram o requisito.
 * Devolve a lista de conquistas recém-desbloqueadas.
 */
export function checkAchievements(draft) {
  const snapshot = buildSnapshot(draft)
  const unlocked = draft.achievements ?? {}
  const newlyUnlocked = []

  for (const achievement of ACHIEVEMENTS) {
    const result = evaluateAchievement(achievement, snapshot)
    if (!result.unlocked) continue
    if (unlocked[achievement.id]) continue

    unlocked[achievement.id] = new Date().toISOString()
    newlyUnlocked.push(achievement)
    awardXp(draft, {
      reason: 'aula-concluida',
      amount: achievement.xpReward,
      reference: `achievement:${achievement.id}`,
      description: `Conquista desbloqueada: ${achievement.title}`,
    })
    logActivity(draft, {
      type: 'conquista-desbloqueada',
      description: `Conquista desbloqueada: ${achievement.title}`,
      topicId: null,
      xp: achievement.xpReward,
      reference: `achievement-activity:${achievement.id}`,
    })
  }

  draft.achievements = unlocked
  return newlyUnlocked
}

/** Marca o início do estudo de uma aula. */
export function startLesson(lessonId) {
  return updateState((draft) => {
    const lesson = ALL_LESSONS.find((item) => item.id === lessonId)
    if (!lesson) return draft
    const current = draft.lessonProgress[lessonId] ?? {
      lessonId,
      topicId: lesson.topicId,
      completed: false,
      readPercent: 0,
      startedAt: null,
      completedAt: null,
      quizzesTaken: 0,
      bestScore: null,
    }
    if (!current.startedAt) {
      current.startedAt = new Date().toISOString()
      logActivity(draft, {
        type: 'aula-iniciada',
        description: `Início da aula "${lesson.title}"`,
        topicId: lesson.topicId,
        reference: `lesson-start:${lessonId}`,
      })
    }
    draft.lessonProgress = { ...draft.lessonProgress, [lessonId]: current }
    return draft
  })
}

/** Atualiza o percentual de leitura de uma aula. */
export function updateLessonProgress(lessonId, readPercent) {
  return updateState((draft) => {
    const current = draft.lessonProgress[lessonId]
    if (!current) return draft
    const value = Math.max(current.readPercent ?? 0, Math.min(100, Math.round(readPercent)))
    draft.lessonProgress = {
      ...draft.lessonProgress,
      [lessonId]: { ...current, readPercent: value },
    }
    return draft
  })
}

/** Conclui uma aula, concedendo XP uma única vez. */
export function completeLesson(lessonId) {
  return updateState((draft) => {
    const lesson = ALL_LESSONS.find((item) => item.id === lessonId)
    if (!lesson) return draft

    const current = draft.lessonProgress[lessonId] ?? {
      lessonId,
      topicId: lesson.topicId,
      completed: false,
      readPercent: 0,
      startedAt: new Date().toISOString(),
      completedAt: null,
      quizzesTaken: 0,
      bestScore: null,
    }

    if (!current.completed) {
      current.completed = true
      current.readPercent = 100
      current.completedAt = new Date().toISOString()
      const gained = awardXp(draft, {
        reason: 'aula-concluida',
        amount: XP_REWARDS['aula-concluida'],
        reference: `lesson:${lessonId}`,
        description: `Aula concluída: ${lesson.title}`,
      })
      logActivity(draft, {
        type: 'aula-concluida',
        description: `Concluiu a aula "${lesson.title}"`,
        topicId: lesson.topicId,
        xp: gained,
        reference: `lesson-activity:${lessonId}`,
        studySeconds: lesson.estimatedMinutes * 60,
      })
    }

    draft.lessonProgress = { ...draft.lessonProgress, [lessonId]: current }
    checkAchievements(draft)
    refreshStreak(draft)
    return draft
  })
}

/** Registra o resultado de um quiz de aula. */
export function completeLessonQuiz(lessonId, scorePercent) {
  return updateState((draft) => {
    const lesson = ALL_LESSONS.find((item) => item.id === lessonId)
    if (!lesson) return draft

    const current = draft.lessonProgress[lessonId] ?? {
      lessonId,
      topicId: lesson.topicId,
      completed: false,
      readPercent: 0,
      startedAt: new Date().toISOString(),
      completedAt: null,
      quizzesTaken: 0,
      bestScore: null,
    }

    current.quizzesTaken = (current.quizzesTaken ?? 0) + 1
    current.bestScore = Math.max(current.bestScore ?? 0, scorePercent)

    const gained = awardXp(draft, {
      reason: 'quiz-aula',
      amount: quizXp(scorePercent),
      reference: `quiz:${lessonId}:${current.quizzesTaken}`,
      description: `Quiz da aula "${lesson.title}": ${scorePercent}%`,
    })

    logActivity(draft, {
      type: 'quiz-aula',
      description: `Quiz de "${lesson.title}" — ${scorePercent}%`,
      topicId: lesson.topicId,
      xp: gained,
      reference: `quiz-activity:${lessonId}:${current.quizzesTaken}`,
    })

    draft.lessonProgress = { ...draft.lessonProgress, [lessonId]: current }
    checkAchievements(draft)
    refreshStreak(draft)
    return draft
  })
}

/**
 * Registra uma tentativa de exercícios (livre ou de simulado).
 * O XP é creditado por questão respondida, uma única vez por questão.
 */
export function recordAttempt({
  source = 'exercicios',
  questionIds = [],
  answers = [],
  elapsedSeconds = 0,
  difficulty = 'mista',
  topicIds = [],
  examId = null,
  xpPerQuestion = true,
} = {}) {
  return updateState((draft) => {
    const totalQuestions = answers.length
    const correctAnswers = answers.filter((answer) => answer.correct).length
    const scorePercent =
      totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 1000) / 10 : 0

    const attempt = {
      id: examId ?? createId('att'),
      createdAt: new Date().toISOString(),
      source,
      topicIds,
      difficulty,
      questionIds,
      answers,
      totalQuestions,
      correctAnswers,
      scorePercent,
      elapsedSeconds,
    }

    draft.attempts = [...(draft.attempts ?? []), attempt]

    if (xpPerQuestion) {
      for (const answer of answers) {
        awardXp(draft, {
          reason: 'exercicio-respondido',
          amount: XP_REWARDS['exercicio-respondido'],
          reference: `answer:${answer.questionId}`,
          description: 'Questão respondida',
        })
      }
    }

    if (source === 'simulado') {
      const gained = awardXp(draft, {
        reason: 'simulado-concluido',
        amount: examXp(scorePercent),
        reference: `exam:${attempt.id}`,
        description: `Simulado concluído — ${scorePercent}%`,
      })
      attempt.xpEarned = gained
      draft.exams = [
        ...(draft.exams ?? []),
        {
          ...attempt,
          completedAt: attempt.createdAt,
          byTopic: buildTopicBreakdown(answers),
        },
      ]
      logActivity(draft, {
        type: 'simulado-concluido',
        description: `Simulado concluído — ${scorePercent}% (${correctAnswers}/${totalQuestions})`,
        topicId: null,
        xp: gained,
        reference: `exam-activity:${attempt.id}`,
        studySeconds: elapsedSeconds,
      })
    } else {
      logActivity(draft, {
        type: 'exercicio-respondido',
        description: `Rodada de exercícios — ${scorePercent}% (${correctAnswers}/${totalQuestions})`,
        topicId: topicIds[0] ?? null,
        xp: 0,
        reference: `attempt-activity:${attempt.id}`,
        studySeconds: elapsedSeconds,
      })
    }

    checkAchievements(draft)
    refreshStreak(draft)
    return draft
  })
}

/** Agrupa o desempenho por assunto a partir das respostas. */
export function buildTopicBreakdown(answers) {
  const buckets = new Map()
  for (const answer of answers) {
    const question = QUESTIONS.find((item) => item.id === answer.questionId)
    if (!question) continue
    const bucket = buckets.get(question.topic) ?? { topic: question.topic, total: 0, correct: 0 }
    bucket.total += 1
    if (answer.correct) bucket.correct += 1
    buckets.set(question.topic, bucket)
  }
  return Array.from(buckets.values()).map((bucket) => ({
    ...bucket,
    percent: bucket.total > 0 ? Math.round((bucket.correct / bucket.total) * 1000) / 10 : 0,
  }))
}

/** Registra a revisão de um flashcard e atualiza o agendamento. */
export function reviewFlashcard(flashcardId, topicId, rating, schedule) {
  return updateState((draft) => {
    const event = {
      id: createId('rev'),
      flashcardId,
      topicId,
      rating,
      reviewedAt: new Date().toISOString(),
      nextIntervalDays: schedule.intervalDays,
      dueAt: schedule.dueAt,
    }
    draft.flashcardReviews = [...(draft.flashcardReviews ?? []), event]
    draft.flashcardSchedules = { ...draft.flashcardSchedules, [flashcardId]: schedule }

    const gained = awardXp(draft, {
      reason: 'flashcard-revisado',
      amount: XP_REWARDS['flashcard-revisado'],
      reference: `flashcard:${flashcardId}:${event.reviewedAt}`,
      description: 'Flashcard revisado',
    })

    logActivity(draft, {
      type: 'flashcard-revisado',
      description: 'Revisou um flashcard',
      topicId,
      xp: gained,
      reference: `flashcard-activity:${flashcardId}:${event.reviewedAt}`,
    })

    checkAchievements(draft)
    refreshStreak(draft)
    return draft
  })
}

/** Marca um experimento do laboratório virtual como concluído. */
export function completeLab(labId, description) {
  return updateState((draft) => {
    if (draft.labsCompleted?.[labId]) return draft
    draft.labsCompleted = {
      ...(draft.labsCompleted ?? {}),
      [labId]: new Date().toISOString(),
    }
    const gained = awardXp(draft, {
      reason: 'laboratorio-concluido',
      amount: XP_REWARDS['laboratorio-concluido'],
      reference: `lab:${labId}`,
      description,
    })
    logActivity(draft, {
      type: 'laboratorio-concluido',
      description,
      topicId: null,
      xp: gained,
      reference: `lab-activity:${labId}`,
    })
    checkAchievements(draft)
    refreshStreak(draft)
    return draft
  })
}

/** Atualiza as preferências do estudante. */
export function updateSettings(patch) {
  return updateState((draft) => {
    draft.settings = { ...draft.settings, ...patch, updatedAt: new Date().toISOString() }
    return draft
  })
}

/** Resumo rápido do estudante, usado no rodapé da sidebar. */
export function studentSummary() {
  const state = getState()
  const snapshot = buildSnapshot(state)
  const level = levelForXp(totalXp(state.xpEvents))
  return { ...snapshot, level: level.level, levelTitle: level.title }
}
