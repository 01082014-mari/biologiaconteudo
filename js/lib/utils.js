/**
 * Utilitários compartilhados por toda a aplicação.
 */

/** Cria um elemento HTML a partir de uma string. */
export function html(strings, ...values) {
  return strings.reduce((acc, str, index) => acc + str + (values[index] ?? ''), '')
}

/** Escapa texto para uso seguro dentro de HTML. */
export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Seleciona elementos dentro de uma raiz. */
export function qs(selector, root = document) {
  return root.querySelector(selector)
}

/** Seleciona todos os elementos dentro de uma raiz. */
export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector))
}

/**
 * PRNG determinístico (mulberry32) com hash FNV-1a de 32 bits.
 * Usado para que simulados e shuffles possam ser reproduzidos em testes.
 */
export function hashSeed(seed) {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

export function createRandom(seed) {
  let state = (typeof seed === 'string' ? hashSeed(seed) : seed) >>> 0
  return function random() {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Embaralha uma cópia do array (Fisher–Yates), sem alterar o original. */
export function shuffle(items, random = Math.random) {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const tmp = result[i]
    result[i] = result[j]
    result[j] = tmp
  }
  return result
}

/** Embaralha com seed textual. */
export function shuffleWithSeed(items, seed) {
  return shuffle(items, createRandom(seed))
}

/** Sorteia `count` itens distintos, preservando a ordem original. */
export function sample(items, count, random = Math.random) {
  if (count >= items.length) return [...items]
  const indexes = shuffle(items.map((_, index) => index), random)
  return indexes
    .slice(0, count)
    .sort((a, b) => a - b)
    .map((index) => items[index])
}

/** Identificador único curto. */
export function createId(prefix = '') {
  const cryptoRef = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined
  if (cryptoRef && typeof cryptoRef.randomUUID === 'function') {
    const id = cryptoRef.randomUUID()
    return prefix ? `${prefix}_${id}` : id
  }
  return `${prefix ? `${prefix}_` : ''}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

/** Formata uma duração em segundos. */
export function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const rest = seconds % 60
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, '0')}min`
  if (minutes > 0) return `${minutes}min ${String(rest).padStart(2, '0')}s`
  return `${rest}s`
}

/** Formata segundos no formato de cronômetro. */
export function formatClock(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const rest = seconds % 60
  const mm = String(minutes).padStart(2, '0')
  const ss = String(rest).padStart(2, '0')
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`
}

/** Formata uma data ISO em `dd/mm/aaaa`. */
export function formatDate(iso) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

/** Formata uma data ISO em `dd/mm/aaaa às HH:MM`. */
export function formatDateTime(iso) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/** Chave de data `YYYY-MM-DD` usada nas metas diárias. */
export function dateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Formata um percentual com uma casa decimal. */
export function formatPercent(value) {
  if (!Number.isFinite(value)) return '0%'
  return `${Math.round(value * 10) / 10}%`
}

/** Pluraliza um substantivo. */
export function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural
}

/** Rótulos de dificuldade. */
export const DIFFICULTY_LABELS = {
  facil: 'Fácil',
  medio: 'Média',
  dificil: 'Difícil',
  mista: 'Mista',
}

/** Rótulos de tipo de questão. */
export const QUESTION_TYPE_LABELS = {
  'multipla-escolha': 'Múltipla escolha',
  'verdadeiro-falso': 'Verdadeiro ou falso',
  associacao: 'Associação',
}

/** Devolve o rótulo de uma dificuldade persistida. */
export function difficultyLabel(difficulty) {
  return DIFFICULTY_LABELS[difficulty] ?? 'Geral'
}

/** Escurece ou clareia uma cor hexadecimal. */
export function shadeColor(hex, amount) {
  const clean = hex.replace('#', '')
  const num = parseInt(clean, 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount))
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
