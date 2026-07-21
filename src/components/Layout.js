import { auth } from '../config/firebase';
import { toggleTheme, getTheme } from '../utils/theme';
import { showToast } from '../utils/toast';

export const Layout = {
  render(contentHtml, activePage = 'dashboard') {
    const user = auth.currentUser || { displayName: 'GATE Aspirant', email: '' };
    const theme = getTheme();
    const sunIconClass = theme === 'dark' ? 'hidden' : 'inline-block';
    const moonIconClass = theme === 'dark' ? 'inline-block' : 'hidden';

    const getLinkClass = (pageName) => {
      const base = "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200";
      if (activePage === pageName) {
        return `${base} bg-primary-600 text-white shadow-lg shadow-primary-600/20`;
      }
      return `${base} text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white`;
    };

    return `
      <div class="min-h-screen flex bg-slate-50 dark:bg-[#080d16] transition-colors duration-300 p-4 gap-4">
        <!-- Sidebar -->
        <aside id="sidebar-container" class="w-64 fixed top-4 bottom-4 left-4 z-30 border border-slate-200/40 dark:border-white/[0.06] bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl flex flex-col rounded-2xl transition-all duration-300 shadow-lg dark:shadow-2xl dark:shadow-black/20">
          <div class="h-16 px-6 border-b border-slate-200/40 dark:border-white/[0.06] flex items-center gap-2.5">
            <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <i class="fa-solid fa-graduation-cap text-white text-base"></i>
            </div>
            <span class="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">GateLabs</span>
          </div>

          <nav class="flex-1 px-4 py-6 flex flex-col gap-1.5">
            <a href="#/dashboard" class="${getLinkClass('dashboard')}">
              <i class="fa-solid fa-chart-pie text-lg"></i> Dashboard
            </a>
            <a href="#/assistant" class="${getLinkClass('assistant')}">
              <i class="fa-solid fa-brain text-lg"></i> AI Assistant
            </a>
            <a href="#/practice" class="${getLinkClass('practice')}">
              <i class="fa-solid fa-cubes text-lg"></i> Practice Qs
            </a>
            <a href="#/mock-test" class="${getLinkClass('mock-test')}">
              <i class="fa-solid fa-pen-to-square text-lg"></i> Mock Tests
            </a>
            <a href="#/analytics" class="${getLinkClass('analytics')}">
              <i class="fa-solid fa-sliders text-lg"></i> Mistake Analysis
            </a>
            <a href="#/about" class="${getLinkClass('about')}">
              <i class="fa-solid fa-circle-info text-lg"></i> About GateLabs
            </a>
          </nav>

          <div class="p-4 border-t border-slate-200/40 dark:border-white/[0.06] flex flex-col gap-2">
            <div class="flex items-center gap-3 px-2 py-1.5 rounded-xl bg-slate-100/40 dark:bg-slate-950/20 border border-slate-200/20 dark:border-white/[0.03]">
              <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                ${user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">${user.displayName || 'User'}</p>
                <p class="text-xs text-slate-400 dark:text-slate-500 truncate">${user.email}</p>
              </div>
            </div>
            <button id="settings-btn" class="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 active:scale-98 transition-all select-none">
              <i class="fa-solid fa-gear"></i> AI Config
            </button>
            <button id="logout-btn" class="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 active:scale-98 transition-all">
              <i class="fa-solid fa-right-from-bracket"></i> Sign Out
            </button>
          </div>
        </aside>

        <!-- Main Body Wrapper -->
        <div class="flex-1 pl-[18rem] flex flex-col min-h-screen pr-2 py-2">
          <!-- Header -->
          <header id="layout-header" class="h-16 border border-slate-200/40 dark:border-white/[0.06] bg-white/70 dark:bg-slate-900/40 backdrop-blur-md sticky top-4 z-20 flex items-center justify-between px-6 rounded-2xl transition-colors duration-300 shadow-md">
            <div class="flex items-center gap-4">
              <h2 class="font-display font-extrabold text-lg text-slate-800 dark:text-white capitalize tracking-tight">${activePage.replace('-', ' ')}</h2>
              <!-- Command Palette Trigger Button -->
              <button id="cmd-k-trigger" class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-white/[0.08] bg-slate-100/50 dark:bg-slate-950/40 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all text-xs">
                <i class="fa-solid fa-magnifying-glass text-[11px]"></i>
                <span>Search or jump to...</span>
                <span class="kbd-badge">Ctrl K</span>
              </button>
            </div>
            
            <div class="flex items-center gap-4">
              <!-- Theme Toggle -->
              <button id="layout-theme-toggle" class="p-2 rounded-xl border border-slate-200/60 dark:border-white/[0.08] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:scale-105 active:scale-95 transition-all select-none bg-white/50 dark:bg-slate-950/30">
                <i id="layout-theme-sun" class="fa-solid fa-sun ${sunIconClass}"></i>
                <i id="layout-theme-moon" class="fa-solid fa-moon ${moonIconClass}"></i>
              </button>
              
              <div class="h-6 w-px bg-slate-200 dark:bg-white/[0.08]"></div>
              
              <span class="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 px-3.5 py-1.5 rounded-xl border border-primary-100/50 dark:border-primary-900/35 flex items-center gap-1.5">
                <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> GATE CS 2027
              </span>
            </div>
          </header>

          <!-- Main Content view -->
          <main id="sub-page-container" class="flex-1 pt-6 page-enter">
            ${contentHtml}
          </main>
        </div>

        <!-- Command Palette Modal -->
        <div id="cmd-k-modal" class="command-palette-backdrop hidden">
          <div class="command-palette-modal">
            <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
              <i class="fa-solid fa-magnifying-glass text-primary-500 text-base"></i>
              <input type="text" id="cmd-k-input" placeholder="Type a command or page name..." class="w-full bg-transparent text-sm font-semibold text-slate-800 dark:text-white focus:outline-none placeholder-slate-400">
              <span class="kbd-badge">ESC</span>
            </div>
            <div id="cmd-k-list" class="p-2 max-h-72 overflow-y-auto flex flex-col gap-1 text-xs font-semibold">
              <a href="#/dashboard" class="cmd-item flex items-center justify-between p-3 rounded-xl hover:bg-primary-500/10 hover:text-primary-500 transition-all text-slate-700 dark:text-slate-300">
                <span class="flex items-center gap-3"><i class="fa-solid fa-chart-pie"></i> Dashboard</span>
                <span class="kbd-badge">Alt 1</span>
              </a>
              <a href="#/assistant" class="cmd-item flex items-center justify-between p-3 rounded-xl hover:bg-primary-500/10 hover:text-primary-500 transition-all text-slate-700 dark:text-slate-300">
                <span class="flex items-center gap-3"><i class="fa-solid fa-brain"></i> AI Assistant</span>
                <span class="kbd-badge">Alt 2</span>
              </a>
              <a href="#/practice" class="cmd-item flex items-center justify-between p-3 rounded-xl hover:bg-primary-500/10 hover:text-primary-500 transition-all text-slate-700 dark:text-slate-300">
                <span class="flex items-center gap-3"><i class="fa-solid fa-cubes"></i> Practice Questions</span>
                <span class="kbd-badge">Alt 3</span>
              </a>
              <a href="#/mock-test" class="cmd-item flex items-center justify-between p-3 rounded-xl hover:bg-primary-500/10 hover:text-primary-500 transition-all text-slate-700 dark:text-slate-300">
                <span class="flex items-center gap-3"><i class="fa-solid fa-pen-to-square"></i> Mock Test Simulator</span>
                <span class="kbd-badge">Alt 4</span>
              </a>
              <a href="#/analytics" class="cmd-item flex items-center justify-between p-3 rounded-xl hover:bg-primary-500/10 hover:text-primary-500 transition-all text-slate-700 dark:text-slate-300">
                <span class="flex items-center gap-3"><i class="fa-solid fa-sliders"></i> Mistake Analytics</span>
                <span class="kbd-badge">Alt 5</span>
              </a>
              <a href="#/about" class="cmd-item flex items-center justify-between p-3 rounded-xl hover:bg-primary-500/10 hover:text-primary-500 transition-all text-slate-700 dark:text-slate-300">
                <span class="flex items-center gap-3"><i class="fa-solid fa-circle-info"></i> About GateLabs</span>
                <span class="kbd-badge">Alt 6</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Settings Modal -->
        <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-sm hidden animate-fade-in px-4">
          <div class="w-full max-w-md glass-panel p-8 rounded-3xl relative shadow-2xl text-slate-900 dark:text-white border border-white/10 glow-primary">
            <button id="close-settings-modal" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <i class="fa-solid fa-xmark text-xl"></i>
            </button>
            
            <h2 class="font-display font-extrabold text-xl flex items-center gap-2">
              <i class="fa-solid fa-gear text-primary-500"></i> AI Configuration
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">Configure your Gemini API key to extract questions from PDFs and generate new ones.</p>
            
            <form id="settings-form" class="mt-6 flex flex-col gap-4 text-xs font-semibold">
              <div>
                <label class="block text-slate-400 uppercase mb-2 tracking-wider">Gemini API Key</label>
                <input type="password" id="settings-api-key" placeholder="Enter your Gemini API key..." class="glass-input font-mono text-sm">
                <span class="block text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-normal leading-relaxed">
                  Your key is stored securely in your browser's local storage and is only used to send direct requests to Google's Gemini API endpoints.
                </span>
              </div>
              
              <button type="submit" class="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-primary-500/25 active:scale-98 transition-all duration-150">
                Save Configuration
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  init(activePage = 'dashboard') {
    // Sign out button
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', async () => {
      try {
        await auth.signOut();
        showToast("Signed out successfully.", "info");
        window.location.hash = '#/';
      } catch (err) {
        showToast(err.message, "error");
      }
    });

    // Theme Toggle Handler
    const themeBtn = document.getElementById('layout-theme-toggle');
    const sunIcon = document.getElementById('layout-theme-sun');
    const moonIcon = document.getElementById('layout-theme-moon');

    themeBtn?.addEventListener('click', () => {
      const newTheme = toggleTheme();
      if (newTheme === 'dark') {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      }
    });

    // Command Palette Logic
    const cmdModal = document.getElementById('cmd-k-modal');
    const cmdInput = document.getElementById('cmd-k-input');
    const cmdTrigger = document.getElementById('cmd-k-trigger');

    const openCmdModal = () => {
      cmdModal?.classList.remove('hidden');
      cmdInput?.focus();
    };

    const closeCmdModal = () => {
      cmdModal?.classList.add('hidden');
    };

    cmdTrigger?.addEventListener('click', openCmdModal);

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openCmdModal();
      }
      if (e.key === 'Escape' && cmdModal && !cmdModal.classList.contains('hidden')) {
        closeCmdModal();
      }
    });

    cmdModal?.addEventListener('click', (e) => {
      if (e.target === cmdModal) closeCmdModal();
    });

    // Filter cmd items on search input
    cmdInput?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#cmd-k-list .cmd-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });

    // Settings modal bindings
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings-modal');
    const settingsForm = document.getElementById('settings-form');
    const settingsApiKey = document.getElementById('settings-api-key');

    settingsBtn?.addEventListener('click', () => {
      if (settingsApiKey) {
        settingsApiKey.value = localStorage.getItem('gemini_api_key') || '';
      }
      settingsModal?.classList.remove('hidden');
    });

    closeSettings?.addEventListener('click', () => {
      settingsModal?.classList.add('hidden');
    });

    settingsModal?.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.add('hidden');
      }
    });

    settingsForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const keyVal = settingsApiKey.value.trim();
      if (keyVal) {
        localStorage.setItem('gemini_api_key', keyVal);
        showToast("Gemini API key saved successfully.", "success");
      } else {
        localStorage.removeItem('gemini_api_key');
        showToast("Gemini API key cleared.", "info");
      }
      settingsModal?.classList.add('hidden');
    });
  },

  updateNavigation(activePage = 'dashboard') {
    // Update navigation active links classes
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const page = href.split('#/')[1] || 'dashboard';
      const base = "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200";
      if (page === activePage) {
        link.className = `${base} bg-primary-600 text-white shadow-lg shadow-primary-600/20`;
      } else {
        link.className = `${base} text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white`;
      }
    });

    // Update Header title text dynamically
    const headerTitle = document.querySelector('header h2');
    if (headerTitle) {
      headerTitle.textContent = activePage.replace('-', ' ');
    }
  }
};
