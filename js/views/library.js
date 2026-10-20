/**
 * Biblioteca de Biologia: as dez trilhas e as aulas de cada trilha.
 */

import { TOPICS, TOPIC_BY_ID } from '../data/topics.js'
import { QUESTION_BY_ID, QUESTION_COUNT_BY_TOPIC } from '../data/questions.js'
import { getLessonsByTopic } from '../data/lessons.js'
import { topicProgress } from '../lib/progress.js'
import { getState } from '../lib/store.js'
import { icon } from '../lib/icons.js'
import { escapeHtml, formatDuration, pluralize } from '../lib/utils.js'

export default function library({ params = [] } = {}) {
  const state = getState()
  const topicId = params[0] ?? null

  if (topicId && !TOPIC_BY_ID[topicId]) {
    return notFoundTopic()
  }

  const totalLessons = TOPICS.reduce((sum, topic) => sum + getLessonsByTopic(topic.id).length, 0)

  return `
  <section class="stack">
    <header class="row row--between">
      <div>
        <h1 class="mb-0">Biblioteca de Biologia</h1>
        <p class="text-muted mb-0">
          ${TOPICS.length} trilhas · ${totalLessons} aulas completas · ${Object.values(
            QUESTION_COUNT_BY_TOPIC,
          ).reduce((a, b) => a + b, 0)} questões no banco
        </p>
      </div>
      <a class="btn btn--ghost btn--sm" href="#/dashboard">${icon('arrowLeft', { size: 16 })} Voltar ao painel</a>
    </header>

    ${
      topicId ? renderTopicDetail(topicId, state) : renderTrackGrid(state)
    }
  </section>`
}

/** Grade com todas as trilhas. */
function renderTrackGrid(state) {
  return `
  <div class="grid grid--3">
    ${TOPICS.map((topic) => {
      const progress = topicProgress(topic.id, state)
      const lessons = getLessonsByTopic(topic.id)
      return `
      <a class="card card--hover track-card" href="#/biblioteca/${topic.id}"
         style="text-decoration:none;color:inherit">
        <div class="track-card__art" style="background:linear-gradient(135deg, ${topic.color}22, ${topic.color}55)">
          ${icon(topic.icon, { size: 56, className: 'stat__icon' })}
        </div>
        <div class="track-card__body">
          <div class="track-card__meta">
            <span class="badge badge--${topic.difficulty}">${difficultyText(topic.difficulty)}</span>
            <span class="badge badge--outline">${lessons.length} ${pluralize(lessons.length, 'aula', 'aulas')}</span>
          </div>
          <h3 class="mb-0">${escapeHtml(topic.title)}</h3>
          <p class="text-sm text-muted" style="margin:0;flex:1">${escapeHtml(topic.description)}</p>
          <div>
            <div class="progress"><div class="progress__bar" style="width:${progress.percent}%"></div></div>
            <p class="text-xs text-muted" style="margin:.35rem 0 0">
              ${progress.completed}/${progress.total} concluídas · ${progress.percent}%
            </p>
          </div>
        </div>
      </a>`
    }).join('')}
  </div>`
}

/** Detalhe de uma trilha com a lista de aulas. */
function renderTopicDetail(topicId, state) {
  const topic = TOPIC_BY_ID[topicId]
  const lessons = getLessonsByTopic(topicId)
  const progress = topicProgress(topicId, state)
  const questionCount = QUESTION_COUNT_BY_TOPIC[topicId] ?? 0

  return `
  <nav aria-label="Trilha de navegação" class="row" style="gap:.4rem;font-size:.85rem">
    <a class="btn btn--ghost btn--sm" href="#/biblioteca">${icon('arrowLeft', { size: 16 })} Todas as trilhas</a>
  </nav>

  <div class="card lesson__hero" style="background:linear-gradient(135deg, ${topic.color}, ${topic.color}cc)">
    <div class="row row--between">
      <div>
        <div class="row" style="gap:.5rem;margin-bottom:.5rem">
          ${icon(topic.icon, { size: 20 })}
          <span class="badge" style="background:rgba(255,255,255,.22);color:#fff">${difficultyText(topic.difficulty)}</span>
        </div>
        <h1 class="mb-0" style="color:#fff">${escapeHtml(topic.title)}</h1>
        <p style="margin:.5rem 0 0;max-width:44rem;color:rgba(255,255,255,.9)">${escapeHtml(topic.longDescription)}</p>
      </div>
      <div class="ring" style="--value:${progress.percent};--size:7rem;flex:none;background:conic-gradient(#fff ${progress.percent}%, rgba(255,255,255,.25) 0)">
        <span class="ring__label" style="color:#fff">${progress.percent}%</span>
      </div>
    </div>
  </div>

  <div class="grid grid--4">
    ${miniStat('book', 'Aulas na trilha', lessons.length)}
    ${miniStat('check', 'Concluídas', `${progress.completed}/${progress.total}`)}
    ${miniStat('pencil', 'Questões', questionCount)}
    ${miniStat('target', 'Precisão média', precisionForTopic(state, topicId))}
  </div>

  <section class="stack stack--sm">
    ${lessons
      .map((lesson, index) => {
        const lessonProgress = state.lessonProgress?.[lesson.id]
        const completed = Boolean(lessonProgress?.completed)
        return `
      <a class="card card--hover row" href="#/aula/${lesson.id}"
         style="text-decoration:none;color:inherit;gap:1rem">
        <span class="list__icon" style="width:2.75rem;height:2.75rem;${
          completed ? 'background:var(--success-soft);color:var(--success)' : ''
        }">
          ${completed ? icon('check', { size: 18 }) : String(index + 1)}
        </span>
        <span style="flex:1;min-width:0">
          <span style="font-family:var(--font-display);font-weight:700">${escapeHtml(lesson.title)}</span>
          <span class="text-sm text-muted" style="display:block;margin-top:.15rem">${escapeHtml(lesson.summary)}</span>
          <span class="row" style="gap:.35rem;margin-top:.45rem">
            <span class="badge badge--${lesson.difficulty}">${difficultyText(lesson.difficulty)}</span>
            <span class="badge badge--outline">${icon('clock', { size: 12 })} ${lesson.estimatedMinutes} min</span>
            <span class="badge badge--outline">${lesson.quizQuestionIds.length} questões no quiz</span>
            ${
              lessonProgress?.bestScore != null
                ? `<span class="badge badge--info">Melhor: ${lessonProgress.bestScore}%</span>`
                : ''
            }
          </span>
        </span>
        ${icon('chevronRight', { size: 20, className: 'text-muted' })}
      </a>`
      })
      .join('')}
  </section>

  <div class="row">
    <a class="btn btn--primary" href="#/exercicios?topico=${topicId}">${icon('pencil', { size: 18 })} Exercícios de ${escapeHtml(topic.title)}</a>
    <a class="btn btn--ghost" href="#/simulados?topico=${topicId}">${icon('clipboard', { size: 18 })} Simular prova</a>
    <a class="btn btn--ghost" href="#/flashcards?topico=${topicId}">${icon('cards', { size: 18 })} Flashcards</a>
  </div>`
}

/** Estatística compacta. */
function miniStat(iconName, label, value) {
  return `
  <div class="card stat">
    <div class="row" style="gap:.4rem">
      ${icon(iconName, { size: 16, className: 'stat__icon' })}
      <span class="stat__label">${label}</span>
    </div>
    <span class="stat__value" style="font-size:1.4rem">${value}</span>
  </div>`
}

/** Precisão média de um assunto a partir das tentativas. */
function precisionForTopic(state, topicId) {
  let total = 0
  let correct = 0
  for (const attempt of state.attempts ?? []) {
    for (const answer of attempt.answers ?? []) {
      const question = QUESTION_BY_ID[answer.questionId]
      if (!question || question.topic !== topicId) continue
      total += 1
      if (answer.correct) correct += 1
    }
  }
  if (total === 0) return '—'
  return `${Math.round((correct / total) * 100)}%`
}

/** Texto legível da dificuldade. */
function difficultyText(difficulty) {
  return { facil: 'Fácil', medio: 'Média', dificil: 'Difícil' }[difficulty] ?? 'Geral'
}

/** Trilha inexistente. */
function notFoundTopic() {
  return `
  <div class="card empty">
    ${icon('info', { size: 48, className: 'empty__icon' })}
    <p class="empty__title">Trilha não encontrada</p>
    <p>O endereço acessado não corresponde a nenhuma trilha de conteúdo.</p>
    <a class="btn btn--primary btn--sm" href="#/biblioteca">Ver todas as trilhas</a>
  </div>`
}

/** Tempo estimado somado das aulas de uma trilha. */
export function topicStudyTime(topicId) {
  const lessons = getLessonsByTopic(topicId)
  const minutes = lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0)
  return formatDuration(minutes * 60)
}
