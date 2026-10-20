/**
 * Geração de simulados personalizados.
 *
 * O montador permite escolher assuntos, quantidade de questões, dificuldade e
 * cronômetro. O gerador garante que nunca haja questões repetidas dentro do
 * mesmo simulado e informa quantas questões estão disponíveis quando o pedido
 * não pode ser atendido na íntegra.
 */

import { QUESTIONS } from '../data/questions.js'
import { sample, shuffleWithSeed } from './utils.js'

/** Filtra o banco conforme a configuração escolhida. */
export function selectQuestions({ topicIds = [], difficulty = 'mista', exclude = [] } = {}) {
  const excluded = new Set(exclude)

  return QUESTIONS.filter((question) => {
    if (excluded.has(question.id)) return false
    if (topicIds.length > 0 && !topicIds.includes(question.topic)) return false
    if (difficulty !== 'mista' && question.difficulty !== difficulty) return false
    return true
  })
}

/**
 * Monta um simulado.
 *
 * @returns {{
 *   questions: object[],
 *   requested: number,
 *   available: number,
 *   shortfall: number,
 *   warnings: string[]
 * }}
 */
export function buildExam({ topicIds = [], quantity = 10, difficulty = 'mista', seed = '' } = {}) {
  const pool = selectQuestions({ topicIds, difficulty })

  if (pool.length === 0) {
    return {
      questions: [],
      requested: quantity,
      available: 0,
      shortfall: quantity,
      warnings: ['Não há questões disponíveis para a combinação selecionada.'],
    }
  }

  const available = pool.length
  const count = Math.min(quantity, available)
  const chosen = sample(pool, count, seededRandom(seed))
  const ordered = seed ? shuffleWithSeed(chosen, `${seed}:order`) : chosen

  const warnings = []
  if (count < quantity) {
    warnings.push(
      `Apenas ${available} questão${available === 1 ? '' : 'ões'} disponível${available === 1 ? '' : 'is'} para esta combinação. O simulado foi montado com ${count}.`,
    )
  }

  return { questions: ordered, requested: quantity, available, shortfall: quantity - count, warnings }
}

/** Gera um aleatoriedade determinística quando há seed; caso contrário, usa `Math.random`. */
function seededRandom(seed) {
  if (!seed) return Math.random
  // `sample` usa a mesma função aleatória; com seed, os resultados são estáveis.
  return seededRandomImpl(seed)
}

function seededRandomImpl(seed) {
  let state = hash(seed)
  return function random() {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash(seed) {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/** Quantidade de questões disponíveis para cada combinação de filtros. */
export function availability(topicIds = [], difficulty = 'mista') {
  return selectQuestions({ topicIds, difficulty }).length
}
