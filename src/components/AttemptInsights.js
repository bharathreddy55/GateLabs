import { escapeHtml as h } from '../utils/examEngine.js';
import { attemptGroups, outcomeLabels, outcomes, summarizeResponses } from '../utils/attemptInsights.js';

const percent = (value,total) => total ? value / total * 100 : 0;
const format = value => Number(value.toFixed(2)).toString();
const time = seconds => {
  if (seconds < 60) return `${seconds} sec`;
  const minutes = `${Math.floor(seconds / 60)} min`;
  return seconds % 60 ? `${minutes} ${seconds % 60} sec` : minutes;
};
const signed = value => {
  const magnitude = format(Math.abs(value));
  return value < 0 && magnitude !== '0' ? '−'+magnitude : magnitude;
};

function outcomeCard(summary) {
  return `<article class="insight-card insight-outcomes">
    <h3>Question outcomes</h3>
    <div class="insight-outcome-chart">
      <div class="insight-donut" data-insight-ring role="img" aria-label="${outcomes.map(key=>summary[key]+' '+outcomeLabels[key].toLowerCase()).join(', ')}">
        <div aria-hidden="true"><strong data-insight-center></strong><span data-insight-center-label></span></div>
      </div>
      <div class="insight-legend" role="group" aria-label="Choose an outcome">
        ${outcomes.map(key=>`<button type="button" data-insight-outcome="${key}" aria-pressed="false" ${summary[key]?'':'disabled'}>
          <i class="insight-dot" aria-hidden="true"></i><span>${outcomeLabels[key]}</span><strong>${summary[key]}</strong>
        </button>`).join('')}
      </div>
    </div>
    <div class="insight-inline-stats">
      <span><strong>${summary.attempted}/${summary.total}</strong> attempted</span>
      <span><strong>${summary.accuracy===null?'—':summary.accuracy.toFixed(1)+'%'}</strong> accuracy on attempts</span>
      ${summary.marked?`<span class="insight-marked"><strong>${summary.marked}</strong> marked for review</span>`:''}
    </div>
    <div class="insight-card-bottom">
      <p data-insight-outcome-detail role="status"></p>
      <button class="ui-button insight-review-button" type="button" data-insight-review-outcome>Review questions</button>
    </div>
  </article>`;
}

function mountOutcomes(card, summary, openReview) {
  const ring=card.querySelector('[data-insight-ring]');
  const detail=card.querySelector('[data-insight-outcome-detail]');
  const review=card.querySelector('[data-insight-review-outcome]');
  const buttons=card.querySelectorAll('[data-insight-outcome]');
  let selected = 'all';
  const slices = [];
  let start = 0;
  for (const key of outcomes) {
    const end = start + percent(summary[key],summary.total);
    if (end > start) slices.push({key,start,end});
    start = end;
  }

  function update(key) {
    selected = key;
    ring.style.background = slices.length ? `conic-gradient(${slices.map(slice=>{
      const color = `var(--insight-${slice.key})`;
      const fill = key === 'all' || key === slice.key ? color : `color-mix(in srgb, ${color} 26%, var(--ws-bg))`;
      return `${fill} ${slice.start}% ${slice.end}%`;
    }).join(',')},var(--ws-bg) ${start}% 100%)` : 'var(--ws-bg)';
    for (const button of buttons) button.setAttribute('aria-pressed',String(button.dataset.insightOutcome===key));
    const all = key === 'all';
    const name = all ? '' : outcomeLabels[key].toLowerCase();
    card.querySelector('[data-insight-center]').textContent = all ? summary.total : summary[key];
    card.querySelector('[data-insight-center-label]').textContent = all ? 'questions' : name;
    detail.textContent = all ? 'Select an outcome to see its share of the paper.' : `${name[0].toUpperCase()+name.slice(1)}: ${summary[key]} of ${summary.total} questions (${format(percent(summary[key],summary.total))}%).`;
    review.textContent = all ? 'Review questions' : `Review ${name} questions`;
  }
  for (const button of buttons) button.onclick=()=>update(selected===button.dataset.insightOutcome?'all':button.dataset.insightOutcome);
  ring.onclick=event=>{
    const rect=ring.getBoundingClientRect(), radius=rect.width/2;
    const x=event.clientX-rect.left-radius, y=event.clientY-rect.top-radius;
    const distance=Math.hypot(x,y);
    if (distance<radius*.70 || distance>radius) return;
    const angle=(Math.atan2(x,-y)/(2*Math.PI)+1)%1*100;
    const slice=slices.find(item=>angle>=item.start&&angle<item.end);
    if(slice) update(selected===slice.key?'all':slice.key);
  };
  review.onclick=()=>openReview({filter:selected});
  update('all');
}

function marksCard(marks) {
  return `<article class="insight-card">
    <h3>Marks breakdown</h3>
    <p class="insight-card-intro">Final score out of ${format(marks.possible)} possible marks.</p>
    <div class="insight-plot" data-insight-marks></div>
    <p class="insight-footnote" data-insight-mark-detail role="status"></p>
  </article>`;
}

function mountMarks(card, marks) {
  const rows = [
    {key:'correct', label:'Earned', value:marks.earned, detail:`Correct answers earned ${format(marks.earned)} marks before deductions.`},
    {key:'wrong', label:'Deducted', value:-marks.deducted, detail:`Wrong answers cost ${format(marks.deducted)} marks under this test’s marking rules.`},
    {key:'net', label:'Final score', value:marks.net, detail:`${format(marks.earned)} earned − ${format(marks.deducted)} deducted = ${signed(marks.net)} marks.`}
  ];
  const low = Math.min(0,...rows.map(row=>row.value));
  const high = Math.max(0,...rows.map(row=>row.value));
  const scale = high-low || 1;
  const zero = percent(-low,scale);
  const plot=card.querySelector('[data-insight-marks]');
  plot.innerHTML = `<div class="insight-axis" aria-hidden="true"><span>${signed(low)}</span><span>${signed(high)}</span></div>
    ${rows.map((row,i)=>`<button type="button" class="insight-mark-row" data-series="${row.key}" data-mark-metric="${i}" aria-pressed="false">
      <span>${row.label}</span><strong>${signed(row.value)}</strong>
      <span class="insight-mark-track" style="--zero:${zero}%"><span style="--start:${percent(Math.min(row.value,0)-low,scale)}%;--length:${percent(Math.abs(row.value),scale)}%"></span></span>
    </button>`).join('')}`;
  const detail=card.querySelector('[data-insight-mark-detail]');
  function select(index) {
    for(const button of plot.querySelectorAll('button')) button.setAttribute('aria-pressed',String(Number(button.dataset.markMetric)===index));
    detail.textContent=rows[index].detail;
  }
  plot.onclick=event=>{
    const button=event.target.closest('[data-mark-metric]');
    if(button) select(Number(button.dataset.markMetric));
  };
  select(2);
}

function paceCard(elapsed, duration) {
  const used = Math.min(100,percent(elapsed,duration));
  return `<article class="insight-card insight-pace">
    <h3>Time and pace</h3>
    <div class="insight-time-value"><strong data-insight-time></strong><span data-insight-clock-label></span></div>
    ${duration ? `<progress max="100" value="${used}" aria-label="Share of time limit used"></progress><p class="insight-pace-limit">${time(elapsed)} used of ${time(duration)} allowed</p>` : ''}
    <div class="insight-switch" role="group" aria-label="Time measure">
      <button type="button" data-insight-pace="elapsed" aria-pressed="true">Elapsed</button>
      <button type="button" data-insight-pace="question" aria-pressed="false">Per question</button>
    </div>
  </article>`;
}

function mountPace(card, elapsed, total) {
  const value=card.querySelector('[data-insight-time]');
  const label=card.querySelector('[data-insight-clock-label]');
  const buttons=card.querySelectorAll('[data-insight-pace]');
  function select(mode) {
    for(const button of buttons) button.setAttribute('aria-pressed',String(button.dataset.insightPace===mode));
    const average=elapsed/total;
    value.textContent=mode==='elapsed'?time(elapsed):average<60?`${format(average)} sec`:time(Math.round(average));
    label.textContent=mode==='elapsed'?'Total elapsed time':`Elapsed time divided by all ${total} questions`;
  }
  for(const button of buttons) button.onclick=()=>select(button.dataset.insightPace);
  select('elapsed');
}

function groupCard() {
  return `<article class="insight-card insight-groups">
    <header><h3>Performance by section or topic</h3>
      <div class="insight-switch" role="group" aria-label="Group results by">
        <button type="button" data-insight-group-mode="section" aria-pressed="true">Sections</button>
        <button type="button" data-insight-group-mode="topic" aria-pressed="false">Topics</button>
      </div>
    </header>
    <div class="insight-group-layout">
      <div class="insight-group-list">
        <input type="search" data-insight-topic-search aria-label="Find a topic" placeholder="Find a topic" hidden>
        <div class="insight-group-bars" data-insight-groups aria-label="Performance chart"></div>
      </div>
      <div class="insight-group-detail" data-insight-group-detail></div>
    </div>
  </article>`;
}

function mountGroups(card, responses, openReview) {
  const list=card.querySelector('[data-insight-groups]');
  const detail=card.querySelector('[data-insight-group-detail]');
  const search=card.querySelector('[data-insight-topic-search]');
  const switches=card.querySelectorAll('[data-insight-group-mode]');
  let mode='section', groups=attemptGroups(responses,mode), selected=0;

  function select(index) {
    selected=index;
    for(const button of list.querySelectorAll('[data-insight-group]')) button.setAttribute('aria-pressed',String(Number(button.dataset.insightGroup)===selected));
    const group=groups[index];
    detail.innerHTML = group ? `
      <h4>${h(group.name)}</h4>${mode==='topic'?`<p class="insight-footnote">${h(group.section)}</p>`:''}
      <dl>
        ${outcomes.map(key=>`<div data-series="${key}"><dt><i class="insight-dot" aria-hidden="true"></i>${outcomeLabels[key]}</dt><dd>${group[key]}</dd></div>`).join('')}
        <div><dt>Attempted accuracy</dt><dd>${group.accuracy===null?'—':group.accuracy.toFixed(1)+'%'}</dd></div>
        ${group.marks?`<div><dt>Marks deducted</dt><dd>${format(group.marks.deducted)}</dd></div><div><dt>Score</dt><dd>${signed(group.marks.net)} / ${format(group.marks.possible)}</dd></div>`:''}
        ${group.marked?`<div><dt>Marked for review</dt><dd>${group.marked}</dd></div>`:''}
      </dl>
      <button type="button" class="ui-button insight-review-button" data-insight-review-group>Review these questions</button>` : '';
  }
  function redraw() {
    const query=search.value.trim().toLowerCase();
    const visible=groups.map((group,index)=>({group,index})).filter(({group})=>!query||group.name.toLowerCase().includes(query));
    list.innerHTML=visible.length?visible.map(({group,index})=>`
      <button type="button" class="insight-group-row" data-insight-group="${index}" aria-pressed="false" aria-label="${h(group.name)}${mode==='topic'?', '+h(group.section):''}, ${outcomes.map(key=>group[key]+' '+outcomeLabels[key].toLowerCase()).join(', ')}">
        <span><strong>${h(group.name)}</strong><small>${group.total} questions</small></span>
        ${mode==='topic'?`<small>${h(group.section)}</small>`:''}
        <span class="insight-stack" aria-hidden="true">${outcomes.filter(key=>group[key]).map(key=>`<i data-series="${key}" style="width:${percent(group[key],group.total)}%"></i>`).join('')}</span>
      </button>`).join(''):'<p class="insight-footnote">No topics match your search.</p>';
    select(visible.some(({index})=>index===selected)?selected:visible[0]?.index);
  }
  for(const button of switches) button.onclick=()=>{
    if(mode===button.dataset.insightGroupMode) return;
    mode=button.dataset.insightGroupMode;
    for(const toggle of switches) toggle.setAttribute('aria-pressed',String(mode===toggle.dataset.insightGroupMode));
    groups=attemptGroups(responses,mode);
    search.value='';
    search.hidden=mode!=='topic';
    selected=0;
    redraw();
  };
  search.oninput=redraw;
  list.onclick=event=>{
    const button=event.target.closest('[data-insight-group]');
    if(button) select(Number(button.dataset.insightGroup));
  };
  detail.onclick=event=>{
    const group=groups[selected];
    if(group&&event.target.closest('[data-insight-review-group]')) {
      openReview({indices:group.indices,label:group.name,mistakesOnly:true});
    }
  };
  redraw();
}

export function mountAttemptInsights(root, result, openReview, {grouped=true} = {}) {
  if (!root || !result.responses?.length) return;
  const summary=summarizeResponses(result.responses);
  const marks=summary.marks ?? (Number.isFinite(result.score) && Number.isFinite(result.negativeMarks) && Number.isFinite(result.totalPossibleMarks)
    ? {net:result.score,deducted:result.negativeMarks,earned:result.score+result.negativeMarks,possible:result.totalPossibleMarks}
    : null);
  const elapsed=Number.isInteger(result.timeSpentSeconds) && result.timeSpentSeconds>=0 ? result.timeSpentSeconds : null;
  const duration=Number.isInteger(result.durationSeconds) && result.durationSeconds>0 ? result.durationSeconds : null;
  root.innerHTML = `<h2>Result breakdown</h2><div class="insight-overview">
    ${outcomeCard(summary)}
    ${marks?marksCard(marks):''}
    ${elapsed===null?'':paceCard(elapsed,duration)}
  </div>${grouped?groupCard():''}`;
  mountOutcomes(root.querySelector('.insight-outcomes'),summary,openReview);
  if(marks) mountMarks(root,marks);
  if(elapsed!==null) mountPace(root.querySelector('.insight-pace'),elapsed,summary.total);
  if(grouped) mountGroups(root.querySelector('.insight-groups'),result.responses,openReview);
}
