import fs from 'node:fs';import {parseExamText,questionId} from '../src/utils/parseExamText.js';import {validatePaper} from '../src/utils/examEngine.js';
const fixes={
 'sbi_clerk_expected_2026_paper_8.txt':{title:'Practice set 8 · corrected reconstruction',note:'Original practice reconstruction. Two seating-puzzle clue sets were corrected to match their documented unique solutions; repeated stems now retain their own passage.'},
 'sbi_clerk_mock_7.txt':{title:'Mock test 7 · corrected practice',note:'Original model paper. A duplicated incorrect spelling option was replaced; the correct spelling and key are unchanged.'},
 'sbi_clerk_pyq_2025_sep20_shift1.txt':{title:'20 September, Shift 1 · practice reconstruction',note:'Adapted practice from an unverified memory-based file. Repeated incorrect distractors in Q40 and Q45 were replaced. This is not an official booklet.'}
};
const output=[];
for(const [file,meta] of Object.entries(fixes)){
 const questions=parseExamText(fs.readFileSync('public/pyqs/'+file,'utf8'),'sbi');
 if(file.includes('expected')){
  for(let i=70;i<75;i++)questions[i].passage='Directions (71–75): Eight persons P, Q, R, S, T, U, V and W sit in a row facing north. P sits at the extreme left. Three persons sit between P and S. Q sits third to the right of S. R sits immediately to the left of T. Exactly one person sits between T and V. W sits immediately to the right of P. U sits immediately to the left of Q.';
  for(let i=95;i<100;i++)questions[i].passage='Directions (96–100): Six colleagues A, B, C, D, E and F sit in a row facing north. E sits at the extreme left. C sits fourth to the left of A. B sits immediately to the right of C. D sits immediately to the left of F.';
 }else if(file.includes('mock'))questions[28].options[3]='Connoissour';
 else {questions[39].options[4]='140';questions[44].options[4]='200';}
 for(const q of questions){q.id=questionId(q);q.source='/pyqs/'+file;}
 const errors=validatePaper('sbi',questions,true);if(errors.length)throw Error(errors.join('; '));
 output.push({file,...meta,provenance:'Editorial practice reconstruction; source file preserved',questions});
}
fs.writeFileSync('public/exams/sbi-corrections.json',JSON.stringify(output,null,2)+'\n');console.log('Three corrected reconstructions validated; source text files unchanged.');
