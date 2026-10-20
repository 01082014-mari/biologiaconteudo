import type { Difficulty, QuestionId, TopicId } from './common'
import type { AnswerRecord } from './exercises'

/** Configuração escolhida pelo estudante para montar um simulado. */
export interface ExamConfig {
  topicIds: TopicId[]
  quantity: 5 | 10 | 20 | 30
  difficulty: Difficulty | 'mista'
  /** Cronômetro opcional em minutos. `null` desativa o limite de tempo. */
  timerMinutes: number | null
  /** embaralha a ordem das alternativas de cada questão. */
  shuffleOptions: boolean
}

/** Simulado em andamento (persistido para retomar). */
export interface ExamSession {
  id: string
  createdAt: string
  updatedAt: string
  config: ExamConfig
  questionIds: QuestionId[]
  answers: AnswerRecord[]
  currentIndex: number
  /** Timestamp (epoch ms) de início da prova. */
  startedAt: number
  /** Segundos já decorridos quando a sessão foi salva. */
  elapsedSeconds: number
  /** `true` quando o estudante explicitamente confirmou a finalização. */
  finished: boolean
}

/** Resultado final de um simulado. */
export interface ExamResult {
  id: string
  sessionId: string
  completedAt: string
  config: ExamConfig
  questionIds: QuestionId[]
  answers: AnswerRecord[]
  totalQuestions: number
  correctAnswers: number
  scorePercent: number
  elapsedSeconds: number
  /** Desempenho agregado por assunto. */
  byTopic: TopicPerformance[]
  /** XP concedido por esta conclusão. */
  xpEarned: number
}

/** Desempenho agregado em um assunto. */
export interface TopicPerformance {
  topicId: TopicId
  total: number
  correct: number
  percent: number
}
