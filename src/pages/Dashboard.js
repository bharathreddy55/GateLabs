import { db, auth, SUBJECT_SYLLABUS } from '../config/firebase';
import { Chart } from 'chart.js/auto';
import { showToast } from '../utils/toast';

function getGreeting(name = 'Bharath') {
  const hour = new Date().getHours();
  let timeStr = 'Good Morning';
  if (hour >= 12 && hour < 17) {
    timeStr = 'Good Afternoon';
  } else if (hour >= 17 || hour < 4) {
    timeStr = 'Good Evening';
  }
  return `${timeStr} ${name}`;
}

function calculateStreak(attempts) {
  if (attempts.length === 0) return 25;
  
  const dates = Array.from(new Set(attempts.map(a => new Date(a.timestamp).toDateString())))
    .map(d => new Date(d))
    .sort((a, b) => b - a);

  let streak = 0;
  const today = new Date(new Date().toDateString());
  const yesterday = new Date(new Date().toDateString());
  yesterday.setDate(yesterday.getDate() - 1);

  const latest = dates[0];
  if (latest < yesterday && latest.toDateString() !== today.toDateString()) {
    return 25;
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
  return Math.max(streak, 25);
}

async function evaluateBadges(attempts, progress) {
  const unlocked = new Set(['quick_start', 'dedicated_scholar', 'consistency_king']);
  if (attempts.length >= 1) unlocked.add('quick_start');
  if (attempts.length >= 5) unlocked.add('dedicated_scholar');
  if (attempts.some(a => a.accuracy >= 85)) unlocked.add('sniper_mode');
  if (attempts.some(a => (a.score / (a.totalPossibleMarks || 10)) >= 0.90)) unlocked.add('subject_specialist');
  if (attempts.some(a => a.scope && a.scope.toLowerCase().includes('mathematics') && a.accuracy >= 70)) unlocked.add('math_prodigy');
  if (Object.values(progress).filter(Boolean).length >= 15) unlocked.add('concept_explorer');
  unlocked.add('consistency_king');
  if (attempts.length >= 2) unlocked.add('speed_demon');

  const unlockedList = Array.from(unlocked);
  localStorage.setItem('gate_unlocked_badges', JSON.stringify(unlockedList));
  return unlockedList;
}

export const Dashboard = {
  activeTab: 'overview',
  syllabusActiveSubject: 'Engineering Mathematics',
  bookmarkActiveSubject: 'All',
  flowchartSubject: 'All',
  expandedNodes: { 'root': true, 'subj_Engineering Mathematics': true },
  treeSearchQuery: '',

  async render() {
    const user = auth.currentUser;
    const rawName = user ? user.displayName || 'Bharath' : 'Bharath';
    const firstName = rawName.split(' ')[0];
    const greetingText = getGreeting(firstName);

    const attempts = await db.getAttempts();
    const mockTestsTaken = attempts.length;

    let avgAccuracy = 78;
    if (mockTestsTaken > 0) {
      avgAccuracy = Math.round(attempts.reduce((acc, curr) => acc + curr.accuracy, 0) / mockTestsTaken);
    }

    const syllabusProgress = await db.getSyllabusProgress();
    const unlockedBadges = await evaluateBadges(attempts, syllabusProgress);
    const streakDays = calculateStreak(attempts);

    const getTabBtnClass = (tabName) => {
      const base = "px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 select-none cursor-pointer";
      if (this.activeTab === tabName) {
        return `${base} bg-[#10b981] text-white shadow-md`;
      }
      return `${base} text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white`;
    };

    let tabContentHtml = '';
    if (this.activeTab === 'overview') {
      tabContentHtml = this.renderOverviewTab(greetingText, mockTestsTaken, avgAccuracy, attempts, streakDays);
    } else if (this.activeTab === 'syllabus') {
      tabContentHtml = await this.renderSyllabusTab(syllabusProgress);
    } else if (this.activeTab === 'milestones') {
      tabContentHtml = this.renderMilestonesTab(streakDays, unlockedBadges, attempts);
    } else if (this.activeTab === 'bookmarks') {
      tabContentHtml = await this.renderBookmarksTab();
    }

    return `
      <div class="flex flex-col gap-6 animate-fade-in font-sans pb-12">
        
        <!-- Segmented Control Bar -->
        <div class="glass-panel p-2 rounded-full flex items-center justify-between border border-slate-200/60 dark:border-white/[0.07]">
          <div class="flex flex-wrap gap-1">
            <button class="dashboard-tab-btn ${getTabBtnClass('overview')}" data-tab="overview">
              <i class="fa-solid fa-chart-pie text-xs"></i> Overview
            </button>
            <button class="dashboard-tab-btn ${getTabBtnClass('syllabus')}" data-tab="syllabus">
              <i class="fa-solid fa-network-wired text-xs"></i> Syllabus Map
            </button>
            <button class="dashboard-tab-btn ${getTabBtnClass('milestones')}" data-tab="milestones">
              <i class="fa-solid fa-award text-xs"></i> Badges & Streaks
            </button>
            <button class="dashboard-tab-btn ${getTabBtnClass('bookmarks')}" data-tab="bookmarks">
              <i class="fa-solid fa-bookmark text-xs"></i> Review Center
            </button>
          </div>
          
          <div class="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-[#10b981] rounded-full border border-emerald-500/20 font-bold text-xs">
            <i class="fa-solid fa-fire text-[#10b981] animate-pulse"></i>
            <span>${streakDays} Days</span>
          </div>
        </div>

        <div id="dashboard-tab-container" class="page-enter">
          ${tabContentHtml}
        </div>
      </div>
    `;
  },

  renderOverviewTab(greetingText, mockTestsTaken, avgAccuracy, attempts, streakDays) {
    return `
      <div class="flex flex-col gap-6">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/50 dark:border-white/[0.05] pb-5">
          <div class="space-y-1">
            <span class="text-xs font-extrabold uppercase tracking-widest text-[#10b981]">GATE CS 2027</span>
            <h1 class="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight">
              ${greetingText}
            </h1>
          </div>
          <div class="flex items-center gap-3">
            <a href="#/mock-test" class="px-5 py-2.5 rounded-full bg-[#10b981] text-white text-xs font-bold shadow-md hover:scale-102 active:scale-95 transition-all flex items-center gap-2">
              <i class="fa-solid fa-play text-xs"></i> Start Practice Exam
            </a>
          </div>
        </div>

        <!-- Top Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <!-- Continue Learning Card -->
          <div class="md:col-span-2 glass-panel p-7 rounded-3xl relative overflow-hidden flex flex-col justify-between border border-slate-200/60 dark:border-white/[0.07] group hover:border-[#10b981]/40">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-xs font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Continue Learning</span>
                <h3 class="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
                  Operating Systems
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Topic: Virtual Memory & Page Tables</p>
              </div>
              <span class="font-display font-extrabold text-2xl text-[#10b981]">75%</span>
            </div>

            <div class="mt-6 space-y-3">
              <div class="w-full bg-black/5 dark:bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5 border border-black/5 dark:border-white/5">
                <div class="bg-[#10b981] h-full rounded-full transition-all duration-700 shadow-sm" style="width: 75%"></div>
              </div>

              <div class="flex items-center justify-between pt-1">
                <span class="text-xs text-slate-400 dark:text-slate-400 font-semibold">12 of 16 subtopics completed</span>
                <a href="#/practice" class="px-5 py-2 rounded-full bg-[#10b981] text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all">
                  Resume &rarr;
                </a>
              </div>
            </div>
          </div>

          <!-- Daily Streak Card -->
          <div class="glass-panel p-7 rounded-3xl flex flex-col justify-between border border-slate-200/60 dark:border-white/[0.07] bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Daily Streak</span>
              <div class="h-9 w-9 rounded-2xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center text-lg shadow-sm">
                <i class="fa-solid fa-fire animate-pulse"></i>
              </div>
            </div>

            <div class="my-4">
              <h2 class="font-display font-extrabold text-3xl text-slate-900 dark:text-white flex items-baseline gap-2">
                🔥 ${streakDays} <span class="text-base font-bold text-slate-400 dark:text-slate-400">Days</span>
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">You are in the top 5% of consistent candidates this month.</p>
            </div>

            <div class="pt-2 border-t border-slate-200/50 dark:border-white/[0.05] flex items-center justify-between text-xs font-bold text-[#10b981]">
              <span>Flame Active</span>
              <span class="text-[10px] bg-[#10b981]/10 px-2.5 py-1 rounded-full border border-[#10b981]/20">Level 8 Scholar</span>
            </div>
          </div>

        </div>

        <!-- Quick Actions Bento Grid -->
        <div class="space-y-3">
          <h3 class="font-display font-extrabold text-base text-slate-900 dark:text-white tracking-tight">Quick Actions</h3>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            
            <a href="#/formulas" class="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center gap-2.5 hover:border-[#10b981] hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-11 w-11 rounded-2xl bg-emerald-500/10 text-[#10b981] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📖
              </div>
              <span class="font-display font-extrabold text-xs text-slate-900 dark:text-white">Notes</span>
              <span class="text-[10px] text-slate-400 dark:text-slate-400 font-medium">Formulas Deck</span>
            </a>

            <a href="#/practice" class="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center gap-2.5 hover:border-[#10b981] hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-11 w-11 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📝
              </div>
              <span class="font-display font-extrabold text-xs text-slate-900 dark:text-white">Practice</span>
              <span class="text-[10px] text-slate-400 dark:text-slate-400 font-medium">Topic Questions</span>
            </a>

            <a href="#/mock-test" class="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center gap-2.5 hover:border-[#10b981] hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-11 w-11 rounded-2xl bg-emerald-500/10 text-[#10b981] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <span class="font-display font-extrabold text-xs text-slate-900 dark:text-white">Mock Test</span>
              <span class="text-[10px] text-slate-400 dark:text-slate-400 font-medium">CBT Simulator</span>
            </a>

            <a href="#/assistant" class="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center gap-2.5 hover:border-[#10b981] hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-11 w-11 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🤖
              </div>
              <span class="font-display font-extrabold text-xs text-slate-900 dark:text-white">Ask AI</span>
              <span class="text-[10px] text-slate-400 dark:text-slate-400 font-medium">Gemini Assistant</span>
            </a>

            <a href="#/analytics" class="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center gap-2.5 hover:border-[#10b981] hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-11 w-11 rounded-2xl bg-emerald-500/10 text-[#10b981] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📊
              </div>
              <span class="font-display font-extrabold text-xs text-slate-900 dark:text-white">Analytics</span>
              <span class="text-[10px] text-slate-400 dark:text-slate-400 font-medium">Mistake Reports</span>
            </a>

          </div>
        </div>

        <!-- Recent Attempts -->
        <div class="glass-panel p-7 rounded-3xl flex flex-col gap-5 border border-slate-200/60 dark:border-white/[0.07]">
          <div class="flex items-center justify-between border-b border-slate-200/50 dark:border-white/[0.05] pb-4">
            <div>
              <h3 class="font-display font-extrabold text-base text-slate-900 dark:text-white tracking-tight">Recent Exam Sessions</h3>
              <p class="text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">Historical CBT mock test logs and performance metrics</p>
            </div>
            <a href="#/analytics" class="text-xs font-bold text-[#10b981] hover:underline">Full History &rarr;</a>
          </div>

          ${mockTestsTaken === 0 ? `
            <div class="flex flex-col items-center justify-center py-8 text-center">
              <div class="h-12 w-12 rounded-full bg-black/5 dark:bg-white/5 text-slate-400 flex items-center justify-center text-lg mb-2">
                🎯
              </div>
              <p class="text-xs font-bold text-slate-700 dark:text-slate-300">No mock tests completed yet</p>
              <p class="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5 font-medium max-w-xs">Take your first simulated test to track metrics here.</p>
            </div>
          ` : `
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200/50 dark:border-white/[0.05] text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <th class="pb-3">Test Mode</th>
                    <th class="pb-3">Subject Scope</th>
                    <th class="pb-3">Score</th>
                    <th class="pb-3">Accuracy</th>
                    <th class="pb-3">Date</th>
                    <th class="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200/40 dark:divide-white/[0.04]">
                  ${attempts.slice(0, 5).map(att => `
                    <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-all font-semibold">
                      <td class="py-3 font-bold text-slate-900 dark:text-white">${att.mode}</td>
                      <td class="py-3 text-slate-600 dark:text-slate-400">${att.scope}</td>
                      <td class="py-3 font-bold text-slate-900 dark:text-white">${att.score} / ${att.totalPossibleMarks}</td>
                      <td class="py-3">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                          att.accuracy >= 75 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                          att.accuracy >= 50 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                          'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                        }">
                          ${att.accuracy}%
                        </span>
                      </td>
                      <td class="py-3 text-slate-400 dark:text-slate-400">${new Date(att.timestamp).toLocaleDateString()}</td>
                      <td class="py-3 text-right">
                        <a href="#/analytics?id=${att.id}" class="text-xs font-bold text-[#10b981] hover:underline">
                          View &rarr;
                        </a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  },

  async renderSyllabusTab(progress) {
    const syllabus = SUBJECT_SYLLABUS;
    const query = (this.treeSearchQuery || '').toLowerCase().trim();
    const activeSubFilter = this.flowchartSubject || 'All';

    // Icon map for subjects
    const subjectIcons = {
      "Engineering Mathematics": "fa-solid fa-calculator",
      "Digital Logic": "fa-solid fa-microchip",
      "Computer Organization & Architecture (COA)": "fa-solid fa-bolt",
      "Programming & Data Structures": "fa-solid fa-code",
      "Algorithms": "fa-solid fa-diagram-project",
      "Theory of Computation": "fa-solid fa-gears",
      "Compiler Design": "fa-solid fa-file-code",
      "Operating Systems": "fa-solid fa-desktop",
      "Databases": "fa-solid fa-database",
      "Computer Networks": "fa-solid fa-network-wired"
    };

    // Calculate total stats
    let totalTopicsAll = 0;
    let totalCompleted = 0;

    Object.entries(syllabus).forEach(([subject, subdivisions]) => {
      Object.entries(subdivisions).forEach(([subdiv, topics]) => {
        topics.forEach(t => {
          totalTopicsAll++;
          if (progress[`${subject}/${subdiv}/${t}`]) {
            totalCompleted++;
          }
        });
      });
    });

    const totalOverallPercent = totalTopicsAll > 0 ? Math.round((totalCompleted / totalTopicsAll) * 100) : 0;

    // Filter subjects to display
    const subjectsToRender = activeSubFilter === 'All'
      ? Object.keys(syllabus)
      : Object.keys(syllabus).filter(s => s === activeSubFilter);

    return `
      <div class="flex flex-col gap-6 font-sans">
        
        <!-- ===== FLOWCHART HEADER BANNER ===== -->
        <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden shadow-sm">
          <div class="h-28 -mx-6 -mt-6 bg-gradient-to-r from-slate-900 via-[#0a1224] to-slate-900 p-6 flex items-end justify-between border-b border-white/10 relative">
            <div class="flex items-center gap-3.5 relative z-10">
              <div class="h-12 w-12 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl shadow-lg">
                <i class="fa-solid fa-diagram-project"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20">Flowchart Concept Map</span>
                  <span class="text-[10px] font-mono text-slate-400">Root ──▶ Subject ──▶ Module ──▶ Topic Node</span>
                </div>
                <h3 class="font-display font-extrabold text-xl text-white tracking-tight mt-0.5">GATE CS 2027 Syllabus Flowchart</h3>
              </div>
            </div>

            <!-- Total counter pill -->
            <div class="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-white relative z-10">
              <span class="text-emerald-400 font-extrabold">${totalCompleted} / ${totalTopicsAll} Mastered</span>
              <span class="text-slate-400">•</span>
              <span class="text-emerald-400">${totalOverallPercent}%</span>
            </div>
          </div>

          <!-- Subject Selector Filter Pills & Search Bar -->
          <div class="mt-6 flex flex-col gap-4">
            <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              ${['All', ...Object.keys(syllabus)].map(sub => `
                <button class="flowchart-sub-btn flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  activeSubFilter === sub 
                    ? 'btn-accent scale-105 shadow-md' 
                    : 'glass-card text-slate-600 dark:text-slate-400 hover:accent-text'
                }" data-subject="${sub}">
                  ${sub}
                </button>
              `).join('')}
            </div>

            <div class="relative flex-1">
              <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-slate-400 text-xs"></i>
              <input type="text" id="flowchart-search" placeholder="Search flowchart node (e.g., Deadlocks, Master Theorem, Page Table)..." value="${this.treeSearchQuery || ''}" class="glass-input pl-9 text-xs font-semibold">
            </div>
          </div>
        </div>

        <!-- ===== FLOWCHART GRAPH CANVAS ===== -->
        <div class="glass-panel p-8 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-x-auto min-h-[550px] bg-[#070c16] text-white">
          
          <div class="flex flex-col items-center gap-10 min-w-[750px] relative py-2">

            <!-- 🌳 CENTRAL ROOT NODE: GATE CS 2027 -->
            <div class="flex flex-col items-center justify-center relative z-10 select-none">
              <div class="px-8 py-4.5 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-2 border-emerald-500/60 text-white shadow-2xl shadow-emerald-500/20 flex items-center gap-4 group hover:scale-105 transition-all">
                <div class="h-12 w-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center text-xl font-extrabold shadow-lg">
                  <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <div>
                  <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">CENTRAL ROOT NODE</span>
                  <h4 class="font-display font-extrabold text-base tracking-tight text-white">GATE Computer Science 2027</h4>
                  <p class="text-[11px] text-slate-300 font-medium">${totalCompleted} of ${totalTopicsAll} Topics Mastered (${totalOverallPercent}%)</p>
                </div>
              </div>

              <!-- Root Flowchart Connector Line -->
              <div class="flex flex-col items-center my-2">
                <div class="w-0.5 h-8 bg-gradient-to-b from-emerald-500 to-teal-400"></div>
                <i class="fa-solid fa-chevron-down text-teal-400 text-xs -mt-1 animate-bounce"></i>
              </div>
            </div>

            <!-- SUBJECT FLOW BRANCHES -->
            <div class="flex flex-col gap-10 w-full">
              ${subjectsToRender.map(subject => {
                const subdivisions = syllabus[subject];
                const nodeKey = `subj_${subject}`;
                const isSubjExpanded = query.length > 0 || (this.expandedNodes[nodeKey] !== false);
                const iconClass = subjectIcons[subject] || "fa-solid fa-book";

                // Stats
                let subjTotal = 0;
                let subjDone = 0;
                Object.entries(subdivisions).forEach(([subdiv, topics]) => {
                  topics.forEach(t => {
                    subjTotal++;
                    if (progress[`${subject}/${subdiv}/${t}`]) subjDone++;
                  });
                });

                const subjPercent = subjTotal > 0 ? Math.round((subjDone / subjTotal) * 100) : 0;

                return `
                  <!-- SUBJECT FLOWCARD NODE -->
                  <div class="flex flex-col gap-4 p-6 rounded-3xl bg-[#0d1527]/90 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                    
                    <!-- Subject Node Header -->
                    <div class="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div class="flex items-center gap-3">
                        <div class="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-base border border-emerald-500/20 shadow-sm">
                          <i class="${iconClass}"></i>
                        </div>
                        <div>
                          <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">SUBJECT FLOW BRANCH</span>
                          <h4 class="font-display font-extrabold text-sm text-white">${subject}</h4>
                        </div>
                      </div>

                      <div class="flex items-center gap-3">
                        <span class="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
                          ${subjDone} / ${subjTotal} Mastered (${subjPercent}%)
                        </span>
                        <button type="button" class="flow-toggle-btn h-8 w-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs transition-all select-none" data-node="${nodeKey}">
                          <i class="fa-solid ${isSubjExpanded ? 'fa-minus' : 'fa-plus'}"></i>
                        </button>
                      </div>
                    </div>

                    <!-- SUBDIVISIONS & TOPIC NODES FLOWCHART -->
                    <div class="${isSubjExpanded ? '' : 'hidden'} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                      ${Object.entries(subdivisions).map(([subdiv, topics]) => {
                        let subdivDone = topics.filter(t => progress[`${subject}/${subdiv}/${t}`]).length;
                        let subdivTotal = topics.length;

                        // Query match
                        const matchingTopics = query
                          ? topics.filter(t => t.toLowerCase().includes(query) || subdiv.toLowerCase().includes(query) || subject.toLowerCase().includes(query))
                          : topics;

                        if (query && matchingTopics.length === 0) return '';

                        return `
                          <!-- MODULE FLOW CARD -->
                          <div class="flex flex-col gap-3 p-4 rounded-2xl bg-[#121c33] border border-slate-800/80 hover:border-teal-500/40 transition-all relative">
                            
                            <!-- Module Node Header -->
                            <div class="flex items-center justify-between border-b border-slate-800/60 pb-2">
                              <span class="font-display font-bold text-xs text-slate-200 flex items-center gap-2">
                                <span class="h-2 w-2 rounded-full bg-teal-400"></span> ${subdiv}
                              </span>
                              <span class="text-[10px] font-mono text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded">
                                ${subdivDone}/${subdivTotal}
                              </span>
                            </div>

                            <!-- LEAF TOPIC NODES (FLOWCHART NODES) -->
                            <div class="flex flex-col gap-2 pt-1">
                              ${matchingTopics.map(t => {
                                const key = `${subject}/${subdiv}/${t}`;
                                const isChecked = !!progress[key];

                                return `
                                  <div class="flow-leaf-node p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer select-none ${
                                    isChecked
                                      ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200 shadow-sm shadow-emerald-500/10'
                                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                                  }" data-key="${key}">
                                    
                                    <div class="flex items-center gap-2.5 min-w-0">
                                      <span class="h-5 w-5 rounded-md flex items-center justify-center text-xs flex-shrink-0 ${
                                        isChecked ? 'bg-emerald-500 text-slate-950 font-bold' : 'border border-slate-700 text-transparent'
                                      }">
                                        ✓
                                      </span>
                                      <span class="text-xs font-semibold truncate ${isChecked ? 'line-through opacity-80' : ''}">${t}</span>
                                    </div>

                                    <span class="text-[9px] font-mono font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                                      isChecked ? 'bg-emerald-400/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                                    }">
                                      ${isChecked ? 'Mastered' : 'To Study'}
                                    </span>
                                  </div>
                                `;
                              }).join('')}
                            </div>

                          </div>
                        `;
                      }).join('')}
                    </div>

                  </div>
                `;
              }).join('')}
            </div>

          </div>
        </div>
      </div>
    `;
  },

  renderMilestonesTab(streakDays, unlockedBadges, attempts) {
    const badges = [
      { id: 'quick_start', name: 'Quick Start', desc: 'Attempt your first mock test', icon: 'fa-rocket', color: 'from-amber-400 to-orange-500' },
      { id: 'dedicated_scholar', name: 'Dedicated Scholar', desc: 'Complete 5 mock tests', icon: 'fa-graduation-cap', color: 'from-teal-400 to-emerald-500' },
      { id: 'sniper_mode', name: 'Sniper Mode', desc: 'Achieve 85% or higher accuracy', icon: 'fa-bullseye', color: 'from-emerald-400 to-teal-500' },
      { id: 'subject_specialist', name: 'Subject Specialist', desc: 'Get >90% accuracy in any subject', icon: 'fa-sliders', color: 'from-emerald-500 to-teal-600' },
      { id: 'math_prodigy', name: 'Math Prodigy', desc: 'Get >70% accuracy in a Math test', icon: 'fa-calculator', color: 'from-rose-400 to-red-500' },
      { id: 'concept_explorer', name: 'Concept Explorer', desc: 'Mark 15 syllabus topics studied', icon: 'fa-network-wired', color: 'from-cyan-400 to-teal-500' },
      { id: 'consistency_king', name: 'Consistency King', desc: 'Maintain a 3+ day streak', icon: 'fa-fire', color: 'from-orange-400 to-red-500' },
      { id: 'speed_demon', name: 'Speed Demon', desc: 'Complete at least 2 mock tests', icon: 'fa-gauge-high', color: 'from-emerald-400 to-teal-600' }
    ];

    const unlockedSet = new Set(unlockedBadges);

    return `
      <div class="flex flex-col gap-6">
        <div class="glass-panel p-7 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent">
          <div class="flex items-center gap-4">
            <div class="h-14 w-14 rounded-2xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center text-2xl shadow-sm">
              <i class="fa-solid fa-fire animate-pulse"></i>
            </div>
            <div>
              <h4 class="font-display font-extrabold text-lg text-slate-900 dark:text-white">${streakDays} Day Study Streak</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Complete daily practice questions to maintain your streak!</p>
            </div>
          </div>
          <div>
            <span class="px-4 py-2 bg-[#10b981]/10 text-[#10b981] rounded-full text-xs font-bold border border-[#10b981]/20">Streak Level 8</span>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="font-display font-extrabold text-sm text-slate-900 dark:text-white px-2">Aspirant Achievements</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            ${badges.map(b => {
              const isUnlocked = unlockedSet.has(b.id);
              const cardClass = isUnlocked 
                ? 'border-[#10b981]/30 bg-[#10b981]/5 shadow-sm' 
                : 'opacity-50 border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-black/20';

              const iconClass = isUnlocked
                ? `bg-gradient-to-tr ${b.color} text-white shadow-md`
                : 'bg-black/5 dark:bg-white/10 text-slate-400';

              return `
                <div class="glass-card p-5 rounded-3xl border flex flex-col items-center text-center gap-3 transition-all ${cardClass}">
                  <div class="h-12 w-12 rounded-full flex items-center justify-center text-lg relative ${iconClass}">
                    <i class="fa-solid ${b.icon}"></i>
                  </div>
                  <div>
                    <h5 class="font-display font-extrabold text-xs text-slate-900 dark:text-white">${b.name}</h5>
                    <p class="text-[10px] text-slate-400 dark:text-slate-400 mt-1 leading-normal font-medium">${b.desc}</p>
                  </div>
                  ${isUnlocked ? `
                    <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                      <i class="fa-solid fa-circle-check text-[10px]"></i> Unlocked
                    </span>
                  ` : `
                    <span class="text-[10px] font-bold text-slate-400 dark:text-slate-400 bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full border border-black/5">
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
      <div class="flex flex-col gap-5">
        <div class="flex items-center justify-between border-b border-slate-200/50 dark:border-white/[0.05] pb-3 flex-wrap gap-4">
          <div>
            <h4 class="font-display font-extrabold text-sm text-slate-900 dark:text-white">Bookmark Review Center</h4>
            <p class="text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">Solve and review difficult flagged questions to remove them from your catalog.</p>
          </div>
          
          <div class="flex gap-2">
            <select id="bookmark-subject-select" class="glass-input py-2 px-3 text-xs w-44 font-bold rounded-2xl">
              ${subjects.map(sub => `
                <option value="${sub}" ${activeSub === sub ? 'selected' : ''}>${sub}</option>
              `).join('')}
            </select>
          </div>
        </div>

        ${filtered.length === 0 ? `
          <div class="glass-panel p-10 text-center rounded-3xl flex flex-col items-center justify-center border border-slate-200/60 dark:border-white/[0.07]">
            <div class="h-14 w-14 rounded-full bg-black/5 dark:bg-white/5 text-slate-400 flex items-center justify-center text-lg mb-3">
              🔖
            </div>
            <p class="text-sm font-bold text-slate-700 dark:text-slate-300">No bookmarked questions</p>
            <p class="text-xs text-slate-400 dark:text-slate-400 mt-0.5 max-w-sm font-medium">Flag questions during practice sessions to review them here.</p>
          </div>
        ` : `
          <div class="flex flex-col gap-4">
            ${filtered.map((q, index) => `
              <div class="glass-panel p-5 rounded-3xl flex flex-col gap-3.5 border border-slate-200/60 dark:border-white/[0.07]" data-qid="${q.id}">
                <div class="flex items-center justify-between border-b border-slate-200/40 dark:border-white/[0.05] pb-3">
                  <span class="text-xs font-bold text-[#10b981] uppercase tracking-wider">${q.subject} &bull; ${q.topic}</span>
                  <div class="flex gap-2 flex-wrap">
                    <span class="text-[10px] font-bold bg-black/5 dark:bg-white/5 px-2.5 py-0.5 rounded-full text-slate-500 dark:text-slate-400">${q.difficulty}</span>
                    <span class="text-[10px] font-bold bg-[#10b981]/10 text-[#10b981] px-2.5 py-0.5 rounded-full">${q.marks} Mark${q.marks > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <p class="text-slate-900 dark:text-white text-xs font-semibold leading-relaxed whitespace-pre-line">Q${index + 1}. ${q.question}</p>

                <div class="flex flex-col gap-2 mt-1">
                  ${q.options.map((opt, optIdx) => `
                    <label class="glass-card flex items-start gap-3 p-3 rounded-2xl border border-slate-200/40 dark:border-white/[0.05] bg-white/40 dark:bg-black/20 cursor-pointer relative">
                      <input type="radio" name="bookmark-option-${q.id}" value="${optIdx}" class="mt-0.5 text-[#10b981] border-slate-300 focus:ring-[#10b981]">
                      <span class="text-xs text-slate-700 dark:text-slate-300 font-medium">${String.fromCharCode(65 + optIdx)}. ${opt}</span>
                    </label>
                  `).join('')}
                </div>

                <div class="flex items-center gap-3 mt-2 flex-wrap">
                  <button class="bookmark-check-btn px-5 py-2 rounded-full bg-[#10b981] text-white text-xs font-bold shadow-md hover:scale-102 active:scale-95 transition-all">
                    Check Answer
                  </button>
                  <button class="bookmark-delete-btn px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-500/20 active:scale-95 transition-all flex items-center gap-1.5" data-qid="${q.id}">
                    <i class="fa-solid fa-trash-can"></i> Remove
                  </button>
                </div>

                <div class="bookmark-sol-container hidden mt-3 border-t border-slate-200/40 dark:border-white/[0.05] pt-3 flex flex-col gap-2">
                  <div class="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    <i class="fa-solid fa-square-check"></i> Explanation
                  </div>
                  <div class="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line font-medium">
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
      if (canvas) {
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
              backgroundColor: 'rgba(16, 185, 129, 0.4)',
              borderColor: 'rgba(16, 185, 129, 0.95)',
              borderWidth: 2,
              borderRadius: 12,
              hoverBackgroundColor: 'rgba(16, 185, 129, 0.75)',
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#64748b' } },
              y: { grid: { color: 'rgba(100, 116, 139, 0.1)' }, ticks: { color: '#64748b', stepSize: 1 } }
            }
          }
        });
      }
    } else if (this.activeTab === 'syllabus') {
      // Subject Filter Pills click event
      document.querySelectorAll('.flowchart-sub-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.flowchartSubject = btn.getAttribute('data-subject');
          this.refresh();
        });
      });

      // Flowchart Branch Expand/Collapse handler
      document.querySelectorAll('.flow-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const nodeKey = btn.getAttribute('data-node');
          this.expandedNodes[nodeKey] = !(this.expandedNodes[nodeKey] !== false);
          this.refresh();
        });
      });

      // Flowchart Live Search Filter input
      const flowSearch = document.getElementById('flowchart-search');
      if (flowSearch) {
        flowSearch.addEventListener('input', (e) => {
          const val = e.target.value;
          const cursor = e.target.selectionStart;
          this.treeSearchQuery = val;
          this.refresh();
          const newFlowSearch = document.getElementById('flowchart-search');
          if (newFlowSearch) {
            newFlowSearch.focus();
            newFlowSearch.setSelectionRange(cursor, cursor);
          }
        });
      }

      // Flow Leaf Node Click Handler (toggles mastered state)
      const progress = await db.getSyllabusProgress();
      document.querySelectorAll('.flow-leaf-node').forEach(node => {
        node.addEventListener('click', async (e) => {
          e.stopPropagation();
          const key = node.getAttribute('data-key');
          if (progress[key]) {
            delete progress[key];
          } else {
            progress[key] = true;
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
