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
 if(publicFile.startsWith(path.resolve('public')+path.sep)&&fs.existsSync(publicFile)&&fs.statSync(publicFile).isFile())return route.fulfill({contentType:pathname.endsWith('.json')?'application/json':'text/plain',body:fs.readFileSync(publicFile)});
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
 assert.equal(await page.locator('.home-exams .exam-tile').count(),5);
 await page.screenshot({path:'artifacts/workspace/home-desktop.png',fullPage:true});
 await page.getByRole('link',{name:'Choose an exam',exact:false}).first().click();
 await page.locator('#exam-search').fill('railways');
 assert.equal(await page.locator('.exam-tile:visible').count(),1);
 await page.locator('#exam-search').fill('not-an-exam');
 assert.equal(await page.locator('#exam-search-empty').isVisible(),true);
 await page.locator('#exam-search').fill('');
 for(const route of ['gate','tet-exams','group2','rrb-station-master','sbi-clerk']){
   await page.goto('http://127.0.0.1:3011/#/'+route);
   await page.locator('#prep-'+({'tet-exams':'tet','rrb-station-master':'rrb','sbi-clerk':'sbi'}[route]||route)).waitFor();
   await page.locator('[data-panel]:visible').waitFor();
   assert.equal(await page.locator('[data-panel]:visible').count(),1);
   for(const tab of ['mocks','syllabus','papers','progress','overview']){
     await page.locator('[data-prep-tab='+tab+']').click();
     assert.equal(await page.locator('[data-panel='+tab+']').isVisible(),true);
     assert.equal(await page.locator('[data-panel]:visible').count(),1);
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
 // Signed-out render and existing auth form integration, using an isolated test user.
 await page.evaluate(async()=>{const {auth}=await import('/src/config/firebase.js');auth.currentUser=null;location.hash='#/';});
 await page.getByRole('heading',{name:/Less searching/}).waitFor();
 await page.evaluate(()=>document.documentElement.classList.remove('dark'));
 await page.screenshot({path:'artifacts/workspace/landing-mobile.png',fullPage:true});
 await page.getByRole('button',{name:'Sign in',exact:true}).click();
 assert.equal(await page.locator('#auth-modal').isVisible(),true);
 await page.waitForFunction(()=>document.getElementById('auth-modal').getAttribute('aria-modal')==='true');
 for(let i=0;i<12;i++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.getElementById('auth-modal').contains(document.activeElement)),true);}
 await page.getByRole('button',{name:'Close sign in dialog'}).click();
 assert.deepEqual(errors,[]);
 console.log('PASS: home, search, all five exam workspaces and tabs, preserved SBI library, mobile menu, dark appearance, no horizontal overflow, landing and sign-in dialog. Cloud/auth calls isolated.');
}finally{await browser.close();await vite.close();}
