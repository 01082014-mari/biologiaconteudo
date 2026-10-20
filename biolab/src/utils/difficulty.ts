import type { Difficulty } from '@/types'

/** Rótulos legíveis para as dificuldades. */
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  facil: 'Fácil',
  medio: 'Média',
  dificil: 'Difícil',
}

/** Ordem numérica das dificuldades (usada em comparações e ordenações). */
export const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  facil: 1,
  medio: 2,
  dificil: 3,
}

/** Traduz o rótulo de dificuldade a partir de qualquer valor persistido. */
export function difficultyLabel(difficulty: Difficulty | 'mista'): string {
  if (difficulty === 'mista') return 'Mista'
  return DIFFICULTY_LABELS[difficulty]
}

/** Classes Tailwind por dificuldade (usadas em badges). */
export const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  facil: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  medio: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300',
  dificil: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
}
