import { getTheme } from '../utils/theme';

export const About = {
  async render() {
    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-fade-in space-y-12">
        <!-- Hero Header -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div class="absolute -right-20 -top-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-20 -bottom-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="relative z-10 max-w-3xl space-y-4">
            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary-500/20 text-primary-300 border border-primary-500/30 backdrop-blur-md">
              <i class="fa-solid fa-graduation-cap"></i> About GateLabs
            </span>
            <h1 class="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
              Empowering GATE CS & IT Aspirants with <span class="text-gradient-purple">Next-Gen AI</span>
            </h1>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed font-semibold">
              GateLabs is a comprehensive preparation ecosystem engineered specifically for GATE (Graduate Aptitude Test in Engineering) Computer Science & Information Technology candidates. We combine real past-year questions, simulated CBT exams, intelligent error tracking, and Gemini AI to streamline your revision.
            </p>
          </div>
        </div>

        <!-- Mission & Vision Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="glass-card p-8 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden group hover:border-primary-500/40 transition-all duration-300">
            <div class="h-14 w-14 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center text-2xl mb-6 shadow-md">
              <i class="fa-solid fa-bullseye"></i>
            </div>
            <h3 class="font-display font-bold text-2xl text-slate-900 dark:text-white mb-3">Our Mission</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
              To democratize high-quality GATE preparation by replacing static question banks with an interactive, adaptive AI study companion that identifies concept gaps, provides instant step-by-step solutions, and accelerates rank improvement.
            </p>
          </div>

          <div class="glass-card p-8 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
            <div class="h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl mb-6 shadow-md">
              <i class="fa-solid fa-compass"></i>
            </div>
            <h3 class="font-display font-bold text-2xl text-slate-900 dark:text-white mb-3">Our Vision</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
              To build India's most intelligent learning platform for engineering competitive exams—where every student gets a personalized study roadmap, authentic test environment, and automated visual analytics.
            </p>
          </div>
        </div>

        <!-- Key Platform Pillars -->
        <div class="space-y-6">
          <div class="text-center max-w-2xl mx-auto space-y-2">
            <h2 class="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">Core Platform Features</h2>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">Designed around the exact demands of GATE CS & IT preparation.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Pillar 1 -->
            <div class="glass-card p-6 rounded-2xl border border-slate-200/60 dark:border-white/[0.08] hover:-translate-y-1 transition-all duration-300">
              <div class="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl mb-4">
                <i class="fa-solid fa-brain"></i>
              </div>
              <h4 class="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">AI Assistant</h4>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                Powered by Gemini 1.5 Flash to solve doubts, break down algorithms, and generate custom practice questions.
              </p>
            </div>

            <!-- Pillar 2 -->
            <div class="glass-card p-6 rounded-2xl border border-slate-200/60 dark:border-white/[0.08] hover:-translate-y-1 transition-all duration-300">
              <div class="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4">
                <i class="fa-solid fa-pen-to-square"></i>
              </div>
              <h4 class="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">CBT Mock Tests</h4>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                Authentic GATE exam user interface complete with scientific calculator, question palette, and timed countdown.
              </p>
            </div>

            <!-- Pillar 3 -->
            <div class="glass-card p-6 rounded-2xl border border-slate-200/60 dark:border-white/[0.08] hover:-translate-y-1 transition-all duration-300">
              <div class="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl mb-4">
                <i class="fa-solid fa-sliders"></i>
              </div>
              <h4 class="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">Mistake Analytics</h4>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                Interactive charts tracking accuracy rates, topic-wise proficiency, time management, and historical test logs.
              </p>
            </div>

            <!-- Pillar 4 -->
            <div class="glass-card p-6 rounded-2xl border border-slate-200/60 dark:border-white/[0.08] hover:-translate-y-1 transition-all duration-300">
              <div class="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl mb-4">
                <i class="fa-solid fa-database"></i>
              </div>
              <h4 class="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">Extensive PYQs</h4>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                Curated past-year questions categorized by subject (Data Structures, OS, Algorithms, DBMS, CN, TOC, etc.).
              </p>
            </div>
          </div>
        </div>

        <!-- Tech Stack & Architecture -->
        <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] space-y-6">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-500 to-indigo-600 flex items-center justify-center text-white text-lg">
              <i class="fa-solid fa-code"></i>
            </div>
            <div>
              <h3 class="font-display font-bold text-xl text-slate-900 dark:text-white">Tech Stack & Architecture</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold">Modern, lightweight, and blazingly fast client-side web app architecture.</p>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-2">
            <div class="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-white/[0.04] text-center space-y-1">
              <div class="font-bold text-slate-900 dark:text-white text-sm">Vite</div>
              <div class="text-[11px] text-slate-500">Build Tool</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-white/[0.04] text-center space-y-1">
              <div class="font-bold text-slate-900 dark:text-white text-sm">Vanilla JS</div>
              <div class="text-[11px] text-slate-500">ES Modules</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-white/[0.04] text-center space-y-1">
              <div class="font-bold text-slate-900 dark:text-white text-sm">Tailwind CSS</div>
              <div class="text-[11px] text-slate-500">Styling</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-white/[0.04] text-center space-y-1">
              <div class="font-bold text-slate-900 dark:text-white text-sm">Firebase</div>
              <div class="text-[11px] text-slate-500">Authentication</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-white/[0.04] text-center space-y-1">
              <div class="font-bold text-slate-900 dark:text-white text-sm">Gemini AI</div>
              <div class="text-[11px] text-slate-500">LLM Engine</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-white/[0.04] text-center space-y-1">
              <div class="font-bold text-slate-900 dark:text-white text-sm">Chart.js</div>
              <div class="text-[11px] text-slate-500">Data Viz</div>
            </div>
          </div>
        </div>

        <!-- Quick Action Banner -->
        <div class="text-center p-8 rounded-3xl bg-gradient-to-r from-primary-600/10 via-indigo-600/10 to-primary-600/10 border border-primary-500/20 space-y-4">
          <h3 class="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Ready to Boost Your GATE Score?</h3>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold max-w-xl mx-auto">
            Start solving targeted topic questions or simulate a full-length Computer Based Test right now.
          </p>
          <div class="flex items-center justify-center gap-4 pt-2">
            <a href="#/practice" class="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold text-sm hover:shadow-lg transition-all">
              Start Practice <i class="fa-solid fa-arrow-right ml-1"></i>
            </a>
            <a href="#/mock-test" class="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              Take Mock Test
            </a>
          </div>
        </div>
      </div>
    `;
  },

  async init() {
    // Scroll to top when loaded
    window.scrollTo(0, 0);
  }
};
