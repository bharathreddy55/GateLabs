import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { CBAT_BATTERIES } from '../src/config/rrbCbat.js';
import { CBAT_NOTES } from '../src/config/rrbCbatNotes.js';
import { appscMains } from './note-content/appsc-mains.mjs';
import { appscPrelims } from './note-content/appsc-prelims.mjs';
import { appscSociety } from './note-content/appsc-society.mjs';
import { aptitude } from './note-content/aptitude.mjs';
import { gateFoundations } from './note-content/gate-foundations.mjs';
import { gateSystems } from './note-content/gate-systems.mjs';
import { railway } from './note-content/railway.mjs';

const catalogs = new URL('../src/config/notes/', import.meta.url);
const notes = new URL('../public/notes/', import.meta.url);
const visuals = new URL('visuals/', notes);
const content = new Map();

// A topic can appear in several exams with different introductions and practice questions.
for (const pack of [appscMains, appscPrelims, appscSociety, aptitude, gateFoundations, gateSystems, railway]) {
  for (const row of pack.trim().split('\n')) {
    const fields = row.split('|').map(field => field.trim());
    const [id, cueText, explanation, application] = fields;
    if (fields.length !== 4 || fields.some(field => !field) || content.has(id)) {
      throw new Error('Invalid or duplicate note content: ' + id);
    }
    content.set(id, { cues: cueText.split(' > '), explanation, application });
  }
}

function escapeXml(value) {
  return value.replace(/[&<>]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[char]));
}

function wrapText(value, capacity) {
  const lines = [];
  let line = '';
  for (const word of value.split(/\s+/)) {
    const candidate = line ? line + ' ' + word : word;
    const width = [...candidate].reduce((total, char) =>
      total + (/[ilI1.,:’' ]/.test(char) ? 0.36 : /[MW@%Ω]/.test(char) ? 0.9 : 0.62), 0);
    if (line && width > capacity) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  lines.push(line);
  return lines;
}

const palette = [
  ['#dce5ff', '#344e93'],
  ['#d4efe6', '#20594e'],
  ['#fde5c5', '#794718'],
  ['#eedff9', '#63437f'],
];

function buildVisual(title, cues) {
  if (cues.length < 3 || cues.length > 4 || cues.some(cue => !cue || cue.split(/\s+/).length > 8)) {
    throw new Error('Expected three or four short recall cues: ' + title);
  }
  const width = 760;
  const margin = 28;
  const gap = 14;
  const titleSize = 42;
  const cueSize = 29;
  const columns = cues.length === 4 ? 2 : 3;
  const cardWidth = (width - 2 * margin - gap * (columns - 1)) / columns;
  const titleLines = wrapText(title, (width - margin * 2) / titleSize);
  const heightOfTitle = titleLines.length * 49;
  const cueLines = cues.map(cue => wrapText(cue, (cardWidth - 36) / cueSize));
  const lineHeight = 34;
  const cardHeight = 38 + Math.max(...cueLines.map(lines => lines.length)) * lineHeight;
  const cardTop = 67 + heightOfTitle;
  const height = cardTop + Math.ceil(cues.length / columns) * (cardHeight + gap) - gap + margin;
  const text = (value, x, y, size, color, centered = false) =>
    '<text x="' + x + '" y="' + y + '" font-size="' + size + '" fill="' + color +
    (centered ? '" text-anchor="middle' : '') + '">' + escapeXml(value) + '</text>';
  const cards = cueLines.map((lines, index) => {
    const x = margin + index % columns * (cardWidth + gap);
    const y = cardTop + Math.floor(index / columns) * (cardHeight + gap);
    const [fill, color] = palette[index];
    const firstBaseline = y + (cardHeight - (lines.length - 1) * lineHeight) / 2 + cueSize / 3;
    return '<rect x="' + x + '" y="' + y + '" width="' + cardWidth + '" height="' + cardHeight +
      '" rx="18" fill="' + fill + '"/>' + lines.map((line, i) =>
        text(line, x + cardWidth / 2, firstBaseline + i * lineHeight, cueSize, color, true)).join('');
  });
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height +
      '" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-labelledby="title description">',
    '<title id="title">' + escapeXml(title) + '</title>',
    '<desc id="description">' + escapeXml(cues.join('. ')) + '</desc>',
    '<rect width="100%" height="100%" rx="24" fill="#fcf8ef"/>',
    '<g font-family="Segoe UI, Arial, sans-serif" font-weight="700">',
    text('QUICK RECALL', margin, 43, 22, '#5a4784'),
    ...titleLines.map((line, i) => text(line, margin, 95 + i * 49, titleSize, '#182342')),
    ...cards,
    '</g>',
    '</svg>',
    '',
  ].join('\n');
}

function expandNote(markdown, { explanation, application }, id) {
  const original = markdown.replaceAll('\r\n', '\n');
  const workedExample = '\n\n## Worked example\n';
  const exampleIndex = original.indexOf(workedExample);
  if (exampleIndex < 0) throw new Error('Missing worked example: ' + id);
  const intro = original.slice(0, exampleIndex).split('\n\n## Concepts in depth\n')[0];
  const sections = ['## Concepts in depth', explanation, '## How to apply it', application];
  return intro + '\n\n' + sections.join('\n\n') + original.slice(exampleIndex);
}

const used = new Set();
let count = 0;
for (const file of readdirSync(catalogs).filter(name => name.endsWith('.json'))) {
  const exam = file.slice(0, -5);
  const entries = JSON.parse(readFileSync(new URL(file, catalogs), 'utf8'));
  const directory = new URL(exam + '/', visuals);
  mkdirSync(directory, { recursive: true });

  for (const { id, title } of entries) {
    const lesson = content.get(id);
    if (!lesson) throw new Error('Missing note content: ' + exam + '/' + id);
    const noteFile = new URL(exam + '/' + id + '.md', notes);
    const svg = buildVisual(title, lesson.cues);
    // Station Master handnotes are maintained directly as Markdown.
    if (exam !== 'rrb') {
      const markdown = expandNote(readFileSync(noteFile, 'utf8'), lesson, id);
      writeFileSync(noteFile, markdown);
    }
    writeFileSync(new URL(id + '.svg', directory), svg);
    used.add(id);
    count++;
  }
}

const unused = [...content.keys()].filter(id => !used.has(id));
if (unused.length) throw new Error('Unlinked note content: ' + unused.join(', '));

const cbat = new URL('rrb-cbat/', visuals);
mkdirSync(cbat, { recursive: true });
for (const { id, title } of CBAT_BATTERIES) {
  writeFileSync(new URL(id + '.svg', cbat), buildVisual(title, CBAT_NOTES[id].recall));
}

console.log('Expanded ' + count + ' notes and generated ' + (count + CBAT_BATTERIES.length) + ' recall cards.');
