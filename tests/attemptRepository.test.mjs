import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
test('history merges cloud and both device stores by ID and rejects another account',async()=>{
 const records={'exam-results:alice':[{id:'snapshot',userId:'alice'},{id:'retired-local',examId:'tet',userId:'alice'}],'gate_attempts:alice':[{id:'local',userId:'alice'},{id:'other-user',userId:'bob'}]};
 const context=vm.createContext({localStorage:{getItem:k=>JSON.stringify(records[k]||[])},Date,JSON,Map});
 const dep=new vm.SyntheticModule(['auth','db','readStored','readAttemptArchive','getRemoteAttempts'],function(){this.setExport('getRemoteAttempts',(_uid,load)=>load());this.setExport('readAttemptArchive',async()=>[]);this.setExport('readStored',key=>records[key]||[]);this.setExport('auth',{currentUser:{uid:'alice'}});this.setExport('db',{getAttempts:async()=>[{id:'remote',userId:'alice'},{id:'local',userId:'alice',score:8},{id:'retired-remote',scope:'AP TET Model Paper',userId:'alice'}]});},{context});
 const m=new vm.SourceTextModule(fs.readFileSync('src/utils/attemptRepository.js','utf8'),{context});await m.link(()=>dep);await m.evaluate();
 const result=await m.namespace.getAttemptRecords();assert.equal(result.attempts.length,3);assert.equal(result.attempts.find(a=>a.id==='local').score,8);assert.ok(result.attempts.some(a=>a.id==='remote'));assert.ok(!result.attempts.some(a=>a.id==='other-user'));
 assert.ok(!result.attempts.some(a=>a.id.startsWith('retired-')));
});
