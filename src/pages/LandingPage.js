import { auth } from '../config/firebase';
import { toggleTheme, getTheme } from '../utils/theme';
import { showToast } from '../utils/toast';

function getFriendlyAuthErrorMessage(err) {
  const code = err.code || '';
  const message = err.message || '';
  
  if (code === 'auth/email-already-in-use' || message.includes('auth/email-already-in-use')) {
    return "An account with this email already exists. Please sign in instead.";
  }
  if (code === 'auth/weak-password' || message.includes('auth/weak-password')) {
    return "Password is too weak. Please use at least 6 characters.";
  }
  if (code === 'auth/invalid-email' || message.includes('auth/invalid-email')) {
    return "Invalid email format. Please check your email.";
  }
  if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential' || 
      message.includes('auth/user-not-found') || message.includes('auth/wrong-password') || message.includes('auth/invalid-credential')) {
    return "Incorrect email or password. Please try again.";
  }
  return message || "An unexpected authentication error occurred.";
}

export const LandingPage = {
  render() {
    const theme = getTheme();
    const sunIconClass = theme === 'dark' ? 'hidden' : 'inline-block';
    const moonIconClass = theme === 'dark' ? 'inline-block' : 'hidden';

    return `
      <!-- Navbar -->
      <nav class="fixed top-4 left-4 right-4 z-40 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/40 dark:border-white/[0.06] rounded-2xl shadow-lg transition-all duration-300">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <i class="fa-solid fa-graduation-cap text-white text-xl"></i>
            </div>
            <span class="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">GateLabs</span>
          </div>

          <div class="flex items-center gap-4">
            <a href="#/about" class="hidden sm:inline-flex text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 transition-colors">About</a>
            <!-- Theme Toggle -->
            <button id="theme-toggle-btn" class="p-2 rounded-xl border border-slate-200/60 dark:border-white/[0.08] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:scale-105 active:scale-95 transition-all select-none bg-white/50 dark:bg-slate-950/30">
              <i id="theme-sun" class="fa-solid fa-sun ${sunIconClass}"></i>
              <i id="theme-moon" class="fa-solid fa-moon ${moonIconClass}"></i>
            </button>
            <button id="nav-login-btn" class="hidden sm:inline-flex text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 transition-colors">Sign In</button>
            <button id="nav-register-btn" class="inline-flex items-center justify-center px-4.5 py-2 text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 active:scale-95 rounded-xl shadow-md hover:shadow-lg transition-all">Get Started</button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <main class="flex-1 pt-36 pb-20 px-6 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center">
        <!-- Glow accents -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/10 dark:bg-primary-600/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div class="animate-fade-in">
          <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400 border border-primary-100/50 dark:border-primary-900/35 mb-6">
            <span class="h-1.5 w-1.5 rounded-full bg-primary-500 animate-ping"></span>
            Prepare for GATE CS & IT 2027
          </span>
          <h1 class="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-slate-950 dark:text-white leading-[1.15] max-w-4xl mx-auto">
            Supercharge Your GATE Prep With <span class="text-gradient-purple">AI Intelligence</span>
          </h1>
          <p class="mt-6 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold">
            Practice questions, build custom mock tests, analyze mistakes with visual metrics, and clear doubts with your personal AI Study Assistant.
          </p>
          <div class="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button id="hero-get-started" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 active:scale-95 rounded-xl shadow-lg shadow-primary-500/25 transition-all">
              Start Studying Free <i class="fa-solid fa-arrow-right"></i>
            </button>
            <a href="#about-section" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl transition-all">
              About GateLabs
            </a>
          </div>
        </div>

        <!-- Features Grid -->
        <div id="features-section" class="mt-32 w-full text-left scroll-mt-24">
          <h2 class="font-display font-extrabold text-3xl text-slate-900 dark:text-white text-center tracking-tight">Engineered for High-Scorers</h2>
          <p class="text-slate-500 dark:text-slate-455 text-center mt-2 max-w-lg mx-auto text-sm font-semibold">Everything you need to master concepts, organize schedules, and review weak areas.</p>
          
          <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="glass-card p-8 rounded-2xl hover:-translate-y-1 hover:border-primary-500/30 hover:shadow-xl dark:hover:shadow-primary-500/5 transition-all duration-300 group">
              <div class="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform shadow-md shadow-primary-500/5">
                <i class="fa-solid fa-brain"></i>
              </div>
              <h3 class="font-display font-bold text-xl text-slate-900 dark:text-white mb-2 tracking-tight">AI Study Assistant</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">Resolve complex doubts, view step-by-step algorithms, and seek concept explanations with reference materials.</p>
            </div>

            <!-- Feature 2 -->
            <div class="glass-card p-8 rounded-2xl hover:-translate-y-1 hover:border-primary-500/30 hover:shadow-xl dark:hover:shadow-primary-500/5 transition-all duration-300 group">
              <div class="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform shadow-md shadow-indigo-500/5">
                <i class="fa-solid fa-cubes"></i>
              </div>
              <h3 class="font-display font-bold text-xl text-slate-900 dark:text-white mb-2 tracking-tight">Smart Mock Tests</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">Build custom mock tests filterable by subject, topic, difficulty, or year. Simulate the authentic computer-based GATE test environment.</p>
            </div>

            <!-- Feature 3 -->
            <div class="glass-card p-8 rounded-2xl hover:-translate-y-1 hover:border-primary-500/30 hover:shadow-xl dark:hover:shadow-primary-500/5 transition-all duration-300 group">
              <div class="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform shadow-md shadow-emerald-500/5">
                <i class="fa-solid fa-chart-line"></i>
              </div>
              <h3 class="font-display font-bold text-xl text-slate-900 dark:text-white mb-2 tracking-tight">Detailed Analytics</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">Analyze errors and timing, track accuracy trends, and receive personal study plans based on your strong and weak areas.</p>
            </div>
          </div>
        </div>

        <!-- About Section -->
        <div id="about-section" class="mt-32 w-full text-left scroll-mt-24 border-t border-slate-200/60 dark:border-white/[0.06] pt-20">
          <div class="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="space-y-6">
                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                  <i class="fa-solid fa-graduation-cap"></i> About GateLabs
                </span>
                <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
                  Built by Engineering Aspirants, For Engineering Aspirants
                </h2>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  GateLabs was conceived to eliminate friction in GATE preparation. Traditional question banks lack instant clarification and performance analytics. GateLabs combines authentic Computer-Based Test (CBT) simulation with Gemini AI assistance to give candidates an unparalleled competitive edge.
                </p>
                <div class="grid grid-cols-2 gap-4 pt-2">
                  <div class="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-white/[0.04]">
                    <div class="font-display font-extrabold text-2xl text-primary-600 dark:text-primary-400">100%</div>
                    <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">CBT Simulation</div>
                  </div>
                  <div class="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-white/[0.04]">
                    <div class="font-display font-extrabold text-2xl text-indigo-600 dark:text-indigo-400">AI</div>
                    <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Powered Explanations</div>
                  </div>
                </div>
                <div>
                  <a href="#/about" class="inline-flex items-center gap-2 font-bold text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                    Learn more about our architecture & vision <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-white/[0.06]">
                  <i class="fa-solid fa-layer-group text-2xl text-primary-500 mb-3"></i>
                  <h4 class="font-bold text-base text-slate-900 dark:text-white mb-1">Subject Mastery</h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold">Data Structures, Algorithms, OS, DBMS, Computer Networks, TOC, and more.</p>
                </div>
                <div class="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-white/[0.06]">
                  <i class="fa-solid fa-clock text-2xl text-indigo-500 mb-3"></i>
                  <h4 class="font-bold text-base text-slate-900 dark:text-white mb-1">Time Analytics</h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold">Track average speed per question and optimize time distribution during tests.</p>
                </div>
                <div class="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-white/[0.06]">
                  <i class="fa-solid fa-calculator text-2xl text-emerald-500 mb-3"></i>
                  <h4 class="font-bold text-base text-slate-900 dark:text-white mb-1">Scientific Calculator</h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold">Draggable, official GATE interface calculator for realistic practice.</p>
                </div>
                <div class="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-white/[0.06]">
                  <i class="fa-solid fa-user-shield text-2xl text-amber-500 mb-3"></i>
                  <h4 class="font-bold text-base text-slate-900 dark:text-white mb-1">Secure & Local</h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold">User data stored securely with Firebase Authentication integration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Auth Modal -->
      <div id="auth-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-sm hidden animate-fade-in px-4">
        <div class="w-full max-w-md glass-panel p-8 rounded-3xl relative shadow-2xl border border-white/10 glow-primary text-slate-900 dark:text-white">
          <button id="close-modal-btn" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
          
          <h2 id="modal-title" class="font-display font-extrabold text-2xl text-center tracking-tight">Sign In</h2>
          <p id="modal-subtitle" class="text-xs text-slate-500 dark:text-slate-400 text-center mt-1.5 font-semibold">Access your GATE workspace</p>
          
          <form id="auth-form" class="mt-6 flex flex-col gap-4">
            <div id="name-field-container" class="hidden">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <input type="text" id="auth-name" placeholder="John Doe" class="glass-input">
            </div>
            
            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <input type="email" id="auth-email" required placeholder="name@domain.com" class="glass-input">
            </div>
            
            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
              <input type="password" id="auth-password" required placeholder="••••••••" class="glass-input">
            </div>
            
            <button type="submit" id="auth-submit-btn" class="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-primary-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 duration-150">
              <span id="submit-text">Sign In</span>
              <i id="submit-spinner" class="fa-solid fa-spinner animate-spin hidden"></i>
            </button>
          </form>
          
          <p class="text-xs text-center text-slate-550 dark:text-slate-400 mt-6">
            <span id="toggle-auth-text" class="font-semibold">Don't have an account?</span>
            <button id="toggle-auth-btn" class="text-primary-600 dark:text-primary-400 font-bold hover:underline">Sign Up</button>
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <footer class="border-t border-slate-200/40 dark:border-white/[0.06] py-8 bg-white/20 dark:bg-slate-950/10">
        <div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 dark:text-slate-455 font-semibold">
          <span>&copy; 2026 GATE Flow. All rights reserved. Built for GATE CS & IT 2027.</span>
          <div class="flex gap-4">
            <a href="#" class="hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-primary-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    `;
  },

  init() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('theme-sun');
    const moonIcon = document.getElementById('theme-moon');
    
    // Theme Toggle Handler
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

    // Auth Modals Setup
    const authModal = document.getElementById('auth-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const navLoginBtn = document.getElementById('nav-login-btn');
    const navRegisterBtn = document.getElementById('nav-register-btn');
    const heroBtn = document.getElementById('hero-get-started');
    
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const nameFieldContainer = document.getElementById('name-field-container');
    const authForm = document.getElementById('auth-form');
    const authName = document.getElementById('auth-name');
    const authEmail = document.getElementById('auth-email');
    const authPassword = document.getElementById('auth-password');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');
    
    const toggleAuthBtn = document.getElementById('toggle-auth-btn');
    const toggleAuthText = document.getElementById('toggle-auth-text');
    
    let isSignUp = false;

    const openModal = (registerMode = false) => {
      isSignUp = registerMode;
      authModal.classList.remove('hidden');
      
      if (isSignUp) {
        modalTitle.textContent = "Sign Up";
        modalSubtitle.textContent = "Create your custom GATE workspace";
        nameFieldContainer.classList.remove('hidden');
        authName.required = true;
        submitText.textContent = "Sign Up";
        toggleAuthText.textContent = "Already have an account?";
        toggleAuthBtn.textContent = "Sign In";
      } else {
        modalTitle.textContent = "Sign In";
        modalSubtitle.textContent = "Access your GATE workspace";
        nameFieldContainer.classList.add('hidden');
        authName.required = false;
        submitText.textContent = "Sign In";
        toggleAuthText.textContent = "Don't have an account?";
        toggleAuthBtn.textContent = "Sign Up";
      }
    };

    const closeModal = () => {
      authModal.classList.add('hidden');
      authForm.reset();
    };

    navLoginBtn?.addEventListener('click', () => openModal(false));
    navRegisterBtn?.addEventListener('click', () => openModal(true));
    heroBtn?.addEventListener('click', () => openModal(true));
    closeModalBtn?.addEventListener('click', closeModal);
    
    authModal?.addEventListener('click', (e) => {
      if (e.target === authModal) closeModal();
    });

    toggleAuthBtn?.addEventListener('click', () => {
      openModal(!isSignUp);
    });

    authForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = authEmail.value.trim();
      const password = authPassword.value;
      const name = authName.value.trim();

      // UI Loading state
      authSubmitBtn.disabled = true;
      submitSpinner.classList.remove('hidden');
      submitText.textContent = isSignUp ? "Creating Account..." : "Signing In...";

      try {
        if (isSignUp) {
          await auth.signUp(email, password, name);
          showToast(`Welcome to GATE Flow, ${name || 'User'}!`, 'success');
        } else {
          const user = await auth.signIn(email, password);
          showToast(`Welcome back, ${user.displayName || user.email}!`, 'success');
        }
        closeModal();
        window.location.hash = '#/dashboard';
      } catch (err) {
        const friendlyMessage = getFriendlyAuthErrorMessage(err);
        showToast(friendlyMessage, 'error');
      } finally {
        authSubmitBtn.disabled = false;
        submitSpinner.classList.add('hidden');
        submitText.textContent = isSignUp ? "Sign Up" : "Sign In";
      }
    });
  }
};
