import {EXAMS} from '../src/config/exams.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validatePaper, scorePaper, countdown } from '../src/utils/examEngine.js';

test('Group 2 Mains has two independent 150-minute models and marked practice drills', async () => {
  const {readFile} = await import('node:fs/promises');
  for (const exam of ['group2-mains-1', 'group2-mains-2']) {
    const [model, drill] = JSON.parse(await readFile(new URL(`../public/exams/${exam}.json`, import.meta.url), 'utf8'));
    assert.equal(EXAMS[exam].minutes, 150);
    assert.equal(EXAMS[exam].date, null);
    assert.equal(EXAMS[exam].penalty, 1/3);
    assert.deepEqual(EXAMS[exam].sections.map(section => section[1]), [75,75]);
    assert.deepEqual(validatePaper(exam,model.questions,true), []);
    assert.equal(drill.full,false);
    assert.deepEqual(validatePaper(exam,drill.questions,false), []);
    assert.ok(model.questions.every(question => question.explanation && question.source.startsWith('https://')));
  }
});
import { parseExamText } from '../src/utils/parseExamText.js';
const q={id:'one',question:'Example?',options:['A','B','C','D'],correctAnswer:0,marks:1,type:'MCQ'};
test('blanks never earn or lose marks',()=>{
 assert.equal(scorePaper('rrb',[q],{}).score,0);
 assert.equal(scorePaper('rrb',[q],{}).skippedCount,1);
});
test('job-specific penalties and negative total are preserved',()=>{
 for(const id of ['group2','rrb'])assert.equal(scorePaper(id,[q],{one:1}).score,-1/3);
 assert.equal(scorePaper('sbi',[q],{one:1}).score,-.25);
 assert.equal(scorePaper('gate',[{...q,marks:2}],{one:1}).score,-2/3);
});
test('GATE MSQ exact match, NAT inclusive range and no negative marking',()=>{
 const msq={...q,type:'MSQ',correctOptions:[0,2]},nat={...q,id:'two',type:'NAT',natMin:1.9,natMax:2.1};
 assert.equal(scorePaper('gate',[msq,nat],{one:[2,0],two:2.1}).score,2);
 assert.equal(scorePaper('gate',[msq,nat],{one:[0],two:2.2}).score,0);
});
test('paper validation rejects bad keys, sparse options, nulls and wrong section quotas',()=>{
 assert.ok(validatePaper('group2',[{...q,correctAnswer:null}],false).length);
 assert.ok(validatePaper('group2',[{...q,options:['a',,'c','d']}],false).length);
 assert.ok(validatePaper('group2',[null],false).length);
 assert.ok(validatePaper('rrb',[q],true).length);
 assert.ok(validatePaper('gate',[{...q,type:'NAT',natMin:5,natMax:2}],false).length);
});
test('both original model papers have exact counts, valid keys and explanations',()=>{
 for(const id of ['group2','rrb']){
 const [p]=JSON.parse(fs.readFileSync(`public/exams/${id}.json`));
 assert.deepEqual(validatePaper(id,p.questions,true),[]);
 assert.ok(p.questions.every(q=>q.explanation&&q.source));
 const allCorrect=Object.fromEntries(p.questions.map(q=>[q.id,q.correctAnswer]));
 assert.equal(scorePaper(id,p.questions,allCorrect).score,p.questions.length);
 }
});
test('Station Master publishes ten full CBT papers and ten drills with distinct question contexts',()=>{
 const papers=JSON.parse(fs.readFileSync('public/exams/rrb.json'));
 const [challenge]=JSON.parse(fs.readFileSync('public/exams/challenges/rrb.json'));
 const [foundation,...newModels]=papers;
 const fingerprint=q=>JSON.stringify([q.question.trim(),q.table||'',q.passage||'',q.figure||null]);
 const published=[...foundation.questions,...challenge.questions];
 const ids=new Set(published.map(q=>q.id));
 const stems=new Set(published.map(fingerprint));
 assert.equal(papers.filter(p=>p.full!==false).length,10);
 assert.equal(papers.filter(p=>p.full===false).length+1,10);
 assert.deepEqual(newModels.slice(0,2).map(p=>p.title),[
   'RRB Station Master CBT · Practice model 2','RRB Station Master CBT · Practice model 3'
 ]);
 for(const {questions,full} of newModels){
   const isFull=full!==false;
   assert.deepEqual(validatePaper('rrb',questions,isFull),[]);
   assert.equal(questions.length,isFull?100:20);
   if(isFull){
     assert.ok(questions.filter(q=>q.passage).length>=4);
     assert.ok(questions.some(q=>q.figure?.type==='pie'));
   }else{
     assert.deepEqual(EXAMS.rrb.sections.map(([section])=>questions.filter(q=>q.section===section).length),[6,6,4,4]);
   }
   for(const q of questions) {
     assert.ok(q.explanation&&q.source.startsWith('GateLabs original model question'));
     assert.equal(ids.has(q.id),false);
     assert.ok(!stems.has(fingerprint(q)),q.question);
     ids.add(q.id);
     stems.add(fingerprint(q));
   }
   const allCorrect=Object.fromEntries(questions.map(q=>[q.id,q.correctAnswer]));
   assert.equal(scorePaper('rrb',questions,allCorrect).score,questions.length);
   const firstWrong=scorePaper('rrb',questions,{[questions[0].id]:(questions[0].correctAnswer+1)%4});
   assert.equal(firstWrong.score,-1/3);
   assert.equal(firstWrong.skippedCount,questions.length-1);
 }
});
test('parser keeps fifth SBI option and never defaults missing keys to A',()=>{
 const text='subject: English\nquestion: Which?\noption a: A\noption b: B\noption c: C\noption d: D\noption e: E\ncorrect: E';
 assert.equal(parseExamText(text,'sbi')[0].correctAnswer,4);
 assert.equal(parseExamText(text.replace('correct: E',''),'sbi')[0].correctAnswer,null);
 assert.equal(parseExamText(text,'sbi')[0].options.length,5);
});
test('countdown uses IST date boundary and distinguishes no schedule from expired',()=>{
 assert.match(countdown(null),/Awaiting/);
 assert.equal(countdown('2027-02-21',new Date('2027-02-20T19:00:00Z')),'Exam date is today');
 assert.equal(countdown('2027-02-21',new Date('2027-02-22T01:00:00Z')),'Scheduled date has passed');
 assert.match(countdown('2027-02-21',new Date('2027-02-19T00:00:00Z')),/^2 days/);
});

test('announced GATE 2027 window is separate from the unverified CS slot',()=>{const gate=EXAMS.gate;assert.equal(gate.date,null);assert.equal(gate.schedule.paperDate,null);assert.deepEqual(gate.schedule.dates,['2027-02-06','2027-02-07','2027-02-13','2027-02-14','2027-02-20','2027-02-21']);assert.match(countdown(gate.schedule.dates[0],new Date('2026-11-18T00:00:00Z')),/^80 days/);assert.equal(gate.schedule.source,'https://gate2027.iitm.ac.in/important_dates');});
