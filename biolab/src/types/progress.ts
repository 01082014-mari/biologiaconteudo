import type { Difficulty, TopicId } from './common'

/** Progresso do estudante em uma aula. */
export interface LessonProgress {
  /** Id da aula (chave primária). */
  lessonId: string
  topicId: TopicId
  completed: boolean
  /** Progresso de leitura em porcentagem (0–100). */
  readPercent: number
  startedAt: string | null
  completedAt: string | null
  /** Quantidade de quizzes de aula concluídos. */
  quizzesTaken: number
  /** Melhor nota obtida no quiz da aula. */
  bestScore: number | null
}

/** Entrada do histórico de atividades. */
export interface ActivityLogEntry {
  id: string
  createdAt: string
  type:
    | 'aula-iniciada'
    | 'aula-concluida'
    | 'quiz-aula'
    | 'exercicio-respondido'
    | 'simulado-concluido'
    | 'flashcard-revisado'
    | 'laboratorio-concluido'
    | 'conquista-desbloqueada'
    | 'meta-diaria-atingida'
  description: string
  topicId: TopicId | null
  /** XP ganho na atividade. */
  xp: number
  /** Referência única da atividade (evita duplicidade de XP). */
  reference: string
}

/** Preferências do estudante. */
export interface Settings {
  id: 'settings'
  theme: 'claro' | 'escuro' | 'sistema'
  /** Meta diária de XP. */
  dailyGoalXp: number
  /** Tamanho da fonte relativa — `normal` ou `grande`. */
  fontScale: 'normal' | 'grande'
  /** Reduzir animações além da preferência do sistema. */
  reduceMotion: boolean
  /** Mostrar o cronômetro por padrão nos simulados. */
  timerEnabledByDefault: boolean
  /** Quantidade de questões sugerida no início da Central de Exercícios. */
  questionsPerRound: number
  updatedAt: string
}

/** Snapshot agregado do progresso — usado por dashboards e regras. */
export interface ProgressSnapshot {
  lessonsCompleted: number
  lessonsStarted: number
  questionsAnswered: number
  correctAnswers: number
  accuracyPercent: number
  examsCompleted: number
  flashcardsReviewed: number
  labsCompleted: number
  xpTotal: number
  level: number
  streakDays: number
  totalStudySeconds: number
  topicStats: TopicStatLite[]
}

/** Estatísticas resumidas de um assunto. */
export interface TopicStatLite {
  topicId: TopicId
  total: number
  correct: number
  percent: number
  difficulty: Difficulty | 'mista'
}
