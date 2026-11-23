import assert from 'node:assert/strict';
import { test } from 'node:test';
import { inspectPaper, crossPaperRepeats } from '../scripts/paper-quality.mjs';
import { loadPublishedPapers } from '../scripts/audit-papers.mjs';
import { reviewSbiPractice } from '../src/utils/sbiPractice.js';

test('published papers pass question quality checks and do not reuse exact prompts across papers for the same exam',()=>{
  const papers=loadPublishedPapers();
  const exams=['gate','group2','group2-mains-1','group2-mains-2','rrb','sbi'];
  assert.deepEqual([...new Set(papers.map(paper=>paper.examId))].sort(),exams);
  for(const paper of papers){
    const report=inspectPaper(paper);
    assert.deepEqual(report.errors,[],paper.title);
    if(paper.examId==='sbi'&&paper.original)assert.ok(Math.max(...report.positions)<=25,paper.title);
  }
  for(const examId of exams){
    assert.deepEqual(crossPaperRepeats(papers.filter(paper=>paper.examId===examId)),[],examId);
  }
});

test('quality audit catches numeric clones and identical distractors in two items',()=>{
  const base={type:'MCQ',marks:1,section:'Mental Reasoning',topic:'Ranking',correctAnswer:1,explanation:'Shown in the solution.',source:'Original mock'};
  const questions=[
    {...base,id:'1',question:'In a queue of 42 persons, what is the rank from the rear if the rank from the front is 5?',options:['39','38','37','36']},
    {...base,id:'2',question:'In a queue of 48 persons, what is the rank from the rear if the rank from the front is 9?',options:['36','37','38','39']}
  ];
  const {errors}=inspectPaper({examId:'rrb',title:'Duplicate example',questions,full:false,original:true});
  assert.ok(errors.some(error=>error.includes('near-duplicate')));
  assert.ok(errors.some(error=>error.includes('Reused choice set')));
});

test('SBI shuffling keeps answer text and position-sensitive choices intact',()=>{
  const ordinary={id:'sbi-one',section:'English',topic:'Vocabulary',question:'Pick the synonym.',options:['Small','Large','Tall','Short','Slight'],correctAnswer:1};
  const fixed={...ordinary,id:'sbi-two',options:['Small','Large','Tall','Short','None of the above'],correctAnswer:4};
  const input=[ordinary,fixed];
  const reviewed=reviewSbiPractice(input,'sbi_clerk_mock_1.txt');
  assert.equal(reviewed[0].options[reviewed[0].correctAnswer],'Large');
  assert.deepEqual(reviewed[1].options,fixed.options);
  assert.equal(reviewed[1].correctAnswer,4);
  assert.deepEqual(reviewSbiPractice(input,'sbi_clerk_pyq_2025_sep20_shift1.txt'),input);
});
