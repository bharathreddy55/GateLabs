const issues=new Map();
function plain(value){return value!==null&&typeof value==='object'&&!Array.isArray(value)&&!Object.keys(value).some(k=>['__proto__','constructor','prototype'].includes(k));}
export function readStored(key,fallback=[],storage=globalThis.localStorage){
  let raw;
  try{
    raw=storage?.getItem(key);if(raw===null||raw===undefined)return structuredClone(fallback);
    const value=JSON.parse(raw);
    const valid=Array.isArray(fallback)?Array.isArray(value):fallback===null?value===null||plain(value):typeof fallback==='object'?plain(value):typeof value===typeof fallback;
    let recordsValid=true;
    if(Array.isArray(value)){
      if(/^(gate_attempts|exam-results):/.test(key))recordsValid=value.every(a=>plain(a)&&typeof a.id==='string'&&Number.isFinite(a.score)&&(!a.responses||Array.isArray(a.responses)));
      else if(key.startsWith('exam-papers:'))recordsValid=value.every(p=>plain(p)&&typeof p.title==='string'&&Array.isArray(p.questions));
      else if(key.startsWith('gate_custom_formulas:'))recordsValid=value.every(c=>plain(c)&&['id','subject','topic','concept','formula'].every(k=>typeof c[k]==='string'));
      else if(key.startsWith('gate_bookmarks:'))recordsValid=value.every(q=>plain(q)&&typeof q.id==='string'&&typeof q.question==='string'&&typeof q.subject==='string');
      else if(/^exam-(progress|bookmarks):/.test(key))recordsValid=value.every(s=>typeof s==='string');
    }
    if(!valid||!recordsValid)throw Error('Unexpected saved data shape');
    return value;
  }catch{
    issues.set(key,raw??'');
    if(typeof window!=='undefined')window.dispatchEvent(new Event('gatelabs:storage-warning'));
    return structuredClone(fallback);
  }
}
export function storageRecoveryEntries(){return Object.fromEntries(issues);}
export function clearStorageRecovery(){issues.clear();}
