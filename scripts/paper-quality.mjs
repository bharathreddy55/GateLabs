import { validatePaper } from '../src/utils/examEngine.js';

const canonical = value => String(value??'').normalize('NFC').toLowerCase().replace(/[‘’]/g,"'").replace(/\s+/g,' ').trim();
const choices = q => (q.options??[]).map(canonical);
const optionKey = q => JSON.stringify(choices(q).sort());
const contextKey = q => JSON.stringify([canonical(q.passage),canonical(q.table),q.figure??null,q.questionImage??'']);
const genericStem = /^(?:which (?:one )?of the following (?:statements?|options?) (?:is|are) (?:correct|true|incorrect|false)|which of the following is correct|select the (?:(?:incorrectly|correctly) spelt word from the options|word that is spelt correctly))[?:]?$/;
export const promptKey = q => {
  const stem=canonical(q.question);
  return JSON.stringify([stem,contextKey(q),genericStem.test(stem)?optionKey(q):null]);
};
const skeleton = q => canonical(q.question)
  .replace(/\b\d+(?:[.,:]\d+)*\b/g,' # ')
  .replace(/[^\p{L}#]+/gu,' ').trim();
export const numberTemplateKey = q => JSON.stringify([skeleton(q),contextKey(q)]);

function groupRepeats(items,key) {
  const groups=new Map();
  for(const item of items) {
    const value=key(item);
    const members=groups.get(value)??[];
    members.push(item);
    groups.set(value,members);
  }
  return [...groups.values()].filter(group=>group.length>1);
}

function shingles(stem) {
  const tokens=stem.split(' ');
  return new Set(tokens.slice(0,-2).map((_,i)=>tokens.slice(i,i+3).join(' ')));
}

function nearbyStems(questions) {
  const candidates=questions.map((q,i)=>({i,q,text:skeleton(q),context:contextKey(q)}))
    .filter(item=>item.text.split(' ').length>=8 && !genericStem.test(canonical(item.q.question)))
    .map(item=>({...item,grams:shingles(item.text)}));
  const found=[];
  for(const [i,a] of candidates.entries()) {
    for(const b of candidates.slice(i+1)) {
      if(a.q.section!==b.q.section || a.context!==b.context)continue;
      if(Math.min(a.grams.size,b.grams.size)/Math.max(a.grams.size,b.grams.size)<.8)continue;
      const shared=[...a.grams].filter(gram=>b.grams.has(gram)).length;
      const score=shared/(a.grams.size+b.grams.size-shared);
      if(score>=.8)found.push({items:[a.i+1,b.i+1],score:Number(score.toFixed(2))});
    }
  }
  return found;
}

export function inspectPaper({examId,title,questions,full,original}) {
  const positions=Array(5).fill(0);
  for(const q of questions) {
    if((q.type??'MCQ')==='MCQ'&&Number.isInteger(q.correctAnswer)&&q.correctAnswer>=0&&q.correctAnswer<positions.length)positions[q.correctAnswer]++;
  }
  const count=positions.reduce((a,b)=>a+b,0);
  const duplicates=groupRepeats(questions,promptKey);
  const repeatedChoices=groupRepeats(questions.filter(q=>q.options?.length),optionKey);
  const similar=nearbyStems(questions);
  const errors=validatePaper(examId,questions,full);
  for(const group of duplicates)errors.push('Repeated prompt and context: '+group.map(q=>q.id).join(', '));
  for(const q of questions)if(new Set(choices(q)).size!==choices(q).length)errors.push('Equivalent choices: '+q.id);
  if(original){
    if(questions.some(q=>!q.explanation?.trim()||!q.source?.trim())) errors.push('An original item is missing its explanation or source.');
    if(count>=20&&Math.max(...positions)/count>.45) errors.push('More than 45% of MCQ keys use one position.');
    if(examId!=='sbi')for(const pair of similar)errors.push('Review near-duplicate prompts at positions '+pair.items.join(' and '));
    for(const group of repeatedChoices) {
      if(examId==='rrb'&&!group.every(q=>/data sufficiency/i.test(q.topic))) errors.push('Reused choice set: '+group.map(q=>q.id).join(', '));
    }
  }
  if(examId==='gate'&&full) {
    const maths=questions.filter(q=>/engineering math/i.test(q.section||q.subject||'')).reduce((total,q)=>total+q.marks,0);
    if(maths!==13)errors.push('Full GATE CS requires 13 Engineering Mathematics marks.');
  }
  return {examId,title,questions:questions.length,positions,duplicates,repeatedChoices,similar,errors};
}

export function crossPaperRepeats(papers) {
  return groupRepeats(papers.flatMap(paper=>paper.questions.map(question=>({paper:paper.title,question}))),
    ({question})=>promptKey(question)).filter(group=>new Set(group.map(item=>item.paper)).size>1);
}
