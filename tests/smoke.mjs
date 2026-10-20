/**
 * Smoke test: carrega cada visão dentro do jsdom e verifica que o HTML é
 * gerado sem exceções e com o conteúdo mínimo esperado.
 *
 * Uso: node --experimental-loader=... tests/smoke.mjs
 * (executado por scripts/smoke.mjs, que usa o jsdom instalado em biolab/)
 */
import { JSDOM } from 'jsdom'

const ROUTES = [
  { hash: '#/dashboard', view: 'dashboard', expect: 'jornada pela Biologia' },
  { hash: '#/biblioteca', view: 'library', expect: 'Biblioteca de Biologia' },
  { hash: '#/biblioteca/citologia', view: 'library', params: ['citologia'], expect: 'Citologia' },
  { hash: '#/aula/cit-01', view: 'lesson', params: ['cit-01'], expect: 'teoria celular' },
  { hash: '#/exercicios', view: 'exercises', expect: 'Central de Exercícios' },
  { hash: '#/simulados', view: 'exams', expect: 'Simulados' },
  { hash: '#/flashcards', view: 'flashcards', expect: 'Flashcards' },
  { hash: '#/laboratorio', view: 'laboratory', expect: 'Laboratório Virtual' },
  {
    hash: '#/laboratorio/celula-animal',
    view: 'laboratory',
    params: ['celula-animal'],
    expect: 'Célula Animal',
  },
  { hash: '#/laboratorio/mendel', view: 'laboratory', params: ['mendel'], expect: 'Punnett' },
  { hash: '#/progresso', view: 'progress', expect: 'Meu Progresso' },
  { hash: '#/configuracoes', view: 'settings', expect: 'Configurações' },
  { hash: '#/rota-inexistente', view: 'notfound', expect: 'não encontrada' },
]

const errors = []

for (const route of ROUTES) {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: `http://localhost/${route.hash}`,
    pretendToBeVisual: true,
  })

  const { window } = dom
  globalThis.window = window
  globalThis.document = window.document
  globalThis.HTMLElement = window.HTMLElement
  globalThis.Element = window.Element
  globalThis.Node = window.Node
  globalThis.localStorage = window.localStorage
  globalThis.HashChangeEvent = window.HashChangeEvent
  globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0)
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
  globalThis.matchMedia = window.matchMedia = () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  })

  // Captura erros de console e exceções não tratados.
  window.addEventListener('error', (event) => errors.push(`${route.hash}: ${event.message}`))

  try {
    const module = await import(`../js/views/${route.view ?? 'notfound'}.js`)
    const view = module.default
    const html = await view({
      params: route.params ?? [],
      hash: { path: route.hash, params: route.params ?? [], query: '' },
    })
    if (typeof html !== 'string' || html.length < 100) {
      errors.push(`${route.hash}: saída vazia ou muito curta`)
    } else if (!html.includes(route.expect)) {
      errors.push(`${route.hash}: não contém "${route.expect}"`)
    } else {
      console.log(`✓ ${route.hash}`)
    }
  } catch (error) {
    errors.push(`${route.hash}: ${error.message}\n${error.stack?.split('\n').slice(0, 4).join('\n')}`)
  }

  dom.window.close()
}

if (errors.length > 0) {
  console.error(`\n${errors.length} problema(s):`)
  for (const error of errors) console.error(`  ✗ ${error}`)
  process.exit(1)
}

console.log('\n✓ Todas as visões renderizam corretamente.')
