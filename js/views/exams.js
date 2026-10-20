/**
 * Simulados: montagem de provas personalizadas, aplicação com cronômetro
 * opcional e resultado comentado com recomendações de revisão.
 */

import { TOPICS, TOPIC_BY_ID } from '../data/topics.js'
import { QUESTIONS } from '../data/questions.js'
import { LESSON_BY_ID } from '../data/lessons.js'
import { availability, buildExam } from '../lib/exam.js'
import { recordAttempt } from '../lib/actions.js'
import { getState } from '../lib/store.js'
import { isAnswerCorrect, prepareQuestion } from '../lib/grading.js'
import { buildRecommendations, buildSnapshot } from '../lib/progress.js'
import { icon } from '../lib/icons.js'
import { createRandom, escapeHtml, formatClock, formatDuration, pluralize } from '../lib/utils.js'

const QUANTITIES = [5, 10, 20, 30]
const DIFFICULTIES = [
  { id: 'mista', label: 'Mista' },
  { id: 'facil', label: 'Fácil' },
  { id: 'medio', label: 'Média' },
  { id: 'dificil', label: 'Difícil' },
]
const TIMERS = [
  { id: 'null', label: 'Sem cronômetro' },
  { id: '5', label: '5 minutos' },
  { id: '10', label: '10 minutos' },
  { id: '20', label: '20 minutos' },
  { id: '30', label: '30 minutos' },
]

const session = {
  mode: 'builder',
  config: { topicIds: [], quantity: 10, difficulty: 'mista', timerMinutes: 10, shuffleOptions: true },
  questions: [],
  answers: {},
  currentIndex: 0,
  startedAt: 0,
  elapsedSeconds: 0,
  timerId: null,
  finished: false,
  result: null,
  warnings: [],
}

export default function exams({ hash = {} } = {}) {
  const query = new URLSearchParams(hash?.query ?? '')
  const topicFromUrl = query.get('topico')
  if (topicFromUrl && TOPIC_BY_ID[topicFromUrl] && !session.config.topicIds.includes(topicFromUrl)) {
    session.config.topicIds = [topicFromUrl]
  }

  if (session.mode === 'builder') return renderBuilder()
  if (session.mode === 'runner') return renderRunner()
  return renderResult()
}

/* ------------------------------------------------------------------ */
/* Montagem                                                             */
/* ------------------------------------------------------------------ */

function renderBuilder() {
  const state = getState()
  const previous = (state.exams ?? []).slice(-5).reverse()

  return `
  <section class="stack">
    <header class="row row--between">
      <div>
        <h1 class="mb-0">Simulados</h1>
        <p class="text-muted mb-0">Monte uma prova personalizada, com ou sem cronômetro</p>
      </div>
      ${
        session.mode !== 'builder'
          ? '<button class="btn btn--ghost btn--sm" id="back-builder">Novo simulado</button>'
          : ''
      }
    </header>

    <div class="grid grid--sidebar">
      <div class="stack">
        <section class="card">
          <h2 class="section-title">${icon('filter', { className: 'section-title__icon' })} Configuração da prova</h2>

          <div class="stack mt-3">
            <div>
              <span class="field__label">Assuntos</span>
              <p class="field__hint">Deixe todos desmarcados para sortear de toda a plataforma.</p>
              <div class="chip-group mt-1" id="exam-topics">
                ${TOPICS.map(
                  (topic) => `
                  <button class="chip" type="button" data-topic="${topic.id}"
                    aria-pressed="${session.config.topicIds.includes(topic.id)}">
                    ${escapeHtml(topic.title)}
                    <span class="chip__count">${QUESTIONS.filter((q) => q.topic === topic.id).length}</span>
                  </button>`,
                ).join('')}
              </div>
            </div>

            <div>
              <span class="field__label">Quantidade de questões</span>
              <div class="chip-group mt-1" id="exam-quantity">
                ${QUANTITIES.map(
                  (quantity) => `
                  <button class="chip" type="button" data-quantity="${quantity}"
                    aria-pressed="${session.config.quantity === quantity}">${quantity}</button>`,
                ).join('')}
              </div>
            </div>

            <div>
              <span class="field__label">Dificuldade</span>
              <div class="chip-group mt-1" id="exam-difficulty">
                ${DIFFICULTIES.map(
                  (item) => `
                  <button class="chip" type="button" data-difficulty="${item.id}"
                    aria-pressed="${session.config.difficulty === item.id}">${item.label}</button>`,
                ).join('')}
              </div>
            </div>

            <div>
              <span class="field__label">Cronômetro</span>
              <div class="chip-group mt-1" id="exam-timer">
                ${TIMERS.map(
                  (item) => `
                  <button class="chip" type="button" data-timer="${item.id}"
                    aria-pressed="${String(session.config.timerMinutes) === item.id}">${item.label}</button>`,
                ).join('')}
              </div>
            </div>

            <label class="check">
              <input type="checkbox" id="exam-shuffle" ${session.config.shuffleOptions ? 'checked' : ''} />
              <span>Embaralhar a ordem das alternativas</span>
            </label>
          </div>

          <div class="alert mt-3" id="availability">
            ${icon('info', { size: 18 })}
            <div id="availability-text"></div>
          </div>

          <button class="btn btn--primary btn--lg btn--block mt-3" id="start-exam" type="button">
            ${icon('play', { size: 18 })} Iniciar simulado
          </button>
        </section>
      </div>

      <aside class="stack">
        <section class="card">
          <h2 class="card__title">Simulados anteriores</h2>
          ${
            previous.length > 0
              ? `<ul class="list mt-2">
                  ${previous
                    .map(
                      (exam) => `
                    <li class="list__item">
                      <span class="list__icon" style="${
                        exam.scorePercent >= 70
                          ? 'background:var(--success-soft);color:var(--success)'
                          : 'background:var(--warning-soft);color:var(--warning)'
                      }">${icon('percent', { size: 15 })}</span>
                      <span style="flex:1">
                        <strong class="text-sm">${exam.correctAnswers}/${exam.totalQuestions}</strong>
                        <br />
                        <span class="text-xs text-muted">${escapeHtml(formatDuration(exam.elapsedSeconds))} · ${escapeHtml(
                          new Date(exam.completedAt).toLocaleDateString('pt-BR'),
                        )}</span>
                      </span>
                      <span class="stat__value" style="font-size:1.2rem;color:var(--primary)">${exam.scorePercent}%</span>
                    </li>`,
                    )
                    .join('')}
                </ul>`
              : `<div class="empty">
                  ${icon('clipboard', { size: 44, className: 'empty__icon' })}
                  <p class="empty__title">Nenhum simulado feito ainda</p>
                  <p>Monte o seu primeiro simulado ao lado.</p>
                </div>`
          }
        </section>
      </aside>
    </div>
  </section>`
}

/* ------------------------------------------------------------------ */
/* Aplicação                                                            */
/* ------------------------------------------------------------------ */

function renderRunner() {
  const total = session.questions.length
  const answeredCount = Object.keys(session.answers).length

  return `
  <section class="stack">
    <header class="card">
      <div class="row row--between">
        <div>
          <h1 class="card__title mb-0">Simulado em andamento</h1>
          <p class="card__subtitle mb-0">
            Questão ${session.currentIndex + 1} de ${total} · ${answeredCount} respondida${answeredCount === 1 ? '' : 's'}
          </p>
        </div>
        <div class="row">
          ${
            session.config.timerMinutes
              ? `<span class="exam-timer" id="exam-timer" role="timer" aria-live="off">--:--</span>`
              : `<span class="badge badge--outline" id="exam-clock">${formatClock(session.elapsedSeconds)}</span>`
          }
          <button class="btn btn--danger btn--sm" id="finish-exam" type="button">Finalizar</button>
        </div>
      </div>
      <div class="progress mt-2"><div class="progress__bar" style="width:${
        total > 0 ? (answeredCount / total) * 100 : 0
      }%"></div></div>
    </header>

    <div class="grid grid--sidebar">
      <div>
        <div class="card card--pad-lg" id="exam-question">
          ${renderExamQuestion(session.questions[session.currentIndex], session.currentIndex, total)}
        </div>
        <div class="row mt-3" style="justify-content:space-between">
          <button class="btn btn--ghost" id="exam-prev" type="button" ${session.currentIndex === 0 ? 'disabled' : ''}>
            ${icon('chevronLeft', { size: 16 })} Anterior
          </button>
          <button class="btn btn--primary" id="exam-next" type="button">
            ${session.currentIndex === total - 1 ? 'Revisar e finalizar' : 'Próxima'} ${icon('chevronRight', { size: 16 })}
          </button>
        </div>
      </div>

      <aside class="stack">
        <section class="card">
          <h2 class="card__title">Navegação</h2>
          <p class="card__subtitle">Clique para ir a qualquer questão</p>
          <div class="question-nav mt-2" id="question-nav">
            ${session.questions
              .map(
                (question, index) => `
              <button class="question-nav__item ${session.answers[question.id] ? 'is-answered' : ''} ${
                index === session.currentIndex ? 'is-current' : ''
              }" type="button" data-goto="${index}" aria-label="Ir para a questão ${index + 1}">
                ${index + 1}
              </button>`,
              )
              .join('')}
          </div>
          <div class="row mt-3">
            <span class="badge badge--primary">${answeredCount} respondidas</span>
            <span class="badge badge--outline">${total - answeredCount} em branco</span>
          </div>
        </section>

        <section class="card">
          <h2 class="card__title">Como funciona</h2>
          <ul class="objectives mt-2">
            <li>${icon('info', { size: 15 })}<span>Você pode voltar e revisar qualquer questão.</span></li>
            <li>${icon('info', { size: 15 })}<span>As respostas só são corrigidas ao finalizar.</span></li>
            <li>${icon('info', { size: 15 })}<span>Ao finalizar, todas as questões são comentadas.</span></li>
          </ul>
        </section>
      </aside>
    </div>
  </section>`
}

/** Cartão da questão do simulado. */
function renderExamQuestion(question, index, total) {
  return `
  <div class="row" style="gap:.4rem;margin-bottom:.7rem">
    <span class="badge badge--primary">Questão ${index + 1} de ${total}</span>
    <span class="badge badge--${question.difficulty}">${difficultyText(question.difficulty)}</span>
    <span class="badge badge--outline">${escapeHtml(TOPIC_BY_ID[question.topic]?.title ?? '')}</span>
  </div>
  <p style="font-size:1.05rem;font-weight:600;margin-bottom:1rem">${escapeHtml(question.prompt)}</p>
  <div class="stack stack--sm" role="radiogroup" aria-label="Alternativas">
    ${question.options
      .map(
        (option, optionIndex) => `
      <button class="option ${session.answers[question.id]?.selectedOptionId === option.id ? 'is-selected' : ''}"
        type="button" role="radio" aria-checked="${
          session.answers[question.id]?.selectedOptionId === option.id ? 'true' : 'false'
        }" data-option="${option.id}" data-question="${question.id}">
        <span class="option__marker">${String.fromCharCode(65 + optionIndex)}</span>
        <span class="option__text">${escapeHtml(option.text)}</span>
      </button>`,
      )
      .join('')}
  </div>`
}

/* ------------------------------------------------------------------ */
/* Resultado                                                            */
/* ------------------------------------------------------------------ */

function renderResult() {
  const result = session.result
  if (!result) {
    return `
    <div class="card empty">
      ${icon('info', { size: 48, className: 'empty__icon' })}
      <p class="empty__title">Nenhum resultado disponível</p>
      <a class="btn btn--primary btn--sm" href="#/simulados">Montar um simulado</a>
    </div>`
  }

  const state = getState()
  const snapshot = buildSnapshot(state)
  const recommendations = buildRecommendations(snapshot, state).slice(0, 3)

  return `
  <section class="stack">
    <header class="row row--between">
      <div>
        <h1 class="mb-0">Resultado do simulado</h1>
        <p class="text-muted mb-0">${escapeHtml(new Date(result.completedAt).toLocaleString('pt-BR'))}</p>
      </div>
      <button class="btn btn--primary" id="new-exam" type="button">${icon('rotate', { size: 16 })} Novo simulado</button>
    </header>

    <div class="grid grid--4">
      ${statCard('target', 'Nota', `${result.scorePercent}%`, gradeText(result.scorePercent))}
      ${statCard('percent', 'Acertos', `${result.correctAnswers}/${result.totalQuestions}`, `${result.totalQuestions - result.correctAnswers} erros`)}
      ${statCard('clock', 'Tempo utilizado', formatDuration(result.elapsedSeconds), session.config.timerMinutes ? `limite de ${session.config.timerMinutes} min` : 'sem limite')}
      ${statCard('zap', 'XP ganho', `+${result.xpEarned ?? 0}`, 'nível atual mantido no painel')}
    </div>

    <div class="grid grid--sidebar">
      <div class="stack">
        <section class="card">
          <h2 class="section-title">${icon('listCheck', { className: 'section-title__icon' })} Correção comentada</h2>
          <div class="stack stack--sm mt-2">
            ${result.answers
              .map((answer, index) => {
                const question = QUESTIONS.find((item) => item.id === answer.questionId)
                if (!question) return ''
                const chosen = question.options.find((option) => option.id === answer.selectedOptionId)
                return `
                <div class="card card--flat" style="background:var(--surface-2)">
                  <div class="row" style="gap:.4rem;margin-bottom:.45rem">
                    <span class="badge badge--${answer.correct ? 'facil' : 'dificil'}">
                      ${answer.correct ? 'Acertou' : 'Errou'}
                    </span>
                    <span class="badge badge--outline">Questão ${index + 1}</span>
                    <span class="badge badge--outline">${escapeHtml(TOPIC_BY_ID[question.topic]?.title ?? '')}</span>
                  </div>
                  <strong class="text-sm">${escapeHtml(question.prompt)}</strong>
                  ${
                    !answer.correct
                      ? `<p class="text-sm mt-1 mb-0"><span style="color:var(--danger)">Sua resposta: ${escapeHtml(
                          chosen?.text ?? '—',
                        )}</span></p>`
                      : ''
                  }
                  <p class="text-sm mt-1"><strong>Gabarito:</strong> ${escapeHtml(
                    question.options.find((option) => option.id === question.correct)?.text ?? '—',
                  )}</p>
                  <p class="text-sm mt-1 mb-0 text-muted">${escapeHtml(question.explanation)}</p>
                  ${
                    !answer.correct && (question.relatedLessons ?? []).length > 0
                      ? `<p class="text-xs mt-1 mb-0">Revise:
                          <a href="#/aula/${question.relatedLessons[0]}">${escapeHtml(
                            LESSON_BY_ID[question.relatedLessons[0]]?.title ?? 'aula relacionada',
                          )}</a></p>`
                      : ''
                  }
                </div>`
              })
              .join('')}
          </div>
        </section>
      </div>

      <aside class="stack">
        <section class="card">
          <h2 class="card__title">Desempenho por assunto</h2>
          <div class="stack stack--sm mt-2">
            ${
              result.byTopic.length > 0
                ? result.byTopic
                    .map(
                      (item) => `
              <div>
                <div class="row row--between text-sm">
                  <span>${escapeHtml(TOPIC_BY_ID[item.topic]?.title ?? item.topic)}</span>
                  <strong>${item.correct}/${item.total}</strong>
                </div>
                <div class="progress"><div class="progress__bar" style="width:${item.percent}%;
                  background:${item.percent >= 70 ? 'var(--success)' : item.percent >= 45 ? 'var(--warning)' : 'var(--danger)'}"></div></div>
              </div>`,
                    )
                    .join('')
                : '<p class="text-sm text-muted">Sem dados por assunto.</p>'
            }
          </div>
        </section>

        <section class="card">
          <h2 class="card__title">Recomendações de revisão</h2>
          <div class="stack stack--sm mt-2">
            ${
              recommendations.length > 0
                ? recommendations
                    .map(
                      (item) => `
              <div class="card card--flat" style="background:var(--surface-2)">
                <strong class="text-sm">${escapeHtml(item.title)}</strong>
                <p class="text-xs text-muted" style="margin:.25rem 0 .5rem">${escapeHtml(item.description)}</p>
                <a class="btn btn--soft btn--sm" href="${item.action.href}">${escapeHtml(item.action.label)}</a>
              </div>`,
                    )
                    .join('')
                : '<p class="text-sm text-muted">Continue praticando para receber recomendações.</p>'
            }
          </div>
        </section>
      </aside>
    </div>
  </section>`
}

/* ------------------------------------------------------------------ */
/* Interativos                                                          */
/* ------------------------------------------------------------------ */

export function mount() {
  if (session.mode === 'builder') mountBuilder()
  else if (session.mode === 'runner') mountRunner()
  else mountResult()
}

function mountBuilder() {
  const availabilityBox = document.getElementById('availability-text')

  const refreshAvailability = () => {
    const count = availability(session.config.topicIds, session.config.difficulty)
    const enough = count >= session.config.quantity
    availabilityBox.innerHTML = enough
      ? `<strong>${count} ${pluralize(count, 'questão disponível', 'questões disponíveis')}</strong> para a combinação selecionada.`
      : `<strong>Apenas ${count} ${pluralize(
          count,
          'questão disponível',
          'questões disponíveis',
        )}</strong> — o simulado será montado com ${count} ${pluralize(
          count,
          'questão',
          'questões',
        )} em vez de ${session.config.quantity}.`
    availabilityBox.parentElement.className = enough ? 'alert mt-3' : 'alert alert--warn mt-3'
  }

  document.getElementById('exam-topics')?.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-topic]')
    if (!chip) return
    const topicId = chip.dataset.topic
    const list = session.config.topicIds
    const position = list.indexOf(topicId)
    if (position >= 0) list.splice(position, 1)
    else list.push(topicId)
    chip.setAttribute('aria-pressed', String(position < 0))
    refreshAvailability()
  })

  document.getElementById('exam-quantity')?.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-quantity]')
    if (!chip) return
    session.config.quantity = Number(chip.dataset.quantity)
    document
      .querySelectorAll('#exam-quantity .chip')
      .forEach((item) => item.setAttribute('aria-pressed', String(item === chip)))
    refreshAvailability()
  })

  document.getElementById('exam-difficulty')?.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-difficulty]')
    if (!chip) return
    session.config.difficulty = chip.dataset.difficulty
    document
      .querySelectorAll('#exam-difficulty .chip')
      .forEach((item) => item.setAttribute('aria-pressed', String(item === chip)))
    refreshAvailability()
  })

  document.getElementById('exam-timer')?.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-timer]')
    if (!chip) return
    const value = chip.dataset.timer
    session.config.timerMinutes = value === 'null' ? null : Number(value)
    document
      .querySelectorAll('#exam-timer .chip')
      .forEach((item) => item.setAttribute('aria-pressed', String(item === chip)))
  })

  document.getElementById('exam-shuffle')?.addEventListener('change', (event) => {
    session.config.shuffleOptions = event.target.checked
  })

  document.getElementById('start-exam')?.addEventListener('click', () => {
    const built = buildExam({
      topicIds: session.config.topicIds,
      quantity: session.config.quantity,
      difficulty: session.config.difficulty,
      seed: `${Date.now()}`,
    })

    if (built.questions.length === 0) {
      availabilityBox.innerHTML = '<strong>Não há questões para esta combinação.</strong> Ajuste os filtros.'
      availabilityBox.parentElement.className = 'alert alert--danger mt-3'
      return
    }

    session.questions = built.questions.map((question) =>
      // `prepareQuestion` mantém o gabarito coerente após o embaralhamento.
      prepareQuestion(question, {
        shuffleOptions: session.config.shuffleOptions,
        random: createRandom(`${Date.now()}:${question.id}`),
      }),
    )
    session.warnings = built.warnings
    session.answers = {}
    session.currentIndex = 0
    session.startedAt = Date.now()
    session.elapsedSeconds = 0
    session.finished = false
    session.mode = 'runner'

    window.location.hash = '#/simulados'
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })

  refreshAvailability()
}

function mountRunner() {
  const container = document.getElementById('exam-question')

  // Seleção de alternativa
  container?.addEventListener('click', (event) => {
    const option = event.target.closest('.option')
    if (!option) return
    const questionId = option.dataset.question
    session.answers[questionId] = {
      questionId,
      selectedOptionId: option.dataset.option,
      correct: false,
      answeredAt: new Date().toISOString(),
    }
    container.querySelectorAll('.option').forEach((item) => {
      item.classList.remove('is-selected')
      item.setAttribute('aria-checked', 'false')
    })
    option.classList.add('is-selected')
    option.setAttribute('aria-checked', 'true')
    updateNav()
  })

  document.getElementById('question-nav')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-goto]')
    if (!button) return
    session.currentIndex = Number(button.dataset.goto)
    refreshQuestion()
  })

  document.getElementById('exam-prev')?.addEventListener('click', () => {
    session.currentIndex = Math.max(0, session.currentIndex - 1)
    refreshQuestion()
  })

  document.getElementById('exam-next')?.addEventListener('click', () => {
    if (session.currentIndex === session.questions.length - 1) {
      confirmFinish()
      return
    }
    session.currentIndex = Math.min(session.questions.length - 1, session.currentIndex + 1)
    refreshQuestion()
  })

  document.getElementById('finish-exam')?.addEventListener('click', confirmFinish)

  startTimer()
}

function refreshQuestion() {
  const container = document.getElementById('exam-question')
  if (!container) return
  const question = session.questions[session.currentIndex]
  container.innerHTML = renderExamQuestion(question, session.currentIndex, session.questions.length)
  const header = document.querySelector('.card__subtitle')
  if (header) {
    header.textContent = `Questão ${session.currentIndex + 1} de ${session.questions.length} · ${
      Object.keys(session.answers).length
    } respondida${Object.keys(session.answers).length === 1 ? '' : 's'}`
  }
  updateNav()
}

function updateNav() {
  document.querySelectorAll('#question-nav .question-nav__item').forEach((button, index) => {
    const question = session.questions[index]
    button.classList.toggle('is-answered', Boolean(session.answers[question?.id]))
    button.classList.toggle('is-current', index === session.currentIndex)
  })
  const bar = document.querySelector('.progress__bar')
  if (bar) {
    bar.style.width = `${(Object.keys(session.answers).length / session.questions.length) * 100}%`
  }
}

/** Cronômetro do simulado. */
function startTimer() {
  if (session.timerId) window.clearInterval(session.timerId)

  const timerElement = document.getElementById('exam-timer')
  const clockElement = document.getElementById('exam-clock')

  const tick = () => {
    session.elapsedSeconds = Math.floor((Date.now() - session.startedAt) / 1000)

    if (session.config.timerMinutes) {
      const total = session.config.timerMinutes * 60
      const remaining = total - session.elapsedSeconds
      if (timerElement) {
        timerElement.textContent = formatClock(Math.max(0, remaining))
        timerElement.classList.toggle('is-warning', remaining <= 60 && remaining > 20)
        timerElement.classList.toggle('is-danger', remaining <= 20)
      }
      if (remaining <= 0) {
        window.clearInterval(session.timerId)
        session.timerId = null
        finishExam(true)
        return
      }
    } else if (clockElement) {
      clockElement.textContent = formatClock(session.elapsedSeconds)
    }
  }

  tick()
  session.timerId = window.setInterval(tick, 1000)
}

/** Confirmação antes de finalizar. */
function confirmFinish() {
  const total = session.questions.length
  const answered = Object.keys(session.answers).length
  const pending = total - answered

  const message =
    pending > 0
      ? `Você deixou ${pending} ${pluralize(pending, 'questão', 'questões')} em branco. Deseja finalizar o simulado assim mesmo?`
      : 'Deseja finalizar o simulado e ver o resultado corrigido?'

  if (!window.confirm(message)) return
  finishExam(false)
}

/** Finaliza o simulado e grava o resultado. */
function finishExam(timeUp) {
  if (session.timerId) {
    window.clearInterval(session.timerId)
    session.timerId = null
  }

  const answers = session.questions.map((question) => {
    const given = session.answers[question.id]
    return {
      questionId: question.id,
      selectedOptionId: given?.selectedOptionId ?? '',
      correct: given ? isAnswerCorrect(question, given.selectedOptionId) : false,
      answeredAt: given?.answeredAt ?? new Date().toISOString(),
    }
  })

  const total = session.questions.length
  const correctAnswers = answers.filter((answer) => answer.correct).length
  const scorePercent = total > 0 ? Math.round((correctAnswers / total) * 1000) / 10 : 0
  const elapsedSeconds = session.config.timerMinutes
    ? Math.min(session.config.timerMinutes * 60, session.elapsedSeconds)
    : session.elapsedSeconds

  const byTopic = new Map()
  for (const answer of answers) {
    const question = session.questions.find((item) => item.id === answer.questionId)
    if (!question) continue
    const bucket = byTopic.get(question.topic) ?? { topic: question.topic, total: 0, correct: 0 }
    bucket.total += 1
    if (answer.correct) bucket.correct += 1
    byTopic.set(question.topic, bucket)
  }

  const examId = `exam_${Date.now().toString(36)}`

  recordAttempt({
    source: 'simulado',
    examId,
    questionIds: session.questions.map((question) => question.id),
    answers,
    elapsedSeconds,
    difficulty: session.config.difficulty,
    topicIds: session.config.topicIds,
  })

  session.result = {
    id: examId,
    completedAt: new Date().toISOString(),
    answers,
    totalQuestions: total,
    correctAnswers,
    scorePercent,
    elapsedSeconds,
    byTopic: Array.from(byTopic.values()).map((bucket) => ({
      ...bucket,
      percent: bucket.total > 0 ? Math.round((bucket.correct / bucket.total) * 1000) / 10 : 0,
    })),
    xpEarned: Math.round(60 * Math.max(0.3, scorePercent / 100)) + 10,
  }

  session.mode = 'result'
  session.finished = true

  if (timeUp) {
    window.alert('O tempo do simulado acabou! O resultado foi registrado.')
  }

  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

/** Liga os botões da tela de resultado. */
function mountResult() {
  document.getElementById('new-exam')?.addEventListener('click', () => {
    session.mode = 'builder'
    session.result = null
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })
}

/* ------------------------------------------------------------------ */
/* Auxiliares                                                           */
/* ------------------------------------------------------------------ */

function statCard(iconName, label, value, hint) {
  return `
  <div class="card stat">
    <div class="row" style="gap:.4rem">
      ${icon(iconName, { size: 18, className: 'stat__icon' })}
      <span class="stat__label">${label}</span>
    </div>
    <span class="stat__value">${value}</span>
    <span class="stat__hint">${hint}</span>
  </div>`
}

function difficultyText(difficulty) {
  return { facil: 'Fácil', medio: 'Média', dificil: 'Difícil' }[difficulty] ?? 'Geral'
}

function gradeText(scorePercent) {
  if (scorePercent >= 90) return 'Excelente'
  if (scorePercent >= 70) return 'Bom'
  if (scorePercent >= 50) return 'Regular'
  return 'Precisa revisar'
}
