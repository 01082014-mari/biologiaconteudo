#!/usr/bin/env node
/**
 * Verifica a integridade do conteúdo didático:
 *  - toda questão tem gabarito válido e explicação;
 *  - os ids das questões dos quizzes de aula existem no banco;
 *  - os flashcards referenciados pelas aulas existem;
 *  - as conquistas usam métricas conhecidas;
 *  - não há ids duplicados.
 *
 * Uso: node scripts/check-data.mjs
 */
import { QUESTIONS, QUESTION_BY_ID } from '../js/data/questions.js'
import { ALL_LESSONS } from '../js/data/lessons.js'
import { FLASHCARDS } from '../js/data/flashcards.js'
import { ACHIEVEMENTS } from '../js/data/achievements.js'
import { TOPICS } from '../js/data/topics.js'

const problems = []
const fail = (message) => problems.push(message)

const VALID_TYPES = new Set(['multipla-escolha', 'verdadeiro-falso', 'associacao'])
const VALID_DIFFICULTIES = new Set(['facil', 'medio', 'dificil'])
const TOPIC_IDS = new Set(TOPICS.map((topic) => topic.id))

/* ------------------------------ Questões ------------------------------ */

const questionIds = new Set()
for (const question of QUESTIONS) {
  if (questionIds.has(question.id)) fail(`Questão duplicada: ${question.id}`)
  questionIds.add(question.id)

  if (!VALID_TYPES.has(question.type)) fail(`${question.id}: tipo inválido "${question.type}"`)
  if (!VALID_DIFFICULTIES.has(question.difficulty))
    fail(`${question.id}: dificuldade inválida "${question.difficulty}"`)
  if (!TOPIC_IDS.has(question.topic)) fail(`${question.id}: assunto inválido "${question.topic}"`)
  if (!question.prompt || question.prompt.length < 10)
    fail(`${question.id}: enunciado ausente ou muito curto`)
  if (!question.explanation || question.explanation.length < 20)
    fail(`${question.id}: explicação ausente ou muito curta`)
  if (!Array.isArray(question.options) || question.options.length < 2)
    fail(`${question.id}: alternativas insuficientes`)

  if (question.type === 'associacao') {
    if (!Array.isArray(question.pairs) || question.pairs.length < 2)
      fail(`${question.id}: pares de associação insuficientes`)
    const rightTexts = new Set((question.pairs ?? []).map((pair) => pair.right))
    for (const option of question.options ?? []) {
      if (!rightTexts.has(option.text)) fail(`${question.id}: alternativa "${option.text}" sem par correspondente`)
    }
    for (const pair of question.pairs ?? []) {
      const found = (question.options ?? []).some((option) => option.text === pair.right)
      if (!found) fail(`${question.id}: par "${pair.left}" aponta para "${pair.right}" ausente nas alternativas`)
    }
  } else {
    const correct = (question.options ?? []).find((option) => option.id === question.correct)
    if (!correct) fail(`${question.id}: gabarito "${question.correct}" não existe entre as alternativas`)
    const optionIds = (question.options ?? []).map((option) => option.id)
    if (new Set(optionIds).size !== optionIds.length) fail(`${question.id}: alternativas com id repetido`)
  }

  for (const lessonId of question.relatedLessons ?? []) {
    if (!ALL_LESSONS.some((lesson) => lesson.id === lessonId))
      fail(`${question.id}: aula relacionada inexistente "${lessonId}"`)
  }
}

/* -------------------------------- Aulas -------------------------------- */

const lessonIds = new Set()
for (const lesson of ALL_LESSONS) {
  if (lessonIds.has(lesson.id)) fail(`Aula duplicada: ${lesson.id}`)
  lessonIds.add(lesson.id)

  if (!TOPIC_IDS.has(lesson.topicId)) fail(`${lesson.id}: trilha inválida "${lesson.topicId}"`)
  if (!lesson.objectives?.length) fail(`${lesson.id}: sem objetivos de aprendizagem`)
  if (!lesson.blocks?.length) fail(`${lesson.id}: sem blocos de conteúdo`)
  if (!lesson.keyConcepts?.length) fail(`${lesson.id}: sem conceitos-chave`)
  if (!lesson.summaryPoints?.length) fail(`${lesson.id}: sem resumo`)
  if (!lesson.quizQuestionIds?.length) fail(`${lesson.id}: sem questões de quiz`)
  if (lesson.quizQuestionIds?.length !== 5)
    fail(`${lesson.id}: o quiz deve ter 5 questões (tem ${lesson.quizQuestionIds?.length})`)

  for (const questionId of lesson.quizQuestionIds ?? []) {
    if (!QUESTION_BY_ID[questionId]) fail(`${lesson.id}: questão de quiz inexistente "${questionId}"`)
  }

  const blockIds = lesson.blocks?.map((block) => block.id) ?? []
  if (new Set(blockIds).size !== blockIds.length) fail(`${lesson.id}: blocos com id repetido`)
}

/* ----------------------------- Flashcards ----------------------------- */

const flashcardIds = new Set()
for (const card of FLASHCARDS) {
  if (flashcardIds.has(card.id)) fail(`Flashcard duplicado: ${card.id}`)
  flashcardIds.add(card.id)
  if (!card.front || !card.back) fail(`${card.id}: cartão sem frente ou verso`)
  if (!TOPIC_IDS.has(card.topic)) fail(`${card.id}: assunto inválido "${card.topic}"`)
}

/* ---------------------------- Conquistas ----------------------------- */

const VALID_METRICS = new Set([
  'lessons-completed',
  'questions-answered',
  'exams-completed',
  'flashcards-reviewed',
  'labs-completed',
  'xp-total',
  'streak-days',
  'topics-touched',
  'correct-answers',
  'perfect-score',
  'topic-lessons',
])

const achievementIds = new Set()
for (const achievement of ACHIEVEMENTS) {
  if (achievementIds.has(achievement.id)) fail(`Conquista duplicada: ${achievement.id}`)
  achievementIds.add(achievement.id)
  if (!VALID_METRICS.has(achievement.metric))
    fail(`${achievement.id}: métrica inválida "${achievement.metric}"`)
  if (!Number.isFinite(achievement.value) || achievement.value <= 0)
    fail(`${achievement.id}: valor de conquista inválido`)
}

/* ------------------------------ Relatório ------------------------------ */

const byType = QUESTIONS.reduce((acc, question) => {
  acc[question.type] = (acc[question.type] ?? 0) + 1
  return acc
}, {})

console.log('Conteúdo do BioLab')
console.log(`  trilhas:        ${TOPICS.length}`)
console.log(`  aulas:          ${ALL_LESSONS.length}`)
console.log(`  questões:       ${QUESTIONS.length} (${Object.entries(byType)
  .map(([type, count]) => `${type}: ${count}`)
  .join(', ')})`)
console.log(`  flashcards:     ${FLASHCARDS.length}`)
console.log(`  conquistas:     ${ACHIEVEMENTS.length}`)

if (problems.length > 0) {
  console.error(`\n${problems.length} problema(s):`)
  for (const problem of problems) console.error(`  ✗ ${problem}`)
  process.exit(1)
}

console.log('\n✓ Integridade do conteúdo verificada.')
