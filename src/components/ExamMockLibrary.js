import { icon } from '../config/navigation.js';
import { CBAT_BATTERIES, CBAT_PRACTICE_SETS } from '../config/rrbCbat.js';
import { escapeHtml as h } from '../utils/examEngine.js';
import { paperAttemptLabel } from '../utils/paperProgress.js';
import '../styles/mock-library.css';

export const isPastPaper = paper => ['2025 memory-based','Practice reconstruction'].includes(paper.category);

export function practiceMinutes(exam, questionCount) {
  return Math.max(1,Math.ceil(questionCount*exam.minutes/exam.count));
}

export function testStats(questions, minutes) {
  const marks = questions.reduce((total, question)=>total+(Number.isFinite(question?.marks)?question.marks:0),0);
  return `${questions.length} questions · ${marks} marks · ${minutes} min`;
}

export function mockLibraryBanner({title,metrics,symbol}) {
  return `<section class="mock-library-banner"><div>
    <h2>${h(title)}</h2>
    <dl>${metrics.map(([label,value])=>`<div><dt>${h(label)}</dt><dd>${h(value)}</dd></div>`).join('')}</dl>
  </div><span class="mock-library-symbol" aria-hidden="true">${h(symbol)}</span></section>`;
}

function testCount(count) {
  return `${count} ${count===1?'test':'tests'}`;
}

function practiceTile({title, caption, glyph, attributes, href}) {
  const content = `<span class="mock-tile-icon">${icon(glyph)}</span>
    <span class="mock-tile-label"><strong>${h(title)}</strong><small>${h(caption)}</small></span>
    <span class="mock-tile-arrow">${icon('arrow')}</span>`;
  return href
    ? `<a class="mock-tile" href="${href}">${content}</a>`
    : `<button type="button" class="mock-tile" ${attributes}>${content}</button>`;
}

function featuredCard({label,title,stats,action,glyph,attempts}) {
  return `<article class="surface mock-pick">
    <span class="mock-pick-icon">${icon(glyph)}</span>
    <div><p class="mock-pick-label">${h(label)}</p><h4>${h(title)}</h4><p>${h(stats)}</p>
      ${attempts===undefined?'':`<span class="paper-attempt-label" data-completed="${attempts>0}">${paperAttemptLabel(attempts)}</span>`}</div>
    ${action}
  </article>`;
}

function featuredTest(entry, exam, label, glyph, attempts) {
  const { paper,index } = entry;
  const minutes = paper.full===false ? practiceMinutes(exam,paper.questions.length) : exam.minutes;
  return featuredCard({
    label, title:paper.title, stats:testStats(paper.questions,minutes), glyph, attempts,
    action:`<button type="button" class="ui-button primary" data-paper="${index}" aria-label="Open ${h(paper.title)}">Open test ${icon('arrow')}</button>`
  });
}

function subjectTests(entries) {
  const subjects = new Map();
  for(const {paper,index,view} of entries) {
    for(const [name,questions] of view.sections) {
      const subject = subjects.get(name) ?? [];
      subject.push({paper,index,questions});
      subjects.set(name,subject);
    }
  }
  return subjects;
}

function renderSubjects(subjects,exam,attemptCount) {
  return [...subjects].map(([name,tests])=>`<details class="surface mock-subject">
    <summary><span>${h(name)}</span><small>${testCount(tests.length)}</small></summary>
    <ul>${tests.map(({paper,index,questions})=>{
      const attempts=attemptCount(paper,name);
      return `<li>
        <div><strong>${h(paper.title)}</strong><p>${testStats(questions,practiceMinutes(exam,questions.length))}</p>
        <span class="paper-attempt-label" data-completed="${attempts>0}">${paperAttemptLabel(attempts)}</span></div>
        <button type="button" class="ui-button" data-launch-section="${index}" data-exam-subject="${h(name)}">Start subject test ${icon('arrow')}</button>
      </li>`;
    }).join('')}</ul></details>`);
}

export function mockLibrary({exam,accent,symbol,papers,viewPaper,renderPaper,attemptCount,importPanel,loadError}) {
  const entries = papers.map((paper,index)=>({paper,index,view:viewPaper(paper)})).filter(({paper})=>!isPastPaper(paper));
  const ready = entries.filter(({view})=>!view.errors.length);
  const full = ready.filter(({paper})=>paper.full!==false);
  const drills = ready.filter(({paper})=>paper.full===false);
  const subjects = subjectTests(ready);
  const tiles = [
    full.length && {key:'full',title:'Full mock tests',caption:testCount(full.length),glyph:'file'},
    drills.length && {key:'drills',title:'Challenge & short drills',caption:testCount(drills.length),glyph:'spark'},
    subjects.size && {key:'subjects',title:'Subject tests',caption:exam.id==='rrb'
      ? `${testCount([...subjects.values()].reduce((n,tests)=>n+tests.length,0))} across ${subjects.size} subjects`
      : `${subjects.size} ${subjects.size===1?'subject':'subjects'}`,glyph:'grid'}
  ].filter(Boolean);
  const primary = full[0];
  const drill = drills.find(({paper})=>paper.category==='Challenge drill') ?? drills[0];
  const shortPractice = !drill && subjects.size ? featuredCard({
    label:'Focused practice', title:'Practise one subject', stats:`Choose from ${subjects.size} subjects`, glyph:'grid',
    action:`<button type="button" class="ui-button" data-mock-jump="subjects">Choose a subject ${icon('arrow')}</button>`
  }) : '';
  const pastGate = exam.id==='gate' ? featuredCard({
    label:'Past questions', title:'GATE by exam year', stats:'Timed sessions from the indexed question bank', glyph:'book',
    action:`<a class="ui-button" href="#/pyq-mocks">Browse years ${icon('arrow')}</a>`
  }) : '';
  const featured = [
    primary && featuredTest(primary,exam,'Full paper','file',attemptCount(primary.paper)),
    drill && featuredTest(drill,exam,drill.paper.category==='Challenge drill'?'Challenge drill':'Short practice','spark',attemptCount(drill.paper)),
    pastGate || shortPractice
  ].filter(Boolean).slice(0,2);
  const types = [...new Set(entries.map(({paper})=>paper.category||'Original model'))];
  const pastCount = papers.filter(paper=>isPastPaper(paper)&&!viewPaper(paper).errors.length).length;
  const pastTile = exam.id==='gate'
    ? { title:'Previous papers',caption:'Year-wise question bank',glyph:'book',href:'#/pyq-mocks' }
    : (exam.papers?.length || pastCount) && {
      title:exam.id==='rrb'?'Related past papers':'Previous papers',
      caption:exam.relatedPapers ? `${exam.relatedPapers.length} older NTPC papers` : pastCount ? `${pastCount} practice reconstructions` : 'Question papers & answer keys',
      glyph:'book',attributes:'data-open-tab="papers"'
    };
  const cbatTile = exam.id==='rrb' && practiceTile({
    title:'Stage 2 · CBAT',caption:`${CBAT_BATTERIES.length*CBAT_PRACTICE_SETS.length} practice sets`,glyph:'chart',href:'#/rrb-station-master/cbat'
  });
  const hasCategories = tiles.length || pastTile || cbatTile || exam.id==='gate';
  return `<div class="mock-test-library" style="--mock-accent:${accent}">
    ${mockLibraryBanner({title:`${exam.name} mock tests`,metrics:[['questions',exam.count],['marks',exam.marks],['minutes',exam.minutes]],symbol})}
    ${loadError?`<div class="notice" role="alert">${h(loadError)} <button type="button" id="retry-papers">Try again</button></div>`:''}
    ${featured.length?`<section class="mock-library-section"><h3>Quick start</h3><div class="mock-picks">${featured.join('')}</div></section>`:''}
    ${hasCategories?`<section class="mock-library-section"><h3>Browse practice</h3><div class="mock-tile-grid">
      ${tiles.map(({key,...tile})=>practiceTile({...tile,attributes:`data-mock-jump="${key}" aria-controls="mock-library-${exam.id}" aria-pressed="false"`})).join('')}
      ${pastTile?practiceTile(pastTile):''}${cbatTile||''}
      ${exam.id==='gate'?practiceTile({title:'Topic practice',caption:'Choose individual GATE topics',glyph:'edit',href:'#/practice'}):''}
    </div></section>`:''}
    <section class="mock-library-section" id="mock-library-${exam.id}" data-mock-list>
      <div class="mock-list-heading"><h3 data-mock-list-title tabindex="-1">All tests</h3>
        <button type="button" class="ui-button" data-mock-jump="all" hidden>Show all tests</button></div>
      <div data-mock-papers>
        ${entries.length?`<details class="mock-filter"><summary>Filter tests</summary><div class="paper-filters">
          <label>Paper type<select data-paper-filter="type"><option value="">All types</option>${types.map(type=>`<option>${h(type)}</option>`).join('')}</select></label>
          <label>Status<select data-paper-filter="status"><option value="">All statuses</option><option value="ready">Ready</option><option value="unavailable">Needs correction</option></select></label>
          <label>Attempts<select data-paper-filter="attempts"><option value="">All papers</option><option value="completed">Completed</option><option value="unattempted">Not attempted</option></select></label>
        </div></details>`:''}
        <p class="mock-results-count" data-paper-filter-count role="status">${testCount(entries.length)}</p>
        <div class="paper-grid mock-paper-grid">${entries.map(({paper})=>renderPaper(paper)).join('')}</div>
        <p class="surface mock-empty" data-mock-empty ${entries.length?'hidden':''}>No tests match this view.</p>
      </div>
      <div class="mock-subjects" data-mock-subjects hidden>${renderSubjects(subjects,exam,attemptCount).join('')}</div>
    </section>
    ${importPanel}
  </div>`;
}

export function bindMockLibrary(root) {
  const library = root.querySelector('.mock-test-library');
  const list = library.querySelector('[data-mock-list]');
  const heading = list.querySelector('[data-mock-list-title]');
  const papers = list.querySelector('[data-mock-papers]');
  const subjects = list.querySelector('[data-mock-subjects]');
  const cards = [...papers.querySelectorAll('[data-library-card]')];
  const filters = [...papers.querySelectorAll('[data-paper-filter]')];
  const jumps = [...library.querySelectorAll('[data-mock-jump]')];
  let current = 'all';

  function applyFilters(){
    const [type,status,attempts] = filters.map(filter=>filter.value);
    let visible = 0;
    for(const card of cards){
      card.hidden = (current!=='all' && card.dataset.paperGroup!==current) ||
        Boolean((type && card.dataset.paperType!==type) || (status && card.dataset.paperStatus!==status) ||
          (attempts && (Number(card.dataset.paperAttempts)>0) !== (attempts==='completed')));
      if(!card.hidden) visible++;
    }
    papers.querySelector('[data-paper-filter-count]').textContent = testCount(visible);
    papers.querySelector('[data-mock-empty]').hidden = visible>0;
  }

  filters.forEach(filter=>filter.addEventListener('change',applyFilters));
  jumps.forEach(button=>button.addEventListener('click',()=>{
    current = button.dataset.mockJump;
    const isSubject = current==='subjects';
    papers.hidden = isSubject;
    subjects.hidden = !isSubject;
    heading.textContent = {all:'All tests',full:'Full mock tests',drills:'Challenge & short drills',subjects:'Subject tests'}[current];
    jumps.forEach(jump=>{
      if(jump.dataset.mockJump==='all') jump.hidden = current==='all';
      if(jump.hasAttribute('aria-pressed')) jump.setAttribute('aria-pressed',String(jump.dataset.mockJump===current));
    });
    filters.forEach(filter=>filter.value='');
    if(!isSubject) applyFilters();
    heading.focus({preventScroll:true});
    list.scrollIntoView({block:'start'});
  }));
}
