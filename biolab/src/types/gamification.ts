import type { TopicId } from './common'

/** Tipos de evento que podem gerar XP. */
export type XpReason =
  | 'aula-concluida'
  | 'quiz-aula'
  | 'exercicio-respondido'
  | 'simulado-concluido'
  | 'flashcard-revisado'
  | 'laboratorio-concluido'
  | 'meta-diaria'

/** Registro de XP concedido. */
export interface XpEvent {
  id: string
  reason: XpReason
  amount: number
  createdAt: string
  /** Referência única que impede duplicidade de crédito (ex.: `aula:citologia-1`). */
  reference: string
  description: string
}

/** Definição de uma conquista (medalha). */
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  /** Condição avaliada sobre o snapshot de progresso. */
  requirement: AchievementRequirement
  /** XP extra concedido ao desbloquear. */
  xpReward: number
  /** Sequência (tipo, em que ordem aparecem). */
  tier: 'bronze' | 'prata' | 'ouro' | 'diamante'
}

/** Critério de desbloqueio de uma conquista. */
export interface AchievementRequirement {
  metric:
    | 'lessons-completed'
    | 'questions-answered'
    | 'exams-completed'
    | 'flashcards-reviewed'
    | 'labs-completed'
    | 'xp-total'
    | 'streak-days'
    | 'perfect-score'
    | 'topics-touched'
    | 'correct-answers'
  value: number
}

/** Progresso do estudante para uma conquista. */
export interface AchievementProgress {
  achievementId: string
  unlocked: boolean
  current: number
  target: number
  unlockedAt: string | null
}

/** Information about one level on the XP ladder. */
export interface LevelInfo {
  level: number
  /** XP required to reach this level. */
  xpRequired: number
  /** Title shown in the interface. */
  title: string
}

/** Daily study goal configuration and progress. */
export interface DailyGoal {
  /** Target XP per day. */
  xpTarget: number
  /** Goal date in `YYYY-MM-DD` format. */
  date: string
  /** XP accumulated on that date. */
  xpEarned: number
  /** Whether the goal was reached. */
  completed: boolean
}

/** Achievements grouped by topic, used in recommendations. */
export interface TopicStat {
  topicId: TopicId
  total: number
  correct: number
  percent: number
  attempts: number
}
