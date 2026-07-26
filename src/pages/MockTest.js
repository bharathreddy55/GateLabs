import { db, SUBJECT_SYLLABUS } from '../config/firebase';
import { showToast } from '../utils/toast';

export const MockTest = {
  // Config state
  testMode: 'Subject', // 'Full-Length' or 'Subject'
  selectedSubject: 'Section 8: Operating System',
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
  isSidebarOpen: true,
  isCalcDocked: false,

  async render() {
    if (!this.isTesting) {
      return this.renderConfigScreen();
    }
    return this.renderSimulatorScreen();
  },

  renderConfigScreen() {
    const subjects = Object.keys(SUBJECT_SYLLABUS);
    const SUBJECT_ICONS = {
      "Section 1: Engineering Mathematics": "fa-calculator",
      "Section 2: Digital Logic": "fa-microchip",
      "Section 3: Computer Organization and Architecture": "fa-server",
      "Section 4: Programming and Data Structures": "fa-code",
      "Section 5: Algorithms": "fa-sitemap",
      "Section 6: Theory of Computation": "fa-cog",
      "Section 7: Compiler Design": "fa-laptop-code",
      "Section 8: Operating System": "fa-window-maximize",
      "Section 9: Databases": "fa-database",
      "Section 10: Computer Networks": "fa-network-wired"
    };

    return `
      <!-- Config Tab Bar -->
      <div class="max-w-3xl mx-auto mb-6 flex gap-2 bg-slate-100/50 dark:bg-slate-950/40 p-1.5 rounded-2xl border border-slate-200/40 dark:border-white/[0.04] backdrop-blur-md">
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

      ${ this.configTab === 'history' ? '<div id="history-tab-content" class="max-w-3xl mx-auto"><p class="text-xs text-slate-400 text-center py-10 font-bold"><i class="fa-solid fa-circle-notch animate-spin mr-2 text-primary-500"></i>Loading attempts...</p></div>' : `
      <div class="max-w-3xl mx-auto glass-panel p-8 rounded-3xl flex flex-col gap-6 animate-fade-in font-sans">
        <div class="text-center">
          <h3 class="font-display font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">AI Mock Test Generator</h3>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-1 font-semibold">Simulate the realistic GATE computer-based test environment with custom bounds.</p>
        </div>

        <form id="generator-form" class="flex flex-col gap-6 text-xs font-semibold">
          <!-- Mode Selection -->
          <div>
            <label class="block text-slate-400 uppercase mb-2 tracking-wider">Test Type</label>
            <div class="grid grid-cols-2 gap-4">
              <label class="flex flex-col items-center justify-center p-4.5 rounded-2xl border cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-950/20 hover:scale-[1.01] hover:shadow-md transition-all text-center ${this.testMode === 'Full-Length' ? 'border-primary-500 bg-primary-55/10 shadow-lg shadow-primary-500/10' : 'border-slate-200 dark:border-white/[0.04] bg-white/40 dark:bg-slate-950/10'}">
                <input type="radio" name="test-mode" value="Full-Length" ${this.testMode === 'Full-Length' ? 'checked' : ''} class="sr-only">
                <i class="fa-solid fa-layer-group text-xl text-primary-500 mb-2.5"></i>
                <span class="text-slate-800 dark:text-slate-200 font-bold">Full-Length Mock</span>
                <span class="text-[10px] text-slate-400 mt-1 font-semibold">Includes all 10 subjects</span>
              </label>

              <label class="flex flex-col items-center justify-center p-4.5 rounded-2xl border cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-950/20 hover:scale-[1.01] hover:shadow-md transition-all text-center ${this.testMode === 'Subject' ? 'border-primary-500 bg-primary-55/10 shadow-lg shadow-primary-500/10' : 'border-slate-200 dark:border-white/[0.04] bg-white/40 dark:bg-slate-950/10'}">
                <input type="radio" name="test-mode" value="Subject" ${this.testMode === 'Subject' ? 'checked' : ''} class="sr-only">
                <i class="fa-solid fa-book text-xl text-indigo-500 mb-2.5"></i>
                <span class="text-slate-800 dark:text-slate-200 font-bold">Subject-Wise Mock</span>
                <span class="text-[10px] text-slate-400 mt-1 font-semibold">Test single subject or topic</span>
              </label>
            </div>
          </div>

          <!-- Conditional Subject Options -->
          <div id="subject-config-panel" class="${this.testMode === 'Subject' ? '' : 'hidden'} flex flex-col gap-5 p-5 rounded-2xl border border-slate-200/60 dark:border-white/[0.04] bg-slate-50/50 dark:bg-slate-950/20">
            <div>
              <label class="block text-slate-405 uppercase mb-3 tracking-wider">Select Subject</label>
              <!-- Subject Cards Grid -->
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                ${subjects.map(s => {
                  const isSelected = this.selectedSubject === s;
                  const icon = SUBJECT_ICONS[s] || "fa-book";
                  return `
                    <div class="subject-select-btn flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all active:scale-98 ${
                      isSelected ? 'border-primary-500 bg-primary-50/10 dark:bg-primary-950/20' : 'border-slate-200 dark:border-white/5 bg-white dark:bg-[#121a2b] hover:bg-slate-100 dark:hover:bg-[#1b253b]'
                    }" data-subject="${s}">
                      <div class="h-8 w-8 rounded-lg flex items-center justify-center text-xs ${
                        isSelected ? 'btn-accent' : 'bg-slate-100 dark:bg-white/10 text-slate-505 dark:text-slate-300'
                      }">
                        <i class="fa-solid ${icon}"></i>
                      </div>
                      <span class="text-[11px] font-extrabold text-slate-700 dark:text-slate-200 leading-tight">${s.split(': ')[1] || s}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div>
              <label class="block text-slate-400 uppercase mb-2 tracking-wider">Scope Options</label>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-bold">
                  <input type="radio" name="subject-mode" value="Full" ${this.subjectMode === 'Full' ? 'checked' : ''} class="text-primary-600 focus:ring-primary-500 bg-white/50 dark:bg-slate-950/40">
                  <span>Full Subject Mock</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-bold">
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
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <!-- Questions Count Selector -->
            <div>
              <label class="block text-slate-400 uppercase mb-2 tracking-wider">Questions</label>
              <select id="config-count" class="glass-input text-xs font-semibold">
                ${Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map(val => `
                  <option value="${val}" ${this.requestedCount === val ? 'selected' : ''}>${val} Questions</option>
                `).join('')}
              </select>
            </div>

            <!-- Duration Slider and Presets (Span 2 cols on desktop) -->
            <div class="md:col-span-2">
              <div class="flex items-center justify-between mb-2">
                <label class="block text-slate-400 uppercase tracking-wider">Duration: <span id="duration-slider-value" class="accent-text font-extrabold font-mono text-xs">${this.requestedDuration}</span> Mins</label>
                <div class="flex gap-1.5">
                  ${[15, 30, 60, 90, 120, 180].map(m => `
                    <button type="button" class="duration-preset-chip px-2 py-0.5 rounded-lg border text-[10px] font-bold transition-all ${
                      this.requestedDuration === m ? 'border-primary-500 bg-primary-500/10 text-primary-600' : 'border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400'
                    }" data-mins="${m}">${m}m</button>
                  `).join('')}
                </div>
              </div>
              <div class="flex items-center gap-4 mt-3">
                <input type="range" id="config-duration-slider" min="5" max="180" step="5" value="${this.requestedDuration}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-600">
              </div>
            </div>
          </div>

          <!-- Difficulty Select Chips -->
          <div>
            <label class="block text-slate-400 uppercase mb-2 tracking-wider">Difficulty Level</label>
            <div class="grid grid-cols-3 gap-3">
              ${[
                { value: 'easy', label: 'Easy Level', desc: 'Fundamentals review' },
                { value: 'medium', label: 'Medium Level', desc: 'Standard GATE practice' },
                { value: 'hard', label: 'Hard Level', desc: 'Challenging questions' }
              ].map(item => {
                const isSelected = this.selectedDifficulty === item.value;
                return `
                  <div class="difficulty-select-chip flex flex-col items-center justify-center p-3 rounded-2xl border cursor-pointer text-center transition-all select-none active:scale-98 ${
                    isSelected ? 'border-primary-500 bg-primary-50/10 dark:bg-primary-950/20' : 'border-slate-200 dark:border-white/5 bg-white dark:bg-[#121a2b] hover:bg-slate-100 dark:hover:bg-[#1b253b]'
                  }" data-diff="${item.value}">
                    <span class="text-xs font-bold text-slate-800 dark:text-slate-100">${item.label}</span>
                    <span class="text-[9px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 leading-none">${item.desc}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <button type="submit" class="w-full mt-4 py-3.5 rounded-xl btn-accent text-white font-bold text-sm active:scale-98 hover:scale-[1.01] transition-all">
            Generate Mock Test
          </button>
        </form>
      </div>
      `}
    `;
  },

  renderCalculatorInnerHtml() {
    return `
      <div id="calculator-header" class="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 ${this.isCalcDocked ? '' : 'cursor-grab select-none active:cursor-grabbing'}">
        <span class="text-xs font-bold text-slate-300 pointer-events-none flex items-center gap-1.5">
          <i class="fa-solid fa-calculator text-primary-400"></i> TCS iON Scientific Calculator
        </span>
        <div class="flex items-center gap-2">
          <button id="toggle-dock-calc" type="button" class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all select-none">
            ${this.isCalcDocked ? '<i class="fa-solid fa-up-right-from-square"></i> Float' : '<i class="fa-solid fa-window-maximize"></i> Dock'}
          </button>
          ${!this.isCalcDocked ? `
            <button id="close-calc" type="button" class="text-slate-400 hover:text-white transition-colors">
              <i class="fa-solid fa-xmark"></i>
            </button>
          ` : ''}
        </div>
      </div>
      
      <!-- Dual Screen Display -->
      <div class="bg-slate-950 rounded-xl p-3 mb-3 text-right border border-slate-800">
        <span id="calc-angle-indicator" class="text-[10px] font-bold text-primary-400 uppercase tracking-wider float-left">${this.calcAngleMode || 'Deg'}</span>
        <span id="calc-display-sub" class="text-[10px] font-mono text-slate-500 block truncate leading-tight">${this.calcSubDisplay || ''}</span>
        <span id="calc-display" class="font-mono text-xl font-bold text-white truncate block leading-tight mt-0.5">${this.calcInput || '0'}</span>
      </div>
      
      <!-- Keypad Grid -->
      <div class="grid grid-cols-5 gap-1.5 text-xs font-semibold">
        <!-- Row 1: Memory & Modes -->
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-amber-400" data-calc="deg-rad">${this.calcAngleMode === 'Rad' ? 'Rad' : 'Deg'}</button>
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-indigo-300" data-calc="mc">MC</button>
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-indigo-300" data-calc="mr">MR</button>
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-indigo-300" data-calc="ms">MS</button>
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-indigo-300" data-calc="m+">M+</button>

        <!-- Row 2: Scientific Trig -->
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="sin">sin</button>
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="cos">cos</button>
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="tan">tan</button>
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="asin">asin</button>
        <button class="calc-btn bg-rose-600/80 hover:bg-rose-600 text-white font-bold" data-calc="C">C</button>

        <!-- Row 3: Log & Power -->
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="log">log</button>
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="ln">ln</button>
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="sqrt">√x</button>
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="pow2">x²</button>
        <button class="calc-btn bg-rose-500/30 hover:bg-rose-500/50 text-rose-300" data-calc="back">⌫</button>

        <!-- Row 4: Math ops & Numpad 7-9 -->
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="fact">n!</button>
        <button class="calc-btn bg-slate-800/80 hover:bg-slate-700 text-white font-bold" data-calc="7">7</button>
        <button class="calc-btn bg-slate-800/80 hover:bg-slate-700 text-white font-bold" data-calc="8">8</button>
        <button class="calc-btn bg-slate-800/80 hover:bg-slate-700 text-white font-bold" data-calc="9">9</button>
        <button class="calc-btn bg-indigo-600 hover:bg-indigo-500 text-white font-bold" data-calc="/">/</button>

        <!-- Row 5: Numpad 4-6 -->
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="mod">mod</button>
        <button class="calc-btn bg-slate-800/80 hover:bg-slate-700 text-white font-bold" data-calc="4">4</button>
        <button class="calc-btn bg-slate-800/80 hover:bg-slate-700 text-white font-bold" data-calc="5">5</button>
        <button class="calc-btn bg-slate-800/80 hover:bg-slate-700 text-white font-bold" data-calc="6">6</button>
        <button class="calc-btn bg-indigo-600 hover:bg-indigo-500 text-white font-bold" data-calc="*">*</button>

        <!-- Row 6: Numpad 1-3 -->
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="pi">π</button>
        <button class="calc-btn bg-slate-800/80 hover:bg-slate-700 text-white font-bold" data-calc="1">1</button>
        <button class="calc-btn bg-slate-800/80 hover:bg-slate-700 text-white font-bold" data-calc="2">2</button>
        <button class="calc-btn bg-slate-800/80 hover:bg-slate-700 text-white font-bold" data-calc="3">3</button>
        <button class="calc-btn bg-indigo-600 hover:bg-indigo-500 text-white font-bold" data-calc="-">-</button>

        <!-- Row 7: 0, decimal, =, + -->
        <button class="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300" data-calc="e">e</button>
        <button class="calc-btn bg-slate-800/80 hover:bg-slate-700 text-white font-bold" data-calc="0">0</button>
        <button class="calc-btn bg-slate-800/80 hover:bg-slate-700 text-white font-bold" data-calc=".">.</button>
        <button class="calc-btn bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold" data-calc="=">=</button>
        <button class="calc-btn bg-indigo-600 hover:bg-indigo-500 text-white font-bold" data-calc="+">+</button>
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
      const activeClass = isSelected ? 'bg-primary-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700';
      return `
        <button class="section-tab-btn px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${activeClass}" data-section="${secName}">
          ${secName}
        </button>
      `;
    }).join('');

    return `
      <!-- Simulator Wrapper (Adaptive dark/light theme, beautiful bento structure) -->
      <div class="min-h-[calc(100vh-3.5rem)] flex flex-col gap-5 select-none animate-fade-in font-sans">
        
        <!-- Top Toolbar -->
        <div class="glass-panel px-6 py-3.5 rounded-3xl flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Sections:</span>
            <div class="flex flex-wrap items-center gap-2">
              ${sectionTabsHtml}
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button id="toggle-calc-btn" class="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5">
              <i class="fa-solid fa-calculator"></i> ${this.isCalcOpen ? 'Hide Calculator' : 'Calculator'}
            </button>
            <button id="toggle-sidebar-btn" class="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 select-none">
              <i class="fa-solid ${this.isSidebarOpen ? 'fa-angles-right' : 'fa-angles-left'}"></i>
              <span>${this.isSidebarOpen ? 'Maximize Widescreen' : 'Show Panel'}</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 relative items-stretch">
          
          <!-- Floating TCS Calculator (if floating and calculator open) -->
          ${(!this.isCalcDocked && this.isCalcOpen) ? `
            <div id="calculator-widget" class="fixed z-50 w-80 bg-slate-900 text-white rounded-3xl shadow-2xl p-4 border border-slate-700 animate-scale-in"
                 style="${this.calcLeft !== undefined && this.calcTop !== undefined ? `left: ${this.calcLeft}px; top: ${this.calcTop}px; transform: none;` : 'top: 7rem; left: 45%; transform: translateX(-50%);'}">
              ${this.renderCalculatorInnerHtml()}
            </div>
          ` : ''}

          <!-- Left Column (Question + Options Area) -->
          <div class="${this.isSidebarOpen ? 'lg:col-span-3' : 'lg:col-span-4'} flex flex-col gap-6 items-stretch justify-between">
            
            <!-- Split Pane (Question left card, response options right card) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 items-stretch">
              
              <!-- Left Side: Question Card -->
              <div class="glass-panel p-6 rounded-3xl flex flex-col gap-4 min-h-[30rem] justify-between">
                <div>
                  <div class="flex items-center justify-between border-b border-slate-150 dark:border-white/5 pb-3.5 mb-4">
                    <span class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Question ${this.currentIdx + 1} of ${this.questions.length}</span>
                    <span class="text-[10px] font-mono font-extrabold uppercase bg-primary-500/10 text-primary-500 px-2.5 py-1 rounded-lg">${q.topic}</span>
                  </div>

                  <div class="flex items-center gap-2 mb-3">
                    <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase tracking-wider ${
                      q.type === 'MSQ' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20' :
                      q.type === 'NAT' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                      'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                    }">
                      ${q.type || 'MCQ'} (${q.marks} Mark${q.marks > 1 ? 's' : ''})
                    </span>
                    ${q.type === 'MSQ' ? '<span class="text-[9px] font-bold text-slate-400 dark:text-slate-500">(Multiple Select. No negative marking)</span>' : ''}
                    ${q.type === 'NAT' ? '<span class="text-[9px] font-bold text-slate-400 dark:text-slate-500">(Numerical Answer. No negative marking)</span>' : ''}
                  </div>

                  <p class="text-xs font-bold text-slate-805 dark:text-slate-200 whitespace-pre-line leading-relaxed max-h-[22rem] overflow-y-auto pr-1">
                    ${q.question}
                  </p>
                </div>

                <div class="border-t border-slate-100 dark:border-white/5 pt-3.5 text-[10px] font-bold text-slate-400 flex items-center justify-between">
                  <span>Subject: ${q.subject}</span>
                  <span>ID: ${q.id}</span>
                </div>
              </div>

              <!-- Right Side: Options/Keypad Selection Card -->
              <div class="glass-panel p-6 rounded-3xl flex flex-col gap-4 min-h-[30rem] justify-between">
                <div>
                  <div class="flex items-center justify-between border-b border-slate-150 dark:border-white/5 pb-3.5 mb-4">
                    <span class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Your Response</span>
                    <span class="text-[10px] font-extrabold text-primary-500 bg-primary-500/10 px-2.5 py-1 rounded-lg">${q.marks} Mark${q.marks > 1 ? 's' : ''}</span>
                  </div>

                  <div class="max-h-[22rem] overflow-y-auto pr-1">
                    ${q.type === 'NAT' ? `
                      <!-- NAT Input Panel -->
                      <div class="flex flex-col gap-4 max-w-sm mx-auto">
                        <input type="text" id="nat-answer-input" readonly value="${this.answers[q.id] !== undefined ? this.answers[q.id] : ''}" placeholder="Enter number using keypad" class="w-full text-center font-mono font-extrabold text-lg px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white shadow-inner focus:border-primary-500">
                        
                        <div class="grid grid-cols-4 gap-1.5 font-mono text-xs">
                          ${['7','8','9','C','4','5','6','⌫','1','2','3','-','0','.','00','OK'].map(k => `
                            <button type="button" class="nat-keypad-btn p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 border border-slate-200 dark:border-white/5 font-extrabold text-slate-800 dark:text-slate-200 shadow-sm" data-key="${k}">
                              ${k}
                            </button>
                          `).join('')}
                        </div>
                      </div>
                    ` : q.type === 'MSQ' ? `
                      <!-- MSQ Checkboxes -->
                      <div class="flex flex-col gap-3">
                        ${q.options.map((opt, oIdx) => {
                          const userArr = Array.isArray(this.answers[q.id]) ? this.answers[q.id] : [];
                          const isChecked = userArr.includes(oIdx);
                          return `
                            <label class="flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] hover:bg-slate-50/50 dark:hover:bg-white/5 relative ${
                              isChecked ? 'border-primary-500 bg-primary-50/10 dark:bg-primary-950/20' : 'border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10'
                            }">
                              <input type="checkbox" name="sim-option-msq" value="${oIdx}" ${isChecked ? 'checked' : ''} class="mt-0.5 text-primary-600 border-slate-350 focus:ring-primary-500 rounded bg-white dark:bg-slate-900">
                              <span class="text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed">${String.fromCharCode(65 + oIdx)}. ${opt}</span>
                            </label>
                          `;
                        }).join('')}
                      </div>
                    ` : `
                      <!-- MCQ Radio Buttons -->
                      <div class="flex flex-col gap-3">
                        ${q.options.map((opt, oIdx) => {
                          const isChecked = this.answers[q.id] === oIdx;
                          return `
                            <label class="flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] hover:bg-slate-50/50 dark:hover:bg-white/5 relative ${
                              isChecked ? 'border-primary-500 bg-primary-50/10 dark:bg-primary-950/20' : 'border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10'
                            }">
                              <input type="radio" name="sim-option" value="${oIdx}" ${isChecked ? 'checked' : ''} class="mt-0.5 text-primary-600 border-slate-350 focus:ring-primary-500 bg-white dark:bg-slate-900">
                              <span class="text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed">${String.fromCharCode(65 + oIdx)}. ${opt}</span>
                            </label>
                          `;
                        }).join('')}
                      </div>
                    `}
                  </div>
                </div>

                <div class="flex justify-end gap-2 border-t border-slate-100 dark:border-white/5 pt-3.5">
                  <button id="btn-clear" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all">
                    Clear Response
                  </button>
                </div>
              </div>

            </div>

            <!-- Inline Docked Calculator -->
            ${(this.isCalcDocked && this.isCalcOpen) ? `
              <div class="glass-panel p-5 rounded-3xl bg-slate-900 border border-slate-700 text-white animate-scale-in">
                ${this.renderCalculatorInnerHtml()}
              </div>
            ` : ''}

            <!-- Simulator Actions Footer -->
            <div class="glass-panel px-6 py-4 rounded-3xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <button id="btn-mark-review" class="px-5 py-3 rounded-2xl border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold hover:bg-indigo-50 dark:hover:bg-indigo-950/10 active:scale-95 transition-all">
                  Mark for Review & Next
                </button>
              </div>
              
              <div class="flex gap-2.5">
                <button id="btn-prev" class="px-5 py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-655 dark:text-slate-300 text-xs font-extrabold hover:bg-slate-100 dark:hover:bg-slate-850 active:scale-95 transition-all">
                  Previous
                </button>
                <button id="btn-save-next" class="px-6 py-3 rounded-2xl btn-accent text-white text-xs font-extrabold shadow-md active:scale-95 transition-all">
                  Save & Next
                </button>
              </div>
            </div>

          </div>

          <!-- Right Column (Sidebar Timer & Color Palette Grid) -->
          ${this.isSidebarOpen ? `
            <div class="lg:col-span-1 flex flex-col gap-6 items-stretch justify-between">
              
              <!-- Timer Container -->
              <div class="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center">
                <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><i class="fa-regular fa-clock text-primary-500"></i> Time Remaining</p>
                <h3 id="sim-timer" class="font-mono text-2xl font-extrabold text-slate-800 dark:text-white mt-1 leading-none">${formatTimer(this.timeLeft)}</h3>
              </div>

              <!-- Question Palette Grid -->
              <div class="glass-panel p-5 rounded-3xl flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3 mb-3">
                    <h4 class="font-display font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Question Palette</h4>
                    <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500">${this.questions.length} Questions</span>
                  </div>

                  <!-- Legend -->
                  <div class="grid grid-cols-2 gap-1.5 mb-4 text-[9px] font-bold">
                    <div class="flex items-center justify-between px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200/30 dark:border-emerald-500/10">
                      <span class="flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Answered</span>
                      <span class="font-mono text-xs font-extrabold">${statusCounts['answered'] + statusCounts['marked-answered']}</span>
                    </div>
                    <div class="flex items-center justify-between px-2 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border border-rose-200/30 dark:border-rose-500/10">
                      <span class="flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-rose-500"></span> Not Ans.</span>
                      <span class="font-mono text-xs font-extrabold">${statusCounts['not-answered']}</span>
                    </div>
                    <div class="flex items-center justify-between px-2 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 border border-purple-200/30 dark:border-purple-500/10">
                      <span class="flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-purple-500"></span> Marked</span>
                      <span class="font-mono text-xs font-extrabold">${statusCounts['marked'] + statusCounts['marked-answered']}</span>
                    </div>
                    <div class="flex items-center justify-between px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/5">
                      <span class="flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span> Unvisited</span>
                      <span class="font-mono text-xs font-extrabold">${statusCounts['not-visited']}</span>
                    </div>
                  </div>

                  <!-- Questions Grid (Scrollable) -->
                  <div class="grid grid-cols-4 md:grid-cols-4 gap-2 overflow-y-auto max-h-[16rem] pr-0.5">
                    ${this.questions.map((qi, idx) => {
                      const btnClass = this.getPaletteBtnClassString(qi.id, idx);
                      return `
                        <button class="palette-btn-select ${btnClass}" data-pindex="${idx}">
                          ${idx + 1}
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>

                <button id="btn-submit-exam" class="w-full mt-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 select-none">
                  <i class="fa-solid fa-paper-plane"></i> Submit Test
                </button>
              </div>

            </div>
          ` : ''}

        </div>

        <!-- Submit Confirmation Dialog Modal -->
        <div id="exam-submit-confirm-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md hidden px-4 animate-fade-in">
          <div class="w-full max-w-md glass-panel p-7 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white flex flex-col gap-5">
            <div class="flex items-center gap-3">
              <div class="h-11 w-11 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl flex-shrink-0">
                <i class="fa-solid fa-triangle-exclamation animate-pulse"></i>
              </div>
              <div>
                <h3 class="font-display font-extrabold text-lg tracking-tight">Submit Test Confirmation</h3>
                <p class="text-xs text-slate-400 font-semibold">Are you sure you want to end your test?</p>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-2.5 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-center">
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase">Answered</p>
                <p class="font-display font-extrabold text-lg text-emerald-500 mt-0.5">${statusCounts['answered'] + statusCounts['marked-answered']}</p>
              </div>
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase">Unanswered</p>
                <p class="font-display font-extrabold text-lg text-rose-500 mt-0.5">${statusCounts['not-answered'] + statusCounts['not-visited']}</p>
              </div>
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase">Marked</p>
                <p class="font-display font-extrabold text-lg text-purple-500 mt-0.5">${statusCounts['marked'] + statusCounts['marked-answered']}</p>
              </div>
            </div>

            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Once submitted, your responses will be sent for evaluation and saved to your **Mistake Analysis**.
            </p>

            <div class="flex items-center justify-end gap-3 pt-2">
              <button id="cancel-submit-modal-btn" type="button" class="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-all select-none">
                Resume Test
              </button>
              <button id="confirm-submit-modal-btn" type="button" class="px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all select-none flex items-center gap-1.5">
                <i class="fa-solid fa-check"></i> Submit Exam Now
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
      const subModeRadios = document.getElementsByName('subject-mode');
      const configTopicsList = document.getElementById('config-topics-list');

      // 1. Mode Select Trigger
      modeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          this.testMode = e.target.value;
          this.refresh();
        });
      });

      // 2. Subject Cards Click Trigger
      document.querySelectorAll('.subject-select-btn').forEach(card => {
        card.addEventListener('click', () => {
          this.selectedSubject = card.getAttribute('data-subject');
          this.refresh();
        });
      });

      // 3. Sub-Mode Option Trigger (Full vs Topic)
      subModeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          this.subjectMode = e.target.value;
          this.refresh();
        });
      });

      // 4. Duration Preset Chips Click Trigger
      document.querySelectorAll('.duration-preset-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const mins = parseInt(chip.getAttribute('data-mins'));
          this.requestedDuration = mins;
          const slider = document.getElementById('config-duration-slider');
          if (slider) slider.value = mins;
          const valLabel = document.getElementById('duration-slider-value');
          if (valLabel) valLabel.textContent = mins;

          // Update active chip classes
          document.querySelectorAll('.duration-preset-chip').forEach(c => {
            const m = parseInt(c.getAttribute('data-mins'));
            if (m === mins) {
              c.className = "duration-preset-chip px-2 py-0.5 rounded-lg border text-[10px] font-bold transition-all border-primary-500 bg-primary-500/10 text-primary-600";
            } else {
              c.className = "duration-preset-chip px-2 py-0.5 rounded-lg border text-[10px] font-bold transition-all border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-505 dark:text-slate-400";
            }
          });
        });
      });

      // 5. Duration Slider Input Trigger
      const durationSlider = document.getElementById('config-duration-slider');
      durationSlider?.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        this.requestedDuration = val;
        const valLabel = document.getElementById('duration-slider-value');
        if (valLabel) valLabel.textContent = val;

        // Sync preset chips active class
        document.querySelectorAll('.duration-preset-chip').forEach(c => {
          const m = parseInt(c.getAttribute('data-mins'));
          if (m === val) {
            c.className = "duration-preset-chip px-2 py-0.5 rounded-lg border text-[10px] font-bold transition-all border-primary-500 bg-primary-500/10 text-primary-600";
          } else {
            c.className = "duration-preset-chip px-2 py-0.5 rounded-lg border text-[10px] font-bold transition-all border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400";
          }
        });
      });

      // 6. Difficulty Select Chips Click Trigger
      document.querySelectorAll('.difficulty-select-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          this.selectedDifficulty = chip.getAttribute('data-diff');
          this.refresh();
        });
      });

      // Initial topics loading - query questions first to sync custom topics/subtopics
      db.getQuestions().then(() => {
        if (this.testMode === 'Subject' && configTopicsList) {
          this.loadTopicsForSelectedSubject(this.selectedSubject, configTopicsList);
        }
      }).catch(err => {
        console.error("Failed to pre-load topics:", err);
      });

      form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const countInput = parseInt(document.getElementById('config-count').value);
        const durationInput = this.requestedDuration;
        const difficultyInput = this.selectedDifficulty;
        const subjectInput = this.selectedSubject;
        
        this.requestedCount = countInput;
        this.requestedDuration = durationInput;
        this.selectedDifficulty = difficultyInput;
        this.selectedSubject = subjectInput;
        
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
    
    // Option click / check handlers
      const q = this.questions[this.currentIdx];
      if (q) {
        if (q.type === 'NAT') {
          const natInput = document.getElementById('nat-answer-input');
          document.querySelectorAll('.nat-keypad-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const k = btn.getAttribute('data-key');
              let cur = natInput.value || '';
              if (k === 'C') {
                cur = '';
              } else if (k === '⌫') {
                cur = cur.slice(0, -1);
              } else if (k === 'OK') {
                // Done entering
              } else {
                cur += k;
              }
              natInput.value = cur;
              if (cur.trim().length > 0) {
                this.answers[q.id] = cur.trim();
              } else {
                delete this.answers[q.id];
              }
            });
          });
        } else if (q.type === 'MSQ') {
          const msqInputs = document.getElementsByName('sim-option-msq');
          msqInputs.forEach(input => {
            input.addEventListener('change', () => {
              const selectedVals = Array.from(msqInputs)
                .filter(i => i.checked)
                .map(i => parseInt(i.value));
              if (selectedVals.length > 0) {
                this.answers[q.id] = selectedVals;
              } else {
                delete this.answers[q.id];
              }
            });
          });
        } else {
          const optionInputs = document.getElementsByName('sim-option');
          optionInputs.forEach(input => {
            input.addEventListener('change', (e) => {
              this.answers[q.id] = parseInt(e.target.value);
            });
          });
        }
      }

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

    const submitModal = document.getElementById('exam-submit-confirm-modal');
    const cancelSubmitBtn = document.getElementById('cancel-submit-modal-btn');
    const confirmSubmitBtn = document.getElementById('confirm-submit-modal-btn');

    btnSubmit?.addEventListener('click', () => {
      submitModal?.classList.remove('hidden');
    });

    cancelSubmitBtn?.addEventListener('click', () => {
      submitModal?.classList.add('hidden');
    });

    confirmSubmitBtn?.addEventListener('click', () => {
      submitModal?.classList.add('hidden');
      this.submitExam();
    });

    submitModal?.addEventListener('click', (e) => {
      if (e.target === submitModal) submitModal.classList.add('hidden');
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

    // Collapse / Expand Sidebar
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    toggleSidebarBtn?.addEventListener('click', () => {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.refresh();
    });

    // Calculator triggers
    toggleCalc?.addEventListener('click', () => {
      this.isCalcOpen = !this.isCalcOpen;
      this.refresh();
    });

    closeCalc?.addEventListener('click', () => {
      this.isCalcOpen = false;
      this.refresh();
    });

    const toggleDockCalcBtn = document.getElementById('toggle-dock-calc');
    toggleDockCalcBtn?.addEventListener('click', () => {
      this.isCalcDocked = !this.isCalcDocked;
      if (this.isCalcDocked) {
        // Reset absolute coordinates when docking
        this.calcLeft = undefined;
        this.calcTop = undefined;
      }
      this.refresh();
    });

    const calcDisplay = document.getElementById('calc-display');
    const calcBtns = document.querySelectorAll('.calc-btn');
    calcBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-calc');
        this.handleCalculator(val, calcDisplay);
      });
    });

    // Make calculator draggable (only when floating)
    const calcHeader = document.getElementById('calculator-header');
    if (!this.isCalcDocked && calcHeader && calcWidget) {
      let isDragging = false;
      let startX, startY;
      let initialLeft, initialTop;

      const onMouseDown = (e) => {
        if (e.target.closest('#close-calc') || e.target.closest('#toggle-dock-calc') || e.target.closest('.calc-btn')) return;
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
        if (e.target.closest('#close-calc') || e.target.closest('#toggle-dock-calc') || e.target.closest('.calc-btn')) return;
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

    // Evaluate marks & mistakes for MCQ, MSQ, and NAT
    this.questions.forEach(q => {
      const userAns = this.answers[q.id];

      if (userAns === undefined || userAns === null || (Array.isArray(userAns) && userAns.length === 0) || userAns === '') {
        skippedCount++;
      } else if (q.type === 'MSQ') {
        // MSQ: Array of checked indices must match q.correctOptions exactly (no partial credit, 0 negative marks)
        const userArr = Array.isArray(userAns) ? [...userAns].sort() : [userAns];
        const correctArr = Array.isArray(q.correctOptions) ? [...q.correctOptions].sort() : [q.correctAnswer];
        const isMatch = userArr.length === correctArr.length && userArr.every((val, index) => val === correctArr[index]);

        if (isMatch) {
          correctCount++;
          score += q.marks;
        } else {
          wrongCount++;
          // No negative marking for MSQ in GATE!
          mistakes.push({
            questionId: q.id,
            type: 'MSQ',
            question: q.question,
            options: q.options,
            correctOptions: q.correctOptions,
            userAnswer: userAns,
            explanation: q.explanation,
            subject: q.subject,
            topic: q.topic,
            difficulty: q.difficulty
          });
        }
      } else if (q.type === 'NAT') {
        // NAT: Numerical value must fall between natMin and natMax (0 negative marks)
        const userNum = parseFloat(userAns);
        const minVal = q.natMin !== undefined ? q.natMin : q.correctNat;
        const maxVal = q.natMax !== undefined ? q.natMax : q.correctNat;
        const isCorrect = !isNaN(userNum) && userNum >= minVal && userNum <= maxVal;

        if (isCorrect) {
          correctCount++;
          score += q.marks;
        } else {
          wrongCount++;
          // No negative marking for NAT in GATE!
          mistakes.push({
            questionId: q.id,
            type: 'NAT',
            question: q.question,
            correctNat: q.correctNat ?? `${minVal} to ${maxVal}`,
            userAnswer: userAns,
            explanation: q.explanation,
            subject: q.subject,
            topic: q.topic,
            difficulty: q.difficulty
          });
        }
      } else {
        // Standard MCQ
        if (userAns === q.correctAnswer) {
          correctCount++;
          score += q.marks;
        } else {
          wrongCount++;
          const deduction = q.marks / 3.0;
          negativeMarks += deduction;
          score -= deduction;

          mistakes.push({
            questionId: q.id,
            type: 'MCQ',
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
    if (!this.calcInput || this.calcInput === 'Error') this.calcInput = '0';
    if (!this.calcAngleMode) this.calcAngleMode = 'Deg';
    if (this.calcMemory === undefined) this.calcMemory = 0;

    const angleIndicator = document.getElementById('calc-angle-indicator');
    const subDisplay = document.getElementById('calc-display-sub');

    try {
      if (val === 'C') {
        this.calcInput = '0';
        this.calcSubDisplay = '';
      } else if (val === 'back') {
        if (this.calcInput.length > 1) {
          this.calcInput = this.calcInput.slice(0, -1);
        } else {
          this.calcInput = '0';
        }
      } else if (val === 'deg-rad') {
        this.calcAngleMode = this.calcAngleMode === 'Deg' ? 'Rad' : 'Deg';
        if (angleIndicator) angleIndicator.textContent = this.calcAngleMode;
      } else if (val === 'mc') {
        this.calcMemory = 0;
        showToast("Memory Cleared", "info");
      } else if (val === 'mr') {
        this.calcInput = String(this.calcMemory);
      } else if (val === 'ms') {
        this.calcMemory = parseFloat(this.calcInput) || 0;
        showToast(`Memory Stored: ${this.calcMemory}`, "success");
      } else if (val === 'm+') {
        this.calcMemory += parseFloat(this.calcInput) || 0;
        showToast(`Memory: ${this.calcMemory}`, "info");
      } else if (['sin', 'cos', 'tan', 'asin'].includes(val)) {
        let num = parseFloat(this.calcInput);
        if (isNaN(num)) num = 0;
        let angle = this.calcAngleMode === 'Deg' ? (num * Math.PI) / 180 : num;
        let res = 0;
        if (val === 'sin') res = Math.sin(angle);
        if (val === 'cos') res = Math.cos(angle);
        if (val === 'tan') res = Math.tan(angle);
        if (val === 'asin') res = this.calcAngleMode === 'Deg' ? (Math.asin(num) * 180) / Math.PI : Math.asin(num);
        this.calcSubDisplay = `${val}(${num})`;
        this.calcInput = String(parseFloat(res.toFixed(8)));
      } else if (val === 'log') {
        let num = parseFloat(this.calcInput);
        this.calcSubDisplay = `log10(${num})`;
        this.calcInput = String(parseFloat(Math.log10(num).toFixed(8)));
      } else if (val === 'ln') {
        let num = parseFloat(this.calcInput);
        this.calcSubDisplay = `ln(${num})`;
        this.calcInput = String(parseFloat(Math.log(num).toFixed(8)));
      } else if (val === 'sqrt') {
        let num = parseFloat(this.calcInput);
        this.calcSubDisplay = `√(${num})`;
        this.calcInput = String(parseFloat(Math.sqrt(num).toFixed(8)));
      } else if (val === 'pow2') {
        let num = parseFloat(this.calcInput);
        this.calcSubDisplay = `(${num})²`;
        this.calcInput = String(parseFloat(Math.pow(num, 2).toFixed(8)));
      } else if (val === 'fact') {
        let num = parseInt(this.calcInput);
        let fact = 1;
        for (let i = 1; i <= Math.min(num, 170); i++) fact *= i;
        this.calcSubDisplay = `${num}!`;
        this.calcInput = String(fact);
      } else if (val === 'pi') {
        this.calcInput = String(parseFloat(Math.PI.toFixed(8)));
      } else if (val === 'e') {
        this.calcInput = String(parseFloat(Math.E.toFixed(8)));
      } else if (val === 'mod') {
        this.calcInput += '%';
      } else if (val === '=') {
        this.calcSubDisplay = this.calcInput + ' =';
        const cleanExp = this.calcInput.replace(/%/g, '%');
        // Evaluate expression using Function
        const res = Function(`"use strict"; return (${cleanExp})`)();
        this.calcInput = String(parseFloat(Number(res).toFixed(6)));
      } else {
        if (this.calcInput === '0') {
          this.calcInput = val;
        } else {
          this.calcInput += val;
        }
      }
    } catch (err) {
      this.calcInput = 'Error';
    }

    if (display) display.textContent = this.calcInput;
    if (subDisplay) subDisplay.textContent = this.calcSubDisplay || '';
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
