import { db } from '../config/firebase';
import { showToast } from '../utils/toast';
import { MockTest } from './MockTest';

export const TetExams = {
  parsedQuestions: [],
  
  async render() {
    return `
      <div class="flex flex-col gap-8 animate-fade-in font-sans pb-12">
        
        <!-- Header Info Card -->
        <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] bg-gradient-to-r from-primary-500/5 via-indigo-500/5 to-purple-500/5 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div class="absolute -right-20 -top-20 w-48 h-48 bg-primary-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div class="flex items-center gap-4 relative z-10">
            <div class="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary-500/10 to-indigo-650/10 text-primary-500 flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
              <i class="fa-solid fa-chalkboard-user"></i>
            </div>
            <div>
              <h3 class="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-tight">TET (Teacher Eligibility Test) Portal</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">Bilingual practice tests under realistic CBT exam conditions: 150 Minutes, 150 Questions, No Negative Marks.</p>
            </div>
          </div>
        </div>

        <!-- Direct Exam Cards Section -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-file-signature text-primary-500 text-sm"></i>
            <h4 class="font-display font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">Official TET Mock Exams</h4>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Exam Card 1 -->
            <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-6 hover:shadow-lg transition-all relative overflow-hidden group">
              <div class="absolute -right-10 -bottom-10 w-28 h-28 bg-primary-500/5 rounded-full blur-xl group-hover:bg-primary-500/10 transition-colors"></div>
              <div>
                <div class="flex justify-between items-start gap-4">
                  <span class="px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-500 text-[10px] font-bold uppercase tracking-wider">Bilingual (Telugu/English)</span>
                  <span class="text-xs text-slate-400 dark:text-slate-500 font-semibold"><i class="fa-solid fa-clock mr-1"></i> 150 Mins</span>
                </div>
                <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">AP TET Paper 1A - Model Paper 3 (Hard)</h5>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold">TET Practice 1: Complete 150 questions including CDP, Language I, Language II, Math, and EVS.</p>
              </div>
              <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4 mt-2">
                <span class="text-xs text-slate-600 dark:text-slate-300 font-bold"><i class="fa-solid fa-circle-question text-primary-500/80 mr-1"></i> 150 Questions</span>
                <button id="btn-direct-tet-1" class="px-5 py-2.5 rounded-xl bg-primary-500 text-white text-xs font-bold hover:scale-102 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                  <i class="fa-solid fa-play"></i> Start Exam
                </button>
              </div>
            </div>

            <!-- Exam Card 2 -->
            <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-6 hover:shadow-lg transition-all relative overflow-hidden group">
              <div class="absolute -right-10 -bottom-10 w-28 h-28 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-colors"></div>
              <div>
                <div class="flex justify-between items-start gap-4">
                  <span class="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-500 text-[10px] font-bold uppercase tracking-wider">Bilingual (Telugu/English)</span>
                  <span class="text-xs text-slate-400 dark:text-slate-500 font-semibold"><i class="fa-solid fa-clock mr-1"></i> 150 Mins</span>
                </div>
                <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">AP TET Paper 1A - Model Paper 2 (Hard)</h5>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold">TET Practice 2: Complete 150 questions including CDP, Language I, Language II, Math, and EVS.</p>
              </div>
              <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4 mt-2">
                <span class="text-xs text-slate-600 dark:text-slate-300 font-bold"><i class="fa-solid fa-circle-question text-indigo-500/80 mr-1"></i> 150 Questions</span>
                <button id="btn-direct-tet-2" class="px-5 py-2.5 rounded-xl bg-indigo-650 text-white text-xs font-bold hover:scale-102 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                  <i class="fa-solid fa-play"></i> Start Exam
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-200/50 dark:border-white/[0.05] pt-6"></div>

        <!-- Pasting and Custom Creator -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-wand-magic-sparkles text-primary-500 text-sm"></i>
            <h4 class="font-display font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">Custom TET Mock Creator</h4>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column: Paste doubts/questions -->
            <div class="lg:col-span-2 flex flex-col gap-4">
              <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4">
                <div class="flex items-center justify-between">
                  <h4 class="font-display font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Paste Exam Questions</h4>
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

                <textarea id="tet-questions-textarea" placeholder="Paste your structured questions block here..." rows="8" class="glass-input text-xs font-mono font-semibold resize-none bg-slate-50/50 dark:bg-slate-950/10 focus:outline-none"></textarea>

                <div class="flex gap-3">
                  <button id="btn-load-sample-tet" class="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all select-none active:scale-95 flex items-center gap-1.5">
                    <i class="fa-solid fa-file-import"></i> Load Sample 150 Qs
                  </button>
                  <button id="btn-parse-tet-questions" class="flex-1 py-3 rounded-xl btn-accent text-white font-bold text-xs shadow-md active:scale-95 transition-all">
                    <i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Parse & Load Questions
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Column: Verification & Action -->
            <div class="lg:col-span-1 flex flex-col gap-6">
              <!-- Parsing Status / Summary -->
              <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-5">
                <div class="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/[0.04]">
                  <i class="fa-solid fa-list-check text-primary-500"></i>
                  <h4 class="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Custom Exam Overview</h4>
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
                  Start Custom Mock Test
                </button>
              </div>
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
    const guideToggle = document.getElementById('btn-toggle-format-guide');
    const guideBox = document.getElementById('format-guide-box');

    const btnDirect1 = document.getElementById('btn-direct-tet-1');
    const btnDirect2 = document.getElementById('btn-direct-tet-2');

    // Toggle guide box
    guideToggle?.addEventListener('click', () => {
      guideBox?.classList.toggle('hidden');
    });

    // Load sample questions
    btnLoadSample?.addEventListener('click', () => {
      textarea.value = this.generateSampleQuestions();
      showToast("Generated 150 sample TET questions inside input area!", "success");
      this.parseQuestions(false);
    });

    // Direct exam buttons
    btnDirect1?.addEventListener('click', async () => {
      btnDirect1.disabled = true;
      btnDirect1.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Loading...';
      try {
        const res = await fetch('./pyqs/tet_practice_1.txt');
        if (res.ok) {
          const text = await res.text();
          await this.launchExamDirectly(text, 'TET Practice 1');
        } else {
          showToast("Failed to fetch TET Practice 1 asset.", "error");
        }
      } catch (err) {
        showToast("Error: " + err.message, "error");
      } finally {
        btnDirect1.disabled = false;
        btnDirect1.innerHTML = '<i class="fa-solid fa-play"></i> Start Exam';
      }
    });

    btnDirect2?.addEventListener('click', async () => {
      btnDirect2.disabled = true;
      btnDirect2.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Loading...';
      try {
        const res = await fetch('./pyqs/tet_practice_2.txt');
        if (res.ok) {
          const text = await res.text();
          await this.launchExamDirectly(text, 'TET Practice 2');
        } else {
          showToast("Failed to fetch TET Practice 2 asset.", "error");
        }
      } catch (err) {
        showToast("Error: " + err.message, "error");
      } finally {
        btnDirect2.disabled = false;
        btnDirect2.innerHTML = '<i class="fa-solid fa-play"></i> Start Exam';
      }
    });

    // Parse questions click
    btnParse?.addEventListener('click', () => {
      this.parseQuestions(false);
    });

    // Start simulator
    btnStart?.addEventListener('click', () => {
      if (this.parsedQuestions.length === 0) {
        showToast("Please load questions first.", "warning");
        return;
      }
      this.launchMockTest('TET Custom Test');
    });
  },

  async launchExamDirectly(text, examName) {
    if (!text) {
      showToast("Questions not found.", "error");
      return;
    }
    const textarea = document.getElementById('tet-questions-textarea');
    if (textarea) textarea.value = text;

    this.parseQuestions(true);

    if (this.parsedQuestions.length === 0) {
      showToast("Failed to parse the exam questions.", "error");
      return;
    }
    this.launchMockTest(examName);
  },

  launchMockTest(examName) {
    showToast(`Starting ${examName} Simulator...`, "info");

    // Setup MockTest state parameters
    MockTest.questions = [...this.parsedQuestions];
    MockTest.isTesting = true;
    MockTest.currentIdx = 0;
    MockTest.answers = {};
    MockTest.status = {};
    MockTest.timeLeft = 150 * 60; // 150 minutes
    MockTest.totalTime = 150 * 60;
    MockTest.selectedSubject = examName;
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
  },

  parseQuestions(silent = false) {
    const textarea = document.getElementById('tet-questions-textarea');
    const text = textarea ? textarea.value.trim() : '';
    if (!text) {
      if (!silent) showToast("Input area is empty.", "warning");
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
            if (lower.startsWith('option a:')) {
              options[0] = line.substring(9).trim();
            } else {
              options[0] = line.substring(line.indexOf(')') >= 0 ? line.indexOf(')') + 1 : line.indexOf(':') + 1).trim();
            }
          } else if (lower.startsWith('option b:') || line.startsWith('B)')) {
            if (lower.startsWith('option b:')) {
              options[1] = line.substring(9).trim();
            } else {
              options[1] = line.substring(line.indexOf(')') >= 0 ? line.indexOf(')') + 1 : line.indexOf(':') + 1).trim();
            }
          } else if (lower.startsWith('option c:') || line.startsWith('C)')) {
            if (lower.startsWith('option c:')) {
              options[2] = line.substring(9).trim();
            } else {
              options[2] = line.substring(line.indexOf(')') >= 0 ? line.indexOf(')') + 1 : line.indexOf(':') + 1).trim();
            }
          } else if (lower.startsWith('option d:') || line.startsWith('D)')) {
            if (lower.startsWith('option d:')) {
              options[3] = line.substring(9).trim();
            } else {
              options[3] = line.substring(line.indexOf(')') >= 0 ? line.indexOf(')') + 1 : line.indexOf(':') + 1).trim();
            }
          } else if (lower.startsWith('correct:') || lower.startsWith('answer:')) {
            const val = line.substring(line.indexOf(':') + 1).trim().toUpperCase();
            correctAnswer = val.includes('A') || val === '0' ? 'A' : (val.includes('B') || val === '1' ? 'B' : (val.includes('C') || val === '2' ? 'C' : 'D'));
          } else if (lower.startsWith('explanation:')) {
            explanationVal = line.substring(12).trim();
          }
        });

        const qNum = parsed.length + 1;
        let subject = subjectVal || 'Child Development & Pedagogy (1-30)';
        if (qNum > 30 && qNum <= 60) subject = 'Language I (31-60)';
        else if (qNum > 60 && qNum <= 90) subject = 'Language II (61-90)';
        else if (qNum > 90 && qNum <= 120) subject = 'Mathematics (91-120)';
        else if (qNum > 120) subject = 'Environmental Studies (121-150)';

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
        let subject = 'Child Development & Pedagogy (1-30)';
        if (qNum > 30 && qNum <= 60) {
          subject = 'Language I (31-60)';
        } else if (qNum > 60 && qNum <= 90) {
          subject = 'Language II (61-90)';
        } else if (qNum > 90 && qNum <= 120) {
          subject = 'Mathematics (91-120)';
        } else if (qNum > 120) {
          subject = 'Environmental Studies (121-150)';
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
    const statTotal = document.getElementById('tet-stat-total');
    if (statTotal) statTotal.innerText = `${totalCount} / 150`;

    const getEl = id => document.getElementById(id);
    if (getEl('tet-stat-cdp')) getEl('tet-stat-cdp').innerText = parsed.filter(q => q.subject.includes('Child Development')).length;
    if (getEl('tet-stat-l1')) getEl('tet-stat-l1').innerText = parsed.filter(q => q.subject.includes('Language I')).length;
    if (getEl('tet-stat-l2')) getEl('tet-stat-l2').innerText = parsed.filter(q => q.subject.includes('Language II')).length;
    if (getEl('tet-stat-math')) getEl('tet-stat-math').innerText = parsed.filter(q => q.subject.includes('Mathematics')).length;
    if (getEl('tet-stat-evs')) getEl('tet-stat-evs').innerText = parsed.filter(q => q.subject.includes('Environmental Studies')).length;

    const alertEl = document.getElementById('tet-status-alert');
    const startBtn = document.getElementById('btn-start-tet-simulator');

    if (totalCount > 0) {
      if (alertEl) {
        alertEl.className = "p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-500 leading-relaxed font-semibold";
        alertEl.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Successfully parsed ${totalCount} questions. Ready to attempt!`;
      }
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    } else {
      if (alertEl) {
        alertEl.className = "p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-500 leading-relaxed font-semibold";
        alertEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1 animate-pulse"></i> Paste and parse questions block to enable TET Simulator.`;
      }
      if (startBtn) {
        startBtn.disabled = true;
        startBtn.classList.add('opacity-50', 'cursor-not-allowed');
      }
    }

    if (!silent) {
      showToast(`Parsed ${totalCount} questions from input!`, "success");
    }
  }
};
