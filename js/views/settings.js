/**
 * Configurações: aparência, preferências de estudo, exportação e importação
 * de progresso e exclusão de dados locais.
 */

import { getState, exportProgress, importProgress, resetState } from '../lib/store.js'
import { updateSettings } from '../lib/actions.js'
import { confirmDialog, toast } from '../lib/dom.js'
import { icon } from '../lib/icons.js'
import { escapeHtml } from '../lib/utils.js'

export default function settings() {
  const state = getState()
  const prefs = state.settings ?? {}
  const storageUsage = estimateStorageUsage()

  return `
  <section class="stack">
    <header>
      <h1 class="mb-0">Configurações</h1>
      <p class="text-muted mb-0">Personalize a plataforma e cuide dos seus dados</p>
    </header>

    <div class="grid grid--sidebar">
      <div class="stack">
        <section class="card">
          <h2 class="section-title">${icon('sun', { className: 'section-title__icon' })} Aparência</h2>

          <div class="field mt-3">
            <span class="field__label">Tema</span>
            <div class="chip-group mt-1" id="theme-options">
              ${[
                { id: 'claro', label: 'Claro', icon: 'sun' },
                { id: 'escuro', label: 'Escuro', icon: 'moon' },
                { id: 'auto', label: 'Sistema', icon: 'settings' },
              ]
                .map(
                  (item) => `
                <button class="chip" type="button" data-theme="${item.id}"
                  aria-pressed="${(prefs.theme ?? 'auto') === item.id}">
                  ${icon(item.icon, { size: 14 })} ${item.label}
                </button>`,
                )
                .join('')}
            </div>
            <span class="field__hint">O tema "Sistema" acompanha a preferência do seu dispositivo.</span>
          </div>

          <div class="field mt-3">
            <span class="field__label">Tamanho do texto</span>
            <div class="chip-group mt-1" id="font-options">
              ${[
                { id: 'normal', label: 'Padrão' },
                { id: 'grande', label: 'Grande' },
              ]
                .map(
                  (item) => `
                <button class="chip" type="button" data-font="${item.id}"
                  aria-pressed="${(prefs.fontScale ?? 'normal') === item.id}">${item.label}</button>`,
                )
                .join('')}
            </div>
          </div>

          <label class="check mt-3">
            <input type="checkbox" id="reduce-motion" ${prefs.reduceMotion ? 'checked' : ''} />
            <span>Reduzir animações, além da preferência do sistema</span>
          </label>
        </section>

        <section class="card">
          <h2 class="section-title">${icon('target', { className: 'section-title__icon' })} Preferências de estudo</h2>

          <div class="field mt-3">
            <label class="field__label" for="daily-goal">Meta diária de XP</label>
            <input class="input" type="number" id="daily-goal" min="10" max="500" step="10"
              value="${prefs.dailyGoalXp ?? 50}" />
            <span class="field__hint">Quantidade de pontos de experiência que você quer conquistar por dia.</span>
          </div>

          <div class="field mt-3">
            <label class="field__label" for="questions-per-round">Questões por rodada de exercícios</label>
            <select class="select" id="questions-per-round">
              ${[5, 10, 15, 20, 30]
                .map(
                  (quantity) =>
                    `<option value="${quantity}" ${(prefs.questionsPerRound ?? 10) === quantity ? 'selected' : ''}>${quantity} questões</option>`,
                )
                .join('')}
            </select>
          </div>

          <label class="check mt-3">
            <input type="checkbox" id="timer-default" ${prefs.timerEnabledByDefault ? 'checked' : ''} />
            <span>Ativar o cronômetro por padrão nos simulados</span>
          </label>
        </section>

        <section class="card">
          <h2 class="section-title">${icon('download', { className: 'section-title__icon' })} Seus dados</h2>
          <p class="card__subtitle">
            Todo o seu progresso fica salvo apenas neste navegador. Nada é enviado para servidores.
          </p>

          <div class="row mt-3">
            <button class="btn btn--primary" id="export-data" type="button">
              ${icon('download', { size: 16 })} Exportar progresso (JSON)
            </button>
            <button class="btn btn--ghost" id="import-data" type="button">
              ${icon('upload', { size: 16 })} Importar progresso
            </button>
            <input type="file" id="import-file" accept="application/json,.json" hidden />
          </div>

          <div class="row mt-3">
            <button class="btn btn--danger" id="clear-data" type="button">
              ${icon('trash', { size: 16 })} Apagar todos os dados locais
            </button>
          </div>
          <p class="text-xs text-muted mt-2 mb-0">${escapeHtml(storageUsage)}</p>
        </section>
      </div>

      <aside class="stack">
        <section class="card">
          <h2 class="card__title">Instalar o BioLab</h2>
          <p class="card__subtitle">
            Use o botão <strong>Instalar</strong> na barra superior (ou o menu do navegador) para
            adicionar o BioLab à tela inicial. Ele funciona offline e abre em modo aplicativo.
          </p>
          <ul class="objectives mt-2">
            <li>${icon('check', { size: 15 })}<span>Conteúdo disponível sem internet</span></li>
            <li>${icon('check', { size: 15 })}<span>Abre em tela cheia, sem barra do navegador</span></li>
            <li>${icon('check', { size: 15 })}<span>Atualizações automáticas com aviso</span></li>
          </ul>
        </section>

        <section class="card">
          <h2 class="card__title">Sobre o BioLab</h2>
          <p class="text-sm text-muted mb-0">
            Plataforma didática de reforço de Biologia Básica, com trilhas de conteúdo, aulas
            completas, banco de questões corrigidas, simulados cronometrados, flashcards com
            revisão espaçada e laboratórios virtuais.
          </p>
        </section>
      </aside>
    </div>
  </section>`
}

/** Liga os interativos da página. */
export function mount() {
  // Tema
  document.getElementById('theme-options')?.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-theme]')
    if (!chip) return
    const theme = chip.dataset.theme
    updateSettings({ theme })
    applyTheme(theme)
    document.querySelectorAll('#theme-options .chip').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === chip))
    })
  })

  // Tamanho do texto
  document.getElementById('font-options')?.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-font]')
    if (!chip) return
    const fontScale = chip.dataset.font
    updateSettings({ fontScale })
    document.body.dataset.fontScale = fontScale
    document.querySelectorAll('#font-options .chip').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === chip))
    })
  })

  // Reduzir animações
  document.getElementById('reduce-motion')?.addEventListener('change', (event) => {
    updateSettings({ reduceMotion: event.target.checked })
    document.body.dataset.reduceMotion = event.target.checked ? 'true' : 'false'
  })

  // Meta diária
  document.getElementById('daily-goal')?.addEventListener('change', (event) => {
    const value = Math.max(10, Math.min(500, Number(event.target.value) || 50))
    event.target.value = value
    updateSettings({ dailyGoalXp: value })
    toast('Meta diária atualizada.', 'success')
  })

  // Questões por rodada
  document.getElementById('questions-per-round')?.addEventListener('change', (event) => {
    updateSettings({ questionsPerRound: Number(event.target.value) })
    toast('Preferência salva.', 'success')
  })

  // Cronômetro por padrão
  document.getElementById('timer-default')?.addEventListener('change', (event) => {
    updateSettings({ timerEnabledByDefault: event.target.checked })
  })

  // Exportar
  document.getElementById('export-data')?.addEventListener('click', () => {
    const payload = JSON.stringify(exportProgress(), null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `biolab-progresso-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    toast('Progresso exportado.', 'success')
  })

  // Importar
  const fileInput = document.getElementById('import-file')
  document.getElementById('import-data')?.addEventListener('click', () => fileInput?.click())

  fileInput?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const payload = JSON.parse(text)
      const result = importProgress(payload)
      if (!result.ok) {
        toast(result.message, 'error', 6000)
        return
      }
      applyTheme(getState().settings.theme ?? 'auto')
      document.body.dataset.fontScale = getState().settings.fontScale ?? 'normal'
      toast(result.message, 'success')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    } catch {
      toast('Não foi possível ler o arquivo. Verifique se ele é um JSON de progresso do BioLab.', 'error', 6000)
    } finally {
      event.target.value = ''
    }
  })

  // Apagar dados
  document.getElementById('clear-data')?.addEventListener('click', async () => {
    const confirmed = await confirmDialog({
      title: 'Apagar todos os dados locais?',
      message:
        'Todo o seu progresso — aulas concluídas, exercícios, simulados, flashcards, XP e conquistas — será apagado deste navegador. Esta ação não pode ser desfeita. Exporte o progresso antes, se quiser guardá-lo.',
      confirmLabel: 'Apagar tudo',
      cancelLabel: 'Cancelar',
      danger: true,
    })
    if (!confirmed) return
    resetState()
    applyTheme(getState().settings.theme ?? 'auto')
    toast('Dados locais apagados.', 'success')
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })
}

/** Aplica o tema salvo. */
function applyTheme(theme) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const effective = theme === 'auto' ? (media.matches ? 'escuro' : 'claro') : theme
  document.documentElement.dataset.theme = effective
  const meta = document.querySelector('meta[name="theme-color"]:not([media])')
  if (meta) meta.setAttribute('content', effective === 'escuro' ? '#0b1220' : '#1d4ed8')
}

/** Tamanho aproximado ocupado pelo progresso salvo. */
function estimateStorageUsage() {
  try {
    const raw = window.localStorage.getItem('biolab:v1') ?? ''
    const bytes = new Blob([raw]).size
    return `Espaço utilizado: aproximadamente ${(bytes / 1024).toFixed(1)} KB neste navegador.`
  } catch {
    return 'Não foi possível estimar o espaço utilizado.'
  }
}
