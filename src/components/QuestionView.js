import {escapeHtml as h, validQuestionImage} from '../utils/examEngine.js';
import {renderFigure} from '../utils/examFigures.js';

function renderQuestionTable(raw) {
  // Some older drills store literal backslash-n sequences.
  const lines = raw.replaceAll('\\n', '\n').trim().split(/\r?\n/);
  const first = lines.findIndex(line => line.includes('|'));
  const last = lines.findLastIndex(line => line.includes('|'));
  const rows = first < 0 ? [] : lines.slice(first, last + 1).map(line => line.split('|').map(cell => cell.trim()));
  if (rows.length < 2 || rows[0].length < 2 || rows.some(row => row.length !== rows[0].length)) {
    return `<pre>${h(lines.join('\n'))}</pre>`;
  }

  // Frequency data can use a label at the start of each row, followed by values.
  const labelled = rows.map(([cell]) => cell.match(/^(.+?):\s+(.+)$/));
  const [headers, ...data] = labelled.every(Boolean)
    ? [labelled.map(([, label]) => label), ...rows[0].map((_, i) =>
        rows.map((row, j) => i === 0 ? labelled[j][2] : row[i]))]
    : rows;
  const numeric = headers.map((_, i) => i > 0 && data.every(row => /^[+−-]?[₹$€]?\s*\d[\d,]*(?:\.\d+)?%?$/.test(row[i])));
  const cellClass = i => numeric[i] ? ' class="exam-table-number"' : '';
  const caption = lines.slice(0, first).join('\n').trim();
  const note = lines.slice(last + 1).join('\n').trim();

  return `<div class="exam-question-table" role="region" aria-label="Question table" tabindex="0">
    <table${caption ? '' : ' aria-label="Question data"'}>
      ${caption ? `<caption>${h(caption)}</caption>` : ''}
      <thead><tr>${headers.map((header, i) => `<th scope="col"${cellClass(i)}>${h(header)}</th>`).join('')}</tr></thead>
      <tbody>${data.map(([label, ...values]) => `<tr><th scope="row">${h(label)}</th>
        ${values.map((value, i) => `<td${cellClass(i + 1)}>${h(value)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  </div>${note ? `<p class="exam-table-note">${h(note)}</p>` : ''}`;
}

export function renderQuestionContext(q,{examRoom=false,examId}={}){
  const image=validQuestionImage(q)
    ? `<figure class="exam-question-image"><img src="${h(q.questionImage)}" alt="${h(q.imageAlt)}" decoding="async"></figure>`
    : '';
  const table = q.table && (examId === 'rrb' && typeof q.table === 'string'
    ? renderQuestionTable(q.table)
    : `<pre>${h(q.table)}</pre>`);
  return `${q.passage?`<blockquote>${h(q.passage)}</blockquote>`:''}${table || ''}${renderFigure(q.figure,examRoom)}${image}`;
}
export function renderAnswerInputs(q,answer,{name='exam-answer',numericId=''}={}){
  if(q.type==='NAT')return `<label class="numeric-answer">Numeric answer<input ${numericId?`id="${h(numericId)}"`:''} data-numeric type="number" step="any" inputmode="decimal" value="${h(answer??'')}" aria-label="Numeric answer"></label>`;
  return (q.options||[]).map((option,i)=>`<label class="exam-option"><input type="${q.type==='MSQ'?'checkbox':'radio'}" name="${h(name)}" data-answer="${i}" value="${i}" ${q.type==='MSQ'?(answer||[]).map(Number).includes(i)?'checked':'':answer!==undefined&&answer!==null&&Number(answer)===i?'checked':''}><span>${String.fromCharCode(65+i)}. ${h(option)}</span></label>`).join('');
}
export function readAnswer(root,q){if(q.type==='NAT')return root.querySelector('[data-numeric]')?.value??'';const selected=[...root.querySelectorAll('[data-answer]:checked')].map(el=>Number(el.dataset.answer));return q.type==='MSQ'?selected:selected[0];}
export function answerLabel(q,answer){if(answer===null||answer===undefined||answer==='')return 'Unanswered';if(q.type==='NAT')return String(answer);if(Array.isArray(answer))return answer.map(i=>q.options?.[Number(i)]??i).join('; ');return q.options?.[Number(answer)]??String(answer);}
