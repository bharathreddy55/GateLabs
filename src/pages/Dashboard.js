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
  flowchartSelectedSubject: null,
  expandedNodes: {},
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
        return `${base} bg-primary-500 text-white shadow-md`;
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
    } else if (this.activeTab === 'backup') {
      tabContentHtml = this.renderBackupTab();
    }

    return `
      <div class="flex flex-col gap-6 animate-fade-in font-sans pb-12">
        
        <!-- GATE 2027 Countdown Timer -->
        <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] bg-gradient-to-r from-primary-500/5 via-indigo-500/5 to-purple-500/5 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div class="absolute -right-20 -top-20 w-48 h-48 bg-primary-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary-500/10 to-indigo-650/10 text-primary-500 flex items-center justify-center text-xl flex-shrink-0">
              <i class="fa-regular fa-clock"></i>
            </div>
            <div>
              <h4 class="font-display font-extrabold text-sm text-slate-900 dark:text-white leading-tight">Countdown to GATE 2027</h4>
              <p class="text-[10px] text-slate-405 dark:text-slate-400 mt-1 font-semibold">Standard exam schedule date: February 6, 2027. Gear up for your target AIR!</p>
            </div>
          </div>
          
          <!-- Live Digit Containers -->
          <div class="flex items-center gap-2" id="gate-countdown-timer">
            <div class="flex flex-col items-center">
              <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 h-12 w-12 rounded-xl flex items-center justify-center font-display font-extrabold text-sm text-slate-900 dark:text-white shadow-sm" id="gate-days">00</div>
              <span class="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">Days</span>
            </div>
            <span class="text-slate-400 font-extrabold text-sm">:</span>
            <div class="flex flex-col items-center">
              <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 h-12 w-12 rounded-xl flex items-center justify-center font-display font-extrabold text-sm text-slate-900 dark:text-white shadow-sm" id="gate-hours">00</div>
              <span class="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">Hrs</span>
            </div>
            <span class="text-slate-400 font-extrabold text-sm">:</span>
            <div class="flex flex-col items-center">
              <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 h-12 w-12 rounded-xl flex items-center justify-center font-display font-extrabold text-sm text-slate-900 dark:text-white shadow-sm" id="gate-mins">00</div>
              <span class="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">Mins</span>
            </div>
            <span class="text-slate-400 font-extrabold text-sm">:</span>
            <div class="flex flex-col items-center">
              <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 h-12 w-12 rounded-xl flex items-center justify-center font-display font-extrabold text-sm text-primary-500 shadow-sm animate-pulse" id="gate-secs">00</div>
              <span class="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">Secs</span>
            </div>
          </div>
        </div>
        
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
            <button class="dashboard-tab-btn ${getTabBtnClass('backup')}" data-tab="backup">
              <i class="fa-solid fa-floppy-disk text-xs"></i> Data Backup
            </button>
          </div>
          
          <div class="hidden md:flex items-center gap-2 px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full border border-emerald-500/20 font-bold text-xs">
            <i class="fa-solid fa-fire text-primary-500 animate-pulse"></i>
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
            <span class="text-xs font-extrabold uppercase tracking-widest text-primary-500">GATE CS 2027</span>
            <h1 class="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight">
              ${greetingText}
            </h1>
          </div>
          <div class="flex items-center gap-3">
            <a href="#/mock-test" class="px-5 py-2.5 rounded-full bg-primary-500 text-white text-xs font-bold shadow-md hover:scale-102 active:scale-95 transition-all flex items-center gap-2">
              <i class="fa-solid fa-play text-xs"></i> Start Practice Exam
            </a>
          </div>
        </div>

        <!-- Top Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <!-- Continue Learning Card -->
          <div class="md:col-span-2 glass-panel p-7 rounded-3xl relative overflow-hidden flex flex-col justify-between border border-slate-200/60 dark:border-white/[0.07] group hover:border-primary-500/40">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-xs font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Continue Learning</span>
                <h3 class="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
                  Operating Systems
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Topic: Virtual Memory & Page Tables</p>
              </div>
              <span class="font-display font-extrabold text-2xl text-primary-500">75%</span>
            </div>

            <div class="mt-6 space-y-3">
              <div class="w-full bg-black/5 dark:bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5 border border-black/5 dark:border-white/5">
                <div class="bg-primary-500 h-full rounded-full transition-all duration-700 shadow-sm" style="width: 75%"></div>
              </div>

              <div class="flex items-center justify-between pt-1">
                <span class="text-xs text-slate-400 dark:text-slate-400 font-semibold">12 of 16 subtopics completed</span>
                <a href="#/practice" class="px-5 py-2 rounded-full bg-primary-500 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all">
                  Resume &rarr;
                </a>
              </div>
            </div>
          </div>

          <!-- Daily Streak Card -->
          <div class="glass-panel p-7 rounded-3xl flex flex-col justify-between border border-slate-200/60 dark:border-white/[0.07] bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Daily Streak</span>
              <div class="h-9 w-9 rounded-2xl bg-primary-500/15 text-primary-500 flex items-center justify-center text-lg shadow-sm">
                <i class="fa-solid fa-fire animate-pulse"></i>
              </div>
            </div>

            <div class="my-4">
              <h2 class="font-display font-extrabold text-3xl text-slate-900 dark:text-white flex items-baseline gap-2">
                🔥 ${streakDays} <span class="var(--accent-from)ase font-bold text-slate-400 dark:text-slate-400">Days</span>
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">You are in the top 5% of consistent candidates this month.</p>
            </div>

            <div class="pt-2 border-t border-slate-200/50 dark:border-white/[0.05] flex items-center justify-between text-xs font-bold text-primary-500">
              <span>Flame Active</span>
              <span class="text-[10px] bg-primary-500/10 px-2.5 py-1 rounded-full border border-primary-500/20">Level 8 Scholar</span>
            </div>
          </div>

        </div>

        <!-- Activity & Metrics Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Weekly Study Activity -->
          <div class="md:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-display font-extrabold text-sm text-slate-900 dark:text-white">Weekly Study Activity</h4>
                <p class="text-[10px] text-slate-405 dark:text-slate-400 font-semibold mt-0.5">Hours spent practicing and taking tests per day</p>
              </div>
              <span class="text-xs font-bold text-primary-500 bg-primary-500/10 px-2.5 py-1 rounded-full border border-primary-500/20">Live Sync</span>
            </div>
            <div class="h-48">
              <canvas id="studyHoursChart"></canvas>
            </div>
          </div>

          <!-- Overall Syllabus Mastered Card -->
          <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div class="absolute -right-10 -bottom-10 w-24 h-24 bg-teal-500/5 rounded-full blur-xl group-hover:bg-teal-500/10 transition-colors"></div>
            <div>
              <div class="flex justify-between items-start">
                <span class="text-[10px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Syllabus Mastered</span>
                <span class="h-9 w-9 rounded-2xl bg-teal-500/15 text-teal-500 flex items-center justify-center text-lg shadow-sm">
                  📊
                </span>
              </div>
              <h3 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">GATE Syllabus Map</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Check your prerequisite DAG and topic completion checklist.</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.04]">
              <button class="dashboard-tab-btn text-xs font-bold text-teal-500 hover:underline flex items-center gap-1" data-tab="syllabus">
                View Syllabus Map &rarr;
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Actions Bento Grid -->
        <div class="space-y-3">
          <h3 class="font-display font-extrabold var(--accent-from)ase text-slate-900 dark:text-white tracking-tight">Quick Actions</h3>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            
            <a href="#/formulas" class="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center gap-2.5 hover:border-primary-500 hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-11 w-11 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📖
              </div>
              <span class="font-display font-extrabold text-xs text-slate-900 dark:text-white">Notes</span>
              <span class="text-[10px] text-slate-400 dark:text-slate-400 font-medium">Formulas Deck</span>
            </a>

            <a href="#/practice" class="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center gap-2.5 hover:border-primary-500 hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-11 w-11 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📝
              </div>
              <span class="font-display font-extrabold text-xs text-slate-900 dark:text-white">Practice</span>
              <span class="text-[10px] text-slate-400 dark:text-slate-400 font-medium">Topic Questions</span>
            </a>

            <a href="#/mock-test" class="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center gap-2.5 hover:border-primary-500 hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-11 w-11 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <span class="font-display font-extrabold text-xs text-slate-900 dark:text-white">Mock Test</span>
              <span class="text-[10px] text-slate-400 dark:text-slate-400 font-medium">CBT Simulator</span>
            </a>

            <a href="#/assistant" class="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center gap-2.5 hover:border-primary-500 hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-11 w-11 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🤖
              </div>
              <span class="font-display font-extrabold text-xs text-slate-900 dark:text-white">Ask AI</span>
              <span class="text-[10px] text-slate-400 dark:text-slate-400 font-medium">Gemini Assistant</span>
            </a>

            <a href="#/analytics" class="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center gap-2.5 hover:border-primary-500 hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-11 w-11 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
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
              <h3 class="font-display font-extrabold var(--accent-from)ase text-slate-900 dark:text-white tracking-tight">Recent Exam Sessions</h3>
              <p class="text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">Historical CBT mock test logs and performance metrics</p>
            </div>
            <a href="#/analytics" class="text-xs font-bold text-primary-500 hover:underline">Full History &rarr;</a>
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
                          att.accuracy >= 75 ? 'bg-primary-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                          att.accuracy >= 50 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                          'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                        }">
                          ${att.accuracy}%
                        </span>
                      </td>
                      <td class="py-3 text-slate-400 dark:text-slate-400">${new Date(att.timestamp).toLocaleDateString()}</td>
                      <td class="py-3 text-right">
                        <a href="#/analytics?id=${att.id}" class="text-xs font-bold text-primary-500 hover:underline">
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

    // Map GATE 2027 10 Sections to Neetcode-style DAG flow levels & prerequisites
    const dagLevels = [
      // Level 0: Section 1 Root Prerequisite
      [
        { key: "Section 1: Engineering Mathematics", title: "Sec 1: Engineering Mathematics", icon: "fa-calculator" }
      ],
      // Level 1: Foundations
      [
        { key: "Section 2: Digital Logic", title: "Sec 2: Digital Logic", icon: "fa-microchip" },
        { key: "Section 4: Programming and Data Structures", title: "Sec 4: C Prog & Data Structures", icon: "fa-code" }
      ],
      // Level 2: Core Computer Science
      [
        { key: "Section 3: Computer Organization and Architecture", title: "Sec 3: COA Architecture", icon: "fa-bolt" },
        { key: "Section 5: Algorithms", title: "Sec 5: Algorithms", icon: "fa-diagram-project" },
        { key: "Section 6: Theory of Computation", title: "Sec 6: Theory of Computation", icon: "fa-gears" }
      ],
      // Level 3: Systems Convergence
      [
        { key: "Section 8: Operating System", title: "Sec 8: Operating System", icon: "fa-desktop" },
        { key: "Section 9: Databases", title: "Sec 9: Databases (DBMS)", icon: "fa-database" }
      ],
      // Level 4: Advanced Networks & Applications
      [
        { key: "Section 7: Compiler Design", title: "Sec 7: Compiler Design", icon: "fa-file-code" },
        { key: "Section 10: Computer Networks", title: "Sec 10: Computer Networks", icon: "fa-network-wired" }
      ]
    ];

    // Calculate progress for each subject
    const subjectStats = {};
    let totalTopicsAll = 0;
    let totalCompletedAll = 0;

    Object.entries(syllabus).forEach(([subject, subdivisions]) => {
      let subjTotal = 0;
      let subjDone = 0;

      Object.entries(subdivisions).forEach(([subdiv, topics]) => {
        topics.forEach(t => {
          subjTotal++;
          totalTopicsAll++;
          if (progress[`${subject}/${subdiv}/${t}`]) {
            subjDone++;
            totalCompletedAll++;
          }
        });
      });

      const percent = subjTotal > 0 ? Math.round((subjDone / subjTotal) * 100) : 0;
      subjectStats[subject] = { total: subjTotal, done: subjDone, percent };
    });

    const overallPercent = totalTopicsAll > 0 ? Math.round((totalCompletedAll / totalTopicsAll) * 100) : 0;
    const selectedSubj = this.flowchartSelectedSubject;
    const selectedSubjData = selectedSubj ? syllabus[selectedSubj] : null;

    return `
      <div class="flex flex-col gap-6 font-sans">
        
        <!-- ===== NEETCODE / ROADMAP.SH STYLE HEADER BANNER ===== -->
        <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden shadow-sm">
          <div class="h-28 -mx-6 -mt-6 bg-gradient-to-r from-[#0f101d] via-[#3b38d8]/20 to-[#0f101d] p-6 flex items-end justify-between border-b border-white/10 relative">
            <div class="flex items-center gap-3.5 relative z-10">
              <div class="h-12 w-12 rounded-2xl bg-[#4338ca] text-white flex items-center justify-center text-xl shadow-lg border border-indigo-400/40">
                <i class="fa-solid fa-diagram-project"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-md border border-indigo-400/30">Neetcode Flowchart Graph</span>
                  <span class="text-[10px] font-mono text-slate-400">Prerequisite DAG Flow</span>
                </div>
                <h3 class="font-display font-extrabold text-xl text-white tracking-tight mt-0.5">GATE CS 2027 Learning Roadmap</h3>
              </div>
            </div>

            <!-- Total counter pill -->
            <div class="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-white relative z-10">
              <span class="text-indigo-300 font-extrabold">${totalCompletedAll} / ${totalTopicsAll} Mastered</span>
              <span class="text-slate-400">•</span>
              <span class="text-indigo-300">${overallPercent}% Overall</span>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400 mt-4 font-medium leading-relaxed">
            Click any subject node card below to open its topic breakdown checklist. Connected arrows represent GATE prerequisite knowledge flow.
          </p>
        </div>

        <!-- ===== NEETCODE FLOWCHART CANVAS ===== -->
        <div class="glass-panel p-8 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-x-auto bg-[#13141f] text-white min-h-[720px] shadow-2xl">
          
          <!-- SVG CONNECTOR ARROWS BACKDROP -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="flow-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8"/>
              </marker>
            </defs>

            <!-- Curved Bézier Branch Connectors -->
            <!-- Level 0 (Math) -> Level 1 (Digital Logic & DS) -->
            <path d="M 500 120 C 500 170, 300 170, 300 220" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#flow-arrow)"/>
            <path d="M 500 120 C 500 170, 700 170, 700 220" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#flow-arrow)"/>

            <!-- Level 1 -> Level 2 (COA, Algo, TOC) -->
            <path d="M 300 280 C 300 330, 220 330, 220 380" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#flow-arrow)"/>
            <path d="M 700 280 C 700 330, 500 330, 500 380" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#flow-arrow)"/>
            <path d="M 700 280 C 700 330, 780 330, 780 380" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#flow-arrow)"/>

            <!-- Level 2 -> Level 3 (OS & DBMS Convergence) -->
            <path d="M 220 440 C 220 490, 350 490, 350 540" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#flow-arrow)"/>
            <path d="M 500 440 C 500 490, 350 490, 350 540" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#flow-arrow)"/>
            <path d="M 500 440 C 500 490, 650 490, 650 540" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#flow-arrow)"/>
            <path d="M 780 440 C 780 490, 650 490, 650 540" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#flow-arrow)"/>

            <!-- Level 3 -> Level 4 (Compiler & CN) -->
            <path d="M 350 600 C 350 640, 350 640, 350 670" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#flow-arrow)"/>
            <path d="M 650 600 C 650 640, 650 640, 650 670" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#flow-arrow)"/>
          </svg>

          <!-- FLOWCHART NODES GRID CONTAINER -->
          <div class="flex flex-col items-center gap-16 min-w-[950px] relative z-10 py-6">

            <!-- LEVEL 0: ROOT PREREQUISITE (Engineering Math) -->
            <div class="flex items-center justify-center w-full">
              ${this.renderNeetcodeNodeCard(dagLevels[0][0], subjectStats[dagLevels[0][0].key])}
            </div>

            <!-- LEVEL 1: FOUNDATIONS (Digital Logic & Programming DS) -->
            <div class="flex items-center justify-center gap-48 w-full">
              ${dagLevels[1].map(node => this.renderNeetcodeNodeCard(node, subjectStats[node.key])).join('')}
            </div>

            <!-- LEVEL 2: CORE COMPUTER SCIENCE (COA, Algorithms, TOC) -->
            <div class="flex items-center justify-center gap-24 w-full">
              ${dagLevels[2].map(node => this.renderNeetcodeNodeCard(node, subjectStats[node.key])).join('')}
            </div>

            <!-- LEVEL 3: SYSTEMS CONVERGENCE (OS & DBMS) -->
            <div class="flex items-center justify-center gap-40 w-full">
              ${dagLevels[3].map(node => this.renderNeetcodeNodeCard(node, subjectStats[node.key])).join('')}
            </div>

            <!-- LEVEL 4: ADVANCED APPLICATIONS (Compiler Design & CN) -->
            <div class="flex items-center justify-center gap-40 w-full">
              ${dagLevels[4].map(node => this.renderNeetcodeNodeCard(node, subjectStats[node.key])).join('')}
            </div>

          </div>
        </div>

        <!-- ===== TOPIC INSPECTOR MODAL DRAWER ===== -->
        <div id="neetcode-topic-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md ${selectedSubj ? '' : 'hidden'} px-4 animate-fade-in">
          <div class="w-full max-w-2xl bg-[#0f1424] text-white rounded-3xl p-7 shadow-2xl border border-indigo-500/40 flex flex-col gap-5 max-h-[85vh] overflow-hidden">
            
            <!-- Modal Header -->
            <div class="flex items-center justify-between border-b border-slate-800 pb-4">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-2xl bg-[#4338ca] text-white flex items-center justify-center var(--accent-from)ase shadow-md">
                  <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <div>
                  <span class="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Node Topic Inspector</span>
                  <h3 class="font-display font-extrabold text-lg tracking-tight text-white">${selectedSubj || ''}</h3>
                </div>
              </div>

              <button id="close-neetcode-modal" type="button" class="h-8 w-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm transition-all">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Topic Checklist Content -->
            <div class="flex-1 overflow-y-auto pr-1 flex flex-col gap-6 no-scrollbar">
              ${selectedSubjData ? Object.entries(selectedSubjData).map(([subdiv, topics]) => {
                let subdivDone = topics.filter(t => progress[`${selectedSubj}/${subdiv}/${t}`]).length;
                let subdivPercent = topics.length > 0 ? Math.round((subdivDone / topics.length) * 100) : 0;

                return `
                  <div class="flex flex-col gap-3 p-4 rounded-2xl bg-[#151c30] border border-slate-800/90">
                    <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span class="font-display font-bold text-xs text-indigo-200 flex items-center gap-2">
                        <span class="h-2 w-2 rounded-full bg-indigo-400"></span> ${subdiv}
                      </span>
                      <span class="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                        ${subdivDone} / ${topics.length} (${subdivPercent}%)
                      </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      ${topics.map(t => {
                        const key = `${selectedSubj}/${subdiv}/${t}`;
                        const isChecked = !!progress[key];

                        return `
                          <label class="flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                            isChecked
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                              : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-indigo-500/40'
                          }">
                            <div class="flex items-center gap-2.5 min-w-0">
                              <input type="checkbox" class="syllabus-topic-chk h-4 w-4 rounded border-slate-700 text-primary-500 focus:ring-primary-500 bg-transparent cursor-pointer" data-key="${key}" ${isChecked ? 'checked' : ''}>
                              <span class="text-xs font-semibold truncate ${isChecked ? 'line-through opacity-75' : ''}">${t}</span>
                            </div>
                            <span class="text-[9px] font-mono font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                              isChecked ? 'bg-primary-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                            }">
                              ${isChecked ? 'Mastered' : 'To Study'}
                            </span>
                          </label>
                        `;
                      }).join('')}
                    </div>
                  </div>
                `;
              }).join('') : ''}
            </div>

            <!-- Footer -->
            <div class="pt-3 border-t border-slate-800 flex justify-end">
              <button id="done-neetcode-modal" type="button" class="px-5 py-2.5 rounded-2xl btn-accent text-white text-xs font-bold shadow-md active:scale-95 transition-all">
                Done
              </button>
            </div>

          </div>
        </div>

      </div>
    `;
  },

  renderBackupTab() {
    return `
      <div class="flex flex-col gap-6 font-sans">
        
        <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden shadow-sm">
          <div class="flex items-center gap-3 mb-2">
            <div class="h-10 w-10 rounded-2xl btn-accent text-white flex items-center justify-center text-lg shadow-md">
              <i class="fa-solid fa-cloud-arrow-down"></i>
            </div>
            <div>
              <span class="text-[10px] font-mono font-bold uppercase tracking-wider accent-text">Data Security & Sync</span>
              <h3 class="font-display font-extrabold text-xl text-slate-900 dark:text-white">Export & Restore Backup</h3>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Backup your entire GateLabs workspace including syllabus progress, custom formula flashcards, bookmarks, and test history into a single JSON file.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- EXPORT CARD -->
          <div class="glass-panel p-7 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] flex flex-col justify-between gap-6 shadow-md">
            <div class="flex flex-col gap-3">
              <div class="h-12 w-12 rounded-2xl bg-primary-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-xl">
                <i class="fa-solid fa-file-export"></i>
              </div>
              <h4 class="font-display font-extrabold text-lg text-slate-900 dark:text-white">Export Workspace Backup</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Download a lightweight JSON file containing all your GATE progress data so you never lose your hard work.
              </p>
            </div>

            <button id="btn-export-backup" type="button" class="w-full py-3 rounded-2xl btn-accent text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
              <i class="fa-solid fa-download"></i> Download JSON Backup
            </button>
          </div>

          <!-- IMPORT CARD -->
          <div class="glass-panel p-7 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] flex flex-col justify-between gap-6 shadow-md">
            <div class="flex flex-col gap-3">
              <div class="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-xl">
                <i class="fa-solid fa-file-import"></i>
              </div>
              <h4 class="font-display font-extrabold text-lg text-slate-900 dark:text-white">Restore Backup File</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Select a previously saved GateLabs JSON backup file to restore your syllabus checklist, custom formulas, and test attempts.
              </p>
            </div>

            <div>
              <input type="file" id="backup-file-input" accept=".json" class="hidden">
              <button id="btn-trigger-import" type="button" class="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                <i class="fa-solid fa-upload"></i> Upload & Restore JSON File
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  },

  renderNeetcodeNodeCard(node, stats) {
    const total = stats ? stats.total : 0;
    const done = stats ? stats.done : 0;
    const percent = stats ? stats.percent : 0;

    return `
      <!-- NEETCODE INDIGO NODE CARD -->
      <div class="neetcode-node-card w-64 p-4 rounded-2xl bg-[#4338ca] hover:bg-[#3730a3] border border-indigo-300/30 text-white shadow-xl shadow-indigo-950/40 cursor-pointer select-none transition-all duration-200 hover:scale-105 group relative" data-subject="${node.key}">
        
        <!-- Title & Icon -->
        <div class="flex items-center justify-between mb-2.5">
          <div class="flex items-center gap-2 min-w-0">
            <i class="fa-solid ${node.icon} text-indigo-200 text-xs"></i>
            <h4 class="font-display font-extrabold text-xs tracking-tight text-white truncate">${node.title}</h4>
          </div>
          <span class="text-[10px] font-mono font-extrabold text-indigo-100 bg-white/10 px-2 py-0.5 rounded-full flex-shrink-0">
            ${done}/${total}
          </span>
        </div>

        <!-- Neetcode White Progress Bar Capsule -->
        <div class="w-full h-2 rounded-full bg-white/25 overflow-hidden border border-white/20">
          <div class="h-full bg-white transition-all duration-300 shadow-sm" style="width: ${percent}%"></div>
        </div>

        <div class="flex items-center justify-between mt-2 text-[9.5px] font-mono text-indigo-200">
          <span>${percent}% Mastered</span>
          <span class="group-hover:translate-x-0.5 transition-transform">Inspect &rarr;</span>
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
            <div class="h-14 w-14 rounded-2xl bg-primary-500/15 text-primary-500 flex items-center justify-center text-2xl shadow-sm">
              <i class="fa-solid fa-fire animate-pulse"></i>
            </div>
            <div>
              <h4 class="font-display font-extrabold text-lg text-slate-900 dark:text-white">${streakDays} Day Study Streak</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Complete daily practice questions to maintain your streak!</p>
            </div>
          </div>
          <div>
            <span class="px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full text-xs font-bold border border-primary-500/20">Streak Level 8</span>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="font-display font-extrabold text-sm text-slate-900 dark:text-white px-2">Aspirant Achievements</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            ${badges.map(b => {
              const isUnlocked = unlockedSet.has(b.id);
              const cardClass = isUnlocked 
                ? 'border-primary-500/30 bg-primary-500/5 shadow-sm' 
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
                  <span class="text-xs font-bold text-primary-500 uppercase tracking-wider">${q.subject} &bull; ${q.topic}</span>
                  <div class="flex gap-2 flex-wrap">
                    <span class="text-[10px] font-bold bg-black/5 dark:bg-white/5 px-2.5 py-0.5 rounded-full text-slate-500 dark:text-slate-400">${q.difficulty}</span>
                    <span class="text-[10px] font-bold bg-primary-500/10 text-primary-500 px-2.5 py-0.5 rounded-full">${q.marks} Mark${q.marks > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <p class="text-slate-900 dark:text-white text-xs font-semibold leading-relaxed whitespace-pre-line">Q${index + 1}. ${q.question}</p>

                <div class="flex flex-col gap-2 mt-1">
                  ${q.options.map((opt, optIdx) => `
                    <label class="glass-card flex items-start gap-3 p-3 rounded-2xl border border-slate-200/40 dark:border-white/[0.05] bg-white/40 dark:bg-black/20 cursor-pointer relative">
                      <input type="radio" name="bookmark-option-${q.id}" value="${optIdx}" class="mt-0.5 text-primary-500 border-slate-300 focus:ring-primary-500">
                      <span class="text-xs text-slate-700 dark:text-slate-300 font-medium">${String.fromCharCode(65 + optIdx)}. ${opt}</span>
                    </label>
                  `).join('')}
                </div>

                <div class="flex items-center gap-3 mt-2 flex-wrap">
                  <button class="bookmark-check-btn px-5 py-2 rounded-full bg-primary-500 text-white text-xs font-bold shadow-md hover:scale-102 active:scale-95 transition-all">
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
                  <div class="p-3.5 rounded-2xl bg-primary-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line font-medium">
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

    this.startGateCountdown();

    if (this.activeTab === 'overview') {
      const studyHoursData = await db.getStudyTime();
      const days = Object.keys(studyHoursData);
      const hours = Object.values(studyHoursData);

      const canvas = document.getElementById('studyHoursChart');
      if (canvas) {
        if (this.studyChart) {
          this.studyChart.destroy();
        }

        const style = getComputedStyle(document.documentElement);
        const accentFrom = style.getPropertyValue('--accent-from').trim() || '#6366f1';

        this.studyChart = new Chart(canvas, {
          type: 'bar',
          data: {
            labels: days,
            datasets: [{
              label: 'Study Hours',
              data: hours,
              backgroundColor: accentFrom + '66', // Add opacity for fill
              borderColor: accentFrom,
              borderWidth: 2,
              borderRadius: 12,
              hoverBackgroundColor: accentFrom + 'bb',
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
      // Neetcode Node Card Click -> open Topic Inspector Modal
      document.querySelectorAll('.neetcode-node-card').forEach(card => {
        card.addEventListener('click', () => {
          this.flowchartSelectedSubject = card.getAttribute('data-subject');
          this.refresh();
        });
      });

      // Close modal
      const closeModal = () => {
        this.flowchartSelectedSubject = null;
        this.refresh();
      };

      document.getElementById('close-neetcode-modal')?.addEventListener('click', closeModal);
      document.getElementById('done-neetcode-modal')?.addEventListener('click', closeModal);

      // Topic Inspector Modal Checkbox changes
      const progress = await db.getSyllabusProgress();
      const chks = document.querySelectorAll('.syllabus-topic-chk');
      chks.forEach(chk => {
        chk.addEventListener('change', async (e) => {
          e.stopPropagation();
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
    } else if (this.activeTab === 'backup') {
      // Backup handlers
      document.getElementById('btn-export-backup')?.addEventListener('click', () => {
        const backupData = {
          version: '1.0',
          exportedAt: new Date().toISOString(),
          syllabusProgress: JSON.parse(localStorage.getItem('gate_syllabus_progress') || '{}'),
          bookmarks: JSON.parse(localStorage.getItem('gate_bookmarks') || '[]'),
          attempts: JSON.parse(localStorage.getItem('gate_attempts') || '[]'),
          customFormulas: JSON.parse(localStorage.getItem('gate_custom_formulas') || '[]')
        };

        const jsonStr = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `GateLabs_Backup_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast("Backup exported successfully! ⚡", "success");
      });

      const fileInput = document.getElementById('backup-file-input');
      document.getElementById('btn-trigger-import')?.addEventListener('click', () => fileInput?.click());
      fileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.syllabusProgress) localStorage.setItem('gate_syllabus_progress', JSON.stringify(data.syllabusProgress));
            if (data.bookmarks) localStorage.setItem('gate_bookmarks', JSON.stringify(data.bookmarks));
            if (data.attempts) localStorage.setItem('gate_attempts', JSON.stringify(data.attempts));
            if (data.customFormulas) localStorage.setItem('gate_custom_formulas', JSON.stringify(data.customFormulas));

            showToast("Backup restored successfully! 🎉", "success");
            this.refresh();
          } catch (err) {
            showToast("Failed to restore backup: Invalid JSON file", "error");
          }
        };
        reader.readAsText(file);
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
  },

  startGateCountdown() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);

    const targetDate = new Date('February 6, 2027 09:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const daysEl = document.getElementById('gate-days');
      const hoursEl = document.getElementById('gate-hours');
      const minsEl = document.getElementById('gate-mins');
      const secsEl = document.getElementById('gate-secs');

      if (distance < 0) {
        if (daysEl) daysEl.innerText = '00';
        if (hoursEl) hoursEl.innerText = '00';
        if (minsEl) minsEl.innerText = '00';
        if (secsEl) secsEl.innerText = '00';
        clearInterval(this.countdownInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
      if (minsEl) minsEl.innerText = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.innerText = String(seconds).padStart(2, '0');
    };

    updateTimer();
    this.countdownInterval = setInterval(updateTimer, 1000);
  }
};
