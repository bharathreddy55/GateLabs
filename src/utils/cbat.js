import { CBAT_BATTERIES } from '../config/rrbCbat.js';

function shuffle(items, random) {
  const order = [...items];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function choices(correct, distractors, random) {
  const options = shuffle([...distractors, correct], random);
  return { options, correct: options.indexOf(correct) };
}

const figures = [
  [0, 1, 4, 8, 9, 10], [0, 1, 2, 4, 5, 8], [0, 1, 2, 5, 9, 10],
  [0, 4, 5, 6, 9, 13], [1, 4, 5, 6, 10, 11], [1, 2, 5, 8, 9, 13],
  [0, 4, 8, 9, 10, 14], [2, 5, 6, 9, 10, 13], [0, 1, 5, 6, 7, 11],
  [0, 1, 5, 8, 9, 10], [1, 2, 5, 6, 10, 11], [1, 2, 5, 6, 7, 9]
];

export function rotateFigure(cells) {
  return cells.map(cell => (cell % 4) * 4 + 3 - Math.floor(cell / 4));
}

function signature(figure) {
  const top = Math.min(...figure.map(cell => Math.floor(cell / 4)));
  const left = Math.min(...figure.map(cell => cell % 4));
  return figure.map(cell => cell - 4 * top - left).sort((a,b) => a-b).join(',');
}

function intelligence(figure, random) {
  const rotations = [figure];
  for (let i = 1; i < 4; i++) rotations.push(rotateFigure(rotations[i - 1]));
  const signatures = rotations.map(signature);
  const variants = [];
  for (const removed of figure) {
    for (let added = 0; added < 16; added++) {
      if (figure.includes(added)) continue;
      const changed = [...figure.filter(cell => cell !== removed), added];
      if (!signatures.includes(signature(changed))) variants.push(changed);
    }
  }
  const intruder = shuffle(variants, random)[0];
  return { prompt:'Which figure is the odd one out?', ...choices(intruder, rotations, random),
    explanation:'The other four figures share the same arrangement after rotation.' };
}

function attention(random) {
  const digits = shuffle([
    ...Array.from({length:32}, () => [2,4,6,8][Math.floor(random()*4)]),
    ...Array.from({length:18}, () => [1,3,5,7,9][Math.floor(random()*5)])
  ], random);
  const total = digits.reduce((sum, digit) => sum + (digit % 2 ? digit : 0), 0);
  return { prompt:'What is the sum of the odd digits?', digits, ...choices(total, [total-4,total-2,total+1,total+3], random),
    explanation:`The 18 odd digits add to ${total}.` };
}

const size = 5;
const cells = Array.from({length:size*size}, (_,i) => i);
function neighbours(cell) {
  const row = Math.floor(cell / size);
  const column = cell % size;
  return cells.filter(other => Math.abs(Math.floor(other/size)-row) + Math.abs(other%size-column) === 1);
}

function spatial(random) {
  const start = shuffle(cells, random)[0];
  const parents = new Map([[start,null]]);
  const edges = [];
  function visit(node) {
    for (const next of shuffle(neighbours(node), random)) {
      if (parents.has(next)) continue;
      parents.set(next, node);
      edges.push([node,next]);
      visit(next);
    }
  }
  visit(start);
  const route = [];
  const length = shuffle([9,10,11,12,13,14,15,16],random)[0];
  for (let node = [...parents.keys()].at(-1); node !== null; node = parents.get(node)) route.unshift(node);
  // A randomised depth-first tree can end in a short branch. Find a longer route
  // from the root to keep both the path and the off-path distractors substantial.
  for (const leaf of parents.keys()) {
    if (route.length >= length) break;
    const candidate = [];
    for (let node = leaf; node !== null; node = parents.get(node)) candidate.unshift(node);
    if (candidate.length > route.length) route.splice(0,route.length,...candidate);
  }
  route.splice(length);
  const end = route.at(-1);
  const chosenHouse = shuffle(route.slice(1,-1), random)[0];
  const houseCells = shuffle([chosenHouse,...shuffle(cells.filter(node => !route.includes(node)), random).slice(0,4)],random);
  const correct = houseCells.indexOf(chosenHouse);
  return { prompt:'Which house is on the shortest route from A to B?', map:{size,start,end,edges,houseCells}, options:[1,2,3,4,5], correct,
    explanation:`The route takes ${route.length-1} streets and passes house ${correct+1}.` };
}

function ordering(random, index) {
  const [a,b,c,d,e,f] = shuffle(['K','M','P','R','T','V'],random);
  const sequence = [a,b,c,d,e,f];
  const variants = [
    { rules:[`${b} follows ${a} immediately.`,`${d} follows ${c} immediately.`,`${b} comes before ${c}.`,`${d} comes before ${e}.`,`${f} is last.`],
      reason:`Keep ${a}–${b} and ${c}–${d} together in that order. Then put ${e} before the final ${f}.` },
    { rules:[`${c} is third.`,`Exactly two tasks separate ${b} and ${e}, with ${e} later.`,`${d} follows ${c} immediately.`,`${a} comes before ${b}.`,`${f} is last.`],
      reason:`${c} and ${d} occupy third and fourth. Only slots two and five leave two intervening tasks for ${b} and ${e}. The ends are ${a} and ${f}.` },
    { rules:[`${a} is first.`,`${e} comes immediately before ${f}.`,`${c} comes two places before ${e}.`,`${d} comes before ${e} and after ${c}.`,`${b} comes before ${c}.`],
      reason:`${b} must fit after ${a} and before the four consecutive tasks ${c}, ${d}, ${e}, ${f}.` }
  ];
  const {rules,reason} = variants[index%variants.length];
  const distractors = shuffle([[0,1],[1,2],[2,3],[3,4],[4,5],[1,4],[0,5]],random).slice(0,4).map(([i,j])=>{
    const alternative = [...sequence];
    [alternative[i],alternative[j]] = [alternative[j],alternative[i]];
    return alternative.join(' → ');
  });
  return { prompt:'Which sequence satisfies all five rules?',
    rules, ...choices(sequence.join(' → '),distractors,random), explanation:reason };
}

const preferences = [
  ['an outline before I begin','to develop a plan as I go'],
  ['to discuss a new idea aloud','to think through a new idea privately'],
  ['a regular routine','variety from day to day'],
  ['written instructions','a live demonstration'],
  ['to start with the main idea','to start with specific details'],
  ['to finish one task at a time','to alternate between tasks'],
  ['to work independently','to work alongside other people'],
  ['to explore several approaches','to settle on one approach quickly']
];

export function buildCbatQuestions(id, random = Math.random) {
  const battery = CBAT_BATTERIES.find(item => item.id === id);
  if (!battery) return [];
  const orderedFigures = id === 'intelligence' ? shuffle(figures, random) : [];
  return Array.from({length:battery.count}, (_,i) => {
    if (id === 'intelligence') return intelligence(orderedFigures[i],random);
    if (id === 'attention') return attention(random);
    if (id === 'spatial') return spatial(random);
    if (id === 'ordering') return ordering(random,i);
    const [first,last] = preferences[i];
    return { prompt:'I generally prefer…', options:[first,'Either suits me',last] };
  });
}

export function cbatSummary(questions, answers) {
  const attempted = answers.filter(answer => Number.isInteger(answer)).length;
  const correct = questions.every(q => q.correct === undefined)
    ? null
    : questions.filter((q,i) => answers[i] === q.correct).length;
  return { attempted, correct, total:questions.length };
}

export function validCbatResult(id, result) {
  const battery = CBAT_BATTERIES.find(item=>item.id===id);
  return !!battery && result?.total === battery.count &&
    Object.keys(result).length===3 &&
    Number.isInteger(result.attempted) && result.attempted >= 0 && result.attempted <= result.total &&
    (battery.seconds
      ? Number.isInteger(result.correct) && result.correct >= 0 && result.correct <= result.attempted
      : result.correct === null);
}
