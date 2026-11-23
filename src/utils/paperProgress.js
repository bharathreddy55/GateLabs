export function libraryPaperKey(paper, imported=false) {
  if (imported) {
    const ids=paper.questions.map(q=>q?.id).sort();
    let hash=2166136261;
    for (const char of JSON.stringify([paper.title,ids])) hash=Math.imul(hash^char.charCodeAt(0),16777619);
    return 'import:'+ (hash>>>0).toString(16);
  }
  return paper.file ? 'file:'+paper.file.replace(/\.txt$/i,'') : 'model:'+paper.title;
}

export const sectionPaperKey = (key,section) => 'section:'+JSON.stringify([key,section]);
export const sectionPaperTitle = (title,section) => `${section} · ${title}`;

export function indexPaperAttempts(attempts,papers) {
  const byTitle=new Map();
  const counts=new Map(papers.map(paper=>[paper.key,0]));
  for (const {title,key,mode} of papers) {
    const label=JSON.stringify([mode,title]);
    const keys=byTitle.get(label) ?? new Set();
    keys.add(key);
    byTitle.set(label,keys);
  }
  for (const attempt of attempts) {
    let key=attempt.paperKey;
    if (!key) {
      const candidates=byTitle.get(JSON.stringify([attempt.mode,attempt.scope]));
      if (candidates?.size===1) [key]=candidates;
    }
    if (counts.has(key)) counts.set(key,counts.get(key)+1);
  }
  return counts;
}

export function paperAttemptLabel(count) {
  if (!count) return 'Not attempted';
  return count===1?'Completed once':`Completed ${count} times`;
}
