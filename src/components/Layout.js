import { auth } from '../config/firebase';
import { toggleTheme, getTheme } from '../utils/theme';
import { showToast } from '../utils/toast';
import { getSavedPalette, applyAccentPalette, initAccentPalette } from '../utils/accentTheme';

export const Layout = {
  render(contentHtml, activePage = 'dashboard') {
    const user = auth.currentUser || { displayName: 'Bharath', email: 'aspirant@gate.edu' };
    const theme = getTheme();
    const sunIconClass = theme === 'dark' ? 'hidden' : 'inline-block';
    const moonIconClass = theme === 'dark' ? 'inline-block' : 'hidden';
    const savedPalette = getSavedPalette();

    const getLinkClass = (pageName) => {
      const base = "flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 select-none";
      if (activePage === pageName) {
        return `${base} nav-active`;
      }
      return `${base} text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white`;
    };

    const userInitial = user.displayName ? user.displayName.charAt(0).toUpperCase() : 'B';
    const userName = user.displayName || 'Bharath';
    const userEmail = user.email || 'aspirant@gate.edu';

    return `
      <div class="min-h-screen flex bg-[#f5f7fa] dark:bg-[#060a13] bg-grid transition-colors duration-300 p-4 gap-4 relative overflow-hidden">
        
        <!-- Ambient Glowing Background Orbs -->
        <div class="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-primary-500/10 to-indigo-500/10 blur-[150px] pointer-events-none"></div>
        <div class="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-[150px] pointer-events-none"></div>

        <!-- ======= SIDEBAR ======= -->
        <aside id="sidebar-container" class="w-64 fixed top-4 bottom-4 left-4 z-30 border border-slate-200/60 dark:border-white/[0.07] bg-white/85 dark:bg-[#0d1320]/80 backdrop-blur-2xl flex flex-col rounded-3xl transition-all duration-300 shadow-sm overflow-hidden">

          <!-- Logo & Brand -->
          <div class="h-16 px-6 border-b border-slate-200/50 dark:border-white/[0.05] flex items-center gap-3 flex-shrink-0">
            <div class="h-9 w-9 rounded-2xl flex items-center justify-center shadow-md text-white btn-accent flex-shrink-0">
              <i class="fa-solid fa-graduation-cap text-sm"></i>
            </div>
            <div class="flex flex-col">
              <span class="font-display font-extrabold text-base tracking-tight text-slate-900 dark:text-white">GateLabs</span>
              <span class="text-[9px] font-semibold text-slate-400 tracking-wider uppercase">Pro Preparation</span>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto no-scrollbar">
            <a href="#/dashboard" class="${getLinkClass('dashboard')}">
              <i class="fa-solid fa-chart-pie text-sm w-5 text-center"></i> Dashboard
            </a>
            <a href="#/assistant" class="${getLinkClass('assistant')}">
              <i class="fa-solid fa-brain text-sm w-5 text-center"></i> AI Assistant
            </a>
            <a href="#/practice" class="${getLinkClass('practice')}">
              <i class="fa-solid fa-cubes text-sm w-5 text-center"></i> Practice Qs
            </a>
            <a href="#/mock-test" class="${getLinkClass('mock-test')}">
              <i class="fa-solid fa-pen-to-square text-sm w-5 text-center"></i> Mock Tests
            </a>
            <a href="#/pyq-mocks" class="${getLinkClass('pyq-mocks')}">
              <i class="fa-solid fa-file-circle-check text-sm w-5 text-center"></i> PYQ Mock Papers
            </a>
            <a href="#/community" class="${getLinkClass('community')}">
              <i class="fa-solid fa-users text-sm w-5 text-center"></i> Community Hub
            </a>
            <a href="#/tet-exams" class="${getLinkClass('tet-exams')}">
              <i class="fa-solid fa-chalkboard-user text-sm w-5 text-center"></i> TET Exams
            </a>
            <a href="#/formulas" class="${getLinkClass('formulas')}">
              <i class="fa-solid fa-book-bookmark text-sm w-5 text-center"></i> Formula Deck
            </a>
            <a href="#/analytics" class="${getLinkClass('analytics')}">
              <i class="fa-solid fa-sliders text-sm w-5 text-center"></i> Mistake Analysis
            </a>
            <a href="#/about" class="${getLinkClass('about')}">
              <i class="fa-solid fa-circle-info text-sm w-5 text-center"></i> About GateLabs
            </a>
          </nav>

          <!-- ===== PROFILE SECTION (Clean & Spacious) ===== -->
          <div class="border-t border-slate-200/50 dark:border-white/[0.05] p-4 flex flex-col gap-3 flex-shrink-0">

            <!-- User Card -->
            <div class="flex items-center gap-3">
              <!-- Avatar with gradient ring -->
              <div class="relative flex-shrink-0">
                <div class="h-10 w-10 rounded-2xl text-white flex items-center justify-center font-extrabold text-sm shadow-lg btn-accent">
                  ${userInitial}
                </div>
                <span class="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-400 border-2 border-white dark:border-[#0d1320] rounded-full"></span>
              </div>
              <!-- Name & email -->
              <div class="flex-1 min-w-0">
                <p class="text-xs font-extrabold text-slate-900 dark:text-white truncate">${userName}</p>
                <p class="text-[10px] text-slate-400 font-medium truncate mt-0.5">${userEmail}</p>
              </div>
            </div>

            <!-- Action Row: Customise · Config · Sign Out -->
            <div class="grid grid-cols-3 gap-1.5">
              <button id="theme-studio-btn" title="Customize your app colours" class="group flex flex-col items-center gap-1 py-2 px-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/8 active:scale-95 transition-all select-none">
                <span class="h-7 w-7 rounded-xl flex items-center justify-center text-white text-xs shadow-sm btn-accent group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-swatchbook"></i>
                </span>
                <span class="text-[9px] font-bold text-slate-500 dark:text-slate-400 leading-none">Theme</span>
              </button>

              <button id="settings-btn" title="Configure Gemini API" class="group flex flex-col items-center gap-1 py-2 px-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/8 active:scale-95 transition-all select-none">
                <span class="h-7 w-7 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/10 text-slate-505 dark:text-slate-400 text-xs group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-gear"></i>
                </span>
                <span class="text-[9px] font-bold text-slate-500 dark:text-slate-400 leading-none">Config</span>
              </button>

              <button id="logout-btn" title="Sign out" class="group flex flex-col items-center gap-1 py-2 px-1 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 active:scale-95 transition-all select-none">
                <span class="h-7 w-7 rounded-xl flex items-center justify-center bg-rose-50 dark:bg-rose-950/30 text-rose-500 text-xs group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-right-from-bracket"></i>
                </span>
                <span class="text-[9px] font-bold text-rose-400 leading-none">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        <!-- ======= MAIN BODY ======= -->
        <div class="flex-1 pl-[18rem] flex flex-col min-h-screen pr-2 py-2 relative z-10">

          <!-- Sticky Top Header -->
          <header id="layout-header" class="h-16 border border-slate-200/60 dark:border-white/[0.07] bg-white/85 dark:bg-[#0d1320]/80 backdrop-blur-2xl sticky top-4 z-20 flex items-center justify-between px-6 rounded-3xl transition-colors duration-300 shadow-sm">
            <h2 class="font-display font-extrabold text-sm text-slate-900 dark:text-white capitalize tracking-tight">${activePage.replace('-', ' ')}</h2>

            <div class="flex items-center gap-3">
              <!-- Theme toggle -->
              <button id="layout-theme-toggle" class="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:scale-105 active:scale-95 transition-all select-none">
                <i id="layout-theme-sun" class="fa-solid fa-sun ${sunIconClass}"></i>
                <i id="layout-theme-moon" class="fa-solid fa-moon ${moonIconClass}"></i>
              </button>

              <div class="h-5 w-px bg-slate-200 dark:bg-white/10"></div>

              <span class="text-xs font-bold accent-text streak-badge px-3.5 py-1.5 rounded-full border accent-border flex items-center gap-2">
                <span class="h-2 w-2 rounded-full animate-ping" style="background-color: var(--accent-from)"></span> GATE CS 2027
              </span>
            </div>
          </header>

          <!-- Sub-page Canvas -->
          <main id="sub-page-container" class="flex-1 pt-5 page-enter">
            ${contentHtml}
          </main>
        </div>

        <!-- ======= 🎨 THEME STUDIO MODAL ======= -->
        <div id="theme-studio-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 dark:bg-black/80 backdrop-blur-md hidden px-4">
          <div class="w-full max-w-sm glass-panel p-8 rounded-3xl relative shadow-2xl text-slate-900 dark:text-white border border-white/10 animate-scale-in">

            <button id="close-theme-studio" class="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all">
              <i class="fa-solid fa-xmark text-base"></i>
            </button>

            <div class="flex items-center gap-3 mb-6">
              <div class="h-10 w-10 rounded-2xl flex items-center justify-center text-white shadow-md btn-accent">
                <i class="fa-solid fa-swatchbook text-sm"></i>
              </div>
              <div>
                <h2 class="font-display font-extrabold text-base tracking-tight">Theme Studio</h2>
                <p class="text-[11px] text-slate-400 font-medium">Pick any two colours for your blend</p>
              </div>
            </div>

            <!-- Live gradient preview bar -->
            <div id="theme-preview-bar" class="h-14 rounded-2xl mb-6 shadow-inner transition-all duration-300" style="background: linear-gradient(135deg, ${savedPalette.from}, ${savedPalette.to});"></div>

            <!-- Color pickers -->
            <div class="flex flex-col gap-4 mb-6">
              <!-- Primary -->
              <div class="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/[0.04] dark:border-white/[0.05]">
                <div class="flex items-center gap-3">
                  <div id="primary-preview" class="h-10 w-10 rounded-xl shadow-sm border-2 border-white dark:border-[#0d1320] transition-all" style="background: ${savedPalette.from};"></div>
                  <div>
                    <p class="text-xs font-extrabold text-slate-800 dark:text-white">Primary</p>
                    <p id="primary-hex-label" class="text-[10px] font-mono text-slate-400 mt-0.5">${savedPalette.from}</p>
                  </div>
                </div>
                <label class="cursor-pointer">
                  <input type="color" id="color-picker-primary" value="${savedPalette.from}" class="sr-only">
                  <span class="px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/15 transition-all select-none shadow-sm cursor-pointer">
                    Choose
                  </span>
                </label>
              </div>

              <!-- Secondary -->
              <div class="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/[0.04] dark:border-white/[0.05]">
                <div class="flex items-center gap-3">
                  <div id="secondary-preview" class="h-10 w-10 rounded-xl shadow-sm border-2 border-white dark:border-[#0d1320] transition-all" style="background: ${savedPalette.to};"></div>
                  <div>
                    <p class="text-xs font-extrabold text-slate-800 dark:text-white">Secondary</p>
                    <p id="secondary-hex-label" class="text-[10px] font-mono text-slate-400 mt-0.5">${savedPalette.to}</p>
                  </div>
                </div>
                <label class="cursor-pointer">
                  <input type="color" id="color-picker-secondary" value="${savedPalette.to}" class="sr-only">
                  <span class="px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/15 transition-all select-none shadow-sm cursor-pointer">
                    Choose
                  </span>
                </label>
              </div>
            </div>

            <!-- Quick Palette Shortcuts -->
            <div class="mb-6">
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Picks</p>
              <div class="flex flex-wrap gap-2">
                ${[
                  ['#10b981','#14b8a6'],
                  ['#8b5cf6','#6366f1'],
                  ['#f43f5e','#ec4899'],
                  ['#f59e0b','#f97316'],
                  ['#0ea5e9','#3b82f6'],
                  ['#a855f7','#ec4899'],
                  ['#84cc16','#22c55e'],
                  ['#d946ef','#8b5cf6'],
                ].map(([from, to]) => `
                  <button
                    class="quick-pick h-7 w-14 rounded-xl cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-sm border-2 border-transparent hover:border-white/50"
                    data-from="${from}" data-to="${to}"
                    style="background: linear-gradient(135deg, ${from}, ${to});"
                    title="${from} → ${to}"
                  ></button>
                `).join('')}
              </div>
            </div>

            <!-- Apply Button -->
            <button id="apply-theme-btn" class="w-full py-3 rounded-2xl text-white text-sm font-extrabold shadow-lg hover:scale-[1.02] active:scale-[0.97] transition-all btn-accent tracking-tight">
              Apply Theme
            </button>
          </div>
        </div>

        <!-- ======= AI CONFIG MODAL ======= -->
        <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 dark:bg-black/80 backdrop-blur-md hidden px-4">
          <div class="w-full max-w-md glass-panel p-8 rounded-3xl relative shadow-2xl text-slate-900 dark:text-white border border-white/10">
            <button id="close-settings-modal" class="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all">
              <i class="fa-solid fa-xmark text-base"></i>
            </button>

            <h2 class="font-display font-extrabold text-xl flex items-center gap-2">
              <i class="fa-solid fa-gear accent-text"></i> AI Configuration
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-medium">Configure your Gemini API key for PDF question extraction and practice set generation.</p>

            <form id="settings-form" class="mt-6 flex flex-col gap-4 text-xs font-semibold">
              <div>
                <label class="block text-slate-400 uppercase mb-2 tracking-wider text-[10px]">Gemini API Key</label>
                <input type="password" id="settings-api-key" placeholder="Enter your Gemini API key..." class="glass-input font-mono text-xs">
                <span class="block text-[10px] text-slate-400 mt-2 font-normal leading-relaxed">Stored locally in your browser. Used only for direct Gemini API calls.</span>
              </div>

              <div class="flex justify-end gap-3 mt-2">
                <button type="button" id="cancel-settings" class="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-all">Cancel</button>
                <button type="submit" class="px-6 py-2.5 rounded-2xl text-white font-bold shadow-md hover:scale-102 active:scale-95 transition-all btn-accent">Save Key</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  updateNavigation(activePage) {
    const sidebar = document.getElementById('sidebar-container');
    if (!sidebar) return;

    sidebar.querySelectorAll('nav a').forEach(link => {
      const href = link.getAttribute('href');
      const pageName = href ? href.replace('#/', '') : '';
      const base = "flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 select-none";
      link.className = pageName === activePage
        ? `${base} nav-active`
        : `${base} text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white`;
    });

    const titleEl = document.querySelector('header h2');
    if (titleEl) titleEl.textContent = activePage.replace('-', ' ');
  },

  init(activePage = 'dashboard') {
    initAccentPalette();

    // ---- THEME TOGGLE ----
    document.getElementById('layout-theme-toggle')?.addEventListener('click', () => {
      toggleTheme();
      const t = getTheme();
      const sun = document.getElementById('layout-theme-sun');
      const moon = document.getElementById('layout-theme-moon');
      if (t === 'dark') {
        sun?.classList.add('hidden'); sun?.classList.remove('inline-block');
        moon?.classList.remove('hidden'); moon?.classList.add('inline-block');
      } else {
        moon?.classList.add('hidden'); moon?.classList.remove('inline-block');
        sun?.classList.remove('hidden'); sun?.classList.add('inline-block');
      }
    });

    // ---- THEME STUDIO ----
    const studioModal  = document.getElementById('theme-studio-modal');
    const primaryPick  = document.getElementById('color-picker-primary');
    const secondaryPick = document.getElementById('color-picker-secondary');
    const primaryPrev  = document.getElementById('primary-preview');
    const secondaryPrev = document.getElementById('secondary-preview');
    const primaryHex   = document.getElementById('primary-hex-label');
    const secondaryHex = document.getElementById('secondary-hex-label');
    const previewBar   = document.getElementById('theme-preview-bar');

    const updatePreview = () => {
      const from = primaryPick?.value || '#10b981';
      const to   = secondaryPick?.value || '#14b8a6';
      if (primaryPrev) primaryPrev.style.background = from;
      if (secondaryPrev) secondaryPrev.style.background = to;
      if (primaryHex) primaryHex.textContent = from;
      if (secondaryHex) secondaryHex.textContent = to;
      if (previewBar) previewBar.style.background = `linear-gradient(135deg, ${from}, ${to})`;
    };

    document.getElementById('theme-studio-btn')?.addEventListener('click', () => {
      studioModal?.classList.remove('hidden');
    });
    document.getElementById('close-theme-studio')?.addEventListener('click', () => {
      studioModal?.classList.add('hidden');
    });

    primaryPick?.addEventListener('input', updatePreview);
    secondaryPick?.addEventListener('input', updatePreview);

    // Quick palette picks
    document.querySelectorAll('.quick-pick').forEach(btn => {
      btn.addEventListener('click', () => {
        const from = btn.getAttribute('data-from');
        const to   = btn.getAttribute('data-to');
        if (primaryPick) primaryPick.value = from;
        if (secondaryPick) secondaryPick.value = to;
        updatePreview();
      });
    });

    document.getElementById('apply-theme-btn')?.addEventListener('click', () => {
      const from = primaryPick?.value || '#10b981';
      const to   = secondaryPick?.value || '#14b8a6';

      // Build a mid-point hex
      const hexToRgb = h => [
        parseInt(h.slice(1,3),16),
        parseInt(h.slice(3,5),16),
        parseInt(h.slice(5,7),16)
      ];
      const rgbToHex = (r,g,b) => '#' + [r,g,b].map(v => Math.round(v).toString(16).padStart(2,'0')).join('');
      const [r1,g1,b1] = hexToRgb(from);
      const [r2,g2,b2] = hexToRgb(to);
      const mid = rgbToHex((r1+r2)/2, (g1+g2)/2, (b1+b2)/2);

      const palette = {
        id: 'custom',
        name: 'Custom Theme',
        from,
        to,
        mid,
        glow: `rgba(${r1}, ${g1}, ${b1}, 0.25)`,
      };

      applyAccentPalette(palette);
      this.updateNavigation(activePage);
      studioModal?.classList.add('hidden');
      showToast('🎨 Theme applied!', 'success');
    });

    // Close on backdrop click
    studioModal?.addEventListener('click', (e) => {
      if (e.target === studioModal) studioModal.classList.add('hidden');
    });

    // ---- AI CONFIG MODAL ----
    const settingsModal = document.getElementById('settings-modal');
    const apiKeyInput   = document.getElementById('settings-api-key');

    document.getElementById('settings-btn')?.addEventListener('click', () => {
      if (apiKeyInput) apiKeyInput.value = localStorage.getItem('gemini_api_key') || '';
      settingsModal?.classList.remove('hidden');
    });
    const closeSettings = () => settingsModal?.classList.add('hidden');
    document.getElementById('close-settings-modal')?.addEventListener('click', closeSettings);
    document.getElementById('cancel-settings')?.addEventListener('click', closeSettings);
    settingsModal?.addEventListener('click', (e) => { if (e.target === settingsModal) closeSettings(); });

    document.getElementById('settings-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const key = apiKeyInput?.value.trim();
      if (key) { localStorage.setItem('gemini_api_key', key); showToast('Gemini API key saved!', 'success'); }
      else { localStorage.removeItem('gemini_api_key'); showToast('API key removed.', 'info'); }
      closeSettings();
    });

    // ---- LOGOUT ----
    document.getElementById('logout-btn')?.addEventListener('click', async () => {
      if (confirm('Are you sure you want to sign out?')) {
        await auth.signOut();
        showToast('Signed out.', 'info');
        window.location.hash = '#/';
      }
    });
  }
};
