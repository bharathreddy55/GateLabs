import assert from 'node:assert/strict';
import {test} from 'node:test';
import {attemptGroups,summarizeResponses} from '../src/utils/attemptInsights.js';

const responses = [
  {status:'correct',section:'Maths',topic:'Sequences',marks:2,earnedMarks:2},
  {status:'wrong',section:'Maths',topic:'Sequences',marks:1,earnedMarks:-1/3,markedForReview:true},
  {status:'skipped',section:'Reasoning',topic:'Sequences',marks:2,earnedMarks:0}
];

test('result insights count each outcome and separate gross marks, penalties and net score', ()=>{
  const summary=summarizeResponses(responses);
  assert.deepEqual([summary.correct,summary.wrong,summary.skipped,summary.marked,summary.attempted,summary.accuracy],[1,1,1,1,2,50]);
  assert.deepEqual(summary.marks,{earned:2,deducted:1/3,possible:5,net:2-1/3});
  const negative=summarizeResponses([responses[1]]);
  assert.equal(negative.marks.net,-1/3);
  assert.equal(summarizeResponses([responses[2]]).accuracy,null);
});

test('topic and section bars retain question positions and keep equal names in different sections apart', ()=>{
  const topics=attemptGroups(responses,'topic');
  assert.deepEqual(topics.map(group=>[group.name,group.section,group.indices]),[
    ['Sequences','Maths',[0,1]],
    ['Sequences','Reasoning',[2]]
  ]);
  assert.deepEqual(attemptGroups(responses,'section').map(group=>group.name),['Maths','Reasoning']);
});

test('a result without recorded marks can still show its outcome counts', ()=>{
  const raw=summarizeResponses([{status:'correct'},{status:'skipped'}]);
  assert.equal(raw.marks,null);
  assert.equal(raw.attempted,1);
  assert.equal(raw.accuracy,100);
});
