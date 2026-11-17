import {renderAnswerInputs,readAnswer,answerLabel,renderQuestionContext} from '../components/QuestionView.js';
import {evaluateAnswer} from '../utils/examEngine.js';
import { renderFigure } from '../utils/examFigures.js';
import { auth, db } from '../config/firebase';
import { EXAMS } from '../config/exams.js';
import { escapeHtml as h, validatePaper, scorePaper } from '../utils/examEngine.js';
import { showToast } from '../utils/toast';

export const MockTest = {
  isTesting:false, pending:null, result:null, timer:null,
  startExam({examId, questions, title, full=true, minutes}) {
    const errors=validatePaper(examId,questions,full);
    if(errors.length) { showToast(errors.slice(0,3).join(' · '),'error'); return false; }
    this.stop(); this.result=null;
    const duration=full?EXAMS[examId].minutes:(minutes??EXAMS[examId].minutes);
    if(!Number.isFinite(duration)||duration<=0){showToast('Invalid test duration','error');return false;}
    this.pending={examId,questions,title,full,minutes:duration,ruleVersion:EXAMS[examId].version,ownerId:auth.currentUser?.uid};
    this.ownerId=auth.currentUser?.uid;
    window.location.hash='#/mock-test';
    if(document.getElementById('exam-root')) this.refresh();
    return true;
  },
  render() {
    if(this.result) {
      const r=this.result;
      return `<section id="exam-root" class="exam-hub"><h1>Exam complete</h1><h2>${h(r.scope)}</h2><div class="exam-card"><strong>${r.score.toFixed(2)} / ${r.totalPossibleMarks}</strong><p>${r.correctCount} correct · ${r.wrongCount} wrong · ${r.skippedCount} unanswered</p><p>Marks deducted: ${r.negativeMarks.toFixed(2)} · Attempted-question accuracy: ${r.accuracy.toFixed(1)}%</p><p role="status">${h(this.saveMessage||'Saved on this device.')}</p><div class="button-row"><button id="retry-save">Retry cloud sync</button><button id="export-result">Export result</button></div></div><a href="#/${r.examId==='group2'?'group2':r.examId==='rrb'?'rrb-station-master':r.examId==='tet'?'tet-exams':r.examId==='sbi'?'sbi-clerk':'gate'}">Return to preparation</a><h2>Answer review</h2>${r.responses.map((q,i)=>`<details class="exam-card"><summary>${i+1}. ${h(q.question)} — ${q.status} (${q.earnedMarks.toFixed(2)})</summary>${q.passage?`<blockquote>${h(q.passage)}</blockquote>`:""}${q.table?`<pre>${h(q.table)}</pre>`:""}${renderFigure(q.figure)}<p>Your answer: ${h(this.answerLabel(q,q.userAnswer))}</p><p>Correct answer: ${h(this.answerLabel(q,q.type==='NAT'?(q.correctNat??`${q.natMin} to ${q.natMax}`):q.type==='MSQ'?q.correctOptions:q.correctAnswer))}</p><p>${h(q.explanation||'Explanation not supplied.')}</p>${q.source?.startsWith('https://')?`<p><a href="${h(q.source)}" target="_blank" rel="noopener">Question source</a>${q.asOf?' · checked '+h(q.asOf):''}</p>`:`<small>${h(q.source||'Source not supplied')}</small>`}<button data-bookmark="${h(q.id)}">Bookmark / remove bookmark</button></details>`).join('')}</section>`;
    }
    if(!this.isTesting) {
      const p=this.pending, e=p&&EXAMS[p.examId];
      return `<section id="exam-root" class="exam-hub"><h1>${h(p?.title||'Choose an exam')}</h1>${p?`<div class="exam-card"><h2>${h(e.name)} · ${p.full?'Full-length mock':'Practice drill'}</h2><p>${p.questions.length} questions · ${p.minutes} minutes · ${p.questions.reduce((n,q)=>n+q.marks,0)} marks</p><p>Wrong MCQ: −${e.penalty===0?'0':e.penalty===.25?'¼':'⅓'} of question marks. Unanswered: 0. ${p.examId==='gate'?'MSQ and NAT have no penalty.':''}</p><p>${h(e.note)}</p><p>Answered questions marked for review are scored. Timer starts only when you begin. Reloading does not pause the timer.</p><a href="${e.source}" target="_blank" rel="noopener">Verified rule source</a><p>Rule version: ${h(e.version)} · checked ${e.checked}</p><button id="begin-exam">Begin test</button></div>`:`<div class="exam-grid">${[['group2','APPSC Group 2'],['rrb-station-master','RRB Station Master'],['tet-exams','AP TET'],['sbi-clerk','SBI Clerk'],['pyq-mocks','GATE question papers']].map(([route,label])=>`<a class="exam-card" href="#/${route}">${label}</a>`).join('')}</div>`}</section>`;
    }
    const q=this.questions[this.currentIdx], a=this.answers[q.id], type=q.type||'MCQ';
    return `<section id="exam-root" class="exam-hub"><header class="exam-toolbar"><div><h1>${h(this.pending.title)}</h1><p>${h(q.section||q.subject)} · Question ${this.currentIdx+1}/${this.questions.length} · ${q.marks} mark(s)</p></div><strong id="exam-clock" role="timer">${this.clockText()}</strong></header><div class="exam-card">${renderQuestionContext(q)}<h2>${h(q.question)}</h2>${renderAnswerInputs(q,a,{numericId:'nat-answer'})}<div class="exam-toolbar"><button id="previous-question">Previous</button><button id="clear-answer">Clear answer</button><button id="mark-review">${this.review[q.id]?'Unmark':'Mark'} for review</button><button id="next-question">Save & next</button></div></div><details class="exam-navigation" open><summary>Question navigator <span>Jump to a question</span></summary><nav class="exam-palette" aria-label="Question navigation">${this.questions.map((item,i)=>`<button data-question="${i}" ${this.allowed(i)?'':'disabled'} class="${i===this.currentIdx?'current':''} ${this.answers[item.id]!==undefined?'answered':''} ${this.review[item.id]?'review':''}" aria-label="Question ${i+1}${this.answers[item.id]!==undefined?', answered':''}${this.review[item.id]?', marked for review':''}">${i+1}</button>`).join('')}</nav></details><p>Green: answered · Purple border: marked for review · Outlined: current question</p><button id="submit-exam">Submit test</button><p id="exam-error" role="alert"></p></section>`;
  },
  init() {
    document.getElementById('begin-exam')?.addEventListener('click',()=>this.begin());
    document.querySelectorAll('[data-answer]').forEach(el=>el.addEventListener('change',()=>{
      if(!this.canAnswer())return;
      const q=this.questions[this.currentIdx];
      this.answers[q.id]=q.type==='MSQ'?[...document.querySelectorAll('[data-answer]:checked')].map(n=>Number(n.dataset.answer)):Number(el.dataset.answer);
      this.persist();
    }));
    document.getElementById('nat-answer')?.addEventListener('input',e=>{if(!this.canAnswer())return;const id=this.questions[this.currentIdx].id;if(e.target.value==='')delete this.answers[id];else this.answers[id]=e.target.value;this.persist();});
    document.querySelectorAll('[data-question]').forEach(el=>el.onclick=()=>{const i=Number(el.dataset.question);if(this.allowed(i)){this.currentIdx=i;this.persist();this.refresh();}});
    const bind=(id,fn)=>document.getElementById(id)?.addEventListener('click',fn);
    bind('previous-question',()=>this.move(-1));bind('next-question',()=>this.move(1));
    bind('clear-answer',()=>{if(!this.canAnswer())return;delete this.answers[this.questions[this.currentIdx].id];this.persist();this.refresh();});
    bind('mark-review',()=>{if(!this.canAnswer())return;const id=this.questions[this.currentIdx].id;this.review[id]=!this.review[id];this.persist();this.refresh();});
    bind('submit-exam',()=>{if(confirm('Submit your answers? Unanswered questions receive zero marks.'))this.submitExam();});
    document.querySelectorAll('[data-bookmark]').forEach(el=>el.onclick=()=>{
      const key=`exam-bookmarks:${auth.currentUser?.uid}:${this.result.examId}`;
      const list=JSON.parse(localStorage.getItem(key)||'[]');const id=el.dataset.bookmark;
      localStorage.setItem(key,JSON.stringify(list.includes(id)?list.filter(v=>v!==id):[...list,id]));showToast('Bookmark updated','success');
    });
    document.getElementById('retry-save')?.addEventListener('click',()=>this.saveResult());
    document.getElementById('export-result')?.addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(this.result,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='GateLabs-result.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
    if(!this.isTesting&&!this.pending&&!this.result)this.restore();
  },
  begin() {
    this.questions=this.pending.questions;this.answers={};this.review={};this.currentIdx=0;
    this.startedAt=Date.now();this.deadline=this.startedAt+this.pending.minutes*60000;this.isTesting=true;
    this.installTimer();this.persist();this.refresh();window.scrollTo(0,0);
  },
  storageKey(){return `exam-active:${this.ownerId||auth.currentUser?.uid||'anonymous'}`;},
  persist(){try{localStorage.setItem(this.storageKey(),JSON.stringify({pending:this.pending,answers:this.answers,review:this.review,currentIdx:this.currentIdx,startedAt:this.startedAt,deadline:this.deadline}));}catch{showToast('Device storage is full; keep this page open.','warning');}},
  restore(){try{const s=JSON.parse(localStorage.getItem(this.storageKey())||'null');if(s?.pending&&s.pending.ownerId===auth.currentUser?.uid&&s.pending.ruleVersion===EXAMS[s.pending.examId]?.version&&!validatePaper(s.pending.examId,s.pending.questions,s.pending.full).length){Object.assign(this,s);this.ownerId=s.pending.ownerId;this.questions=s.pending.questions;this.isTesting=true;this.installTimer();this.refresh();this.tick();}}catch{showToast('Saved exam could not be restored.','warning');}},
  installTimer(){clearInterval(this.timer);if(this.unloadHandler)window.removeEventListener('beforeunload',this.unloadHandler);this.unloadHandler=e=>{e.preventDefault();e.returnValue='';};window.addEventListener('beforeunload',this.unloadHandler);this.timer=setInterval(()=>this.tick(),1000);},
  tick(){if(!this.isTesting)return;if(Date.now()>=this.deadline){this.submitExam();return;}if(!this.allowed(this.currentIdx)){this.currentIdx=this.questions.findIndex((_,i)=>this.allowed(i));this.refresh();}const el=document.getElementById('exam-clock');if(el)el.textContent=this.clockText();},
  canAnswer(){if(!this.isTesting)return false;if(Date.now()>=this.deadline||!this.allowed(this.currentIdx)){this.tick();return false;}return true;},
  activeSection(){const e=EXAMS[this.pending.examId];return e.sectionalMinutes&&this.pending.full?Math.min(2,Math.floor((Date.now()-this.startedAt)/(e.sectionalMinutes*60000))):-1;},
  allowed(i){const section=this.activeSection();return section===-1||this.questions[i].section===EXAMS[this.pending.examId].sections[section][0];},
  clockText(){const section=this.activeSection();const end=section===-1?this.deadline:Math.min(this.deadline,this.startedAt+(section+1)*1200000);const seconds=Math.max(0,Math.ceil((end-Date.now())/1000));return `${section===-1?'Remaining':'Section remaining'} ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;},
  move(delta){const i=this.currentIdx+delta;if(i>=0&&i<this.questions.length&&this.allowed(i)){this.currentIdx=i;this.persist();this.refresh();}},
  refresh(){const root=document.getElementById('exam-root');if(root){root.outerHTML=this.render();this.init();}},
  stop(){this.isTesting=false;clearInterval(this.timer);if(this.unloadHandler)window.removeEventListener('beforeunload',this.unloadHandler);this.unloadHandler=null;},
  abandon(){this.stop();localStorage.removeItem(this.storageKey());this.pending=null;},
  resetForUser(){if(this.ownerId&&this.ownerId!==auth.currentUser?.uid){this.stop();this.pending=null;this.result=null;this.ownerId=null;}},
  async submitExam(){
    if(!this.isTesting)return;
    const examId=this.pending.examId;
    const result={...scorePaper(examId,this.questions,this.answers),examId,ruleVersion:EXAMS[examId].version,mode:this.pending.full?'full':'practice',scope:this.pending.title,timeSpentSeconds:Math.min(this.pending.minutes*60,Math.floor((Date.now()-this.startedAt)/1000)),timestamp:new Date().toISOString(),userId:auth.currentUser?.uid};
    this.stop();this.result=result;
    try{const key=`exam-results:${auth.currentUser?.uid}`;const rows=JSON.parse(localStorage.getItem(key)||'[]');result.id=crypto.randomUUID();rows.push(result);localStorage.setItem(key,JSON.stringify(rows));localStorage.removeItem(this.storageKey());this.saveMessage='Saved on this device; syncing attempt history.';}catch{this.saveMessage='Device storage failed. Keep this review open until sync completes.';}
    this.refresh();
    await this.saveResult();
  },
  async saveResult(){
    if(this.saving)return;this.saving=true;
    try{const saved=await db.saveAttempt(this.result);this.result.id=saved.id;this.result.persistence=saved.persistence;const status=saved.persistence;this.saveMessage=status?.cloudSaved?'Synced to your account.':status?.localSaved?'Saved on this device. Cloud sync pending.':'Saved on this device.';}
    catch(error){this.saveMessage=error.message||'Save failed. Keep this page open; export your result or retry.';}
    finally{this.saving=false;if(document.getElementById('exam-root'))this.refresh();}
  },
  answerLabel(q,a){return answerLabel(q,a);}
};
