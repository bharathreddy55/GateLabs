import { db, SUBJECT_SYLLABUS } from '../config/firebase';
import { showToast } from '../utils/toast';

export const Practice = {
  questions: [],
  selectedSubject: '',
  selectedDifficulty: '',
  selectedButton: '',
  isApplied: false,
  
  // Ingest/AI Generator State
  activeTab: 'questions', // 'questions' or 'ingest'
  catalogFiles: [],
  ingestStatus: 'idle', // 'idle', 'parsing', 'generating', 'done'
  ingestProgress: 0,
  ingestMessage: '',
  parsedQuestions: [],
  extractedText: '', // Keep last extracted text for "generate more" feature

  async render() {
    // Sync catalog files on render if we are in ingest tab
    if (this.activeTab === 'ingest' && this.catalogFiles.length === 0) {
      this.catalogFiles = await this.fetchCatalog();
    }

    if (this.selectedButton !== undefined && this.isApplied) {
      const filters = {
        difficulty: this.selectedDifficulty
      };

      const mappings = {
        "General Aptitude": { subject: "General Aptitude" },
        "Engineering Mathematics": { subject: "Engineering Mathematics" },
        "Discrete Mathematics": { subject: "Engineering Mathematics", topic: "Discrete Mathematics" },
        "Linear Algebra": { subject: "Engineering Mathematics", topic: "Linear Algebra" },
        "Calculus": { subject: "Engineering Mathematics", topic: "Calculus" },
        "Probability and Statistics": { subject: "Engineering Mathematics", topic: "Probability & Statistics" },
        "Digital Logic": { subject: "Digital Logic" },
        "Computer Organization and Architecture (COA)": { subject: "Computer Organization & Architecture (COA)" },
        "Programming and Data Structures": { subject: "Programming & Data Structures" },
        "Algorithms": { subject: "Algorithms" },
        "Theory of Computation (TOC)": { subject: "Theory of Computation (TOC)" },
        "Compiler Design": { subject: "Compiler Design" },
        "Operating Systems (OS)": { subject: "Operating Systems" },
        "Databases (DBMS)": { subject: "Databases (DBMS)" },
        "Computer Networks (CN)": { subject: "Computer Networks (CN)" }
      };

      const selectedMap = mappings[this.selectedButton] || {};
      if (selectedMap.subject) filters.subject = selectedMap.subject;
      if (selectedMap.topic) filters.topic = selectedMap.topic;

      this.questions = await db.getQuestions(filters);
    } else {
      this.questions = [];
    }

    const subjects = Object.keys(SUBJECT_SYLLABUS);
    const difficulties = ["Easy", "Medium", "Hard"];

    // Subject button definitions
    const subjectButtons = [
      { key: '', label: 'All Subjects', icon: 'fa-list', group: 'all' },
      { key: 'General Aptitude', label: 'General Aptitude', icon: 'fa-graduation-cap', group: 'ga' },
      { key: 'Engineering Mathematics', label: 'Eng. Mathematics', icon: 'fa-calculator', group: 'math' },
      { key: 'Discrete Mathematics', label: 'Discrete Mathematics', icon: 'fa-diagram-project', group: 'math' },
      { key: 'Linear Algebra', label: 'Linear Algebra', icon: 'fa-table-cells', group: 'math' },
      { key: 'Calculus', label: 'Calculus', icon: 'fa-infinity', group: 'math' },
      { key: 'Probability and Statistics', label: 'Probability & Stats', icon: 'fa-chart-pie', group: 'math' },
      { key: 'Digital Logic', label: 'Digital Logic', icon: 'fa-microchip', group: 'cs' },
      { key: 'Computer Organization and Architecture (COA)', label: 'COA', icon: 'fa-server', group: 'cs' },
      { key: 'Programming and Data Structures', label: 'Programming & DS', icon: 'fa-code', group: 'cs' },
      { key: 'Algorithms', label: 'Algorithms', icon: 'fa-sitemap', group: 'cs' },
      { key: 'Theory of Computation (TOC)', label: 'TOC', icon: 'fa-circle-nodes', group: 'cs' },
      { key: 'Compiler Design', label: 'Compiler Design', icon: 'fa-gears', group: 'cs' },
      { key: 'Operating Systems (OS)', label: 'Operating Systems', icon: 'fa-desktop', group: 'cs' },
      { key: 'Databases (DBMS)', label: 'Databases (DBMS)', icon: 'fa-database', group: 'cs' },
      { key: 'Computer Networks (CN)', label: 'Computer Networks', icon: 'fa-network-wired', group: 'cs' },
    ];

    return `
      <div class="flex flex-col gap-6 animate-fade-in font-sans">
        <!-- Tabs Navigation -->
        <div class="flex gap-4 border-b border-slate-200/40 dark:border-white/[0.06] pb-px">
          <button id="tab-questions-btn" class="px-5 py-3 border-b-2 font-display text-sm font-extrabold transition-all duration-205 ${
            this.activeTab === 'questions' 
              ? 'border-primary-600 text-primary-600 dark:text-primary-400' 
              : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-655 dark:hover:text-slate-350'
          }">
            Practice Pool
          </button>
          <button id="tab-ingest-btn" class="px-5 py-3 border-b-2 font-display text-sm font-extrabold transition-all duration-205 ${
            this.activeTab === 'ingest' 
              ? 'border-primary-600 text-primary-600 dark:text-primary-400' 
              : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-655 dark:hover:text-slate-355'
          }">
            <i class="fa-solid fa-file-pdf mr-1.5 animate-pulse"></i> PDF Ingestion & AI Generator
          </button>
        </div>

        <!-- TAB 1: PRACTICE QUESTIONS POOL -->
        <div id="tab-questions-content" class="${this.activeTab === 'questions' ? '' : 'hidden'} flex flex-col gap-8">

          <!-- ── Subject Buttons ── -->
          <div class="flex flex-col gap-5">

            <!-- Difficulty filter strip -->
            <div class="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 class="font-display font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">Select a Subject</h3>
                <p class="text-xs text-slate-455 dark:text-slate-500 mt-1 font-semibold">Click any subject to instantly load practice questions</p>
              </div>
              <div class="flex items-center gap-3 flex-wrap">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Filter:</span>
                ${difficulties.map(d => `
                  <button class="diff-filter-btn px-4 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                    this.selectedDifficulty === d
                      ? (d === 'Easy' ? 'bg-emerald-500 text-white border-emerald-500 shadow-md glow-emerald' : d === 'Medium' ? 'bg-amber-500 text-white border-amber-500 shadow-md' : 'bg-rose-505 text-white border-rose-500 shadow-md glow-rose')
                      : 'border-slate-200/60 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-600 bg-white/50 dark:bg-slate-950/30'
                  }" data-diff="${d}">${d}</button>
                `).join('')}
                <button class="diff-filter-btn px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  this.selectedDifficulty === ''
                    ? 'bg-primary-600 text-white border-primary-600 shadow-md glow-primary'
                    : 'border-slate-200/60 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-600 bg-white/50 dark:bg-slate-950/30'
                }" data-diff="">All</button>
                <button id="add-question-btn" class="inline-flex items-center gap-2 px-4.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 duration-150">
                  <i class="fa-solid fa-plus animate-bounce"></i> Add Question
                </button>
              </div>
            </div>

            <!-- Subject button grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              ${subjectButtons.map(s => {
                const isActive = this.selectedButton === s.key;
                const activeClass = isActive
                  ? 'bg-gradient-to-tr from-primary-600 to-indigo-650 text-white border-primary-500 shadow-lg shadow-primary-500/25 scale-[1.03] glow-primary'
                  : 'glass-card text-slate-655 dark:text-slate-400 hover:border-primary-500/30 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-[1.02]';
                return `
                  <button class="subj-btn flex flex-col items-center justify-center gap-2.5 p-4.5 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${activeClass}" data-subj="${s.key}">
                    <i class="fa-solid ${s.icon} text-3xl ${isActive ? 'text-white' : 'text-primary-500'}"></i>
                    <span class="text-[11px] font-bold leading-tight tracking-tight">${s.label}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- ── Questions Section ── -->
          <div class="flex flex-col gap-6">
            ${!this.isApplied ? `
              <div class="glass-panel p-14 text-center rounded-3xl flex flex-col items-center justify-center">
                <div class="h-20 w-20 bg-gradient-to-tr from-primary-500/10 to-indigo-600/10 text-primary-500 rounded-full flex items-center justify-center text-3xl mb-5 shadow-inner">
                  <i class="fa-solid fa-arrow-up animate-bounce"></i>
                </div>
                <p class="text-base font-extrabold text-slate-800 dark:text-slate-200 tracking-tight">Pick a Subject Above</p>
                <p class="text-xs text-slate-400 dark:text-slate-500 mt-1.5 max-w-sm mx-auto font-semibold">Questions will load instantly when you click any subject button.</p>
              </div>
            ` : this.questions.length === 0 ? `
              <div class="glass-panel p-12 text-center rounded-3xl flex flex-col items-center justify-center">
                <div class="h-16 w-16 bg-slate-100 dark:bg-slate-900 text-slate-400 rounded-full flex items-center justify-center text-xl mb-4 border border-slate-250/20">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <p class="text-sm font-bold text-slate-700 dark:text-slate-300">No questions found for this selection</p>
                <p class="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs leading-relaxed font-semibold">Try a different subject or difficulty level, or add questions via PDF Ingestion.</p>
              </div>
            ` : `
              <!-- Results Header -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-display font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                    ${this.selectedButton || 'All Subjects'}
                    <span class="ml-2 text-sm font-semibold text-slate-400">(${this.questions.length} question${this.questions.length !== 1 ? 's' : ''})</span>
                  </h4>
                  ${this.selectedDifficulty ? `<p class="text-xs text-slate-400 mt-1 font-semibold">Filtered: <span class="font-bold text-primary-500">${this.selectedDifficulty}</span> difficulty</p>` : ''}
                </div>
              </div>

              ${this.questions.map((q, index) => `
                <div class="glass-panel p-6 rounded-3xl flex flex-col gap-4 hover:shadow-lg transition-all duration-300" data-qid="${q.id}">
                  <!-- Question metadata -->
                  <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-3.5">
                    <span class="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">${q.subject} &bull; ${q.topic}</span>
                    <div class="flex gap-2 flex-wrap">
                      <span class="text-[10px] font-bold bg-slate-100 dark:bg-slate-950/40 border border-slate-200/20 dark:border-white/[0.03] px-2.5 py-1 rounded-lg text-slate-500 dark:text-slate-400 font-semibold">${q.difficulty}</span>
                      <span class="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/20 px-2.5 py-1 rounded-lg text-indigo-650 dark:text-indigo-400 font-semibold">${q.marks} Mark${q.marks > 1 ? 's' : ''}</span>
                      ${q.year ? `<span class="text-[10px] font-bold bg-amber-50 dark:bg-amber-950/20 border border-amber-200/20 px-2.5 py-1 rounded-lg text-amber-650 dark:text-amber-400 font-semibold">GATE ${q.year}</span>` : ''}
                      ${q.id.startsWith('q_imp_') ? `<span class="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/25 px-2.5 py-1 rounded-lg text-emerald-650 dark:text-emerald-400 font-semibold"><i class="fa-solid fa-wand-magic-sparkles mr-0.5 animate-pulse"></i> Ingested</span>` : ''}
                    </div>
                  </div>
                  
                  <!-- Question Body -->
                  <p class="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-relaxed whitespace-pre-line">Q${index + 1}. ${q.question}</p>
                  
                  <!-- Options selection list -->
                  <div class="flex flex-col gap-2.5 mt-2">
                    ${q.options.map((opt, optIdx) => `
                      <label class="glass-card flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-white/[0.04] bg-white/40 dark:bg-slate-900/20 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-all cursor-pointer relative">
                        <input type="radio" name="option-${q.id}" value="${optIdx}" class="mt-0.5 text-primary-600 border-slate-350 focus:ring-primary-500 bg-white/50 dark:bg-slate-950/40">
                        <span class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">${String.fromCharCode(65 + optIdx)}. ${opt}</span>
                      </label>
                    `).join('')}
                  </div>

                  <!-- Action buttons -->
                  <div class="flex items-center gap-3 mt-3 flex-wrap">
                    <button class="check-answer-btn px-5.5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold transition-all shadow-md active:scale-98 hover:scale-102 duration-150">
                      Check Answer
                    </button>
                    <button class="eli5-btn px-4 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5" data-qid="${q.id}">
                      <i class="fa-solid fa-wand-magic-sparkles text-indigo-500 animate-pulse"></i> Explain Like I'm 5
                    </button>
                  </div>

                  <!-- Solution Explanation -->
                  <div class="solution-container hidden mt-4 border-t border-slate-100 dark:border-white/[0.05] pt-4 flex flex-col gap-3">
                    <div class="inline-flex items-center gap-2 text-emerald-650 dark:text-emerald-400 font-bold text-xs">
                      <i class="fa-solid fa-square-check animate-pulse"></i> Solution Engine Explanation
                    </div>
                    <div class="p-4 rounded-2xl bg-emerald-55/10 dark:bg-emerald-950/10 border border-emerald-100/40 dark:border-emerald-900/30 text-xs leading-relaxed text-slate-655 dark:text-slate-300 font-semibold">
                      <p class="font-bold text-slate-800 dark:text-slate-100">Correct Answer: Option <span class="correct-opt-char">A</span></p>
                      <p class="mt-2 whitespace-pre-line explanation-text leading-relaxed font-sans">${q.explanation}</p>
                    </div>
                  </div>

                  <!-- ELI5 Explanation Box -->
                  <div class="eli5-container hidden mt-3 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-xs leading-relaxed text-indigo-950 dark:text-indigo-200 font-semibold">
                    <p class="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-1.5">
                      <i class="fa-solid fa-lightbulb"></i> Simple Intuition (ELI5):
                    </p>
                    <p class="eli5-text text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      Imagine this concept like a line of people waiting for a bus. The processor serves one by one. ${q.explanation ? q.explanation.slice(0, 140) + '...' : ''}
                    </p>
                  </div>
                </div>
              `).join('')}
            `}
          </div>
        </div>

        <!-- TAB 2: PDF INGESTION & AI GENERATOR -->
        <div id="tab-ingest-content" class="${this.activeTab === 'ingest' ? '' : 'hidden'} flex flex-col gap-6">
          <!-- API Key Warning if missing -->
          ${!localStorage.getItem('gemini_api_key') ? `
            <div class="p-4 rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/10 dark:bg-amber-950/10 flex items-start gap-3.5 shadow-sm">
              <i class="fa-solid fa-triangle-exclamation text-amber-500 text-base mt-0.5"></i>
              <div class="text-xs">
                <p class="font-bold text-slate-800 dark:text-slate-200">Gemini API Key Missing</p>
                <p class="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-semibold">
                  To parse PDFs or generate new GATE-style practice questions using AI, please configure your Gemini API key in the sidebar footer (<b><i class="fa-solid fa-gear"></i> AI Config</b>).
                  We will fallback to a rule-based regex parsing algorithm if no key is supplied.
                </p>
              </div>
            </div>
          ` : ''}

          <!-- Catalog & Drag-drop Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Catalog List Panel -->
            <div class="glass-panel p-6 rounded-3xl flex flex-col gap-4">
              <h4 class="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <i class="fa-solid fa-folder-open text-primary-600 dark:text-primary-400"></i> Local PDF Catalog
              </h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Add PDFs to <code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-indigo-600 font-mono font-bold">public/pyqs/</code> and register in <code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-indigo-600 font-mono font-bold">catalog.json</code>.
              </p>

              <div id="catalog-list" class="flex-1 min-h-[12rem] max-h-[16rem] overflow-y-auto border border-slate-200 dark:border-white/[0.04] rounded-2xl p-3 bg-white/40 dark:bg-slate-950/20 flex flex-col gap-2">
                ${this.catalogFiles.length === 0 ? `
                  <div class="flex-1 flex flex-col items-center justify-center text-center p-6">
                    <i class="fa-solid fa-cloud-arrow-up text-slate-300 dark:text-slate-700 text-2xl mb-2"></i>
                    <p class="text-[11px] font-bold text-slate-400 dark:text-slate-500">No PDFs registered in catalog.json</p>
                  </div>
                ` : this.catalogFiles.map(file => `
                  <div class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/60 dark:border-white/[0.04] bg-white dark:bg-slate-900/40 hover:border-primary-500 transition-all duration-150">
                    <div class="flex items-center gap-2 min-w-0">
                      <i class="fa-solid fa-file-pdf text-rose-500 text-base"></i>
                      <span class="text-xs font-bold truncate text-slate-700 dark:text-slate-350">${file}</span>
                    </div>
                    <button class="parse-catalog-btn px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-[10px] font-bold transition-all shadow-sm active:scale-95" data-filename="${file}">
                      Load & Parse
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Manual File Drag & Drop -->
            <div class="glass-panel p-6 rounded-3xl flex flex-col gap-4">
              <h4 class="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <i class="fa-solid fa-cloud-arrow-up text-indigo-600 dark:text-indigo-400"></i> Drag & Drop Uploader
              </h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Upload any GATE PYQ or study notes PDF directly from your computer to parse it.
              </p>

              <label id="drag-drop-zone" class="flex-1 min-h-[12rem] border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 rounded-3xl flex flex-col items-center justify-center text-center p-6 cursor-pointer bg-white/30 dark:bg-slate-950/20 hover:bg-primary-55/10 transition-all duration-200">
                <input type="file" id="pdf-file-input" accept="application/pdf" class="sr-only">
                <div class="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 flex items-center justify-center text-xl mb-3 border border-slate-200/20">
                  <i class="fa-solid fa-file-pdf"></i>
                </div>
                <p class="text-xs font-bold text-slate-700 dark:text-slate-300">Click to upload or drag PDF here</p>
                <p class="text-[10px] text-slate-405 mt-1">Supports standard PDF formats up to 25MB</p>
              </label>
            </div>
          </div>

          <!-- Status Indicator Panel -->
          <div id="ingestion-status-panel" class="${this.ingestStatus === 'idle' ? 'hidden' : ''} glass-panel p-6 rounded-3xl flex flex-col gap-4">
            <div class="flex items-center justify-between border-b border-slate-150 dark:border-white/[0.04] pb-3">
              <h5 class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <i id="status-icon" class="fa-solid fa-circle-notch animate-spin text-primary-500"></i> Ingest Engine Status
              </h5>
              <span id="status-badge" class="px-3 py-1 rounded-xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold text-[9px] uppercase tracking-wider">
                ${this.ingestStatus.toUpperCase()}
              </span>
            </div>

            <div class="flex flex-col gap-2">
              <p id="status-msg" class="text-xs text-slate-600 dark:text-slate-400 font-semibold">${this.ingestMessage}</p>
              <!-- Progress Bar -->
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div id="status-progress-bar" class="bg-gradient-to-r from-primary-600 to-indigo-600 h-full rounded-full transition-all duration-300" style="width: ${this.ingestProgress}%"></div>
              </div>
            </div>
          </div>

          <!-- Questions Preview Panel -->
          <div id="parsed-preview-panel" class="${this.parsedQuestions.length === 0 ? 'hidden' : ''} flex flex-col gap-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 class="font-display font-bold text-lg text-slate-900 dark:text-white tracking-tight">Extracted Questions Preview</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">Review the AI-generated/extracted questions before adding them to your workspace.</p>
              </div>
              
              <div class="flex gap-3">
                <button id="generate-more-btn" class="px-4 py-2.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-xl hover:bg-indigo-50/20 transition-all flex items-center gap-1.5 select-none hover:scale-102 active:scale-95 duration-100">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Similar Qs
                </button>
                <button id="import-all-btn" class="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all flex items-center gap-1.5 select-none hover:scale-102 active:scale-95 duration-100">
                  <i class="fa-solid fa-file-import"></i> Save to Practice Pool
                </button>
              </div>
            </div>

            <div id="parsed-questions-list" class="flex flex-col gap-6">
              ${this.parsedQuestions.map((q, idx) => `
                <div class="glass-panel p-6 rounded-3xl flex flex-col gap-4 border-l-4 border-l-primary-500">
                  <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-2.5">
                    <span class="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">${q.subject} &bull; ${q.topic}</span>
                    <div class="flex gap-2">
                      <span class="text-[10px] font-bold bg-slate-100 dark:bg-slate-950/40 border border-slate-200/20 dark:border-white/[0.03] px-2 py-0.5 rounded text-slate-500">${q.difficulty}</span>
                      <span class="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/20 px-2 py-0.5 rounded text-indigo-600 dark:text-indigo-400">${q.marks} Marks</span>
                    </div>
                  </div>
                  
                  <p class="text-slate-800 dark:text-slate-200 text-sm font-semibold">Q${idx + 1}. ${q.question}</p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-semibold">
                    ${q.options.map((opt, optIdx) => {
                      const isCorrect = q.correctAnswer === optIdx;
                      return `
                        <div class="p-3 border rounded-xl flex items-start gap-2.5 ${
                          isCorrect ? 'border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/10 text-emerald-600 dark:text-emerald-400' : 'border-slate-200 dark:border-white/[0.04] bg-white/40 dark:bg-slate-950/10'
                        }">
                          <span class="font-bold ${isCorrect ? 'text-emerald-500' : 'text-slate-400'}">${String.fromCharCode(65 + optIdx)}.</span>
                          <span class="text-slate-700 dark:text-slate-300 leading-relaxed">${opt}</span>
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <div class="p-4 bg-slate-50 dark:bg-slate-950/20 rounded-2xl text-xs border border-slate-100 dark:border-white/[0.04]">
                    <p class="font-bold text-slate-850 dark:text-slate-100"><i class="fa-solid fa-square-check text-emerald-500 mr-1 animate-pulse"></i> Solution Explanation</p>
                    <p class="text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed whitespace-pre-line">${q.explanation}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Add Question Modal (For Manual Pool Additions) -->
      <div id="add-question-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-sm hidden animate-fade-in px-4">
        <div class="w-full max-w-lg glass-panel p-8 rounded-3xl relative shadow-2xl overflow-y-auto max-h-[90vh] border border-white/10 glow-primary">
          <button id="close-add-modal" class="absolute top-5 right-5 text-slate-400 hover:text-slate-655 dark:hover:text-slate-200 transition-colors">
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
          
          <h2 class="font-display font-extrabold text-2xl text-slate-900 dark:text-white text-center tracking-tight">Add Practice Question</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 text-center mt-1.5 font-semibold">Add details to enrich your GATE question bank</p>
          
          <form id="add-question-form" class="mt-6 flex flex-col gap-4 text-xs font-semibold">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Subject</label>
                <select id="add-q-subject" required class="glass-input text-xs">
                  ${subjects.map(sub => `<option value="${sub}">${sub}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Topic</label>
                <input type="text" id="add-q-topic" required placeholder="Deadlocks, Trees, etc." class="glass-input">
              </div>
            </div>
            
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Difficulty</label>
                <select id="add-q-difficulty" required class="glass-input text-xs">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Marks</label>
                <input type="number" id="add-q-marks" required min="1" max="2" value="1" class="glass-input">
              </div>
              <div>
                <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Year (Optional)</label>
                <input type="number" id="add-q-year" min="1990" max="2027" placeholder="e.g. 2024" class="glass-input">
              </div>
            </div>

            <div>
              <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Question Description</label>
              <textarea id="add-q-desc" required rows="3" placeholder="Enter the complete question text..." class="glass-input font-sans py-2"></textarea>
            </div>

            <div class="flex flex-col gap-2">
              <label class="block text-slate-400 uppercase mb-1 tracking-wider">Options</label>
              <input type="text" id="add-q-opt-0" required placeholder="Option A" class="glass-input">
              <input type="text" id="add-q-opt-1" required placeholder="Option B" class="glass-input">
              <input type="text" id="add-q-opt-2" placeholder="Option C (Optional)" class="glass-input">
              <input type="text" id="add-q-opt-3" placeholder="Option D (Optional)" class="glass-input">
            </div>

            <div>
              <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Correct Option</label>
              <select id="add-q-correct" required class="glass-input text-xs">
                <option value="0">Option A</option>
                <option value="1">Option B</option>
                <option value="2">Option C</option>
                <option value="3">Option D</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-400 uppercase mb-1.5 tracking-wider">Detailed Explanation</label>
              <textarea id="add-q-explanation" required rows="2" placeholder="Provide step-by-step solution..." class="glass-input font-sans py-2"></textarea>
            </div>

            <button type="submit" class="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-primary-500/25 active:scale-98 transition-all duration-150">
              Save Question
            </button>
          </form>
        </div>
      </div>
    `;
  },

  init() {
    // 1. Tab Switching Listeners
    const tabQuestions = document.getElementById('tab-questions-btn');
    const tabIngest = document.getElementById('tab-ingest-btn');

    tabQuestions?.addEventListener('click', () => {
      this.activeTab = 'questions';
      this.refresh();
    });

    tabIngest?.addEventListener('click', () => {
      this.activeTab = 'ingest';
      this.refresh();
    });

    // --- TAB 1 Bindings (Filters & Answering) ---
    if (this.activeTab === 'questions') {
      // Subject Menu Buttons — auto-load on click
      const subjBtns = document.querySelectorAll('.subj-btn');
      subjBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.selectedButton = btn.getAttribute('data-subj') || '';
          this.isApplied = true; // Auto-load immediately
          this.refresh();
        });
      });

      // Difficulty filter pill buttons
      const diffBtns = document.querySelectorAll('.diff-filter-btn');
      diffBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.selectedDifficulty = btn.getAttribute('data-diff') || '';
          // Re-apply if a subject is already selected
          if (this.isApplied) {
            this.refresh();
          }
        });
      });

      const panels = document.querySelectorAll('[data-qid]');
      panels.forEach(panel => {
        const qid = panel.getAttribute('data-qid');
        const checkBtn = panel.querySelector('.check-answer-btn');
        const solContainer = panel.querySelector('.solution-container');
        const correctCharSpan = panel.querySelector('.correct-opt-char');
        
        checkBtn?.addEventListener('click', () => {
          const selectedRadio = panel.querySelector(`input[name="option-${qid}"]:checked`);
          if (!selectedRadio) {
            showToast("Please select an option to check.", "warning");
            return;
          }

          const selectedIndex = parseInt(selectedRadio.value);
          const questionObj = this.questions.find(q => q.id === qid);
          if (!questionObj) return;

          const labels = panel.querySelectorAll('label');
          labels.forEach(l => {
            l.classList.remove('border-emerald-500', 'bg-emerald-50/20', 'dark:border-emerald-800', 'dark:bg-emerald-950/20', 'border-rose-500', 'bg-rose-50/20', 'dark:border-rose-800', 'dark:bg-rose-950/20');
          });

          const correctIndex = questionObj.correctAnswer;
          const correctLabel = labels[correctIndex];
          const selectedLabel = labels[selectedIndex];
          
          correctCharSpan.textContent = String.fromCharCode(65 + correctIndex);
          solContainer.classList.remove('hidden');

          if (selectedIndex === correctIndex) {
            showToast("Correct Answer!", "success");
            correctLabel.classList.add('border-emerald-500', 'bg-emerald-50/20', 'dark:border-emerald-800', 'dark:bg-emerald-950/20');
          } else {
            showToast("Incorrect Answer.", "error");
            selectedLabel.classList.add('border-rose-500', 'bg-rose-50/20', 'dark:border-rose-800', 'dark:bg-rose-950/20');
            correctLabel.classList.add('border-emerald-500', 'bg-emerald-50/20', 'dark:border-emerald-800', 'dark:bg-emerald-950/20');
          }

          const eli5Btn = panel.querySelector('.eli5-btn');
          const eli5Container = panel.querySelector('.eli5-container');

          eli5Btn?.addEventListener('click', () => {
            eli5Container?.classList.toggle('hidden');
          });
        });
      });

      // Add Question Modal Handlers
      const addQBtn = document.getElementById('add-question-btn');
      const modal = document.getElementById('add-question-modal');
      const closeModal = document.getElementById('close-add-modal');
      const form = document.getElementById('add-question-form');

      addQBtn?.addEventListener('click', () => modal?.classList.remove('hidden'));
      closeModal?.addEventListener('click', () => {
        modal?.classList.add('hidden');
        form?.reset();
      });

      form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const subject = document.getElementById('add-q-subject').value;
        const topic = document.getElementById('add-q-topic').value.trim();
        const difficulty = document.getElementById('add-q-difficulty').value;
        const marks = parseInt(document.getElementById('add-q-marks').value);
        const year = parseInt(document.getElementById('add-q-year').value) || null;
        const question = document.getElementById('add-q-desc').value.trim();
        const optA = document.getElementById('add-q-opt-0').value.trim();
        const optB = document.getElementById('add-q-opt-1').value.trim();
        const optC = document.getElementById('add-q-opt-2').value.trim();
        const optD = document.getElementById('add-q-opt-3').value.trim();
        const correctAnswer = parseInt(document.getElementById('add-q-correct').value);
        const explanation = document.getElementById('add-q-explanation').value.trim();

        const options = [optA, optB];
        if (optC) options.push(optC);
        if (optD) options.push(optD);

        if (correctAnswer >= options.length) {
          showToast(`Correct Option points to Option ${String.fromCharCode(65 + correctAnswer)}, which is blank.`, "error");
          return;
        }

        const newQ = {
          subject,
          topic,
          subtopic: "",
          difficulty,
          marks,
          year,
          question,
          options,
          correctAnswer,
          explanation,
          tags: []
        };

        try {
          await db.addQuestion(newQ);
          showToast("Question added successfully!", "success");
          modal?.classList.add('hidden');
          form.reset();
          this.refresh();
        } catch (err) {
          showToast(err.message, "error");
        }
      });
    }

    // --- TAB 2 Bindings (Ingestion & AI Generator) ---
    if (this.activeTab === 'ingest') {
      // 1. Catalog Load Buttons
      const parseCatalogBtns = document.querySelectorAll('.parse-catalog-btn');
      parseCatalogBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
          const filename = btn.getAttribute('data-filename');
          await this.ingestCatalogFile(filename);
        });
      });

      // 2. Drag & Drop File Upload Bindings
      const dragZone = document.getElementById('drag-drop-zone');
      const fileInput = document.getElementById('pdf-file-input');

      dragZone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        dragZone.classList.add('border-primary-500', 'bg-primary-50/10');
      });

      dragZone?.addEventListener('dragleave', () => {
        dragZone.classList.remove('border-primary-500', 'bg-primary-50/10');
      });

      dragZone?.addEventListener('drop', (e) => {
        e.preventDefault();
        dragZone.classList.remove('border-primary-500', 'bg-primary-50/10');
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
          this.ingestUploadedFile(file);
        } else {
          showToast("Please drop a valid PDF file.", "warning");
        }
      });

      fileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          this.ingestUploadedFile(file);
        }
      });

      // 3. Question Save Button
      const importAllBtn = document.getElementById('import-all-btn');
      importAllBtn?.addEventListener('click', async () => {
        if (this.parsedQuestions.length === 0) return;
        try {
          await db.addQuestions(this.parsedQuestions);
          showToast(`Successfully imported ${this.parsedQuestions.length} questions into the pool!`, "success");
          this.parsedQuestions = [];
          this.activeTab = 'questions'; // switch to pool view to verify
          this.refresh();
        } catch (err) {
          showToast(err.message, "error");
        }
      });

      // 4. Generate More Button
      const generateMoreBtn = document.getElementById('generate-more-btn');
      generateMoreBtn?.addEventListener('click', async () => {
        if (!this.extractedText) {
          showToast("No document text context loaded.", "warning");
          return;
        }
        await this.runAiGenerator(this.extractedText, true);
      });
    }
  },

  async fetchCatalog() {
    try {
      const res = await fetch('/pyqs/catalog.json');
      if (res.ok) {
        const data = await res.json();
        return data.files || [];
      }
    } catch (err) {
      console.error("Error fetching catalog.json:", err);
    }
    return [];
  },

  async ingestCatalogFile(filename) {
    this.updateStatus('parsing', 20, `Fetching '/pyqs/${filename}' from folder...`);
    try {
      const res = await fetch(`/pyqs/${filename}`);
      if (!res.ok) {
        throw new Error(`Failed to load file /pyqs/${filename} from server directory.`);
      }
      const buffer = await res.arrayBuffer();
      await this.processPdfBuffer(buffer, filename);
    } catch (err) {
      showToast(err.message, "error");
      this.updateStatus('idle', 0, '');
    }
  },

  async ingestUploadedFile(file) {
    this.updateStatus('parsing', 20, `Reading local file '${file.name}'...`);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const buffer = e.target.result;
        await this.processPdfBuffer(buffer, file.name);
      };
      reader.onerror = () => {
        throw new Error("Error reading local file upload.");
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      showToast(err.message, "error");
      this.updateStatus('idle', 0, '');
    }
  },

  async processPdfBuffer(buffer, filename) {
    try {
      this.updateStatus('parsing', 40, "Extracting text using PDF.js library...");
      const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
      let text = '';
      
      const numPages = Math.min(15, pdf.numPages); // Cap parsing to first 15 pages for local storage efficiency
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        text += pageText + '\n';
        
        const prog = 40 + Math.round((i / numPages) * 20);
        this.updateStatus('parsing', prog, `Extracted page ${i}/${numPages}...`);
      }

      this.extractedText = text;
      
      // Proceed to Ingest/Generate questions from the text
      await this.runAiGenerator(text, false);

    } catch (err) {
      showToast(err.message, "error");
      this.updateStatus('idle', 0, '');
    }
  },

  async runAiGenerator(text, generateMore = false) {
    const apiKey = localStorage.getItem('gemini_api_key');
    
    if (!apiKey) {
      this.updateStatus('generating', 80, "Executing local rule-based regex fallback parser...");
      // Execute local parser fallback
      setTimeout(() => {
        const fallbackQs = this.localRegexParse(text);
        this.parsedQuestions = fallbackQs;
        showToast("Extracted questions using local fallback parser.", "warning");
        this.updateStatus('idle', 0, '');
        this.refresh();
      }, 1000);
      return;
    }

    this.updateStatus('generating', 75, generateMore ? "AI generating new similar questions..." : "Gemini AI extracting and structuring questions...");
    
    try {
      const systemPrompt = `You are a professional GATE computer science instructor.
You are given text extracted from a study guide or past exam.
Perform the following:
1. Identify any multiple-choice questions (MCQs) in the text and extract them exactly.
2. ${generateMore ? 'Generate 3 NEW, high-quality, similar practice questions based on the key topics in the text.' : 'If there are fewer than 3 questions in the text, generate similar NEW high-quality GATE questions to output a list of 3-5 questions total.'}
3. For each question, construct a valid JSON object matching this schema:
[
  {
    "subject": "Operating Systems",
    "topic": "Deadlocks",
    "difficulty": "Medium",
    "marks": 2,
    "year": 2025,
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Step-by-step reasoning"
  }
]
Return ONLY a valid JSON array. Do not wrap in markdown code blocks.`;

      const reqPayload = {
        model: 'gemini-1.5-flash',
        contents: [{
          role: 'user',
          parts: [
            { text: systemPrompt },
            { text: "SOURCE TEXT CONTEXT:\n" + text.substring(0, 15000) }
          ]
        }]
      };

      const localKey = localStorage.getItem('gemini_api_key');
      let response;

      if (localKey) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${localKey}`;
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqPayload)
        });
      } else {
        response = await fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqPayload)
        });
      }

      if (!response.ok) {
        throw new Error(`Gemini API returned code ${response.status}`);
      }

      const resData = await response.json();
      const replyText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!replyText) {
        throw new Error("Empty response from AI engine.");
      }

      const list = JSON.parse(replyText.trim());
      if (!Array.isArray(list)) {
        throw new Error("AI output was not structured as an array.");
      }

      this.parsedQuestions = list;
      showToast(generateMore ? "AI generated 3 new questions!" : `AI extracted ${list.length} questions successfully!`, "success");
      this.updateStatus('idle', 0, '');
      this.refresh();

    } catch (err) {
      console.error("AI parse failed:", err);
      showToast(`AI extraction failed: ${err.message}. Falling back to rule-based parser.`, "error");
      
      // Fallback
      const fallbackQs = this.localRegexParse(text);
      this.parsedQuestions = fallbackQs;
      this.updateStatus('idle', 0, '');
      this.refresh();
    }
  },

  localRegexParse(text) {
    const lowerText = text.toLowerCase();
    let subject = "Operating Systems";
    let topic = "General";
    
    if (lowerText.includes("database") || lowerText.includes("dbms") || lowerText.includes("sql") || lowerText.includes("transaction")) {
      subject = "Databases (DBMS)";
      topic = "Normalization / Queries";
    } else if (lowerText.includes("network") || lowerText.includes("tcp") || lowerText.includes("ip") || lowerText.includes("layer")) {
      subject = "Computer Networks (CN)";
      topic = "Protocols";
    } else if (lowerText.includes("algorithm") || lowerText.includes("complexity") || lowerText.includes("sort")) {
      subject = "Algorithms";
      topic = "Complexity Analysis";
    } else if (lowerText.includes("automata") || lowerText.includes("dfa") || lowerText.includes("grammar") || lowerText.includes("regular")) {
      subject = "Theory of Computation (TOC)";
      topic = "Regular Expressions";
    } else if (lowerText.includes("matrix") || lowerText.includes("graph") || lowerText.includes("eigenvalue") || lowerText.includes("probability")) {
      subject = "Engineering Mathematics";
      topic = "Linear Algebra / Discrete Math";
    } else if (lowerText.includes("cache") || lowerText.includes("pipelining") || lowerText.includes("instruction")) {
      subject = "Computer Organization & Architecture (COA)";
      topic = "Cache Pipelining";
    }

    // Logic-driven question extraction:
    // Find segments in the text ending with '?'
    const questionRegex = /([^.!?\n]{20,250}\?)/g;
    const matches = [];
    let match;
    while ((match = questionRegex.exec(text)) !== null && matches.length < 3) {
      const qText = match[1].trim();
      if (qText && !matches.includes(qText)) {
        matches.push(qText);
      }
    }

    // If we couldn't find questions ending in '?', let's extract sentences containing key terms
    if (matches.length < 2) {
      const keySentenceRegex = /([^.!?\n]{30,200}\b(complexity|scheduling|paging|protocol|query|regular|matrix|cache)\b[^.!?\n]*[.!?])/gi;
      while ((match = keySentenceRegex.exec(text)) !== null && matches.length < 3) {
        const qText = match[1].trim() + " What is the correct interpretation of this?";
        if (qText && !matches.includes(qText)) {
          matches.push(qText);
        }
      }
    }

    // Fallbacks if matches are still empty
    if (matches.length === 0) {
      matches.push(`Which of the following describes the correct behavior or complexity of the ${topic} operations?`);
      matches.push(`Consider the system parameters of the ${topic} subsystem. Which option is correct when scaling resources?`);
    }

    return matches.map((extractedQ, idx) => {
      return {
        subject: subject,
        topic: topic,
        difficulty: idx % 2 === 0 ? "Medium" : "Hard",
        marks: idx % 2 === 0 ? 1 : 2,
        year: 2025 - idx,
        question: `[Parsed Fallback Q${idx + 1}]: ${extractedQ}`,
        options: [
          `It behaves optimally under normal workload thresholds.`,
          `It scales non-linearly due to processing constraints.`,
          `It remains constant regardless of scaling factor parameters.`,
          `None of the options listed describe the correct system behavior.`
        ],
        correctAnswer: (idx + 1) % 4,
        explanation: `This question was dynamically parsed from the text content of the uploaded PDF based on keyword context relating to ${topic}.\n\nContext block: "${extractedQ.substring(0, 150)}..."\n\nFor full AI analysis and explanation, please configure your Gemini API Key.`
      };
    });
  },

  updateStatus(status, progress, message) {
    this.ingestStatus = status;
    this.ingestProgress = progress;
    this.ingestMessage = message;
    
    // Update live DOM if loaded to prevent full re-renders interrupting states
    const panel = document.getElementById('ingestion-status-panel');
    const msgEl = document.getElementById('status-msg');
    const barEl = document.getElementById('status-progress-bar');
    const badgeEl = document.getElementById('status-badge');
    
    if (panel) {
      if (status === 'idle') {
        panel.classList.add('hidden');
      } else {
        panel.classList.remove('hidden');
        if (msgEl) msgEl.textContent = message;
        if (barEl) barEl.style.width = `${progress}%`;
        if (badgeEl) badgeEl.textContent = status.toUpperCase();
      }
    }
  },

  async refresh() {
    const mainNode = document.querySelector('main');
    if (mainNode) {
      mainNode.innerHTML = await this.render();
      this.init();
    }
  }
};
