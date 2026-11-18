import {invalidateAttemptHistory} from '../utils/attemptCache.js';
import {readAttemptArchive,writeAttemptArchive,deleteArchivedAttempt,compactAttemptCache} from '../utils/attemptArchive.js';
import {loadPublishedQuestions,filterQuestionBank} from '../utils/questionBank.js';
import {readStored} from '../utils/safeStorage.js';
import {parseExamText,validateStudyQuestion} from '../utils/parseExamText.js';
// Firebase configuration and mock fallback system
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  getDoc, 
  query, 
  where
} from "firebase/firestore";

// Initialize LocalStorage with mock data if empty
function initializeMockDb() {
  if (!localStorage.getItem('gate_users')) {
    localStorage.setItem('gate_users', JSON.stringify({}));
  }
  if (!localStorage.getItem(attemptStorageKey())) {
    localStorage.setItem(attemptStorageKey(), JSON.stringify([]));
  }
  if (!localStorage.getItem(personalStorageKey('gate_study_time'))) {
    localStorage.setItem(personalStorageKey('gate_study_time'), JSON.stringify({
      "Mon": 2.5, "Tue": 3.2, "Wed": 1.8, "Thu": 4.0, "Fri": 2.0, "Sat": 5.5, "Sun": 3.0
    }));
  }
}

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbDTRuGPBV3VrKAFAGPX6VtpiDFrREWaA",
  authDomain: "free-mocks-d1989.firebaseapp.com",
  projectId: "free-mocks-d1989",
  storageBucket: "free-mocks-d1989.firebasestorage.app",
  messagingSenderId: "84465796425",
  appId: "1:84465796425:web:1cb043b0e62ed4b505c698",
  measurementId: "G-XEDG1BBT2S"
};

function networkAvailable(){return typeof navigator==='undefined'||navigator.onLine!==false;}
function boundedWrite(operation,ms=5000){let timer;return Promise.race([operation,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Cloud sync timed out')),ms);})]).finally(()=>clearTimeout(timer));}
function personalStorageKey(base){const uid=(useMock?readStored('gate_current_user',null)?.uid:authInstance?.currentUser?.uid)||'anonymous';return base+':'+uid;}
function attemptStorageKey(){
  const uid=(useMock ? readStored('gate_current_user',null)?.uid : authInstance?.currentUser?.uid) || 'anonymous';
  return 'gate_attempts:'+uid;
}
let useMock = true;
let app;
let authInstance;
let firestore;

// Attempt to load standard Firebase library
// If config has placeholders, fail initialization gracefully to use Mocks
const hasRealConfig = firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY";

if (hasRealConfig) {
  try {
    console.log("Firebase credentials detected. Connecting to Firebase services...");
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    firestore = getFirestore(app);
    if (typeof window !== "undefined") {
      const startAnalytics=()=>import('firebase/analytics').then(async ({getAnalytics,isSupported})=>{if(await isSupported())getAnalytics(app);}).catch(()=>{});
      if(window.requestIdleCallback)window.requestIdleCallback(startAnalytics,{timeout:3000});else setTimeout(startAnalytics,1500);
    }
    useMock = false;

  } catch (error) {
    console.error("Firebase init failed, switching to mock database mode:", error);
    useMock = true;
  }
} else {
  console.log("Using Mock Database mode (LocalStorage). Please configure Firebase in `src/config/firebase.js` for production.");
  initializeMockDb();
}

// Mock Authentication API
const mockAuth = {
  currentUser: null,
  listeners: [],
  onAuthStateChanged(callback) {
    this.listeners.push(callback);
    // Trigger immediately with current user
    const loggedUser = readStored('gate_current_user',null);
    this.currentUser = loggedUser;
    callback(loggedUser);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  },
  signUp(email, password, displayName) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = readStored('gate_users',{});
        if (users[email]) {
          reject(new Error("Email already registered."));
          return;
        }
        const newUser = { email, displayName, uid: 'usr_' + Math.random().toString(36).substr(2, 9) };
        users[email] = { ...newUser, password };
        localStorage.setItem('gate_users', JSON.stringify(users));
        this.currentUser = newUser;
        localStorage.setItem('gate_current_user', JSON.stringify(newUser));
        this.listeners.forEach(cb => cb(newUser));
        resolve(newUser);
      }, 800);
    });
  },
  signIn(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = readStored('gate_users',{});
        const user = users[email];
        if (!user || user.password !== password) {
          reject(new Error("Invalid email or password."));
          return;
        }
        const loggedUser = { email: user.email, displayName: user.displayName, uid: user.uid };
        this.currentUser = loggedUser;
        localStorage.setItem('gate_current_user', JSON.stringify(loggedUser));
        this.listeners.forEach(cb => cb(loggedUser));
        resolve(loggedUser);
      }, 800);
    });
  },
  signOut() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = null;
        localStorage.removeItem('gate_current_user');
        this.listeners.forEach(cb => cb(null));
        resolve();
      }, 300);
    });
  }
};

// Plain text question parser
function parseTextQuestions(text){return parseExamText(text).filter(q=>validateStudyQuestion(q).length===0);}

// Scan database and merge custom topics/subtopics into static SUBJECT_SYLLABUS
export function mergeCustomTopicsIntoSyllabus(questions) {
  questions.forEach(q => {
    if (!q.subject || !SUBJECT_SYLLABUS[q.subject]) return;
    
    const subjectSyllabus = SUBJECT_SYLLABUS[q.subject];
    // Create a generic folder for custom topics in the subject syllabus
    if (!subjectSyllabus["Custom Subtopics"]) {
      subjectSyllabus["Custom Subtopics"] = [];
    }
    
    const customList = subjectSyllabus["Custom Subtopics"];
    if (q.topic && !customList.includes(q.topic)) {
      let exists = false;
      for (const section in subjectSyllabus) {
        if (subjectSyllabus[section].includes(q.topic)) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        customList.push(q.topic);
      }
    }
    
    if (q.subtopic && !customList.includes(q.subtopic)) {
      let exists = false;
      for (const section in subjectSyllabus) {
        if (subjectSyllabus[section].includes(q.subtopic)) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        customList.push(q.subtopic);
      }
    }
  });
}

async function publishedStudyQuestions(filters={}){
  const custom=readStored(personalStorageKey('gate_custom_questions'),[]).filter(q=>!validateStudyQuestion(q).length);
  try{return [...await loadPublishedQuestions(filters),...filterQuestionBank(custom,filters)];}
  catch(error){if(custom.length)return filterQuestionBank(custom,filters);throw error;}
}
async function storeCustomQuestions(questions){
  if(!auth.currentUser)throw Error('Sign in to save your questions.');
  if(!Array.isArray(questions)||questions.some(q=>validateStudyQuestion({...q,type:q.type||'MCQ'}).length))throw Error('Questions need complete options and verified keys.');
  const existing=readStored(personalStorageKey('gate_custom_questions'),[]),map=new Map(existing.map(q=>[q.id,q]));
  const saved=questions.map(q=>({...q,id:q.id||'custom_'+Date.now()+'_'+Math.random().toString(36).slice(2,8),userId:auth.currentUser.uid,type:q.type||'MCQ'}));
  saved.forEach(q=>map.set(q.id,q));localStorage.setItem(personalStorageKey('gate_custom_questions'),JSON.stringify([...map.values()]));return saved;
}
// Mock Firestore API
const mockFirestore = {
  async getQuestions(filters={}){return publishedStudyQuestions(filters);},

  async saveAttempt(attempt) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanAttempt = JSON.parse(JSON.stringify(attempt));
        const attempts = readStored(attemptStorageKey(),[]);
        cleanAttempt.id = cleanAttempt.id || 'att_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        cleanAttempt.timestamp = cleanAttempt.timestamp || new Date().toISOString();
    cleanAttempt.userId = auth.currentUser?.uid || 'anonymous';
        if (!attempts.some(a => a.id === cleanAttempt.id)) attempts.push(cleanAttempt);
        localStorage.setItem(attemptStorageKey(), JSON.stringify(attempts));
        resolve(cleanAttempt);
      }, 400);
    });
  },
  
  async getAttempts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = readStored(attemptStorageKey(),[]);
        resolve(list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      }, 400);
    });
  },

  async deleteAttempt(attemptId){const uid=auth.currentUser?.uid||'anonymous';const archived=await readAttemptArchive(uid,{required:true});if(archived.some(row=>row.id===attemptId)&&!await deleteArchivedAttempt(uid,attemptId))throw Error('Device deletion failed. Retry before leaving this result.');for(const key of ['gate_attempts:'+uid,'exam-results:'+uid])localStorage.setItem(key,JSON.stringify(readStored(key,[]).filter(row=>row.id!==attemptId)));return true;},

  async addQuestion(question){return (await storeCustomQuestions([question]))[0];},
  async addQuestions(questions){return storeCustomQuestions(questions);},

  async getStudyTime() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(readStored(personalStorageKey('gate_study_time'),{}));
      }, 300);
    })
  },

  async updateStudyTime(day, hours) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const times = readStored(personalStorageKey('gate_study_time'),{});
        times[day] = (times[day] || 0) + hours;
        localStorage.setItem(personalStorageKey('gate_study_time'), JSON.stringify(times));
        resolve(times);
      }, 300);
    })
  },

  async getTopicsBySubject(subject){const questions=await this.getQuestions({subject});return [...new Set(questions.map(q=>q.topic))];},

  async getBookmarks() {
    return new Promise((resolve) => {
      resolve(readStored(personalStorageKey('gate_bookmarks'),[]));
    });
  },
  async saveBookmark(question) {
    return new Promise((resolve) => {
      const list = readStored(personalStorageKey('gate_bookmarks'),[]);
      if (!list.some(q => q.id === question.id)) {
        list.push(question);
        localStorage.setItem(personalStorageKey('gate_bookmarks'), JSON.stringify(list));
      }
      resolve(true);
    });
  },
  async deleteBookmark(questionId) {
    return new Promise((resolve) => {
      const list = readStored(personalStorageKey('gate_bookmarks'),[]);
      const updated = list.filter(q => q.id !== questionId);
      localStorage.setItem(personalStorageKey('gate_bookmarks'), JSON.stringify(updated));
      resolve(true);
    });
  },
  async isBookmarked(questionId) {
    return new Promise((resolve) => {
      const list = readStored(personalStorageKey('gate_bookmarks'),[]);
      resolve(list.some(q => q.id === questionId));
    });
  },
  async getSyllabusProgress() {
    return new Promise((resolve) => {
      resolve(readStored(personalStorageKey('gate_syllabus_progress'),{}));
    });
  },
  async saveSyllabusProgress(progress) {
    return new Promise((resolve) => {
      localStorage.setItem(personalStorageKey('gate_syllabus_progress'), JSON.stringify(progress));
      resolve(progress);
    });
  },
  async getUnlockedBadges() {
    return new Promise((resolve) => {
      resolve(readStored(personalStorageKey('gate_unlocked_badges'),[]));
    });
  },
  async unlockBadge(badgeId) {
    return new Promise((resolve) => {
      const badges = readStored(personalStorageKey('gate_unlocked_badges'),[]);
      if (!badges.includes(badgeId)) {
        badges.push(badgeId);
        localStorage.setItem(personalStorageKey('gate_unlocked_badges'), JSON.stringify(badges));
      }
      resolve(badges);
    });
  },
  async getCommunityPosts(){return readStored(personalStorageKey('gate_community_posts'),[]);},
  async saveCommunityPost(post) {
    return new Promise((resolve) => {
      const posts = readStored(personalStorageKey('gate_community_posts'),[]);
      post.id = 'post_' + Date.now();
      post.timestamp = new Date().toISOString();
      post.upvotes = 0;
      post.upvoted = false;
      post.replies = [];
      posts.unshift(post);
      localStorage.setItem(personalStorageKey('gate_community_posts'), JSON.stringify(posts));
      resolve(post);
    });
  },
  async addPostReply(postId, reply) {
    return new Promise((resolve) => {
      const posts = readStored(personalStorageKey('gate_community_posts'),[]);
      const post = posts.find(p => p.id === postId);
      if (post) {
        reply.id = 'reply_' + Date.now();
        reply.timestamp = new Date().toISOString();
        post.replies.push(reply);
        localStorage.setItem(personalStorageKey('gate_community_posts'), JSON.stringify(posts));
      }
      resolve(post);
    });
  },
  async upvotePost(postId) {
    return new Promise((resolve) => {
      const posts = readStored(personalStorageKey('gate_community_posts'),[]);
      const post = posts.find(p => p.id === postId);
      if (post) {
        if (post.upvoted) {
          post.upvotes = Math.max(0, post.upvotes - 1);
          post.upvoted = false;
        } else {
          post.upvotes += 1;
          post.upvoted = true;
        }
        localStorage.setItem(personalStorageKey('gate_community_posts'), JSON.stringify(posts));
      }
      resolve(post);
    });
  }
};

// Real Firebase Authentication API
const realAuth = {
  get currentUser() {
    return authInstance ? authInstance.currentUser : null;
  },
  onAuthStateChanged(callback) {
    if (!authInstance) return () => {};
    return onAuthStateChanged(authInstance, (user) => {
      callback(user);
    });
  },
  async signUp(email, password, displayName) {
    if (!authInstance) throw new Error("Firebase Auth is not initialized.");
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
  },
  async signIn(email, password) {
    if (!authInstance) throw new Error("Firebase Auth is not initialized.");
    const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
    return userCredential.user;
  },
  async signOut() {
    if (!authInstance) return;
    await firebaseSignOut(authInstance);
  }
};

// Standard study time defaults for seeding/first access
const DEFAULT_STUDY_TIME = {
  "Mon": 2.5, "Tue": 3.2, "Wed": 1.8, "Thu": 4.0, "Fri": 2.0, "Sat": 5.5, "Sun": 3.0
};

// Real Firestore API
const realFirestore = {
  async getQuestions(filters={}){return publishedStudyQuestions(filters);},

  async saveAttempt(attempt) {
    const cleanAttempt=JSON.parse(JSON.stringify(attempt));
    cleanAttempt.id ||= 'att_'+Date.now()+'_'+Math.random().toString(36).slice(2,8);
    cleanAttempt.timestamp ||= new Date().toISOString();
    cleanAttempt.userId=auth.currentUser?.uid||'anonymous';
    const accountKey='gate_attempts:'+cleanAttempt.userId;
    let localSaved=await writeAttemptArchive(cleanAttempt.userId,[{...cleanAttempt,syncStatus:'pending'}]),cloudSaved=false;const archived=localSaved;
    const writeLocal=(status)=>{
      const raw=readStored(accountKey,[]);
      const list=Array.isArray(raw)?raw:[];
      const row={...cleanAttempt,syncStatus:status};
      const index=list.findIndex(a=>a.id===row.id);if(index<0)list.push(row);else list[index]=row;
      localStorage.setItem(accountKey,JSON.stringify(archived?compactAttemptCache(list):list));localSaved=true;
    };
    try{writeLocal('pending');}catch(error){console.warn('Local attempt save failed',error);}
    try{
      if(firestore&&auth.currentUser?.uid===cleanAttempt.userId&&networkAvailable()){
        await boundedWrite(setDoc(doc(firestore,'attempts',cleanAttempt.id),cleanAttempt));cloudSaved=true;
        await writeAttemptArchive(cleanAttempt.userId,[{...cleanAttempt,syncStatus:'synced'}]);try{writeLocal('synced');}catch{}
      }
    }catch(error){console.warn('Cloud attempt save pending',error);}
    if(!localSaved&&!cloudSaved){const error=new Error('Your result could not be saved. Keep this page open and export or retry.');error.attempt=cleanAttempt;throw error;}
    return {...cleanAttempt,persistence:{localSaved,cloudSaved,pendingSync:localSaved&&!cloudSaved}};
  },

  async retryPendingAttempts(){
    const uid=auth.currentUser?.uid||'anonymous';
    const merged=new Map([...await readAttemptArchive(uid),...readStored('gate_attempts:'+uid,[])].map(row=>[row.id,row]));const rows=[...merged.values()];
    const results=[];
    for(const row of rows.filter(a=>a.syncStatus==='pending')){if((auth.currentUser?.uid||'anonymous')!==uid)break;results.push(await this.saveAttempt(row));}
    return results;
  },

  async getAttempts() {
    const uid=auth.currentUser?.uid||'anonymous',accountKey='gate_attempts:'+uid;
    let list = [],cloudSucceeded=false;
    
    // Always load from localStorage
    try {
      list = [...new Map([...await readAttemptArchive(auth.currentUser?.uid||'anonymous'),...readStored(accountKey,[])].map(row=>[row.id,row])).values()];
    } catch (e) {
      console.warn("localStorage getAttempts error:", e);
    }

    // Load from Firestore if authenticated
    try {
      if (firestore&&networkAvailable()) {
        const user = authInstance ? authInstance.currentUser : null;
        if (user) {
          const q = query(collection(firestore, "attempts"), where("userId", "==", user.uid));
          const qSnap = await boundedWrite(getDocs(q),3000);cloudSucceeded=true;
          qSnap.forEach(docSnap => {
            const data = docSnap.data();
            if (!list.some(item => item.id === data.id)) {
              list.push(data);
            }
          });
        }
      }
    } catch (err) {
      console.warn("Firestore getAttempts error:", err);
    }
    
    if((auth.currentUser?.uid||'anonymous')!==uid)return [];
    const archived=await writeAttemptArchive(auth.currentUser?.uid||'anonymous',list);
    try{localStorage.setItem(accountKey,JSON.stringify(archived?compactAttemptCache(list):list));}catch{}
    list.syncState=cloudSucceeded?'synced':firestore?'offline':'device';
    return list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async deleteAttempt(attemptId){
    const uid=auth.currentUser?.uid||'anonymous';
    const archived=await readAttemptArchive(uid,{required:true});
    // Keep the recoverable copy when the remote deletion is rejected or offline.
    if(firestore&&auth.currentUser&&!networkAvailable())throw Error('You are offline. Reconnect before deleting this attempt.');
    if(firestore&&auth.currentUser){const {deleteDoc}=await import('firebase/firestore');await boundedWrite(deleteDoc(doc(firestore,'attempts',attemptId)));}
    if(archived.some(row=>row.id===attemptId)&&!await deleteArchivedAttempt(uid,attemptId))throw Error('The cloud copy was deleted, but device deletion failed. Retry to remove the retained copy.');
    for(const key of ['gate_attempts:'+uid,'exam-results:'+uid]){
      const rows=readStored(key,[]);localStorage.setItem(key,JSON.stringify(rows.filter(a=>a.id!==attemptId)));
    }
    return true;
  },

  async addQuestion(question){return (await storeCustomQuestions([question]))[0];},
  async addQuestions(questions){return storeCustomQuestions(questions);},

  async getStudyTime() {
    if (!firestore) return DEFAULT_STUDY_TIME;
    const user = authInstance ? authInstance.currentUser : null;
    if (!user) return DEFAULT_STUDY_TIME;
    
    const userDocRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists() && userDoc.data().studyTime) {
      return userDoc.data().studyTime;
    } else {
      const studyTime = { ...DEFAULT_STUDY_TIME };
      await setDoc(userDocRef, { studyTime }, { merge: true });
      return studyTime;
    }
  },

  async updateStudyTime(day, hours) {
    if (!firestore) return DEFAULT_STUDY_TIME;
    const user = authInstance ? authInstance.currentUser : null;
    if (!user) return DEFAULT_STUDY_TIME;
    
    const userDocRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    let studyTime = { ...DEFAULT_STUDY_TIME };
    if (userDoc.exists() && userDoc.data().studyTime) {
      studyTime = userDoc.data().studyTime;
    }
    studyTime[day] = (studyTime[day] || 0) + hours;
    studyTime[day] = parseFloat(studyTime[day].toFixed(2));
    await setDoc(userDocRef, { studyTime }, { merge: true });
    return studyTime;
  },

  async getTopicsBySubject(subject) {
    const list = await this.getQuestions();
    const filtered = list.filter(q => q.subject.toLowerCase() === subject.toLowerCase());
    const topics = [...new Set(filtered.map(q => q.topic))];
    return topics;
  },

  async getBookmarks() {
    return new Promise((resolve) => {
      resolve(readStored(personalStorageKey('gate_bookmarks'),[]));
    });
  },
  async saveBookmark(question) {
    return new Promise((resolve) => {
      const list = readStored(personalStorageKey('gate_bookmarks'),[]);
      if (!list.some(q => q.id === question.id)) {
        list.push(question);
        localStorage.setItem(personalStorageKey('gate_bookmarks'), JSON.stringify(list));
      }
      resolve(true);
    });
  },
  async deleteBookmark(questionId) {
    return new Promise((resolve) => {
      const list = readStored(personalStorageKey('gate_bookmarks'),[]);
      const updated = list.filter(q => q.id !== questionId);
      localStorage.setItem(personalStorageKey('gate_bookmarks'), JSON.stringify(updated));
      resolve(true);
    });
  },
  async isBookmarked(questionId) {
    return new Promise((resolve) => {
      const list = readStored(personalStorageKey('gate_bookmarks'),[]);
      resolve(list.some(q => q.id === questionId));
    });
  },
  async getSyllabusProgress() {
    return new Promise((resolve) => {
      resolve(readStored(personalStorageKey('gate_syllabus_progress'),{}));
    });
  },
  async saveSyllabusProgress(progress) {
    return new Promise((resolve) => {
      localStorage.setItem(personalStorageKey('gate_syllabus_progress'), JSON.stringify(progress));
      resolve(progress);
    });
  },
  async getUnlockedBadges() {
    return new Promise((resolve) => {
      resolve(readStored(personalStorageKey('gate_unlocked_badges'),[]));
    });
  },
  async unlockBadge(badgeId) {
    return new Promise((resolve) => {
      const badges = readStored(personalStorageKey('gate_unlocked_badges'),[]);
      if (!badges.includes(badgeId)) {
        badges.push(badgeId);
        localStorage.setItem(personalStorageKey('gate_unlocked_badges'), JSON.stringify(badges));
      }
      resolve(badges);
    });
  },
  async getCommunityPosts(){return readStored(personalStorageKey('gate_community_posts'),[]);},
  async saveCommunityPost(post) {
    return new Promise((resolve) => {
      const posts = readStored(personalStorageKey('gate_community_posts'),[]);
      post.id = 'post_' + Date.now();
      post.timestamp = new Date().toISOString();
      post.upvotes = 0;
      post.upvoted = false;
      post.replies = [];
      posts.unshift(post);
      localStorage.setItem(personalStorageKey('gate_community_posts'), JSON.stringify(posts));
      resolve(post);
    });
  },
  async addPostReply(postId, reply) {
    return new Promise((resolve) => {
      const posts = readStored(personalStorageKey('gate_community_posts'),[]);
      const post = posts.find(p => p.id === postId);
      if (post) {
        reply.id = 'reply_' + Date.now();
        reply.timestamp = new Date().toISOString();
        post.replies.push(reply);
        localStorage.setItem(personalStorageKey('gate_community_posts'), JSON.stringify(posts));
      }
      resolve(post);
    });
  },
  async upvotePost(postId) {
    return new Promise((resolve) => {
      const posts = readStored(personalStorageKey('gate_community_posts'),[]);
      const post = posts.find(p => p.id === postId);
      if (post) {
        if (post.upvoted) {
          post.upvotes = Math.max(0, post.upvotes - 1);
          post.upvoted = false;
        } else {
          post.upvotes += 1;
          post.upvoted = true;
        }
        localStorage.setItem(personalStorageKey('gate_community_posts'), JSON.stringify(posts));
      }
      resolve(post);
    });
  }
};

// Export services depending on configuration mode
export const auth = useMock ? mockAuth : realAuth;
const databaseAdapter=useMock?mockFirestore:realFirestore;
export const db={...databaseAdapter};
for(const method of ['saveAttempt','deleteAttempt']){
  db[method]=async function(...args){const uid=auth.currentUser?.uid||'anonymous';invalidateAttemptHistory(uid);try{return await databaseAdapter[method].apply(this,args);}finally{invalidateAttemptHistory(uid);}};
}
export const isMockMode = useMock;
export { firebaseConfig };

export const SUBJECT_SYLLABUS = {
  "Section 1: Engineering Mathematics": {
    "Discrete Mathematics": [
      "Propositional Logic",
      "First Order Logic",
      "Sets",
      "Relations",
      "Functions",
      "Partial Orders",
      "Lattices",
      "Monoids",
      "Groups",
      "Graphs: Connectivity",
      "Graphs: Matching",
      "Graphs: Colouring",
      "Combinatorics: Counting",
      "Recurrence Relations",
      "Generating Functions"
    ],
    "Linear Algebra": [
      "Matrices",
      "Determinants",
      "System of Linear Equations",
      "Eigenvalues and Eigenvectors",
      "LU Decomposition"
    ],
    "Calculus": [
      "Limits",
      "Continuity and Differentiability",
      "Maxima and Minima",
      "Mean Value Theorem",
      "Integration"
    ],
    "Probability and Statistics": [
      "Random Variables",
      "Uniform Distribution",
      "Normal Distribution",
      "Exponential Distribution",
      "Poisson Distribution",
      "Binomial Distribution",
      "Mean, Median, Mode & Standard Deviation",
      "Conditional Probability",
      "Bayes Theorem"
    ]
  },
  "Section 2: Digital Logic": {
    "Boolean Algebra & Minimization": [
      "Boolean Algebra",
      "Algebraic Minimization",
      "Karnaugh Map (K-Map)",
      "Tabular Method (Quine-McCluskey)"
    ],
    "Combinational & Sequential Circuits": [
      "Design of Combinational Circuits",
      "Design of Sequential Circuits",
      "Flip-Flops & Counters",
      "Finite State Machines (FSM)"
    ],
    "Number Representation & Arithmetic": [
      "Fixed Point Representation",
      "Floating Point Representation",
      "Binary Arithmetic"
    ]
  },
  "Section 3: Computer Organization and Architecture": {
    "Instruction Set & Control Unit": [
      "Instruction Set",
      "Addressing Modes",
      "Design of ALU",
      "Hardwired Control Unit",
      "Microprogrammed Control Unit"
    ],
    "Memory Hierarchy & I/O Interface": [
      "Memory Interfacing & Hierarchy",
      "Performance Metrics",
      "Cache Memory Mapping",
      "I/O Interface: Interrupts",
      "I/O Interface: DMA"
    ],
    "Pipelining": [
      "Instruction Pipelining",
      "Pipeline Hazards"
    ]
  },
  "Section 4: Programming and Data Structures": {
    "Programming": [
      "Programming in C",
      "Recursion"
    ],
    "Data Structures": [
      "Arrays",
      "Stacks",
      "Queues",
      "Linked Lists",
      "Trees",
      "Binary Search Trees (BST)",
      "Binary Heaps",
      "Graphs"
    ]
  },
  "Section 5: Algorithms": {
    "Analysis & Searching/Sorting": [
      "Searching",
      "Sorting",
      "Hashing",
      "Asymptotic Worst Case Time & Space Complexity"
    ],
    "Algorithm Design Techniques": [
      "Greedy Algorithms",
      "Dynamic Programming",
      "Divide-and-Conquer"
    ],
    "Graph Algorithms": [
      "Graph Traversals (BFS/DFS)",
      "Minimum Spanning Trees (Kruskal/Prim)",
      "Shortest Paths (Dijkstra/Bellman-Ford/Floyd)"
    ]
  },
  "Section 6: Theory of Computation": {
    "Automata & Regular Languages": [
      "Regular Expressions & Finite Automata",
      "Regular Languages",
      "Pumping Lemma for Regular Languages"
    ],
    "Context-Free & Turing Machines": [
      "Context-Free Grammars (CFG)",
      "Push-Down Automata (PDA)",
      "Context-Free Languages",
      "Pumping Lemma for CFL",
      "Turing Machines & Undecidability"
    ]
  },
  "Section 7: Compiler Design": {
    "Analysis & Translation": [
      "Lexical Analysis",
      "Parsing (LL/LR)",
      "Syntax-Directed Translation",
      "Runtime Environments",
      "Intermediate Code Generation"
    ],
    "Optimization & Data Flow": [
      "Local Optimisation",
      "Data Flow Analyses",
      "Constant Propagation",
      "Liveness Analysis",
      "Common Subexpression Elimination"
    ]
  },
  "Section 8: Operating System": {
    "Process Management & Concurrency": [
      "System Calls",
      "Processes & Threads",
      "Inter-Process Communication (IPC)",
      "Concurrency & Synchronization",
      "Deadlock"
    ],
    "Scheduling & Memory Management": [
      "CPU & I/O Scheduling",
      "Memory Management",
      "Virtual Memory",
      "File Systems"
    ]
  },
  "Section 9: Databases": {
    "Data Models & Relational Query": [
      "ER-Model",
      "Relational Model",
      "Relational Algebra",
      "Tuple Calculus",
      "SQL",
      "Integrity Constraints",
      "Normal Forms (1NF, 2NF, 3NF, BCNF)"
    ],
    "Indexing & Transactions": [
      "File Organization",
      "Indexing: B and B+ Trees",
      "Transactions & Concurrency Control"
    ]
  },
  "Section 10: Computer Networks": {
    "Layering & Data Link Layer": [
      "Principles of Layering",
      "Basics of Switching (Circuit, Packet, Virtual Circuit)",
      "Performance Metrics",
      "Data Link Layer: Error Detection",
      "Medium Access Control (MAC)",
      "Ethernet"
    ],
    "Routing, Transport & Application Layer": [
      "Distance Vector & Link State Routing",
      "IPv4: Fragmentation, CIDR Notation, NAT",
      "TCP: Flow Control & Congestion Control",
      "Socket API",
      "DNS and HTTP"
    ]
  }
};
