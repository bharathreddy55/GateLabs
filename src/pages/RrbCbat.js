import { auth } from '../config/firebase';
import { CBAT_BATTERIES, CBAT_PRACTICE_SETS, RDSO_FAQ, RDSO_GUIDE, RRB_NOTICE, rrbStageNav } from '../config/rrbCbat.js';
import { EXAM_CATALOG, icon } from '../config/navigation.js';
import { mockLibraryBanner } from '../components/ExamMockLibrary.js';
import { buildCbatSet, cbatResultKey, cbatSummary, validCbatResult } from '../utils/cbat.js';
import { escapeHtml as h } from '../utils/examEngine.js';
import { readStored } from '../utils/safeStorage.js';

function shape(cells) {
  const positions = cells.map(cell => `${'ABCD'[Math.floor(cell/4)]}${1+cell%4}`).sort().join(', ');
  return `<svg class="cbat-shape" viewBox="0 0 40 40" role="img" aria-label="Filled cells ${positions}">
    ${Array.from({length:16},(_,i)=>`<rect x="${i%4*10+.5}" y="${Math.floor(i/4)*10+.5}" width="9" height="9" class="${cells.includes(i)?'filled':''}"/>`).join('')}
  </svg>`;
}

function streetMap({size,start,end,edges,houseCells}) {
  const spacing = 34;
  const axis = cell => [16 + cell%size*spacing, 16 + Math.floor(cell/size)*spacing];
  const marks = [[start,'A'],[end,'B'],...houseCells.map((cell,i)=>[cell,i+1])];
  const limit = 32 + (size-1)*spacing;
  return `<svg class="cbat-map" viewBox="0 0 ${limit} ${limit}" role="img" aria-label="Street map with A, B and houses 1 to 5">
    ${edges.map(([from,to]) => {
      const [x1,y1] = axis(from), [x2,y2] = axis(to);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    }).join('')}
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

export const RrbCbat = {
  render(){
    return `<section class="workspace-page exam-workspace" id="rrb-cbat">
      <header class="exam-page-heading"><div class="exam-heading-main"><a class="back-link" href="#/exams">← All exams</a>
      <span class="eyebrow">Railway recruitment · CEN 08/2026</span><h1>RRB Station Master</h1><p>Practise the aptitude batteries for the second stage.</p></div></header>
      ${rrbStageNav(true)}
      <div class="mock-test-library" style="--mock-accent:${stationMaster.color}">
      ${mockLibraryBanner({title:'Computer Based Aptitude Test',metrics:[['practice sets',CBAT_BATTERIES.length*CBAT_PRACTICE_SETS.length],['battery types',CBAT_BATTERIES.length]],symbol:stationMaster.symbol})}
      <div data-cbat-panel></div>
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
    this.panel = document.querySelector('[data-cbat-panel]');
    this.key = `rrb-cbat-practice:${auth.currentUser?.uid}`;
    this.panel.addEventListener('click', event => this.handleClick(event));
    this.showLibrary();
  },
  cleanup(){
    clearInterval(this.timer);
    this.session = null;
    this.panel = null;
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
            return `<div><button type="button" class="ui-button ${set===1?'primary':''}" data-cbat-start="${battery.id}" data-cbat-set="${set}" aria-label="Start ${battery.title} Set ${set}">Start Set ${set} ${icon('arrow')}</button>
              ${validCbatResult(key,last)?`<p>Set ${set} · ${completedLabel(last)}</p>`:''}</div>`;
          }).join('')}</div></article>`).join('')}</div></section>`;
  },
  start(battery,set){
    const questions = buildCbatSet(battery.id,set);
    if (!questions.length) return;
    this.session = { battery, set, questions, answers:Array(questions.length).fill(null), index:0,
      deadline:battery.seconds ? Date.now()+battery.seconds*1000 : null };
    this.showQuestion();
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
    this.panel.innerHTML = `<section class="surface cbat-session" aria-labelledby="cbat-question">
      <div class="section-heading"><h2>${battery.title} · Set ${set}</h2>
      ${deadline?`<span class="subtle-tag" aria-label="Time remaining"><time data-cbat-clock>${timeLabel(Math.max(0,Math.ceil((deadline-Date.now())/1000)))}</time></span>`:''}</div>
      <p class="muted">Question ${index+1} of ${questions.length} · ${answers.filter(Number.isInteger).length} answered</p>
      <h3 id="cbat-question" tabindex="-1">${h(q.prompt)}</h3>
      ${q.digits?`<div class="cbat-digits">${q.digits.join(' ')}</div>`:''}
      ${q.map?`<p class="muted">Connected lines are streets. Each street segment has the same length.</p>${streetMap(q.map)}`:''}
      ${q.rules?`<ul class="cbat-rules">${q.rules.map(rule=>`<li>${h(rule)}</li>`).join('')}</ul>`:''}
      <div class="cbat-options ${Array.isArray(q.options[0])?'cbat-figures':''}" role="group" aria-labelledby="cbat-question">
        ${q.options.map((option,i)=>`<button type="button" class="ui-button ${answers[index]===i?'primary':''}" data-cbat-option="${i}" aria-pressed="${answers[index]===i}">${Array.isArray(option)?`<span>${optionLabel(option,i)}</span>${shape(option)}`:h(option)}</button>`).join('')}
      </div><div class="button-row">
        <button type="button" class="ui-button" data-cbat-move="-1" ${index===0?'disabled':''}>Previous</button>
        <button type="button" class="ui-button" data-cbat-move="1" ${index===questions.length-1?'disabled':''}>Next</button>
        <button type="button" class="ui-button primary" data-cbat-finish>Submit battery</button>
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
    const {battery,set,questions,answers} = this.session;
    const result = cbatSummary(questions,answers);
    this.session = null;
    let saveWarning = '';
    try {
      const latest = Object.fromEntries(Object.entries(readStored(this.key,{})).filter(([id,summary])=>validCbatResult(id,summary)));
      latest[cbatResultKey(battery.id,set)] = result;
      localStorage.setItem(this.key,JSON.stringify(latest));
    } catch {
      saveWarning = '<p role="status">This browser could not save the result.</p>';
    }
    this.panel.innerHTML = `<section class="surface cbat-session"><h2 tabindex="-1">${battery.title} results · Set ${set}</h2>
      <p>${expired?'Time is up. ':''}${completedLabel(result)}${result.correct===null?'':` · ${result.attempted} attempted`}</p>${saveWarning}
      ${result.correct===null?'<p class="muted">Your individual responses are discarded.</p>':`<details><summary>Review answers</summary><ol class="cbat-review">
        ${questions.map((q,i)=>`<li><strong>${h(q.prompt)}</strong><p>Your answer: ${answers[i]===null?'Skipped':h(optionLabel(q.options[answers[i]],answers[i]))}. Correct answer: ${h(optionLabel(q.options[q.correct],q.correct))}.</p>
        ${q.digits?`<p>${q.digits.join(' ')}</p>`:''}${q.map?streetMap(q.map):''}${q.rules?`<p>${h(q.rules.join(' '))}</p>`:''}
        ${Array.isArray(q.options[0])?`<div class="cbat-options cbat-figures">${q.options.map((figure,j)=>`<div>${optionLabel(figure,j)}${shape(figure)}</div>`).join('')}</div>`:''}
        <p class="muted">${h(q.explanation)}</p></li>`).join('')}
      </ol></details>`}
      <button type="button" class="ui-button primary" data-cbat-library>Back to batteries</button></section>`;
    this.panel.querySelector('h2').focus();
  }
};
