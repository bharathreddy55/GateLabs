import { EXAMS } from '../config/exams.js';
import { normaliseQuestions } from './examAdapters.js';
import { validQuestionImage } from './examEngine.js';
export function validateStudyQuestion(q){
  const errors=[];if(!q||typeof q!=='object')return ['Invalid question'];
  if(typeof q.question!=='string'||!q.question.trim())errors.push('Missing question text');
  if(q.questionImage&&!validQuestionImage(q))errors.push('Invalid question image');
  const type=q.type||'MCQ';if(!['MCQ','MSQ','NAT'].includes(type))errors.push('Unknown question type');
  if(![1,2].includes(q.marks))errors.push('Marks must be 1 or 2');
  if(type==='NAT'){
    if(!Number.isFinite(q.natMin??q.correctNat)||!Number.isFinite(q.natMax??q.correctNat)||(q.natMin??q.correctNat)>(q.natMax??q.correctNat))errors.push('Missing or invalid numeric key');
  }else{
    if(!Array.isArray(q.options)||![4,5].includes(q.options.length)||Array.from(q.options).some(o=>typeof o!=='string'||!o.trim())||new Set(q.options).size!==q.options.length)errors.push('Incomplete or duplicate options');
    if(type==='MCQ'&&(!Number.isInteger(q.correctAnswer)||q.correctAnswer<0||q.correctAnswer>=(q.options?.length||0)))errors.push('Missing or invalid answer key');
    if(type==='MSQ'&&(!Array.isArray(q.correctOptions)||!q.correctOptions.length||new Set(q.correctOptions).size!==q.correctOptions.length||q.correctOptions.some(i=>!Number.isInteger(i)||i<0||i>=(q.options?.length||0))))errors.push('Missing or invalid multiple-answer key');
  }
  return errors;
}
export function questionId(q){
  const fields=[q.subject,q.type,q.passage,q.table,q.question,q.options];
  if(q.questionImage)fields.push(q.questionImage);
  let hash=2166136261;
  for(const c of JSON.stringify(fields))hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0;
  return 'q_text_'+hash.toString(16);
}

function splitSharedPrompt(text, number) {
  const chunks = text.split(/\n\n+/);
  if (chunks.length < 2) return null;
  const header = chunks[0];
  const directions = header.match(/^Directions?\s*\((\d+)\s*[-–]\s*(\d+)\)\s*:\s*/i);
  const reading = header.match(/^Read\b[^\n]*\bquestions\s+(\d+)\s*(?:to|[-–])\s*(\d+)\b/i);
  const cloze = /\bpassage\b[^\n]*\bblank\s*\(1\)/i.test(header)
    ? [...text.matchAll(/_{2,}\((\d+)\)_*/g)].map(match => Number(match[1]))
    : [];
  const range = directions || reading;
  if (!range && !cloze.length) return null;
  const start = range ? Number(range[1]) : number;
  const end = range ? Number(range[2]) : number + Math.max(...cloze) - 1;
  if (start !== number || end < start) return null;

  if (directions && chunks.length === 2 && /\bBlank\s*\([A-E]\)/i.test(header) && /^_{2,}/.test(chunks[1])) {
    return { start, end, question: header.slice(directions[0].length).replace(/:\s*$/, '.'), passage: chunks[1] };
  }
  // A first-item blank instruction would give the wrong blank number on the following items.
  const passage = chunks.slice(cloze.length && chunks.length > 2 ? 1 : 0, -1).join('\n\n');
  const formattedPassage = directions && passage.startsWith(directions[0])
    ? 'Directions (' + start + '–' + end + '): ' + passage.slice(directions[0].length)
    : passage;
  return { start, end, question: chunks.at(-1), passage: formattedPassage };
}

export function parseExamText(text,examId){
  const canonical=String(text).replace(/\r\n/g,'\n');
  const separated=canonical.split(/^[ \t]*---[ \t]*$/m);
  const blocks=separated.length>1 ? separated : canonical
    .replace(/^[ \t]*(?:Question|Ques|Q)[. \t-]*(\d+)[ \t]*[.):][ \t]*/gim,'Q$1: ')
    .replace(/^[ \t]*(\d+)[.)][ \t]+(?=[A-Z])/gm,'Q$1: ')
    .split(/(?=^Q\d+[:.])/m);
  const questions=[];
  let sharedContext=null;
  for(const block of blocks){
    if(!block.trim())continue;
    const q={type:'MCQ',marks:1,question:'',options:[],correctAnswer:null,topic:'Imported practice',explanation:'',subject:''};
    const taggedOptions=/^[ \t]*option\s+[A-E]\s*:/im.test(block);
    const optionPattern=taggedOptions
      ? /^option\s+([A-E])\s*:\s*(.*)$/i
      : /^(?:\(([A-E])\)|([A-E])[:).])\s*(.*)$/i;
    let current=null,key=null,paragraphBreak=false;
    for(const raw of block.trim().split('\n')){
      const line=raw.trim();
      if(!line){paragraphBreak=true;continue;}
      let match;
      if((match=line.match(/^(subject|section|topic|subtopic|question|explanation|passage|table|source|difficulty|questionImage|imageAlt):\s*(.*)$/i))){
        const field=match[1].toLowerCase();
        current={questionimage:'questionImage',imagealt:'imageAlt'}[field]??field;
        q[current]=match[2];
      }
      else if((match=line.match(optionPattern))){
        const label=taggedOptions?match[1]:match[1]||match[2];
        current='option'+(label.toUpperCase().charCodeAt(0)-65);
        q.options[Number(current.slice(6))]=match.at(-1);
      }
      else if((match=line.match(/^(?:correct|answer|correct answer|correctOptions):\s*(.*)$/i))){key=match[1].trim();current=null;}
      else if((match=line.match(/^(?:Ans|Correct Answer)\s*[:.-]\s*\(?([A-E])\)?$/i))){key=match[1];current=null;}
      else if((match=line.match(/^type:\s*(.*)$/i))){q.type=match[1].trim().toUpperCase();current=null;}
      else if((match=line.match(/^(marks|year|natMin|natMax|correctNat):\s*(.*)$/i))){const prop={natmin:'natMin',natmax:'natMax',correctnat:'correctNat'}[match[1].toLowerCase()]||match[1].toLowerCase();q[prop]=Number(match[2]);current=null;}
      else if(!q.question&&(match=line.match(/^(?:(?:Question|Ques|Q)[. \t-]*)?\d+[ \t]*[.):][ \t]*(.*)$/i))){q.question=match[1];current='question';}
      else if(current?.startsWith('option'))q.options[Number(current.slice(6))]+='\n'+line;
      else if(current)q[current]+=(current==='question'&&paragraphBreak?'\n\n':'\n')+line;
      paragraphBreak=false;
    }
    const index=value=>/^\(?[A-E]\)?$/i.test(value)?value.replace(/[()]/g,'').toUpperCase().charCodeAt(0)-65:/^[0-4]$/.test(value)?Number(value):null;
    if(q.type==='NAT'&&key!==null&&key!==''&&Number.isFinite(Number(key)))q.correctNat=Number(key);
    else if(q.type==='MSQ'&&key!==null){const values=key.replace(/[\[\]]/g,'').split(/[ ,;]+/).filter(Boolean).map(index);if(values.every(i=>i!==null))q.correctOptions=values;}
    else if(key!==null)q.correctAnswer=index(key);
    if(!q.subject&&EXAMS[examId]){let end=0;for(const [name,count] of EXAMS[examId].sections){end+=count;if(questions.length<end){q.subject=name;break;}}}
    const number=questions.length+1;
    const grouped=splitSharedPrompt(q.question,number);
    if(grouped){
      sharedContext=grouped;
      q.question=grouped.question;
    }
    q.question=q.question.replace(/\n{2,}/g,'\n');
    if(!q.passage&&sharedContext&&number>=sharedContext.start&&number<=sharedContext.end)q.passage=sharedContext.passage;
    q.id=questionId(q);questions.push(q);
  }
  return EXAMS[examId]?normaliseQuestions(examId,questions):questions;
}
