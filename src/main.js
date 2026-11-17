import {initFocusManagement} from './utils/focusManagement.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {storageRecoveryEntries,clearStorageRecovery} from './utils/safeStorage.js';
import { setStorageUser } from './utils/userStorage.js';
import { auth, db } from './config/firebase';
import { initTheme } from './utils/theme';
import { showToast } from './utils/toast';
import { initAccentPalette } from './utils/accentTheme';

import {MockTest} from './pages/MockTest.js';
import './styles/exams.css';

// Import Layout Component
import { Layout } from './components/Layout';

// Styles
import './styles/index.css';
import './styles/workspace.css';

// Initialize global theme & accent palette (apply saved colors before first paint)
initFocusManagement();
initTheme();
initAccentPalette();

const loadedPages=new Map();
const lazy=(loader,name)=>async()=>{const page=(await loader())[name];loadedPages.set(name,page);return page;};
let currentPage=null;
// Route Configuration
const routes = {
  '/': { load:lazy(()=>import('./pages/LandingPage.js'),'LandingPage'), requiresAuth: false, name: 'home' },
  '/about': { load:lazy(()=>import('./pages/About.js'),'About'), requiresAuth: false, name: 'about' },
  '/study-planner': { load:lazy(()=>import('./pages/Dashboard.js'),'Dashboard'), requiresAuth: true, name: 'study-planner' },
  '/exams': { load:lazy(()=>import('./pages/WorkspaceHome.js'),'ExamLibrary'), requiresAuth: true, name: 'exams' },
  '/dashboard': { load:lazy(()=>import('./pages/WorkspaceHome.js'),'WorkspaceHome'), requiresAuth: true, name: 'dashboard' },
  '/formulas': { load:lazy(()=>import('./pages/Formulas.js'),'Formulas'), requiresAuth: true, name: 'formulas' },
  '/assistant': { load:lazy(()=>import('./pages/Assistant.js'),'Assistant'), requiresAuth: true, name: 'assistant' },
  '/practice': { load:lazy(()=>import('./pages/Practice.js'),'Practice'), requiresAuth: true, name: 'practice' },
  '/mock-test': { load:async()=>MockTest, requiresAuth: true, name: 'mock-test' },
  '/pyq-mocks': { load:lazy(()=>import('./pages/PyqMocks.js'),'PyqMocks'), requiresAuth: true, name: 'pyq-mocks' },
  '/community': { load:lazy(()=>import('./pages/Community.js'),'Community'), requiresAuth: true, name: 'community' },
  '/gate': { load:lazy(()=>import('./pages/ExamPrep.js'),'GatePrep'), requiresAuth: true, name:'gate' },
  '/tet-exams': { load:lazy(()=>import('./pages/ExamPrep.js'),'UnifiedTet'), requiresAuth: true, name: 'tet-exams' },
  '/group2': { load:lazy(()=>import('./pages/ExamPrep.js'),'Group2'), requiresAuth: true, name: 'group2' },
  '/rrb-station-master': { load:lazy(()=>import('./pages/ExamPrep.js'),'StationMaster'), requiresAuth: true, name: 'rrb-station-master' },
  '/sbi-clerk': { load:lazy(()=>import('./pages/ExamPrep.js'),'UnifiedSbi'), requiresAuth: true, name: 'sbi-clerk' },
  '/analytics': { load:lazy(()=>import('./pages/Analytics.js'),'Analytics'), requiresAuth: true, name: 'analytics' }
};

// Main Routing Router
let authReady=false;
let routeGeneration=0;
let lastRenderedPath=null;
async function router() {
  const generation=++routeGeneration;
  MockTest.resetForUser();
  const appContainer = document.getElementById('app');
  if(!authReady){appContainer.innerHTML='<div class="workspace-loading" role="status">Restoring your sign-in…</div>';return;}
  // Extract hash path e.g. #/dashboard?id=123 -> /dashboard
  let hashPath = window.location.hash.split('?')[0] || '#/';
  if (hashPath.startsWith('#')) {
    hashPath = hashPath.slice(1);
  }
  if (!hashPath.startsWith('/')) {
    hashPath = '/' + hashPath;
  }

  // Check if mock test is active and user wants to navigate away
  if (MockTest.isTesting && (hashPath !== '/mock-test'||new URLSearchParams(location.hash.split('?')[1]||'').has('attempt'))) {
    if (!confirm("An exam is currently in progress. Leaving now will forfeit all progress. Are you sure you want to exit?")) {
      window.location.hash = '#/mock-test';
      return;
    } else {
      MockTest.abandon();
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
    sessionStorage.setItem('gate-return-to',window.location.hash);
    showToast("Please sign in to access this page.", "warning");
    window.location.hash = '#/';
    return;
  }

  if (route.name === 'home' && currentUser) {
    const destination=sessionStorage.getItem('gate-return-to');sessionStorage.removeItem('gate-return-to');
    window.location.hash=destination?.startsWith('#/')?destination:'#/dashboard';
    return;
  }

  // Render view
  try {
    const component=await route.load();if(generation!==routeGeneration)return;
    if(currentPage&&currentPage!==component)currentPage.cleanup?.();currentPage=component;
    if (route.requiresAuth || (currentUser && route.name==='about')) {
      const loading='<div class="workspace-loading" role="status"><span></span> Opening your workspace…</div>';
      if(!document.getElementById('sidebar-container')){
        appContainer.innerHTML=Layout.render(loading,route.name);
        Layout.init(route.name);
      } else Layout.updateNavigation(route.name);
      const subPageContainer=document.getElementById('sub-page-container');
      subPageContainer.innerHTML=loading;
      const html=await component.render();
      if(generation!==routeGeneration)return;
      subPageContainer.innerHTML=html;
      await component.init();
      const recovery=storageRecoveryEntries();
      if(Object.keys(recovery).length){
        const notice=document.createElement('section');notice.className='notice';notice.setAttribute('role','alert');notice.textContent='Some saved data could not be read. It has been retained. Export it before resetting or restoring a backup.';
        const exportButton=document.createElement('button');exportButton.textContent='Export recovery data';exportButton.onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(recovery,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='GateLabs-recovery.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};notice.append(exportButton);document.getElementById('sub-page-container')?.prepend(notice);
      }
    } else {
      appContainer.innerHTML = await component.render();
      await component.init();
    }
    if(generation===routeGeneration&&lastRenderedPath!==hashPath){window.scrollTo(0,0);lastRenderedPath=hashPath;}
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
  authReady=true;
  if(setStorageUser(user?.uid)){
    clearStorageRecovery();
    const Practice=loadedPages.get('Practice');if(Practice){Practice.questions=[];Practice.isApplied=false;Practice.parsedQuestions=[];}
    const Assistant=loadedPages.get('Assistant');if(Assistant){Assistant.messages=[{role:'model',text:'Ask a study question or connect an AI provider in settings.'}];Assistant.draft='';Assistant.error='';Assistant.pending=false;}
    const Formulas=loadedPages.get('Formulas');if(Formulas){Formulas.flippedCards={};Formulas.searchQuery='';}
    const Community=loadedPages.get('Community');if(Community){Community.activePostId=null;Community.posts=[];}
    const Dashboard=loadedPages.get('Dashboard');if(Dashboard)Dashboard.expandedNodes={};
    for(const page of loadedPages.values())page.cleanup?.();
  }
  // If user signed in or out, refresh current route context
  router();
});

// Run router on first load
window.addEventListener('DOMContentLoaded', router);
export { router };

window.addEventListener('online',()=>{if(auth.currentUser)db.retryPendingAttempts?.().catch(error=>console.warn('Sync retry pending',error));});
