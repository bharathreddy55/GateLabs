import test from 'node:test';import assert from 'node:assert/strict';
import {loadPublishedQuestions,clearQuestionBankCache} from '../src/utils/questionBank.js';
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
