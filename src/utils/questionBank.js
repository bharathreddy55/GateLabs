const cache=new Map();
export function normaliseSubject(value){return String(value||'').toLowerCase().replace(/^section\s*\d+\s*:\s*/,'').replace(/&/g,'and').replace(/\([^)]*\)/g,'').replace(/[^a-z0-9]/g,'');}
export function filterQuestionBank(list,filters={}){return list.filter(q=>{
 if(filters.subject&&normaliseSubject(q.subject)!==normaliseSubject(filters.subject))return false;
 if(filters.year&&Number(q.year)!==Number(filters.year))return false;
 const topic=String(q.topic||'').toLowerCase(),sub=String(q.subtopic||'').toLowerCase();
 if(filters.topic&&![topic,sub].includes(filters.topic.toLowerCase()))return false;
 if(filters.topics?.length&&!filters.topics.some(t=>[topic,sub].includes(t.toLowerCase())))return false;
 const difficulty=String(q.difficulty||'').toLowerCase();
 if(filters.difficulty&&difficulty!==filters.difficulty.toLowerCase())return false;
 if(filters.difficultyLimit==='Easy'&&difficulty!=='easy')return false;
 if(filters.difficultyLimit==='Medium'&&!['easy','medium'].includes(difficulty))return false;
 return true;
});}
async function json(url,fetcher){if(!cache.has(url))cache.set(url,fetcher(url).then(async res=>{if(!res.ok)throw Error('Question bank could not be loaded. Check your connection and retry.');return res.json();}).catch(error=>{cache.delete(url);throw error;}));return cache.get(url);}
export async function loadPublishedQuestions(filters={},fetcher=fetch){
 const manifest=await json('/questions/index.json',fetcher);
 const files=manifest.files.filter(f=>!filters.subject||normaliseSubject(f.subject)===normaliseSubject(filters.subject));
 const chunks=await Promise.all(files.map(f=>json(f.url+'?v='+manifest.version,fetcher)));
 return filterQuestionBank(chunks.flat(),filters);
}
export function clearQuestionBankCache(){cache.clear();}
