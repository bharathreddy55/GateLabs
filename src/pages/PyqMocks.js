import { db } from '../config/firebase';
import { showToast } from '../utils/toast';
import { MockTest } from './MockTest';

export const PyqMocks = {
  async render() {
    const allQuestions = await db.getQuestions();
    const attempts = await db.getAttempts();

    // Group questions by year
    const yearGroups = {};
    allQuestions.forEach(q => {
      // Exclude TET questions from GATE CS mock test list
      const subLower = (q.subject || '').toLowerCase();
      if (subLower.includes('tet') || subLower.includes('pedagogy') || subLower.includes('language i') || subLower.includes('language ii') || subLower.includes('environmental studies')) {
        return;
      }
      if (q.year) {
        if (!yearGroups[q.year]) {
          yearGroups[q.year] = [];
        }
        yearGroups[q.year].push(q);
      }
    });

    const years = Object.keys(yearGroups).sort((a, b) => b - a);

    // Render stats
    const totalMocks = years.length;
    const totalSolved = attempts.filter(a => a.scope && a.scope.includes('GATE')).length;

    let cardsHtml = '';
    if (years.length === 0) {
      cardsHtml = `
        <div class="col-span-full text-center py-12 glass-panel rounded-3xl">
          <i class="fa-solid fa-folder-open text-slate-400 text-3xl mb-3 block"></i>
          <p class="text-xs text-slate-505 font-bold">No year-wise questions indexed yet.</p>
          <p class="text-[10px] text-slate-400 mt-1 font-semibold">Upload a PDF question paper in the Practice page to ingest it as a mock!</p>
        </div>
      `;
    } else {
      cardsHtml = years.map(year => {
        const questions = yearGroups[year];
        const totalMarks = questions.reduce((acc, curr) => acc + (curr.marks || 1), 0);
        const attempted = attempts.some(a => a.scope === `GATE CS ${year} Previous Year Paper`);
        
        return `
          <div class="glass-card p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden flex flex-col justify-between hover:border-primary-500/30 dark:hover:border-primary-500/20 hover:shadow-lg transition-all duration-300 group">
            <div class="absolute -right-10 -top-10 w-24 h-24 bg-primary-500/5 rounded-full blur-xl group-hover:bg-primary-500/10 transition-all pointer-events-none"></div>
            
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-505 uppercase tracking-wider">GATE CS Paper</span>
                ${attempted 
                  ? '<span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"><i class="fa-solid fa-circle-check mr-1"></i> Attempted</span>'
                  : '<span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"><i class="fa-solid fa-circle-play mr-1"></i> Ready</span>'
                }
              </div>

              <div class="flex items-center gap-3.5 mb-4">
                <div class="h-11 w-11 rounded-2xl bg-gradient-to-tr from-primary-500/15 to-indigo-500/15 text-primary-500 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                  <i class="fa-solid fa-file-invoice"></i>
                </div>
                <div>
                  <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white leading-tight">GATE CS ${year}</h4>
                  <p class="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5 font-semibold">Official Full Year Mock</p>
                </div>
              </div>

              <!-- Quick Info List -->
              <div class="grid grid-cols-2 gap-2 text-[10px] font-extrabold text-slate-505 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-white/5 mb-5">
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-question text-primary-500 text-xs"></i>
                  <span>${questions.length} Questions</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-award text-indigo-500 text-xs"></i>
                  <span>${totalMarks} Marks</span>
                </div>
                <div class="flex items-center gap-1.5 col-span-2">
                  <i class="fa-regular fa-clock text-slate-400 text-xs"></i>
                  <span>180 Minutes (Timed)</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button class="start-pyq-mock-btn px-4 py-2.5 rounded-xl btn-accent text-white text-[11px] font-extrabold shadow-md active:scale-95 transition-all text-center" data-year="${year}">
                Start Mock
              </button>
              <a href="#/practice" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-655 dark:text-slate-300 text-[11px] font-extrabold hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all text-center flex items-center justify-center gap-1">
                Practice
              </a>
            </div>
          </div>
        `;
      }).join('');
    }

    return `
      <div class="flex flex-col gap-6 animate-fade-in font-sans pb-12">
        
        <!-- Header Info Ribbon -->
        <div class="glass-panel p-6 rounded-3xl flex flex-wrap items-center justify-between gap-6 border border-slate-200/60 dark:border-white/[0.07]">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary-500/10 to-indigo-600/10 text-primary-500 flex items-center justify-center text-xl flex-shrink-0">
              <i class="fa-solid fa-file-circle-check"></i>
            </div>
            <div>
              <h3 class="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-tight">Previous Years' Mock Papers</h3>
              <p class="text-xs text-slate-450 dark:text-slate-400 mt-0.5 font-semibold">Simulate authentic previous years' GATE Computer Science exam papers.</p>
            </div>
          </div>
          
          <div class="flex gap-4">
            <div class="bg-slate-100/50 dark:bg-slate-950/20 px-4.5 py-2.5 rounded-2xl border border-slate-200/20 text-center">
              <p class="text-[9px] font-extrabold text-slate-455 uppercase tracking-wider">Indexed Papers</p>
              <p class="font-display font-extrabold text-lg text-slate-900 dark:text-white mt-0.5">${totalMocks}</p>
            </div>
            <div class="bg-slate-100/50 dark:bg-slate-950/20 px-4.5 py-2.5 rounded-2xl border border-slate-200/20 text-center">
              <p class="text-[9px] font-extrabold text-slate-455 uppercase tracking-wider">Mocks Attempted</p>
              <p class="font-display font-extrabold text-lg text-emerald-500 mt-0.5">${totalSolved}</p>
            </div>
          </div>
        </div>

        <!-- Mocks Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${cardsHtml}
        </div>

        <!-- Header Info Ribbon for TET -->
        <div class="glass-panel p-6 rounded-3xl flex flex-wrap items-center justify-between gap-6 border border-slate-200/60 dark:border-white/[0.07] mt-10">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-teal-600/10 text-emerald-500 flex items-center justify-center text-xl flex-shrink-0">
              <i class="fa-solid fa-chalkboard-user"></i>
            </div>
            <div>
              <h3 class="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-tight">TET Mock Exams</h3>
              <p class="text-xs text-slate-450 dark:text-slate-400 mt-0.5 font-semibold">Simulate authentic Paper 1A CBT exam conditions (150 Mins, 150 Qs, no negative marks).</p>
            </div>
          </div>
        </div>

        <!-- TET Mocks Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- TET Mock Card 1 -->
          <div class="glass-card p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/30 dark:hover:border-emerald-500/20 hover:shadow-lg transition-all duration-300 group">
            <div class="absolute -right-10 -bottom-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">AP TET Paper 1A</span>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"><i class="fa-solid fa-circle-play mr-1"></i> Ready</span>
              </div>
              <div class="flex items-center gap-3.5 mb-4">
                <div class="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-500/15 to-teal-500/15 text-emerald-500 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                  <i class="fa-solid fa-file-signature"></i>
                </div>
                <div>
                  <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white leading-tight">TET Practice 1 (Hard)</h4>
                  <p class="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5 font-semibold">Model Paper 3</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[10px] font-extrabold text-slate-505 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-white/5 mb-5">
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-question text-emerald-500 text-xs"></i>
                  <span>150 Questions</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-award text-teal-500 text-xs"></i>
                  <span>150 Marks</span>
                </div>
                <div class="flex items-center gap-1.5 col-span-2">
                  <i class="fa-regular fa-clock text-slate-400 text-xs"></i>
                  <span>150 Minutes (No Negatives)</span>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1">
              <button class="start-tet-mock-btn px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-[11px] font-extrabold shadow-md active:scale-95 transition-all text-center" data-file="tet_practice_1.txt" data-name="TET Practice 1">
                Start Mock
              </button>
            </div>
          </div>

          <!-- TET Mock Card 2 -->
          <div class="glass-card p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/30 dark:hover:border-emerald-500/20 hover:shadow-lg transition-all duration-300 group">
            <div class="absolute -right-10 -bottom-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">AP TET Paper 1A</span>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"><i class="fa-solid fa-circle-play mr-1"></i> Ready</span>
              </div>
              <div class="flex items-center gap-3.5 mb-4">
                <div class="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-500/15 to-teal-500/15 text-emerald-500 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                  <i class="fa-solid fa-file-signature"></i>
                </div>
                <div>
                  <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white leading-tight">TET Practice 2 (Hard)</h4>
                  <p class="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5 font-semibold">Model Paper 2</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[10px] font-extrabold text-slate-505 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-white/5 mb-5">
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-question text-emerald-500 text-xs"></i>
                  <span>150 Questions</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-award text-teal-500 text-xs"></i>
                  <span>150 Marks</span>
                </div>
                <div class="flex items-center gap-1.5 col-span-2">
                  <i class="fa-regular fa-clock text-slate-400 text-xs"></i>
                  <span>150 Minutes (No Negatives)</span>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1">
              <button class="start-tet-mock-btn px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-[11px] font-extrabold shadow-md active:scale-95 transition-all text-center" data-file="tet_practice_2.txt" data-name="TET Practice 2">
                Start Mock
              </button>
            </div>
          </div>

          <!-- TET Mock Card 3 -->
          <div class="glass-card p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/30 dark:hover:border-emerald-500/20 hover:shadow-lg transition-all duration-300 group">
            <div class="absolute -right-10 -top-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">AP TET Paper 1A</span>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"><i class="fa-solid fa-circle-play mr-1"></i> Ready</span>
              </div>
              <div class="flex items-center gap-3.5 mb-4">
                <div class="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-500/15 to-teal-500/15 text-emerald-500 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                  <i class="fa-solid fa-file-signature"></i>
                </div>
                <div>
                  <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white leading-tight">Antigravity 1 Mock</h4>
                  <p class="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5 font-semibold">TET Practice 3 (Hard)</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[10px] font-extrabold text-slate-505 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-white/5 mb-5">
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-question text-emerald-500 text-xs"></i>
                  <span>150 Questions</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-award text-teal-500 text-xs"></i>
                  <span>150 Marks</span>
                </div>
                <div class="flex items-center gap-1.5 col-span-2">
                  <i class="fa-regular fa-clock text-slate-400 text-xs"></i>
                  <span>150 Minutes (No Negatives)</span>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1">
              <button class="start-tet-mock-btn px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-[11px] font-extrabold shadow-md active:scale-95 transition-all text-center" data-file="antigravity_1.txt" data-name="Antigravity 1 Mock">
                Start Mock
              </button>
            </div>
          </div>

          <!-- TET Mock Card 4 -->
          <div class="glass-card p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/30 dark:hover:border-emerald-500/20 hover:shadow-lg transition-all duration-300 group">
            <div class="absolute -right-10 -top-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">AP TET Paper 1A</span>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"><i class="fa-solid fa-circle-play mr-1"></i> Ready</span>
              </div>
              <div class="flex items-center gap-3.5 mb-4">
                <div class="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-500/15 to-teal-500/15 text-emerald-500 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                  <i class="fa-solid fa-file-signature"></i>
                </div>
                <div>
                  <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white leading-tight">AP TET Medium Paper</h4>
                  <p class="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5 font-semibold">TET Practice 4 (Medium)</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[10px] font-extrabold text-slate-505 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-white/5 mb-5">
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-question text-emerald-500 text-xs"></i>
                  <span>150 Questions</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-award text-teal-500 text-xs"></i>
                  <span>150 Marks</span>
                </div>
                <div class="flex items-center gap-1.5 col-span-2">
                  <i class="fa-regular fa-clock text-slate-400 text-xs"></i>
                  <span>150 Minutes (No Negatives)</span>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1">
              <button class="start-tet-mock-btn px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-[11px] font-extrabold shadow-md active:scale-95 transition-all text-center" data-file="ap_tet_medium.txt" data-name="AP TET Medium Paper">
                Start Mock
              </button>
          </div>

          <!-- TET Mock Card 5 -->
          <div class="glass-card p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/30 dark:hover:border-emerald-500/20 hover:shadow-lg transition-all duration-300 group">
            <div class="absolute -right-10 -top-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">AP TET Paper 1A</span>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"><i class="fa-solid fa-circle-play mr-1"></i> Ready</span>
              </div>
              <div class="flex items-center gap-3.5 mb-4">
                <div class="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-500/15 to-teal-500/15 text-emerald-500 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                  <i class="fa-solid fa-file-signature"></i>
                </div>
                <div>
                  <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white leading-tight">Model Paper 4 (Very Hard)</h4>
                  <p class="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5 font-semibold">TET Practice 5 (Very Hard)</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[10px] font-extrabold text-slate-505 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-white/5 mb-5">
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-question text-emerald-500 text-xs"></i>
                  <span>150 Questions</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i class="fa-solid fa-award text-teal-500 text-xs"></i>
                  <span>150 Marks</span>
                </div>
                <div class="flex items-center gap-1.5 col-span-2">
                  <i class="fa-regular fa-clock text-slate-400 text-xs"></i>
                  <span>150 Minutes (No Negatives)</span>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1">
              <button class="start-tet-mock-btn px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-[11px] font-extrabold shadow-md active:scale-95 transition-all text-center" data-file="ap_tet_very_hard.txt" data-name="AP TET Model Paper 4 (Very Hard)">
                Start Mock
              </button>
            </div>
          </div>
          
        </div>

      </div>
    `;
  },

  async init() {
    window.scrollTo(0, 0);

    // Bind Start Mock button triggers
    document.querySelectorAll('.start-pyq-mock-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const year = btn.getAttribute('data-year');
        showToast(`Loading GATE ${year} Mock Paper...`, "info");

        // Query all questions for this year
        const allQs = await db.getQuestions({ year });

        if (allQs.length === 0) {
          showToast(`No questions found in the database for year ${year}.`, "warning");
          return;
        }

        // Sort questions logically by subject & topic
        const sortedQs = allQs.sort((a, b) => {
          if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
          return a.topic.localeCompare(b.topic);
        });

        // Seed simulator state (MockTest configuration)
        MockTest.questions = sortedQs;
        MockTest.isTesting = true;
        MockTest.currentIdx = 0;
        MockTest.answers = {};
        MockTest.status = {};
        MockTest.timeLeft = 180 * 60; // 180 Mins (3 Hours standard exam time)
        MockTest.totalTime = 180 * 60;
        MockTest.selectedSubject = `GATE CS ${year} Previous Year Paper`;
        MockTest.selectedTopic = 'All';
        MockTest.calcLeft = undefined;
        MockTest.calcTop = undefined;

        // Group into sections
        MockTest.sections = {};
        MockTest.questions.forEach((q, idx) => {
          const secName = q.subject ? (q.subject.split(': ')[1] || q.subject) : 'General';
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

        // Start countdown timer
        MockTest.startTimer();

        // Redirect to Mock Test route to render simulator
        window.location.hash = '#/mock-test';
      });
    });

    // Bind Start TET Mock button triggers
    document.querySelectorAll('.start-tet-mock-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const file = btn.getAttribute('data-file');
        const name = btn.getAttribute('data-name');
        showToast(`Loading ${name} Mock Paper...`, "info");
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Loading...';

        try {
          const res = await fetch(`./pyqs/${file}`);
          if (!res.ok) throw new Error("Failed to fetch mock paper.");
          const text = await res.text();
          
          // Parse questions
          const parsed = [];
          const rawBlocks = text.split(/---/);
          rawBlocks.forEach((block, index) => {
            const trimmed = block.trim();
            if (!trimmed) return;

            const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
            let questionText = '';
            let options = [];
            let correctAnswer = 0;
            let explanation = '';
            let subject = '';
            let topic = 'General';

            lines.forEach(line => {
              const lower = line.toLowerCase();
              if (lower.startsWith('subject:')) {
                subject = line.substring(8).trim();
              } else if (lower.startsWith('topic:')) {
                topic = line.substring(6).trim();
              } else if (lower.startsWith('question:')) {
                questionText = line.substring(9).trim();
              } else if (lower.startsWith('option a:') || line.startsWith('A)')) {
                options[0] = lower.startsWith('option a:') ? line.substring(9).trim() : line.substring(line.indexOf(')') + 1).trim();
              } else if (lower.startsWith('option b:') || line.startsWith('B)')) {
                options[1] = lower.startsWith('option b:') ? line.substring(9).trim() : line.substring(line.indexOf(')') + 1).trim();
              } else if (lower.startsWith('option c:') || line.startsWith('C)')) {
                options[2] = lower.startsWith('option c:') ? line.substring(9).trim() : line.substring(line.indexOf(')') + 1).trim();
              } else if (lower.startsWith('option d:') || line.startsWith('D)')) {
                options[3] = lower.startsWith('option d:') ? line.substring(9).trim() : line.substring(line.indexOf(')') + 1).trim();
              } else if (lower.startsWith('correct:') || lower.startsWith('answer:')) {
                const val = line.substring(line.indexOf(':') + 1).trim().toUpperCase();
                correctAnswer = val.includes('A') || val === '0' ? 0 : (val.includes('B') || val === '1' ? 1 : (val.includes('C') || val === '2' ? 2 : 3));
              } else if (lower.startsWith('explanation:')) {
                explanation = line.substring(12).trim();
              }
            });

            if (questionText && options.length > 0) {
              const qNum = parsed.length + 1;
              let subjectName = subject || 'Child Development & Pedagogy (1-30)';
              if (qNum > 30 && qNum <= 60) subjectName = 'Language I (31-60)';
              else if (qNum > 60 && qNum <= 90) subjectName = 'Language II (61-90)';
              else if (qNum > 90 && qNum <= 120) subjectName = 'Mathematics (91-120)';
              else if (qNum > 120) subjectName = 'Environmental Studies (121-150)';

              parsed.push({
                id: `q_tet_${Date.now()}_${index}`,
                type: 'MCQ',
                question: questionText,
                options,
                correctAnswer,
                explanation,
                marks: 1,
                subject: subjectName,
                topic,
                difficulty: 'Medium',
                year: 2026
              });
            }
          });

          if (parsed.length === 0) throw new Error("No questions parsed.");

          // Seed simulator state (MockTest configuration)
          MockTest.questions = parsed;
          MockTest.isTesting = true;
          MockTest.currentIdx = 0;
          MockTest.answers = {};
          MockTest.status = {};
          MockTest.timeLeft = 150 * 60; // 150 Mins for TET
          MockTest.totalTime = 150 * 60;
          MockTest.selectedSubject = name;
          MockTest.selectedTopic = 'All';
          MockTest.calcLeft = undefined;
          MockTest.calcTop = undefined;

          // Group into sections
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

          // Start countdown timer
          MockTest.startTimer();

          // Redirect to Mock Test route
          window.location.hash = '#/mock-test';

        } catch (err) {
          showToast("Error loading exam: " + err.message, "error");
        } finally {
          btn.disabled = false;
          btn.innerHTML = 'Start Mock';
        }
      });
    });
  }
};
