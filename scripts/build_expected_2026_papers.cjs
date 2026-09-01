const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'pyqs');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function formatQuestion(q) {
  let lines = [];
  lines.push(`subject: ${q.subject}`);
  lines.push(`topic: ${q.topic}`);
  lines.push(`difficulty: ${q.difficulty}`);
  lines.push(`marks: ${q.marks || 1}`);
  lines.push(`year: ${q.year || 2026}`);
  lines.push(`question: ${q.question}`);
  lines.push(`option a: ${q.options[0]}`);
  lines.push(`option b: ${q.options[1]}`);
  lines.push(`option c: ${q.options[2]}`);
  lines.push(`option d: ${q.options[3]}`);
  if (q.options[4]) {
    lines.push(`option e: ${q.options[4]}`);
  }
  lines.push(`correct: ${q.correct}`);
  lines.push(`explanation: ${q.explanation}`);
  lines.push(`---`);
  return lines.join('\n');
}

const papers = [
  { fileName: 'sbi_clerk_expected_2026_paper_1.txt', data: require('./expected_2026_paper1.cjs') },
  { fileName: 'sbi_clerk_expected_2026_paper_2.txt', data: require('./expected_2026_paper2.cjs') },
  { fileName: 'sbi_clerk_expected_2026_paper_3.txt', data: require('./expected_2026_paper3.cjs') },
  { fileName: 'sbi_clerk_expected_2026_paper_4.txt', data: require('./expected_2026_paper4.cjs') },
  { fileName: 'sbi_clerk_expected_2026_paper_5.txt', data: require('./expected_2026_paper5.cjs') },
  { fileName: 'sbi_clerk_expected_2026_paper_6.txt', data: require('./expected_2026_paper6.cjs') },
  { fileName: 'sbi_clerk_expected_2026_paper_7.txt', data: require('./expected_2026_paper7.cjs') },
  { fileName: 'sbi_clerk_expected_2026_paper_8.txt', data: require('./expected_2026_paper8.cjs') }
];

console.log('Generating 8 Full-Length Expected 2026 SBI Clerk Question Papers (800 Qs)...');

papers.forEach((p, idx) => {
  const textContent = p.data.map(q => formatQuestion(q)).join('\n');
  const filePath = path.join(outDir, p.fileName);
  fs.writeFileSync(filePath, textContent, 'utf-8');
  console.log(`[Paper ${idx + 1}] Generated ${p.fileName} with ${p.data.length} questions.`);
});

console.log('All 8 Expected 2026 Question Papers generated successfully!');
