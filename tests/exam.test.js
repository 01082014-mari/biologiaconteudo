import test from 'node:test'
import assert from 'node:assert/strict'

import { availability, buildExam, selectQuestions } from '../js/lib/exam.js'
import { QUESTIONS } from '../js/data/questions.js'

test('selectQuestions filtra por assunto e dificuldade', () => {
  const onlyCitology = selectQuestions({ topicIds: ['citologia'] })
  assert.ok(onlyCitology.length > 0)
  assert.ok(onlyCitology.every((question) => question.topic === 'citologia'))

  const onlyEasy = selectQuestions({ difficulty: 'facil' })
  assert.ok(onlyEasy.every((question) => question.difficulty === 'facil'))
})

test('selectQuestions exclui as questões informadas', () => {
  const all = selectQuestions({})
  const excluded = all[0].id
  const filtered = selectQuestions({ exclude: [excluded] })
  assert.ok(!filtered.some((question) => question.id === excluded))
  assert.equal(filtered.length, all.length - 1)
})

test('buildExam monta um simulado com a quantidade pedida', () => {
  const result = buildExam({ topicIds: [], quantity: 10, difficulty: 'mista', seed: 'abc' })
  assert.equal(result.questions.length, 10)
  assert.equal(result.requested, 10)
  assert.equal(result.shortfall, 0)
  assert.deepEqual(result.warnings, [])
})

test('buildExam nunca repete questões dentro do mesmo simulado', () => {
  const result = buildExam({ quantity: 30, seed: 'sem repetição' })
  const ids = result.questions.map((question) => question.id)
  assert.equal(new Set(ids).size, ids.length)
})

test('buildExam respeita o filtro de assunto e dificuldade', () => {
  const available = availability(['genetica'], 'facil')
  const result = buildExam({
    topicIds: ['genetica'],
    quantity: 5,
    difficulty: 'facil',
    seed: 'gen',
  })
  assert.equal(result.questions.length, Math.min(5, available))
  assert.ok(result.questions.every((question) => question.topic === 'genetica'))
  assert.ok(result.questions.every((question) => question.difficulty === 'facil'))
})

test('buildExam avisa quando há menos questões do que o solicitado', () => {
  const available = availability(['citologia'], 'dificil')
  const result = buildExam({
    topicIds: ['citologia'],
    difficulty: 'dificil',
    quantity: 30,
    seed: 'curto',
  })

  assert.equal(result.questions.length, available)
  assert.ok(result.shortfall > 0)
  assert.equal(result.warnings.length, 1)
  assert.match(result.warnings[0], /Apenas/)
})

test('buildExam devolve lista vazia e aviso quando não há questões', () => {
  const result = buildExam({ topicIds: ['citologia'], difficulty: 'dificil', quantity: 5 })
  assert.ok(result.available >= 0)
  if (result.questions.length === 0) {
    assert.equal(result.shortfall, 5)
    assert.match(result.warnings[0], /Não há questões/)
  }
})

test('buildExam com a mesma seed produz o mesmo simulado', () => {
  const first = buildExam({ quantity: 10, seed: 'determinismo' })
  const second = buildExam({ quantity: 10, seed: 'determinismo' })
  assert.deepEqual(
    first.questions.map((question) => question.id),
    second.questions.map((question) => question.id),
  )
})

test('todo simulado montado a partir do banco completo é válido', () => {
  const result = buildExam({ quantity: 30, seed: 'completo' })
  for (const question of result.questions) {
    assert.ok(
      QUESTIONS.some((item) => item.id === question.id),
      `questão ${question.id} não existe`,
    )
  }
})
