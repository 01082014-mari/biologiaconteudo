/**
 * Flashcards com repetição espaçada.
 *
 * Cada cartão tem frente e verso. A avaliação (Errei, Difícil, Bom, Fácil)
 * define o agendamento da próxima revisão pelo algoritmo de repetição
 * espaçada descrito em `js/lib/srs.js`.
 */

import { FLASHCARDS, getFlashcardsByTopic } from '../data/flashcards.js'
import { TOPICS, TOPIC_BY_ID } from '../data/topics.js'
import { reviewFlashcard } from '../lib/actions.js'
import { getState } from '../lib/store.js'
import { RATING_LABELS, createSchedule, scheduleCard, summarizeDeck } from '../lib/srs.js'
import { icon } from '../lib/icons.js'
import { escapeHtml, formatDateTime, pluralize } from '../lib/utils.js'

const session = {
  topicId: null,
  queue: [],
  index: 0,
  flipped: false,
  reviewed: 0,
}

export default function flashcards({ hash = {} } = {}) {
  const query = new URLSearchParams(hash?.query ?? '')
  const topicFromUrl = query.get('topico')
  if (topicFromUrl && TOPIC_BY_ID[topicFromUrl]) session.topicId = topicFromUrl

  const state = getState()
  const schedules = state.flashcardSchedules ?? {}

  const due = Object.values(schedules).filter((schedule) => schedule.dueAt <= Date.now())
  const summary = summarizeDeck(schedules)

  const byTopic = TOPICS.map((topic) => {
    const cards = getFlashcardsByTopic(topic.id)
    const topicDue = cards.filter((card) => {
      const schedule = schedules[card.id]
      return !schedule || schedule.dueAt <= Date.now()
    }).length
    return { topic, total: cards.length, due: topicDue }
  }).filter((item) => item.total > 0)

  const recent = (state.flashcardReviews ?? []).slice(-8).reverse()

  return `
  <section class="stack">
    <header class="row row--between">
      <div>
        <h1 class="mb-0">Flashcards</h1>
        <p class="text-muted mb-0">Revisão espaçada com agendamento automático</p>
      </div>
      <button class="btn btn--primary" id="start-review" type="button">
        ${icon('play', { size: 18 })} Revisar pendentes${due.length > 0 ? ` (${due.length})` : ''}
      </button>
    </header>

    <div class="grid grid--4">
      ${statCard('cards', 'Total de cartões', FLASHCARDS.length, 'no banco didático')}
      ${statCard('clock', 'Pendentes', due.length, 'aguardando revisão')}
      ${statCard('brain', 'Dominados', summary.mastered, 'com intervalo longo')}
      ${statCard('history', 'Revisados', (state.flashcardReviews ?? []).length, 'no histórico')}
    </div>

    <div id="review-area"></div>

    <div class="grid grid--sidebar">
      <div class="stack">
        <section class="card">
          <h2 class="card__title">Revisão por assunto</h2>
          <p class="card__subtitle">Escolha uma trilha para praticar com foco</p>
          <div class="stack stack--sm mt-2">
            ${byTopic
              .map(
                (item) => `
              <button class="row row--between" type="button" data-topic="${item.topic.id}"
                style="width:100%;background:none;border:none;cursor:pointer;text-align:left;padding:.35rem 0">
                <span>
                  <strong class="text-sm">${escapeHtml(item.topic.title)}</strong>
                  <br />
                  <span class="text-xs text-muted">${item.total} ${pluralize(item.total, 'cartão', 'cartões')}</span>
                </span>
                <span class="badge ${item.due > 0 ? 'badge--primary' : 'badge--outline'}">
                  ${item.due > 0 ? `${item.due} pendente${item.due === 1 ? '' : 's'}` : 'em dia'}
                </span>
              </button>`,
              )
              .join('')}
          </div>
        </section>

        <section class="card">
          <h2 class="card__title">Histórico de revisões</h2>
          ${
            recent.length > 0
              ? `<ul class="list mt-2">
                  ${recent
                    .map(
                      (review) => `
                    <li class="list__item">
                      <span class="list__icon">${icon('cards', { size: 15 })}</span>
                      <span style="flex:1">
                        <span class="text-sm">${escapeHtml(
                          FLASHCARDS.find((card) => card.id === review.flashcardId)?.front?.slice(0, 70) ?? 'Cartão',
                        )}${review.flashcardId ? '' : ''}</span>
                        <br />
                        <span class="text-xs text-muted">
                          ${escapeHtml(formatDateTime(review.reviewedAt))} · próxima em ${review.nextIntervalDays} ${pluralize(
                            review.nextIntervalDays,
                            'dia',
                            'dias',
                          )}
                        </span>
                      </span>
                      <span class="badge badge--outline">${escapeHtml(RATING_LABELS[review.rating])}</span>
                    </li>`,
                    )
                    .join('')}
                </ul>`
              : `<div class="empty">
                  ${icon('cards', { size: 44, className: 'empty__icon' })}
                  <p class="empty__title">Nenhuma revisão registrada</p>
                  <p>Comece revisando os cartões pendentes para construir sua memória de longo prazo.</p>
                </div>`
          }
        </section>
      </div>

      <aside class="stack">
        <section class="card">
          <h2 class="card__title">Como funciona</h2>
          <ul class="objectives mt-2">
            <li>${icon('rotate', { size: 15 })}<span>Cada cartão é reexibido em intervalos crescentes.</span></li>
            <li>${icon('circleX', { size: 15 })}<span><strong>Errei</strong>: volta em 10 minutos.</span></li>
            <li>${icon('alert', { size: 15 })}<span><strong>Difícil</strong>: intervalo encurtado.</span></li>
            <li>${icon('check', { size: 15 })}<span><strong>Bom</strong>: intervalo multiplicado.</span></li>
            <li>${icon('star', { size: 15 })}<span><strong>Fácil</strong>: intervalo ampliado.</span></li>
          </ul>
        </section>
      </aside>
    </div>
  </section>`
}

/** Liga os interativos da página. */
export function mount() {
  const area = document.getElementById('review-area')

  document.getElementById('start-review')?.addEventListener('click', () => {
    startSession(null, area)
  })

  document.querySelectorAll('[data-topic]').forEach((button) => {
    button.addEventListener('click', () => {
      startSession(button.dataset.topic, area)
    })
  })
}

/** Inicia uma sessão de revisão. */
function startSession(topicId, area) {
  const state = getState()
  const schedules = state.flashcardSchedules ?? {}
  const cards = topicId ? getFlashcardsByTopic(topicId) : FLASHCARDS

  const due = cards.filter((card) => {
    const schedule = schedules[card.id]
    return !schedule || schedule.dueAt <= Date.now()
  })

  const pool = due.length > 0 ? due : cards

  if (pool.length === 0) {
    area.innerHTML = `
      <div class="card empty">
        ${icon('check', { size: 44, className: 'empty__icon' })}
        <p class="empty__title">Nenhum cartão pendente</p>
        <p>Você está em dia com as revisões. Volte mais tarde para o próximo ciclo.</p>
      </div>`
    return
  }

  session.topicId = topicId
  session.queue = pool
  session.index = 0
  session.flipped = false
  session.reviewed = 0

  renderCard(area)
}

/** Renderiza o cartão atual. */
function renderCard(area) {
  const card = session.queue[session.index]
  if (!card) return

  area.innerHTML = `
  <div class="card card--pad-lg">
    <div class="row row--between mb-3">
      <span class="badge badge--primary">Cartão ${session.index + 1} de ${session.queue.length}</span>
      <span class="badge badge--outline">${escapeHtml(TOPIC_BY_ID[card.topic]?.title ?? '')}</span>
    </div>

    <div class="flashcard ${session.flipped ? 'is-flipped' : ''}" id="flashcard">
      <div class="flashcard__inner">
        <div class="flashcard__face flashcard__face--front">
          <span class="badge badge--primary">Pergunta</span>
          <p class="flashcard__prompt">${escapeHtml(card.front)}</p>
          ${
            card.hint && !session.flipped
              ? `<p class="text-xs text-muted mb-0">${icon('bulb', { size: 14 })} ${escapeHtml(card.hint)}</p>`
              : ''
          }
          <button class="btn btn--ghost btn--sm" id="flip-card" type="button" style="align-self:center">
            Ver resposta
          </button>
        </div>
        <div class="flashcard__face flashcard__face--back">
          <span class="badge" style="background:rgba(255,255,255,.25);color:#fff">Resposta</span>
          <p class="flashcard__answer">${escapeHtml(card.back)}</p>
          ${
            card.hint
              ? `<p class="text-xs mb-0" style="opacity:.8">${icon('bulb', { size: 14 })} ${escapeHtml(card.hint)}</p>`
              : ''
          }
        </div>
      </div>
    </div>

    ${
      session.flipped
        ? `<div class="rating-grid mt-3" id="rating-grid">
            ${['errei', 'dificil', 'bom', 'facil']
              .map(
                (rating) => `
              <button class="rating-btn" type="button" data-rating="${rating}">
                ${icon(ratingIcon(rating), { size: 18 })}
                <span>${RATING_LABELS[rating]}</span>
              </button>`,
              )
              .join('')}
          </div>`
        : '<p class="text-center text-sm text-muted mt-3">Clique em <strong>Ver resposta</strong> ou use a tecla Espaço.</p>'
    }
  </div>`

  document.getElementById('flip-card')?.addEventListener('click', () => {
    session.flipped = true
    renderCard(area)
  })

  document.getElementById('rating-grid')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-rating]')
    if (!button) return
    rate(button.dataset.rating, area)
  })
}

/** Registra a avaliação do cartão. */
function rate(rating, area) {
  const card = session.queue[session.index]
  const state = getState()
  const current = state.flashcardSchedules?.[card.id] ?? createSchedule(card.id)
  const next = scheduleCard(current, rating, Date.now())

  reviewFlashcard(card.id, card.topic, rating, next)

  session.reviewed += 1
  session.flipped = false
  session.index += 1

  if (session.index >= session.queue.length) {
    area.innerHTML = `
      <div class="card empty">
        ${icon('award', { size: 48, className: 'empty__icon' })}
        <p class="empty__title">Revisão concluída!</p>
        <p>Você revisou ${session.reviewed} ${pluralize(session.reviewed, 'cartão', 'cartões')}. A próxima rodada já está agendada.</p>
        <div class="row">
          <button class="btn btn--primary btn--sm" id="review-again" type="button">Revisar novamente</button>
          <a class="btn btn--ghost btn--sm" href="#/progresso">Ver meu progresso</a>
        </div>
      </div>`
    document.getElementById('review-again')?.addEventListener('click', () => startSession(session.topicId, area))
    return
  }

  renderCard(area)
}

/** Ícone de cada avaliação. */
function ratingIcon(rating) {
  return { errei: 'circleX', dificil: 'alert', bom: 'check', facil: 'star' }[rating] ?? 'check'
}

/** Cartão de estatística. */
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
