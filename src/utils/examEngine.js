import { EXAMS } from '../config/exams.js';
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function validQuestionImage(q) {
  return typeof q.questionImage==='string' && /^\/questions\/figures\/[a-z0-9-]+\.png$/.test(q.questionImage)
    && typeof q.imageAlt==='string' && q.imageAlt.trim().length>0;
}
export function questionFingerprint(q) {
  const text=typeof q.question==='string'?q.question.trim():'';
  return JSON.stringify([text,q.passage||'',q.table||'',q.options||[],q.questionImage||'']);
}
export function validatePaper(examId, questions, full = true) {
  const e = EXAMS[examId], errors = [];
  if (!e) return ['Unknown exam'];
  if (!Array.isArray(questions) || !questions.length) return ['Paper contains no questions'];
  const ids = new Set(), texts = new Set();
  questions.forEach((q,i) => {
    const label = `Question ${i+1}`;
    if (!q || typeof q !== 'object') { errors.push(`${label}: invalid question object`); return; }
    if (!q.id || ids.has(q.id)) errors.push(`${label}: missing or duplicate ID`);
    ids.add(q.id);
    const text = typeof q.question === 'string' ? q.question.trim() : '';
    const fingerprint=questionFingerprint(q);
    if (!text || texts.has(fingerprint)) errors.push(`${label}: empty or duplicate question and context`);
    texts.add(fingerprint);
    const type = q.type || 'MCQ';
    if (!['MCQ','MSQ','NAT'].includes(type) || (examId !== 'gate' && type !== 'MCQ')) errors.push(`${label}: invalid question type`);
    if (type !== 'NAT' && (!Array.isArray(q.options) || ![4,...(examId==='sbi'?[5]:[])].includes(q.options.length) || Array.from(q.options).some(o => typeof o!=='string'||!o.trim()) || new Set(q.options).size!==q.options.length)) errors.push(`${label}: incomplete or duplicate options`);
    if (type === 'MCQ' && (!Number.isInteger(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer >= (q.options?.length || 0))) errors.push(`${label}: invalid answer key`);
    if (type === 'MSQ' && (!Array.isArray(q.correctOptions) || !q.correctOptions.length || q.correctOptions.some(v => !Number.isInteger(v) || v < 0 || v >= (q.options?.length||0)) || new Set(q.correctOptions).size!==q.correctOptions.length)) errors.push(`${label}: invalid multiple-answer key`);
    if (type === 'NAT' && !(Number.isFinite(q.natMin ?? q.correctNat) && Number.isFinite(q.natMax ?? q.correctNat) && (q.natMin??q.correctNat)<=(q.natMax??q.correctNat))) errors.push(`${label}: invalid numeric key`);
    if (examId !== 'gate' && q.marks !== 1) errors.push(`${label}: must carry one mark`);
    if (examId === 'gate' && ![1,2].includes(q.marks)) errors.push(`${label}: GATE marks must be 1 or 2`);
    if (q.questionImage && !validQuestionImage(q)) errors.push(`${label}: invalid question image`);
    if(q.figure && (!['bar','line','pie','scatter','venn'].includes(q.figure.type)||!Array.isArray(q.figure.labels)||!Array.isArray(q.figure.values)||q.figure.labels.length!==q.figure.values.length||!q.figure.values.length||q.figure.values.length>12||q.figure.values.some(v=>!Number.isFinite(v)||v<0)||(q.figure.type==='venn'&&q.figure.values.length!==3))) errors.push(`${label}: invalid figure data`);
  });
  if (full && questions.every(q=>q&&typeof q==='object')) {
    if (questions.length !== e.count || questions.reduce((n,q)=>n+q.marks,0) !== e.marks) errors.push(`Full paper requires ${e.count} questions and ${e.marks} marks`);
    e.sections.forEach(([name,count]) => { if (questions.filter(q=>q.section===name).length !== count) errors.push(`${name} requires ${count} questions`); });
    if (examId === 'gate' && questions.filter(q=>q.section==='General Aptitude').reduce((n,q)=>n+q.marks,0)!==15) errors.push('General Aptitude requires 15 marks');
  }
  return errors;
}
export function evaluateAnswer(q,a){
  const type=q.type||'MCQ';
  const blank=a===undefined||a===null||a===''||(Array.isArray(a)&&!a.length);
  const correct=!blank&&(type==='NAT'?String(a).trim()!==''&&Number.isFinite(Number(a))&&Number(a)>=(q.natMin??q.correctNat)&&Number(a)<=(q.natMax??q.correctNat):type==='MSQ'?Array.isArray(a)&&Array.isArray(q.correctOptions)&&[...new Set(a.map(Number))].sort().join(',')===[...q.correctOptions].sort().join(','):Number.isInteger(q.correctAnswer)&&Number(a)===q.correctAnswer);
  return {blank,correct,status:blank?'skipped':correct?'correct':'wrong'};
}
export function scorePaper(examId, questions, answers) {
  const e = EXAMS[examId];
  let score=0, negativeMarks=0, correctCount=0, wrongCount=0, skippedCount=0;
  const responses=questions.map(q=>{
    const a=answers[q.id], type=q.type||'MCQ';
    const {blank,correct}=evaluateAnswer(q,a);
    const penalty=type==='MCQ' ? q.marks*e.penalty : 0;
    const status=blank?'skipped':correct?'correct':'wrong';
    if(blank) skippedCount++; else if(correct){correctCount++;score+=q.marks;} else {wrongCount++;score-=penalty;negativeMarks+=penalty;}
    return {...q,type,userAnswer:a??null,status,earnedMarks:blank?0:correct?q.marks:-penalty};
  });
  return {score,negativeMarks,correctCount,wrongCount,skippedCount,totalQuestions:questions.length,totalPossibleMarks:questions.reduce((n,q)=>n+q.marks,0),accuracy:correctCount+wrongCount?100*correctCount/(correctCount+wrongCount):0,responses,mistakes:responses.filter(r=>r.status==='wrong')};
}
export function countdown(date, now = new Date()) {
  if (!date) return 'Awaiting official exam schedule';
  const today = new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
  const days=Math.round((Date.parse(date+'T00:00:00Z')-Date.parse(today+'T00:00:00Z'))/86400000);
  return days>0?`${days} days · ${date} (IST, date only)`:days===0?'Exam date is today':'Scheduled date has passed';
}
