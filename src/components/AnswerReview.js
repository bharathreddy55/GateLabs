import { icon } from '../config/navigation.js';
import { escapeHtml as h } from '../utils/examEngine.js';
import { explainAnswer } from '../utils/answerSolutions.js';
import { renderMath } from '../utils/documentLibraries.js';
import { outcomeLabels as statuses } from '../utils/attemptInsights.js';
import { renderExamTable, renderQuestionContext } from './QuestionView.js';
import { loadReviewTopic, renderReviewTopic, reviewTopic } from './ReviewTopic.js';

const filters = [['all','All answers'],['wrong','Incorrect'],['skipped','Unanswered'],['correct','Correct']];
const optionLetter = index => String.fromCharCode(65 + Number(index));
const answerIndices = value => value == null || value === '' ? [] : [value].flat().map(Number);

function renderAnswers(q, renderOption) {
  const isNumeric = q.type === 'NAT';
  const selected = answerIndices(q.userAnswer);
  const correct = answerIndices(q.type === 'MSQ' ? q.correctOptions : q.correctAnswer);
  const choice = index => renderOption ? renderOption(q.options?.[index],index,q) : h(q.options?.[index] ?? String(index));
  const answer = indices => indices.length ? `<ul>${indices.map(index => `<li><b>${optionLetter(index)}</b><span>${choice(index)}</span></li>`).join('')}</ul>` : 'Unanswered';
  const min = q.natMin ?? q.correctNat;
  const max = q.natMax ?? q.correctNat;
  const range = min == null || max == null ? 'Unavailable' : min === max ? min : `${min} to ${max}`;
  return `<div class="review-answers">
    <div class="review-answer" data-outcome="${h(q.status)}">
      <h4>Your answer</h4>${isNumeric ? h(q.status==='skipped'?'Unanswered':q.userAnswer ?? 'Unanswered') : answer(selected)}
    </div>
    <div class="review-answer" data-outcome="correct">
      <h4>${isNumeric && min !== max ? 'Accepted range' : 'Correct answer'}</h4>${isNumeric ? h(range) : correct.length ? answer(correct) : 'Unavailable'}
    </div>
  </div>
  ${q.options?.length ? `<details class="review-choices">
    <summary>View all choices</summary>
    <ol>${q.options.map((_,index) => {
      const keyed = correct.includes(index), picked = selected.includes(index);
      return `<li data-outcome="${keyed?'correct':picked?'wrong':''}"><b>${optionLetter(index)}</b><span>${choice(index)}</span>
        ${keyed || picked ? `<small>${keyed&&picked?'Correct · selected':keyed?'Correct':'Selected'}</small>` : ''}</li>`;
    }).join('')}</ol>
  </details>` : ''}`;
}

function renderFormula({formula, latex}) {
  if (!formula) return '';
  return `<div class="review-formula">${latex
    ? `<span class="katex-render" data-latex="${h(latex)}" data-math-fallback>${h(formula)}</span>`
    : h(formula)}</div>`;
}

function renderStepContent(step) {
  if (!step || typeof step !== 'object') return `<p>${h(step)}</p>`;
  return `${step.title ? `<strong>${h(step.title)}</strong>` : ''}
    ${step.quote ? `<blockquote>${h(step.quote)}</blockquote>` : ''}
    ${step.text ? `<p>${h(step.text)}</p>` : ''}${renderFormula(step)}
    ${(step.calculations ?? []).map(renderFormula).join('')}`;
}

function solutionLayout(q, examId) {
  if (examId !== 'rrb') return 'default';
  if (q.passage && /reading comprehension/i.test(q.topic ?? '')) return 'passage';
  if (q.section === 'Data Analysis') return 'data';
  if (q.section === 'Logical Capability' || q.section === 'Mental Reasoning') return 'logic';
  return 'math';
}

const solutionHeadings = {
  passage:'Evidence and inference',
  data:'Data walkthrough',
  logic:'Reasoning and deductions',
  math:'Step-by-step solution',
  default:'Worked solution'
};

function renderSteps(steps, layout) {
  if (!steps.length) return '';
  if (layout === 'passage') {
    return `<div class="review-evidence">${steps.map(step => `<div>${renderStepContent(step)}</div>`).join('')}</div>`;
  }
  const className = layout === 'data' ? 'review-data-steps' : 'review-steps';
  return `<ol class="${className}">${steps.map(step => `<li>${renderStepContent(step)}</li>`).join('')}</ol>`;
}

function renderSolution(q, examId, battery, renderOption, solution) {
  const {approach,steps,reason,tip,finalAnswer,shortcut,picture,rule,working} = solution;
  if (!approach && !steps.length && !reason) return '<p class="review-note">A worked explanation is unavailable for this question.</p>';
  const isStationMaster = examId === 'rrb' || Boolean(battery);
  const layout = solutionLayout(q, examId);
  const heading = steps.length || (isStationMaster && layout !== 'math')
    ? solutionHeadings[layout]
    : 'Why this answer is correct';
  const answer = finalAnswer ?? {text:q.options?.[q.correctAnswer]};
  const answerContent = answer.text != null
    ? renderOption && !finalAnswer ? renderOption(answer.text,q.correctAnswer,q) : h(answer.text)
    : '';
  return `<section class="review-solution" data-solution-layout="${layout}" aria-labelledby="review-solution-heading">
    <h4 id="review-solution-heading">${icon('book')} ${heading}</h4>
    ${picture
      ? `<div class="review-approach"><strong>${h(picture.title)}</strong><p>${h(picture.text)}</p></div>`
      : approach ? `<div class="review-approach"><strong>Approach</strong><p>${h(approach)}</p></div>` : ''}
    ${rule ? `<div class="review-rule"><h5>Formula</h5>${renderFormula(rule)}</div>` : ''}
    ${working ? `<div class="review-working">${renderExamTable(working, 'Worked table')}</div>` : ''}
    ${renderSteps(steps, layout)}
    ${reason ? `<p class="review-reason">${h(reason)}</p>` : ''}
    ${isStationMaster && (answerContent || answer.formula) ? `<div class="review-final-answer">
      <strong>Final answer</strong>${renderFormula(answer)}${answerContent ? `<div class="review-answer-value">${answerContent}</div>` : ''}
    </div>` : ''}
    ${shortcut ? `<aside class="review-shortcut"><strong>Exam shortcut</strong><p>${h(shortcut.text)}</p>${renderFormula(shortcut)}</aside>` : ''}
    ${tip ? `<aside class="review-tip">${icon('info')}<div><strong>Watch for</strong><p>${h(tip)}</p></div></aside>` : ''}
  </section>`;
}

function sourceReference(q) {
  if (typeof q.source !== 'string' || !q.source) return '';
  const reference = q.source.match(/^(?:(.+); )?(https:\/\/\S+)$/);
  const source = reference
    ? `${reference[1]?`${h(reference[1])} · `:''}<a href="${h(reference[2])}" target="_blank" rel="noopener noreferrer">${reference[1]==='GateLabs original model question'?'Exam notice':'Question source'} ↗</a>`
    : h(q.source);
  return `<p class="review-source">${source}${q.asOf ? ` · checked ${h(q.asOf)}` : ''}</p>`;
}

export function mountAnswerReview(root, {
  responses, state = {}, bookmarks = [], toggleBookmark, toggleReviewMark, practise, renderContext = renderQuestionContext, renderOption, examId, battery
}) {
  if (!root) return;
  const items = responses.map((question,index)=>({question,index}));
  const supportsMarks = Boolean(toggleReviewMark) || responses.some(question=>question.markedForReview===true);
  const groups = [...filters];
  if (supportsMarks) groups.push(['marked','Marked for review']);
  if (toggleBookmark) groups.push(['bookmarked','Bookmarked']);
  const matches = (item, filter) => filter==='all' ||
    (filter==='bookmarked' ? bookmarks.includes(item.question.id) :
      filter==='marked' ? item.question.markedForReview===true : item.question.status===filter);
  const filterCounts = list => Object.fromEntries(groups.map(([key])=>[key,list.filter(item=>matches(item,key)).length]));
  let scopedItems = items;
  let counts = filterCounts(scopedItems);
  const readFilter = () => groups.some(([key])=>key===state.filter) ? state.filter : 'all';
  root.setAttribute('aria-labelledby','answer-review-heading');
  root.innerHTML = `<header class="review-header">
    <div class="review-title"><span aria-hidden="true">${icon('book')}</span><h2 id="answer-review-heading" tabindex="-1">Answer review</h2></div>
    ${practise ? `<button type="button" class="ui-button" id="practise-weak" ${counts.wrong+counts.skipped===0?'disabled':''}>Practise weak topics</button>` : ''}
  </header>
  <div class="review-filters" role="group" aria-label="Filter questions">
    ${groups.map(([key,label])=>`<button type="button" data-review-filter="${key}">${label} <span>${counts[key]}</span></button>`).join('')}
  </div>
  <div class="review-scope" data-review-scope hidden>
    <span data-review-scope-name></span><button type="button" class="ui-button" data-review-clear-scope>Show all questions</button>
  </div>
  <div class="review-layout">
    <nav class="review-navigator" aria-label="Questions">
      <div class="review-nav-heading"><strong data-review-nav-title>Questions</strong><span data-review-count role="status"></span></div>
      <div class="review-palette" data-review-palette></div>
      <div class="review-legend">${Object.entries(statuses).map(([key,label])=>`<span data-outcome="${key}">${label}</span>`).join('')}
        ${supportsMarks?'<span data-review-marked>Marked for review</span>':''}
      </div>
    </nav>
    <div data-review-content></div>
  </div>`;
  const palette = root.querySelector('[data-review-palette]');
  const content = root.querySelector('[data-review-content]');
  let mistakesOnly = false;
  let visible, cursor, savingMark = false;

  function select(index, focus) {
    cursor = visible.findIndex(item=>item.index===index);
    if (cursor < 0) cursor = 0;
    const item = visible[cursor];
    if (!item) {
      const markedFilter = state.filter === 'marked';
      content.innerHTML = `<div class="review-empty">
        <h3>${mistakesOnly?'No incorrect questions in this selection':markedFilter?'No questions marked for review':'No questions match this filter'}</h3>
        ${markedFilter&&toggleReviewMark?'<p>Use Mark for review on an answer card to add a violet dot.</p>':''}
        ${mistakesOnly?'':'<button type="button" class="ui-button" data-review-filter="all">Show all answers</button>'}
      </div>`;
      return;
    }
    state.index = item.index;
    const q = item.question;
    const topic = mistakesOnly ? reviewTopic(q, examId) : null;
    const solution = explainAnswer(q, {examId,battery});
    const saved = bookmarks.includes(q.id);
    palette.querySelector('[aria-current]')?.removeAttribute('aria-current');
    const current = palette.querySelector(`[data-review-question="${item.index}"]`);
    current.setAttribute('aria-current','step');
    const bounds = current.getBoundingClientRect(), panel = palette.getBoundingClientRect();
    if (bounds.top < panel.top) palette.scrollTop -= panel.top - bounds.top;
    if (bounds.bottom > panel.bottom) palette.scrollTop += bounds.bottom - panel.bottom;
    const earned = Number(q.earnedMarks);
    const mark = Number.isFinite(earned) && q.marks != null ? `<span class="review-mark">${earned>0?'+':earned<0?'−':''}${Math.abs(Number(earned.toFixed(2)))} / ${h(q.marks)} ${q.marks===1?'mark':'marks'}</span>` : '';
    content.innerHTML = `<article class="review-card">
      <div class="review-question-meta">
        <p>Question ${item.index+1} of ${items.length}${q.section ? ` <span>· ${h(q.section)}</span>` : ''}</p>
        <span class="review-outcome" data-outcome="${h(q.status)}">${statuses[q.status] ?? 'Reviewed'}</span>${mark}
        ${toggleReviewMark ? `<button type="button" class="ui-button review-mark-toggle" data-toggle-review-mark aria-pressed="${q.markedForReview===true}" ${savingMark?'disabled':''}>${q.markedForReview===true?'Unmark for review':'Mark for review'}</button>` : ''}
      </div>
      <div class="review-card-body">
        <h3 class="review-question" tabindex="-1">${h(q.question)}</h3>
        ${renderContext(q)}
        ${renderAnswers(q,renderOption)}
        ${topic ? renderReviewTopic(topic, examId, solution) : ''}
        ${renderSolution(q, examId, battery, renderOption, solution)}
        ${sourceReference(q)}
      </div>
      <footer class="review-card-footer">
        <button type="button" class="ui-button" data-review-move="-1" ${cursor===0?'disabled':''}>Previous</button>
        ${toggleBookmark ? `<button type="button" class="ui-button review-bookmark" data-bookmark="${h(q.id)}" aria-pressed="${saved}">${saved?'Bookmarked':'Bookmark'}</button>` : ''}
        <button type="button" class="ui-button primary" data-review-move="1" ${cursor===visible.length-1?'disabled':''}>Next <span aria-hidden="true">${icon('arrow')}</span></button>
      </footer>
    </article>`;
    if (topic) loadReviewTopic(content.querySelector('[data-review-topic-summary]'), topic, examId);
    if (content.querySelector('.katex-render')) renderMath(content);
    if (focus) content.querySelector('.review-question').focus();
  }

  function applyFilter(filter) {
    state.filter = filter;
    for (const button of root.querySelectorAll('.review-filters button')) {
      button.setAttribute('aria-pressed',String(button.dataset.reviewFilter===filter));
    }
    root.querySelector('[data-review-count]').textContent = `${counts[filter]} shown`;
    visible = scopedItems.filter(item=>matches(item,filter));
    palette.innerHTML = visible.map(({question,index})=>{
      const marked = question.markedForReview === true;
      const topic = mistakesOnly ? reviewTopic(question, examId) : null;
      const label = topic
        ? `Question ${index+1}, ${topic.title}. ${question.question}`
        : `Question ${index+1}, ${statuses[question.status] ?? 'reviewed'}`;
      return `<button type="button" data-review-question="${index}" data-outcome="${h(question.status)}"${marked?' data-review-marked':''}
        aria-label="${h(label)}${marked?', marked for review':''}">${topic ? `<span>Question ${index+1}</span>
          <strong>${h(topic.title)}</strong><span class="review-mistake-stem">${h(question.question)}</span>` : index+1}</button>`;
    }).join('');
    select(state.index,false);
  }

  function setScope(indices,label,onlyWrong=false) {
    mistakesOnly = Boolean(indices && onlyWrong);
    state.scope = indices ? {indices,label,mistakesOnly} : undefined;
    const scope=root.querySelector('[data-review-scope]');
    scope.hidden=!indices;
    scope.querySelector('[data-review-scope-name]').textContent=label || '';
    const allowed=indices ? new Set(indices) : null;
    scopedItems=allowed ? items.filter(item=>allowed.has(item.index) && (!mistakesOnly || matches(item,'wrong'))) : items;
    palette.classList.toggle('review-mistake-list',mistakesOnly);
    root.classList.toggle('review-mistakes',mistakesOnly);
    root.querySelector('[data-review-nav-title]').textContent=mistakesOnly?'Incorrect questions':'Questions';
    root.querySelector('.review-filters').hidden=mistakesOnly;
    root.querySelector('.review-legend').hidden=mistakesOnly;
    updateCounts();
  }

  function updateCounts() {
    counts=filterCounts(scopedItems);
    for(const button of root.querySelectorAll('.review-filters button')) {
      button.querySelector('span').textContent=counts[button.dataset.reviewFilter];
    }
  }

  root.onclick = async event => {
    const button = event.target.closest('button');
    if (!button || !root.contains(button)) return;
    if (button.hasAttribute('data-review-clear-scope')) {
      setScope();
      applyFilter('all');
      root.querySelector('.review-filters [aria-pressed="true"]').focus({preventScroll:true});
    } else if (button.dataset.reviewFilter) {
      applyFilter(button.dataset.reviewFilter);
      root.querySelector('.review-filters [aria-pressed="true"]').focus({preventScroll:true});
    } else if (button.hasAttribute('data-review-question')) {
      select(Number(button.dataset.reviewQuestion),true);
    } else if (button.hasAttribute('data-review-move')) {
      const next = visible[cursor+Number(button.dataset.reviewMove)];
      if (next) select(next.index,true);
    } else if (button.hasAttribute('data-toggle-review-mark')) {
      const item = visible[cursor];
      if (!item || savingMark) return;
      savingMark = true;
      button.disabled = true;
      const marked = item.question.markedForReview !== true;
      const saved = await toggleReviewMark(item.index, marked);
      savingMark = false;
      if (!root.isConnected) return;
      if (saved) {
        const wasSelected=state.index===item.index;
        updateCounts();
        applyFilter(state.filter);
        if (wasSelected) {
          const markButton=state.index===item.index && content.querySelector('[data-toggle-review-mark]');
          (markButton || root.querySelector(mistakesOnly?'[data-review-clear-scope]':'.review-filters [aria-pressed="true"]'))?.focus({preventScroll:true});
        }
      } else {
        const current = content.querySelector('[data-toggle-review-mark]');
        if (current) current.disabled = false;
      }
    } else if (button.hasAttribute('data-bookmark')) {
      const id = visible[cursor]?.question.id;
      const updated = toggleBookmark(id);
      if (!updated) return;
      bookmarks = updated;
      counts.bookmarked = scopedItems.filter(item=>matches(item,'bookmarked')).length;
      root.querySelector('[data-review-filter="bookmarked"] span').textContent = counts.bookmarked;
      if (state.filter==='bookmarked') {
        applyFilter('bookmarked');
        root.querySelector('[data-review-filter="bookmarked"]').focus({preventScroll:true});
      } else {
        button.textContent = bookmarks.includes(id) ? 'Bookmarked' : 'Bookmark';
        button.setAttribute('aria-pressed',String(bookmarks.includes(id)));
      }
    } else if (button.id==='practise-weak') {
      practise();
    }
  };
  setScope(state.scope?.indices,state.scope?.label,state.scope?.mistakesOnly);
  applyFilter(mistakesOnly?'wrong':readFilter());
  return ({filter='all',indices,label,mistakesOnly:onlyWrong}={})=>{
    setScope(indices,label,onlyWrong);
    applyFilter(mistakesOnly?'wrong':filter);
    root.querySelector('#answer-review-heading').focus({preventScroll:true});
    root.scrollIntoView({block:'start'});
  };
}
