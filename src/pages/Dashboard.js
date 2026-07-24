import { db, auth, SUBJECT_SYLLABUS } from '../config/firebase';
import { Chart } from 'chart.js/auto';
import { showToast } from '../utils/toast';

// Helper: Calculate study streak in days based on test history dates
function calculateStreak(attempts) {
  if (attempts.length === 0) return 0;
  
  // Extract date strings in local timezone, sort them descending
  const dates = Array.from(new Set(attempts.map(a => new Date(a.timestamp).toDateString())))
    .map(d => new Date(d))
    .sort((a, b) => b - a);

  let streak = 0;
  const today = new Date(new Date().toDateString());
  const yesterday = new Date(new Date().toDateString());
  yesterday.setDate(yesterday.getDate() - 1);

  // If latest attempt is older than yesterday, streak is broken
  const latest = dates[0];
  if (latest < yesterday && latest.toDateString() !== today.toDateString()) {
    return 0;
  }

  let expected = new Date(latest.getTime());
  for (let i = 0; i < dates.length; i++) {
    const diff = Math.round((expected - dates[i]) / (1000 * 60 * 60 * 24));
    if (diff === 0) {
      streak++;
      expected.setDate(expected.getDate() - 1);
    } else if (diff > 0) {
      break;
    }
  }
  return streak;
}

// Helper: Check database and unlock achievements based on activity
async function evaluateBadges(attempts, progress) {
  const unlocked = new Set();
  
  // 1. Rocket: took at least 1 mock test
  if (attempts.length >= 1) unlocked.add('quick_start');
  // 2. Scholar: took at least 5 mock tests
  if (attempts.length >= 5) unlocked.add('dedicated_scholar');
  // 3. Sniper: got >=85% accuracy in any test
  const hasHighAccuracy = attempts.some(a => a.accuracy >= 85);
  if (hasHighAccuracy) unlocked.add('sniper_mode');
  // 4. Specialist: got >=90% score in any test
  const hasSubjectMastery = attempts.some(a => (a.score / (a.totalPossibleMarks || 10)) >= 0.90);
  if (hasSubjectMastery) unlocked.add('subject_specialist');
  // 5. Math Prodigy: got >=70% accuracy on Engineering Math mock
  const hasMathMastery = attempts.some(a => a.scope && a.scope.toLowerCase().includes('mathematics') && a.accuracy >= 70);
  if (hasMathMastery) unlocked.add('math_prodigy');
  // 6. Concept Explorer: completed at least 15 topics in syllabus map
  const checkedTopicsCount = Object.values(progress).filter(Boolean).length;
  if (checkedTopicsCount >= 15) unlocked.add('concept_explorer');
  // 7. Consistency: streak >= 3 days
  const streak = calculateStreak(attempts);
  if (streak >= 3) unlocked.add('consistency_king');
  // 8. Speed Demon: took 2 or more mock tests
  if (attempts.length >= 2) unlocked.add('speed_demon');

  const unlockedList = Array.from(unlocked);
  localStorage.setItem('gate_unlocked_badges', JSON.stringify(unlockedList));
  return unlockedList;
}

export const Dashboard = {
  activeTab: 'overview',
  syllabusActiveSubject: 'Engineering Mathematics',
  bookmarkActiveSubject: 'All',

  async render() {
    const user = auth.currentUser;
    const displayName = user ? user.displayName || 'GATE Aspirant' : 'GATE Aspirant';

    const attempts = await db.getAttempts();
    const mockTestsTaken = attempts.length;

    let totalScore = 0;
    let avgAccuracy = 0;
    if (mockTestsTaken > 0) {
      totalScore = attempts.reduce((acc, curr) => acc + curr.score, 0);
      avgAccuracy = Math.round(attempts.reduce((acc, curr) => acc + curr.accuracy, 0) / mockTestsTaken);
    }

    const syllabusProgress = await db.getSyllabusProgress();
    const unlockedBadges = await evaluateBadges(attempts, syllabusProgress);
    const streakDays = calculateStreak(attempts);

    const getTabBtnClass = (tabName) => {
      const base = "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 select-none";
      if (this.activeTab === tabName) {
        return `${base} bg-primary-600 text-white shadow-lg shadow-primary-600/15`;
      }
      return `${base} text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white`;
    };

    let tabContentHtml = '';
    if (this.activeTab === 'overview') {
      tabContentHtml = this.renderOverviewTab(displayName, mockTestsTaken, avgAccuracy, attempts, streakDays);
    } else if (this.activeTab === 'syllabus') {
      tabContentHtml = await this.renderSyllabusTab(syllabusProgress);
    } else if (this.activeTab === 'milestones') {
      tabContentHtml = this.renderMilestonesTab(streakDays, unlockedBadges, attempts);
    } else if (this.activeTab === 'bookmarks') {
      tabContentHtml = await this.renderBookmarksTab();
    }

    return `
      <div class="flex flex-col gap-6 animate-fade-in font-sans pb-10">
        <!-- Dashboard Navigation Tabs -->
        <div class="glass-panel p-2 rounded-2xl flex items-center justify-between border border-slate-200/40 dark:border-white/[0.06] bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
          <div class="flex flex-wrap gap-1.5">
            <button class="dashboard-tab-btn ${getTabBtnClass('overview')}" data-tab="overview">
              <i class="fa-solid fa-chart-pie"></i> Overview
            </button>
            <button class="dashboard-tab-btn ${getTabBtnClass('syllabus')}" data-tab="syllabus">
              <i class="fa-solid fa-network-wired"></i> Syllabus Mind Map
            </button>
            <button class="dashboard-tab-btn ${getTabBtnClass('milestones')}" data-tab="milestones">
              <i class="fa-solid fa-award"></i> Badges & Streaks
            </button>
            <button class="dashboard-tab-btn ${getTabBtnClass('bookmarks')}" data-tab="bookmarks">
              <i class="fa-solid fa-bookmark"></i> Bookmark Review Center
            </button>
          </div>
          
          <div class="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl border border-slate-200/20">
            <i class="fa-solid fa-fire text-amber-500 animate-pulse text-sm"></i>
            <span class="text-[10px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">${streakDays} Day Streak</span>
          </div>
        </div>

        <div id="dashboard-tab-container" class="page-enter">
          ${tabContentHtml}
        </div>
      </div>
    `;
  },

  renderOverviewTab(displayName, mockTestsTaken, avgAccuracy, attempts, streakDays) {
    const attemptDateMap = {};
    attempts.forEach(a => {
      const dateKey = new Date(a.timestamp).toDateString();
      attemptDateMap[dateKey] = (attemptDateMap[dateKey] || 0) + 1;
    });

    const generateHeatmapDays = () => {
      const days = [];
      const totalDays = 112; 
      const today = new Date();

      for (let i = totalDays - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateKey = d.toDateString();
        const count = attemptDateMap[dateKey] || 0;

        let bgClass = 'bg-slate-150 dark:bg-slate-800/40';
        if (count === 1) bgClass = 'bg-indigo-500/25 dark:bg-indigo-500/20';
        else if (count === 2) bgClass = 'bg-indigo-500/50 dark:bg-indigo-500/50';
        else if (count >= 3) bgClass = 'bg-indigo-650 dark:bg-indigo-500 shadow-sm shadow-indigo-500/30';

        days.push(`<div class="w-3.5 h-3.5 rounded-[3px] ${bgClass} transition-all hover:scale-125 cursor-pointer" title="${d.toDateString()}: ${count} test session(s)"></div>`);
      }
      return days.join('');
    };

    const subjectList = [
      { name: 'Operating Systems', progress: 75 },
      { name: 'Databases (DBMS)', progress: 82 },
      { name: 'Computer Networks', progress: 60 },
      { name: 'Algorithms', progress: 90 },
      { name: 'Theory of Computation', progress: 68 },
      { name: 'Eng. Mathematics', progress: 85 }
    ];

    return `
      <!-- TOP BENTO ROW -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bento-card p-8 bg-gradient-to-br from-indigo-900/90 via-slate-900 to-slate-950 text-white relative overflow-hidden flex flex-col justify-between border-indigo-500/30">
          <div class="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div class="space-y-2 max-w-xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Prep Engine Active
              </div>
              <h3 class="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Welcome back, ${displayName} 👋
              </h3>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                You are tracking towards target readiness for <b>GATE CS 2027</b>. Use the Syllabus Concept Map to track your topic checklists.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <a href="#/mock-test" class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-lg shadow-primary-500/30 active:scale-95 transition-all">
                <i class="fa-solid fa-play text-xs"></i> Take Mock Test
              </a>
            </div>
          </div>
          <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <div class="grid grid-cols-2 gap-3.5">
          <div class="bento-card p-4 flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Streak</span>
              <div class="h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-sm">
                <i class="fa-solid fa-fire text-amber-500"></i>
              </div>
            </div>
            <div class="mt-4">
              <h4 class="font-display font-extrabold text-xl text-slate-900 dark:text-white">${streakDays} Days</h4>
              <p class="text-[10px] text-indigo-400 font-bold mt-0.5"><i class="fa-solid fa-arrow-trend-up"></i> Keep it up!</p>
            </div>
          </div>

          <div class="bento-card p-4 flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Study Time</span>
              <div class="h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-sm">
                <i class="fa-solid fa-clock"></i>
              </div>
            </div>
            <div class="mt-4">
              <h4 class="font-display font-extrabold text-xl text-slate-900 dark:text-white">22.5 hrs</h4>
              <p class="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">This Month</p>
            </div>
          </div>

          <div class="bento-card p-4 flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Accuracy</span>
              <div class="h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-sm">
                <i class="fa-solid fa-bullseye"></i>
              </div>
            </div>
            <div class="mt-4">
              <h4 class="font-display font-extrabold text-xl text-slate-900 dark:text-white">${mockTestsTaken > 0 ? avgAccuracy + '%' : 'N/A'}</h4>
              <p class="text-[10px] text-indigo-400 font-bold mt-0.5"><i class="fa-solid fa-circle-check"></i> Accuracy Rate</p>
            </div>
          </div>

          <div class="bento-card p-4 flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Mock Tests</span>
              <div class="h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-505 flex items-center justify-center text-sm">
                <i class="fa-solid fa-pen-nib"></i>
              </div>
            </div>
            <div class="mt-4">
              <h4 class="font-display font-extrabold text-xl text-slate-900 dark:text-white">${mockTestsTaken} Taken</h4>
              <p class="text-[10px] text-indigo-550 font-bold mt-0.5"><a href="#/practice">Start New &rarr;</a></p>
            </div>
          </div>
        </div>
      </div>

      <!-- SECOND BENTO ROW -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bento-card p-6 flex flex-col justify-between">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-4">
            <div>
              <h4 class="font-display font-bold text-base text-slate-900 dark:text-white">Daily Study Activity</h4>
              <p class="text-xs text-slate-400 dark:text-slate-500 font-semibold">Hours spent preparing per day</p>
            </div>
            <span class="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl">Last 7 Days</span>
          </div>
          
          <div class="h-60 mt-4 relative">
            <canvas id="studyHoursChart"></canvas>
          </div>
        </div>

        <div class="bento-card p-6 flex flex-col justify-between">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-4">
            <h4 class="font-display font-bold text-base text-slate-900 dark:text-white">Subject Mastery</h4>
            <i class="fa-solid fa-chart-line text-primary-500"></i>
          </div>

          <div class="flex flex-col gap-3 my-4">
            ${subjectList.map(s => `
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between text-xs font-bold">
                  <span class="text-slate-700 dark:text-slate-300">${s.name}</span>
                  <span class="text-indigo-500">${s.progress}%</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-800/80 h-2 rounded-full overflow-hidden">
                  <div class="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-500" style="width: ${s.progress}%"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <a href="#/practice" class="w-full text-center py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-500 hover:text-white text-xs font-bold text-slate-600 dark:text-slate-300 transition-all">
            Practice Specific Subject &rarr;
          </a>
        </div>
      </div>

      <!-- THIRD BENTO ROW: Consistency Heatmap & AI Recommendations -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bento-card p-6 flex flex-col justify-between">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-4">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-calendar-days text-indigo-500"></i>
              <h4 class="font-display font-bold text-base text-slate-900 dark:text-white">Study Consistency Heatmap</h4>
            </div>
            <span class="text-xs text-slate-400 font-semibold">120 Days Overview</span>
          </div>

          <div class="py-4">
            <div class="flex flex-wrap gap-1.5 justify-center">
              ${generateHeatmapDays()}
            </div>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-white/[0.04] pt-3">
            <span>Less Active</span>
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-xs bg-slate-150 dark:bg-slate-800"></span>
              <span class="w-2.5 h-2.5 rounded-xs bg-indigo-500/25"></span>
              <span class="w-2.5 h-2.5 rounded-xs bg-indigo-500/50"></span>
              <span class="w-2.5 h-2.5 rounded-xs bg-indigo-650"></span>
            </div>
            <span>More Active</span>
          </div>
        </div>

        <div class="bento-card p-6 flex flex-col justify-between bg-gradient-to-b from-indigo-950/20 to-transparent">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-4">
            <div class="flex items-center gap-2 text-primary-500">
              <i class="fa-solid fa-robot text-lg"></i>
              <h4 class="font-display font-bold text-base text-slate-900 dark:text-white">AI Study Insights</h4>
            </div>
            <span class="kbd-badge">Gemini AI</span>
          </div>

          <div class="flex flex-col gap-3 py-3">
            <div class="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs flex gap-3">
              <i class="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5 text-sm"></i>
              <div>
                <p class="font-bold text-slate-800 dark:text-slate-200">Revise Paging Algorithms</p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Your accuracy on OS memory management dropped below 60%.</p>
              </div>
            </div>
          </div>

          <a href="#/assistant" class="w-full text-center py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold transition-all shadow-md">
            Ask AI Assistant &rarr;
          </a>
        </div>
      </div>

      <!-- RECENT MOCK TEST HISTORY TABLE -->
      <div class="bento-card p-6 flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-4">
          <h4 class="font-display font-bold text-base text-slate-900 dark:text-white">Recent Mock Test History</h4>
          <a href="#/analytics" class="text-xs font-bold text-primary-500 hover:underline">Full Report &rarr;</a>
        </div>

        ${mockTestsTaken === 0 ? `
          <div class="flex flex-col items-center justify-center py-10 text-center">
            <div class="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-405 flex items-center justify-center text-xl mb-3">
              <i class="fa-solid fa-pen-fancy"></i>
            </div>
            <p class="text-xs font-bold text-slate-700 dark:text-slate-300">No mock tests completed yet</p>
            <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-semibold max-w-xs">Start a mock test to track detailed metrics & history here.</p>
          </div>
        ` : `
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-slate-100 dark:border-white/[0.04] text-slate-400 font-bold uppercase tracking-wider">
                  <th class="pb-3">Test Mode</th>
                  <th class="pb-3">Subject / Scope</th>
                  <th class="pb-3">Score</th>
                  <th class="pb-3">Accuracy</th>
                  <th class="pb-3">Attempted On</th>
                  <th class="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/40">
                ${attempts.slice(0, 5).map(att => `
                  <tr class="hover:bg-slate-500/5 transition-all font-semibold">
                    <td class="py-3 font-bold text-slate-800 dark:text-slate-200">${att.mode}</td>
                    <td class="py-3 text-slate-600 dark:text-slate-400">${att.scope}</td>
                    <td class="py-3 font-bold text-slate-800 dark:text-slate-200">${att.score} / ${att.totalPossibleMarks}</td>
                    <td class="py-3">
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        att.accuracy >= 75 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        att.accuracy >= 50 ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      }">
                        ${att.accuracy}%
                      </span>
                    </td>
                    <td class="py-3 text-slate-400">${new Date(att.timestamp).toLocaleDateString()}</td>
                    <td class="py-3 text-right">
                      <a href="#/analytics?id=${att.id}" class="text-xs font-bold text-primary-500 hover:underline">
                        View Analysis &rarr;
                      </a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
  },

  async renderSyllabusTab(progress) {
    const syllabus = SUBJECT_SYLLABUS;
    const activeSubject = this.syllabusActiveSubject || Object.keys(syllabus)[0];
    const subdivisions = syllabus[activeSubject];

    let totalTopics = 0;
    let completedTopics = 0;
    Object.entries(subdivisions).forEach(([subdiv, topics]) => {
      topics.forEach(t => {
        totalTopics++;
        if (progress[`${activeSubject}/${subdiv}/${t}`]) {
          completedTopics++;
        }
      });
    });
    const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    return `
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Subject List Sidebar -->
        <div class="lg:w-1/4 flex flex-col gap-2">
          <h5 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">Subjects</h5>
          <div class="flex flex-col gap-1.5 max-h-[500px] overflow-y-auto pr-1">
            ${Object.keys(syllabus).map(sub => `
              <button class="subject-select-btn text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                activeSubject === sub 
                  ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-600/15' 
                  : 'bg-white dark:bg-slate-900 border-slate-200/50 dark:border-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }" data-subject="${sub}">
                ${sub}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Map Canvas Area -->
        <div class="flex-1 glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col min-h-[500px] border border-slate-200/40 dark:border-white/[0.06]">
          <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          <div class="flex flex-col items-center justify-center text-center py-6 relative z-10">
            <div class="h-20 w-20 rounded-full bg-gradient-to-tr from-primary-500 via-indigo-550 to-indigo-650 text-white flex flex-col items-center justify-center shadow-xl shadow-primary-500/25 relative border border-white/10 select-none">
              <i class="fa-solid fa-network-wired text-lg mb-0.5"></i>
              <span class="text-[10px] font-extrabold tracking-wider">${progressPercent}%</span>
            </div>
            <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3">${activeSubject}</h4>
            <p class="text-[11px] text-slate-450 dark:text-slate-500 mt-1 font-semibold">${completedTopics} of ${totalTopics} topics studied</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
            ${Object.entries(subdivisions).map(([subdiv, topics]) => {
              let subdivTotal = topics.length;
              let subdivDone = topics.filter(t => progress[`${activeSubject}/${subdiv}/${t}`]).length;
              let subdivPercent = subdivTotal > 0 ? Math.round((subdivDone / subdivTotal) * 100) : 0;

              return `
                <div class="glass-card p-5 border border-slate-200/50 dark:border-white/[0.04] bg-white/40 dark:bg-slate-900/40 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
                  <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.03] pb-3">
                    <div>
                      <h5 class="font-display font-bold text-xs text-slate-900 dark:text-white">${subdiv}</h5>
                      <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">${subdivDone} of ${subdivTotal} topics</p>
                    </div>
                    <span class="text-[10px] font-bold text-primary-650 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 px-2.5 py-0.5 rounded-md border border-primary-100/30">${subdivPercent}%</span>
                  </div>

                  <div class="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1">
                    ${topics.map(t => {
                      const key = `${activeSubject}/${subdiv}/${t}`;
                      const checked = progress[key] ? 'checked' : '';
                      const activeTextClass = progress[key] ? 'text-slate-400 dark:text-slate-505 line-through font-normal' : 'text-slate-700 dark:text-slate-300 font-semibold';
                      return `
                        <label class="flex items-center gap-2.5 cursor-pointer select-none">
                          <input type="checkbox" class="syllabus-topic-chk h-4 w-4 rounded-md border-slate-250 dark:border-white/[0.08] text-primary-600 focus:ring-primary-500 bg-transparent transition-all" data-key="${key}" ${checked}>
                          <span class="text-xs transition-colors duration-150 ${activeTextClass}">${t}</span>
                        </label>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderMilestonesTab(streakDays, unlockedBadges, attempts) {
    const badges = [
      { id: 'quick_start', name: 'Quick Start', desc: 'Attempt your first mock test', icon: 'fa-rocket', color: 'from-amber-400 to-orange-500' },
      { id: 'dedicated_scholar', name: 'Dedicated Scholar', desc: 'Complete 5 mock tests', icon: 'fa-graduation-cap', color: 'from-blue-400 to-indigo-500' },
      { id: 'sniper_mode', name: 'Sniper Mode', desc: 'Achieve 85% or higher accuracy', icon: 'fa-bullseye', color: 'from-emerald-400 to-teal-500' },
      { id: 'subject_specialist', name: 'Subject Specialist', desc: 'Get >90% accuracy in any subject', icon: 'fa-sliders', color: 'from-purple-400 to-pink-500' },
      { id: 'math_prodigy', name: 'Math Prodigy', desc: 'Get >70% accuracy in a Math test', icon: 'fa-calculator', color: 'from-rose-400 to-red-500' },
      { id: 'concept_explorer', name: 'Concept Explorer', desc: 'Mark 15 syllabus topics studied', icon: 'fa-network-wired', color: 'from-cyan-400 to-sky-500' },
      { id: 'consistency_king', name: 'Consistency King', desc: 'Maintain a 3+ day streak', icon: 'fa-fire', color: 'from-orange-400 to-red-500' },
      { id: 'speed_demon', name: 'Speed Demon', desc: 'Complete at least 2 mock tests', icon: 'fa-gauge-high', color: 'from-fuchsia-400 to-violet-600' }
    ];

    const unlockedSet = new Set(unlockedBadges);

    return `
      <div class="flex flex-col gap-6">
        <div class="glass-panel p-6 rounded-3xl border border-slate-200/40 dark:border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent">
          <div class="flex items-center gap-4">
            <div class="h-16 w-16 rounded-2xl bg-orange-500/15 text-orange-505 flex items-center justify-center text-3xl shadow-lg shadow-orange-500/10">
              <i class="fa-solid fa-fire animate-pulse"></i>
            </div>
            <div>
              <h4 class="font-display font-extrabold text-lg text-slate-900 dark:text-white">${streakDays} Day Study Streak</h4>
              <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">Solve questions or take tests daily to keep the streak flame alive!</p>
            </div>
          </div>
          <div class="flex gap-2">
            <span class="px-3.5 py-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl text-xs font-bold border border-orange-500/20">Streak Level: ${Math.floor(streakDays / 3) + 1}</span>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white px-2">Aspirant Achievements</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            ${badges.map(b => {
              const isUnlocked = unlockedSet.has(b.id);
              const cardClass = isUnlocked 
                ? 'border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/10 shadow-lg glow-primary' 
                : 'opacity-55 border-slate-200/50 dark:border-white/[0.04] bg-white/10 dark:bg-slate-900/10';

              const iconClass = isUnlocked
                ? `bg-gradient-to-tr ${b.color} text-white shadow-md`
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600';

              return `
                <div class="glass-card p-5 rounded-2xl border flex flex-col items-center text-center gap-4 transition-all duration-300 ${cardClass}">
                  <div class="h-14 w-14 rounded-full flex items-center justify-center text-xl relative ${iconClass}">
                    <i class="fa-solid ${b.icon}"></i>
                    ${!isUnlocked ? '<i class="fa-solid fa-lock absolute -bottom-1 -right-1 text-[9px] text-slate-400 bg-white dark:bg-slate-900 p-1 rounded-full border border-slate-200/40"></i>' : ''}
                  </div>
                  <div>
                    <h5 class="font-display font-extrabold text-xs text-slate-900 dark:text-white">${b.name}</h5>
                    <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 leading-normal font-semibold">${b.desc}</p>
                  </div>
                  ${isUnlocked ? `
                    <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-md border border-emerald-100/30 flex items-center gap-1">
                      <i class="fa-solid fa-circle-check text-[10px]"></i> Unlocked
                    </span>
                  ` : `
                    <span class="text-[10px] font-bold text-slate-400 dark:text-slate-650 bg-slate-50 dark:bg-slate-950/20 px-2.5 py-0.5 rounded-md border border-slate-200/10">
                      Locked
                    </span>
                  `}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  async renderBookmarksTab() {
    const bookmarks = await db.getBookmarks();
    const subjects = ['All', ...Object.keys(SUBJECT_SYLLABUS)];
    const activeSub = this.bookmarkActiveSubject || 'All';
    
    let filtered = [...bookmarks];
    if (activeSub !== 'All') {
      filtered = filtered.filter(b => b.subject.toLowerCase() === activeSub.toLowerCase());
    }

    return `
      <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-4 flex-wrap gap-4">
          <div>
            <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white">Bookmark Review Center</h4>
            <p class="text-xs text-slate-405 dark:text-slate-500 font-semibold mt-0.5">Solve and review difficult flagged questions to remove them from your catalog.</p>
          </div>
          
          <div class="flex gap-2">
            <select id="bookmark-subject-select" class="glass-input py-2 px-3 text-xs w-48 font-bold">
              ${subjects.map(sub => `
                <option value="${sub}" ${activeSub === sub ? 'selected' : ''}>${sub}</option>
              `).join('')}
            </select>
          </div>
        </div>

        ${filtered.length === 0 ? `
          <div class="glass-panel p-12 text-center rounded-3xl flex flex-col items-center justify-center border border-slate-200/40 dark:border-white/[0.06]">
            <div class="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-405 flex items-center justify-center text-xl mb-4">
              <i class="fa-regular fa-bookmark"></i>
            </div>
            <p class="text-base font-semibold text-slate-700 dark:text-slate-355">No bookmarked questions</p>
            <p class="text-xs text-slate-400 mt-1 max-w-sm leading-relaxed font-semibold">Flag questions during practice sessions or mock test reviews to see them here.</p>
          </div>
        ` : `
          <div class="flex flex-col gap-5">
            ${filtered.map((q, index) => `
              <div class="glass-panel p-6 rounded-3xl flex flex-col gap-4 border border-slate-200/40 dark:border-white/[0.06] hover:shadow-lg transition-all duration-300" data-qid="${q.id}">
                <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-3.5">
                  <span class="text-xs font-bold text-primary-650 dark:text-primary-400 uppercase tracking-wider">${q.subject} &bull; ${q.topic}</span>
                  <div class="flex gap-2 flex-wrap">
                    <span class="text-[10px] font-bold bg-slate-100 dark:bg-slate-950/40 border border-slate-200/20 px-2.5 py-1 rounded-lg text-slate-500 dark:text-slate-400 font-semibold">${q.difficulty}</span>
                    <span class="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/20 px-2.5 py-1 rounded-lg text-indigo-655 dark:text-indigo-400 font-semibold">${q.marks} Mark${q.marks > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <p class="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-relaxed whitespace-pre-line">Q${index + 1}. ${q.question}</p>

                <div class="flex flex-col gap-2.5 mt-2">
                  ${q.options.map((opt, optIdx) => `
                    <label class="glass-card flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-white/[0.04] bg-white/40 dark:bg-slate-900/20 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-all cursor-pointer relative">
                      <input type="radio" name="bookmark-option-${q.id}" value="${optIdx}" class="mt-0.5 text-primary-600 border-slate-350 focus:ring-primary-500 bg-white/50 dark:bg-slate-950/40">
                      <span class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">${String.fromCharCode(65 + optIdx)}. ${opt}</span>
                    </label>
                  `).join('')}
                </div>

                <div class="flex items-center gap-3 mt-3 flex-wrap">
                  <button class="bookmark-check-btn px-5.5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-850 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold transition-all shadow-md active:scale-98">
                    Check Answer
                  </button>
                  <button class="bookmark-delete-btn px-4 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-450 hover:bg-rose-500/20 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5" data-qid="${q.id}">
                    <i class="fa-solid fa-trash-can"></i> Remove Bookmark
                  </button>
                </div>

                <div class="bookmark-sol-container hidden mt-4 border-t border-slate-100 dark:border-white/[0.05] pt-4 flex flex-col gap-3">
                  <div class="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    <i class="fa-solid fa-square-check animate-pulse"></i> Explanation
                  </div>
                  <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line font-semibold">
                    Correct option: <span class="bookmark-correct-char font-extrabold text-emerald-600 dark:text-emerald-400">N/A</span>.
                    
                    ${q.explanation || 'No explanation available.'}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  },

  async init() {
    const tabBtns = document.querySelectorAll('.dashboard-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.getAttribute('data-tab');
        this.refresh();
      });
    });

    if (this.activeTab === 'overview') {
      const studyHoursData = await db.getStudyTime();
      const days = Object.keys(studyHoursData);
      const hours = Object.values(studyHoursData);

      const canvas = document.getElementById('studyHoursChart');
      if (!canvas) return;

      if (this.studyChart) {
        this.studyChart.destroy();
      }

      this.studyChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: days,
          datasets: [{
            label: 'Study Hours',
            data: hours,
            backgroundColor: 'rgba(99, 102, 241, 0.4)',
            borderColor: 'rgba(99, 102, 241, 0.95)',
            borderWidth: 2,
            borderRadius: 8,
            hoverBackgroundColor: 'rgba(99, 102, 241, 0.65)',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#94a3b8' }
            },
            y: {
              grid: { color: 'rgba(148, 163, 184, 0.1)' },
              ticks: { color: '#94a3b8', stepSize: 1 }
            }
          }
        }
      });
    } else if (this.activeTab === 'syllabus') {
      const subjBtns = document.querySelectorAll('.subject-select-btn');
      subjBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.syllabusActiveSubject = btn.getAttribute('data-subject');
          this.refresh();
        });
      });

      const progress = await db.getSyllabusProgress();
      const chks = document.querySelectorAll('.syllabus-topic-chk');
      chks.forEach(chk => {
        chk.addEventListener('change', async () => {
          const key = chk.getAttribute('data-key');
          if (chk.checked) {
            progress[key] = true;
          } else {
            delete progress[key];
          }
          await db.saveSyllabusProgress(progress);
          
          const attempts = await db.getAttempts();
          await evaluateBadges(attempts, progress);

          this.refresh();
        });
      });
    } else if (this.activeTab === 'bookmarks') {
      const subSelect = document.getElementById('bookmark-subject-select');
      subSelect?.addEventListener('change', () => {
        this.bookmarkActiveSubject = subSelect.value;
        this.refresh();
      });

      const panels = document.querySelectorAll('[data-qid]');
      panels.forEach(panel => {
        const qid = panel.getAttribute('data-qid');
        const checkBtn = panel.querySelector('.bookmark-check-btn');
        const deleteBtn = panel.querySelector('.bookmark-delete-btn');
        const solContainer = panel.querySelector('.bookmark-sol-container');
        const correctCharSpan = panel.querySelector('.bookmark-correct-char');

        deleteBtn?.addEventListener('click', async () => {
          if (confirm("Remove this question from your bookmarks?")) {
            await db.deleteBookmark(qid);
            showToast("Bookmark removed", "info");
            this.refresh();
          }
        });

        checkBtn?.addEventListener('click', async () => {
          const selectedRadio = panel.querySelector(`input[name="bookmark-option-${qid}"]:checked`);
          if (!selectedRadio) {
            showToast("Please select an option to check.", "warning");
            return;
          }

          const bookmarks = await db.getBookmarks();
          const questionObj = bookmarks.find(b => b.id === qid);
          if (!questionObj) return;

          const selectedIndex = parseInt(selectedRadio.value);
          const labels = panel.querySelectorAll('label');
          labels.forEach(l => {
            l.classList.remove('border-emerald-500', 'bg-emerald-50/20', 'dark:border-emerald-800', 'dark:bg-emerald-950/20', 'border-rose-500', 'bg-rose-50/20', 'dark:border-rose-800', 'dark:bg-rose-950/20');
          });

          const correctIndex = questionObj.correctAnswer;
          const correctLabel = labels[correctIndex];
          const selectedLabel = labels[selectedIndex];
          
          if (correctCharSpan) correctCharSpan.textContent = String.fromCharCode(65 + correctIndex);
          solContainer?.classList.remove('hidden');

          if (selectedIndex === correctIndex) {
            showToast("Correct Answer!", "success");
            correctLabel?.classList.add('border-emerald-500', 'bg-emerald-50/20', 'dark:border-emerald-800', 'dark:bg-emerald-950/20');
          } else {
            showToast("Incorrect Answer.", "error");
            selectedLabel?.classList.add('border-rose-500', 'bg-rose-50/20', 'dark:border-rose-800', 'dark:bg-rose-950/20');
            correctLabel?.classList.add('border-emerald-500', 'bg-emerald-50/20', 'dark:border-emerald-800', 'dark:bg-emerald-950/20');
          }
        });
      });
    }
  },

  async refresh() {
    const container = document.getElementById('sub-page-container');
    if (container) {
      container.innerHTML = await this.render();
      await this.init();
    }
  }
};
