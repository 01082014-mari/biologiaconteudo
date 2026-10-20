#!/usr/bin/env node
/**
 * Gera as ilustrações SVG das dez trilhas de conteúdo em `illustrations`.
 *
 * Uso: node scripts/generate-illustrations.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const OUT = join(ROOT, 'illustrations')

/** Desenho específico de cada trilha. */
const ART = {
  citologia: `
    <ellipse cx="160" cy="92" rx="104" ry="70" fill="#ffffff" fill-opacity=".28" stroke="#ffffff" stroke-width="2.5"/>
    <ellipse cx="140" cy="80" rx="30" ry="26" fill="#ffffff" fill-opacity=".5"/>
    <circle cx="132" cy="74" r="8" fill="#1D4ED8" fill-opacity=".6"/>
    <path d="M186 58c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16z" fill="#ffffff" fill-opacity=".45"/>
    <g fill="#ffffff" fill-opacity=".55">
      <ellipse cx="100" cy="118" rx="11" ry="5"/>
      <ellipse cx="214" cy="112" rx="11" ry="5" transform="rotate(-18 214 112)"/>
    </g>
    <circle cx="228" cy="72" r="7" fill="#ffffff" fill-opacity=".4"/>`,
  genetica: `
    <g stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round">
      <path d="M120 30c0 40 80 50 80 90s-80 50-80 90"/>
      <path d="M200 30c0 40-80 50-80 90s80 50 80 90"/>
    </g>
    <g stroke="#ffffff" stroke-opacity=".65" stroke-width="3">
      <path d="M132 50h56M124 80h72M120 110h80M124 140h72M132 170h56"/>
    </g>`,
  ecologia: `
    <path d="M160 150c-38 0-62-26-62-56 0-26 20-46 44-52 4-22 18-34 34-34s30 12 34 34c24 6 44 26 44 52 0 30-24 56-62 56z"
          fill="#ffffff" fill-opacity=".32" stroke="#ffffff" stroke-width="2.5"/>
    <path d="M160 152V72" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
    <path d="M160 100c-14-14-30-18-44-14 4 16 20 26 44 22M160 118c14-14 30-18 44-14-4 16-20 26-44 22"
          fill="#ffffff" fill-opacity=".45" stroke="#ffffff" stroke-width="2"/>`,
  'corpo-humano': `
    <path d="M160 42c-16 0-28 12-28 28 0 10 5 19 13 24-14 6-24 18-24 32 0 8 3 15 8 21v27h62v-27c5-6 8-13 8-21 0-14-10-26-24-32 8-5 13-14 13-24 0-16-12-28-28-28z"
          fill="#ffffff" fill-opacity=".3" stroke="#ffffff" stroke-width="2.5"/>
    <path d="M132 96h56" stroke="#ffffff" stroke-width="2.5"/>
    <path d="M160 96v78" stroke="#ffffff" stroke-width="2.5"/>`,
  evolucao: `
    <path d="M60 150c40 0 40-110 100-110s60 110 100 110" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
    <g fill="#ffffff">
      <circle cx="60" cy="150" r="9"/>
      <circle cx="110" cy="93" r="9"/>
      <circle cx="160" cy="62" r="11"/>
      <circle cx="210" cy="93" r="9"/>
      <circle cx="260" cy="150" r="9"/>
    </g>`,
  botanica: `
    <path d="M160 168V70" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
    <path d="M160 108c-30-6-48-26-50-52 28-4 46 12 50 46zM160 92c30-6 48-26 50-52-28-4-46 12-50 46z"
          fill="#ffffff" fill-opacity=".45" stroke="#ffffff" stroke-width="2.5"/>
    <path d="M160 140c-22-4-36-20-38-38 22-2 34 10 38 34zM160 128c22-4 36-20 38-38-22-2-34 10-38 34z"
          fill="#ffffff" fill-opacity=".3" stroke="#ffffff" stroke-width="2"/>`,
  zoologia: `
    <ellipse cx="146" cy="98" rx="52" ry="34" fill="#ffffff" fill-opacity=".34" stroke="#ffffff" stroke-width="2.5"/>
    <circle cx="196" cy="86" r="20" fill="#ffffff" fill-opacity=".34" stroke="#ffffff" stroke-width="2.5"/>
    <circle cx="202" cy="82" r="3.5" fill="#ffffff"/>
    <path d="M216 90l14 6-14 6" fill="#ffffff" fill-opacity=".5"/>
    <path d="M96 110l-16 26 22-14M120 124l-6 30 16-24" fill="#ffffff" fill-opacity=".3"/>`,
  microbiologia: `
    <rect x="96" y="74" width="128" height="76" rx="38" fill="#ffffff" fill-opacity=".3" stroke="#ffffff" stroke-width="2.5"/>
    <g stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none">
      <path d="M104 92h-16M104 112h-22M104 132h-16M216 92h16M216 112h22M216 132h16"/>
    </g>
    <circle cx="146" cy="112" r="12" fill="#ffffff" fill-opacity=".45"/>`,
  bioquimica: `
    <path d="M132 34h56v18l30 70a22 22 0 0 1-19 32h-78a22 22 0 0 1-19-32l30-70z"
          fill="#ffffff" fill-opacity=".3" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M124 118h72l14 32a20 20 0 0 1-18 28h-64a20 20 0 0 1-18-28z" fill="#ffffff" fill-opacity=".45"/>
    <circle cx="140" cy="140" r="6" fill="#ffffff" fill-opacity=".8"/>
    <circle cx="166" cy="152" r="8" fill="#ffffff" fill-opacity=".8"/>
    <circle cx="186" cy="136" r="5" fill="#ffffff" fill-opacity=".8"/>`,
  classificacao: `
    <g fill="#ffffff" fill-opacity=".32" stroke="#ffffff" stroke-width="2.5">
      <path d="M160 34l92 44-92 44-92-44z"/>
      <path d="M68 78v30l92 44 92-44V78"/>
      <path d="M68 112v28l92 44 92-44v-28"/>
    </g>`,
}

/** Cores de cada trilha. */
const COLORS = {
  citologia: ['#1D4ED8', '#38BDF8'],
  genetica: ['#5B21B6', '#A855F7'],
  ecologia: ['#CA8A04', '#FACC15'],
  'corpo-humano': ['#9F1239', '#FB7185'],
  evolucao: ['#B45309', '#F59E0B'],
  botanica: ['#0E7490', '#22D3EE'],
  zoologia: ['#0369A1', '#38BDF8'],
  microbiologia: ['#86198F', '#E879F9'],
  bioquimica: ['#115E59', '#2DD4BF'],
  classificacao: ['#3730A3', '#818CF8'],
}

await mkdir(OUT, { recursive: true })

for (const [slug, art] of Object.entries(ART)) {
  const [from, to] = COLORS[slug]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180" role="img" aria-label="Ilustração da trilha">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="320" height="180" fill="url(#bg)"/>
  <circle cx="266" cy="26" r="58" fill="#ffffff" fill-opacity=".07"/>
  <circle cx="46" cy="160" r="44" fill="#ffffff" fill-opacity=".06"/>
  ${art}
</svg>`

  await writeFile(join(OUT, `${slug}.svg`), svg, 'utf8')
  console.log(`✓ illustrations/${slug}.svg`)
}

console.log('Ilustrações geradas.')
