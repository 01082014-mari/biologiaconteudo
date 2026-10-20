#!/usr/bin/env node
/**
 * Gera os ícones PNG da PWA a partir do logotipo SVG, usando `sharp`.
 *
 * Uso: node scripts/generate-icons.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const ICONS = join(ROOT, 'icons')

/** Logotipo base, com a área segura do ícone maskable. */
function logoSvg({ padding = 0, radius = 0, background = null } = {}) {
  const size = 512
  const inner = size - padding * 2
  const scale = inner / 512

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#86EFAC"/>
      <stop offset="55%" stop-color="#22C55E"/>
      <stop offset="100%" stop-color="#166534"/>
    </linearGradient>
  </defs>
  ${
    background
      ? `<rect width="${size}" height="${size}" rx="${radius}" fill="${background}"/>`
      : ''
  }
  <g transform="translate(${padding},${padding}) scale(${scale})">
    ${
      radius > 0
        ? `<rect x="0" y="0" width="512" height="512" rx="${radius / scale}" fill="url(#g)"/>`
        : `<rect x="0" y="0" width="512" height="512" fill="url(#g)"/>`
    }
    <path d="M256 96c88 0 152 61 152 148 0 93-72 172-152 172S104 337 104 244C104 157 168 96 256 96z"
          fill="none" stroke="#FFFFFF" stroke-opacity="0.32" stroke-width="13"/>
    <circle cx="256" cy="248" r="92" fill="#FFFFFF" fill-opacity="0.14" stroke="#FFFFFF" stroke-width="19"/>
    <circle cx="256" cy="248" r="35" fill="#FFFFFF"/>
    <path d="M200 148c26 24 26 64 0 88M312 148c-26 24-26 64 0 88M200 348c26-24 26-64 0-88M312 348c-26-24-26-64 0-88"
          fill="none" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round"/>
    <path d="M256 96c0 56-24 88-24 152s24 96 24 168" fill="none" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round"/>
  </g>
</svg>`)
}

async function writeIcon(name, buffer) {
  await writeFile(join(ICONS, name), buffer)
  console.log(`✓ icons/${name}`)
}

await mkdir(ICONS, { recursive: true })

// Ícone "any": cantos arredondados.
await writeIcon('icon-192.png', await sharp(logoSvg({ radius: 96 })).resize(192, 192).png().toBuffer())
await writeIcon('icon-512.png', await sharp(logoSvg({ radius: 96 })).resize(512, 512).png().toBuffer())

// Ícone maskable: fundo preenchido e conteúdo dentro da área segura (80%).
await writeIcon(
  'icon-maskable-512.png',
  await sharp(logoSvg({ padding: 52, background: '#166534' })).resize(512, 512).png().toBuffer(),
)

// Apple touch icon: sem transparência, cantos retos (o iOS aplica a máscara).
await writeIcon(
  'apple-touch-icon.png',
  await sharp(logoSvg({ radius: 0 })).resize(180, 180).png().toBuffer(),
)

// Favicon SVG vetorial.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#86EFAC"/>
      <stop offset="55%" stop-color="#22C55E"/>
      <stop offset="100%" stop-color="#166534"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <path d="M32 12c11 0 19 7.6 19 18.5 0 11.6-9 21.5-19 21.5S13 42.1 13 30.5C13 19.6 21 12 32 12z"
        fill="none" stroke="#FFFFFF" stroke-opacity=".32" stroke-width="1.6"/>
  <circle cx="32" cy="31" r="11.5" fill="#FFFFFF" fill-opacity=".14" stroke="#FFFFFF" stroke-width="2.4"/>
  <circle cx="32" cy="31" r="4.4" fill="#FFFFFF"/>
  <path d="M25 18.5c3.2 3 3.2 8 0 11M39 18.5c-3.2 3-3.2 8 0 11M25 43.5c3.2-3 3.2-8 0-11M39 43.5c-3.2-3-3.2-8 0-11"
        fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M32 12c0 7-3 11-3 19s3 12 3 21" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
</svg>`

await writeIcon('favicon.svg', Buffer.from(favicon, 'utf8'))
console.log('Ícones gerados.')
