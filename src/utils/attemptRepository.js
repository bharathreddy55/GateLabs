import {readAttemptArchive} from './attemptArchive.js';
import {getRemoteAttempts} from './attemptCache.js';
import {readStored} from './safeStorage.js';
import {auth,db} from '../config/firebase';
function rows(key){return readStored(key,[]);}
export function isRetiredExamAttempt(attempt) {
  return attempt?.examId==='tet' || (!attempt?.examId && /^(?:AP\s+)?TET\b/i.test(String(attempt?.scope||'').trim()));
}
export async function getAttemptRecords(options={}){
  const uid=auth.currentUser?.uid||'anonymous';
  const archivePromise=readAttemptArchive(uid);
  let remote=[],syncState='device';
  try{remote=await getRemoteAttempts(uid,()=>db.getAttempts(),options);syncState=remote.syncState||'device';}catch{syncState='offline';}
  if((auth.currentUser?.uid||'anonymous')!==uid)return {attempts:[],syncState:'device'};
  const archived=await archivePromise;
  if((auth.currentUser?.uid||'anonymous')!==uid)return {attempts:[],syncState:'device'};
  const merged=new Map();
  for(const row of [...archived,...rows(`exam-results:${uid}`),...rows(`gate_attempts:${uid}`),...(Array.isArray(remote)?remote:[])]){
    if(row?.id&&(!row.userId||row.userId===uid))merged.set(row.id,row);
  }
  const attempts=[...merged.values()].filter(row=>!isRetiredExamAttempt(row)).sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
  return {attempts,syncState};
}
