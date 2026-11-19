import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { EXAMS } from '../src/config/exams.js';
import { CBAT_BATTERIES } from '../src/config/rrbCbat.js';
import { buildCbatQuestions, buildCbatSet, cbatResultKey, cbatSummary, rotateFigure, validCbatResult } from '../src/utils/cbat.js';
import { scorePaper, validatePaper } from '../src/utils/examEngine.js';

test('challenge drills cover the configured blocks and use each exam’s marking rules', () => {
  for (const exam of ['rrb','group2','group2-mains-1','group2-mains-2','gate']) {
    const [paper] = JSON.parse(readFileSync(new URL(`../public/exams/challenges/${exam}.json`,import.meta.url)));
    const qs = paper.questions;
    assert.equal(paper.full,false);
    assert.deepEqual(validatePaper(exam,qs,false),[]);
    assert.ok(qs.every(q=>q.explanation && q.source.startsWith('https://')));
    assert.ok(qs.filter(q=>q.section==='Current Affairs').every(q=>/^\d{4}-\d{2}-\d{2}$/.test(q.asOf)));
    assert.deepEqual(new Set(qs.map(q=>q.section)),new Set(exam==='gate'
      ? ['General Aptitude','Engineering Mathematics','Computer Science']
      : EXAMS[exam].sections.map(([section])=>section)));
    const answers = Object.fromEntries(qs.map(q=>[q.id,q.correctAnswer??q.correctOptions??q.correctNat]));
    assert.equal(scorePaper(exam,qs,answers).correctCount,qs.length);
    assert.deepEqual(new Set(qs.map(q=>q.type)),new Set(exam==='gate'?['MCQ','MSQ','NAT']:['MCQ']));
  }
});

function seeded(seed) {
  return () => ((seed = (Math.imul(seed,1664525)+1013904223)>>>0)/2**32);
}

const cellKey = cells => [...cells].sort((a,b)=>a-b).join(',');

test('each CBAT battery has two repeatable, distinct sets with separate result keys',()=>{
  for(const {id,count} of CBAT_BATTERIES){
    const first=buildCbatSet(id,1), second=buildCbatSet(id,2);
    assert.equal(first.length,count);
    assert.equal(second.length,count);
    assert.notDeepEqual(first,second);
    assert.deepEqual(second,buildCbatSet(id,2));
    const result=cbatSummary(second,[]);
    assert.ok(validCbatResult(id,result));
    assert.ok(validCbatResult(cbatResultKey(id,1),result));
    assert.ok(validCbatResult(cbatResultKey(id,2),result));
    assert.notEqual(cbatResultKey(id,1),cbatResultKey(id,2));
    assert.equal(buildCbatSet(id,3).length,0);
  }
});

test('generated CBAT answers match their figures, digit totals and street routes', () => {
  for (let seed=1;seed<=25;seed++) {
    const random = seeded(seed);
    for (const q of buildCbatQuestions('intelligence',random)) {
      const matches = q.options.filter((_,i)=>i!==q.correct).map(cellKey);
      let figure = q.options.find((_,i)=>i!==q.correct);
      for (let turn=0;turn<4;turn++) {
        assert.ok(matches.includes(cellKey(figure)));
        assert.notEqual(cellKey(figure),cellKey(q.options[q.correct]));
        figure = rotateFigure(figure);
      }
    }
    for (const q of buildCbatQuestions('attention',random)) {
      assert.equal(q.digits.length,50);
      assert.equal(q.options[q.correct],q.digits.filter(digit=>digit%2).reduce((a,b)=>a+b,0));
    }
    for (const q of buildCbatQuestions('spatial',random)) {
      const {start,end,edges,houseCells} = q.map;
      const paths = [[start]];
      const visited = new Set([start]);
      for (const path of paths) {
        if (path.at(-1)===end) {
          assert.deepEqual(houseCells.filter(cell=>path.includes(cell)),[houseCells[q.correct]]);
          break;
        }
        for (const [from,to] of edges) {
          const next = from===path.at(-1)?to:to===path.at(-1)?from:null;
          if (next!==null && !visited.has(next)) {
            paths.push([...path,next]);
            visited.add(next);
          }
        }
      }
      assert.ok(visited.has(end));
    }
  }
});

test('CBAT stores only raw summaries, with completion only for personality', () => {
  for (const {id,count} of CBAT_BATTERIES) {
    const questions = buildCbatQuestions(id,seeded(92));
    const answers = Array(count).fill(null);
    answers[0] = questions[0].correct ?? 0;
    const result = cbatSummary(questions,answers);
    assert.deepEqual(result,{total:count,attempted:1,correct:id==='personality'?null:1});
    assert.ok(validCbatResult(id,result));
    assert.equal(validCbatResult(id,{...result,answers}),false);
  }
});
