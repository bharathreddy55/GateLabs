import { icon } from '../config/navigation.js';
import { escapeHtml as h } from '../utils/examEngine.js';

export const normalizeFormulaSearch = text => text.normalize('NFKC').toLowerCase();

export function renderFormulaCard(card, noteHref = '') {
  const title = card.title ?? card.concept;
  const expression = card.math ?? card.mathLatex;
  const search = normalizeFormulaSearch([card.subject, title, card.topic, expression, card.expression, card.rule,
    card.formula, card.example?.join(' '), card.trap].join(' '));
  const explanation = card.example
    ? `<div class="formula-worked"><h4>Worked example</h4><ol>${card.example.map(step => `<li>${h(step)}</li>`).join('')}</ol>
        <p><strong>Watch for</strong> ${h(card.trap)}</p></div>`
    : `<div class="formula-explanation">${h(card.formula)}</div>`;

  return `<article class="surface formula-card" data-cardid="${h(card.id)}" data-formula-subject="${h(card.subject)}"
      data-formula-personal="${Boolean(card.isCustom)}" data-formula-search="${h(search)}">
      <header class="formula-card-meta"><span>${h(card.subject)}</span>${card.isCustom ? '<small>Personal</small>' : ''}</header>
      <h3>${h(title)}</h3>
      ${card.topic && card.topic !== title ? `<p class="formula-card-topic">${h(card.topic)}</p>` : ''}
      ${expression
        ? `<div class="formula-expression katex-render" data-latex="${h(expression)}">${h(expression)}</div>`
        : card.expression ? `<p class="formula-expression">${h(card.expression)}</p>` : ''}
      ${card.rule ? `<p class="formula-rule">${h(card.rule)}</p>` : ''}
      <details>
        <summary>${card.example ? 'Show worked example' : 'Show explanation'}</summary>
        ${explanation}
        <div class="formula-card-actions">
          ${noteHref ? `<a href="${h(noteHref)}">Detailed notes ${icon('arrow')}</a>` : ''}
          <button class="copy-formula-btn" type="button" data-copy-formula>Copy notes</button>
        </div>
      </details>
    </article>`;
}
