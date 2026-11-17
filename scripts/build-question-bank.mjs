import fs from 'node:fs';import {execFileSync} from 'node:child_process';import {createHash} from 'node:crypto';
import {parseExamText,validateStudyQuestion,questionId} from '../src/utils/parseExamText.js';
// Publish tracked content deliberately. Uncommitted personal bank edits are never included implicitly.
const files=execFileSync('git',['ls-files','public/pyqs/*.txt'],{encoding:'utf8'}).trim().split(/\r?\n/).filter(p=>!/(sbi_clerk|tet_|ap_tet|antigravity)/.test(p));
const records=new Map();let quarantined=0;
for(const file of [...files,'public/pyqs/questions.json']){
 const text=execFileSync('git',['show','HEAD:'+file],{encoding:'utf8',maxBuffer:50000000});
 const rows=file.endsWith('.json')?JSON.parse(text):parseExamText(text);
 for(const raw of rows){const q={...raw,type:raw.type||'MCQ',marks:Number(raw.marks),source:raw.source||'/'+file.replace(/^public\//,'')};if(validateStudyQuestion(q).length){quarantined++;continue;}q.id=questionId(q);records.set(q.id,q);}
}
const subjects=new Map();for(const q of records.values()){const name=q.subject||'Imported study';if(!subjects.has(name))subjects.set(name,[]);subjects.get(name).push(q);}
fs.mkdirSync('public/questions',{recursive:true});for(const name of fs.readdirSync('public/questions'))if(/^[a-z0-9-]+\.json$/.test(name))fs.unlinkSync('public/questions/'+name);const manifest={version:createHash('sha256').update(JSON.stringify([...records.values()])).digest('hex').slice(0,16),count:records.size,quarantined,files:[]};
for(const [subject,questions]of subjects){const slug=subject.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');const filename=`public/questions/${slug}.json`;fs.writeFileSync(filename,JSON.stringify(questions)+'\n');manifest.files.push({subject,count:questions.length,url:filename.replace(/^public/,'')});}
fs.writeFileSync('public/questions/index.json',JSON.stringify(manifest,null,2)+'\n');console.log(`Published ${records.size} validated questions in ${subjects.size} subject shards; ${quarantined} incomplete records quarantined.`);
