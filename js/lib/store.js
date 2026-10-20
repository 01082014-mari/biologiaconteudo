/**
 * Persistência local do BioLab.
 *
 * Todo o progresso do estudante é guardado em `localStorage` sob a chave
 * `biolab:v1`. A camada é isolada em um único módulo para que:
 *
 *  - o estado inicial seja previsível e testável;
 *  - a importação e a exportação usem exatamente o mesmo formato;
 *  - a escrita seja ignorada quando o estado não mudou.
 */

export const STORAGE_KEY = 'biolab:v1'
export const SCHEMA_VERSION = 1

/** Cria o estado inicial de um estudante novo. */
export function createInitialState() {
  return {
    version: SCHEMA_VERSION,
    createdAt: new Date().toISOString(),
    /** Progresso por aula: id da aula → dados. */
    lessonProgress: {},
    /** Tentativas de exercícios e simulados. */
    attempts: [],
    /** Resultados consolidados de simulados. */
    exams: [],
    /** Estado de repetição espaçada por flashcard. */
    flashcardSchedules: {},
    /** Histórico de revisões de flashcards. */
    flashcardReviews: [],
    /** Eventos de XP concedidos. */
    xpEvents: [],
    /** Conquistas desbloqueadas: id → data ISO. */
    achievements: {},
    /** Laboratórios concluídos. */
    labsCompleted: {},
    /** Registro de atividades para o histórico. */
    activity: [],
    /** Meta diária: `YYYY-MM-DD` → { xpEarned, goalXp }. */
    dailyGoals: {},
    /** Sequência de dias estudados. */
    streak: { current: 0, longest: 0, lastStudyDate: null, days: [] },
    /** Preferências do estudante. */
    settings: {
      theme: 'auto',
      dailyGoalXp: 50,
      fontScale: 'normal',
      reduceMotion: false,
      timerEnabledByDefault: true,
      questionsPerRound: 10,
    },
  }
}

/** Estado atual, carregado do armazenamento local. */
let state = createInitialState()
let storageAvailable = true
const listeners = new Set()

/** Verifica se o `localStorage` pode ser usado neste ambiente. */
function getStorage() {
  try {
    const probe = '__biolab_probe__'
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    return window.localStorage
  } catch {
    storageAvailable = false
    return null
  }
}

/**
 * Valida um objeto importado, devolvendo `null` quando o formato não é
 * compatível com o esquema do BioLab.
 */
export function validateImportedState(payload) {
  if (!payload || typeof payload !== 'object') return null
  if (payload.__format !== 'biolab-progress') return null
  if (!payload.state || typeof payload.state !== 'object') return null

  const candidate = payload.state
  const required = [
    'lessonProgress',
    'attempts',
    'exams',
    'flashcardSchedules',
    'flashcardReviews',
    'xpEvents',
    'achievements',
    'labsCompleted',
    'activity',
    'dailyGoals',
    'streak',
    'settings',
  ]

  for (const key of required) {
    if (!(key in candidate)) return null
  }
  if (!Array.isArray(candidate.attempts)) return null
  if (!Array.isArray(candidate.exams)) return null
  if (!Array.isArray(candidate.activity)) return null
  if (!candidate.settings || typeof candidate.settings !== 'object') return null
  if (!candidate.streak || typeof candidate.streak !== 'object') return null

  return candidate
}

/** Carrega o estado do armazenamento local. */
export function loadState() {
  const storage = getStorage()
  if (!storage) return state

  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return state
    const parsed = JSON.parse(raw)
    const validated = validateImportedState(parsed)
    if (validated) {
      state = { ...createInitialState(), ...validated }
    } else {
      const migrated = migrateLegacyState(parsed)
      state = { ...createInitialState(), ...migrated }
    }
  } catch {
    state = createInitialState()
  }
  return state
}

/**
 * Migra estados gravados por versões anteriores que não usavam o envelope
 * `{ __format, state }`.
 */
function migrateLegacyState(parsed) {
  if (!parsed || typeof parsed !== 'object') return createInitialState()
  const base = createInitialState()
  const merged = { ...base, ...parsed }
  merged.settings = { ...base.settings, ...(parsed.settings ?? {}) }
  merged.streak = { ...base.streak, ...(parsed.streak ?? {}) }
  merged.version = SCHEMA_VERSION
  return merged
}

/** Grava o estado no armazenamento local. */
export function saveState() {
  const storage = getStorage()
  if (!storage) return false
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    storageAvailable = false
    return false
  }
}

/** Devolve o estado atual (referência somente-leitura por convenção). */
export function getState() {
  return state
}

/** Substitui o estado atual e persiste. */
export function setState(next) {
  state = { ...state, ...next }
  saveState()
  listeners.forEach((listener) => listener(state))
  return state
}

/** Aplica uma mutação sobre o estado e persiste o resultado. */
export function updateState(mutator) {
  const draft = JSON.parse(JSON.stringify(state))
  const result = mutator(draft)
  state = result && typeof result === 'object' ? result : draft
  saveState()
  listeners.forEach((listener) => listener(state))
  return state
}

/** Assina mudanças de estado. Devolve a função para cancelar a assinatura. */
export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Limpa todo o progresso local. */
export function resetState() {
  state = createInitialState()
  saveState()
  listeners.forEach((listener) => listener(state))
  return state
}

/** Gera o pacote de exportação em JSON. */
export function exportProgress() {
  return {
    __format: 'biolab-progress',
    exportedAt: new Date().toISOString(),
    version: SCHEMA_VERSION,
    state,
  }
}

/**
 * Importa um pacote de progresso exportado.
 * Retorna `{ ok, message }`.
 */
export function importProgress(payload) {
  const validated = validateImportedState(payload)
  if (!validated) {
    return {
      ok: false,
      message: 'Arquivo inválido: o conteúdo não corresponde ao formato de progresso do BioLab.',
    }
  }
  state = { ...createInitialState(), ...validated }
  saveState()
  listeners.forEach((listener) => listener(state))
  return { ok: true, message: 'Progresso importado com sucesso.' }
}

/** Informa se o armazenamento local está disponível neste navegador. */
export function isStorageAvailable() {
  return storageAvailable
}
