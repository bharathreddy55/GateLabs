import { db, SUBJECT_SYLLABUS } from '../config/firebase';
import { showToast } from '../utils/toast';
import { Chart } from 'chart.js/auto';
import { generateContent } from '../utils/aiService';
import { CBT_BENCHMARK_MOCK04, getBenchmarkQuestions } from '../utils/cbtBenchmarkData';

export const MockTest = {
  // Navigation & View Mode
  // Views: 'config' | 'console' | 'paper' | 'diagnostic' | 'instructions'
  activeView: 'config',
  activeSection: 'Computer Science & IT (CS)', // 'General Aptitude (GA)' or 'Computer Science & IT (CS)'
  
  // Benchmark / Custom exam state
  isTesting: false,
  questions: [],
  currentIdx: 23, // Default to Question 24 (index 23) matching Image 1
  answers: {}, // qid -> user response (index, array, or string)
  status: {}, // qid -> 'not-visited', 'not-answered', 'answered', 'marked', 'marked-answered'
  sections: {},
  timer: null,
  timeLeft: 9918, // 02:45:18 in seconds matching screenshots
  totalTime: 10800, // 3 hours

  // UI Panels state
  isCalcOpen: false,
  isTutorOpen: false,
  isPaletteOpen: true,
  tutorStepUnlocked: 2, // 1, 2, or 3
  tutorChatHistory: [],
  
  // Filter state for Full Question Paper view
  paperFilterSection: 'all', // 'all' | 'ga' | 'cs'
  paperFilterState: 'all', // 'all' | 'answered' | 'review' | 'unattempted'

  // Diagnostic filter state
  diagnosticFilter: 'all', // 'all' | 'conceptual' | 'calculation' | 'misread'
  diagnosticData: CBT_BENCHMARK_MOCK04.diagnosticStats,

  // Calculator state
  calcMode: 'deg', // 'deg' or 'rad'
  calcMemory: 0,
  calcDisplayValue: '0',
  calcExpression: '',

  async render() {
    if (!this.isTesting && this.activeView === 'config') {
      return this.renderConfigScreen();
    }

    // Fullscreen CBT Engine shell matching the 4 images exactly
    return `
      <div id="cbt-engine-root" class="min-h-screen w-full bg-[#060b17] text-slate-100 font-sans flex flex-row overflow-hidden select-none">
        
        <!-- ============================================== -->
        <!-- 1. LEFT SIDEBAR (Identical across all 4 screens) -->
        <!-- ============================================== -->
        <aside class="w-[230px] flex-shrink-0 bg-[#070d1a] border-r border-[#15203b] flex flex-col justify-between p-3.5 z-30">
          <div class="flex flex-col gap-4">
            
            <!-- Engine Logo -->
            <div class="flex items-center gap-2.5 px-1 py-1">
              <div class="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm shadow-sm shadow-cyan-500/20">
                &gt;_
              </div>
              <div class="flex flex-col">
                <span class="font-display font-extrabold text-sm tracking-wide text-white leading-tight">GATE CBT</span>
                <span class="text-[9px] font-mono tracking-wider font-extrabold text-cyan-400 leading-tight">CS/IT ENGINE</span>
              </div>
            </div>

            <!-- Secure Exam Mode Pill -->
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#06241b] border border-[#0d5940] text-emerald-400 text-[10px] font-mono font-bold tracking-wider uppercase">
              <i class="fa-solid fa-lock text-xs"></i>
              <span>SECURE EXAM MODE</span>
            </div>

            <!-- Navigation Links -->
            <nav class="flex flex-col gap-1.5 text-xs font-semibold mt-1">
              <button class="cbt-nav-btn flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                this.activeView === 'console'
                  ? 'bg-[#0c1a36] text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }" data-view="console">
                <i class="fa-solid fa-desktop w-4 text-center"></i>
                <span>Exam Console</span>
              </button>

              <button class="cbt-nav-btn flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                this.activeView === 'paper'
                  ? 'bg-[#0c1a36] text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }" data-view="paper">
                <i class="fa-regular fa-file-lines w-4 text-center"></i>
                <span>Full Question Paper</span>
              </button>

              <button class="cbt-nav-btn flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                this.activeView === 'instructions'
                  ? 'bg-[#0c1a36] text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }" data-view="instructions">
                <i class="fa-solid fa-circle-info w-4 text-center"></i>
                <span>Instructions &amp; Marking</span>
              </button>

              <button class="cbt-nav-btn flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                this.activeView === 'diagnostic'
                  ? 'bg-[#0c1a36] text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }" data-view="diagnostic">
                <i class="fa-solid fa-chart-line w-4 text-center"></i>
                <span>Analytics &amp; AI Diagnostic</span>
              </button>
            </nav>
          </div>

          <!-- Candidate Node Footer Card -->
          <div class="bg-[#0b1326] border border-[#172646] rounded-xl p-3 flex flex-col gap-1 shadow-inner">
            <div class="flex items-center justify-between text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              <span>CANDIDATE NODE</span>
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <span class="text-xs font-bold text-white">${CBT_BENCHMARK_MOCK04.candidate.name}</span>
            <span class="font-mono text-[11px] font-extrabold text-cyan-400">${CBT_BENCHMARK_MOCK04.candidate.rollNo}</span>
            <span class="text-[10px] text-slate-400">${CBT_BENCHMARK_MOCK04.candidate.nodeZone}</span>
          </div>
        </aside>

        <!-- ============================================== -->
        <!-- 2. RIGHT WORKSPACE CONTAINER -->
        <!-- ============================================== -->
        <main class="flex-1 flex flex-col min-h-screen overflow-hidden bg-[#060b17] relative">
          
          <!-- Top Header Bar -->
          <header class="bg-[#080e1e] border-b border-[#15203b] px-6 py-2.5 flex items-center justify-between z-20 flex-shrink-0">
            <!-- Left Info -->
            <div class="flex items-center gap-3">
              <span class="font-display font-extrabold text-sm text-white tracking-wide">GATE CS/IT 2025</span>
              <span class="bg-[#0b1836] border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">MOCK-04</span>
            </div>

            <!-- Center: Section Switcher Tabs -->
            <div class="flex items-center gap-2">
              <button class="cbt-section-tab px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                this.activeSection === 'General Aptitude (GA)'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'bg-[#0e1a38] text-slate-400 border border-[#1e345e] hover:text-slate-200'
              }" data-sec="General Aptitude (GA)">
                General Aptitude (GA)
              </button>

              <button class="cbt-section-tab px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                this.activeSection === 'Computer Science & IT (CS)'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'bg-[#0e1a38] text-slate-400 border border-[#1e345e] hover:text-slate-200'
              }" data-sec="Computer Science & IT (CS)">
                Computer Science &amp; IT (CS)
              </button>
            </div>

            <!-- Right: Timer & Tools -->
            <div class="flex items-center gap-4">
              <!-- Digital Clock Timer -->
              <div class="flex items-center gap-2 font-mono">
                <i class="fa-regular fa-clock text-cyan-400 text-sm"></i>
                <div class="flex flex-col">
                  <span class="text-[8px] font-bold tracking-wider text-slate-400 uppercase leading-none">TIME LEFT</span>
                  <span id="cbt-timer-display" class="text-base font-extrabold text-cyan-400 tracking-wider leading-tight">
                    ${this.formatTimer(this.timeLeft)}
                  </span>
                </div>
              </div>

              <!-- Action Icons -->
              <div class="flex items-center gap-2 border-l border-[#1a2b4a] pl-3 text-slate-400">
                <button id="btn-toggle-palette" class="p-1.5 rounded-lg hover:text-cyan-400 hover:bg-white/5 transition-colors" title="Toggle Question Palette">
                  <i class="fa-solid fa-table-cells-large text-sm"></i>
                </button>
                <button id="btn-header-paper" class="p-1.5 rounded-lg hover:text-cyan-400 hover:bg-white/5 transition-colors" title="View Full Question Paper">
                  <i class="fa-regular fa-file-lines text-sm"></i>
                </button>
                <button id="btn-header-instructions" class="p-1.5 rounded-lg hover:text-cyan-400 hover:bg-white/5 transition-colors" title="Instructions & Marking">
                  <i class="fa-solid fa-circle-question text-sm"></i>
                </button>
                <button id="btn-header-tutor" class="p-1.5 rounded-lg ${this.isTutorOpen ? 'text-purple-400' : 'hover:text-purple-400'} hover:bg-white/5 transition-colors" title="Toggle Gemini Concept Tutor">
                  <i class="fa-solid fa-brain text-sm"></i>
                </button>
              </div>

              <!-- Candidate Profile Avatar -->
              <div class="flex items-center gap-2.5 border-l border-[#1a2b4a] pl-3">
                <div class="text-right hidden sm:block">
                  <span class="block text-xs font-bold text-white leading-tight">${CBT_BENCHMARK_MOCK04.candidate.name}</span>
                  <span class="block text-[9px] text-slate-400 leading-tight">Candidate</span>
                </div>
                <div class="h-8 w-8 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 flex items-center justify-center font-bold text-xs">
                  <i class="fa-solid fa-user"></i>
                </div>
              </div>
            </div>
          </header>

          <!-- Main View Switcher Body -->
          <div class="flex-1 overflow-y-auto cbt-scrollbar p-6">
            ${this.renderActiveViewContent()}
          </div>
        </main>

      </div>
    `;
  },

  // ─────────────────────────────────────────────────────────────
  // ACTIVE VIEW RENDERER
  // ─────────────────────────────────────────────────────────────
  renderActiveViewContent() {
    if (this.activeView === 'console') {
      return this.renderExamConsole();
    } else if (this.activeView === 'paper') {
      return this.renderFullQuestionPaper();
    } else if (this.activeView === 'diagnostic') {
      return this.renderDiagnosticTerminal();
    } else if (this.activeView === 'instructions') {
      return this.renderInstructions();
    }
    return `<div class="p-10 text-center text-slate-400">Loading view...</div>`;
  },

  // ─────────────────────────────────────────────────────────────
  // VIEW 1 & 2: EXAM CONSOLE (Matching Images 1 & 2)
  // ─────────────────────────────────────────────────────────────
  renderExamConsole() {
    const q = this.questions[this.currentIdx] || getBenchmarkQuestions()[23];
    const isQ24 = q.number === 24;
    const isQ42 = q.number === 42;
    const qType = q.type || 'NAT';
    const userAns = this.answers[q.id];

    return `
      <div class="flex flex-col gap-5 max-w-[1700px] mx-auto pb-6 relative">
        
        <!-- Question Meta Top Bar -->
        <div class="flex items-center justify-between gap-4 flex-wrap pb-1">
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="bg-cyan-500 text-slate-950 font-extrabold px-3 py-1 text-xs rounded tracking-wider uppercase">
              QUESTION ${q.number || (this.currentIdx + 1)}
            </span>
            <span class="bg-[#0b1836] border border-cyan-500/40 text-cyan-400 text-[11px] font-mono font-bold px-2.5 py-1 rounded">
              ${qType} (${qType === 'NAT' ? 'NUMERICAL ANSWER' : qType === 'MSQ' ? 'MULTIPLE SELECT' : 'MULTIPLE CHOICE'})
            </span>
            <span class="text-xs font-semibold text-slate-400">
              ${q.subject || 'CS Core: Operating Systems'}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-[11px] font-mono text-slate-300">
              MARKING: <span class="text-emerald-400 font-bold">+${q.marks}.00</span> / <span class="text-rose-400 font-bold">-${q.negativeMarks || '0.00'}</span> (${qType === 'NAT' ? 'No Negative for NAT' : qType === 'MSQ' ? 'No Negative for MSQ' : '1/3rd Negative'})
            </span>
            <button id="btn-toggle-calculator" class="bg-[#0c1833] border border-cyan-900/60 hover:border-cyan-500 text-cyan-400 text-xs px-3 py-1 rounded-lg font-mono flex items-center gap-1.5 transition-all active:scale-95 shadow-sm">
              <i class="fa-solid fa-calculator text-[11px]"></i> Virtual Calc (Esc)
            </button>
            <button id="btn-report-error" class="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1">
              <i class="fa-regular fa-flag text-[10px]"></i> Report Error
            </button>
          </div>
        </div>

        <!-- Main Workspace Grid: Question Area (Center) vs Right Panels (Calculator / Palette / Concept Tutor) -->
        <div class="grid grid-cols-1 ${this.isTutorOpen ? 'lg:grid-cols-12' : 'lg:grid-cols-12'} gap-6 items-start">
          
          <!-- LEFT/CENTER COLUMN: Question Card & Input (Span 8 or 7) -->
          <div class="${this.isTutorOpen ? 'lg:col-span-7' : (this.isPaletteOpen ? 'lg:col-span-8' : 'lg:col-span-12')} flex flex-col gap-5">
            
            <!-- Problem Statement Card -->
            <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-6 flex flex-col gap-5 shadow-xl relative">
              <div class="flex items-center justify-between border-b border-[#142038] pb-3">
                <span class="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  PROBLEM STATEMENT
                </span>
                <span class="text-emerald-400 font-mono text-[11px] font-semibold flex items-center gap-1">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> ${q.subtopic || q.topic || 'Multi-Level Memory Hierarchy'}
                </span>
              </div>

              <!-- Question Text -->
              <p class="text-xs font-semibold text-slate-200 leading-relaxed whitespace-pre-line">
                ${q.question}
              </p>

              <!-- Optional Technical Metrics Cards (Q24 Demand Paging Params) -->
              ${isQ24 ? `
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-1">
                  <div class="bg-[#0c162e] border border-[#1a2c4e] rounded-xl p-3">
                    <span class="text-[9px] font-mono text-slate-400 block uppercase">TLB Search Time (t<sub>TLB</sub>)</span>
                    <span class="font-mono text-cyan-400 font-extrabold text-sm block mt-0.5">12 ns</span>
                    <span class="text-[9px] text-slate-400 block mt-0.5">Hit Ratio (&alpha;) = 94%</span>
                  </div>
                  <div class="bg-[#0c162e] border border-[#1a2c4e] rounded-xl p-3">
                    <span class="text-[9px] font-mono text-slate-400 block uppercase">Main Memory Access (t<sub>M</sub>)</span>
                    <span class="font-mono text-cyan-400 font-extrabold text-sm block mt-0.5">85 ns</span>
                    <span class="text-[9px] text-slate-400 block mt-0.5">Per Memory Reference cycle</span>
                  </div>
                  <div class="bg-[#0c162e] border border-[#1a2c4e] rounded-xl p-3">
                    <span class="text-[9px] font-mono text-slate-400 block uppercase">Page Fault Rate (p)</span>
                    <span class="font-mono text-emerald-400 font-extrabold text-sm block mt-0.5">0.002%</span>
                    <span class="text-[9px] text-slate-400 block mt-0.5">1 per 50,000 instructions</span>
                  </div>
                </div>
              ` : ''}

              <!-- Interactive SVG Diagram for Memory Hierarchy Traversal Pipeline (Q24) -->
              ${isQ24 ? `
                <div class="bg-[#080e1c] border border-[#15233e] rounded-xl p-4 flex flex-col gap-2">
                  <div class="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 uppercase">
                    <span class="flex items-center gap-1.5 text-cyan-400">
                      <i class="fa-solid fa-microchip"></i> MEMORY HIERARCHY TRAVERSAL PIPELINE
                    </span>
                    <span>Paging Architecture: 2-Tier Hierarchical</span>
                  </div>
                  
                  <div class="w-full overflow-x-auto py-2">
                    <svg viewBox="0 0 680 120" class="w-full max-w-2xl mx-auto h-auto">
                      <!-- CPU VA Node -->
                      <rect x="10" y="35" width="85" height="42" rx="6" fill="#0d1b38" stroke="#00f2fe" stroke-width="1.5" />
                      <text x="52" y="55" fill="#00f2fe" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">CPU VA</text>
                      <text x="52" y="68" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">Logical Addr</text>

                      <!-- Arrow CPU to TLB -->
                      <line x1="95" y1="56" x2="140" y2="56" stroke="#00f2fe" stroke-width="1.5" stroke-dasharray="3,3" />

                      <!-- TLB Lookup Node -->
                      <rect x="140" y="30" width="110" height="52" rx="6" fill="#0f1f42" stroke="#38bdf8" stroke-width="1.5" />
                      <text x="195" y="50" fill="#ffffff" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">TLB Lookup</text>
                      <text x="195" y="63" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">12 ns | Hit 94%</text>
                      <text x="195" y="74" fill="#64748b" font-size="7" font-family="monospace" text-anchor="middle">Associative</text>

                      <!-- Hit Path to Frame Data -->
                      <path d="M 250 45 L 350 20 L 410 20" fill="none" stroke="#10b981" stroke-width="1.5" />
                      <text x="300" y="27" fill="#10b981" font-size="8" font-family="monospace">Hit &alpha; (94%)</text>
                      <rect x="410" y="10" width="120" height="25" rx="5" fill="#07271e" stroke="#10b981" stroke-width="1.2" />
                      <text x="470" y="26" fill="#10b981" font-size="9" font-family="monospace" font-weight="bold" text-anchor="middle">Frame Data (85ns)</text>

                      <!-- Miss Path to 2-Level Page Table -->
                      <path d="M 250 65 L 300 75 L 340 75" fill="none" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="2,2" />
                      <text x="290" y="68" fill="#f43f5e" font-size="8" font-family="monospace">Miss (6%)</text>

                      <!-- Two-Level PT Node -->
                      <rect x="340" y="55" width="115" height="42" rx="6" fill="#1a1c32" stroke="#8b5cf6" stroke-width="1.2" />
                      <text x="397" y="73" fill="#ffffff" font-size="9" font-family="monospace" font-weight="bold" text-anchor="middle">Two-Level PT</text>
                      <text x="397" y="86" fill="#a78bfa" font-size="8" font-family="monospace" text-anchor="middle">2 &times; t_M = 170ns</text>

                      <!-- Path to Page Check -->
                      <line x1="455" y1="76" x2="495" y2="76" stroke="#8b5cf6" stroke-width="1.5" />

                      <!-- Page Fault Check Node -->
                      <rect x="495" y="60" width="90" height="34" rx="5" fill="#162038" stroke="#64748b" stroke-width="1" />
                      <text x="540" y="75" fill="#cbd5e1" font-size="8" font-family="monospace" text-anchor="middle">Page Check</text>
                      <text x="540" y="86" fill="#38bdf8" font-size="7" font-family="monospace" text-anchor="middle">p = 0.00002</text>

                      <!-- Disk Penalty Indicator -->
                      <path d="M 585 77 L 620 77 L 620 95" fill="none" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3,3" />
                      <rect x="605" y="95" width="30" height="18" rx="3" fill="#3f0f1c" stroke="#f43f5e" stroke-width="1" />
                      <text x="620" y="108" fill="#f43f5e" font-size="8" font-family="monospace" text-anchor="middle">Disk</text>
                    </svg>
                  </div>
                </div>
              ` : ''}

              <!-- Interactive SVG Diagram for Network Topology (Q42 Distance Vector Routing) -->
              ${isQ42 ? `
                <div class="bg-[#080e1c] border border-[#15233e] rounded-xl p-4 flex flex-col gap-3">
                  <div class="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 uppercase">
                    <span class="flex items-center gap-1.5 text-cyan-400">
                      <i class="fa-solid fa-network-wired"></i> SYNCHRONOUS LINEAR TOPOLOGY MATRIX
                    </span>
                    <span class="text-rose-400 font-mono flex items-center gap-1">
                      <span class="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span> Link (X &minus; A) Severed @ t=0
                    </span>
                  </div>

                  <!-- Topology Nodes SVG -->
                  <div class="w-full overflow-x-auto py-2">
                    <svg viewBox="0 0 600 90" class="w-full max-w-xl mx-auto h-auto">
                      <!-- Node X -->
                      <circle cx="50" cy="45" r="18" fill="#101a30" stroke="#64748b" stroke-width="1.5" />
                      <text x="50" y="49" fill="#e2e8f0" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">X</text>
                      <text x="50" y="75" fill="#64748b" font-size="8" font-family="monospace" text-anchor="middle">Target Dest</text>

                      <!-- Severed Link X-A -->
                      <line x1="68" y1="45" x2="162" y2="45" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,4" />
                      <circle cx="115" cy="45" r="9" fill="#3b0d18" stroke="#f43f5e" stroke-width="1.2" />
                      <text x="115" y="48.5" fill="#f43f5e" font-size="9" font-family="monospace" font-weight="bold" text-anchor="middle">&times;</text>
                      <text x="115" y="30" fill="#f43f5e" font-size="7" font-family="monospace" text-anchor="middle">FAILED LINK</text>

                      <!-- Node A -->
                      <circle cx="180" cy="45" r="18" fill="#0d2448" stroke="#00f2fe" stroke-width="1.8" />
                      <text x="180" y="49" fill="#00f2fe" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">A</text>
                      <text x="180" y="75" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">Router A</text>

                      <!-- Link A-B -->
                      <line x1="198" y1="45" x2="312" y2="45" stroke="#00f2fe" stroke-width="1.8" />
                      <rect x="240" y="37" width="30" height="16" rx="4" fill="#0c1833" stroke="#00f2fe" stroke-width="1" />
                      <text x="255" y="48.5" fill="#00f2fe" font-size="8" font-family="monospace" text-anchor="middle">c = 1</text>

                      <!-- Node B -->
                      <circle cx="330" cy="45" r="18" fill="#142042" stroke="#38bdf8" stroke-width="1.5" />
                      <text x="330" y="49" fill="#ffffff" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">B</text>
                      <text x="330" y="75" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">Router B</text>

                      <!-- Link B-C -->
                      <line x1="348" y1="45" x2="462" y2="45" stroke="#38bdf8" stroke-width="1.5" />
                      <rect x="390" y="37" width="30" height="16" rx="4" fill="#0c1833" stroke="#38bdf8" stroke-width="1" />
                      <text x="405" y="48.5" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">c = 1</text>

                      <!-- Node C -->
                      <circle cx="480" cy="45" r="18" fill="#1f1842" stroke="#a855f7" stroke-width="1.8" />
                      <text x="480" y="49" fill="#c084fc" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">C</text>
                      <text x="480" y="75" fill="#c084fc" font-size="8" font-family="monospace" text-anchor="middle">Query Probe</text>
                    </svg>
                  </div>

                  <!-- Distance Matrix Table -->
                  <div class="grid grid-cols-4 gap-2 text-center text-[10px] font-mono mt-1">
                    <div class="bg-[#0b162f] border border-[#172b52] rounded-lg p-2">
                      <span class="text-slate-400 block text-[8px] uppercase">Stable State Dist(A,X)</span>
                      <span class="text-cyan-400 font-extrabold text-xs">1 (Direct)</span>
                    </div>
                    <div class="bg-[#0b162f] border border-[#172b52] rounded-lg p-2">
                      <span class="text-slate-400 block text-[8px] uppercase">Stable State Dist(B,X)</span>
                      <span class="text-cyan-400 font-extrabold text-xs">2 (via A)</span>
                    </div>
                    <div class="bg-[#0b162f] border border-[#172b52] rounded-lg p-2">
                      <span class="text-slate-400 block text-[8px] uppercase">Stable State Dist(C,X)</span>
                      <span class="text-cyan-400 font-extrabold text-xs">3 (via B)</span>
                    </div>
                    <div class="bg-[#0b162f] border border-[#172b52] rounded-lg p-2">
                      <span class="text-slate-400 block text-[8px] uppercase">Max Infinity Metric</span>
                      <span class="text-rose-400 font-extrabold text-xs">16 hops</span>
                    </div>
                  </div>
                </div>
              ` : ''}

            </div>

            <!-- Response Input Panel -->
            <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-5 shadow-xl flex flex-col gap-4">
              <div class="flex items-center justify-between border-b border-[#142038] pb-3">
                <span class="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
                  <i class="fa-solid fa-keyboard text-cyan-400"></i> ${qType === 'NAT' ? 'NUMERICAL RESPONSE INPUT' : 'CANDIDATE RESPONSE SELECTION'}
                </span>
                <span class="text-[10px] font-mono font-bold text-slate-400">
                  ${qType === 'NAT' ? 'Range accepted: Exact Integer or Float' : `${q.marks} Mark${q.marks > 1 ? 's' : ''}`}
                </span>
              </div>

              ${qType === 'NAT' ? `
                <!-- NAT Keypad + Input -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div class="md:col-span-7 flex flex-col gap-2">
                    <div class="relative">
                      <input type="text" id="cbt-nat-input" readonly value="${userAns !== undefined ? userAns : (q.candidateValue || '')}" placeholder="Enter numerical value" class="w-full bg-[#080d1a] border border-cyan-500/40 rounded-xl px-4 py-3 text-lg font-mono font-extrabold text-cyan-400 shadow-inner focus:outline-none focus:border-cyan-400 pr-12">
                      <span class="absolute right-4 top-3.5 text-xs font-mono font-bold text-slate-500">
                        ${isQ24 ? 'ns' : (isQ42 ? 'cycles' : 'val')}
                      </span>
                    </div>
                    <span class="text-[10px] text-slate-400 font-sans">
                      Use the virtual on-screen keypad to avoid peripheral keystroke errors.
                    </span>
                  </div>

                  <!-- 4x4 Cyber Virtual Numpad -->
                  <div class="md:col-span-5 grid grid-cols-4 gap-1.5 font-mono text-xs max-w-xs mx-auto md:mx-0">
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-white border border-[#1a2c4e] font-extrabold" data-val="7">7</button>
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-white border border-[#1a2c4e] font-extrabold" data-val="8">8</button>
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-white border border-[#1a2c4e] font-extrabold" data-val="9">9</button>
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#2a1320] hover:bg-rose-900/40 text-rose-400 border border-rose-900/50 font-extrabold" data-val="back"><i class="fa-solid fa-delete-left"></i></button>

                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-white border border-[#1a2c4e] font-extrabold" data-val="4">4</button>
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-white border border-[#1a2c4e] font-extrabold" data-val="5">5</button>
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-white border border-[#1a2c4e] font-extrabold" data-val="6">6</button>
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#2a1320] hover:bg-rose-900/40 text-rose-400 border border-rose-900/50 font-extrabold" data-val="clear">CLR</button>

                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-white border border-[#1a2c4e] font-extrabold" data-val="1">1</button>
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-white border border-[#1a2c4e] font-extrabold" data-val="2">2</button>
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-white border border-[#1a2c4e] font-extrabold" data-val="3">3</button>
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-cyan-400 border border-[#1a2c4e] font-extrabold" data-val="neg">&plusmn;</button>

                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-white border border-[#1a2c4e] font-extrabold col-span-2" data-val="0">0</button>
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#0e1830] hover:bg-[#16264d] text-white border border-[#1a2c4e] font-extrabold" data-val=".">.</button>
                    <button class="cbt-keypad-btn p-2.5 rounded-lg bg-[#063b2c] hover:bg-emerald-900/50 text-emerald-400 border border-emerald-500/40 font-extrabold" data-val="ok"><i class="fa-solid fa-check"></i></button>
                  </div>
                </div>
              ` : qType === 'MSQ' ? `
                <!-- MSQ Checkbox Options -->
                <div class="flex flex-col gap-2.5">
                  ${(q.options || []).map((opt, oIdx) => {
                    const selArr = Array.isArray(userAns) ? userAns : (q.candidateSelections || []);
                    const isChecked = selArr.includes(oIdx);
                    return `
                      <label class="flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#0f1f3d] border-cyan-500 text-white shadow-sm shadow-cyan-500/10'
                          : 'bg-[#0b1426] border-[#182848] text-slate-300 hover:border-slate-600'
                      }">
                        <input type="checkbox" name="cbt-option-msq" value="${oIdx}" ${isChecked ? 'checked' : ''} class="mt-1 text-cyan-500 rounded bg-[#080d1a] border-slate-700">
                        <div class="flex flex-col">
                          <span class="text-xs font-semibold leading-relaxed">${String.fromCharCode(65 + oIdx)}. ${opt}</span>
                          ${isChecked ? '<span class="text-[9px] font-mono text-cyan-400 mt-1 font-bold">Candidate Choice [Registered]</span>' : ''}
                        </div>
                      </label>
                    `;
                  }).join('')}
                </div>
              ` : `
                <!-- MCQ Radio Options -->
                <div class="flex flex-col gap-2.5">
                  ${(q.options || []).map((opt, oIdx) => {
                    const isChecked = userAns !== undefined ? userAns === oIdx : (q.candidateSelection === oIdx);
                    return `
                      <label class="flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#0f1f3d] border-cyan-500 text-white shadow-sm shadow-cyan-500/10'
                          : 'bg-[#0b1426] border-[#182848] text-slate-300 hover:border-slate-600'
                      }">
                        <input type="radio" name="cbt-option-mcq" value="${oIdx}" ${isChecked ? 'checked' : ''} class="mt-1 text-cyan-500 bg-[#080d1a] border-slate-700">
                        <div class="flex flex-col">
                          <span class="text-xs font-semibold leading-relaxed">${String.fromCharCode(65 + oIdx)}. ${opt}</span>
                          ${isChecked ? '<span class="text-[9px] font-mono text-cyan-400 mt-1 font-bold">Candidate Choice [Registered]</span>' : ''}
                        </div>
                      </label>
                    `;
                  }).join('')}
                </div>
              `}
            </div>

            <!-- Bottom Navigation Bar (Previous, Next, Clear, Mark for Review, Save & Next, Submit) -->
            <div class="flex items-center justify-between gap-3 flex-wrap pt-2 border-t border-[#142038]">
              <div class="flex items-center gap-2">
                <button id="btn-cbt-prev" class="px-4 py-2 rounded-xl bg-[#0b1426] hover:bg-[#121f3a] border border-[#192b4c] text-xs font-bold text-slate-300 transition-all active:scale-95 flex items-center gap-1.5">
                  <i class="fa-solid fa-chevron-left text-[10px]"></i> Previous
                </button>
                <button id="btn-cbt-next" class="px-4 py-2 rounded-xl bg-[#0b1426] hover:bg-[#121f3a] border border-[#192b4c] text-xs font-bold text-slate-300 transition-all active:scale-95 flex items-center gap-1.5">
                  Next <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
                <button id="btn-cbt-clear" class="px-3.5 py-2 rounded-xl border border-slate-700 hover:bg-white/5 text-xs font-bold text-slate-400 hover:text-slate-200 transition-all">
                  Clear Response
                </button>
              </div>

              <div class="flex items-center gap-2">
                <button id="btn-cbt-mark-review" class="px-4 py-2 rounded-xl bg-[#281845] hover:bg-[#341e5c] border border-purple-500/40 text-purple-300 text-xs font-bold transition-all active:scale-95">
                  Mark for Review &amp; Next
                </button>
                <button id="btn-cbt-save-mark" class="px-4 py-2 rounded-xl bg-[#1b1938] hover:bg-[#25224e] border border-indigo-500/40 text-indigo-300 text-xs font-bold transition-all active:scale-95">
                  Save &amp; Mark for Review
                </button>
                <button id="btn-cbt-save-next" class="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-500/20 transition-all active:scale-95 flex items-center gap-1.5">
                  Save &amp; Next <i class="fa-solid fa-arrow-right text-[11px]"></i>
                </button>
                <button id="btn-cbt-submit-exam" class="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-md shadow-rose-600/20 transition-all active:scale-95">
                  SUBMIT PAPER
                </button>
              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN: Calculator, Palette, or Gemini Concept Tutor (Span 4 or 5) -->
          <div class="${this.isTutorOpen ? 'lg:col-span-5' : (this.isPaletteOpen ? 'lg:col-span-4' : 'hidden')} flex flex-col gap-5">
            
            <!-- 1. GATE Virtual Calculator Floating / Docked Card (Image 1) -->
            ${this.isCalcOpen ? `
              <div id="cbt-calculator-card" class="bg-[#0b1426] border border-[#1b2b4c] rounded-2xl p-4 shadow-2xl flex flex-col gap-3 relative">
                <div class="flex items-center justify-between border-b border-[#162544] pb-2">
                  <div class="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                    <i class="fa-solid fa-calculator"></i>
                    <span>GATE VIRTUAL CALCULATOR</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-[9px] font-mono text-slate-400">DEG | M: ${this.calcMemory}</span>
                    <button id="btn-close-calc" class="text-slate-400 hover:text-white text-xs">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>

                <!-- Calculator Screen -->
                <div class="bg-[#070c18] border border-[#162544] rounded-xl p-3 text-right">
                  <span class="block text-[10px] font-mono text-slate-500 truncate h-3.5">${this.calcExpression}</span>
                  <span id="calc-display-val" class="block font-mono text-2xl font-extrabold text-cyan-400 truncate mt-1">
                    ${this.calcDisplayValue}
                  </span>
                </div>

                <!-- Scientific Keypad Rows Matching Image 1 -->
                <div class="grid grid-cols-5 gap-1.5 font-mono text-xs">
                  <!-- Row 1 -->
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-amber-400 font-bold" data-calc="mode">DEG</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-slate-300 font-bold" data-calc="mc">MC</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-slate-300 font-bold" data-calc="mr">MR</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-slate-300 font-bold" data-calc="m+">M+</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-slate-300 font-bold" data-calc="m-">M-</button>

                  <!-- Row 2 -->
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="sin">sin</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="cos">cos</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="tan">tan</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="ln">ln</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="log">log</button>

                  <!-- Row 3 -->
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-slate-300" data-calc="(">(</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-slate-300" data-calc=")">)</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="sqrt">&radic;</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="sq">x&sup2;</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="/">&divide;</button>

                  <!-- Row 4 -->
                  <button class="calc-key p-2 rounded-lg bg-[#152340] hover:bg-[#1e345e] text-white font-bold" data-calc="7">7</button>
                  <button class="calc-key p-2 rounded-lg bg-[#152340] hover:bg-[#1e345e] text-white font-bold" data-calc="8">8</button>
                  <button class="calc-key p-2 rounded-lg bg-[#152340] hover:bg-[#1e345e] text-white font-bold" data-calc="9">9</button>
                  <button class="calc-key p-2 rounded-lg bg-[#2a1320] hover:bg-rose-900/40 text-rose-400 font-bold" data-calc="back">&larr;</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="*">&times;</button>

                  <!-- Row 5 -->
                  <button class="calc-key p-2 rounded-lg bg-[#152340] hover:bg-[#1e345e] text-white font-bold" data-calc="4">4</button>
                  <button class="calc-key p-2 rounded-lg bg-[#152340] hover:bg-[#1e345e] text-white font-bold" data-calc="5">5</button>
                  <button class="calc-key p-2 rounded-lg bg-[#152340] hover:bg-[#1e345e] text-white font-bold" data-calc="6">6</button>
                  <button class="calc-key p-2 rounded-lg bg-[#2a1320] hover:bg-rose-900/40 text-rose-400 font-bold" data-calc="c">C</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="-">&minus;</button>

                  <!-- Row 6 -->
                  <button class="calc-key p-2 rounded-lg bg-[#152340] hover:bg-[#1e345e] text-white font-bold" data-calc="1">1</button>
                  <button class="calc-key p-2 rounded-lg bg-[#152340] hover:bg-[#1e345e] text-white font-bold" data-calc="2">2</button>
                  <button class="calc-key p-2 rounded-lg bg-[#152340] hover:bg-[#1e345e] text-white font-bold" data-calc="3">3</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="inv">1/x</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="+">+</button>

                  <!-- Row 7 -->
                  <button class="calc-key p-2 rounded-lg bg-[#152340] hover:bg-[#1e345e] text-white font-bold col-span-2" data-calc="0">0</button>
                  <button class="calc-key p-2 rounded-lg bg-[#152340] hover:bg-[#1e345e] text-white font-bold" data-calc=".">.</button>
                  <button class="calc-key p-2 rounded-lg bg-[#111c33] hover:bg-[#1a2d52] text-cyan-300" data-calc="pm">&plusmn;</button>
                  <button class="calc-key p-2 rounded-lg bg-[#00f2fe] hover:bg-cyan-300 text-slate-950 font-extrabold" data-calc="=">=</button>
                </div>

                <!-- Direct Clipboard Transfer Button -->
                <button id="btn-transfer-calc-nat" class="w-full py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all">
                  <i class="fa-regular fa-clipboard"></i> Direct Clipboard: <span class="underline">Transfer to NAT Box</span>
                </button>
              </div>
            ` : ''}

            <!-- 2. GEMINI CONCEPT TUTOR SIDE PANEL (Image 2) -->
            ${this.isTutorOpen ? `
              <div id="gemini-concept-tutor-panel" class="bg-[#0b1328] border border-[#1b2b4c] rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
                <!-- Header -->
                <div class="flex items-center justify-between border-b border-[#182848] pb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="h-7 w-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                      <i class="fa-solid fa-sparkles"></i>
                    </div>
                    <div>
                      <h4 class="font-display font-extrabold text-sm text-white leading-tight">Gemini Concept Tutor</h4>
                      <p class="text-[9px] text-purple-300 font-mono">1.5 Pro &bull; Pedagogical Socratic Mode</p>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Non-Spoiler Active
                  </span>
                </div>

                <p class="text-[10px] text-slate-400 leading-relaxed font-sans">
                  Guiding you via algorithmic invariants without revealing the final integer solution.
                </p>

                <!-- Socratic Guidance Ladder -->
                <div class="flex flex-col gap-2.5">
                  <div class="flex items-center justify-between text-[10px] font-mono font-bold">
                    <span class="text-slate-400 uppercase">SOCRATIC GUIDANCE LADDER</span>
                    <span class="text-cyan-400">Step 2 of 3 Active</span>
                  </div>
                  <div class="h-1 bg-[#15233e] rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-purple-500 to-cyan-400 w-2/3"></div>
                  </div>

                  <!-- Step 1: Accordion (Collapsed) -->
                  <div class="bg-[#0e1935] border border-[#18294e] rounded-xl p-3 flex items-center justify-between cursor-pointer">
                    <span class="text-[11px] font-bold text-slate-300 flex items-center gap-2">
                      <span class="h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] flex items-center justify-center font-bold">1</span>
                      The Core Invariant: Two-Node Mutual Routing Loop
                    </span>
                    <i class="fa-solid fa-chevron-down text-slate-500 text-xs"></i>
                  </div>

                  <!-- Step 2: Accordion (In Focus with Cycle Transition Table) -->
                  <div class="bg-[#121f3f] border border-purple-500/30 rounded-xl p-3.5 flex flex-col gap-2.5">
                    <div class="flex items-center justify-between">
                      <span class="text-[11px] font-bold text-white flex items-center gap-2">
                        <span class="h-4 w-4 rounded-full bg-purple-500 text-white text-[9px] flex items-center justify-center font-bold">2</span>
                        Discrete State Transitions (Cycle Evolution)
                      </span>
                      <span class="px-2 py-0.5 rounded text-[8px] font-bold bg-purple-500/20 text-purple-300 uppercase">In Focus</span>
                    </div>

                    <p class="text-[10px] text-slate-300 leading-relaxed">
                      Observe how the increment cascades synchronously across the linear topology with alternating updates:
                    </p>

                    <!-- Cycle Table -->
                    <div class="overflow-x-auto">
                      <table class="w-full text-center text-[10px] font-mono border-collapse">
                        <thead>
                          <tr class="border-b border-[#21355e] text-slate-400 text-[9px]">
                            <th class="py-1">Cycle</th>
                            <th class="py-1 text-cyan-400">D_A(X)</th>
                            <th class="py-1 text-cyan-400">D_B(X)</th>
                            <th class="py-1 text-cyan-400">D_C(X)</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-[#182848] text-slate-200">
                          <tr><td class="py-1 text-slate-400">0 (Break)</td><td class="py-1 text-rose-400 font-bold">1 &rarr; 3</td><td class="py-1">2</td><td class="py-1">3</td></tr>
                          <tr><td class="py-1 text-slate-400">1</td><td class="py-1">3</td><td class="py-1 text-cyan-400 font-bold">4</td><td class="py-1">3</td></tr>
                          <tr><td class="py-1 text-slate-400">2</td><td class="py-1">3</td><td class="py-1">4</td><td class="py-1 text-cyan-400 font-bold">5</td></tr>
                          <tr><td class="py-1 text-slate-400">3</td><td class="py-1 text-cyan-400 font-bold">5</td><td class="py-1">4</td><td class="py-1">5</td></tr>
                          <tr class="text-[8px] text-slate-500 italic"><td colspan="4" class="py-1">&bull; &bull; &bull; Loop increments step-by-step (+2 every 2 rounds) &bull; &bull; &bull;</td></tr>
                          <tr class="bg-[#0b1428] font-bold"><td class="py-1 text-purple-300">k (Target)</td><td class="py-1">15</td><td class="py-1">16 (&infin;)</td><td class="py-1 text-purple-400">16 (&infin;)</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="bg-[#080d1a] border border-[#172648] rounded-lg p-2 font-mono text-[9px] text-cyan-300 flex items-center justify-between">
                      <span>Recurrence:</span>
                      <span>D_C(X) @ cycle k = 3 + 2 &times; &lfloor;k/2&rfloor;</span>
                    </div>
                  </div>

                  <!-- Step 3: Locked Step -->
                  <div class="bg-[#0e1935] border border-[#18294e] rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span class="text-[11px] font-bold text-slate-400 flex items-center gap-2">
                        <span class="h-4 w-4 rounded-full bg-slate-700 text-slate-300 text-[9px] flex items-center justify-center font-bold">3</span>
                        Final Equation &amp; Convergence Cycle
                      </span>
                      <span class="text-[8px] text-slate-500 block pl-6">Reveals definitive calculation step</span>
                    </div>
                    <button id="btn-unlock-math" class="px-2.5 py-1 rounded bg-[#1e2a4a] hover:bg-[#283863] text-cyan-400 text-[9px] font-bold flex items-center gap-1 transition-all">
                      <i class="fa-solid fa-lock text-[8px]"></i> Unlock Math
                    </button>
                  </div>
                </div>

                <!-- GATE Trap Alert Box -->
                <div class="bg-rose-950/20 border border-rose-800/40 rounded-xl p-3 text-rose-300 text-[10px] leading-relaxed">
                  <span class="font-bold flex items-center gap-1.5 text-rose-400 uppercase text-[9px] mb-1">
                    <i class="fa-solid fa-triangle-exclamation"></i> GATE Trap Alert: Stop Conditions
                  </span>
                  Do not confuse the round router B reaches 16 with the round router C registers 16. In linear networks, Router C is 2 hops away from the fault origin. Updates propagate with an interleaving lag of exactly 1 exchange interval per hop!
                </div>

                <!-- Prompt Suggestion Chips -->
                <div class="flex flex-col gap-1.5 mt-1">
                  <span class="text-[9px] font-mono text-slate-400 uppercase">ASK GEMINI CONCEPT TUTOR</span>
                  <div class="flex flex-col gap-1.5">
                    <button class="tutor-chip text-left px-3 py-1.5 rounded-lg bg-[#0e1935] hover:bg-[#162752] border border-[#1e335f] text-cyan-300 text-[10px] font-mono transition-all">
                      &ldquo;Show Bellman-Ford Recurrence&rdquo;
                    </button>
                    <button class="tutor-chip text-left px-3 py-1.5 rounded-lg bg-[#0e1935] hover:bg-[#162752] border border-[#1e335f] text-cyan-300 text-[10px] font-mono transition-all">
                      &ldquo;Why doesn't Split Horizon apply?&rdquo;
                    </button>
                    <button class="tutor-chip text-left px-3 py-1.5 rounded-lg bg-[#0e1935] hover:bg-[#162752] border border-[#1e335f] text-cyan-300 text-[10px] font-mono transition-all">
                      &ldquo;Why 15 vs 16 cycles?&rdquo;
                    </button>
                  </div>
                </div>

                <!-- Interactive Chat Input -->
                <div class="relative mt-2">
                  <input type="text" id="tutor-chat-input" placeholder="Ask a pedagogical doubt regarding Q.${q.number || 42}..." class="w-full bg-[#070c18] border border-[#182848] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 pr-16 font-sans">
                  <div class="absolute right-2 top-2 flex items-center gap-1">
                    <button class="p-1.5 text-slate-400 hover:text-white transition-colors" title="Voice Input">
                      <i class="fa-solid fa-microphone text-xs"></i>
                    </button>
                    <button id="btn-send-tutor" class="p-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold transition-all">
                      <i class="fa-solid fa-arrow-up"></i>
                    </button>
                  </div>
                </div>

                <div class="flex items-center justify-between text-[9px] font-mono text-slate-500 border-t border-[#16233e] pt-2">
                  <span class="flex items-center gap-1.5 text-emerald-400">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Diagnostic Sync Active
                  </span>
                  <span>Tokens: 412 / 2048</span>
                </div>
              </div>
            ` : ''}

            <!-- 3. QUESTION PALETTE GRID (Image 1) -->
            ${(!this.isTutorOpen && this.isPaletteOpen) ? `
              <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-4 shadow-xl flex flex-col gap-4">
                <div class="flex items-center justify-between border-b border-[#142038] pb-2.5">
                  <span class="text-xs font-bold text-white uppercase tracking-wider font-display">Question Palette</span>
                  <span class="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">65 Items</span>
                </div>

                <!-- Legend Tiles Matching Image 1 -->
                <div class="grid grid-cols-2 gap-2 text-[9px] font-bold">
                  <div class="flex items-center justify-between p-1.5 rounded-lg bg-[#07241b] border border-emerald-500/20 text-emerald-300">
                    <span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded-full bg-emerald-500"></span> Answered</span>
                    <span class="font-mono font-extrabold">42</span>
                  </div>
                  <div class="flex items-center justify-between p-1.5 rounded-lg bg-[#310c14] border border-rose-500/20 text-rose-300">
                    <span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded-full bg-rose-500"></span> Not Ans.</span>
                    <span class="font-mono font-extrabold">17</span>
                  </div>
                  <div class="flex items-center justify-between p-1.5 rounded-lg bg-[#24133b] border border-purple-500/20 text-purple-300">
                    <span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded-full bg-purple-500"></span> Marked</span>
                    <span class="font-mono font-extrabold">06</span>
                  </div>
                  <div class="flex items-center justify-between p-1.5 rounded-lg bg-[#0e1628] border border-slate-700 text-slate-400">
                    <span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded-full bg-slate-500"></span> Unvisited</span>
                    <span class="font-mono font-extrabold">00</span>
                  </div>
                </div>

                <!-- Question Tiles Grid (1 to 50/65) -->
                <div class="grid grid-cols-5 gap-1.5 max-h-[300px] overflow-y-auto cbt-scrollbar pr-1">
                  ${Array.from({ length: 65 }, (_, i) => {
                    const qnum = i + 1;
                    const isCurrent = (this.currentIdx + 1) === qnum;
                    
                    // Style status matching Image 1
                    let tileClass = "bg-[#0b162c] text-slate-300 border border-[#192b4c]";
                    if (qnum === 24) {
                      tileClass = "bg-cyan-500 text-slate-950 font-extrabold border-2 border-white ring-2 ring-cyan-500";
                    } else if (qnum === 42) {
                      tileClass = "bg-emerald-600 text-white font-bold border border-emerald-400";
                    } else if ([13, 17, 19, 23, 26, 28, 29, 30, 31].includes(qnum)) {
                      tileClass = "bg-purple-600 text-white font-bold border border-purple-400 relative after:content-[''] after:absolute after:top-1 after:right-1 after:h-1.5 after:w-1.5 after:bg-emerald-400 after:rounded-full";
                    } else if ([14, 21, 25].includes(qnum)) {
                      tileClass = "bg-rose-600 text-white font-bold border border-rose-400";
                    } else if (qnum <= 35) {
                      tileClass = "bg-emerald-600 text-white font-bold border border-emerald-400";
                    } else {
                      tileClass = "bg-[#0e1628] text-slate-400 border border-slate-800";
                    }

                    return `
                      <button class="cbt-palette-tile h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all hover:scale-105 active:scale-95 ${tileClass}" data-qidx="${i}">
                        ${qnum}
                      </button>
                    `;
                  }).join('')}
                </div>

                <!-- Bottom AI Hint Quick Callout (Matching Image 1) -->
                <div class="bg-[#09152b] border border-cyan-500/30 rounded-xl p-3 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="h-6 w-6 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                      <i class="fa-solid fa-sparkles"></i>
                    </div>
                    <div>
                      <span class="block text-[10px] font-bold text-white">Gemini AI Tutor</span>
                      <span class="block text-[8px] text-cyan-300 font-mono">Demand Paging Hint Ready</span>
                    </div>
                  </div>
                  <button id="btn-show-hint-inline" class="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[10px] font-extrabold transition-all">
                    Show Hint
                  </button>
                </div>
              </div>
            ` : ''}

          </div>

        </div>

      </div>
    `;
  },

  // ─────────────────────────────────────────────────────────────
  // VIEW 3: POST-EXAM DIAGNOSTIC TERMINAL (Matching Image 3)
  // ─────────────────────────────────────────────────────────────
  renderDiagnosticTerminal() {
    const d = this.diagnosticData || CBT_BENCHMARK_MOCK04.diagnosticStats;

    return `
      <div class="flex flex-col gap-6 max-w-[1700px] mx-auto pb-8">
        
        <!-- Terminal Header Row -->
        <div class="flex items-start justify-between gap-4 flex-wrap border-b border-[#142038] pb-4">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-2 text-[10px] font-mono">
              <span class="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span class="h-2 w-2 rounded-full bg-emerald-400"></span> EVALUATION COMPLETE
              </span>
              <span class="text-slate-500">&bull;</span>
              <span class="text-slate-400">RUN_ID: <span class="text-cyan-400 font-bold">${CBT_BENCHMARK_MOCK04.runId}</span></span>
              <span class="text-slate-500">&bull;</span>
              <span class="text-purple-400 font-bold">${CBT_BENCHMARK_MOCK04.title}</span>
            </div>
            <h2 class="font-display font-extrabold text-2xl text-white tracking-tight mt-0.5">
              Post-Exam Diagnostic Terminal
            </h2>
            <p class="text-xs text-slate-400 font-mono">
              Session 1 &bull; AI Core v4.2 Diagnostic Telemetry
            </p>
          </div>

          <!-- Top Action Buttons -->
          <div class="flex items-center gap-2.5">
            <button id="btn-diag-revision" class="px-3.5 py-2 rounded-xl bg-[#0b1426] hover:bg-[#14223d] border border-[#192b4c] text-slate-300 text-xs font-bold transition-all flex items-center gap-2">
              <i class="fa-solid fa-folder-plus text-cyan-400"></i> Add to Revision Deck
            </button>
            <button id="btn-diag-pdf" class="px-3.5 py-2 rounded-xl bg-[#0b1426] hover:bg-[#14223d] border border-[#192b4c] text-slate-300 text-xs font-bold transition-all flex items-center gap-2">
              <i class="fa-solid fa-file-arrow-down text-cyan-400"></i> Diagnostic PDF
            </button>
            <button id="btn-diag-retest" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold shadow-md shadow-cyan-500/20 transition-all active:scale-95 flex items-center gap-1.5">
              <i class="fa-solid fa-rotate-left"></i> Retest Incorrect (11)
            </button>
          </div>
        </div>

        <!-- 5 Top Metric Cards in a Row (Matching Image 3) -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          <!-- Card 1: Raw Score -->
          <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-4 flex flex-col justify-between shadow-xl">
            <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
              <span>TOTAL RAW SCORE</span>
              <i class="fa-solid fa-chart-simple text-cyan-400"></i>
            </div>
            <div class="my-2">
              <span class="font-mono text-3xl font-extrabold text-cyan-400 leading-none">${d.totalRawScore}</span>
              <span class="text-xs font-mono text-slate-400 font-bold"> / ${d.maxScore}</span>
            </div>
            <div class="flex items-center justify-between text-[10px] font-mono border-t border-[#142038] pt-2">
              <span class="text-slate-400">Cutoff: ${d.cutoff}</span>
              <span class="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">${d.cutoffBuff}</span>
            </div>
          </div>

          <!-- Card 2: Projected AIR Rank -->
          <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-4 flex flex-col justify-between shadow-xl">
            <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
              <span>PROJECTED ALL INDIA RANK</span>
              <i class="fa-solid fa-trophy text-emerald-400"></i>
            </div>
            <div class="my-2">
              <span class="font-mono text-3xl font-extrabold text-emerald-400 leading-none">${d.projectedAir}</span>
              <span class="text-xs font-mono text-slate-400 font-bold"> / ${d.totalAspirants}</span>
            </div>
            <div class="flex items-center justify-between text-[10px] font-mono border-t border-[#142038] pt-2">
              <span class="text-slate-400">${d.aspirantBracket}</span>
              <span class="text-cyan-400 font-bold bg-cyan-500/10 px-1.5 py-0.5 rounded">${d.airPercentile}</span>
            </div>
          </div>

          <!-- Card 3: Normalized GATE Score -->
          <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-4 flex flex-col justify-between shadow-xl">
            <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
              <span>NORMALIZED GATE SCORE</span>
              <i class="fa-solid fa-circle-check text-purple-400"></i>
            </div>
            <div class="my-2">
              <span class="font-mono text-3xl font-extrabold text-white leading-none">${d.normalizedGateScore}</span>
              <span class="text-xs font-mono text-slate-400 font-bold"> / ${d.gateScoreMax}</span>
            </div>
            <div class="flex items-center justify-between text-[10px] font-mono border-t border-[#142038] pt-2">
              <span class="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">${d.collegeCall}</span>
            </div>
          </div>

          <!-- Card 4: Overall Accuracy -->
          <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-4 flex flex-col justify-between shadow-xl">
            <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
              <span>OVERALL ACCURACY</span>
              <i class="fa-solid fa-bullseye text-cyan-400"></i>
            </div>
            <div class="my-2 flex items-baseline gap-2">
              <span class="font-mono text-3xl font-extrabold text-cyan-400 leading-none">${d.overallAccuracy}%</span>
              <span class="text-xs font-mono text-rose-400 font-bold">${d.negativeMarks} Neg</span>
            </div>
            <div class="flex items-center justify-between text-[10px] font-mono border-t border-[#142038] pt-2">
              <span class="text-slate-400">${d.validQuestions} Valid Questions</span>
              <span class="text-slate-400">${d.skippedQuestions} Skipped</span>
            </div>
          </div>

          <!-- Card 5: Time Velocity -->
          <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-4 flex flex-col justify-between shadow-xl col-span-2 md:col-span-1">
            <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
              <span>TIME VELOCITY</span>
              <i class="fa-regular fa-clock text-emerald-400"></i>
            </div>
            <div class="my-2">
              <span class="font-mono text-3xl font-extrabold text-white leading-none">${d.timeVelocity.split('/')[0].trim()}</span>
              <span class="text-xs font-mono text-slate-400 font-bold"> / ${d.timeVelocity.split('/')[1]?.trim() || '180m'}</span>
            </div>
            <div class="flex items-center justify-between text-[10px] font-mono border-t border-[#142038] pt-2">
              <span class="text-slate-400">Pacing Velocity</span>
              <span class="text-cyan-400 font-bold">${d.pacingVelocity}</span>
            </div>
          </div>
        </div>

        <!-- 3 Diagnostic Visual Panels (Matching Image 3) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <!-- Panel 1: Syllabus Competency Vector (Radar Chart) -->
          <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div class="flex items-center justify-between border-b border-[#142038] pb-3">
              <div>
                <h4 class="font-display font-extrabold text-xs text-white uppercase tracking-wider">
                  Syllabus Competency Vector
                </h4>
                <p class="text-[9px] text-slate-400 mt-0.5">Relative performance vs Top 100 AIR Benchmark</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-[#142038] text-cyan-400">RADAR_01</span>
            </div>

            <!-- Radar Canvas -->
            <div class="relative h-60 w-full flex items-center justify-center my-2">
              <canvas id="diagRadarChart"></canvas>
            </div>

            <div class="flex items-center justify-center gap-4 text-[10px] font-mono border-t border-[#142038] pt-3">
              <span class="flex items-center gap-1.5 text-cyan-400">
                <span class="h-2 w-2 rounded-full bg-cyan-400"></span> Candidate Accuracy
              </span>
              <span class="flex items-center gap-1.5 text-purple-400">
                <span class="h-2 w-2 rounded-full bg-purple-400"></span> Top 100 Benchmark
              </span>
            </div>
          </div>

          <!-- Panel 2: Pacing & Weightage Matrix (Scatter Plot) -->
          <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div class="flex items-center justify-between border-b border-[#142038] pb-3">
              <div>
                <h4 class="font-display font-extrabold text-xs text-white uppercase tracking-wider">
                  Pacing &amp; Weightage Matrix
                </h4>
                <p class="text-[9px] text-slate-400 mt-0.5">Question duration vs Mark Yield (Traps Highlighted)</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-[#142038] text-cyan-400">SCATTER_02</span>
            </div>

            <!-- Scatter Canvas -->
            <div class="relative h-60 w-full flex items-center justify-center my-2">
              <canvas id="diagScatterChart"></canvas>
            </div>

            <div class="flex items-center justify-center gap-4 text-[10px] font-mono border-t border-[#142038] pt-3">
              <span class="flex items-center gap-1.5 text-rose-400">
                <span class="h-2 w-2 rounded-full bg-rose-500"></span> Critical Traps (&gt;4m Incorrect)
              </span>
              <span class="flex items-center gap-1.5 text-emerald-400">
                <span class="h-2 w-2 rounded-full bg-emerald-400"></span> High-Speed Wins
              </span>
            </div>
          </div>

          <!-- Panel 3: Question States (Donut Chart) -->
          <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div class="flex items-center justify-between border-b border-[#142038] pb-3">
              <div>
                <h4 class="font-display font-extrabold text-xs text-white uppercase tracking-wider">
                  Question States
                </h4>
                <p class="text-[9px] text-slate-400 mt-0.5">Total 65 Questions Evaluated</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-[#142038] text-cyan-400">RATIO_03</span>
            </div>

            <!-- Donut Canvas with Center Text -->
            <div class="relative h-60 w-full flex items-center justify-center my-2">
              <canvas id="diagDonutChart"></canvas>
              <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span class="font-mono text-2xl font-extrabold text-white">65</span>
                <span class="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">EVALUATED</span>
              </div>
            </div>

            <!-- Donut Legend -->
            <div class="flex flex-col gap-1.5 text-[10px] font-mono border-t border-[#142038] pt-3">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-emerald-400">
                  <span class="h-2 w-2 rounded-full bg-emerald-400"></span> Correct Valid
                </span>
                <span class="text-slate-300 font-bold">47 (72.3%)</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-rose-400">
                  <span class="h-2 w-2 rounded-full bg-rose-500"></span> Incorrect Error
                </span>
                <span class="text-slate-300 font-bold">11 (16.9%)</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-slate-400">
                  <span class="h-2 w-2 rounded-full bg-slate-500"></span> Skipped / Zero
                </span>
                <span class="text-slate-400 font-bold">7 (10.8%)</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Cognitive Root Cause Mistake Notebook (Matching Image 3) -->
        <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-6 shadow-xl flex flex-col gap-5">
          <div class="flex items-center justify-between gap-4 flex-wrap border-b border-[#142038] pb-4">
            <div class="flex items-center gap-3">
              <div class="h-8 w-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">
                <i class="fa-solid fa-brain"></i>
              </div>
              <div>
                <h4 class="font-display font-extrabold text-sm text-white">
                  Cognitive Root Cause Mistake Notebook
                </h4>
                <p class="text-[10px] text-slate-400">Automated classification of candidate missteps by AI Diagnostics</p>
              </div>
            </div>

            <!-- Filter Tabs -->
            <div class="flex items-center gap-1.5 bg-[#080d1a] border border-[#162544] p-1 rounded-xl">
              <button class="diag-filter-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${this.diagnosticFilter === 'all' ? 'bg-[#152340] text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'}" data-filter="all">
                All Mistakes (11)
              </button>
              <button class="diag-filter-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${this.diagnosticFilter === 'conceptual' ? 'bg-[#152340] text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'}" data-filter="conceptual">
                Conceptual Gap (4)
              </button>
              <button class="diag-filter-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${this.diagnosticFilter === 'calculation' ? 'bg-[#152340] text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'}" data-filter="calculation">
                Calculation Error (3)
              </button>
              <button class="diag-filter-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${this.diagnosticFilter === 'misread' ? 'bg-[#152340] text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'}" data-filter="misread">
                Misread Constraint (4)
              </button>
            </div>
          </div>

          <!-- Mistake Cards List Matching Image 3 -->
          <div class="flex flex-col gap-3">
            ${CBT_BENCHMARK_MOCK04.mistakeNotebook.map(m => `
              <div class="bg-[#0c1426] border border-[#162544] hover:border-slate-600 rounded-xl p-4 transition-all flex flex-col gap-2.5">
                <div class="flex items-center justify-between gap-3 flex-wrap">
                  <div class="flex items-center gap-2.5 flex-wrap">
                    <span class="h-6 w-9 rounded bg-rose-600 text-white font-mono font-extrabold text-xs flex items-center justify-center">
                      ${m.qid}
                    </span>
                    <span class="text-xs font-bold text-white">${m.subject} &bull; ${m.topic}</span>
                    <span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      m.categoryColor === 'purple' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                      m.categoryColor === 'cyan' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                      m.categoryColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }">
                      ${m.category}
                    </span>
                  </div>

                  <div class="flex items-center gap-4 text-xs font-mono">
                    <span class="text-rose-400 font-extrabold">${m.marksLost}</span>
                    <span class="text-slate-400">${m.timeSpent}</span>
                    <i class="fa-solid fa-chevron-down text-slate-500 text-xs"></i>
                  </div>
                </div>

                <p class="text-xs text-slate-300 leading-relaxed font-sans">
                  ${m.title}
                </p>

                <div class="bg-[#080d1a] border border-[#142038] rounded-lg p-3 text-[11px] text-slate-400 leading-relaxed font-mono">
                  <span class="text-cyan-400 font-bold block mb-1">Diagnostic Root Cause:</span>
                  ${m.explanation}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- AI Prescribed Action Callout (Matching Image 3) -->
        <div class="bg-gradient-to-r from-[#0c1836] via-[#101d42] to-[#141838] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex flex-col gap-2 max-w-2xl">
            <span class="text-[10px] font-mono font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span> AI PRESCRIBED ACTION &bull; Recovery Sequence Ready
            </span>
            <h3 class="font-display font-extrabold text-lg text-white">
              Next Step: 3-Day Conceptual Gap Recovery Sprint
            </h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Your diagnostic indicates <span class="text-cyan-400 font-bold font-mono">8.33 recoverable marks</span> concentrated primarily in Inverted Paging, DP Matrix Boundaries, and TCP Reno fast recovery. Recover these before Mock Test 05.
            </p>
          </div>

          <div class="flex items-center gap-3 flex-shrink-0">
            <button id="btn-export-anki" class="px-4 py-2.5 rounded-xl bg-[#080f21] hover:bg-[#0f1d40] border border-[#1e345e] text-slate-300 text-xs font-bold transition-all">
              Export Anki Deck (.apkg)
            </button>
            <button id="btn-start-drill" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-cyan-500/20 transition-all active:scale-95 flex items-center gap-2">
              Start Targeted 40-Min Drill <i class="fa-solid fa-arrow-right text-[11px]"></i>
            </button>
          </div>
        </div>

      </div>
    `;
  },

  // ─────────────────────────────────────────────────────────────
  // VIEW 4: FULL QUESTION PAPER REVIEW (Matching Image 4)
  // ─────────────────────────────────────────────────────────────
  renderFullQuestionPaper() {
    const allQs = getBenchmarkQuestions();
    
    // Apply filters
    let filtered = [...allQs];
    if (this.paperFilterSection === 'ga') {
      filtered = filtered.filter(q => q.section.includes('General Aptitude'));
    } else if (this.paperFilterSection === 'cs') {
      filtered = filtered.filter(q => q.section.includes('Computer Science'));
    }

    if (this.paperFilterState === 'answered') {
      filtered = filtered.filter(q => q.status === 'answered' || q.status === 'marked-answered');
    } else if (this.paperFilterState === 'review') {
      filtered = filtered.filter(q => q.status === 'marked' || q.status === 'marked-answered');
    } else if (this.paperFilterState === 'unattempted') {
      filtered = filtered.filter(q => q.status === 'not-answered' || q.status === 'not-visited');
    }

    return `
      <div class="flex flex-col gap-6 max-w-[1700px] mx-auto pb-12">
        
        <!-- Header Info Bar -->
        <div class="flex items-center justify-between gap-4 flex-wrap border-b border-[#142038] pb-4">
          <div class="flex items-center gap-3 text-xs font-mono">
            <span class="text-slate-400">REF: <span class="text-white font-bold">${CBT_BENCHMARK_MOCK04.paperCode}</span></span>
            <span class="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              HARD-COPY REVIEW MODE
            </span>
            <span class="text-slate-500">Last synced: 11:14:12 UTC</span>
          </div>

          <div class="flex items-center gap-2.5">
            <button class="px-3 py-1.5 rounded-lg border border-[#192b4c] text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-all">
              <i class="fa-solid fa-compress mr-1"></i> Compact View
            </button>
            <button id="btn-print-paper" class="px-3 py-1.5 rounded-lg border border-[#192b4c] text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-all">
              <i class="fa-solid fa-print mr-1"></i> Print Paper
            </button>
            <button id="btn-return-live-test" class="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-all active:scale-95">
              &larr; Return to Live Test
            </button>
          </div>
        </div>

        <!-- 6 Quick Stats Cards (Matching Image 4) -->
        <div class="grid grid-cols-2 md:grid-cols-6 gap-3">
          <div class="bg-[#0a1122] border border-[#15233e] rounded-xl p-3 text-center">
            <span class="text-[9px] font-mono text-slate-400 uppercase block">TOTAL POOL</span>
            <span class="font-mono text-xl font-extrabold text-white block mt-0.5">65 <span class="text-xs text-slate-500">Items</span></span>
          </div>
          <div class="bg-[#0a1122] border border-[#15233e] rounded-xl p-3 text-center">
            <span class="text-[9px] font-mono text-slate-400 uppercase block">ANSWERED</span>
            <span class="font-mono text-xl font-extrabold text-emerald-400 block mt-0.5">42 <span class="text-xs text-slate-500">(64.6%)</span></span>
          </div>
          <div class="bg-[#0a1122] border border-[#15233e] rounded-xl p-3 text-center">
            <span class="text-[9px] font-mono text-slate-400 uppercase block">ATTEMPTED</span>
            <span class="font-mono text-xl font-extrabold text-cyan-400 block mt-0.5">68.33 <span class="text-xs text-slate-500">/ 100</span></span>
          </div>
          <div class="bg-[#0a1122] border border-[#15233e] rounded-xl p-3 text-center">
            <span class="text-[9px] font-mono text-slate-400 uppercase block">MARKED REVIEW</span>
            <span class="font-mono text-xl font-extrabold text-purple-400 block mt-0.5">06 <span class="text-xs text-slate-500">Pending</span></span>
          </div>
          <div class="bg-[#0a1122] border border-[#15233e] rounded-xl p-3 text-center">
            <span class="text-[9px] font-mono text-slate-400 uppercase block">UNATTEMPTED</span>
            <span class="font-mono text-xl font-extrabold text-rose-400 block mt-0.5">17 <span class="text-xs text-slate-500">Skipped</span></span>
          </div>
          <div class="bg-[#0a1122] border border-[#15233e] rounded-xl p-3 text-center">
            <span class="text-[9px] font-mono text-slate-400 uppercase block">EST. NET VELOCITY</span>
            <span class="font-mono text-xl font-extrabold text-white block mt-0.5">54.67 <span class="text-xs text-slate-500">Qs/Hr</span></span>
          </div>
        </div>

        <!-- Section Filters & Filter State Bar -->
        <div class="flex items-center justify-between gap-4 flex-wrap bg-[#080e1c] border border-[#15233e] p-3 rounded-2xl">
          <!-- Section Tabs -->
          <div class="flex items-center gap-2">
            <button class="paper-sec-pill px-3 py-1 rounded-lg text-xs font-bold transition-all ${this.paperFilterSection === 'all' ? 'bg-[#152340] text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}" data-psec="all">
              All Sections (65)
            </button>
            <button class="paper-sec-pill px-3 py-1 rounded-lg text-xs font-bold transition-all ${this.paperFilterSection === 'ga' ? 'bg-[#152340] text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}" data-psec="ga">
              General Aptitude (GA 1-10)
            </button>
            <button class="paper-sec-pill px-3 py-1 rounded-lg text-xs font-bold transition-all ${this.paperFilterSection === 'cs' ? 'bg-[#152340] text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}" data-psec="cs">
              CS &amp; IT (CS 1-55)
            </button>
          </div>

          <!-- State Tabs -->
          <div class="flex items-center gap-2 text-xs font-mono">
            <span class="text-slate-500 uppercase text-[9px] font-bold">FILTER STATE:</span>
            <button class="paper-state-pill px-2.5 py-0.5 rounded text-[10px] font-bold transition-all ${this.paperFilterState === 'all' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}" data-pstate="all">
              ALL
            </button>
            <button class="paper-state-pill px-2.5 py-0.5 rounded text-[10px] font-bold transition-all ${this.paperFilterState === 'answered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-400 hover:text-white'}" data-pstate="answered">
              ANSWERED (42)
            </button>
            <button class="paper-state-pill px-2.5 py-0.5 rounded text-[10px] font-bold transition-all ${this.paperFilterState === 'review' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' : 'text-slate-400 hover:text-white'}" data-pstate="review">
              REVIEW (6)
            </button>
            <button class="paper-state-pill px-2.5 py-0.5 rounded text-[10px] font-bold transition-all ${this.paperFilterState === 'unattempted' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'text-slate-400 hover:text-white'}" data-pstate="unattempted">
              UNATTEMPTED (17)
            </button>
          </div>
        </div>

        <!-- Continuous Question Paper Stream -->
        <div class="flex flex-col gap-6">
          ${filtered.map(qi => `
            <div class="bg-[#0a1122] border border-[#15233e] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
              <!-- Question Header Row -->
              <div class="flex items-center justify-between gap-3 flex-wrap border-b border-[#142038] pb-3">
                <div class="flex items-center gap-2.5 flex-wrap">
                  <span class="text-cyan-400 font-mono font-extrabold text-sm">
                    Q.${qi.number < 10 ? '0' + qi.number : qi.number}
                  </span>
                  <span class="text-xs font-bold text-white uppercase">${qi.subject}</span>
                  <span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#0e1830] text-cyan-300 border border-cyan-500/30">
                    ${qi.type}
                  </span>
                  <span class="text-[10px] font-mono text-slate-400">
                    Marks: +${qi.marks}.00 / -${qi.negativeMarks || '0.00'}
                  </span>
                </div>

                <div class="flex items-center gap-3">
                  ${qi.status === 'answered' ? `
                    <span class="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <i class="fa-solid fa-check"></i> ${qi.type === 'NAT' ? `CANDIDATE VALUE: ${qi.candidateValue}` : `CANDIDATE ANSWERED: OPTION (${String.fromCharCode(65 + (qi.candidateSelection ?? 1))})`}
                    </span>
                  ` : qi.status === 'marked-answered' ? `
                    <span class="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                      <i class="fa-solid fa-bookmark"></i> MARKED FOR REVIEW &bull; SELECTED: (A), (C)
                    </span>
                  ` : `
                    <span class="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                      <i class="fa-solid fa-xmark"></i> NOT ATTEMPTED
                    </span>
                  `}
                  <span class="text-[10px] font-mono text-slate-400">Time: ${qi.timeSpent}</span>
                </div>
              </div>

              <!-- Question Body Text -->
              <div class="text-xs font-medium text-slate-200 whitespace-pre-line leading-relaxed">
                ${qi.question}
              </div>

              <!-- Specific Diagrams in Question Paper -->
              ${qi.hasResourceTopologyDiagram ? `
                <div class="bg-[#080d1a] border border-[#142038] rounded-xl p-4 my-1 flex flex-col items-center">
                  <div class="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                    RESOURCE ALLOCATION TOPOLOGY
                  </div>
                  <svg viewBox="0 0 240 180" class="w-48 h-auto">
                    <circle cx="120" cy="90" r="60" fill="none" stroke="#162c52" stroke-width="1.5" stroke-dasharray="3,3" />
                    <!-- 5 Philosopher Nodes -->
                    <circle cx="120" cy="30" r="12" fill="#0c1e40" stroke="#00f2fe" stroke-width="1.5" />
                    <text x="120" y="34" fill="#00f2fe" font-size="8" font-family="monospace" text-anchor="middle">P0</text>
                    <circle cx="178" cy="72" r="12" fill="#0c1e40" stroke="#00f2fe" stroke-width="1.5" />
                    <text x="178" y="76" fill="#00f2fe" font-size="8" font-family="monospace" text-anchor="middle">P1</text>
                    <circle cx="156" cy="140" r="12" fill="#0c1e40" stroke="#00f2fe" stroke-width="1.5" />
                    <text x="156" y="144" fill="#00f2fe" font-size="8" font-family="monospace" text-anchor="middle">P2</text>
                    <circle cx="84" cy="140" r="12" fill="#0c1e40" stroke="#00f2fe" stroke-width="1.5" />
                    <text x="84" y="144" fill="#00f2fe" font-size="8" font-family="monospace" text-anchor="middle">P3</text>
                    <circle cx="62" cy="72" r="12" fill="#0c1e40" stroke="#00f2fe" stroke-width="1.5" />
                    <text x="62" y="76" fill="#00f2fe" font-size="8" font-family="monospace" text-anchor="middle">P4</text>
                  </svg>
                  <span class="text-[8px] font-mono text-emerald-400 mt-1">Status: Circular Wait Cycle Active</span>
                </div>
              ` : ''}

              <!-- Options list -->
              ${qi.options && qi.options.length > 0 ? `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  ${qi.options.map((opt, oi) => {
                    const isCandidateChoice = qi.type === 'MSQ'
                      ? (qi.candidateSelections && qi.candidateSelections.includes(oi))
                      : (qi.candidateSelection === oi);

                    return `
                      <div class="p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                        isCandidateChoice
                          ? 'bg-[#0f1f3d] border-cyan-500 text-white'
                          : 'bg-[#0b1426] border-[#182848] text-slate-300'
                      }">
                        <span class="font-bold font-mono text-cyan-400">${String.fromCharCode(65 + oi)}.</span>
                        <div class="flex flex-col">
                          <span>${opt}</span>
                          ${isCandidateChoice ? '<span class="text-[8px] font-mono text-cyan-400 font-bold mt-1">&check; Candidate Selection</span>' : ''}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              ` : ''}

              ${qi.type === 'NAT' ? `
                <div class="bg-[#080d1a] border border-[#142038] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
                  <div class="flex items-center gap-3">
                    <span class="text-slate-400 text-[10px] uppercase">CANDIDATE ENTERED VALUE:</span>
                    <span class="text-cyan-400 font-extrabold text-sm px-3 py-1 rounded bg-[#0d1b38] border border-cyan-500/40">${qi.candidateValue}</span>
                    <span class="text-emerald-400 text-[10px]">&check; Valid integer recorded</span>
                  </div>
                  <span class="text-slate-400 text-[10px]">ALLOWABLE TOLERANCE: [${qi.natMin || qi.correctNat}, ${qi.natMax || qi.correctNat}]</span>
                </div>
              ` : ''}

            </div>
          `).join('')}
        </div>

        <!-- Bottom Audit Watermark Bar -->
        <div class="flex items-center justify-between gap-4 border-t border-[#142038] pt-4 text-xs font-mono text-slate-500">
          <span class="flex items-center gap-2">
            <i class="fa-solid fa-shield-halved text-cyan-400"></i> IIT Roorkee Testing Agency &bull; Audit Checksum: 0x9AF48DB1
          </span>
          <div class="flex items-center gap-3">
            <button id="btn-scroll-top" class="hover:text-white transition-colors">
              <i class="fa-solid fa-arrow-up mr-1"></i> Back to Top
            </button>
            <button id="btn-exit-paper-bottom" class="px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold">
              Exit Paper View
            </button>
          </div>
        </div>

      </div>
    `;
  },

  // ─────────────────────────────────────────────────────────────
  // VIEW 5: INSTRUCTIONS & MARKING SCHEME
  // ─────────────────────────────────────────────────────────────
  renderInstructions() {
    return `
      <div class="max-w-4xl mx-auto bg-[#0a1122] border border-[#15233e] rounded-3xl p-8 shadow-2xl flex flex-col gap-6 text-slate-200">
        <div class="flex items-center justify-between border-b border-[#142038] pb-4">
          <div>
            <h3 class="font-display font-extrabold text-xl text-white">GATE Computer Based Test (CBT) Instructions</h3>
            <p class="text-xs text-slate-400 mt-1">Official Examination Standards &bull; Computer Science &amp; Information Technology</p>
          </div>
          <button id="btn-close-instructions" class="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs">
            Return to Console
          </button>
        </div>

        <div class="flex flex-col gap-4 text-xs leading-relaxed">
          <h4 class="font-bold text-sm text-cyan-400 uppercase tracking-wider font-mono">1. General Instructions</h4>
          <ul class="list-disc pl-5 flex flex-col gap-1.5 text-slate-300">
            <li>The total duration of the examination is 180 minutes (3 hours).</li>
            <li>The clock will be set at the server. The countdown timer at the top displays time remaining.</li>
            <li>The question paper consists of 65 questions carrying a total of 100 marks.</li>
            <li>Questions 1 to 10 belong to General Aptitude (GA) carrying 15 marks.</li>
            <li>Questions 11 to 65 belong to Computer Science &amp; IT (CS) carrying 85 marks.</li>
          </ul>

          <h4 class="font-bold text-sm text-cyan-400 uppercase tracking-wider font-mono mt-2">2. Question Types &amp; Negative Marking</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
            <div class="bg-[#0c162e] border border-[#1a2c4e] rounded-xl p-4">
              <span class="text-cyan-400 font-mono font-bold block">MCQ (Multiple Choice)</span>
              <p class="text-[11px] text-slate-400 mt-1.5">Single correct option out of four.</p>
              <span class="text-rose-400 font-mono text-[10px] font-bold block mt-2">Negative: 1/3 mark for 1-mark Qs, 2/3 mark for 2-mark Qs.</span>
            </div>
            <div class="bg-[#0c162e] border border-[#1a2c4e] rounded-xl p-4">
              <span class="text-purple-400 font-mono font-bold block">MSQ (Multiple Select)</span>
              <p class="text-[11px] text-slate-400 mt-1.5">One or more than one correct option.</p>
              <span class="text-emerald-400 font-mono text-[10px] font-bold block mt-2">NO negative marking. No partial credit.</span>
            </div>
            <div class="bg-[#0c162e] border border-[#1a2c4e] rounded-xl p-4">
              <span class="text-emerald-400 font-mono font-bold block">NAT (Numerical Answer)</span>
              <p class="text-[11px] text-slate-400 mt-1.5">Real number entered via virtual keypad.</p>
              <span class="text-emerald-400 font-mono text-[10px] font-bold block mt-2">NO negative marking.</span>
            </div>
          </div>

          <h4 class="font-bold text-sm text-cyan-400 uppercase tracking-wider font-mono mt-2">3. Virtual Calculator Usage</h4>
          <p class="text-slate-300">
            A virtual scientific calculator is available at the top right of the examination console. No physical calculator is allowed inside the testing hall. Answers from the virtual calculator can be directly transferred to NAT answer boxes.
          </p>
        </div>
      </div>
    `;
  },

  // ─────────────────────────────────────────────────────────────
  // CONFIG / LAUNCHER SCREEN (Before entering exam)
  // ─────────────────────────────────────────────────────────────
  renderConfigScreen() {
    return `
      <div class="max-w-4xl mx-auto py-8 px-4 flex flex-col gap-8 animate-fade-in font-sans">
        <!-- Header -->
        <div class="text-center">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-3">
            <span class="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span> GATE CBT CS/IT ENGINE v4.2
          </div>
          <h2 class="font-display font-extrabold text-3xl text-white tracking-tight">
            Realistic Computer Based Test Simulator
          </h2>
          <p class="text-xs text-slate-400 mt-1.5 max-w-lg mx-auto">
            Experience the exact high-tech testing environment with on-screen virtual calculator, TCS keypad, Socratic concept tutor, and instant post-exam AIR telemetry.
          </p>
        </div>

        <!-- Featured Benchmark Card (Official GATE CS/IT 2025 MOCK-04) -->
        <div class="bg-gradient-to-r from-[#0c1836] via-[#101e45] to-[#161a3d] border border-cyan-500/40 rounded-3xl p-7 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex flex-col gap-2 max-w-xl">
            <div class="flex items-center gap-2 text-[10px] font-mono">
              <span class="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-extrabold">OFFICIAL BENCHMARK</span>
              <span class="text-cyan-300 font-bold">MOCK-04 &bull; 65 Questions &bull; 100 Marks</span>
            </div>
            <h3 class="font-display font-extrabold text-xl text-white">
              GATE CS/IT 2025 Standard Mock Test 04
            </h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Complete full-length paper covering all 10 GATE CS/IT sections: Multi-Level Demand Paging (Q24), Distance Vector Routing (Q42), Dining Philosophers (Q14), and C Recursive Analysis (Q28).
            </p>
            <div class="flex items-center gap-4 text-[10px] font-mono text-slate-400 mt-1">
              <span><i class="fa-solid fa-clock text-cyan-400 mr-1"></i> 180 Minutes</span>
              <span><i class="fa-solid fa-calculator text-cyan-400 mr-1"></i> TCS Calc &amp; Keypad</span>
              <span><i class="fa-solid fa-brain text-purple-400 mr-1"></i> Socratic AI Tutor</span>
            </div>
          </div>

          <button id="btn-launch-benchmark-mock" class="px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 transition-all active:scale-95 flex items-center gap-2 flex-shrink-0">
            <i class="fa-solid fa-play"></i> Launch Exam Engine
          </button>
        </div>

        <!-- Or Configure Custom Mock -->
        <div class="bg-[#0a1122] border border-[#15233e] rounded-3xl p-6 shadow-xl flex flex-col gap-5">
          <h4 class="font-display font-extrabold text-base text-white">
            Custom Mock Generator
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label class="block text-slate-400 text-[10px] font-mono uppercase mb-1">Subject</label>
              <select id="cfg-custom-subject" class="w-full bg-[#080d1a] border border-[#182848] rounded-xl px-3 py-2 text-white">
                <option value="All">All Subjects (Full Length)</option>
                <option value="Section 8: Operating System">Operating Systems</option>
                <option value="Section 10: Computer Networks">Computer Networks</option>
                <option value="Section 5: Algorithms">Algorithms</option>
                <option value="Section 6: Theory of Computation">Theory of Computation</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-400 text-[10px] font-mono uppercase mb-1">Question Count</label>
              <input type="number" id="cfg-custom-count" value="10" min="5" max="65" class="w-full bg-[#080d1a] border border-[#182848] rounded-xl px-3 py-2 text-white">
            </div>
            <div>
              <label class="block text-slate-400 text-[10px] font-mono uppercase mb-1">Duration (Mins)</label>
              <input type="number" id="cfg-custom-duration" value="20" min="5" max="180" class="w-full bg-[#080d1a] border border-[#182848] rounded-xl px-3 py-2 text-white">
            </div>
          </div>
          <button id="btn-launch-custom-mock" class="w-full py-2.5 rounded-xl bg-[#122144] hover:bg-[#1a3062] border border-cyan-500/40 text-cyan-300 font-bold text-xs transition-all">
            Start Custom Mock in CBT Engine
          </button>
        </div>
      </div>
    `;
  },

  // ─────────────────────────────────────────────────────────────
  // EVENT LISTENERS & LOGIC INITIALIZATION
  // ─────────────────────────────────────────────────────────────
  async init() {
    if (!this.isTesting && this.activeView === 'config') {
      document.getElementById('btn-launch-benchmark-mock')?.addEventListener('click', () => {
        this.startBenchmarkExam();
      });

      document.getElementById('btn-launch-custom-mock')?.addEventListener('click', () => {
        const sub = document.getElementById('cfg-custom-subject').value;
        const count = parseInt(document.getElementById('cfg-custom-count').value) || 10;
        const dur = parseInt(document.getElementById('cfg-custom-duration').value) || 20;
        this.startBenchmarkExam(sub, count, dur);
      });
      return;
    }

    // Sidebar View Navigation
    document.querySelectorAll('.cbt-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.getAttribute('data-view');
        this.activeView = targetView;
        this.refresh();
      });
    });

    // Section Tabs
    document.querySelectorAll('.cbt-section-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const sec = btn.getAttribute('data-sec');
        this.activeSection = sec;
        // Jump to first question of this section
        const targetQ = this.questions.find(q => q.section === sec);
        if (targetQ) {
          const idx = this.questions.indexOf(targetQ);
          if (idx !== -1) this.currentIdx = idx;
        }
        this.refresh();
      });
    });

    // Header Quick Tool Icons
    document.getElementById('btn-toggle-palette')?.addEventListener('click', () => {
      this.isPaletteOpen = !this.isPaletteOpen;
      this.refresh();
    });

    document.getElementById('btn-header-paper')?.addEventListener('click', () => {
      this.activeView = 'paper';
      this.refresh();
    });

    document.getElementById('btn-header-instructions')?.addEventListener('click', () => {
      this.activeView = 'instructions';
      this.refresh();
    });

    document.getElementById('btn-header-tutor')?.addEventListener('click', () => {
      this.isTutorOpen = !this.isTutorOpen;
      this.refresh();
    });

    document.getElementById('btn-show-hint-inline')?.addEventListener('click', () => {
      this.isTutorOpen = true;
      this.refresh();
    });

    // Virtual Calculator Toggle
    document.getElementById('btn-toggle-calculator')?.addEventListener('click', () => {
      this.isCalcOpen = !this.isCalcOpen;
      this.refresh();
    });

    document.getElementById('btn-close-calc')?.addEventListener('click', () => {
      this.isCalcOpen = false;
      this.refresh();
    });

    // Keyboard ESC to toggle calculator
    window.onkeydown = (e) => {
      if (e.key === 'Escape') {
        this.isCalcOpen = !this.isCalcOpen;
        this.refresh();
      }
    };

    // Calculator Keypad logic
    document.querySelectorAll('.calc-key').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-calc');
        this.handleCalculatorInput(key);
      });
    });

    // Direct Transfer to NAT Box
    document.getElementById('btn-transfer-calc-nat')?.addEventListener('click', () => {
      const q = this.questions[this.currentIdx];
      if (q) {
        this.answers[q.id] = this.calcDisplayValue;
        this.status[q.id] = 'answered';
        showToast(`Transferred ${this.calcDisplayValue} to answer box`, 'success');
        this.refresh();
      }
    });

    // 4x4 Virtual Keypad for NAT
    document.querySelectorAll('.cbt-keypad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        const q = this.questions[this.currentIdx];
        if (!q) return;

        let cur = (this.answers[q.id] !== undefined ? String(this.answers[q.id]) : '');
        if (val === 'clear') {
          cur = '';
        } else if (val === 'back') {
          cur = cur.slice(0, -1);
        } else if (val === 'neg') {
          cur = cur.startsWith('-') ? cur.slice(1) : '-' + cur;
        } else if (val === 'ok') {
          this.status[q.id] = cur ? 'answered' : 'not-answered';
          this.navigateNext();
          return;
        } else {
          cur += val;
        }

        this.answers[q.id] = cur;
        this.status[q.id] = cur ? 'answered' : 'not-answered';
        const input = document.getElementById('cbt-nat-input');
        if (input) input.value = cur;
      });
    });

    // MSQ & MCQ Option Changes
    document.querySelectorAll('input[name="cbt-option-msq"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const q = this.questions[this.currentIdx];
        if (!q) return;
        const checkedBoxes = document.querySelectorAll('input[name="cbt-option-msq"]:checked');
        const selected = Array.from(checkedBoxes).map(c => parseInt(c.value));
        this.answers[q.id] = selected;
        this.status[q.id] = selected.length > 0 ? 'answered' : 'not-answered';
      });
    });

    document.querySelectorAll('input[name="cbt-option-mcq"]').forEach(rb => {
      rb.addEventListener('change', (e) => {
        const q = this.questions[this.currentIdx];
        if (!q) return;
        this.answers[q.id] = parseInt(e.target.value);
        this.status[q.id] = 'answered';
      });
    });

    // Question Palette Clicks
    document.querySelectorAll('.cbt-palette-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const idx = parseInt(tile.getAttribute('data-qidx'));
        if (!isNaN(idx) && this.questions[idx]) {
          this.currentIdx = idx;
          this.refresh();
        }
      });
    });

    // Navigation Controls
    document.getElementById('btn-cbt-prev')?.addEventListener('click', () => {
      if (this.currentIdx > 0) {
        this.currentIdx--;
        this.refresh();
      }
    });

    document.getElementById('btn-cbt-next')?.addEventListener('click', () => {
      this.navigateNext();
    });

    document.getElementById('btn-cbt-clear')?.addEventListener('click', () => {
      const q = this.questions[this.currentIdx];
      if (q) {
        delete this.answers[q.id];
        this.status[q.id] = 'not-answered';
        this.refresh();
      }
    });

    document.getElementById('btn-cbt-mark-review')?.addEventListener('click', () => {
      const q = this.questions[this.currentIdx];
      if (q) {
        const hasAnswer = this.answers[q.id] !== undefined && this.answers[q.id] !== '';
        this.status[q.id] = hasAnswer ? 'marked-answered' : 'marked';
        this.navigateNext();
      }
    });

    document.getElementById('btn-cbt-save-mark')?.addEventListener('click', () => {
      const q = this.questions[this.currentIdx];
      if (q) {
        this.status[q.id] = 'marked-answered';
        this.navigateNext();
      }
    });

    document.getElementById('btn-cbt-save-next')?.addEventListener('click', () => {
      const q = this.questions[this.currentIdx];
      if (q) {
        const hasAnswer = this.answers[q.id] !== undefined && this.answers[q.id] !== '';
        this.status[q.id] = hasAnswer ? 'answered' : 'not-answered';
        this.navigateNext();
      }
    });

    // Submit Exam
    document.getElementById('btn-cbt-submit-exam')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to end and submit your exam?')) {
        this.submitExam();
      }
    });

    // Tutor Chat Input
    document.getElementById('btn-send-tutor')?.addEventListener('click', () => {
      this.handleTutorChat();
    });
    document.getElementById('tutor-chat-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleTutorChat();
    });

    // Tutor Chips
    document.querySelectorAll('.tutor-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.replace(/["“”]/g, '').trim();
        const input = document.getElementById('tutor-chat-input');
        if (input) input.value = text;
        this.handleTutorChat();
      });
    });

    // Unlock Math Step in Socratic Ladder
    document.getElementById('btn-unlock-math')?.addEventListener('click', () => {
      showToast('Step 3 Unlocked: Recurrence exact bound D_C(X) = 3 + 2*floor(15/2) = 17 => round 15 convergence.', 'success', 5000);
    });

    // Paper View Filters
    document.querySelectorAll('.paper-sec-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.paperFilterSection = btn.getAttribute('data-psec');
        this.refresh();
      });
    });

    document.querySelectorAll('.paper-state-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.paperFilterState = btn.getAttribute('data-pstate');
        this.refresh();
      });
    });

    document.getElementById('btn-return-live-test')?.addEventListener('click', () => {
      this.activeView = 'console';
      this.refresh();
    });
    document.getElementById('btn-exit-paper-bottom')?.addEventListener('click', () => {
      this.activeView = 'console';
      this.refresh();
    });
    document.getElementById('btn-scroll-top')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.getElementById('btn-print-paper')?.addEventListener('click', () => {
      window.print();
    });

    // Diagnostic Terminal Filters & Charts
    if (this.activeView === 'diagnostic') {
      document.querySelectorAll('.diag-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.diagnosticFilter = btn.getAttribute('data-filter');
          this.refresh();
        });
      });

      document.getElementById('btn-diag-pdf')?.addEventListener('click', () => {
        window.print();
      });
      document.getElementById('btn-diag-retest')?.addEventListener('click', () => {
        showToast('Launching targeted retest drill for 11 incorrect questions...', 'info');
        this.activeView = 'console';
        this.refresh();
      });

      this.initDiagnosticCharts();
    }

    // Instructions Return
    document.getElementById('btn-close-instructions')?.addEventListener('click', () => {
      this.activeView = 'console';
      this.refresh();
    });
  },

  // ─────────────────────────────────────────────────────────────
  // START BENCHMARK EXAM
  // ─────────────────────────────────────────────────────────────
  startBenchmarkExam(filterSub = 'All', count = 65, durationMins = 180) {
    let qs = getBenchmarkQuestions();
    if (filterSub !== 'All') {
      qs = qs.filter(q => q.subject.includes(filterSub));
    }
    if (count < qs.length) {
      qs = qs.slice(0, count);
    }

    this.questions = qs;
    this.isTesting = true;
    this.activeView = 'console';
    this.currentIdx = qs.length > 23 ? 23 : 0; // Default to Q24 if full paper
    this.timeLeft = durationMins * 60;
    this.totalTime = durationMins * 60;

    // Initialize palette statuses
    this.status = {};
    this.answers = {};
    this.questions.forEach((q, i) => {
      this.status[q.id] = q.status || 'not-visited';
      if (q.candidateValue) this.answers[q.id] = q.candidateValue;
      if (q.candidateSelection !== undefined) this.answers[q.id] = q.candidateSelection;
      if (q.candidateSelections) this.answers[q.id] = q.candidateSelections;
    });

    document.body.classList.add('fullscreen-exam');
    this.startTimer();
    this.refresh();
  },

  // ─────────────────────────────────────────────────────────────
  // EXAM TIMER LOGIC
  // ─────────────────────────────────────────────────────────────
  startTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        const timerDom = document.getElementById('cbt-timer-display');
        if (timerDom) {
          timerDom.textContent = this.formatTimer(this.timeLeft);
        }
      } else {
        clearInterval(this.timer);
        showToast("Time's up! Automatically submitting exam.", "warning");
        this.submitExam();
      }
    }, 1000);
  },

  formatTimer(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  },

  navigateNext() {
    if (this.currentIdx < this.questions.length - 1) {
      this.currentIdx++;
      this.refresh();
    } else {
      showToast('You are on the last question of the paper.', 'info');
      this.refresh();
    }
  },

  // ─────────────────────────────────────────────────────────────
  // SUBMIT EXAM EVALUATION
  // ─────────────────────────────────────────────────────────────
  async submitExam() {
    if (this.timer) clearInterval(this.timer);
    
    // Evaluate Telemetry
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    let rawScore = 0;

    this.questions.forEach(q => {
      const ans = this.answers[q.id];
      if (ans === undefined || ans === null || ans === '') {
        skipped++;
      } else if (q.type === 'NAT') {
        const val = parseFloat(ans);
        const min = q.natMin !== undefined ? q.natMin : q.correctNat;
        const max = q.natMax !== undefined ? q.natMax : q.correctNat;
        if (!isNaN(val) && val >= min && val <= max) {
          correct++;
          rawScore += q.marks;
        } else {
          wrong++;
        }
      } else if (q.type === 'MSQ') {
        const userArr = Array.isArray(ans) ? [...ans].sort() : [ans];
        const correctArr = Array.isArray(q.correctOptions) ? [...q.correctOptions].sort() : [];
        const isMatch = userArr.length === correctArr.length && userArr.every((v, i) => v === correctArr[i]);
        if (isMatch) {
          correct++;
          rawScore += q.marks;
        } else {
          wrong++;
        }
      } else {
        if (ans === q.correctAnswer) {
          correct++;
          rawScore += q.marks;
        } else {
          wrong++;
          rawScore -= (q.negativeMarks || (q.marks / 3));
        }
      }
    });

    rawScore = Math.max(0, parseFloat(rawScore.toFixed(2)));
    
    // Update diagnostic stats object
    this.diagnosticData = {
      ...CBT_BENCHMARK_MOCK04.diagnosticStats,
      totalRawScore: rawScore > 0 ? rawScore : 74.33,
      validQuestions: correct,
      incorrectQuestions: wrong,
      skippedQuestions: skipped,
      overallAccuracy: (correct + wrong) > 0 ? Math.round((correct / (correct + wrong)) * 100) : 81.2
    };

    // Save to database
    try {
      await db.saveAttempt({
        mode: 'GATE CS/IT 2025 MOCK-04',
        scope: 'All Subjects (Full-Length CBT)',
        totalPossibleMarks: 100,
        score: this.diagnosticData.totalRawScore,
        accuracy: this.diagnosticData.overallAccuracy,
        correctCount: correct,
        wrongCount: wrong,
        skippedCount: skipped,
        timeSpentSeconds: this.totalTime - this.timeLeft
      });
    } catch (e) {
      console.warn('Attempt save error:', e);
    }

    showToast('Exam submitted successfully! Generating Post-Exam Telemetry.', 'success');
    this.activeView = 'diagnostic';
    this.refresh();
  },

  // ─────────────────────────────────────────────────────────────
  // CALCULATOR LOGIC
  // ─────────────────────────────────────────────────────────────
  handleCalculatorInput(key) {
    if (key === 'c') {
      this.calcDisplayValue = '0';
      this.calcExpression = '';
    } else if (key === 'back') {
      this.calcDisplayValue = this.calcDisplayValue.length > 1 ? this.calcDisplayValue.slice(0, -1) : '0';
    } else if (key === 'pm') {
      this.calcDisplayValue = this.calcDisplayValue.startsWith('-') ? this.calcDisplayValue.slice(1) : '-' + this.calcDisplayValue;
    } else if (key === 'mode') {
      this.calcMode = this.calcMode === 'deg' ? 'rad' : 'deg';
      showToast(`Calculator angle mode: ${this.calcMode.toUpperCase()}`, 'info');
    } else if (key === 'mc') {
      this.calcMemory = 0;
      showToast('Memory Cleared (MC)', 'info');
    } else if (key === 'mr') {
      this.calcDisplayValue = String(this.calcMemory);
    } else if (key === 'm+') {
      this.calcMemory += parseFloat(this.calcDisplayValue) || 0;
      showToast(`M+: ${this.calcMemory}`, 'info');
    } else if (key === 'm-') {
      this.calcMemory -= parseFloat(this.calcDisplayValue) || 0;
      showToast(`M-: ${this.calcMemory}`, 'info');
    } else if (key === 'sqrt') {
      const val = parseFloat(this.calcDisplayValue);
      this.calcDisplayValue = String(Math.sqrt(val));
    } else if (key === 'sq') {
      const val = parseFloat(this.calcDisplayValue);
      this.calcDisplayValue = String(val * val);
    } else if (key === 'inv') {
      const val = parseFloat(this.calcDisplayValue);
      this.calcDisplayValue = val !== 0 ? String(1 / val) : 'Error';
    } else if (['sin', 'cos', 'tan', 'ln', 'log'].includes(key)) {
      const val = parseFloat(this.calcDisplayValue);
      let res = 0;
      const rad = this.calcMode === 'deg' ? (val * Math.PI) / 180 : val;
      if (key === 'sin') res = Math.sin(rad);
      if (key === 'cos') res = Math.cos(rad);
      if (key === 'tan') res = Math.tan(rad);
      if (key === 'ln') res = Math.log(val);
      if (key === 'log') res = Math.log10(val);
      this.calcDisplayValue = String(parseFloat(res.toFixed(6)));
    } else if (key === '=') {
      try {
        const fullExpr = this.calcExpression + this.calcDisplayValue;
        const sanitized = fullExpr.replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-eval
        const result = Function(`"use strict"; return (${sanitized})`)();
        this.calcDisplayValue = String(result);
        this.calcExpression = '';
      } catch (e) {
        this.calcDisplayValue = 'Error';
      }
    } else if (['+', '-', '*', '/'].includes(key)) {
      this.calcExpression += `${this.calcDisplayValue} ${key} `;
      this.calcDisplayValue = '0';
    } else {
      if (this.calcDisplayValue === '0' && key !== '.') {
        this.calcDisplayValue = key;
      } else {
        this.calcDisplayValue += key;
      }
    }

    const disp = document.getElementById('calc-display-val');
    if (disp) disp.textContent = this.calcDisplayValue;
  },

  // ─────────────────────────────────────────────────────────────
  // TUTOR CHAT PEDAGOGICAL AI
  // ─────────────────────────────────────────────────────────────
  async handleTutorChat() {
    const input = document.getElementById('tutor-chat-input');
    const question = input ? input.value.trim() : '';
    if (!question) return;

    showToast('Consulting Gemini Concept Tutor...', 'info');
    input.value = '';

    // Pedagogical Socratic response logic
    try {
      const prompt = `You are the Gemini Concept Tutor inside a GATE Computer Based Test simulation.
A student is asking a doubt about Question 42 (Distance Vector Routing count-to-infinity problem on a 3-node linear topology with Link X-A broken).
Student question: "${question}"
IMPORTANT RULES:
1. Provide a Socratic, conceptual explanation.
2. DO NOT reveal the final integer answer directly.
3. Guide the student using loop invariants and discrete round updates.
Keep your response under 80 words.`;

      const res = await generateContent(prompt);
      showToast(`Tutor: ${res.text}`, 'info', 8000);
    } catch (e) {
      // Offline fallback pedagogical response
      showToast(`Tutor Invariant: At every round, Router A updates distance from B (+1), and Router B updates from A (+1). Because neither can see beyond their immediate neighbor without Split Horizon, distance to X grows by 2 units every 2 synchronous cycles.`, 'info', 8000);
    }
  },

  // ─────────────────────────────────────────────────────────────
  // DIAGNOSTIC TERMINAL CHARTS INITIALIZATION (Chart.js)
  // ─────────────────────────────────────────────────────────────
  initDiagnosticCharts() {
    const d = CBT_BENCHMARK_MOCK04;

    // 1. Radar Chart (Syllabus Competency Vector)
    const radarCtx = document.getElementById('diagRadarChart')?.getContext('2d');
    if (radarCtx) {
      new Chart(radarCtx, {
        type: 'radar',
        data: {
          labels: d.radarData.labels,
          datasets: [
            {
              label: 'Candidate Accuracy',
              data: d.radarData.candidate,
              borderColor: '#00f2fe',
              backgroundColor: 'rgba(0, 242, 254, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: '#00f2fe',
              pointRadius: 3
            },
            {
              label: 'Top 100 Benchmark',
              data: d.radarData.top100Benchmark,
              borderColor: '#a855f7',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              borderWidth: 1.5,
              borderDash: [4, 4],
              pointBackgroundColor: '#a855f7',
              pointRadius: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
              grid: { color: 'rgba(255, 255, 255, 0.08)' },
              pointLabels: { color: '#94a3b8', font: { size: 9, family: 'monospace' } },
              ticks: { display: false, max: 100 }
            }
          },
          plugins: { legend: { display: false } }
        }
      });
    }

    // 2. Scatter Plot (Pacing & Weightage Matrix)
    const scatterCtx = document.getElementById('diagScatterChart')?.getContext('2d');
    if (scatterCtx) {
      new Chart(scatterCtx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'High-Speed Wins',
              data: d.scatterData.filter(p => p.type === 'win'),
              backgroundColor: '#10b981',
              pointRadius: 6,
              pointHoverRadius: 8
            },
            {
              label: 'Critical Traps',
              data: d.scatterData.filter(p => p.type === 'trap'),
              backgroundColor: '#f43f5e',
              pointRadius: 6,
              pointHoverRadius: 8
            },
            {
              label: 'Standard',
              data: d.scatterData.filter(p => p.type === 'normal'),
              backgroundColor: '#38bdf8',
              pointRadius: 5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: { display: true, text: 'Time Spent (Minutes)', color: '#64748b', font: { size: 9 } },
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#94a3b8', font: { size: 9 } },
              min: 0,
              max: 6
            },
            y: {
              title: { display: true, text: 'Weightage (Marks)', color: '#64748b', font: { size: 9 } },
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#94a3b8', font: { size: 9 } },
              min: 0,
              max: 3
            }
          },
          plugins: { legend: { display: false } }
        }
      });
    }

    // 3. Donut Ring Chart (Question States Ratio)
    const donutCtx = document.getElementById('diagDonutChart')?.getContext('2d');
    if (donutCtx) {
      new Chart(donutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Correct Valid', 'Incorrect Error', 'Skipped / Zero'],
          datasets: [
            {
              data: [47, 11, 7],
              backgroundColor: ['#10b981', '#f43f5e', '#64748b'],
              borderWidth: 0,
              cutout: '76%'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }
      });
    }
  },

  refresh() {
    const root = document.getElementById('cbt-engine-root');
    const appContainer = document.getElementById('sub-page-container') || document.getElementById('app');
    if (root) {
      root.outerHTML = this.render();
      this.init();
    } else if (appContainer) {
      appContainer.innerHTML = this.render();
      this.init();
    }
  }
};
