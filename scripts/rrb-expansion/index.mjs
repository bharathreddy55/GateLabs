import { EXAMS } from '../../src/config/exams.js';
import { crossPaperRepeats, inspectPaper } from '../paper-quality.mjs';
import { data } from './data.mjs';
import { reasoning } from './logic.mjs';
import { mental } from './mental.mjs';
import { drillReading, reading } from './reading.mjs';
import { science } from './science.mjs';

const note='Original questions modelled on overlapping skills in the 2025 NTPC Graduate CBT papers and the CEN 08/2026 Station Master syllabus.';
const format='Uses the indicative 30/30/20/20 Station Master distribution, with 100 questions in 120 minutes.';
const drillFormat='The 20-question drill uses a 6/6/4/4 mix with an answer and explanation for every question.';
const weights=[6,6,4,4];

function spreadKeys(questions,seed) {
  const positions=questions.map((_,i)=>i%4);
  for(let i=positions.length-1;i>0;i--){
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const j=Math.floor(seed/2**32*(i+1));
    [positions[i],positions[j]]=[positions[j],positions[i]];
  }
  questions.forEach((q,i)=>{
    const [answer]=q.options.splice(q.correctAnswer,1);
    q.correctAnswer=positions[i];
    q.options.splice(q.correctAnswer,0,answer);
  });
}

function assemble(k,kind,number,review) {
  const full=kind==='mock';
  const logical=reasoning(k,full);
  if(full)logical.push(...reading(number-11));
  else logical.splice(3,1,...drillReading(k-31));
  const blocks=[science(k),data(k,full),logical,mental(k,full)];
  const questions=blocks.flatMap((rows,section)=>(full?rows:rows.slice(0,weights[section])).map((row,i)=>{
    const [topic,stem,key,wrong,explanation,{proves,...context}={}]=row;
    const [sectionName]=EXAMS.rrb.sections[section];
    const question={
      id:`rrb-exp-${kind}-${number}-${section+1}-${i+1}`,
      section:sectionName, subject:sectionName, topic, question:stem,
      options:[key,...wrong].map(String), correctAnswer:0, marks:1, type:'MCQ',
      explanation, source:kind==='challenge'?EXAMS.rrb.source:'GateLabs original model question; '+EXAMS.rrb.source,
      ...context
    };
    review.push({question,proves,editorialKey:String(key)});
    return question;
  }));
  spreadKeys(questions,k*37813);
  const label=full?`Practice model ${number}`:kind==='challenge'? 'Challenge drill 2':`Timed drill ${number}`;
  return {
    title:`${EXAMS.rrb.name} · ${label}`,
    category:full?'Model paper':kind==='challenge'?'Challenge drill':'Timed drill',
    full,provenance:'GateLabs original practice material',note:`${note} ${full?format:drillFormat}`,questions
  };
}

export function stationMasterExpansion() {
  const review=[];
  const papers=Array.from({length:10},(_,i)=>assemble(21+i,'mock',11+i,review));
  const drills=Array.from({length:9},(_,i)=>assemble(31+i,'drill',11+i,review));
  const challenge=assemble(40,'challenge',2,review);
  for (const {question,proves,editorialKey} of review) {
    const solved=proves?question.options.filter(proves):question.options.filter(option=>option===editorialKey);
    if(solved.length!==1||solved[0]!==question.options[question.correctAnswer]) {
      throw Error(`Final RRB solution check failed: ${question.id}`);
    }
  }
  for (const paper of [...papers,...drills,challenge]) {
    const {errors}=inspectPaper({...paper,examId:'rrb',original:true});
    if(errors.length)throw Error(`${paper.title}: ${errors.join(' · ')}`);
  }
  const repeats=crossPaperRepeats([...papers,...drills,challenge]);
  if(repeats.length)throw Error(`Expansion repeated prompts: ${repeats.map(group=>group.map(x=>x.question.id).join('/')).join(', ')}`);
  return {papers,drills,challenge};
}
