import { db, SUBJECT_SYLLABUS } from '../config/firebase';
import { showToast } from '../utils/toast';

export const Analytics = {
  // State
  viewMode: 'list',        // 'list' | 'detail'
  activeAttemptId: null,
  selectedSubjectFilter: '',

  async render() {
    // Support deep-link: #/analytics?id=<attemptId>
    const urlHash = window.location.hash;
    const queryParams = new URLSearchParams(urlHash.split('?')[1] || '');
    const urlAttemptId = queryParams.get('id');

    if (urlAttemptId) {
      this.viewMode = 'detail';
      this.activeAttemptId = urlAttemptId;
    }

    if (this.viewMode === 'detail' && this.activeAttemptId) {
      return this.renderAttemptDetail(this.activeAttemptId);
    }
    return this.renderAttemptList();
  },

  // ─────────────────────────────────────────────────────────────
  // ATTEMPT LIST VIEW
  // ─────────────────────────────────────────────────────────────
  async renderAttemptList() {
    const attempts = await db.getAttempts();

    if (attempts.length === 0) {
      return `
        <div class="flex flex-col gap-8">
          <!-- Header -->
          <div>
            <h3 class="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Mistake Analysis</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">All your past mock test attempts and performance analysis.</p>
          </div>
          <div class="glass-panel p-16 text-center rounded-2xl flex flex-col items-center justify-center">
            <div class="h-20 w-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-400 rounded-full flex items-center justify-center text-3xl mb-6">
              <i class="fa-solid fa-clipboard-list"></i>
            </div>
            <h4 class="font-display font-bold text-xl text-slate-700 dark:text-slate-300">No Attempts Yet</h4>
            <p class="text-sm text-slate-400 dark:text-slate-500 mt-2 max-w-xs">Complete a mock test to see your performance analysis, score breakdown, and mistake archive here.</p>
            <a href="#/mock-test" class="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-600/20 transition-all active:scale-95">
              <i class="fa-solid fa-play"></i> Start a Mock Test
            </a>
          </div>
        </div>
      `;
    }

    // Aggregate stats
    const totalTests = attempts.length;
    const avgScore = (attempts.reduce((s, a) => s + a.score, 0) / totalTests).toFixed(1);
    const avgAccuracy = Math.round(attempts.reduce((s, a) => s + a.accuracy, 0) / totalTests);
    const totalMistakes = attempts.reduce((s, a) => s + (a.mistakes?.length || 0), 0);

    // Subject weakness analysis
    const subjectMistakeCounts = {};
    attempts.forEach(a => (a.mistakes || []).forEach(m => {
      subjectMistakeCounts[m.subject] = (subjectMistakeCounts[m.subject] || 0) + 1;
    }));
    const weakestSubject = Object.keys(subjectMistakeCounts).sort((a, b) => subjectMistakeCounts[b] - subjectMistakeCounts[a])[0];

    return `
      <div class="flex flex-col gap-8">
        <!-- Page Header -->
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 class="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Mistake Analysis</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Click on any attempt to view detailed question-by-question analysis.</p>
          </div>
          <a href="#/mock-test" class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-primary-600/20 transition-all active:scale-95">
            <i class="fa-solid fa-plus"></i> New Mock Test
          </a>
        </div>

        <!-- Summary Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="glass-panel p-5 rounded-2xl text-center">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Attempts</p>
            <h3 class="font-display font-extrabold text-3xl text-primary-600 dark:text-primary-400 mt-1">${totalTests}</h3>
          </div>
          <div class="glass-panel p-5 rounded-2xl text-center">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Score</p>
            <h3 class="font-display font-extrabold text-3xl text-emerald-500 dark:text-emerald-400 mt-1">${avgScore}</h3>
          </div>
          <div class="glass-panel p-5 rounded-2xl text-center">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Accuracy</p>
            <h3 class="font-display font-extrabold text-3xl text-indigo-500 dark:text-indigo-400 mt-1">${avgAccuracy}%</h3>
          </div>
          <div class="glass-panel p-5 rounded-2xl text-center">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Weakest Topic</p>
            <h3 class="font-display font-bold text-sm text-rose-500 dark:text-rose-400 mt-2 leading-tight">${weakestSubject || 'None yet'}</h3>
          </div>
        </div>

        <!-- Attempts List -->
        <div>
          <h4 class="font-display font-bold text-lg text-slate-900 dark:text-white mb-4">
            <i class="fa-solid fa-history mr-2 text-primary-500"></i>Attempt History
          </h4>
          <div class="flex flex-col gap-3" id="attempts-list-container">
            ${attempts.map((att, i) => {
              const date = new Date(att.timestamp);
              const dateStr = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
              const timeStr = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
              const minutes = Math.floor(att.timeSpentSeconds / 60);
              const seconds = att.timeSpentSeconds % 60;
              const accuracy = att.accuracy || 0;
              const accuracyColor = accuracy >= 70 ? 'text-emerald-500' : accuracy >= 40 ? 'text-amber-500' : 'text-rose-500';
              const scorePct = att.totalPossibleMarks > 0 ? Math.round((att.score / att.totalPossibleMarks) * 100) : 0;
              const mistakeCount = att.mistakes?.length || 0;
              
              return `
              <div class="glass-panel rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60 hover:border-primary-500/40 transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/5 group cursor-pointer attempt-card"
                   data-attempt-id="${att.id}">
                <div class="flex items-center gap-4 p-5">
                  
                  <!-- Attempt number badge -->
                  <div class="flex-shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-display font-extrabold text-sm shadow-md shadow-primary-500/20">
                    #${totalTests - i}
                  </div>

                  <!-- Main Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="font-display font-bold text-slate-900 dark:text-white text-sm truncate">${att.scope || 'Mock Test'}</span>
                      <span class="px-2 py-0.5 text-[10px] font-bold rounded-full ${att.mode === 'Full-Length' ? 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' : 'bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400'}">${att.mode}</span>
                    </div>
                    <div class="flex items-center gap-3 mt-1 text-[11px] text-slate-400 flex-wrap">
                      <span><i class="fa-regular fa-calendar mr-1"></i>${dateStr} at ${timeStr}</span>
                      <span><i class="fa-regular fa-clock mr-1"></i>${minutes}m ${seconds}s</span>
                      <span><i class="fa-solid fa-bug mr-1 text-rose-400"></i>${mistakeCount} mistake${mistakeCount !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <!-- Score metrics -->
                  <div class="flex-shrink-0 flex items-center gap-4 pr-2">
                    <div class="text-center hidden sm:block">
                      <p class="text-[10px] font-bold text-slate-400 uppercase">Score</p>
                      <p class="font-display font-extrabold text-lg text-slate-800 dark:text-slate-200">${att.score}<span class="text-xs text-slate-400 font-normal">/${att.totalPossibleMarks}</span></p>
                    </div>
                    <div class="text-center hidden sm:block">
                      <p class="text-[10px] font-bold text-slate-400 uppercase">Accuracy</p>
                      <p class="font-display font-extrabold text-lg ${accuracyColor}">${accuracy}%</p>
                    </div>

                    <!-- Score ring -->
                    <div class="relative h-12 w-12 flex-shrink-0">
                      <svg class="h-full w-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9" fill="none" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="3"></circle>
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="${accuracy >= 70 ? '#22c55e' : accuracy >= 40 ? '#f59e0b' : '#ef4444'}" stroke-width="3"
                          stroke-dasharray="${scorePct} 100" stroke-linecap="round"></circle>
                      </svg>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-[10px] font-extrabold ${accuracyColor}">${scorePct}%</span>
                      </div>
                    </div>

                    <!-- Arrow icon -->
                    <i class="fa-solid fa-chevron-right text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"></i>
                  </div>
                </div>

                <!-- Progress bar -->
                <div class="h-1 bg-slate-100 dark:bg-slate-800">
                  <div class="h-1 transition-all duration-500 ${accuracy >= 70 ? 'bg-emerald-500' : accuracy >= 40 ? 'bg-amber-500' : 'bg-rose-500'}" style="width: ${accuracy}%"></div>
                </div>

                <!-- Delete button row -->
                <div class="px-5 py-2.5 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-darkbg-50/20 flex justify-between items-center">
                  <span class="text-[10px] text-slate-400">
                    ${att.correctCount} correct · ${att.wrongCount} wrong · ${att.skippedCount} skipped
                  </span>
                  <button class="delete-attempt-btn flex items-center gap-1.5 text-[11px] font-bold text-rose-400 hover:text-rose-600 dark:text-rose-500 dark:hover:text-rose-400 transition-colors px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
                          data-attempt-id="${att.id}" onclick="event.stopPropagation()">
                    <i class="fa-solid fa-trash-can"></i> Delete
                  </button>
                </div>
              </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // ─────────────────────────────────────────────────────────────
  // ATTEMPT DETAIL VIEW
  // ─────────────────────────────────────────────────────────────
  async renderAttemptDetail(attemptId) {
    const attempts = await db.getAttempts();
    const att = attempts.find(a => a.id === attemptId);

    if (!att) {
      return `
        <div class="glass-panel p-8 rounded-2xl text-center">
          <i class="fa-solid fa-triangle-exclamation text-rose-500 text-3xl mb-4"></i>
          <h4 class="font-display font-bold text-lg text-slate-800 dark:text-white">Attempt Not Found</h4>
          <p class="text-xs text-slate-400 mt-1">We couldn't retrieve this mock test attempt.</p>
          <button id="btn-back-to-list" class="inline-flex mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg text-xs font-semibold">
            ← Back to Attempts
          </button>
        </div>
      `;
    }

    const date = new Date(att.timestamp);
    const dateStr = date.toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
    const timeStr = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const minutes = Math.floor(att.timeSpentSeconds / 60);
    const seconds = att.timeSpentSeconds % 60;
    const accuracy = att.accuracy || 0;

    // Subject breakdown from mistakes
    const subjectBreakdown = {};
    (att.mistakes || []).forEach(m => {
      if (!subjectBreakdown[m.subject]) subjectBreakdown[m.subject] = { hard: 0, medium: 0, easy: 0, total: 0 };
      subjectBreakdown[m.subject][m.difficulty?.toLowerCase() || 'medium']++;
      subjectBreakdown[m.subject].total++;
    });

    return `
      <div class="flex flex-col gap-8">
        <!-- Header -->
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-3">
            <button id="btn-back-to-list" class="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 transition-all">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <div>
              <h3 class="font-display font-bold text-xl text-slate-900 dark:text-white">${att.scope || 'Mock Test'} — Analysis</h3>
              <p class="text-xs text-slate-400 mt-0.5">${dateStr} · ${timeStr}</p>
            </div>
          </div>
          <button id="btn-delete-this-attempt" class="flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-500 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-all" data-attempt-id="${att.id}">
            <i class="fa-solid fa-trash-can"></i> Delete Attempt
          </button>
        </div>

        <!-- Performance Metrics -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="glass-panel p-5 rounded-2xl text-center col-span-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</p>
            <h3 class="font-display font-extrabold text-2xl text-primary-600 dark:text-primary-400 mt-1">${att.score}<span class="text-sm font-normal text-slate-400">/${att.totalPossibleMarks}</span></h3>
          </div>
          <div class="glass-panel p-5 rounded-2xl text-center">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accuracy</p>
            <h3 class="font-display font-extrabold text-2xl ${accuracy >= 70 ? 'text-emerald-500' : accuracy >= 40 ? 'text-amber-500' : 'text-rose-500'} mt-1">${accuracy}%</h3>
          </div>
          <div class="glass-panel p-5 rounded-2xl text-center">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Correct / Wrong</p>
            <h3 class="font-display font-extrabold text-2xl text-slate-800 dark:text-slate-200 mt-1">${att.correctCount} <span class="text-xs text-slate-400">vs</span> ${att.wrongCount}</h3>
          </div>
          <div class="glass-panel p-5 rounded-2xl text-center">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Negative Marks</p>
            <h3 class="font-display font-extrabold text-2xl text-rose-500 dark:text-rose-400 mt-1">-${att.negativeMarks}</h3>
          </div>
          <div class="glass-panel p-5 rounded-2xl text-center col-span-2 md:col-span-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time Taken</p>
            <h3 class="font-display font-semibold text-xl text-slate-800 dark:text-slate-200 mt-1.5">${minutes}m ${seconds}s</h3>
          </div>
        </div>

        <!-- Score Visual Bar -->
        <div class="glass-panel p-5 rounded-2xl">
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-bold text-sm text-slate-700 dark:text-slate-300">Score Breakdown</h4>
            <span class="text-xs text-slate-400">${att.correctCount + att.wrongCount + att.skippedCount} total questions</span>
          </div>
          <div class="flex h-3 rounded-full overflow-hidden gap-px">
            <div class="bg-emerald-500 transition-all" style="width: ${att.totalPossibleMarks > 0 ? (att.correctCount / (att.correctCount + att.wrongCount + att.skippedCount) * 100) : 0}%" title="Correct"></div>
            <div class="bg-rose-500 transition-all" style="width: ${att.totalPossibleMarks > 0 ? (att.wrongCount / (att.correctCount + att.wrongCount + att.skippedCount) * 100) : 0}%" title="Wrong"></div>
            <div class="bg-slate-200 dark:bg-slate-700 flex-1" title="Skipped"></div>
          </div>
          <div class="flex gap-4 mt-2 text-[11px] font-semibold">
            <span class="flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-emerald-500"></span> ${att.correctCount} Correct</span>
            <span class="flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-rose-500"></span> ${att.wrongCount} Wrong</span>
            <span class="flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-slate-300"></span> ${att.skippedCount} Skipped</span>
          </div>
        </div>

        <!-- Subject-wise mistake breakdown -->
        ${Object.keys(subjectBreakdown).length > 0 ? `
        <div class="glass-panel p-5 rounded-2xl">
          <h4 class="font-bold text-sm text-slate-700 dark:text-slate-300 mb-4">
            <i class="fa-solid fa-chart-bar mr-2 text-primary-500"></i>Subject-wise Mistake Breakdown
          </h4>
          <div class="flex flex-col gap-3">
            ${Object.entries(subjectBreakdown).sort((a, b) => b[1].total - a[1].total).map(([sub, data]) => `
              <div class="flex items-center gap-3">
                <div class="w-40 text-xs font-semibold text-slate-600 dark:text-slate-400 truncate flex-shrink-0">${sub}</div>
                <div class="flex-1 flex h-6 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                  ${data.easy > 0 ? `<div class="bg-emerald-400 flex items-center justify-center text-[9px] font-bold text-white" style="width:${(data.easy/data.total*100).toFixed(0)}%">${data.easy > 0 ? data.easy : ''}</div>` : ''}
                  ${data.medium > 0 ? `<div class="bg-amber-400 flex items-center justify-center text-[9px] font-bold text-white" style="width:${(data.medium/data.total*100).toFixed(0)}%">${data.medium > 0 ? data.medium : ''}</div>` : ''}
                  ${data.hard > 0 ? `<div class="bg-rose-500 flex items-center justify-center text-[9px] font-bold text-white" style="width:${(data.hard/data.total*100).toFixed(0)}%">${data.hard > 0 ? data.hard : ''}</div>` : ''}
                </div>
                <div class="w-8 text-xs font-bold text-rose-500 text-right">${data.total}</div>
              </div>
            `).join('')}
          </div>
          <div class="flex gap-3 mt-3 text-[10px] font-semibold text-slate-500">
            <span><span class="inline-block h-2 w-2 rounded bg-emerald-400 mr-1"></span>Easy</span>
            <span><span class="inline-block h-2 w-2 rounded bg-amber-400 mr-1"></span>Medium</span>
            <span><span class="inline-block h-2 w-2 rounded bg-rose-500 mr-1"></span>Hard</span>
          </div>
        </div>
        ` : ''}

        <!-- Mistakes List -->
        <div>
          <h4 class="font-display font-bold text-lg text-slate-900 dark:text-white mb-4">
            <i class="fa-solid fa-magnifying-glass-chart mr-2 text-rose-500"></i>
            Question-by-Question Analysis
            <span class="text-sm font-normal text-slate-400 ml-2">(${att.mistakes?.length || 0} mistake${att.mistakes?.length !== 1 ? 's' : ''})</span>
          </h4>

          <div class="flex flex-col gap-5">
            ${!att.mistakes || att.mistakes.length === 0 ? `
              <div class="glass-panel p-12 text-center rounded-2xl flex flex-col items-center justify-center">
                <div class="h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center text-2xl mb-4">
                  <i class="fa-solid fa-trophy"></i>
                </div>
                <p class="text-base font-semibold text-slate-700 dark:text-slate-300">Perfect Score! 🎉</p>
                <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">You correctly answered all questions in this mock test. Exceptional!</p>
              </div>
            ` : att.mistakes.map((m, index) => `
              <div class="glass-panel rounded-2xl overflow-hidden border-l-4 border-l-rose-500">
                <!-- Question header -->
                <div class="flex items-center justify-between p-5 pb-3">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-[10px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider">${m.subject} · ${m.topic}</span>
                    <span class="px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      m.difficulty?.toLowerCase() === 'easy' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600' :
                      m.difficulty?.toLowerCase() === 'hard' ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-600' :
                      'bg-amber-100 dark:bg-amber-950/40 text-amber-600'
                    }">${m.difficulty || 'Medium'}</span>
                  </div>
                  <span class="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">Q${index + 1}</span>
                </div>

                <!-- Question text -->
                <div class="px-5 pb-4">
                  <p class="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">${m.question}</p>
                </div>

                <!-- Answer comparison -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 px-5 pb-4">
                  <div class="p-3.5 border border-rose-200 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/10 rounded-xl">
                    <span class="block text-[10px] font-bold text-rose-500 uppercase mb-1.5">❌ Your Answer</span>
                    <p class="font-semibold text-sm text-slate-800 dark:text-slate-200">
                      ${m.userAnswer >= 0 && m.options?.[m.userAnswer] !== undefined 
                        ? `${String.fromCharCode(65 + m.userAnswer)}. ${m.options[m.userAnswer]}` 
                        : 'No answer selected'}
                    </p>
                  </div>
                  <div class="p-3.5 border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10 rounded-xl">
                    <span class="block text-[10px] font-bold text-emerald-500 uppercase mb-1.5">✅ Correct Answer</span>
                    <p class="font-semibold text-sm text-slate-800 dark:text-slate-200">
                      ${m.options?.[m.correctAnswer] !== undefined 
                        ? `${String.fromCharCode(65 + m.correctAnswer)}. ${m.options[m.correctAnswer]}` 
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                <!-- All Options (collapsed) -->
                <details class="mx-5 mb-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden group">
                  <summary class="p-3 text-xs font-bold cursor-pointer text-slate-600 dark:text-slate-400 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 select-none">
                    <span><i class="fa-solid fa-list mr-1.5"></i>All Options</span>
                    <i class="fa-solid fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i>
                  </summary>
                  <div class="p-3 pt-0 bg-white/50 dark:bg-darkbg-50/50 border-t border-slate-200/50 dark:border-slate-800/50">
                    ${(m.options || []).map((opt, oi) => `
                      <div class="flex items-start gap-2 py-1.5 text-xs ${oi === m.correctAnswer ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : oi === m.userAnswer ? 'text-rose-500 dark:text-rose-400 line-through' : 'text-slate-600 dark:text-slate-400'}">
                        <span class="font-bold flex-shrink-0">${String.fromCharCode(65+oi)}.</span>
                        <span>${opt}</span>
                        ${oi === m.correctAnswer ? '<i class="fa-solid fa-check ml-auto text-emerald-500 flex-shrink-0"></i>' : ''}
                        ${oi === m.userAnswer && oi !== m.correctAnswer ? '<i class="fa-solid fa-xmark ml-auto text-rose-400 flex-shrink-0"></i>' : ''}
                      </div>
                    `).join('')}
                  </div>
                </details>

                <!-- Solution Explanation -->
                <details class="mx-5 mb-5 rounded-xl border border-primary-200/50 dark:border-primary-900/30 overflow-hidden group" open>
                  <summary class="p-3 text-xs font-bold cursor-pointer text-primary-700 dark:text-primary-400 flex items-center justify-between hover:bg-primary-50/30 dark:hover:bg-primary-950/20 select-none">
                    <span><i class="fa-solid fa-circle-info mr-1.5 text-primary-500"></i>Solution & Explanation</span>
                    <i class="fa-solid fa-chevron-down group-open:rotate-180 transition-transform text-primary-400"></i>
                  </summary>
                  <div class="p-4 bg-white/50 dark:bg-darkbg-50/50 border-t border-primary-200/50 dark:border-primary-900/30 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <p class="whitespace-pre-line">${m.explanation || 'No explanation available.'}</p>
                  </div>
                </details>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  init() {
    // Back button
    document.getElementById('btn-back-to-list')?.addEventListener('click', () => {
      this.viewMode = 'list';
      this.activeAttemptId = null;
      // Clean URL
      window.history.replaceState(null, '', '#/analytics');
      this.refresh();
    });

    // Delete button on detail view
    document.getElementById('btn-delete-this-attempt')?.addEventListener('click', async (e) => {
      const attemptId = e.currentTarget.getAttribute('data-attempt-id');
      if (!confirm('Delete this attempt? This action cannot be undone.')) return;
      try {
        await db.deleteAttempt(attemptId);
        showToast('Attempt deleted successfully.', 'success');
        this.viewMode = 'list';
        this.activeAttemptId = null;
        window.history.replaceState(null, '', '#/analytics');
        this.refresh();
      } catch (err) {
        showToast('Failed to delete attempt: ' + err.message, 'error');
      }
    });

    // Attempt cards — click to open detail
    document.querySelectorAll('.attempt-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-attempt-id');
        this.viewMode = 'detail';
        this.activeAttemptId = id;
        this.refresh();
      });
    });

    // Delete buttons on list view
    document.querySelectorAll('.delete-attempt-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const attemptId = btn.getAttribute('data-attempt-id');
        if (!confirm('Delete this attempt permanently? This cannot be undone.')) return;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i>';
        try {
          await db.deleteAttempt(attemptId);
          showToast('Attempt deleted.', 'success');
          this.refresh();
        } catch (err) {
          showToast('Error: ' + err.message, 'error');
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-trash-can"></i> Delete';
        }
      });
    });

    // Subject filter (legacy support)
    document.getElementById('mistake-subject-filter')?.addEventListener('change', (e) => {
      this.selectedSubjectFilter = e.target.value;
      this.refresh();
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
