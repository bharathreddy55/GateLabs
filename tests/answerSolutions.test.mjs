import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {explainAnswer} from '../src/utils/answerSolutions.js';
import {parseExamText} from '../src/utils/parseExamText.js';
import {buildCbatSet} from '../src/utils/cbat.js';

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
    assert.ok(buildCbatSet(battery,1).every(check),battery);
    assert.ok(buildCbatSet(battery,2).every(check),battery);
  }
});
