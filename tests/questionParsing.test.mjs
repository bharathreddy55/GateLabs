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
