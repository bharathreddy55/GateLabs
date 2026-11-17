import {readAttemptArchive} from './attemptArchive.js';
import {readStored} from './safeStorage.js';
import {auth,db} from '../config/firebase';
function rows(key){return readStored(key,[]);}
export async function getAttemptRecords(){
  const uid=auth.currentUser?.uid||'anonymous';
  let remote=[],syncState='device';
  try{remote=await db.getAttempts();syncState=remote.syncState||'device';}catch{syncState='offline';}
  if((auth.currentUser?.uid||'anonymous')!==uid)return {attempts:[],syncState:'device'};
  const archived=await readAttemptArchive(uid);
  if((auth.currentUser?.uid||'anonymous')!==uid)return {attempts:[],syncState:'device'};
  const merged=new Map();
  for(const row of [...archived,...rows(`exam-results:${uid}`),...rows(`gate_attempts:${uid}`),...(Array.isArray(remote)?remote:[])]){
    if(row?.id&&(!row.userId||row.userId===uid))merged.set(row.id,row);
  }
  const attempts=[...merged.values()].sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
  return {attempts,syncState};
}
