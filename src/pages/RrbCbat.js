import { auth } from '../config/firebase';
import { CBAT_BATTERIES, CBAT_PRACTICE_SETS, RDSO_FAQ, RDSO_GUIDE, RRB_NOTICE, rrbStageNav } from '../config/rrbCbat.js';
import { CBAT_NOTES } from '../config/rrbCbatNotes.js';
import { EXAM_CATALOG, icon } from '../config/navigation.js';
import { mockLibraryBanner } from '../components/ExamMockLibrary.js';
import { mountAnswerReview } from '../components/AnswerReview.js';
import { mountAttemptInsights } from '../components/AttemptInsights.js';
import { buildCbatSet, cbatResultKey, cbatSummary, validCbatResult } from '../utils/cbat.js';
import { escapeHtml as h } from '../utils/examEngine.js';
import { readStored } from '../utils/safeStorage.js';
import { paperAttemptLabel } from '../utils/paperProgress.js';
import { enterExamFullscreen, leaveExamFullscreen, fullscreenButton } from '../utils/examFullscreen.js';

function shape(cells) {
  const positions = cells.map(cell => `${'ABCD'[Math.floor(cell/4)]}${1+cell%4}`).sort().join(', ');
  return `<svg class="cbat-shape" viewBox="0 0 40 40" role="img" aria-label="Filled cells ${positions}">
    ${Array.from({length:16},(_,i)=>`<rect x="${i%4*10+.5}" y="${Math.floor(i/4)*10+.5}" width="9" height="9" class="${cells.includes(i)?'filled':''}"/>`).join('')}
  </svg>`;
}

function streetMap({size,start,end,edges,houseCells}, route) {
  const spacing = 34;
  const axis = cell => [16 + cell%size*spacing, 16 + Math.floor(cell/size)*spacing];
  const marks = [[start,'A'],[end,'B'],...houseCells.map((cell,i)=>[cell,i+1])];
  const limit = 32 + (size-1)*spacing;
  return `<svg class="cbat-map" viewBox="0 0 ${limit} ${limit}" role="img" aria-label="${route?'Street map highlighting the shortest route from A to B':'Street map with A, B and numbered houses'}">
    ${edges.map(([from,to]) => {
      const [x1,y1] = axis(from), [x2,y2] = axis(to);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    }).join('')}
    ${route?`<polyline class="review-map-route" points="${route.map(cell=>axis(cell).join(',')).join(' ')}"/>`:''}
    ${marks.map(([cell,label]) => {
      const [x,y] = axis(cell);
      return `<g><rect x="${x-9}" y="${y-9}" width="18" height="18" rx="3"/><text x="${x}" y="${y}" dominant-baseline="central" text-anchor="middle">${label}</text></g>`;
    }).join('')}
  </svg>`;
}

const optionLabel = (option, index) => Array.isArray(option) ? `Figure ${index+1}` : String(option);
const timeLabel = seconds => `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
const completedLabel = result => result.correct === null ? `${result.attempted}/${result.total} completed` : `${result.correct}/${result.total} correct`;
const stationMaster = EXAM_CATALOG.find(exam=>exam.id==='rrb');
const batteryIcons = {intelligence:'grid',attention:'edit',spatial:'chart',ordering:'file',personality:'users'};

const workedSteps = steps =>
  `<ol>${steps.map(([label, explanation, calculation])=>`<li><strong>${h(label)}.</strong> ${h(explanation)}${calculation?`<br><code>${h(calculation)}</code>`:''}</li>`).join('')}</ol>`;

function studyNotes(){
  return `<section class="mock-library-section cbat-notes" id="cbat-study-notes" aria-labelledby="cbat-notes-heading" hidden>
    <div class="surface cbat-notes-intro">
      <h2 id="cbat-notes-heading" tabindex="-1">CBAT Detailed notes</h2>
      <h3>CBAT syllabus guide</h3>
      <p>The Station Master notice gives the CBAT rules and points to RDSO for aptitude-test guidance. RDSO lists these five indicative battery types. Follow the instructions and time limit given for each battery on the day.</p>
      <ul>${CBAT_BATTERIES.map(({id,title})=>`<li><button type="button" class="text-link cbat-topic-link" data-cbat-note="${id}">${h(title)}</button><span>${h(CBAT_NOTES[id].skill)}</span></li>`).join('')}</ul>
      <p>The official CBAT uses English or Hindi, has no negative marking, and requires a standardised T-score of at least 42 in each battery. GateLabs uses practice timers and shows raw practice results.</p>
      <div class="button-row"><a class="text-link" href="${RDSO_GUIDE}" target="_blank" rel="noopener">RDSO aptitude guide ↗</a>
      <a class="text-link" href="${RRB_NOTICE}" target="_blank" rel="noopener">CEN 08/2026, section 15.2 ↗</a></div>
    </div>
    ${CBAT_BATTERIES.map(({id,title})=>{
      const note=CBAT_NOTES[id];
      return `<details class="surface cbat-note" data-cbat-lesson="${id}">
        <summary>${h(title)}</summary>
        <figure class="exam-note-visual">
          <a href="/notes/visuals/rrb-cbat/${id}.svg" target="_blank" rel="noopener">
            <img src="/notes/visuals/rrb-cbat/${id}.svg" alt="Visual study guide for ${h(title)}" width="760" loading="lazy" decoding="async">
            <span>Open full-size recall card ↗</span>
          </a>
        </figure>
        <h3>Basics first</h3>
        <ul>${note.basics.map(([label, definition])=>`<li><strong>${h(label)}.</strong> ${h(definition)}</li>`).join('')}</ul>
        ${note.details.map(paragraph=>`<p>${h(paragraph)}</p>`).join('')}
        <h3>Rules to remember</h3>
        <ul>${note.rules.map(rule=>`<li>${h(rule)}</li>`).join('')}</ul>
        <h3>Methods and when to use them</h3>
        <ol>${note.method.map(step=>`<li>${h(step)}</li>`).join('')}</ol>
        <h3>${id==='personality'?'Prompt models and examples':'Question models and worked examples'}</h3>
        <h4>${h(note.exampleTitle)}</h4>
        <p>${h(note.prompt)}</p>
        ${note.map?streetMap(note.map):''}
        ${note.figures?`<div class="cbat-options cbat-figures">${note.figures.map((cells,index)=>`<div>Figure ${'ABC'[index]}${shape(cells)}</div>`).join('')}</div>`:''}
        <p class="exam-note-picture"><strong>Picture it.</strong> ${h(note.examplePicture)}</p>
        ${workedSteps(note.exampleSteps)}
        <p>${id==='personality'?'':'<strong>Answer:</strong> '}${h(note.solution)}</p>
        ${note.models.map(model=>`
          <h4>${h(model.title)}</h4>
          <p>${h(model.prompt)}</p>
          <p class="exam-note-picture"><strong>Picture it.</strong> ${h(model.picture)}</p>
          ${workedSteps(model.steps)}
          ${model.answer?`<p><strong>Answer:</strong> ${h(model.answer)}</p>`:''}
        `).join('')}
        <h3>Quick revision sheet</h3>
        <div class="exam-note-table"><table>
          <thead><tr><th scope="col">When you see</th><th scope="col">Use this rule</th></tr></thead>
          <tbody>${note.review.map(([cue, rule])=>`<tr><td>${h(cue)}</td><td>${h(rule)}</td></tr>`).join('')}</tbody>
        </table></div>
        <h3>Exam tips</h3>
        <ul>
          <li><strong>Practice routine.</strong> ${h(note.drill)}</li>
          <li><strong>Review your attempts.</strong> ${h(note.practice)}</li>
          <li><strong>Common trap.</strong> ${h(note.mistake)}</li>
        </ul>
      </details>`;
    }).join('')}
  </section>`;
}

export const RrbCbat = {
  render(){
    return `<section class="workspace-page exam-workspace" id="rrb-cbat">
      <header class="exam-page-heading" style="--workspace-exam:${stationMaster.color}"><div class="exam-heading-main"><a class="back-link" href="#/exams">← All exams</a>
      <span class="eyebrow">Railway recruitment · CEN 08/2026</span><h1>RRB Station Master</h1><p>Practise the aptitude batteries for the second stage.</p></div></header>
      ${rrbStageNav(true)}
      <div class="mock-test-library" style="--mock-accent:${stationMaster.color}">
      ${mockLibraryBanner({title:'Computer Based Aptitude Test',metrics:[['practice sets',CBAT_BATTERIES.length*CBAT_PRACTICE_SETS.length],['battery types',CBAT_BATTERIES.length]],symbol:stationMaster.symbol})}
      <nav class="exam-stage-nav" aria-label="CBAT study resources">
        <button type="button" class="ui-button primary" data-cbat-view="practice" aria-pressed="true" aria-controls="cbat-practice">Practice sets</button>
        <button type="button" class="ui-button" data-cbat-view="notes" aria-pressed="false" aria-controls="cbat-study-notes">Detailed notes &amp; syllabus</button>
      </nav>
      <div id="cbat-practice" data-cbat-panel></div>
      ${studyNotes()}
      <details class="surface mock-cbat-rules"><summary>Official scoring & recruitment rules</summary>
        <div class="pattern-metrics"><div><strong>42</strong><span>Minimum T-score per battery</span></div>
        <div><strong>None</strong><span>Negative marking</span></div><div><strong>70 / 30</strong><span>CBT / CBAT merit weight</span></div>
        <div><strong>EN / HI</strong><span>Official exam languages</span></div></div>
        <p>RRBs normally shortlist eight candidates per vacancy by community, based on CBT performance. Bring the original vision certificate in the prescribed format to the CBAT. Candidates must qualify in every battery before merit is calculated, with no category relaxation.</p>
        <p class="muted">RDSO lists these five batteries as indicative. The exam gives each battery its own time limit. GateLabs uses English practice items and practice timers, and shows raw results. RRB calculates the official standardised T-scores.</p>
        <div class="button-row"><a class="text-link" href="${RRB_NOTICE}" target="_blank" rel="noopener">Recruitment notice §15.2 ↗</a>
        <a class="text-link" href="${RDSO_GUIDE}" target="_blank" rel="noopener">RDSO samples and guidance ↗</a>
        <a class="text-link" href="${RDSO_FAQ}" target="_blank" rel="noopener">RDSO FAQ ↗</a></div>
      </details></div></section>`;
  },
  init(){
    this.cleanup();
    this.root = document.getElementById('rrb-cbat');
    this.panel = this.root.querySelector('[data-cbat-panel]');
    this.key = `rrb-cbat-practice:${auth.currentUser?.uid}`;
    this.panel.addEventListener('click', event => this.handleClick(event));
    this.root.addEventListener('click',event=>{
      const button=event.target.closest('button');
      if(button?.dataset.cbatView) this.showView(button.dataset.cbatView);
      if(button?.dataset.cbatNote) this.showView('notes',button.dataset.cbatNote);
    });
    this.showLibrary();
    this.showView(new URLSearchParams(location.hash.split('?')[1]).get('tab')==='notes'?'notes':'practice',null,false);
  },
  cleanup(){
    clearInterval(this.timer);
    if(this.session)leaveExamFullscreen();
    this.session = null;
    this.panel = null;
    this.root = null;
  },
  showView(view,topic,focus=true){
    if(this.session) return;
    const notes = this.root.querySelector('#cbat-study-notes');
    const showNotes = view==='notes';
    notes.hidden=!showNotes;
    this.panel.hidden=showNotes;
    for(const button of this.root.querySelectorAll('[data-cbat-view]')){
      const selected=button.dataset.cbatView===view;
      button.classList.toggle('primary',selected);
      button.setAttribute('aria-pressed',String(selected));
    }
    if(!focus) return;
    history.replaceState(null,'',`#/rrb-station-master/cbat${showNotes?'?tab=notes':''}`);
    if(!showNotes) return;
    const lesson=topic&&[...notes.querySelectorAll('[data-cbat-lesson]')].find(item=>item.dataset.cbatLesson===topic);
    if(lesson) lesson.open=true;
    (lesson?.querySelector('summary')||notes.querySelector('h2')).focus();
  },
  showLibrary(){
    const results = readStored(this.key,{});
    this.panel.innerHTML = `<section class="mock-library-section"><h3>Practice batteries</h3><div class="mock-picks">
      ${CBAT_BATTERIES.map(battery => `<article class="surface mock-pick">
          <span class="mock-pick-icon">${icon(batteryIcons[battery.id])}</span>
          <div><p class="mock-pick-label">${battery.count} items · ${battery.seconds?`${battery.seconds/60} min practice`:'Untimed'}</p>
          <h4>${battery.title}</h4><p>${battery.instruction}</p>
          ${validCbatResult(battery.id,results[battery.id])?`<p>Earlier practice · ${completedLabel(results[battery.id])}</p>`:''}</div>
          <div class="cbat-set-buttons">${CBAT_PRACTICE_SETS.map(set=>{
            const key=cbatResultKey(battery.id,set),last=results[key];
            const count=validCbatResult(key,last)?last.completions??1:0;
            return `<div><button type="button" class="ui-button ${set===1?'primary':''}" data-cbat-start="${battery.id}" data-cbat-set="${set}" aria-label="Start ${battery.title} Set ${set}">Start Set ${set} ${icon('arrow')}</button>
              <span class="paper-attempt-label" data-completed="${count>0}">${paperAttemptLabel(count)}</span>
              ${count?`<p>Set ${set} · ${completedLabel(last)}</p>`:''}</div>`;
          }).join('')}<button type="button" class="ui-button" data-cbat-note="${battery.id}" aria-label="Read ${battery.title} notes">Read notes</button></div></article>`).join('')}</div></section>`;
  },
  start(battery,set){
    const questions = buildCbatSet(battery.id,set);
    if (!questions.length) return;
    this.session = { battery, set, questions, answers:Array(questions.length).fill(null), index:0,
      deadline:battery.seconds ? Date.now()+battery.seconds*1000 : null };
    this.root.querySelector('[data-cbat-view="notes"]').disabled=true;
    this.showQuestion();
    enterExamFullscreen();
    if (battery.seconds) this.timer = setInterval(() => this.tick(), 250);
  },
  tick(){
    if (!this.session?.deadline || !this.panel?.isConnected) return;
    const seconds = Math.max(0,Math.ceil((this.session.deadline-Date.now())/1000));
    if (!seconds) return this.finish(true);
    const clock = this.panel.querySelector('[data-cbat-clock]');
    if (clock) clock.textContent = timeLabel(seconds);
  },
  showQuestion(){
    const {battery,set,questions,answers,index,deadline} = this.session;
    const q = questions[index];
    this.panel.innerHTML = `<section class="cbat-session" aria-labelledby="cbat-question" data-exam-session>
      <header class="test-room-header">
        <div class="test-room-identity"><span class="test-room-mark" aria-hidden="true">${icon(batteryIcons[battery.id])}</span><div><p class="eyebrow">Station Master CBAT</p><h2>${battery.title} · Set ${set}</h2></div></div>
        <div class="test-room-controls">
          ${deadline?`<div class="test-room-clock" role="timer">Remaining <time data-cbat-clock>${timeLabel(Math.max(0,Math.ceil((deadline-Date.now())/1000)))}</time></div>`:''}
          ${fullscreenButton()}
          <button type="button" data-cbat-exit>Exit battery</button>
          <button type="button" class="test-room-primary" data-cbat-finish>Submit battery</button>
        </div>
      </header>
      <div class="test-question-body">
      <p class="cbt-question-meta"><strong>Question ${index+1} of ${questions.length}</strong><span>${answers.filter(Number.isInteger).length} answered</span></p>
      <h3 id="cbat-question" tabindex="-1">${h(q.prompt)}</h3>
      ${q.digits?`<div class="cbat-digits">${q.digits.join(' ')}</div>`:''}
      ${q.map?`<p class="muted">Connected lines are streets. Each street segment has the same length.</p>${streetMap(q.map)}`:''}
      ${q.rules?`<ul class="cbat-rules">${q.rules.map(rule=>`<li>${h(rule)}</li>`).join('')}</ul>`:''}
      <div class="cbat-options ${Array.isArray(q.options[0])?'cbat-figures':''}" role="group" aria-labelledby="cbat-question">
        ${q.options.map((option,i)=>`<button type="button" class="ui-button ${answers[index]===i?'primary':''}" data-cbat-option="${i}" aria-pressed="${answers[index]===i}">${Array.isArray(option)?`<span>${optionLabel(option,i)}</span>${shape(option)}`:h(option)}</button>`).join('')}
      </div></div><div class="cbt-question-actions">
        <button type="button" class="ui-button" data-cbat-move="-1" ${index===0?'disabled':''}>Previous</button>
        <button type="button" class="test-room-primary" data-cbat-move="1" ${index===questions.length-1?'disabled':''}>Next</button>
      </div></section>`;
    this.panel.querySelector(answers[index]===null?'#cbat-question':`[data-cbat-option="${answers[index]}"]`).focus();
  },
  handleClick(event){
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-cbat-library')) {
      this.showLibrary();
      this.panel.querySelector('button')?.focus();
      return;
    }
    const battery = CBAT_BATTERIES.find(item=>item.id===button.dataset.cbatStart);
    if (battery) return this.start(battery,Number(button.dataset.cbatSet));
    if (!this.session) return;
    if (this.session.deadline && Date.now() >= this.session.deadline) return this.finish(true);
    if(button.hasAttribute('data-exam-fullscreen'))return enterExamFullscreen();
    if(button.hasAttribute('data-cbat-exit')){
      if(!confirm('Exit this battery? Your current answers will be discarded.'))return;
      clearInterval(this.timer);
      this.session=null;
      leaveExamFullscreen();
      this.root.querySelector('[data-cbat-view="notes"]').disabled=false;
      this.showLibrary();
      this.panel.querySelector('button')?.focus();
      return;
    }
    if (button.hasAttribute('data-cbat-option')) {
      this.session.answers[this.session.index] = Number(button.dataset.cbatOption);
      this.showQuestion();
    } else if (button.hasAttribute('data-cbat-move')) {
      this.session.index += Number(button.dataset.cbatMove);
      this.showQuestion();
    } else if (button.hasAttribute('data-cbat-finish')) this.finish(false);
  },
  finish(expired){
    clearInterval(this.timer);
    leaveExamFullscreen();
    const {battery,set,questions,answers,deadline} = this.session;
    const result = cbatSummary(questions,answers);
    this.session = null;
    this.root.querySelector('[data-cbat-view="notes"]').disabled=false;
    let saveWarning = '';
    try {
      const latest = Object.fromEntries(Object.entries(readStored(this.key,{})).filter(([id,summary])=>validCbatResult(id,summary)));
      const key=cbatResultKey(battery.id,set);
      const previous=latest[key];
      latest[key] = {...result,completions:(previous?previous.completions??1:0)+1};
      localStorage.setItem(this.key,JSON.stringify(latest));
    } catch {
      saveWarning = '<p role="status">This browser could not save the result.</p>';
    }
    this.panel.innerHTML = `<section class="surface cbat-session cbat-result">
      <div><h2 tabindex="-1">${battery.title} results · Set ${set}</h2>
      <p>${expired?'Time is up. ':''}${completedLabel(result)}${result.correct===null?'':` · ${result.attempted} attempted`}</p>${saveWarning}
      ${result.correct===null?'<p class="muted">Your individual responses are discarded.</p>':''}</div>
      <button type="button" class="ui-button" data-cbat-library>Back to batteries</button>
      </section>${result.correct===null?'':'<section class="attempt-insights" data-cbat-insights></section><section class="answer-review" data-cbat-answer-review></section>'}`;
    if (result.correct !== null) {
      const responses=questions.map((q,i)=>({
        ...q, question:q.prompt, correctAnswer:q.correct, userAnswer:answers[i],
        status:answers[i]==null?'skipped':answers[i]===q.correct?'correct':'wrong'
      }));
      const openReview=mountAnswerReview(this.panel.querySelector('[data-cbat-answer-review]'),{
        responses,battery:battery.id,
        renderContext:q=>`${q.digits?`<div class="cbat-digits">${q.digits.join(' ')}</div>`:''}${q.map?streetMap(q.map,q.solutionRoute):''}
          ${q.rules?`<ul class="cbat-rules">${q.rules.map(rule=>`<li>${h(rule)}</li>`).join('')}</ul>`:''}`,
        renderOption:option=>Array.isArray(option)?shape(option):h(option)
      });
      const durationSeconds=battery.seconds;
      const timeSpentSeconds=deadline ? Math.max(0,durationSeconds-Math.max(0,Math.ceil((deadline-Date.now())/1000))) : null;
      mountAttemptInsights(this.panel.querySelector('[data-cbat-insights]'),{responses,durationSeconds,timeSpentSeconds},openReview,{grouped:false});
    }
    this.panel.querySelector('h2').focus();
  }
};
