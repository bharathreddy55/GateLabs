import { NAV_GROUPS, PAGE_TITLES, icon } from '../config/navigation.js';
import { escapeHtml as h } from '../utils/examEngine.js';
import { auth } from '../config/firebase';
import { toggleTheme, getTheme } from '../utils/theme';
import { showToast } from '../utils/toast';
import { getSavedPalette, applyAccentPalette, initAccentPalette } from '../utils/accentTheme';
import { getAiConfig, getApiKey, saveAiConfig, testApiKey, PROVIDERS } from '../utils/aiService';

export const Layout = {
  render(contentHtml, activePage = 'dashboard') {
    const user = auth.currentUser || { displayName: 'Bharath', email: 'aspirant@gate.edu' };
    const savedPalette = getSavedPalette();

    const userInitial = user.displayName ? user.displayName.charAt(0).toUpperCase() : 'B';
    const userName = user.displayName || 'Bharath';
    const userEmail = user.email || 'aspirant@gate.edu';

    return `
      <div class="app-shell" data-page="${activePage}">
        <a class="skip-link" href="#sub-page-container">Skip to content</a>
        <button class="sidebar-backdrop" id="sidebar-backdrop" aria-label="Close navigation" hidden></button>
        <aside id="sidebar-container" class="app-sidebar" aria-label="Main navigation">
          <a class="app-brand" href="#/dashboard"><span class="brand-mark" aria-hidden="true">g</span><span>GateLabs</span></a>
          <nav class="sidebar-nav">${NAV_GROUPS.map(group=>`<div class="nav-group"><p>${group.label}</p>${group.items.map(([route,label,glyph])=>`<a href="#/${route}" class="sidebar-link ${activePage===route?'nav-active':''}" ${activePage===route?'aria-current="page"':''}>${icon(glyph)}<span>${label}</span></a>`).join('')}</div>`).join('')}</nav>
          <div class="sidebar-footer"><div class="profile-row"><span class="profile-avatar">${h(userInitial)}</span><div><strong>${h(userName)}</strong><small>${h(userEmail)}</small></div><button id="logout-btn" aria-label="Sign out" title="Sign out">${icon('logout')}</button></div><div class="sidebar-settings"><button id="theme-studio-btn">Appearance</button><button id="settings-btn">AI settings</button></div></div>
        </aside>
        <div class="app-main">
          <header id="layout-header" class="app-header"><div class="header-location"><button id="mobile-menu-toggle" aria-label="Open navigation" aria-controls="sidebar-container" aria-expanded="false">${icon('menu')}</button><span>Workspace <span class="breadcrumb-divider">/</span> <strong id="page-location">${PAGE_TITLES[activePage]||'GateLabs'}</strong></span></div><div class="header-actions"><a href="#/exams" class="header-exams-link">Explore exams</a><button id="layout-theme-toggle" aria-label="Toggle light and dark appearance" title="Toggle appearance">${icon('moon')}<i id="layout-theme-sun" class="hidden"></i><i id="layout-theme-moon" class="hidden"></i></button><span class="header-avatar" title="${h(userName)}">${h(userInitial)}</span></div></header>
          <main id="sub-page-container" tabindex="-1">${contentHtml}</main>
          <footer class="workspace-footer"><span>GateLabs</span><a href="#/about">About & help</a></footer>
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
        <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 dark:bg-black/80 backdrop-blur-md hidden px-4">
          <div class="w-full max-w-md glass-panel p-8 rounded-3xl relative shadow-2xl text-slate-900 dark:text-white border border-slate-200/60 dark:border-white/10 flex flex-col gap-4">
            <button id="close-settings-modal" class="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all">
              <i class="fa-solid fa-xmark text-base"></i>
            </button>

            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="h-8 w-8 rounded-xl btn-accent text-white flex items-center justify-center text-xs shadow-md">
                  <i class="fa-solid fa-wand-magic-sparkles"></i>
                </span>
                <h2 class="font-display font-extrabold text-xl">AI Configuration</h2>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-medium">Use any API key you prefer: Google Gemini, OpenAI, Anthropic Claude, or OpenRouter.</p>
            </div>

            <!-- Status Indicator Badge -->
            <div id="api-key-status-badge" class="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">Current Status:</span>
              <span id="api-key-status-text" class="font-bold accent-text">Checking...</span>
            </div>

            <form id="settings-form" class="flex flex-col gap-4 text-xs font-semibold">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-500 dark:text-slate-400 uppercase mb-1.5 tracking-wider text-[10px]">AI Provider</label>
                  <select id="settings-provider" class="glass-input text-xs font-bold">
                    <option value="gemini">Google Gemini (Free)</option>
                    <option value="openai">OpenAI (ChatGPT)</option>
                    <option value="anthropic">Anthropic Claude</option>
                    <option value="openrouter">OpenRouter (Free/Paid)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-slate-500 dark:text-slate-400 uppercase mb-1.5 tracking-wider text-[10px]">Model</label>
                  <select id="settings-model" class="glass-input text-xs font-bold">
                    <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-slate-500 dark:text-slate-400 uppercase mb-1.5 tracking-wider text-[10px]">API Key</label>
                <div class="relative">
                  <input type="password" id="settings-api-key" placeholder="Paste your API key here..." class="glass-input font-mono text-xs pr-10">
                  <button type="button" id="toggle-api-key-visibility" class="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <i class="fa-solid fa-eye text-xs"></i>
                  </button>
                </div>
                <span class="block text-[10px] text-slate-400 mt-1.5 font-normal leading-relaxed">Key is stored locally in your browser. Never sent to any external server.</span>
              </div>

              <div class="flex items-center justify-between gap-3 pt-2">
                <button type="button" id="test-settings-btn" class="px-4 py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-all flex items-center gap-1.5">
                  <i class="fa-solid fa-bolt text-amber-500"></i> Test Key
                </button>

                <div class="flex items-center gap-2">
                  <button type="button" id="cancel-settings" class="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-all">Cancel</button>
                  <button type="submit" class="px-5 py-2.5 rounded-2xl text-white font-bold shadow-md hover:scale-102 active:scale-95 transition-all btn-accent">Save Config</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  updateNavigation(activePage) {
    document.querySelector('.app-shell')?.setAttribute('data-page',activePage);
    document.querySelectorAll('.sidebar-link').forEach(link=>{
      const selected=link.getAttribute('href')==='#/'+activePage;
      link.classList.toggle('nav-active',selected);
      if(selected)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
    });
    const title=document.getElementById('page-location');if(title)title.textContent=PAGE_TITLES[activePage]||'GateLabs';
    document.querySelector('.app-shell')?.classList.remove('navigation-open');
    const backdrop=document.getElementById('sidebar-backdrop');if(backdrop)backdrop.hidden=true;
    document.getElementById('mobile-menu-toggle')?.setAttribute('aria-expanded','false');
  },

  init(activePage = 'dashboard') {
    initAccentPalette();
    const toggle=document.getElementById('mobile-menu-toggle'),backdrop=document.getElementById('sidebar-backdrop'),shell=document.querySelector('.app-shell');
    const close=()=>{shell?.classList.remove('navigation-open');if(backdrop)backdrop.hidden=true;toggle?.setAttribute('aria-expanded','false');};
    toggle?.addEventListener('click',()=>{const open=shell.classList.toggle('navigation-open');backdrop.hidden=!open;toggle.setAttribute('aria-expanded',String(open));if(open)document.querySelector('.sidebar-link')?.focus();});
    backdrop?.addEventListener('click',close);
    shell?.addEventListener('keydown',event=>{if(event.key==='Escape'&&shell.classList.contains('navigation-open')){close();toggle?.focus();}});
    shell?.querySelector('.skip-link')?.addEventListener('click',event=>{
      event.preventDefault();
      document.getElementById('sub-page-container')?.focus();
    });
    document.querySelectorAll('.sidebar-link').forEach(link=>link.addEventListener('click',close));

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
      this.updateNavigation(document.querySelector('.app-shell')?.dataset.page||activePage);
      studioModal?.classList.add('hidden');
      showToast('🎨 Theme applied!', 'success');
    });

    // Close on backdrop click
    studioModal?.addEventListener('click', (e) => {
      if (e.target === studioModal) studioModal.classList.add('hidden');
    });

    // ---- AI CONFIG MODAL ----
    const settingsModal    = document.getElementById('settings-modal');
    const providerSelect  = document.getElementById('settings-provider');
    const modelSelect     = document.getElementById('settings-model');
    const apiKeyInput      = document.getElementById('settings-api-key');
    const statusText       = document.getElementById('api-key-status-text');
    const toggleEye        = document.getElementById('toggle-api-key-visibility');

    const updateModelDropdown = (selectedProv, selectedMod) => {
      const pInfo = PROVIDERS[selectedProv] || PROVIDERS.gemini;
      if (modelSelect) {
        modelSelect.innerHTML = pInfo.models.map(m => `<option value="${m}" ${m === selectedMod ? 'selected' : ''}>${m}</option>`).join('');
      }
      if (apiKeyInput) {
        apiKeyInput.placeholder = pInfo.placeholder || 'Paste API key...';
      }
    };

    const updateModalStatus = () => {
      const { provider, apiKey, model } = getAiConfig();
      if (providerSelect) providerSelect.value = provider;
      updateModelDropdown(provider, model);
      if (apiKeyInput) apiKeyInput.value = apiKey || '';

      if (statusText) {
        if (apiKey) {
          statusText.textContent = `${PROVIDERS[provider]?.name || provider} Configured ✓`;
          statusText.className = 'font-bold text-emerald-500';
        } else {
          statusText.textContent = 'No Key Set (Using Offline Fallback Engine)';
          statusText.className = 'font-bold text-amber-500';
        }
      }
    };

    providerSelect?.addEventListener('change', (e) => {
      const p = e.target.value;
      const defaultMod = PROVIDERS[p]?.defaultModel;
      updateModelDropdown(p, defaultMod);
    });

    const openSettings = () => {
      updateModalStatus();
      settingsModal?.classList.remove('hidden');
    };

    document.getElementById('settings-btn')?.addEventListener('click', openSettings);
    document.querySelectorAll('.open-ai-config-btn').forEach(btn => {
      btn.addEventListener('click', openSettings);
    });

    // Toggle Eye Visibility
    toggleEye?.addEventListener('click', () => {
      if (apiKeyInput) {
        const isPassword = apiKeyInput.type === 'password';
        apiKeyInput.type = isPassword ? 'text' : 'password';
        toggleEye.innerHTML = isPassword ? '<i class="fa-solid fa-eye-slash text-xs"></i>' : '<i class="fa-solid fa-eye text-xs"></i>';
      }
    });

    // Test API Key Connection
    document.getElementById('test-settings-btn')?.addEventListener('click', async () => {
      const p = providerSelect?.value || 'gemini';
      const m = modelSelect?.value;
      const val = apiKeyInput?.value.trim();

      if (!val) {
        showToast('Please enter an API key to test.', 'warning');
        return;
      }

      if (statusText) {
        statusText.textContent = `Testing ${PROVIDERS[p]?.name}...`;
        statusText.className = 'font-bold text-blue-400 animate-pulse';
      }

      const res = await testApiKey(p, val, m);
      if (res.success) {
        showToast(`Connection Successful! (${PROVIDERS[p]?.name} - ${res.modelUsed})`, 'success');
        if (statusText) {
          statusText.textContent = `Valid Key (${res.modelUsed}) ✓`;
          statusText.className = 'font-bold text-emerald-500';
        }
      } else {
        showToast(`Connection Failed: ${res.error}`, 'error');
        if (statusText) {
          statusText.textContent = 'Invalid / Failed Connection ❌';
          statusText.className = 'font-bold text-rose-500';
        }
      }
    });

    const closeSettings = () => settingsModal?.classList.add('hidden');
    document.getElementById('close-settings-modal')?.addEventListener('click', closeSettings);
    document.getElementById('cancel-settings')?.addEventListener('click', closeSettings);
    settingsModal?.addEventListener('click', (e) => { if (e.target === settingsModal) closeSettings(); });

    document.getElementById('settings-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const p = providerSelect?.value || 'gemini';
      const m = modelSelect?.value;
      const key = apiKeyInput?.value.trim();

      if (key) {
        saveAiConfig(p, key, m);
        showToast(`${PROVIDERS[p]?.name || p} configuration saved successfully! ⚡`, 'success');
      } else {
        saveAiConfig('gemini', '', '');
        showToast('API key removed. Using offline fallback engine.', 'info');
      }
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
