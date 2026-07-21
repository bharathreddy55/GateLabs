import { db, auth, SUBJECT_SYLLABUS } from '../config/firebase';
import { Chart } from 'chart.js/auto';

export const Dashboard = {
  async render() {
    const user = auth.currentUser;
    const displayName = user ? user.displayName || 'GATE Aspirant' : 'GATE Aspirant';
    
    // Fetch dashboard metadata
    const attempts = await db.getAttempts();
    const mockTestsTaken = attempts.length;
    
    // Calculate average score and stats
    let totalScore = 0;
    let avgAccuracy = 0;
    if (mockTestsTaken > 0) {
      totalScore = attempts.reduce((acc, curr) => acc + curr.score, 0);
      avgAccuracy = Math.round(attempts.reduce((acc, curr) => acc + curr.accuracy, 0) / mockTestsTaken);
    }
    
    // Generate 365-day Heatmap cells (52 weeks x 7 days)
    const generateHeatmapDays = () => {
      const days = [];
      const today = new Date();
      // Generate 120 days for a compact clean view
      for (let i = 119; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        // Simulate intensity based on pseudo activity for visually appealing UI
        const seed = (i * 7 + 3) % 5;
        let bgClass = 'bg-slate-100 dark:bg-slate-800/40';
        if (seed === 1) bgClass = 'bg-emerald-500/30 dark:bg-emerald-500/30';
        if (seed === 2) bgClass = 'bg-emerald-500/60 dark:bg-emerald-500/60';
        if (seed === 3) bgClass = 'bg-emerald-500 dark:bg-emerald-400';
        days.push(`<div class="w-3 h-3 rounded-xs ${bgClass} transition-all hover:scale-125" title="${d.toDateString()}"></div>`);
      }
      return days.join('');
    };

    // Subject mastery list
    const subjectList = [
      { name: 'Operating Systems', progress: 75, color: 'text-indigo-500', bg: 'bg-indigo-500' },
      { name: 'Databases (DBMS)', progress: 82, color: 'text-emerald-500', bg: 'bg-emerald-500' },
      { name: 'Computer Networks', progress: 60, color: 'text-amber-500', bg: 'bg-amber-500' },
      { name: 'Algorithms', progress: 90, color: 'text-purple-500', bg: 'bg-purple-500' },
      { name: 'Theory of Computation', progress: 68, color: 'text-cyan-500', bg: 'bg-cyan-500' },
      { name: 'Eng. Mathematics', progress: 85, color: 'text-rose-500', bg: 'bg-rose-500' },
    ];

    return `
      <div class="flex flex-col gap-6 animate-fade-in font-sans pb-10">
        
        <!-- TOP BENTO ROW -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Hero Banner Bento Tile (2 cols) -->
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
                  You are tracking towards target readiness for <b>GATE CS 2027</b>. Your weak area in <span class="text-amber-400 font-bold">OS (Paging)</span> is ready for review.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <a href="#/mock-test" class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-lg shadow-primary-500/30 active:scale-95 transition-all">
                  <i class="fa-solid fa-play text-xs"></i> Take Mock Test
                </a>
              </div>
            </div>

            <!-- Background Ambient Glow -->
            <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute right-40 top-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
          </div>

          <!-- Quick Metrics Bento Grid (1 col) -->
          <div class="grid grid-cols-2 gap-3.5">
            <!-- Metric 1: Streak -->
            <div class="bento-card p-4 flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Streak</span>
                <div class="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-sm">
                  <i class="fa-solid fa-fire"></i>
                </div>
              </div>
              <div class="mt-4">
                <h4 class="font-display font-extrabold text-xl text-slate-900 dark:text-white">5 Days</h4>
                <p class="text-[10px] text-emerald-500 font-bold mt-0.5"><i class="fa-solid fa-arrow-trend-up"></i> +2 this week</p>
              </div>
            </div>

            <!-- Metric 2: Hours -->
            <div class="bento-card p-4 flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Study Time</span>
                <div class="h-8 w-8 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-sm">
                  <i class="fa-solid fa-clock"></i>
                </div>
              </div>
              <div class="mt-4">
                <h4 class="font-display font-extrabold text-xl text-slate-900 dark:text-white">22.5 hrs</h4>
                <p class="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">This Month</p>
              </div>
            </div>

            <!-- Metric 3: Accuracy -->
            <div class="bento-card p-4 flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Accuracy</span>
                <div class="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-sm">
                  <i class="fa-solid fa-bullseye"></i>
                </div>
              </div>
              <div class="mt-4">
                <h4 class="font-display font-extrabold text-xl text-slate-900 dark:text-white">${mockTestsTaken > 0 ? avgAccuracy + '%' : '78%'}</h4>
                <p class="text-[10px] text-emerald-500 font-bold mt-0.5"><i class="fa-solid fa-circle-check"></i> High Ranker</p>
              </div>
            </div>

            <!-- Metric 4: Mocks -->
            <div class="bento-card p-4 flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Mock Tests</span>
                <div class="h-8 w-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-sm">
                  <i class="fa-solid fa-pen-nib"></i>
                </div>
              </div>
              <div class="mt-4">
                <h4 class="font-display font-extrabold text-xl text-slate-900 dark:text-white">${mockTestsTaken} Taken</h4>
                <p class="text-[10px] text-indigo-500 font-bold mt-0.5"><a href="#/practice">Start New &rarr;</a></p>
              </div>
            </div>
          </div>
        </div>

        <!-- SECOND BENTO ROW -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Study Tracker Chart (2 cols) -->
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

          <!-- Subject Mastery Bento Tile (1 col) -->
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
                    <span class="${s.color}">${s.progress}%</span>
                  </div>
                  <div class="w-full bg-slate-100 dark:bg-slate-800/80 h-2 rounded-full overflow-hidden">
                    <div class="${s.bg} h-full rounded-full transition-all duration-500" style="width: ${s.progress}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>

            <a href="#/practice" class="w-full text-center py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-500 hover:text-white text-xs font-bold text-slate-600 dark:text-slate-300 transition-all">
              Practice Specific Subject &rarr;
            </a>
          </div>
        </div>

        <!-- THIRD BENTO ROW: GitHub-Style 365 Day Study Heatmap & AI Recommendations -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- 365-Day Study Heatmap (2 cols) -->
          <div class="lg:col-span-2 bento-card p-6 flex flex-col justify-between">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-calendar-days text-emerald-500"></i>
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
                <span class="w-2.5 h-2.5 rounded-xs bg-slate-100 dark:bg-slate-800"></span>
                <span class="w-2.5 h-2.5 rounded-xs bg-emerald-500/30"></span>
                <span class="w-2.5 h-2.5 rounded-xs bg-emerald-500/60"></span>
                <span class="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
              </div>
              <span>More Active</span>
            </div>
          </div>

          <!-- AI Assistant Insights Bento Tile -->
          <div class="bento-card p-6 flex flex-col justify-between bg-gradient-to-b from-indigo-950/20 to-transparent">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-4">
              <div class="flex items-center gap-2 text-primary-500">
                <i class="fa-solid fa-robot text-lg"></i>
                <h4 class="font-display font-bold text-base text-slate-900 dark:text-white">AI Study Insights</h4>
              </div>
              <span class="kbd-badge">Gemini AI</span>
            </div>

            <div class="flex flex-col gap-3 py-3">
              <div class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs flex gap-3">
                <i class="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5 text-sm"></i>
                <div>
                  <p class="font-bold text-slate-800 dark:text-slate-200">Revise Paging Algorithms</p>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Your accuracy on OS memory management dropped below 60%.</p>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex gap-3">
                <i class="fa-solid fa-circle-check text-emerald-500 mt-0.5 text-sm"></i>
                <div>
                  <p class="font-bold text-slate-800 dark:text-slate-200">Graph Theory Mastery</p>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Great job! 95% accuracy in your last test session.</p>
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
              <div class="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-400 flex items-center justify-center text-xl mb-3">
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
                  ${attempts.map(att => `
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

      </div>
    `;
  },

  async init() {
    // Render the study hours chart via Chart.js
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
  }
};
