/**
 * Meu Progresso: estatísticas agregadas, gráficos, conquistas e
 * recomendações personalizadas.
 */

import { ALL_LESSONS } from '../data/lessons.js'
import { TOPICS, TOPIC_BY_ID } from '../data/topics.js'
import { ACHIEVEMENTS } from '../data/achievements.js'
import { buildRecommendations, buildSnapshot, computeStreak } from '../lib/progress.js'
import { evaluateAchievement, levelProgress, totalXp } from '../lib/xp.js'
import { getState } from '../lib/store.js'
import { barChart, columnChart, donutChart, lineChart } from '../lib/charts.js'
import { icon } from '../lib/icons.js'
import { escapeHtml, formatDate, formatDuration, pluralize } from '../lib/utils.js'

export default function progress() {
  const state = getState()
  const snapshot = buildSnapshot(state)
  const xp = totalXp(state.xpEvents)
  const level = levelProgress(xp)
  const recommendations = buildRecommendations(snapshot, state)

  const series = (state.attempts ?? []).slice(-12).map((attempt, index) => ({
    label: `R${index + 1}`,
    value: attempt.scorePercent ?? 0,
  }))

  const topicBars = (snapshot.topicStats ?? []).map((stat) => ({
    label: TOPIC_BY_ID[stat.topic]?.title ?? stat.topic,
    value: stat.percent,
  }))

  const dailyActivity = buildDailySeries(state)
  const streak = computeStreak(state.activity ?? [])
  const achievements = buildAchievements(state, snapshot)

  return `
  <section class="stack">
    <header class="row row--between">
      <div>
        <h1 class="mb-0">Meu Progresso</h1>
        <p class="text-muted mb-0">Estatísticas, conquistas e recomendações personalizadas</p>
      </div>
      <span class="badge badge--primary">${icon('zap', { size: 13 })} ${xp} XP · Nível ${level.current.level}</span>
    </header>

    <div class="grid grid--4">
      ${statCard('graduation', 'Aulas concluídas', `${snapshot.lessonsCompleted}/${ALL_LESSONS.length}`, `${Math.round(
        (snapshot.lessonsCompleted / ALL_LESSONS.length) * 100,
      )}% do conteúdo`)}
      ${statCard('percent', 'Taxa de acerto', `${Math.round(snapshot.accuracyPercent)}%`, `${snapshot.correctAnswers} de ${snapshot.questionsAnswered}`)}
      ${statCard('clock', 'Tempo de estudo', formatDuration(snapshot.totalStudySeconds), 'somando aulas e exercícios')}
      ${statCard('clipboard', 'Simulados', snapshot.examsCompleted, pluralize(snapshot.examsCompleted, 'realizado', 'realizados'))}
    </div>

    <div class="grid grid--4">
      ${statCard('cards', 'Flashcards revisados', snapshot.flashcardsReviewed, 'revisões espaçadas')}
      ${statCard('flask', 'Laboratórios', snapshot.labsCompleted, 'experimentos concluídos')}
      ${statCard('flame', 'Sequência atual', `${snapshot.streakDays} ${pluralize(snapshot.streakDays, 'dia', 'dias')}`, `recorde: ${streak.longest}`)}
      ${statCard('award', 'Conquistas', `${achievements.filter((item) => item.unlocked).length}/${ACHIEVEMENTS.length}`, 'medalhas desbloqueadas')}
    </div>

    <div class="grid grid--sidebar">
      <div class="stack">
        <section class="card">
          <h2 class="section-title">${icon('chart', { className: 'section-title__icon' })} Evolução dos acertos</h2>
          ${lineChart(series, { label: 'Evolução da taxa de acerto' })}
        </section>

        <section class="card">
          <h2 class="section-title">${icon('target', { className: 'section-title__icon' })} Desempenho por assunto</h2>
          ${
            topicBars.length > 0
              ? barChart(topicBars)
              : `<div class="empty">
                  ${icon('chart', { size: 44, className: 'empty__icon' })}
                  <p class="empty__title">Sem dados por assunto</p>
                  <p>Responda questões ou faça um simulado para popular este gráfico.</p>
                </div>`
          }
        </section>

        <section class="card">
          <h2 class="section-title">${icon('calendar', { className: 'section-title__icon' })} Atividade por dia</h2>
          ${columnChart(dailyActivity, { label: 'Atividades por dia' })}
        </section>

        <section class="card">
          <h2 class="section-title">${icon('award', { className: 'section-title__icon' })} Conquistas e medalhas</h2>
          <div class="grid grid--4 mt-2">
            ${achievements
              .map(
                (item) => `
              <div class="medal medal--${item.achievement.tier} ${item.unlocked ? 'is-unlocked' : ''}">
                <span class="medal__icon">${icon(item.unlocked ? item.achievement.icon : 'key', { size: 22 })}</span>
                <span class="medal__title">${escapeHtml(item.achievement.title)}</span>
                <span class="medal__desc">${escapeHtml(item.achievement.description)}</span>
                <span class="badge badge--outline">
                  ${item.current}/${item.target}
                </span>
                ${
                  item.unlocked
                    ? `<span class="text-xs text-muted">Desbloqueada em ${escapeHtml(formatDate(item.unlockedAt))}</span>`
                    : `<span class="text-xs text-muted">Faltam ${item.target - item.current}</span>`
                }
              </div>`,
              )
              .join('')}
          </div>
        </section>
      </div>

      <aside class="stack">
        <section class="card">
          <h2 class="card__title">Precisão geral</h2>
          <div class="flex" style="display:grid;place-items:center;margin-top:.5rem">
            ${donutChart(snapshot.accuracyPercent)}
          </div>
        </section>

        <section class="card">
          <h2 class="card__title">Nível ${level.current.level} — ${level.current.title}</h2>
          <div class="progress progress--lg mt-2">
            <div class="progress__bar" style="width:${Math.round(level.progress * 100)}%"></div>
          </div>
          <p class="text-xs text-muted mt-2 mb-0">
            ${level.next ? `Faltam ${level.xpForNext} XP para ${level.next.title} (nível ${level.next.level}).` : 'Nível máximo alcançado.'}
          </p>
        </section>

        <section class="card">
          <h2 class="card__title">Conteúdos com maior dificuldade</h2>
          ${
            (snapshot.topicStats ?? []).filter((stat) => stat.total >= 3).length > 0
              ? `<ul class="list mt-2">
                  ${(snapshot.topicStats ?? [])
                    .filter((stat) => stat.total >= 3)
                    .sort((a, b) => a.percent - b.percent)
                    .slice(0, 5)
                    .map(
                      (stat) => `
                    <li class="list__item">
                      <span style="flex:1">${escapeHtml(TOPIC_BY_ID[stat.topic]?.title ?? stat.topic)}</span>
                      <span class="badge badge--${stat.percent >= 70 ? 'facil' : stat.percent >= 45 ? 'medio' : 'dificil'}">
                        ${Math.round(stat.percent)}%
                      </span>
                    </li>`,
                    )
                    .join('')}
                </ul>`
              : '<p class="text-sm text-muted">Responda ao menos 3 questões de um assunto para identificar os pontos mais difíceis.</p>'
          }
        </section>

        <section class="card">
          <h2 class="card__title">Recomendações personalizadas</h2>
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
                : '<p class="text-sm text-muted">Continue estudando para receber recomendações.</p>'
            }
          </div>
        </section>

        <section class="card">
          <h2 class="card__title">Progresso por trilha</h2>
          <ul class="list mt-2">
            ${TOPICS.filter((topic) => ALL_LESSONS.some((lesson) => lesson.topicId === topic.id))
              .map((topic) => {
                const lessons = ALL_LESSONS.filter((lesson) => lesson.topicId === topic.id)
                const completed = lessons.filter((lesson) => state.lessonProgress?.[lesson.id]?.completed).length
                const percent = Math.round((completed / lessons.length) * 100)
                return `
              <li class="list__item">
                <span style="flex:1;font-size:.9rem">${escapeHtml(topic.title)}</span>
                <div class="progress" style="width:7rem">
                  <div class="progress__bar" style="width:${percent}%"></div>
                </div>
                <strong class="text-xs" style="min-width:2.6rem;text-align:right">${percent}%</strong>
              </li>`
              })
              .join('')}
          </ul>
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

/** Estado de cada conquista. */
function buildAchievements(state, snapshot) {
  return ACHIEVEMENTS.map((achievement) => {
    const result = evaluateAchievement(achievement, snapshot)
    return {
      achievement,
      current: Math.min(result.current, result.target),
      target: result.target,
      unlocked: Boolean(state.achievements?.[achievement.id]),
      unlockedAt: state.achievements?.[achievement.id] ?? null,
    }
  })
}

/** Série de atividades dos últimos 14 dias. */
function buildDailySeries(state) {
  const days = []
  const today = new Date()
  for (let offset = 13; offset >= 0; offset -= 1) {
    const date = new Date(today)
    date.setDate(date.getDate() - offset)
    const key = date.toISOString().slice(0, 10)
    const count = (state.activity ?? []).filter((entry) => entry.createdAt?.slice(0, 10) === key).length
    days.push({ label: `${date.getDate()}/${date.getMonth() + 1}`, value: count })
  }
  return days
}
