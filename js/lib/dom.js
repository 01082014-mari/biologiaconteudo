/**
 * Camada fina sobre o DOM: criação de elementos, delegação de eventos,
 * avisos (toasts) e diálogos.
 */

import { escapeHtml } from './utils.js'

/** Cria um elemento a partir de uma string de HTML. */
export function el(htmlString) {
  const template = document.createElement('template')
  template.innerHTML = htmlString.trim()
  return template.content.firstElementChild
}

/** Cria um fragmento com vários elementos. */
export function frag(htmlString) {
  const template = document.createElement('template')
  template.innerHTML = htmlString.trim()
  return template.content
}

/** Delegação de eventos: `on(root, 'click', '[data-action]', handler)`. */
export function on(root, type, selector, handler) {
  root.addEventListener(type, (event) => {
    const target = event.target instanceof Element ? event.target.closest(selector) : null
    if (target && root.contains(target)) handler(event, target)
  })
}

/** Atribui listeners a uma lista de elementos. */
export function each(selector, handler, root = document) {
  Array.from(root.querySelectorAll(selector)).forEach((element) => {
    element.addEventListener('click', handler)
  })
}

let toastRegion = null

function ensureToastRegion() {
  if (toastRegion && document.body.contains(toastRegion)) return toastRegion
  toastRegion = document.createElement('div')
  toastRegion.className = 'toast-region'
  toastRegion.setAttribute('role', 'status')
  toastRegion.setAttribute('aria-live', 'polite')
  document.body.appendChild(toastRegion)
  return toastRegion
}

/** Exibe um aviso temporário. */
export function toast(message, type = 'info', duration = 3600) {
  const region = ensureToastRegion()
  const element = el(`<div class="toast toast--${type}">${escapeHtml(message)}</div>`)
  region.appendChild(element)
  window.setTimeout(() => {
    element.style.opacity = '0'
    element.style.transform = 'translateY(8px)'
    element.style.transition = 'opacity .25s ease, transform .25s ease'
    window.setTimeout(() => element.remove(), 260)
  }, duration)
  return element
}

/**
 * Abre um diálogo modal.
 * @returns {Promise<boolean>} `true` quando confirmado.
 */
export function confirmDialog({
  title = 'Confirmar ação',
  message = '',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger = false,
} = {}) {
  return new Promise((resolve) => {
    const dialog = el(`
      <dialog class="dialog" aria-labelledby="dialog-title">
        <div class="dialog__panel">
          <h2 id="dialog-title" class="card__title">${escapeHtml(title)}</h2>
          <p class="text-muted">${escapeHtml(message)}</p>
          <div class="row" style="justify-content:flex-end;margin-top:1rem">
            <button type="button" class="btn btn--ghost" data-dialog="cancel">${escapeHtml(
              cancelLabel,
            )}</button>
            <button type="button" class="btn ${danger ? 'btn--danger' : 'btn--primary'}" data-dialog="confirm">
              ${escapeHtml(confirmLabel)}
            </button>
          </div>
        </div>
      </dialog>
    `)

    const finish = (result) => {
      dialog.close()
      dialog.remove()
      resolve(result)
    }

    dialog.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target.closest('[data-dialog]') : null
      if (target) finish(target.dataset.dialog === 'confirm')
    })
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault()
      finish(false)
    })

    document.body.appendChild(dialog)
    dialog.showModal()
    dialog.querySelector('[data-dialog="confirm"]')?.focus()
  })
}

/** Rola suavemente até o elemento informado. */
export function scrollToElement(target, offset = 80) {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) return
  const top = element.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

/** Marca todos os elementos que respondem a teclado dentro de um contêiner. */
export function enhanceFocus(container = document) {
  container.querySelectorAll('[data-focusable]').forEach((element) => {
    element.setAttribute('tabindex', element.getAttribute('tabindex') ?? '0')
  })
}
