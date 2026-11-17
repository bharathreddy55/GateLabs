import {writeAttemptArchive,compactAttemptCache} from '../utils/attemptArchive.js';
import {getAttemptRecords} from '../utils/attemptRepository.js';
import {readStored} from '../utils/safeStorage.js';
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
    this.stop(); this.result=null;this.resultError=null;this.reviewFilter='all';
    const duration=full?EXAMS[examId].minutes:(minutes??EXAMS[examId].minutes);
    if(!Number.isFinite(duration)||duration<=0){showToast('Invalid test duration','error');return false;}
    this.pending={examId,questions,title,full,minutes:duration,ruleVersion:EXAMS[examId].version,ownerId:auth.currentUser?.uid};
    this.ownerId=auth.currentUser?.uid;
    window.location.hash='#/mock-test';
    if(document.getElementById('exam-root')) this.refresh();
    return true;
  },
  reviewId(){return new URLSearchParams(location.hash.split('?')[1]||'').get('attempt');},
  render() {
    const requested=this.reviewId();
    if(requested&&this.result?.id!==requested&&!this.resultError)return '<section id="exam-root" class="workspace-loading" role="status">Loading your result…</section>';
    if(this.resultError)return '<section id="exam-root" class="exam-hub"><h1>Result unavailable</h1><p>Your result may not be saved on this device or account. Check your connection and attempt history.</p><a href="#/analytics">Open attempt history</a></section>';
    if(this.result) {
      const r=this.result;
      const bookmarks=readStored(`exam-bookmarks:${auth.currentUser?.uid}:${r.examId}`,[]);
      const visible=r.responses.map((q,i)=>({q,i})).filter(({q})=>!this.reviewFilter||this.reviewFilter==='all'||(this.reviewFilter==='bookmarked'?bookmarks.includes(q.id):q.status===this.reviewFilter));
      return `<section id="exam-root" class="exam-hub"><h1>Exam complete</h1><h2>${h(r.scope)}</h2><p>${r.mode==='full'?'Full mock':'Section practice'} · ${Math.floor((r.timeSpentSeconds||0)/60)} min ${(r.timeSpentSeconds||0)%60} sec</p><div class="exam-card"><strong>${r.score.toFixed(2)} / ${r.totalPossibleMarks}</strong><p>${r.correctCount} correct · ${r.wrongCount} wrong · ${r.skippedCount} unanswered</p><p>Marks deducted: ${r.negativeMarks.toFixed(2)} · Attempted-question accuracy: ${r.accuracy.toFixed(1)}%</p><p role="status">${h(this.saveMessage||'Saved on this device.')}</p><div class="button-row"><button id="retry-save">Retry cloud sync</button><button id="export-result">Export result</button></div></div><a href="#/${r.examId==='group2'?'group2':r.examId==='rrb'?'rrb-station-master':r.examId==='tet'?'tet-exams':r.examId==='sbi'?'sbi-clerk':'gate'}">Return to preparation</a><h2>Answer review</h2><div class="button-row"><label>Show answers<select id="result-filter">${[['all','All answers'],['wrong','Wrong only'],['skipped','Unanswered'],['bookmarked','Bookmarked']].map(([value,label])=>`<option value="${value}" ${(this.reviewFilter||'all')===value?'selected':''}>${label}</option>`).join('')}</select></label><button id="practise-weak" ${r.responses.some(q=>q.status!=='correct')?'':'disabled'}>Practise weak topics</button><span role="status">${visible.length} answers shown</span></div>${visible.map(({q,i})=>`<details class="exam-card"><summary>${i+1}. ${h(q.question)} — ${q.status} (${q.earnedMarks.toFixed(2)})</summary>${q.passage?`<blockquote>${h(q.passage)}</blockquote>`:""}${q.table?`<pre>${h(q.table)}</pre>`:""}${renderFigure(q.figure)}<p>Your answer: ${h(this.answerLabel(q,q.userAnswer))}</p><p>Correct answer: ${h(this.answerLabel(q,q.type==='NAT'?(q.correctNat??`${q.natMin} to ${q.natMax}`):q.type==='MSQ'?q.correctOptions:q.correctAnswer))}</p><p>${h(q.explanation||'Explanation not supplied.')}</p>${q.source?.startsWith('https://')?`<p><a href="${h(q.source)}" target="_blank" rel="noopener">Question source</a>${q.asOf?' · checked '+h(q.asOf):''}</p>`:`<small>${h(q.source||'Source not supplied')}</small>`}<button data-bookmark="${h(q.id)}">Bookmark / remove bookmark</button></details>`).join('')}</section>`;
    }
    if(!this.isTesting) {
      const p=this.pending, e=p&&EXAMS[p.examId];
      return `<section id="exam-root" class="exam-hub"><h1>${h(p?.title||'Choose an exam')}</h1>${p?`<div class="exam-card"><h2>${h(e.name)} · ${p.full?'Full-length mock':'Practice drill'}</h2><p>${p.questions.length} questions · ${p.minutes} minutes · ${p.questions.reduce((n,q)=>n+q.marks,0)} marks</p><p>Wrong MCQ: −${e.penalty===0?'0':e.penalty===.25?'¼':'⅓'} of question marks. Unanswered: 0. ${p.examId==='gate'?'MSQ and NAT have no penalty.':''}</p><p>${h(e.note)}</p><p>Answered questions marked for review are scored. Timer starts only when you begin. Reloading does not pause the timer.</p><a href="${e.source}" target="_blank" rel="noopener">Verified rule source</a><p>Rule version: ${h(e.version)} · checked ${e.checked}</p><button id="begin-exam">Begin test</button></div>`:`<div class="exam-grid">${[['group2','APPSC Group 2'],['rrb-station-master','RRB Station Master'],['tet-exams','AP TET'],['sbi-clerk','SBI Clerk'],['pyq-mocks','GATE question papers']].map(([route,label])=>`<a class="exam-card" href="#/${route}">${label}</a>`).join('')}</div>`}</section>`;
    }
    const q=this.questions[this.currentIdx], a=this.answers[q.id], type=q.type||'MCQ';
    return `<section id="exam-root" class="exam-hub"><header class="exam-toolbar"><div><h1>${h(this.pending.title)}</h1><p>${h(q.section||q.subject)} · Question ${this.currentIdx+1}/${this.questions.length} · ${q.marks} mark(s)</p></div><strong id="exam-clock" role="timer">${this.clockText()}</strong></header><div class="exam-card">${renderQuestionContext(q)}<h2>${h(q.question)}</h2>${renderAnswerInputs(q,a,{numericId:'nat-answer'})}<div class="exam-toolbar"><button id="previous-question">Previous</button><button id="clear-answer">Clear answer</button><button id="mark-review">${this.review[q.id]?'Unmark':'Mark'} for review</button><button id="next-question">Save & next</button></div></div><details class="exam-navigation" open><summary>Question navigator <span>Jump to a question</span></summary><nav class="exam-palette" aria-label="Question navigation">${this.questions.map((item,i)=>`<button data-question="${i}" ${this.allowed(i)?'':'disabled'} class="${i===this.currentIdx?'current':''} ${!evaluateAnswer(item,this.answers[item.id]).blank?'answered':''} ${this.review[item.id]?'review':''}" aria-label="Question ${i+1}${!evaluateAnswer(item,this.answers[item.id]).blank?', answered':''}${this.review[item.id]?', marked for review':''}">${i+1}</button>`).join('')}</nav></details><p>Green: answered · Purple border: marked for review · Outlined: current question</p><button id="submit-exam">Submit test</button><p id="exam-error" role="alert"></p></section>`;
  },
  async init() {
    const requested=this.reviewId();
    if(requested&&this.result?.id!==requested){
      if(this.restoringReview)return;this.restoringReview=true;
      try{const {attempts}=await getAttemptRecords();this.result=attempts.find(a=>a.id===requested&&Array.isArray(a.responses));this.ownerId=auth.currentUser?.uid;this.pending=null;if(!this.result)this.resultError=true;}catch{this.resultError=true;}
      finally{this.restoringReview=false;this.refresh();}return;
    }
    document.getElementById('begin-exam')?.addEventListener('click',()=>this.begin());
    document.querySelectorAll('[data-answer]').forEach(el=>el.addEventListener('change',()=>{
      if(!this.canAnswer())return;
      const q=this.questions[this.currentIdx];
      this.answers[q.id]=q.type==='MSQ'?[...document.querySelectorAll('[data-answer]:checked')].map(n=>Number(n.dataset.answer)):Number(el.dataset.answer);
      this.persist();this.updatePalette();
    }));
    document.getElementById('nat-answer')?.addEventListener('input',e=>{if(!this.canAnswer())return;const id=this.questions[this.currentIdx].id;if(e.target.value==='')delete this.answers[id];else this.answers[id]=e.target.value;this.persist();this.updatePalette();});
    document.querySelectorAll('[data-question]').forEach(el=>el.onclick=()=>{const i=Number(el.dataset.question);if(this.allowed(i)){this.currentIdx=i;this.persist();this.refresh();}});
    const bind=(id,fn)=>document.getElementById(id)?.addEventListener('click',fn);
    bind('previous-question',()=>this.move(-1));bind('next-question',()=>this.move(1));
    bind('clear-answer',()=>{if(!this.canAnswer())return;delete this.answers[this.questions[this.currentIdx].id];this.persist();this.refresh();});
    bind('mark-review',()=>{if(!this.canAnswer())return;const id=this.questions[this.currentIdx].id;this.review[id]=!this.review[id];this.persist();this.refresh();});
    bind('submit-exam',()=>{if(confirm('Submit your answers? Unanswered questions receive zero marks.'))this.submitExam();});
    document.querySelectorAll('[data-bookmark]').forEach(el=>el.onclick=()=>{
      const key=`exam-bookmarks:${auth.currentUser?.uid}:${this.result.examId}`;
      const list=readStored(key,[]);const id=el.dataset.bookmark;
      localStorage.setItem(key,JSON.stringify(list.includes(id)?list.filter(v=>v!==id):[...list,id]));showToast('Bookmark updated','success');if(this.reviewFilter==='bookmarked')this.refresh();
    });
    document.getElementById('result-filter')?.addEventListener('change',event=>{this.reviewFilter=event.target.value;this.refresh();document.getElementById('result-filter')?.focus();});
    document.getElementById('practise-weak')?.addEventListener('click',()=>{const r=this.result;const questions=r.responses.filter(q=>q.status!=='correct');this.startExam({examId:r.examId,questions,title:'Weak topic revision',full:false,minutes:Math.max(1,Math.ceil(questions.length*1.5))});});
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
  restore(){try{const s=readStored(this.storageKey(),null);if(s?.pending&&s.pending.ownerId===auth.currentUser?.uid&&s.pending.ruleVersion===EXAMS[s.pending.examId]?.version&&!validatePaper(s.pending.examId,s.pending.questions,s.pending.full).length){Object.assign(this,s);this.ownerId=s.pending.ownerId;this.questions=s.pending.questions;this.isTesting=true;this.installTimer();this.refresh();this.tick();}}catch{showToast('Saved exam could not be restored.','warning');}},
  installTimer(){clearInterval(this.timer);if(this.unloadHandler)window.removeEventListener('beforeunload',this.unloadHandler);this.unloadHandler=e=>{e.preventDefault();e.returnValue='';};window.addEventListener('beforeunload',this.unloadHandler);this.timer=setInterval(()=>this.tick(),1000);},
  tick(){if(!this.isTesting)return;if(Date.now()>=this.deadline){this.submitExam();return;}if(!this.allowed(this.currentIdx)){this.currentIdx=this.questions.findIndex((_,i)=>this.allowed(i));this.refresh();}const el=document.getElementById('exam-clock');if(el)el.textContent=this.clockText();},
  canAnswer(){if(!this.isTesting)return false;if(Date.now()>=this.deadline||!this.allowed(this.currentIdx)){this.tick();return false;}return true;},
  activeSection(){const e=EXAMS[this.pending.examId];return e.sectionalMinutes&&this.pending.full?Math.min(2,Math.floor((Date.now()-this.startedAt)/(e.sectionalMinutes*60000))):-1;},
  allowed(i){const section=this.activeSection();return section===-1||this.questions[i].section===EXAMS[this.pending.examId].sections[section][0];},
  clockText(){const section=this.activeSection();const end=section===-1?this.deadline:Math.min(this.deadline,this.startedAt+(section+1)*1200000);const seconds=Math.max(0,Math.ceil((end-Date.now())/1000));return `${section===-1?'Remaining':'Section remaining'} ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;},
  updatePalette(){
    document.querySelectorAll('[data-question]').forEach(button=>{const index=Number(button.dataset.question),q=this.questions[index];if(!q)return;const answered=!evaluateAnswer(q,this.answers[q.id]).blank;button.classList.toggle('answered',answered);button.classList.toggle('review',!!this.review[q.id]);button.setAttribute('aria-label','Question '+(index+1)+(answered?', answered':', unanswered')+(this.review[q.id]?', marked for review':''));if(index===this.currentIdx)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
  },
  move(delta){const i=this.currentIdx+delta;if(i>=0&&i<this.questions.length&&this.allowed(i)){this.currentIdx=i;this.persist();this.refresh();}},
  refresh(){const root=document.getElementById('exam-root');if(root){root.outerHTML=this.render();this.init();}},
  stop(){this.isTesting=false;clearInterval(this.timer);if(this.unloadHandler)window.removeEventListener('beforeunload',this.unloadHandler);this.unloadHandler=null;},
  abandon(){this.stop();localStorage.removeItem(this.storageKey());this.pending=null;},
  resetForUser(){if(this.ownerId&&this.ownerId!==auth.currentUser?.uid){this.stop();this.pending=null;this.result=null;this.ownerId=null;}},
  async submitExam(){
    if(!this.isTesting)return;
    const examId=this.pending.examId,activeKey=this.storageKey();
    const result={...scorePaper(examId,this.questions,this.answers),examId,ruleVersion:EXAMS[examId].version,mode:this.pending.full?'full':'practice',scope:this.pending.title,timeSpentSeconds:Math.min(this.pending.minutes*60,Math.floor((Date.now()-this.startedAt)/1000)),timestamp:new Date().toISOString(),userId:auth.currentUser?.uid};
    this.stop();this.result=result;
    try{result.id=crypto.randomUUID();const archived=await writeAttemptArchive(result.userId,[result]);const key=`exam-results:${result.userId}`;const rows=readStored(key,[]);rows.push(result);localStorage.setItem(key,JSON.stringify(archived?compactAttemptCache(rows):rows));localStorage.removeItem(activeKey);this.saveMessage='Saved on this device; syncing attempt history.';}catch{this.saveMessage='Device storage failed. Keep this review open until sync completes.';}
    if(auth.currentUser?.uid!==result.userId)return;
    if(result.id)history.replaceState(null,'','#/mock-test?attempt='+encodeURIComponent(result.id));
    this.refresh();
    await this.saveResult();
  },
  async saveResult(){
    const result=this.result,uid=auth.currentUser?.uid;if(!result||result.userId!==uid||this.saving)return;this.saving=true;
    try{const saved=await db.saveAttempt(result);if(this.result!==result||auth.currentUser?.uid!==uid)return;this.result.id=saved.id;this.result.persistence=saved.persistence;const status=saved.persistence;this.saveMessage=status?.cloudSaved?'Synced to your account.':status?.localSaved?'Saved on this device. Cloud sync pending.':'Saved on this device.';}
    catch(error){if(this.result===result&&auth.currentUser?.uid===uid)this.saveMessage=error.message||'Save failed. Keep this page open; export your result or retry.';}
    finally{this.saving=false;if(document.getElementById('exam-root'))this.refresh();}
  },
  answerLabel(q,a){return answerLabel(q,a);}
};
