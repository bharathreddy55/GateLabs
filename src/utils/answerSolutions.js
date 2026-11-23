import { arithmeticSolution } from './reviewArithmetic.js';

const topicMethods = [
  [/reading comprehension/i,'Find the lines that directly answer the question. For an inference, choose the conclusion those lines support without adding a new assumption.'],
  [/cloze|fill in the blanks|word usage|word swap/i,'Read the whole sentence for meaning first. Substitute each plausible choice and check that the resulting phrase fits the grammar, the surrounding words and the author’s intended meaning.'],
  [/error detection|sentence improvement/i,'Find the subject and its main verb, then check tense, agreement and parallel structure. Read the complete sentence with the proposed correction in place.'],
  [/para jumble/i,'Find a sentence that introduces the subject without referring back to anything. Link later sentences using pronouns, repeated terms, chronology and cause-and-effect signals.'],
  [/quadratic equations/i,'Solve both equations separately. Compare every possible pair of real roots, or use the minimum and maximum of each root set to test which inequality always holds.'],
  [/simplification|approximation/i,'Simplify brackets and powers first. Work through multiplication and division before addition and subtraction. Round only where the question calls for approximation.'],
  [/number series|series, analogy and coding/i,'Check consecutive differences and ratios, then test alternating terms or a repeated operation. The rule must account for the known terms as well as the missing one.'],
  [/data interpretation|caselet di/i,'Locate the rows or categories named in the question. Write the calculation using those values and check the units and denominator before rounding.'],
  [/simple.*compound interest|simple interest/i,'Identify the principal, annual rate, time and compounding period. Simple interest uses the original principal throughout. Compound interest applies the rate to the balance at each period.'],
  [/profit and loss/i,'Translate each stated percentage into a multiplier of its own cost price. Set up the selling-price equations using those bases and solve for the amount asked for.'],
  [/time and work|work rates|pipes and cisterns/i,'Treat the whole job as one unit. Convert each time into a rate, add rates for people or inlet pipes working together and subtract outlet rates. Multiply by time to find how much work is done.'],
  [/boats and streams/i,'Use speed = distance ÷ time. The downstream speed is boat speed plus current speed, and the upstream speed is boat speed minus current speed. Add or subtract the two equations.'],
  [/mixtures/i,'Track the amount of each component separately. A well-mixed withdrawal removes each component in its current proportion, while an addition changes only the components it contains.'],
  [/syllogism/i,'Draw the minimal relationships guaranteed by the statements. Test each conclusion by trying to construct an allowed counterexample. Check possibility claims separately from conclusions that must follow.'],
  [/^inequalit/i,'Link statements through their common terms. Keep the direction of each inequality and check whether the chain proves a strict comparison or allows equality.'],
  [/seating|floor puzzle|linear arrangement|month & date puzzle/i,'Make one slot for each seat, floor or date. Place fixed clues, keep relative-position clues together and test remaining cases against all the conditions.'],
  [/direction sense|direction & blood relation/i,'Sketch each movement or relationship in the order given. Check the current reference person or direction before applying the next clue.'],
  [/indian history|vengi dynasties|medieval andhradesa|colonial rule|andhra movement|andhra pradesh formation/i,'Identify the site, event, ruler or institution being asked about. Match it to its region and period so that nearby events and similarly named places stay separate.'],
  [/constitutional development|union–state powers|local self-government|federalism|legislature, executive/i,'Identify the constitutional body, right or procedure in the question. Check who has the power, how it is exercised and where the relevant limits apply.'],
  [/money, banking|national income|gsdp and state finances/i,'Identify the account, aggregate or policy instrument at issue. Check which transactions or components enter its definition before judging the options.'],
  [/ecosystems, biodiversity/i,'Identify the ecological process or conservation goal. Check the scale involved, such as a species, habitat or ecosystem, and the direct effect described in the question.'],
  [/waste, pollution|energy management|climate, sustainable development/i,'Identify the pollutant, technology or environmental process and its source. Follow the causal chain to the specific outcome asked for.'],
  [/processes & scheduling/i,'Write the arrival and service times or the process states provided. Apply the stated scheduling rule at each transition and calculate the requested measure for the relevant processes.']
];

const authored = {
  'Which feature is strongly associated with Harappan urban planning?':{
    answer:'Covered drainage systems',
    approach:'Look for infrastructure that shows coordination across a settlement.',
    steps:[
      'The question asks about the way Harappan cities were built. Planned streets and drainage are the relevant evidence.',
      'Covered drains carry wastewater along routes planned alongside buildings and streets. That makes them evidence of settlement-level organisation.',
      'Select covered drainage systems.'
    ]
  },
  'The Great Bath was excavated at which site?':{
    answer:'Mohenjo-daro',
    approach:'Connect the named structure to its excavation site.',
    steps:[
      '“Great Bath” refers to a specific excavated structure, so the task is to match a monument with a location.',
      'The Great Bath is a major structure at Mohenjo-daro. Choose that site.'
    ]
  },
  'What is a Gram Sabha under the constitutional definition?':{
    answer:'Body of persons registered in the electoral rolls for a village within the Panchayat area',
    approach:'Identify the membership criterion in Article 243.',
    steps:[
      'The definition uses registration on the electoral roll as its criterion.',
      'The roll must be for the village within the Panchayat area referred to in the question.',
      'Select the option that includes both electoral registration and the village boundary.'
    ],
    tip:'The body of registered voters and the elected Gram Panchayat have different membership.'
  },
  'With which judgment is the basic structure doctrine principally associated?':{
    answer:'Kesavananda Bharati',
    approach:'Link the doctrine to the judgment on the scope of the constitutional amending power.',
    steps:[
      'The issue is the limit on constitutional amendment. A change may amend the Constitution while still having to respect its basic structure.',
      'Kesavananda Bharati is the judgment principally associated with establishing that limit.'
    ]
  },
  'What does a current-account deficit mean by itself?':{
    answer:'Current-account payments exceed receipts under the balance of payments convention',
    approach:'Find the sign of the current-account balance using the relevant receipts and payments.',
    steps:[
      'Include the transactions in the current account, among them goods, services, income flows and transfers.',
      'The balance is current-account receipts minus current-account payments. A deficit is a negative balance, so payments exceed receipts.',
      'Choose the statement about the current account as a whole.'
    ],
    tip:'A trade balance considers a narrower set of transactions. A government budget balance measures a different account.'
  },
  'Why do irrigated deltas and semi-arid uplands often have different crop mixes?':{
    answer:'Water availability and local production conditions differ',
    approach:'Compare the local conditions that determine how feasible and risky each crop is.',
    steps:[
      'An irrigated delta and a semi-arid upland differ in the reliability and availability of water.',
      'Water requirements matter alongside soils, access to markets and production risk. Together these affect the relative suitability of different crops.',
      'Select the explanation based on differing water and production conditions.'
    ]
  }
};

const sentenceEnd = /(?<!\b(?:e\.g|i\.e|etc|vs|Dr|Mr|Ms|No|Eq|St))(?<!\b[A-Z])[.!?](?=\s+["'“‘(A-Z₹0-9])/g;
// Keep the author’s punctuation and formula order. Split only where a source
// has actual sentence boundaries, numbered lines or explicit implication arrows.
function explanationSteps(explanation) {
  const lines = explanation.split(/\r?\n/).filter(line=>line.trim());
  return lines.flatMap(line=>{
    const sentences = [];
    let previous = 0;
    for (const match of line.matchAll(sentenceEnd)) {
      sentences.push(line.slice(previous,match.index+1));
      previous = match.index+1;
    }
    sentences.push(line.slice(previous));
    return sentences.flatMap(sentence=>sentence.trim().split(/\s+(?:=>|⇒)\s+/));
  }).map(line=>line.trim()).filter(Boolean);
}

export function explainAnswer(q) {
  if (Array.isArray(q.solution?.steps) && q.solution.steps.length) return {approach:'',reason:'',tip:'',...q.solution};
  const entry = Object.hasOwn(authored,q.question) ? authored[q.question] : null;
  if (entry && q.options?.[q.correctAnswer]===entry.answer) return {reason:'',...entry};
  const calculation = arithmeticSolution(q);
  if (calculation) return calculation;
  const reason = typeof q.explanation === 'string' ? q.explanation.trim() : '';
  if (!reason) return {approach:'',steps:[],reason:'',tip:''};
  const approach = topicMethods.find(([pattern])=>pattern.test(q.topic ?? ''))?.[1] ?? '';
  const parts = explanationSteps(reason);
  return {approach, steps:parts.length>1?parts:[], reason:parts.length>1?'':reason, tip:''};
}
