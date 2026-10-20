#!/usr/bin/env node
/**
 * Verifica que o HTML gerado por cada visão não contém valores indefinidos
 * ou quebrados ("undefined", "NaN", "[object Object]").
 *
 * Uso: node scripts/check-render.mjs
 */
import { symlink } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const VIEWS = join(ROOT, 'js', 'views')

/**
 * O jsdom é uma dependência de desenvolvimento. Se não estiver disponível,
 * criamos um link temporário para o `node_modules` existente no ambiente.
 */
async function loadJsdom() {
  try {
    return await import('jsdom')
  } catch {
    const source = join(ROOT, 'biolab', 'node_modules')
    if (!existsSync(join(source, 'jsdom'))) throw new Error('jsdom não encontrado')
    const modules = join(ROOT, 'node_modules')
    if (!existsSync(modules)) await symlink(source, modules, 'dir')
    return await import('jsdom')
  }
}

const { JSDOM } = await loadJsdom()

/** Ambiente DOM mínimo. */
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' })
globalThis.window = dom.window
globalThis.document = dom.window.document
globalThis.HTMLElement = dom.window.HTMLElement
globalThis.Element = dom.window.Element
globalThis.Node = dom.window.Node
globalThis.localStorage = dom.window.localStorage
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0)
globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })

const CASES = [
  ['dashboard', [], 'Painel inicial'],
  ['library', [], 'Biblioteca'],
  ['library', ['citologia'], 'Trilha Citologia'],
  ['lesson', ['cit-01'], 'Aula de Citologia'],
  ['exercises', [], 'Central de Exercícios'],
  ['exams', [], 'Simulados'],
  ['flashcards', [], 'Flashcards'],
  ['laboratory', [], 'Laboratório'],
  ['laboratory', ['celula-animal'], 'Experimento Célula Animal'],
  ['laboratory', ['mendel'], 'Experimento Mendel'],
  ['laboratory', ['fotossintese'], 'Experimento Fotossíntese'],
  ['laboratory', ['cadeia-alimentar'], 'Experimento Cadeia Alimentar'],
  ['progress', [], 'Meu Progresso'],
  ['settings', [], 'Configurações'],
]

const BROKEN = ['undefined', 'NaN', '[object Object]', 'null</span>']
const problems = []

for (const [view, params, label] of CASES) {
  const module = await import(join(VIEWS, `${view}.js`))
  const html = await module.default({ params, hash: { path: '', params, query: '' } })

  for (const marker of BROKEN) {
    if (html.includes(marker)) {
      const index = html.indexOf(marker)
      const context = html.slice(Math.max(0, index - 90), index + 90).replace(/\s+/g, ' ')
      problems.push(`${label}: contém "${marker}" — …${context}…`)
    }
  }
  console.log(`✓ ${label}`)
}

if (problems.length > 0) {
  console.error(`\n${problems.length} problema(s) de renderização:`)
  for (const problem of problems) console.error(`  ✗ ${problem}`)
  process.exit(1)
}

console.log('\n✓ Renderização sem valores quebrados.')
