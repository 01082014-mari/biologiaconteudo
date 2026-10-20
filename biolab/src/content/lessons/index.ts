import type { Lesson, TopicId } from '@/types'
import { CITOLOGY_LESSONS } from './citology'
import { GENETICS_LESSONS } from './genetics'
import { ECOLOGY_LESSONS } from './ecology'
import { HUMAN_LESSONS } from './human'

/** Todas as aulas disponíveis na plataforma, indexadas por id. */
export const ALL_LESSONS: Lesson[] = [
  ...CITOLOGY_LESSONS,
  ...GENETICS_LESSONS,
  ...ECOLOGY_LESSONS,
  ...HUMAN_LESSONS,
]

export const LESSON_BY_ID: Record<string, Lesson> = ALL_LESSONS.reduce(
  (acc, lesson) => {
    acc[lesson.id] = lesson
    return acc
  },
  {} as Record<string, Lesson>,
)

/** Todas as aulas de uma trilha, na ordem em que devem ser estudadas. */
export function getLessonsByTopic(topicId: TopicId): Lesson[] {
  return ALL_LESSONS.filter((lesson) => lesson.topicId === topicId)
}

/** Aulas relacionadas (mesma trilha, excluindo a atual). */
export function getRelatedLessons(lessonId: string, limit = 3): Lesson[] {
  const lesson = LESSON_BY_ID[lessonId]
  if (!lesson) return []
  return getLessonsByTopic(lesson.topicId)
    .filter((item) => item.id !== lessonId)
    .slice(0, limit)
}

/** Próxima aula não concluída na trilha — usada pelo botão "Continuar estudando". */
export function getNextLesson(completedIds: string[]): Lesson | null {
  const completed = new Set(completedIds)
  return (
    ALL_LESSONS.find((lesson) => !completed.has(lesson.id)) ?? ALL_LESSONS[0] ?? null
  )
}

export { CITOLOGY_LESSONS, GENETICS_LESSONS, ECOLOGY_LESSONS, HUMAN_LESSONS }
