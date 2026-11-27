import {writeAttemptArchive,compactAttemptCache} from '../utils/attemptArchive.js';
import {getAttemptRecords} from '../utils/attemptRepository.js';
import {readStored} from '../utils/safeStorage.js';
import {renderAnswerInputs,readAnswer,renderQuestionContext} from '../components/QuestionView.js';
import {mountAnswerReview} from '../components/AnswerReview.js';
import {mountAttemptInsights} from '../components/AttemptInsights.js';
import {evaluateAnswer} from '../utils/examEngine.js';
import { auth, db } from '../config/firebase';
import { EXAMS } from '../config/exams.js';
import { EXAM_CATALOG, icon } from '../config/navigation.js';
import { escapeHtml as h, validatePaper, scorePaper } from '../utils/examEngine.js';
import { showToast } from '../utils/toast';
import { enterExamFullscreen, leaveExamFullscreen, fullscreenButton } from '../utils/examFullscreen.js';

const paletteLabels={
  answered:'answered',
  unanswered:'unanswered',
  review:'marked for review',
  unvisited:'not visited',
  'answered-review':'answered & marked for review'
};

export const MockTest = {
  isTesting:false, pending:null, result:null, timer:null,
  startExam({examId, questions, title, full=true, minutes, paperKey}) {
    const errors=validatePaper(examId,questions,full);
    if(errors.length) { showToast(errors.slice(0,3).join(' · '),'error'); return false; }
    this.stop(); this.result=null;this.saveMessage=null;
    const duration=full?EXAMS[examId].minutes:(minutes??EXAMS[examId].minutes);
    if(!Number.isFinite(duration)||duration<=0){showToast('Invalid test duration','error');return false;}
    this.pending={examId,questions,title,full,minutes:duration,ruleVersion:EXAMS[examId].version,ownerId:auth.currentUser?.uid,paperKey};
    this.ownerId=auth.currentUser?.uid;
    window.location.hash='#/mock-test';
    if(document.getElementById('exam-root')) this.refresh();
    return true;
  },
  reviewId(){return new URLSearchParams(location.hash.split('?')[1]||'').get('attempt');},
  render() {
    const requested=this.reviewId();
    if(requested&&this.result?.id!==requested)return '<section id="exam-root" class="workspace-loading" data-load-attempt role="status">Loading your result…</section>';
    if(this.result) return this.renderResult();
    if(!this.isTesting) return this.renderBriefing();
    return this.renderCbt();
  },
  renderBriefing() {
    const pending = this.pending;
    if(!pending) {
      return `<section id="exam-root" class="exam-hub"><h1>Choose an exam</h1>
        <div class="exam-grid">${EXAM_CATALOG.map(exam=>`<a class="exam-card" href="#/${exam.route}">${h(exam.name)}</a>`).join('')}</div></section>`;
    }
    const rule = EXAMS[pending.examId];
    const marks = pending.questions.reduce((total, question)=>total+question.marks,0);
    const penalty = rule.penalty===0?'0':rule.penalty===.25?'¼':'⅓';
    return `<section id="exam-root" class="exam-hub exam-briefing">
      <header class="exam-summary-header">
        <p class="eyebrow">${h(rule.name)} · ${pending.full?'Full-length mock':'Practice drill'}</p>
        <h1>${h(pending.title)}</h1>
        <dl class="exam-summary-metrics">
          <div><dt>Questions</dt><dd>${pending.questions.length}</dd></div>
          <div><dt>Minutes</dt><dd>${pending.minutes}</dd></div>
          <div><dt>Marks</dt><dd>${marks}</dd></div>
        </dl>
      </header>
      <div class="exam-card exam-instructions">
        <h2>Before you begin</h2>
        <p>Wrong MCQ answers deduct ${penalty} of the question marks. Unanswered questions earn zero. ${pending.examId==='gate'?'MSQ and NAT have zero penalty.':''}</p>
        <p>${h(rule.note)}</p>
        <p>The timer starts when you begin and continues if you reload. Answers marked for review are included in your score.</p>
        <div class="exam-toolbar">
          <a href="${rule.source}" target="_blank" rel="noopener">Verified exam rules ↗</a>
          <button id="begin-exam" type="button">Begin test</button>
        </div>
      </div>
    </section>`;
  },
  renderResult() {
    const result = this.result;
    const returnRoute=EXAMS[result.examId]?.route||EXAM_CATALOG.find(exam=>exam.id===result.examId)?.route||'exams';
    const fromHistory=new URLSearchParams(location.hash.split('?')[1]).get('from')==='history';
    const attemptedAt=Date.parse(result.timestamp);
    return `<section id="exam-root" class="exam-hub exam-results">
      <header class="exam-summary-header">
        <p class="eyebrow">${result.mode==='full'?'Full mock':'Section practice'} · ${Math.floor((result.timeSpentSeconds||0)/60)} min ${(result.timeSpentSeconds||0)%60} sec</p>
        <h1 tabindex="-1">Exam complete</h1>
        <p class="exam-summary-title">${h(result.scope)}</p>
        ${fromHistory && Number.isFinite(attemptedAt) ? `<time class="exam-summary-title" datetime="${new Date(attemptedAt).toISOString()}">${h(new Date(attemptedAt).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'}))}</time>` : ''}
        <dl class="exam-summary-metrics">
          <div><dt>Score</dt><dd>${result.score.toFixed(2)} <small>/ ${result.totalPossibleMarks}</small></dd></div>
          <div><dt>Attempted accuracy</dt><dd>${result.accuracy.toFixed(1)}%</dd></div>
          <div><dt>Marks deducted</dt><dd>${result.negativeMarks.toFixed(2)}</dd></div>
        </dl>
      </header>
      <div class="exam-card exam-result-actions">
        <p>${result.correctCount} correct · ${result.wrongCount} wrong · ${result.skippedCount} unanswered</p>
        <p id="result-save-status" role="status">${h(this.saveMessage||'Saved on this device.')}</p>
        <div class="button-row">
          <button id="open-answer-review" class="ui-button" type="button">Review answers</button>
          ${fromHistory ? '<a href="#/analytics">Back to attempt history</a>' : ''}
          <a href="#/${returnRoute}">Return to preparation</a>
          <button id="retry-save">Retry cloud sync</button>
          <button id="export-result">Export result</button>
        </div>
      </div>
      <section class="attempt-insights" id="exam-attempt-insights"></section>
      <section class="answer-review" id="exam-answer-review"></section>
    </section>`;
  },
  initAnswerReview(root, refreshInsights) {
    const result=this.result;
    if(this.reviewAttemptId!==result.id || !this.reviewState){
      this.reviewAttemptId=result.id;
      this.reviewState={};
    }
    const key=`exam-bookmarks:${auth.currentUser?.uid}:${result.examId}`;
    const readBookmarks=()=>{const list=readStored(key,[]);return Array.isArray(list)?list:[];};
    return mountAnswerReview(root,{
      responses:result.responses,
      examId:result.examId,
      state:this.reviewState,
      renderContext:q=>renderQuestionContext(q,{examId:result.examId}),
      toggleReviewMark:async (index, marked)=>{
        const uid=auth.currentUser?.uid;
        if (!uid || this.result!==result || (result.userId && result.userId!==uid)) return false;
        if (this.saving) {
          showToast('Your result is still saving. Try the mark again in a moment.','warning');
          return false;
        }
        this.saving=true;
        try {
          const responses=result.responses.map((question,i)=>i===index?{...question,markedForReview:marked}:question);
          const mistakes=responses.filter(question=>question.status==='wrong');
          const reviewMarksUpdatedAt=Date.now();
          await db.saveAttempt({...result,responses,mistakes,reviewMarksUpdatedAt});
          if (this.result!==result || auth.currentUser?.uid!==uid) return false;
          result.responses[index].markedForReview=marked;
          result.mistakes=mistakes;
          result.reviewMarksUpdatedAt=reviewMarksUpdatedAt;
          refreshInsights();
          return true;
        } catch {
          showToast('This browser could not save the review mark.','error');
          return false;
        } finally {
          this.saving=false;
        }
      },
      bookmarks:readBookmarks(),
      toggleBookmark(id) {
        const list=readBookmarks();
        const updated=list.includes(id)?list.filter(value=>value!==id):[...list,id];
        try {
          localStorage.setItem(key,JSON.stringify(updated));
          return updated;
        } catch {
          showToast('This browser could not update the bookmark.','error');
          return null;
        }
      },
      practise:()=>{
        const questions=result.responses.filter(q=>q.status!=='correct');
        this.startExam({examId:result.examId,questions,title:'Weak topic revision',full:false,minutes:Math.max(1,Math.ceil(questions.length*1.5))});
      }
    });
  },
  renderCbt() {
    const q = this.questions[this.currentIdx];
    const exam = EXAMS[this.pending.examId];
    const buttons = this.questions.map((item, index) => {
      const state = this.questionState(item);
      const current = index === this.currentIdx;
      return `<button type="button" data-question="${index}" class="${state} ${current?'current':''}"
        ${current?'aria-current="step"':''} ${this.allowed(index)?'':'disabled'}
        aria-label="Question ${index+1}, ${paletteLabels[state]}">${index+1}</button>`;
    }).join('');
    return `<section id="exam-root" class="exam-hub cbt-room" data-exam-session aria-label="Exam room">
      <header class="test-room-header">
        <div class="test-room-identity"><span class="test-room-mark" aria-hidden="true">${icon('file')}</span>
        <div><p class="eyebrow">${this.pending.full?'Full mock':'Practice drill'}</p><h1>${h(this.pending.title)}</h1></div></div>
        <div class="test-room-controls">
          <strong id="exam-clock" class="test-room-clock" role="timer">${this.clockText()}</strong>
          ${fullscreenButton()}
          <button id="leave-exam" type="button">Exit test</button>
          <button id="submit-exam" class="test-room-primary" type="button">Submit test</button>
        </div>
      </header>
      <div class="cbt-layout">
        <article class="exam-card cbt-question" tabindex="-1" aria-labelledby="cbt-question-title">
          <div class="test-question-body">
            <p class="cbt-question-meta"><strong>Question ${this.currentIdx+1} of ${this.questions.length}</strong><span>${h(q.section||q.subject||exam.name)} · ${q.marks} mark${q.marks===1?'':'s'}</span></p>
            ${renderQuestionContext(q,{examRoom:true,examId:this.pending.examId})}
            <h2 id="cbt-question-title">${h(q.question)}</h2>
            ${renderAnswerInputs(q,this.answers[q.id],{numericId:'nat-answer'})}
          </div>
          <div class="cbt-question-actions">
            <button id="previous-question" ${this.nextIndex(-1)<0?'disabled':''}>Previous</button>
            <button id="clear-answer">Clear answer</button>
            <button id="mark-review" aria-pressed="${Boolean(this.review[q.id])}">${this.review[q.id]?'Unmark':'Mark'} for review</button>
            <button id="next-question" class="test-room-primary" ${this.nextIndex(1)<0?'disabled':''}>Save & next</button>
          </div>
        </article>
        <aside class="cbt-sidebar">
          <details class="exam-navigation" ${this.paletteOpen?'open':''}>
            <summary>Question palette</summary>
            <div class="cbt-legend">${Object.keys(paletteLabels).map(state=>
              `<span data-cbt-count="${state}" class="${state}"></span>`).join('')}</div>
            <nav class="exam-palette" aria-label="Question navigation">${buttons}</nav>
          </details>
        </aside>
      </div>
    </section>`;
  },
  questionState(q) {
    const answered=!evaluateAnswer(q,this.answers[q.id]).blank;
    if (this.review[q.id]) return answered?'answered-review':'review';
    if (answered) return 'answered';
    return this.visited[q.id] ? 'unanswered' : 'unvisited';
  },
  async init() {
    const loader=document.querySelector('#exam-root[data-load-attempt]');
    if(loader){
      const requested=this.reviewId(), hash=location.hash, uid=auth.currentUser?.uid;
      const {attempts}=await getAttemptRecords().catch(()=>({attempts:[]}));
      if(!loader.isConnected || location.hash!==hash || auth.currentUser?.uid!==uid) return;
      const result=attempts.find(a=>a.id===requested&&Array.isArray(a.responses)&&a.responses.length>0);
      if(!result){
        loader.outerHTML='<section id="exam-root" class="exam-hub"><h1>Result unavailable</h1><p>This attempt could not be loaded from your device or account.</p><a href="#/analytics">Back to attempt history</a></section>';
        return;
      }
      this.result=result;this.ownerId=uid;this.pending=null;this.saveMessage=null;
      this.refresh();
      return;
    }
    document.getElementById('begin-exam')?.addEventListener('click',()=>this.begin());
    document.querySelectorAll('[data-answer]').forEach(el=>el.addEventListener('change',()=>{
      if(!this.canAnswer())return;
      const q=this.questions[this.currentIdx];
      this.answers[q.id]=q.type==='MSQ'?[...document.querySelectorAll('[data-answer]:checked')].map(n=>Number(n.dataset.answer)):Number(el.dataset.answer);
      this.persist();this.updatePalette();
    }));
    document.getElementById('nat-answer')?.addEventListener('input',e=>{if(!this.canAnswer())return;const id=this.questions[this.currentIdx].id;if(e.target.value==='')delete this.answers[id];else this.answers[id]=e.target.value;this.persist();this.updatePalette();});
    document.querySelectorAll('[data-question]').forEach(el=>el.onclick=()=>{
      if(matchMedia('(max-width: 860px)').matches)this.paletteOpen=false;
      this.selectQuestion(Number(el.dataset.question));
    });
    if (this.isTesting) {
      this.updatePalette();
      const palette=document.querySelector('.cbt-room .exam-navigation');
      const current=palette.querySelector('[aria-current="step"]');
      const showCurrent=()=>{
        if(!palette.open||!current)return;
        const nav=current.parentElement;
        nav.scrollTop=Math.max(0,current.offsetTop+current.offsetHeight-nav.clientHeight+9);
      };
      palette.addEventListener('toggle',()=>{
        if(!palette.isConnected)return;
        this.paletteOpen=palette.open;
        showCurrent();
      });
      showCurrent();
    }
    const bind=(id,fn)=>document.getElementById(id)?.addEventListener('click',fn);
    bind('previous-question',()=>this.move(-1));bind('next-question',()=>this.move(1));
    bind('clear-answer',()=>{if(!this.canAnswer())return;delete this.answers[this.questions[this.currentIdx].id];this.persist();this.refresh('clear-answer');});
    bind('mark-review',()=>{if(!this.canAnswer())return;const id=this.questions[this.currentIdx].id;this.review[id]=!this.review[id];this.persist();this.refresh('mark-review');});
    bind('submit-exam',()=>{if(confirm('Submit your answers? Unanswered questions receive zero marks.'))this.submitExam();});
    bind('leave-exam',()=>{
      const examId=this.pending.examId;
      const route=EXAMS[examId].route||EXAM_CATALOG.find(exam=>exam.id===examId)?.route||'exams';
      window.location.hash='#/'+route+'?tab=mocks';
    });
    document.querySelector('[data-exam-fullscreen]')?.addEventListener('click',enterExamFullscreen);
    const reviewRoot=document.getElementById('exam-answer-review');
    if(reviewRoot){
      const insightsRoot=document.getElementById('exam-attempt-insights');
      const refreshInsights=()=>mountAttemptInsights(insightsRoot,this.result,openReview);
      const openReview=this.initAnswerReview(reviewRoot,refreshInsights);
      refreshInsights();
      if (document.querySelector('#exam-root a[href="#/analytics"]')) {
        document.querySelector('#exam-root h1').focus({preventScroll:true});
      }
    }
    bind('open-answer-review',()=>{
      reviewRoot.querySelector('h2').focus({preventScroll:true});
      reviewRoot.scrollIntoView({block:'start'});
    });
    document.getElementById('retry-save')?.addEventListener('click',()=>this.saveResult());
    document.getElementById('export-result')?.addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(this.result,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='GateLabs-result.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
    if(!this.isTesting&&!this.pending&&!this.result)this.restore();
  },
  begin() {
    this.questions=this.pending.questions;this.answers={};this.review={};this.visited={};this.currentIdx=0;
    this.startedAt=Date.now();this.deadline=this.startedAt+this.pending.minutes*60000;this.isTesting=true;
    if (!this.allowed(this.currentIdx)) this.currentIdx=this.nextIndex(1, -1);
    this.visited[this.questions[this.currentIdx].id]=true;
    this.paletteOpen=matchMedia('(min-width: 861px)').matches;
    this.installTimer();this.persist();this.refresh();
    enterExamFullscreen();
    document.querySelector('.cbt-question')?.focus();
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
      this.paletteOpen=matchMedia('(min-width: 861px)').matches;
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
    const states=Object.keys(paletteLabels);
    const counts=Object.fromEntries(states.map(state=>[state,0]));
    document.querySelectorAll('[data-question]').forEach(button=>{
      const index=Number(button.dataset.question), q=this.questions[index];
      const state=this.questionState(q);
      counts[state]++;
      for (const key of states) button.classList.toggle(key,key===state);
      button.setAttribute('aria-label',`Question ${index+1}, ${paletteLabels[state]}`);
    });
    document.querySelectorAll('[data-cbt-count]').forEach(item=>{
      const state=item.dataset.cbtCount;
      item.textContent=`${counts[state]} ${paletteLabels[state]}`;
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
  refresh(restoreFocus){
    const root=document.getElementById('exam-root');
    if(!root)return;
    const scroll=restoreFocus?root.querySelector('.test-question-body')?.scrollTop:0;
    root.outerHTML=this.render();
    this.init();
    if(restoreFocus){
      const question=document.querySelector('.test-question-body');
      if(question)question.scrollTop=scroll??0;
      document.getElementById(restoreFocus)?.focus({preventScroll:true});
    }
  },
  stop(){
    if(this.isTesting)leaveExamFullscreen();
    this.isTesting=false;
    clearInterval(this.timer);
    if(this.unloadHandler)window.removeEventListener('beforeunload',this.unloadHandler);
    this.unloadHandler=null;
  },
  abandon(){this.stop();localStorage.removeItem(this.storageKey());this.pending=null;},
  resetForUser(){if(this.ownerId&&this.ownerId!==auth.currentUser?.uid){this.stop();this.pending=null;this.result=null;this.ownerId=null;}},
  async submitExam(){
    if(!this.isTesting)return;
    const examId=this.pending.examId,activeKey=this.storageKey();
    const durationSeconds=Math.round(this.pending.minutes*60);
    const now=Date.now();
    const timeSpentSeconds=Math.max(0,Math.min(durationSeconds,Math.floor((now-this.startedAt)/1000)));
    const result={...scorePaper(examId,this.questions,this.answers,this.review),examId,ruleVersion:EXAMS[examId].version,mode:this.pending.full?'full':'practice',scope:this.pending.title,timeSpentSeconds,durationSeconds,timestamp:new Date(now).toISOString(),userId:auth.currentUser?.uid};
    if (this.pending.paperKey) result.paperKey=this.pending.paperKey;
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
    finally{
      this.saving=false;
      const status=document.getElementById('result-save-status');
      if(status&&this.result===result&&auth.currentUser?.uid===uid)status.textContent=this.saveMessage||'Saved on this device.';
    }
  }
};
