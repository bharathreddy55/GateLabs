import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {explainAnswer} from '../src/utils/answerSolutions.js';
import {parseExamText} from '../src/utils/parseExamText.js';
import {buildCbatSet} from '../src/utils/cbat.js';
import {stationMasterReviewTopic} from '../src/utils/stationMasterReviewTopics.js';

const rrbReview = {examId:'rrb'};

test('Station Master model 2 has question-specific steps and authentic passage excerpts',()=>{
  const model=JSON.parse(readFileSync('public/exams/rrb.json','utf8')).find(paper=>paper.title.endsWith('Practice model 2'));
  assert.equal(model.questions.length,100);
  for (const q of model.questions) {
    const solution=explainAnswer(q,rrbReview);
    assert.ok(solution.steps.length >= 3 && solution.steps.every(step=>step.title && step.text),q.id);
    for (const {quote} of solution.steps) if (quote) assert.ok(q.passage.includes(quote),q.id);
    const wrongKey=explainAnswer({...q,correctAnswer:(q.correctAnswer+1)%q.options.length},rrbReview);
    assert.ok(wrongKey.steps.every(step=>!step.title && !step.quote),q.id);
  }
});

test('the Station Master probability solution counts distinct pairs and displays the verified fraction',()=>{
  const paper=JSON.parse(readFileSync('public/exams/rrb.json','utf8'))[1];
  const q=paper.questions.find(question=>question.id==='rrb-model2-11');
  const tokens=[...'RRRRRBBBBGGG'];
  const pairs=tokens.flatMap((first,i)=>tokens.slice(i+1).map(second=>first+second));
  const eligible=pairs.filter(pair=>[...pair].filter(color=>color==='R').length===1);
  const solution=explainAnswer(q,rrbReview);
  assert.equal(solution.steps.length,4);
  assert.equal(solution.finalAnswer.formula,`${eligible.length}/${pairs.length}`);
  assert.equal(solution.finalAnswer.latex,String.raw`\frac{35}{66}`);
  assert.equal(solution.finalAnswer.text,'About 53.03%');
  assert.match(solution.shortcut.formula,/5 × 7/);
  assert.match(solution.tip,/second bottom number is 11/);
});

test('the well-mixed tank review tracks the drink and strong juice separately',()=>{
  const papers=JSON.parse(readFileSync('public/exams/rrb.json','utf8'));
  const q=papers.flatMap(paper=>paper.questions).find(question=>question.id==='rrb-model3-1');
  const solution=explainAnswer(q,rrbReview);
  assert.equal(solution.picture.title,'Imagine a big juice tank');
  assert.equal(solution.steps.length,4);
  assert.deepEqual(solution.steps[1].calculations.map(line=>line.formula),[
    '30/100 × 10 L = 3 L','12 L − 3 L = 9 L of strong juice','40 L − 10 L = 30 L of drink'
  ]);
  assert.equal(solution.steps[2].calculations[1].formula,'9 L + 5 L = 14 L of strong juice');
  assert.match(solution.steps[3].formula,/14\/40.*35%/);
  assert.equal(solution.finalAnswer.text,'The final concentration is 35%.');
  assert.notEqual(explainAnswer({...q,correctAnswer:1},rrbReview).picture.title,solution.picture.title);
});

test('all published Station Master CBT items have a beginner introduction and a worked explanation',()=>{
  const papers=['rrb.json','challenges/rrb.json'].flatMap(file=>
    JSON.parse(readFileSync('public/exams/'+file,'utf8')));
  for (const q of papers.flatMap(paper=>paper.questions)) {
    const solution=explainAnswer(q,rrbReview);
    assert.ok(solution.picture?.title && solution.picture?.text,q.id);
    assert.ok(solution.steps.length > 0,q.id);
    for (const step of solution.steps) {
      assert.ok(typeof step === 'string' ? step.trim() : step.text || step.formula,q.id);
      if (step.quote) assert.ok(q.passage?.includes(step.quote),q.id);
    }
  }
});

test('every published Station Master CBT mistake has a topic refresher',()=>{
  const notes=JSON.parse(readFileSync('src/config/notes/rrb.json','utf8'));
  const noteIds=new Set(notes.map(note=>note.id));
  const papers=['rrb.json','challenges/rrb.json'].flatMap(file=>
    JSON.parse(readFileSync('public/exams/'+file,'utf8')));
  for (const question of papers.flatMap(paper=>paper.questions)) {
    const topic=stationMasterReviewTopic(question);
    assert.ok(topic?.title && (topic.summary || noteIds.has(topic.noteId)),question.id);
    if (topic.noteId) assert.ok(noteIds.has(topic.noteId),question.id);
    if (question.topic==='Arithmetic and basic science') assert.notEqual(topic.title,question.topic,question.id);
  }
});

test('actual output walkthrough calculates every row from the targets and marks only the biggest gain',()=>{
  const papers=JSON.parse(readFileSync('public/exams/rrb.json','utf8'));
  const question=papers.flatMap(paper=>paper.questions).find(q=>q.id==='rrb-model3-31');
  const solution=explainAnswer(question,rrbReview);
  assert.match(solution.rule.formula,/target × percent attained ÷ 100/);
  assert.deepEqual(solution.working.headers,['Unit','Period 1 actual','Period 2 actual','Gain']);
  assert.deepEqual(solution.working.rows,[['A','90','135','+45'],['B','140','128','−12'],['C','90','110','+20'],['D','80','120','+40']]);
  assert.deepEqual(solution.working.highlight,[0]);
  assert.equal(solution.answer,'A');
  const changed=explainAnswer({...question,table:question.table.replace('180 | 75','176 | 75')},rrbReview);
  assert.deepEqual(changed.working.rows[0],['A','90','132','+42']);
  const stale=explainAnswer({...question,table:question.table.replace('180 | 75','160 | 75')},rrbReview);
  assert.equal(stale.working,undefined);
});

test('logical walkthroughs calculate candidate rows and preserve what a clue actually says',()=>{
  const papers=JSON.parse(readFileSync('public/exams/rrb.json','utf8'));
  const questions=papers.flatMap(paper=>paper.questions);
  const alarm=questions.find(q=>q.id==='rrb-exp-mock-11-3-3');
  const evaluated=explainAnswer(alarm,rrbReview);
  assert.deepEqual(evaluated.working.rows.filter((_,i)=>evaluated.working.highlight.includes(i)),[
    ['On','Off','Off','Yes'], ['Off','On','On','Yes']
  ]);
  assert.equal(evaluated.answer,2);
  const floor=explainAnswer(questions.find(q=>q.id==='rrb-exp-mock-11-3-1'),rrbReview);
  assert.deepEqual(floor.working.rows,[[1,'Y','Y'],[2,'D','S'],[3,'I','I'],[4,'N','N'],[5,'S','D'],[6,'X','X']]);
  const reading=questions.find(q=>q.section==='Logical Capability'&&q.question==='What role does the last sentence play?');
  const quote=explainAnswer(reading,rrbReview).steps.find(step=>step.quote)?.quote;
  assert.ok(quote && reading.passage.endsWith(quote));
});

test('recognised Station Master maths and reasoning tasks use the values from the current paper',()=>{
  const papers=JSON.parse(readFileSync('public/exams/rrb.json','utf8'));
  const tasks=papers.flatMap(paper=>paper.questions);
  for (const topic of ['Annular area','Moments','Clock angles','Calendar with two shifts','Interleaved number series']) {
    const solved=tasks.filter(q=>q.topic===topic && /^rrb-model[4-9]-/.test(q.id))
      .map(q=>explainAnswer(q,rrbReview));
    assert.ok(solved.filter(s=>s.steps.every(step=>step.title) && s.steps.length===3).length >= 3,topic);
  }
});

test('worked calculations use the paper values and defer to the source when the key differs',()=>{
  const papers=JSON.parse(readFileSync('public/exams/rrb.json','utf8'));
  const averages=papers.flatMap(paper=>paper.questions).filter(q=>q.topic==='Weighted average'&&q.question.startsWith('The mean mass of'));
  assert.ok(averages.length>=7);
  for(const q of averages){
    const solution=explainAnswer(q);
    assert.equal(solution.steps.length,3);
    assert.ok(solution.steps.at(-1).includes(q.options[q.correctAnswer]));
    const mismatch=explainAnswer({...q,correctAnswer:(q.correctAnswer+1)%q.options.length});
    assert.equal(mismatch.reason,q.explanation);
  }
  const cache=JSON.parse(readFileSync('public/questions/computer-organization-architecture-coa.json','utf8')).find(q=>q.id==='q_text_adb71d38');
  assert.match(explainAnswer(cache).steps.at(-1),/32 − 9 − 6 = 17 bits/);
});

test('SBI quadratic review separates strict inequalities from overlapping endpoints',()=>{
  const questions=parseExamText(readFileSync('public/pyqs/sbi_clerk_mock_1.txt','utf8'),'sbi');
  const item=questions.find(q=>q.topic==='Quadratic Equations');
  const solution=explainAnswer(item);
  assert.match(solution.steps[0],/x = 3 or 4/);
  assert.match(solution.steps[2],/4 = 4/);
  assert.match(solution.steps[3],/x ≤ y/);
});

test('saved explanations preserve decimals and source reasoning, with no invented solution for missing text',()=>{
  assert.deepEqual(explainAnswer({explanation:'Dr. Rao used 3.25 units. The total is 6.5 units.'}).steps,[
    'Dr. Rao used 3.25 units.','The total is 6.5 units.'
  ]);
  assert.equal(explainAnswer({explanation:'A single factual explanation.'}).reason,'A single factual explanation.');
  assert.deepEqual(explainAnswer({topic:'Reading Comprehension'}),{approach:'',steps:[],reason:'',tip:''});
});

test('CBAT explanations identify the correct figure, total, route and sequence',()=>{
  for(const [battery,check] of [
    ['intelligence',q=>q.solution.steps.at(-1).startsWith('Choice '+String.fromCharCode(65+q.correct))],
    ['attention',q=>q.solution.steps.at(-1).endsWith(' = '+q.options[q.correct]+'.')],
    ['spatial',q=>q.solution.steps.at(-1).endsWith('house '+q.options[q.correct]+'.')],
    ['ordering',q=>q.solution.steps.at(-1).endsWith(q.options[q.correct]+'.')]
  ]) {
    for (const set of [1,2]) {
      for (const question of buildCbatSet(battery,set)) {
        assert.ok(check(question),battery);
        const solution=explainAnswer({...question,question:question.prompt},{battery});
        assert.ok(solution.picture?.title && solution.steps.length>=3,battery);
      }
    }
  }
});
