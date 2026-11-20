import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {loadPublishedQuestions,clearQuestionBankCache} from '../src/utils/questionBank.js';
import {validatePaper} from '../src/utils/examEngine.js';
test('published bank reads only the requested shard and caches repeat queries',async()=>{
 clearQuestionBankCache();const calls=[];const fetcher=async url=>{calls.push(url);return {ok:true,json:async()=>url.includes('index')?{version:'v1',files:[{subject:'Math',url:'/math.json'},{subject:'English',url:'/english.json'}]}:[{id:'m1',subject:'Math',topic:'Algebra',year:2025}]};};
 assert.equal((await loadPublishedQuestions({subject:'Math',year:2025},fetcher)).length,1);
 assert.equal((await loadPublishedQuestions({subject:'Math',year:2024},fetcher)).length,0);
 assert.deepEqual(calls,['/questions/index.json','/math.json?v=v1']);
});
test('failed bank reads can be retried',async()=>{
 clearQuestionBankCache();await assert.rejects(loadPublishedQuestions({},async()=>({ok:false})),/could not be loaded/);
 assert.deepEqual(await loadPublishedQuestions({},async()=>({ok:true,json:async()=>({version:'v',files:[]})})),[]);
});

test('every published GATE year opens as a valid CBT pool and restores reviewed types and figures',()=>{
 const parse=url=>JSON.parse(readFileSync('public'+url,'utf8'));
 const index=parse('/questions/index.json');
 const questions=index.files.flatMap(({url,count})=>{
  const shard=parse(url);
  assert.equal(shard.length,count,url);
  return shard;
 });
 assert.equal(questions.length,index.count);
 for(const [year,paper] of Object.entries(Object.groupBy(questions,q=>q.year))){
  assert.deepEqual(validatePaper('gate',paper,false),[],year);
 }
 const from2022=questions.filter(q=>q.source==='/pyqs/2022.txt');
 assert.equal(from2022.filter(q=>q.type==='NAT').length,8);
 assert.equal(from2022.filter(q=>q.type==='MSQ').length,5);
 const lookup=(stem)=>from2022.find(q=>q.question.includes(stem));
 assert.equal(lookup('3rd largest element').correctNat,509);
 assert.equal(lookup('number of superkeys').correctNat,8);
 assert.deepEqual(lookup('with respect to deadlocks').correctOptions,[0,3]);
 const plot=questions.find(q=>q.questionImage?.endsWith('gate-2022-q10.png'));
 assert.equal(plot.marks,2);
 assert.equal(plot.options[plot.correctAnswer],'3');
 const polygons=questions.find(q=>q.questionImage?.endsWith('gate-2021-cs1-q02.png'));
 assert.equal(polygons.options[polygons.correctAnswer],'Polygon A');
 for(const q of questions.filter(q=>q.questionImage)) assert.ok(existsSync('public'+q.questionImage));
});
