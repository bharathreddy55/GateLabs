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
const go=async route=>{await page.goto('http://127.0.0.1:3011/#/'+route);await page.waitForFunction(async()=>{const {router}=await import('/src/main.js');return typeof router==='function';});await page.evaluate(async()=>{const {router}=await import('/src/main.js');await router();});await ready();};
async function assertDropdownContrast(selector, theme){
 const dropdown=page.locator(selector);
 await dropdown.waitFor({state:'attached'});
 const styles=await dropdown.evaluate(select=>{
  const luminance=color=>{
   const channels=color.match(/\d+(?:\.\d+)?/g).slice(0,3).map(channel=>Number(channel)/255)
    .map(channel=>channel<=0.04045?channel/12.92:((channel+0.055)/1.055)**2.4);
   return .2126*channels[0]+.7152*channels[1]+.0722*channels[2];
  };
  const contrasts=Array.from(select.querySelectorAll('option:not(:disabled)'),option=>{
   const style=getComputedStyle(option);
   const a=luminance(style.color), b=luminance(style.backgroundColor);
   return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
  });
  return {scheme:getComputedStyle(select).colorScheme,contrasts};
 });
 assert.equal(styles.scheme,theme,selector);
 assert.ok(styles.contrasts.length>0 && styles.contrasts.every(ratio=>ratio>=4.5),`${selector} has a low-contrast option in ${theme} mode`);
}
try{
 await go('dashboard');
 const delayedAnalytics=async route=>{await new Promise(resolve=>setTimeout(resolve,400));return route.fallback();};
 await context.route('**/src/pages/Analytics.js*',delayedAnalytics);
 await page.goto('http://127.0.0.1:3011/#/analytics');await page.locator('.workspace-loading').waitFor();await ready();
 await context.unroute('**/src/pages/Analytics.js*',delayedAnalytics);
 for(const route of ['dashboard','exams','gate','group2','rrb-station-master','sbi-clerk','study-planner','practice','formulas','assistant','community','about','analytics','pyq-mocks']){await go(route);assert.ok(!await page.getByText('Routing Error',{exact:true}).count(),route);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),route+' overflow');}
 await go('about');assert.equal(await page.locator('#sidebar-container').count(),1);await page.getByRole('heading',{name:'A clear workspace for exam preparation'}).waitFor();
 await go('community');await page.getByRole('heading',{name:'Personal study notes'}).waitFor();assert.equal(await page.getByRole('textbox',{name:'Search personal study notes'}).count(),1);
 await page.locator('#btn-open-doubt-modal').click();await page.waitForFunction(()=>document.getElementById('doubt-post-modal').getAttribute('aria-modal')==='true');await page.keyboard.press('Escape');assert.equal(await page.locator('#doubt-post-modal').isHidden(),true);
 await go('assistant');await page.locator('#assistant-input').fill('What is 2 + 2?');await page.getByRole('button',{name:'Send',exact:true}).click();assert.match(await page.locator('#sub-page-container').innerText(),/Connect an AI provider/);assert.equal(await page.locator('#assistant-input').inputValue(),'What is 2 + 2?');
 await page.setViewportSize({width:320,height:844});await go('group2');const overview=page.locator('[data-prep-tab=overview]');await overview.focus();await page.keyboard.press('End');assert.equal(await page.locator('[data-prep-tab=progress]').getAttribute('aria-selected'),'true');assert.equal(await page.locator('[data-panel=progress]').isVisible(),true);assert.equal(await page.getByRole('button',{name:'Next exam section'}).isVisible(),true);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));assert.ok(await page.locator('#prep-group2').evaluate(el=>el.getBoundingClientRect().right<=innerWidth+1),'Exam workspace must fit inside the viewport');
 await page.locator('#theme-studio-btn').evaluate(el=>el.click());await page.locator('#color-picker-primary').fill('#cc3300');await page.locator('#color-picker-primary').dispatchEvent('input');
 // Apply directly to isolate palette tokens from the settings form's preview state.
 await page.evaluate(async()=>{const {applyAccentPalette}=await import('/src/utils/accentTheme.js');applyAccentPalette({from:'#cc3300',to:'#cc3300',mid:'#cc3300',glow:'rgba(204,51,0,0.25)'});});
 assert.equal(await page.locator('.ui-button.primary').first().evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(204, 51, 0)');await page.keyboard.press('Escape');
 for(const route of ['group2','rrb-station-master','sbi-clerk']){await go(route+'?tab=syllabus');const overflow=await page.locator('[data-panel="syllabus"]').evaluate(panel=>[...panel.querySelectorAll('.surface,p')].filter(el=>el.getClientRects().length&&el.getBoundingClientRect().right>innerWidth+1).map(el=>({tag:el.tagName,class:el.className,width:el.getBoundingClientRect().width,right:el.getBoundingClientRect().right})));assert.deepEqual(overflow,[],route+' syllabus content must fit');}
 await go('rrb-station-master?tab=mocks');assert.equal(await page.locator('[data-countdown="rrb"]').isVisible(),true);
 await page.locator('[data-open-countdown-target]').click();await page.locator('[data-target]').fill((new Date().getUTCFullYear()+1)+'-01-15');await page.locator('[data-target]').dispatchEvent('change');
 assert.equal(await page.locator('.countdown-badge').textContent(),'Personal target');assert.match(await page.locator('.countdown-date').innerText(),/Personal practice target/);assert.match(await page.locator('.countdown-number').innerText(),/^\d+$/);
 await page.locator('[data-clear-target]').click();assert.equal(await page.locator('.countdown-badge').textContent(),'Schedule pending');
 await go('gate');const seconds=await page.locator('[data-clock-value="seconds"]').textContent();
 await page.waitForFunction(previous=>document.querySelector('[data-clock-value="seconds"]').textContent!==previous,seconds);
 assert.equal(await page.locator('[data-clock-value]').count(),4);assert.equal(await page.locator('[role="timer"]').getAttribute('aria-live'),'off');
 await page.setViewportSize({width:1024,height:768});
 for(const theme of ['dark','light']){
  await page.emulateMedia({colorScheme:theme==='dark'?'light':'dark'});
  await go('analytics');
  if(await page.locator('html').evaluate(el=>el.classList.contains('dark'))!==(theme==='dark')){
   await page.getByRole('button',{name:'Toggle light and dark appearance'}).click();
  }
  await assertDropdownContrast('#analytics-exam-filter',theme);
  await assertDropdownContrast('#settings-provider',theme);
  await assertDropdownContrast('#settings-model',theme);
  await go('rrb-station-master?tab=mocks');
  await page.getByText('Filter tests',{exact:true}).click();
  await assertDropdownContrast('[data-paper-filter="type"]',theme);
  await assertDropdownContrast('[data-paper-filter="status"]',theme);
 }
 await go('analytics');
 await page.locator('#analytics-exam-filter').press('ArrowDown');
 await page.waitForFunction(()=>document.getElementById('analytics-exam-filter')?.value==='group2');
 assert.deepEqual(errors,[]);console.log('PASS 14-route smoke, mobile keyboard tabs, live accent tokens, and shared dropdown contrast in both themes');
}finally{await browser.close();await vite.close();}
