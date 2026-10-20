#!/usr/bin/env node
/**
 * Gera os ícones PNG da PWA a partir do logotipo do BioLab.
 *
 * O rasterizador é próprio, sem dependências externas: o logotipo é
 * desenhado com as mesmas primitivas do SVG (gradiente diagonal, traços
 * arredondados e círculos), o que mantém o script executável em qualquer
 * máquina — `npm run icons` não exige instalar nada.
 *
 * Uso: node scripts/generate-icons.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { deflateSync } from 'node:zlib'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const ICONS = join(ROOT, 'icons')

/* ------------------------------------------------------------------ */
/* Paleta do logotipo — azul com detalhes em amarelo                    */
/* ------------------------------------------------------------------ */

const GRADIENT = [
  { offset: 0, color: '#60A5FA' },
  { offset: 0.55, color: '#1D4ED8' },
  { offset: 1, color: '#172554' },
]
const YELLOW = '#FACC15'
const WHITE = '#FFFFFF'

/* ------------------------------------------------------------------ */
/* Utilidades de cor                                                   */
/* ------------------------------------------------------------------ */

/** Converte "#rrggbb" em [r, g, b]. */
function hex(color) {
  const value = parseInt(color.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

/** Mistura linear entre duas cores RGB. */
function mix(from, to, t) {
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
    from[2] + (to[2] - from[2]) * t,
  ]
}

/** Amostra o gradiente diagonal nas paradas declaradas. */
function gradientAt(stops, t) {
  const clamped = Math.min(Math.max(t, 0), 1)
  for (let i = 1; i < stops.length; i += 1) {
    const previous = stops[i - 1]
    const next = stops[i]
    if (clamped <= next.offset) {
      const span = next.offset - previous.offset || 1
      const local = (clamped - previous.offset) / span
      return mix(hex(previous.color), hex(next.color), local)
    }
  }
  return hex(stops[stops.length - 1].color)
}

/* ------------------------------------------------------------------ */
/* Rasterizador                                                        */
/* ------------------------------------------------------------------ */

class Raster {
  /** Cria uma tela de `size` pixels, renderizada com sobreamostragem `scale`. */
  constructor(size, scale = 3) {
    this.size = size
    this.scale = scale
    this.unit = size / 64 // converte as unidades do logotipo em pixels
    this.width = size * scale
    this.pixels = new Float32Array(this.width * this.width * 4)
  }

  /** Compõe uma cor sobre o pixel com o alfa informado. */
  blend(x, y, color, alpha) {
    if (alpha <= 0) return
    const index = (y * this.width + x) * 4
    const pixels = this.pixels
    const destinationAlpha = pixels[index + 3]
    const outputAlpha = alpha + destinationAlpha * (1 - alpha)
    if (outputAlpha <= 0) return
    for (let channel = 0; channel < 3; channel += 1) {
      pixels[index + channel] =
        (color[channel] * alpha + pixels[index + channel] * destinationAlpha * (1 - alpha)) /
        outputAlpha
    }
    pixels[index + 3] = outputAlpha
  }

  /** Reduz a tela ao tamanho final, calculando a média dos blocos. */
  resolve() {
    const { size, scale, width, pixels } = this
    const output = Buffer.alloc(size * size * 4)
    const samples = scale * scale
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        let alphaSum = 0
        let red = 0
        let green = 0
        let blue = 0
        for (let sy = 0; sy < scale; sy += 1) {
          for (let sx = 0; sx < scale; sx += 1) {
            const index = ((y * scale + sy) * width + (x * scale + sx)) * 4
            const alpha = pixels[index + 3]
            alphaSum += alpha
            red += pixels[index] * alpha
            green += pixels[index + 1] * alpha
            blue += pixels[index + 2] * alpha
          }
        }
        const target = (y * size + x) * 4
        const alpha = alphaSum / samples
        output[target + 3] = Math.round(alpha * 255)
        if (alpha > 0) {
          output[target] = Math.round(red / samples / alpha)
          output[target + 1] = Math.round(green / samples / alpha)
          output[target + 2] = Math.round(blue / samples / alpha)
        }
      }
    }
    return output
  }
}

/** Avalia um ponto de Bézier cúbica. */
function cubicAt(p0, p1, p2, p3, t) {
  const inverse = 1 - t
  const a = inverse * inverse * inverse
  const b = 3 * inverse * inverse * t
  const c = 3 * inverse * t * t
  const d = t * t * t
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
  ]
}

/** Converte uma sequência de segmentos cúbicos em uma polilinha. */
function flattenCubic(start, segments, steps = 120) {
  const points = [start]
  let current = start
  for (const segment of segments) {
    for (let step = 1; step <= steps; step += 1) {
      current = cubicAt(current, segment[0], segment[1], segment[2], step / steps)
      points.push(current)
    }
  }
  return points
}

/* ------------------------------------------------------------------ */
/* Primitivas de desenho                                               */
/* ------------------------------------------------------------------ */

/** Retângulo de cantos arredondados preenchido com um gradiente. */
function fillRoundedRect(raster, options) {
  const { x, y, width, height, radius, gradient } = options
  const { unit, width: deviceWidth } = raster
  const factor = unit * raster.scale
  const left = x * factor
  const top = y * factor
  const right = (x + width) * factor
  const bottom = (y + height) * factor
  const corner = radius * factor

  for (let py = Math.max(0, Math.floor(top)); py < Math.min(deviceWidth, bottom); py += 1) {
    for (let px = Math.max(0, Math.floor(left)); px < Math.min(deviceWidth, right); px += 1) {
      const cx = px + 0.5
      const cy = py + 0.5
      const dx = Math.max(left + corner - cx, 0, cx - (right - corner))
      const dy = Math.max(top + corner - cy, 0, cy - (bottom - corner))
      if (dx * dx + dy * dy > corner * corner) continue
      const t = ((cx - left) / (right - left) + (cy - top) / (bottom - top)) / 2
      raster.blend(px, py, gradientAt(gradient, t), 1)
    }
  }
}

/** Círculo preenchido. */
function fillCircle(raster, options) {
  const { cx, cy, radius, color, alpha = 1 } = options
  const { unit, width: deviceWidth } = raster
  const factor = unit * raster.scale
  const centerX = cx * factor
  const centerY = cy * factor
  const r = radius * factor
  for (let py = Math.max(0, Math.floor(centerY - r)); py <= Math.min(deviceWidth, centerY + r); py += 1) {
    for (let px = Math.max(0, Math.floor(centerX - r)); px <= Math.min(deviceWidth, centerX + r); px += 1) {
      const dx = px + 0.5 - centerX
      const dy = py + 0.5 - centerY
      if (dx * dx + dy * dy > r * r) continue
      raster.blend(px, py, color, alpha)
    }
  }
}

/** Círculo contornado. */
function strokeCircle(raster, options) {
  const { cx, cy, radius, width: strokeWidth, color, alpha = 1 } = options
  const { unit, width: deviceWidth } = raster
  const factor = unit * raster.scale
  const centerX = cx * factor
  const centerY = cy * factor
  const r = radius * factor
  const half = (strokeWidth * factor) / 2
  const outer = r + half
  for (let py = Math.max(0, Math.floor(centerY - outer)); py <= Math.min(deviceWidth, centerY + outer); py += 1) {
    for (let px = Math.max(0, Math.floor(centerX - outer)); px <= Math.min(deviceWidth, centerX + outer); px += 1) {
      const dx = px + 0.5 - centerX
      const dy = py + 0.5 - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance > outer || distance < r - half) continue
      raster.blend(px, py, color, alpha)
    }
  }
}

/** Polilinha contornada, com juntas e pontas arredondadas. */
function strokePolyline(raster, options) {
  const { points, width: strokeWidth, color, alpha = 1 } = options
  const { unit, width: deviceWidth } = raster
  const factor = unit * raster.scale
  const radius = (strokeWidth * factor) / 2
  const rgb = typeof color === 'string' ? hex(color) : color

  // A cobertura é calculada em uma máscara para que as partes que se
  // sobrepõem não acumulem alfa (evita o aspecto "pontilhado").
  const mask = new Uint8Array(deviceWidth * deviceWidth)
  for (const [x, y] of points) {
    const centerX = x * factor
    const centerY = y * factor
    for (let py = Math.max(0, Math.floor(centerY - radius)); py <= Math.min(deviceWidth, centerY + radius); py += 1) {
      for (let px = Math.max(0, Math.floor(centerX - radius)); px <= Math.min(deviceWidth, centerX + radius); px += 1) {
        const dx = px + 0.5 - centerX
        const dy = py + 0.5 - centerY
        if (dx * dx + dy * dy > radius * radius) continue
        mask[py * deviceWidth + px] = 1
      }
    }
  }

  for (let py = 0; py < deviceWidth; py += 1) {
    for (let px = 0; px < deviceWidth; px += 1) {
      if (!mask[py * deviceWidth + px]) continue
      raster.blend(px, py, rgb, alpha)
    }
  }
}

/* ------------------------------------------------------------------ */
/* Logotipo                                                            */
/* ------------------------------------------------------------------ */

/** Folha que envolve a célula, em unidades de 64 × 64. */
const LEAF = flattenCubic([32, 12], [
  [[43, 12], [51, 19.6], [51, 30.5]],
  [[51, 42.1], [42, 52], [32, 52]],
  [[22, 52], [13, 42.1], [13, 30.5]],
  [[13, 19.6], [21, 12], [32, 12]],
])

/** Hélice de DNA estilizada dentro da folha. */
const DNA = [
  flattenCubic([25, 18.5], [[[28.2, 21.5], [28.2, 26.5], [25, 29.5]]], 48),
  flattenCubic([39, 18.5], [[[35.8, 21.5], [35.8, 26.5], [39, 29.5]]], 48),
  flattenCubic([25, 43.5], [[[28.2, 40.5], [28.2, 35.5], [25, 32.5]]], 48),
  flattenCubic([39, 43.5], [[[35.8, 40.5], [35.8, 35.5], [39, 32.5]]], 48),
  flattenCubic([32, 12], [
    [[32, 19], [29, 23], [29, 31]],
    [[29, 39], [32, 43], [32, 52]],
  ], 48),
]

/**
 * Desenha o logotipo na tela.
 * @param {Raster} raster tela de destino
 * @param {object} options { offset, scale, radius, background }
 */
function drawLogo(raster, options) {
  const { offset = 0, scale = 1, radius = 0, background = true } = options

  if (background) {
    fillRoundedRect(raster, {
      x: offset,
      y: offset,
      width: 64 * scale,
      height: 64 * scale,
      radius: radius * scale,
      gradient: GRADIENT,
    })
  }

  const art = (points) => points.map(([x, y]) => [offset + x * scale, offset + y * scale])

  strokePolyline(raster, {
    points: art(LEAF),
    width: 1.6 * scale,
    color: WHITE,
    alpha: 0.32,
  })

  fillCircle(raster, {
    cx: offset + 32 * scale,
    cy: offset + 31 * scale,
    radius: 11.5 * scale,
    color: hex(WHITE),
    alpha: 0.14,
  })
  strokeCircle(raster, {
    cx: offset + 32 * scale,
    cy: offset + 31 * scale,
    radius: 11.5 * scale,
    width: 2.4 * scale,
    color: hex(YELLOW),
  })
  fillCircle(raster, {
    cx: offset + 32 * scale,
    cy: offset + 31 * scale,
    radius: 4.4 * scale,
    color: hex(YELLOW),
  })

  for (const points of DNA) {
    strokePolyline(raster, {
      points: art(points),
      width: 2.2 * scale,
      color: WHITE,
    })
  }
}

/* ------------------------------------------------------------------ */
/* Codificação PNG                                                     */
/* ------------------------------------------------------------------ */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let index = 0; index < 256; index += 1) {
    let value = index
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
    }
    table[index] = value >>> 0
  }
  return table
})()

/** CRC-32, como exige o formato PNG. */
function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) {
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

/** Monta um bloco PNG (comprimento, tipo, dados e CRC). */
function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length, 0)
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data])
  const checksum = Buffer.alloc(4)
  checksum.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([length, body, checksum])
}

/** Codifica um buffer RGBA em PNG. */
function encodePng(width, height, rgba) {
  const header = Buffer.alloc(13)
  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header[8] = 8 // profundidade de 8 bits
  header[9] = 6 // RGBA
  header[10] = 0
  header[11] = 0
  header[12] = 0

  const stride = width * 4
  const raw = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/* ------------------------------------------------------------------ */
/* Geração dos ícones                                                  */
/* ------------------------------------------------------------------ */

async function writeIcon(name, buffer) {
  await writeFile(join(ICONS, name), buffer)
  console.log(`✓ icons/${name}`)
}

await mkdir(ICONS, { recursive: true })

/** Ícone "any": cantos arredondados. */
function anyIcon(size) {
  const raster = new Raster(size)
  drawLogo(raster, { radius: 12 })
  return encodePng(size, size, raster.resolve())
}

/** Ícone maskable: fundo preenchido e conteúdo dentro da área segura (80%). */
function maskableIcon(size) {
  const raster = new Raster(size)
  fillRoundedRect(raster, {
    x: 0,
    y: 0,
    width: 64,
    height: 64,
    radius: 0,
    gradient: GRADIENT,
  })
  const inset = 64 * 0.1
  drawLogo(raster, { offset: inset, scale: 0.8, background: false })
  return encodePng(size, size, raster.resolve())
}

/** Apple touch icon: sem transparência, cantos retos (o iOS aplica a máscara). */
function appleTouchIcon(size) {
  const raster = new Raster(size)
  drawLogo(raster, {})
  return encodePng(size, size, raster.resolve())
}

await writeIcon('icon-192.png', anyIcon(192))
await writeIcon('icon-512.png', anyIcon(512))
await writeIcon('icon-maskable-512.png', maskableIcon(512))
await writeIcon('apple-touch-icon.png', appleTouchIcon(180))

/* ------------------------------------------------------------------ */
/* Favicon SVG vetorial                                                */
/* ------------------------------------------------------------------ */

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#60A5FA"/>
      <stop offset="55%" stop-color="#1D4ED8"/>
      <stop offset="100%" stop-color="#172554"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <path d="M32 12c11 0 19 7.6 19 18.5 0 11.6-9 21.5-19 21.5S13 42.1 13 30.5C13 19.6 21 12 32 12z"
        fill="none" stroke="#FFFFFF" stroke-opacity=".32" stroke-width="1.6"/>
  <circle cx="32" cy="31" r="11.5" fill="#FFFFFF" fill-opacity=".14" stroke="#FACC15" stroke-width="2.4"/>
  <circle cx="32" cy="31" r="4.4" fill="#FACC15"/>
  <path d="M25 18.5c3.2 3 3.2 8 0 11M39 18.5c-3.2 3-3.2 8 0 11M25 43.5c3.2-3 3.2-8 0-11M39 43.5c-3.2-3-3.2-8 0-11"
        fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M32 12c0 7-3 11-3 19s3 12 3 21" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
</svg>`

await writeIcon('favicon.svg', Buffer.from(favicon, 'utf8'))
console.log('Ícones gerados.')
