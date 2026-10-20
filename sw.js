/**
 * Service worker do BioLab.
 *
 * Estratégia:
 *  - navegação (HTML): rede primeiro, com o índice em cache como reserva
 *    para que a plataforma abra offline;
 *  - arquivos estáticos (CSS, JS, SVG, PNG): cache primeiro, com
 *    atualização em segundo plano;
 *  - fontes externas: cache apenas quando disponíveis, sem bloquear a
 *    navegação caso a rede falhe.
 *
 * Os recursos essenciais são pré-cacheados na instalação, de modo que a
 * primeira visita já deixa a plataforma utilizável sem internet.
 *
 * Todos os caminhos são relativos ao local do próprio service worker, para
 * que a aplicação funcione tanto na raiz de um domínio quanto em uma
 * subpasta (por exemplo, `github.io/biologiaconteudo/`).
 */

const VERSION = 'v1.0.0'
const STATIC_CACHE = `biolab-static-${VERSION}`
const PAGE_CACHE = `biolab-pages-${VERSION}`
const FONT_CACHE = `biolab-fonts-${VERSION}`

const PRECACHE_URLS = [
  './',
  './index.html',
  './offline.html',
  './manifest.webmanifest',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './js/app.js',
  './js/lib/icons.js',
  './js/lib/utils.js',
  './js/lib/dom.js',
  './js/lib/store.js',
  './js/lib/grading.js',
  './js/lib/srs.js',
  './js/lib/xp.js',
  './js/lib/progress.js',
  './js/lib/exam.js',
  './js/lib/actions.js',
  './js/lib/charts.js',
  './js/data/topics.js',
  './js/data/lessons.js',
  './js/data/questions.js',
  './js/data/questions-citology.js',
  './js/data/questions-genetics.js',
  './js/data/questions-ecology.js',
  './js/data/questions-human.js',
  './js/data/questions-extra.js',
  './js/data/flashcards.js',
  './js/data/achievements.js',
  './js/views/dashboard.js',
  './js/views/library.js',
  './js/views/lesson.js',
  './js/views/lesson-quiz.js',
  './js/views/exercises.js',
  './js/views/exams.js',
  './js/views/flashcards.js',
  './js/views/laboratory.js',
  './js/views/progress.js',
  './js/views/settings.js',
  './js/views/notfound.js',
  './icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './illustrations/citologia.svg',
  './illustrations/genetica.svg',
  './illustrations/ecologia.svg',
  './illustrations/corpo-humano.svg',
  './illustrations/evolucao.svg',
  './illustrations/botanica.svg',
  './illustrations/zoologia.svg',
  './illustrations/microbiologia.svg',
  './illustrations/bioquimica.svg',
  './illustrations/classificacao.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        // Recursos ausentes não devem impedir a instalação inteira.
        Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => null),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== PAGE_CACHE && key !== FONT_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

/** Caminho absoluto da requisição, ignorando a query string. */
function cleanPath(request) {
  const url = new URL(request.url)
  url.hash = ''
  url.search = ''
  return url.pathname
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') return

  const url = new URL(request.url)
  const sameOrigin = url.origin === self.location.origin

  // Navegação: rede primeiro, com o índice em cache como reserva offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(PAGE_CACHE).then((cache) => cache.put('./index.html', copy))
          return response
        })
        .catch(async () => {
          const cached = await caches.match('./index.html')
          return cached ?? caches.match('./offline.html')
        }),
    )
    return
  }

  // Fontes externas: cache primeiro, com tolerância a falhas de rede.
  if (!sameOrigin) {
    if (url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com')) {
      event.respondWith(
        caches.open(FONT_CACHE).then(async (cache) => {
          const cached = await cache.match(request)
          const network = fetch(request)
            .then((response) => {
              if (response.ok) cache.put(request, response.clone())
              return response
            })
            .catch(() => cached)
          return cached ?? network
        }),
      )
    }
    return
  }

  // Arquivos estáticos da própria origem: cache primeiro.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(STATIC_CACHE).then((cache) => cache.put(cleanPath(request), copy))
          }
          return response
        })
        .catch(() => cached)
      return cached ?? network
    }),
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
})
