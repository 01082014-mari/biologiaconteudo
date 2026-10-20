/**
 * Geração de identificadores únicos.
 *
 * Usa `crypto.randomUUID` quando disponível (navegadores modernos) e um
 * fallback determinístico para ambientes de teste/jsdom sem `crypto`.
 */
export function createId(prefix = ''): string {
  const globalCrypto = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined

  if (globalCrypto && typeof globalCrypto.randomUUID === 'function') {
    const id = globalCrypto.randomUUID()
    return prefix ? `${prefix}_${id}` : id
  }

  const random = Math.random().toString(36).slice(2, 10)
  const time = Date.now().toString(36)
  const id = `${time}${random}`
  return prefix ? `${prefix}_${id}` : id
}
