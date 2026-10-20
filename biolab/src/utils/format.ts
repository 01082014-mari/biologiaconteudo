/** Formata uma duração em segundos como `1h 05min`, `12min 30s` ou `45s`. */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const rest = seconds % 60

  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, '0')}min`
  if (minutes > 0) return `${minutes}min ${String(rest).padStart(2, '0')}s`
  return `${rest}s`
}

/** Formata segundos no formato de cronômetro `MM:SS` (ou `HH:MM:SS`). */
export function formatClock(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const rest = seconds % 60
  const mm = String(minutes).padStart(2, '0')
  const ss = String(rest).padStart(2, '0')
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`
}

/** Formata uma data ISO em `dd/mm/aaaa`. */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

/** Formata uma data ISO em `dd/mm/aaaa às HH:MM`. */
export function formatDateTime(iso: string): string {
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

/** Formata a data de hoje no formato `YYYY-MM-DD` (usado nas metas diárias). */
export function toDateKey(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Formata um percentual com uma casa decimal. */
export function formatPercent(value: number): string {
  return `${Math.round(value * 10) / 10}%`
}

/** Pluraliza um substantivo simples. */
export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}
