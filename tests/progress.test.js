import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildRecommendations,
  buildSnapshot,
  buildTopicStats,
  computeStreak,
  topicProgress,
} from '../js/lib/progress.js'
import { createInitialState } from '../js/lib/store.js'

/** Estado de exemplo com duas tentativas. */
function sampleState() {
  const state = createInitialState()
  state.lessonProgress = {
    'cit-01': { lessonId: 'cit-01', topicId: 'citologia', completed: true, readPercent: 100, startedAt: '2026-01-01' },
    'cit-02': { lessonId: 'cit-02', topicId: 'citologia', completed: false, readPercent: 40, startedAt: '2026-01-02' },
    'gen-01': { lessonId: 'gen-01', topicId: 'genetica', completed: true, readPercent: 100, startedAt: '2026-01-03' },
  }
  state.attempts = [
    {
      id: 'a1',
      createdAt: new Date().toISOString(),
      source: 'exercicios',
      answers: [
        { questionId: 'q-cit-01', correct: true, answeredAt: '' },
        { questionId: 'q-cit-02', correct: false, answeredAt: '' },
        { questionId: 'q-cit-03', correct: true, answeredAt: '' },
      ],
      totalQuestions: 3,
      correctAnswers: 2,
      scorePercent: 66.7,
      elapsedSeconds: 60,
    },
  ]
  state.exams = [
    {
      id: 'e1',
      completedAt: new Date().toISOString(),
      answers: [{ questionId: 'q-gen-01', correct: true, answeredAt: '' }],
      totalQuestions: 1,
      correctAnswers: 1,
      scorePercent: 100,
      elapsedSeconds: 30,
    },
  ]
  state.xpEvents = [{ id: 'x1', reference: 'lesson:cit-01', amount: 40, createdAt: '' }]
  state.activity = [
    { id: 'act1', createdAt: new Date().toISOString(), type: 'aula-concluida', description: '', xp: 40, studySeconds: 600 },
  ]
  state.flashcardReviews = [{ id: 'r1', flashcardId: 'f-cit-01', rating: 'bom', reviewedAt: '' }]
  state.labsCompleted = { 'celula-animal': new Date().toISOString() }
  return state
}

test('computeStreak conta os dias consecutivos de atividade', () => {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const activity = [
    { createdAt: today.toISOString() },
    { createdAt: yesterday.toISOString() },
  ]
  const streak = computeStreak(activity, today)
  assert.equal(streak.current, 2)
})

test('computeStreak zera quando o último estudo foi há mais de um dia', () => {
  const today = new Date()
  const old = new Date(today)
  old.setDate(old.getDate() - 3)
  const streak = computeStreak([{ createdAt: old.toISOString() }], today)
  assert.equal(streak.current, 0)
  assert.equal(streak.longest, 1)
})

test('computeStreak encontra a maior sequência do histórico', () => {
  const today = new Date()
  const activity = [0, 1, 2, 5, 6].map((offset) => {
    const date = new Date(today)
    date.setDate(date.getDate() - offset)
    return { createdAt: date.toISOString() }
  })
  const streak = computeStreak(activity, today)
  assert.equal(streak.longest, 3)
})

test('buildSnapshot resume o progresso do estudante', () => {
  const snapshot = buildSnapshot(sampleState())
  assert.equal(snapshot.lessonsCompleted, 2)
  assert.equal(snapshot.lessonsStarted, 3)
  assert.equal(snapshot.questionsAnswered, 3)
  assert.equal(snapshot.correctAnswers, 2)
  assert.equal(snapshot.examsCompleted, 1)
  assert.equal(snapshot.flashcardsReviewed, 1)
  assert.equal(snapshot.labsCompleted, 1)
  assert.equal(snapshot.xpTotal, 40)
  assert.equal(snapshot.level, 1)
  assert.equal(snapshot.topicsTouched, 2)
})

test('buildSnapshot calcula a precisão global', () => {
  const snapshot = buildSnapshot(sampleState())
  assert.ok(Math.abs(snapshot.accuracyPercent - 66.67) < 0.1)
})

test('buildTopicStats agrupa o desempenho por assunto', () => {
  const stats = buildTopicStats(sampleState().attempts)
  const citologia = stats.find((item) => item.topic === 'citologia')
  assert.equal(citologia.total, 3)
  assert.equal(citologia.correct, 2)
  assert.ok(Math.abs(citologia.percent - 66.67) < 0.1)
})

test('topicProgress informa o avanço de uma trilha', () => {
  const progress = topicProgress('citologia', sampleState())
  assert.equal(progress.total, 4)
  assert.equal(progress.completed, 1)
  assert.equal(progress.percent, 25)
})

test('buildRecommendations sugere reforçar os assuntos mais fracos', () => {
  const state = sampleState()
  state.attempts = [
    {
      id: 'a2',
      createdAt: new Date().toISOString(),
      answers: [
        { questionId: 'q-cit-04', correct: false, answeredAt: '' },
        { questionId: 'q-cit-05', correct: false, answeredAt: '' },
        { questionId: 'q-cit-06', correct: false, answeredAt: '' },
      ],
      totalQuestions: 3,
      correctAnswers: 0,
      scorePercent: 0,
      elapsedSeconds: 30,
    },
  ]
  const snapshot = buildSnapshot(state)
  const recommendations = buildRecommendations(snapshot, state)
  assert.ok(recommendations.length > 0)
  assert.ok(recommendations.some((item) => item.type === 'reforco'))
})

test('buildRecommendations não duplica a sugestão de continuar estudando', () => {
  const state = sampleState()
  const snapshot = buildSnapshot(state)
  const recommendations = buildRecommendations(snapshot, state)
  const studySuggestions = recommendations.filter((item) => item.type === 'estudo')
  assert.ok(studySuggestions.length <= 1)
})

test('buildRecommendations funciona com um estado vazio', () => {
  const state = createInitialState()
  const snapshot = buildSnapshot(state)
  const recommendations = buildRecommendations(snapshot, state)
  assert.ok(Array.isArray(recommendations))
  assert.ok(recommendations.length > 0)
})
