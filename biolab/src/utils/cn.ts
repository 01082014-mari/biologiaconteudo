import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Combina classes Tailwind resolvendo conflitos de forma determinística. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
