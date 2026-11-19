import test from 'node:test';import assert from 'node:assert/strict';import {exportBackup,parseBackup,importBackup} from '../src/utils/backup.js';
function storage(){const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)};}
test('versioned backup restores new exam state into an explicitly selected account',()=>{
 const source=storage();source.setItem('exam-progress:alice:group2',JSON.stringify(['0-0']));source.setItem('exam-target:alice:group2','2027-02-01');source.setItem('exam-bookmarks:alice:group2',JSON.stringify(['q1']));source.setItem('ai_api_key:alice','secret');
 const backup=exportBackup('alice',source);assert.equal(backup.entries['exam-progress/group2'][0],'0-0');assert.ok(!JSON.stringify(backup).includes('secret'));
 const target=storage();target.setItem('exam-progress:bob:group2',JSON.stringify(['0-1']));importBackup(backup,'bob',target);assert.deepEqual(JSON.parse(target.getItem('exam-progress:bob:group2')),['0-1','0-0']);assert.equal(target.getItem('exam-target:bob:group2'),'2027-02-01');assert.equal(target.getItem('exam-progress:alice:group2'),null);
});
test('note revision IDs survive backup and account restore',()=>{
 const source=storage();source.setItem('exam-note-progress:alice:gate',JSON.stringify(['binary-heaps']));
 const target=storage();importBackup(exportBackup('alice',source),'bob',target);
 assert.deepEqual(JSON.parse(target.getItem('exam-note-progress:bob:gate')),['binary-heaps']);
 assert.equal(target.getItem('exam-note-progress:alice:gate'),null);
});
test('restore validates the whole payload before writing and accepts reviewed legacy backups',()=>{
 assert.throws(()=>parseBackup({version:2,entries:{gate_attempts:{}}}),/Invalid backup/);assert.throws(()=>parseBackup({version:2,entries:{unknown:[]}}),/Invalid backup/);
 const legacy=parseBackup({version:'1.0',attempts:[{id:'x',score:3}]});assert.equal(legacy.entries.gate_attempts[0].id,'x');
});
test('backups with retired AP TET settings still restore supported exam progress',()=>{
 const device=storage();
 device.setItem('last-exam:alice','tet');
 device.setItem('exam-active:alice',JSON.stringify({pending:{examId:'tet'}}));
 assert.deepEqual(exportBackup('alice',device).entries,{});
 const original={version:2,entries:{
   'exam-progress/tet':['0-0'],'exam-target/tet':'2027-01-01',
   'last-exam':'group2','exam-progress/group2':['0-1']
 }};
 assert.equal(importBackup(original,'alice',device),2);
 assert.equal(device.getItem('last-exam:alice'),'group2');
 assert.deepEqual(JSON.parse(device.getItem('exam-progress:alice:group2')),['0-1']);
 assert.equal(device.getItem('exam-target:alice:tet'),null);
 assert.ok(original.entries['exam-progress/tet']);
});
