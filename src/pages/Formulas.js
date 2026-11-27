import '../styles/formula-notes.css';
import { EXAMS } from '../config/exams.js';
import { EXAM_CATALOG, icon } from '../config/navigation.js';
import { normalizeFormulaSearch, renderFormulaCard } from '../components/FormulaCard.js';
import { gateFormulaCards } from '../config/formulas/gate.js';
import { stationMasterFormulaDeck } from '../config/formulas/stationMaster.js';
import stationMasterNotes from '../config/notes/rrb.json';
import { renderMath } from '../utils/documentLibraries.js';
import { readStored } from '../utils/safeStorage.js';
import { userStorageKey } from '../utils/userStorage.js';
import { escapeHtml as h } from '../utils/examEngine.js';
import { showToast } from '../utils/toast.js';

const stationMasterCards = Object.entries(stationMasterFormulaDeck)
  .flatMap(([subject, cards]) => cards.map(card => ({...card, subject})));
const publishedCards = {gate:gateFormulaCards, group2:[], rrb:stationMasterCards, sbi:[]};
const sections = id => EXAMS[id].sections.map(([title]) => title);
const subjects = {
  gate:[...new Set(gateFormulaCards.map(card => card.subject)), 'Digital Logic', 'General Aptitude'],
  group2:[...sections('group2'), ...sections('group2-mains-1'), ...sections('group2-mains-2')],
  rrb:Object.keys(stationMasterFormulaDeck),
  sbi:sections('sbi')
};
const notesLink = exam => '#/' + exam.route + '?tab=notes';
const cardLabel = count => count + (count === 1 ? ' card' : ' cards');
const storageKey = () => userStorageKey('gate_custom_formulas');
const stationMasterNoteIds = new Set(stationMasterNotes.map(note => note.id));

function getDecks() {
  const personalCards = readStored(storageKey(), []);
  return EXAM_CATALOG.map(exam => {
    const personal = personalCards.filter(card => (card.examId ?? 'gate') === exam.id);
    return {
      ...exam,
      cards:[...publishedCards[exam.id], ...personal.map(card => ({...card, isCustom:true}))],
      subjects:[...new Set([...subjects[exam.id], ...personal.map(card => card.subject)])]
    };
  });
}

function optionList(values) {
  return values.map(value => `<option value="${h(value)}">${h(value)}</option>`).join('');
}

function cardNoteLink(card, exam) {
  const noteId = card.noteId ?? card.id;
  return exam.id === 'rrb' && !card.isCustom && stationMasterNoteIds.has(noteId)
    ? notesLink(exam) + '&note=' + encodeURIComponent(noteId)
    : '';
}

function renderDeck(exam) {
  return `<header class="formula-deck-header">
    <div>
      <h2 id="formula-deck-title">${h(exam.name)}</h2>
      <p id="formula-count" role="status"></p>
    </div>
    <button id="btn-open-custom-formula" type="button" class="ui-button">
      <span aria-hidden="true">+</span> Add card
    </button>
  </header>
  <div class="formula-toolbar">
    <div class="formula-field"><label for="formula-subject">Topic</label>
      <select id="formula-subject">
        <option value="">All topics</option>
        ${optionList(exam.subjects)}
        ${exam.cards.some(card=>card.isCustom) ? '<option value="personal">Personal cards</option>' : ''}
      </select>
    </div>
    <div class="formula-field"><label for="formula-search">Search formulas</label>
      <input type="text" id="formula-search" placeholder="Search by concept or keyword">
    </div>
  </div>
  <div class="formula-grid">${exam.cards.map(card => renderFormulaCard(card, cardNoteLink(card, exam))).join('')}</div>
  <div id="formula-search-empty" class="surface formula-empty" hidden>
    <span class="formula-empty-icon">${icon('book')}</span>
    <h3>${exam.cards.length ? 'No matching formula cards' : 'No formula cards yet'}</h3>
    <p>${exam.cards.length ? 'Try another topic or a shorter search.' : 'You can add a personal card or browse the detailed notes for this exam.'}</p>
    ${exam.cards.length
      ? '<button type="button" class="ui-button" data-reset-formula-filters>Clear filters</button>'
      : `<a class="ui-button" href="${h(notesLink(exam))}">Browse detailed notes</a>`}
  </div>
  <dialog class="formula-dialog" aria-labelledby="formula-dialog-title">
    <form id="custom-formula-form">
      <div class="formula-dialog-heading">
        <div><h3 id="formula-dialog-title">Add a personal card</h3><p>${h(exam.name)}</p></div>
        <button type="button" class="ui-button" data-close-formula aria-label="Close add card dialog">×</button>
      </div>
      <div class="formula-field"><label for="custom-subject">Topic category</label>
        <select id="custom-subject" name="subject" required>${optionList(exam.subjects)}</select>
      </div>
      <label for="custom-topic">Topic name
        <input id="custom-topic" name="topic" placeholder="e.g. Motion" required>
      </label>
      <label for="custom-concept">Card title
        <input id="custom-concept" name="concept" placeholder="e.g. Average speed" required>
      </label>
      <label for="custom-latex">Equation (optional LaTeX)
        <input id="custom-latex" name="mathLatex">
      </label>
      <label for="custom-formula-text">Notes
        <textarea id="custom-formula-text" name="formula" rows="4" required></textarea>
      </label>
      <p data-formula-save-error role="alert" hidden></p>
      <div class="formula-dialog-actions">
        <button type="button" class="ui-button" data-close-formula>Cancel</button>
        <button type="submit" class="ui-button primary">Save card</button>
      </div>
    </form>
  </dialog>`;
}

function bindDeck(root, exam, onSaved, filter) {
  root.innerHTML = renderDeck(exam);
  const cards = [...root.querySelectorAll('.formula-card')];
  const sourceCards = new Map(exam.cards.map(card => [card.id, card]));
  const subject = root.querySelector('#formula-subject');
  const search = root.querySelector('#formula-search');
  const count = root.querySelector('#formula-count');
  const empty = root.querySelector('#formula-search-empty');
  const modal = root.querySelector('.formula-dialog');
  const form = modal.querySelector('form');
  const add = root.querySelector('#btn-open-custom-formula');
  const clear = root.querySelector('[data-reset-formula-filters]');

  function filterCards() {
    const words = normalizeFormulaSearch(search.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const card of cards) {
      const matchesSubject = !subject.value || (subject.value === 'personal'
        ? card.dataset.formulaPersonal === 'true'
        : subject.value === card.dataset.formulaSubject);
      card.hidden = !matchesSubject || !words.every(word => card.dataset.formulaSearch.includes(word));
      if (!card.hidden) visible++;
    }
    count.textContent = visible === cards.length ? cardLabel(visible) : visible + ' of ' + cardLabel(cards.length);
    empty.hidden = visible > 0;
  }

  subject.value = filter;
  subject.onchange = filterCards;
  search.oninput = filterCards;
  if (clear) clear.onclick = () => {
    subject.value = '';
    search.value = '';
    filterCards();
    subject.focus();
  };
  filterCards();
  if (root.querySelector('.katex-render')) renderMath(root);

  add.onclick = () => {
    form.reset();
    const category = form.elements.subject;
    if (exam.subjects.includes(subject.value)) category.value = subject.value;
    form.querySelector('[data-formula-save-error]').hidden = true;
    modal.showModal();
  };
  for (const button of modal.querySelectorAll('[data-close-formula]')) {
    button.onclick = () => modal.close();
  }
  modal.onclose = () => add.focus();
  form.onsubmit = event => {
    event.preventDefault();
    const fields = Object.fromEntries([...new FormData(form)].map(([key,value]) => [key,value.trim()]));
    const error = form.querySelector('[data-formula-save-error]');
    if (['topic','concept','formula'].some(key => !fields[key])) {
      error.textContent = 'Add a topic, a title and notes to save this card.';
      error.hidden = false;
      return;
    }
    const card = {...fields, id:'custom_' + crypto.randomUUID(), examId:exam.id, isCustom:true};
    try {
      const key = storageKey();
      localStorage.setItem(key, JSON.stringify([...readStored(key, []), card]));
    } catch {
      error.textContent = 'This device could not save the card.';
      error.hidden = false;
      return;
    }
    modal.close();
    onSaved();
  };

  root.onclick = async event => {
    const button = event.target.closest('[data-copy-formula]');
    if (!button || !root.contains(button)) return;
    const card = sourceCards.get(button.closest('.formula-card').dataset.cardid);
    const text = card.example
      ? [card.title, card.expression ?? card.math, card.rule, ...card.example, card.trap].filter(Boolean).join('\n')
      : card.formula;
    try {
      await navigator.clipboard.writeText(text);
      showToast('Formula notes copied.', 'success');
    } catch {
      showToast('Clipboard unavailable. You can select and copy the notes.', 'warning');
    }
  };
}

export const Formulas = {
  render() {
    return `<section class="workspace-page formula-notes" id="formula-notes">
      <header class="page-heading">
        <div>
          <h1>Formula notes</h1>
          <p>Pick your exam, then find the formulas and rules you want to revise.</p>
        </div>
      </header>
      <div class="formula-exam-picker" role="group" aria-label="Choose an exam"></div>
      <section class="formula-deck" aria-labelledby="formula-deck-title"></section>
    </section>`;
  },

  init() {
    const page = document.getElementById('formula-notes');
    const picker = page.querySelector('.formula-exam-picker');
    const deck = page.querySelector('.formula-deck');
    const initial = new URLSearchParams(location.hash.split('?')[1]).get('exam');
    let selected = EXAM_CATALOG.some(exam => exam.id === initial) ? initial : 'rrb';

    function showDeck(filter = '') {
      const exams = getDecks();
      if (!picker.childElementCount) {
        picker.innerHTML = exams.map(exam => `<button class="formula-exam" type="button" data-formula-exam="${h(exam.id)}"
          aria-controls="formula-deck" aria-pressed="false">
          <span class="formula-exam-icon" aria-hidden="true">${h(exam.symbol)}</span>
          <strong>${h(exam.name)}</strong>
          <small data-deck-count></small>
        </button>`).join('');
      }
      for (const [index, exam] of exams.entries()) {
        const button = picker.children[index];
        button.setAttribute('aria-pressed', String(selected === exam.id));
        button.querySelector('[data-deck-count]').textContent = cardLabel(exam.cards.length);
      }
      const exam = exams.find(exam => exam.id === selected);
      bindDeck(deck, exam, () => {
        showDeck('personal');
        deck.querySelector('#btn-open-custom-formula').focus();
        showToast('Personal card saved.', 'success');
      }, filter);
    }

    deck.id = 'formula-deck';
    picker.onclick = event => {
      const button = event.target.closest('[data-formula-exam]');
      if (!button || button.dataset.formulaExam === selected) return;
      selected = button.dataset.formulaExam;
      history.replaceState(history.state, '', '#/formulas?exam=' + selected);
      showDeck();
    };
    showDeck();
  }
};
