import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { normaliseQuestions } from '../src/utils/examAdapters.js';
import { parseExamText } from '../src/utils/parseExamText.js';
import { reviewSbiPractice } from '../src/utils/sbiPractice.js';
import { inspectPaper, crossPaperRepeats } from './paper-quality.mjs';

const publicDir=new URL('../public/',import.meta.url);
const json=path=>JSON.parse(fs.readFileSync(new URL(path,publicDir),'utf8'));
const files=path=>fs.readdirSync(new URL(path,publicDir)).sort();

export function loadPublishedPapers() {
  const papers=[];
  for(const folder of ['exams/','exams/challenges/']){
    for(const file of files(folder).filter(name=>name.endsWith('.json')&&name!=='sbi-corrections.json')){
      for(const paper of json(folder+file))papers.push({...paper,examId:file.slice(0,-5),full:paper.full!==false,original:true});
    }
  }
  const corrections=new Map(json('exams/sbi-corrections.json').map(paper=>[paper.file,paper]));
  for(const file of files('pyqs/').filter(name=>/^sbi_clerk_.*\.txt$/.test(name))){
    const corrected=corrections.get(file);
    const original=/^sbi_clerk_(?:mock|expected)/.test(file);
    const raw=corrected?.questions??parseExamText(fs.readFileSync(new URL('pyqs/'+file,publicDir),'utf8'),'sbi');
    papers.push({examId:'sbi',title:corrected?.title??file,questions:reviewSbiPractice(raw,file),full:true,original});
  }
  const buckets=new Map();
  for(const file of files('questions/').filter(name=>name.endsWith('.json')&&name!=='index.json')){
    for(const q of json('questions/'+file)){
      const year=q.year||'undated';
      const rows=buckets.get(year)??[];
      rows.push(q);
      buckets.set(year,rows);
    }
  }
  for(const [year,questions] of buckets){
    papers.push({examId:'gate',title:`GATE CS ${year} question pool`,questions:normaliseQuestions('gate',questions),full:false,original:false});
  }
  return papers;
}

function main() {
  const papers=loadPublishedPapers();
  const audit=papers.map(inspectPaper);
  const summary=[];
  for(const examId of new Set(papers.map(paper=>paper.examId))){
    const rows=audit.filter(paper=>paper.examId===examId);
    summary.push({
      exam:examId,papers:rows.length,questions:rows.reduce((total,row)=>total+row.questions,0),
      repeatedChoiceSets:rows.reduce((total,row)=>total+row.repeatedChoices.length,0),
      similarPairs:rows.reduce((total,row)=>total+row.similar.length,0),
      repeatedAcrossPapers:crossPaperRepeats(papers.filter(paper=>paper.examId===examId)).length,
      errors:rows.reduce((total,row)=>total+row.errors.length,0)
    });
  }
  console.table(summary);
  for(const row of audit){
    if(row.errors.length)console.error(row.title+'\n  '+row.errors.join('\n  '));
    if(process.argv.includes('--details')&&(row.repeatedChoices.length||row.similar.length)){
      console.log(row.title,JSON.stringify({choiceGroups:row.repeatedChoices.map(group=>group.map(q=>q.id)),stemPairs:row.similar}));
    }
  }
  if(audit.some(row=>row.errors.length))process.exitCode=1;
}

if(process.argv[1]&&pathToFileURL(process.argv[1]).href===import.meta.url)main();
