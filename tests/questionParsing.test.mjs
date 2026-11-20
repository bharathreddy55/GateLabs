import test from 'node:test';import assert from 'node:assert/strict';
import {parseExamText,validateStudyQuestion} from '../src/utils/parseExamText.js';
test('shared parser keeps fifth options, stable identities and unknown keys',()=>{
 const text='subject: English\nquestion: Choose E\noption a: A\noption b: B\noption c: C\noption d: D\noption e: E\ncorrect: E';
 const [q]=parseExamText(text);assert.equal(q.options.length,5);assert.equal(q.correctAnswer,4);assert.deepEqual(validateStudyQuestion(q),[]);assert.equal(q.id,parseExamText(text)[0].id);
 const [unknown]=parseExamText(text.replace('correct: E','correct: unknown'));assert.equal(unknown.correctAnswer,null);assert.ok(validateStudyQuestion(unknown).length);
});
test('shared parser preserves typed keys, numeric ranges and context',()=>{
 const [nat,msq]=parseExamText('subject: Maths\nquestion: Enter pi\ntype: NAT\nnatMin: 3.14\nnatMax: 3.15\nmarks: 2\n---\nquestion: Pick two\ntype: MSQ\noption a: A\noption b: B\noption c: C\noption d: D\ncorrect: A,C\npassage: Context');
 assert.equal(nat.natMin,3.14);assert.equal(nat.marks,2);assert.deepEqual(validateStudyQuestion(nat),[]);assert.deepEqual(msq.correctOptions,[0,2]);assert.equal(msq.passage,'Context');
});

test('tagged choices preserve labelled statements, data rows and numbered clues', () => {
 const [q] = parseExamText([
  'question: Which statements are true?',
  '(A) The listed value doubled.',
  'B: The value stayed at 12.',
  '1. Apply this instruction to stage one.',
  'option a: Both A and B',
  'option b: A only',
  'option c: B only',
  'option d: Neither',
  'Correct: B',
  '---',
 ].join('\n'));
 assert.match(q.question, /\(A\) The listed value doubled\.\nB: The value stayed at 12\.\n1\. Apply/);
 assert.deepEqual(q.options,['Both A and B','A only','B only','Neither']);
 assert.equal(q.correctAnswer,1);
});

test('numbered imports still accept untagged answer choices', () => {
 const [q] = parseExamText('1. Which is correct?\n(A) One\n(B) Two\n(C) Three\n(D) Four\nAns: (D)');
 assert.deepEqual(q.options,['One','Two','Three','Four']);
 assert.equal(q.correctAnswer,3);
});

test('question image fields allow bundled PNGs only', () => {
 const text = 'question: Interpret the diagram\nquestionImage: /questions/figures/gate-2022-q10.png\nimageAlt: Grid of poles\noption a: One\noption b: Two\noption c: Three\noption d: Four\ncorrect: C';
 const [question] = parseExamText(text);
 assert.equal(question.imageAlt,'Grid of poles');
 assert.deepEqual(validateStudyQuestion(question),[]);
 for (const url of ['/questions/figures/../data.png','https://example.invalid/figure.png','/questions/figures/script.svg']) {
  assert.ok(validateStudyQuestion({...question,questionImage:url}).includes('Invalid question image'));
 }
});
