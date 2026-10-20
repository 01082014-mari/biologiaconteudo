import test from 'node:test'
import assert from 'node:assert/strict'

import {
  LEVELS,
  XP_REWARDS,
  evaluateAchievement,
  examXp,
  hasXpFor,
  levelForXp,
  levelProgress,
  quizXp,
  totalXp,
} from '../js/lib/xp.js'

test('levelForXp devolve o nível correspondente ao XP acumulado', () => {
  assert.equal(levelForXp(0).level, 1)
  assert.equal(levelForXp(99).level, 1)
  assert.equal(levelForXp(100).level, 2)
  assert.equal(levelForXp(219).level, 2)
  assert.equal(levelForXp(220).level, 3)
  assert.equal(levelForXp(99999).level, LEVELS.at(-1).level)
})

test('levelForXp ignora valores negativos', () => {
  assert.equal(levelForXp(-50).level, 1)
})

test('levelProgress informa o progresso dentro do nível atual', () => {
  const info = levelProgress(0)
  assert.equal(info.current.level, 1)
  assert.equal(info.progress, 0)
  assert.ok(info.next)

  const half = levelProgress(60)
  assert.equal(half.progress, 0.6)

  const max = levelProgress(LEVELS.at(-1).xpRequired + 1000)
  assert.equal(max.progress, 1)
  assert.equal(max.next, null)
})

test('totalXp soma apenas a primeira ocorrência de cada referência', () => {
  const events = [
    { reference: 'a', amount: 40 },
    { reference: 'a', amount: 40 },
    { reference: 'b', amount: 15 },
  ]
  assert.equal(totalXp(events), 55)
})

test('hasXpFor detecta se a referência já foi creditada', () => {
  const events = [{ reference: 'lesson:cit-01', amount: 40 }]
  assert.equal(hasXpFor(events, 'lesson:cit-01'), true)
  assert.equal(hasXpFor(events, 'lesson:cit-02'), false)
  assert.equal(hasXpFor([], 'qualquer'), false)
})

test('examXp varia conforme o desempenho, dentro de limites seguros', () => {
  assert.ok(examXp(100) > examXp(50))
  assert.ok(examXp(50) > examXp(0))
  assert.ok(examXp(100) <= XP_REWARDS['simulado-concluido'] + 10)
  assert.ok(examXp(-10) > 0)
})

test('quizXp nunca retorna zero e cresce com a nota', () => {
  assert.ok(quizXp(0) > 0)
  assert.ok(quizXp(100) >= quizXp(20))
})

test('evaluateAchievement compara o progresso com o requisito', () => {
  const achievement = { metric: 'lessons-completed', value: 3 }
  assert.equal(evaluateAchievement(achievement, { lessonsCompleted: 3 }).unlocked, true)
  assert.equal(evaluateAchievement(achievement, { lessonsCompleted: 2 }).unlocked, false)
})

test('evaluateAchievement cobre todas as métricas usadas pelas conquistas', () => {
  const snapshot = {
    lessonsCompleted: 5,
    questionsAnswered: 120,
    examsCompleted: 2,
    flashcardsReviewed: 40,
    labsCompleted: 3,
    xpTotal: 600,
    streakDays: 7,
    topicsTouched: 5,
    correctAnswers: 80,
    perfectScores: 1,
    lessonsByTopic: { citologia: 4 },
  }

  const cases = [
    ['lessons-completed', 5],
    ['questions-answered', 120],
    ['exams-completed', 2],
    ['flashcards-reviewed', 40],
    ['labs-completed', 3],
    ['xp-total', 600],
    ['streak-days', 7],
    ['topics-touched', 5],
    ['correct-answers', 80],
    ['perfect-score', 1],
  ]

  for (const [metric, value] of cases) {
    const result = evaluateAchievement({ metric, value: 1 }, snapshot)
    assert.equal(result.current, value, `métrica ${metric}`)
    assert.equal(result.unlocked, true)
  }

  const topicResult = evaluateAchievement(
    { metric: 'topic-lessons', value: 4, topic: 'citologia' },
    snapshot,
  )
  assert.equal(topicResult.current, 4)
  assert.equal(topicResult.unlocked, true)
})

test('evaluateAchievement devolve zero para métricas desconhecidas', () => {
  const result = evaluateAchievement({ metric: 'inexistente', value: 1 }, {})
  assert.equal(result.current, 0)
  assert.equal(result.unlocked, false)
})
