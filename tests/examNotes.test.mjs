import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {test} from 'node:test';
import {EXAMS} from '../src/config/exams.js';

const catalogs = new URL('../src/config/notes/', import.meta.url);

for (const file of readdirSync(catalogs).filter(name => name.endsWith('.json'))) {
  const exam = file.slice(0, -5);
  const notes = JSON.parse(readFileSync(new URL(file, catalogs), 'utf8'));
  const folder = new URL(`../public/notes/${exam}/`, import.meta.url);

  test(`${exam} notes have unique keys, readable content and Notion links`, () => {
    assert.ok(EXAMS[exam]);
    assert.equal(new Set(notes.map(note => note.id)).size, notes.length);
    assert.equal(new Set(notes.map(note => note.notion)).size, notes.length);
    assert.deepEqual(readdirSync(folder).sort(), notes.map(note => note.id + '.md').sort());
    for (const note of notes) {
      assert.match(note.id, /^[a-z\d]+(?:-[a-z\d]+)*$/);
      assert.equal(new URL(note.notion).hostname, 'app.notion.com');
      assert.ok(note.sources.length);
      for (const [, source] of note.sources) assert.equal(new URL(source).protocol, 'https:');
      const body = readFileSync(new URL(note.id + '.md', folder), 'utf8');
      assert.match(body, /^## Worked example$/m);
      assert.match(body, /^## Practice$/m);
      assert.match(body, /\*\*Answer:\*\*/);
    }
  });

  if (exam === 'group2') {
    for (const sectionIndex of [0, 1]) {
      const [section, , topics] = EXAMS.group2.sections[sectionIndex];
      test(`APPSC ${section} notes cover all current checklist entries`, () => {
        const covered = new Set(notes.filter(note => note.section === section)
          .flatMap(note => note.syllabus));
        assert.deepEqual(covered, new Set(topics.split(';').map((_, index) => `${sectionIndex}-${index}`)));
      });
    }
  }
}
