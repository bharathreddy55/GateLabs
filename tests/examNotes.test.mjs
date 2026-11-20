import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {test} from 'node:test';
import {EXAMS} from '../src/config/exams.js';
import {CBAT_BATTERIES} from '../src/config/rrbCbat.js';
import {CBAT_NOTES} from '../src/config/rrbCbatNotes.js';

const catalogs = new URL('../src/config/notes/', import.meta.url);

function checkRecallCard(svg, details, id) {
  assert.match(svg, /<svg .*viewBox=/, id);
  assert.match(svg, />QUICK RECALL<\/text>/, id);
  const cues = svg.match(/<desc id="description">(.+)<\/desc>/)?.[1].split('. ');
  assert.ok(cues?.length >= 3 && cues.length <= 4, id);
  assert.ok(cues.every(cue => cue.split(/\s+/).length <= 8), id);
  for (const paragraph of details) assert.ok(!svg.includes(paragraph), id);
}

for (const file of readdirSync(catalogs).filter(name => name.endsWith('.json'))) {
  const exam = file.slice(0, -5);
  const notes = JSON.parse(readFileSync(new URL(file, catalogs), 'utf8'));
  const folder = new URL(`../public/notes/${exam}/`, import.meta.url);
  const visuals = new URL(`../public/notes/visuals/${exam}/`, import.meta.url);

  test(`${exam} notes have unique keys, readable content and Notion links`, () => {
    assert.ok(EXAMS[exam]);
    assert.equal(new Set(notes.map(note => note.id)).size, notes.length);
    assert.equal(new Set(notes.map(note => note.notion)).size, notes.length);
    assert.deepEqual(readdirSync(folder).sort(), notes.map(note => note.id + '.md').sort());
    assert.deepEqual(readdirSync(visuals).sort(), notes.map(note => note.id + '.svg').sort());
    for (const note of notes) {
      assert.match(note.id, /^[a-z\d]+(?:-[a-z\d]+)*$/);
      assert.equal(new URL(note.notion).hostname, 'app.notion.com');
      assert.ok(note.sources.length);
      for (const [, source] of note.sources) assert.equal(new URL(source).protocol, 'https:');
      const body = readFileSync(new URL(note.id + '.md', folder), 'utf8');
      assert.match(body, /^## Worked example$/m);
      assert.match(body, /^## Practice$/m);
      assert.match(body, /\*\*Answer:\*\*/);
      const explanation = body.match(/\n## Concepts in depth\n\n([^\n]+)/)?.[1];
      const application = body.match(/\n## How to apply it\n\n([^\n]+)/)?.[1];
      assert.ok(explanation?.split(/\s+/).length >= 28, note.id);
      assert.ok(application?.split(/\s+/).length >= 26, note.id);
      assert.ok(body.trim().split(/\s+/).length >= 150, note.id);
      const svg = readFileSync(new URL(note.id + '.svg', visuals), 'utf8');
      checkRecallCard(svg, [explanation, application], note.id);
    }
  });

  if (['group2', 'rrb'].includes(exam) || exam.startsWith('group2-mains-')) {
    for (const [sectionIndex, [section, , topics]] of EXAMS[exam].sections.entries()) {
      test(`${exam} ${section} notes cover all current checklist entries`, () => {
        const covered = new Set(notes.filter(note => note.section === section)
          .flatMap(note => note.syllabus));
        assert.deepEqual(covered, new Set(topics.split(';').map((_, index) => `${sectionIndex}-${index}`)));
      });
    }
  }
}

test('all CBAT batteries have detailed lessons and brief recall cards', () => {
  const visuals = new URL('../public/notes/visuals/rrb-cbat/', import.meta.url);
  assert.deepEqual(readdirSync(visuals).sort(), CBAT_BATTERIES.map(({ id }) => id + '.svg').sort());
  for (const { id } of CBAT_BATTERIES) {
    const note = CBAT_NOTES[id];
    assert.ok(note.details.every(paragraph => paragraph.split(/\s+/).length >= 45), id);
    const svg = readFileSync(new URL(id + '.svg', visuals), 'utf8');
    checkRecallCard(svg, note.details, id);
  }
});
