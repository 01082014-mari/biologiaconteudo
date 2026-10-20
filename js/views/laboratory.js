/**
 * Laboratório Virtual: quatro experiências interativas.
 *
 *  1. Célula Animal — organelas clicáveis com nome, função e curiosidades;
 *  2. Genética Mendeliana — quadro de Punnett com probabilidades;
 *  3. Fotossíntese — simulação simplificada de luz, água e CO₂;
 *  4. Cadeia Alimentar — montagem de cadeias com validação.
 */

import { completeLab } from '../lib/actions.js'
import { getState } from '../lib/store.js'
import { icon } from '../lib/icons.js'
import { escapeHtml } from '../lib/utils.js'

const ORGANELLES = [
  {
    id: 'nucleo',
    name: 'Núcleo',
    function: 'Guarda o material genético (DNA) e comanda as atividades da célula.',
    features: [
      'Delimitado por uma membrana nuclear com poros.',
      'Contém os cromossomos e os nucleolos.',
      'Hospeda a transcrição do RNA mensageiro.',
    ],
    curiosities: 'O núcleo da célula humana guarda cerca de 2 metros de DNA se fosse esticado.',
  },
  {
    id: 'mitochondria',
    name: 'Mitocôndria',
    function: 'Produz ATP por meio da respiração celular (cadeia respiratória).',
    features: [
      'Membrana dupla e crestas internas.',
      'Possui DNA e ribossomos próprios.',
      'É a origem da teoria endossimbiótica.',
    ],
    curiosities: 'É a única organela capaz de se reproduzir de forma independente.',
  },
  {
    id: 'ribossomo',
    name: 'Ribossomo',
    function: 'Sintetiza proteínas traduzindo o RNA mensageiro.',
    features: [
      'Formado por duas subunidades (maior e menor).',
      'Pode estar livre no citoplasma ou preso ao retículo endoplasmático rugoso.',
      'É um ribossomo, e não uma organela membranosa.',
    ],
    curiosities: 'Uma célula pode conter milhões de ribossomos em fase de síntese proteica intensa.',
  },
  {
    id: 'complexo-golgi',
    name: 'Complexo de Golgi',
    function: 'Modifica, classifica e empacota proteínas e lipídios.',
    features: [
      'Empilhamento de cisternas achatadas.',
      'Recebe vesículas do retículo endoplasmático.',
      'Forma vesículas que vão para a membrana ou para fora da célula.',
    ],
    curiosities: 'Foi observado por Camillo Golgi em 1898 com o método de prata, e recebeu o Nobel em 1906.',
  },
  {
    id: 'lisossomo',
    name: 'Lisossomo',
    function: 'Realiza a digestão intracelular de resíduos e organelas gastas.',
    features: [
      'Contém enzimas hidrolíticas em meio ácido.',
      'Fundido com fagossomos formando o fagolisossomo.',
      'Abundante em células fagocíticas, como os macrófagos.',
    ],
    curiosities: 'Ocorre a "doença de Tay-Sachs" quando há falta da enzima hexosaminidase A.',
  },
  {
    id: 'reticulo',
    name: 'Retículo endoplasmático',
    function: 'Sintetiza e transporta proteínas (rugoso) ou lipídios (liso).',
    features: [
      'Rede de canais que se comunica com o núcleo.',
      'A versão rugosa tem ribossomos aderidos.',
      'A versão lisa atua na detoxificação e na síntese de lipídios.',
    ],
    curiosities: 'Sua superfície total pode superar a da própria membrana plasmática.',
  },
  {
    id: 'membrana',
    name: 'Membrana plasmática',
    function: 'Delimita a célula e regula o que entra e sai.',
    features: [
      'Bicamada de fosfolipídios com proteínas dispersas.',
      'Permeabilidade seletiva (modelo do mosaico fluido).',
      'Participa da comunicação celular e da secreção.',
    ],
    curiosities: 'Se toda a membrana fosse esticada, cobriria cerca de 65 m² no corpo humano.',
  },
  {
    id: 'citoplasma',
    name: 'Citoplasma',
    function: 'Meio onde ficam as organelas e onde ocorrem muitas reações metabólicas.',
    features: [
      'É a maior fração do volume da célula.',
      'Contém a glicólise e a fermentação.',
      'Hospeda o citoesqueleto, que dá forma à célula e sustenta o movimento.',
    ],
    curiosities: 'O citoplasma da célula muscular é chamado de sarcoplasma.',
  },
]

const LABS = [
  {
    id: 'celula-animal',
    title: 'Célula Animal',
    icon: 'cell',
    description: 'Explore cada organela de uma célula eucariótica e descubra sua função.',
    topic: 'citologia',
  },
  {
    id: 'mendel',
    title: 'Genética Mendeliana',
    icon: 'dna',
    description: 'Monte cruzamentos monohíbridos e acompanhe as probabilidades no quadro de Punnett.',
    topic: 'genetica',
  },
  {
    id: 'fotossintese',
    title: 'Fotossíntese',
    icon: 'leaf',
    description: 'Simule a influência de luz, água e dióxido de carbono na produção de glicose.',
    topic: 'ecologia',
  },
  {
    id: 'cadeia-alimentar',
    title: 'Cadeia Alimentar',
    icon: 'layers',
    description: 'Monte cadeias tróficas válidas e identifique produtores, consumidores e decompositores.',
    topic: 'ecologia',
  },
]

export default function laboratory({ params = [] } = {}) {
  const labId = params[0] ?? null
  if (labId && !LABS.some((lab) => lab.id === labId)) {
    return notFound()
  }
  if (labId) return renderLab(labId)

  const state = getState()
  const completed = state.labsCompleted ?? {}

  return `
  <section class="stack">
    <header>
      <h1 class="mb-0">Laboratório Virtual</h1>
      <p class="text-muted mb-0">Experiências interativas para ver a Biologia funcionando</p>
    </header>

    <div class="grid grid--2">
      ${LABS.map(
        (lab) => `
        <a class="card card--hover track-card" href="#/laboratorio/${lab.id}" style="text-decoration:none;color:inherit">
          <div class="track-card__art" style="background:var(--surface-3)">
            ${icon(lab.icon, { size: 56, className: 'stat__icon' })}
          </div>
          <div class="track-card__body">
            <div class="track-card__meta">
              <span class="badge badge--primary">${escapeHtml(lab.title)}</span>
              ${completed[lab.id] ? `<span class="badge badge--facil">${icon('check', { size: 12 })} Concluído</span>` : ''}
            </div>
            <h3 class="mb-0">${escapeHtml(lab.title)}</h3>
            <p class="text-sm text-muted" style="margin:0">${escapeHtml(lab.description)}</p>
          </div>
        </a>`,
      ).join('')}
    </div>
  </section>`
}

/** Página de uma experiência. */
function renderLab(labId) {
  const lab = LABS.find((item) => item.id === labId)
  const state = getState()
  const done = Boolean(state.labsCompleted?.[labId])

  return `
  <section class="stack">
    <nav class="row" style="gap:.4rem">
      <a class="btn btn--ghost btn--sm" href="#/laboratorio">${icon('arrowLeft', { size: 16 })} Todos os experimentos</a>
    </nav>

    <header class="card">
      <div class="row row--between">
        <div>
          <div class="row" style="gap:.5rem;margin-bottom:.4rem">
            ${icon(lab.icon, { size: 18, className: 'stat__icon' })}
            <span class="badge badge--primary">Experimento</span>
            ${done ? `<span class="badge badge--facil">${icon('check', { size: 12 })} Concluído</span>` : ''}
          </div>
          <h1 class="mb-0">${escapeHtml(lab.title)}</h1>
          <p class="text-muted mb-0">${escapeHtml(lab.description)}</p>
        </div>
      </div>
    </header>

    <div id="lab-stage">${renderStage(labId)}</div>
  </section>`
}

/** Conteúdo de cada experimento. */
function renderStage(labId) {
  if (labId === 'celula-animal') return cellStage()
  if (labId === 'mendel') return mendelStage()
  if (labId === 'fotossintese') return photosynthesisStage()
  if (labId === 'cadeia-alimentar') return foodChainStage()
  return ''
}

/* ------------------------------------------------------------------ */
/* Experiência 1 — Célula animal                                       */
/* ------------------------------------------------------------------ */

function cellStage() {
  return `
  <div class="grid grid--sidebar">
    <div class="lab-stage">
      <svg viewBox="0 0 520 380" width="100%" id="cell-svg" role="img"
        aria-label="Ilustração interativa de uma célula animal">
        <defs>
          <radialGradient id="cyto" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stop-color="#f0fdf4"/><stop offset="100%" stop-color="#bbf7d0"/>
          </radialGradient>
        </defs>
        <ellipse cx="260" cy="190" rx="200" ry="150" fill="url(#cyto)" stroke="#166534" stroke-width="4"/>

        <g class="lab-organelle" data-organelle="nucleo" tabindex="0" role="button" aria-label="Núcleo">
          <ellipse cx="228" cy="168" rx="56" ry="48" fill="#a7f3d0" stroke="#166534" stroke-width="3"/>
          <circle cx="214" cy="158" r="16" fill="#166534"/>
          <circle cx="242" cy="182" r="8" fill="#166534"/>
        </g>

        <g class="lab-organelle" data-organelle="mitochondria" tabindex="0" role="button" aria-label="Mitocôndria">
          <path d="M330 118c15 0 27 12 27 27s-12 27-27 27-27-12-27-27 12-27 27-27z"
            fill="#f0fdf4" stroke="#166534" stroke-width="3"/>
          <path d="M314 135c9 6 9 34 0 40M325 128c10 8 10 46 0 54M336 128c10 8 10 46 0 54"
            fill="none" stroke="#22c55e" stroke-width="2.5"/>
        </g>

        <g class="lab-organelle" data-organelle="ribossomo" tabindex="0" role="button" aria-label="Ribossomos">
          <g fill="#22c55e">
            <ellipse cx="150" cy="115" rx="19" ry="9"/>
            <ellipse cx="168" cy="212" rx="20" ry="9" transform="rotate(18 168 212)"/>
            <ellipse cx="352" cy="238" rx="19" ry="9" transform="rotate(-24 352 238)"/>
          </g>
        </g>

        <g class="lab-organelle" data-organelle="complexo-golgi" tabindex="0" role="button" aria-label="Complexo de Golgi">
          <path d="M330 262c14-14 28-14 42 0M334 276c14-14 28-14 42 0M340 290c12-12 24-12 36 0"
            fill="none" stroke="#166534" stroke-width="6" stroke-linecap="round"/>
        </g>

        <g class="lab-organelle" data-organelle="lisossomo" tabindex="0" role="button" aria-label="Lisossomos">
          <circle cx="128" cy="228" r="14" fill="#86efac" stroke="#166534" stroke-width="2.5"/>
          <circle cx="378" cy="152" r="12" fill="#86efac" stroke="#166534" stroke-width="2.5"/>
        </g>

        <g class="lab-organelle" data-organelle="reticulo" tabindex="0" role="button" aria-label="Retículo endoplasmático">
          <path d="M108 82c26-18 52-18 78 0M104 104c26-18 52-18 78 0"
            fill="none" stroke="#166534" stroke-width="3" stroke-dasharray="8 6"/>
        </g>

        <g class="lab-organelle" data-organelle="membrana" tabindex="0" role="button" aria-label="Membrana plasmática">
          <ellipse cx="260" cy="190" rx="200" ry="150" fill="none" stroke="#22c55e" stroke-width="8"
            stroke-dasharray="16 10" opacity=".75"/>
        </g>

        <g class="lab-organelle" data-organelle="citoplasma" tabindex="0" role="button" aria-label="Citoplasma">
          <circle cx="392" cy="212" r="7" fill="#22c55e"/>
          <circle cx="186" cy="272" r="6" fill="#22c55e"/>
          <circle cx="300" cy="316" r="7" fill="#4ade80"/>
        </g>
      </svg>
      <p class="text-xs text-muted text-center mt-2 mb-0">
        Clique em uma organela (ou use o Tab e Enter) para ver nome, função, características e curiosidades.
      </p>
    </div>

    <aside class="card" id="organelle-panel">
      <div class="empty">
        ${icon('microscope', { size: 44, className: 'empty__icon' })}
        <p class="empty__title">Selecione uma organela</p>
        <p>Cada parte da célula tem uma função específica. Explore o esquema ao lado.</p>
      </div>
    </aside>
  </div>`
}

/* ------------------------------------------------------------------ */
/* Experiência 2 — Genética mendeliana                                 */
/* ------------------------------------------------------------------ */

const MENDEL_GENOTYPES = [
  { id: 'AA', label: 'AA', phenotype: 'Dominante' },
  { id: 'Aa', label: 'Aa', phenotype: 'Dominante' },
  { id: 'aa', label: 'aa', phenotype: 'Recessivo' },
]

function mendelStage() {
  return `
  <div class="grid grid--sidebar">
    <div class="stack">
      <div class="card">
        <h2 class="card__title">Cruzamento monohíbrido</h2>
        <p class="card__subtitle">Escolha o genótipo de cada progenitor e observe o quadro de Punnett</p>

        <div class="grid grid--2 mt-3">
          <div class="field">
            <label class="field__label" for="parent-a">Progenitor 1</label>
            <select class="select" id="parent-a">
              ${MENDEL_GENOTYPES.map((item) => `<option value="${item.id}">${item.label} — fenótipo ${item.phenotype}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label class="field__label" for="parent-b">Progenitor 2</label>
            <select class="select" id="parent-b">
              ${MENDEL_GENOTYPES.map((item) => `<option value="${item.id}">${item.label} — fenótipo ${item.phenotype}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row mt-3">
          <label class="check"><input type="checkbox" id="mendel-show-prob" checked /><span>Mostrar probabilidades</span></label>
        </div>
      </div>

      <div class="card" id="punnett-panel"></div>

      <div class="card">
        <h2 class="card__title">O que este resultado significa</h2>
        <p class="text-sm text-muted mt-2" id="mendel-explanation"></p>
        <button class="btn btn--primary mt-3" id="mendel-done" type="button">
          ${icon('check', { size: 18 })} Concluir experimento
        </button>
      </div>
    </div>

    <aside class="stack">
      <section class="card">
        <h2 class="card__title">Como ler o quadro</h2>
        <ul class="objectives mt-2">
          <li>${icon('info', { size: 15 })}<span>Cada célula é um zigoto possível, com a mesma chance de ocorrer.</span></li>
          <li>${icon('info', { size: 15 })}<span>As células do mesmo tipo têm a mesma probabilidade.</span></li>
          <li>${icon('info', { size: 15 })}<span>Some as células com o mesmo genótipo para obter a proporção genotípica.</span></li>
          <li>${icon('info', { size: 15 })}<span>O fenótipo depende da dominância: com A dominante, todo genótipo com A tem fenótipo dominante.</span></li>
        </ul>
      </section>
    </aside>
  </div>`
}

/* ------------------------------------------------------------------ */
/* Experiência 3 — Fotossíntese                                         */
/* ------------------------------------------------------------------ */

function photosynthesisStage() {
  return `
  <div class="grid grid--sidebar">
    <div class="stack">
      <div class="card">
        <h2 class="card__title">Simulador de fotossíntese</h2>
        <p class="card__subtitle">Ajuste os fatores e observe a taxa de fotossíntese</p>

        <div class="sim-control mt-3">
          <div class="field">
            <label class="field__label" for="sim-light">Intensidade luminosa</label>
            <input class="input" type="range" id="sim-light" min="0" max="100" value="60" />
            <span class="field__hint" id="sim-light-value">60%</span>
          </div>
          <div class="field">
            <label class="field__label" for="sim-water">Disponibilidade de água</label>
            <input class="input" type="range" id="sim-water" min="0" max="100" value="70" />
            <span class="field__hint" id="sim-water-value">70%</span>
          </div>
          <div class="field">
            <label class="field__label" for="sim-co2">Concentração de CO₂</label>
            <input class="input" type="range" id="sim-co2" min="0" max="100" value="55" />
            <span class="field__hint" id="sim-co2-value">55%</span>
          </div>
          <div class="field">
            <label class="field__label" for="sim-temp">Temperatura</label>
            <input class="input" type="range" id="sim-temp" min="5" max="45" value="25" />
            <span class="field__hint" id="sim-temp-value">25 °C</span>
          </div>
        </div>
      </div>

      <div class="card" id="photosynthesis-result"></div>
    </div>

    <aside class="stack">
      <section class="card">
        <h2 class="card__title">Modelo simplificado</h2>
        <p class="text-sm text-muted">
          Este simulador usa um modelo <strong>educacional e simplificado</strong>, e não valores experimentais.
          A taxa é estimada pelo produto normalizado dos quatro fatores, com penalidade para temperaturas
          muito baixas ou muito altas, quando as enzimas da fotossíntese ficam pouco效率 ativas.
        </p>
        <p class="text-sm text-muted mb-0">
          O ponto de compensação luminosa (taxa zero) representa a intensidade em que a fotossíntese iguala
          a respiração da planta.
        </p>
      </section>
    </aside>
  </div>`
}

/* ------------------------------------------------------------------ */
/* Experiência 4 — Cadeia alimentar                                     */
/* ------------------------------------------------------------------ */

const CHAIN_LEVELS = [
  { level: 'Produtor', examples: ['Alga', 'Capim', 'Fitoplâncton', 'Árvore'] },
  { level: 'Consumidor primário', examples: ['Zooplâncton', 'Coelho', 'Larva', 'Sapo'] },
  { level: 'Consumidor secundário', examples: ['Peixe', 'Cobra', 'Toupeira', 'Pombo'] },
  { level: 'Consumidor terciário', examples: ['Gavião', 'Tubarão', 'Onça', 'Águia'] },
  { level: 'Decompositor', examples: ['Fungo', 'Bactéria', 'Minhoca', 'Besouro'] },
]

const FOOD_RULES = {
  'Produtor': ['Zooplâncton', 'Coelho', 'Larva', 'Sapo', 'Peixe', 'Cobra', 'Toupeira', 'Pombo', 'Gavião', 'Tubarão', 'Onça', 'Águia', 'Fungo', 'Bactéria', 'Minhoca', 'Besouro'],
  'Consumidor primário': ['Peixe', 'Cobra', 'Toupeira', 'Pombo', 'Gavião', 'Tubarão', 'Onça', 'Águia', 'Fungo', 'Bactéria', 'Minhoca', 'Besouro'],
  'Consumidor secundário': ['Gavião', 'Tubarão', 'Onça', 'Águia', 'Fungo', 'Bactéria', 'Minhoca', 'Besouro'],
  'Consumidor terciário': ['Fungo', 'Bactéria', 'Minhoca', 'Besouro'],
  'Decompositor': [],
}

function foodChainStage() {
  return `
  <div class="grid grid--sidebar">
    <div class="stack">
      <div class="card">
        <h2 class="card__title">Monte a cadeia alimentar</h2>
        <p class="card__subtitle">Escolha um organismo para cada nível, começando pelo produtor</p>

        <div class="stack mt-3" id="chain-builder">
          ${CHAIN_LEVELS.map(
            (level, index) => `
            <div class="row" style="gap:.75rem;align-items:center">
              <span class="badge badge--primary" style="min-width:9.5rem;justify-content:center">${level.level}</span>
              <select class="select" data-chain-index="${index}" aria-label="Organismo para ${level.level}">
                <option value="">Selecione…</option>
                ${level.examples.map((example) => `<option value="${example}">${example}</option>`).join('')}
              </select>
            </div>`,
          ).join('')}
        </div>

        <div class="row mt-3">
          <button class="btn btn--primary" id="check-chain" type="button">${icon('check', { size: 16 })} Verificar cadeia</button>
          <button class="btn btn--ghost" id="random-chain" type="button">${icon('shuffle', { size: 16 })} Sortear cadeia</button>
        </div>

        <div id="chain-feedback" class="mt-3"></div>
      </div>

      <div class="card" id="chain-preview"></div>
    </div>

    <aside class="stack">
      <section class="card">
        <h2 class="card__title">Regras da cadeia</h2>
        <ul class="objectives mt-2">
          <li>${icon('check', { size: 15 })}<span>O primeiro nível é sempre um produtor.</span></li>
          <li>${icon('check', { size: 15 })}<span>Cada nível come o organismo do nível anterior.</span></li>
          <li>${icon('check', { size: 15 })}<span>Todos podem ser decompostos por fungos e bactérias.</span></li>
          <li>${icon('check', { size: 15 })}<span>Um mesmo organismo pode ocupar níveis diferentes em teias distintas.</span></li>
        </ul>
      </section>
    </aside>
  </div>`
}

/* ------------------------------------------------------------------ */
/* Interativos                                                          */
/* ------------------------------------------------------------------ */

export function mount({ params = [] } = {}) {
  const labId = params[0]
  if (labId === 'celula-animal') mountCellLab()
  else if (labId === 'mendel') mountMendelLab()
  else if (labId === 'fotossintese') mountPhotosynthesisLab()
  else if (labId === 'cadeia-alimentar') mountFoodChainLab()
}

/** Experiência da célula animal. */
function mountCellLab() {
  const panel = document.getElementById('organelle-panel')
  const svg = document.getElementById('cell-svg')

  const show = (id) => {
    const organelle = ORGANELLES.find((item) => item.id === id)
    if (!organelle) return
    panel.innerHTML = `
      <div class="row" style="gap:.5rem;margin-bottom:.6rem">
        ${icon('cell', { size: 18, className: 'stat__icon' })}
        <h2 class="card__title mb-0">${escapeHtml(organelle.name)}</h2>
      </div>
      <p class="text-sm"><strong>Função:</strong> ${escapeHtml(organelle.function)}</p>
      <p class="text-sm"><strong>Características:</strong></p>
      <ul class="objectives mb-2">
        ${organelle.features.map((feature) => `<li>${icon('check', { size: 14 })}<span>${escapeHtml(feature)}</span></li>`).join('')}
      </ul>
      <div class="callout callout--dica">
        ${icon('bulb', { size: 18 })}
        <div><strong>Curiosidade</strong><p class="mb-0">${escapeHtml(organelle.curiosities)}</p></div>
      </div>
      <button class="btn btn--primary btn--block mt-3" id="cell-done" type="button">
        ${icon('check', { size: 18 })} Concluir experimento
      </button>`
    panel.querySelector('#cell-done')?.addEventListener('click', () => {
      completeLab('celula-animal', 'Explorou a célula animal no laboratório virtual')
    })
  }

  svg?.addEventListener('click', (event) => {
    const group = event.target.closest('[data-organelle]')
    if (group) show(group.dataset.organelle)
  })

  svg?.addEventListener('keydown', (event) => {
    const group = event.target.closest?.('[data-organelle]')
    if (!group) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      show(group.dataset.organelle)
    }
  })
}

/** Experiência de genética mendeliana. */
function mountMendelLab() {
  const selectA = document.getElementById('parent-a')
  const selectB = document.getElementById('parent-b')
  const panel = document.getElementById('punnett-panel')
  const explanation = document.getElementById('mendel-explanation')

  const gametes = (genotype) => (genotype === 'Aa' ? ['A', 'a'] : [genotype[0], genotype[0]])

  const render = () => {
    const a = selectA.value
    const b = selectB.value
    const gametesA = gametes(a)
    const gametesB = gametes(b)

    const cells = []
    for (const ga of gametesA) {
      for (const gb of gametesB) {
        cells.push({ genotype: ga + gb, a: ga, b: gb })
      }
    }

    const genotypeCounts = {}
    for (const cell of cells) {
      const sorted = [cell.a, cell.b].sort().join('')
      genotypeCounts[sorted] = (genotypeCounts[sorted] ?? 0) + 1
    }
    const total = cells.length

    const phenotypeCounts = { dominante: 0, recessivo: 0 }
    for (const cell of cells) {
      const sorted = [cell.a, cell.b].sort().join('')
      if (sorted.includes('A')) phenotypeCounts.dominante += 1
      else phenotypeCounts.recessivo += 1
    }

    panel.innerHTML = `
      <h2 class="card__title">Quadro de Punnett — ${a} × ${b}</h2>
      <div style="overflow-x:auto" class="mt-2">
        <table class="punnett">
          <thead>
            <tr>
              <th class="punnett__corner"></th>
              ${gametesB.map((g) => `<th>${g}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${gametesA
              .map(
                (ga) => `
              <tr>
                <th class="punnett__corner">${ga}</th>
                ${gametesB
                  .map(
                    (gb) => `
                  <td><strong>${ga}${gb}</strong>${
                    document.getElementById('mendel-show-prob')?.checked
                      ? `<br /><span class="text-xs text-muted">${Math.round((1 / total) * 100)}%</span>`
                      : ''
                  }</td>`,
                  )
                  .join('')}
              </tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <div class="grid grid--2 mt-3">
        <div>
          <h3 style="font-size:.95rem">Proporção genotípica</h3>
          <ul class="list">
            ${Object.entries(genotypeCounts)
              .map(
                ([genotype, count]) => `
              <li class="list__item">
                <strong style="flex:1">${genotype}</strong>
                <span>${count}/${total}</span>
                <strong style="min-width:3.5rem;text-align:right">${Math.round((count / total) * 100)}%</strong>
              </li>`,
              )
              .join('')}
          </ul>
        </div>
        <div>
          <h3 style="font-size:.95rem">Proporção fenotípica</h3>
          <ul class="list">
            <li class="list__item">
              <strong style="flex:1">Dominante</strong>
              <span>${phenotypeCounts.dominante}/${total}</span>
              <strong style="min-width:3.5rem;text-align:right">${Math.round(
                (phenotypeCounts.dominante / total) * 100,
              )}%</strong>
            </li>
            <li class="list__item">
              <strong style="flex:1">Recessivo</strong>
              <span>${phenotypeCounts.recessivo}/${total}</span>
              <strong style="min-width:3.5rem;text-align:right">${Math.round(
                (phenotypeCounts.recessivo / total) * 100,
              )}%</strong>
            </li>
          </ul>
        </div>
      </div>`

    explanation.textContent =
      gametesA.length === 2 && gametesB.length === 2
        ? `Ambos os progenitores são heterozigotos (${a} × ${b}). Como cada progenitor produz dois tipos de gameta em igual proporção, a geração F1 apresenta a proporção 3:1 entre o fenótipo dominante e o recessivo — o resultado clássico de Mendel.`
        : `No cruzamento ${a} × ${b}, pelo menos um dos progenitores é homozigoto. A geração F1 fica homogênea para o fenótipo dominante e, no caso de dois heterozigotos, a segregação reaparece em 3:1.`
  }

  selectA?.addEventListener('change', render)
  selectB?.addEventListener('change', render)
  document.getElementById('mendel-show-prob')?.addEventListener('change', render)

  document.getElementById('mendel-done')?.addEventListener('click', () => {
    completeLab('mendel', 'Simulou cruzamentos mendelianos no laboratório virtual')
  })

  render()
}

/** Experiência de fotossíntese. */
function mountPhotosynthesisLab() {
  const light = document.getElementById('sim-light')
  const water = document.getElementById('sim-water')
  const co2 = document.getElementById('sim-co2')
  const temp = document.getElementById('sim-temp')
  const result = document.getElementById('photosynthesis-result')

  const labels = {
    'sim-light-value': (value) => `${value}%`,
    'sim-water-value': (value) => `${value}%`,
    'sim-co2-value': (value) => `${value}%`,
    'sim-temp-value': (value) => `${value} °C`,
  }

  const render = () => {
    const l = Number(light.value)
    const w = Number(water.value)
    const c = Number(co2.value)
    const t = Number(temp.value)

    document.getElementById('sim-light-value').textContent = labels['sim-light-value'](l)
    document.getElementById('sim-water-value').textContent = labels['sim-water-value'](w)
    document.getElementById('sim-co2-value').textContent = labels['sim-co2-value'](c)
    document.getElementById('sim-temp-value').textContent = labels['sim-temp-value'](t)

    // Modelo simplificado: produto normalizado com penalidade térmica.
    const lightFactor = l / 100
    const waterFactor = 0.4 + (w / 100) * 0.6
    const co2Factor = 0.3 + (c / 100) * 0.7
    const optimal = 25
    const distance = Math.abs(t - optimal)
    const tempFactor = Math.max(0, 1 - distance / 30)

    const rate = Math.round(lightFactor * waterFactor * co2Factor * tempFactor * 100)
    const glucose = Math.round(rate * 0.9 * 10) / 10
    const oxygen = Math.round(rate * 1.2 * 10) / 10

    const limiting = [
      { name: 'luz', value: lightFactor },
      { name: 'água', value: waterFactor },
      { name: 'CO₂', value: co2Factor },
      { name: 'temperatura', value: tempFactor },
    ].sort((a, b) => a.value - b.value)[0]

    result.innerHTML = `
      <h2 class="card__title">Resultado da simulação</h2>
      <div class="stack mt-3">
        <div>
          <div class="row row--between text-sm mb-1">
            <span>Taxa de fotossíntese</span><strong>${rate}%</strong>
          </div>
          <div class="sim-bar"><div class="sim-bar__fill" style="width:${rate}%"></div></div>
        </div>
        <div>
          <div class="row row--between text-sm mb-1">
            <span>Glicose produzida (relativo)</span><strong>${glucose}</strong>
          </div>
          <div class="sim-bar"><div class="sim-bar__fill" style="width:${Math.min(100, glucose)}%"></div></div>
        </div>
        <div>
          <div class="row row--between text-sm mb-1">
            <span>Oxigênio liberado (relativo)</span><strong>${oxygen}</strong>
          </div>
          <div class="sim-bar"><div class="sim-bar__fill" style="width:${Math.min(100, oxygen)}%"></div></div>
        </div>
      </div>

      <div class="alert ${rate < 20 ? 'alert--warn' : 'alert--success'} mt-3">
        ${icon(rate < 20 ? 'alert' : 'circleCheck', { size: 18 })}
        <div>
          ${
            rate < 20
              ? `<strong>Fotossíntese muito baixa.</strong> O fator limitante é ${escapeHtml(limiting.name)}. ` +
                (l < 10 ? 'A luz é o primeiro fator a limiter: abaixo do ponto de compensação, a respiração supera a fotossíntese. ' : '') +
                'Aumente o fator indicado e observe a curva subir.'
              : `<strong>Fotossíntese em ritmo bom.</strong> O fator mais limitante é ${escapeHtml(limiting.name)}. ` +
                `Aumentá-lo ainda renderia ganhos, mas com menos efeito do que aumentar ${escapeHtml(
                  limiting.name,
                )} já em patamar elevado.`
          }
        </div>
      </div>

      <button class="btn btn--primary mt-3" id="photo-done" type="button">
        ${icon('check', { size: 18 })} Concluir experimento
      </button>`

    document.getElementById('photo-done')?.addEventListener('click', () => {
      completeLab('fotossintese', 'Simulou a fotossíntese no laboratório virtual')
    })
  }

  ;[light, water, co2, temp].forEach((input) => input?.addEventListener('input', render))
  render()
}

/** Experiência de cadeia alimentar. */
function mountFoodChainLab() {
  const selects = Array.from(document.querySelectorAll('[data-chain-index]'))
  const feedback = document.getElementById('chain-feedback')
  const preview = document.getElementById('chain-preview')

  const check = () => {
    const chosen = selects.map((select) => select.value)
    const problems = []

    if (chosen.some((value) => !value)) {
      problems.push('Preencha todos os níveis da cadeia.')
    } else {
      if (!FOOD_RULES['Produtor'].includes(chosen[0])) {
        problems.push('O primeiro nível precisa ser um produtor.')
      }
      for (let index = 1; index < chosen.length; index += 1) {
        if (!FOOD_RULES[CHAIN_LEVELS[index - 1].level].includes(chosen[index])) {
          problems.push(
            `“${chosen[index]}” não se alimenta de “${chosen[index - 1]}” — revise a relação trófica.`,
          )
        }
      }
    }

    const valid = problems.length === 0

    feedback.innerHTML = `
      <div class="alert ${valid ? 'alert--success' : 'alert--warn'}">
        ${icon(valid ? 'circleCheck' : 'alert', { size: 18 })}
        <div>
          ${
            valid
              ? `<strong>Cadeia válida!</strong> ${escapeHtml(chosen.join(' → '))}. Cada nível se alimenta do anterior.`
              : problems.map((problem) => `<div>${escapeHtml(problem)}</div>`).join('')
          }
        </div>
      </div>`

    preview.innerHTML = `
      <h2 class="card__title">Sua cadeia</h2>
      <div class="row mt-2" style="gap:.4rem">
        ${chosen
          .map(
            (value, index) => `
          ${index > 0 ? icon('arrowRight', { size: 16, className: 'text-muted' }) : ''}
          <span class="badge ${value ? 'badge--primary' : 'badge--outline'}">
            ${escapeHtml(value || CHAIN_LEVELS[index].level)}
          </span>`,
          )
          .join('')}
      </div>
      <p class="text-sm text-muted mt-3">
        ${
          valid
            ? 'Uma cadeia simples representa uma sequência linear. Na natureza, os mesmos organismos formam teias, em que um mesmo organismo pode ocupar mais de um nível trófico.'
            : 'Ajuste a seleção até que todos os níveis formem uma relação trófica válida.'
        }
      </p>`

    if (valid) {
      const button = document.createElement('button')
      button.className = 'btn btn--primary mt-3'
      button.type = 'button'
      button.innerHTML = `${icon('check', { size: 18 })} Concluir experimento`
      button.addEventListener('click', () => {
        completeLab('cadeia-alimentar', 'Montou cadeias alimentares no laboratório virtual')
      })
      feedback.appendChild(button)
    }
  }

  selects.forEach((select) => select.addEventListener('change', check))

  document.getElementById('check-chain')?.addEventListener('click', check)

  document.getElementById('random-chain')?.addEventListener('click', () => {
    const pool = [
      ['Alga', 'Zooplâncton', 'Peixe', 'Tubarão'],
      ['Fitoplâncton', 'Larva', 'Sapo', 'Cobra'],
      ['Capim', 'Coelho', 'Toupeira', 'Águia'],
      ['Capim', 'Larva', 'Pombo', 'Gavião'],
    ]
    const chosen = pool[Math.floor(Math.random() * pool.length)]
    selects.forEach((select, index) => {
      select.value = chosen[index]
    })
    check()
  })

  check()
}

/** Página de experimento inexistente. */
function notFound() {
  return `
  <div class="card empty">
    ${icon('info', { size: 48, className: 'empty__icon' })}
    <p class="empty__title">Experimento não encontrado</p>
    <a class="btn btn--primary btn--sm" href="#/laboratorio">Ver todos os experimentos</a>
  </div>`
}
