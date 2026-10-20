/**
 * Repetição espaçada (SM-2 simplificado) para os flashcards.
 *
 * Cada cartão mantém um intervalo (em dias), um fator de facilidade e a data
 * da próxima revisão. A avaliação do estudante define o novo intervalo:
 *
 *  - `errei`  → reinicia o ciclo, intervalo de 10 minutos;
 *  - `dificil` → intervalo reduzido pela metade, com fator menor;
 *  - `bom`    → intervalo multiplicado pelo fator atual;
 *  - `fácil`   → intervalo multiplicado pelo fator, com fator maior.
 */

export const RATINGS = ['errei', 'dificil', 'bom', 'fácil']

export const RATING_LABELS = {
  errei: 'Errei',
  dificil: 'Difícil',
  bom: 'Bom',
  facil: 'Fácil',
}

export const RATING_STYLES = {
  errei: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
  dificil: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300',
  bom: 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-300',
  facil: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
}

const MINUTE = 60 * 1000
const DAY = 24 * 60 * MINUTE

/** Estado inicial de um cartão ainda não revisado. */
export function createSchedule(flashcardId) {
  return {
    flashcardId,
    ease: 2.5,
    intervalDays: 0,
    repetitions: 0,
    dueAt: Date.now(),
    lastReviewedAt: null,
    lapses: 0,
    state: 'nova',
  }
}

/**
 * Calcula o novo estado do cartão a partir da avaliação.
 *
 * @param {object} schedule estado anterior
 * @param {string} rating uma de `errei`, `dificil`, `bom`, `fácil`
 * @param {number} now timestamp de referência (epoch ms)
 */
export function scheduleCard(schedule, rating, now = Date.now()) {
  const current = schedule ?? createSchedule('')
  let { ease, intervalDays, repetitions, lapses } = current

  switch (rating) {
    case 'errei':
      repetitions = 0
      lapses += 1
      ease = Math.max(1.3, ease - 0.2)
      intervalDays = 0
      return {
        ...current,
        ease,
        intervalDays,
        repetitions,
        lapses,
        dueAt: now + 10 * MINUTE,
        lastReviewedAt: now,
        state: 'revisando',
      }
    case 'dificil':
      repetitions += 1
      ease = Math.max(1.3, ease - 0.15)
      intervalDays = Math.max(1, Math.round((intervalDays || 1) * 1.2))
      return {
        ...current,
        ease,
        intervalDays,
        repetitions,
        lapses,
        dueAt: now + intervalDays * DAY,
        lastReviewedAt: now,
        state: 'revisando',
      }
    case 'bom':
      repetitions += 1
      ease = Math.min(3.2, ease + 0.05)
      intervalDays = repetitions === 1 ? 1 : Math.max(1, Math.round((intervalDays || 1) * ease))
      return {
        ...current,
        ease,
        intervalDays,
        repetitions,
        lapses,
        dueAt: now + intervalDays * DAY,
        lastReviewedAt: now,
        state: repetitions >= 4 ? 'dominada' : 'revisando',
      }
    case 'fácil':
      repetitions += 1
      ease = Math.min(3.2, ease + 0.15)
      intervalDays = repetitions === 1 ? 2 : Math.max(2, Math.round((intervalDays || 2) * ease * 1.25))
      return {
        ...current,
        ease,
        intervalDays,
        repetitions,
        lapses,
        dueAt: now + intervalDays * DAY,
        lastReviewedAt: now,
        state: repetitions >= 4 ? 'dominada' : 'revisando',
      }
    default:
      return { ...current, lastReviewedAt: now }
  }
}

/** Lista os cartões prontos para revisão no instante informado. */
export function getDueCards(schedules, now = Date.now()) {
  return Object.values(schedules ?? {})
    .filter((schedule) => schedule.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt)
}

/** Cartões que ainda não foram revisados nenhuma vez. */
export function getNewCards(schedules) {
  return Object.values(schedules ?? {}).filter((schedule) => schedule.state === 'nova')
}

/** Resumo da situation do baralho. */
export function summarizeDeck(schedules, now = Date.now()) {
  const values = Object.values(schedules ?? {})
  return {
    total: values.length,
    due: values.filter((schedule) => schedule.dueAt <= now).length,
    mastered: values.filter((schedule) => schedule.state === 'dominada').length,
    reviewing: values.filter((schedule) => schedule.state === 'revisando').length,
    new: values.filter((schedule) => schedule.state === 'nova').length,
  }
}
