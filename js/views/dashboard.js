/**
 * Painel inicial: visão geral do progresso, meta diária, recomendações
 * e atalhos para continuar estudando.
 */

import { ALL_LESSONS, getNextLesson } from '../data/lessons.js'
import { TOPICS } from '../data/topics.js'
import { buildRecommendations, buildSnapshot, topicProgress } from '../lib/progress.js'
import { levelProgress, totalXp } from '../lib/xp.js'
import { getState } from '../lib/store.js'
import { lineChart } from '../lib/charts.js'
import { escapeHtml, formatDuration, formatPercent, pluralize } from '../lib/utils.js'
import { icon } from '../lib/icons.js'

export default function dashboard() {
  const state = getState()
  const snapshot = buildSnapshot(state)
  const xp = totalXp(state.xpEvents)
  const level = levelProgress(xp)
  const recommendations = buildRecommendations(snapshot, state)

  const completedIds = Object.entries(state.lessonProgress ?? {})
    .filter(([, value]) => value.completed)
    .map(([id]) => id)

  const nextLesson = getNextLesson(completedIds)
  const todayKey = new Date().toISOString().slice(0, 10)
  const daily = state.dailyGoals?.[todayKey] ?? { xpEarned: 0, goalXp: state.settings?.dailyGoalXp ?? 50 }
  const dailyPercent = Math.min(100, (daily.xpEarned / (daily.goalXp || 50)) * 100)

  const performancePoints = buildPerformanceSeries(state)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

  return `
  <section class="stack">
    <div class="card lesson__hero">
      <div class="row row--between">
        <div>
          <p class="mb-0" style="opacity:.85;font-weight:600">${greeting}!</p>
          <h1 class="mb-0">${snapshot.lessonsCompleted > 0 ? 'Continue sua jornada pela Biologia' : 'Comece sua jornada pela Biologia'}</h1>
          <p style="margin:.5rem 0 0;max-width:42rem">
            ${
              snapshot.lessonsCompleted > 0
                ? `Você já concluiu ${snapshot.lessonsCompleted} ${pluralize(snapshot.lessonsCompleted, 'aula', 'aulas')} e está no nível ${level.current.level}.`
                : 'Explore trilhas de conteúdo, estude aulas completas e acompanhe sua evolução a cada etapa.'
            }
          </p>
        </div>
        ${
          nextLesson
            ? `<a class="btn btn--lg" style="background:#fff;color:var(--primary);flex:none"
                 href="#/aula/${nextLesson.id}">
                 ${icon('play', { size: 18 })} Continuar estudando
               </a>`
            : ''
        }
      </div>
    </div>

    <div class="grid grid--4">
      ${statCard('book', 'Aulas concluídas', snapshot.lessonsCompleted, `de ${ALL_LESSONS.length} disponíveis`)}
      ${statCard('pencil', 'Questões respondidas', snapshot.questionsAnswered, `${snapshot.correctAnswers} acertos`)}
      ${statCard('target', 'Taxa de acertos', formatPercent(snapshot.accuracyPercent), snapshot.questionsAnswered ? 'média geral' : 'sem dados ainda')}
      ${statCard('zap', 'XP acumulado', xp, `nível ${level.current.level} — ${level.current.title}`)}
    </div>

    <div class="grid grid--sidebar">
      <div class="stack">
        <section class="card">
          <div class="row row--between mb-2">
            <h2 class="card__title mb-0">Evolução do desempenho</h2>
            <span class="badge badge--primary">${snapshot.attempts.length} ${pluralize(snapshot.attempts.length, 'rodada', 'rodadas')}</span>
          </div>
          ${lineChart(performancePoints, { label: 'Evolução da taxa de acerto' })}
          <p class="text-xs text-muted mt-1 mb-0">
            Cada ponto representa uma rodada de exercícios ou um simulado concluído, da mais antiga para a mais recente.
          </p>
        </section>

        <section class="card">
          <h2 class="card__title">Trilhas de conteúdo</h2>
          <p class="card__subtitle">Escolha por onde começar</p>
          <div class="grid grid--3 mt-2">
            ${TOPICS.slice(0, 6)
              .map((topic) => {
                const progress = topicProgress(topic.id, state)
                return `
                <a class="card card--hover" href="#/biblioteca/${topic.id}" style="text-decoration:none;color:inherit">
                  <div class="row" style="gap:.5rem">
                    ${icon(topic.icon, { size: 20, className: 'stat__icon' })}
                    <strong style="font-family:var(--font-display)">${escapeHtml(topic.title)}</strong>
                  </div>
                  <p class="text-sm text-muted" style="margin:.35rem 0 .6rem">${escapeHtml(topic.description)}</p>
                  <div class="progress"><div class="progress__bar" style="width:${progress.percent}%"></div></div>
                  <p class="text-xs text-muted" style="margin:.4rem 0 0">
                    ${progress.completed}/${progress.total} aulas · ${progress.percent}%
                  </p>
                </a>`
              })
              .join('')}
          </div>
          <a class="btn btn--ghost btn--sm mt-2" href="#/biblioteca">Ver todas as trilhas ${icon('arrowRight', { size: 16 })}</a>
        </section>

        <section class="card">
          <h2 class="card__title">Atividade recente</h2>
          ${renderActivity(snapshot.activity)}
        </section>
      </div>

      <aside class="stack">
        <section class="card">
          <h2 class="card__title">Meta diária</h2>
          <p class="card__subtitle">${daily.xpEarned} de ${daily.goalXp} XP hoje</p>
          <div class="progress progress--lg mt-2">
            <div class="progress__bar" style="width:${dailyPercent}%"></div>
          </div>
          <p class="text-sm text-muted mt-2 mb-0">
            ${
              dailyPercent >= 100
                ? '🎉 Meta do dia concluída. Continue estudando para manter a sequência!'
                : `Faltam ${daily.goalXp - daily.xpEarned} XP para bater a meta de hoje.`
            }
          </p>
        </section>

        <section class="card">
          <h2 class="card__title">Sequência de estudos</h2>
          <div class="row" style="gap:1rem;margin-top:.5rem">
            <span style="font-size:2rem">🔥</span>
            <div>
              <strong style="font-size:1.5rem;font-family:var(--font-display)">${snapshot.streakDays}</strong>
              <span class="text-muted text-sm">${pluralize(snapshot.streakDays, 'dia', 'dias')} seguidos</span>
            </div>
          </div>
          <p class="text-xs text-muted mt-2 mb-0">Melhor sequência: ${snapshot.streakLongest} ${pluralize(snapshot.streakLongest, 'dia', 'dias')}</p>
        </section>

        <section class="card">
          <h2 class="card__title">Nível ${level.current.level}</h2>
          <p class="card__subtitle">${level.current.title}</p>
          <div class="progress progress--lg mt-2">
            <div class="progress__bar" style="width:${Math.round(level.progress * 100)}%"></div>
          </div>
          <p class="text-xs text-muted mt-2 mb-0">
            ${
              level.next
                ? `Faltam ${level.xpForNext} XP para o nível ${level.next.level} — ${level.next.title}.`
                : 'Você alcançou o nível máximo. Que tal/masterizar os conteúdos?'
            }
          </p>
        </section>

        <section class="card">
          <h2 class="card__title">Recomendações</h2>
          <div class="stack stack--sm mt-2">
            ${
              recommendations.length > 0
                ? recommendations
                    .slice(0, 4)
                    .map(
                      (item) => `
              <div class="card card--flat" style="background:var(--surface-2)">
                <strong class="text-sm">${escapeHtml(item.title)}</strong>
                <p class="text-xs text-muted" style="margin:.25rem 0 .5rem">${escapeHtml(item.description)}</p>
                <a class="btn btn--soft btn--sm" href="${item.action.href}">${escapeHtml(item.action.label)}</a>
              </div>`,
                    )
                    .join('')
                : '<p class="text-sm text-muted">Responda questões para receber recomendações personalizadas.</p>'
            }
          </div>
        </section>
      </aside>
    </div>
  </section>`
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

/** Histórico das últimas atividades. */
function renderActivity(activity) {
  const recent = (activity ?? []).slice(-6).reverse()
  if (recent.length === 0) {
    return `
      <div class="empty">
        ${icon('history', { size: 48, className: 'empty__icon' })}
        <p class="empty__title">Nenhuma atividade ainda</p>
        <p>Comece pela biblioteca de aulas ou pela central de exercícios.</p>
        <a class="btn btn--primary btn--sm" href="#/biblioteca">Explorar aulas</a>
      </div>`
  }

  return `
  <ul class="list mt-2">
    ${recent
      .map(
        (entry) => `
      <li class="list__item">
        <span class="list__icon">${icon(activityIcon(entry.type), { size: 16 })}</span>
        <span style="flex:1">
          <span style="font-size:.92rem">${escapeHtml(entry.description)}</span>
          <br />
          <span class="text-xs text-muted">${escapeHtml(formatActivityDate(entry.createdAt))}${
            entry.xp ? ` · +${entry.xp} XP` : ''
          }</span>
        </span>
      </li>`,
      )
      .join('')}
  </ul>`
}

/** Ícone adequado para cada tipo de atividade. */
function activityIcon(type) {
  switch (type) {
    case 'aula-concluida':
      return 'graduation'
    case 'aula-iniciada':
      return 'book'
    case 'quiz-aula':
      return 'listCheck'
    case 'exercicio-respondido':
      return 'pencil'
    case 'simulado-concluido':
      return 'clipboard'
    case 'flashcard-revisado':
      return 'cards'
    case 'laboratorio-concluido':
      return 'flask'
    case 'conquista-desbloqueada':
      return 'award'
    case 'meta-diaria-atingida':
      return 'flame'
    default:
      return 'info'
  }
}

/** Data relativa curta. */
function formatActivityDate(iso) {
  const date = new Date(iso)
  const diff = Date.now() - date.getTime()
  const minutes = Math.round(diff / 60000)
  if (minutes < 1) return 'agora mesmo'
  if (minutes < 60) return `há ${minutes} min`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `há ${hours} h`
  const days = Math.round(hours / 24)
  if (days === 1) return 'ontem'
  if (days < 7) return `há ${days} dias`
  return date.toLocaleDateString('pt-BR')
}

/** Série de desempenho a partir das tentativas registradas. */
function buildPerformanceSeries(state) {
  const attempts = (state.attempts ?? []).slice(-12)
  return attempts.map((attempt, index) => ({
    label: `R${index + 1}`,
    value: attempt.scorePercent ?? 0,
  }))
}

/** Tempo total de estudo, exposto para a página de progresso. */
export function totalStudyTime(state) {
  const attempts = (state.attempts ?? []).reduce((sum, a) => sum + (a.elapsedSeconds ?? 0), 0)
  const activities = (state.activity ?? []).reduce((sum, a) => sum + (a.studySeconds ?? 0), 0)
  return formatDuration(attempts + activities)
}
