import { EXAM_CATALOG } from '../config/navigation.js';
import { GROUP2_MAINS } from '../config/group2Mains.js';
import { escapeHtml as h } from '../utils/examEngine.js';
import { stationMasterReviewTopic } from '../utils/stationMasterReviewTopics.js';
import { examNotes, formatNote } from './ExamNotes.js';

const slug = title => title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
const summaries = new Map();

export function reviewTopic(question, examId) {
  const topic = examId === 'rrb' ? stationMasterReviewTopic(question) : null;
  const title = topic?.title || question.topic?.trim() || 'Unclassified topic';
  const notes = examNotes(examId);
  const key = slug(title);
  const note = notes.find(item => item.id === topic?.noteId || item.id === key || slug(item.title) === key);
  return {title, note, summary: topic?.summary};
}

function noteSummary(examId, id) {
  const path = `/notes/${examId}/${id}.md`;
  if (!summaries.has(path)) {
    const request = fetch(path).then(async response => {
      if (!response.ok) throw new Error('Study note unavailable');
      const markdown = await response.text();
      return markdown.match(/^## (?:Basics first|Concepts in depth)\r?\n([\s\S]*?)(?=^## |(?![\s\S]))/m)?.[1]?.trim() ?? '';
    }).catch(() => {
      summaries.delete(path);
      return '';
    });
    summaries.set(path, request);
  }
  return summaries.get(path);
}

export function renderReviewTopic({title, note, summary}, examId, solution) {
  const route = GROUP2_MAINS[examId]?.route ?? EXAM_CATALOG.find(exam => exam.id === examId)?.route;
  const href = note && route ? `#/${route}?tab=notes&note=${encodeURIComponent(note.id)}` : '';
  const firstStep = solution.steps[0];
  const fallback = summary || solution.approach || solution.reason ||
    (typeof firstStep === 'string' ? firstStep : firstStep?.text);
  return `<section class="review-topic" aria-labelledby="review-topic-heading">
    <h4 id="review-topic-heading">Topic explanation</h4>
    <h5>${h(title)}</h5>
    <div data-review-topic-summary><p>${h(fallback || (href ? 'Loading the topic refresher…' : 'A topic refresher is unavailable for this question.'))}</p></div>
    ${href ? `<a href="${h(href)}">Read detailed notes <span aria-hidden="true">→</span></a>` : ''}
  </section>`;
}

export async function loadReviewTopic(mount, topic, examId) {
  if (!topic.note || topic.summary) return;
  const markdown = await noteSummary(examId, topic.note.id);
  if (!mount.isConnected) return;
  if (markdown) mount.innerHTML = formatNote(markdown);
  else if (mount.textContent === 'Loading the topic refresher…') mount.textContent = 'A topic refresher is unavailable for this question.';
}
