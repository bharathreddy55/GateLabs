import { db } from '../config/firebase';
import { showToast } from '../utils/toast';

const GATE_SYSTEM_PROMPT = `You are an expert GATE CS & IT 2027 AI Study Tutor. You have deep knowledge of the entire GATE CS syllabus conducted by IIT Madras.

GATE 2027 Exam Format:
- 65 questions, 100 marks, 3 hours
- General Aptitude: 15 marks (10 questions)  
- Engineering Mathematics: 13 marks
- Core CS subjects: 72 marks
- MCQs (negative marking -1/3), MSQs (no negative), NAT (no negative)
- Difficulty: Moderate to Hard, application-based (not rote learning)

Your capabilities:
1. EXPLAIN any concept from GATE CS syllabus (OS, DBMS, Networks, Algorithms, TOC, Compiler Design, COA, Digital Logic, Programming & DS, Engineering Mathematics, General Aptitude)
2. GENERATE new GATE 2027-standard practice questions when asked
3. SOLVE problems step-by-step with full working
4. REFERENCE relevant past-year questions from the database when applicable

When generating NEW practice questions:
- Match GATE difficulty and style (no trivial textbook definitions)
- Include real numerical problems, tracing code, analyzing algorithms
- Always include 4 options (A/B/C/D), correct answer, and detailed explanation
- Mix 1-mark (simple concept) and 2-mark (multi-step problems) questions

Format responses with clean HTML. Use <p>, <br>, <strong>, <ul>, <li>, <code>, <ol>, <div class="...">.
Never use markdown code blocks or \`\`\` backticks.
Be concise but thorough. Use examples and step-by-step breakdowns.`;

const GATE_TOPIC_HINTS = {
  'os': 'Operating Systems',
  'operating system': 'Operating Systems',
  'deadlock': 'Operating Systems - Deadlocks',
  'scheduling': 'Operating Systems - CPU Scheduling',
  'paging': 'Operating Systems - Memory Management',
  'page fault': 'Operating Systems - Virtual Memory',
  'semaphore': 'Operating Systems - Process Synchronization',
  'dbms': 'Databases (DBMS)',
  'sql': 'Databases (DBMS) - SQL',
  'normalization': 'Databases (DBMS) - Normalization',
  'b+ tree': 'Databases (DBMS) - File Structures',
  'network': 'Computer Networks (CN)',
  'tcp': 'Computer Networks (CN) - TCP',
  'ip': 'Computer Networks (CN) - IP Addressing',
  'routing': 'Computer Networks (CN) - Routing',
  'algorithm': 'Algorithms',
  'sorting': 'Algorithms - Sorting',
  'graph': 'Algorithms - Graph Algorithms',
  'dp': 'Algorithms - Dynamic Programming',
  'dynamic programming': 'Algorithms - Dynamic Programming',
  'mst': 'Algorithms - Minimum Spanning Tree',
  'spanning tree': 'Algorithms - Minimum Spanning Tree',
  'compiler': 'Compiler Design',
  'grammar': 'Compiler Design - Syntax Analysis',
  'parsing': 'Compiler Design - Syntax Analysis',
  'automata': 'Theory of Computation (TOC)',
  'dfa': 'Theory of Computation (TOC)',
  'nfa': 'Theory of Computation (TOC)',
  'turing': 'Theory of Computation (TOC)',
  'regular': 'Theory of Computation (TOC)',
  'cfl': 'Theory of Computation (TOC)',
  'context free': 'Theory of Computation (TOC)',
  'coa': 'Computer Organization & Architecture (COA)',
  'cache': 'Computer Organization & Architecture (COA) - Cache Memory',
  'pipeline': 'Computer Organization & Architecture (COA) - Pipelining',
  'ieee': 'Computer Organization & Architecture (COA) - IEEE 754',
  'floating point': 'Computer Organization & Architecture (COA) - IEEE 754',
  'logic': 'Digital Logic',
  'gate': 'Digital Logic - Logic Gates',
  'flipflop': 'Digital Logic - Sequential Circuits',
  'mux': 'Digital Logic - Multiplexers',
  'linear algebra': 'Engineering Mathematics - Linear Algebra',
  'eigenvalue': 'Engineering Mathematics - Linear Algebra',
  'matrix': 'Engineering Mathematics - Linear Algebra',
  'probability': 'Engineering Mathematics - Probability & Statistics',
  'calculus': 'Engineering Mathematics - Calculus',
  'discrete': 'Engineering Mathematics - Discrete Mathematics',
  'tree': 'Programming & Data Structures - Trees',
  'heap': 'Programming & Data Structures - Heap',
  'linked list': 'Programming & Data Structures - Linked Lists',
  'stack': 'Programming & Data Structures - Stacks',
  'queue': 'Programming & Data Structures - Queues',
  'pointer': 'Programming & Data Structures - C Programming',
  'recursion': 'Programming & Data Structures - Recursion',
};

export const Assistant = {
  questions: [],

  render() {
    return `
      <div class="flex flex-col h-[calc(100vh-10rem)] gap-4 animate-fade-in font-sans">
        <!-- Main Chat Panel -->
        <div class="flex-1 glass-panel rounded-3xl flex flex-col overflow-hidden">
          <!-- Chat Header -->
          <div class="px-6 py-4 border-b border-slate-200/40 dark:border-white/[0.06] flex items-center justify-between bg-white/50 dark:bg-slate-900/30">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <i class="fa-solid fa-wand-magic-sparkles text-white text-lg"></i>
              </div>
              <div>
                <h4 class="font-display font-extrabold text-slate-900 dark:text-white tracking-tight">AI Study Assistant — GATE 2027</h4>
                <p id="assistant-status" class="text-xs text-emerald-500 font-bold flex items-center gap-1.5 mt-0.5">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online | Loading index...
                </p>
              </div>
            </div>
            <div class="flex gap-2">
              <button id="btn-generate-qs" class="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-primary-600 to-indigo-650 hover:from-primary-500 hover:to-indigo-550 text-white shadow-md transition-all active:scale-95">
                <i class="fa-solid fa-sparkles animate-pulse"></i> Generate Practice Qs
              </button>
            </div>
          </div>

          <!-- Quick Topics Bar -->
          <div class="px-6 py-3 border-b border-slate-100/40 dark:border-white/[0.03] flex gap-2 overflow-x-auto no-scrollbar bg-slate-50/20 dark:bg-slate-950/10">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider my-auto mr-1 flex-shrink-0">Ask about:</span>
            ${['Deadlocks', 'Page Replacement', 'SQL Joins', 'DFA/NFA', 'MST Algorithms', 'Cache Memory', 'Normalization', 'TCP/IP', 'Dynamic Programming', 'Generate Questions'].map(t => `
              <button class="quick-topic-btn flex-shrink-0 px-3 py-1.5 text-[11px] font-bold rounded-xl border border-slate-200/60 dark:border-white/[0.08] bg-white/50 dark:bg-slate-950/30 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-105 active:scale-95 transition-all text-slate-600 dark:text-slate-400" data-topic="${t}">
                ${t}
              </button>
            `).join('')}
          </div>

          <!-- Message History -->
          <div id="chat-history" class="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            <!-- Bot welcome message -->
            <div class="flex gap-4 max-w-3xl">
              <div class="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary-500 to-indigo-600 text-white flex items-center justify-center text-sm flex-shrink-0 shadow-md shadow-primary-500/10">
                <i class="fa-solid fa-robot"></i>
              </div>
              <div class="p-5 rounded-2xl rounded-tl-none border border-slate-200/40 dark:border-white/[0.06] bg-white/80 dark:bg-slate-900/40 backdrop-blur-md text-sm leading-relaxed text-slate-800 dark:text-slate-250 shadow-sm font-semibold">
                <p class="font-bold text-primary-600 dark:text-primary-400 mb-2 flex items-center gap-1.5">👋 Hello! I am your GATE 2027 AI Study Tutor</p>
                <p class="mb-3">I can help you with <strong>any GATE CS topic</strong>. Here is what I can do:</p>
                <ul class="list-disc list-inside space-y-1.5 text-slate-655 dark:text-slate-400 mb-3">
                  <li><strong>Explain</strong> any concept from OS, DBMS, Networks, TOC, Algorithms, COA, Compiler Design, Digital Logic, and more</li>
                  <li><strong>Generate new GATE-standard practice questions</strong> on any topic you choose</li>
                  <li><strong>Solve problems step-by-step</strong> with full working and intuition</li>
                  <li><strong>Reference past-year questions</strong> from GATE 2021–2025 datasets</li>
                </ul>
                <p class="text-xs text-slate-400">Try the quick-topic buttons above, or type your own question below!</p>
              </div>
            </div>
          </div>

          <!-- Chat Input -->
          <div class="p-4 border-t border-slate-200/40 dark:border-white/[0.06] bg-white/50 dark:bg-slate-900/30">
            <form id="chat-form" class="flex gap-3">
              <input type="text" id="chat-input" required placeholder="Ask anything — explain deadlocks, generate OS questions, solve a probability problem..." class="glass-input">
              <button type="submit" class="px-5 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md active:scale-95 hover:scale-105 transition-all">
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  getRelevantContext(questionText) {
    const query = questionText.toLowerCase();
    const keywords = query.split(/\s+/).filter(w => w.length > 3);
    
    const scored = this.questions.map(q => {
      let score = 0;
      const textToSearch = [q.subject, q.topic, q.subtopic || '', q.question, q.explanation || ''].join(' ').toLowerCase();
      keywords.forEach(kw => { if (textToSearch.includes(kw)) score += 1; });
      if (q.subject && query.includes(q.subject.toLowerCase())) score += 5;
      if (q.topic && query.includes(q.topic.toLowerCase())) score += 3;
      return { question: q, score };
    });

    return scored.filter(i => i.score > 0).sort((a, b) => b.score - a.score).slice(0, 4).map(i => i.question);
  },

  detectTopicHint(query) {
    const lower = query.toLowerCase();
    for (const [key, val] of Object.entries(GATE_TOPIC_HINTS)) {
      if (lower.includes(key)) return val;
    }
    return null;
  },

  isGenerateRequest(query) {
    const lower = query.toLowerCase();
    return lower.includes('generate') || lower.includes('create question') || lower.includes('practice question') || lower.includes('make question') || lower.includes('new question') || lower.includes('give me question') || lower.includes('give question');
  },

  appendMessage(chatHistory, role, html, isLoading = false) {
    const msgId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2,5);
    const wrapper = document.createElement('div');
    wrapper.className = role === 'user' ? 'flex gap-4 max-w-2xl ml-auto flex-row-reverse' : 'flex gap-4 max-w-3xl';
    
    const iconClass = role === 'user'
      ? 'h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm flex-shrink-0'
      : 'h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center text-sm flex-shrink-0';
    const iconContent = role === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

    const bubbleClass = role === 'user'
      ? 'p-4 rounded-2xl rounded-tr-none bg-gradient-to-tr from-primary-600 to-indigo-650 text-white text-sm leading-relaxed max-w-prose shadow-md shadow-primary-600/10'
      : `p-5 rounded-2xl rounded-tl-none border border-slate-200/40 dark:border-white/[0.04] bg-white/80 dark:bg-slate-900/40 backdrop-blur-md text-sm leading-relaxed text-slate-800 dark:text-slate-200 max-w-prose shadow-sm ${isLoading ? 'italic text-slate-400 flex items-center gap-2' : ''}`;

    wrapper.innerHTML = `
      <div class="${iconClass}">${iconContent}</div>
      <div id="${msgId}" class="${bubbleClass}">${html}</div>
    `;
    chatHistory.appendChild(wrapper);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    return msgId;
  },

  async callGemini(apiKey, userPrompt, matchedQs) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    let dbContext = '';
    if (matchedQs.length > 0) {
      dbContext = `\n\nRelevant past-year GATE questions from the database:\n` +
        matchedQs.map((q, i) => `
[DB Question ${i+1}] ${q.subject} — ${q.topic} (GATE ${q.year || 'N/A'}, ${q.difficulty})
Q: ${q.question}
A) ${q.options?.[0] || ''} B) ${q.options?.[1] || ''} C) ${q.options?.[2] || ''} D) ${q.options?.[3] || ''}
Correct: Option ${String.fromCharCode(65 + (q.correctAnswer || 0))}
Explanation: ${q.explanation}
`).join('\n---\n');
    }

    const body = {
      system_instruction: { parts: [{ text: GATE_SYSTEM_PROMPT }] },
      contents: [{
        parts: [{
          text: `User Question: ${userPrompt}
${dbContext}

${this.isGenerateRequest(userPrompt)
  ? 'Generate 3–5 new GATE 2027-standard practice questions on this topic. For each: include question stem, 4 options (A/B/C/D), indicate correct answer, and provide a detailed step-by-step explanation. Make them application-based and GATE-difficulty.'
  : 'Answer the user\'s question comprehensively. Explain the concept clearly, use worked examples, and refer to the database questions above if relevant. If appropriate, also generate 1–2 new related practice questions at the end.'
}`
        }]
      }]
    };

    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
  },

  renderLocalSmartResponse(replyElement, matchedQs, question) {
    if (!replyElement) return;
    replyElement.classList.remove('italic', 'text-slate-400', 'flex', 'items-center', 'gap-2');

    const topicHint = this.detectTopicHint(question);
    const isGenReq = this.isGenerateRequest(question);

    if (isGenReq) {
      // Local fallback for generate requests
      replyElement.innerHTML = `
        <p class="font-bold text-primary-600 dark:text-primary-400 mb-3">🤖 To generate custom GATE questions, a Gemini API Key is required.</p>
        <p class="mb-3">Configure your key in <strong>AI Config</strong> (sidebar footer) to unlock full AI generation.</p>
        ${matchedQs.length > 0 ? `
        <p class="font-semibold mb-2 mt-4 text-slate-700 dark:text-slate-300">📚 Meanwhile, here are similar questions from the dataset:</p>
        ${matchedQs.map((q, i) => `
          <div class="mb-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-darkbg-100/50">
            <p class="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase mb-1">${q.subject} — ${q.topic} · GATE ${q.year || 'N/A'} · ${q.difficulty}</p>
            <p class="font-semibold text-slate-800 dark:text-slate-200 mb-2">${q.question.replace(/\n/g, '<br>')}</p>
            <ul class="space-y-1 text-xs text-slate-600 dark:text-slate-400 mb-2">
              ${q.options?.map((o, idx) => `<li><strong>${String.fromCharCode(65+idx)})</strong> ${o}</li>`).join('') || ''}
            </ul>
            <p class="text-emerald-600 dark:text-emerald-400 font-bold text-xs">✓ Correct: Option ${String.fromCharCode(65 + (q.correctAnswer||0))}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${q.explanation.replace(/\n/g, '<br>')}</p>
          </div>
        `).join('')}` : ''}
      `;
      return;
    }

    // Build a rich local explanation response
    let html = '';
    
    if (topicHint) {
      html += `<p class="font-bold text-primary-600 dark:text-primary-400 mb-3">📖 Topic: ${topicHint}</p>`;
    }

    // Built-in concept explanations for common topics (no API needed)
    const conceptMap = {
      'deadlock': `<p class="mb-3"><strong>Deadlock</strong> is a state where a set of processes are permanently blocked, each waiting for a resource held by another process.</p>
        <p class="mb-2"><strong>Four Necessary Conditions (Coffman, 1971):</strong></p>
        <ul class="list-disc list-inside space-y-1 mb-3 text-slate-600 dark:text-slate-400">
          <li><strong>Mutual Exclusion:</strong> Only one process can use a resource at a time.</li>
          <li><strong>Hold and Wait:</strong> A process holding resources can request more.</li>
          <li><strong>No Preemption:</strong> Resources cannot be forcibly taken from a process.</li>
          <li><strong>Circular Wait:</strong> P1 waits for P2, P2 waits for P3, ... Pn waits for P1.</li>
        </ul>
        <p class="mb-2"><strong>Banker's Algorithm</strong> (Deadlock Avoidance): Checks if granting a request leads to a safe state before allocating.</p>`,
      'page replacement': `<p class="mb-3"><strong>Page Replacement Algorithms</strong> are used in virtual memory when a page fault occurs and memory is full.</p>
        <ul class="list-disc list-inside space-y-1 mb-3 text-slate-600 dark:text-slate-400">
          <li><strong>OPT (Optimal):</strong> Replace the page that won't be used for the longest time. (Theoretical minimum faults)</li>
          <li><strong>FIFO:</strong> Replace the oldest page. Simple but suffers from Belady's Anomaly.</li>
          <li><strong>LRU:</strong> Replace the least recently used page. Practical approximation of OPT.</li>
          <li><strong>LFU:</strong> Replace the least frequently used page.</li>
          <li><strong>Clock (Second Chance):</strong> Circular FIFO with a reference bit. Used in Linux.</li>
        </ul>`,
      'normalization': `<p class="mb-3"><strong>Normalization</strong> is the process of organizing a relational database to reduce redundancy and improve integrity.</p>
        <ul class="list-disc list-inside space-y-1 mb-3 text-slate-600 dark:text-slate-400">
          <li><strong>1NF:</strong> All attributes are atomic; no repeating groups.</li>
          <li><strong>2NF:</strong> 1NF + no partial dependency (every non-key attribute depends on the <em>whole</em> primary key).</li>
          <li><strong>3NF:</strong> 2NF + no transitive dependency (non-key attributes depend only on the primary key).</li>
          <li><strong>BCNF:</strong> For every FD X→Y, X must be a superkey.</li>
        </ul>`,
      'tcp': `<p class="mb-3"><strong>TCP (Transmission Control Protocol)</strong> is a reliable, connection-oriented protocol at the Transport Layer.</p>
        <p class="mb-2"><strong>3-Way Handshake:</strong></p>
        <ol class="list-decimal list-inside space-y-1 mb-3 text-slate-600 dark:text-slate-400">
          <li>Client → SYN (SEQ=x)</li>
          <li>Server → SYN-ACK (SEQ=y, ACK=x+1)</li>
          <li>Client → ACK (ACK=y+1)</li>
        </ol>
        <p class="mb-2"><strong>Key features:</strong> Flow control (sliding window), Congestion control (slow start, AIMD), Error detection (checksum), Reliable delivery (retransmission).</p>`,
      'dfa': `<p class="mb-3"><strong>Deterministic Finite Automaton (DFA)</strong> accepts/rejects strings over an alphabet. Defined as M = (Q, Σ, δ, q₀, F).</p>
        <ul class="list-disc list-inside space-y-1 mb-2 text-slate-600 dark:text-slate-400">
          <li>Q: finite set of states</li>
          <li>Σ: input alphabet</li>
          <li>δ: Q × Σ → Q (transition function — deterministic, total)</li>
          <li>q₀: start state; F: set of accepting states</li>
        </ul>
        <p class="mb-2"><strong>Key facts:</strong> DFA = NFA in power (both accept Regular Languages). Minimization via Myhill-Nerode theorem.</p>`,
    };

    let conceptFound = false;
    const lower = question.toLowerCase();
    for (const [key, explanation] of Object.entries(conceptMap)) {
      if (lower.includes(key)) {
        html += explanation;
        conceptFound = true;
        break;
      }
    }

    if (!conceptFound && matchedQs.length > 0) {
      html += `<p class="mb-3">Here are relevant questions from our GATE past-paper database:</p>`;
    } else if (!conceptFound) {
      html += `<p class="mb-3">I can explain this concept! For a fully personalized AI explanation with generated examples, configure your <strong>Gemini API Key</strong> in the sidebar's <strong>AI Config</strong> section.</p>`;
    }

    if (matchedQs.length > 0) {
      html += `<p class="font-semibold mt-4 mb-2 text-slate-700 dark:text-slate-300">📚 Past-Year Questions from Dataset:</p>`;
      matchedQs.forEach((q, idx) => {
        html += `
          <div class="mb-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-darkbg-100/50">
            <p class="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase mb-1">${q.subject} — ${q.topic} · GATE ${q.year || 'N/A'} · ${q.difficulty}</p>
            <p class="font-semibold text-slate-800 dark:text-slate-200 mb-2">${q.question.replace(/\n/g, '<br>')}</p>
            ${q.options ? `<ul class="space-y-1 text-xs text-slate-600 dark:text-slate-400 mb-2">
              ${q.options.map((o, i) => `<li><strong>${String.fromCharCode(65+i)})</strong> ${o}</li>`).join('')}
            </ul>` : ''}
            <p class="text-emerald-600 dark:text-emerald-400 font-bold text-xs">✓ Correct: Option ${String.fromCharCode(65 + (q.correctAnswer||0))}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${q.explanation.replace(/\n/g, '<br>')}</p>
          </div>
        `;
      });
    }

    if (!html) {
      html = `<p>I couldn't find a match for "<em>${question.replace(/</g,'&lt;')}</em>". Try asking about a specific topic like deadlocks, paging, normalization, or DFA — or configure a Gemini API key for full AI answers.</p>`;
    }

    replyElement.innerHTML = html;
    const chatHistory = document.getElementById('chat-history');
    if (chatHistory) chatHistory.scrollTop = chatHistory.scrollHeight;
  },

  async init() {
    const statusText = document.getElementById('assistant-status');
    try {
      this.questions = await db.getQuestions({});
      if (statusText) {
        statusText.innerHTML = `<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online | Indexed ${this.questions.length} Questions`;
      }
    } catch (err) {
      console.error('Failed to index questions for AI Assistant:', err);
      if (statusText) {
        statusText.innerHTML = `<span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span> Online | Index Offline`;
      }
    }

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatHistory = document.getElementById('chat-history');

    // Quick topic buttons
    document.querySelectorAll('.quick-topic-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const topic = btn.getAttribute('data-topic');
        chatInput.value = topic === 'Generate Questions'
          ? 'Generate 5 GATE 2027-standard practice questions on Operating Systems'
          : `Explain ${topic} for GATE 2027 exam`;
        chatInput.focus();
      });
    });

    // Generate Practice Qs button
    document.getElementById('btn-generate-qs')?.addEventListener('click', () => {
      chatInput.value = 'Generate 5 GATE 2027-standard questions across mixed subjects (OS, Networks, Algorithms, TOC, DBMS)';
      chatForm?.dispatchEvent(new Event('submit'));
    });

    chatForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const question = chatInput.value.trim();
      if (!question) return;

      this.appendMessage(chatHistory, 'user', question.replace(/</g,'&lt;').replace(/>/g,'&gt;'));
      chatInput.value = '';

      const loadingId = this.appendMessage(chatHistory, 'bot', '<span>Thinking...</span><i class="fa-solid fa-circle-notch animate-spin"></i>', true);
      const replyElement = document.getElementById(loadingId);

      const apiKey = localStorage.getItem('gemini_api_key');
      const matchedQs = this.getRelevantContext(question);

      if (apiKey) {
        try {
          const replyText = await this.callGemini(apiKey, question, matchedQs);
          if (replyElement) {
            replyElement.classList.remove('italic', 'text-slate-400', 'flex', 'items-center', 'gap-2');
            replyElement.innerHTML = replyText;
            chatHistory.scrollTop = chatHistory.scrollHeight;
          }
        } catch (err) {
          console.error('Gemini API error, using smart local fallback:', err);
          showToast("Gemini API request failed. Falling back to local syllabus resources.", "info");
          this.renderLocalSmartResponse(replyElement, matchedQs, question);
        }
      } else {
        setTimeout(() => {
          this.renderLocalSmartResponse(replyElement, matchedQs, question);
        }, 600);
      }
    });
  }
};
