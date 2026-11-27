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
   const contentType={'.json':'application/json','.svg':'image/svg+xml'}[path.extname(pathname)]||'text/plain';
   return route.fulfill({contentType,body:fs.readFileSync(publicFile)});
 }
 try{const transformed=await vite.transformRequest(url.pathname+url.search);if(transformed)return route.fulfill({contentType:'application/javascript',body:transformed.code});}catch(err){console.error(pathname,err.message);}
 return route.fulfill({status:404,body:'Not found'});
});
// Isolate authentication and persistence boundary; never write test data to production Firebase.
await context.route('**/src/config/firebase*',route=>route.fulfill({contentType:'application/javascript',body:`
export const auth={currentUser:{uid:'exam-test-user',displayName:'Exam Test',email:'test@example.invalid'},onAuthStateChanged(fn){queueMicrotask(()=>fn(this.currentUser));},signOut:async()=>{}};
export const SUBJECT_SYLLABUS={};export const isMockMode=true;
export const db={saveAttempt:async a=>{const key='gate_attempts:exam-test-user';const rows=JSON.parse(localStorage.getItem(key)||'[]');rows.push(a);localStorage.setItem(key,JSON.stringify(rows));return a;},getAttempts:async()=>JSON.parse(localStorage.getItem('gate_attempts:exam-test-user')||'[]'),getBookmarks:async()=>[],getSyllabusProgress:async()=>({}),getQuestions:async()=>[]};
`}));
const page=await context.newPage();const errors=[];page.on('pageerror',err=>errors.push(err.message));
page.on('dialog',dialog=>dialog.accept());
fs.mkdirSync('artifacts/exams',{recursive:true});
try{
 fs.mkdirSync('artifacts/workspace',{recursive:true});
 await page.goto('http://127.0.0.1:3011/#/dashboard');
 await page.getByRole('heading',{name:'Welcome back, Exam.'}).waitFor();
 await page.evaluate(()=>{
   localStorage.setItem('last-exam:exam-test-user','tet');
   localStorage.setItem('exam-active:exam-test-user',JSON.stringify({pending:{examId:'tet'}}));
   localStorage.setItem('exam-results:exam-test-user',JSON.stringify([
     {id:'retired-attempt',examId:'tet',scope:'AP TET Model',score:100,timestamp:new Date().toISOString()}
   ]));
 });
 await page.goto('http://127.0.0.1:3011/#/tet-exams?tab=mocks');
 await page.waitForURL('**/#/dashboard');
 await page.reload();
 await page.getByRole('heading',{name:'Welcome back, Exam.'}).waitFor();
 assert.equal(await page.getByRole('link',{name:'Resume test'}).count(),0);
 assert.equal(await page.getByText(/AP TET/i).count(),0);
 for(const asset of ['public/pyqs/tet_practice_1.txt','public/notes/tet','public/notes/visuals/tet']) {
   assert.equal(fs.existsSync(asset),false);
 }
 assert.equal(await page.locator('.home-exams .exam-tile').count(),4);
 await page.screenshot({path:'artifacts/workspace/home-desktop.png',fullPage:true});
 await page.getByRole('link',{name:'Choose an exam',exact:false}).first().click();
 await page.locator('#exam-search').fill('railways');
 assert.equal(await page.locator('.exam-tile:visible').count(),1);
 await page.locator('#exam-search').fill('not-an-exam');
 assert.equal(await page.locator('#exam-search-empty').isVisible(),true);
 await page.locator('#exam-search').fill('AP TET');
 assert.equal(await page.locator('.exam-tile:visible').count(),0);
 await page.locator('#exam-search').fill('');
 for(const route of ['gate','group2','rrb-station-master','sbi-clerk']){
   await page.goto('http://127.0.0.1:3011/#/'+route);
   await page.locator('#prep-'+({'rrb-station-master':'rrb','sbi-clerk':'sbi'}[route]||route)).waitFor();
   await page.locator('[data-panel]:visible').waitFor();
   assert.equal(await page.locator('[data-panel]:visible').count(),1);
   assert.equal(await page.locator('.countdown-spotlight').isVisible(),true);
   assert.equal(await page.locator('[data-clock-value]').count(),4);
   await page.locator('[data-prep-tab=notes]').click();
   const notesTab=page.locator('[data-panel=notes]');
   await notesTab.locator('[data-note-id]').first().click();
   await notesTab.getByRole('heading',{name:route==='rrb-station-master'?'Methods and when to use them':'Worked example',exact:true}).waitFor();
   assert.ok(await notesTab.getByRole('link',{name:'Open in Notion'}).isVisible());
   const visual=notesTab.getByRole('img',{name:/Visual study guide for/});
   await visual.waitFor();
   assert.ok(await visual.evaluate(img=>img.naturalWidth>0));
   const noteId=new URLSearchParams(new URL(page.url()).hash.split('?')[1]).get('note');
   const examId={'rrb-station-master':'rrb','sbi-clerk':'sbi'}[route]||route;
   assert.equal(await visual.getAttribute('src'),`http://127.0.0.1:3011/notes/visuals/${examId}/${noteId}.svg`);
   if(route==='rrb-station-master'){
     await notesTab.locator('[data-note-id="lcm-hcf"]').click();
     const reader=notesTab.locator('[data-note-reader]');
     await reader.getByRole('heading',{name:'Basics first',exact:true}).waitFor();
     await reader.getByRole('columnheader',{name:'Use this rule',exact:true}).waitFor();
     await reader.locator('.exam-note-picture',{hasText:'cutting all three ropes with one ruler'}).waitFor();
     const calculation=reader.locator('li > br + code',{hasText:'9,999 − 39 = 9,960'});
     await calculation.waitFor();
     assert.match(await calculation.locator('..').innerText(),/Subtract that excess/);

     const syllabus=page.locator('[data-panel=syllabus]');
     const progress=page.locator('[data-panel=progress]');
     const revised=reader.getByRole('checkbox',{name:'Mark this note revised'});
     const checkCoverage=async (count,percent)=>{
       assert.equal(await syllabus.locator('[data-section-progress="0"]').textContent(),count+'/20 revised');
       assert.equal(await progress.locator('[data-section-progress="0"]').textContent(),count+'/20 revised');
       assert.equal(await syllabus.locator('#syllabus-percent').textContent(),percent+'% complete');
       assert.equal(await progress.locator('[data-progress-percent]').textContent(),percent+'%');
       assert.equal(await syllabus.locator('.syllabus-progress>div').evaluate(bar=>bar.style.width),percent+'%');
     };
     await checkCoverage(0,0);
     await revised.check();
     await checkCoverage(1,3);
     await page.reload();
     await reader.getByRole('heading',{name:'Basics first',exact:true}).waitFor();
     assert.ok(await revised.isChecked());
     await checkCoverage(1,3);

     await page.locator('[data-prep-tab=syllabus]').click();
     await syllabus.locator('.syllabus-section summary').first().click();
     const lcm=syllabus.locator('[data-syllabus-note-revised="lcm-hcf"]');
     const lcmTopic=syllabus.locator('[data-topic="0-9"]');
     const manualTopic=syllabus.locator('[data-topic="0-0"]');
     const algebra=syllabus.locator('[data-syllabus-note-revised="algebra"]');
     const equations=syllabus.locator('[data-syllabus-note-revised="linear-equations"]');
     assert.ok(await lcm.isChecked());
     assert.ok(await syllabus.locator('label:has([data-topic="0-9"]) [data-topic-note-coverage]').isVisible());
     await lcmTopic.check();
     await checkCoverage(1,3);
     await lcmTopic.uncheck();
     await checkCoverage(1,3);
     await manualTopic.check();
     await checkCoverage(2,5);
     await algebra.check();
     await checkCoverage(2,5);
     await equations.check();
     await checkCoverage(3,8);
     await algebra.uncheck();
     await lcm.uncheck();
     await checkCoverage(1,3);
     assert.ok(await manualTopic.isChecked());

     const otherTab=await context.newPage();
     try{
       await otherTab.goto('http://127.0.0.1:3011/notes/rrb/lcm-hcf.md');
       await otherTab.evaluate(()=>localStorage.setItem('exam-note-progress:exam-test-user:rrb',JSON.stringify(['lcm-hcf'])));
       await page.waitForFunction(()=>document.querySelector('[data-progress-percent]').textContent==='5%');
       assert.ok(await lcm.isChecked());
       await checkCoverage(2,5);
     }finally{
       await otherTab.close();
     }
     await lcm.uncheck();
     await manualTopic.uncheck();
     await checkCoverage(0,0);
   }
   if(route==='gate'){assert.match(await page.locator('.countdown-date').innerText(),/2027-02-06/);assert.equal(await page.locator('.countdown-badge').textContent(),'Official exam window');assert.notEqual(await page.locator('.countdown-number').innerText(),'—');assert.match(await page.locator('.countdown-hint').innerText(),/CS-specific/);}
   assert.ok(await page.locator('.countdown-spotlight').evaluate(el=>el.getBoundingClientRect().top<document.querySelector('.prep-tab-strip').getBoundingClientRect().top),'Countdown must precede the tabs');
   for(const tab of ['mocks','syllabus','notes','papers','progress','overview']){
     await page.locator('[data-prep-tab='+tab+']').click();
     assert.equal(await page.locator('[data-panel='+tab+']').isVisible(),true);
     assert.equal(await page.locator('[data-panel]:visible').count(),1);
     assert.equal(await page.locator('.countdown-spotlight').isVisible(),true);
   }
   if(route==='group2'){
     await page.locator('[data-prep-tab=syllabus]').click();
     await page.locator('.syllabus-section').first().locator('summary').click();
     await page.getByRole('button',{name:'Read notes for Indus Valley Civilisation'}).click();
     const reader=page.locator('[data-note-reader]');
     await reader.getByRole('heading',{name:'Worked example'}).waitFor();
     assert.match(await reader.getByRole('link',{name:'Open in Notion'}).getAttribute('href'),/^https:\/\/app\.notion\.com\//);
     assert.match(page.url(),/tab=notes&note=indus-civilisation$/);
     await reader.getByRole('checkbox',{name:'Mark this note revised'}).check();
     await page.locator('[data-notes-search]').fill('Human Development');
     assert.ok(await page.locator('[data-note-section]').getByRole('button',{name:'Human Development',exact:true}).isVisible());
     await page.locator('[data-notes-search]').fill('Jainism');
     assert.equal(await page.locator('[data-note-section] button:visible').count(),1);
     await page.reload();
     await reader.getByRole('heading',{name:'Worked example'}).waitFor();
     assert.equal(await reader.getByRole('checkbox',{name:'Mark this note revised'}).isChecked(),true);
     await page.locator('[data-prep-tab=progress]').click();
     assert.match(await page.locator('[data-note-progress]').textContent(),/^1 of \d+ notes revised$/);
     await page.locator('[data-prep-tab=syllabus]').click();
     await page.locator('.syllabus-section').first().locator('summary').click();
     const revised=page.getByRole('checkbox',{name:'Mark Indus Valley Civilisation revised'});
     assert.equal(await revised.isChecked(),true);
     await revised.uncheck();
     await page.getByRole('button',{name:'Read notes for Indus Valley Civilisation'}).click();
     await reader.getByRole('heading',{name:'Worked example'}).waitFor();
     assert.equal(await reader.getByRole('checkbox',{name:'Mark this note revised'}).isChecked(),false);
   }
 }
 await page.locator('[data-prep-tab=mocks]').click();
 assert.equal(await page.locator('.paper-card').count(),18);
 assert.equal(await page.locator('[data-paper]:disabled').count(),0);
 await page.goto('http://127.0.0.1:3011/#/group2?tab=mocks');
 await page.locator('[data-panel=mocks]').waitFor();
 await page.screenshot({path:'artifacts/workspace/mock-library-desktop.png',fullPage:false});
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Open navigation',exact:true}).click();
 assert.equal(await page.locator('.app-shell').evaluate(el=>el.classList.contains('navigation-open')),true);
 await page.waitForFunction(()=>document.querySelector('.app-main').inert);
 for(let i=0;i<25;i++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.getElementById('sidebar-container').contains(document.activeElement)),true);}
 await page.waitForFunction(()=>Math.abs(document.getElementById('sidebar-container').getBoundingClientRect().left)<1);
 await page.screenshot({path:'artifacts/workspace/mobile-navigation.png',fullPage:false});
 await page.locator('.sidebar-link[href="#/dashboard"]').click();
 await page.getByRole('heading',{name:'Welcome back, Exam.'}).waitFor();
 assert.equal(await page.locator('#mobile-menu-toggle').getAttribute('aria-expanded'),'false');
 assert.equal(await page.locator('#sidebar-backdrop').isHidden(),true);
 await page.locator('#layout-theme-toggle').click();
 await page.screenshot({path:'artifacts/workspace/home-mobile-dark.png',fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 await page.goto('http://127.0.0.1:3011/#/rrb-station-master');await page.locator('.prep-tabs').waitFor();
 await page.locator('[data-prep-tab=syllabus]').click();
 await page.screenshot({path:'artifacts/workspace/syllabus-mobile-dark.png',fullPage:false});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 await page.goto('http://127.0.0.1:3011/#/rrb-station-master?tab=notes&note=work-power-energy');
 const handnote=page.locator('[data-note-content]');
 await handnote.getByRole('heading',{name:'Methods and when to use them',exact:true}).waitFor();
 const workCard=page.getByRole('img',{name:'Visual study guide for Work, Power and Energy'});
 await workCard.waitFor();
 assert.ok(await workCard.evaluate(img=>img.naturalWidth===480&&img.getBoundingClientRect().right<=innerWidth));
 assert.equal(await handnote.locator('ol').count(),5);
 await handnote.locator('li > br + code',{hasText:'400 ÷ 0.80 = 500 W'}).waitFor();
 await handnote.getByRole('columnheader',{name:'Use this rule'}).waitFor();
 assert.match(await handnote.innerText(),/500 W input/);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 await page.goto('http://127.0.0.1:3011/#/rrb-station-master?tab=notes&note=time-and-work');
 const missingContributor=handnote.getByRole('heading',{name:'Method C · Solve for a missing contributor'});
 await missingContributor.waitFor();
 const methodCues=handnote.locator('.exam-note-method-use');
 assert.equal(await methodCues.count(),3);
 assert.match(await methodCues.last().innerText(),/Time and Work \/ Pipes and Cisterns questions when the working time of one person or pipe is unknown/);
 assert.equal(await methodCues.last().evaluate(el=>el.previousElementSibling.previousElementSibling.textContent),'Method C · Solve for a missing contributor');
 await handnote.getByRole('heading',{name:'Type 1 · Recover a worker’s rate',exact:true}).waitFor();
 await handnote.locator('.exam-note-key-rule',{hasText:'Unknown rate = combined rate − known rate'}).waitFor();
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 await page.goto('http://127.0.0.1:3011/#/rrb-station-master?tab=notes&note=lcm-hcf');
 await handnote.getByRole('heading',{name:'Method E · HCF and LCM of fractions and decimals',exact:true}).waitFor();
 await handnote.getByRole('heading',{name:'Type 4 · LCM of decimals',exact:true}).waitFor();
 await handnote.getByRole('columnheader',{name:'Formula or steps'}).waitFor();
 await handnote.locator('.exam-note-key-rule',{hasText:'Decimal LCM = LCM of the scaled integers'}).waitFor();
 assert.match(await handnote.innerText(),/Answer: 3\.6\./);
 await page.goto('http://127.0.0.1:3011/#/sbi-clerk?tab=notes&note=english-reading');
 const readingGuide=page.getByRole('img',{name:'Visual study guide for English Reading Comprehension'});
 await readingGuide.waitFor();
 await page.getByRole('heading',{name:'Concepts in depth',exact:true}).waitFor();
 await page.getByRole('heading',{name:'How to apply it',exact:true}).waitFor();
 assert.ok(await readingGuide.evaluate(img=>img.naturalWidth>0&&img.getBoundingClientRect().right<=innerWidth));
 const guideLink=page.getByRole('link',{name:/Open full-size recall card/});
 assert.equal(await guideLink.getAttribute('target'),'_blank');
 assert.match(await guideLink.getAttribute('href'),/\/notes\/visuals\/sbi\/english-reading\.svg$/);
 // Signed-out render and existing auth form integration, using an isolated test user.
 await page.evaluate(async()=>{const {auth}=await import('/src/config/firebase.js');auth.currentUser=null;location.hash='#/';});
 await page.getByRole('heading',{name:'Prepare for your next exam.'}).waitFor();
 await page.evaluate(()=>document.documentElement.classList.remove('dark'));
 await page.screenshot({path:'artifacts/workspace/landing-mobile.png',fullPage:true});
 await page.getByRole('button',{name:'Sign in',exact:true}).click();
 assert.equal(await page.locator('#auth-modal').isVisible(),true);
 await page.waitForFunction(()=>document.getElementById('auth-modal').getAttribute('aria-modal')==='true');
 for(let i=0;i<12;i++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.getElementById('auth-modal').contains(document.activeElement)),true);}
 await page.getByRole('button',{name:'Close sign in dialog'}).click();
 assert.deepEqual(errors,[]);
 console.log('PASS: home, search, all four exam workspaces and tabs, preserved SBI library, mobile menu, dark appearance, no horizontal overflow, landing and sign-in dialog. Cloud/auth calls isolated.');
}finally{await browser.close();await vite.close();}
