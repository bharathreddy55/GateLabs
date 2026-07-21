import { db, SUBJECT_SYLLABUS } from '../config/firebase';
import { showToast } from '../utils/toast';

export const MockTest = {
  // Config state
  testMode: 'Subject', // 'Full-Length' or 'Subject'
  selectedSubject: 'Operating Systems',
  subjectMode: 'Full', // 'Full' or 'Topic' (Topic-Driven)
  selectedTopic: '',
  requestedCount: 10,
  requestedDuration: 20,
  selectedDifficulty: 'hard', // 'easy', 'medium', or 'hard'
  configTab: 'new', // 'new' | 'history'

  // Live Simulator state
  isTesting: false,
  questions: [],
  currentIdx: 0,
  answers: {}, // qid -> selected option index
  status: {}, // qid -> 'not-visited', 'not-answered', 'answered', 'marked', 'marked-answered'
  sections: {}, // sectionName -> array of indices
  timer: null,
  timeLeft: 0,
  totalTime: 0,

  // Calculator state
  isCalcOpen: false,
  calcInput: '0',

  async render() {
    if (!this.isTesting) {
      return this.renderConfigScreen();
    }
    return this.renderSimulatorScreen();
  },

  renderConfigScreen() {
    const subjects = [
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

    return `
      <!-- Config Tab Bar -->
      <div class="max-w-2xl mx-auto mb-6 flex gap-2 bg-slate-100/50 dark:bg-slate-950/40 p-1.5 rounded-2xl border border-slate-200/40 dark:border-white/[0.04] backdrop-blur-md">
        <button id="cfg-tab-new" class="flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
          this.configTab === 'new' ? 'bg-white dark:bg-slate-900/60 text-primary-600 shadow-sm border border-slate-200/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
        }">
          <i class="fa-solid fa-plus mr-1.5"></i>New Test
        </button>
        <button id="cfg-tab-history" class="flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
          this.configTab === 'history' ? 'bg-white dark:bg-slate-900/60 text-primary-600 shadow-sm border border-slate-200/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
        }">
          <i class="fa-solid fa-history mr-1.5"></i>Attempt History
        </button>
      </div>

      ${ this.configTab === 'history' ? '<div id="history-tab-content" class="max-w-2xl mx-auto"><p class="text-xs text-slate-400 text-center py-10 font-bold"><i class="fa-solid fa-circle-notch animate-spin mr-2 text-primary-500"></i>Loading attempts...</p></div>' : `
      <div class="max-w-2xl mx-auto glass-panel p-8 rounded-3xl flex flex-col gap-6 animate-fade-in font-sans">
        <div class="text-center">
          <h3 class="font-display font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">AI Mock Test Generator</h3>
          <p class="text-xs text-slate-455 dark:text-slate-500 mt-1 font-semibold">Simulate the realistic GATE computer-based test environment with custom bounds.</p>
        </div>

        <form id="generator-form" class="flex flex-col gap-5 text-xs font-semibold">
          <!-- Mode Selection -->
          <div>
            <label class="block text-slate-400 uppercase mb-2 tracking-wider">Test Type</label>
            <div class="grid grid-cols-2 gap-4">
              <label class="flex flex-col items-center justify-center p-4.5 rounded-2xl border cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-950/20 hover:scale-[1.01] hover:shadow-md transition-all text-center ${this.testMode === 'Full-Length' ? 'border-primary-500 bg-primary-55/10 shadow-lg shadow-primary-500/10' : 'border-slate-200 dark:border-white/[0.04] bg-white/40 dark:bg-slate-950/10'}">
                <input type="radio" name="test-mode" value="Full-Length" ${this.testMode === 'Full-Length' ? 'checked' : ''} class="sr-only">
                <i class="fa-solid fa-layer-group text-xl text-primary-500 mb-2.5"></i>
                <span class="text-slate-800 dark:text-slate-200 font-bold">Full-Length Mock</span>
                <span class="text-[10px] text-slate-405 mt-1 font-semibold">Includes all 10 subjects</span>
              </label>

              <label class="flex flex-col items-center justify-center p-4.5 rounded-2xl border cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-950/20 hover:scale-[1.01] hover:shadow-md transition-all text-center ${this.testMode === 'Subject' ? 'border-primary-500 bg-primary-55/10 shadow-lg shadow-primary-500/10' : 'border-slate-200 dark:border-white/[0.04] bg-white/40 dark:bg-slate-950/10'}">
                <input type="radio" name="test-mode" value="Subject" ${this.testMode === 'Subject' ? 'checked' : ''} class="sr-only">
                <i class="fa-solid fa-book text-xl text-indigo-500 mb-2.5"></i>
                <span class="text-slate-800 dark:text-slate-200 font-bold">Subject-Wise Mock</span>
                <span class="text-[10px] text-slate-405 mt-1 font-semibold">Test single subject or topic</span>
              </label>
            </div>
          </div>

          <!-- Conditional Subject Options -->
          <div id="subject-config-panel" class="${this.testMode === 'Subject' ? '' : 'hidden'} flex flex-col gap-4 p-4.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.04] bg-slate-50/50 dark:bg-slate-950/20">
            <div>
              <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Select Subject</label>
              <select id="config-subject" class="glass-input text-xs font-semibold">
                ${subjects.map(s => `<option value="${s}" ${this.selectedSubject === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-slate-400 uppercase mb-2 tracking-wider">Scope Options</label>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-305 font-bold">
                  <input type="radio" name="subject-mode" value="Full" ${this.subjectMode === 'Full' ? 'checked' : ''} class="text-primary-600 focus:ring-primary-500 bg-white/50 dark:bg-slate-950/40">
                  <span>Full Subject Mock</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-355 font-bold">
                  <input type="radio" name="subject-mode" value="Topic" ${this.subjectMode === 'Topic' ? 'checked' : ''} class="text-primary-600 focus:ring-primary-500 bg-white/50 dark:bg-slate-950/40">
                  <span>Topic-Driven Mock</span>
                </label>
              </div>
            </div>

            <!-- Conditional Topic Selector -->
            <div id="topic-selector-container" class="${this.subjectMode === 'Topic' ? '' : 'hidden'} flex flex-col gap-2">
              <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Select Topics (Multi-Select)</label>
              <div id="config-topics-list" class="flex flex-col gap-4 max-h-72 overflow-y-auto p-4 border border-slate-200/50 dark:border-white/[0.04] rounded-2xl bg-white/50 dark:bg-slate-950/30">
                <!-- Loaded dynamically -->
              </div>
            </div>
          </div>

          <!-- Common Bounds -->
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Questions</label>
              <select id="config-count" class="glass-input text-xs font-semibold">
                ${Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map(val => `
                  <option value="${val}" ${this.requestedCount === val ? 'selected' : ''}>${val} Qs</option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Duration</label>
              <div class="relative">
                <input type="text" id="config-duration" readonly value="${this.requestedDuration} Mins" class="glass-input cursor-pointer select-none text-xs">
                <i class="fa-solid fa-clock absolute right-3.5 top-3.5 text-slate-400"></i>
              </div>
            </div>
            <div>
              <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Difficulty</label>
              <select id="config-difficulty" class="glass-input text-xs font-semibold">
                <option value="easy" ${this.selectedDifficulty === 'easy' ? 'selected' : ''}>Easy Only</option>
                <option value="medium" ${this.selectedDifficulty === 'medium' ? 'selected' : ''}>Medium & Easy</option>
                <option value="hard" ${this.selectedDifficulty === 'hard' ? 'selected' : ''}>Hard (All Levels)</option>
              </select>
            </div>
          </div>

          <button type="submit" class="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-650 hover:from-primary-500 hover:to-indigo-550 text-white font-bold text-sm shadow-lg shadow-primary-500/25 active:scale-98 hover:scale-[1.01] transition-all">
            Generate Mock Test
          </button>
        </form>
      </div>
      `}

      <!-- Analog Clock Picker Modal -->
      <div id="clock-picker-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-sm hidden animate-fade-in px-4">
        <div class="w-full max-w-sm glass-panel p-6 rounded-3xl relative shadow-2xl flex flex-col items-center gap-6 border border-white/10 glow-primary">
          <button id="close-clock-modal" type="button" class="absolute top-5 right-5 text-slate-405 hover:text-slate-655 dark:hover:text-slate-200 transition-colors">
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
          
          <div class="text-center font-sans">
            <h4 class="font-display font-extrabold text-slate-900 dark:text-white text-base">Select Exam Duration</h4>
            <p class="text-[11px] text-slate-400 mt-1 font-semibold">Click or drag the clock hand to adjust the time</p>
          </div>

          <!-- Analog Clock SVG -->
          <div class="relative w-48 h-48 select-none">
            <svg id="analog-clock-svg" class="w-full h-full cursor-pointer" viewBox="0 0 200 200">
              <!-- Outer Dial -->
              <circle cx="100" cy="100" r="92" class="fill-slate-50/50 stroke-slate-200 dark:fill-slate-900/60 dark:stroke-slate-800" stroke-width="4"></circle>
              <!-- Center Hub -->
              <circle cx="100" cy="100" r="5" class="fill-primary-600"></circle>
              
              <!-- Clock Hand -->
              <line id="clock-hand" x1="100" y1="100" x2="100" y2="45" class="stroke-primary-600" stroke-width="4" stroke-linecap="round"></line>
              <circle id="clock-hand-tip" cx="100" cy="45" r="6" class="fill-primary-600 stroke-white dark:stroke-slate-900" stroke-width="1.5"></circle>

              <!-- Clock Markings & Text (12 markers from 15 to 180) -->
              <g id="clock-markers"></g>
            </svg>
          </div>

          <!-- Dynamic Duration display -->
          <div class="text-center font-sans">
            <span id="clock-selected-duration" class="font-display font-extrabold text-2xl text-primary-600 dark:text-primary-400">120</span>
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Minutes</span>
            <p class="text-[10px] text-slate-405 mt-0.5 font-semibold">Equivalent to <span id="clock-duration-hours">2.0</span> hours</p>
          </div>

          <button id="confirm-clock-duration" type="button" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-650 hover:from-primary-500 hover:to-indigo-550 text-white font-bold text-xs shadow-lg active:scale-95 transition-all">
            Confirm Duration
          </button>
        </div>
      </div>
    `;
  },

  renderSimulatorScreen() {
    const q = this.questions[this.currentIdx];
    if (!q) return `<p>Error loading question</p>`;

    const formatTimer = (seconds) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Calculate Palette status counts
    const statusCounts = { 'not-visited': 0, 'not-answered': 0, 'answered': 0, 'marked': 0, 'marked-answered': 0 };
    this.questions.forEach(qi => {
      statusCounts[this.status[qi.id]]++;
    });

    // Sections tab bar HTML
    const currentSectionName = this.getCurrentSectionName(q);
    const sectionTabsHtml = Object.keys(this.sections).map(secName => {
      const isSelected = currentSectionName === secName;
      const activeClass = isSelected ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700';
      return `
        <button class="section-tab-btn px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all ${activeClass}" data-section="${secName}">
          ${secName}
        </button>
      `;
    }).join('');

    return `
      <!-- Simulator Wrapper forcing light theme (white bg, black text) -->
      <div class="bg-white text-black min-h-[calc(100vh-3rem)] p-6 rounded-2xl border border-slate-200 flex flex-col gap-4 select-none animate-fade-in">
        
        <!-- Sections bar -->
        <div class="flex flex-wrap items-center gap-3">
          ${sectionTabsHtml}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 relative">
          <!-- Floating Virtual Calculator (light styled) -->
          <div id="calculator-widget" class="fixed z-50 w-72 bg-white rounded-2xl shadow-2xl p-4 border border-slate-300 animate-fade-in ${this.isCalcOpen ? '' : 'hidden'}"
               style="${this.calcLeft !== undefined && this.calcTop !== undefined ? `left: ${this.calcLeft}px; top: ${this.calcTop}px; transform: none;` : 'top: 6rem; left: 50%; transform: translateX(-50%);'}">
            <div id="calculator-header" class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3 cursor-grab select-none active:cursor-grabbing">
              <span class="text-xs font-bold text-slate-700 pointer-events-none"><i class="fa-solid fa-calculator mr-1"></i> Virtual Calculator</span>
              <button id="close-calc" type="button" class="text-slate-400 hover:text-slate-600 transition-colors">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div class="bg-slate-100 rounded-xl p-3 mb-3 text-right">
              <span id="calc-display" class="font-mono text-xl text-slate-800 truncate block">${this.calcInput}</span>
            </div>
            
            <div class="grid grid-cols-4 gap-2">
              <button class="calc-btn bg-slate-200 text-slate-700" data-calc="sqrt">√</button>
              <button class="calc-btn bg-slate-200 text-slate-700" data-calc="pow">x²</button>
              <button class="calc-btn bg-slate-200 text-slate-700" data-calc="log">ln</button>
              <button class="calc-btn bg-slate-200 text-slate-700" data-calc="C">C</button>
              
              <button class="calc-btn bg-slate-100 text-slate-800" data-calc="7">7</button>
              <button class="calc-btn bg-slate-100 text-slate-800" data-calc="8">8</button>
              <button class="calc-btn bg-slate-100 text-slate-800" data-calc="9">9</button>
              <button class="calc-btn bg-primary-100 text-primary-600" data-calc="/">/</button>
              
              <button class="calc-btn bg-slate-100 text-slate-800" data-calc="4">4</button>
              <button class="calc-btn bg-slate-100 text-slate-800" data-calc="5">5</button>
              <button class="calc-btn bg-slate-100 text-slate-800" data-calc="6">6</button>
              <button class="calc-btn bg-primary-100 text-primary-600" data-calc="*">*</button>
              
              <button class="calc-btn bg-slate-100 text-slate-800" data-calc="1">1</button>
              <button class="calc-btn bg-slate-100 text-slate-800" data-calc="2">2</button>
              <button class="calc-btn bg-slate-100 text-slate-800" data-calc="3">3</button>
              <button class="calc-btn bg-primary-100 text-primary-600" data-calc="-">-</button>
              
              <button class="calc-btn bg-slate-100 text-slate-800" data-calc="0">0</button>
              <button class="calc-btn bg-slate-100 text-slate-800" data-calc=".">.</button>
              <button class="calc-btn bg-emerald-600 text-white col-span-2" data-calc="=">=</button>
              <button class="calc-btn bg-primary-100 text-primary-600 col-start-4 row-start-5" data-calc="+">+</button>
            </div>
          </div>

          <!-- Question panel -->
          <div class="lg:col-span-3 flex flex-col justify-between border border-slate-200 rounded-2xl overflow-hidden bg-white">
            <div class="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Question ${this.currentIdx + 1} of ${this.questions.length} (${q.subject} &bull; ${q.topic})</span>
              <div class="flex items-center gap-3">
                <button id="toggle-calc-btn" class="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold">
                  <i class="fa-solid fa-calculator mr-1"></i> Calculator
                </button>
                <span class="text-xs font-bold bg-indigo-50 px-2.5 py-1 rounded-md text-indigo-600">${q.marks} Mark${q.marks > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div class="flex-1 p-6 overflow-y-auto bg-white">
              <p class="text-sm font-semibold text-slate-800 whitespace-pre-line leading-relaxed">
                ${q.question}
              </p>

              <div class="flex flex-col gap-2.5 mt-6">
                ${q.options.map((opt, oIdx) => {
                  const isChecked = this.answers[q.id] === oIdx;
                  return `
                    <label class="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all cursor-pointer relative ${isChecked ? 'border-primary-500 bg-primary-50/10' : ''}">
                      <input type="radio" name="sim-option" value="${oIdx}" ${isChecked ? 'checked' : ''} class="mt-0.5 text-primary-600 border-slate-300 focus:ring-primary-500">
                      <span class="text-xs text-slate-700 leading-relaxed">${String.fromCharCode(65 + oIdx)}. ${opt}</span>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Simulator Footer -->
            <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
              <div class="flex gap-2">
                <button id="btn-mark-review" class="px-4 py-2.5 rounded-lg border border-indigo-200 text-indigo-600 text-xs font-bold hover:bg-indigo-50 active:scale-95 transition-all">
                  Mark for Review & Next
                </button>
                <button id="btn-clear" class="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all">
                  Clear Response
                </button>
              </div>
              
              <div class="flex gap-2">
                <button id="btn-prev" class="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all">
                  Previous
                </button>
                <button id="btn-save-next" class="px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold shadow-md active:scale-95 transition-all">
                  Save & Next
                </button>
              </div>
            </div>
          </div>

          <!-- Right Sidebar (Monospace Timer / Palette) -->
          <div class="flex flex-col gap-6">
            <!-- Unstyled Monospace Timer (Nothing Style) -->
            <div class="border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center bg-white">
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time Remaining</p>
              <h3 id="sim-timer" class="font-mono text-xl font-medium text-slate-800 mt-2">${formatTimer(this.timeLeft)}</h3>
            </div>

            <!-- Color Palette Panel -->
            <div class="border border-slate-200 p-6 rounded-2xl flex-1 flex flex-col gap-4 bg-white">
              <h4 class="font-display font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">Question Palette</h4>
              
              <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-2.5 overflow-y-auto max-h-[14rem]">
                ${this.questions.map((qi, idx) => {
                  const btnClass = this.getPaletteBtnClassString(qi.id, idx);
                  return `
                    <button class="palette-btn-select ${btnClass}" data-pindex="${idx}">
                      ${idx + 1}
                    </button>
                  `;
                }).join('')}
              </div>

              <button id="btn-submit-exam" class="w-full mt-auto py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md active:scale-95 transition-all">
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init() {
    if (!this.isTesting) {
      // Configuration events
      const form = document.getElementById('generator-form');

      // Tab switching
      document.getElementById('cfg-tab-new')?.addEventListener('click', () => {
        this.configTab = 'new';
        this.refresh();
      });
      document.getElementById('cfg-tab-history')?.addEventListener('click', () => {
        this.configTab = 'history';
        this.refresh();
        this.loadAttemptHistory();
      });
      if (this.configTab === 'history') {
        this.loadAttemptHistory();
      }
      const modeRadios = document.getElementsByName('test-mode');
      const subjectPanel = document.getElementById('subject-config-panel');
      const configSubject = document.getElementById('config-subject');
      const subModeRadios = document.getElementsByName('subject-mode');
      const topicSelectorContainer = document.getElementById('topic-selector-container');
      const configTopicsList = document.getElementById('config-topics-list');

      // Analog Clock Picker bindings
      const durationInput = document.getElementById('config-duration');
      const clockModal = document.getElementById('clock-picker-modal');
      const closeClockModal = document.getElementById('close-clock-modal');
      const confirmClockDuration = document.getElementById('confirm-clock-duration');
      const clockSvg = document.getElementById('analog-clock-svg');
      
      durationInput?.addEventListener('click', () => {
        clockModal?.classList.remove('hidden');
        this.tempDuration = this.requestedDuration;
        this.drawClockMarkings();
        this.updateClockPosition(this.requestedDuration);
      });
      
      closeClockModal?.addEventListener('click', () => {
        clockModal?.classList.add('hidden');
      });
      
      confirmClockDuration?.addEventListener('click', () => {
        this.requestedDuration = this.tempDuration;
        if (durationInput) {
          durationInput.value = `${this.requestedDuration} Minutes`;
        }
        clockModal?.classList.add('hidden');
      });
      
      let isDraggingClock = false;
      const handleClockMove = (e) => {
        if (!clockSvg) return;
        const rect = clockSvg.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;
        
        let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;
        
        let duration = (angle / 360) * 180;
        duration = Math.round(duration / 5) * 5;
        duration = Math.max(5, Math.min(180, duration));
        
        this.updateClockPosition(duration);
      };
      
      clockSvg?.addEventListener('mousedown', (e) => {
        isDraggingClock = true;
        handleClockMove(e);
      });
      
      window.addEventListener('mousemove', (e) => {
        if (isDraggingClock) handleClockMove(e);
      });
      
      window.addEventListener('mouseup', () => {
        isDraggingClock = false;
      });
      
      clockSvg?.addEventListener('touchstart', (e) => {
        isDraggingClock = true;
        handleClockMove(e);
      });
      
      window.addEventListener('touchmove', (e) => {
        if (isDraggingClock) handleClockMove(e);
      });
      
      window.addEventListener('touchend', () => {
        isDraggingClock = false;
      });

      // 1. Mode Select Trigger
      modeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          this.testMode = e.target.value;
          
          // toggle UI selections
          if (this.testMode === 'Full-Length') {
            subjectPanel.classList.add('hidden');
          } else {
            subjectPanel.classList.remove('hidden');
            this.loadTopicsForSelectedSubject(configSubject.value, configTopicsList);
          }
          this.refreshConfigClasses();
        });
      });

      // 2. Subject Select Trigger
      configSubject?.addEventListener('change', (e) => {
        this.selectedSubject = e.target.value;
        this.loadTopicsForSelectedSubject(this.selectedSubject, configTopicsList);
      });

      // 3. Sub-Mode Option Trigger (Full vs Topic)
      subModeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          this.subjectMode = e.target.value;
          if (this.subjectMode === 'Topic') {
            topicSelectorContainer.classList.remove('hidden');
          } else {
            topicSelectorContainer.classList.add('hidden');
          }
        });
      });

      // Initial topics loading - query questions first to sync custom topics/subtopics
      db.getQuestions().then(() => {
        if (this.testMode === 'Subject' && configSubject && configTopicsList) {
          this.loadTopicsForSelectedSubject(configSubject.value, configTopicsList);
        }
      }).catch(err => {
        console.error("Failed to pre-load topics:", err);
      });

      form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const countInput = parseInt(document.getElementById('config-count').value);
        const durationInput = parseInt(document.getElementById('config-duration').value);
        const difficultyInput = document.getElementById('config-difficulty')?.value || 'hard';
        
        this.requestedCount = countInput;
        this.requestedDuration = durationInput;
        this.selectedDifficulty = difficultyInput;
        this.selectedSubject = configSubject?.value || 'Operating Systems';
        
        const checkedBoxes = document.querySelectorAll('input[name="topic-checkbox"]:checked');
        const selectedTopics = Array.from(checkedBoxes).map(cb => cb.value);

        if (this.testMode === 'Subject' && this.subjectMode === 'Topic' && selectedTopics.length === 0) {
          showToast("Please select at least one topic for your test.", "warning");
          return;
        }

        // Query database
        let queryFilters = {
          difficultyLimit: this.selectedDifficulty
        };
        if (this.testMode === 'Subject') {
          queryFilters.subject = this.selectedSubject;
          if (this.subjectMode === 'Topic') {
            queryFilters.topics = selectedTopics;
            this.selectedTopic = selectedTopics.join(', ');
          } else {
            this.selectedTopic = 'All';
          }
        }

        let allQs = await db.getQuestions(queryFilters);

        if (allQs.length === 0) {
          showToast("No questions available matching this configuration.", "warning");
          return;
        }

        // Apply graceful size cap fallback
        const finalCount = Math.min(this.requestedCount, allQs.length);
        if (finalCount < this.requestedCount) {
          showToast(`Only ${allQs.length} questions available for this selection. Loading all of them.`, "info", 4000);
        }

        // Shuffle & select
        let selectedQs = allQs.sort(() => 0.5 - Math.random()).slice(0, finalCount);

        // Sort selected questions to maintain section groupings
        selectedQs = selectedQs.sort((a, b) => {
          if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
          return a.topic.localeCompare(b.topic);
        });

        // Initialize simulator state
        this.questions = selectedQs;
        this.isTesting = true;
        this.currentIdx = 0;
        this.answers = {};
        this.status = {};
        this.timeLeft = this.requestedDuration * 60;
        this.totalTime = this.requestedDuration * 60;
        this.calcLeft = undefined;
        this.calcTop = undefined;

        // Group into sections
        this.sections = {};
        this.questions.forEach((q, idx) => {
          const secName = this.getCurrentSectionName(q);
          if (!this.sections[secName]) {
            this.sections[secName] = [];
          }
          this.sections[secName].push(idx);
          this.status[q.id] = 'not-visited';
        });

        this.status[this.questions[0].id] = 'not-answered';


        document.body.classList.add('fullscreen-exam'); // Toggle fullscreen view

        // Register window unload guard (Flaw 2)
        this.unloadHandler = (e) => {
          e.preventDefault();
          e.returnValue = 'An exam is in progress. Leaving now will lose all progress.';
        };
        window.addEventListener('beforeunload', this.unloadHandler);

        this.startTimer();
        this.refresh();
      });

      return;
    }

    // Active Simulator bindings
    const btnPrev = document.getElementById('btn-prev');
    const btnSaveNext = document.getElementById('btn-save-next');
    const btnMarkReview = document.getElementById('btn-mark-review');
    const btnClear = document.getElementById('btn-clear');
    const btnSubmit = document.getElementById('btn-submit-exam');
    const toggleCalc = document.getElementById('toggle-calc-btn');
    const closeCalc = document.getElementById('close-calc');
    const calcWidget = document.getElementById('calculator-widget');
    const optRadios = document.getElementsByName('sim-option');

    optRadios.forEach(radio => {
      radio.addEventListener('click', (e) => {
        const val = parseInt(e.target.value);
        const qid = this.questions[this.currentIdx].id;
        this.answers[qid] = val;
      });
    });

    const getSelectedValue = () => {
      const checked = document.querySelector('input[name="sim-option"]:checked');
      return checked ? parseInt(checked.value) : null;
    };

    btnSaveNext?.addEventListener('click', () => {
      const val = getSelectedValue();
      const qid = this.questions[this.currentIdx].id;
      
      if (val !== null) {
        this.answers[qid] = val;
        this.status[qid] = 'answered';
      } else {
        this.status[qid] = 'not-answered';
      }

      this.navigateNext();
    });

    btnMarkReview?.addEventListener('click', () => {
      const val = getSelectedValue();
      const qid = this.questions[this.currentIdx].id;
      
      if (val !== null) {
        this.answers[qid] = val;
        this.status[qid] = 'marked-answered';
      } else {
        this.status[qid] = 'marked';
      }

      this.navigateNext();
    });

    btnClear?.addEventListener('click', () => {
      const qid = this.questions[this.currentIdx].id;
      this.answers[qid] = null;
      this.status[qid] = 'not-answered';
      this.refresh();
    });

    btnPrev?.addEventListener('click', () => {
      if (this.currentIdx > 0) {
        this.currentIdx--;
        this.refresh();
      }
    });

    btnSubmit?.addEventListener('click', () => {
      if (confirm("Are you sure you want to submit the exam?")) {
        this.submitExam();
      }
    });

    // Palette navigation
    const paletteBtns = document.querySelectorAll('.palette-btn-select');
    paletteBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-pindex'));
        const activeQid = this.questions[this.currentIdx].id;
        
        if (this.status[activeQid] === 'not-visited') {
          this.status[activeQid] = 'not-answered';
        }
        this.currentIdx = idx;
        const qid = this.questions[this.currentIdx].id;
        if (this.status[qid] === 'not-visited') {
          this.status[qid] = 'not-answered';
        }
        this.refresh();
      });
    });

    // Sections bar tabs navigation
    const tabBtns = document.querySelectorAll('.section-tab-btn');
    tabBtns.forEach(tab => {
      tab.addEventListener('click', () => {
        const secName = tab.getAttribute('data-section');
        const firstIdx = this.sections[secName][0];
        
        const activeQid = this.questions[this.currentIdx].id;
        if (this.status[activeQid] === 'not-visited') {
          this.status[activeQid] = 'not-answered';
        }

        this.currentIdx = firstIdx;
        const qid = this.questions[this.currentIdx].id;
        if (this.status[qid] === 'not-visited') {
          this.status[qid] = 'not-answered';
        }
        this.refresh();
      });
    });

    // Calculator triggers
    toggleCalc?.addEventListener('click', () => {
      this.isCalcOpen = !this.isCalcOpen;
      if (this.isCalcOpen) {
        calcWidget?.classList.remove('hidden');
      } else {
        calcWidget?.classList.add('hidden');
      }
    });

    closeCalc?.addEventListener('click', () => {
      this.isCalcOpen = false;
      calcWidget?.classList.add('hidden');
    });

    const calcDisplay = document.getElementById('calc-display');
    const calcBtns = document.querySelectorAll('.calc-btn');
    calcBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-calc');
        this.handleCalculator(val, calcDisplay);
      });
    });

    // Make calculator draggable
    const calcHeader = document.getElementById('calculator-header');
    if (calcHeader && calcWidget) {
      let isDragging = false;
      let startX, startY;
      let initialLeft, initialTop;

      const onMouseDown = (e) => {
        if (e.target.closest('#close-calc') || e.target.closest('.calc-btn')) return;
        isDragging = true;
        
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = calcWidget.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        e.preventDefault();
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        const maxLeft = Math.max(10, window.innerWidth - (calcWidget.offsetWidth || 288) - 10);
        const maxTop = Math.max(10, window.innerHeight - (calcWidget.offsetHeight || 300) - 10);

        newLeft = Math.max(10, Math.min(maxLeft, newLeft));
        newTop = Math.max(10, Math.min(maxTop, newTop));

        calcWidget.style.transform = 'none';
        calcWidget.style.left = `${newLeft}px`;
        calcWidget.style.top = `${newTop}px`;
      };

      const onMouseUp = () => {
        if (isDragging) {
          isDragging = false;
          const rect = calcWidget.getBoundingClientRect();
          this.calcLeft = rect.left;
          this.calcTop = rect.top;
        }
      };

      calcHeader.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      // Mobile Touch Support
      const onTouchStart = (e) => {
        if (e.target.closest('#close-calc') || e.target.closest('.calc-btn')) return;
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        const rect = calcWidget.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
      };

      const onTouchMove = (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        
        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        const maxLeft = window.innerWidth - (calcWidget.offsetWidth || 288);
        const maxTop = window.innerHeight - (calcWidget.offsetHeight || 300);

        newLeft = Math.max(0, Math.min(maxLeft, newLeft));
        newTop = Math.max(0, Math.min(maxTop, newTop));

        calcWidget.style.transform = 'none';
        calcWidget.style.left = `${newLeft}px`;
        calcWidget.style.top = `${newTop}px`;
      };

      const onTouchEnd = () => {
        if (isDragging) {
          isDragging = false;
          const rect = calcWidget.getBoundingClientRect();
          this.calcLeft = rect.left;
          this.calcTop = rect.top;
        }
      };

      calcHeader.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    }
  },

  getCurrentSectionName(q) {
    if (this.testMode === 'Full-Length') {
      return q.subject; // Sections by subject
    } else {
      return q.topic || 'General'; // Sections by topic
    }
  },

  drawClockMarkings() {
    const markersGroup = document.getElementById('clock-markers');
    if (!markersGroup) return;

    markersGroup.innerHTML = '';
    for (let i = 1; i <= 12; i++) {
      const minutesValue = i * 15;
      const angle = (minutesValue / 180) * 360 - 90;
      const rad = (angle * Math.PI) / 180;
      
      const xStart = 100 + 76 * Math.cos(rad);
      const yStart = 100 + 76 * Math.sin(rad);
      const xEnd = 100 + 84 * Math.cos(rad);
      const yEnd = 100 + 84 * Math.sin(rad);
      
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', xStart);
      line.setAttribute('y1', yStart);
      line.setAttribute('x2', xEnd);
      line.setAttribute('y2', yEnd);
      line.setAttribute('class', 'stroke-slate-300 dark:stroke-slate-700');
      line.setAttribute('stroke-width', '2');
      markersGroup.appendChild(line);

      const xText = 100 + 64 * Math.cos(rad);
      const yText = 100 + 64 * Math.sin(rad) + 3;
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', xText);
      text.setAttribute('y', yText);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('class', 'fill-slate-400 dark:fill-slate-500 font-bold text-[8px] select-none pointer-events-none');
      text.textContent = minutesValue;
      markersGroup.appendChild(text);
    }
  },

  updateClockPosition(duration) {
    const selectedDurationSpan = document.getElementById('clock-selected-duration');
    const durationHoursSpan = document.getElementById('clock-duration-hours');
    const hand = document.getElementById('clock-hand');
    const tip = document.getElementById('clock-hand-tip');
    
    if (selectedDurationSpan) selectedDurationSpan.textContent = duration;
    if (durationHoursSpan) durationHoursSpan.textContent = (duration / 60).toFixed(1);
    
    const handAngle = (duration / 180) * 360 - 90;
    const rad = (handAngle * Math.PI) / 180;
    const handLength = 55;
    
    const x2 = 100 + handLength * Math.cos(rad);
    const y2 = 100 + handLength * Math.sin(rad);
    
    if (hand) {
      hand.setAttribute('x2', x2);
      hand.setAttribute('y2', y2);
    }
    if (tip) {
      tip.setAttribute('cx', x2);
      tip.setAttribute('cy', y2);
    }
    
    this.tempDuration = duration;
  },

  loadTopicsForSelectedSubject(subject, listDom) {
    if (!listDom) return;
    const subdivisions = SUBJECT_SYLLABUS[subject] || {};
    const subKeys = Object.keys(subdivisions);
    if (subKeys.length === 0) {
      listDom.innerHTML = `<p class="text-xs text-slate-400">No Topics Available</p>`;
      return;
    }

    listDom.innerHTML = subKeys.map(subName => {
      const topicsList = subdivisions[subName] || [];
      const checkboxesHtml = topicsList.map(t => `
        <label class="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-darkbg-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors text-slate-700 dark:text-slate-300">
          <input type="checkbox" name="topic-checkbox" value="${t}" class="topic-checkbox rounded text-primary-600 focus:ring-primary-500">
          <span class="text-xs">${t}</span>
        </label>
      `).join('');

      return `
        <div class="flex flex-col gap-1.5">
          <div class="border-l-2 border-primary-500 pl-2 font-bold text-slate-800 dark:text-slate-200 text-xs mt-1">
            ${subName}
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${checkboxesHtml}
          </div>
        </div>
      `;
    }).join('');
  },

  refreshConfigClasses() {
    const mainNode = document.querySelector('main');
    if (mainNode) {
      // Small re-rendering of classes for parent borders on radios
      const form = document.getElementById('generator-form');
      if (form) {
        const modeRadios = document.getElementsByName('test-mode');
        const subjectPanel = document.getElementById('subject-config-panel');
        modeRadios.forEach(r => {
          const lbl = r.parentElement;
          if (r.checked) {
            lbl.className = "flex flex-col items-center justify-center p-4 border border-primary-500 bg-primary-50/10 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all text-center";
          } else {
            lbl.className = "flex flex-col items-center justify-center p-4 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all text-center";
          }
        });
        
        if (this.testMode === 'Full-Length') {
          subjectPanel?.classList.add('hidden');
        } else {
          subjectPanel?.classList.remove('hidden');
        }
      }
    }
  },

  getPaletteBtnClassString(qid, idx) {
    const stat = this.status[qid];
    const base = "h-9 w-9 text-xs font-bold rounded-lg transition-all flex items-center justify-center border hover:scale-105 active:scale-95";
    const isCurrent = idx === this.currentIdx ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-900' : '';
    
    if (stat === 'answered') {
      return `${base} bg-emerald-500 border-emerald-600 text-white ${isCurrent}`;
    } else if (stat === 'marked') {
      return `${base} bg-indigo-500 border-indigo-600 text-white ${isCurrent}`;
    } else if (stat === 'marked-answered') {
      return `${base} bg-indigo-500 border-indigo-600 text-white relative after:content-[''] after:absolute after:bottom-0.5 after:right-0.5 after:h-2 after:w-2 after:bg-emerald-500 after:rounded-full ${isCurrent}`;
    } else if (stat === 'not-answered') {
      return `${base} bg-rose-500 border-rose-600 text-white ${isCurrent}`;
    }
    return `${base} bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 ${isCurrent}`;
  },

  navigateNext() {
    if (this.currentIdx < this.questions.length - 1) {
      this.currentIdx++;
      const nextQid = this.questions[this.currentIdx].id;
      if (this.status[nextQid] === 'not-visited') {
        this.status[nextQid] = 'not-answered';
      }
      this.refresh();
    } else {
      this.refresh();
    }
  },

  startTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.timeLeft--;
      const timerDisplay = document.getElementById('sim-timer');
      if (timerDisplay) {
        const h = Math.floor(this.timeLeft / 3600);
        const m = Math.floor((this.timeLeft % 3600) / 60);
        const s = this.timeLeft % 60;
        timerDisplay.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }

      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        showToast("Time's up! Submitting exam.", "warning");
        this.submitExam();
      }
    }, 1000);
  },

  async submitExam() {
    if (this.timer) clearInterval(this.timer);
    
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    let score = 0;
    let negativeMarks = 0;

    const mistakes = [];

    this.questions.forEach(q => {
      const userAns = this.answers[q.id];
      if (userAns === undefined || userAns === null) {
        skippedCount++;
      } else if (userAns === q.correctAnswer) {
        correctCount++;
        score += q.marks;
      } else {
        wrongCount++;
        const deduction = q.marks / 3.0;
        negativeMarks += deduction;
        score -= deduction;

        mistakes.push({
          questionId: q.id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          userAnswer: userAns,
          explanation: q.explanation,
          subject: q.subject,
          topic: q.topic,
          difficulty: q.difficulty
        });
      }
    });

    score = parseFloat(score.toFixed(2));
    const accuracy = this.questions.length - skippedCount > 0 ? Math.round((correctCount / (this.questions.length - skippedCount)) * 100) : 0;
    const timeSpent = this.totalTime - this.timeLeft;

    const attemptObj = {
      mode: this.testMode === 'Full-Length' ? 'Full-Length' : 'Subject Mock',
      scope: this.testMode === 'Full-Length' ? 'All Subjects' : (this.subjectMode === 'Topic' ? `${this.selectedSubject} (${this.selectedTopic})` : this.selectedSubject),
      totalPossibleMarks: this.questions.reduce((acc, curr) => acc + curr.marks, 0),
      score: score >= 0 ? score : 0,
      accuracy,
      correctCount,
      wrongCount,
      skippedCount,
      negativeMarks: parseFloat(negativeMarks.toFixed(2)),
      timeSpentSeconds: timeSpent,
      mistakes
    };

    try {
      const saved = await db.saveAttempt(attemptObj);
      this.isTesting = false;
      this.questions = [];
      document.body.classList.remove('fullscreen-exam'); // Restore screen view

      // Remove window unload guard (Flaw 2)
      if (this.unloadHandler) {
        window.removeEventListener('beforeunload', this.unloadHandler);
        this.unloadHandler = null;
      }


      showToast("Exam submitted successfully!", "success");

      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const currentDay = dayNames[new Date().getDay()];
      const hoursStudiedForExam = parseFloat((timeSpent / 3600).toFixed(2)) || 0.1;
      await db.updateStudyTime(currentDay, hoursStudiedForExam);

      window.location.hash = `#/analytics?id=${saved.id}`;
    } catch (err) {
      showToast(err.message, "error");
    }
  },

  safeEvaluate(expression) {
    let index = 0;

    const peek = () => expression[index];
    const consume = (char) => {
      if (expression[index] === char) {
        index++;
        return true;
      }
      return false;
    };

    const parseNumber = () => {
      let start = index;
      if (peek() === '-') index++; // unary minus
      while (index < expression.length && (/[0-9.]/).test(expression[index])) {
        index++;
      }
      const numStr = expression.substring(start, index);
      const valStr = parseFloat(numStr);
      if (isNaN(valStr)) throw new Error("Invalid number");
      return valStr;
    };

    const parsePrimary = () => {
      if (consume('(')) {
        const val = parseExpression();
        if (!consume(')')) throw new Error("Expected closing parenthesis");
        return val;
      }

      if (expression.startsWith('Math.sqrt(', index)) {
        index += 10;
        const val = parseExpression();
        if (!consume(')')) throw new Error("Expected closing parenthesis");
        return Math.sqrt(val);
      }
      if (expression.startsWith('Math.log(', index)) {
        index += 9;
        const val = parseExpression();
        if (!consume(')')) throw new Error("Expected closing parenthesis");
        return Math.log(val);
      }

      return parseNumber();
    };

    const parsePower = () => {
      let val = parsePrimary();
      while (index < expression.length) {
        if (expression.startsWith('**', index)) {
          index += 2;
          const exponent = parsePower();
          val = Math.pow(val, exponent);
        } else {
          break;
        }
      }
      return val;
    };

    const parseMultiplicative = () => {
      let val = parsePower();
      while (index < expression.length) {
        if (consume('*')) {
          val *= parsePower();
        } else if (consume('/')) {
          const divisor = parsePower();
          if (divisor === 0) throw new Error("Division by zero");
          val /= divisor;
        } else {
          break;
        }
      }
      return val;
    };

    const parseExpression = () => {
      let val = parseMultiplicative();
      while (index < expression.length) {
        if (consume('+')) {
          val += parseMultiplicative();
        } else if (consume('-')) {
          val -= parseMultiplicative();
        } else {
          break;
        }
      }
      return val;
    };

    expression = expression.replace(/\s+/g, '');
    const result = parseExpression();
    if (index < expression.length) {
      throw new Error("Unexpected characters at end of expression");
    }
    return result;
  },

  handleCalculator(val, display) {
    if (val === 'C') {
      this.calcInput = '0';
    } else if (val === '=') {
      try {
        const cleanExp = this.calcInput.replace(/sqrt\(/g, 'Math.sqrt(').replace(/log\(/g, 'Math.log(');
        const isSafe = /^[\d.+\-*/()Math.sqrtlog]+$/.test(cleanExp);
        if (!isSafe) throw new Error("Invalid characters");
        const result = this.safeEvaluate(cleanExp);
        this.calcInput = String(parseFloat(result.toFixed(6)));
      } catch (err) {
        this.calcInput = 'Error';
      }
    } else if (val === 'sqrt') {
      if (this.calcInput === '0' || this.calcInput === 'Error') {
        this.calcInput = 'Math.sqrt(';
      } else {
        this.calcInput = 'Math.sqrt(' + this.calcInput + ')';
      }
    } else if (val === 'pow') {
      this.calcInput = this.calcInput + '**2';
    } else if (val === 'log') {
      this.calcInput = 'Math.log(';
    } else {
      if (this.calcInput === '0' || this.calcInput === 'Error') {
        this.calcInput = val;
      } else {
        this.calcInput += val;
      }
    }
    
    if (display) {
      display.textContent = this.calcInput;
    }
  },

  async loadAttemptHistory() {
    const container = document.getElementById('history-tab-content');
    if (!container) return;

    const attempts = await db.getAttempts();

    if (attempts.length === 0) {
      container.innerHTML = `
        <div class="glass-panel p-12 text-center rounded-2xl flex flex-col items-center justify-center">
          <div class="h-16 w-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center text-2xl mb-4">
            <i class="fa-solid fa-clipboard-list"></i>
          </div>
          <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">No attempts yet</p>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Complete your first mock test to see results here.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="flex flex-col gap-3">
        ${attempts.map((att, i) => {
          const date = new Date(att.timestamp);
          const dateStr = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
          const timeStr = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
          const accuracy = att.accuracy || 0;
          const accuracyColor = accuracy >= 70 ? 'text-emerald-500' : accuracy >= 40 ? 'text-amber-500' : 'text-rose-500';
          const mistakeCount = att.mistakes?.length || 0;

          return `
          <div class="glass-panel rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60">
            <div class="flex items-center gap-4 p-4">
              <!-- Number -->
              <div class="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-display font-extrabold text-sm shadow-md">
                #${attempts.length - i}
              </div>
              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="font-bold text-sm text-slate-900 dark:text-white truncate">${att.scope || 'Mock Test'}</p>
                <p class="text-[11px] text-slate-400 mt-0.5">
                  <i class="fa-regular fa-calendar mr-1"></i>${dateStr} · ${timeStr} ·
                  <i class="fa-solid fa-bug ml-1 text-rose-400 mr-0.5"></i>${mistakeCount} mistake${mistakeCount !== 1 ? 's' : ''}
                </p>
              </div>
              <!-- Score -->
              <div class="text-right flex-shrink-0 hidden sm:block">
                <p class="font-display font-extrabold text-base text-slate-800 dark:text-slate-200">${att.score}/${att.totalPossibleMarks}</p>
                <p class="text-xs font-bold ${accuracyColor}">${accuracy}% accuracy</p>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-darkbg-50/20 flex items-center justify-between gap-2">
              <a href="#/analytics?id=${att.id}" class="flex items-center gap-1.5 text-[11px] font-bold text-primary-600 dark:text-primary-400 hover:underline transition-colors">
                <i class="fa-solid fa-magnifying-glass-chart"></i> View Analysis
              </a>
              <button class="mock-delete-btn flex items-center gap-1.5 text-[11px] font-bold text-rose-400 hover:text-rose-600 dark:text-rose-500 dark:hover:text-rose-400 transition-colors px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
                      data-attempt-id="${att.id}">
                <i class="fa-solid fa-trash-can"></i> Delete
              </button>
            </div>
          </div>
          `;
        }).join('')}
      </div>
    `;

    // Bind delete buttons in history tab
    container.querySelectorAll('.mock-delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const attemptId = btn.getAttribute('data-attempt-id');
        if (!confirm('Delete this attempt permanently? This cannot be undone.')) return;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i>';
        try {
          await db.deleteAttempt(attemptId);
          showToast('Attempt deleted.', 'success');
          this.loadAttemptHistory();
        } catch (err) {
          showToast('Error: ' + err.message, 'error');
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-trash-can"></i> Delete';
        }
      });
    });
  },

  async refresh() {
    const mainNode = document.querySelector('main');
    if (mainNode) {
      mainNode.innerHTML = await this.render();
      this.init();
    }
  }

};
