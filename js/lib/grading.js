/**
 * Correção de questões e cálculo de notas.
 *
 * Três tipos de questão são suportados:
 *
 *  - `multipla-escolha`: uma alternativa correta (`correct` guarda o id);
 *  - `verdadeiro-falso`: idem, com alternativas "Verdadeiro" e "Falso";
 *  - `associacao`: o estudante informa, para cada par, o índice da coluna
 *    direita escolhida. A resposta é serializada como `p1=2;p2=0;p3=1`.
 */

import { shuffle } from './utils.js'

/** Serializa o pareamento de uma questão de associação. */
export function serializeAssociation(mapping) {
  return Object.entries(mapping)
    .map(([pairId, optionIndex]) => `${pairId}=${optionIndex}`)
    .join(';')
}

/** Converte a resposta serializada de volta para um objeto. */
export function parseAssociation(answer) {
  if (!answer) return {}
  const mapping = {}
  for (const part of String(answer).split(';')) {
    if (!part) continue
    const [pairId, value] = part.split('=')
    const index = Number(value)
    if (pairId && Number.isFinite(index)) mapping[pairId] = index
  }
  return mapping
}

/**
 * Verifica se a resposta enviada está correta.
 *
 * @param {object} question questão do banco
 * @param {string} answer alternativa escolhida ou associação serializada
 */
export function isAnswerCorrect(question, answer) {
  if (!question || answer === null || answer === undefined || answer === '') return false

  if (question.type === 'associacao') {
    const mapping = parseAssociation(answer)
    if (!question.pairs || question.pairs.length === 0) return false
    return question.pairs.every((pair) => {
      const chosen = mapping[pair.id]
      if (chosen === undefined) return false
      const option = question.options[chosen]
      return Boolean(option) && option.text === pair.right
    })
  }

  return answer === question.correct
}

/**
 * Embaralha as alternativas de uma questão, mantendo o gabarito coerente.
 * A coluna de alternativas da associação também é embaralhada.
 */
export function shuffleQuestionOptions(question, random = Math.random) {
  if (question.type === 'associacao') {
    const options = shuffle(question.options, random)
    return { ...question, options }
  }
  const options = shuffle(question.options, random)
  return { ...question, options, correct: question.correct }
}

/**
 * Prepara a versão embaralhada de uma questão, ajustando o gabarito
 * quando as alternativas mudam de lugar.
 */
export function prepareQuestion(question, { shuffleOptions = false, random = Math.random } = {}) {
  if (!shuffleOptions || question.type === 'associacao') {
    if (question.type === 'associacao' && shuffleOptions) {
      return { ...question, options: shuffle(question.options, random) }
    }
    return { ...question, options: [...question.options] }
  }

  const options = shuffle(question.options, random)
  const correctOption = question.options.find((option) => option.id === question.correct)
  const newCorrectId = correctOption ? options.find((option) => option.text === correctOption.text)?.id : question.correct
  return { ...question, options, correct: newCorrectId }
}

/** Calcula a nota percentual de um conjunto de respostas. */
export function calculateScore(answers, totalQuestions) {
  if (!totalQuestions || totalQuestions <= 0) return 0
  const correct = answers.filter((answer) => answer.correct).length
  return Math.round((correct / totalQuestions) * 1000) / 10
}

/** Agrupa o desempenho por assunto. */
export function performanceByTopic(answers, questions) {
  const buckets = new Map()

  for (const answer of answers) {
    const question = questions.find((item) => item.id === answer.questionId)
    if (!question) continue
    const current = buckets.get(question.topic) ?? { topic: question.topic, total: 0, correct: 0 }
    current.total += 1
    if (answer.correct) current.correct += 1
    buckets.set(question.topic, current)
  }

  return Array.from(buckets.values())
    .map((bucket) => ({
      topic: bucket.topic,
      total: bucket.total,
      correct: bucket.correct,
      percent: bucket.total > 0 ? Math.round((bucket.correct / bucket.total) * 1000) / 10 : 0,
    }))
    .sort((a, b) => a.percent - b.percent)
}

/** Converte um resultado bruto em uma nota de 0 a 10. */
export function scoreToGrade(scorePercent) {
  return Math.round((scorePercent / 100) * 10 * 10) / 10
}

/** Mensagem de Encouragement conforme o desempenho. */
export function feedbackMessage(scorePercent) {
  if (scorePercent >= 90) return 'Excelente! Você dominou o conteúdo.'
  if (scorePercent >= 70) return 'Muito bom! Você está no caminho certo.'
  if (scorePercent >= 50) return 'Bom começo. Revise os pontos que errou.'
  if (scorePercent > 0) return 'Vale revisar a aula e tentar de novo.'
  return 'Não se preocupe: comece pela leitura da aula e tente novamente.'
}
