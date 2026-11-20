import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {parseExamText} from '../src/utils/parseExamText.js';import {validatePaper} from '../src/utils/examEngine.js';
test('corrected reconstructions and shared-passage stems satisfy the full SBI blueprint',()=>{
 const papers=JSON.parse(fs.readFileSync('public/exams/sbi-corrections.json'));for(const p of papers)assert.deepEqual(validatePaper('sbi',p.questions,true),[]);
 const shared=parseExamText(fs.readFileSync('public/pyqs/sbi_clerk_pyq_2025_sep21_shift1.txt','utf8'),'sbi');assert.deepEqual(validatePaper('sbi',shared,true),[]);assert.notEqual(shared[86].passage,shared[97].passage);assert.notEqual(shared[86].id,shared[97].id);
 const numeric=papers.find(p=>p.file.includes('sep20'));assert.equal(numeric.questions[39].options[numeric.questions[39].correctAnswer],'126');assert.equal(numeric.questions[44].options[numeric.questions[44].correctAnswer],'240');
});

test('every published SBI paper retains choices, context and a valid answer key', () => {
 const corrections = JSON.parse(fs.readFileSync('public/exams/sbi-corrections.json','utf8'));
 const files = fs.readdirSync('public/pyqs').filter(file => /^sbi_clerk_.*\.txt$/.test(file));
 assert.ok(files.length >= 18);
 const papers = new Map();

 for (const file of files) {
  const text = fs.readFileSync('public/pyqs/'+file,'utf8');
  const parsed = parseExamText(text,'sbi');
  const published = corrections.find(p => p.file === file)?.questions ?? parsed;
  papers.set(file,published);
  assert.deepEqual(validatePaper('sbi',published,true),[],file);
  for (const [index,block] of text.split(/^---[ \t\r]*$/m).filter(s=>s.trim()).entries()) {
   const rawStem = block.match(/^question: ([\s\S]*?)\noption a:/im)?.[1];
   const labels = rawStem?.match(/^(?:\([A-E]\)|[A-E]:) [^\r\n]+/gm) ?? [];
   const q = parsed[index];
   for (const line of labels) assert.ok((q.question+'\n'+(q.passage ?? '')).includes(line),file+' Q'+(index+1));
   assert.doesNotMatch(q.question,/^Directions\b/i,file+' Q'+(index+1));
  }
  for (const q of published.filter(q => /Cloze Test|Reading Comprehension/.test(q.topic))) {
   assert.ok(q.passage || q.question.length>200,file+' '+q.question);
  }
 }

 const [prudent,first,second] = papers.get('sbi_clerk_expected_2026_paper_1.txt').slice(23,26);
 assert.match(prudent.question,/\(C\) He acted in a prudent manner/);
 assert.equal(prudent.options[prudent.correctAnswer],'Both A and B');
 assert.match(first.question,/FIRST sentence after rearrangement/);
 assert.match(first.passage,/\(E\) Small neighborhood vendors/);
 assert.equal(first.passage,second.passage);
 assert.equal(first.options[first.correctAnswer],'B');
 const fourth = papers.get('sbi_clerk_mock_4.txt');
 assert.match(fourth[89].passage,/P @ Q means/);
 const sixth = papers.get('sbi_clerk_expected_2026_paper_6.txt');
 assert.match(sixth[61].options[sixth[61].correctAnswer],/cannot be determined/);
 assert.equal(sixth[89].passage,sixth[90].passage);
 assert.ok(sixth[90].passage);
});
