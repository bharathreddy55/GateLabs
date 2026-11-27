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
 if(pathname.startsWith('/node_modules/')&&(/\.(woff2?|ttf)$/.test(pathname)||pathname.endsWith('/pdf.worker.min.mjs')&&!url.search)){const file=path.resolve('.'+pathname);if(fs.existsSync(file))return route.fulfill({contentType:pathname.endsWith('.mjs')?'application/javascript':'font/woff2',body:fs.readFileSync(file)});}
 const publicFile=path.resolve('public','.'+pathname);
 if(publicFile.startsWith(path.resolve('public')+path.sep)&&fs.existsSync(publicFile)&&fs.statSync(publicFile).isFile())return route.fulfill({contentType:pathname.endsWith('.json')?'application/json':'text/plain',body:fs.readFileSync(publicFile)});
 try{const transformed=await vite.transformRequest(url.pathname+url.search);if(transformed)return route.fulfill({contentType:'application/javascript',body:transformed.code});}catch(err){console.error(pathname,err.message);}
 return route.fulfill({status:404,body:'Not found'});
});

const syllabus=fs.readFileSync('src/config/firebase.js','utf8').split('export const SUBJECT_SYLLABUS = ')[1];
const fixture=`
export const auth={currentUser:{uid:'qa-user',displayName:'QA Tester',email:'qa@example.invalid'},listeners:[],onAuthStateChanged(fn){this.listeners.push(fn);queueMicrotask(()=>fn(this.currentUser));},async signOut(){this.currentUser=null;this.listeners.forEach(fn=>fn(null));}};
export const SUBJECT_SYLLABUS = ${syllabus}
const read=(key,fallback=[])=>JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));
export const isMockMode=true;
export const db={
getAttempts:async()=>read('gate_attempts:qa-user'),saveAttempt:async a=>{const rows=read('gate_attempts:qa-user');rows.push(a);localStorage.setItem('gate_attempts:qa-user',JSON.stringify(rows));return a;},deleteAttempt:async()=>true,
getSyllabusProgress:async()=>read('gate_syllabus_progress',{}),saveSyllabusProgress:async p=>localStorage.setItem('gate_syllabus_progress',JSON.stringify(p)),getStudyTime:async()=>({Mon:0,Tue:0,Wed:0,Thu:0,Fri:0,Sat:0,Sun:0}),getUnlockedBadges:async()=>[],
getBookmarks:async()=>read('gate_bookmarks'),saveBookmark:async q=>localStorage.setItem('gate_bookmarks',JSON.stringify([...read('gate_bookmarks'),q])),deleteBookmark:async()=>true,
getQuestions:async()=>window.__qaQuestions||[{id:'qa-one',subject:'Algorithms',topic:'Sorting',difficulty:'Easy',type:'MCQ',marks:1,year:2024,question:'Which sort has average O(n log n) comparisons?',options:['Merge sort','Bubble sort','Selection sort','Insertion sort'],correctAnswer:0,explanation:'Merge sort divides and merges.'}],getTopicsBySubject:async()=>['Sorting'],
getCommunityPosts:async()=>read('gate_community_posts'),saveCommunityPost:async p=>{localStorage.setItem('gate_community_posts',JSON.stringify([{...p,id:'qa-post',timestamp:new Date().toISOString(),upvotes:0,replies:[]}]));return p;},upvotePost:async()=>{},addPostReply:async()=>{},addQuestions:async()=>{},addQuestion:async()=>{}
};`;
await context.route('**/src/config/firebase*',route=>route.fulfill({contentType:'application/javascript',body:fixture}));

const page=await context.newPage();page.setDefaultTimeout(10000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
const dir='artifacts/qa-2026-11-17',report={};
const ready=async()=>{await page.waitForFunction(()=>!document.querySelector('.workspace-loading')&&document.querySelector('#app')?.textContent.trim().length>50);await page.waitForFunction(()=>[...document.querySelectorAll('.animate-fade-in')].every(e=>parseFloat(getComputedStyle(e).opacity)>.99));};
page.on('console',m=>{if(m.type()==='warning'||m.type()==='error')console.log(m.text());});
const go=async route=>{await page.goto('http://127.0.0.1:3011/#/'+route);await ready();};
try{
 await go('formulas');
 const deckChoices=page.getByRole('group',{name:'Choose an exam'});
 const formulas=page.locator('.formula-card');
 const topics=page.getByLabel('Topic',{exact:true});
 const stationMaster=deckChoices.getByRole('button',{name:/RRB Station Master/});
 const gate=deckChoices.getByRole('button',{name:/GATE CS & IT/});
 assert.equal(await deckChoices.getByRole('button').count(),4);
 assert.equal(await stationMaster.getAttribute('aria-pressed'),'true');
 assert.equal(await formulas.count(),59);
 const expectedTopics=['All topics','Basic Maths','Basic Science','Logical Capability','Mental Reasoning','Data Analysis'];
 assert.deepEqual(await topics.locator('option').allTextContents(),expectedTopics);
 for(const topic of expectedTopics.slice(1)){
   await topics.selectOption(topic);
   const visible=await page.locator('.formula-card:visible').evaluateAll(nodes=>nodes.map(node=>node.dataset.formulaSubject));
   assert.ok(visible.length>=8 && visible.every(subject=>subject===topic),topic);
 }
 await page.getByRole('textbox',{name:'Search formulas'}).fill('pie sector');
 assert.equal(await page.locator('.formula-card:visible').count(),1);
 const pie=page.locator('.formula-card:visible');
 await pie.locator('summary').click();
 assert.match(await pie.locator('.formula-worked').innerText(),/50 tickets/);
 assert.equal(await pie.getByRole('link',{name:'Detailed notes'}).getAttribute('href'),'#/rrb-station-master?tab=notes&note=data-pie-charts');
 await page.setViewportSize({width:320,height:844});
 for (const dark of [false,true]) {
   await page.evaluate(value=>document.documentElement.classList.toggle('dark',value),dark);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   assert.ok(await topics.evaluate(el=>getComputedStyle(el).backgroundColor===getComputedStyle(el.options[0]).backgroundColor));
 }
 await page.setViewportSize({width:1440,height:1000});

 // Existing saved cards without an exam id belong to GATE.
 await page.evaluate(()=>localStorage.setItem('gate_custom_formulas:qa-user',JSON.stringify([{
   id:'old-card',subject:'Operating Systems',topic:'Scheduling',concept:'Old personal formula',formula:'Legacy formula contents.',isCustom:true
 }])));
 await gate.click();
 assert.equal(await gate.getAttribute('aria-pressed'),'true');
 assert.equal(await formulas.count(),17);
 assert.equal(await page.getByRole('heading',{name:'Old personal formula'}).count(),1);
 assert.equal(await page.getByRole('heading',{name:'Pie charts and sector angles'}).count(),0);
 await page.locator('.katex').first().waitFor();
 const disclosure=page.locator('.formula-card summary').first();await disclosure.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.formula-card details').first().getAttribute('open'),'');await page.keyboard.press('Enter');
 assert.ok(await page.locator('.formula-card').first().evaluate(el=>el.offsetHeight<450));
 assert.equal(await page.getByRole('textbox',{name:'Search formulas'}).count(),1);
 await page.evaluate(()=>{window.__formulaCard=document.querySelector('.formula-card');window.__formulaSearch=document.getElementById('formula-search');window.__formulaCard.querySelector('details').open=true;});
 await page.locator('#formula-search').fill('no-formula-will-match-9281');assert.equal(await page.locator('.formula-card:visible').count(),0);assert.equal(await page.locator('#formula-search-empty').isVisible(),true);
 await page.locator('#formula-search').fill('');assert.equal(await page.evaluate(()=>window.__formulaCard===document.querySelector('.formula-card')&&window.__formulaSearch===document.getElementById('formula-search')&&document.activeElement===window.__formulaSearch&&window.__formulaCard.querySelector('details').open),true);
 await topics.selectOption('Operating Systems');
 assert.equal(await page.locator('.formula-card:visible').count(),4);
 for(const [exam,option,link] of [['APPSC Group 2','Indian Constitution','#/group2?tab=notes'],['SBI Clerk','Numerical Ability','#/sbi-clerk?tab=notes']]){
   await deckChoices.getByRole('button',{name:new RegExp(exam)}).click();
   assert.equal(await formulas.count(),0);
   assert.ok(await page.getByRole('heading',{name:'No formula cards yet'}).isVisible());
   await topics.selectOption(option);
   assert.equal(await page.getByRole('link',{name:'Browse detailed notes'}).getAttribute('href'),link);
 }
 await stationMaster.click();
 assert.equal(await topics.inputValue(),'');
 assert.equal(await formulas.count(),59);
 await topics.selectOption('Basic Science');
 await page.getByRole('button',{name:'Add card',exact:true}).click();
 const dialog=page.getByRole('dialog',{name:'Add a personal card'});
 assert.equal(await dialog.getByLabel('Topic category').inputValue(),'Basic Science');
 await page.keyboard.press('Escape');
 await dialog.waitFor({state:'hidden'});
 await page.getByRole('button',{name:'Add card',exact:true}).click();
 await dialog.getByLabel('Topic name').fill('Motion');
 await dialog.getByLabel('Card title').fill('My personal Station Master formula');
 await dialog.getByLabel('Notes',{exact:true}).fill('Speed is distance divided by time.');
 await dialog.getByRole('button',{name:'Save card'}).click();
 await dialog.waitFor({state:'hidden'});
 assert.equal(await topics.inputValue(),'personal');
 assert.equal(await page.locator('.formula-card:visible').count(),1);
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('gate_custom_formulas:qa-user')));
 assert.equal(saved.at(-1).examId,'rrb');
 await gate.click();
 assert.equal(await page.getByRole('heading',{name:'My personal Station Master formula'}).count(),0);
 await go('formulas?exam=rrb');
 assert.equal(await formulas.count(),60);
 assert.equal(await page.getByRole('heading',{name:'Old personal formula'}).count(),0);
 const result=await page.evaluate(async()=>{
 const {loadPdfDocument}=await import('/src/utils/documentLibraries.js');
 const parts=['%PDF-1.4\n'];const offsets=[0];
 const bodies=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 300] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
 const stream='BT /F1 12 Tf 30 200 Td (Hello PDF) Tj ET';bodies.push('<< /Length '+stream.length+' >>\nstream\n'+stream+'\nendstream');
 bodies.forEach((body,i)=>{offsets.push(parts.join('').length);parts.push((i+1)+' 0 obj\n'+body+'\nendobj\n');});
 const xref=parts.join('').length;parts.push('xref\n0 6\n0000000000 65535 f \n'+offsets.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')+'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF');
 const pdf=await loadPdfDocument(new TextEncoder().encode(parts.join('')));const page=await pdf.getPage(1);const text=(await page.getTextContent()).items.map(x=>x.str).join(' ');await pdf.destroy();
 let readable=false;try{await loadPdfDocument(new Uint8Array([1,2,3]));}catch(error){readable=error.message.includes('Retry the upload');}
 return {text,readable};
 });
 const archived=await page.evaluate(async()=>{const archive=await import('/src/utils/attemptArchive.js'),backup=await import('/src/utils/completeBackup.js');const rows=Array.from({length:35},(_,i)=>({id:'archive-'+i,userId:'archive-alice',score:i,timestamp:new Date(2026,0,i+1).toISOString()}));if(!await archive.writeAttemptArchive('archive-alice',rows))throw Error('Archive write failed');await archive.writeAttemptArchive('archive-bob',[{id:'archive-0',userId:'archive-bob',score:99}]);const exported=await backup.exportCompleteBackup('archive-alice');await backup.importCompleteBackup(exported,'archive-restored');await archive.deleteArchivedAttempt('archive-alice','archive-0');return {alice:(await archive.readAttemptArchive('archive-alice')).length,bob:(await archive.readAttemptArchive('archive-bob'))[0].score,exported:exported.entries['exam-results'].length,restored:(await archive.readAttemptArchive('archive-restored')).length,cache:JSON.parse(localStorage.getItem('exam-results:archive-restored')).length,wrongOwner:await archive.writeAttemptArchive('archive-bob',rows)};});
 assert.deepEqual(archived,{alice:34,bob:99,exported:35,restored:35,cache:20,wrongOwner:false});
 assert.match(result.text,/Hello PDF/);assert.equal(result.readable,true);assert.deepEqual(errors,[]);console.log('PASS exam formula decks, filtering, personal cards, mobile and dark mode, bundled math and PDF extraction');
}finally{await browser.close();await vite.close();}
