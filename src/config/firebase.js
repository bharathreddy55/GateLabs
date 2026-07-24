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
    correctAnswer: 0,
    explanation: "Page size = 4KB = 2^12 bytes. PTE = 4 bytes = 2^2 bytes.\nMax entries per page table frame = page size / PTE = 4KB / 4B = 1024 = 2^10 entries.\nVirtual Address size = 32 bits.\nOffset size = 12 bits.\nRemaining bits for page directory/page tables = 32 - 12 = 20 bits.\nEach level of page table can resolve at most 10 bits (since each page frame holds 2^10 entries).\nTherefore, we need 20 / 10 = 2 levels. Thus, 2 levels are sufficient.",
    tags: ["Paging", "Multi-level Page Table"]
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
  const currentQs = JSON.parse(localStorage.getItem('gate_questions') || '[]');
  const needsAlign = currentQs.some(q => !VALID_SUBJECTS.includes(q.subject));
  if (currentQs.length < DEFAULT_QUESTIONS.length || needsAlign) {
    localStorage.setItem('gate_questions', JSON.stringify(DEFAULT_QUESTIONS));
  }
  if (!localStorage.getItem('gate_users')) {
    localStorage.setItem('gate_users', JSON.stringify({}));
  }
  if (!localStorage.getItem('gate_attempts')) {
    localStorage.setItem('gate_attempts', JSON.stringify([]));
  }
  if (!localStorage.getItem('gate_study_time')) {
    localStorage.setItem('gate_study_time', JSON.stringify({
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
        const currentQs = JSON.parse(localStorage.getItem('gate_questions') || '[]');
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

    // Write a dummy document to Firestore to verify connection
    setDoc(doc(firestore, "connection_tests", "test_doc"), {
      status: "connected",
      timestamp: new Date().toISOString(),
      message: "Database connected successfully from GATE Flow web app!"
    }).then(() => {
      console.log("Dummy verification document written to collection 'connection_tests' successfully!");
    }).catch(err => {
      console.error("Failed to write dummy verification document:", err);
    });
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
    const loggedUser = JSON.parse(localStorage.getItem('gate_current_user') || 'null');
    this.currentUser = loggedUser;
    callback(loggedUser);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  },
  signUp(email, password, displayName) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('gate_users') || '{}');
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
        const users = JSON.parse(localStorage.getItem('gate_users') || '{}');
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
function parseTextQuestions(text) {
  const questions = [];
  // Split by question delimiter
  const rawBlocks = text.split(/\r?\n---\r?\n/);
  
  rawBlocks.forEach((block, index) => {
    if (!block.trim()) return;
    
    const lines = block.split(/\r?\n/);
    const qObj = {
      options: [],
      difficulty: "Medium",
      marks: 1,
      year: new Date().getFullYear(),
      tags: []
    };
    
    let isReadingQuestion = false;
    let isReadingExplanation = false;
    let questionBuffer = [];
    let explanationBuffer = [];
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;
      
      const lowerLine = trimmedLine.toLowerCase();
      
      if (lowerLine.startsWith("subject:")) {
        qObj.subject = trimmedLine.substring(8).trim();
        isReadingQuestion = false;
        isReadingExplanation = false;
      } else if (lowerLine.startsWith("topic:")) {
        qObj.topic = trimmedLine.substring(6).trim();
        isReadingQuestion = false;
        isReadingExplanation = false;
      } else if (lowerLine.startsWith("subtopic:")) {
        qObj.subtopic = trimmedLine.substring(9).trim();
        // Use subtopic as topic if topic isn't explicitly defined
        if (!qObj.topic) {
          qObj.topic = qObj.subtopic;
        }
        isReadingQuestion = false;
        isReadingExplanation = false;
      } else if (lowerLine.startsWith("difficulty:")) {
        qObj.difficulty = trimmedLine.substring(11).trim();
        isReadingQuestion = false;
        isReadingExplanation = false;
      } else if (lowerLine.startsWith("marks:")) {
        qObj.marks = parseInt(trimmedLine.substring(6).trim()) || 1;
        isReadingQuestion = false;
        isReadingExplanation = false;
      } else if (lowerLine.startsWith("year:")) {
        qObj.year = parseInt(trimmedLine.substring(5).trim()) || new Date().getFullYear();
        isReadingQuestion = false;
        isReadingExplanation = false;
      } else if (lowerLine.startsWith("correct:") || lowerLine.startsWith("answer:")) {
        const value = trimmedLine.substring(trimmedLine.indexOf(":") + 1).trim().toUpperCase();
        let correctIdx = 0;
        if (value === "A" || value === "0" || value.startsWith("OPTION A") || value.startsWith("OPTION 1")) {
          correctIdx = 0;
        } else if (value === "B" || value === "1" || value.startsWith("OPTION B") || value.startsWith("OPTION 2")) {
          correctIdx = 1;
        } else if (value === "C" || value === "2" || value.startsWith("OPTION C") || value.startsWith("OPTION 3")) {
          correctIdx = 2;
        } else if (value === "D" || value === "3" || value.startsWith("OPTION D") || value.startsWith("OPTION 4")) {
          correctIdx = 3;
        } else {
          correctIdx = parseInt(value) || 0;
        }
        qObj.correctAnswer = correctIdx;
        isReadingQuestion = false;
        isReadingExplanation = false;
      } else if (lowerLine.startsWith("explanation:")) {
        explanationBuffer.push(trimmedLine.substring(12).trim());
        isReadingExplanation = true;
        isReadingQuestion = false;
      } else if (
        lowerLine.startsWith("option a:") || lowerLine.startsWith("option 1:") ||
        trimmedLine.startsWith("A)") || trimmedLine.startsWith("A.")
      ) {
        qObj.options[0] = trimmedLine.substring(trimmedLine.indexOf(")") >= 0 ? trimmedLine.indexOf(")") + 1 : trimmedLine.indexOf(":") + 1).trim();
        isReadingQuestion = false;
        isReadingExplanation = false;
      } else if (
        lowerLine.startsWith("option b:") || lowerLine.startsWith("option 2:") ||
        trimmedLine.startsWith("B)") || trimmedLine.startsWith("B.")
      ) {
        qObj.options[1] = trimmedLine.substring(trimmedLine.indexOf(")") >= 0 ? trimmedLine.indexOf(")") + 1 : trimmedLine.indexOf(":") + 1).trim();
        isReadingQuestion = false;
        isReadingExplanation = false;
      } else if (
        lowerLine.startsWith("option c:") || lowerLine.startsWith("option 3:") ||
        trimmedLine.startsWith("C)") || trimmedLine.startsWith("C.")
      ) {
        qObj.options[2] = trimmedLine.substring(trimmedLine.indexOf(")") >= 0 ? trimmedLine.indexOf(")") + 1 : trimmedLine.indexOf(":") + 1).trim();
        isReadingQuestion = false;
        isReadingExplanation = false;
      } else if (
        lowerLine.startsWith("option d:") || lowerLine.startsWith("option 4:") ||
        trimmedLine.startsWith("D)") || trimmedLine.startsWith("D.")
      ) {
        qObj.options[3] = trimmedLine.substring(trimmedLine.indexOf(")") >= 0 ? trimmedLine.indexOf(")") + 1 : trimmedLine.indexOf(":") + 1).trim();
        isReadingQuestion = false;
        isReadingExplanation = false;
      } else if (lowerLine.startsWith("question:")) {
        questionBuffer.push(trimmedLine.substring(9).trim());
        isReadingQuestion = true;
        isReadingExplanation = false;
      } else {
        if (isReadingQuestion) {
          questionBuffer.push(trimmedLine);
        } else if (isReadingExplanation) {
          explanationBuffer.push(trimmedLine);
        }
      }
    });
    
    qObj.question = questionBuffer.join("\n").trim();
    qObj.explanation = explanationBuffer.join("\n").trim();
    
    // Validate required fields
    if (qObj.question && qObj.subject && qObj.options.length > 0) {
      if (!qObj.topic) qObj.topic = "General";
      qObj.id = "txt_" + index + "_" + Math.random().toString(36).substr(2, 5);
      questions.push(qObj);
    }
  });
  
  return questions;
}

// Fetch and load questions from all text files in the pyqs directory dynamically
async function loadTextQuestions() {
  // Use Vite's build-time globbing to discover all .txt files in the public directory (lazy mode)
  const txtModules = import.meta.glob('../../public/pyqs/*.txt', { query: '?url', import: 'default', eager: false });
  // Resolve each text file URL asynchronously
  const files = [];
  for (const path in txtModules) {
    try {
      const url = await txtModules[path]();
      if (url) files.push(url);
    } catch (err) {
      console.error(`Failed to resolve module path ${path}:`, err);
    }
  }

  let allQs = [];
  for (const file of files) {
    try {
      const res = await fetch(file);
      if (res.ok) {
        const text = await res.text();
        const parsed = parseTextQuestions(text);
        allQs = allQs.concat(parsed);
      }
    } catch (err) {
      console.error(`Failed to load text questions from ${file}:`, err);
    }
  }
  return allQs;
}

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

// Mock Firestore API
const mockFirestore = {
  async getQuestions(filters = {}) {
    // Dynamically load text questions at query time to keep updated
    const textQs = await loadTextQuestions();
    let localQs = JSON.parse(localStorage.getItem('gate_questions') || '[]');
    const existingQs = new Set(localQs.map(q => q.question.trim()));
    let addedCount = 0;
    textQs.forEach(q => {
      if (!existingQs.has(q.question.trim())) {
        localQs.push(q);
        addedCount++;
      }
    });
    if (addedCount > 0) {
      localStorage.setItem('gate_questions', JSON.stringify(localQs));
    }
    
    // Scan and merge all topics into syllabus
    mergeCustomTopicsIntoSyllabus(localQs);

    return new Promise((resolve) => {
      setTimeout(() => {
        let list = [...localQs];
        if (filters.subject) {
          list = list.filter(q => q.subject.toLowerCase() === filters.subject.toLowerCase());
        }
        if (filters.topics && filters.topics.length > 0) {
          const lowerTopics = filters.topics.map(t => t.toLowerCase());
          list = list.filter(q => 
            lowerTopics.includes(q.topic.toLowerCase()) || 
            (q.subtopic && lowerTopics.includes(q.subtopic.toLowerCase()))
          );
        } else if (filters.topic) {
          list = list.filter(q => 
            q.topic.toLowerCase() === filters.topic.toLowerCase() ||
            (q.subtopic && q.subtopic.toLowerCase() === filters.topic.toLowerCase())
          );
        }
        if (filters.difficultyLimit) {
          const limit = filters.difficultyLimit.toLowerCase();
          if (limit === 'easy') {
            list = list.filter(q => q.difficulty.toLowerCase() === 'easy');
          } else if (limit === 'medium') {
            list = list.filter(q => ['easy', 'medium'].includes(q.difficulty.toLowerCase()));
          }
          // If limit is 'hard', we include all questions, so no filtering needed
        } else if (filters.difficulty) {
          list = list.filter(q => q.difficulty.toLowerCase() === filters.difficulty.toLowerCase());
        }
        resolve(list);
      }, 400);
    });
  },
  
  async saveAttempt(attempt) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const attempts = JSON.parse(localStorage.getItem('gate_attempts') || '[]');
        attempt.id = 'att_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        attempt.timestamp = new Date().toISOString();
        attempts.push(attempt);
        localStorage.setItem('gate_attempts', JSON.stringify(attempts));
        resolve(attempt);
      }, 400);
    });
  },
  
  async getAttempts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = JSON.parse(localStorage.getItem('gate_attempts') || '[]');
        resolve(list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      }, 400);
    });
  },

  async deleteAttempt(attemptId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = JSON.parse(localStorage.getItem('gate_attempts') || '[]');
        const updated = list.filter(a => a.id !== attemptId);
        localStorage.setItem('gate_attempts', JSON.stringify(updated));
        resolve(true);
      }, 200);
    });
  },

  async addQuestion(question) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = JSON.parse(localStorage.getItem('gate_questions') || '[]');
        question.id = 'q_' + (list.length + 1);
        list.push(question);
        localStorage.setItem('gate_questions', JSON.stringify(list));
        resolve(question);
      }, 400);
    });
  },

  async addQuestions(questionsList) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = JSON.parse(localStorage.getItem('gate_questions') || '[]');
        const updatedList = [...list];
        questionsList.forEach((question, idx) => {
          if (!question.id) {
            question.id = 'q_imp_' + Date.now() + '_' + idx + '_' + Math.random().toString(36).substr(2, 4);
          }
          updatedList.push(question);
        });
        localStorage.setItem('gate_questions', JSON.stringify(updatedList));
        resolve(questionsList);
      }, 400);
    });
  },

  async getStudyTime() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(localStorage.getItem('gate_study_time') || '{}'));
      }, 300);
    })
  },

  async updateStudyTime(day, hours) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const times = JSON.parse(localStorage.getItem('gate_study_time') || '{}');
        times[day] = (times[day] || 0) + hours;
        localStorage.setItem('gate_study_time', JSON.stringify(times));
        resolve(times);
      }, 300);
    })
  },

  async getTopicsBySubject(subject) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = JSON.parse(localStorage.getItem('gate_questions') || '[]');
        const filtered = list.filter(q => q.subject.toLowerCase() === subject.toLowerCase());
        const topics = [...new Set(filtered.map(q => q.topic))];
        resolve(topics);
      }, 200);
    });
  },

  async getBookmarks() {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem('gate_bookmarks') || '[]'));
    });
  },
  async saveBookmark(question) {
    return new Promise((resolve) => {
      const list = JSON.parse(localStorage.getItem('gate_bookmarks') || '[]');
      if (!list.some(q => q.id === question.id)) {
        list.push(question);
        localStorage.setItem('gate_bookmarks', JSON.stringify(list));
      }
      resolve(true);
    });
  },
  async deleteBookmark(questionId) {
    return new Promise((resolve) => {
      const list = JSON.parse(localStorage.getItem('gate_bookmarks') || '[]');
      const updated = list.filter(q => q.id !== questionId);
      localStorage.setItem('gate_bookmarks', JSON.stringify(updated));
      resolve(true);
    });
  },
  async isBookmarked(questionId) {
    return new Promise((resolve) => {
      const list = JSON.parse(localStorage.getItem('gate_bookmarks') || '[]');
      resolve(list.some(q => q.id === questionId));
    });
  },
  async getSyllabusProgress() {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem('gate_syllabus_progress') || '{}'));
    });
  },
  async saveSyllabusProgress(progress) {
    return new Promise((resolve) => {
      localStorage.setItem('gate_syllabus_progress', JSON.stringify(progress));
      resolve(progress);
    });
  },
  async getUnlockedBadges() {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem('gate_unlocked_badges') || '[]'));
    });
  },
  async unlockBadge(badgeId) {
    return new Promise((resolve) => {
      const badges = JSON.parse(localStorage.getItem('gate_unlocked_badges') || '[]');
      if (!badges.includes(badgeId)) {
        badges.push(badgeId);
        localStorage.setItem('gate_unlocked_badges', JSON.stringify(badges));
      }
      resolve(badges);
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
  async getQuestions(filters = {}) {
    if (!firestore) return [];
    await this.seedQuestionsIfEmpty();
    
    // Dynamically load, parse and merge questions from public questions.txt
    const textQs = await loadTextQuestions();
    if (textQs.length > 0) {
      const qSnap = await getDocs(collection(firestore, "questions"));
      const existingQs = new Set();
      qSnap.forEach(docSnap => {
        existingQs.add(docSnap.data().question.trim());
      });
      const batchPromises = [];
      textQs.forEach(q => {
        if (!existingQs.has(q.question.trim())) {
          batchPromises.push(setDoc(doc(firestore, "questions", q.id), q));
        }
      });
      if (batchPromises.length > 0) {
        await Promise.all(batchPromises);
        console.log(`Successfully merged ${batchPromises.length} text questions to Firestore.`);
      }
    }
    
    const qSnap = await getDocs(collection(firestore, "questions"));
    let list = [];
    qSnap.forEach(docSnap => {
      list.push(docSnap.data());
    });
    
    // Scan all questions (including live DB) to add custom topics to the static syllabus
    mergeCustomTopicsIntoSyllabus(list);
    
    // Client-side filtering exactly matches mock database filtering
    if (filters.subject) {
      list = list.filter(q => q.subject.toLowerCase() === filters.subject.toLowerCase());
    }
    if (filters.topics && filters.topics.length > 0) {
      const lowerTopics = filters.topics.map(t => t.toLowerCase());
      list = list.filter(q => 
        lowerTopics.includes(q.topic.toLowerCase()) || 
        (q.subtopic && lowerTopics.includes(q.subtopic.toLowerCase()))
      );
    } else if (filters.topic) {
      list = list.filter(q => 
        q.topic.toLowerCase() === filters.topic.toLowerCase() ||
        (q.subtopic && q.subtopic.toLowerCase() === filters.topic.toLowerCase())
      );
    }
    if (filters.difficultyLimit) {
      const limit = filters.difficultyLimit.toLowerCase();
      if (limit === 'easy') {
        list = list.filter(q => q.difficulty.toLowerCase() === 'easy');
      } else if (limit === 'medium') {
        list = list.filter(q => ['easy', 'medium'].includes(q.difficulty.toLowerCase()));
      }
      // If limit is 'hard', we include all questions, so no filtering needed
    } else if (filters.difficulty) {
      list = list.filter(q => q.difficulty.toLowerCase() === filters.difficulty.toLowerCase());
    }
    return list;
  },
  
  async saveAttempt(attempt) {
    if (!firestore) throw new Error("Firestore is not initialized.");
    const user = authInstance ? authInstance.currentUser : null;
    attempt.id = 'att_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    attempt.timestamp = new Date().toISOString();
    attempt.userId = user ? user.uid : 'anonymous';
    
    await setDoc(doc(firestore, "attempts", attempt.id), attempt);
    return attempt;
  },
  
  async getAttempts() {
    if (!firestore) return [];
    const user = authInstance ? authInstance.currentUser : null;
    if (!user) return [];
    
    const q = query(collection(firestore, "attempts"), where("userId", "==", user.uid));
    const qSnap = await getDocs(q);
    const list = [];
    qSnap.forEach(docSnap => {
      list.push(docSnap.data());
    });
    return list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async deleteAttempt(attemptId) {
    if (!firestore) throw new Error("Firestore is not initialized.");
    const { deleteDoc } = await import('firebase/firestore');
    await deleteDoc(doc(firestore, "attempts", attemptId));
    return true;
  },

  async addQuestion(question) {
    if (!firestore) throw new Error("Firestore is not initialized.");
    if (!question.id) {
      const qSnap = await getDocs(collection(firestore, "questions"));
      question.id = 'q_' + (qSnap.size + 1);
    }
    await setDoc(doc(firestore, "questions", question.id), question);
    return question;
  },

  async addQuestions(questionsList) {
    if (!firestore) throw new Error("Firestore is not initialized.");
    const batchPromises = questionsList.map((question, idx) => {
      if (!question.id) {
        question.id = 'q_imp_' + Date.now() + '_' + idx + '_' + Math.random().toString(36).substr(2, 4);
      }
      return setDoc(doc(firestore, "questions", question.id), question);
    });
    await Promise.all(batchPromises);
    return questionsList;
  },

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

  async seedQuestionsIfEmpty() {
    if (!firestore) return;
    try {
      const qSnap = await getDocs(collection(firestore, "questions"));
      if (qSnap.empty) {
        console.log("Firestore questions collection is empty. Seeding questions...");
        const questionsToSeed = [...DEFAULT_QUESTIONS];
        try {
          const res = await fetch('/pyqs/questions.json');
          if (res.ok) {
            const externalQs = await res.json();
            if (Array.isArray(externalQs)) {
              externalQs.forEach(q => {
                if (!questionsToSeed.some(existing => existing.question.trim() === q.question.trim())) {
                  if (!q.id) {
                    q.id = 'gate_ext_' + Math.random().toString(36).substr(2, 9);
                  }
                  questionsToSeed.push(q);
                }
              });
            }
          }
        } catch (e) {
          console.error("Could not fetch external questions for seeding:", e);
        }

        // Seed to Firestore
        const batchPromises = questionsToSeed.map(q => 
          setDoc(doc(firestore, "questions", q.id), q)
        );
        await Promise.all(batchPromises);
        console.log(`Successfully seeded ${questionsToSeed.length} questions to Firestore.`);
      }
    } catch (err) {
      console.error("Failed to seed questions:", err);
    }
  },

  async getBookmarks() {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem('gate_bookmarks') || '[]'));
    });
  },
  async saveBookmark(question) {
    return new Promise((resolve) => {
      const list = JSON.parse(localStorage.getItem('gate_bookmarks') || '[]');
      if (!list.some(q => q.id === question.id)) {
        list.push(question);
        localStorage.setItem('gate_bookmarks', JSON.stringify(list));
      }
      resolve(true);
    });
  },
  async deleteBookmark(questionId) {
    return new Promise((resolve) => {
      const list = JSON.parse(localStorage.getItem('gate_bookmarks') || '[]');
      const updated = list.filter(q => q.id !== questionId);
      localStorage.setItem('gate_bookmarks', JSON.stringify(updated));
      resolve(true);
    });
  },
  async isBookmarked(questionId) {
    return new Promise((resolve) => {
      const list = JSON.parse(localStorage.getItem('gate_bookmarks') || '[]');
      resolve(list.some(q => q.id === questionId));
    });
  },
  async getSyllabusProgress() {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem('gate_syllabus_progress') || '{}'));
    });
  },
  async saveSyllabusProgress(progress) {
    return new Promise((resolve) => {
      localStorage.setItem('gate_syllabus_progress', JSON.stringify(progress));
      resolve(progress);
    });
  },
  async getUnlockedBadges() {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem('gate_unlocked_badges') || '[]'));
    });
  },
  async unlockBadge(badgeId) {
    return new Promise((resolve) => {
      const badges = JSON.parse(localStorage.getItem('gate_unlocked_badges') || '[]');
      if (!badges.includes(badgeId)) {
        badges.push(badgeId);
        localStorage.setItem('gate_unlocked_badges', JSON.stringify(badges));
      }
      resolve(badges);
    });
  }
};

// Export services depending on configuration mode
export const auth = useMock ? mockAuth : realAuth;
export const db = useMock ? mockFirestore : realFirestore;
export const isMockMode = useMock;
export { firebaseConfig };

export const SUBJECT_SYLLABUS = {
  "Engineering Mathematics": {
    "Discrete Mathematics": [
      "Propositional Logic",
      "Predicate Logic",
      "Sets",
      "Relations",
      "Functions",
      "Partial Orders",
      "Lattices",
      "Groups",
      "Graph Theory",
      "Trees",
      "Combinatorics",
      "Recurrence Relations",
      "Mathematical Induction"
    ],
    "Linear Algebra": [
      "Matrices",
      "Matrix Operations",
      "Rank of Matrix",
      "Determinants",
      "Inverse of Matrix",
      "Systems of Linear Equations",
      "Eigenvalues",
      "Eigenvectors"
    ],
    "Calculus": [
      "Limits",
      "Continuity",
      "Differentiability",
      "Partial Derivatives",
      "Maxima and Minima"
    ],
    "Probability & Statistics": [
      "Probability",
      "Conditional Probability",
      "Bayes Theorem",
      "Random Variables",
      "Mean",
      "Variance",
      "Standard Deviation",
      "Binomial Distribution",
      "Normal Distribution"
    ]
  },
  "Digital Logic": {
    "Number Systems & Codes": ["Number Systems", "Binary Arithmetic"],
    "Boolean Algebra": ["Boolean Algebra", "Logic Gates", "Canonical Forms", "Karnaugh Maps (K-Map)"],
    "Combinational Circuits": ["Combinational Circuits", "Multiplexers", "Demultiplexers", "Encoders", "Decoders", "Adders", "Subtractors", "Comparators"],
    "Sequential Circuits": ["Sequential Circuits", "Flip-Flops", "Registers", "Counters", "Finite State Machines (FSM)", "Logic Families"]
  },
  "Computer Organization & Architecture (COA)": {
    "Machine Instructions & ALU": ["Machine Instructions", "Instruction Formats", "Addressing Modes", "ALU", "Data Path", "Control Unit", "CPU Organization"],
    "Pipelining": ["Pipelining", "Pipeline Hazards", "Instruction-Level Parallelism"],
    "Memory Hierarchy": ["Memory Hierarchy", "Cache Memory", "Virtual Memory", "Main Memory", "Secondary Storage"],
    "I/O & Performance": ["Interrupts", "DMA", "I/O Organization", "Performance Metrics"]
  },
  "Programming & Data Structures": {
    "Programming": [
      "C Programming Basics",
      "Pointers",
      "Arrays",
      "Strings",
      "Structures",
      "Unions",
      "Dynamic Memory Allocation",
      "Recursion",
      "File Handling"
    ],
    "Data Structures": [
      "Arrays",
      "Linked Lists",
      "Stacks",
      "Queues",
      "Hash Tables",
      "Trees",
      "Binary Trees",
      "Binary Search Trees",
      "AVL Trees",
      "Heaps",
      "Tries",
      "Graph Representation",
      "Disjoint Sets"
    ]
  },
  "Algorithms": {
    "Analysis & Design Techniques": ["Asymptotic Analysis", "Time Complexity", "Space Complexity", "Recurrence Relations", "Divide and Conquer", "Greedy Algorithms", "Dynamic Programming", "Backtracking", "Branch and Bound"],
    "Graph Algorithms": ["Graph Algorithms", "BFS", "DFS", "Topological Sort", "Dijkstra", "Bellman-Ford", "Floyd-Warshall", "Prim", "Kruskal"],
    "String Matching & Complexity": ["String Matching", "Pattern Matching", "NP-Complete"]
  },
  "Theory of Computation (TOC)": {
    "Automata & Languages": ["Languages", "Alphabets", "Strings", "Regular Expressions", "Finite Automata", "DFA", "NFA", "ϵ-NFA", "Regular Languages", "Pumping Lemma"],
    "Context-Free Languages": ["Context-Free Grammar (CFG)", "Pushdown Automata (PDA)", "Parse Trees", "Ambiguity"],
    "Turing Machines & Decidability": ["Turing Machines", "Recursive Languages", "Recursively Enumerable Languages", "Decidability", "Undecidability", "Church-Turing Thesis"]
  },
  "Compiler Design": {
    "Lexical & Syntax Analysis": ["Lexical Analysis", "Tokens", "Regular Expressions", "Finite Automata", "Syntax Analysis", "Parsing", "LL Parser", "LR Parser", "SLR", "CLR", "LALR"],
    "Translation & Run-time": ["Syntax Directed Translation", "Intermediate Code Generation", "Runtime Environment", "Symbol Table"],
    "Optimization & Generation": ["Code Optimization", "Code Generation"]
  },
  "Operating Systems": {
    "Processes & Scheduling": ["Operating System Functions", "Processes", "Threads", "CPU Scheduling", "Process Synchronization", "Semaphores", "Monitors", "Deadlocks"],
    "Memory Management": ["Memory Management", "Paging", "Segmentation", "Virtual Memory"],
    "Storage & Protection": ["File Systems", "Disk Scheduling", "I/O Systems", "Protection", "Security"]
  },
  "Databases (DBMS)": {
    "Database Design": ["ER Model", "Relational Model", "Relational Algebra", "Relational Calculus", "SQL", "Integrity Constraints"],
    "Database Tuning": ["Functional Dependencies", "Normalization"],
    "Transaction & Recovery": ["Transactions", "ACID Properties", "Concurrency Control", "Locking Protocols", "Timestamp Protocol", "Recovery"],
    "File Structures": ["Indexing", "B+ Trees", "Hashing"]
  },
  "Computer Networks (CN)": {
    "Foundation & Physical/Link Layer": ["OSI Model", "TCP/IP Model", "Physical Layer", "Data Link Layer", "MAC Protocols", "Error Detection", "Error Correction", "Flow Control"],
    "Network Layer": ["Network Layer", "IP Addressing", "Subnetting", "CIDR", "Routing Algorithms", "Distance Vector Routing", "Link State Routing"],
    "Transport & Application Layer": ["Transport Layer", "UDP", "TCP", "Congestion Control", "Application Layer", "DNS", "HTTP", "FTP", "SMTP", "DHCP", "Network Security Basics"]
  },
  "General Aptitude": {
    "Verbal Ability": [
      "Grammar",
      "Vocabulary",
      "Reading Comprehension",
      "Sentence Completion",
      "Para Jumbles",
      "Verbal Analogies",
      "Critical Reasoning"
    ],
    "Quantitative Aptitude": [
      "Percentages",
      "Profit & Loss",
      "Ratio & Proportion",
      "Time & Work",
      "Time, Speed & Distance",
      "Simple Interest",
      "Compound Interest",
      "Averages",
      "Mixtures",
      "Probability",
      "Permutation & Combination",
      "Geometry",
      "Mensuration",
      "Data Interpretation"
    ],
    "Analytical Aptitude": [
      "Logical Reasoning",
      "Blood Relations",
      "Coding-Decoding",
      "Directions",
      "Series",
      "Puzzles",
      "Syllogisms"
    ]
  }
};
