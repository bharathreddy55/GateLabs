const foundation = [
  [/\bHCF\b/i, 'Highest common factor (HCF)', 'lcm-hcf', 'The HCF is the biggest number that divides each given number evenly. In prime factorisation, keep only factors shared by every number and use the smallest power of each.'],
  [/\bLCM\b/i, 'Least common multiple (LCM)', 'lcm-hcf', 'The LCM is the first positive number that all the given numbers divide evenly. Take the highest power needed for each prime factor so the result is a multiple of every number.'],
  [/percentage increase/i, 'Percentage increase', 'percentages'],
  [/ratio/i, 'Dividing in a ratio', 'ratio-proportion'],
  [/average speed/i, 'Average speed', 'time-and-distance'],
  [/average/i, 'Average after removing a value', 'averages'],
  [/profit/i, 'Profit percentage', 'profit-loss-discount'],
  [/discount/i, 'Discount on marked price', 'profit-loss-discount'],
  [/simple interest/i, 'Simple interest', null, 'Simple interest grows by the same amount each year because the interest is always calculated on the starting sum. Multiply that sum by the annual rate as a decimal and then by the number of years.'],
  [/compounded/i, 'Compound interest', null, 'With annual compounding, the new balance earns interest the following year. Multiply by 1 + the annual rate as a decimal once for each year.'],
  [/\bkm\/h\b.*metres/i, 'Speed unit conversion', 'time-and-distance'],
  [/finish work/i, 'Combined work rates', 'time-and-work'],
  [/^if x \+ y/i, 'Simultaneous linear equations', 'linear-equations'],
  [/^solve/i, 'Linear equations in one variable', 'linear-equations'],
  [/tenth term/i, 'Finding a term in an arithmetic progression', 'arithmetic-progression'],
  [/sum of the first/i, 'Sum of an arithmetic progression', 'arithmetic-progression'],
  [/circumference/i, 'Circumference of a circle', 'geometry'],
  [/area/i, 'Area of a rectangle', 'areas-volumes'],
  [/volume/i, 'Volume of a cube', 'areas-volumes'],
  [/tan θ/i, 'Tangent in a right triangle', 'trigonometry'],
  [/probability/i, 'Probability on a fair die', 'basic-probability'],
  [/median/i, 'Median of an ordered list', 'basic-statistics'],
  [/SI unit/i, 'SI unit of force', 'units-measurement'],
  [/weight/i, 'Mass and weight', 'mass-weight-density'],
  [/density/i, 'Density', 'mass-weight-density'],
  [/work.*seconds/i, 'Mechanical power', 'work-power-energy'],
  [/work/i, 'Mechanical work', 'work-power-energy'],
  [/kinetic energy/i, 'Kinetic energy', 'work-power-energy'],
  [/resistor/i, 'Current and Ohm’s law', 'basic-electricity'],
  [/lever/i, 'Mechanical advantage of a lever', 'levers-machines']
];

const specific = [
  [/^concentration$|^ratio and mixtures$/i, 'ratio-proportion', 'Concentration tells you how much of the whole mixture is the ingredient you are tracking. If a mixture is stirred evenly, each scoop has the same concentration as the tank. Track the ingredient and total liquid separately before converting back to a percentage.'],
  [/^successive percentages$/i, 'percentages', 'Each percentage change uses the amount at that moment as its starting point. For a rise of r%, multiply by 1 + r ÷ 100. For a fall of r%, multiply by 1 − r ÷ 100. Combine the multipliers first, then compare the final amount with the original.'],
  [/^weighted (?:rates|utilisation|attainment)$/i, 'data-tables', 'Think of each row as a basket of items with some successes in it. A large basket contributes more items than a small one. Add the successes across the rows, divide by the total number of items across the same rows, then multiply by 100 for a percentage.'],
  [/^actual versus target$/i, 'data-tables', 'A target is the amount you hoped to make. A percentage attained tells you how many parts out of 100 you actually made. Multiply the target by the percentage and divide by 100 to find actual output. Subtract the earlier output from the later output to find the gain.'],
  [/pressure at equal loads/i, null, 'Pressure describes how spread out a force is. Pressure = force ÷ contact area. Imagine the same weight resting on a wide or a narrow foot. The narrow foot puts more pressure on each square centimetre.'],
  [/forces? and acceleration|balanced forces/i, 'velocity-relative-motion', 'Add forces that act in the same direction and subtract forces that oppose them. The result is the net force. For a constant mass, acceleration = net force ÷ mass. Balanced forces give zero acceleration.'],
  [/direction with a reversal/i, 'velocity-relative-motion', 'Draw each move as an arrow and make every turn from the direction you currently face. Add the north–south distances with opposite signs, then do the same for east–west. Those two totals tell you where you ended up compared with the start.'],
  [/interchanging operators/i, null, 'The question gives the symbols new jobs. Rewrite the whole expression using the replacement symbols, then do the arithmetic in the usual order. For example, evaluate multiplication before addition.'],
  [/minimum block condition/i, null, 'Two ranges overlap where they contain the same integers. Start at the larger of their two starting numbers and stop at the smaller of their two ending numbers. If the start is at or before the end, count the integers as end − start + 1.'],
  [/a missing interior square/i, 'number-series', 'Consecutive squares get farther apart by two each time because (n + 1)² − n² = 2n + 1. Adding the same constant to every square keeps those gaps the same. Use the visible gaps to find the missing one.']
];

// The question bank often tags a particular calculation model. These rules link
// those tags to the chapter that teaches the underlying method.
const science = [
  [/HCF|LCM|minimum batch/i, 'lcm-hcf'],
  [/discount|profit|successive sales|freight payment/i, 'profit-loss-discount'],
  [/concentration|ratio after/i, 'ratio-proportion'],
  [/average(?! speed| velocity)/i, 'averages'],
  [/percentage(?! area)/i, 'percentages'],
  [/time and work|work rat/i, 'time-and-work'],
  [/relative|velocity|acceleration/i, 'velocity-relative-motion'],
  [/speed|train lengths/i, 'time-and-distance'],
  [/linear|equations/i, 'linear-equations'],
  [/progression/i, 'arithmetic-progression'],
  [/number systems|remainder/i, 'number-system'],
  [/probability|chance/i, 'basic-probability'],
  [/trigonometr/i, 'trigonometry'],
  [/geometry|triangles/i, 'geometry'],
  [/density|mass|weight/i, 'mass-weight-density'],
  [/unit conversion|units and|derived units|measurement/i, 'units-measurement'],
  [/area|volume/i, 'areas-volumes'],
  [/median/i, 'basic-statistics'],
  [/friction/i, 'friction'],
  [/electri|circuit|energy cost|parallel branches/i, 'basic-electricity'],
  [/heat|temperature|thermal|calibration/i, 'heat-temperature'],
  [/lever|machines|mechanical advantage|moments/i, 'levers-machines'],
  [/energy|work|power/i, 'work-power-energy']
];

const data = [
  [/scatter|prediction|residual|reference line/i, 'scatter-plots'],
  [/sufficiency|missing data/i, 'data-sufficiency'],
  [/set|membership|overlap|inclusion|exactly|venn/i, 'venn-diagrams'],
  [/pie|sector|slice|chart to amount|combined angles/i, 'data-pie-charts'],
  [/multi-source|cross-reference|combining sources|reconciling/i, 'multi-source-data'],
  [/distribution|sample mean|sample size|median|frequency|frequencies|observations|tail probability/i, 'statistical-distributions'],
  [/arrangement|allocation|consistent|feasible|recording an order|rebalance/i, 'data-arrangement'],
  [/trends/i, 'data-line-graphs']
];

const logic = [
  [/reading comprehension/i, 'comprehension-application'],
  [/clock/i, 'clock-angles'],
  [/calendar/i, 'calendars'],
  [/family|kinship/i, 'family-relations'],
  [/syllogism|quantified|class inclusion/i, 'syllogisms'],
  [/truth|binary|alarm states/i, 'binary-logic'],
  [/assumption|evidence|inferen|claims|policy|evaluating|confounding|validity|explanation|analogy/i, 'statement-assumptions'],
  [/schedule|floor|arrangement/i, 'data-arrangement'],
  [/intersecting sets|one common member/i, 'venn-diagrams']
];

const reasoning = [
  [/analogy|analogue/i, 'analogy'],
  [/code|coding|cipher|encod/i, 'coding-decoding'],
  [/letter|cluster/i, 'letter-series'],
  [/ranks?|ranking/i, 'rankings'],
  [/arrangement|ordering|partial order/i, 'seating-arrangements']
];

const sections = {
  'Basic Science and Mathematics': [science],
  'Data Analysis': [data, 'data-tables'],
  'Logical Capability': [logic, 'logic-puzzles'],
  'Mental Reasoning': [reasoning]
};

export function stationMasterReviewTopic(question) {
  const title = question.topic?.trim();
  if (title === 'Arithmetic and basic science') {
    const match = foundation.find(([pattern]) => pattern.test(question.question));
    if (match) {
      const [, title, noteId, summary] = match;
      return {title, noteId, summary};
    }
  }
  if (!title) return;
  const focus = specific.find(([pattern]) => pattern.test(title));
  if (focus) {
    const [, noteId, summary] = focus;
    return {title, noteId, summary};
  }
  const [rules, fallback] = sections[question.section] ?? [];
  const match = rules?.find(([pattern]) => pattern.test(title));
  const isSequence = question.section === 'Mental Reasoning' && /series|sequence|recurrence|progression|alternating gaps/i.test(title);
  const noteId = match?.[1] ?? (isSequence ? 'number-series' : fallback);
  return {title, noteId};
}
