import {auth,db} from '../config/firebase';
function rows(key){try{const value=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(value)?value:[];}catch{return [];}}
export async function getAttemptRecords(){
  const uid=auth.currentUser?.uid||'anonymous';
  let remote=[],syncState='device';
  try{remote=await db.getAttempts();syncState=remote.syncState||'device';}catch{syncState='offline';}
  if((auth.currentUser?.uid||'anonymous')!==uid)return {attempts:[],syncState:'device'};
  const merged=new Map();
  for(const row of [...rows(`exam-results:${uid}`),...rows(`gate_attempts:${uid}`),...(Array.isArray(remote)?remote:[])]){
    if(row?.id&&(!row.userId||row.userId===uid))merged.set(row.id,row);
  }
  const attempts=[...merged.values()].sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
  return {attempts,syncState};
}
