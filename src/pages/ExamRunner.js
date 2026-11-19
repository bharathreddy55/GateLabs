import {writeAttemptArchive,compactAttemptCache} from '../utils/attemptArchive.js';
import {getAttemptRecords} from '../utils/attemptRepository.js';
import {readStored} from '../utils/safeStorage.js';
import {renderAnswerInputs,readAnswer,answerLabel,renderQuestionContext} from '../components/QuestionView.js';
import {evaluateAnswer} from '../utils/examEngine.js';
import { renderFigure } from '../utils/examFigures.js';
import { auth, db } from '../config/firebase';
import { EXAMS } from '../config/exams.js';
import { EXAM_CATALOG } from '../config/navigation.js';
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
      return `<section id="exam-root" class="exam-hub"><h1>Exam complete</h1><h2>${h(r.scope)}</h2><p>${r.mode==='full'?'Full mock':'Section practice'} · ${Math.floor((r.timeSpentSeconds||0)/60)} min ${(r.timeSpentSeconds||0)%60} sec</p><div class="exam-card"><strong>${r.score.toFixed(2)} / ${r.totalPossibleMarks}</strong><p>${r.correctCount} correct · ${r.wrongCount} wrong · ${r.skippedCount} unanswered</p><p>Marks deducted: ${r.negativeMarks.toFixed(2)} · Attempted-question accuracy: ${r.accuracy.toFixed(1)}%</p><p role="status">${h(this.saveMessage||'Saved on this device.')}</p><div class="button-row"><button id="retry-save">Retry cloud sync</button><button id="export-result">Export result</button></div></div><a href="#/${EXAMS[r.examId]?.route||EXAM_CATALOG.find(e=>e.id===r.examId)?.route||'exams'}">Return to preparation</a><h2>Answer review</h2><div class="button-row"><label>Show answers<select id="result-filter">${[['all','All answers'],['wrong','Wrong only'],['skipped','Unanswered'],['bookmarked','Bookmarked']].map(([value,label])=>`<option value="${value}" ${(this.reviewFilter||'all')===value?'selected':''}>${label}</option>`).join('')}</select></label><button id="practise-weak" ${r.responses.some(q=>q.status!=='correct')?'':'disabled'}>Practise weak topics</button><span role="status">${visible.length} answers shown</span></div>${visible.map(({q,i})=>`<details class="exam-card"><summary>${i+1}. ${h(q.question)} — ${q.status} (${q.earnedMarks.toFixed(2)})</summary>${q.passage?`<blockquote>${h(q.passage)}</blockquote>`:""}${q.table?`<pre>${h(q.table)}</pre>`:""}${renderFigure(q.figure)}<p>Your answer: ${h(this.answerLabel(q,q.userAnswer))}</p><p>Correct answer: ${h(this.answerLabel(q,q.type==='NAT'?(q.correctNat??`${q.natMin} to ${q.natMax}`):q.type==='MSQ'?q.correctOptions:q.correctAnswer))}</p><p>${h(q.explanation||'Explanation not supplied.')}</p>${q.source?.startsWith('https://')?`<p><a href="${h(q.source)}" target="_blank" rel="noopener">Question source</a>${q.asOf?' · checked '+h(q.asOf):''}</p>`:`<small>${h(q.source||'Source not supplied')}</small>`}<button data-bookmark="${h(q.id)}">Bookmark / remove bookmark</button></details>`).join('')}</section>`;
    }
    if(!this.isTesting) {
      const p=this.pending, e=p&&EXAMS[p.examId];
      return `<section id="exam-root" class="exam-hub"><h1>${h(p?.title||'Choose an exam')}</h1>${p?`<div class="exam-card"><h2>${h(e.name)} · ${p.full?'Full-length mock':'Practice drill'}</h2><p>${p.questions.length} questions · ${p.minutes} minutes · ${p.questions.reduce((n,q)=>n+q.marks,0)} marks</p><p>Wrong MCQ: −${e.penalty===0?'0':e.penalty===.25?'¼':'⅓'} of question marks. Unanswered: 0. ${p.examId==='gate'?'MSQ and NAT have no penalty.':''}</p><p>${h(e.note)}</p><p>Answered questions marked for review are scored. Timer starts only when you begin. Reloading does not pause the timer.</p><a href="${e.source}" target="_blank" rel="noopener">Verified rule source</a><p>Rule version: ${h(e.version)} · checked ${e.checked}</p><button id="begin-exam">Begin test</button></div>`:`<div class="exam-grid">${[['group2','APPSC Group 2'],['rrb-station-master','RRB Station Master'],['sbi-clerk','SBI Clerk'],['pyq-mocks','GATE question papers']].map(([route,label])=>`<a class="exam-card" href="#/${route}">${label}</a>`).join('')}</div>`}</section>`;
    }
    const q=this.questions[this.currentIdx], a=this.answers[q.id], type=q.type||'MCQ';
    return this.renderCbt();
  },
  renderCbt() {
    const q = this.questions[this.currentIdx];
    const buttons = this.questions.map((item, index) => {
      const state = this.questionState(item);
      const current = index === this.currentIdx;
      return `<button type="button" data-question="${index}" class="${state} ${current?'current':''}"
        ${current?'aria-current="step"':''} ${this.allowed(index)?'':'disabled'}
        aria-label="Question ${index+1}, ${this.stateLabel(state)}">${index+1}</button>`;
    }).join('');
    return `<section id="exam-root" class="exam-hub cbt-room">
      <header class="exam-toolbar">
        <div><p class="eyebrow">CBT practice</p><h1>${h(this.pending.title)}</h1></div>
        <strong id="exam-clock" role="timer">${this.clockText()}</strong>
      </header>
      <div class="cbt-layout">
        <article class="exam-card cbt-question" tabindex="-1" aria-labelledby="cbt-question-title">
          <p class="cbt-question-meta">${h(q.section||q.subject||EXAMS[this.pending.examId].name)} · Question ${this.currentIdx+1} of ${this.questions.length} · ${q.marks} mark${q.marks===1?'':'s'}</p>
          ${renderQuestionContext(q)}
          <h2 id="cbt-question-title">${h(q.question)}</h2>
          ${renderAnswerInputs(q,this.answers[q.id],{numericId:'nat-answer'})}
          <div class="exam-toolbar cbt-question-actions">
            <button id="previous-question" ${this.nextIndex(-1)<0?'disabled':''}>Previous</button>
            <button id="clear-answer">Clear answer</button>
            <button id="mark-review" aria-pressed="${Boolean(this.review[q.id])}">${this.review[q.id]?'Unmark':'Mark'} for review</button>
            <button id="next-question" ${this.nextIndex(1)<0?'disabled':''}>Save & next</button>
          </div>
        </article>
        <aside class="cbt-sidebar">
          <details class="exam-navigation" open>
            <summary>Question palette</summary>
            <div class="cbt-legend">${['answered','unanswered','review','unvisited'].map(state=>
              `<span data-cbt-count="${state}" class="${state}"></span>`).join('')}</div>
            <nav class="exam-palette" aria-label="Question navigation">${buttons}</nav>
          </details>
          <button id="submit-exam">Submit test</button>
        </aside>
      </div>
    </section>`;
  },
  questionState(q) {
    if (this.review[q.id]) return 'review';
    if (!evaluateAnswer(q,this.answers[q.id]).blank) return 'answered';
    return this.visited[q.id] ? 'unanswered' : 'unvisited';
  },
  stateLabel(state) {
    return {answered:'answered',unanswered:'unanswered',review:'marked for review',unvisited:'not visited'}[state];
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
    document.querySelectorAll('[data-question]').forEach(el=>el.onclick=()=>this.selectQuestion(Number(el.dataset.question)));
    if (this.isTesting) this.updatePalette();
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
    this.questions=this.pending.questions;this.answers={};this.review={};this.visited={};this.currentIdx=0;
    this.startedAt=Date.now();this.deadline=this.startedAt+this.pending.minutes*60000;this.isTesting=true;
    if (!this.allowed(this.currentIdx)) this.currentIdx=this.nextIndex(1, -1);
    this.visited[this.questions[this.currentIdx].id]=true;
    this.installTimer();this.persist();this.refresh();window.scrollTo(0,0);
  },
  storageKey(){return `exam-active:${this.ownerId||auth.currentUser?.uid||'anonymous'}`;},
  persist(){try{localStorage.setItem(this.storageKey(),JSON.stringify({pending:this.pending,answers:this.answers,review:this.review,visited:this.visited,currentIdx:this.currentIdx,startedAt:this.startedAt,deadline:this.deadline}));}catch{showToast('Device storage is full; keep this page open.','warning');}},
  restore(){
    try {
      const saved=readStored(this.storageKey(),null);
      if (!saved?.pending || saved.pending.ownerId!==auth.currentUser?.uid ||
          saved.pending.ruleVersion!==EXAMS[saved.pending.examId]?.version ||
          validatePaper(saved.pending.examId,saved.pending.questions,saved.pending.full).length) return;
      Object.assign(this,saved);
      this.ownerId=saved.pending.ownerId;
      this.questions=saved.pending.questions;
      this.visited=saved.visited||Object.fromEntries([...Object.keys(this.answers),...Object.keys(this.review)].map(id=>[id,true]));
      if (!this.allowed(this.currentIdx)) this.currentIdx=this.nextIndex(1,-1);
      this.visited[this.questions[this.currentIdx].id]=true;
      this.isTesting=true;
      this.installTimer();
      if (Date.now()>=this.deadline) this.submitExam();
      else this.refresh();
    } catch {
      showToast('Saved exam could not be restored.','warning');
    }
  },
  installTimer(){clearInterval(this.timer);if(this.unloadHandler)window.removeEventListener('beforeunload',this.unloadHandler);this.unloadHandler=e=>{e.preventDefault();e.returnValue='';};window.addEventListener('beforeunload',this.unloadHandler);this.timer=setInterval(()=>this.tick(),1000);},
  tick(){if(!this.isTesting)return;if(Date.now()>=this.deadline){this.submitExam();return;}if(!this.allowed(this.currentIdx))this.selectQuestion(this.nextIndex(1,-1));const el=document.getElementById('exam-clock');if(el)el.textContent=this.clockText();},
  canAnswer(){if(!this.isTesting)return false;if(Date.now()>=this.deadline||!this.allowed(this.currentIdx)){this.tick();return false;}return true;},
  activeSection(){const e=EXAMS[this.pending.examId];return e.sectionalMinutes&&this.pending.full?Math.max(0,Math.min(e.sections.length-1,Math.floor((Date.now()-this.startedAt)/(e.sectionalMinutes*60000)))):-1;},
  allowed(i){const section=this.activeSection();return Boolean(this.questions[i])&&(section===-1||this.questions[i].section===EXAMS[this.pending.examId].sections[section][0]);},
  clockText(){const section=this.activeSection();const end=section===-1?this.deadline:Math.min(this.deadline,this.startedAt+(section+1)*EXAMS[this.pending.examId].sectionalMinutes*60000);const seconds=Math.max(0,Math.ceil((end-Date.now())/1000));return `${section===-1?'Remaining':'Section remaining'} ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;},
  updatePalette(){
    const counts={answered:0,unanswered:0,review:0,unvisited:0};
    document.querySelectorAll('[data-question]').forEach(button=>{
      const index=Number(button.dataset.question), q=this.questions[index];
      const state=this.questionState(q);
      counts[state]++;
      for (const key of Object.keys(counts)) button.classList.toggle(key,key===state);
      const answer=state==='review'?(!evaluateAnswer(q,this.answers[q.id]).blank?', answered':', unanswered'):'';
      button.setAttribute('aria-label',`Question ${index+1}, ${this.stateLabel(state)}${answer}`);
    });
    document.querySelectorAll('[data-cbt-count]').forEach(item=>{
      const state=item.dataset.cbtCount;
      item.textContent=`${counts[state]} ${this.stateLabel(state)}`;
    });
  },
  nextIndex(direction, from=this.currentIdx){
    for (let index=from+direction;index>=0&&index<this.questions.length;index+=direction) {
      if (this.allowed(index)) return index;
    }
    return -1;
  },
  selectQuestion(index){
    if (Date.now()>=this.deadline) {
      this.tick();
      return;
    }
    if (!this.allowed(index)) return;
    this.currentIdx=index;
    this.visited[this.questions[index].id]=true;
    this.persist();
    this.refresh();
    document.querySelector('#exam-root .cbt-question')?.focus();
  },
  move(direction){this.selectQuestion(this.nextIndex(direction));},
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
