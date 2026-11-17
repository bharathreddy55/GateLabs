import test from 'node:test';import assert from 'node:assert/strict';
import {renderAnswerInputs,answerLabel} from '../src/components/QuestionView.js';
import {evaluateAnswer} from '../src/utils/examEngine.js';
test('numeric practice has a numeric field without requiring options',()=>{
 const q={type:'NAT',correctNat:2};assert.match(renderAnswerInputs(q),/type="number"/);assert.equal(evaluateAnswer(q,'2').correct,true);assert.equal(evaluateAnswer(q,' ').correct,false);assert.equal(answerLabel(q,2),'2');
});
test('multiple-answer practice and exams use exact sets and checkboxes',()=>{
 const q={type:'MSQ',options:['A','B','C','D'],correctOptions:[0,2]};assert.match(renderAnswerInputs(q),/type="checkbox"/);assert.equal(evaluateAnswer(q,[2,0]).correct,true);assert.equal(evaluateAnswer(q,[0]).correct,false);assert.equal(evaluateAnswer(q,[0,2,3]).correct,false);
});
