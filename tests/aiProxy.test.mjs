import test from 'node:test';
import assert from 'node:assert/strict';
import {createHandler} from '../api/gemini.js';
const response=()=>({code:200,headers:{},setHeader(k,v){this.headers[k]=v;},status(c){this.code=c;return this;},json(data){this.body=data;return this;},end(){}});
test('AI proxy denies anonymous access before reaching the provider',async()=>{
  let called=false;const res=response();await createHandler({fetcher:async()=>{called=true;}})({method:'POST',headers:{},body:{}},res);
  assert.equal(res.code,401);assert.equal(called,false);assert.equal(res.headers['Access-Control-Allow-Origin'],undefined);
});
test('AI proxy validates model, text, quota and bounded generation',async()=>{
  const before={...process.env};process.env.GEMINI_API_KEY='test-only';process.env.GEMINI_ALLOWED_MODELS='qa-model';
  try{
    let providerCalls=0;const handler=createHandler({verify:async()=> 'uid',quota:async()=>{},fetcher:async(url,options)=>{providerCalls++;assert.equal(JSON.parse(options.body).generationConfig.maxOutputTokens,2048);return {ok:true,json:async()=>({text:'ok'})};}});
    const req={method:'POST',headers:{authorization:'Bearer fixture'},body:{model:'qa-model',contents:[{parts:[{text:'Hello'}]}]}};
    const good=response();await handler(req,good);assert.equal(good.code,200);
    const invalid=response();await handler({...req,body:{...req.body,model:'not-enabled'}},invalid);assert.equal(invalid.code,400);assert.equal(providerCalls,1);
    const big=response();await handler({...req,body:{contents:[{parts:[{text:'x'.repeat(40000)}]}]}},big);assert.equal(big.code,413);
    const limited=response();await createHandler({verify:async()=> 'uid',quota:async()=>{const e=new Error('limit');e.status=429;throw e;},fetcher:async()=>{providerCalls++;}})(req,limited);assert.equal(limited.code,429);assert.equal(providerCalls,1);
  }finally{for(const k of ['GEMINI_API_KEY','GEMINI_ALLOWED_MODELS']){if(before[k]===undefined)delete process.env[k];else process.env[k]=before[k];}}
});
