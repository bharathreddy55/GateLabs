import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import {renderQuestionContext} from '../src/components/QuestionView.js';

const rrbContext = table => renderQuestionContext({table}, {examId:'rrb'});

test('Station Master table keeps captions, row labels, column headings and notes together', () => {
  const html = rrbContext('Dispatch results\r\nStation | Scheduled | On time\r\nA | 100 | 86\r\nB | 120 | 96\r\nCounts are for Monday.');
  assert.match(html, /<caption>Dispatch results<\/caption>/);
  assert.match(html, /<th scope="col">Station<\/th><th scope="col" class="exam-table-number">Scheduled<\/th><th scope="col" class="exam-table-number">On time<\/th>/);
  assert.match(html, /<th scope="row">B<\/th>\s*<td class="exam-table-number">120<\/td><td class="exam-table-number">96<\/td>/);
  assert.match(html, /<p class="exam-table-note">Counts are for Monday\.<\/p>/);
});

test('older drill newlines and frequency rows still produce complete tables', () => {
  const drill = rrbContext('Station | Departures | On time\\nA | 120 | 108\\nB | 160 | 136');
  assert.match(drill, /<th scope="row">B<\/th>\s*<td class="exam-table-number">160<\/td><td class="exam-table-number">136<\/td>/);
  const frequency = rrbContext('Ticket counts\nTickets sold per counter: 10 | 20\nNumber of counters: 2 | 3');
  assert.match(frequency, /<th scope="col">Tickets sold per counter<\/th>/);
  assert.match(frequency, /<th scope="row">20<\/th>\s*<td class="exam-table-number">3<\/td>/);
});

test('question data is escaped and prose and other exams keep their existing presentation', () => {
  assert.match(rrbContext('Group | Count\n<img src=x onerror=alert(1)> | 2'), /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(rrbContext('A | B\n1 | 2 | 3'), /<pre>A \| B\n1 \| 2 \| 3<\/pre>/);
  assert.equal(rrbContext('480 trips.'), '<pre>480 trips.</pre>');
  assert.equal(renderQuestionContext({table:'X | Y\n1 | 2'}, {examId:'sbi'}), '<pre>X | Y\n1 | 2</pre>');
});

test('all published Station Master pipe-delimited datasets render as tables', () => {
  let count = 0;
  for (const file of ['rrb.json', 'challenges/rrb.json']) {
    const bank = JSON.parse(readFileSync(new URL('../public/exams/' + file, import.meta.url), 'utf8'));
    for (const {id, table} of bank.flatMap(paper => paper.questions)) {
      if (!table?.includes('|')) continue;
      assert.match(rrbContext(table), /<table\b/, id);
      count++;
    }
  }
  assert.ok(count > 0);
});
