import { escapeHtml as h } from '../utils/examEngine.js';
import { icon } from '../config/navigation.js';
import { parseExamText } from '../utils/parseExamText.js';
import { normaliseQuestions } from '../utils/examAdapters.js';
import { db } from '../config/firebase';
import { showToast } from '../utils/toast';
import { MockTest } from './MockTest';

export const PyqMocks = {
  async render() {
    const allQuestions=(await db.getQuestions()).filter(q=>!/tet|child development|pedagogy|language i|environmental studies|sbi|english language|quantitative aptitude|reasoning ability/i.test(q.subject||''));
    const groups=Object.create(null);allQuestions.forEach(q=>{if(q.year)(groups[q.year]??=[]).push(q);});
    const years=Object.keys(groups).sort((a,b)=>b-a);
    return `<div class="workspace-page"><header class="page-heading"><div><a class="back-link" href="#/gate?tab=papers">← GATE preparation</a><span class="eyebrow">GATE CS & IT</span><h1>Year-wise paper library</h1><p>Practise questions from the indexed bank, organised by year. A year’s question pool may contain partial papers or multiple sets.</p></div></header><div class="notice">These sessions use the available question bank. Question counts and total marks may differ from a complete official paper.</div><div class="paper-grid">${years.map(year=>`<article class="surface paper-card"><div class="paper-card-top"><span class="subtle-tag">Question bank</span><span class="paper-count">${groups[year].length} questions</span></div><h2>GATE CS ${h(year)}</h2><p>CBT practice with a timer, question palette and answer review.</p><div class="button-row"><button class="ui-button primary start-pyq-mock-btn" data-year="${h(year)}">Start CBT practice ${icon('arrow')}</button><a class="ui-button" href="#/practice">Choose a topic</a></div></article>`).join('')}</div>${years.length?'':'<section class="surface empty-state"><h2>No papers indexed yet</h2><p>Add question material using the import tools in Question practice.</p><a href="#/practice">Open question practice →</a></section>'}</div>`;
  },

  async init() {
    window.scrollTo(0, 0);

    // Bind Start Mock button triggers
    document.querySelectorAll('.start-pyq-mock-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const year = btn.getAttribute('data-year');
        showToast(`Loading GATE ${year} Mock Paper...`, "info");

        // Query all questions for this year
        const allQs = (await db.getQuestions({ year })).filter(q => !/tet|child development|pedagogy|language i|environmental studies|sbi|english language|quantitative aptitude|reasoning ability/i.test(q.subject||''));

        if (allQs.length === 0) {
          showToast(`No questions found in the database for year ${year}.`, "warning");
          return;
        }

        // Sort questions logically by subject & topic
        const sortedQs = allQs.sort((a, b) => {
          if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
          return a.topic.localeCompare(b.topic);
        });

        MockTest.startExam({examId:'gate',questions:normaliseQuestions('gate',sortedQs),title:`GATE CS ${year} question-bank practice`,full:false,minutes:180});
      });
    });

    // Bind Start TET Mock button triggers
    document.querySelectorAll('.start-tet-mock-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const file = btn.getAttribute('data-file');
        const name = btn.getAttribute('data-name');
        showToast(`Loading ${name} Mock Paper...`, "info");
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Loading...';

        try {
          const res = await fetch(`./pyqs/${file}`);
          if (!res.ok) throw new Error("Failed to fetch mock paper.");
          const text = await res.text();
          
          const parsed = parseExamText(text,'tet');

          MockTest.startExam({examId:'tet',questions:normaliseQuestions('tet',parsed),title:name});

        } catch (err) {
          showToast("Error loading exam: " + err.message, "error");
        } finally {
          btn.disabled = false;
          btn.innerHTML = 'Start Mock';
        }
      });
    });
  }
};
