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

function generateMock(mockNum, levelName, difficulty, specs) {
  const questions = [];
  
  // 1. English Language: Q1 - Q30
  specs.englishRC.forEach((q) => {
    questions.push({
      subject: 'English Language (1-30)',
      topic: 'Reading Comprehension',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.clozeTest.forEach((q) => {
    questions.push({
      subject: 'English Language (1-30)',
      topic: 'Cloze Test',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.errorDetection.forEach((q) => {
    questions.push({
      subject: 'English Language (1-30)',
      topic: 'Error Detection',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.sentenceImprovement.forEach((q) => {
    questions.push({
      subject: 'English Language (1-30)',
      topic: 'Sentence Improvement',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.paraJumbles.forEach((q) => {
    questions.push({
      subject: 'English Language (1-30)',
      topic: 'Para Jumbles',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.miscEnglish.forEach((q) => {
    questions.push({
      subject: 'English Language (1-30)',
      topic: q.topic || 'Word Swap & Fillers',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  // 2. Quantitative Aptitude: Q31 - Q65
  specs.simplification.forEach((q) => {
    questions.push({
      subject: 'Quantitative Aptitude (31-65)',
      topic: 'Simplification & Approximation',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.numberSeries.forEach((q) => {
    questions.push({
      subject: 'Quantitative Aptitude (31-65)',
      topic: q.topic || 'Missing Number Series',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.quadratic.forEach((q) => {
    questions.push({
      subject: 'Quantitative Aptitude (31-65)',
      topic: 'Quadratic Equations',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.dataInterpretation.forEach((q) => {
    questions.push({
      subject: 'Quantitative Aptitude (31-65)',
      topic: 'Data Interpretation',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.arithmetic.forEach((q) => {
    questions.push({
      subject: 'Quantitative Aptitude (31-65)',
      topic: q.topic || 'Arithmetic Word Problems',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  // 3. Reasoning Ability: Q66 - Q100
  specs.puzzleSet1.forEach((q) => {
    questions.push({
      subject: 'Reasoning Ability (66-100)',
      topic: q.topic || 'Puzzles & Seating Arrangement',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.puzzleSet2.forEach((q) => {
    questions.push({
      subject: 'Reasoning Ability (66-100)',
      topic: q.topic || 'Puzzles & Seating Arrangement',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.puzzleSet3.forEach((q) => {
    questions.push({
      subject: 'Reasoning Ability (66-100)',
      topic: q.topic || 'Puzzles & Seating Arrangement',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.syllogism.forEach((q) => {
    questions.push({
      subject: 'Reasoning Ability (66-100)',
      topic: 'Syllogism',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.inequalities.forEach((q) => {
    questions.push({
      subject: 'Reasoning Ability (66-100)',
      topic: 'Inequality',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.bloodAndDirection.forEach((q) => {
    questions.push({
      subject: 'Reasoning Ability (66-100)',
      topic: q.topic || 'Direction & Blood Relation',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  specs.miscReasoning.forEach((q) => {
    questions.push({
      subject: 'Reasoning Ability (66-100)',
      topic: q.topic || 'Alphanumeric Series & Coding',
      difficulty,
      marks: 1,
      year: 2026,
      question: q.q,
      options: q.opts,
      correct: q.ans,
      explanation: q.exp
    });
  });

  return questions;
}

const mockConfigs = [
  { num: 1, name: 'SBI Clerk Mock 1 (Foundation & Starter)', diff: 'Easy', data: require('./mock1_data.cjs') },
  { num: 2, name: 'SBI Clerk Mock 2 (Easy-Moderate Drill)', diff: 'Easy-Moderate', data: require('./mock2_data.cjs') },
  { num: 3, name: 'SBI Clerk Mock 3 (Standard Prelims Exam)', diff: 'Moderate', data: require('./mock3_data.cjs') },
  { num: 4, name: 'SBI Clerk Mock 4 (Moderate-Advanced)', diff: 'Moderate-Hard', data: require('./mock4_data.cjs') },
  { num: 5, name: 'SBI Clerk Mock 5 (Advanced Prelims Speed)', diff: 'Advanced', data: require('./mock5_data.cjs') },
  { num: 6, name: 'SBI Clerk Mock 6 (Mains Gateway / High Diff)', diff: 'Hard', data: require('./mock6_data.cjs') },
  { num: 7, name: 'SBI Clerk Mock 7 (Ultimate Pro Challenge)', diff: 'Hard', data: require('./mock7_data.cjs') },
];

console.log('Generating 7 SBI Clerk Mock Test Files...');

mockConfigs.forEach(cfg => {
  const qs = generateMock(cfg.num, cfg.name, cfg.diff, cfg.data);
  const textContent = qs.map(q => formatQuestion(q)).join('\n');
  const fileName = `sbi_clerk_mock_${cfg.num}.txt`;
  const filePath = path.join(outDir, fileName);
  fs.writeFileSync(filePath, textContent, 'utf-8');
  console.log(`Generated ${fileName} with ${qs.length} questions.`);
});

console.log('All 7 SBI Clerk Mock Tests generated successfully!');
