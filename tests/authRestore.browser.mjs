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

const cold=await browser.newContext();
await cold.route('**/*',async route=>{
 const url=new URL(route.request().url());if(url.hostname!=='127.0.0.1')return route.abort();const pathname=decodeURIComponent(url.pathname);
 if(pathname.startsWith('/src/config/firebase'))return route.fulfill({contentType:'application/javascript',body:fixture.replace("currentUser:{uid:'qa-user',displayName:'QA Tester',email:'qa@example.invalid'}",'currentUser:null').replace('queueMicrotask(()=>fn(this.currentUser));',"setTimeout(()=>{this.currentUser={uid:'qa-user',displayName:'QA Tester',email:'qa@example.invalid'};fn(this.currentUser);},500);")});
 if(pathname==='/@vite/client')return route.fulfill({contentType:'application/javascript',body:'const styles=new Map();export function updateStyle(id,content){let n=styles.get(id);if(!n){n=document.createElement("style");styles.set(id,n);document.head.append(n);}n.textContent=content;}export function removeStyle(){}export function createHotContext(){return {accept(){},prune(){}}}'});
 if(pathname==='/')return route.fulfill({contentType:'text/html',body:await vite.transformIndexHtml('/',fs.readFileSync('index.html','utf8'))});
 const file=path.resolve('public','.'+pathname);if(file.startsWith(path.resolve('public')+path.sep)&&fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({contentType:pathname.endsWith('.json')?'application/json':'text/plain',body:fs.readFileSync(file)});
 const transformed=await vite.transformRequest(url.pathname+url.search);return transformed?route.fulfill({contentType:'application/javascript',body:transformed.code}):route.fulfill({status:404,body:'Missing'});
});
try{const page=await cold.newPage();await page.goto('http://127.0.0.1:3011/#/group2?tab=mocks');await page.waitForFunction(()=>document.querySelector('[data-panel=mocks]')&&!document.querySelector('[data-panel=mocks]').hidden);assert.equal(await page.evaluate(()=>location.hash),'#/group2?tab=mocks');const result={requested:'#/group2?tab=mocks',landed:await page.evaluate(()=>location.hash),expected:'Original exam deep link after auth restoration'};console.log(JSON.stringify(result));}finally{await browser.close();await vite.close();}
