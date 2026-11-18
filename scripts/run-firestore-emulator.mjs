// Pinned official Firestore emulator; only the local demo project is used.
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import net from 'node:net';import {createHash} from 'node:crypto';import {spawn} from 'node:child_process';
import {pipeline} from 'node:stream/promises';import {Readable} from 'node:stream';
const version='1.22.0',filename=`cloud-firestore-emulator-v${version}.jar`,sha256='9b6498b7f62714d67f48f59b3818883cd682dbcd46b9f59511de81c97bb5166c';
async function verified(file){if(!fs.existsSync(file))return false;const hash=createHash('sha256');for await(const chunk of fs.createReadStream(file))hash.update(chunk);return hash.digest('hex')===sha256;}
const local=path.resolve('.firebase/emulators',filename),existing=path.join(os.homedir(),'.cache/firebase/emulators',filename);
let jar=await verified(existing)?existing:local;
if(!await verified(jar)){
 console.log('Downloading pinned official Firestore emulator…');fs.mkdirSync(path.dirname(local),{recursive:true});
 const response=await fetch(`https://storage.googleapis.com/firebase-preview-drop/emulator/${filename}`,{signal:AbortSignal.timeout(120000)});
 if(!response.ok)throw Error('Emulator download failed: '+response.status);
 const temporary=local+'.download';await pipeline(Readable.fromWeb(response.body),fs.createWriteStream(temporary));
 if(!await verified(temporary)){fs.unlinkSync(temporary);throw Error('Emulator checksum mismatch; download rejected.');}fs.renameSync(temporary,local);jar=local;
}
const host='127.0.0.1',port=18080;
const listening=()=>new Promise(resolve=>{const socket=net.connect({host,port});let done=false;const finish=value=>{if(done)return;done=true;socket.destroy();resolve(value);};socket.setTimeout(250,()=>finish(false));socket.once('connect',()=>finish(true));socket.once('error',()=>finish(false));});
if(await listening())throw Error('Test port 18080 is occupied. Stop the existing emulator or service before retrying.');
const java=process.env.JAVA_HOME?path.join(process.env.JAVA_HOME,'bin',process.platform==='win32'?'java.exe':'java'):'java';
console.log('Starting checksum-verified Firestore emulator for demo-gatelabs…');
fs.mkdirSync('.firebase',{recursive:true});
const log=fs.openSync(path.resolve('.firebase/firestore.log'),'a');
const emulator=spawn(java,['-jar',jar,'--host',host,'--port',String(port),'--rules',path.resolve('firestore.rules'),'--project_id','demo-gatelabs','--single_project_mode','true'],{stdio:['ignore',log,log],windowsHide:true});
let startupError;emulator.once('error',error=>startupError=error);
const stop=()=>{if(emulator.exitCode===null)emulator.kill();};process.once('SIGINT',stop);process.once('SIGTERM',stop);
try{
 const deadline=Date.now()+30000;while(!await listening()){if(startupError)throw Error('Java 21+ is required: '+startupError.message);if(emulator.exitCode!==null||Date.now()>deadline)throw Error('Emulator did not start. Check .firebase/firestore.log.');await new Promise(resolve=>setTimeout(resolve,200));}
 const tests=spawn(process.execPath,['tests/firestore.rules.mjs'],{stdio:'inherit',windowsHide:true,env:{...process.env,FIRESTORE_EMULATOR_HOST:host+':'+port,GCLOUD_PROJECT:'demo-gatelabs'}});
 process.exitCode=await new Promise((resolve,reject)=>{tests.once('error',reject);tests.once('exit',code=>resolve(code??1));});
}finally{stop();fs.closeSync(log);process.removeListener('SIGINT',stop);process.removeListener('SIGTERM',stop);}
