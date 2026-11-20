import { getAttemptRecords } from '../utils/attemptRepository.js';
import { readStored } from '../utils/safeStorage.js';
import { auth } from '../config/firebase';
import { EXAM_CATALOG, icon } from '../config/navigation.js';
import { EXAMS } from '../config/exams.js';
import { escapeHtml as h, countdown } from '../utils/examEngine.js';

export function examTile(exam) {
  const rule = EXAMS[exam.id];
  return `<a class="exam-tile" style="--exam-color:${exam.color}" href="#/${exam.route}">
    <div class="exam-tile-top">
      <span class="exam-symbol" aria-hidden="true">${exam.symbol}</span>
      <span class="eyebrow">${exam.category}</span>
    </div>
    <h2>${exam.name}</h2>
    <p>${exam.description}</p>
    <div class="tile-meta"><span>${rule.count} questions</span><span>${rule.minutes} min</span></div>
    <span class="tile-link">Open preparation ${icon('arrow')}</span>
  </a>`;
}

export const ExamLibrary = {
  render() {
    return `<div class="workspace-page">
      <header class="page-heading"><div><h1>Explore exams</h1>
        <p>Find mock tests, syllabuses, detailed notes, and previous papers.</p></div></header>
      <label class="exam-search">${icon('grid')}
        <input id="exam-search" type="search" placeholder="Search exams, categories or subjects" aria-label="Search exams">
      </label>
      <div class="exam-library-grid">${EXAM_CATALOG.map(examTile).join('')}</div>
      <p id="exam-search-empty" role="status" hidden>No exams match your search.</p>
    </div>`;
  },
  init() {
    document.getElementById('exam-search').oninput = event => {
      const search = event.target.value.trim().toLowerCase();
      const tiles = [...document.querySelectorAll('.exam-library-grid .exam-tile')];
      for (const tile of tiles) tile.hidden = !tile.textContent.toLowerCase().includes(search);
      document.getElementById('exam-search-empty').hidden = tiles.some(tile => !tile.hidden);
    };
  },
};

const studyLinks = [
  ['practice', 'Question practice', 'edit'],
  ['study-planner', 'Study planner', 'calendar'],
  ['analytics', 'Results & mistakes', 'chart'],
];

export const WorkspaceHome = {
  async render() {
    const {attempts, syncState} = await getAttemptRecords();
    const latest = [...attempts].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    const user = auth.currentUser;
    const firstName = user?.displayName?.trim().split(/\s+/)[0];
    const recentId = localStorage.getItem('last-exam:' + user?.uid);
    const recent = EXAM_CATALOG.find(exam => exam.id === recentId) || EXAMS[recentId];
    const savedExam = readStored('exam-active:' + user?.uid, null);
    const active = Object.hasOwn(EXAMS, savedExam?.pending?.examId);
    const accuracyScores = latest.filter(attempt => Number.isFinite(attempt.accuracy));
    const accuracy = accuracyScores.length
      ? Math.round(accuracyScores.reduce((total, attempt) => total + attempt.accuracy, 0) / accuracyScores.length) + '%'
      : '—';
    const today = new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
    const next = EXAM_CATALOG.map(meta => ({
      meta,
      date: [EXAMS[meta.id].date, ...(EXAMS[meta.id].schedule?.dates || [])].filter(date => date && date >= today).sort()[0],
    })).filter(exam => exam.date).sort((a,b) => a.date.localeCompare(b.date))[0];
    const focus = active
      ? { label:'Test in progress', title:savedExam.pending.title || 'Resume your session',
          description:'Continue with your saved answers and original deadline.', route:'mock-test', action:'Resume test' }
      : recent
        ? { label:'Continue preparation', title:recent.name, description:'Pick up your syllabus, notes, or mock tests.',
            route:recent.route, action:'Continue preparation' }
        : { label:'Exam preparation', title:'Start with your exam.', description:'Choose an exam to see the pattern, syllabus, and practice tests.',
            route:'exams', action:'Choose an exam' };

    return `<div class="workspace-page dashboard-workspace">
      <header class="page-heading">
        <div><h1>Welcome back${firstName ? ', ' + h(firstName) : ''}.</h1></div>
        <span class="today-label">${icon('calendar')}${new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span>
      </header>
      ${syncState === 'offline' ? '<div class="notice" role="status">Cloud history is unavailable. Showing saved device results.</div>' : ''}
      <section class="home-focus">
        <div class="home-focus-copy">
          <span class="eyebrow">${focus.label}</span>
          <h2>${h(focus.title)}</h2>
          <p>${focus.description}</p>
          <a class="ui-button focus-action" href="#/${h(focus.route)}">${focus.action} ${icon('arrow')}</a>
        </div>
        <nav class="home-shortcuts" aria-label="Study shortcuts">
          ${studyLinks.map(([route, label, glyph]) => `<a href="#/${route}"><span>${icon(glyph)}</span>${label}${icon('arrow')}</a>`).join('')}
        </nav>
      </section>
      <div class="home-stats dashboard-stats">
        <div><span>${icon('file')} Completed tests</span><strong>${syncState === 'offline' && !latest.length ? '—' : latest.length}</strong></div>
        <div><span>${icon('chart')} Average accuracy</span><strong>${accuracy}</strong></div>
        <div><span>${icon('calendar')} Next announced exam day</span><strong>${next ? h(next.meta.short) : 'Awaiting schedule'}
          ${next ? '<small>' + h(countdown(next.date)) + '</small>' : ''}</strong></div>
      </div>
      <section>
        <div class="section-heading"><h2>Choose an exam</h2><a href="#/exams">View all exams ${icon('arrow')}</a></div>
        <div class="exam-library-grid home-exams">${EXAM_CATALOG.map(examTile).join('')}</div>
      </section>
      <section class="surface">
        <div class="section-heading"><h2>Recent activity</h2><a href="#/analytics">All results ${icon('arrow')}</a></div>
        ${latest.length ? latest.slice(0,3).map(attempt => `<a class="activity-row" href="#/analytics?id=${encodeURIComponent(attempt.id)}">
          <span class="activity-icon">${icon('chart')}</span><div><strong>${h(attempt.scope || 'Practice test')}</strong>
          <small>${new Date(attempt.timestamp).toLocaleDateString('en-IN')} · ${attempt.mode === 'full' ? 'Full mock' : 'Practice'}</small></div>
          <b>${Number(attempt.score).toFixed(2)}<small> / ${attempt.totalPossibleMarks ?? '—'}</small></b>${icon('arrow')}
        </a>`).join('') : `<div class="empty-state">${icon('chart')}<p>Completed practice tests will appear here.</p><a href="#/exams">Find a mock test →</a></div>`}
      </section>
    </div>`;
  },
  init() {},
};
