import test from 'node:test'
import assert from 'node:assert/strict'

/** Armazenamento local simulado para testar o módulo `store`. */
function createMemoryStorage() {
  const data = new Map()
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
    clear: () => data.clear(),
    get length() {
      return data.size
    },
    key: (index) => Array.from(data.keys())[index] ?? null,
  }
}

const storage = createMemoryStorage()
globalThis.window = { localStorage: storage }

const {
  createInitialState,
  exportProgress,
  importProgress,
  loadState,
  resetState,
  saveState,
  getState,
  subscribe,
  updateState,
  validateImportedState,
} = await import('../js/lib/store.js')

test('createInitialState devolve um estado completo e vazio', () => {
  const state = createInitialState()
  assert.equal(state.lessonProgress && typeof state.lessonProgress, 'object')
  assert.deepEqual(state.attempts, [])
  assert.deepEqual(state.exams, [])
  assert.deepEqual(state.flashcardReviews, [])
  assert.deepEqual(state.xpEvents, [])
  assert.equal(state.settings.theme, 'auto')
  assert.equal(state.settings.dailyGoalXp, 50)
  assert.equal(state.streak.current, 0)
})

test('updateState aplica a mutação e persiste', () => {
  resetState()
  updateState((draft) => {
    draft.settings.dailyGoalXp = 80
    return draft
  })
  assert.equal(getState().settings.dailyGoalXp, 80)
  assert.ok(storage.getItem('biolab:v1').includes('"dailyGoalXp":80'))
})

test('subscribe notifica os ouvintes a cada mudança', () => {
  resetState()
  let calls = 0
  const unsubscribe = subscribe(() => {
    calls += 1
  })
  updateState((draft) => draft)
  assert.equal(calls, 1)
  unsubscribe()
  updateState((draft) => draft)
  assert.equal(calls, 1)
})

test('exportProgress gera um pacote recognized pelo importador', () => {
  resetState()
  updateState((draft) => {
    draft.settings.dailyGoalXp = 120
    return draft
  })
  const payload = exportProgress()
  assert.equal(payload.__format, 'biolab-progress')
  assert.ok(payload.exportedAt)
  assert.equal(validateImportedState(payload) !== null, true)
})

test('importProgress restaura o estado exportado', () => {
  resetState()
  updateState((draft) => {
    draft.settings.fontScale = 'grande'
    draft.lessonProgress['cit-01'] = { completed: true }
    return draft
  })
  const payload = JSON.parse(JSON.stringify(exportProgress()))

  resetState()
  assert.equal(getState().settings.fontScale, 'normal')

  const result = importProgress(payload)
  assert.equal(result.ok, true)
  assert.equal(getState().settings.fontScale, 'grande')
  assert.equal(getState().lessonProgress['cit-01'].completed, true)
})

test('importProgress recusa pacotes inválidos', () => {
  const invalid = [
    null,
    undefined,
    'texto',
    42,
    {},
    { __format: 'outro-formato', state: {} },
    { __format: 'biolab-progress' },
    { __format: 'biolab-progress', state: { lessonProgress: {} } },
  ]

  for (const payload of invalid) {
    const result = importProgress(payload)
    assert.equal(result.ok, false, `payload ${JSON.stringify(payload)} deveria ser recusado`)
    assert.ok(result.message.length > 0)
  }
})

test('validateImportedState aceita apenas o formato esperado', () => {
  assert.equal(validateImportedState(null), null)
  assert.equal(validateImportedState({ __format: 'biolab-progress', state: createInitialState() }) !== null, true)
})

test('loadState recupera o estado gravado no armazenamento', () => {
  resetState()
  updateState((draft) => {
    draft.settings.questionsPerRound = 20
    return draft
  })
  saveState()

  const reloaded = loadState()
  assert.equal(reloaded.settings.questionsPerRound, 20)
})

test('loadState ignora conteúdo corrompido sem quebrar', () => {
  storage.setItem('biolab:v1', 'isto não é json {{{')
  const reloaded = loadState()
  assert.ok(reloaded)
  assert.deepEqual(reloaded.attempts, [])
})

test('resetState apaga todo o progresso', () => {
  updateState((draft) => {
    draft.attempts.push({ id: 'x' })
    return draft
  })
  assert.equal(getState().attempts.length, 1)
  resetState()
  assert.equal(getState().attempts.length, 0)
})
