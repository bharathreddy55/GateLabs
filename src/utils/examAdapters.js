export function normaliseQuestions(examId, questions) {
  return questions.map(q=>{
    const subject=q.section||q.subject||'';
    let section=subject;
    if(examId==='tet')section=/child|pedagogy/i.test(subject)?'Child Development':/language\s*(ii|2)\b|english/i.test(subject)?'Language II':/language\s*(i|1)\b|telugu/i.test(subject)?'Language I':/math/i.test(subject)?'Mathematics':/environment|evs/i.test(subject)?'Environmental Studies':subject;
    if(examId==='sbi')section=/english/i.test(subject)?'English':/quant|numer/i.test(subject)?'Numerical Ability':/reason/i.test(subject)?'Reasoning':subject;
    if(examId==='gate'&&/general aptitude/i.test(subject))section='General Aptitude';
    return {...q,section,type:q.type||'MCQ',marks:examId==='gate'?Number(q.marks):1};
  });
}
