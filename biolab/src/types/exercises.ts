import type { Difficulty, QuestionId, QuestionType, TopicId } from './common'

/** Uma alternativa de resposta. */
export interface QuestionOption {
  id: string
  label: string
  text: string
  /** Usado em `verdadeiro-falso` (associado à alternativa correta). */
  correct?: boolean
}

/** Par correto/associado — usado em perguntas de associação. */
export interface AssociationPair {
  id: string
  left: string
  right: string
}

/** Questão do banco de exercícios. */
export interface Question {
  id: QuestionId
  topicId: TopicId
  type: QuestionType
  difficulty: Difficulty
  prompt: string
  options: QuestionOption[]
  /** Id da alternativa correta (multipla-escolha / verdadeiro-falso). */
  correctOptionId: string
  /** Pares usados em perguntas de associação. */
  pairs?: AssociationPair[]
  /** Explicação exibida após a resposta. */
  explanation: string
  /** Dica exibida antes de responder (opcional). */
  hint?: string
  /** Ids de aulas relacionadas para revisão quando o aluno erra. */
  relatedLessonIds: string[]
  tags: string[]
}

/** Resposta dada a uma questão. */
export interface AnswerRecord {
  questionId: QuestionId
  selectedOptionId: string
  correct: boolean
  answeredAt: string
  /** Tempo gasto na questão, em segundos. */
  elapsedSeconds?: number
}

/** Tentativa registrada na Central de Exercícios. */
export interface Attempt {
  id: string
  createdAt: string
  topicIds: TopicId[]
  difficulty: Difficulty | 'mista'
  questionIds: QuestionId[]
  answers: AnswerRecord[]
  totalQuestions: number
  correctAnswers: number
  scorePercent: number
  elapsedSeconds: number
  /** Origem da tentativa (exercícios livres ou simulado). */
  source: 'exercicios' | 'simulado' | 'quiz-aula'
}
