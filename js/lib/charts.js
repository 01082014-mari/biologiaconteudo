/**
 * Gráficos em SVG, sem bibliotecas externas.
 *
 * Todos devolvem strings SVG responsivas, com rótulos e legendas em texto
 * real para que o conteúdo continue acessível a leitores de tela.
 */

/** Gráfico de linha (evolução de acertos ao longo do tempo). */
export function lineChart(points, { width = 560, height = 200, label = 'Desempenho' } = {}) {
  if (!points || points.length === 0) {
    return `<div class="empty"><p class="empty__title">Sem dados suficientes</p><p>Responda questões ou conclua um simulado para ver a evolução.</p></div>`
  }

  const padding = { top: 16, right: 16, bottom: 28, left: 38 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const maxValue = Math.max(100, ...points.map((point) => point.value))
  const step = points.length > 1 ? innerW / (points.length - 1) : 0

  const coords = points.map((point, index) => ({
    x: padding.left + step * index,
    y: padding.top + innerH - (point.value / maxValue) * innerH,
    ...point,
  }))

  const path = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ')
  const area = `${path} L ${coords[coords.length - 1].x.toFixed(1)} ${(padding.top + innerH).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(padding.top + innerH).toFixed(1)} Z`

  const gridLines = [0, 25, 50, 75, 100]
    .map((value) => {
      const y = padding.top + innerH - (value / maxValue) * innerH
      return `<g class="chart__grid"><line x1="${padding.left}" y1="${y.toFixed(1)}" x2="${width - padding.right}" y2="${y.toFixed(1)}"/></g>
        <text x="${padding.left - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" fill="currentColor" opacity="0.6" font-size="11">${value}%</text>`
    })
    .join('')

  const labels = coords
    .map((c, index) => {
      if (coords.length > 6 && index % Math.ceil(coords.length / 6) !== 0 && index !== coords.length - 1) return ''
      return `<text x="${c.x.toFixed(1)}" y="${height - 6}" text-anchor="middle" fill="currentColor" opacity="0.65" font-size="10">${c.label}</text>`
    })
    .join('')

  const dots = coords
    .map(
      (c) =>
        `<circle class="chart__dot" cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="4"><title>${c.label}: ${c.value}%</title></circle>`,
    )
    .join('')

  return `
<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
    </linearGradient>
  </defs>
  ${gridLines}
  <path class="chart__area" d="${area}"/>
  <path class="chart__line" d="${path}"/>
  ${dots}
  ${labels}
</svg>`
}

/** Gráfico de barras horizontais (desempenho por assunto). */
export function barChart(items, { width = 560, label = 'Desempenho por assunto' } = {}) {
  if (!items || items.length === 0) {
    return `<div class="empty"><p class="empty__title">Ainda sem dados por assunto</p><p>Responda questões para ver o seu desempenho em cada trilha.</p></div>`
  }

  const rowHeight = 34
  const labelWidth = 150
  const height = items.length * rowHeight + 12
  const barWidth = width - labelWidth - 56

  const rows = items
    .map((item, index) => {
      const y = index * rowHeight + 8
      const value = Math.max(0, Math.min(100, item.value))
      const fill = value >= 70 ? 'var(--success)' : value >= 45 ? 'var(--warning)' : 'var(--danger)'
      return `
      <g>
        <text x="0" y="${y + 15}" fill="currentColor" font-size="12">${item.label}</text>
        <rect x="${labelWidth}" y="${y + 4}" width="${barWidth}" height="18" rx="9" fill="var(--surface-3)"/>
        <rect x="${labelWidth}" y="${y + 4}" width="${((barWidth * value) / 100).toFixed(1)}" height="18" rx="9" fill="${fill}">
          <title>${item.label}: ${value}%</title>
        </rect>
        <text x="${(labelWidth + barWidth + 8).toFixed(1)}" y="${y + 17}" fill="currentColor" font-size="12" font-weight="700">${Math.round(value)}%</text>
      </g>`
    })
    .join('')

  return `
<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  ${rows}
</svg>`
}

/** Gráfico de rosca para a taxa de acerto. */
export function donutChart(value, { size = 150, label = 'Taxa de acerto' } = {}) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamped / 100)
  const center = size / 2

  return `
<svg class="chart" viewBox="0 0 ${size} ${size}" role="img" aria-label="${label}: ${Math.round(clamped)}%">
  <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="var(--surface-3)" stroke-width="16"/>
  <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="var(--accent)" stroke-width="16"
    stroke-linecap="round" stroke-dasharray="${circumference.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"
    transform="rotate(-90 ${center} ${center})"/>
  <text x="${center}" y="${center - 2}" text-anchor="middle" fill="currentColor" font-size="26" font-weight="800">${Math.round(clamped)}%</text>
  <text x="${center}" y="${center + 18}" text-anchor="middle" fill="currentColor" opacity="0.65" font-size="11">${label}</text>
</svg>`
}

/** Gráfico de barras verticais (volume de atividades por dia). */
export function columnChart(items, { width = 560, height = 170, label = 'Atividades' } = {}) {
  if (!items || items.length === 0) {
    return `<div class="empty"><p class="empty__title">Sem atividades registradas</p></div>`
  }

  const padding = { top: 14, right: 10, bottom: 26, left: 30 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const maxValue = Math.max(1, ...items.map((item) => item.value))
  const slot = innerW / items.length
  const barWidth = Math.min(34, slot * 0.62)

  const bars = items
    .map((item, index) => {
      const barH = (item.value / maxValue) * innerH
      const x = padding.left + slot * index + (slot - barWidth) / 2
      const y = padding.top + innerH - barH
      return `<rect class="chart__bar" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${Math.max(2, barH).toFixed(1)}" rx="5" fill="var(--primary)"><title>${item.label}: ${item.value}</title></rect>
        <text x="${(x + barWidth / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" fill="currentColor" opacity="0.6" font-size="9">${item.label}</text>`
    })
    .join('')

  return `
<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <line x1="${padding.left}" y1="${padding.top + innerH}" x2="${width - padding.right}" y2="${padding.top + innerH}" stroke="var(--border)"/>
  ${bars}
</svg>`
}
