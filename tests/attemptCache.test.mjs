import test from 'node:test';
import assert from 'node:assert/strict';
import {getRemoteAttempts,invalidateAttemptHistory} from '../src/utils/attemptCache.js';

test('overlapping history reads and repeat navigation share one cloud request',async()=>{
 invalidateAttemptHistory();let calls=0;
 const load=async()=>{calls++;return [{id:'saved'}];};
 await Promise.all([getRemoteAttempts('alice',load),getRemoteAttempts('alice',load),getRemoteAttempts('alice',load)]);
 await getRemoteAttempts('alice',load);assert.equal(calls,1);
 invalidateAttemptHistory('alice');await getRemoteAttempts('alice',load);assert.equal(calls,2);
 await getRemoteAttempts('alice',load,{force:true});assert.equal(calls,3);
});

test('history cache expires and separates accounts',async()=>{
 invalidateAttemptHistory();const original=Date.now;let now=10000,calls=0;Date.now=()=>now;
 try{
  const load=async()=>{calls++;return [];};
  await getRemoteAttempts('alice',load);await getRemoteAttempts('bob',load);assert.equal(calls,2);
  now+=30001;await getRemoteAttempts('alice',load);assert.equal(calls,3);
 }finally{Date.now=original;invalidateAttemptHistory();}
});

test('offline errors retry and an invalidated in-flight result cannot replace fresh history',async()=>{
 invalidateAttemptHistory();let calls=0;
 const offline=async()=>{calls++;const rows=[];rows.syncState='offline';return rows;};
 await getRemoteAttempts('alice',offline);await getRemoteAttempts('alice',offline);assert.equal(calls,2);
 await assert.rejects(getRemoteAttempts('alice',async()=>{throw Error('offline');}));
 let release;const pending=getRemoteAttempts('alice',()=>new Promise(resolve=>release=resolve));
 await Promise.resolve();invalidateAttemptHistory('alice');
 await getRemoteAttempts('alice',async()=>[{id:'fresh'}]);release([{id:'stale'}]);await pending;
 assert.equal((await getRemoteAttempts('alice',async()=>[]))[0].id,'fresh');
});
