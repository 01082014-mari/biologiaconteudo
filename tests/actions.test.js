import test from 'node:test'
import assert from 'node:assert/strict'

/** Armazenamento local simulado. */
function createMemoryStorage() {
  const data = new Map()
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
    clear: () => data.clear(),
  }
}

globalThis.window = { localStorage: createMemoryStorage() }

const {
  completeLab,
  completeLesson,
  completeLessonQuiz,
  recordAttempt,
  reviewFlashcard,
  startLesson,
  updateSettings,
} = await import('../js/lib/actions.js')
const { getState, resetState } = await import('../js/lib/store.js')
const { createSchedule, scheduleCard } = await import('../js/lib/srs.js')
const { totalXp, levelForXp } = await import('../js/lib/xp.js')

test('startLesson registra o início do estudo uma única vez', () => {
  resetState()
  startLesson('cit-01')
  startLesson('cit-01')
  const progress = getState().lessonProgress['cit-01']
  assert.ok(progress.startedAt)
  assert.equal(
    getState().activity.filter((entry) => entry.type === 'aula-iniciada').length,
    1,
    'a atividade de início não pode ser duplicada',
  )
})

test('completeLesson concede XP uma única vez por aula', () => {
  resetState()
  completeLesson('cit-01')
  const xpAfterFirst = totalXp(getState().xpEvents)
  assert.ok(xpAfterFirst > 0)

  completeLesson('cit-01')
  completeLesson('cit-01')
  assert.equal(totalXp(getState().xpEvents), xpAfterFirst, 'o XP não pode ser creditado de novo')
  assert.equal(getState().lessonProgress['cit-01'].completed, true)
})

test('completeLesson registra a conclusão no histórico', () => {
  resetState()
  completeLesson('cit-02')
  const entries = getState().activity.filter((entry) => entry.type === 'aula-concluida')
  assert.equal(entries.length, 1)
  assert.match(entries[0].description, /citologia|A célula|Membrana/i)
})

test('concluir aulas suficientes desbloqueia conquistas', () => {
  resetState()
  for (const lessonId of ['cit-01', 'cit-02', 'cit-03', 'cit-04']) {
    completeLesson(lessonId)
  }
  assert.ok(getState().achievements['primeira-aula'], 'a conquista Primeira Aula deve ser liberada')
  assert.ok(getState().achievements['explorador-de-celulas'], 'Explorador de Células deve ser liberada')
})

test('completeLessonQuiz registra a melhor nota e credita XP do quiz', () => {
  resetState()
  completeLessonQuiz('cit-01', 80)
  completeLessonQuiz('cit-01', 40)
  const progress = getState().lessonProgress['cit-01']
  assert.equal(progress.quizzesTaken, 2)
  assert.equal(progress.bestScore, 80)
  assert.equal(totalXp(getState().xpEvents) > 0, true)
})

test('recordAttempt guarda a tentativa com nota e respostas', () => {
  resetState()
  recordAttempt({
    source: 'exercicios',
    questionIds: ['q-cit-01', 'q-cit-02'],
    answers: [
      { questionId: 'q-cit-01', selectedOptionId: 'b', correct: true, answeredAt: '' },
      { questionId: 'q-cit-02', selectedOptionId: 'a', correct: false, answeredAt: '' },
    ],
    elapsedSeconds: 42,
    difficulty: 'mista',
  })

  const attempts = getState().attempts
  assert.equal(attempts.length, 1)
  assert.equal(attempts[0].correctAnswers, 1)
  assert.equal(attempts[0].totalQuestions, 2)
  assert.equal(attempts[0].scorePercent, 50)
  assert.equal(attempts[0].elapsedSeconds, 42)
})

test('o XP por questão é creditado uma única vez, mesmo repetindo a questão', () => {
  resetState()
  const answer = { questionId: 'q-cit-01', selectedOptionId: 'b', correct: true, answeredAt: '' }
  recordAttempt({ source: 'exercicios', answers: [answer] })
  const xpAfterFirst = totalXp(getState().xpEvents)
  recordAttempt({ source: 'exercicios', answers: [answer] })
  assert.equal(totalXp(getState().xpEvents), xpAfterFirst)
})

test('recordAttempt de simulado guarda o resultado na lista de simulados', () => {
  resetState()
  recordAttempt({
    source: 'simulado',
    examId: 'exam_1',
    questionIds: ['q-cit-01'],
    answers: [{ questionId: 'q-cit-01', selectedOptionId: 'b', correct: true, answeredAt: '' }],
    elapsedSeconds: 30,
    difficulty: 'mista',
  })

  assert.equal(getState().exams.length, 1)
  assert.equal(getState().exams[0].id, 'exam_1')
  assert.ok(getState().exams[0].xpEarned > 0)
  assert.ok(Array.isArray(getState().exams[0].byTopic))
})

test('reabrir um resultado de simulado não credita XP de novo', () => {
  resetState()
  const register = () =>
    recordAttempt({
      source: 'simulado',
      examId: 'exam_1',
      answers: [{ questionId: 'q-cit-01', selectedOptionId: 'b', correct: true, answeredAt: '' }],
      elapsedSeconds: 30,
    })

  register()
  const xpAfterFirst = totalXp(getState().xpEvents)
  register()
  assert.equal(totalXp(getState().xpEvents), xpAfterFirst, 'reabrir o resultado não pode duplicar XP')
})

test('reviewFlashcard atualiza o agendamento e o histórico', () => {
  resetState()
  const schedule = scheduleCard(createSchedule('f-cit-01'), 'bom', Date.now())
  reviewFlashcard('f-cit-01', 'citologia', 'bom', schedule)

  assert.equal(getState().flashcardReviews.length, 1)
  assert.ok(getState().flashcardSchedules['f-cit-01'])
  assert.equal(getState().flashcardSchedules['f-cit-01'].repetitions, 1)
})

test('completeLab registra o experimento uma única vez', () => {
  resetState()
  completeLab('celula-animal', 'Explorou a célula animal')
  const xpAfterFirst = totalXp(getState().xpEvents)
  completeLab('celula-animal', 'Explorou a célula animal')
  assert.equal(totalXp(getState().xpEvents), xpAfterFirst)
  assert.equal(Object.keys(getState().labsCompleted).length, 1)
})

test('updateSettings altera apenas as preferências informadas', () => {
  resetState()
  updateSettings({ theme: 'escuro' })
  assert.equal(getState().settings.theme, 'escuro')
  assert.equal(getState().settings.dailyGoalXp, 50)
})

test('o nível avança conforme o XP acumulado', () => {
  resetState()
  assert.equal(levelForXp(totalXp(getState().xpEvents)).level, 1)
  for (let i = 0; i < 4; i += 1) completeLesson(`cit-0${i + 1}`)
  assert.ok(levelForXp(totalXp(getState().xpEvents)).level >= 2)
})
