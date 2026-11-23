import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { EXAMS } from '../src/config/exams.js';
import { stationMasterExpansion } from '../scripts/rrb-expansion/index.mjs';

const published=(file)=>JSON.parse(readFileSync(new URL('../public/exams/'+file,import.meta.url),'utf8'));

test('the published Station Master expansion matches the re-solved draft, including the shuffled keys',()=>{
  const {papers,drills,challenge}=stationMasterExpansion();
  const fresh=[...papers,...drills,challenge];
  const library=[...published('rrb.json'),...published('challenges/rrb.json')];
  assert.equal(fresh.length,20);
  assert.equal(fresh.reduce((sum,paper)=>sum+paper.questions.length,0),1200);
  assert.equal(new Set(library.flatMap(paper=>paper.questions.map(q=>q.id))).size,2400);

  for(const generated of fresh){
    const stored=library.find(paper=>paper.title===generated.title);
    assert.deepEqual(stored,generated);
    const keys=[0,0,0,0];
    for(const q of stored.questions)keys[q.correctAnswer]++;
    assert.deepEqual(keys,Array(4).fill(stored.questions.length/4));
    const comprehension=stored.questions.filter(q=>q.topic==='English reading comprehension');
    assert.equal(comprehension.length,stored.full?4:1);
    assert.ok(comprehension.every(q=>q.section==='Logical Capability'&&q.passage?.length>100));
    assert.deepEqual(EXAMS.rrb.sections.map(([section])=>stored.questions.filter(q=>q.section===section).length),
      stored.full?[30,30,20,20]:[6,6,4,4]);
  }
});
