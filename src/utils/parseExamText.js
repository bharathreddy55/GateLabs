import { EXAMS } from '../config/exams.js';
import { normaliseQuestions } from './examAdapters.js';
export function validateStudyQuestion(q){
  const errors=[];if(!q||typeof q!=='object')return ['Invalid question'];
  if(typeof q.question!=='string'||!q.question.trim())errors.push('Missing question text');
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
export function questionId(q){let hash=2166136261;for(const c of `${q.subject||''}\n${q.question}`)hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0;return 'q_text_'+hash.toString(16);}
export function parseExamText(text,examId){
  const canonical=String(text).replace(/^\s*(?:Question|Ques|Q)[.\s-]*(\d+)\s*[.):]\s*/gim,'Q$1: ').replace(/^\s*(\d+)[.)]\s+(?=[A-Z])/gm,'Q$1: ').replace(/^\s*\(([A-E])\)\s*/gim,'option $1: ').replace(/^(?:Ans|Correct Answer)\s*[:.-]\s*\(?([A-E])\)?\s*$/gim,'correct: $1');
  const blocks=canonical.includes('---')?canonical.split(/---/):canonical.split(/(?=^Q\d+[:.])/m),questions=[];
  for(const block of blocks){
    if(!block.trim())continue;
    const q={type:'MCQ',marks:1,question:'',options:[],correctAnswer:null,topic:'Imported practice',explanation:'',subject:''};
    let current=null,key=null;
    for(const raw of block.trim().split(/\r?\n/)){
      const line=raw.trim();if(!line)continue;let match;
      if((match=line.match(/^(subject|section|topic|question|explanation|passage|table|source|difficulty):\s*(.*)$/i))){current=match[1].toLowerCase();q[current]=match[2];}
      else if((match=line.match(/^(?:option\s+)?([A-E])[:).]\s*(.*)$/i))){current=`option${match[1].toUpperCase().charCodeAt(0)-65}`;q.options[Number(current.slice(6))]=match[2];}
      else if((match=line.match(/^(?:correct|answer|correct answer|correctOptions):\s*(.*)$/i))){key=match[1].trim();current=null;}
      else if((match=line.match(/^type:\s*(.*)$/i))){q.type=match[1].trim().toUpperCase();current=null;}
      else if((match=line.match(/^(marks|year|natMin|natMax|correctNat):\s*(.*)$/i))){const prop={natmin:'natMin',natmax:'natMax',correctnat:'correctNat'}[match[1].toLowerCase()]||match[1].toLowerCase();q[prop]=Number(match[2]);current=null;}
      else if((match=line.match(/^Q\d+[:.]\s*(.*)$/i))){q.question=match[1];current='question';}
      else if(current?.startsWith('option'))q.options[Number(current.slice(6))]+='\n'+line;
      else if(current)q[current]+='\n'+line;
    }
    const index=value=>/^[A-E]$/i.test(value)?value.toUpperCase().charCodeAt(0)-65:/^[0-4]$/.test(value)?Number(value):null;
    if(q.type==='NAT'&&key!==null&&key!==''&&Number.isFinite(Number(key)))q.correctNat=Number(key);
    else if(q.type==='MSQ'&&key!==null){const values=key.replace(/[\[\]]/g,'').split(/[ ,;]+/).filter(Boolean).map(index);if(values.every(i=>i!==null))q.correctOptions=values;}
    else if(key!==null)q.correctAnswer=index(key);
    if(!q.subject&&EXAMS[examId]){let end=0;for(const [name,count] of EXAMS[examId].sections){end+=count;if(questions.length<end){q.subject=name;break;}}}
    q.id=questionId(q);questions.push(q);
  }
  return EXAMS[examId]?normaliseQuestions(examId,questions):questions;
}
