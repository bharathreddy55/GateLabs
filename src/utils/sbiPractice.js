import { questionId } from './parseExamText.js';

const rankNames=['FIRST','SECOND','THIRD','FOURTH','FIFTH'];
const label=(letter)=>`(${letter})`;
const sequence=letters=>letters.map(label).join(' → ');
const dependentChoices=/\b(?:all|none) of the above\b|\b(?:option|choice)s?\s+[A-E]\b/i;

const repeatedInequalities=[
  'P > Q ≥ R = S; T ≤ S < U',
  'A ≤ B < C = D; E > D ≥ F',
  'M ≥ N > O = P; Q < P ≤ R',
  'W < X ≤ Y = Z; V ≥ Z > U',
  'J ≥ K = L > M; N ≤ M < O'
];

function refreshedReasoning(q,file) {
  const paper=Number(file.match(/_(\d+)(?:\.txt)?$/)?.[1]);
  const k=paper+4;
  const type=repeatedInequalities.findIndex(clause=>q.question.startsWith('Statements: '+clause));
  // Keep one version of each verified legacy prompt and replace later copies.
  const replaceFirst=type===0&&(/_mock_/.test(file)||paper===8);
  const replaceOthers=type>0&&/_mock_[67](?:\.txt)?$/.test(file);
  let replacement;
  if(replaceFirst||replaceOthers){
    const rows=[
      [`M, N and P are integers. M + 2 ≤ N, N < P, and P < ${k+8}. What is the greatest possible value of M?`,String(k+4),[k+3,k+5,k+6,k+7].map(String),
       `The largest P is ${k+7}, which puts N at most ${k+6}. Subtract 2 to get ${k+4}. Taking each at its limit satisfies every condition.`],
      [`The five reviewers A, B, C, D and E received distinct scores that differ by at least ${k%3+1} point(s). A scored lower than C, C lower than D, and B higher than D. E scored higher than A but lower than C. Which reviewer has exactly two scores above and two below?`,'C',['D','E','A','B'],
       'Read the clues as score order A < E < C < D < B. The middle reviewer is C.'],
      [`Numbers P and Q satisfy P − Q ≥ ${k}; Q and R satisfy Q − R ≥ 2. What is the smallest possible value of P − R?`,String(k+2),[k,k-2,k+1,k+3].map(String),
       `Add the differences: P − R = (P − Q) + (Q − R) ≥ ${k} + 2. Both lower limits can hold at once.`],
      [`A counter processes ${2*k} requests in fewer minutes than counter Y takes to process ${k} requests. Each has a constant positive rate. Which conclusion follows?`,
       'The first counter’s rate is greater than twice Y’s rate.',['The first counter’s rate is exactly twice Y’s.','Y’s rate is greater than the first counter’s.','The first counter’s rate is less than twice Y’s.','The two rates must be equal.'],
       'Doubling Y’s output in Y’s time would double the rate. The first counter handles that doubled output in less time, so its rate exceeds twice Y’s.'],
      [`Four positive loads satisfy J ≥ K, K = L and L > M. Two loads, K and L, are both reduced by ${k} kg and remain positive. Which original comparison is guaranteed to remain true afterwards?`,
       'J ≥ K',['L > M','J = K','K ≥ M','M ≥ J'],
       'Only K and L are reduced. J was at least K, so it is still at least K. The reductions can move K and L below M and do not force equality with J.']
    ];
    replacement=rows[type];
  } else if(/_mock_2(?:\.txt)?$/.test(file)&&/^Find the missing number:\s*15, 23, 39, 63, 95, \?/.test(q.question)){
    replacement=['The record lists 7, 10, 20, 23, 46, 49, 98. If the alternating pattern continues, what is the sum of the eighth and ninth values?',
      '303',['297','300','301','309'],'The operations alternate adding 3 and doubling. The eighth term is 101 and the ninth is 202. Their sum is 303.'];
  }
  if(!replacement)return q;
  const [question,key,wrong,explanation]=replacement;
  const adapted={...q,question,options:[key,...wrong],correctAnswer:0,explanation};
  adapted.id=questionId(adapted);
  return adapted;
}

function variedParagraphQuestions(questions) {
  const groups=new Map();
  for(const [index,q] of questions.entries()) {
    if (!q.passage || !/para jumble/i.test(q.topic) || !q.options?.every(option=>/^[A-E]$/.test(option))) continue;
    const rank=rankNames.findIndex(name=>new RegExp(`\\b${name}\\b`,'i').test(q.question));
    const key=q.options[q.correctAnswer];
    if(rank<0||!key)continue;
    const group=groups.get(q.passage)??[];
    group.push({index,rank,key});
    groups.set(q.passage,group);
  }
  const variants=new Map();
  for(const [passage,group] of groups) {
    const ordered=group.toSorted((a,b)=>a.rank-b.rank);
    const order=ordered.map(row=>row.key);
    const labels=[...passage.matchAll(/^\(([A-E])\) /gm)].map(match=>match[1]);
    if(order.length!==5||labels.length!==5||new Set(order).size!==5||
       !ordered.every((row,i)=>row.rank===i&&labels.includes(row.key))) continue;
    const [a,b,c,d,e]=order;
    const revisions=[
      [`Which sentence immediately follows sentence ${label(a)} in the coherent paragraph?`,b,[c,d,e,'None of these']],
      [`Which pair gives the next TWO sentences after ${label(b)}, in their correct order?`,sequence([c,d]),[sequence([d,c]),sequence([d,e]),sequence([c,e]),sequence([a,c])]],
      [`How many sentences are placed between ${label(a)} and ${label(d)} in the coherent paragraph?`,'2',['0','1','3','4']],
      [`What is the relative order of ${label(d)}, ${label(b)} and ${label(e)} in the coherent paragraph?`,sequence([b,d,e]),[sequence([d,b,e]),sequence([e,b,d]),sequence([b,e,d]),sequence([d,e,b])]]
    ];
    ordered.slice(1).forEach(({index},i)=>{
      const [question,key,wrong]=revisions[i];
      const adapted={...questions[index],question,options:[key,...wrong],correctAnswer:0,
        explanation:`The established paragraph order is ${sequence(order)}. ${questions[index].explanation ?? ''}\nFrom that order the requested answer is ${key}.`};
      adapted.id=questionId(adapted);
      variants.set(index,adapted);
    });
  }
  return questions.map((q,index)=>variants.get(index)??q);
}

function itemSeed(id,seed) {
  for(const letter of id)seed=Math.imul(seed^letter.charCodeAt(0),16777619);
  return seed>>>0;
}

export function reviewSbiPractice(questions,file) {
  if (!/^sbi_clerk_(?:expected_2026_paper|mock)_\d+(?:\.txt)?$/.test(file)) return questions;
  const source='/pyqs/'+file.replace(/(?:\.txt)?$/,'.txt');
  const items=variedParagraphQuestions(questions).map(q=>refreshedReasoning(q.source?q:{...q,source},file));
  const sections=new Map();
  const positions=new Map();
  // Reserve fixed choice positions first. Rearranging "above" choices could
  // change which options they refer to.
  for (const q of items) {
    const group=sections.get(q.section)??{fixed:Array(5).fill(0),movable:[]};
    sections.set(q.section,group);
    const fixed=q.options?.length!==5||!Number.isInteger(q.correctAnswer)||
      q.options.some(option=>dependentChoices.test(option));
    if(fixed&&Number.isInteger(q.correctAnswer))group.fixed[q.correctAnswer]++;
    if(!fixed)group.movable.push(q);
  }
  const seed=itemSeed(file.replace(/\.txt$/,''),2166136261);
  for(const {fixed,movable} of sections.values()){
    const slots=movable.map(()=>{
      const position=fixed.indexOf(Math.min(...fixed));
      fixed[position]++;
      return position;
    });
    // Shuffle a whole section's target positions. Balancing each block of
    // five would give candidates a new sequence to guess.
    for(let i=slots.length-1;i>0;i--){
      const j=itemSeed(movable[i].id,seed^i)%(i+1);
      [slots[i],slots[j]]=[slots[j],slots[i]];
    }
    movable.forEach((q,i)=>positions.set(q,slots[i]));
  }
  return items.map(q=>{
    if(!positions.has(q))return q;
    const hash=itemSeed(q.id,seed);
    const position=positions.get(q);
    const answer=q.options[q.correctAnswer];
    const options=q.options.filter((_,i)=>i!==q.correctAnswer);
    options.sort((a,b)=>itemSeed(a,hash)-itemSeed(b,hash));
    options.splice(position,0,answer);
    return {...q,options,correctAnswer:position};
  });
}
