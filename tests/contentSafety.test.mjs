import {readStored} from '../src/utils/safeStorage.js';
import {renderStudyText} from '../src/utils/studyText.js';
import {renderAnswerInputs,readAnswer,answerLabel,renderQuestionContext} from '../src/components/QuestionView.js';
import {evaluateAnswer} from '../src/utils/examEngine.js';
import {parseExamText,validateStudyQuestion,questionId} from '../src/utils/parseExamText.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { escapeHtml } from '../src/utils/examEngine.js';
import { renderFormulaCard } from '../src/components/FormulaCard.js';

async function page(name,db={}) {
  const context=vm.createContext({console,localStorage:{getItem:()=>null},window:{location:{hash:''}},Date,JSON,Math,URLSearchParams});
  const exports={exportCompleteBackup(){},importCompleteBackup(){},renderMath(){},loadPdfDocument(){},readStored:(key,fallback)=>structuredClone(fallback),renderStudyText,renderAnswerInputs,readAnswer,answerLabel,renderQuestionContext,evaluateAnswer,parseExamText,validateStudyQuestion,questionId,userStorageKey:k=>k+':test',db,auth:{currentUser:{uid:'test'}},SUBJECT_SYLLABUS:{},escapeHtml,showToast(){},getTheme:()=> 'light',getApiKey:()=>null,generateContent(){},Chart:class{}};
  const dependency=new vm.SyntheticModule(Object.keys(exports),function(){for(const [k,v] of Object.entries(exports))this.setExport(k,v);},{context});
  const module=new vm.SourceTextModule(fs.readFileSync(`src/pages/${name}.js`,'utf8'),{context});
  await module.link(()=>dependency);await module.evaluate();return module.namespace[name];
}
const attack='<img src=x onerror="window.marker=1">';
test('community posts and quoted attributes cannot introduce HTML',async()=>{
  const p=await page('Community');
  const html=p.renderListView([{id:'x',author:attack,category:'All',title:attack,content:attack,timestamp:new Date().toISOString(),replies:[]}]);
  assert.ok(!html.includes('<img'));assert.ok(html.includes('&lt;img'));
});
test('assistant user and provider messages remain text',async()=>{
  const p=await page('Assistant');
  for(const role of ['user','model'])assert.ok(!p.renderMessageBubble({role,text:attack}).includes('<img'));
});
test('custom formulas cannot inject markup through title, body or LaTeX attributes',()=>{
  const html=renderFormulaCard({id:'custom-test',subject:attack,topic:attack,concept:attack,mathLatex:attack,formula:attack});
  assert.ok(!html.includes('<img'));assert.ok(html.includes('&lt;img'));
});
test('practice questions and options remain text',async()=>{
  const p=await page('Practice',{getQuestions:async()=>[{id:'x',subject:attack,topic:attack,question:attack,options:[attack,'B','C','D'],correctAnswer:0,explanation:attack}],getBookmarks:async()=>[]});
  p.isApplied=true;const html=await p.render();assert.ok(!html.includes('<img'));assert.ok(html.includes('&lt;img'));
});
