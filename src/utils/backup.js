import {EXAMS} from '../config/exams.js';
import {validatePaper} from './examEngine.js';
const plain=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
const base=['gate_custom_questions','gate_bookmarks','gate_syllabus_progress','gate_custom_formulas','gate_unlocked_badges','gate_study_time','gate_community_posts','gate_attempts','exam-results','exam-active','last-exam'];
const perExam=['exam-progress','exam-note-progress','exam-bookmarks','exam-target','exam-papers'];
export const backupNames=[...base,...perExam.flatMap(kind=>Object.keys(EXAMS).map(id=>`${kind}/${id}`))];
export function backupKey(name,uid){if(!backupNames.includes(name))throw Error('Unknown backup field');const [kind,id]=name.split('/');return `${kind}:${uid}${id?':'+id:''}`;}
function valid(name,value){
 if(name==='last-exam')return typeof value==='string'&&!!EXAMS[value];
 if(name.startsWith('exam-target/'))return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value));
 if(name==='exam-active')return plain(value)&&plain(value.pending)&&!!EXAMS[value.pending.examId]&&Number.isFinite(value.deadline)&&Number.isFinite(value.startedAt)&&!validatePaper(value.pending.examId,value.pending.questions,value.pending.full).length;
 if(['gate_syllabus_progress','gate_study_time'].includes(name))return plain(value)&&Object.entries(value).every(([k,v])=>!['__proto__','constructor','prototype'].includes(k)&&(name==='gate_study_time'?Number.isFinite(v)&&v>=0:typeof v==='boolean'));
 if(!Array.isArray(value))return false;
 if(name.startsWith('exam-papers/'))return value.every(p=>plain(p)&&typeof p.title==='string'&&!validatePaper(name.split('/')[1],p.questions,true).length);
 if(name.startsWith('exam-progress/')||name.startsWith('exam-note-progress/')||name.startsWith('exam-bookmarks/')||name==='gate_unlocked_badges')return value.every(x=>typeof x==='string');
 if(name==='gate_attempts'||name==='exam-results')return value.every(a=>plain(a)&&typeof a.id==='string'&&Number.isFinite(a.score)&&(!a.responses||Array.isArray(a.responses)));
 return value.every(plain);
}
export function exportBackup(uid,storage=localStorage){
 const entries={};for(const name of backupNames){const raw=storage.getItem(backupKey(name,uid));if(raw!==null){const value=['last-exam',...backupNames.filter(n=>n.startsWith('exam-target/'))].includes(name)?raw:JSON.parse(raw);if(!valid(name,value))throw Error(`Invalid saved data in ${name}. Export recovery data before importing.`);entries[name]=value;}}
 return {version:2,exportedAt:new Date().toISOString(),owner:uid,entries};
}
export function parseBackup(value){
 if(!plain(value))throw Error('Backup must be an object');
 if(value.version==='1.0'||value.version===1){const entries={};for(const [old,name]of Object.entries({syllabusProgress:'gate_syllabus_progress',bookmarks:'gate_bookmarks',attempts:'gate_attempts',customFormulas:'gate_custom_formulas'}))if(value[old]!==undefined)entries[name]=value[old];value={version:2,owner:'legacy device data',entries};}
 if(value.version!==2||!plain(value.entries))throw Error('Unsupported backup version');
 for(const [name,data]of Object.entries(value.entries))if(!backupNames.includes(name)||!valid(name,data))throw Error(`Invalid backup field: ${name}`);
 return value;
}
export function importBackup(input,uid,storage=localStorage){
 const backup=parseBackup(input),changes=[];
 for(const [name,incoming]of Object.entries(backup.entries)){
  const key=backupKey(name,uid),raw=storage.getItem(key);let current;try{current=raw===null?null:(name==='last-exam'||name.startsWith('exam-target/'))?raw:JSON.parse(raw);}catch{current=null;}
  let value=incoming;
  if(Array.isArray(value)){
    const records=new Map();for(const item of [...(Array.isArray(current)?current:[]),...value]){const record=plain(item)&&['gate_attempts','exam-results'].includes(name)?{...item,userId:uid,syncStatus:'pending'}:item;records.set(typeof record==='string'?record:record.id||record.title||JSON.stringify(record),record);}value=[...records.values()];
  }else if(name==='exam-active'){value=current||{...value,pending:{...value.pending,ownerId:uid}};}
  else if(plain(value))value={...value,...(plain(current)?current:{})};
  else value=current??value;
  changes.push([key,name==='last-exam'||name.startsWith('exam-target/')?value:JSON.stringify(value)]);
 }
 const previous=changes.map(([key])=>[key,storage.getItem(key)]);
 try{for(const [key,value]of changes)storage.setItem(key,value);}catch(error){for(const [key,value]of previous){try{if(value===null)storage.removeItem(key);else storage.setItem(key,value);}catch{}}throw Error('Restore could not finish. Free device storage and retry; existing records were retained where possible.');}
 return changes.length;
}
