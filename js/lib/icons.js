/**
 * Ícones em SVG embutidos — nenhuma dependência de CDN.
 *
 * Todos seguem a mesma grade de 24×24, com traço de 2px, pontas arredondadas
 * e `currentColor`, herdando a cor do texto ao redor.
 */

const PATHS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.8V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.8"/>',
  book: '<path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H11v18H4.5A2.5 2.5 0 0 0 2 22z"/><path d="M22 4.5A2.5 2.5 0 0 0 19.5 2H13v18h6.5A2.5 2.5 0 0 1 22 22z"/>',
  pencil:
    '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  clipboard:
    '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  cards:
    '<rect x="3" y="6" width="13" height="15" rx="2"/><path d="M7 3h11a2 2 0 0 1 2 2v13"/><path d="M7.5 12.5h4"/>',
  flask:
    '<path d="M9 2v6.5L4.2 17A2 2 0 0 0 6 20h12a2 2 0 0 0 1.8-3L15 8.5V2"/><path d="M8 2h8"/><path d="M6.5 14h11"/>',
  chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m7 15 3.5-4 3 2.5L20 8"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  arrowRight: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5m6 6-6-6 6-6"/>',
  play: '<path d="m6 3 14 9-14 9z"/>',
  award:
    '<circle cx="12" cy="8" r="6"/><path d="m8.2 13.3-1.4 8L12 18.5l5.2 2.8-1.4-8"/>',
  medal:
    '<circle cx="12" cy="15" r="6"/><path d="m8.2 9.5-2-7.5h11.6l-2 7.5"/><path d="m12 12 .9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2L8.1 14l2-.3z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
  zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  flame:
    '<path d="M12 22c4 0 7-2.7 7-6.5 0-4.5-4.5-6-5-11.5-2 1.5-3 3.5-3 5.5 0 1.5-1 2-1.5 1.2C9 9.5 8.5 8 8.5 8 6.7 9.6 5 12.4 5 15.5 5 19.3 8 22 12 22z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
  download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 19h16"/>',
  upload: '<path d="M12 15V3m0 0 4 4m-4-4L8 7"/><path d="M4 19h16"/>',
  trash: '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7"/><path d="M10 11v6M14 11v6"/>',
  sparkles:
    '<path d="m12 3 1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4z"/><path d="M19 15.5 20 17.5l2 .5-2 .5-1 2-1-2-2-.5 2-.5z"/>',
  brain:
    '<path d="M9.5 3A3.5 3.5 0 0 0 6 6.5 3 3 0 0 0 4 12a3 3 0 0 0 2 5.5A3.5 3.5 0 0 0 12 18V4.5A2.5 2.5 0 0 0 9.5 2z"/><path d="M14.5 3A3.5 3.5 0 0 1 18 6.5a3 3 0 0 1 2 5.5 3 3 0 0 1-2 5.5A3.5 3.5 0 0 1 12 18V4.5A2.5 2.5 0 0 1 14.5 2z"/>',
  rocket:
    '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.9-.9.9-2.3 0-3.2a2.2 2.2 0 0 0-3 .2z"/><path d="M15 9a10 10 0 0 1 3-6c1.5 1.5 2 5 2 5l-4 4-4-4z"/><path d="M9 12H5l-2 4h6zM12 15v4l4 2v-6z"/><circle cx="15" cy="9" r="1.4"/>',
  compass:
    '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.5-5.5 2 2-5.5z"/>',
  badgeCheck:
    '<path d="m12 2 2.2 2.1 3-.4 1 2.9 2.8 1.2-1.4 2.7 1.4 2.7-2.8 1.2-1 2.9-3-.4L12 22l-2.2-2.1-3 .4-1-2.9L3 16.2l1.4-2.7L3 10.8l2.8-1.2 1-2.9 3 .4z"/><path d="m9 12 2 2 4-4"/>',
  graduation:
    '<path d="m12 4 10 5-10 5L2 9z"/><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/><path d="M22 9v6"/>',
  listCheck: '<path d="m3 6 2 2 3-3"/><path d="M11 7h10"/><path d="m3 13 2 2 3-3"/><path d="M11 14h10"/><path d="m3 20 2 2 3-3"/><path d="M11 21h10"/>',
  trophy:
    '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/><path d="M9 20h6M12 14v6"/>',
  star: '<path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.8l6.5-.9z"/>',
  rotate:
    '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8.5v.01"/>',
  alert: '<path d="M12 3 2.5 20h19z"/><path d="M12 9v5m0 3v.01"/>',
  circleCheck: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  circleX: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/>',
  microscope:
    '<path d="M6 18h12M8 21h8"/><path d="M9 3h6v5H9z"/><path d="M12 8v4a4 4 0 0 1-4 4H7"/><path d="M11 4h2"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  shuffle:
    '<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="m15 15 6 6"/><path d="M4 4l5 5"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',
  dna: '<path d="M6 2c0 6 12 6 12 12S6 20 6 22"/><path d="M18 2c0 6-12 6-12 12s12 6 12 6"/><path d="M8 6h8M7 10.5h10M7 15h10M8 19h8"/>',
  cell: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/><circle cx="16" cy="8" r="1.4"/><circle cx="8" cy="15" r="1.2"/><circle cx="15" cy="16" r="1.6"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.5 5-8"/>',
  trees:
    '<path d="M12 2 6 10h3l-4 6h6v6h2v-6h6l-4-6h3z"/><path d="M19 6v14"/>',
  paw: '<circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><circle cx="4.5" cy="14" r="2"/><circle cx="19.5" cy="14" r="2"/><path d="M12 12c3 0 5 2.5 5 5 0 2-1.5 3-3.5 3-1 0-1.5-.5-3-.5s-2 .5-3 .5C5.5 20 4 19 4 17c0-2.5 2-5 5-5h3z"/>',
  bug: '<rect x="8" y="6" width="8" height="13" rx="4"/><path d="M8 12H3m18 0h-5M8 8 4.5 5.5M16 8l3.5-2.5M8 18l-3.5 2.5M16 18l3.5 2.5"/>',
  heartPulse:
    '<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.8 8.8-8.8a5 5 0 0 0 0-7.1z"/><path d="M3.5 12.5h4l1.5-3 2 6 1.5-3h4"/>',
  layers:
    '<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  microscope2:
    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 8-8 2 2-2 2 2 2-3 3-2-2-2 2z"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 8v4l3 2"/>',
  puzzle:
    '<path d="M9 3h6v2.5a2 2 0 1 0 4 0V3h2v6h-2.5a2 2 0 1 0 0 4H21v8h-6v-2.5a2 2 0 1 0-4 0V21H5v-6h2.5a2 2 0 1 0 0-4H3V9h6z"/>',
  trendingUp: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
}

/**
 * Aliases semânticos: nomes no estilo Lucide (PascalCase) usados nos dados
 * didáticos para etapas de trilha e conquistas.
 */
const ALIASES = {
  GraduationCap: 'graduation',
  ClipboardCheck: 'clipboard',
  BookOpen: 'book',
  FlaskConical: 'flask',
  ListChecks: 'listCheck',
  CircleHelp: 'info',
  HelpCircle: 'info',
  BadgeCheck: 'badgeCheck',
  HeartPulse: 'heartPulse',
  PawPrint: 'paw',
  TrendingUp: 'trendingUp',
  ListCheckIcon: 'listCheck',
}

/** Converte `camelCase`/`PascalCase` em `kebab-case`. */
function toKebab(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/** Resolve o nome do ícone para a chave existente no catálogo. */
export function resolveIcon(name) {
  if (!name) return 'info'
  if (PATHS[name]) return name
  if (ALIASES[name] && PATHS[ALIASES[name]]) return ALIASES[name]
  const kebab = toKebab(name)
  if (PATHS[kebab]) return kebab
  return 'info'
}

/**
 * Gera o SVG de um ícone.
 * @param {string} name nome do ícone
 * @param {object} options { size, className, title }
 */
export function icon(name, options = {}) {
  const { size = 24, className = '', title = '' } = options
  const path = PATHS[resolveIcon(name)] ?? PATHS.info
  const titleMarkup = title
    ? `<title>${title}</title>`
    : ''
  return `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="${title ? 'false' : 'true'}" focusable="false" role="${title ? 'img' : 'presentation'}">${titleMarkup}${path}</svg>`
}

/** Lista de ícones disponíveis. */
export const ICON_NAMES = Object.keys(PATHS)

/**
 * Logotipo do BioLab: uma folha estilizada envolvendo uma célula, com uma
 * hélice de DNA sugerida no interior.
 */
export function logo(size = 40) {
  return `
<svg class="logo" width="${size}" height="${size}" viewBox="0 0 64 64" role="img" aria-label="BioLab">
  <defs>
    <linearGradient id="biolabLogo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#86EFAC"/>
      <stop offset="55%" stop-color="#22C55E"/>
      <stop offset="100%" stop-color="#166534"/>
    </linearGradient>
  </defs>
  <rect x="1.5" y="1.5" width="61" height="61" rx="16" fill="url(#biolabLogo)"/>
  <path d="M32 12c11 0 19 7.6 19 18.5 0 11.6-9 21.5-19 21.5S13 42.1 13 30.5C13 19.6 21 12 32 12z"
        fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="1.6"/>
  <circle cx="32" cy="31" r="11.5" fill="#FFFFFF" fill-opacity="0.14" stroke="#FFFFFF" stroke-width="2.4"/>
  <circle cx="32" cy="31" r="4.4" fill="#FFFFFF"/>
  <path d="M25 18.5c3.2 3 3.2 8 0 11M39 18.5c-3.2 3-3.2 8 0 11M25 43.5c3.2-3 3.2-8 0-11M39 43.5c-3.2-3-3.2-8 0-11"
        fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M32 12c0 7-3 11-3 19s3 12 3 21" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
</svg>`
}
