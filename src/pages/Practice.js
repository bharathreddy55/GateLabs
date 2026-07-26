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

    const bookmarks = await db.getBookmarks();
    this.bookmarkedIds = new Set(bookmarks.map(b => b.id));

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
                    <button class="bookmark-btn px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white/20 dark:bg-slate-900/20 text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5" data-qid="${q.id}">
                      <i class="${this.bookmarkedIds.has(q.id) ? 'fa-solid fa-bookmark text-amber-500 animate-bounce-short' : 'fa-regular fa-bookmark'}"></i> 
                      <span>${this.bookmarkedIds.has(q.id) ? 'Bookmarked' : 'Bookmark'}</span>
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
                <button id="import-all-btn" class="px-5 py-2.5 text-xs font-bold text-white btn-accent rounded-xl shadow-md transition-all flex items-center gap-1.5 select-none hover:scale-102 active:scale-95 duration-100">
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

        const bookmarkBtn = panel.querySelector('.bookmark-btn');
        bookmarkBtn?.addEventListener('click', async () => {
          const questionObj = this.questions.find(q => q.id === qid);
          if (!questionObj) return;

          const isBookmarked = this.bookmarkedIds.has(qid);
          if (isBookmarked) {
            await db.deleteBookmark(qid);
            this.bookmarkedIds.delete(qid);
            bookmarkBtn.innerHTML = `<i class="fa-regular fa-bookmark"></i> <span>Bookmark</span>`;
            showToast("Bookmark removed", "info");
          } else {
            await db.saveBookmark(questionObj);
            this.bookmarkedIds.add(qid);
            bookmarkBtn.innerHTML = `<i class="fa-solid fa-bookmark text-amber-500 animate-bounce-short"></i> <span class="text-amber-500">Bookmarked</span>`;
            showToast("Question bookmarked!", "success");
          }
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
      this.updateStatus('parsing', 20, "Extracting text using PDF.js library...");
      const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
      let text = '';

      // Parse ALL pages — no artificial cap
      const totalPages = pdf.numPages;
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        // Preserve line breaks by joining items with newlines when Y position changes significantly
        let lastY = null;
        let pageText = '';
        for (const item of textContent.items) {
          const y = item.transform ? item.transform[5] : null;
          if (lastY !== null && y !== null && Math.abs(y - lastY) > 5) {
            pageText += '\n';
          }
          pageText += item.str + ' ';
          lastY = y;
        }
        text += pageText + '\n';

        const prog = 20 + Math.round((i / totalPages) * 35);
        this.updateStatus('parsing', prog, `Extracted page ${i}/${totalPages}...`);
      }

      this.extractedText = text;

      // Proceed to ingest/generate questions from the text
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
      setTimeout(() => {
        const fallbackQs = this.localRegexParse(text);
        this.parsedQuestions = fallbackQs;
        showToast("Extracted questions using local fallback parser.", "warning");
        this.updateStatus('idle', 0, '');
        this.refresh();
      }, 1000);
      return;
    }

    this.updateStatus('generating', 60, generateMore ? "AI generating new similar questions..." : "Gemini AI extracting ALL questions from PDF...");

    // ── Chunking strategy ──────────────────────────────────────────────
    // Gemini 1.5 Flash can handle ~30k tokens per request.
    // We use 20,000 char chunks (≈ 15k tokens) with 500 char overlap
    // so questions split across chunk boundaries are still captured.
    const CHUNK_SIZE = 20000;
    const OVERLAP    = 500;
    const chunks = [];

    if (generateMore || text.length <= CHUNK_SIZE) {
      chunks.push(text);
    } else {
      let pos = 0;
      while (pos < text.length) {
        chunks.push(text.substring(pos, pos + CHUNK_SIZE));
        pos += CHUNK_SIZE - OVERLAP;
      }
    }

    const systemPromptExtract = `You are a professional GATE computer science exam question extractor.
You are given a segment of text extracted from a PDF (study guide, past exam, or notes).

Your task:
1. Extract EVERY multiple-choice question (MCQ) present in this text segment. Do NOT skip any.
2. For questions where options are labelled (A) (B) (C) (D) or 1 2 3 4, extract them as the options array.
3. If the correct answer is indicated (e.g. "Answer: B" or "Ans: 2"), use it as correctAnswer (0-indexed integer).
4. If the correct answer is NOT given, set correctAnswer to 0 as a placeholder.
5. If no complete MCQ is found in this segment, return an empty array [].

Return ONLY a valid JSON array with this exact schema — no markdown, no explanation:
[
  {
    "subject": "Operating Systems",
    "topic": "Deadlocks",
    "difficulty": "Medium",
    "marks": 1,
    "year": 2024,
    "question": "Full question text here",
    "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
    "correctAnswer": 0,
    "explanation": "Brief explanation or leave empty string"
  }
]`;

    const systemPromptGenerate = `You are a professional GATE computer science instructor.
Based on the topics and concepts in the provided text, generate as many high-quality NEW GATE-style MCQ practice questions as possible (aim for at least 10-20).
Return ONLY a valid JSON array — no markdown:
[
  {
    "subject": "Operating Systems",
    "topic": "Deadlocks",
    "difficulty": "Medium",
    "marks": 1,
    "year": 2025,
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "Step-by-step reasoning"
  }
]`;

    const systemPrompt = generateMore ? systemPromptGenerate : systemPromptExtract;

    const localKey = apiKey;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${localKey}`;

    let allQuestions = [];

    try {
      for (let ci = 0; ci < chunks.length; ci++) {
        const chunkLabel = chunks.length > 1 ? ` (chunk ${ci + 1}/${chunks.length})` : '';
        this.updateStatus('generating',
          60 + Math.round((ci / chunks.length) * 35),
          `Gemini extracting questions${chunkLabel}...`);

        const reqPayload = {
          contents: [{
            role: 'user',
            parts: [
              { text: systemPrompt },
              { text: `PDF TEXT SEGMENT${chunkLabel}:\n\n${chunks[ci]}` }
            ]
          }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 8192
          }
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqPayload)
        });

        if (!response.ok) {
          console.warn(`Gemini chunk ${ci + 1} returned ${response.status} — skipping`);
          continue;
        }

        const resData = await response.json();
        const replyText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!replyText) continue;

        // Strip accidental markdown code fences
        const cleaned = replyText.trim().replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();

        try {
          const list = JSON.parse(cleaned);
          if (Array.isArray(list)) {
            allQuestions.push(...list);
          }
        } catch (parseErr) {
          console.warn(`Chunk ${ci + 1} JSON parse failed:`, parseErr.message);
        }
      }

      // Deduplicate by question text
      const seen = new Set();
      allQuestions = allQuestions.filter(q => {
        const key = (q.question || '').trim().substring(0, 80);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (allQuestions.length === 0) {
        throw new Error("No questions could be extracted. The PDF may not contain MCQs or the text is unreadable.");
      }

      this.parsedQuestions = allQuestions;
      showToast(generateMore
        ? `AI generated ${allQuestions.length} new questions!`
        : `Extracted ${allQuestions.length} questions from PDF ✓`,
        "success");
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
    // ═══════════════════════════════════════════════════════════════════
    //  SMART GATE-FORMAT LOCAL PARSER  (no API key required)
    //  Handles the most common GATE PYQ / study-material PDF structures:
    //
    //  Pattern A — Numbered with labelled options:
    //    Q.1  Which of the following...?
    //    (A) opt1  (B) opt2  (C) opt3  (D) opt4
    //    Ans: (B)
    //
    //  Pattern B — Plain numbered:
    //    1. Which of the following...?
    //    (a) opt1  (b) opt2  (c) opt3  (d) opt4
    //    Answer: C
    //
    //  Pattern C — Section-numbered:
    //    Q25. Consider the following...
    //    A) opt1   B) opt2   C) opt3   D) opt4
    // ═══════════════════════════════════════════════════════════════════

    // ── Step 1: Detect subject from keywords ──────────────────────────
    const lowerText = text.toLowerCase();
    const detectSubject = (t) => {
      if (t.includes('database') || t.includes('dbms') || t.includes('sql') || t.includes('relational') || t.includes('normalization')) return ['Databases (DBMS)', 'SQL & Normalization'];
      if (t.includes('network') || t.includes('tcp') || t.includes('udp') || t.includes('ip address') || t.includes('routing')) return ['Computer Networks (CN)', 'Protocols & Routing'];
      if (t.includes('automata') || t.includes('dfa') || t.includes('nfa') || t.includes('grammar') || t.includes('turing') || t.includes('pushdown')) return ['Theory of Computation (TOC)', 'Automata & Languages'];
      if (t.includes('process') || t.includes('deadlock') || t.includes('semaphore') || t.includes('scheduling') || t.includes('paging') || t.includes('virtual memory')) return ['Operating Systems', 'Process Management'];
      if (t.includes('algorithm') || t.includes('complexity') || t.includes('sorting') || t.includes('dynamic programming') || t.includes('graph traversal')) return ['Algorithms', 'Algorithm Design'];
      if (t.includes('data structure') || t.includes('tree') || t.includes('linked list') || t.includes('stack') || t.includes('queue') || t.includes('heap')) return ['Data Structures', 'Trees & Graphs'];
      if (t.includes('cache') || t.includes('pipeline') || t.includes('instruction set') || t.includes('risc') || t.includes('cisc') || t.includes('bus')) return ['Computer Organization & Architecture (COA)', 'Pipelining & Cache'];
      if (t.includes('compiler') || t.includes('lexical') || t.includes('parsing') || t.includes('code generation') || t.includes('symbol table')) return ['Compiler Design', 'Parsing & Code Gen'];
      if (t.includes('matrix') || t.includes('eigenvalue') || t.includes('probability') || t.includes('differential') || t.includes('calculus') || t.includes('set theory')) return ['Engineering Mathematics', 'Linear Algebra & Calculus'];
      if (t.includes('digital') || t.includes('logic gate') || t.includes('boolean') || t.includes('flip flop') || t.includes('karnaugh')) return ['Digital Logic (DL)', 'Boolean Algebra'];
      if (t.includes('software') || t.includes('agile') || t.includes('sdlc') || t.includes('testing') || t.includes('uml')) return ['Software Engineering', 'SDLC & Testing'];
      if (t.includes('c programming') || t.includes('pointer') || t.includes('struct ') || t.includes('malloc') || t.includes('recursion')) return ['Programming & DS', 'C & Recursion'];
      return ['General CS', 'Mixed Topics'];
    };
    const [subject, topic] = detectSubject(lowerText);

    const detectDifficulty = (qText) => {
      const l = qText.toLowerCase();
      if (l.includes('consider') || l.includes('following statements') || l.includes('which of the following is true')) return 'Medium';
      if (l.includes('minimum') || l.includes('maximum') || l.includes('optimal') || l.includes('worst case') || l.includes('how many')) return 'Hard';
      return 'Easy';
    };

    const detectMarks = (qText) => {
      if (qText.toLowerCase().includes('consider') || qText.length > 200) return 2;
      return 1;
    };

    // ── Step 2: Parse year from text header ──────────────────────────
    const yearMatch = text.match(/\b(20\d{2})\b/);
    const baseYear = yearMatch ? parseInt(yearMatch[1]) : 2024;

    // ── Step 3: Split text into lines & normalise ──────────────────────
    const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean);

    // ── Step 4: State-machine parser ─────────────────────────────────
    //  States: IDLE → READING_QUESTION → READING_OPTIONS → DONE
    const questions = [];

    // Regex patterns for question starters
    const qStartPatterns = [
      /^Q\s*[\.\-\s]?\s*(\d+)\s*[\.\):]?\s+(.+)/i,   // Q.1, Q1, Q-1, Q 1
      /^(\d+)\s*[\.\)]\s+(.+)/,                         // 1. or 1)
      /^Question\s+(\d+)\s*[\.\:]?\s*(.+)/i,            // Question 1:
      /^Ques\s*[\.\-]?\s*(\d+)\s*[\.\):]?\s*(.+)/i,    // Ques.1
    ];

    // Regex patterns for options
    const optPatterns = [
      /^\s*\(([A-Da-d])\)\s*(.+)/,     // (A) text
      /^\s*([A-Da-d])\s*[\.\)]\s*(.+)/, // A. text  or  A) text
      /^\s*\(([1-4])\)\s*(.+)/,         // (1) text
      /^\s*([1-4])\s*[\.\)]\s*(.+)/,    // 1. text  or  1) text
    ];

    // Regex for answer line
    const answerPatterns = [
      /^(?:ans(?:wer)?|correct\s+(?:answer|option|choice))\s*[\:\-\.]?\s*\(?([A-Da-d1-4])\)?/i,
      /^(?:key|solution)\s*[\:\-\.]?\s*\(?([A-Da-d1-4])\)?/i,
    ];

    const letterToIndex = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 };

    let currentQ = null;

    const saveQuestion = () => {
      if (!currentQ || !currentQ.question || currentQ.question.length < 10) return;
      // Pad missing options with placeholders
      while (currentQ.options.length < 4) {
        currentQ.options.push(`Option ${String.fromCharCode(65 + currentQ.options.length)}`);
      }
      questions.push({ ...currentQ });
      currentQ = null;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // ── Check for answer line ────────────────────────────────────
      if (currentQ) {
        let ansFound = false;
        for (const ap of answerPatterns) {
          const am = line.match(ap);
          if (am) {
            const letter = am[1].toLowerCase();
            currentQ.correctAnswer = letterToIndex[letter] ?? 0;
            ansFound = true;
            break;
          }
        }
        if (ansFound) continue;
      }

      // ── Check for option line ────────────────────────────────────
      if (currentQ) {
        let optFound = false;
        for (const op of optPatterns) {
          const om = line.match(op);
          if (om) {
            const optText = om[2].trim();
            if (optText.length > 0 && currentQ.options.length < 4) {
              currentQ.options.push(optText);
              optFound = true;
              break;
            }
          }
        }
        // Options can also be on the same line as each other: "(A) x  (B) y  (C) z  (D) w"
        if (!optFound && currentQ && currentQ.options.length === 0) {
          const inlineOpts = line.match(/\(([A-Da-d])\)\s*([^(]{1,80})/g);
          if (inlineOpts && inlineOpts.length >= 2) {
            inlineOpts.forEach(o => {
              const m = o.match(/\(([A-Da-d])\)\s*(.+)/);
              if (m && currentQ.options.length < 4) currentQ.options.push(m[2].trim());
            });
            optFound = true;
          }
        }
        if (optFound) continue;
      }

      // ── Check for new question start ─────────────────────────────
      let newQFound = false;
      for (const qp of qStartPatterns) {
        const qm = line.match(qp);
        if (qm) {
          saveQuestion(); // save previous
          let qText = qm[2] ? qm[2].trim() : '';

          // Absorb continuation lines until we hit an option or blank
          let j = i + 1;
          while (j < lines.length) {
            const nextLine = lines[j];
            const isOpt = optPatterns.some(op => nextLine.match(op));
            const isNewQ = qStartPatterns.some(qp2 => nextLine.match(qp2));
            const isAns = answerPatterns.some(ap => nextLine.match(ap));
            const hasInlineOpts = /\([A-Da-d]\)\s/.test(nextLine);
            if (isOpt || isNewQ || isAns || hasInlineOpts || nextLine.length === 0) break;
            qText += ' ' + nextLine;
            j++;
          }
          i = j - 1; // advance outer loop

          currentQ = {
            subject,
            topic,
            difficulty: detectDifficulty(qText),
            marks: detectMarks(qText),
            year: baseYear,
            question: qText.trim(),
            options: [],
            correctAnswer: 0,
            explanation: `Extracted directly from PDF using local GATE-format parser (no API key required).`
          };
          newQFound = true;
          break;
        }
      }
      if (newQFound) continue;

      // ── Absorb trailing question text (multi-line question body) ──
      if (currentQ && currentQ.options.length === 0 && line.length > 5) {
        // Append if it looks like continuation (not an option, not an answer)
        const isOpt = optPatterns.some(op => line.match(op));
        const isAns = answerPatterns.some(ap => line.match(ap));
        if (!isOpt && !isAns) {
          currentQ.question += ' ' + line;
        }
      }
    }

    saveQuestion(); // save last question

    // ── Step 5: If structural parse found nothing, try sentence parse ──
    if (questions.length === 0) {
      const qSentences = [];
      const sentenceRe = /([^.!?\n]{25,350}(?:which|how|what|when|where|why|find|determine|calculate|consider)[^.!?\n]{0,200}[?])/gi;
      let sm;
      while ((sm = sentenceRe.exec(text)) !== null) {
        const q = sm[1].trim();
        if (q && !qSentences.includes(q)) qSentences.push(q);
      }

      qSentences.forEach((q, idx) => {
        questions.push({
          subject, topic,
          difficulty: detectDifficulty(q),
          marks: detectMarks(q),
          year: baseYear - (idx % 3),
          question: q,
          options: [
            'Option A — see original PDF for choices',
            'Option B — see original PDF for choices',
            'Option C — see original PDF for choices',
            'Option D — see original PDF for choices',
          ],
          correctAnswer: 0,
          explanation: 'Options could not be automatically parsed. Please refer to the original PDF. For full extraction, configure a Gemini API key in sidebar → Config.'
        });
      });
    }

    const total = questions.length;
    if (total > 0) {
      showToast(`📄 Local parser extracted ${total} question${total > 1 ? 's' : ''} (no API key used)`, 'success');
    } else {
      showToast('Could not find structured MCQs. PDF may use images/scanned text. Try a Gemini API key for better results.', 'warning');
    }

    return questions;
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
