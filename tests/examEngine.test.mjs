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
test('TET never inherits negative marks; blanks never gain marks',()=>{
 assert.equal(scorePaper('tet',[{...q,negativeMarks:1}],{one:1}).score,0);
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
 assert.ok(validatePaper('tet',[{...q,correctAnswer:null}],false).length);
 assert.ok(validatePaper('tet',[{...q,options:['a',,'c','d']}],false).length);
 assert.ok(validatePaper('tet',[null],false).length);
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
