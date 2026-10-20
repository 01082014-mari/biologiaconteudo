import test from 'node:test'
import assert from 'node:assert/strict'

import { QUESTIONS, QUESTION_BY_ID, filterQuestions } from '../js/data/questions.js'
import { ALL_LESSONS, getLessonsByTopic, getNextLesson, getRelatedLessons } from '../js/data/lessons.js'
import { TOPICS, TOPIC_BY_ID, getTopicTitle } from '../js/data/topics.js'
import { FLASHCARDS } from '../js/data/flashcards.js'
import { ACHIEVEMENTS } from '../js/data/achievements.js'

test('a plataforma oferece as dez trilhas de Biologia', () => {
  assert.equal(TOPICS.length, 10)
  assert.equal(new Set(TOPICS.map((topic) => topic.id)).size, 10)
  for (const topic of TOPICS) {
    assert.ok(topic.title.length > 0)
    assert.ok(topic.description.length > 20)
    assert.ok(['facil', 'medio', 'dificil'].includes(topic.difficulty))
  }
})

test('existem pelo menos 12 aulas completas, com quiz de cinco questões', () => {
  assert.ok(ALL_LESSONS.length >= 12, `apenas ${ALL_LESSONS.length} aulas`)
  for (const lesson of ALL_LESSONS) {
    assert.ok(lesson.objectives.length >= 3, `${lesson.id} precisa de objetivos`)
    assert.ok(lesson.blocks.length >= 3, `${lesson.id} precisa de blocos de conteúdo`)
    assert.ok(lesson.keyConcepts.length >= 3, `${lesson.id} precisa de conceitos`)
    assert.ok(lesson.summaryPoints.length >= 3, `${lesson.id} precisa de resumo`)
    assert.equal(lesson.quizQuestionIds.length, 5, `${lesson.id} precisa de 5 questões no quiz`)
  }
})

test('as aulas cobrem Citologia, Genética, Ecologia e Corpo Humano', () => {
  for (const topicId of ['citologia', 'genetica', 'ecologia', 'corpo-humano']) {
    assert.ok(getLessonsByTopic(topicId).length >= 3, `faltam aulas em ${topicId}`)
  }
})

test('as aulas usam textos reais, sem marcadores de preenchimento', () => {
  const placeholders = ['lorem ipsum', 'texto de exemplo', 'conteúdo aqui', 'xxx', 'tbd', 'a definir']
  for (const lesson of ALL_LESSONS) {
    const text = JSON.stringify(lesson).toLowerCase()
    for (const placeholder of placeholders) {
      assert.ok(!text.includes(placeholder), `${lesson.id} contém "${placeholder}"`)
    }
  }
})

test('o banco tem pelo menos 60 questões com gabarito e explicação', () => {
  assert.ok(QUESTIONS.length >= 60, `apenas ${QUESTIONS.length} questões`)
  for (const question of QUESTIONS) {
    assert.ok(question.prompt.length > 15, `${question.id} com enunciado curto`)
    assert.ok(question.explanation.length > 30, `${question.id} com explicação curta`)
    assert.ok(question.options.length >= 2, `${question.id} sem alternativas`)
    assert.ok(
      ['multipla-escolha', 'verdadeiro-falso', 'associacao'].includes(question.type),
      `${question.id} com tipo inválido`,
    )
  }
})

test('os três tipos de questão estão representados no banco', () => {
  const types = new Set(QUESTIONS.map((question) => question.type))
  assert.ok(types.has('multipla-escolha'))
  assert.ok(types.has('verdadeiro-falso'))
  assert.ok(types.has('associacao'))
})

test('toda questão de múltipla escolha tem gabarito válido', () => {
  for (const question of QUESTIONS.filter((item) => item.type !== 'associacao')) {
    assert.ok(
      question.options.some((option) => option.id === question.correct),
      `${question.id} com gabarito inválido`,
    )
  }
})

test('toda questão de associação tem pares consistentes', () => {
  for (const question of QUESTIONS.filter((item) => item.type === 'associacao')) {
    assert.ok(question.pairs.length >= 2)
    for (const pair of question.pairs) {
      assert.ok(
        question.options.some((option) => option.text === pair.right),
        `${question.id}: par sem alternativa correspondente`,
      )
    }
  }
})

test('não há ids de questão repetidos', () => {
  assert.equal(new Set(QUESTIONS.map((question) => question.id)).size, QUESTIONS.length)
  assert.equal(Object.keys(QUESTION_BY_ID).length, QUESTIONS.length)
})

test('todas as questões do quiz de aula existem no banco', () => {
  for (const lesson of ALL_LESSONS) {
    for (const questionId of lesson.quizQuestionIds) {
      assert.ok(QUESTION_BY_ID[questionId], `${lesson.id} referencia ${questionId}`)
    }
  }
})

test('filterQuestions combina assunto, dificuldade e busca', () => {
  const onlyCitology = filterQuestions({ topics: ['citologia'] })
  assert.ok(onlyCitology.every((question) => question.topic === 'citologia'))

  const easy = filterQuestions({ difficulty: 'facil' })
  assert.ok(easy.every((question) => question.difficulty === 'facil'))

  const searched = filterQuestions({ search: 'mitose' })
  assert.ok(searched.length > 0)
  assert.ok(
    searched.every((question) =>
      `${question.prompt} ${question.tags.join(' ')}`.toLowerCase().includes('mitose'),
    ),
  )
})

test('o banco de flashcards cobre as quatro trilhas principais', () => {
  assert.ok(FLASHCARDS.length >= 40)
  const topics = new Set(FLASHCARDS.map((card) => card.topic))
  for (const topicId of ['citologia', 'genetica', 'ecologia', 'corpo-humano']) {
    assert.ok(topics.has(topicId), `sem flashcards em ${topicId}`)
  }
  for (const card of FLASHCARDS) {
    assert.ok(card.front.length > 10)
    assert.ok(card.back.length > 20)
  }
})

test('as conquistas exigem as métricas implementadas', () => {
  const valid = new Set([
    'lessons-completed',
    'questions-answered',
    'exams-completed',
    'flashcards-reviewed',
    'labs-concluded',
    'labs-completed',
    'xp-total',
    'streak-days',
    'topics-touched',
    'correct-answers',
    'perfect-score',
    'topic-lessons',
  ])
  for (const achievement of ACHIEVEMENTS) {
    assert.ok(valid.has(achievement.metric), `${achievement.id} usa métrica inválida`)
    assert.ok(achievement.xpReward > 0)
  }
  const ids = ACHIEVEMENTS.map((achievement) => achievement.id)
  assert.ok(ids.includes('primeira-aula'))
  assert.ok(ids.includes('explorador-de-celulas'))
  assert.ok(ids.includes('mestre-da-genetica'))
  assert.ok(ids.includes('guardiao-da-natureza'))
  assert.ok(ids.includes('100-questoes'))
  assert.ok(ids.includes('7-dias-de-estudos'))
})

test('getRelatedLessons devolve aulas da mesma trilha', () => {
  const related = getRelatedLessons('cit-01')
  assert.ok(related.length > 0)
  assert.ok(related.every((lesson) => lesson.topicId === 'citologia'))
  assert.ok(!related.some((lesson) => lesson.id === 'cit-01'))
})

test('getNextLesson respeita as aulas já concluídas', () => {
  const next = getNextLesson([])
  assert.ok(next)
  const after = getNextLesson([next.id])
  assert.notEqual(after?.id, next.id)
})

test('getTopicTitle devolve o nome da trilha', () => {
  assert.equal(getTopicTitle('citologia'), TOPIC_BY_ID['citologia'].title)
  assert.equal(getTopicTitle('inexistente'), 'Geral')
})

test('todo ícone usado na interface existe no catálogo', async () => {
  const { ICON_NAMES, resolveIcon } = await import('../js/lib/icons.js')
  const names = new Set()

  for (const topic of TOPICS) names.add(topic.icon)
  for (const achievement of ACHIEVEMENTS) names.add(achievement.icon)

  for (const name of names) {
    assert.ok(
      ICON_NAMES.includes(resolveIcon(name)),
      `ícone "${name}" não existe no catálogo`,
    )
  }
})
