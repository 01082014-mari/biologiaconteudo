/**
 * Sistema de XP, níveis e conquistas.
 *
 * O XP é creditado uma única vez por referência: cada evento tem uma
 * `reference` estável (por exemplo `aula:cit-01` ou `simulado:<id>`), o que
 * impede que recarregar a página ou reabrir um resultado conceda XP de novo.
 */

/** Tabela de níveis: XP acumulado necessário para cada nível. */
export const LEVELS = [
  { level: 1, xpRequired: 0, title: 'Iniciante' },
  { level: 2, xpRequired: 100, title: 'Aprendiz' },
  { level: 3, xpRequired: 220, title: 'Curioso' },
  { level: 4, xpRequired: 380, title: 'Estudante' },
  { level: 5, xpRequired: 580, title: 'Explorador' },
  { level: 6, xpRequired: 820, title: 'Pesquisador' },
  { level: 7, xpRequired: 1100, title: 'Naturalista' },
  { level: 8, xpRequired: 1420, title: 'Especialista' },
  { level: 9, xpRequired: 1780, title: 'Mestre' },
  { level: 10, xpRequired: 2200, title: 'Cientista' },
  { level: 11, xpRequired: 2700, title: 'Professor' },
  { level: 12, xpRequired: 3300, title: 'Guardião do Conhecimento' },
]

/** XP concedido por cada tipo de atividade. */
export const XP_REWARDS = {
  'aula-concluida': 40,
  'quiz-aula': 15,
  'exercicio-respondido': 4,
  'simulado-concluido': 60,
  'flashcard-revisado': 3,
  'laboratorio-concluido': 25,
  'meta-diaria': 25,
}

/** XP proporcional ao desempenho de um simulado. */
export function examXp(scorePercent) {
  const base = XP_REWARDS['simulado-concluido']
  const factor = Math.max(0.3, Math.min(1, scorePercent / 100))
  return Math.round(base * factor) + 10
}

/** XP proporcional ao desempenho de um quiz de aula. */
export function quizXp(scorePercent) {
  const base = XP_REWARDS['quiz-aula']
  const factor = Math.max(0.3, Math.min(1, scorePercent / 100))
  return Math.round(base * factor)
}

/** Calcula o nível correspondente a um total de XP. */
export function levelForXp(xpTotal) {
  const xp = Math.max(0, xpTotal ?? 0)
  let current = LEVELS[0]
  for (const level of LEVELS) {
    if (xp >= level.xpRequired) current = level
    else break
  }
  return current
}

/** Calcula o progresso (0 a 1) dentro do nível atual. */
export function levelProgress(xpTotal) {
  const xp = Math.max(0, xpTotal ?? 0)
  const current = levelForXp(xp)
  const next = LEVELS.find((level) => level.level === current.level + 1)
  if (!next) return { current, next: null, progress: 1, xpIntoLevel: xp - current.xpRequired, xpForNext: 0 }
  const span = next.xpRequired - current.xpRequired
  const into = xp - current.xpRequired
  return {
    current,
    next,
    progress: Math.min(1, span > 0 ? into / span : 1),
    xpIntoLevel: into,
    xpForNext: next.xpRequired - xp,
  }
}

/** Soma de XP já creditado para uma referência específica. */
export function hasXpFor(events, reference) {
  return (events ?? []).some((event) => event.reference === reference)
}

/**
 * Calcula o XP total a partir do histórico de eventos, ignorando
 * referências duplicadas (a primeira ocorrência é a que vale).
 */
export function totalXp(events) {
  const seen = new Set()
  let total = 0
  for (const event of events ?? []) {
    if (seen.has(event.reference)) continue
    seen.add(event.reference)
    total += event.amount ?? 0
  }
  return total
}

/**
 * Avalia o estado de uma conquista frente ao retrato de progresso.
 * Devolve `{ current, target, unlocked }`.
 */
export function evaluateAchievement(achievement, snapshot) {
  const target = achievement.value ?? 1
  let current = 0

  switch (achievement.metric) {
    case 'lessons-completed':
      current = snapshot.lessonsCompleted
      break
    case 'questions-answered':
      current = snapshot.questionsAnswered
      break
    case 'correct-answers':
      current = snapshot.correctAnswers
      break
    case 'exams-completed':
      current = snapshot.examsCompleted
      break
    case 'flashcards-reviewed':
      current = snapshot.flashcardsReviewed
      break
    case 'labs-completed':
      current = snapshot.labsCompleted
      break
    case 'xp-total':
      current = snapshot.xpTotal
      break
    case 'streak-days':
      current = snapshot.streakDays
      break
    case 'topics-touched':
      current = snapshot.topicsTouched
      break
    case 'perfect-score':
      current = snapshot.perfectScores
      break
    case 'topic-lessons':
      current = snapshot.lessonsByTopic?.[achievement.topic] ?? 0
      break
    default:
      current = 0
  }

  return { current, target, unlocked: current >= target }
}
