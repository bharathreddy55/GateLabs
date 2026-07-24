import { auth } from '../config/firebase';
import { toggleTheme, getTheme } from '../utils/theme';
import { showToast } from '../utils/toast';

export const Layout = {
  render(contentHtml, activePage = 'dashboard') {
    const user = auth.currentUser || { displayName: 'Bharath', email: 'aspirant@gate.edu' };
    const theme = getTheme();
    const sunIconClass = theme === 'dark' ? 'hidden' : 'inline-block';
    const moonIconClass = theme === 'dark' ? 'inline-block' : 'hidden';

    const getLinkClass = (pageName) => {
      const base = "flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 select-none";
      if (activePage === pageName) {
        return `${base} bg-[#0071e3] dark:bg-[#2997ff] text-white shadow-md shadow-[#0071e3]/20 dark:shadow-[#2997ff]/20`;
      }
      return `${base} text-slate-600 dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white`;
    };

    return `
      <div class="min-h-screen flex bg-[#f5f5f7] dark:bg-[#000000] transition-colors duration-300 p-4 gap-4">
        <!-- Arc Browser / Raycast Inspired Sidebar -->
        <aside id="sidebar-container" class="w-64 fixed top-4 bottom-4 left-4 z-30 border border-black/[0.05] dark:border-white/[0.08] bg-white/80 dark:bg-[#161618]/80 backdrop-blur-2xl flex flex-col rounded-3xl transition-all duration-300 shadow-sm">
          <!-- Logo & Brand Header -->
          <div class="h-16 px-6 border-b border-black/[0.04] dark:border-white/[0.06] flex items-center gap-3">
            <div class="h-9 w-9 rounded-2xl bg-gradient-to-tr from-[#0071e3] to-[#2997ff] flex items-center justify-center shadow-md shadow-[#0071e3]/20 text-white">
              <i class="fa-solid fa-graduation-cap text-base"></i>
            </div>
            <div class="flex flex-col">
              <span class="font-display font-extrabold text-base tracking-tight text-slate-900 dark:text-white">GateLabs</span>
              <span class="text-[9px] font-semibold text-slate-400 dark:text-[#86868b] tracking-wider uppercase">Pro Preparation</span>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="flex-1 px-3.5 py-6 flex flex-col gap-1.5 overflow-y-auto no-scrollbar">
            <a href="#/dashboard" class="${getLinkClass('dashboard')}">
              <i class="fa-solid fa-chart-pie text-base w-5 text-center"></i> Dashboard
            </a>
            <a href="#/assistant" class="${getLinkClass('assistant')}">
              <i class="fa-solid fa-brain text-base w-5 text-center"></i> AI Assistant
            </a>
            <a href="#/practice" class="${getLinkClass('practice')}">
              <i class="fa-solid fa-cubes text-base w-5 text-center"></i> Practice Qs
            </a>
            <a href="#/mock-test" class="${getLinkClass('mock-test')}">
              <i class="fa-solid fa-pen-to-square text-base w-5 text-center"></i> Mock Tests
            </a>
            <a href="#/formulas" class="${getLinkClass('formulas')}">
              <i class="fa-solid fa-book-bookmark text-base w-5 text-center"></i> Formula Deck
            </a>
            <a href="#/analytics" class="${getLinkClass('analytics')}">
              <i class="fa-solid fa-sliders text-base w-5 text-center"></i> Mistake Analysis
            </a>
            <a href="#/about" class="${getLinkClass('about')}">
              <i class="fa-solid fa-circle-info text-base w-5 text-center"></i> About GateLabs
            </a>
          </nav>

          <!-- User Profile & Action Pill -->
          <div class="p-3 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-col gap-2">
            <div class="flex items-center gap-3 px-3 py-2 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/[0.03] dark:border-white/[0.04]">
              <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0071e3] to-[#2997ff] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                ${user.displayName ? user.displayName.charAt(0).toUpperCase() : 'B'}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-900 dark:text-white truncate">${user.displayName || 'Bharath'}</p>
                <p class="text-[10px] text-slate-400 dark:text-[#86868b] truncate">${user.email || 'aspirant@gate.edu'}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-1.5">
              <button id="settings-btn" class="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-slate-600 dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all select-none">
                <i class="fa-solid fa-gear text-xs"></i> Config
              </button>
              <button id="logout-btn" class="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 active:scale-95 transition-all select-none">
                <i class="fa-solid fa-right-from-bracket text-xs"></i> Sign Out
              </button>
            </div>
          </div>
        </aside>

        <!-- Main Body Wrapper -->
        <div class="flex-1 pl-[18rem] flex flex-col min-h-screen pr-2 py-2">
          <!-- Header -->
          <header id="layout-header" class="h-16 border border-black/[0.05] dark:border-white/[0.08] bg-white/80 dark:bg-[#161618]/80 backdrop-blur-2xl sticky top-4 z-20 flex items-center justify-between px-6 rounded-3xl transition-colors duration-300 shadow-sm">
            <div>
              <h2 class="font-display font-extrabold text-base text-slate-900 dark:text-white capitalize tracking-tight">${activePage.replace('-', ' ')}</h2>
            </div>
            
            <div class="flex items-center gap-4">
              <!-- Theme Toggle -->
              <button id="layout-theme-toggle" class="p-2 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-[#86868b] hover:scale-105 active:scale-95 transition-all select-none bg-white/50 dark:bg-black/20">
                <i id="layout-theme-sun" class="fa-solid fa-sun ${sunIconClass}"></i>
                <i id="layout-theme-moon" class="fa-solid fa-moon ${moonIconClass}"></i>
              </button>
              
              <div class="h-5 w-px bg-black/10 dark:bg-white/10"></div>
              
              <span class="text-xs font-bold text-[#0071e3] dark:text-[#2997ff] bg-[#0071e3]/10 dark:bg-[#2997ff]/15 px-3.5 py-1.5 rounded-full border border-[#0071e3]/20 dark:border-[#2997ff]/30 flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-[#0071e3] dark:bg-[#2997ff] animate-ping"></span> GATE CS 2027
              </span>
            </div>
          </header>

          <!-- Main Sub-page Canvas -->
          <main id="sub-page-container" class="flex-1 pt-6 page-enter">
            ${contentHtml}
          </main>
        </div>

        <!-- AI Config Modal -->
        <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-md hidden animate-fade-in px-4">
          <div class="w-full max-w-md glass-panel p-8 rounded-3xl relative shadow-2xl text-slate-900 dark:text-white border border-white/10 glow-primary">
            <button id="close-settings-modal" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <i class="fa-solid fa-xmark text-xl"></i>
            </button>
            
            <h2 class="font-display font-extrabold text-xl flex items-center gap-2">
              <i class="fa-solid fa-gear text-[#0071e3] dark:text-[#2997ff]"></i> AI Configuration
            </h2>
            <p class="text-xs text-slate-500 dark:text-[#86868b] mt-1.5 leading-relaxed font-medium">Configure your Gemini API key to extract questions from PDFs and generate new practice sets.</p>
            
            <form id="settings-form" class="mt-6 flex flex-col gap-4 text-xs font-semibold">
              <div>
                <label class="block text-slate-400 uppercase mb-2 tracking-wider">Gemini API Key</label>
                <input type="password" id="settings-api-key" placeholder="Enter your Gemini API key..." class="glass-input font-mono text-sm">
                <span class="block text-[10px] text-slate-400 dark:text-[#86868b] mt-2 font-normal leading-relaxed">
                  Your key is stored securely in your browser's local storage and is only used for direct requests to Google Gemini endpoints.
                </span>
              </div>
              
              <div class="flex justify-end gap-3 mt-4">
                <button type="button" id="cancel-settings" class="px-5 py-2.5 rounded-2xl border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-all">Cancel</button>
                <button type="submit" class="px-6 py-2.5 rounded-2xl bg-[#0071e3] dark:bg-[#2997ff] text-white font-bold shadow-md hover:scale-102 active:scale-95 transition-all">Save Key</button>
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

    const links = sidebar.querySelectorAll('nav a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      const pageName = href ? href.replace('#/', '') : '';
      if (pageName === activePage) {
        link.className = "flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 select-none bg-[#0071e3] dark:bg-[#2997ff] text-white shadow-md shadow-[#0071e3]/20 dark:shadow-[#2997ff]/20";
      } else {
        link.className = "flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 select-none text-slate-600 dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white";
      }
    });

    const titleEl = document.querySelector('header h2');
    if (titleEl) {
      titleEl.textContent = activePage.replace('-', ' ');
    }
  },

  init(activePage = 'dashboard') {
    // Theme toggle binding
    const themeBtn = document.getElementById('layout-theme-toggle');
    themeBtn?.addEventListener('click', () => {
      toggleTheme();
      const theme = getTheme();
      const sun = document.getElementById('layout-theme-sun');
      const moon = document.getElementById('layout-theme-moon');
      if (theme === 'dark') {
        sun?.classList.add('hidden');
        moon?.classList.remove('hidden');
        moon?.classList.add('inline-block');
      } else {
        moon?.classList.add('hidden');
        sun?.classList.remove('hidden');
        sun?.classList.add('inline-block');
      }
    });

    // Settings modal binding
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings-modal');
    const cancelSettings = document.getElementById('cancel-settings');
    const settingsForm = document.getElementById('settings-form');
    const apiKeyInput = document.getElementById('settings-api-key');

    const openSettings = () => {
      apiKeyInput.value = localStorage.getItem('gemini_api_key') || '';
      settingsModal?.classList.remove('hidden');
    };

    const closeSettingsModal = () => {
      settingsModal?.classList.add('hidden');
    };

    settingsBtn?.addEventListener('click', openSettings);
    closeSettings?.addEventListener('click', closeSettingsModal);
    cancelSettings?.addEventListener('click', closeSettingsModal);

    settingsForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const key = apiKeyInput.value.trim();
      if (key) {
        localStorage.setItem('gemini_api_key', key);
        showToast("Gemini API key saved successfully!", "success");
      } else {
        localStorage.removeItem('gemini_api_key');
        showToast("Gemini API key removed.", "info");
      }
      closeSettingsModal();
    });

    // Logout binding
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', async () => {
      if (confirm("Are you sure you want to sign out?")) {
        await auth.signOut();
        showToast("Signed out successfully.", "info");
        window.location.hash = '#/';
      }
    });
  }
};
