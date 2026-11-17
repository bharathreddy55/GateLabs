import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {parseExamText} from '../src/utils/parseExamText.js';import {validatePaper} from '../src/utils/examEngine.js';
test('corrected reconstructions and shared-passage stems satisfy the full SBI blueprint',()=>{
 const papers=JSON.parse(fs.readFileSync('public/exams/sbi-corrections.json'));for(const p of papers)assert.deepEqual(validatePaper('sbi',p.questions,true),[]);
 const shared=parseExamText(fs.readFileSync('public/pyqs/sbi_clerk_pyq_2025_sep21_shift1.txt','utf8'),'sbi');assert.deepEqual(validatePaper('sbi',shared,true),[]);assert.notEqual(shared[86].passage,shared[97].passage);assert.notEqual(shared[86].id,shared[97].id);
 const numeric=papers.find(p=>p.file.includes('sep20'));assert.equal(numeric.questions[39].options[numeric.questions[39].correctAnswer],'126');assert.equal(numeric.questions[44].options[numeric.questions[44].correctAnswer],'240');
});
