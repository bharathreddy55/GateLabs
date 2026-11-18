import { auth } from '../config/firebase';
import { EXAMS } from '../config/exams.js';
import { countdown, escapeHtml as h } from '../utils/examEngine.js';

function featuredCountdown(exam,target){
  const date=exam.date||target;
  const personal=!exam.date&&!!target;
  const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const days=date?Math.round((Date.parse(date+'T00:00:00Z')-Date.parse(today+'T00:00:00Z'))/86400000):NaN;
  const valid=Number.isFinite(days);
  const number=!valid?'—':days>0?String(days).padStart(2,'0'):days===0?'Today':'Passed';
  const label=!valid?'Date to be announced':days>0?(personal?'Days to your target':'Days to exam'):days===0?(personal?'Your target is today':'Exam date is today'):'Set your next practice target';
  const status=!valid?'Awaiting official exam schedule':personal?'Personal practice target · '+date:'Published exam date · '+date+' (IST, date only)';
  return `<div class="countdown-time" aria-label="${h(valid&&days>0?days+' days remaining':label)}"><strong class="countdown-number ${valid&&days<=0?'countdown-word':''}">${h(number)}</strong><span>${h(label)}</span></div><div class="countdown-copy"><span class="countdown-badge">${personal?'Personal target':valid?'Exam countdown':'Schedule pending'}</span><h2>${h(exam.name)} countdown</h2><p class="countdown-date">${h(status)}</p>${!valid?'<p class="countdown-hint">Set a practice date and start counting down to your goal.</p>':''}<button type="button" class="countdown-action" data-open-countdown-target>${target?'Edit practice target':'Set a practice target'} <span aria-hidden="true">↗</span></button></div>`;
}

export function countdownCard(id) {
  const e=EXAMS[id],key=`exam-target:${auth.currentUser?.uid}:${id}`,target=localStorage.getItem(key)||'';
  return `<section class="exam-countdown countdown-spotlight" data-countdown="${id}" aria-label="${h(e.name)} countdown"><div class="countdown-feature" data-countdown-display>${featuredCountdown(e,target)}</div><div class="countdown-footer"><p data-personal>${target?'Personal target — '+countdown(target):'Choose a personal target to keep your preparation on track.'}</p><details class="target-settings countdown-settings"><summary>Target date & official source</summary><div class="exam-toolbar"><label>Personal practice target<input type="date" data-target value="${h(target)}"></label><button type="button" data-clear-target>Clear personal target</button></div><p>Research checked ${h(e.checked)}. ${e.date?'Session time is not verified.':'An application deadline is not an exam date.'}</p><a href="${h(e.source)}" target="_blank" rel="noopener">Notification / pattern source ↗</a></details></div></section>`;
}

export function bindCountdowns() {
  document.querySelectorAll('[data-countdown]').forEach(root=>{
    const id=root.dataset.countdown,key=`exam-target:${auth.currentUser?.uid}:${id}`,input=root.querySelector('[data-target]');
    const save=()=>{
      if(input.value)localStorage.setItem(key,input.value);else localStorage.removeItem(key);
      root.querySelector('[data-personal]').textContent=input.value?'Personal target — '+countdown(input.value):'Choose a personal target to keep your preparation on track.';
      root.querySelector('[data-countdown-display]').innerHTML=featuredCountdown(EXAMS[id],input.value);
    };
    input.onchange=save;
    root.querySelector('[data-clear-target]').onclick=()=>{input.value='';save();};
    root.addEventListener('click',event=>{if(!event.target.closest('[data-open-countdown-target]'))return;root.querySelector('.target-settings').open=true;input.focus();});
  });
}
