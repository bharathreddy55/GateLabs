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
      <nav class="fixed top-4 left-4 right-4 z-40 bg-white/80 dark:bg-[#161618]/80 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] rounded-3xl shadow-sm transition-all duration-300">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-9 w-9 rounded-2xl bg-[#0071e3] dark:bg-[#2997ff] flex items-center justify-center text-white shadow-md">
              <i class="fa-solid fa-graduation-cap text-base"></i>
            </div>
            <span class="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">GateLabs</span>
          </div>

          <div class="flex items-center gap-3">
            <button id="theme-toggle-btn" class="p-2 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-[#86868b] transition-all select-none">
              <i id="theme-sun" class="fa-solid fa-sun ${sunIconClass}"></i>
              <i id="theme-moon" class="fa-solid fa-moon ${moonIconClass}"></i>
            </button>

            <button id="nav-login-btn" class="hidden sm:inline-flex text-xs font-bold text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white px-4 py-2 transition-colors">Sign In</button>
            <button id="nav-register-btn" class="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-[#0071e3] dark:bg-[#2997ff] hover:scale-102 active:scale-95 rounded-full shadow-md transition-all">Get Started</button>
          </div>
        </div>
      </nav>

      <!-- Hero Presentation -->
      <section class="min-h-screen pt-36 pb-20 px-6 flex flex-col justify-center items-center text-center relative overflow-hidden bg-[#f5f5f7] dark:bg-[#000000]">
        
        <div class="max-w-4xl mx-auto space-y-6 relative z-10">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-sm">
            <span class="h-2 w-2 rounded-full bg-[#0071e3] dark:bg-[#2997ff] animate-ping"></span>
            <span class="text-xs font-extrabold text-[#0071e3] dark:text-[#2997ff] tracking-tight">GATE CS 2027 Simulator Engine</span>
          </div>

          <h1 class="font-display font-extrabold text-5xl md:text-7xl text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Master GATE CS with <br/>
            <span class="text-[#0071e3] dark:text-[#2997ff]">Apple-Grade Precision.</span>
          </h1>

          <p class="text-base md:text-lg text-slate-500 dark:text-[#86868b] max-w-2xl mx-auto font-medium leading-relaxed">
            Topic-driven mock test generator, interactive syllabus concept maps, daily streak trackers, and AI assistant — built without clutter.
          </p>

          <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button id="hero-get-started" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-[#0071e3] dark:bg-[#2997ff] hover:scale-105 active:scale-95 rounded-full shadow-lg transition-all">
              <span>Start Preparation Now</span>
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>

        <!-- 3 Feature Highlight Bento Cards -->
        <div class="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full">
          <div class="glass-panel p-8 rounded-3xl border border-black/[0.05] dark:border-white/[0.08] flex flex-col gap-4 text-left">
            <div class="h-12 w-12 rounded-2xl bg-blue-500/10 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center text-xl">
              🎯
            </div>
            <h3 class="font-display font-extrabold text-lg text-slate-900 dark:text-white">CBT Exam Simulator</h3>
            <p class="text-xs text-slate-500 dark:text-[#86868b] font-medium leading-relaxed">Exact GATE exam interface matching standard paper palettes, countdown timers, and virtual calculator.</p>
          </div>

          <div class="glass-panel p-8 rounded-3xl border border-black/[0.05] dark:border-white/[0.08] flex flex-col gap-4 text-left">
            <div class="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl">
              ⚡
            </div>
            <h3 class="font-display font-extrabold text-lg text-slate-900 dark:text-white">Syllabus Mind Maps</h3>
            <p class="text-xs text-slate-500 dark:text-[#86868b] font-medium leading-relaxed">Checklist mind maps across Engineering Mathematics, Operating Systems, Computer Networks, and DBMS.</p>
          </div>

          <div class="glass-panel p-8 rounded-3xl border border-black/[0.05] dark:border-white/[0.08] flex flex-col gap-4 text-left">
            <div class="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-xl">
              🤖
            </div>
            <h3 class="font-display font-extrabold text-lg text-slate-900 dark:text-white">AI Assistant</h3>
            <p class="text-xs text-slate-500 dark:text-[#86868b] font-medium leading-relaxed">Instant step-by-step math solver and concept explanations powered by Google Gemini API.</p>
          </div>
        </div>
      </section>

      <!-- Auth Modal -->
      <div id="auth-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-md hidden animate-fade-in px-4">
        <div class="w-full max-w-md glass-panel p-8 rounded-3xl relative shadow-2xl text-slate-900 dark:text-white border border-black/10 dark:border-white/10">
          <button id="close-modal-btn" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>

          <div class="text-center mb-6">
            <h2 id="auth-title" class="font-display font-extrabold text-2xl">Create Account</h2>
            <p id="auth-subtitle" class="text-xs text-slate-500 dark:text-[#86868b] mt-1.5 font-medium">Join GateLabs to start tracking your syllabus and mock tests.</p>
          </div>

          <form id="auth-form" class="flex flex-col gap-4">
            <div id="name-field" class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input type="text" id="auth-name" placeholder="Bharath" class="glass-input font-semibold">
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <input type="email" id="auth-email" required placeholder="aspirant@gate.edu" class="glass-input font-semibold">
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <input type="password" id="auth-password" required placeholder="••••••••" class="glass-input font-semibold">
            </div>

            <button type="submit" id="auth-submit-btn" class="w-full mt-2 py-3.5 rounded-full bg-[#0071e3] dark:bg-[#2997ff] text-white font-bold text-xs shadow-md active:scale-95 hover:scale-102 transition-all flex items-center justify-center gap-2">
              <span id="submit-text">Sign Up</span>
              <i id="submit-spinner" class="fa-solid fa-circle-notch fa-spin hidden"></i>
            </button>
          </form>

          <div class="mt-6 text-center text-xs text-slate-500 dark:text-[#86868b] font-medium">
            <span id="toggle-text">Already have an account?</span>
            <button id="toggle-auth-btn" class="text-[#0071e3] dark:text-[#2997ff] font-bold hover:underline ml-1">Sign In</button>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    themeBtn?.addEventListener('click', () => {
      toggleTheme();
      const theme = getTheme();
      const sun = document.getElementById('theme-sun');
      const moon = document.getElementById('theme-moon');
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

    const authModal = document.getElementById('auth-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const navLoginBtn = document.getElementById('nav-login-btn');
    const navRegisterBtn = document.getElementById('nav-register-btn');
    const heroBtn = document.getElementById('hero-get-started');
    const toggleAuthBtn = document.getElementById('toggle-auth-btn');

    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const nameField = document.getElementById('name-field');
    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');
    const toggleText = document.getElementById('toggle-text');
    const authEmail = document.getElementById('auth-email');
    const authPassword = document.getElementById('auth-password');
    const authName = document.getElementById('auth-name');
    const authSubmitBtn = document.getElementById('auth-submit-btn');

    let isSignUp = true;

    const openModal = (signUpMode = true) => {
      isSignUp = signUpMode;
      if (isSignUp) {
        authTitle.textContent = "Create Account";
        authSubtitle.textContent = "Join GateLabs to start tracking your syllabus and mock tests.";
        nameField.classList.remove('hidden');
        submitText.textContent = "Sign Up";
        toggleText.textContent = "Already have an account?";
        toggleAuthBtn.textContent = "Sign In";
      } else {
        authTitle.textContent = "Welcome Back";
        authSubtitle.textContent = "Sign in to access your GateLabs dashboard.";
        nameField.classList.add('hidden');
        submitText.textContent = "Sign In";
        toggleText.textContent = "Don't have an account?";
        toggleAuthBtn.textContent = "Sign Up";
      }
      authModal?.classList.remove('hidden');
    };

    const closeModal = () => {
      authModal?.classList.add('hidden');
    };

    navLoginBtn?.addEventListener('click', () => openModal(false));
    navRegisterBtn?.addEventListener('click', () => openModal(true));
    heroBtn?.addEventListener('click', () => openModal(true));
    closeBtn?.addEventListener('click', closeModal);

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

      authSubmitBtn.disabled = true;
      submitSpinner.classList.remove('hidden');
      submitText.textContent = isSignUp ? "Creating Account..." : "Signing In...";

      try {
        if (isSignUp) {
          await auth.signUp(email, password, name);
          showToast(`Welcome to GateLabs, ${name || 'User'}!`, 'success');
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
