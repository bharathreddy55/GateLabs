import { db, auth, SUBJECT_SYLLABUS } from '../config/firebase';
import { Chart } from 'chart.js/auto';
import { showToast } from '../utils/toast';

// Helper: Calculate dynamic time-of-day greeting
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

// Helper: Calculate study streak in days
function calculateStreak(attempts) {
  if (attempts.length === 0) return 25; // Default specified streak
  
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

// Helper: Evaluate achievements
async function evaluateBadges(attempts, progress) {
  const unlocked = new Set(['quick_start', 'dedicated_scholar', 'consistency_king']);
  
  if (attempts.length >= 1) unlocked.add('quick_start');
  if (attempts.length >= 5) unlocked.add('dedicated_scholar');
  
  const hasHighAccuracy = attempts.some(a => a.accuracy >= 85);
  if (hasHighAccuracy) unlocked.add('sniper_mode');
  
  const hasSubjectMastery = attempts.some(a => (a.score / (a.totalPossibleMarks || 10)) >= 0.90);
  if (hasSubjectMastery) unlocked.add('subject_specialist');
  
  const hasMathMastery = attempts.some(a => a.scope && a.scope.toLowerCase().includes('mathematics') && a.accuracy >= 70);
  if (hasMathMastery) unlocked.add('math_prodigy');
  
  const checkedTopicsCount = Object.values(progress).filter(Boolean).length;
  if (checkedTopicsCount >= 15) unlocked.add('concept_explorer');
  
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

  async render() {
    const user = auth.currentUser;
    const rawName = user ? user.displayName || 'Bharath' : 'Bharath';
    const firstName = rawName.split(' ')[0];
    const greetingText = getGreeting(firstName);

    const attempts = await db.getAttempts();
    const mockTestsTaken = attempts.length;

    let totalScore = 0;
    let avgAccuracy = 78;
    if (mockTestsTaken > 0) {
      totalScore = attempts.reduce((acc, curr) => acc + curr.score, 0);
      avgAccuracy = Math.round(attempts.reduce((acc, curr) => acc + curr.accuracy, 0) / mockTestsTaken);
    }

    const syllabusProgress = await db.getSyllabusProgress();
    const unlockedBadges = await evaluateBadges(attempts, syllabusProgress);
    const streakDays = calculateStreak(attempts);

    const getTabBtnClass = (tabName) => {
      const base = "px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 select-none cursor-pointer";
      if (this.activeTab === tabName) {
        return `${base} bg-[#0071e3] dark:bg-[#2997ff] text-white shadow-md`;
      }
      return `${base} text-slate-600 dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white`;
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
      <div class="flex flex-col gap-8 animate-fade-in font-sans pb-12">
        
        <!-- Apple Minimal Segmented Control Bar -->
        <div class="glass-panel p-2 rounded-full flex items-center justify-between border border-black/[0.05] dark:border-white/[0.08] bg-white/80 dark:bg-[#161618]/80 backdrop-blur-2xl">
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
          
          <div class="hidden md:flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full border border-orange-500/20 font-bold text-xs">
            <i class="fa-solid fa-fire text-orange-500 animate-pulse"></i>
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
      <div class="flex flex-col gap-8">
        
        <!-- GREETING & HERO HEADER -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/[0.05] dark:border-white/[0.06] pb-6">
          <div class="space-y-1">
            <span class="text-xs font-extrabold uppercase tracking-widest text-[#0071e3] dark:text-[#2997ff]">GATE CS 2027</span>
            <h1 class="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
              ${greetingText}
            </h1>
          </div>
          <div class="flex items-center gap-3">
            <a href="#/mock-test" class="px-5 py-3 rounded-full bg-[#0071e3] dark:bg-[#2997ff] text-white text-xs font-bold shadow-md hover:scale-102 active:scale-95 transition-all flex items-center gap-2">
              <i class="fa-solid fa-play text-xs"></i> Start Practice Exam
            </a>
          </div>
        </div>

        <!-- TOP APPLE CARDS ROW: Continue Learning & Daily Streak -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Continue Learning Card (2 cols) -->
          <div class="md:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between border border-black/[0.05] dark:border-white/[0.08] group hover:border-[#0071e3]/40 dark:hover:border-[#2997ff]/40">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-xs font-extrabold text-slate-400 dark:text-[#86868b] uppercase tracking-wider">Continue Learning</span>
                <h3 class="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
                  Operating Systems
                </h3>
                <p class="text-xs text-slate-500 dark:text-[#86868b] mt-1 font-medium">Topic: Virtual Memory & Page Tables</p>
              </div>
              <span class="font-display font-extrabold text-2xl text-[#0071e3] dark:text-[#2997ff]">75%</span>
            </div>

            <div class="mt-8 space-y-4">
              <!-- Progress Bar -->
              <div class="w-full bg-black/5 dark:bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-black/5 dark:border-white/5">
                <div class="bg-[#0071e3] dark:bg-[#2997ff] h-full rounded-full transition-all duration-700 shadow-sm" style="width: 75%"></div>
              </div>

              <div class="flex items-center justify-between pt-2">
                <span class="text-xs text-slate-400 dark:text-[#86868b] font-semibold">12 of 16 subtopics completed</span>
                <a href="#/practice" class="px-6 py-2.5 rounded-full bg-[#0071e3] dark:bg-[#2997ff] text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all">
                  Resume &rarr;
                </a>
              </div>
            </div>
          </div>

          <!-- Daily Streak Card (1 col) -->
          <div class="glass-panel p-8 rounded-3xl flex flex-col justify-between border border-black/[0.05] dark:border-white/[0.08] bg-gradient-to-br from-orange-500/10 via-transparent to-transparent relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold text-slate-400 dark:text-[#86868b] uppercase tracking-wider">Daily Streak</span>
              <div class="h-10 w-10 rounded-2xl bg-orange-500/15 text-orange-500 flex items-center justify-center text-xl shadow-sm">
                <i class="fa-solid fa-fire animate-pulse"></i>
              </div>
            </div>

            <div class="my-6">
              <h2 class="font-display font-extrabold text-4xl text-slate-900 dark:text-white flex items-baseline gap-2">
                🔥 ${streakDays} <span class="text-lg font-bold text-slate-400 dark:text-[#86868b]">Days</span>
              </h2>
              <p class="text-xs text-slate-500 dark:text-[#86868b] mt-2 font-medium">You are in the top 5% of consistent candidates this month.</p>
            </div>

            <div class="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs font-bold text-orange-600 dark:text-orange-400">
              <span>Flame Active</span>
              <span class="text-[10px] bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">Level 8 Scholar</span>
            </div>
          </div>

        </div>

        <!-- QUICK ACTIONS BENTO GRID -->
        <div class="space-y-4">
          <h3 class="font-display font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">Quick Actions</h3>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            
            <!-- Action 1: Notes -->
            <a href="#/formulas" class="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center text-center gap-3 hover:border-[#0071e3] dark:hover:border-[#2997ff] hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-12 w-12 rounded-2xl bg-blue-500/10 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📖
              </div>
              <span class="font-display font-extrabold text-sm text-slate-900 dark:text-white">Notes</span>
              <span class="text-[10px] text-slate-400 dark:text-[#86868b] font-medium">Formulas Deck</span>
            </a>

            <!-- Action 2: Practice -->
            <a href="#/practice" class="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center text-center gap-3 hover:border-[#0071e3] dark:hover:border-[#2997ff] hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📝
              </div>
              <span class="font-display font-extrabold text-sm text-slate-900 dark:text-white">Practice</span>
              <span class="text-[10px] text-slate-400 dark:text-[#86868b] font-medium">Topic Questions</span>
            </a>

            <!-- Action 3: Mock Test -->
            <a href="#/mock-test" class="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center text-center gap-3 hover:border-[#0071e3] dark:hover:border-[#2997ff] hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <span class="font-display font-extrabold text-sm text-slate-900 dark:text-white">Mock Test</span>
              <span class="text-[10px] text-slate-400 dark:text-[#86868b] font-medium">CBT Simulator</span>
            </a>

            <!-- Action 4: Ask AI -->
            <a href="#/assistant" class="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center text-center gap-3 hover:border-[#0071e3] dark:hover:border-[#2997ff] hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🤖
              </div>
              <span class="font-display font-extrabold text-sm text-slate-900 dark:text-white">Ask AI</span>
              <span class="text-[10px] text-slate-400 dark:text-[#86868b] font-medium">Gemini Assistant</span>
            </a>

            <!-- Action 5: Analytics -->
            <a href="#/analytics" class="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center text-center gap-3 hover:border-[#0071e3] dark:hover:border-[#2997ff] hover:scale-102 active:scale-95 transition-all group shadow-sm">
              <div class="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📊
              </div>
              <span class="font-display font-extrabold text-sm text-slate-900 dark:text-white">Analytics</span>
              <span class="text-[10px] text-slate-400 dark:text-[#86868b] font-medium">Mistake Reports</span>
            </a>

          </div>
        </div>

        <!-- RECENT MOCK TEST HISTORY TABLE -->
        <div class="glass-panel p-8 rounded-3xl flex flex-col gap-6 border border-black/[0.05] dark:border-white/[0.08]">
          <div class="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] pb-4">
            <div>
              <h3 class="font-display font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">Recent Exam Sessions</h3>
              <p class="text-xs text-slate-400 dark:text-[#86868b] font-medium mt-0.5">Historical CBT mock test logs and performance metrics</p>
            </div>
            <a href="#/analytics" class="text-xs font-bold text-[#0071e3] dark:text-[#2997ff] hover:underline">Full History &rarr;</a>
          </div>

          ${mockTestsTaken === 0 ? `
            <div class="flex flex-col items-center justify-center py-10 text-center">
              <div class="h-14 w-14 rounded-full bg-black/5 dark:bg-white/5 text-slate-400 flex items-center justify-center text-xl mb-3">
                🎯
              </div>
              <p class="text-xs font-bold text-slate-700 dark:text-slate-300">No mock tests completed yet</p>
              <p class="text-[11px] text-slate-400 dark:text-[#86868b] mt-1 font-medium max-w-xs">Take your first simulated test to track metrics here.</p>
            </div>
          ` : `
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-black/[0.04] dark:border-white/[0.06] text-slate-400 dark:text-[#86868b] font-bold uppercase tracking-wider">
                    <th class="pb-3">Test Mode</th>
                    <th class="pb-3">Subject Scope</th>
                    <th class="pb-3">Score</th>
                    <th class="pb-3">Accuracy</th>
                    <th class="pb-3">Date</th>
                    <th class="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.03] dark:divide-white/[0.04]">
                  ${attempts.slice(0, 5).map(att => `
                    <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-all font-semibold">
                      <td class="py-4 font-bold text-slate-900 dark:text-white">${att.mode}</td>
                      <td class="py-4 text-slate-600 dark:text-[#86868b]">${att.scope}</td>
                      <td class="py-4 font-bold text-slate-900 dark:text-white">${att.score} / ${att.totalPossibleMarks}</td>
                      <td class="py-4">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                          att.accuracy >= 75 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                          att.accuracy >= 50 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                          'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                        }">
                          ${att.accuracy}%
                        </span>
                      </td>
                      <td class="py-4 text-slate-400 dark:text-[#86868b]">${new Date(att.timestamp).toLocaleDateString()}</td>
                      <td class="py-4 text-right">
                        <a href="#/analytics?id=${att.id}" class="text-xs font-bold text-[#0071e3] dark:text-[#2997ff] hover:underline">
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
          <h5 class="text-xs font-bold text-slate-400 dark:text-[#86868b] uppercase tracking-wider px-2 mb-1">Subjects</h5>
          <div class="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
            ${Object.keys(syllabus).map(sub => `
              <button class="subject-select-btn text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all border ${
                activeSubject === sub 
                  ? 'bg-[#0071e3] dark:bg-[#2997ff] border-transparent text-white shadow-md' 
                  : 'bg-white/60 dark:bg-[#161618]/60 border-black/[0.04] dark:border-white/[0.06] text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10'
              }" data-subject="${sub}">
                ${sub}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Map Canvas Area -->
        <div class="flex-1 glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col min-h-[500px] border border-black/[0.05] dark:border-white/[0.08]">
          <div class="flex flex-col items-center justify-center text-center py-6 relative z-10">
            <div class="h-20 w-20 rounded-full bg-[#0071e3] dark:bg-[#2997ff] text-white flex flex-col items-center justify-center shadow-lg relative border border-white/10 select-none">
              <i class="fa-solid fa-network-wired text-lg mb-0.5"></i>
              <span class="text-[10px] font-extrabold tracking-wider">${progressPercent}%</span>
            </div>
            <h4 class="font-display font-extrabold text-lg text-slate-900 dark:text-white mt-3">${activeSubject}</h4>
            <p class="text-xs text-slate-400 dark:text-[#86868b] mt-1 font-medium">${completedTopics} of ${totalTopics} topics studied</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
            ${Object.entries(subdivisions).map(([subdiv, topics]) => {
              let subdivTotal = topics.length;
              let subdivDone = topics.filter(t => progress[`${activeSubject}/${subdiv}/${t}`]).length;
              let subdivPercent = subdivTotal > 0 ? Math.round((subdivDone / subdivTotal) * 100) : 0;

              return `
                <div class="glass-card p-6 border border-black/[0.04] dark:border-white/[0.06] bg-white/40 dark:bg-black/20 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
                  <div class="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] pb-3">
                    <div>
                      <h5 class="font-display font-bold text-xs text-slate-900 dark:text-white">${subdiv}</h5>
                      <p class="text-[10px] text-slate-400 dark:text-[#86868b] mt-0.5 font-medium">${subdivDone} of ${subdivTotal} topics</p>
                    </div>
                    <span class="text-[10px] font-bold text-[#0071e3] dark:text-[#2997ff] bg-[#0071e3]/10 dark:bg-[#2997ff]/15 px-2.5 py-0.5 rounded-full border border-[#0071e3]/20">${subdivPercent}%</span>
                  </div>

                  <div class="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1">
                    ${topics.map(t => {
                      const key = `${activeSubject}/${subdiv}/${t}`;
                      const checked = progress[key] ? 'checked' : '';
                      const activeTextClass = progress[key] ? 'text-slate-400 dark:text-[#86868b] line-through font-normal' : 'text-slate-700 dark:text-slate-300 font-medium';
                      return `
                        <label class="flex items-center gap-3 cursor-pointer select-none">
                          <input type="checkbox" class="syllabus-topic-chk h-4 w-4 rounded-md border-black/10 dark:border-white/10 text-[#0071e3] focus:ring-[#0071e3] bg-transparent transition-all" data-key="${key}" ${checked}>
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
        <div class="glass-panel p-8 rounded-3xl border border-black/[0.05] dark:border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent">
          <div class="flex items-center gap-4">
            <div class="h-16 w-16 rounded-2xl bg-orange-500/15 text-orange-500 flex items-center justify-center text-3xl shadow-sm">
              <i class="fa-solid fa-fire animate-pulse"></i>
            </div>
            <div>
              <h4 class="font-display font-extrabold text-xl text-slate-900 dark:text-white">${streakDays} Day Study Streak</h4>
              <p class="text-xs text-slate-500 dark:text-[#86868b] mt-1 font-medium">Complete daily practice questions to maintain your streak!</p>
            </div>
          </div>
          <div>
            <span class="px-4 py-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full text-xs font-bold border border-orange-500/20">Streak Level 8</span>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white px-2">Aspirant Achievements</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            ${badges.map(b => {
              const isUnlocked = unlockedSet.has(b.id);
              const cardClass = isUnlocked 
                ? 'border-[#0071e3]/30 dark:border-[#2997ff]/30 bg-[#0071e3]/5 dark:bg-[#2997ff]/5 shadow-sm' 
                : 'opacity-50 border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20';

              const iconClass = isUnlocked
                ? `bg-gradient-to-tr ${b.color} text-white shadow-md`
                : 'bg-black/5 dark:bg-white/10 text-slate-400';

              return `
                <div class="glass-card p-6 rounded-3xl border flex flex-col items-center text-center gap-4 transition-all ${cardClass}">
                  <div class="h-14 w-14 rounded-full flex items-center justify-center text-xl relative ${iconClass}">
                    <i class="fa-solid ${b.icon}"></i>
                    ${!isUnlocked ? '<i class="fa-solid fa-lock absolute -bottom-1 -right-1 text-[9px] text-slate-400 bg-white dark:bg-[#1c1c1e] p-1 rounded-full border border-black/10"></i>' : ''}
                  </div>
                  <div>
                    <h5 class="font-display font-extrabold text-xs text-slate-900 dark:text-white">${b.name}</h5>
                    <p class="text-[10px] text-slate-400 dark:text-[#86868b] mt-1 leading-normal font-medium">${b.desc}</p>
                  </div>
                  ${isUnlocked ? `
                    <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                      <i class="fa-solid fa-circle-check text-[10px]"></i> Unlocked
                    </span>
                  ` : `
                    <span class="text-[10px] font-bold text-slate-400 dark:text-[#86868b] bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full border border-black/5">
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
        <div class="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] pb-4 flex-wrap gap-4">
          <div>
            <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white">Bookmark Review Center</h4>
            <p class="text-xs text-slate-400 dark:text-[#86868b] font-medium mt-0.5">Solve and review difficult flagged questions to remove them from your catalog.</p>
          </div>
          
          <div class="flex gap-2">
            <select id="bookmark-subject-select" class="glass-input py-2 px-4 text-xs w-48 font-bold rounded-2xl">
              ${subjects.map(sub => `
                <option value="${sub}" ${activeSub === sub ? 'selected' : ''}>${sub}</option>
              `).join('')}
            </select>
          </div>
        </div>

        ${filtered.length === 0 ? `
          <div class="glass-panel p-12 text-center rounded-3xl flex flex-col items-center justify-center border border-black/[0.05] dark:border-white/[0.08]">
            <div class="h-16 w-16 rounded-full bg-black/5 dark:bg-white/5 text-slate-400 flex items-center justify-center text-xl mb-4">
              🔖
            </div>
            <p class="text-base font-bold text-slate-700 dark:text-slate-300">No bookmarked questions</p>
            <p class="text-xs text-slate-400 dark:text-[#86868b] mt-1 max-w-sm font-medium">Flag questions during practice sessions to review them here.</p>
          </div>
        ` : `
          <div class="flex flex-col gap-5">
            ${filtered.map((q, index) => `
              <div class="glass-panel p-6 rounded-3xl flex flex-col gap-4 border border-black/[0.05] dark:border-white/[0.08]" data-qid="${q.id}">
                <div class="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] pb-3.5">
                  <span class="text-xs font-bold text-[#0071e3] dark:text-[#2997ff] uppercase tracking-wider">${q.subject} &bull; ${q.topic}</span>
                  <div class="flex gap-2 flex-wrap">
                    <span class="text-[10px] font-bold bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full text-slate-500 dark:text-[#86868b]">${q.difficulty}</span>
                    <span class="text-[10px] font-bold bg-[#0071e3]/10 text-[#0071e3] dark:text-[#2997ff] px-3 py-1 rounded-full">${q.marks} Mark${q.marks > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <p class="text-slate-900 dark:text-white text-sm font-semibold leading-relaxed whitespace-pre-line">Q${index + 1}. ${q.question}</p>

                <div class="flex flex-col gap-2.5 mt-2">
                  ${q.options.map((opt, optIdx) => `
                    <label class="glass-card flex items-start gap-3 p-3.5 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] bg-white/40 dark:bg-black/20 cursor-pointer relative">
                      <input type="radio" name="bookmark-option-${q.id}" value="${optIdx}" class="mt-0.5 text-[#0071e3] border-slate-300 focus:ring-[#0071e3]">
                      <span class="text-xs text-slate-700 dark:text-slate-300 font-medium">${String.fromCharCode(65 + optIdx)}. ${opt}</span>
                    </label>
                  `).join('')}
                </div>

                <div class="flex items-center gap-3 mt-3 flex-wrap">
                  <button class="bookmark-check-btn px-6 py-2.5 rounded-full bg-[#0071e3] dark:bg-[#2997ff] text-white text-xs font-bold shadow-md hover:scale-102 active:scale-95 transition-all">
                    Check Answer
                  </button>
                  <button class="bookmark-delete-btn px-4 py-2.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-500/20 active:scale-95 transition-all flex items-center gap-1.5" data-qid="${q.id}">
                    <i class="fa-solid fa-trash-can"></i> Remove
                  </button>
                </div>

                <div class="bookmark-sol-container hidden mt-4 border-t border-black/[0.04] dark:border-white/[0.06] pt-4 flex flex-col gap-3">
                  <div class="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    <i class="fa-solid fa-square-check"></i> Explanation
                  </div>
                  <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line font-medium">
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
              backgroundColor: 'rgba(0, 113, 227, 0.4)',
              borderColor: 'rgba(0, 113, 227, 0.95)',
              borderWidth: 2,
              borderRadius: 12,
              hoverBackgroundColor: 'rgba(0, 113, 227, 0.75)',
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#86868b' } },
              y: { grid: { color: 'rgba(134, 134, 139, 0.1)' }, ticks: { color: '#86868b', stepSize: 1 } }
            }
          }
        });
      }
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
