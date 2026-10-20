import type { FlashcardId, TopicId } from './common'

/** Avaliação dada pelo estudante a um flashcard revisado. */
export type FlashcardRating = 'errei' | 'dificil' | 'bom' | 'fácil'

/** Um cartão de memorização. */
export interface Flashcard {
  id: FlashcardId
  topicId: TopicId
  front: string
  back: string
  /** Complemento opcional exibido abaixo da resposta. */
  hint?: string
  tags: string[]
}

/** Estado de um cartão dentro do algoritmo de repetição espaçada. */
export interface FlashcardSchedule {
  id: string
  flashcardId: FlashcardId
  /** Fator de ease (SM-2 simplificado). */
  ease: number
  /** Intervalo atual, em dias. */
  intervalDays: number
  /** Quantidade de revisões realizadas. */
  repetitions: number
  /** Epoch ms da próxima revisão. */
  dueAt: number
  /** Epoch ms da última revisão. */
  lastReviewedAt: number | null
  /** Contagem de erros acumulados. */
  lapses: number
  /** Estado de domínio para o algoritmo. */
  state: 'nova' | 'revisando' | 'dominada'
}

/** Registro imutável de uma revisão de flashcard. */
export interface FlashcardReview {
  id: string
  flashcardId: FlashcardId
  topicId: TopicId
  rating: FlashcardRating
  reviewedAt: string
  /** Intervalo resultante, em dias. */
  nextIntervalDays: number
  /** Epoch ms da próxima revisão agendada. */
  dueAt: number
}
