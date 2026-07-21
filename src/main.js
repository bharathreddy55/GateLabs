import { auth } from './config/firebase';
import { initTheme } from './utils/theme';
import { showToast } from './utils/toast';

// Import Pages
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Assistant } from './pages/Assistant';
import { Practice } from './pages/Practice';
import { MockTest } from './pages/MockTest';
import { Analytics } from './pages/Analytics';
import { About } from './pages/About';
import { Formulas } from './pages/Formulas';

// Import Layout Component
import { Layout } from './components/Layout';

// Styles
import './styles/index.css';

// Initialize global theme
initTheme();

// Route Configuration
const routes = {
  '/': { component: LandingPage, requiresAuth: false, name: 'home' },
  '/about': { component: About, requiresAuth: false, name: 'about' },
  '/dashboard': { component: Dashboard, requiresAuth: true, name: 'dashboard' },
  '/formulas': { component: Formulas, requiresAuth: true, name: 'formulas' },
  '/assistant': { component: Assistant, requiresAuth: true, name: 'assistant' },
  '/practice': { component: Practice, requiresAuth: true, name: 'practice' },
  '/mock-test': { component: MockTest, requiresAuth: true, name: 'mock-test' },
  '/analytics': { component: Analytics, requiresAuth: true, name: 'analytics' }
};

// Main Routing Router
async function router() {
  const appContainer = document.getElementById('app');
  // Extract hash path e.g. #/dashboard?id=123 -> /dashboard
  let hashPath = window.location.hash.split('?')[0] || '#/';
  if (hashPath.startsWith('#')) {
    hashPath = hashPath.slice(1);
  }
  if (!hashPath.startsWith('/')) {
    hashPath = '/' + hashPath;
  }

  // Check if mock test is active and user wants to navigate away
  if (MockTest.isTesting && hashPath !== '/mock-test') {
    if (!confirm("An exam is currently in progress. Leaving now will forfeit all progress. Are you sure you want to exit?")) {
      window.location.hash = '#/mock-test';
      return;
    } else {
      MockTest.isTesting = false;
      if (MockTest.timer) clearInterval(MockTest.timer);
      if (MockTest.unloadHandler) {
        window.removeEventListener('beforeunload', MockTest.unloadHandler);
        MockTest.unloadHandler = null;
      }
      document.body.classList.remove('fullscreen-exam');

    }
  }

  // Remove fullscreen class if we navigate away from active test
  if (hashPath !== '/mock-test') {
    document.body.classList.remove('fullscreen-exam');
  }

  // Retrieve route config, fallback to home
  const route = routes[hashPath] || routes['/'];

  // Check auth protection
  const currentUser = auth.currentUser;
  
  if (route.requiresAuth && !currentUser) {
    showToast("Please sign in to access this page.", "warning");
    window.location.hash = '#/';
    return;
  }

  if (route.name === 'home' && currentUser) {
    window.location.hash = '#/dashboard';
    return;
  }

  // Render view
  try {
    if (route.requiresAuth) {
      const sidebar = document.getElementById('sidebar-container');
      if (sidebar) {
        Layout.updateNavigation(route.name);
        const subPageContainer = document.getElementById('sub-page-container');
        if (subPageContainer) {
          subPageContainer.innerHTML = await route.component.render();
          await route.component.init();
        }
      } else {
        const contentHtml = await route.component.render();
        appContainer.innerHTML = Layout.render(contentHtml, route.name);
        Layout.init(route.name);
        await route.component.init();
      }
    } else {
      appContainer.innerHTML = await route.component.render();
      await route.component.init();
    }
  } catch (error) {
    console.error("Routing error:", error);
    appContainer.innerHTML = `
      <div class="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-darkbg-200">
        <i class="fa-solid fa-triangle-exclamation text-rose-500 text-4xl mb-4"></i>
        <h3 class="font-display font-extrabold text-xl">Routing Error</h3>
        <p class="text-xs text-slate-500 mt-2">Something went wrong when building this view. Check browser logs.</p>
        <a href="#/" class="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg text-xs font-semibold">Home</a>
      </div>
    `;
  }
}

// Listen for hash modifications and auth states
window.addEventListener('hashchange', router);

// Handle auth state changes
auth.onAuthStateChanged((user) => {
  // If user signed in or out, refresh current route context
  router();
});

// Run router on first load
window.addEventListener('DOMContentLoaded', router);
export { router };
