import { verifyBearer, consumeQuota, RequestError } from '../server/aiSecurity.js';

export function createHandler({verify=verifyBearer,quota=consumeQuota,fetcher=fetch}={}){
  return async function handler(req,res){
    res.setHeader('Cache-Control','no-store');
    const origin=req.headers?.origin;
    const allowed=(process.env.APP_ORIGINS||'').split(',').map(s=>s.trim()).filter(Boolean);
    if(origin&&!allowed.includes(origin))return res.status(403).json({error:'Origin is not allowed.'});
    if(origin){res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');res.setHeader('Access-Control-Allow-Headers','Authorization, Content-Type');res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');}
    if(req.method==='OPTIONS')return res.status(204).end();
    if(req.method!=='POST')return res.status(405).json({error:'Method not allowed.'});
    try{
      const uid=await verify(req.headers?.authorization);
      const body=req.body;
      if(!body||typeof body!=='object'||Buffer.byteLength(JSON.stringify(body))>32768)throw new RequestError(413,'Request must be JSON smaller than 32 KB.');
      if(!Array.isArray(body.contents)||!body.contents.length||body.contents.length>20||body.contents.some(c=>!Array.isArray(c.parts)||!c.parts.length||c.parts.some(p=>typeof p.text!=='string'||!p.text.trim())))throw new RequestError(400,'Provide text-only conversation content.');
      const key=process.env.GEMINI_API_KEY;
      const models=(process.env.GEMINI_ALLOWED_MODELS||'').split(',').map(s=>s.trim()).filter(Boolean);
      const model=body.model||process.env.GEMINI_MODEL||models[0];
      if(!key||!models.length)throw new RequestError(503,'AI provider is not configured.');
      if(!models.includes(model)||!/^[a-zA-Z0-9._-]+$/.test(model))throw new RequestError(400,'This model is not enabled.');
      await quota(uid);
      const response=await fetcher(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify({contents:body.contents,generationConfig:{maxOutputTokens:2048}}),signal:AbortSignal.timeout(20000)});
      if(!response.ok)throw new RequestError(response.status===429?429:502,'The AI provider could not complete this request. Please retry.');
      return res.status(200).json(await response.json());
    }catch(error){return res.status(error.status||503).json({error:error instanceof RequestError?error.message:'AI service is temporarily unavailable. Please retry.'});}
  };
}
export default createHandler();
