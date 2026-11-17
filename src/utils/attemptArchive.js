let opening;
function openArchive(){
 if(!globalThis.indexedDB)return Promise.reject(Error('IndexedDB unavailable'));
 if(!opening)opening=new Promise((resolve,reject)=>{const request=indexedDB.open('gatelabs-study',1);const timer=setTimeout(()=>reject(Error('Device archive is busy')),2500);request.onupgradeneeded=()=>{const store=request.result.createObjectStore('attempts',{keyPath:'key'});store.createIndex('userId','userId');};request.onsuccess=()=>{clearTimeout(timer);resolve(request.result);};request.onerror=request.onblocked=()=>{clearTimeout(timer);reject(request.error||Error('Device archive unavailable'));};}).catch(error=>{opening=null;throw error;});
 return opening;
}
async function transaction(mode,action){const database=await openArchive();return new Promise((resolve,reject)=>{const tx=database.transaction('attempts',mode),store=tx.objectStore('attempts');let value;tx.oncomplete=()=>resolve(value);tx.onerror=tx.onabort=()=>reject(tx.error||Error('Archive write failed'));action(store,result=>value=result);});}
export async function readAttemptArchive(uid,{required=false}={}){try{return await transaction('readonly',(store,set)=>{const request=store.index('userId').getAll(uid);request.onsuccess=()=>set(request.result.map(row=>row.data));});}catch{if(required&&globalThis.indexedDB)throw Error('The device archive is unavailable. Retry before exporting your complete backup.');return [];}}
export async function writeAttemptArchive(uid,rows){
 if(!uid||!Array.isArray(rows)||rows.some(row=>!row?.id||row.userId&&row.userId!==uid))return false;
 try{await transaction('readwrite',store=>rows.forEach(row=>store.put({key:uid+'/'+row.id,userId:uid,data:{...row,userId:uid}})));return true;}catch{return false;}
}
export async function deleteArchivedAttempt(uid,id){try{await transaction('readwrite',store=>store.delete(uid+'/'+id));return true;}catch{return false;}}
export function compactAttemptCache(rows){const cache=[...rows].sort((a,b)=>Date.parse(b.timestamp)-Date.parse(a.timestamp)).slice(0,20);while(cache.length&&JSON.stringify(cache).length*2>1000000)cache.pop();return cache;}
