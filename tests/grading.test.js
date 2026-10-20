import test from 'node:test'
import assert from 'node:assert/strict'

import {
  calculateScore,
  feedbackMessage,
  isAnswerCorrect,
  parseAssociation,
  performanceByTopic,
  prepareQuestion,
  scoreToGrade,
  serializeAssociation,
} from '../js/lib/grading.js'
import { QUESTIONS, QUESTION_BY_ID } from '../js/data/questions.js'

test('isAnswerCorrect aceita a alternativa correta de múltipla escolha', () => {
  const question = QUESTION_BY_ID['q-cit-01']
  assert.equal(isAnswerCorrect(question, question.correct), true)
  const wrong = question.options.find((option) => option.id !== question.correct).id
  assert.equal(isAnswerCorrect(question, wrong), false)
})

test('isAnswerCorrect rejeita resposta vazia ou ausente', () => {
  const question = QUESTION_BY_ID['q-cit-01']
  assert.equal(isAnswerCorrect(question, ''), false)
  assert.equal(isAnswerCorrect(question, null), false)
  assert.equal(isAnswerCorrect(question, undefined), false)
  assert.equal(isAnswerCorrect(null, 'a'), false)
})

test('questões de verdadeiro ou falso usam o gabarito declarado', () => {
  const questions = QUESTIONS.filter((question) => question.type === 'verdadeiro-falso')
  assert.ok(questions.length > 0)
  for (const question of questions) {
    assert.ok(['v', 'f'].includes(question.correct), `${question.id} tem gabarito inesperado`)
    assert.equal(isAnswerCorrect(question, question.correct), true)
    const other = question.correct === 'v' ? 'f' : 'v'
    assert.equal(isAnswerCorrect(question, other), false)
  }
})

test('associação: serialização e parsing preservam o mapeamento', () => {
  const mapping = { p1: 0, p2: 2, p3: 1 }
  const serialized = serializeAssociation(mapping)
  assert.deepEqual(parseAssociation(serialized), mapping)
})

test('associação: só é correta quando todos os pares estão certos', () => {
  const question = QUESTIONS.find((item) => item.type === 'associacao')
  assert.ok(question, 'o banco precisa ter questões de associação')

  const correctMapping = {}
  question.pairs.forEach((pair) => {
    const index = question.options.findIndex((option) => option.text === pair.right)
    correctMapping[pair.id] = index
  })

  assert.equal(isAnswerCorrect(question, serializeAssociation(correctMapping)), true)

  const firstPair = question.pairs[0]
  const wrongMapping = { ...correctMapping }
  wrongMapping[firstPair.id] = (correctMapping[firstPair.id] + 1) % question.options.length
  assert.equal(isAnswerCorrect(question, serializeAssociation(wrongMapping)), false)
})

test('associação: mapeamento incompleto é considerado incorreto', () => {
  const question = QUESTIONS.find((item) => item.type === 'associacao')
  assert.equal(isAnswerCorrect(question, serializeAssociation({})), false)
  assert.equal(isAnswerCorrect(question, ''), false)
})

test('calculateScore devolve a porcentagem correta de acertos', () => {
  const answers = [
    { questionId: 'a', correct: true },
    { questionId: 'b', correct: true },
    { questionId: 'c', correct: false },
    { questionId: 'd', correct: true },
  ]
  assert.equal(calculateScore(answers, 4), 75)
  assert.equal(calculateScore([], 0), 0)
  assert.equal(calculateScore([], 10), 0)
  assert.equal(calculateScore([{ correct: true }], 1), 100)
})

test('calculateScore arredonda para uma casa decimal', () => {
  const answers = [{ correct: true }, { correct: false }, { correct: true }]
  assert.equal(calculateScore(answers, 3), 66.7)
})

test('performanceByTopic agrupa acertos por assunto', () => {
  const answers = [
    { questionId: 'q-cit-01', correct: true },
    { questionId: 'q-cit-02', correct: false },
    { questionId: 'q-gen-01', correct: true },
  ]
  const result = performanceByTopic(answers, QUESTIONS)
  const citologia = result.find((item) => item.topic === 'citologia')
  const genetica = result.find((item) => item.topic === 'genetica')

  assert.equal(citologia.total, 2)
  assert.equal(citologia.correct, 1)
  assert.equal(citologia.percent, 50)
  assert.equal(genetica.percent, 100)
  assert.ok(result[0].percent <= result[result.length - 1].percent, 'ordenação crescente por desempenho')
})

test('prepareQuestion mantém o gabarito após embaralhar as alternativas', () => {
  const question = QUESTION_BY_ID['q-cit-01']
  let seed = 0
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  const prepared = prepareQuestion(question, { shuffleOptions: true, random })
  const correctOption = question.options.find((option) => option.id === question.correct)
  const newCorrect = prepared.options.find((option) => option.id === prepared.correct)

  assert.equal(newCorrect.text, correctOption.text)
  assert.equal(isAnswerCorrect(prepared, prepared.correct), true)
})

test('prepareQuestion sem embaralhamento mantém tudo intacto', () => {
  const question = QUESTION_BY_ID['q-cit-01']
  const prepared = prepareQuestion(question, { shuffleOptions: false })
  assert.equal(prepared.correct, question.correct)
  assert.equal(prepared.options.length, question.options.length)
})

test('scoreToGrade converte a porcentagem em nota de 0 a 10', () => {
  assert.equal(scoreToGrade(100), 10)
  assert.equal(scoreToGrade(50), 5)
  assert.equal(scoreToGrade(0), 0)
})

test('feedbackMessage muda conforme o desempenho', () => {
  assert.match(feedbackMessage(95), /Excelente/)
  assert.match(feedbackMessage(75), /Muito bom/)
  assert.match(feedbackMessage(55), /Bom começo/)
  assert.match(feedbackMessage(0), /leitura da aula/i)
})
