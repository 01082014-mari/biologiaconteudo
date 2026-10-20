/**
 * Central de Exercícios: banco de questões com filtros, correção imediata,
 * explicação do conceito e histórico de tentativas.
 */

import { QUESTIONS, QUESTION_TYPE_LABELS } from '../data/questions.js'
import { TOPICS, TOPIC_BY_ID } from '../data/topics.js'
import { LESSON_BY_ID } from '../data/lessons.js'
import { recordAttempt } from '../lib/actions.js'
import { getState } from '../lib/store.js'
import { isAnswerCorrect } from '../lib/grading.js'
import { icon } from '../lib/icons.js'
import { escapeHtml, formatDateTime, pluralize, shuffle } from '../lib/utils.js'

const DIFFICULTIES = [
  { id: 'todas', label: 'Todas as dificuldades' },
  { id: 'facil', label: 'Fácil' },
  { id: 'medio', label: 'Média' },
  { id: 'dificil', label: 'Difícil' },
]

const TYPES = [
  { id: 'todas', label: 'Todos os tipos' },
  { id: 'multipla-escolha', label: 'Múltipla escolha' },
  { id: 'verdadeiro-falso', label: 'Verdadeiro ou falso' },
  { id: 'associacao', label: 'Associação' },
]

/** Estado local da página. */
const session = {
  filters: { topics: [], difficulty: 'todas', type: 'todas', search: '' },
  questions: [],
  answers: {},
  currentIndex: 0,
  startedAt: null,
  active: false,
}

export default function exercises({ hash = {} } = {}) {
  const state = getState()
  const hashQuery = new URLSearchParams(hash?.query ?? '')
  const topicFromUrl = hashQuery.get('topico')

  if (topicFromUrl && TOPIC_BY_ID[topicFromUrl] && !session.filters.topics.includes(topicFromUrl)) {
    session.filters.topics = [topicFromUrl]
  }

  const recentAttempts = (state.attempts ?? [])
    .filter((attempt) => attempt.source === 'exercicios')
    .slice(-6)
    .reverse()

  return `
  <section class="stack">
    <header class="row row--between">
      <div>
        <h1 class="mb-0">Central de Exercícios</h1>
        <p class="text-muted mb-0">
          ${QUESTIONS.length} questões originais com gabarito comentado
        </p>
      </div>
      <button class="btn btn--primary" id="start-round" type="button">
        ${icon('play', { size: 18 })} Iniciar rodada
      </button>
    </header>

    <section class="card" id="filters">
      <div class="stack">
        <div>
          <span class="field__label">Assuntos</span>
          <div class="chip-group mt-1" id="topic-filter">
            ${TOPICS.map(
              (topic) => `
              <button class="chip" type="button" data-topic="${topic.id}" aria-pressed="${session.filters.topics.includes(
                topic.id,
              )}">
                ${escapeHtml(topic.title)}
                <span class="chip__count">${QUESTIONS.filter((q) => q.topic === topic.id).length}</span>
              </button>`,
            ).join('')}
          </div>
        </div>

        <div class="grid grid--3">
          <div class="field">
            <label class="field__label" for="difficulty-select">Dificuldade</label>
            <select class="select" id="difficulty-select">
              ${DIFFICULTIES.map(
                (item) =>
                  `<option value="${item.id}" ${session.filters.difficulty === item.id ? 'selected' : ''}>${item.label}</option>`,
              ).join('')}
            </select>
          </div>
          <div class="field">
            <label class="field__label" for="type-select">Tipo de questão</label>
            <select class="select" id="type-select">
              ${TYPES.map(
                (item) =>
                  `<option value="${item.id}" ${session.filters.type === item.id ? 'selected' : ''}>${item.label}</option>`,
              ).join('')}
            </select>
          </div>
          <div class="field">
            <label class="field__label" for="search-input">Buscar</label>
            <input class="input" id="search-input" type="search" placeholder="Ex.: mitose, enzima, fotossíntese"
              value="${escapeHtml(session.filters.search)}" />
          </div>
        </div>

        <div class="row row--between">
          <span class="text-sm text-muted" id="filter-summary"></span>
          <button class="btn btn--ghost btn--sm" id="clear-filters" type="button">Limpar filtros</button>
        </div>
      </div>
    </section>

    <section id="round-area"></section>

    <section class="card">
      <h2 class="card__title">Histórico de tentativas</h2>
      <p class="card__subtitle">Suas últimas rodadas de exercícios</p>
      ${
        recentAttempts.length > 0
          ? `<ul class="list mt-2">
              ${recentAttempts
                .map(
                  (attempt) => `
                <li class="list__item">
                  <span class="list__icon" style="${
                    attempt.scorePercent >= 70
                      ? 'background:var(--success-soft);color:var(--success)'
                      : 'background:var(--warning-soft);color:var(--warning)'
                  }">${icon('percent', { size: 16 })}</span>
                  <span style="flex:1">
                    <strong class="text-sm">${attempt.correctAnswers}/${attempt.totalQuestions} acertos</strong>
                    <br />
                    <span class="text-xs text-muted">
                      ${escapeHtml(formatDateTime(attempt.createdAt))} · ${attempt.totalQuestions} ${pluralize(
                        attempt.totalQuestions,
                        'questão',
                        'questões',
                      )}
                    </span>
                  </span>
                  <span class="stat__value" style="font-size:1.3rem;color:var(--primary)">${attempt.scorePercent}%</span>
                </li>`,
                )
                .join('')}
            </ul>`
          : `<div class="empty">
              ${icon('history', { size: 44, className: 'empty__icon' })}
              <p class="empty__title">Nenhuma rodada registrada ainda</p>
              <p>Escolha os filtros e clique em <strong>Iniciar rodada</strong> para começar a praticar.</p>
            </div>`
      }
    </section>
  </section>`
}

/** Liga os interativos da página. */
export function mount() {
  const filterSummary = document.getElementById('filter-summary')
  const roundArea = document.getElementById('round-area')

  const filtered = () =>
    QUESTIONS.filter((question) => {
      const { topics, difficulty, type, search } = session.filters
      if (topics.length > 0 && !topics.includes(question.topic)) return false
      if (difficulty !== 'todas' && question.difficulty !== difficulty) return false
      if (type !== 'todas' && question.type !== type) return false
      if (search) {
        const term = search.toLowerCase()
        const haystack = `${question.prompt} ${question.tags.join(' ')}`.toLowerCase()
        if (!haystack.includes(term)) return false
      }
      return true
    })

  function refreshSummary() {
    const list = filtered()
    const topicsLabel =
      session.filters.topics.length === 0
        ? 'Todos os assuntos'
        : session.filters.topics.map((id) => TOPIC_BY_ID[id]?.title ?? id).join(', ')
    filterSummary.textContent = `${list.length} ${pluralize(
      list.length,
      'questão disponível',
      'questões disponíveis',
    )} · ${topicsLabel}`
    return list
  }

  // Filtros
  document.getElementById('topic-filter')?.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-topic]')
    if (!chip) return
    const topicId = chip.dataset.topic
    const list = session.filters.topics
    const position = list.indexOf(topicId)
    if (position >= 0) list.splice(position, 1)
    else list.push(topicId)
    chip.setAttribute('aria-pressed', String(position < 0))
    refreshSummary()
  })

  document.getElementById('difficulty-select')?.addEventListener('change', (event) => {
    session.filters.difficulty = event.target.value
    refreshSummary()
  })

  document.getElementById('type-select')?.addEventListener('change', (event) => {
    session.filters.type = event.target.value
    refreshSummary()
  })

  let searchTimer = null
  document.getElementById('search-input')?.addEventListener('input', (event) => {
    window.clearTimeout(searchTimer)
    searchTimer = window.setTimeout(() => {
      session.filters.search = event.target.value.trim()
      refreshSummary()
    }, 180)
  })

  document.getElementById('clear-filters')?.addEventListener('click', () => {
    session.filters = { topics: [], difficulty: 'todas', type: 'todas', search: '' }
    document.querySelectorAll('[data-topic]').forEach((chip) => chip.setAttribute('aria-pressed', 'false'))
    const difficultySelect = document.getElementById('difficulty-select')
    const typeSelect = document.getElementById('type-select')
    const searchInput = document.getElementById('search-input')
    if (difficultySelect) difficultySelect.value = 'todas'
    if (typeSelect) typeSelect.value = 'todas'
    if (searchInput) searchInput.value = ''
    refreshSummary()
  })

  document.getElementById('start-round')?.addEventListener('click', () => {
    const list = filtered()
    if (list.length === 0) {
      roundArea.innerHTML = `
        <div class="card empty">
          ${icon('alert', { size: 44, className: 'empty__icon' })}
          <p class="empty__title">Nenhuma questão encontrada</p>
          <p>Ajuste os filtros para selecionar questões disponíveis.</p>
        </div>`
      return
    }

    const perRound = getState().settings?.questionsPerRound ?? 10
    session.questions = shuffle(list).slice(0, Math.min(perRound, list.length))
    session.answers = {}
    session.currentIndex = 0
    session.startedAt = Date.now()
    session.active = true

    renderRound(roundArea)
  })

  refreshSummary()
  if (session.active && session.questions.length > 0) renderRound(roundArea)
}

/** Renderiza a rodada em andamento. */
function renderRound(area) {
  const question = session.questions[session.currentIndex]
  const total = session.questions.length
  const answeredCount = Object.keys(session.answers).length

  area.innerHTML = `
  <div class="card card--pad-lg">
    <div class="row row--between mb-2">
      <h2 class="card__title mb-0">Rodada em andamento</h2>
      <span class="badge badge--primary">${answeredCount}/${total} respondidas</span>
    </div>
    <div class="progress mb-3"><div class="progress__bar" style="width:${(answeredCount / total) * 100}%"></div></div>
    ${renderQuestionCard(question, session.currentIndex, total)}
    <div class="row mt-3" style="justify-content:space-between">
      <button class="btn btn--ghost" id="round-prev" type="button" ${session.currentIndex === 0 ? 'disabled' : ''}>
        ${icon('chevronLeft', { size: 16 })} Anterior
      </button>
      <button class="btn btn--primary" id="round-next" type="button">
        ${session.currentIndex === total - 1 ? 'Finalizar rodada' : 'Próxima'} ${icon('chevronRight', { size: 16 })}
      </button>
    </div>
  </div>`

  const prev = document.getElementById('round-prev')
  const next = document.getElementById('round-next')

  prev?.addEventListener('click', () => {
    session.currentIndex = Math.max(0, session.currentIndex - 1)
    renderRound(area)
  })

  next?.addEventListener('click', () => {
    if (session.currentIndex === total - 1) {
      finishRound(area)
      return
    }
    session.currentIndex = Math.min(total - 1, session.currentIndex + 1)
    renderRound(area)
  })

  // Seleção e confirmação
  const body = area.querySelector('[data-question-body]')

  body?.addEventListener('click', (event) => {
    const option = event.target.closest('.option')
    if (!option || option.disabled) return
    body.querySelectorAll('.option').forEach((item) => {
      item.classList.remove('is-selected')
      item.setAttribute('aria-checked', 'false')
    })
    option.classList.add('is-selected')
    option.setAttribute('aria-checked', 'true')
  })

  area.querySelector('[data-confirm]')?.addEventListener('click', () => {
    const explanation = area.querySelector('[data-explanation]')
    const selected = body?.querySelector('.option.is-selected')

    if (!selected) {
      if (!explanation) return
      explanation.hidden = false
      explanation.className = 'explanation explanation--error'
      explanation.innerHTML = `
        <div class="explanation__title">${icon('alert', { size: 16 })} Escolha uma alternativa</div>
        <p>Selecione uma das alternativas antes de conferir.</p>`
      return
    }

    const answer = selected.dataset.option
    const correct = isAnswerCorrect(question, answer)
    session.answers[question.id] = { questionId: question.id, selectedOptionId: answer, correct, answeredAt: new Date().toISOString() }

    body.querySelectorAll('.option').forEach((option) => {
      option.disabled = true
      if (option.dataset.option === question.correct) option.classList.add('is-correct')
      else if (option.dataset.option === answer) option.classList.add('is-wrong')
    })

    explanation.hidden = false
    explanation.className = `explanation ${correct ? 'explanation--ok' : 'explanation--error'}`
    explanation.innerHTML = `
      <div class="explanation__title">
        ${icon(correct ? 'circleCheck' : 'circleX', { size: 16 })}
        ${correct ? 'Resposta correta!' : 'Resposta incorreta'}
      </div>
      <p>${escapeHtml(question.explanation)}</p>
      ${
        !correct && (question.relatedLessons ?? []).length > 0
          ? `<p class="mb-0">Sugestão de revisão:
              <a href="#/aula/${question.relatedLessons[0]}">${escapeHtml(
                LESSON_BY_ID[question.relatedLessons[0]]?.title ?? 'aula relacionada',
              )}</a>.</p>`
          : ''
      }`

    const confirmButton = area.querySelector('[data-confirm]')
    if (confirmButton) {
      confirmButton.disabled = true
      confirmButton.innerHTML = `Conferida ${icon('check', { size: 16 })}`
    }
  })
}

/** Cartão de uma questão. */
function renderQuestionCard(question, index, total) {
  return `
  <article data-question-body data-question-id="${question.id}">
    <div class="row" style="gap:.4rem;margin-bottom:.7rem">
      <span class="badge badge--primary">Questão ${index + 1} de ${total}</span>
      <span class="badge badge--${question.difficulty}">${difficultyText(question.difficulty)}</span>
      <span class="badge badge--outline">${escapeHtml(TOPIC_BY_ID[question.topic]?.title ?? '')}</span>
      <span class="badge badge--outline">${escapeHtml(QUESTION_TYPE_LABELS[question.type])}</span>
    </div>
    <p style="font-size:1.05rem;font-weight:600;margin-bottom:1rem">${escapeHtml(question.prompt)}</p>
    <div class="stack stack--sm" role="radiogroup" aria-label="Alternativas">
      ${question.options
        .map(
          (option, optionIndex) => `
        <button class="option" type="button" role="radio" aria-checked="false" data-option="${option.id}">
          <span class="option__marker">${String.fromCharCode(65 + optionIndex)}</span>
          <span class="option__text">${escapeHtml(option.text)}</span>
        </button>`,
        )
        .join('')}
    </div>
    <button class="btn btn--primary mt-2" data-confirm type="button">${icon('check', { size: 16 })} Conferir resposta</button>
    <div class="explanation" data-explanation hidden></div>
  </article>`
}

/** Finaliza a rodada e mostra o resumo. */
function finishRound(area) {
  const answers = Object.values(session.answers)
  const total = session.questions.length
  const answered = answers.length

  if (answered < total) {
    const pending = total - answered
    const go = window.confirm(
      `Você ainda não respondeu ${pending} ${pluralize(pending, 'questão', 'questões')}. Deseja finalizar assim mesmo?`,
    )
    if (!go) return
  }

  const correctAnswers = answers.filter((answer) => answer.correct).length
  const scorePercent = total > 0 ? Math.round((correctAnswers / total) * 1000) / 10 : 0
  const elapsedSeconds = Math.round((Date.now() - session.startedAt) / 1000)

  recordAttempt({
    source: 'exercicios',
    questionIds: session.questions.map((question) => question.id),
    answers,
    elapsedSeconds,
    difficulty: session.filters.difficulty,
    topicIds: session.filters.topics,
  })

  session.active = false

  const byTopic = new Map()
  for (const answer of answers) {
    const question = session.questions.find((item) => item.id === answer.questionId)
    if (!question) continue
    const bucket = byTopic.get(question.topic) ?? { topic: question.topic, total: 0, correct: 0 }
    bucket.total += 1
    if (answer.correct) bucket.correct += 1
    byTopic.set(question.topic, bucket)
  }

  area.innerHTML = `
  <div class="card card--pad-lg">
    <div class="score-hero">
      <p class="mb-0" style="opacity:.9">Nota da rodada</p>
      <div class="score-hero__value">${scorePercent}%</div>
      <p class="mb-0">${correctAnswers} de ${total} acertos · ${elapsedSeconds}s</p>
    </div>

    <h3 class="mt-3">Revisão comentada</h3>
    <div class="stack stack--sm">
      ${session.questions
        .map((question, index) => {
          const answer = session.answers[question.id]
          return `
        <div class="card card--flat" style="background:var(--surface-2)">
          <div class="row" style="gap:.4rem;margin-bottom:.4rem">
            <span class="badge badge--${answer?.correct ? 'facil' : 'dificil'}">
              ${answer?.correct ? 'Acertou' : 'Errou'}
            </span>
            <span class="badge badge--outline">${index + 1}</span>
          </div>
          <strong class="text-sm">${escapeHtml(question.prompt)}</strong>
          <p class="text-sm mt-1 mb-0">${escapeHtml(question.explanation)}</p>
          ${
            !answer?.correct && (question.relatedLessons ?? []).length > 0
              ? `<p class="text-xs text-muted mt-1 mb-0">Revise:
                  <a href="#/aula/${question.relatedLessons[0]}">${escapeHtml(
                    LESSON_BY_ID[question.relatedLessons[0]]?.title ?? 'aula relacionada',
                  )}</a></p>`
              : ''
          }
        </div>`
        })
        .join('')}
    </div>

    ${
      byTopic.size > 0
        ? `<h3 class="mt-3">Desempenho por assunto</h3>
          <ul class="list">
            ${Array.from(byTopic.values())
              .map(
                (bucket) => `
              <li class="list__item">
                <span style="flex:1">${escapeHtml(TOPIC_BY_ID[bucket.topic]?.title ?? bucket.topic)}</span>
                <div class="progress" style="width:9rem"><div class="progress__bar" style="width:${
                  bucket.total > 0 ? (bucket.correct / bucket.total) * 100 : 0
                }%"></div></div>
                <strong class="text-sm" style="min-width:3rem;text-align:right">
                  ${bucket.correct}/${bucket.total}
                </strong>
              </li>`,
              )
              .join('')}
          </ul>`
        : ''
    }

    <div class="row mt-3">
      <button class="btn btn--primary" id="round-restart" type="button">${icon('rotate', { size: 16 })} Nova rodada</button>
      <a class="btn btn--ghost" href="#/simulados">Montar um simulado</a>
    </div>
  </div>`

  document.getElementById('round-restart')?.addEventListener('click', () => {
    area.innerHTML = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

/** Rótulos auxiliares. */
function difficultyText(difficulty) {
  return { facil: 'Fácil', medio: 'Média', dificil: 'Difícil' }[difficulty] ?? 'Geral'
}
