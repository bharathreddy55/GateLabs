import {chromium,launchOptions} from './browserRuntime.mjs';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
// In-memory Vite transport keeps browser verification usable in socket-restricted workspaces.
const vite=await createServer({server:{middlewareMode:true,hmr:false,open:false},optimizeDeps:{noDiscovery:true}});
const browser=await chromium.launch(launchOptions);
const context=await browser.newContext({viewport:{width:1440,height:1000}});
await context.route('**/*',async route=>{
 const url=new URL(route.request().url());
 if(url.hostname!=='127.0.0.1')return route.abort();
 const pathname=decodeURIComponent(url.pathname);
 if(pathname==='/@vite/client')return route.fulfill({contentType:'application/javascript',body:'const styles=new Map();export function updateStyle(id,content){let node=styles.get(id);if(!node){node=document.createElement("style");styles.set(id,node);document.head.append(node);}node.textContent=content;}export function removeStyle(){}export function injectQuery(url,query){return url+(url.includes("?")?"&":"?")+query;}export function createHotContext(){return {accept(){},prune(){}}}'});
 if(pathname==='/')return route.fulfill({contentType:'text/html',body:await vite.transformIndexHtml('/',fs.readFileSync('index.html','utf8'))});
 if(pathname.startsWith('/node_modules/')&&/\.(woff2?|ttf)$/.test(pathname)){const file=path.resolve('.'+pathname);if(fs.existsSync(file))return route.fulfill({contentType:'font/woff2',body:fs.readFileSync(file)});}
 const publicFile=path.resolve('public','.'+pathname);
 if(publicFile.startsWith(path.resolve('public')+path.sep)&&fs.existsSync(publicFile)&&fs.statSync(publicFile).isFile()){
   const contentType={'.json':'application/json','.svg':'image/svg+xml','.png':'image/png'}[path.extname(pathname)]||'text/plain';
   return route.fulfill({contentType,body:fs.readFileSync(publicFile)});
 }
 try{const transformed=await vite.transformRequest(url.pathname+url.search);if(transformed)return route.fulfill({contentType:'application/javascript',body:transformed.code});}catch(err){console.error(pathname,err.message);}
 return route.fulfill({status:404,body:'Not found'});
});
// Isolate authentication and persistence boundary; never write test data to production Firebase.
await context.route('**/src/config/firebase*',route=>route.fulfill({contentType:'application/javascript',body:`
export const auth={currentUser:{uid:'exam-test-user',displayName:'Exam Test',email:'test@example.invalid'},onAuthStateChanged(fn){queueMicrotask(()=>fn(this.currentUser));},signOut:async()=>{}};
export const SUBJECT_SYLLABUS={};export const isMockMode=true;
const gateQuestions=[
  {id:'gate-nat',year:'2025',subject:'Algorithms',topic:'A',type:'NAT',question:'What is 3 plus 4?',natMin:6.9,natMax:7.1,marks:1},
  {id:'gate-msq',year:'2025',subject:'Algorithms',topic:'B',type:'MSQ',question:'Select the even numbers.',options:['2','3','4','5'],correctOptions:[0,2],marks:2,
    questionImage:'/questions/figures/gate-2022-q10.png',imageAlt:'Test question diagram'}
];
export const db={saveAttempt:async a=>{const key='gate_attempts:exam-test-user';const rows=JSON.parse(localStorage.getItem(key)||'[]');rows.push(a);localStorage.setItem(key,JSON.stringify(rows));return a;},getAttempts:async()=>JSON.parse(localStorage.getItem('gate_attempts:exam-test-user')||'[]'),getBookmarks:async()=>[],getSyllabusProgress:async()=>({}),getQuestions:async()=>gateQuestions};
`}));
const page=await context.newPage();const errors=[];page.on('pageerror',err=>errors.push(err.message));
page.on('dialog',dialog=>dialog.accept());
fs.mkdirSync('artifacts/exams',{recursive:true});
async function checkExamRoom(){
 await page.locator('[data-exam-session]').waitFor();
 assert.equal(await page.locator('#sidebar-container').isHidden(),true);
 assert.equal(await page.locator('#layout-header').isHidden(),true);
 assert.ok(await page.locator('[data-exam-session]').evaluate(room=>{
  const bounds=room.getBoundingClientRect();
  return Math.abs(bounds.left)<=1 && Math.abs(bounds.top)<=1 && bounds.width>=innerWidth-1 && bounds.height>=innerHeight-1;
 }));
}
async function openPalette(){
 const palette=page.locator('.cbt-room .exam-navigation');
 if(await palette.getAttribute('open')===null) await palette.locator('summary').click();
}
try{
 await page.goto('http://127.0.0.1:3011/#/group2');
 await page.getByRole('heading',{name:'APPSC Group 2',exact:true}).waitFor();
 assert.match(await page.locator('[data-countdown="group2"]').innerText(),/2027-02-21/);
 await page.locator('.target-settings summary').click();
 await page.locator('[data-target]').fill('2027-01-15');await page.locator('[data-target]').dispatchEvent('change');
 await page.locator('[data-prep-tab=syllabus]').click();
 await page.locator('.syllabus-section summary').first().click();
 await page.locator('[data-topic]').first().check();
 await page.locator('[data-prep-tab=overview]').click();
 await page.screenshot({path:'artifacts/exams/group2-desktop.png',fullPage:false});
 await page.locator('[data-prep-tab=mocks]').click();
 await page.getByRole('button',{name:'Start full mock'}).first().click();
 await page.getByRole('button',{name:'Begin test',exact:true}).click();
 await checkExamRoom();
 if(await page.evaluate(()=>document.fullscreenEnabled)){
  await page.waitForFunction(()=>document.fullscreenElement?.id==='app');
 }
 assert.equal(await page.locator('[data-cbt-count="unanswered"]').textContent(),'1 unanswered');
 assert.equal(await page.locator('[data-cbt-count="unvisited"]').textContent(),'149 not visited');
 const [groupPaper]=JSON.parse(fs.readFileSync('public/exams/group2.json'));
 await page.locator(`[data-answer="${groupPaper.questions[0].correctAnswer}"]`).check();
 assert.equal(await page.locator('[data-question="0"]').evaluate(el=>el.classList.contains('answered')),true);
 assert.match(await page.locator('[data-question="0"]').getAttribute('aria-label'),/answered/);
 await page.getByRole('button',{name:'Save & next',exact:true}).click();
 await checkExamRoom();
 if(await page.evaluate(()=>document.fullscreenEnabled)){
  assert.equal(await page.evaluate(()=>document.fullscreenElement?.id),'app');
  await page.evaluate(()=>document.exitFullscreen());
  await checkExamRoom();
  await page.getByRole('button',{name:'Full screen'}).click();
  await page.waitForFunction(()=>document.fullscreenElement?.id==='app');
 }
 await page.locator(`[data-answer="${(groupPaper.questions[1].correctAnswer+1)%4}"]`).check();
 await page.getByRole('button',{name:'Mark for review',exact:true}).click();
 assert.equal(await page.locator('[data-cbt-count="review"]').textContent(),'1 marked for review');
 const deadline=await page.evaluate(()=>JSON.parse(localStorage.getItem('exam-active:exam-test-user')).deadline);
 await page.reload();await page.locator('#exam-clock').waitFor();
 await checkExamRoom();
 assert.equal(await page.locator('[data-cbt-count="review"]').textContent(),'1 marked for review');
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('exam-active:exam-test-user')).deadline),deadline);
 await page.getByRole('button',{name:'Submit test',exact:true}).click();
 await page.getByRole('heading',{name:'Exam complete',exact:true}).waitFor();
 await page.waitForFunction(()=>!document.fullscreenElement && document.getElementById('layout-header').getClientRects().length>0);
 let result=await page.evaluate(()=>JSON.parse(localStorage.getItem('exam-results:exam-test-user'))[0]);
 assert.ok(Math.abs(result.score-2/3)<1e-10);assert.equal(result.skippedCount,148);assert.equal(result.wrongCount,1);
 assert.equal(await page.evaluate(()=>localStorage.getItem('exam-active:exam-test-user')),null);
 const review=page.locator('.answer-review');
 const filterReview=async (filter,count)=>{
  await review.locator(`[data-review-filter="${filter}"]`).click();
  assert.equal(await review.locator('[data-review-question]').count(),count);
 };
 await review.getByRole('heading',{name:'Answer review',exact:true}).waitFor();
 await page.getByRole('button',{name:'Review answers',exact:true}).click();
 assert.equal(await page.evaluate(()=>document.activeElement?.id),'answer-review-heading');
 assert.equal(await review.locator('.review-card').count(),1);
 assert.equal(await review.locator('.review-steps li').count(),3);
 await review.locator('summary').click();
 assert.match(await review.locator('.review-choices').innerText(),/Correct · selected/);
 await review.locator('[data-bookmark]').click();
 assert.equal(await review.locator('[data-bookmark]').getAttribute('aria-pressed'),'true');
 await filterReview('wrong',1);
 assert.match(await review.locator('.review-question-meta').innerText(),/Question 2 of 150[\s\S]+−0.33/);
 await filterReview('skipped',148);
 await review.getByRole('button',{name:'Next',exact:true}).click();
 assert.match(await review.locator('.review-question-meta').innerText(),/Question 4 of 150/);
 await filterReview('bookmarked',1);
 await review.locator('[data-bookmark]').click();
 await review.getByRole('heading',{name:'No questions match this filter'}).waitFor();
 await review.getByRole('button',{name:'Show all answers',exact:true}).click();
 assert.equal(await review.locator('[data-review-question]').count(),150);
 if(process.env.GATELABS_REVIEW_SCREENSHOTS)await review.screenshot({path:path.join(process.env.GATELABS_REVIEW_SCREENSHOTS,'review-desktop.png')});
 assert.equal(await page.locator('#practise-weak').isEnabled(),true);
 await page.getByRole('link',{name:'Return to preparation'}).click();
 await page.locator('#prep-group2').waitFor();
 assert.equal(await page.locator('[data-topic]').first().isChecked(),true);
 assert.equal(await page.locator('[data-target]').inputValue(),'2027-01-15');
 await page.locator('[data-prep-tab=progress]').click();
 await page.locator('[data-attempt]').first().click();await page.getByRole('heading',{name:'Exam complete',exact:true}).waitFor();
 assert.match(await page.evaluate(()=>location.hash),/attempt=/);
 await page.reload();await page.getByRole('heading',{name:'Exam complete',exact:true}).waitFor();
 await review.getByRole('heading',{name:'Worked solution',exact:true}).waitFor();
 await page.goto('http://127.0.0.1:3011/#/rrb-station-master');await page.locator('#prep-rrb').waitFor();
 assert.match(await page.locator('[data-countdown="rrb"]').innerText(),/Awaiting official/);
 assert.equal(await page.locator('[data-target]').inputValue(),'');
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(()=>document.documentElement.classList.add('dark'));
 await page.locator('#prep-rrb').scrollIntoViewIfNeeded();
 await page.screenshot({path:'artifacts/exams/rrb-mobile-dark.png',fullPage:false});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Mobile page must not overflow horizontally');
 await page.locator('[data-prep-tab=mocks]').click();
 await page.getByRole('button',{name:'Start full mock'}).first().click();
 await page.evaluate(()=>Object.defineProperty(document.getElementById('app'),'requestFullscreen',{
  configurable:true,value:()=>Promise.reject(new Error('Fullscreen unavailable in this frame')),
 }));
 await page.getByRole('button',{name:'Begin test',exact:true}).click();
 await checkExamRoom();
 assert.equal(await page.evaluate(()=>document.fullscreenElement),null);
 await page.evaluate(()=>delete document.getElementById('app').requestFullscreen);
 assert.match(await page.locator('#exam-clock').innerText(),/120:00|119:5/);
 assert.equal(await page.locator('.cbt-room .exam-navigation').getAttribute('open'),null);
 await openPalette();
 await page.locator('[data-question="30"]').click();
 await page.locator('.exam-figure svg').waitFor();
 assert.ok(await page.locator('.cbt-layout').evaluate(el=>el.getBoundingClientRect().right<=innerWidth));
 await page.locator('#exam-root').scrollIntoViewIfNeeded();
 await page.screenshot({path:'artifacts/exams/rrb-chart-mobile.png',fullPage:false});
 await page.evaluate(async()=>{const {MockTest}=await import('/src/pages/ExamRunner.js');MockTest.deadline=Date.now()-1;MockTest.tick();});
 await page.getByRole('heading',{name:'Exam complete',exact:true}).waitFor();
 result=await page.evaluate(()=>JSON.parse(localStorage.getItem('exam-results:exam-test-user')).find(a=>a.examId==='rrb'));
 assert.equal(result.score,0);assert.equal(result.skippedCount,100);
 await page.goto('http://127.0.0.1:3011/#/rrb-station-master?tab=mocks');
 const stationTests=page.locator('[data-mock-list]');
 await stationTests.getByRole('heading',{name:'All tests',exact:true}).waitFor();
 assert.equal(await stationTests.locator('[data-paper-group="full"]:visible').count(),10);
 assert.equal(await stationTests.locator('[data-paper-group="drills"]:visible').count(),10);
 assert.match(await page.locator('[data-mock-jump="subjects"]').innerText(),/80 tests across 4 subjects/);
 assert.equal(await page.locator('.mock-picks').getByText(/Practice model [23]/).count(),0);
 for(const model of [2,3,10]){
   const card=stationTests.locator('[data-library-card]').filter({hasText:`Practice model ${model}`});
   assert.match(await card.innerText(),/100 questions · 100 marks · 120 min/);
   await card.getByRole('button',{name:'Start full mock'}).click();
   await page.getByRole('button',{name:'Begin test',exact:true}).click();
   assert.equal(await page.locator('[data-question]').count(),100);
   const wrongAnswer=await page.evaluate(async()=>{const {MockTest}=await import('/src/pages/ExamRunner.js');return (MockTest.questions[0].correctAnswer+1)%4;});
   await page.locator(`[data-answer="${wrongAnswer}"]`).check();
   await page.getByRole('button',{name:'Submit test',exact:true}).click();
   await page.getByRole('heading',{name:'Exam complete',exact:true}).waitFor();
   assert.match(await page.locator('#exam-root').innerText(),/0 correct · 1 wrong · 99 unanswered/);
   assert.match(await page.locator('#exam-root').innerText(),/Marks deducted\s+0\.33/);
   await page.goto('http://127.0.0.1:3011/#/rrb-station-master?tab=mocks');
   await stationTests.getByRole('heading',{name:'All tests',exact:true}).waitFor();
 }
 // Exercise actual legacy text parser and separately timed SBI rule in the browser.
 await page.goto('http://127.0.0.1:3011/#/sbi-clerk?tab=mocks');
 await page.getByRole('button',{name:'Start full mock'}).first().click();
 await page.getByRole('button',{name:'Begin test',exact:true}).click();
 const wrongSbi=await page.evaluate(async()=>{const {MockTest}=await import('/src/pages/ExamRunner.js');return (MockTest.questions[0].correctAnswer+1)%4;});
 await page.locator(`[data-answer="${wrongSbi}"]`).check();
 await openPalette();
 await page.locator('[data-question="23"]').click();
 assert.match(await page.locator('#cbt-question-title').innerText(),/PRUDENT[\s\S]+\(A\)[\s\S]+\(B\)[\s\S]+\(C\)/);
 await openPalette();
 await page.locator('[data-question="24"]').click();
 assert.match(await page.locator('#cbt-question-title').innerText(),/FIRST sentence after rearrangement/);
 const sharedParagraph = await page.locator('.cbt-question blockquote').innerText();
 assert.match(sharedParagraph,/\(A\)[\s\S]+\(E\) Small neighborhood vendors/);
 await openPalette();
 await page.locator('[data-question="25"]').click();
 assert.equal(await page.locator('.cbt-question blockquote').innerText(),sharedParagraph);
 assert.equal(await page.locator('[data-question="30"]').isDisabled(),true);
 await page.evaluate(async()=>{const {MockTest}=await import('/src/pages/ExamRunner.js');MockTest.startedAt=Date.now()-20*60000-1000;MockTest.tick();});
 assert.equal(await page.locator('[data-question="0"]').isDisabled(),true);
 assert.equal(await page.locator('[data-question="30"]').isDisabled(),false);
 await page.getByRole('button',{name:'Submit test',exact:true}).click();
 await page.getByRole('heading',{name:'Exam complete',exact:true}).waitFor();
 result=await page.evaluate(()=>JSON.parse(localStorage.getItem('exam-results:exam-test-user')).find(a=>a.examId==='sbi'));
 assert.equal(result.score,-.25);
 await page.goto('http://127.0.0.1:3011/#/pyq-mocks');
 await page.getByRole('button',{name:/Start CBT practice/}).click();
 await page.getByRole('button',{name:'Begin test',exact:true}).click();
 await page.locator('#nat-answer').fill('7');
 await page.getByRole('button',{name:'Save & next',exact:true}).click();
 await page.getByRole('img',{name:'Test question diagram'}).waitFor();
 await page.waitForFunction(()=>document.querySelector('.cbt-question img')?.naturalWidth>0);
 await page.locator('[data-answer="0"]').check();
 await page.locator('[data-answer="2"]').check();
 await page.getByRole('button',{name:'Submit test',exact:true}).click();
 await page.getByRole('heading',{name:'Exam complete',exact:true}).waitFor();
 result=await page.evaluate(()=>JSON.parse(localStorage.getItem('exam-results:exam-test-user')).find(a=>a.examId==='gate'));
 assert.equal(result.score,3);
 assert.equal(result.mode,'practice');
 await review.getByRole('heading',{name:'Accepted range',exact:true}).waitFor();
 assert.match(await review.locator('.review-answers').innerText(),/6\.9 to 7\.1/);
 await review.getByRole('button',{name:'Next',exact:true}).click();
 await review.getByRole('img',{name:'Test question diagram'}).waitFor();
 assert.equal(await review.locator('.review-answer').last().locator('li').count(),2);
 await page.goto('http://127.0.0.1:3011/#/group2');
 await page.getByRole('navigation',{name:'Group 2 stage'}).getByRole('link',{name:'Mains'}).click();
 await page.locator('#prep-group2-mains-1').waitFor();
 assert.match(await page.locator('.countdown-badge').textContent(),/Schedule pending/);
 await page.locator('[data-prep-tab=papers]').click();
 assert.ok(await page.getByRole('link',{name:/2025 Mains · Paper I, Series A/}).isVisible());
 await page.locator('[data-prep-tab=mocks]').click();
 await page.getByRole('button',{name:'Start full mock'}).click();
 await page.getByRole('button',{name:'Begin test',exact:true}).click();
 assert.equal(await page.locator('[data-question]').count(),150);
 await page.getByRole('button',{name:'Submit test',exact:true}).click();
 await page.getByRole('heading',{name:'Exam complete',exact:true}).waitFor();
 await page.getByRole('link',{name:'Return to preparation'}).click();
 await page.locator('#prep-group2-mains-1').waitFor();
 await page.getByRole('navigation',{name:'Mains paper'}).getByRole('link',{name:'Paper II'}).click();
 await page.locator('#prep-group2-mains-2').waitFor();
 await page.locator('[data-prep-tab=notes]').click();
 await page.locator('[data-panel=notes] [data-note-id]').first().click();
 await page.getByRole('img',{name:/Visual study guide for National Income/}).waitFor();
 await page.locator('[data-prep-tab=mocks]').click();
 assert.ok(await page.getByRole('button',{name:'Start CBT drill'}).first().isVisible());
 await page.getByRole('button',{name:'Start full mock'}).click();
 await page.getByRole('button',{name:'Begin test',exact:true}).click();
 assert.equal(await page.locator('[data-question]').count(),150);
 const wrongMains=await page.evaluate(async()=>{const {MockTest}=await import('/src/pages/ExamRunner.js');return (MockTest.questions[0].correctAnswer+1)%4;});
 await page.locator(`[data-answer="${wrongMains}"]`).check();
 await page.getByRole('button',{name:'Submit test',exact:true}).click();
 await page.getByRole('heading',{name:'Exam complete',exact:true}).waitFor();
 result=await page.evaluate(()=>JSON.parse(localStorage.getItem('exam-results:exam-test-user')).find(a=>a.examId==='group2-mains-2'));
 assert.equal(result.score,-1/3);
 assert.equal(result.skippedCount,149);
 await page.getByRole('link',{name:'Return to preparation'}).click();
 await page.locator('#prep-group2-mains-2').waitFor();
 await page.goto('http://127.0.0.1:3011/#/analytics');await page.locator('#analytics-exam-filter').waitFor();
 await page.locator('#analytics-exam-filter').selectOption('group2');
 await page.locator('#analytics-exam-filter').waitFor();
 assert.equal(await page.locator('#analytics-exam-filter').inputValue(),'group2');
 for(const exam of ['rrb-station-master','group2','group2/mains','group2/mains/paper-2','gate']){
   await page.goto(`http://127.0.0.1:3011/#/${exam}?tab=mocks`);
   await page.locator('[data-mock-jump="drills"]').click();
   assert.equal(await page.getByRole('heading',{name:'Challenge & short drills',exact:true}).count(),1);
   assert.equal(await page.locator('.mock-paper-grid [data-paper-group="full"]:visible').count(),0);
   const challenge=page.locator('[data-paper-type="Challenge drill"]');
   await challenge.getByRole('button',{name:'Start CBT drill'}).click();
   await page.getByRole('button',{name:'Begin test',exact:true}).click();
   await page.locator('[data-answer="0"]').check();
   if(exam==='gate'){
     await openPalette();
     await page.locator('[data-question="5"]').click();
     await page.locator('[data-answer="0"]').check();
     await openPalette();
     await page.locator('[data-question="6"]').click();
     await page.locator('#nat-answer').fill('2');
   }
   await page.getByRole('button',{name:'Submit test',exact:true}).click();
   await page.getByRole('heading',{name:'Exam complete',exact:true}).waitFor();
   if(exam==='gate'){
     assert.match(await page.locator('#exam-root').innerText(),/1 correct · 2 wrong/);
     assert.match(await page.locator('#exam-root').innerText(),/Marks deducted\s+0\.67/);
   }
 }
 await page.setViewportSize({width:360,height:800});
 for(const [route,subjectCount] of [['rrb-station-master',4],['group2',5],['group2/mains',2],['group2/mains/paper-2',2],['gate',3],['sbi-clerk',3]]){
   await page.goto(`http://127.0.0.1:3011/#/${route}?tab=mocks`);
   const library=page.locator('[data-panel=mocks] .mock-test-library');
   await library.getByRole('heading',{name:'Quick start'}).waitFor();
   await library.locator('.mock-tile[data-mock-jump="subjects"]').click();
   assert.equal(await library.locator('.mock-subject:visible').count(),subjectCount);
   assert.equal(await library.locator('[data-mock-papers]').isHidden(),true);
   assert.ok(await library.evaluate(el=>el.scrollWidth<=el.clientWidth+1),`${route} mock library overflows`);
   await library.getByRole('button',{name:'Show all tests'}).click();
   assert.ok(await library.locator('[data-mock-papers]').isVisible());
 }
 await page.goto('http://127.0.0.1:3011/#/rrb-station-master?tab=mocks');
 await page.getByRole('button',{name:/Related past papers/}).click();
 assert.equal(await page.locator('[data-related-papers] a:visible').count(),10);
 await page.getByRole('tab',{name:'Mock tests'}).click();
 await page.locator('.mock-tile[data-mock-jump="subjects"]').click();
 const dataDrills=page.locator('.mock-subject').filter({has:page.locator('summary').getByText('Data Analysis',{exact:true})});
 assert.match(await dataDrills.locator('summary').innerText(),/20 tests/);
 await dataDrills.locator('summary').click();
 await dataDrills.getByRole('button',{name:'Start subject test'}).first().click();
 assert.deepEqual(await page.locator('.exam-summary-metrics dt').allTextContents(),['Questions','Minutes','Marks']);
 assert.deepEqual(await page.locator('.exam-summary-metrics dd').allTextContents(),['30','36','30']);
 await page.getByRole('button',{name:'Begin test',exact:true}).click();
 assert.equal(await page.locator('[data-question]').count(),30);
 await page.getByRole('button',{name:'Submit test',exact:true}).click();
 await page.getByRole('heading',{name:'Exam complete',exact:true}).waitFor();
 await page.goto('http://127.0.0.1:3011/#/rrb-station-master');
 await page.getByRole('tab',{name:'Mock tests'}).click();
 await page.getByRole('link',{name:/Stage 2 · CBAT.*10 practice sets/}).click();
 await page.getByRole('heading',{name:'Computer Based Aptitude Test'}).waitFor();
 assert.equal(await page.locator('[data-cbat-start]').count(),10);
 await page.getByRole('button',{name:'Detailed notes & syllabus'}).click();
 await page.getByRole('heading',{name:'CBAT syllabus guide'}).waitFor();
 assert.equal(await page.locator('[data-cbat-lesson]:visible').count(),5);
 assert.equal(await page.locator('#cbat-practice').isHidden(),true);
 await page.getByRole('button',{name:'Spatial Scanning',exact:true}).click();
 await page.getByText(/House 2\. The upper route/).waitFor();
 await page.getByRole('heading',{name:'Concepts in depth'}).waitFor();
 const recallCard=page.getByRole('img',{name:'Visual study guide for Spatial Scanning'});
 await recallCard.waitFor();
 await page.waitForFunction(()=>document.querySelector('[data-cbat-lesson="spatial"] img').naturalWidth>0);
 assert.equal(await page.locator('[data-cbat-lesson="spatial"]').getAttribute('open'),'');
 await page.reload();
 await page.getByRole('heading',{name:'CBAT Detailed notes'}).waitFor();
 await page.getByRole('button',{name:'Practice sets',exact:true}).click();
 await page.getByRole('button',{name:'Read Intelligence notes'}).click();
 await page.getByText(/Figure C\. Figure B is a quarter-turn/).waitFor();
 await page.getByRole('button',{name:'Practice sets',exact:true}).click();
 await page.getByRole('button',{name:'Start Intelligence Set 1'}).click();
 await checkExamRoom();
 assert.equal(await page.locator('#cbat-practice svg.cbat-shape').count(),5);
 assert.ok((await page.locator('#cbat-practice svg.cbat-shape').first().boundingBox()).width>=48);
 assert.ok(await page.locator('[data-cbat-view="notes"]').isHidden());
 assert.ok(await page.locator('[data-cbat-view="notes"]').isDisabled());
 await page.getByRole('button',{name:'Figure 1'}).click();
 await page.getByRole('button',{name:'Next',exact:true}).click();
 await page.getByRole('button',{name:'Previous',exact:true}).click();
 assert.equal(await page.locator('[data-cbat-option="0"]').getAttribute('aria-pressed'),'true');
 await page.getByRole('button',{name:'Submit battery'}).click();
 await page.getByRole('heading',{name:'Intelligence results'}).waitFor();
 await page.waitForFunction(()=>!document.fullscreenElement && document.getElementById('layout-header').getClientRects().length>0);
 assert.ok(await page.getByRole('button',{name:'Detailed notes & syllabus'}).isEnabled());
 await review.getByRole('heading',{name:'Correct answer',exact:true}).waitFor();
 assert.equal(await review.locator('.review-answers .cbat-shape').count(),2);
 assert.equal(await review.locator('.review-steps li').count(),3);
 assert.equal(await review.locator('.review-steps').evaluate(el=>getComputedStyle(el).listStyleType),'none');
 await filterReview('skipped',11);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth),false);
 if(process.env.GATELABS_REVIEW_SCREENSHOTS){
  await page.evaluate(()=>document.documentElement.classList.add('dark'));
  await review.screenshot({path:path.join(process.env.GATELABS_REVIEW_SCREENSHOTS,'review-mobile.png')});
 }
 await page.getByRole('button',{name:'Back to batteries'}).click();
 await page.clock.install();
 await page.getByRole('button',{name:'Start Spatial Scanning Set 2'}).click();
 await page.getByRole('img',{name:/Street map/}).waitFor();
 await page.clock.fastForward(245_000);
 await page.getByText(/Time is up/).waitFor();
 await review.getByRole('img',{name:'Street map highlighting the shortest route from A to B'}).waitFor();
 await page.getByRole('button',{name:'Back to batteries'}).click();
 await page.getByRole('button',{name:'Start Personality Set 1'}).click();
 await page.locator('[data-cbat-option="0"]').click();
 await page.getByRole('button',{name:'Submit battery'}).click();
 await page.getByText(/1\/8 completed/).waitFor();
 assert.equal(await review.count(),0);
 await page.reload();
 await page.getByText('Set 1 · 1/8 completed').waitFor();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth),false);
 await page.getByRole('link',{name:'Stage 1 · CBT'}).click();
 await page.locator('#prep-rrb').waitFor();
 assert.deepEqual(errors,[]);
 console.log('PASS: CBT across all four exams, challenge drills and GATE marking, Station Master CBAT timing and results, Group 2 Mains routes, mobile layout and SBI locks. Firebase is stubbed.');
}finally{await browser.close();await vite.close();}
