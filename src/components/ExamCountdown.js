import { auth } from '../config/firebase';
import { EXAMS } from '../config/exams.js';
import { countdown, escapeHtml as h } from '../utils/examEngine.js';
export function countdownCard(id) {
  const e=EXAMS[id], key=`exam-target:${auth.currentUser?.uid}:${id}`, target=localStorage.getItem(key)||'';
  const status=!e.date&&['gate','sbi'].includes(id)?'Next exam date not verified':countdown(e.date);
  return `<section class="exam-hub exam-countdown" data-countdown="${id}"><div class="exam-card"><h2>${h(e.name)} countdown</h2><p>${status}</p><small>Research checked ${e.checked}. ${e.date?'Session time is not verified.':'An application deadline is not an exam date.'}</small><a href="${e.source}" target="_blank" rel="noopener">Notification / pattern source</a><details class="target-settings"><summary>Set a personal practice target</summary><div class="exam-toolbar"><label>Personal practice target <input type="date" data-target value="${h(target)}"></label><button data-clear-target>Clear personal target</button></div></details><p data-personal>${target?'Personal target — '+countdown(target):'No personal target set'}</p></div></section>`;
}
export function bindCountdowns() {
  document.querySelectorAll('[data-countdown]').forEach(root=>{
    const key=`exam-target:${auth.currentUser?.uid}:${root.dataset.countdown}`, input=root.querySelector('[data-target]');
    const save=()=>{if(input.value)localStorage.setItem(key,input.value);else localStorage.removeItem(key);root.querySelector('[data-personal]').textContent=input.value?'Personal target — '+countdown(input.value):'No personal target set';};
    input.onchange=save;root.querySelector('[data-clear-target]').onclick=()=>{input.value='';save();};
  });
}
