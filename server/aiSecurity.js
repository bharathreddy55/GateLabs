export class RequestError extends Error {
  constructor(status,message){super(message);this.status=status;}
}
export async function verifyBearer(header,fetcher=fetch){
  const token=String(header||'').match(/^Bearer ([A-Za-z0-9._-]+)$/)?.[1];
  if(!token)throw new RequestError(401,'Sign in before using the AI service.');
  const project=process.env.FIREBASE_PROJECT_ID,key=process.env.FIREBASE_WEB_API_KEY;
  if(!project||!key)throw new RequestError(503,'Authentication service is not configured.');
  let claims;try{claims=JSON.parse(Buffer.from(token.split('.')[1],'base64url').toString());}catch{throw new RequestError(401,'Invalid authentication token.');}
  if(claims.aud!==project||claims.iss!==`https://securetoken.google.com/${project}`||!claims.sub||claims.exp<=Date.now()/1000)throw new RequestError(401,'Authentication token expired or belongs to another project.');
  // Google's Auth service validates the token; decoded claims alone are never trusted.
  const response=await fetcher(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(key)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:token}),signal:AbortSignal.timeout(8000)});
  const data=await response.json();const user=data.users?.[0];
  if(!response.ok||!user||user.disabled||user.localId!==claims.sub)throw new RequestError(401,'Please sign in again.');
  return user.localId;
}
export async function consumeQuota(uid,fetcher=fetch){
  const url=process.env.UPSTASH_REDIS_REST_URL,token=process.env.UPSTASH_REDIS_REST_TOKEN;
  if(!url||!token)throw new RequestError(503,'AI rate limiting is not configured.');
  const script="local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]); end; return n";
  const response=await fetcher(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(['EVAL',script,'1',`gatelabs:ai:${uid}`,'60']),signal:AbortSignal.timeout(5000)});
  const data=await response.json();
  if(!response.ok||data.error||!Number.isFinite(data.result))throw new RequestError(503,'AI quota service is unavailable.');
  if(data.result>10)throw new RequestError(429,'Too many requests. Try again in one minute.');
}
