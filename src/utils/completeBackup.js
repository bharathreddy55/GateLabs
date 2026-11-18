import {exportBackup,parseBackup,importBackup} from './backup.js';
import {invalidateAttemptHistory} from './attemptCache.js';
import {readAttemptArchive,writeAttemptArchive,deleteArchivedAttempt,compactAttemptCache} from './attemptArchive.js';
const names=['gate_attempts','exam-results'];
export async function exportCompleteBackup(uid,storage=localStorage){const backup=exportBackup(uid,storage),archive=await readAttemptArchive(uid,{required:true});for(const name of names){const rows=new Map([...(backup.entries[name]||[]),...archive].map(row=>[row.id,row]));if(rows.size)backup.entries[name]=[...rows.values()];}return backup;}
export async function importCompleteBackup(input,uid,storage=localStorage){
 const backup=parseBackup(input),previous=await readAttemptArchive(uid,{required:true}),entries=structuredClone(backup.entries);
 const rows=new Map(previous.map(row=>[row.id,row]));
 for(const name of names){const current=JSON.parse(storage.getItem(name+':'+uid)||'[]');if(!Array.isArray(current))throw Error('Export recovery data before restoring attempts.');for(const row of [...current,...(entries[name]||[])])rows.set(row.id,{...row,userId:uid,syncStatus:'pending'});}
 const archived=await writeAttemptArchive(uid,[...rows.values()]);
 if(archived)for(const name of names)if(entries[name])entries[name]=compactAttemptCache([...rows.values()]);
 try{const result=importBackup({...backup,entries},uid,storage);invalidateAttemptHistory(uid);return result;}
 catch(error){if(archived){const original=new Set(previous.map(row=>row.id));await writeAttemptArchive(uid,previous);for(const id of rows.keys())if(!original.has(id))await deleteArchivedAttempt(uid,id);}throw error;}
}
