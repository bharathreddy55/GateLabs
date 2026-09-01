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
  lines.push(`year: ${q.year || 2025}`);
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

const pyqConfigs = [
  { fileName: 'sbi_clerk_pyq_2025_sep21_shift1.txt', data: require('./pyq_2025_sep21_shift1.cjs') },
  { fileName: 'sbi_clerk_pyq_2025_sep20_shift2.txt', data: require('./pyq_2025_sep20_shift2.cjs') },
  { fileName: 'sbi_clerk_pyq_2025_sep20_shift1.txt', data: require('./pyq_2025_sep20_shift1.cjs') }
];

console.log('Generating 3 Official SBI Clerk 2025 Memory Based Papers in public/pyqs/ ...');

pyqConfigs.forEach(cfg => {
  const textContent = cfg.data.map(q => formatQuestion(q)).join('\n');
  const filePath = path.join(outDir, cfg.fileName);
  fs.writeFileSync(filePath, textContent, 'utf-8');
  console.log(`Generated ${cfg.fileName} with ${cfg.data.length} questions.`);
});

console.log('All 3 Official SBI Clerk PYQ Papers generated successfully!');
