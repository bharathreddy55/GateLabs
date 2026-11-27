import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {test} from 'node:test';
import katex from 'katex';
import {EXAMS} from '../src/config/exams.js';
import {CBAT_BATTERIES} from '../src/config/rrbCbat.js';
import {CBAT_NOTES} from '../src/config/rrbCbatNotes.js';
import {stationMasterRevision} from '../scripts/note-content/station-master-revision.mjs';
import {buildStationMasterRevision} from '../scripts/render-revision-card.mjs';
import {stationMasterFormulaDeck} from '../src/config/formulas/stationMaster.js';

const catalogs = new URL('../src/config/notes/', import.meta.url);

test('Station Master formula cards cover each detailed topic and use valid equations', () => {
  const notes = JSON.parse(readFileSync(new URL('rrb.json', catalogs)));
  const cards = Object.values(stationMasterFormulaDeck).flat();
  const ids = new Set(cards.map(card => card.id));
  const noteIds = new Set(notes.map(note => note.id));
  assert.equal(ids.size, cards.length);
  for (const id of noteIds) assert.ok(ids.has(id), id);
  for (const card of cards) {
    assert.ok(card.title && card.rule && card.trap && card.example.length >= 2, card.id);
    assert.ok(card.math || card.expression, card.id);
    if (card.math) katex.renderToString(card.math, {throwOnError:true, strict:'error'});
    if (card.noteId) assert.ok(noteIds.has(card.noteId), card.id);
  }
});

function checkRecallCard(svg, details, id) {
  assert.match(svg, /<svg .*viewBox=/, id);
  assert.match(svg, />QUICK RECALL<\/text>/, id);
  const cues = svg.match(/<desc id="description">(.+)<\/desc>/)?.[1].split('. ');
  assert.ok(cues?.length >= 3 && cues.length <= 4, id);
  assert.ok(cues.every(cue => cue.split(/\s+/).length <= 8), id);
  for (const paragraph of details) assert.ok(!svg.includes(paragraph), id);
}

function checkRevisionCard(svg, details, {id, title}, stage) {
  const card = stationMasterRevision.get(id);
  assert.ok(card, id);
  assert.equal(svg.replaceAll('\r\n', '\n'), buildStationMasterRevision(title, id, card, stage), id);
  for (const heading of ['KEY RULE', 'QUICK EXAMPLE', 'WATCH FOR']) {
    assert.ok(svg.includes('>' + heading + '</text>'), id);
  }
  const description = svg.match(/<desc id="description">(.+)<\/desc>/)?.[1];
  assert.ok(description?.split(/\s+/).length <= 66, id);
  for (const paragraph of details) assert.ok(!description.includes(paragraph), id);
}

function checkHandnote(body, id) {
  const moreProblems = body.includes('\n## More worked problems\n');
  assert.deepEqual([...body.matchAll(/^## (.+)$/gm)].map(match => match[1]), [
    'Basics first',
    'Methods and when to use them',
    ...(moreProblems ? ['More worked problems'] : []),
    'Quick revision sheet',
    'Exam tips'
  ], id);
  const [concept, methods, ...afterMethods] = body.split(/^## .+\n\n/gm).slice(1);
  const [recap, tips] = afterMethods.slice(-2);
  const models = moreProblems ? afterMethods[0].split(/^### .+\n\n/gm).slice(1) : [];
  assert.ok((concept.match(/^- /gm) || []).length >= 4, id);
  const methodBlocks = methods.trim().split(/\n\n(?=### )/);
  assert.ok(methodBlocks.length >= 3, id);
  const cues = new Set();
  for (const method of methodBlocks) {
    const [overview, ...types] = method.split(/\n\n(?=#### )/);
    const [heading, ...paragraphs] = overview.split('\n\n');
    const rule = paragraphs.pop();
    const cue = paragraphs.pop();
    assert.match(heading, /^### .+$/, id);
    assert.ok(paragraphs.length && paragraphs.every(paragraph => !paragraph.includes('**When to use it.**')), id);
    assert.match(cue, /^\*\*When to use it\.\*\* Use this in \*\*[^*]+\*\* questions when .+\.$/, heading);
    assert.match(rule, /^\*\*Key rule\.\*\* .+$/, heading);
    assert.ok(!cues.has(cue), heading);
    cues.add(cue);
    assert.ok(types.length, heading);
    for (const [index, type] of types.entries()) {
      const titleEnd = type.indexOf('\n\n');
      assert.ok(titleEnd > 0 && type.startsWith(`#### Type ${index+1} · `), heading);
      models.push(type.slice(titleEnd+2));
    }
  }
  assert.ok(recap.trim().split('\n').length >= 6, id);
  assert.match(recap, /^\| When you see \| Use this rule \|\n\| --- \| --- \|$/m, id);
  assert.ok((tips.match(/^- /gm) || []).length >= 3, id);
  assert.ok(models.length >= 4, id);
  for (const model of models) {
    const [question, picture, steps, answer] = model.trim().split('\n\n')
      .filter(block => !block.startsWith('**Formula.** '));
    assert.match(question, /^\*\*Question\.\*\* .+$/, id);
    assert.match(picture, /^\*\*Picture it\.\*\* .+$/, id);
    const lines = steps.replace(/\\\n {3}\x60[^\x60\n]+\x60/g, '').split('\n');
    assert.ok(lines.length >= 3, id);
    for (const [index, line] of lines.entries()) {
      assert.match(line, /^\d+\. \*\*[^*]+\.\*\* .+$/, id);
      assert.ok(line.startsWith(`${index + 1}. `), id);
    }
    assert.match(answer, /^\*\*Answer:\*\* .+$/, id);
  }
  return [...concept.trim().split('\n'), ...models.map(model => model.split('\n')[0])];
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
      const body = readFileSync(new URL(note.id + '.md', folder), 'utf8').replaceAll('\r\n', '\n');
      const svg = readFileSync(new URL(note.id + '.svg', visuals), 'utf8');
      if (exam === 'rrb') {
        checkRevisionCard(svg, checkHandnote(body, note.id), note, 'CBT');
        if (note.section === 'Basic Science and Mathematics' || (note.section === 'Data Analysis' && note.id !== 'data-arrangement')) {
          assert.match(body, /\\\n {3}\x60[^\x60\n]+\x60/, note.id);
        }
        continue;
      }
      assert.match(body, /^## Worked example$/m);
      assert.match(body, /^## Practice$/m);
      assert.match(body, /\*\*Answer:\*\*/);
      const explanation = body.match(/\n## Concepts in depth\n\n([^\n]+)/)?.[1];
      const application = body.match(/\n## How to apply it\n\n([^\n]+)/)?.[1];
      assert.ok(explanation?.split(/\s+/).length >= 28, note.id);
      assert.ok(application?.split(/\s+/).length >= 26, note.id);
      assert.ok(body.trim().split(/\s+/).length >= 150, note.id);
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
  for (const { id, title } of CBAT_BATTERIES) {
    const note = CBAT_NOTES[id];
    assert.ok(note.basics.length >= 4 && note.review.length >= 4 && note.drill, id);
    assert.ok(note.details.every(paragraph => paragraph.split(/\s+/).length >= 45), id);
    assert.ok(note.rules.length >= 3 && note.method.length >= 3, id);
    assert.ok(note.methodUse.type && note.methodUse.when.startsWith('when ') && note.methodUse.rule, id);
    assert.ok(note.exampleTitle && note.prompt && note.examplePicture && note.solution, id);
    assert.ok(note.models.length >= 2, id);
    for (const steps of [note.exampleSteps, ...note.models.map(model => model.steps)]) {
      assert.ok(steps.length >= 3, id);
      for (const [label, explanation, calculation] of steps) {
        assert.ok(label && explanation, id);
        if (id !== 'personality') assert.ok(calculation, id);
      }
    }
    for (const { title, prompt, picture, answer } of note.models) {
      assert.ok(title && prompt && picture, id);
      assert.equal(Boolean(answer), id !== 'personality', id);
    }
    const svg = readFileSync(new URL(id + '.svg', visuals), 'utf8');
    checkRevisionCard(svg, note.details, {id, title}, 'CBAT');
  }
});
