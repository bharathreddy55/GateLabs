import {loadPublishedQuestions,filterQuestionBank} from '../utils/questionBank.js';
import {readStored} from '../utils/safeStorage.js';
import {parseExamText,validateStudyQuestion} from '../utils/parseExamText.js';
// Firebase configuration and mock fallback system
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

// Mock database default data
const DEFAULT_QUESTIONS = [
  {
    id: "q1",
    subject: "Operating Systems",
    topic: "Processes & Scheduling",
    subtopic: "Deadlocks",
    difficulty: "Medium",
    marks: 2,
    year: 2021,
    question: "Consider a system with 3 processes P1, P2, and P3, and 3 resource types R1, R2, and R3. Each resource type has 2 instances. The allocation matrix and request matrix are given. Is the system in a deadlock state?",
    options: [
      "Yes, because there is a cycle containing P1, P2, and P3.",
      "No, because P2 can finish and release its resources, followed by others.",
      "Yes, because all resource instances are allocated.",
      "No, but the system is in an unsafe state."
    ],
    correctAnswer: 1,
    explanation: "Process allocation and requests can be evaluated using Banker's algorithm. P2's request can be satisfied with the currently available resources. Once P2 finishes and releases its allocation, the available resources will be sufficient to satisfy P1 or P3. Hence, the system is not in a deadlock state.",
    tags: ["Bankers Algorithm", "Resource Allocation Graph"]
  },
  {
    id: "q2",
    subject: "Operating Systems",
    topic: "Memory Management",
    subtopic: "Paging",
    difficulty: "Hard",
    marks: 2,
    year: 2022,
    question: "A system uses 32-bit virtual addresses and 4KB page size. The page table entry (PTE) size is 4 bytes. If the system uses a multi-level page table, what is the maximum number of levels required to map the virtual address space such that each page table fits in exactly one page frame?",
    options: [
      "2 levels",
      "3 levels",
      "4 levels",
      "5 levels"
    ],
    type: "MCQ",
    correctAnswer: 1,
    explanation: "Page size = 4KB = 2^12 bytes. PTE = 4 bytes = 2^2 bytes.\nMax entries per page table frame = page size / PTE = 4KB / 4B = 1024 = 2^10 entries.\nVirtual Address size = 32 bits.\nOffset size = 12 bits.\nRemaining bits for page directory/page tables = 32 - 12 = 20 bits.\nEach level of page table can resolve at most 10 bits (since each page frame holds 2^10 entries).\nTherefore, we need 20 / 10 = 2 levels. Thus, 2 levels are sufficient.",
    tags: ["Paging", "Multi-level Page Table"]
  },
  {
    id: "q_msq1",
    type: "MSQ",
    subject: "Section 8: Operating System",
    topic: "Process Management & Concurrency",
    subtopic: "Deadlock",
    difficulty: "Medium",
    marks: 2,
    year: 2023,
    question: "Which of the following conditions MUST hold simultaneously for a deadlock to occur in a system? (Select ALL correct options)",
    options: [
      "Mutual Exclusion",
      "Hold and Wait",
      "Preemption allowed",
      "Circular Wait"
    ],
    correctOptions: [0, 1, 3],
    explanation: "Coffman's 4 necessary conditions for deadlock are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.",
    tags: ["Deadlock", "Coffman Conditions"]
  },
  {
    id: "q_nat1",
    type: "NAT",
    subject: "Section 1: Engineering Mathematics",
    topic: "Linear Algebra",
    subtopic: "Eigenvalues and Eigenvectors",
    difficulty: "Hard",
    marks: 2,
    year: 2024,
    question: "Consider a 3x3 matrix A with eigenvalues λ1 = 2, λ2 = -3, and λ3 = 5. What is the determinant of matrix A?",
    options: [],
    natMin: -30,
    natMax: -30,
    correctNat: -30,
    explanation: "The determinant of a square matrix equals the product of its eigenvalues. Det(A) = 2 * (-3) * 5 = -30.",
    tags: ["Eigenvalues", "Determinant"]
  },
  {
    id: "q3",
    subject: "Algorithms",
    topic: "Graph Algorithms",
    subtopic: "Dijkstra",
    difficulty: "Medium",
    marks: 1,
    year: 2023,
    question: "What is the time complexity of Dijkstra's algorithm implemented using a binary heap, where V is the number of vertices and E is the number of edges in a graph?",
    options: [
      "O(V^2)",
      "O(E log V)",
      "O(V log E)",
      "O(E + V log V)"
    ],
    correctAnswer: 1,
    explanation: "Dijkstra's algorithm using a binary heap takes O((V + E) log V) time. In a connected graph, E >= V - 1, which simplifies to O(E log V).",
    tags: ["Dijkstra", "Shortest Path", "Heap"]
  },
  {
    id: "q4",
    subject: "Engineering Mathematics",
    topic: "Discrete Mathematics",
    subtopic: "Graph Theory",
    difficulty: "Easy",
    marks: 1,
    year: 2020,
    question: "An undirected graph G has 8 vertices. If every vertex has degree 4, how many edges are there in G, and is the graph Eulerian?",
    options: [
      "16 edges, Yes",
      "32 edges, No",
      "16 edges, No",
      "8 edges, Yes"
    ],
    correctAnswer: 0,
    explanation: "By Handshaking Lemma, Sum of degrees = 2 * Edges. Thus, 8 * 4 = 32 = 2 * E => E = 16 edges. A connected graph is Eulerian if and only if every vertex has an even degree. Since all vertices have degree 4 (even), it is Eulerian.",
    tags: ["Degree", "Handshaking Lemma", "Euler Path"]
  },
  {
    id: "q5",
    subject: "Computer Networks (CN)",
    topic: "Transport & Application Layer",
    subtopic: "Congestion Control",
    difficulty: "Hard",
    marks: 2,
    year: 2024,
    question: "In a TCP congestion control algorithm, suppose the congestion window (cwnd) size is 32 KB. The TCP connection encounters a timeout. What will be the new values of ssthresh and cwnd respectively if the maximum segment size (MSS) is 2 KB?",
    options: [
      "ssthresh = 16 KB, cwnd = 2 KB",
      "ssthresh = 16 KB, cwnd = 16 KB",
      "ssthresh = 8 KB, cwnd = 2 KB",
      "ssthresh = 8 KB, cwnd = 8 KB"
    ],
    correctAnswer: 0,
    explanation: "When a timeout occurs, TCP enters Slow Start. The ssthresh is set to half of the current congestion window size: ssthresh = cwnd / 2 = 32 KB / 2 = 16 KB. The cwnd is reset to 1 MSS (which is 2 KB).",
    tags: ["TCP", "Congestion Control", "Slow Start"]
  },
  {
    id: "q6",
    subject: "Databases (DBMS)",
    topic: "Database Tuning",
    subtopic: "Normalization",
    difficulty: "Medium",
    marks: 2,
    year: 2021,
    question: "Consider a relation scheme R(A, B, C, D, E, H) with functional dependencies F = {A -> B, BC -> D, E -> C, D -> A}. What is the candidate key of R?",
    options: [
      "AE",
      "AEH",
      "EH",
      "ADH"
    ],
    correctAnswer: 1,
    explanation: "Attributes E and H do not appear on the right-hand side of any dependency. Hence, E and H must be part of any candidate key.\nClosure of (AEH)+ = {A, E, H, B, C, D} which contains all attributes. Thus, AEH is the candidate key.",
    tags: ["Candidate Key", "Closure", "Functional Dependencies"]
  },
  {
    id: "q7",
    subject: "Compiler Design",
    topic: "Lexical & Syntax Analysis",
    subtopic: "Parsing",
    difficulty: "Easy",
    marks: 1,
    year: 2019,
    question: "Which of the following statements is/are true for LL(1) grammars?\nS1: An LL(1) grammar can be ambiguous.\nS2: LL(1) parser is a top-down parser that uses an explicit stack.",
    options: [
      "Only S1 is true",
      "Only S2 is true",
      "Both S1 and S2 are true",
      "Neither S1 nor S2 is true"
    ],
    correctAnswer: 1,
    explanation: "S1 is false: Ambiguous grammars can never be LL(1). S2 is true: LL(1) is a top-down predictive parsing method that uses an explicit stack to guide parsing steps.",
    tags: ["LL(1) Grammar", "Ambiguity", "Stack Parser"]
  },
  {
    id: "q8",
    subject: "Computer Organization & Architecture (COA)",
    topic: "Memory Hierarchy",
    subtopic: "Cache Memory",
    difficulty: "Medium",
    marks: 2,
    year: 2023,
    question: "A 2-way set-associative cache memory has a block size of 16 bytes and total size of 64 KB. If the physical address size is 32 bits, what is the size of the Tag field?",
    options: [
      "15 bits",
      "17 bits",
      "19 bits",
      "21 bits"
    ],
    correctAnswer: 1,
    explanation: "Offset bits = log2(Block size) = log2(16) = 4 bits.\nNumber of Cache Blocks = Cache size / Block size = 64 KB / 16 B = 4096 blocks.\nNumber of Sets = Blocks / Associativity = 4096 / 2 = 2048 sets.\nSet Index bits = log2(2048) = 11 bits.\nTag bits = Physical Address - Set Index bits - Offset bits = 32 - 11 - 4 = 17 bits.",
    tags: ["Cache Mapping", "Set Associative", "Tag Bits"]
  },
  {
    id: "q9",
    subject: "Digital Logic",
    topic: "Combinational Circuits",
    subtopic: "Multiplexers",
    difficulty: "Easy",
    marks: 1,
    year: 2018,
    question: "How many 4-to-1 multiplexers are required to implement an 8-to-1 multiplexer without any additional logic gates?",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correctAnswer: 1,
    explanation: "To implement an 8-to-1 multiplexer, we can use two 4-to-1 multiplexers in the first level (handling 8 inputs total). A third 4-to-1 multiplexer is required in the second stage to route the output of the first-level multiplexers based on select lines. Hence, 3 multiplexers are needed.",
    tags: ["Multiplexer", "Digital Logic Design"]
  },
  {
    id: "q10",
    subject: "Engineering Mathematics",
    topic: "Linear Algebra",
    subtopic: "Eigenvalues",
    difficulty: "Medium",
    marks: 1,
    year: 2022,
    question: "If a 3x3 matrix A has eigenvalues 1, 2, and 5, what is the trace of matrix A²?",
    options: [
      "8",
      "16",
      "25",
      "30"
    ],
    correctAnswer: 3,
    explanation: "Eigenvalues of A² are the squares of the eigenvalues of A. Therefore, eigenvalues of A² are 1² = 1, 2² = 4, and 5² = 25.\nTrace of a matrix is the sum of its eigenvalues. Hence, Trace(A²) = 1 + 4 + 25 = 30.",
    tags: ["Eigenvalues", "Trace of Matrix", "Linear Algebra"]
  },
  {
    id: "q11",
    subject: "General Aptitude",
    topic: "Quantitative Aptitude",
    subtopic: "Time, Speed & Distance",
    difficulty: "Medium",
    marks: 1,
    year: 2024,
    question: "A train running at speed S crosses a pole in 10 seconds. If it crosses a platform of length 200m in 20 seconds, what is the length of the train?",
    options: [
      "100m",
      "150m",
      "200m",
      "250m"
    ],
    correctAnswer: 2,
    explanation: "Let the length of the train be L. Speed S = L / 10.\nWhen crossing a platform of length 200m: S = (L + 200) / 20.\nEquating speed: L / 10 = (L + 200) / 20 => 2L = L + 200 => L = 200 meters.",
    tags: ["Aptitude", "Speed Distance", "Quantitative"]
  },
  {
    id: "q12",
    subject: "Programming & Data Structures",
    topic: "Programming",
    subtopic: "Pointers",
    difficulty: "Medium",
    marks: 1,
    year: 2022,
    question: "What does the following C code print?\n\n#include <stdio.h>\nint main() {\n    int a[] = {10, 20, 30};\n    int *p = a;\n    printf(\"%d\", *(p + 1));\n    return 0;\n}",
    options: [
      "10",
      "20",
      "30",
      "Compiler Error"
    ],
    correctAnswer: 1,
    explanation: "a is the base address of the array. p points to a[0]. (p + 1) points to a[1]. Therefore, *(p + 1) is a[1], which is 20.",
    tags: ["Pointers", "Arrays", "C Programming"]
  },
  {
    id: "q13",
    subject: "Theory of Computation (TOC)",
    topic: "Automata & Languages",
    subtopic: "Regular Expressions",
    difficulty: "Easy",
    marks: 1,
    year: 2023,
    question: "Which of the following regular expressions represents the set of all binary strings containing an even number of 1s?",
    options: [
      "(0*10*10*)*",
      "0*(10*1)*",
      "(0+11)*",
      "(0*+10*1)*"
    ],
    correctAnswer: 3,
    explanation: "The expression (0*+10*1)* generates all strings with an even number of 1s. Any 1 must be paired with another 1, possibly separated by any number of 0s.",
    tags: ["Regular Expressions", "Even 1s", "Automata"]
  }
];

const VALID_SUBJECTS = [
  "Engineering Mathematics",
  "Digital Logic",
  "Computer Organization & Architecture (COA)",
  "Programming & Data Structures",
  "Algorithms",
  "Theory of Computation (TOC)",
  "Compiler Design",
  "Operating Systems",
  "Databases (DBMS)",
  "Computer Networks (CN)",
  "General Aptitude"
];

// Initialize LocalStorage with mock data if empty
function initializeMockDb() {
  const currentQs = readStored('gate_questions',[]);
  const needsAlign = currentQs.some(q => !VALID_SUBJECTS.includes(q.subject));
  if (currentQs.length < DEFAULT_QUESTIONS.length || needsAlign) {
    localStorage.setItem('gate_questions', JSON.stringify(DEFAULT_QUESTIONS));
  }
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
let analytics;

// Attempt to load standard Firebase library
// If config has placeholders, fail initialization gracefully to use Mocks
async function loadExternalQuestions() {
  try {
    const res = await fetch('/pyqs/questions.json');
    if (res.ok) {
      const externalQs = await res.json();
      if (Array.isArray(externalQs) && externalQs.length > 0) {
        const currentQs = readStored('gate_questions',[]);
        const existingQs = new Set(currentQs.map(q => q.question.trim()));
        let addedCount = 0;
        externalQs.forEach(q => {
          if (!existingQs.has(q.question.trim())) {
            if (!q.id) {
              q.id = 'gate_ext_' + Math.random().toString(36).substr(2, 9);
            }
            currentQs.push(q);
            addedCount++;
          }
        });
        if (addedCount > 0) {
          localStorage.setItem('gate_questions', JSON.stringify(currentQs));
          console.log(`Loaded and merged ${addedCount} external questions from questions.json`);
        }
      }
    }
  } catch (err) {
    console.error("Failed to load external questions:", err);
  }
}

const hasRealConfig = firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY";

if (hasRealConfig) {
  try {
    console.log("Firebase credentials detected. Connecting to Firebase services...");
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    firestore = getFirestore(app);
    if (typeof window !== "undefined") {
      analytics = getAnalytics(app);
    }
    useMock = false;

  } catch (error) {
    console.error("Firebase init failed, switching to mock database mode:", error);
    useMock = true;
  }
} else {
  console.log("Using Mock Database mode (LocalStorage). Please configure Firebase in `src/config/firebase.js` for production.");
  initializeMockDb();
  loadExternalQuestions();
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

  async deleteAttempt(attemptId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = readStored(attemptStorageKey(),[]);
        const updated = list.filter(a => a.id !== attemptId);
      const resultsKey='exam-results:'+(auth.currentUser?.uid||'anonymous');
      const results=readStored(resultsKey,[]);
      localStorage.setItem(resultsKey,JSON.stringify(results.filter(a=>a.id!==attemptId)));
        localStorage.setItem(attemptStorageKey(), JSON.stringify(updated));
        resolve(true);
      }, 200);
    });
  },

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

  async getTopicsBySubject(subject) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = readStored('gate_questions',[]);
        const filtered = list.filter(q => q.subject.toLowerCase() === subject.toLowerCase());
        const topics = [...new Set(filtered.map(q => q.topic))];
        resolve(topics);
      }, 200);
    });
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
    let localSaved=false,cloudSaved=false;
    const writeLocal=(status)=>{
      const raw=readStored(attemptStorageKey(),[]);
      const list=Array.isArray(raw)?raw:[];
      const row={...cleanAttempt,syncStatus:status};
      const index=list.findIndex(a=>a.id===row.id);if(index<0)list.push(row);else list[index]=row;
      localStorage.setItem(attemptStorageKey(),JSON.stringify(list));localSaved=true;
    };
    try{writeLocal('pending');}catch(error){console.warn('Local attempt save failed',error);}
    try{
      if(firestore&&auth.currentUser){
        await boundedWrite(setDoc(doc(firestore,'attempts',cleanAttempt.id),cleanAttempt));cloudSaved=true;
        try{writeLocal('synced');}catch{}
      }
    }catch(error){console.warn('Cloud attempt save pending',error);}
    if(!localSaved&&!cloudSaved){const error=new Error('Your result could not be saved. Keep this page open and export or retry.');error.attempt=cleanAttempt;throw error;}
    return {...cleanAttempt,persistence:{localSaved,cloudSaved,pendingSync:localSaved&&!cloudSaved}};
  },

  async retryPendingAttempts(){
    const rows=readStored(attemptStorageKey(),[]);
    if(!Array.isArray(rows))return [];
    const results=[];
    for(const row of rows.filter(a=>a.syncStatus==='pending'))results.push(await this.saveAttempt(row));
    return results;
  },

  async getAttempts() {
    let list = [],cloudSucceeded=false;
    
    // Always load from localStorage
    try {
      list = readStored(attemptStorageKey(),[]);
    } catch (e) {
      console.warn("localStorage getAttempts error:", e);
    }

    // Load from Firestore if authenticated
    try {
      if (firestore) {
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
    
    try{localStorage.setItem(attemptStorageKey(),JSON.stringify(list));}catch{}
    list.syncState=cloudSucceeded?'synced':firestore?'offline':'device';
    return list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async deleteAttempt(attemptId){
    // Keep the recoverable copy when the remote deletion is rejected or offline.
    if(firestore&&auth.currentUser){const {deleteDoc}=await import('firebase/firestore');await boundedWrite(deleteDoc(doc(firestore,'attempts',attemptId)));}
    for(const key of [attemptStorageKey(),'exam-results:'+(auth.currentUser?.uid||'anonymous')]){
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
export const db = useMock ? mockFirestore : realFirestore;
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
