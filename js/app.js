/**
 * Ponto de entrada da aplicação BioLab.
 *
 * Responsabilidades:
 *  - aplicar o tema (claro/escuro/sistema) antes da primeira pintura;
 *  - montar o shell (sidebar, topbar, navegação móvel);
 *  - resolver a rota atual a partir do hash;
 *  - carregar a visão correspondente e renderizá-la no conteúdo.
 */

import { icon, logo } from './lib/icons.js'
import { on, toast } from './lib/dom.js'
import { getState, loadState, subscribe } from './lib/store.js'
import { updateSettings } from './lib/actions.js'
import { levelProgress, totalXp } from './lib/xp.js'

/* ------------------------------------------------------------------ */
/* Rotas                                                               */
/* ------------------------------------------------------------------ */

const ROUTES = [
  { path: 'dashboard', title: 'Painel', icon: 'home', load: () => import('./views/dashboard.js') },
  { path: 'biblioteca', title: 'Biblioteca', icon: 'book', load: () => import('./views/library.js') },
  { path: 'exercicios', title: 'Exercícios', icon: 'pencil', load: () => import('./views/exercises.js') },
  { path: 'simulados', title: 'Simulados', icon: 'clipboard', load: () => import('./views/exams.js') },
  { path: 'flashcards', title: 'Flashcards', icon: 'cards', load: () => import('./views/flashcards.js') },
  { path: 'laboratorio', title: 'Laboratório', icon: 'flask', load: () => import('./views/laboratory.js') },
  { path: 'progresso', title: 'Meu Progresso', icon: 'chart', load: () => import('./views/progress.js') },
  { path: 'configuracoes', title: 'Configurações', icon: 'settings', load: () => import('./views/settings.js') },
]

const MOBILE_ROUTES = ['dashboard', 'biblioteca', 'exercicios', 'simulados', 'progresso']

/* ------------------------------------------------------------------ */
/* Tema                                                                */
/* ------------------------------------------------------------------ */

const media = window.matchMedia('(prefers-color-scheme: dark)')

/** Aplica o tema efetivo no elemento `html`. */
function applyTheme(theme) {
  const effective = theme === 'auto' ? (media.matches ? 'escuro' : 'claro') : theme
  document.documentElement.dataset.theme = effective
  const meta = document.querySelector('meta[name="theme-color"]:not([media])')
  if (meta) meta.setAttribute('content', effective === 'escuro' ? '#0b1220' : '#1d4ed8')
}

/* ------------------------------------------------------------------ */
/* Shell                                                               */
/* ------------------------------------------------------------------ */

const dom = {
  sidebar: document.getElementById('sidebar'),
  nav: document.getElementById('nav'),
  brandMark: document.getElementById('brand-mark'),
  levelCard: document.getElementById('level-card'),
  topbarTitle: document.getElementById('topbar-title'),
  topbarActions: document.getElementById('topbar-actions'),
  menuToggle: document.getElementById('menu-toggle'),
  scrim: document.getElementById('scrim'),
  mobileNav: document.getElementById('mobile-nav'),
  content: document.getElementById('conteudo'),
}

/** Lê a rota atual a partir do hash. */
function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '')
  const [pathPart, ...rest] = raw.split('/')
  const [path, queryString] = rest.join('/').split('?')
  return {
    path: pathPart || 'dashboard',
    params: path ? [path, ...rest.slice(1)] : rest,
    query: queryString ?? '',
  }
}

let currentRoute = parseHash()

/** Monta a navegação lateral. */
function renderNav() {
  const state = getState()
  const dueCards = Object.values(state.flashcardSchedules ?? {}).filter(
    (schedule) => schedule.dueAt <= Date.now(),
  ).length

  dom.nav.innerHTML = `
    <p class="nav__label">Estudar</p>
    ${ROUTES.slice(0, 3)
      .map((route) => navItem(route, currentRoute.path))
      .join('')}
    <p class="nav__label">Praticar</p>
    ${ROUTES.slice(3, 6)
      .map((route) => navItem(route, currentRoute.path, route.path === 'flashcards' ? dueCards : 0))
      .join('')}
    <p class="nav__label">Acompanhamento</p>
    ${ROUTES.slice(6)
      .map((route) => navItem(route, currentRoute.path))
      .join('')}
  `
}

/** Item individual da navegação. */
function navItem(route, activePath, badge = 0) {
  const active = route.path === activePath
  return `
    <a class="nav__item" href="#/${route.path}" ${active ? 'aria-current="page"' : ''}>
      ${icon(route.icon, { className: 'nav__icon' })}
      <span>${route.title}</span>
      ${badge > 0 ? `<span class="nav__badge">${badge}</span>` : ''}
    </a>`
}

/** Monta a navegação móvel inferior. */
function renderMobileNav() {
  dom.mobileNav.innerHTML = `
    <ul class="mobile-nav__list">
      ${MOBILE_ROUTES.map((path) => {
        const route = ROUTES.find((item) => item.path === path)
        const active = route.path === currentRoute.path
        return `
        <li>
          <a class="mobile-nav__link" href="#/${route.path}" ${active ? 'aria-current="page"' : ''}>
            ${icon(route.icon, { size: 22 })}
            <span>${route.title.split(' ')[0]}</span>
          </a>
        </li>`
      }).join('')}
    </ul>`
}

/** Atualiza o cartão de nível no rodapé da sidebar. */
function renderLevelCard() {
  const state = getState()
  const xp = totalXp(state.xpEvents)
  const info = levelProgress(xp)

  dom.levelCard.innerHTML = `
    <div class="level-card__row">
      <span>Nível ${info.current.level}</span>
      <span>${xp} XP</span>
    </div>
    <div class="level-card__title">${info.current.title}</div>
    <div class="progress" style="margin-top:.5rem;background:rgba(255,255,255,.25)">
      <div class="progress__bar" style="width:${Math.round(info.progress * 100)}%;background:#fff"></div>
    </div>
    <div class="level-card__row" style="margin-top:.35rem">
      <span>${
        info.next
          ? `Faltam ${info.xpForNext} XP para o nível ${info.next.level}`
          : 'Nível máximo alcançado'
      }</span>
    </div>`
}

/** Botões rápidos do topo. */
function renderTopbarActions() {
  const isDark = document.documentElement.dataset.theme === 'escuro'

  dom.topbarActions.innerHTML = `
    <button class="btn btn--ghost btn--sm" id="theme-toggle" type="button"
      aria-label="${isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}">
      ${icon(isDark ? 'sun' : 'moon', { size: 18 })}
      <span class="hide-sm">${isDark ? 'Claro' : 'Escuro'}</span>
    </button>
    <button class="btn btn--ghost btn--sm" id="install-btn" type="button" hidden
      aria-label="Instalar o BioLab como aplicativo">
      ${icon('download', { size: 18 })}
      <span class="hide-sm">Instalar</span>
    </button>`

  const themeToggle = document.getElementById('theme-toggle')
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'escuro' ? 'claro' : 'escuro'
    updateSettings({ theme: next })
    applyTheme(next)
    renderTopbarActions()
  })

  const installBtn = document.getElementById('install-btn')
  if (deferredInstallPrompt) {
    installBtn.hidden = false
    installBtn.addEventListener('click', async () => {
      deferredInstallPrompt.prompt()
      const choice = await deferredInstallPrompt.userChoice
      if (choice.outcome === 'accepted') toast('BioLab instalado!', 'success')
      deferredInstallPrompt = null
      installBtn.hidden = true
    })
  }
}

/* ------------------------------------------------------------------ */
/* Roteamento                                                          */
/* ------------------------------------------------------------------ */

let renderToken = 0

/** Renderiza a visão correspondente à rota atual. */
async function renderRoute() {
  currentRoute = parseHash()
  const route =
    ROUTES.find((item) => item.path === currentRoute.path) ??
    ({ path: '404', title: 'Página não encontrada', icon: 'info', load: () => import('./views/notfound.js') })

  const token = ++renderToken

  renderNav()
  renderMobileNav()
  renderLevelCard()
  dom.topbarTitle.textContent = route.title
  document.title = `${route.title} — BioLab`

  dom.content.innerHTML = `
    <div class="stack">
      <div class="skeleton" style="height:2rem;width:45%"></div>
      <div class="skeleton" style="height:9rem"></div>
      <div class="grid grid--3">
        <div class="skeleton" style="height:7rem"></div>
        <div class="skeleton" style="height:7rem"></div>
        <div class="skeleton" style="height:7rem"></div>
      </div>
    </div>`

  try {
    const module = await route.load()
    if (token !== renderToken) return
    const view = module.default ?? module.render
    dom.content.innerHTML = await view({ params: currentRoute.params, hash: currentRoute })
    if (typeof module.mount === 'function') module.mount({ params: currentRoute.params })
    dom.content.scrollTop = 0
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('conteudo')?.focus({ preventScroll: true })
  } catch (error) {
    console.error('Falha ao carregar a visão:', error)
    dom.content.innerHTML = `
      <div class="card">
        <h2 class="card__title">Não foi possível carregar esta seção</h2>
        <p class="text-muted">Tente novamente em instantes. Se o problema persistir, recarregue a página.</p>
        <button class="btn btn--primary" onclick="window.location.reload()">Recarregar</button>
      </div>`
  }
}

/* ------------------------------------------------------------------ */
/* Menu lateral                                                        */
/* ------------------------------------------------------------------ */

function openSidebar() {
  dom.sidebar.classList.add('is-open')
  dom.scrim.hidden = false
  requestAnimationFrame(() => dom.scrim.classList.add('is-open'))
  dom.menuToggle.setAttribute('aria-expanded', 'true')
}

function closeSidebar() {
  dom.sidebar.classList.remove('is-open')
  dom.scrim.classList.remove('is-open')
  window.setTimeout(() => {
    dom.scrim.hidden = true
  }, 220)
  dom.menuToggle.setAttribute('aria-expanded', 'false')
}

/* ------------------------------------------------------------------ */
/* Service worker e instalação                                         */
/* ------------------------------------------------------------------ */

let deferredInstallPrompt = null

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('sw.js')
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing
        if (!worker) return
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            toast('Nova versão disponível. Recarregue para atualizar.', 'info', 8000)
          }
        })
      })
    } catch (error) {
      console.warn('Service worker não registrado:', error)
    }
  })
}

/* ------------------------------------------------------------------ */
/* Inicialização                                                       */
/* ------------------------------------------------------------------ */

function init() {
  loadState()

  const settings = getState().settings
  applyTheme(settings.theme ?? 'auto')
  media.addEventListener('change', () => {
    if ((getState().settings.theme ?? 'auto') === 'auto') applyTheme('auto')
  })

  document.body.dataset.fontScale = settings.fontScale ?? 'normal'
  document.body.dataset.reduceMotion = settings.reduceMotion ? 'true' : 'false'

  dom.brandMark.innerHTML = logo(40)
  dom.menuToggle.innerHTML = icon('menu', { size: 20 })

  dom.menuToggle.addEventListener('click', () => {
    if (dom.sidebar.classList.contains('is-open')) closeSidebar()
    else openSidebar()
  })
  dom.scrim.addEventListener('click', closeSidebar)
  on(dom.sidebar, 'click', 'a[href^="#/"]', () => closeSidebar())

  window.addEventListener('hashchange', renderRoute)

  subscribe(() => {
    renderLevelCard()
    renderNav()
    renderMobileNav()
  })

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferredInstallPrompt = event
    renderTopbarActions()
  })

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null
    toast('BioLab instalado com sucesso!', 'success')
  })

  renderTopbarActions()
  renderRoute()
  registerServiceWorker()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
