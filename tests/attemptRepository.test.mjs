import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
test('history merges cloud and both device stores by ID and rejects another account',async()=>{
 const records={'exam-results:alice':[{id:'snapshot',userId:'alice'},{id:'retired-local',examId:'tet',userId:'alice'}],'gate_attempts:alice':[
   {id:'local',userId:'alice',responses:[{id:'q1',markedForReview:true},{id:'q2',markedForReview:true}]},
   {id:'updated',userId:'alice',reviewMarksUpdatedAt:10,responses:[{id:'q1',markedForReview:false}]},
   {id:'other-user',userId:'bob'}
 ]};
 const context=vm.createContext({localStorage:{getItem:k=>JSON.stringify(records[k]||[])},Date,JSON,Map});
 const dep=new vm.SyntheticModule(['auth','db','readStored','readAttemptArchive','getRemoteAttempts'],function(){this.setExport('getRemoteAttempts',(_uid,load)=>load());this.setExport('readAttemptArchive',async()=>[]);this.setExport('readStored',key=>records[key]||[]);this.setExport('auth',{currentUser:{uid:'alice'}});this.setExport('db',{getAttempts:async()=>[
   {id:'remote',userId:'alice'},
   {id:'local',userId:'alice',score:8,responses:[{id:'q1'},{id:'q2',markedForReview:false}]},
   {id:'updated',userId:'alice',responses:[{id:'q1',markedForReview:true}]},
   {id:'retired-remote',scope:'AP TET Model Paper',userId:'alice'}
 ]});},{context});
 const m=new vm.SourceTextModule(fs.readFileSync('src/utils/attemptRepository.js','utf8'),{context});await m.link(()=>dep);await m.evaluate();
 const result=await m.namespace.getAttemptRecords();assert.equal(result.attempts.length,4);assert.equal(result.attempts.find(a=>a.id==='local').score,8);assert.ok(result.attempts.some(a=>a.id==='remote'));assert.ok(!result.attempts.some(a=>a.id==='other-user'));
 assert.ok(!result.attempts.some(a=>a.id.startsWith('retired-')));
 const [recovered,unmarked]=result.attempts.find(a=>a.id==='local').responses;
 assert.equal(recovered.markedForReview,true);
 assert.equal(unmarked.markedForReview,false);
 const updated=result.attempts.find(a=>a.id==='updated');
 assert.equal(updated.responses[0].markedForReview,false);
 assert.equal(updated.reviewMarksUpdatedAt,10);
});
