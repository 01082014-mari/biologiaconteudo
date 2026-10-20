#!/usr/bin/env node
/**
 * Executa o smoke test das visões em um ambiente DOM simulado (jsdom).
 *
 * O jsdom está disponível em `biolab/node_modules` (dependência de
 * desenvolvimento da versão React da plataforma). O script cria um link
 * temporário de `node_modules`, executa o teste e remove o link em seguida.
 *
 * Uso: node scripts/smoke.mjs
 */
import { symlink, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const MODULES = join(ROOT, 'node_modules')
const SOURCE = join(ROOT, 'biolab', 'node_modules')

if (!existsSync(join(SOURCE, 'jsdom'))) {
  console.error(
    'jsdom não encontrado. Rode `npm install --prefix biolab` ou execute o smoke test em outro ambiente.',
  )
  process.exit(1)
}

const alreadyLinked = existsSync(MODULES)
if (!alreadyLinked) await symlink(SOURCE, MODULES, 'dir')

const child = spawn(process.execPath, [join(ROOT, 'tests', 'smoke.mjs')], {
  stdio: 'inherit',
  cwd: ROOT,
})

child.on('exit', async (code) => {
  if (!alreadyLinked) await rm(MODULES, { force: true, recursive: true }).catch(() => {})
  process.exit(code ?? 1)
})
