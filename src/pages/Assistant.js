import {auth} from '../config/firebase';
import {escapeHtml as h} from '../utils/examEngine.js';
import {renderStudyText} from '../utils/studyText.js';
import {getApiKey,generateContent} from '../utils/aiService.js';

export const Assistant={
  messages:[{role:'model',text:'Ask a study question. Connect your preferred AI provider in AI settings to get an answer.'}],draft:'',pending:false,error:'',lastPrompt:'',
  render(){return `<section class="workspace-page assistant-workspace"><header class="page-heading"><div><span class="eyebrow">Study support</span><h1>Study assistant</h1><p>Work through concepts and questions. Check important answers against your study material.</p></div><button class="ui-button" id="assistant-settings">AI settings</button></header><div class="notice" role="status">${getApiKey()?'AI provider connected. Responses may contain mistakes.':'No AI provider connected. Add your own key in AI settings before asking a question.'}</div>${this.error?`<div class="notice" role="alert">${h(this.error)}${this.lastPrompt&&getApiKey()?'<button id="retry-assistant">Retry question</button>':''}</div>`:''}<div id="chat-messages-container" class="surface assistant-messages" aria-live="polite">${this.messages.map(m=>this.renderMessageBubble(m)).join('')}${this.pending?'<p role="status">Getting a response…</p>':''}</div><form id="assistant-form" class="surface assistant-compose"><label for="assistant-input">Your question</label><div class="button-row"><input id="assistant-input" type="text" value="${h(this.draft)}" placeholder="Ask a question or paste a problem…" ${this.pending?'disabled':''} required><button class="ui-button primary" type="submit" ${this.pending?'disabled':''}>${this.pending?'Waiting…':'Send'}</button></div></form></section>`;},
  renderMessageBubble(msg){return `<article class="assistant-message ${msg.role==='user'?'from-user':''}"><strong>${msg.role==='user'?'You':'Study assistant'}</strong><div class="study-rich">${msg.role==='user'?h(msg.text):renderStudyText(msg.text)}</div></article>`;},
  init(){
    document.getElementById('assistant-settings')?.addEventListener('click',()=>document.getElementById('settings-btn')?.click());
    document.getElementById('assistant-form')?.addEventListener('submit',event=>{event.preventDefault();this.send(document.getElementById('assistant-input').value);});
    document.getElementById('retry-assistant')?.addEventListener('click',()=>this.send(this.lastPrompt));
  },
  refresh(){const root=document.getElementById('sub-page-container');if(root&&location.hash.split('?')[0]==='#/assistant'){root.innerHTML=this.render();this.init();const list=document.getElementById('chat-messages-container');list.scrollTop=list.scrollHeight;}},
  async send(value){
    const text=String(value||'').trim();if(!text||this.pending)return;
    this.draft=text;this.lastPrompt=text;this.error='';
    if(!getApiKey()){this.error='Connect an AI provider in AI settings. Your question is kept below.';this.refresh();return;}
    const uid=auth.currentUser?.uid;this.pending=true;
    if(this.messages.at(-1)?.role!=='user'||this.messages.at(-1).text!==text)this.messages.push({role:'user',text});
    this.refresh();
    try{
      const result=await generateContent('Explain this study question clearly. State uncertainty instead of guessing; preserve mathematical notation.\n\n'+text);
      if(auth.currentUser?.uid!==uid)return;
      if(!result?.text?.trim())throw new Error('The provider returned no answer.');
      this.messages.push({role:'model',text:result.text});this.draft='';
    }catch(error){if(auth.currentUser?.uid===uid)this.error=`No answer was generated. ${error.message||'The provider is unavailable.'} Your question is kept for retry.`;}
    finally{this.pending=false;if(auth.currentUser?.uid===uid)this.refresh();}
  }
};
