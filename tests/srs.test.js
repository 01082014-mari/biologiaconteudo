import test from 'node:test'
import assert from 'node:assert/strict'

import {
  createSchedule,
  getDueCards,
  getNewCards,
  scheduleCard,
  summarizeDeck,
} from '../js/lib/srs.js'

const MINUTE = 60 * 1000
const DAY = 24 * 60 * MINUTE
const NOW = 1_700_000_000_000

test('createSchedule devolve um cartão novo', () => {
  const schedule = createSchedule('f-1')
  assert.equal(schedule.state, 'nova')
  assert.equal(schedule.repetitions, 0)
  assert.equal(schedule.intervalDays, 0)
  assert.equal(schedule.ease, 2.5)
})

test('avaliação "bom" agenda a próxima revisão em um dia na primeira vez', () => {
  const schedule = scheduleCard(createSchedule('f-1'), 'bom', NOW)
  assert.equal(schedule.intervalDays, 1)
  assert.equal(schedule.dueAt, NOW + DAY)
  assert.equal(schedule.repetitions, 1)
  assert.equal(schedule.lastReviewedAt, NOW)
})

test('avaliação "bom" multiplica o intervalo pelo fator de facilidade', () => {
  let schedule = scheduleCard(createSchedule('f-1'), 'bom', NOW)
  schedule = scheduleCard(schedule, 'bom', NOW)
  assert.equal(schedule.repetitions, 2)
  assert.ok(schedule.intervalDays > 1, 'o intervalo deve crescer')
  assert.ok(schedule.dueAt > NOW)
})

test('avaliação "fácil" amplia o intervalo e o fator de facilidade', () => {
  let schedule = scheduleCard(createSchedule('f-1'), 'facil', NOW)
  const firstInterval = schedule.intervalDays
  schedule = scheduleCard(schedule, 'facil', NOW)
  assert.ok(schedule.intervalDays > firstInterval)
  assert.ok(schedule.ease > 2.5)
})

test('avaliação "difícil" encurta o intervalo e reduz a facilidade', () => {
  let schedule = scheduleCard(createSchedule('f-1'), 'bom', NOW)
  schedule = scheduleCard(schedule, 'bom', NOW)
  const longInterval = schedule.intervalDays
  schedule = scheduleCard(schedule, 'dificil', NOW)
  assert.ok(schedule.intervalDays < longInterval, 'o intervalo deve encurtar')
  assert.ok(schedule.ease < 2.6)
})

test('avaliação "errei" reinicia o ciclo e agenda em dez minutos', () => {
  let schedule = scheduleCard(createSchedule('f-1'), 'bom', NOW)
  schedule = scheduleCard(schedule, 'errei', NOW)
  assert.equal(schedule.repetitions, 0)
  assert.equal(schedule.intervalDays, 0)
  assert.equal(schedule.lapses, 1)
  assert.equal(schedule.dueAt, NOW + 10 * MINUTE)
  assert.equal(schedule.state, 'revisando')
})

test('a facilidade nunca cai abaixo de 1,3 nem sobe acima de 3,2', () => {
  let schedule = createSchedule('f-1')
  for (let i = 0; i < 10; i += 1) schedule = scheduleCard(schedule, 'errei', NOW)
  assert.ok(schedule.ease >= 1.3)

  for (let i = 0; i < 20; i += 1) schedule = scheduleCard(schedule, 'facil', NOW)
  assert.ok(schedule.ease <= 3.2)
})

test('cartão dominado mantém o estado após várias revisões corretas', () => {
  let schedule = createSchedule('f-1')
  for (let i = 0; i < 5; i += 1) schedule = scheduleCard(schedule, 'bom', NOW)
  assert.equal(schedule.state, 'dominada')
})

test('getDueCards lista apenas os cartões vencidos', () => {
  const schedules = {
    a: { ...createSchedule('a'), dueAt: NOW - 1000 },
    b: { ...createSchedule('b'), dueAt: NOW + 10 * DAY },
    c: { ...createSchedule('c'), dueAt: NOW - 5000 },
  }
  const due = getDueCards(schedules, NOW)
  assert.equal(due.length, 2)
  assert.deepEqual(due.map((item) => item.flashcardId), ['c', 'a'])
})

test('getNewCards separa os cartões ainda não revisados', () => {
  const schedules = {
    a: createSchedule('a'),
    b: { ...createSchedule('b'), state: 'revisando', dueAt: NOW + 1000 },
  }
  assert.equal(getNewCards(schedules).length, 1)
})

test('summarizeDeck resume a situação do baralho', () => {
  const schedules = {
    a: { ...createSchedule('a'), dueAt: NOW - 1 },
    b: { ...createSchedule('b'), state: 'dominada', dueAt: NOW + DAY },
    c: { ...createSchedule('c'), state: 'revisando', dueAt: NOW + DAY },
  }
  const summary = summarizeDeck(schedules, NOW)
  assert.equal(summary.total, 3)
  assert.equal(summary.due, 1)
  assert.equal(summary.mastered, 1)
  assert.equal(summary.reviewing, 1)
  assert.equal(summary.new, 1)
})
