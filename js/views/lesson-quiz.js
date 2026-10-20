/**
 * Quiz de cinco perguntas ao final de cada aula.
 *
 * A correção é imediata, com explicação do conceito e atalho para a aula
 * relacionada quando o estudante erra.
 */

import { QUESTION_BY_ID } from '../data/questions.js'
import { LESSON_BY_ID } from '../data/lessons.js'
import { completeLessonQuiz } from '../lib/actions.js'
import { isAnswerCorrect, parseAssociation, serializeAssociation } from '../lib/grading.js'
import { icon } from '../lib/icons.js'
import { escapeHtml, pluralize } from '../lib/utils.js'

/** HTML do quiz (estado inicial). */
export function renderQuiz(lesson) {
  const questions = lesson.quizQuestionIds
    .map((id) => QUESTION_BY_ID[id])
    .filter(Boolean)

  if (questions.length === 0) {
    return `<p class="text-muted">Esta aula ainda não possui questões de quiz.</p>`
  }

  return `
  <div id="quiz-root" data-lesson-id="${lesson.id}" data-questions='${JSON.stringify(
    questions.map((q) => q.id),
  )}'>
    <div class="row row--between">
      <div>
        <h2 class="card__title mb-0">Quiz da aula</h2>
        <p class="card__subtitle">${questions.length} ${pluralize(
          questions.length,
          'questão',
          'questões',
        )} para fixar o conteúdo</p>
      </div>
      <span class="badge badge--primary" id="quiz-progress">0/${questions.length}</span>
    </div>

    <div id="quiz-body" class="stack mt-3">
      ${questions.map((question, index) => renderQuestion(question, index, questions.length)).join('')}
    </div>

    <div class="row mt-3" style="justify-content:space-between">
      <button class="btn btn--ghost" id="quiz-prev" type="button">${icon('chevronLeft', { size: 16 })} Anterior</button>
      <button class="btn btn--primary" id="quiz-next" type="button">Próxima ${icon('chevronRight', { size: 16 })}</button>
    </div>

    <div id="quiz-result" class="mt-3" hidden></div>
  </div>`
}

/** Uma questão do quiz. */
function renderQuestion(question, index, total) {
  const isAssociation = question.type === 'associacao'
  return `
  <article class="card card--flat quiz-question" data-index="${index}" data-question-id="${question.id}"
    ${index === 0 ? '' : 'hidden'}>
    <div class="row" style="gap:.4rem;margin-bottom:.6rem">
      <span class="badge badge--primary">Questão ${index + 1} de ${total}</span>
      <span class="badge badge--${question.difficulty}">${difficultyText(question.difficulty)}</span>
      <span class="badge badge--outline">${typeText(question.type)}</span>
    </div>
    <p style="font-size:1.02rem;font-weight:600;margin-bottom:1rem">${escapeHtml(question.prompt)}</p>
    ${
      isAssociation
        ? renderAssociation(question)
        : `<div class="stack stack--sm" role="radiogroup" aria-label="Alternativas">
            ${question.options
              .map(
                (option, optionIndex) => `
              <button class="option" type="button" role="radio" aria-checked="false"
                data-option="${option.id}" data-question="${question.id}">
                <span class="option__marker">${String.fromCharCode(65 + optionIndex)}</span>
                <span class="option__text">${escapeHtml(option.text)}</span>
              </button>`,
              )
              .join('')}
          </div>`
    }
    <div class="explanation" data-explanation hidden></div>
  </article>`
}

/** Questão de associação: pares à esquerda e coluna à direita. */
function renderAssociation(question) {
  return `
  <div class="stack stack--sm" data-association="${question.id}">
    ${question.pairs
      .map(
        (pair) => `
      <div class="row" style="gap:.75rem;align-items:center">
        <span class="badge badge--outline" style="flex:none;min-width:11rem">${escapeHtml(pair.left)}</span>
        <select class="select" data-pair="${pair.id}" aria-label="Associação para ${escapeHtml(pair.left)}">
          <option value="">Selecione…</option>
          ${question.options
            .map((option, index) => `<option value="${index}">${escapeHtml(option.text)}</option>`)
            .join('')}
        </select>
      </div>`,
      )
      .join('')}
  </div>`
}

/** Monta os interativos do quiz. */
export function mountLessonQuiz() {
  const root = document.getElementById('quiz-root')
  if (!root) return

  const lessonId = root.dataset.lessonId
  const questionIds = JSON.parse(root.dataset.questions)
  const questions = questionIds.map((id) => QUESTION_BY_ID[id]).filter(Boolean)

  let index = 0
  let answered = 0
  const correctAnswers = []
  const startedAt = Date.now()

  const body = document.getElementById('quiz-body')
  const progressBadge = document.getElementById('quiz-progress')
  const prevButton = document.getElementById('quiz-prev')
  const nextButton = document.getElementById('quiz-next')
  const resultBox = document.getElementById('quiz-result')

  const articles = Array.from(body.querySelectorAll('.quiz-question'))

  function show(indexToShow) {
    index = Math.max(0, Math.min(articles.length - 1, indexToShow))
    articles.forEach((article, i) => {
      article.hidden = i !== index
    })
    prevButton.disabled = index === 0
    nextButton.disabled = index === articles.length - 1
    progressBadge.textContent = `${answered}/${questions.length}`
    if (index === articles.length - 1) {
      nextButton.innerHTML = `Concluir ${icon('check', { size: 16 })}`
    } else {
      nextButton.innerHTML = `Próxima ${icon('chevronRight', { size: 16 })}`
    }
  }

  /** Avalia a questão atual. */
  function evaluate(question) {
    const article = articles[index]
    const explanation = article.querySelector('[data-explanation]')

    if (question.type === 'associacao') {
      const mapping = {}
      article.querySelectorAll('[data-pair]').forEach((select) => {
        if (select.value !== '') mapping[select.dataset.pair] = Number(select.value)
      })
      const answeredCount = Object.keys(mapping).length
      if (answeredCount < (question.pairs?.length ?? 0)) {
        explanation.hidden = false
        explanation.className = 'explanation explanation--error'
        explanation.innerHTML = `
          <div class="explanation__title">${icon('alert', { size: 16 })} Resposta incompleta</div>
          <p>Preencha todas as associações antes de conferir.</p>`
        return
      }
      const serialized = serializeAssociation(mapping)
      const correct = isAnswerCorrect(question, serialized)
      finishQuestion(question, article, correct, serialized)
      return
    }

    const selected = article.querySelector('.option.is-selected')
    if (!selected) {
      explanation.hidden = false
      explanation.className = 'explanation explanation--error'
      explanation.innerHTML = `
        <div class="explanation__title">${icon('alert', { size: 16 })} Escolha uma alternativa</div>
        <p>Selecione uma das alternativas antes de conferir a resposta.</p>`
      return
    }

    const correct = isAnswerCorrect(question, selected.dataset.option)
    finishQuestion(question, article, correct, selected.dataset.option)
  }

  /** Mostra o resultado da questão e a explicação. */
  function finishQuestion(question, article, correct, answer) {
    answered += 1
    correctAnswers.push(correct)

    article.querySelectorAll('.option').forEach((option) => {
      option.disabled = true
      const optionId = option.dataset.option
      if (optionId === question.correct) option.classList.add('is-correct')
      else if (optionId === answer) option.classList.add('is-wrong')
    })

    if (question.type === 'associacao') {
      const mapping = parseAssociation(answer)
      article.querySelectorAll('[data-pair]').forEach((select) => {
        select.disabled = true
        const pair = question.pairs.find((item) => item.id === select.dataset.pair)
        const chosen = question.options[mapping[pair.id]]
        const isRight = chosen && chosen.text === pair.right
        select.style.borderColor = isRight ? 'var(--success)' : 'var(--danger)'
        select.style.background = isRight ? 'var(--success-soft)' : 'var(--danger-soft)'
      })
    }

    const explanation = article.querySelector('[data-explanation]')
    explanation.hidden = false
    explanation.className = `explanation ${correct ? 'explanation--ok' : 'explanation--error'}`

    explanation.innerHTML = `
      <div class="explanation__title">
        ${icon(correct ? 'circleCheck' : 'circleX', { size: 16 })}
        ${correct ? 'Isso mesmo!' : 'Não é bem isso'}
      </div>
      <p>${escapeHtml(question.explanation)}</p>
      ${
        !correct && (question.relatedLessons ?? []).length > 0
          ? `<p class="mb-0">Revise a aula
              <a href="#/aula/${question.relatedLessons[0]}">${escapeHtml(
                LESSON_BY_ID[question.relatedLessons[0]]?.title ?? 'relacionada',
              )}</a>
              para fixar este conceito.</p>`
          : ''
      }`

    progressBadge.textContent = `${answered}/${questions.length}`
  }

  // Seleção de alternativas
  body.addEventListener('click', (event) => {
    const option = event.target.closest('.option')
    if (!option || option.disabled) return
    const article = option.closest('.quiz-question')
    article.querySelectorAll('.option').forEach((item) => {
      item.classList.remove('is-selected')
      item.setAttribute('aria-checked', 'false')
    })
    option.classList.add('is-selected')
    option.setAttribute('aria-checked', 'true')
  })

  // Confirmação da resposta
  body.addEventListener('dblclick', (event) => {
    if (!event.target.closest('.option')) return
    const article = event.target.closest('.quiz-question')
    if (article.querySelector('[data-explanation]')?.hidden === false) return
    evaluate(questions[Number(article.dataset.index)])
  })

  nextButton.addEventListener('click', () => {
    const article = articles[index]
    const explanation = article.querySelector('[data-explanation]')
    const alreadyAnswered = explanation && !explanation.hidden

    if (!alreadyAnswered) {
      evaluate(questions[index])
      return
    }

    if (index === articles.length - 1) {
      showResult()
      return
    }
    show(index + 1)
  })

  prevButton.addEventListener('click', () => show(index - 1))

  /** Tela final do quiz. */
  function showResult() {
    const score = Math.round((correctAnswers.filter(Boolean).length / questions.length) * 1000) / 10
    const elapsed = Math.round((Date.now() - startedAt) / 1000)

    completeLessonQuiz(lessonId, score)

    resultBox.hidden = false
    resultBox.innerHTML = `
      <div class="card card--flat" style="background:var(--surface-2)">
        <div class="row row--between">
          <div>
            <h3 class="card__title mb-0">Resultado do quiz</h3>
            <p class="card__subtitle">
              ${correctAnswers.filter(Boolean).length} de ${questions.length} acertos · ${elapsed}s · +${Math.round(
                15 * Math.max(0.3, score / 100),
              )} XP
            </p>
          </div>
          <span class="stat__value" style="color:var(--primary)">${score}%</span>
        </div>
        <div class="progress progress--lg mt-2">
          <div class="progress__bar" style="width:${score}%"></div>
        </div>
        ${
          score >= 70
            ? `<p class="mt-2 mb-0"><strong>${icon('award', { size: 16 })} Bom trabalho!</strong> Você domina o conteúdo desta aula.</p>`
            : `<p class="mt-2 mb-0"><strong>${icon('bulb', { size: 16 })} Dica:</strong> releia o resumo da aula e refaça o quiz — o XP de revisão já conta.</p>`
        }
      </div>`

    nextButton.disabled = true
    nextButton.innerHTML = `Quiz concluído ${icon('check', { size: 16 })}`
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  show(0)
}

/** Rótulos auxiliares. */
function difficultyText(difficulty) {
  return { facil: 'Fácil', medio: 'Média', dificil: 'Difícil' }[difficulty] ?? 'Geral'
}

function typeText(type) {
  return (
    {
      'multipla-escolha': 'Múltipla escolha',
      'verdadeiro-falso': 'Verdadeiro ou falso',
      associacao: 'Associação',
    }[type] ?? 'Questão'
  )
}
