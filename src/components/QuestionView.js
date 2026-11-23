import {escapeHtml as h, validQuestionImage} from '../utils/examEngine.js';
import {renderFigure} from '../utils/examFigures.js';
export function renderQuestionContext(q,{examRoom=false}={}){
  const image=validQuestionImage(q)
    ? `<figure class="exam-question-image"><img src="${h(q.questionImage)}" alt="${h(q.imageAlt)}" decoding="async"></figure>`
    : '';
  return `${q.passage?`<blockquote>${h(q.passage)}</blockquote>`:''}${q.table?`<pre>${h(q.table)}</pre>`:''}${renderFigure(q.figure,examRoom)}${image}`;
}
export function renderAnswerInputs(q,answer,{name='exam-answer',numericId=''}={}){
  if(q.type==='NAT')return `<label class="numeric-answer">Numeric answer<input ${numericId?`id="${h(numericId)}"`:''} data-numeric type="number" step="any" inputmode="decimal" value="${h(answer??'')}" aria-label="Numeric answer"></label>`;
  return (q.options||[]).map((option,i)=>`<label class="exam-option"><input type="${q.type==='MSQ'?'checkbox':'radio'}" name="${h(name)}" data-answer="${i}" value="${i}" ${q.type==='MSQ'?(answer||[]).map(Number).includes(i)?'checked':'':answer!==undefined&&answer!==null&&Number(answer)===i?'checked':''}><span>${String.fromCharCode(65+i)}. ${h(option)}</span></label>`).join('');
}
export function readAnswer(root,q){if(q.type==='NAT')return root.querySelector('[data-numeric]')?.value??'';const selected=[...root.querySelectorAll('[data-answer]:checked')].map(el=>Number(el.dataset.answer));return q.type==='MSQ'?selected:selected[0];}
export function answerLabel(q,answer){if(answer===null||answer===undefined||answer==='')return 'Unanswered';if(q.type==='NAT')return String(answer);if(Array.isArray(answer))return answer.map(i=>q.options?.[Number(i)]??i).join('; ');return q.options?.[Number(answer)]??String(answer);}
