import { EXAM_CATALOG, icon } from '../config/navigation.js';
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

    return `
      <div class="landing-workspace">
        <nav class="landing-nav" aria-label="GateLabs">
          <a class="app-brand" href="#/"><span class="brand-mark" aria-hidden="true">g</span><span>GateLabs</span></a>
          <div>
            <button id="theme-toggle-btn" aria-label="Toggle appearance">${icon('moon')}<i id="theme-sun" class="hidden"></i><i id="theme-moon" class="hidden"></i></button>
            <button id="nav-login-btn" class="ui-button">Sign in</button>
            <button id="nav-register-btn" class="ui-button primary">Create account</button>
          </div>
        </nav>
        <main>
          <section class="landing-intro">
            <div class="landing-copy">
              <h1>Prepare for your next <em>exam.</em></h1>
              <p>Study your syllabus, sit timed mock tests, and review every answer in one place.</p>
              <button id="hero-get-started" class="ui-button focus-action">Start preparing ${icon('arrow')}</button>
            </div>
            <div class="landing-preview">
              <h2>Your exam workspace</h2>
              <ul>
                <li><span>${icon('book')}</span><div><h3>Syllabus and detailed notes</h3><p>Track your topics and revise with quick-recall cards.</p></div></li>
                <li><span>${icon('edit')}</span><div><h3>Full-screen mock tests</h3><p>Practise with exam-specific timing and marking.</p></div></li>
                <li><span>${icon('chart')}</span><div><h3>Answer review</h3><p>See explanations and revisit weak topics.</p></div></li>
              </ul>
            </div>
          </section>
          <section class="landing-exams">
            <h2>Choose your exam</h2>
            <div>${EXAM_CATALOG.map(exam => `<article style="--exam-color:${exam.color}">
              <span class="exam-symbol" aria-hidden="true">${exam.symbol}</span>
              <h3>${exam.name}</h3><p>${exam.description}</p></article>`).join('')}</div>
          </section>
        </main>
        <footer class="workspace-footer"><span>GateLabs</span><a href="#/about">About GateLabs</a></footer>
      </div>

      <!-- Auth Modal -->
      <div role="dialog" aria-modal="true" aria-labelledby="auth-title" id="auth-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 dark:bg-black/80 backdrop-blur-md hidden animate-fade-in px-4">
        <div class="w-full max-w-md glass-panel p-8 rounded-3xl relative shadow-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
          <button aria-label="Close sign in dialog" id="close-modal-btn" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <span aria-hidden="true" style="display:grid;place-items:center;width:32px;height:32px;font-size:25px">×</span>
          </button>

          <div class="text-center mb-5">
            <h2 id="auth-title" class="font-display font-extrabold text-xl">Create Account</h2>
            <p id="auth-subtitle" class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Join GateLabs to start tracking your syllabus and mock tests.</p>
          </div>

          <form id="auth-form" class="flex flex-col gap-3.5">
            <div id="name-field" class="flex flex-col gap-1">
              <label for="auth-name" class="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input type="text" id="auth-name" placeholder="Bharath" class="glass-input font-semibold">
            </div>

            <div class="flex flex-col gap-1">
              <label for="auth-email" class="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <input type="email" id="auth-email" required placeholder="aspirant@gate.edu" class="glass-input font-semibold">
            </div>

            <div class="flex flex-col gap-1">
              <label for="auth-password" class="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <input type="password" id="auth-password" required placeholder="••••••••" class="glass-input font-semibold">
            </div>

            <button type="submit" id="auth-submit-btn" class="w-full mt-2 py-3 rounded-full bg-primary-500 text-white font-bold text-xs shadow-md active:scale-95 hover:scale-102 transition-all flex items-center justify-center gap-2">
              <span id="submit-text">Sign Up</span>
              <i id="submit-spinner" class="fa-solid fa-circle-notch fa-spin hidden"></i>
            </button>
          </form>

          <div class="mt-5 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span id="toggle-text">Already have an account?</span>
            <button id="toggle-auth-btn" class="text-primary-500 font-bold hover:underline ml-1">Sign In</button>
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
      (isSignUp?authName:authEmail)?.focus();
    };

    const closeModal = () => {
      authModal?.classList.add('hidden');
    };

    navLoginBtn?.addEventListener('click', () => openModal(false));
    navRegisterBtn?.addEventListener('click', () => openModal(true));
    heroBtn?.addEventListener('click', () => openModal(true));
    closeBtn?.addEventListener('click', closeModal);
    authModal?.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal();});

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
