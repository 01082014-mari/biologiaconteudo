/**
 * Página 404 — endereço não reconhecido.
 */

import { icon } from '../lib/icons.js'

export default function notFound() {
  return `
  <div class="card empty">
    ${icon('search', { size: 48, className: 'empty__icon' })}
    <p class="empty__title">Página não encontrada</p>
    <p>O endereço acessado não existe no BioLab. Escolha um destino abaixo.</p>
    <div class="row" style="justify-content:center">
      <a class="btn btn--primary" href="#/dashboard">Ir para o painel</a>
      <a class="btn btn--ghost" href="#/biblioteca">Explorar aulas</a>
    </div>
  </div>`
}
