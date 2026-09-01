import { showToast } from '../utils/toast';
import { MockTest } from './MockTest';

export const SbiClerkPrep = {
  parsedQuestions: [],
  activeTab: 'expected2026', // 'expected2026' | 'pyqs' | 'mocks' | 'pattern' | 'syllabus'

  async render() {
    return `
      <div class="flex flex-col gap-8 animate-fade-in font-sans pb-12">
        
        <!-- Hero Header Info Card -->
        <div class="glass-panel p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-primary-500/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
          <div class="absolute -right-20 -top-20 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-20 -bottom-20 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="flex items-center gap-5 relative z-10">
            <div class="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-blue-500/20">
              <i class="fa-solid fa-building-columns"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-extrabold text-[10px] tracking-wider uppercase border border-blue-500/20">
                  SBI Junior Associate 2026
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] tracking-wider uppercase border border-amber-500/20">
                  🎯 8 Expected 2026 Papers
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] tracking-wider uppercase border border-emerald-500/20">
                  2025 PYQs + 7 Mocks
                </span>
              </div>
              <h3 class="font-display font-extrabold text-xl md:text-2xl text-slate-900 dark:text-white leading-tight">
                SBI Clerk 2026 Preparation Portal
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold max-w-2xl leading-relaxed">
                Attempt 8 high-probability full-length 2026 expected question papers modeled on authentic 2025 shift patterns, plus official 2025 memory-based papers and progressive mock tests in full CBT mode.
              </p>
            </div>
          </div>

          <!-- Quick Stat Badge -->
          <div class="flex md:flex-col gap-3 relative z-10 border-t md:border-t-0 md:border-l border-slate-200/60 dark:border-white/[0.08] pt-4 md:pt-0 md:pl-6 flex-shrink-0 w-full md:w-auto justify-between md:justify-center text-xs font-bold">
            <div class="flex items-center gap-2">
              <div class="h-7 w-7 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs"><i class="fa-solid fa-clock"></i></div>
              <div><span class="text-slate-400 dark:text-slate-500 block text-[9px] uppercase font-bold">Duration</span><span class="text-slate-900 dark:text-white font-extrabold">60 Mins</span></div>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-7 w-7 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xs"><i class="fa-solid fa-list-ol"></i></div>
              <div><span class="text-slate-400 dark:text-slate-500 block text-[9px] uppercase font-bold">Questions</span><span class="text-slate-900 dark:text-white font-extrabold">100 MCQs</span></div>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-7 w-7 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-xs"><i class="fa-solid fa-scale-unbalanced"></i></div>
              <div><span class="text-slate-400 dark:text-slate-500 block text-[9px] uppercase font-bold">Marking</span><span class="text-slate-900 dark:text-white font-extrabold">+1 / –0.25</span></div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs: Expected 2026 | PYQs | 7 Mocks | Exam Pattern | Syllabus -->
        <div class="flex gap-2 border-b border-slate-200/60 dark:border-white/[0.06] pb-3 overflow-x-auto no-scrollbar">
          <button id="sbi-tab-expected" class="sbi-tab-btn px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${this.activeTab === 'expected2026' ? 'bg-primary-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'}">
            <i class="fa-solid fa-bullseye text-amber-300"></i> 🎯 2026 Expected Papers (8 Sets)
          </button>
          <button id="sbi-tab-pyqs" class="sbi-tab-btn px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${this.activeTab === 'pyqs' ? 'bg-primary-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'}">
            <i class="fa-solid fa-file-circle-check"></i> 2025 PYQ Real Papers (3 Shifts)
          </button>
          <button id="sbi-tab-mocks" class="sbi-tab-btn px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${this.activeTab === 'mocks' ? 'bg-primary-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'}">
            <i class="fa-solid fa-layer-group"></i> 7 Progressive Mock Tests
          </button>
          <button id="sbi-tab-pattern" class="sbi-tab-btn px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${this.activeTab === 'pattern' ? 'bg-primary-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'}">
            <i class="fa-solid fa-table-list"></i> Exam Pattern (Prelims & Mains)
          </button>
          <button id="sbi-tab-syllabus" class="sbi-tab-btn px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${this.activeTab === 'syllabus' ? 'bg-primary-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'}">
            <i class="fa-solid fa-book-open"></i> Detailed 2026 Syllabus
          </button>
        </div>

        <!-- TAB CONTENT 0: 2026 EXPECTED PAPERS (DEFAULT) -->
        <div id="sbi-content-expected" class="${this.activeTab === 'expected2026' ? '' : 'hidden'} flex flex-col gap-8">
          
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-fire text-amber-500 text-sm"></i>
                <h4 class="font-display font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                  8 Full-Length 2026 Predicted Question Papers (Exact Shift Calibration)
                </h4>
              </div>
              <span class="text-[11px] font-bold text-slate-400">800 Comprehensive Qs</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <!-- Paper 1 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold uppercase tracking-wider border border-blue-500/20">
                      Expected Paper 1
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    2026 Paper 1 (Core FinTech & Retail Banking)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    FinTech & micro-credit RC, Store inventory DI, IT department caselet, 8-floor puzzle, 10-person parallel rows, quadratic equations, and number series.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-blue-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-exp-1" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Paper 1
                  </button>
                </div>
              </div>

              <!-- Paper 2 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/20">
                      Expected Paper 2
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    2026 Paper 2 (Solar Micro-Grids & Healthcare)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Solar electrification RC, hospital footfall bar DI, food delivery caselet, 8-box stack puzzle, square table seating, and speed drill arithmetic.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-emerald-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-exp-2" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Paper 2
                  </button>
                </div>
              </div>

              <!-- Paper 3 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase tracking-wider border border-indigo-500/20">
                      Expected Paper 3
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    2026 Paper 3 (UPI 2.0 & Auto Manufacturing)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Fast cross-border remittances RC, automobile production DI, airline seat caselet, circular table seating, and 7-day schedule puzzle.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-indigo-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-exp-3" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Paper 3
                  </button>
                </div>
              </div>

              <!-- Paper 4 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-wider border border-amber-500/20">
                      Expected Paper 4
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    2026 Paper 4 (Precision Agronomy & Cloud Orders)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Precision irrigation & FPOs RC, cloud kitchen lunch/dinner DI, fitness club caselet, 8-person month-date puzzle, and uncertain linear row.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-amber-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-exp-4" class="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Paper 4
                  </button>
                </div>
              </div>

              <!-- Paper 5 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-violet-500/10 rounded-full blur-xl group-hover:bg-violet-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 text-[10px] font-extrabold uppercase tracking-wider border border-violet-500/20">
                      Expected Paper 5
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    2026 Paper 5 (Green Hydrogen & Metro Ridership)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Heavy industrial decarbonization RC, metro line ridership DI, warehouse packages caselet, 4-floor × 2-flat puzzle, and bank designation hierarchy.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-violet-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-exp-5" class="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Paper 5
                  </button>
                </div>
              </div>

              <!-- Paper 6 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-teal-500/10 rounded-full blur-xl group-hover:bg-teal-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 text-[10px] font-extrabold uppercase tracking-wider border border-teal-500/20">
                      Expected Paper 6
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    2026 Paper 6 (Natural Farming & Courier Logistics)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Organic cooperative hubs RC, courier express/standard DI, lab samples caselet, 12-person parallel rows, 7-box stack, and coded inequalities.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-teal-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-exp-6" class="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Paper 6
                  </button>
                </div>
              </div>

              <!-- Paper 7 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold uppercase tracking-wider border border-rose-500/20">
                      Expected Paper 7
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    2026 Paper 7 (LEO Satellite & Campus Placements)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Space broadband communications RC, university placement statistics DI, media streaming caselet, year-age calculation puzzle, and 8-box stack.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-rose-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-exp-7" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Paper 7
                  </button>
                </div>
              </div>

              <!-- Paper 8 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 text-[10px] font-extrabold uppercase tracking-wider border border-purple-500/20">
                      Expected Paper 8
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    2026 Paper 8 (Post-Quantum Security & Bank Assets)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Quantum-resistant cryptography RC, branch banking deposits/advances DI, advisory portfolios caselet, rectangular table seating, and 8-person linear row.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-purple-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-exp-8" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Paper 8
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div class="border-t border-slate-200/50 dark:border-white/[0.05]"></div>

          <!-- Quick Predictor Features Banner -->
          <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-blue-500/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl flex-shrink-0">
                <i class="fa-solid fa-brain"></i>
              </div>
              <div>
                <h5 class="font-display font-extrabold text-sm text-slate-900 dark:text-white">Calibrated strictly on 2025 Real Shifts (Sept 2025)</h5>
                <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Every expected mock is designed with the exact balance of Simplifications, Caselet DI, Syllogisms with "Only a few", and 100% detailed step-by-step solutions.</p>
              </div>
            </div>
          </div>

        </div>

        <!-- TAB CONTENT 1: PREVIOUS YEAR PAPERS (PYQs) -->
        <div id="sbi-content-pyqs" class="${this.activeTab === 'pyqs' ? '' : 'hidden'} flex flex-col gap-8">
          
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-certificate text-primary-500 text-sm"></i>
                <h4 class="font-display font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                  SBI Clerk Pre 2025 Official Memory-Based Papers
                </h4>
              </div>
              <span class="text-[11px] font-bold text-slate-400">100% Verified Real Exam Questions</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <!-- PYQ 1: 21st Sep 2025 - Shift 1 -->
              <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-28 h-28 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold uppercase tracking-wider border border-blue-500/20">
                      21-Sep-2025 • Shift 1
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    SBI Clerk Pre 2025 (21-Sep-2025 Shift 1)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 font-semibold leading-relaxed">
                    Authentic exam paper: Sayer Daheir traditional printing press RC, Maria gardening cloze test, Park visitors line graph, school sports tabular DI, 8-floor puzzle, and square table seating.
                  </p>
                  <div class="mt-3 flex flex-wrap gap-1.5">
                    <span class="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-300">English (1-30)</span>
                    <span class="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-300">Quant (31-65)</span>
                    <span class="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-300">Reasoning (66-100)</span>
                  </div>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-blue-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-pyq-1" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Attempt Shift 1
                  </button>
                </div>
              </div>

              <!-- PYQ 2: 20th Sep 2025 - Shift 2 -->
              <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/20">
                      20-Sep-2025 • Shift 2
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    SBI Clerk Pre 2025 (20-Sep-2025 Shift 2)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 font-semibold leading-relaxed">
                    Authentic exam paper: Tokyo shopping para jumbles, Akshara smart water sensor RC, Cheesecake sales tabular DI, school student trends line graph, 10-person parallel rows, and 7-day schedule puzzle.
                  </p>
                  <div class="mt-3 flex flex-wrap gap-1.5">
                    <span class="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-300">English (1-30)</span>
                    <span class="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-300">Quant (31-65)</span>
                    <span class="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-300">Reasoning (66-100)</span>
                  </div>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-emerald-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-pyq-2" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Attempt Shift 2
                  </button>
                </div>
              </div>

              <!-- PYQ 3: 20th Sep 2025 - Shift 1 -->
              <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-28 h-28 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 text-[10px] font-extrabold uppercase tracking-wider border border-purple-500/20">
                      20-Sep-2025 • Shift 1
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    SBI Clerk Pre 2025 (20-Sep-2025 Shift 1)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 font-semibold leading-relaxed">
                    Authentic exam paper: Grand Oceanic Convention RC, Bleed Orange brand para jumbles, team runs bar graph, book store sales DI, 8-floor puzzle, and 8-person birth month/date puzzle.
                  </p>
                  <div class="mt-3 flex flex-wrap gap-1.5">
                    <span class="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-300">English (1-30)</span>
                    <span class="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-300">Quant (31-65)</span>
                    <span class="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-300">Reasoning (66-100)</span>
                  </div>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-purple-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-pyq-3" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Attempt Shift 1
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- TAB CONTENT 2: 7 PROGRESSIVE MOCK TESTS -->
        <div id="sbi-content-mocks" class="${this.activeTab === 'mocks' ? '' : 'hidden'} flex flex-col gap-8">
          
          <!-- 7 Official Mock Cards Grid -->
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-trophy text-primary-500 text-sm"></i>
                <h4 class="font-display font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                  7-Level Progressive Mock Series (Increasing Difficulty)
                </h4>
              </div>
              <span class="text-[11px] font-bold text-slate-400">700 High Standard Qs</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              
              <!-- Mock Card 1 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/20">
                      Level 1 • Easy
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    SBI Clerk Mock 1 (Foundation & Starter)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Ideal benchmark starter: Fundamental simplifications, clean missing number series, direct linear seating, blood relations, and core banking RC.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-emerald-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-mock-1" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Exam
                  </button>
                </div>
              </div>

              <!-- Mock Card 2 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold uppercase tracking-wider border border-blue-500/20">
                      Level 2 • Easy-Moderate
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    SBI Clerk Mock 2 (Speed Drill & Baseline)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Speed-oriented prelims test: Square seating puzzle, 7-floor puzzle, bar graph DI, syllogisms with "Only a few", and EV transition RC.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-blue-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-mock-2" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Exam
                  </button>
                </div>
              </div>

              <!-- Mock Card 3 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase tracking-wider border border-indigo-500/20">
                      Level 3 • Moderate (Real Exam)
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    SBI Clerk Mock 3 (Standard Prelims Exam)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Exact authentic Prelims level: Month-Date arrangement, 8-box stacking, line graph DI, quadratic equations, and semiconductor RC.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-indigo-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-mock-3" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Exam
                  </button>
                </div>
              </div>

              <!-- Mock Card 4 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-wider border border-amber-500/20">
                      Level 4 • Moderate-Tricky
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    SBI Clerk Mock 4 (Moderate-Advanced)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Tricky variations: 4-floor × 2-flat puzzle, 10-person parallel rows, pie chart DI, coded inequalities, and CBDC digital currency RC.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-amber-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-mock-4" class="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Exam
                  </button>
                </div>
              </div>

              <!-- Mock Card 5 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-violet-500/10 rounded-full blur-xl group-hover:bg-violet-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 text-[10px] font-extrabold uppercase tracking-wider border border-violet-500/20">
                      Level 5 • Advanced
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    SBI Clerk Mock 5 (Advanced Speed Drill)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    Challenging speed drill: Bank designation hierarchy puzzle, uncertain person linear row, missing tabular DI, and space economy RC.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-violet-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-mock-5" class="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Exam
                  </button>
                </div>
              </div>

              <!-- Mock Card 6 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-500/20 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-2.5 py-1 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold uppercase tracking-wider border border-rose-500/20">
                      Level 6 • Hard / Mains Gateway
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-clock mr-1"></i> 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    SBI Clerk Mock 6 (Mains Gateway & High Diff)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    High complexity: 2-variable floor-car puzzle, circular table with blood relations, caselet DI, quantitative tightening and macroeconomics RC.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-rose-500 mr-1"></i> 100 Qs</span>
                  <button id="btn-sbi-mock-6" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i> Start Exam
                  </button>
                </div>
              </div>

              <!-- Mock Card 7 -->
              <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col justify-between gap-5 hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group md:col-span-2 lg:col-span-2">
                <div class="absolute -right-8 -bottom-8 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl group-hover:bg-purple-500/25 transition-colors"></div>
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="px-3 py-1 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 text-[10px] font-extrabold uppercase tracking-wider border border-purple-500/30">
                      Level 7 • Ultimate Pro Challenge
                    </span>
                    <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-bolt mr-1 text-amber-400"></i> Power Mock • 60 Mins</span>
                  </div>
                  <h5 class="font-display font-extrabold text-base text-slate-900 dark:text-white mt-3 leading-snug">
                    SBI Clerk Mock 7 (Ultimate Pro Challenge - Expert Level)
                  </h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed">
                    The ultimate trial: 12-person double row with color attributes, year-age calculation puzzle, Gross vs Net NPA banking DI, quantum cryptography RC, and advanced arithmetic word problems.
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4">
                  <div class="flex items-center gap-3">
                    <span class="text-xs text-slate-600 dark:text-slate-300 font-extrabold"><i class="fa-solid fa-circle-question text-purple-500 mr-1"></i> 100 Questions</span>
                    <span class="text-xs text-purple-600 dark:text-purple-400 font-bold hidden sm:inline"><i class="fa-solid fa-shield-halved mr-1"></i> Expert Calibration</span>
                  </div>
                  <button id="btn-sbi-mock-7" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/25">
                    <i class="fa-solid fa-fire text-amber-300 text-xs"></i> Start Ultimate Mock
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div class="border-t border-slate-200/50 dark:border-white/[0.05]"></div>

          <!-- Custom SBI Clerk Question Paper Creator & Parser -->
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-wand-magic-sparkles text-primary-500 text-sm"></i>
              <h4 class="font-display font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                Custom SBI Clerk Mock Creator & Question Parser
              </h4>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Left Column: Paste questions area -->
              <div class="lg:col-span-2 flex flex-col gap-4">
                <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4 shadow-sm">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-display font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Paste Exam Questions Block</h4>
                      <p class="text-[11px] text-slate-400 mt-0.5">Paste standard delimited questions or structured question blocks.</p>
                    </div>
                    <button id="btn-toggle-sbi-guide" class="text-xs text-primary-500 font-bold hover:underline flex items-center gap-1">
                      <i class="fa-solid fa-circle-info"></i> Format Guide
                    </button>
                  </div>

                  <!-- Format Guide Box (Collapsible) -->
                  <div id="sbi-format-guide-box" class="hidden p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-950/40 border border-slate-200/40 dark:border-white/[0.05] text-[11px] text-slate-600 dark:text-slate-400 font-semibold space-y-2">
                    <p class="text-xs text-slate-900 dark:text-white font-extrabold">Standard Question Paste Format:</p>
                    <p>Paste questions formatted as below (or separated by <code class="font-mono text-primary-500">---</code>):</p>
                    <pre class="bg-black/5 dark:bg-black/40 p-3 rounded-xl overflow-x-auto text-[10px] text-primary-500 font-mono leading-relaxed">
Q1: What will come in place of the question mark in: 144 ÷ 12 + 18 × 5 - 35 = ?
A) 67
B) 65
C) 69
D) 71
E) 63
Answer: A
Explanation: 144/12 = 12. 18*5 = 90. 12 + 90 - 35 = 67.

Q2: ...</pre>
                  </div>

                  <textarea id="sbi-questions-textarea" placeholder="Paste your 100-question or custom question bank here..." rows="8" class="glass-input text-xs font-mono font-semibold resize-none bg-slate-50/50 dark:bg-slate-950/20 focus:outline-none"></textarea>

                  <div class="flex flex-wrap gap-2">
                    <button id="btn-load-pyq-21sep1" class="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all select-none active:scale-95 flex items-center gap-1">
                      <i class="fa-solid fa-file-lines text-blue-500"></i> 2025 PYQ (21-Sep)
                    </button>
                    <button id="btn-load-exp-paper1" class="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all select-none active:scale-95 flex items-center gap-1">
                      <i class="fa-solid fa-bullseye text-amber-500"></i> 2026 Expected #1
                    </button>
                    <button id="btn-load-exp-paper2" class="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all select-none active:scale-95 flex items-center gap-1">
                      <i class="fa-solid fa-bullseye text-emerald-500"></i> 2026 Expected #2
                    </button>
                    <button id="btn-parse-sbi-questions" class="flex-1 py-2 rounded-xl btn-accent text-white font-bold text-xs shadow-md active:scale-95 transition-all">
                      <i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Parse & Load Questions
                    </button>
                  </div>
                </div>
              </div>

              <!-- Right Column: Question Breakdown & Launch -->
              <div class="lg:col-span-1 flex flex-col gap-6">
                <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-5 shadow-sm">
                  <div class="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/[0.04]">
                    <i class="fa-solid fa-list-check text-primary-500"></i>
                    <h4 class="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Custom Mock Overview</h4>
                  </div>

                  <div class="flex flex-col gap-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <div class="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/[0.04]">
                      <span>Total Questions:</span>
                      <span id="sbi-stat-total" class="font-extrabold text-slate-900 dark:text-white text-sm">0 / 100</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded-full bg-blue-500"></span> English Language (1–30):</span>
                      <span id="sbi-stat-english" class="font-bold text-slate-900 dark:text-white">0</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded-full bg-emerald-500"></span> Quantitative Aptitude (31–65):</span>
                      <span id="sbi-stat-quant" class="font-bold text-slate-900 dark:text-white">0</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded-full bg-indigo-500"></span> Reasoning Ability (66–100):</span>
                      <span id="sbi-stat-reasoning" class="font-bold text-slate-900 dark:text-white">0</span>
                    </div>
                  </div>

                  <!-- Status Alert Box -->
                  <div id="sbi-status-alert" class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-500 leading-relaxed font-semibold">
                    <i class="fa-solid fa-triangle-exclamation mr-1 animate-pulse"></i> Paste and parse questions block to enable SBI Clerk Simulator.
                  </div>

                  <button id="btn-start-custom-sbi" disabled class="w-full py-3.5 rounded-xl btn-accent text-white font-bold text-sm shadow-md active:scale-95 transition-all opacity-50 cursor-not-allowed">
                    Start Custom Mock Test
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- TAB CONTENT 3: EXAM PATTERN -->
        <div id="sbi-content-pattern" class="${this.activeTab === 'pattern' ? '' : 'hidden'} flex flex-col gap-6">
          
          <!-- Highlights Table Card -->
          <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4">
            <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <i class="fa-solid fa-award text-primary-500"></i> SBI Clerk 2026 Syllabus and Exam Pattern - Highlights
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold">Important highlights of the SBI Clerk 2026 recruitment examination to help you plan your preparation strategically.</p>

            <div class="overflow-x-auto rounded-2xl border border-slate-200/60 dark:border-white/[0.06]">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100/80 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200/60 dark:border-white/[0.06]">
                    <th class="p-3.5">Particulars</th>
                    <th class="p-3.5">Details</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-white/[0.04] font-semibold text-slate-700 dark:text-slate-300">
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">Name of the Exam</td><td class="p-3.5 text-primary-500 font-bold">SBI Clerk (Junior Associate) 2026</td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">Mode of Exam</td><td class="p-3.5">Online (Computer-Based Test)</td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">Language of Question</td><td class="p-3.5">Bilingual (English & Hindi) except for English Language section</td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">Nature of Questions</td><td class="p-3.5">Multiple Choice Questions (MCQs)</td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">No. of Questions</td><td class="p-3.5"><span class="font-bold text-slate-900 dark:text-white">Preliminary: 100</span> | <span class="font-bold text-slate-900 dark:text-white">Mains: 190</span></td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">Maximum Marks</td><td class="p-3.5"><span class="font-bold text-slate-900 dark:text-white">Preliminary: 100</span> | <span class="font-bold text-slate-900 dark:text-white">Mains: 200</span></td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">Marking Scheme</td><td class="p-3.5"><span class="text-emerald-500 font-bold">Correct: +1</span> | <span class="text-rose-500 font-bold">Incorrect: –0.25</span></td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">Duration of Test</td><td class="p-3.5"><span class="font-bold">Prelims: 1 Hour (60 mins)</span> | <span class="font-bold">Mains: 2 Hours 40 Minutes (160 mins)</span></td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">Selection Process</td><td class="p-3.5">Prelims (Qualifying) → Mains (Merit) → Language Proficiency Test (LPT). No Interview.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Prelims Pattern Table -->
          <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <i class="fa-solid fa-clock text-blue-500"></i> SBI Clerk Prelims Exam Pattern 2026
              </h4>
              <span class="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-500 font-extrabold text-[10px] uppercase tracking-wider">Qualifying Stage</span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold">The Prelims exam consists of 3 subjects with a 20-minute sectional timer for each section. Negative marking is 0.25 marks per wrong answer.</p>

            <div class="overflow-x-auto rounded-2xl border border-slate-200/60 dark:border-white/[0.06]">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200/60 dark:border-white/[0.06]">
                    <th class="p-3.5">Section</th>
                    <th class="p-3.5">No. of Questions</th>
                    <th class="p-3.5">Marks</th>
                    <th class="p-3.5">Duration</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-white/[0.04] font-semibold text-slate-700 dark:text-slate-300">
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">English Language</td><td class="p-3.5 font-mono">30</td><td class="p-3.5 font-mono">30</td><td class="p-3.5 font-mono">20 mins</td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">Numerical Ability</td><td class="p-3.5 font-mono">35</td><td class="p-3.5 font-mono">35</td><td class="p-3.5 font-mono">20 mins</td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">Reasoning Ability</td><td class="p-3.5 font-mono">35</td><td class="p-3.5 font-mono">35</td><td class="p-3.5 font-mono">20 mins</td></tr>
                  <tr class="bg-slate-50 dark:bg-white/[0.02] font-extrabold text-slate-900 dark:text-white"><td class="p-3.5">Total</td><td class="p-3.5 font-mono">100</td><td class="p-3.5 font-mono">100</td><td class="p-3.5 font-mono">60 mins (1 Hour)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mains Pattern Table -->
          <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <i class="fa-solid fa-trophy text-indigo-500"></i> SBI Clerk Mains Exam Pattern 2026
              </h4>
              <span class="px-3 py-1 rounded-xl bg-indigo-500/10 text-indigo-500 font-extrabold text-[10px] uppercase tracking-wider">Final Merit Stage</span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold">The Mains exam consists of 4 sections with a total of 190 questions for 200 marks. The duration is 2 hours 40 minutes.</p>

            <div class="overflow-x-auto rounded-2xl border border-slate-200/60 dark:border-white/[0.06]">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200/60 dark:border-white/[0.06]">
                    <th class="p-3.5">Section</th>
                    <th class="p-3.5">Subjects</th>
                    <th class="p-3.5">No. of Questions</th>
                    <th class="p-3.5">Marks</th>
                    <th class="p-3.5">Duration</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-white/[0.04] font-semibold text-slate-700 dark:text-slate-300">
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">A</td><td class="p-3.5 font-bold">General English</td><td class="p-3.5 font-mono">40</td><td class="p-3.5 font-mono">40</td><td class="p-3.5 font-mono">35 Minutes</td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">B</td><td class="p-3.5 font-bold">Quantitative Aptitude</td><td class="p-3.5 font-mono">50</td><td class="p-3.5 font-mono">50</td><td class="p-3.5 font-mono">45 Minutes</td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">C</td><td class="p-3.5 font-bold">Reasoning Ability & Computer Aptitude</td><td class="p-3.5 font-mono">50</td><td class="p-3.5 font-mono">60</td><td class="p-3.5 font-mono">45 Minutes</td></tr>
                  <tr class="hover:bg-black/5 dark:hover:bg-white/5"><td class="p-3.5 font-bold">D</td><td class="p-3.5 font-bold">General/Financial Awareness</td><td class="p-3.5 font-mono">50</td><td class="p-3.5 font-mono">50</td><td class="p-3.5 font-mono">35 Minutes</td></tr>
                  <tr class="bg-slate-50 dark:bg-white/[0.02] font-extrabold text-slate-900 dark:text-white"><td class="p-3.5">Total</td><td class="p-3.5">All 4 Sections</td><td class="p-3.5 font-mono">190</td><td class="p-3.5 font-mono">200</td><td class="p-3.5 font-mono">2 Hours 40 Minutes</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB CONTENT 4: DETAILED SYLLABUS -->
        <div id="sbi-content-syllabus" class="${this.activeTab === 'syllabus' ? '' : 'hidden'} flex flex-col gap-6">
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Reasoning Syllabus Column -->
            <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4">
              <div class="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.04]">
                <div class="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-sm"><i class="fa-solid fa-puzzle-piece"></i></div>
                <div>
                  <h4 class="font-display font-extrabold text-sm text-slate-900 dark:text-white">Reasoning Ability</h4>
                  <span class="text-[10px] text-slate-400 font-bold uppercase">35 Qs • 35 Marks</span>
                </div>
              </div>
              <ul class="flex flex-col gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-purple-500 text-[10px] mt-1"></i> <span>Puzzles & Seating Arrangement (Linear, Circular, Square, Floor, Flat, Box, Day/Month/Age)</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-purple-500 text-[10px] mt-1"></i> <span>Syllogisms (Standard & "Only a few")</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-purple-500 text-[10px] mt-1"></i> <span>Inequalities (Direct & Coded)</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-purple-500 text-[10px] mt-1"></i> <span>Blood Relations & Family Tree</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-purple-500 text-[10px] mt-1"></i> <span>Direction & Distance (Angular turns)</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-purple-500 text-[10px] mt-1"></i> <span>Coding-Decoding (Fictitious/Chinese)</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-purple-500 text-[10px] mt-1"></i> <span>Order & Ranking & Alphabet Tests</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-purple-500 text-[10px] mt-1"></i> <span>Alphanumeric Symbol Sequences</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-purple-500 text-[10px] mt-1"></i> <span>Machine Input-Output & Data Sufficiency</span></li>
              </ul>
            </div>

            <!-- Quantitative Aptitude Column -->
            <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4">
              <div class="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.04]">
                <div class="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-sm"><i class="fa-solid fa-calculator"></i></div>
                <div>
                  <h4 class="font-display font-extrabold text-sm text-slate-900 dark:text-white">Quantitative Aptitude</h4>
                  <span class="text-[10px] text-slate-400 font-bold uppercase">35 Qs • 35 Marks</span>
                </div>
              </div>
              <ul class="flex flex-col gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 text-[10px] mt-1"></i> <span>Simplification & Approximation (BODMAS, Surds, Roots)</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 text-[10px] mt-1"></i> <span>Number Series (Missing & Wrong patterns)</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 text-[10px] mt-1"></i> <span>Quadratic Equations & Roots comparisons</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 text-[10px] mt-1"></i> <span>Data Interpretation (Bar, Line, Tabular, Pie, Caselet)</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 text-[10px] mt-1"></i> <span>Percentage, Profit & Loss, Marked Price & Discount</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 text-[10px] mt-1"></i> <span>Simple & Compound Interest</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 text-[10px] mt-1"></i> <span>Ratio & Proportion, Average & Ages</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 text-[10px] mt-1"></i> <span>Time & Work, Pipes & Cisterns</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 text-[10px] mt-1"></i> <span>Speed, Time & Distance, Boats & Streams, Trains</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 text-[10px] mt-1"></i> <span>Mixture & Allegation, Mensuration, Probability & P&C</span></li>
              </ul>
            </div>

            <!-- English Language Column -->
            <div class="glass-panel p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4">
              <div class="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.04]">
                <div class="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm"><i class="fa-solid fa-spell-check"></i></div>
                <div>
                  <h4 class="font-display font-extrabold text-sm text-slate-900 dark:text-white">English Language</h4>
                  <span class="text-[10px] text-slate-400 font-bold uppercase">30 Qs • 30 Marks</span>
                </div>
              </div>
              <ul class="flex flex-col gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-blue-500 text-[10px] mt-1"></i> <span>Reading Comprehension (Inference, Theme, Vocab)</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-blue-500 text-[10px] mt-1"></i> <span>Cloze Test (Passage blanks & context)</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-blue-500 text-[10px] mt-1"></i> <span>Error Detection & Sentence Spotting</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-blue-500 text-[10px] mt-1"></i> <span>Sentence Improvement & Phrase Replacement</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-blue-500 text-[10px] mt-1"></i> <span>Para Jumbles & Sentence Rearrangement</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-blue-500 text-[10px] mt-1"></i> <span>Word Swap & Word Rearrangement</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-blue-500 text-[10px] mt-1"></i> <span>Fillers (Single & Double blanks)</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-blue-500 text-[10px] mt-1"></i> <span>Idioms, Phrasal Verbs & Misspelled Words</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check text-blue-500 text-[10px] mt-1"></i> <span>Column-Based Sentence Completion</span></li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    `;
  },

  async init() {
    window.scrollTo(0, 0);

    // Tab switching event listeners
    const tabExpected = document.getElementById('sbi-tab-expected');
    const tabPyqs = document.getElementById('sbi-tab-pyqs');
    const tabMocks = document.getElementById('sbi-tab-mocks');
    const tabPattern = document.getElementById('sbi-tab-pattern');
    const tabSyllabus = document.getElementById('sbi-tab-syllabus');

    const contentExpected = document.getElementById('sbi-content-expected');
    const contentPyqs = document.getElementById('sbi-content-pyqs');
    const contentMocks = document.getElementById('sbi-content-mocks');
    const contentPattern = document.getElementById('sbi-content-pattern');
    const contentSyllabus = document.getElementById('sbi-content-syllabus');

    const setActiveTab = (tab) => {
      this.activeTab = tab;
      [tabExpected, tabPyqs, tabMocks, tabPattern, tabSyllabus].forEach(btn => {
        btn?.classList.remove('bg-primary-500', 'text-white', 'shadow-md');
        btn?.classList.add('text-slate-600', 'dark:text-slate-400');
      });
      [contentExpected, contentPyqs, contentMocks, contentPattern, contentSyllabus].forEach(c => c?.classList.add('hidden'));

      if (tab === 'expected2026') {
        tabExpected?.classList.add('bg-primary-500', 'text-white', 'shadow-md');
        tabExpected?.classList.remove('text-slate-600', 'dark:text-slate-400');
        contentExpected?.classList.remove('hidden');
      } else if (tab === 'pyqs') {
        tabPyqs?.classList.add('bg-primary-500', 'text-white', 'shadow-md');
        tabPyqs?.classList.remove('text-slate-600', 'dark:text-slate-400');
        contentPyqs?.classList.remove('hidden');
      } else if (tab === 'mocks') {
        tabMocks?.classList.add('bg-primary-500', 'text-white', 'shadow-md');
        tabMocks?.classList.remove('text-slate-600', 'dark:text-slate-400');
        contentMocks?.classList.remove('hidden');
      } else if (tab === 'pattern') {
        tabPattern?.classList.add('bg-primary-500', 'text-white', 'shadow-md');
        tabPattern?.classList.remove('text-slate-600', 'dark:text-slate-400');
        contentPattern?.classList.remove('hidden');
      } else if (tab === 'syllabus') {
        tabSyllabus?.classList.add('bg-primary-500', 'text-white', 'shadow-md');
        tabSyllabus?.classList.remove('text-slate-600', 'dark:text-slate-400');
        contentSyllabus?.classList.remove('hidden');
      }
    };

    tabExpected?.addEventListener('click', () => setActiveTab('expected2026'));
    tabPyqs?.addEventListener('click', () => setActiveTab('pyqs'));
    tabMocks?.addEventListener('click', () => setActiveTab('mocks'));
    tabPattern?.addEventListener('click', () => setActiveTab('pattern'));
    tabSyllabus?.addEventListener('click', () => setActiveTab('syllabus'));

    // 8 Expected 2026 Paper Buttons
    for (let i = 1; i <= 8; i++) {
      const btn = document.getElementById(`btn-sbi-exp-${i}`);
      btn?.addEventListener('click', async () => {
        btn.disabled = true;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Loading...';
        try {
          const res = await fetch(`./pyqs/sbi_clerk_expected_2026_paper_${i}.txt`);
          if (res.ok) {
            const text = await res.text();
            await this.launchExamDirectly(text, `SBI Clerk 2026 Expected Paper ${i}`);
          } else {
            showToast(`Failed to load Expected Paper ${i} asset.`, 'error');
          }
        } catch (err) {
          showToast(`Error: ${err.message}`, 'error');
        } finally {
          btn.disabled = false;
          btn.innerHTML = originalText;
        }
      });
    }

    // 3 Official 2025 PYQ Start Buttons
    const pyqButtons = [
      { id: 'btn-sbi-pyq-1', file: 'sbi_clerk_pyq_2025_sep21_shift1.txt', name: 'SBI Clerk Pre 2025 (21-Sep Shift 1)' },
      { id: 'btn-sbi-pyq-2', file: 'sbi_clerk_pyq_2025_sep20_shift2.txt', name: 'SBI Clerk Pre 2025 (20-Sep Shift 2)' },
      { id: 'btn-sbi-pyq-3', file: 'sbi_clerk_pyq_2025_sep20_shift1.txt', name: 'SBI Clerk Pre 2025 (20-Sep Shift 1)' }
    ];

    pyqButtons.forEach(btnInfo => {
      const btn = document.getElementById(btnInfo.id);
      btn?.addEventListener('click', async () => {
        btn.disabled = true;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Loading...';
        try {
          const res = await fetch(`./pyqs/${btnInfo.file}`);
          if (res.ok) {
            const text = await res.text();
            await this.launchExamDirectly(text, btnInfo.name);
          } else {
            showToast(`Failed to load ${btnInfo.name} asset.`, 'error');
          }
        } catch (err) {
          showToast(`Error: ${err.message}`, 'error');
        } finally {
          btn.disabled = false;
          btn.innerHTML = originalText;
        }
      });
    });

    // 7 Direct Mock Start Buttons
    for (let i = 1; i <= 7; i++) {
      const btn = document.getElementById(`btn-sbi-mock-${i}`);
      btn?.addEventListener('click', async () => {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Loading...';
        try {
          const res = await fetch(`./pyqs/sbi_clerk_mock_${i}.txt`);
          if (res.ok) {
            const text = await res.text();
            await this.launchExamDirectly(text, `SBI Clerk Mock ${i}`);
          } else {
            showToast(`Failed to load SBI Clerk Mock ${i} asset.`, 'error');
          }
        } catch (err) {
          showToast(`Error: ${err.message}`, 'error');
        } finally {
          btn.disabled = false;
          btn.innerHTML = i === 7 ? '<i class="fa-solid fa-fire text-amber-300 text-xs"></i> Start Ultimate Mock' : '<i class="fa-solid fa-play text-[10px]"></i> Start Exam';
        }
      });
    }

    // Custom Parser and Guide elements
    const guideToggle = document.getElementById('btn-toggle-sbi-guide');
    const guideBox = document.getElementById('sbi-format-guide-box');
    const textarea = document.getElementById('sbi-questions-textarea');
    const btnParse = document.getElementById('btn-parse-sbi-questions');
    const btnStartCustom = document.getElementById('btn-start-custom-sbi');

    guideToggle?.addEventListener('click', () => {
      guideBox?.classList.toggle('hidden');
    });

    // Fast load PYQ & Expected buttons into textarea
    const setupQuickLoad = (btnId, fileName, title) => {
      const btn = document.getElementById(btnId);
      btn?.addEventListener('click', async () => {
        try {
          btn.disabled = true;
          const orig = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Loading...';
          const res = await fetch(`./pyqs/${fileName}`);
          if (res.ok) {
            const text = await res.text();
            if (textarea) textarea.value = text;
            showToast(`Loaded ${title} (100 Questions)!`, "success");
            this.parseQuestions(false);
          } else {
            showToast("Failed to fetch paper asset.", "error");
          }
          btn.innerHTML = orig;
        } catch (err) {
          showToast("Error loading: " + err.message, "error");
        } finally {
          btn.disabled = false;
        }
      });
    };

    setupQuickLoad('btn-load-pyq-21sep1', 'sbi_clerk_pyq_2025_sep21_shift1.txt', '2025 PYQ (21-Sep Shift 1)');
    setupQuickLoad('btn-load-exp-paper1', 'sbi_clerk_expected_2026_paper_1.txt', '2026 Expected Paper 1');
    setupQuickLoad('btn-load-exp-paper2', 'sbi_clerk_expected_2026_paper_2.txt', '2026 Expected Paper 2');

    btnParse?.addEventListener('click', () => {
      this.parseQuestions(false);
    });

    btnStartCustom?.addEventListener('click', () => {
      if (this.parsedQuestions.length === 0) {
        showToast("Please parse questions first.", "warning");
        return;
      }
      this.launchMockTest('SBI Clerk Custom Mock');
    });
  },

  async launchExamDirectly(text, examName) {
    if (!text) {
      showToast("Questions not found.", "error");
      return;
    }
    const textarea = document.getElementById('sbi-questions-textarea');
    if (textarea) textarea.value = text;

    this.parseQuestions(true);

    if (this.parsedQuestions.length === 0) {
      showToast("Failed to parse the exam questions.", "error");
      return;
    }
    this.launchMockTest(examName);
  },

  launchMockTest(examName) {
    showToast(`Starting ${examName} CBT Simulator...`, "info");

    // Configure MockTest state for realistic SBI Clerk 2026 Prelims
    MockTest.questions = [...this.parsedQuestions];
    MockTest.isTesting = true;
    MockTest.currentIdx = 0;
    MockTest.answers = {};
    MockTest.status = {};
    MockTest.timeLeft = 60 * 60; // 60 minutes (1 hour)
    MockTest.totalTime = 60 * 60;
    MockTest.selectedSubject = examName;
    MockTest.selectedTopic = 'All';
    MockTest.calcLeft = undefined;
    MockTest.calcTop = undefined;

    // Group sections dynamically
    MockTest.sections = {};
    MockTest.questions.forEach((q, idx) => {
      const secName = q.subject || 'General Section';
      if (!MockTest.sections[secName]) {
        MockTest.sections[secName] = [];
      }
      MockTest.sections[secName].push(idx);
      MockTest.status[q.id] = 'not-visited';
    });

    if (MockTest.questions.length > 0) {
      MockTest.status[MockTest.questions[0].id] = 'not-answered';
    }

    document.body.classList.add('fullscreen-exam');

    // Unload safety handler
    MockTest.unloadHandler = (e) => {
      e.preventDefault();
      e.returnValue = 'An exam is currently in progress. Leaving now will forfeit all progress.';
    };
    window.addEventListener('beforeunload', MockTest.unloadHandler);

    MockTest.startTimer();
    window.location.hash = '#/mock-test';
  },

  parseQuestions(silent = false) {
    const textarea = document.getElementById('sbi-questions-textarea');
    const text = textarea ? textarea.value.trim() : '';
    if (!text) {
      if (!silent) showToast("Input area is empty.", "warning");
      return;
    }

    let parsed = [];

    if (text.includes('subject:') || text.includes('---')) {
      // Standard file format separated by ---
      const rawBlocks = text.split(/---/);
      rawBlocks.forEach((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return;

        const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
        let questionText = '';
        let options = [];
        let correctAnswer = 'A';
        let explanationVal = '';
        let subjectVal = '';
        let topicVal = 'General';
        let difficultyVal = 'Medium';

        lines.forEach(line => {
          const lower = line.toLowerCase();
          if (lower.startsWith('subject:')) {
            subjectVal = line.substring(8).trim();
          } else if (lower.startsWith('topic:')) {
            topicVal = line.substring(6).trim();
          } else if (lower.startsWith('difficulty:')) {
            difficultyVal = line.substring(11).trim();
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
          } else if (lower.startsWith('option e:') || line.startsWith('E)')) {
            options[4] = lower.startsWith('option e:') ? line.substring(9).trim() : line.substring(line.indexOf(')') + 1).trim();
          } else if (lower.startsWith('correct:') || lower.startsWith('answer:')) {
            const val = line.substring(line.indexOf(':') + 1).trim().toUpperCase();
            correctAnswer = val.includes('A') || val === '0' ? 'A' :
                            val.includes('B') || val === '1' ? 'B' :
                            val.includes('C') || val === '2' ? 'C' :
                            val.includes('D') || val === '3' ? 'D' : 'E';
          } else if (lower.startsWith('explanation:')) {
            explanationVal = line.substring(12).trim();
          }
        });

        const qNum = parsed.length + 1;
        let subject = subjectVal;
        if (!subject) {
          if (qNum <= 30) subject = 'English Language (1-30)';
          else if (qNum <= 65) subject = 'Quantitative Aptitude (31-65)';
          else subject = 'Reasoning Ability (66-100)';
        }

        parsed.push({
          id: `q_sbi_${Date.now()}_${index}`,
          type: 'MCQ',
          question: questionText || `Question review for SBI Clerk #${qNum}`,
          options: options.length >= 2 ? options : ["Option A", "Option B", "Option C", "Option D", "Option E"],
          correctAnswer: correctAnswer === 'A' ? 0 : (correctAnswer === 'B' ? 1 : (correctAnswer === 'C' ? 2 : (correctAnswer === 'D' ? 3 : 4))),
          explanation: explanationVal || 'SBI Clerk 2026 solution review.',
          marks: 1,
          negativeMarks: 0.25,
          subject,
          topic: topicVal,
          difficulty: difficultyVal,
          year: 2026
        });
      });
    } else {
      // Natural paste format
      const rawBlocks = text.split(/(?=Q\d+[:\.\s]|Ques\s+\d+[:\.\s]|\d+[\.\s]\s*[A-Z])/i);
      rawBlocks.forEach((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return;

        const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length < 2) return;

        let questionText = lines[0].replace(/^Q\d+[:\.]\s*/i, '').replace(/^\d+[:\.\s]\s*/i).trim();
        const options = [];
        let correctAnswer = 'A';
        let explanation = 'SBI Clerk solution review.';

        lines.slice(1).forEach(line => {
          const optMatch = line.match(/^([A-E])[\)\.\s]\s*(.*)/i);
          if (optMatch) {
            options.push(optMatch[2].trim());
          }

          const ansMatch = line.match(/^(?:Answer|Correct\s+Answer)\s*:\s*([A-E])/i);
          if (ansMatch) {
            correctAnswer = ansMatch[1].toUpperCase();
          }

          const expMatch = line.match(/^(?:Explanation)\s*:\s*(.*)/i);
          if (expMatch) {
            explanation = expMatch[1].trim();
          }
        });

        if (options.length < 2) {
          options.push("Option A", "Option B", "Option C", "Option D", "Option E");
        }

        const qNum = parsed.length + 1;
        let subject = 'English Language (1-30)';
        if (qNum > 30 && qNum <= 65) subject = 'Quantitative Aptitude (31-65)';
        else if (qNum > 65) subject = 'Reasoning Ability (66-100)';

        parsed.push({
          id: `q_sbi_${Date.now()}_${index}`,
          type: 'MCQ',
          question: questionText || `Question review for SBI Clerk #${qNum}`,
          options,
          correctAnswer: correctAnswer === 'A' ? 0 : (correctAnswer === 'B' ? 1 : (correctAnswer === 'C' ? 2 : (correctAnswer === 'D' ? 3 : 4))),
          explanation,
          marks: 1,
          negativeMarks: 0.25,
          subject,
          topic: 'General Syllabus Review',
          difficulty: 'Medium',
          year: 2026
        });
      });
    }

    this.parsedQuestions = parsed;

    // Update real-time overview counts
    const totalCount = parsed.length;
    const statTotal = document.getElementById('sbi-stat-total');
    if (statTotal) statTotal.innerText = `${totalCount} / 100`;

    const getEl = id => document.getElementById(id);
    if (getEl('sbi-stat-english')) getEl('sbi-stat-english').innerText = parsed.filter(q => q.subject.toLowerCase().includes('english')).length;
    if (getEl('sbi-stat-quant')) getEl('sbi-stat-quant').innerText = parsed.filter(q => q.subject.toLowerCase().includes('quant') || q.subject.toLowerCase().includes('numerical')).length;
    if (getEl('sbi-stat-reasoning')) getEl('sbi-stat-reasoning').innerText = parsed.filter(q => q.subject.toLowerCase().includes('reasoning')).length;

    const alertEl = document.getElementById('sbi-status-alert');
    const startBtn = document.getElementById('btn-start-custom-sbi');

    if (totalCount > 0) {
      if (alertEl) {
        alertEl.className = "p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-500 leading-relaxed font-semibold";
        alertEl.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Successfully parsed ${totalCount} questions. Ready to attempt SBI Clerk CBT test!`;
      }
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    } else {
      if (alertEl) {
        alertEl.className = "p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-500 leading-relaxed font-semibold";
        alertEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1 animate-pulse"></i> Paste and parse questions block to enable SBI Clerk Simulator.`;
      }
      if (startBtn) {
        startBtn.disabled = true;
        startBtn.classList.add('opacity-50', 'cursor-not-allowed');
      }
    }

    if (!silent) {
      showToast(`Parsed ${totalCount} questions from input!`, "success");
    }
  }
};
