import { CBAT_BATTERIES, CBAT_PRACTICE_SETS } from '../config/rrbCbat.js';

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
  const answer = choices(intruder, rotations, random);
  const matching = answer.options.map((option,i)=>signatures.includes(signature(option)) ? String.fromCharCode(65+i) : null).filter(Boolean);
  return { prompt:'Which figure is the odd one out?', ...answer, solution:{
    approach:'Compare the pattern of filled cells after quarter-turns. Ignore where the pattern sits inside the grid.',
    steps:[
      `Use choice ${matching[0]} as a reference. Rotate it through 0°, 90°, 180° and 270°.`,
      `Slide each rotated pattern up and left to its first occupied row and column. The resulting patterns match choices ${matching.join(', ')}.`,
      `Choice ${String.fromCharCode(65+answer.correct)} cannot be made from any of those quarter-turns, so it is the odd figure.`
    ],
    tip:'Match both the filled cells and the gaps. The number of filled cells alone does not distinguish these figures.'
  }};
}

function attention(random) {
  const digits = shuffle([
    ...Array.from({length:32}, () => [2,4,6,8][Math.floor(random()*4)]),
    ...Array.from({length:18}, () => [1,3,5,7,9][Math.floor(random()*5)])
  ], random);
  const total = digits.reduce((sum, digit) => sum + (digit % 2 ? digit : 0), 0);
  const chunks = Array.from({length:5},(_,i)=>digits.slice(i*10,i*10+10).filter(digit=>digit%2));
  const sums = chunks.map(chunk=>chunk.reduce((sum,digit)=>sum+digit,0));
  return { prompt:'What is the sum of the odd digits?', digits, ...choices(total, [total-4,total-2,total+1,total+3], random),
    solution:{
      approach:'Scan in five blocks of ten digits. Keep 1, 3, 5, 7 and 9 and add their values within each block.',
      steps:[
        ...chunks.map((chunk,i)=>`Digits ${i*10+1}–${i*10+10} contribute ${chunk.length ? chunk.join(' + ') : 'no odd digits'} = ${sums[i]}.`),
        `Add the block totals: ${sums.join(' + ')} = ${total}.`
      ],
      tip:'Counting the odd digits would give 18. The question asks for their sum.'
    }};
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
  const directions = route.slice(1).map((cell,i)=>({[size]:'down',[-size]:'up',1:'right',[-1]:'left'})[cell-route[i]]);
  const via = route.indexOf(chosenHouse);
  return { prompt:'Which house is on the shortest route from A to B?', map:{size,start,end,edges,houseCells}, options:[1,2,3,4,5], correct, solutionRoute:route,
    solution:{
      approach:'Trace connected streets from A to B. A branch that ends before reaching B only adds a detour.',
      steps:[
        `From A follow: ${directions.slice(0,via).join(' → ')}. This reaches house ${correct+1} after ${via} street segments.`,
        `Continue ${directions.slice(via).join(' → ')} to reach B.`,
        `The map has one connected route between A and B. It uses ${route.length-1} segments and passes house ${correct+1}.`
      ],
      tip:'An adjacent cell is reachable only when a street connects it to your current cell.'
    }};
}

function ordering(random, index) {
  const [a,b,c,d,e,f] = shuffle(['K','M','P','R','T','V'],random);
  const sequence = [a,b,c,d,e,f];
  const variants = [
    { rules:[`${b} follows ${a} immediately.`,`${d} follows ${c} immediately.`,`${b} comes before ${c}.`,`${d} comes before ${e}.`,`${f} is last.`],
      steps:[`Join ${a} → ${b} and ${c} → ${d} into two blocks because both pairs are immediate.`,`${b} comes before ${c}, so the first block must lead the second.`,`${e} follows ${d}, and ${f} goes in the last slot.`] },
    { rules:[`${c} is third.`,`Exactly two tasks separate ${b} and ${e}, with ${e} later.`,`${d} follows ${c} immediately.`,`${a} comes before ${b}.`,`${f} is last.`],
      steps:[`Place ${c} third, ${d} fourth and ${f} sixth.`,`The available slots are 1, 2 and 5. A gap of exactly two intervening tasks needs a difference of three positions, so ${b} is second and ${e} fifth.`,`Place ${a} first to satisfy the remaining rule that it comes before ${b}.`] },
    { rules:[`${a} is first.`,`${e} comes immediately before ${f}.`,`${c} comes two places before ${e}.`,`${d} comes before ${e} and after ${c}.`,`${b} comes before ${c}.`],
      steps:[`Place ${a} first and join ${e} → ${f} into a block.`,`${c} is two places before ${e} and ${d} fits in between, so ${c} → ${d} → ${e} → ${f} is one continuous block.`,`${b} goes before ${c}. With ${a} first, that puts ${b} second and the four-task block in positions 3–6.`] }
  ];
  const {rules,steps} = variants[index%variants.length];
  const distractors = shuffle([[0,1],[1,2],[2,3],[3,4],[4,5],[1,4],[0,5]],random).slice(0,4).map(([i,j])=>{
    const alternative = [...sequence];
    [alternative[i],alternative[j]] = [alternative[j],alternative[i]];
    return alternative.join(' → ');
  });
  return { prompt:'Which sequence satisfies all five rules?',
    rules, ...choices(sequence.join(' → '),distractors,random), solution:{
      approach:'Place fixed positions first, then combine adjacent tasks into blocks.',
      steps:[...steps,`The resulting sequence is ${sequence.join(' → ')}.`]
    } };
}

const preferences = [[
  ['an outline before I begin','to develop a plan as I go'],
  ['to discuss a new idea aloud','to think through a new idea privately'],
  ['a regular routine','variety from day to day'],
  ['written instructions','a live demonstration'],
  ['to start with the main idea','to start with specific details'],
  ['to finish one task at a time','to alternate between tasks'],
  ['to work independently','to work alongside other people'],
  ['to explore several approaches','to settle on one approach quickly']
],[
  ['to sketch a diagram','to write a description'],
  ['an example before the general rule','the rule before the example'],
  ['a few long study sessions','several short study sessions'],
  ['a written agenda','an informal opening discussion'],
  ['to review a draft on screen','to review it on paper'],
  ['to ask for feedback early','to ask after making a first complete draft'],
  ['to set aside a fixed time for revision','to revise as individual questions come up'],
  ['to consult several reference books','to begin with one familiar reference']
]];

export function buildCbatQuestions(id, random = Math.random, set = 1) {
  const battery = CBAT_BATTERIES.find(item => item.id === id);
  if (!battery) return [];
  const orderedFigures = id === 'intelligence' ? shuffle(figures, random) : [];
  return Array.from({length:battery.count}, (_,i) => {
    if (id === 'intelligence') return intelligence(orderedFigures[i],random);
    if (id === 'attention') return attention(random);
    if (id === 'spatial') return spatial(random);
    if (id === 'ordering') return ordering(random,i);
    const [first,last] = preferences[set-1][i];
    return { prompt:'I generally prefer…', options:[first,'Either suits me',last] };
  });
}

export function buildCbatSet(id, set) {
  const index=CBAT_BATTERIES.findIndex(battery=>battery.id===id);
  if(index<0||!CBAT_PRACTICE_SETS.includes(set)) return [];
  let state=(index+1)*123457+set*891371;
  const random=()=>((state=(Math.imul(state,1664525)+1013904223)>>>0)/2**32);
  return buildCbatQuestions(id,random,set);
}

export const cbatResultKey = (id,set) => `${id}:${set}`;

export function cbatSummary(questions, answers) {
  const attempted = answers.filter(answer => Number.isInteger(answer)).length;
  const correct = questions.every(q => q.correct === undefined)
    ? null
    : questions.filter((q,i) => answers[i] === q.correct).length;
  return { attempted, correct, total:questions.length };
}

export function validCbatResult(id, result) {
  const battery = CBAT_BATTERIES.find(item=>item.id===id||CBAT_PRACTICE_SETS.some(set=>cbatResultKey(item.id,set)===id));
  return !!battery && result?.total === battery.count &&
    Object.keys(result).length===3 &&
    Number.isInteger(result.attempted) && result.attempted >= 0 && result.attempted <= result.total &&
    (battery.seconds
      ? Number.isInteger(result.correct) && result.correct >= 0 && result.correct <= result.attempted
      : result.correct === null);
}
