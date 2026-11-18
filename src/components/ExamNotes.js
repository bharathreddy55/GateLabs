import {escapeHtml as h} from '../utils/examEngine.js';

const catalogs = import.meta.glob('../config/notes/*.json', {eager:true, import:'default'});

export function examNotes(examId) {
  return catalogs[`../config/notes/${examId}.json`] || [];
}

export function notesPanel(examId, active, notes) {
  const sections = Map.groupBy(notes, note => note.section);
  return `<section class="prep-panel" ${active?'':'hidden'} role="tabpanel"
      id="panel-${examId}-notes" aria-labelledby="tab-${examId}-notes" data-panel="notes">
    <div class="section-heading"><div><h2>Detailed notes</h2>
      <p>${notes.length ? `${notes.length} published notes` : 'Notes are being prepared for this exam.'}</p>
      ${examId === 'sbi' && notes.length ? '<p>Preparation topics based on the SBI handout and GateLabs practice papers.</p>' : ''}
      ${examId === 'tet' && notes.length ? '<p>Topics drawn from the 2026 bulletin and the October 2025 detailed syllabus.</p>' : ''}
    </div></div>
    ${notes.length ? `<div class="surface exam-notes">
      <label for="notes-search-${examId}">Search topics or subjects</label>
      <input type="search" id="notes-search-${examId}" data-notes-search>
      <p hidden data-notes-empty>No topics match your search.</p>
      ${[...sections].map(([section, rows]) => `<section data-note-section>
        <h3>${h(section)}</h3>
        ${rows.map(note => `<button type="button" class="ui-button" data-note-id="${h(note.id)}">${h(note.title)}</button>`).join('')}
      </section>`).join('')}
    </div>
    <article class="surface exam-note" data-note-reader hidden>
      <h3 tabindex="-1" data-note-title></h3>
      <p data-note-status role="status"></p>
      <div data-note-content></div>
    </article>` : ''}
  </section>`;
}

function formatNote(markdown) {
  const inline = text => h(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return markdown.trim().split(/\r?\n\s*\r?\n/).map(block => {
    if (block.startsWith('## ')) return `<h4>${inline(block.slice(3))}</h4>`;
    if (block.startsWith('- ')) return `<ul>${block.split(/\r?\n/).map(line => `<li>${inline(line.slice(2))}</li>`).join('')}</ul>`;
    return `<p>${inline(block)}</p>`;
  }).join('');
}

export function bindExamNotes(root, examId, notes, selectTab) {
  if (!notes.length) return;
  const reader = root.querySelector('[data-note-reader]');
  const title = reader.querySelector('[data-note-title]');
  const status = reader.querySelector('[data-note-status]');
  const content = reader.querySelector('[data-note-content]');
  const search = root.querySelector('[data-notes-search]');
  const byId = new Map(notes.map(note => [note.id, note]));
  let request = 0;

  async function open(id, focus = true) {
    const note = byId.get(id);
    if (!note) return;
    const current = ++request;
    const url = new URL(location.href);
    url.hash = url.hash.split('?')[0] + '?tab=notes&note=' + encodeURIComponent(id);
    history.replaceState(null, '', url);
    reader.hidden = false;
    title.textContent = note.title;
    content.replaceChildren();
    status.textContent = 'Loading notes…';
    if (focus) {
      title.focus();
      reader.scrollIntoView({block:'start'});
    }
    try {
      const response = await fetch(`/notes/${examId}/${id}.md`);
      if (!response.ok) throw new Error('Note unavailable');
      const markdown = await response.text();
      if (current !== request || !root.isConnected) return;
      content.innerHTML = formatNote(markdown) + `<h4>Sources</h4><ul>
        ${note.sources.map(([label, link]) => `<li><a href="${h(link)}" target="_blank" rel="noopener">${h(label)}</a></li>`).join('')}
        </ul><a class="ui-button" href="${h(note.notion)}" target="_blank" rel="noopener">Open in Notion ↗</a>`;
      status.textContent = '';
    } catch {
      if (current !== request || !root.isConnected) return;
      status.textContent = 'This note could not load. Select the topic to try again.';
    }
  }

  for (const checkbox of root.querySelectorAll('[data-topic]')) {
    const matches = notes.filter(note => note.syllabus.includes(checkbox.dataset.topic));
    if (!matches.length) continue;
    const links = document.createElement('div');
    links.className = 'syllabus-note-links';
    for (const note of matches) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ui-button';
      button.dataset.noteId = note.id;
      button.textContent = matches.length === 1 ? 'Read notes' : `Read notes · ${note.title}`;
      button.setAttribute('aria-label', `Read notes for ${note.title}`);
      links.append(button);
    }
    checkbox.closest('label').after(links);
  }

  root.querySelectorAll('[data-note-id]').forEach(button => {
    button.onclick = () => {
      selectTab();
      open(button.dataset.noteId);
    };
  });
  const sections = [...root.querySelectorAll('[data-note-section]')];
  search.oninput = () => {
    const query = search.value.trim().toLowerCase();
    for (const section of sections) {
      const buttons = [...section.querySelectorAll('[data-note-id]')];
      for (const button of buttons) {
        const note = byId.get(button.dataset.noteId);
        button.hidden = !`${note.title} ${note.section}`.toLowerCase().includes(query);
      }
      section.hidden = buttons.every(button => button.hidden);
    }
    root.querySelector('[data-notes-empty]').hidden = sections.some(section => !section.hidden);
  };
  const params = new URLSearchParams(location.hash.split('?')[1]);
  if (params.get('tab') === 'notes') open(params.get('note'), false);
}
