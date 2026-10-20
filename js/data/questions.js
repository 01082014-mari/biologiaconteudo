import { CITOLOGY_QUESTIONS } from './questions-citology.js'
import { GENETICS_QUESTIONS } from './questions-genetics.js'
import { ECOLOGY_QUESTIONS } from './questions-ecology.js'
import { HUMAN_QUESTIONS } from './questions-human.js'
import { EXTRA_QUESTIONS } from './questions-extra.js'

/** Banco completo de questões do BioLab. */
export const QUESTIONS = [
  ...CITOLOGY_QUESTIONS,
  ...GENETICS_QUESTIONS,
  ...ECOLOGY_QUESTIONS,
  ...HUMAN_QUESTIONS,
  ...EXTRA_QUESTIONS,
]

export const QUESTION_BY_ID = QUESTIONS.reduce((acc, question) => {
  acc[question.id] = question
  return acc
}, {})

/** Questões de uma trilha. */
export function getQuestionsByTopic(topicId) {
  return QUESTIONS.filter((question) => question.topic === topicId)
}

/** Filtra o banco por assunto, dificuldade e tipo. */
export function filterQuestions({ topics = [], difficulty = 'todas', type = 'todas', search = '' } = {}) {
  const term = search.trim().toLowerCase()
  return QUESTIONS.filter((question) => {
    if (topics.length > 0 && !topics.includes(question.topic)) return false
    if (difficulty !== 'todas' && question.difficulty !== difficulty) return false
    if (type !== 'todas' && question.type !== type) return false
    if (term) {
      const haystack = `${question.prompt} ${question.tags.join(' ')}`.toLowerCase()
      if (!haystack.includes(term)) return false
    }
    return true
  })
}

/** Contagem de questões por trilha — usado nos filtros e na biblioteca. */
export const QUESTION_COUNT_BY_TOPIC = QUESTIONS.reduce((acc, question) => {
  acc[question.topic] = (acc[question.topic] ?? 0) + 1
  return acc
}, {})

export const DIFFICULTY_LABELS = {
  facil: 'Fácil',
  medio: 'Média',
  dificil: 'Difícil',
}

export const QUESTION_TYPE_LABELS = {
  'multipla-escolha': 'Múltipla escolha',
  'verdadeiro-falso': 'Verdadeiro ou falso',
  associacao: 'Associação',
}
