import fs from 'node:fs';
import {initializeTestEnvironment,assertFails,assertSucceeds} from '@firebase/rules-unit-testing';
import {doc,setDoc,getDoc,deleteDoc,collection,getDocs,query,where} from 'firebase/firestore';
const env=await initializeTestEnvironment({projectId:'demo-gatelabs',firestore:{rules:fs.readFileSync('firestore.rules','utf8')}});
try{
 const alice=env.authenticatedContext('alice').firestore(),bob=env.authenticatedContext('bob').firestore(),guest=env.unauthenticatedContext().firestore(),publisher=env.authenticatedContext('publisher',{publisher:true}).firestore();
 const attempt={id:'a1',userId:'alice',score:1};
 await assertSucceeds(setDoc(doc(alice,'attempts','a1'),attempt));
 await assertSucceeds(getDoc(doc(alice,'attempts','a1')));
 await assertFails(getDoc(doc(bob,'attempts','a1')));await assertFails(getDoc(doc(guest,'attempts','a1')));
 await assertFails(setDoc(doc(bob,'attempts','a1'),{...attempt,userId:'bob'}));
 await assertFails(setDoc(doc(alice,'attempts','a1'),{...attempt,userId:'bob'}));
 await assertFails(deleteDoc(doc(bob,'attempts','a1')));
 await assertSucceeds(getDocs(query(collection(alice,'attempts'),where('userId','==','alice'))));
 await assertFails(getDocs(collection(alice,'attempts')));
 await assertSucceeds(setDoc(doc(alice,'users','alice'),{studyTime:{Monday:1}}));
 await assertFails(getDoc(doc(bob,'users','alice')));
 await assertFails(setDoc(doc(alice,'questions','q1'),{question:'Student cannot publish'}));
 await assertSucceeds(setDoc(doc(publisher,'questions','q1'),{question:'Reviewed content'}));
 await assertSucceeds(getDoc(doc(guest,'questions','q1')));
 await assertFails(setDoc(doc(alice,'connection_tests','test'),{status:'connected'}));
 await assertSucceeds(deleteDoc(doc(alice,'attempts','a1')));
 await assertSucceeds(deleteDoc(doc(alice,'attempts','not-synced-yet')));
 await assertFails(deleteDoc(doc(guest,'attempts','not-synced-yet')));
 console.log('PASS Firestore owner isolation, safe queries, publisher authorization and default denial');
}finally{await env.cleanup();}
