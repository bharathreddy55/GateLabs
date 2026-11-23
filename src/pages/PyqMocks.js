import { escapeHtml as h } from '../utils/examEngine.js';
import { icon } from '../config/navigation.js';
import { normaliseQuestions } from '../utils/examAdapters.js';
import { getAttemptRecords } from '../utils/attemptRepository.js';
import { indexPaperAttempts, paperAttemptLabel } from '../utils/paperProgress.js';
import { db } from '../config/firebase';
import { showToast } from '../utils/toast';
import { MockTest } from './MockTest';

const yearTitle = year => `GATE CS ${year} question-bank practice`;
const yearKey = year => `year:${year}`;

export const PyqMocks = {
  async render() {
    const [questions,{attempts}]=await Promise.all([db.getQuestions(),getAttemptRecords()]);
    const allQuestions=questions.filter(q=>!/sbi|english language|quantitative aptitude|reasoning ability/i.test(q.subject||''));
    const groups=Object.create(null);allQuestions.forEach(q=>{if(q.year)(groups[q.year]??=[]).push(q);});
    const years=Object.keys(groups).sort((a,b)=>b-a);
    const counts=indexPaperAttempts(attempts.filter(a=>a.examId==='gate'),years.map(year=>({
      key:yearKey(year),title:yearTitle(year),mode:'practice'
    })));
    return `<div class="workspace-page">
      <header class="page-heading"><div><a class="back-link" href="#/gate?tab=papers">← GATE preparation</a>
      <span class="eyebrow">GATE CS & IT</span><h1>Year-wise paper library</h1>
      <p>Practise questions from the indexed bank, organised by year. A year’s question pool may contain partial papers or multiple sets.</p></div></header>
      <div class="notice">These sessions use the available question bank. Question counts and total marks may differ from a complete official paper.</div>
      <div class="paper-grid">${years.map(year=>{
        const count=counts.get(yearKey(year));
        return `<article class="surface paper-card"><div class="paper-card-top"><span class="subtle-tag">Question bank</span>
          <span class="paper-count">${groups[year].length} questions</span></div><h2>GATE CS ${h(year)}</h2>
          <span class="paper-attempt-label" data-completed="${count>0}">${paperAttemptLabel(count)}</span>
          <div class="button-row"><button class="ui-button primary start-pyq-mock-btn" data-year="${h(year)}">Start CBT practice ${icon('arrow')}</button>
          <a class="ui-button" href="#/practice">Choose a topic</a></div></article>`;
      }).join('')}</div>
      ${years.length?'':'<section class="surface empty-state"><h2>No papers indexed yet</h2><p>Add question material using the import tools in Question practice.</p><a href="#/practice">Open question practice →</a></section>'}</div>`;
  },

  async init() {
    window.scrollTo(0, 0);

    // Bind Start Mock button triggers
    document.querySelectorAll('.start-pyq-mock-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const year = btn.getAttribute('data-year');
        showToast(`Loading GATE ${year} Mock Paper...`, "info");

        // Query all questions for this year
        const allQs = (await db.getQuestions({ year })).filter(q => !/sbi|english language|quantitative aptitude|reasoning ability/i.test(q.subject||''));

        if (allQs.length === 0) {
          showToast(`No questions found in the database for year ${year}.`, "warning");
          return;
        }

        // Sort questions logically by subject & topic
        const sortedQs = allQs.sort((a, b) => {
          if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
          return a.topic.localeCompare(b.topic);
        });

        MockTest.startExam({examId:'gate',questions:normaliseQuestions('gate',sortedQs),title:yearTitle(year),paperKey:yearKey(year),full:false,minutes:180});
      });
    });

  }
};
