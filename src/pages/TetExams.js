import { db } from '../config/firebase';
import { showToast } from '../utils/toast';
import { MockTest } from './MockTest';

export const TetExams = {
  parsedQuestions: [],
  
  async render() {
    return `
      <div class="flex flex-col gap-6 animate-fade-in font-sans pb-12">
        
        <!-- Header Info Card -->
        <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] bg-gradient-to-r from-primary-500/5 via-indigo-500/5 to-purple-500/5 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div class="absolute -right-20 -top-20 w-48 h-48 bg-primary-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div class="flex items-center gap-4 relative z-10">
            <div class="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary-500/10 to-indigo-650/10 text-primary-500 flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
              <i class="fa-solid fa-chalkboard-user"></i>
            </div>
            <div>
              <h3 class="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-tight">TET (Teacher Eligibility Test) Simulator</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">Practice under realistic CBT exam conditions: 150 Minutes, 150 Questions, No Negative Marks.</p>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-wrap relative z-10">
            <button id="btn-load-tet-practice-1" class="px-4.5 py-2.5 rounded-xl bg-primary-500 text-white text-xs font-bold hover:scale-102 transition-all select-none active:scale-95 flex items-center gap-1.5 shadow-sm">
              <i class="fa-solid fa-file-invoice"></i> Load 'TET Practice 1'
            </button>
            <button id="btn-load-sample-tet" class="px-4.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all select-none active:scale-95 flex items-center gap-1.5">
              <i class="fa-solid fa-file-import"></i> Load Sample 150 Qs
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column: Paste doubts/questions -->
          <div class="lg:col-span-2 flex flex-col gap-4">
            <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <h4 class="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Paste Exam Questions</h4>
                <button id="btn-toggle-format-guide" class="text-xs text-primary-500 font-bold hover:underline">Format Guide</button>
              </div>

              <!-- Format Guide Box (Collapsible) -->
              <div id="format-guide-box" class="hidden p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-950/20 border border-slate-200/20 text-[11px] text-slate-505 dark:text-slate-400 font-semibold space-y-2">
                <p class="text-xs text-slate-900 dark:text-white font-extrabold">Standard Question Paste Format:</p>
                <p>Paste your questions block matching the format below (separating each question with empty space):</p>
                <pre class="bg-black/5 dark:bg-black/30 p-3 rounded-xl overflow-x-auto text-[10px] text-primary-500 font-mono">
Q1: What is the primary focus of Child Development?
A) Physical growth
B) Cognitive changes
C) Social development
D) All of the above
Answer: D
Explanation: Child development evaluates physical, cognitive, and social alterations over a lifespan.

Q2: ...</pre>
              </div>

              <textarea id="tet-questions-textarea" placeholder="Paste your structured questions block here..." rows="12" class="glass-input text-xs font-mono font-semibold resize-none bg-slate-50/50 dark:bg-slate-950/10 focus:outline-none"></textarea>

              <button id="btn-parse-tet-questions" class="w-full py-3 rounded-xl btn-accent text-white font-bold text-xs shadow-md active:scale-95 transition-all">
                <i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Parse & Load Questions
              </button>
            </div>
          </div>

          <!-- Right Column: Verification & Action -->
          <div class="lg:col-span-1 flex flex-col gap-6">
            <!-- Parsing Status / Summary -->
            <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-5">
              <div class="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/[0.04]">
                <i class="fa-solid fa-list-check text-primary-500"></i>
                <h4 class="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Exam Overview</h4>
              </div>

              <div class="flex flex-col gap-3 text-xs font-semibold text-slate-505 dark:text-slate-400">
                <div class="flex justify-between items-center">
                  <span>Questions Loaded:</span>
                  <span id="tet-stat-total" class="font-bold text-slate-900 dark:text-white">0 / 150</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>Child Dev. & Pedagogy (1-30):</span>
                  <span id="tet-stat-cdp" class="font-bold text-slate-900 dark:text-white">0</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>Language I (31-60):</span>
                  <span id="tet-stat-l1" class="font-bold text-slate-900 dark:text-white">0</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>Language II (61-90):</span>
                  <span id="tet-stat-l2" class="font-bold text-slate-900 dark:text-white">0</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>Mathematics (91-120):</span>
                  <span id="tet-stat-math" class="font-bold text-slate-900 dark:text-white">0</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>Env. Studies (121-150):</span>
                  <span id="tet-stat-evs" class="font-bold text-slate-900 dark:text-white">0</span>
                </div>
              </div>

              <!-- Status Alert -->
              <div id="tet-status-alert" class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-500 leading-relaxed font-semibold">
                <i class="fa-solid fa-triangle-exclamation mr-1 animate-pulse"></i> Paste and parse questions block to enable TET Simulator.
              </div>

              <button id="btn-start-tet-simulator" disabled class="w-full py-3.5 rounded-xl btn-accent text-white font-bold text-sm shadow-md active:scale-95 transition-all opacity-50 cursor-not-allowed">
                Start TET Mock Test
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  async init() {
    window.scrollTo(0, 0);

    const textarea = document.getElementById('tet-questions-textarea');
    const btnParse = document.getElementById('btn-parse-tet-questions');
    const btnStart = document.getElementById('btn-start-tet-simulator');
    const btnLoadSample = document.getElementById('btn-load-sample-tet');
    const btnLoadPractice1 = document.getElementById('btn-load-tet-practice-1');
    const guideToggle = document.getElementById('btn-toggle-format-guide');
    const guideBox = document.getElementById('format-guide-box');

    // Toggle guide box
    guideToggle?.addEventListener('click', () => {
      guideBox?.classList.toggle('hidden');
    });

    // Load sample questions
    btnLoadSample?.addEventListener('click', () => {
      textarea.value = this.generateSampleQuestions();
      showToast("Generated 150 sample TET questions inside input area!", "success");
      this.parseQuestions();
    });

    // Load custom TET Practice 1 question file
    btnLoadPractice1?.addEventListener('click', async () => {
      btnLoadPractice1.disabled = true;
      btnLoadPractice1.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Loading...';
      try {
        const res = await fetch('./pyqs/tet_practice_1.txt');
        if (res.ok) {
          const text = await res.text();
          textarea.value = text;
          showToast("Loaded 'TET Practice 1' questions!", "success");
          this.parseQuestions();
        } else {
          showToast("Failed to fetch TET Practice 1 asset.", "error");
        }
      } catch (err) {
        showToast("Error: " + err.message, "error");
      } finally {
        btnLoadPractice1.disabled = false;
        btnLoadPractice1.innerHTML = '<i class="fa-solid fa-file-invoice"></i> Load \'TET Practice 1\'';
      }
    });

    // Parse questions click
    btnParse?.addEventListener('click', () => {
      this.parseQuestions();
    });

    // Start simulator
    btnStart?.addEventListener('click', () => {
      if (this.parsedQuestions.length === 0) {
        showToast("Please load questions first.", "warning");
        return;
      }

      showToast("Starting TET Simulator...", "info");

      // Setup MockTest state parameters
      MockTest.questions = [...this.parsedQuestions];
      MockTest.isTesting = true;
      MockTest.currentIdx = 0;
      MockTest.answers = {};
      MockTest.status = {};
      MockTest.timeLeft = 150 * 60; // 150 minutes
      MockTest.totalTime = 150 * 60;
      MockTest.selectedSubject = 'TET Practice 1';
      MockTest.selectedTopic = 'All';
      MockTest.calcLeft = undefined;
      MockTest.calcTop = undefined;

      // Setup sections
      MockTest.sections = {};
      MockTest.questions.forEach((q, idx) => {
        const secName = q.subject || 'Child Development';
        if (!MockTest.sections[secName]) {
          MockTest.sections[secName] = [];
        }
        MockTest.sections[secName].push(idx);
        MockTest.status[q.id] = 'not-visited';
      });

      MockTest.status[MockTest.questions[0].id] = 'not-answered';

      document.body.classList.add('fullscreen-exam');

      // Unload guard listener
      MockTest.unloadHandler = (e) => {
        e.preventDefault();
        e.returnValue = 'An exam is currently in progress. Leaving now will forfeit all progress.';
      };
      window.addEventListener('beforeunload', MockTest.unloadHandler);

      MockTest.startTimer();
      window.location.hash = '#/mock-test';
    });
  },

  parseQuestions() {
    const text = document.getElementById('tet-questions-textarea').value.trim();
    if (!text) {
      showToast("Input area is empty.", "warning");
      return;
    }

    let parsed = [];

    if (text.includes('subject:')) {
      // Standard file format: split by ---
      const rawBlocks = text.split(/---/);
      rawBlocks.forEach((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return;

        const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
        let questionText = '';
        let options = [];
        let correctAnswer = 'A';
        let explanationVal = '';
        let subjectVal = '';
        let topicVal = 'General';

        lines.forEach(line => {
          const lower = line.toLowerCase();
          if (lower.startsWith('subject:')) {
            subjectVal = line.substring(8).trim();
          } else if (lower.startsWith('topic:')) {
            topicVal = line.substring(6).trim();
          } else if (lower.startsWith('question:')) {
            questionText = line.substring(9).trim();
          } else if (lower.startsWith('option a:') || line.startsWith('A)')) {
            options[0] = line.substring(line.indexOf(')') >= 0 ? line.indexOf(')') + 1 : line.indexOf(':') + 1).trim();
          } else if (lower.startsWith('option b:') || line.startsWith('B)')) {
            options[1] = line.substring(line.indexOf(')') >= 0 ? line.indexOf(')') + 1 : line.indexOf(':') + 1).trim();
          } else if (lower.startsWith('option c:') || line.startsWith('C)')) {
            options[2] = line.substring(line.indexOf(')') >= 0 ? line.indexOf(')') + 1 : line.indexOf(':') + 1).trim();
          } else if (lower.startsWith('option d:') || line.startsWith('D)')) {
            options[3] = line.substring(line.indexOf(')') >= 0 ? line.indexOf(')') + 1 : line.indexOf(':') + 1).trim();
          } else if (lower.startsWith('correct:') || lower.startsWith('answer:')) {
            const val = line.substring(line.indexOf(':') + 1).trim().toUpperCase();
            correctAnswer = val.includes('A') || val === '0' ? 'A' : (val.includes('B') || val === '1' ? 'B' : (val.includes('C') || val === '2' ? 'C' : 'D'));
          } else if (lower.startsWith('explanation:')) {
            explanationVal = line.substring(12).trim();
          }
        });

        const qNum = parsed.length + 1;
        let subject = subjectVal || 'Child Development & Pedagogy';
        if (qNum > 30 && qNum <= 60) subject = 'Language I';
        else if (qNum > 60 && qNum <= 90) subject = 'Language II';
        else if (qNum > 90 && qNum <= 120) subject = 'Mathematics';
        else if (qNum > 120) subject = 'Environmental Studies';

        parsed.push({
          id: `q_tet_${Date.now()}_${index}`,
          type: 'MCQ',
          question: questionText || `Question details review for TET query #${qNum}`,
          options: options.length >= 2 ? options : ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: correctAnswer === 'A' ? 0 : (correctAnswer === 'B' ? 1 : (correctAnswer === 'C' ? 2 : 3)),
          explanation: explanationVal || 'TET Exam standard pedagogy solution review.',
          marks: 1,
          subject,
          topic: topicVal,
          difficulty: 'Hard',
          year: 2026
        });
      });
    } else {
      // Paste format (splits by Q1: etc.)
      const rawBlocks = text.split(/(?=Q\d+[:\.\s]|Ques\s+\d+[:\.\s]|\d+[\.\s]\s*[A-Z])/i);
      rawBlocks.forEach((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return;

        const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length < 2) return;

        let questionText = lines[0].replace(/^Q\d+[:\.]\s*/i, '').replace(/^\d+[:\.\s]\s*/i).trim();
        
        const options = [];
        let correctAnswer = 'A';
        let explanation = 'TET Exam standard pedagogy solution review.';

        lines.slice(1).forEach(line => {
          const optMatch = line.match(/^([A-D])[\)\.\s]\s*(.*)/i);
          if (optMatch) {
            options.push(optMatch[2].trim());
          }

          const ansMatch = line.match(/^(?:Answer|Correct\s+Answer)\s*:\s*([A-D])/i);
          if (ansMatch) {
            correctAnswer = ansMatch[1].toUpperCase();
          }

          const expMatch = line.match(/^(?:Explanation)\s*:\s*(.*)/i);
          if (expMatch) {
            explanation = expMatch[1].trim();
          }
        });

        if (options.length < 2) {
          options.push("Option A", "Option B", "Option C", "Option D");
        }

        const qNum = parsed.length + 1;
        let subject = 'Child Development & Pedagogy';
        if (qNum > 30 && qNum <= 60) {
          subject = 'Language I';
        } else if (qNum > 60 && qNum <= 90) {
          subject = 'Language II';
        } else if (qNum > 90 && qNum <= 120) {
          subject = 'Mathematics';
        } else if (qNum > 120) {
          subject = 'Environmental Studies';
        }

        parsed.push({
          id: `q_tet_${Date.now()}_${index}`,
          type: 'MCQ',
          question: questionText || `Question details review for TET query #${qNum}`,
          options,
          correctAnswer: correctAnswer === 'A' ? 0 : (correctAnswer === 'B' ? 1 : (correctAnswer === 'C' ? 2 : 3)),
          explanation,
          marks: 1,
          subject,
          topic: 'General Syllabus Review',
          difficulty: 'Hard',
          year: 2026
        });
      });
    }

    this.parsedQuestions = parsed;

    // Update Overview Stats
    const totalCount = parsed.length;
    document.getElementById('tet-stat-total').innerText = `${totalCount} / 150`;
    document.getElementById('tet-stat-cdp').innerText = parsed.filter(q => q.subject === 'Child Development & Pedagogy').length;
    document.getElementById('tet-stat-l1').innerText = parsed.filter(q => q.subject === 'Language I').length;
    document.getElementById('tet-stat-l2').innerText = parsed.filter(q => q.subject === 'Language II').length;
    document.getElementById('tet-stat-math').innerText = parsed.filter(q => q.subject === 'Mathematics').length;
    document.getElementById('tet-stat-evs').innerText = parsed.filter(q => q.subject === 'Environmental Studies').length;

    const alertEl = document.getElementById('tet-status-alert');
    const startBtn = document.getElementById('btn-start-tet-simulator');

    if (totalCount > 0) {
      alertEl.className = "p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-500 leading-relaxed font-semibold";
      alertEl.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Successfully parsed ${totalCount} questions. Ready to attempt!`;
      startBtn.disabled = false;
      startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
      alertEl.className = "p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-500 leading-relaxed font-semibold";
      alertEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1 animate-pulse"></i> Paste and parse questions block to enable TET Simulator.`;
      startBtn.disabled = true;
      startBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    showToast(`Parsed ${totalCount} questions from input!`, "success");
  },

  generateSampleQuestions() {
    const sections = [
      { name: 'Child Development & Pedagogy', range: [1, 30] },
      { name: 'Language I', range: [31, 60] },
      { name: 'Language II', range: [61, 90] },
      { name: 'Mathematics', range: [91, 120] },
      { name: 'Environmental Studies', range: [121, 150] }
    ];
    let text = '';
    sections.forEach(sec => {
      for (let i = sec.range[0]; i <= sec.range[1]; i++) {
        text += `Q${i}: Sample question for ${sec.name} regarding concept review #${i - sec.range[0] + 1}.\n`;
        text += `A) Core definition parameter\n`;
        text += `B) Pedagogical assessment criteria\n`;
        text += `C) Developmental learning curve\n`;
        text += `D) All of the above\n`;
        text += `Answer: D\n`;
        text += `Explanation: In ${sec.name}, this represents standard review practices.\n\n`;
      }
    });
    return text.trim();
  }
};
