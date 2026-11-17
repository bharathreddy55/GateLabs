import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
test('actual Firebase adapter isolates accounts, preserves IDs and removes local review copies',async()=>{
 const memory=new Map(),cloud=new Map(),authState={currentUser:{uid:'alice'}};
 let failCloud=false,failLocal=false;
 const storage={getItem:k=>memory.get(k)??null,setItem:(k,v)=>{if(failLocal)throw Error('quota');memory.set(k,String(v));},removeItem:k=>memory.delete(k)};
 const context=vm.createContext({console:{log(){},warn(){},error(){}},localStorage:storage,setTimeout,clearTimeout,Date,JSON,Math});
 const exports={initializeApp:()=>({}),getAuth:()=>authState,getAnalytics:()=>({}),getFirestore:()=>({}),
  collection:(_,name)=>({collection:name}),doc:(_,collection,id)=>({collection,id}),where:(field,op,value)=>({field,value}),query:(base,condition)=>({...base,condition}),
  setDoc:async(ref,data)=>{if(failCloud)throw Error('permission-denied');cloud.set(ref.collection+'/'+ref.id,structuredClone(data));},
  getDocs:async q=>({forEach:fn=>{for(const [key,value] of cloud)if(key.startsWith(q.collection+'/')&&(!q.condition||value[q.condition.field]===q.condition.value))fn({data:()=>structuredClone(value)});}}),
  getDoc:async()=>({exists:()=>false}),deleteDoc:async ref=>cloud.delete(ref.collection+'/'+ref.id),
  signInWithEmailAndPassword(){},createUserWithEmailAndPassword(){},signOut(){},onAuthStateChanged(){},updateProfile(){}};
 const dependency=new vm.SyntheticModule(Object.keys(exports),function(){for(const [k,v]of Object.entries(exports))this.setExport(k,v);},{context});
 const module=new vm.SourceTextModule(fs.readFileSync('src/config/firebase.js','utf8'),{context,importModuleDynamically:async()=>dependency});
 await module.link(()=>dependency);await module.evaluate();const {db}=module.namespace;
 const a={id:'stable-attempt',examId:'group2',scope:'test',score:-1/3};
 await db.saveAttempt(a);await db.saveAttempt(a);
 assert.equal(JSON.parse(storage.getItem('gate_attempts:alice')).length,1);
 assert.equal((await db.getAttempts()).length,1);
 assert.equal(cloud.get('attempts/stable-attempt').userId,'alice');
 authState.currentUser={uid:'bob'};
 assert.equal((await db.getAttempts()).length,0);
 await db.saveAttempt({...a,id:'bob-attempt'});
 assert.equal((await db.getAttempts())[0].userId,'bob');
 authState.currentUser={uid:'alice'};
 storage.setItem('exam-results:alice',JSON.stringify([a]));
 await db.deleteAttempt(a.id);
 assert.equal(JSON.parse(storage.getItem('exam-results:alice')).length,0);
 assert.equal((await db.getAttempts()).length,0);
 assert.equal(JSON.parse(storage.getItem('gate_attempts:bob')).length,1);
 failCloud=true;
 const pending=await db.saveAttempt({...a,id:'offline-attempt'});
 assert.equal(pending.persistence.localSaved,true);assert.equal(pending.persistence.cloudSaved,false);assert.equal(pending.persistence.pendingSync,true);
 failLocal=true;await assert.rejects(db.saveAttempt({...a,id:'nowhere'}),/could not be saved/);
 failLocal=false;failCloud=false;
 const retried=await db.retryPendingAttempts();assert.equal(retried[0].persistence.cloudSaved,true);
 assert.ok(cloud.has('attempts/offline-attempt'));
});
