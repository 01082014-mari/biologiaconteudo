/**
 * Utilidades de aleatoriedade determinística.
 *
 * O gerador é seed-based (mulberry32) para que os testes possam reproduzir
 * embaralhamentos e seleções de questões de forma estável.
 */

/** Gera um seed numérico a partir de uma string (hash FNV-1a de 32 bits). */
export function hashSeed(seed: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/** PRNG mulberry32 — rápido, determinístico e com boa distribuição. */
export function createRandom(seed: number | string): () => number {
  let state = (typeof seed === 'string' ? hashSeed(seed) : seed) >>> 0

  return function random() {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Embaralha uma cópia do array usando o gerador fornecido.
 * Não altera o array original (Fisher–Yates).
 */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const tmp = result[i]
    result[i] = result[j]
    result[j] = tmp
  }
  return result
}

/** Embaralha com seed textual — atalho para uso em testes e simulados. */
export function shuffleWithSeed<T>(items: readonly T[], seed: string): T[] {
  return shuffle(items, createRandom(seed))
}

/** Sorteia `count` itens distintos, preservando a ordem original. */
export function sample<T>(items: readonly T[], count: number, random: () => number = Math.random): T[] {
  if (count >= items.length) return [...items]
  const indexes = shuffle(items.map((_, index) => index), random)
  return indexes
    .slice(0, count)
    .sort((a, b) => a - b)
    .map((index) => items[index])
}
