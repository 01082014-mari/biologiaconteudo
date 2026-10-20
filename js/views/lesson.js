/**
 * Leitor de aulas: objetivos, blocos de conteúdo didático, conceitos-chave,
 * resumo, quiz de cinco perguntas e conclusão da aula.
 */

import { LESSON_BY_ID, getRelatedLessons } from '../data/lessons.js'
import { TOPIC_BY_ID } from '../data/topics.js'
import { completeLesson, startLesson, updateLessonProgress } from '../lib/actions.js'
import { getState } from '../lib/store.js'
import { icon } from '../lib/icons.js'
import { escapeHtml } from '../lib/utils.js'
import { toast } from '../lib/dom.js'
import { mountLessonQuiz, renderQuiz } from './lesson-quiz.js'

export default function lesson({ params = [] } = {}) {
  const lessonId = params[0]
  const data = LESSON_BY_ID[lessonId]

  if (!data) {
    return `
    <div class="card empty">
      ${icon('info', { size: 48, className: 'empty__icon' })}
      <p class="empty__title">Aula não encontrada</p>
      <p>O endereço acessado não corresponde a nenhuma aula do BioLab.</p>
      <a class="btn btn--primary btn--sm" href="#/biblioteca">Voltar à biblioteca</a>
    </div>`
  }

  const state = getState()
  const progress = state.lessonProgress?.[data.id]
  const topic = TOPIC_BY_ID[data.topicId]
  const related = getRelatedLessons(data.id)

  startLesson(data.id)

  return `
  <section class="stack" id="lesson-root" data-lesson-id="${data.id}">
    <nav aria-label="Trilha de navegação" class="row" style="gap:.4rem;font-size:.85rem">
      <a class="btn btn--ghost btn--sm" href="#/biblioteca">${icon('arrowLeft', { size: 16 })} Biblioteca</a>
      <a class="btn btn--ghost btn--sm" href="#/biblioteca/${data.topicId}">${escapeHtml(topic.title)}</a>
    </nav>

    <header class="card lesson__hero">
      <div class="row" style="gap:.5rem;margin-bottom:.6rem">
        ${icon(topic.icon, { size: 18 })}
        <span class="badge" style="background:rgba(255,255,255,.22);color:#fff">${escapeHtml(topic.title)}</span>
        <span class="badge" style="background:rgba(255,255,255,.22);color:#fff">${difficultyText(data.difficulty)}</span>
        <span class="badge" style="background:rgba(255,255,255,.22);color:#fff">
          ${icon('clock', { size: 12 })} ${data.estimatedMinutes} min
        </span>
      </div>
      <h1>${escapeHtml(data.title)}</h1>
      <p>${escapeHtml(data.summary)}</p>
      ${
        progress?.completed
          ? `<p class="mt-2 mb-0" style="color:#fff;font-weight:600">${icon('check', { size: 16 })} Aula concluída em ${new Date(progress.completedAt).toLocaleDateString('pt-BR')}</p>`
          : ''
      }
    </header>

    <div class="grid grid--sidebar">
      <div class="stack">
        <section class="card">
          <h2 class="section-title">${icon('target', { className: 'section-title__icon' })} Objetivos de aprendizagem</h2>
          <ul class="objectives mt-2">
            ${data.objectives.map((objective) => `<li>${icon('check', { size: 16 })}<span>${escapeHtml(objective)}</span></li>`).join('')}
          </ul>
        </section>

        <article class="card prose" id="lesson-content">
          ${data.blocks.map((block) => renderBlock(block)).join('')}
        </article>

        <section class="card">
          <h2 class="section-title">${icon('bulb', { className: 'section-title__icon' })} Conceitos importantes</h2>
          <div class="concept-list mt-2">
            ${data.keyConcepts.map((concept) => `<span class="badge badge--primary">${escapeHtml(concept)}</span>`).join('')}
          </div>
        </section>

        <section class="card">
          <h2 class="section-title">${icon('listCheck', { className: 'section-title__icon' })} Resumo da aula</h2>
          <ul class="objectives mt-2">
            ${data.summaryPoints.map((point) => `<li>${icon('chevronRight', { size: 16 })}<span>${escapeHtml(point)}</span></li>`).join('')}
          </ul>
        </section>

        <section class="card" id="quiz-section">
          ${renderQuiz(data)}
        </section>

        <section class="card" id="complete-panel">
          <div class="row row--between">
            <div>
              <h2 class="card__title mb-0">Concluir esta aula</h2>
              <p class="card__subtitle">
                Marque a aula como concluída para ganhar <strong>40 XP</strong> e avançar no seu progresso.
              </p>
            </div>
            <button class="btn btn--primary" id="complete-lesson" type="button" ${progress?.completed ? 'disabled' : ''}>
              ${icon('check', { size: 18 })} ${progress?.completed ? 'Aula concluída' : 'Marcar como concluída'}
            </button>
          </div>
        </section>

        ${
          related.length > 0
            ? `<section class="card">
                <h2 class="card__title">Continue estudando</h2>
                <div class="stack stack--sm mt-2">
                  ${related
                    .map(
                      (item) => `
                    <a class="row" href="#/aula/${item.id}" style="text-decoration:none;color:inherit;gap:.75rem">
                      <span class="list__icon">${icon('book', { size: 16 })}</span>
                      <span style="flex:1">
                        <strong class="text-sm">${escapeHtml(item.title)}</strong>
                        <br /><span class="text-xs text-muted">${item.estimatedMinutes} min · ${difficultyText(item.difficulty)}</span>
                      </span>
                      ${icon('chevronRight', { size: 18, className: 'text-muted' })}
                    </a>`,
                    )
                    .join('')}
                </div>
              </section>`
            : ''
        }
      </div>

      <aside class="stack">
        <section class="card">
          <h2 class="card__title">Progresso da leitura</h2>
          <p class="card__subtitle">${progress?.readPercent ?? 0}% concluído</p>
          <div class="progress progress--lg mt-2">
            <div class="progress__bar" id="read-progress" style="width:${progress?.readPercent ?? 0}%"></div>
          </div>
          <p class="text-xs text-muted mt-2 mb-0">Role a aula para atualizar o progresso automaticamente.</p>
        </section>

        <section class="card">
          <h2 class="card__title">Nesta aula</h2>
          <ul class="list mt-1">
            <li class="list__item">
              <span class="list__icon">${icon('target', { size: 15 })}</span>
              <span class="text-sm">${data.objectives.length} objetivos</span>
            </li>
            <li class="list__item">
              <span class="list__icon">${icon('book', { size: 15 })}</span>
              <span class="text-sm">${data.blocks.length} seções de conteúdo</span>
            </li>
            <li class="list__item">
              <span class="list__icon">${icon('listCheck', { size: 15 })}</span>
              <span class="text-sm">${data.quizQuestionIds.length} questões no quiz</span>
            </li>
            <li class="list__item">
              <span class="list__icon">${icon('clock', { size: 15 })}</span>
              <span class="text-sm">${data.estimatedMinutes} min de leitura</span>
            </li>
          </ul>
        </section>

        ${
          data.relatedLab
            ? `<section class="card">
                <h2 class="card__title">Experimento relacionado</h2>
                <p class="card__subtitle">Visualize na prática o que você acabou de aprender.</p>
                <a class="btn btn--soft btn--sm mt-2" href="#/laboratorio/${data.relatedLab}">
                  ${icon('flask', { size: 16 })} Abrir laboratório
                </a>
              </section>`
            : ''
        }
      </aside>
    </div>
  </section>`
}

/** Renderiza um bloco de conteúdo da aula. */
function renderBlock(block) {
  switch (block.type) {
    case 'texto':
      return `
      <section>
        <h3>${escapeHtml(block.title)}</h3>
        ${(block.paragraphs ?? []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      </section>`

    case 'objetivos':
      return `
      <section>
        <h3>${escapeHtml(block.title)}</h3>
        <ul class="objectives">${(block.items ?? []).map((item) => `<li>${icon('check', { size: 16 })}<span>${escapeHtml(item)}</span></li>`).join('')}</ul>
      </section>`

    case 'exemplo':
      return `
      <section>
        <h3>${escapeHtml(block.title)}</h3>
        ${(block.paragraphs ?? []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      </section>`

    case 'conceitos':
      return `
      <section>
        <h3>${escapeHtml(block.title)}</h3>
        <div class="concept-list">${(block.items ?? []).map((item) => `<span class="badge badge--primary">${escapeHtml(item)}</span>`).join('')}</div>
      </section>`

    case 'resumo':
      return `
      <section>
        <h3>${escapeHtml(block.title)}</h3>
        <ul class="objectives">${(block.items ?? []).map((item) => `<li>${icon('chevronRight', { size: 16 })}<span>${escapeHtml(item)}</span></li>`).join('')}</ul>
      </section>`

    case 'curiosidade':
      return `
      <section>
        <div class="callout ${block.callout === 'info' ? '' : `callout--${block.callout ?? 'dica'}`}">
          ${icon('bulb', { size: 18 })}
          <div>
            <strong>${escapeHtml(block.title)}</strong>
            ${(block.paragraphs ?? []).map((paragraph) => `<p class="mb-0">${escapeHtml(paragraph)}</p>`).join('')}
          </div>
        </div>
      </section>`

    case 'tabela':
      return `
      <section>
        <h3>${escapeHtml(block.title)}</h3>
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead><tr>${block.table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr></thead>
            <tbody>
              ${block.table.rows
                .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`)
                .join('')}
            </tbody>
          </table>
        </div>
      </section>`

    case 'diagrama':
      return `
      <section>
        <h3>${escapeHtml(block.title)}</h3>
        <figure class="mb-0">
          <div class="lab-stage">${renderDiagram(block.diagram)}</div>
          <figcaption class="text-xs text-muted mt-1">${escapeHtml(block.caption ?? '')}</figcaption>
        </figure>
      </section>`

    default:
      return ''
  }
}

/** Desenhos esquemáticos usados nos blocos de diagrama. */
function renderDiagram(key) {
  const diagrams = {
    'celula-animal': cellDiagram(),
    'celula-vegetal': cellDiagram(true),
    'mitose-fases': mitosisDiagram(),
    'dna-dupla-helix': dnaDiagram(),
    'mendel-cruzamento': punnettDiagram(),
    'ciclo-krebs': respirationDiagram(),
    'ecossistema': ecosystemDiagram(),
    'cadeia-alimentar': foodChainDiagram(),
    'sistema-circulatorio': circulationDiagram(),
    nefron: nephronDiagram(),
    'foton-pigmentos': photosynthesisDiagram(),
    'classificacao-seraes': classificationDiagram(),
  }
  return diagrams[key] ?? `<p class="text-muted text-sm">Diagrama indisponível.</p>`
}

/** Célula animal interativa. */
export function cellDiagram(withWall = false) {
  return `
<svg viewBox="0 0 520 360" width="100%" role="img" aria-label="Esquema de uma célula eucariótica">
  <defs>
    <radialGradient id="cytoplasm" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#eff6ff"/>
      <stop offset="100%" stop-color="#dbeafe"/>
    </radialGradient>
  </defs>
  ${withWall ? '<rect x="40" y="30" width="440" height="300" rx="34" fill="#fef9c3" stroke="#2563eb" stroke-width="4"/>' : ''}
  <ellipse cx="260" cy="180" rx="190" ry="140" fill="url(#cytoplasm)" stroke="#1d4ed8" stroke-width="4"/>
  <ellipse cx="235" cy="160" rx="52" ry="44" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="3"/>
  <circle cx="222" cy="150" r="15" fill="#1d4ed8"/>
  <path d="M310 120c14 0 26 12 26 26s-12 26-26 26-26-12-26-26 12-26 26-26z" fill="#eff6ff" stroke="#1d4ed8" stroke-width="3"/>
  <path d="M296 136c8 6 8 34 0 40M306 128c10 8 10 48 0 56M316 128c10 8 10 48 0 56" fill="none" stroke="#facc15" stroke-width="2.5"/>
  <g fill="#facc15" opacity=".85">
    <ellipse cx="160" cy="120" rx="18" ry="9"/>
    <ellipse cx="175" cy="200" rx="20" ry="9" transform="rotate(18 175 200)"/>
    <ellipse cx="340" cy="225" rx="18" ry="9" transform="rotate(-24 340 225)"/>
  </g>
  <g fill="#93c5fd" stroke="#1d4ed8" stroke-width="2">
    <circle cx="150" cy="215" r="13"/>
    <circle cx="360" cy="150" r="11"/>
  </g>
  <g fill="#facc15">
    <circle cx="330" cy="255" r="7"/>
    <circle cx="195" cy="255" r="6"/>
    <circle cx="380" cy="200" r="6"/>
  </g>
  <path d="M120 90c20-14 40-14 60 0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-dasharray="6 5"/>
  <path d="M150 250c22 16 50 18 74 6" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-dasharray="6 5"/>
</svg>`
}

/** Fases da mitose. */
function mitosisDiagram() {
  const phases = [
    { label: 'Prófase', cells: ['⟋', '⟍'] },
    { label: 'Metáfase', cells: ['│', '│'] },
    { label: 'Anáfase', cells: ['│   │', '│   │'] },
    { label: 'Telófase', cells: ['◯', '◯'] },
  ]
  return `
<svg viewBox="0 0 520 160" width="100%" role="img" aria-label="Fases da mitose">
  ${phases
    .map((phase, index) => {
      const x = index * 130 + 10
      return `
  <g transform="translate(${x},10)">
    <ellipse cx="55" cy="70" rx="50" ry="45" fill="#eff6ff" stroke="#1d4ed8" stroke-width="3"/>
    ${phase.cells
      .map((mark, i) => `<text x="${i === 0 ? 42 : 68}" y="80" font-size="26" fill="#1d4ed8" text-anchor="middle">${mark}</text>`)
      .join('')}
    <text x="55" y="140" font-size="12" text-anchor="middle" fill="currentColor">${phase.label}</text>
  </g>`
    })
    .join('')}
</svg>`
}

/** Dupla hélice de DNA. */
function dnaDiagram() {
  const rungs = Array.from({ length: 11 }, (_, i) => 30 + i * 14)
  return `
<svg viewBox="0 0 240 200" width="100%" role="img" aria-label="Estrutura de dupla hélice do DNA">
  ${rungs
    .map((y, index) => {
      const offset = Math.sin(index * 0.9) * 30
      return `<line x1="${120 - offset - 26}" y1="${y}" x2="${120 + offset + 26}" y2="${y}" stroke="#93c5fd" stroke-width="3"/>
      <circle cx="${120 - offset - 26}" cy="${y}" r="5" fill="#1d4ed8"/>
      <circle cx="${120 + offset + 26}" cy="${y}" r="5" fill="#facc15"/>`
    })
    .join('')}
  <path d="${rungs
    .map((y, index) => {
      const offset = Math.sin(index * 0.9) * 30
      return `${index === 0 ? 'M' : 'L'} ${120 - offset - 26} ${y}`
    })
    .join(' ')}" fill="none" stroke="#1d4ed8" stroke-width="4" stroke-linecap="round"/>
  <path d="${rungs
    .map((y, index) => {
      const offset = Math.sin(index * 0.9) * 30
      return `${index === 0 ? 'M' : 'L'} ${120 + offset + 26} ${y}`
    })
    .join(' ')}" fill="none" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>
</svg>`
}

/** Quadro de Punnett didático. */
function punnettDiagram() {
  return `
<svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Quadro de Punnett de um cruzamento Aa por Aa">
  <rect x="20" y="20" width="130" height="130" rx="8" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="85" y1="20" x2="85" y2="150" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="20" y1="85" x2="150" y2="85" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="52" y="62" font-size="20" text-anchor="middle" fill="#1d4ed8" font-weight="700">AA</text>
  <text x="118" y="62" font-size="20" text-anchor="middle" fill="#1d4ed8" font-weight="700">Aa</text>
  <text x="52" y="120" font-size="20" text-anchor="middle" fill="#1d4ed8" font-weight="700">Aa</text>
  <text x="118" y="120" font-size="20" text-anchor="middle" fill="#1d4ed8" font-weight="700">aa</text>
  <text x="52" y="36" font-size="12" text-anchor="middle" fill="currentColor">A</text>
  <text x="118" y="36" font-size="12" text-anchor="middle" fill="currentColor">A</text>
  <text x="10" y="62" font-size="12" text-anchor="middle" fill="currentColor">A</text>
  <text x="10" y="120" font-size="12" text-anchor="middle" fill="currentColor">a</text>
  <text x="85" y="170" font-size="12" text-anchor="middle" fill="currentColor">1 AA · 2 Aa · 1 aa</text>
  <text x="230" y="70" font-size="13" text-anchor="middle" fill="currentColor">Proporção genotípica</text>
  <text x="230" y="92" font-size="15" text-anchor="middle" fill="#1d4ed8" font-weight="700">1 : 2 : 1</text>
  <text x="230" y="120" font-size="13" text-anchor="middle" fill="currentColor">Fenótipo dominante</text>
  <text x="230" y="142" font-size="15" text-anchor="middle" fill="#1d4ed8" font-weight="700">75%</text>
</svg>`
}

/** Fluxo da respiração celular. */
function respirationDiagram() {
  const steps = [
    { title: 'Glicólise', detail: 'Citoplasma', color: '#93c5fd' },
    { title: 'Ciclo de Krebs', detail: 'Matriz mitocondrial', color: '#fde047' },
    { title: 'Cadeia respiratória', detail: 'Membrana interna', color: '#facc15' },
    { title: 'ATP', detail: '~30 a 32 por glicose', color: '#1d4ed8' },
  ]
  return `
<svg viewBox="0 0 520 130" width="100%" role="img" aria-label="Etapas da respiração celular">
  ${steps
    .map((step, index) => {
      const x = index * 130 + 8
      const textColor = index === 3 ? '#ffffff' : '#0f172a'
      return `
  <g transform="translate(${x},25)">
    <rect width="110" height="70" rx="12" fill="${step.color}"/>
    <text x="55" y="32" font-size="13" text-anchor="middle" fill="${textColor}" font-weight="700">${step.title}</text>
    <text x="55" y="52" font-size="10.5" text-anchor="middle" fill="${textColor}">${step.detail}</text>
    ${index < steps.length - 1 ? `<path d="M112 35h14m0 0-5-5m5 5-5 5" stroke="#1d4ed8" stroke-width="2" fill="none" stroke-linecap="round"/>` : ''}
  </g>`
    })
    .join('')}
</svg>`
}

/** Níveis de organização do ecossistema. */
function ecosystemDiagram() {
  const levels = ['Indivíduo', 'População', 'Comunidade', 'Ecossistema', 'Bioma', 'Biosfera']
  return `
<svg viewBox="0 0 520 190" width="100%" role="img" aria-label="Níveis de organização da vida">
  ${levels
    .map((level, index) => {
      const width = 460 - index * 66
      const x = (520 - width) / 2
      const y = index * 30 + 8
      const opacity = 0.95 - index * 0.11
      return `<rect x="${x}" y="${y}" width="${width}" height="24" rx="8" fill="#facc15" fill-opacity="${opacity}"/>
      <text x="260" y="${y + 16}" font-size="11.5" text-anchor="middle" fill="#0f172a" font-weight="600">${level}</text>`
    })
    .join('')}
</svg>`
}

/** Cadeia alimentar. */
function foodChainDiagram() {
  const nodes = [
    { x: 60, label: 'Produtor', fill: '#93c5fd' },
    { x: 200, label: 'Consumidor primário', fill: '#fde047' },
    { x: 340, label: 'Consumidor secundário', fill: '#facc15' },
    { x: 460, label: 'Decompositor', fill: '#1d4ed8', text: '#ffffff' },
  ]
  return `
<svg viewBox="0 0 520 110" width="100%" role="img" aria-label="Cadeia alimentar">
  ${nodes
    .map(
      (node, index) => `
  <g transform="translate(${node.x - 55},35)">
    <rect width="110" height="42" rx="21" fill="${node.fill}"/>
    <text x="55" y="26" font-size="11" text-anchor="middle" fill="${node.text ?? '#0f172a'}" font-weight="700">${node.label}</text>
  </g>
  ${
    index < nodes.length - 1
      ? `<path d="M${node.x + 57} 56h${nodes[index + 1].x - node.x - 60}" stroke="#1d4ed8" stroke-width="2.5" marker-end="url(#arrow)"/>
         <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0l8 4-8 4z" fill="#1d4ed8"/></marker></defs>`
      : ''
  }`,
    )
    .join('')}
</svg>`
}

/** Circulação pulmonar e sistêmica. */
function circulationDiagram() {
  return `
<svg viewBox="0 0 420 200" width="100%" role="img" aria-label="Circulação pulmonar e sistêmica">
  <rect x="20" y="20" width="380" height="70" rx="16" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="210" y="48" font-size="13" text-anchor="middle" fill="#1d4ed8" font-weight="700">CIRCULAÇÃO SISTÊMICA</text>
  <text x="210" y="68" font-size="11" text-anchor="middle" fill="currentColor">Corpo → coração → corpo</text>

  <rect x="20" y="120" width="380" height="60" rx="16" fill="#fef9c3" stroke="#facc15" stroke-width="2.5"/>
  <text x="210" y="145" font-size="13" text-anchor="middle" fill="#1d4ed8" font-weight="700">CIRCULAÇÃO PULMONAR</text>
  <text x="210" y="164" font-size="11" text-anchor="middle" fill="currentColor">Coração → pulmões → coração</text>

  <rect x="170" y="86" width="80" height="38" rx="12" fill="#1d4ed8"/>
  <text x="210" y="110" font-size="12" text-anchor="middle" fill="#ffffff" font-weight="700">CORAÇÃO</text>
</svg>`
}

/** Néfron. */
function nephronDiagram() {
  return `
<svg viewBox="0 0 460 200" width="100%" role="img" aria-label="Estrutura do néfron">
  <circle cx="70" cy="60" r="22" fill="#eff6ff" stroke="#1d4ed8" stroke-width="3"/>
  <circle cx="70" cy="60" r="9" fill="#facc15"/>
  <path d="M92 60h30a16 16 0 0 1 0 32h-24" fill="none" stroke="#1d4ed8" stroke-width="3"/>
  <path d="M98 92c0 30 30 30 30 60" fill="none" stroke="#1d4ed8" stroke-width="3"/>
  <path d="M128 152c-14 22 14 30 0 48" fill="none" stroke="#facc15" stroke-width="3"/>
  <path d="M158 152c14 22-14 30 0 48" fill="none" stroke="#facc15" stroke-width="3"/>
  <path d="M158 92c40 0 60 24 60 44" fill="none" stroke="#1d4ed8" stroke-width="3"/>
  <path d="M218 136h60" fill="none" stroke="#1d4ed8" stroke-width="3"/>
  <text x="70" y="100" font-size="10" text-anchor="middle" fill="currentColor">Glomerulo</text>
  <text x="128" y="215" font-size="10" text-anchor="middle" fill="currentColor">Alça de Henle</text>
  <text x="300" y="130" font-size="10" text-anchor="middle" fill="currentColor">Túbulo coletor</text>
  <text x="420" y="130" font-size="10" text-anchor="middle" fill="currentColor">Urina</text>
</svg>`
}

/** Pigmentos e fases da fotossíntese. */
function photosynthesisDiagram() {
  return `
<svg viewBox="0 0 460 180" width="100%" role="img" aria-label="Esquema da fotossíntese">
  <circle cx="70" cy="50" r="22" fill="#fbbf24"/>
  <g stroke="#f59e0b" stroke-width="2.5">
    <line x1="92" y1="42" x2="130" y2="30"/><line x1="92" y1="52" x2="130" y2="48"/><line x1="92" y1="58" x2="130" y2="66"/>
  </g>
  <rect x="140" y="24" width="170" height="60" rx="12" fill="#1d4ed8"/>
  <text x="225" y="50" font-size="13" text-anchor="middle" fill="#ffffff" font-weight="700">CLOROPLASTO</text>
  <text x="225" y="70" font-size="10.5" text-anchor="middle" fill="#dbeafe">Clorofila + luz solar</text>
  <path d="M320 54h50" stroke="#1d4ed8" stroke-width="2.5"/>
  <path d="M362 48l10 6-10 6" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="400" y="50" font-size="11" text-anchor="middle" fill="currentColor">O₂</text>

  <text x="150" y="120" font-size="11" fill="currentColor">Reação: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</text>
  <text x="150" y="142" font-size="11" fill="currentColor">Fase luminosa: tilacoides · Ciclo de Calvin: estroma</text>
  <text x="150" y="164" font-size="11" fill="currentColor">Energia convertida em glicose e liberada como O₂</text>
</svg>`
}

/** Hierarquia de classificação. */
function classificationDiagram() {
  const levels = [
    ['Domínio', 'Eukarya'],
    ['Reino', 'Animalia'],
    ['Filo', 'Chordata'],
    ['Classe', 'Mammalia'],
    ['Ordem', 'Primates'],
    ['Família', 'Hominidae'],
    ['Gênero', 'Homo'],
    ['Espécie', 'Homo sapiens'],
  ]
  return `
<svg viewBox="0 0 460 190" width="100%" role="img" aria-label="Hierarquia taxonmica do ser humano">
  ${levels
    .map(([rank, name], index) => {
      const y = index * 22 + 6
      const indent = index * 12
      return `<rect x="${indent}" y="${y}" width="${150 - indent * 0.6}" height="19" rx="5" fill="#facc15" fill-opacity="${0.9 - index * 0.08}"/>
      <text x="${indent + 7}" y="${y + 14}" font-size="10" fill="#0f172a" font-weight="600">${rank}: ${name}</text>`
    })
    .join('')}
</svg>`
}

/** Texto legível da dificuldade. */
function difficultyText(difficulty) {
  return { facil: 'Fácil', medio: 'Média', dificil: 'Difícil' }[difficulty] ?? 'Geral'
}

/**
 * Liga os interativos da página depois que o HTML é inserido no DOM.
 * Exportado para que o app.js possa chamar após a renderização.
 */
export function bindLessonInteractions() {
  const root = document.getElementById('lesson-root')
  if (!root) return

  const completeButton = document.getElementById('complete-lesson')
  if (completeButton) {
    completeButton.addEventListener('click', () => {
      const lessonId = root.dataset.lessonId
      completeLesson(lessonId)
      completeButton.disabled = true
      completeButton.innerHTML = `${icon('check', { size: 18 })} Aula concluída`
      toast('Aula concluída! +40 XP', 'success')
      const panel = document.getElementById('complete-panel')
      if (panel) {
        panel.querySelector('.card__subtitle').innerHTML =
          'Aula marcada como concluída. Continue para a próxima aula da trilha.'
      }
    })
  }

  // Progresso de leitura automático
  const content = document.getElementById('lesson-content')
  const progressBar = document.getElementById('read-progress')
  if (content && progressBar) {
    const lessonId = root.dataset.lessonId
    let ticking = false
    const update = () => {
      const rect = content.getBoundingClientRect()
      const total = rect.height - window.innerHeight * 0.5
      const seen = Math.min(total, Math.max(0, -rect.top + window.innerHeight * 0.5))
      const percent = total > 0 ? (seen / total) * 100 : 100
      progressBar.style.width = `${Math.round(percent)}%`
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(() => {
          updateLessonProgress(lessonId, percent)
          ticking = false
        })
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
  }
}


/**
 * Ativa os interativos da página de aula após a inserção no DOM.
 */
export function mount() {
  bindLessonInteractions()
  mountLessonQuiz()
}
