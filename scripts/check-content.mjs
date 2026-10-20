#!/usr/bin/env node
/**
 * Verifica os arquivos de conteúdo da plataforma BioLab em busca de artefatos
 * de tokenização (caracteres fora do repertório latiniano) e de termos em
 * inglês que não deveriam aparecer no material em português.
 *
 * Uso: node scripts/check-content.mjs
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const TARGETS = ['js/data', 'js/lib', 'biolab/src/content']

const SUSPICIOUS_CHARS = [
  [/\p{Script=Han}/gu, 'caractere Han (CJK)'],
  [/\p{Script=Hiragana}/gu, 'hiragana'],
  [/\p{Script=Katakana}/gu, 'katakana'],
  [/\p{Script=Hangul}/gu, 'hangul'],
  [/\p{Script=Cyrillic}/gu, 'cirílico'],
  [/\p{Script=Arabic}/gu, 'árabe'],
  [/\p{Script=Devanagari}/gu, 'devanagari'],
  [/\uFFFD/gu, 'caractere de substituição (U+FFFD)'],
]

const ENGLISH_TERMS = [
  'Factory',
  'synthesiza',
  'Developer',
  'Acceptor',
  'Synthesis',
  'Enhance',
  'Provider',
  'Structure',
  'Function',
  'Component',
  'Default',
  'Working',
  'developing',
  'involved',
  'crossing over',
  'Accepted',
  'Strong',
  'Symbol',
  'Target',
  'Answer',
  'Choose',
  'Template',
  'Layout',
  'Column',
  'Content',
  'Section',
  'Number',
  'Toggle',
  'Report',
  'Score',
  'Timer',
  'Wrong',
  'support',
  'contact',
  'direct',
  'protect',
  'subject',
  'process',
  'produce',
  'present',
  'content',
  'region',
  'system',
  'number',
  'example',
  'figure',
  'level',
  'moment',
  'signal',
  'target',
  'simple',
  'modern',
  'nature',
  'culture',
  'school',
  'teacher',
  'student',
  'class',
  'group',
  'team',
  'whole',
  'entire',
  'increase',
  'introduced',
  'affected',
  'called',
  'acting',
  'guarantee',
  'prepare',
  'prepares',
  'notified',
  'classically',
  'intermembrane',
  'value',
  'true',
  'false',
  'null',
  'undefined',
]

async function collect(dir) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await collect(full)))
    else if (['.js', '.ts', '.tsx'].includes(extname(entry.name))) files.push(full)
  }
  return files
}

/** Extrai os literais de string de uma linha, ignorando código. */
function extractLiterals(line) {
  const literals = []
  const pattern = /'([^'\\]*(?:\\.[^'\\]*)*)'|"([^"\\]*(?:\\.[^"\\]*)*)"|`([^`\\]*(?:\\.[^`\\]*)*)`/g
  let match
  while ((match = pattern.exec(line)) !== null) {
    literals.push(match[1] ?? match[2] ?? match[3] ?? '')
  }
  return literals
}

const files = (await Promise.all(TARGETS.map((dir) => collect(join(ROOT, dir))))).flat()
let problems = 0

for (const file of files) {
  const content = await readFile(file, 'utf8')
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    for (const literal of extractLiterals(line)) {
      if (literal.length < 3) continue
      for (const [pattern, label] of SUSPICIOUS_CHARS) {
        if (pattern.test(literal)) {
          console.error(`✗ ${file}:${index + 1} [${label}] ${literal.trim().slice(0, 160)}`)
          problems += 1
        }
      }
      for (const term of ENGLISH_TERMS) {
        const re = new RegExp(`(?<![\\w'"])${term}(?![\\w'"])`, 'i')
        if (re.test(literal)) {
          console.error(`✗ ${file}:${index + 1} [termo em inglês: ${term}] ${literal.trim().slice(0, 160)}`)
          problems += 1
        }
      }
    }
  })
}

if (problems > 0) {
  console.error(`\n${problems} problema(s) encontrado(s) no conteúdo.`)
  process.exit(1)
}

console.log(`✓ Conteúdo validado: ${files.length} arquivo(s) sem artefatos.`)
