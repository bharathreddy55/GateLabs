import {escapeHtml as h} from '../utils/examEngine.js';
import {readStored} from '../utils/safeStorage.js';

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
    </div></div>
    ${notes.length ? `<article class="surface exam-note" data-note-reader hidden>
      <h3 tabindex="-1" data-note-title></h3>
      <label class="exam-note-revised"><input type="checkbox" data-note-revised disabled> Mark this note revised</label>
      <figure class="exam-note-visual" data-note-visual hidden>
        <a target="_blank" rel="noopener">
          <img decoding="async" alt="">
          <span>Open full-size recall card ↗</span>
        </a>
      </figure>
      <p data-note-status role="status"></p>
      <div data-note-content></div>
    </article>
    <div class="surface exam-notes">
      <label for="notes-search-${examId}">Search topics or subjects</label>
      <input type="search" id="notes-search-${examId}" data-notes-search>
      <p hidden data-notes-empty>No topics match your search.</p>
      ${[...sections].map(([section, rows], index) => `<details data-note-section ${index === 0 ? 'open' : ''}>
        <summary>${h(section)} <small>${rows.length} notes</small></summary>
        <div class="exam-notes-list">${rows.map(note => `<button type="button" class="ui-button" data-note-id="${h(note.id)}">${h(note.title)}</button>`).join('')}</div>
      </details>`).join('')}
    </div>` : ''}
  </section>`;
}

export function formatNote(markdown) {
  const inline = text => h(text)
    .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\x60([^\x60\n]+)\x60/g, '<code>$1</code>')
    .replace(/\\\r?\n[ \t]*/g, '<br>');
  return markdown.trim().split(/\r?\n\s*\r?\n/).map(block => {
    if (block.startsWith('**Picture it.** ')) return `<p class="exam-note-picture">${inline(block)}</p>`;
    if (block.startsWith('**When to use it.** ')) return `<p class="exam-note-method-use">${inline(block)}</p>`;
    if (block.startsWith('## ')) return `<h4>${inline(block.slice(3))}</h4>`;
    if (block.startsWith('### ')) return `<h5>${inline(block.slice(4))}</h5>`;
    const lines = block.split(/\r?\n/);
    if (lines.length > 2 && lines.every(line => line.startsWith('| ') && line.endsWith(' |'))
      && /^\|(?: *:?-+:? *\|)+$/.test(lines[1])) {
      const cells = line => line.slice(1, -1).split('|').map(cell => inline(cell.trim()));
      const head = cells(lines[0]).map(cell => `<th scope="col">${cell}</th>`).join('');
      const rows = lines.slice(2).map(line => `<tr>${cells(line).map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
      return `<div class="exam-note-table"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    if (lines.every(line => line.startsWith('- '))) {
      return `<ul>${lines.map(line => `<li>${inline(line.slice(2))}</li>`).join('')}</ul>`;
    }
    if (/^\d+\. /.test(block) && lines.every(line => /^(?:\d+\. | {3})/.test(line))) {
      const steps = block.split(/(?:^|\r?\n)\d+\. /).slice(1);
      return `<ol>${steps.map(step => `<li>${inline(step)}</li>`).join('')}</ol>`;
    }
    return `<p>${inline(block)}</p>`;
  }).join('');
}

export function bindExamNotes(root, examId, notes, selectTab, progressKey, onRevisionChange) {
  if (!notes.length) return;
  const reader = root.querySelector('[data-note-reader]');
  const title = reader.querySelector('[data-note-title]');
  const status = reader.querySelector('[data-note-status]');
  const content = reader.querySelector('[data-note-content]');
  const search = root.querySelector('[data-notes-search]');
  const revisionInput = root.querySelector('[data-note-revised]');
  const visual = reader.querySelector('[data-note-visual]');
  const visualLink = visual.querySelector('a');
  const byId = new Map(notes.map(note => [note.id, note]));
  const progressPanel = root.querySelector('[data-panel="progress"]');
  const summary = document.createElement('section');
  summary.className = 'surface';
  summary.innerHTML = '<h2>Detailed notes revision</h2><p data-note-progress></p>';
  progressPanel.querySelector('.home-stats').after(summary);
  const progressCount = summary.querySelector('[data-note-progress]');
  let activeId;
  let request = 0;

  function syncRevision() {
    const revised = new Set(readStored(progressKey, []).filter(id => byId.has(id)));
    progressCount.textContent = `${revised.size} of ${notes.length} notes revised`;
    revisionInput.checked = revised.has(activeId);
    for (const checkbox of root.querySelectorAll('[data-syllabus-note-revised]')) {
      checkbox.checked = revised.has(checkbox.dataset.syllabusNoteRevised);
    }
  }

  function changeRevision(id, checked) {
    const next = new Set(readStored(progressKey, []).filter(key => byId.has(key)));
    if (checked) next.add(id);
    else next.delete(id);
    try {
      localStorage.setItem(progressKey, JSON.stringify([...next]));
    } catch {
      status.textContent = 'Your device could not save this revision.';
    }
    syncRevision();
    onRevisionChange?.();
  }

  revisionInput.onchange = () => changeRevision(activeId, revisionInput.checked);

  async function open(id, focus = true) {
    const note = byId.get(id);
    if (!note) return;
    const current = ++request;
    activeId = id;
    const url = new URL(location.href);
    url.hash = url.hash.split('?')[0] + '?tab=notes&note=' + encodeURIComponent(id);
    history.replaceState(null, '', url);
    reader.hidden = false;
    revisionInput.disabled = true;
    syncRevision();
    title.textContent = note.title;
    const image = document.createElement('img');
    image.alt = `Visual study guide for ${note.title}`;
    image.decoding = 'async';
    image.onload = () => {
      if (current === request && root.isConnected) visual.hidden = false;
    };
    visual.hidden = true;
    visualLink.href = `/notes/visuals/${examId}/${id}.svg`;
    visualLink.querySelector('img').replaceWith(image);
    image.src = visualLink.href;
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
      revisionInput.disabled = false;
    } catch {
      if (current !== request || !root.isConnected) return;
      status.textContent = 'This note could not load. Select the topic to try again.';
    }
  }

  function makeSyllabusRow(note, abbreviated = false) {
    const row = document.createElement('div');
    row.className = 'syllabus-note-row';
    row.innerHTML = `<button type="button" class="ui-button" data-note-id="${h(note.id)}"
      aria-label="Read notes for ${h(note.title)}">${abbreviated?'Read notes':h(note.title)}</button>
      <label><input type="checkbox" data-syllabus-note-revised="${h(note.id)}"
        aria-label="Mark ${h(note.title)} revised"> Revised</label>`;
    const checkbox = row.querySelector('input');
    checkbox.onchange = () => changeRevision(note.id, checkbox.checked);
    return row;
  }

  if (examId === 'gate') {
    const syllabus = root.querySelector('[data-panel="syllabus"]');
    const officialSyllabus = syllabus.querySelector('.text-link');
    officialSyllabus.href = notes.find(note => note.section === 'Engineering Mathematics').sources[0][1];
    for (const [section, rows] of Map.groupBy(notes, note => note.section)) {
      const details = document.createElement('details');
      details.className = 'surface syllabus-section';
      details.innerHTML = `<summary><span>${h(section)}</span><small>${rows.length} notes</small></summary>`;
      const list = document.createElement('div');
      list.className = 'syllabus-topics';
      for (const note of rows) list.append(makeSyllabusRow(note));
      details.append(list);
      officialSyllabus.before(details);
    }
  }
  for (const checkbox of root.querySelectorAll('[data-topic]')) {
    const matches = notes.filter(note => note.syllabus.includes(checkbox.dataset.topic));
    if (!matches.length) continue;
    const links = document.createElement('div');
    links.className = 'syllabus-note-links';
    for (const note of matches) links.append(makeSyllabusRow(note, matches.length === 1));
    checkbox.closest('label').after(links);
  }
  syncRevision();

  root.querySelectorAll('[data-note-id]').forEach(button => {
    button.onclick = () => {
      selectTab();
      open(button.dataset.noteId);
    };
  });
  const sections = [...root.querySelectorAll('[data-note-section]')];
  let openBeforeSearch;
  search.oninput = () => {
    const query = search.value.trim().toLowerCase();
    if (query && !openBeforeSearch) openBeforeSearch = new Set(sections.filter(section => section.open));
    for (const section of sections) {
      const buttons = [...section.querySelectorAll('[data-note-id]')];
      for (const button of buttons) {
        const note = byId.get(button.dataset.noteId);
        button.hidden = !`${note.title} ${note.section}`.toLowerCase().includes(query);
      }
      section.hidden = buttons.every(button => button.hidden);
      if (query) section.open = !section.hidden;
      else if (openBeforeSearch) section.open = openBeforeSearch.has(section);
    }
    if (!query) openBeforeSearch = undefined;
    root.querySelector('[data-notes-empty]').hidden = sections.some(section => !section.hidden);
  };
  const params = new URLSearchParams(location.hash.split('?')[1]);
  if (params.get('tab') === 'notes') open(params.get('note'), false);
  return syncRevision;
}
