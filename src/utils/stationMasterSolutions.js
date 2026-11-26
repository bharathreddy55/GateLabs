import { model2Solutions } from '../config/rrbWorkedSolutions.js';
import { beginnerMathSolutions } from '../config/rrbBeginnerMath.js';
import { rrbReviewCalculation } from './rrbReviewCalculations.js';
import { rrbDataWalkthrough } from './rrbDataWalkthroughs.js';
import { rrbLogicWalkthrough } from './rrbLogicWalkthroughs.js';

const tankQuestion = 'A 40 L tank contains a well-mixed 30% solution. Ten litres are removed and replaced by 10 L of a 50% solution. What is the final concentration?';

const tankSolution = {
  picture:{
    title:'Imagine a big juice tank',
    text:'There is strong juice and water in the tank. A drink that is 30% concentrate has 30 parts strong juice out of every 100 parts of drink. Keep track of how much strong juice is in the tank and how much drink there is altogether.'
  },
  steps:[
    {title:'Count the strong juice you start with', text:'Take 30 out of every 100 parts of the 40 litres already in the tank.',
      formula:'30/100 × 40 L = 12 L', latex:String.raw`\frac{30}{100}\times40=12\text{ L}`},
    {title:'Take out one 10-litre scoop', text:'The drink is mixed evenly, so your scoop is 30% strong juice too. Taking out the scoop removes 3 litres of strong juice. You now have 9 litres of strong juice in 30 litres of drink.',
      calculations:[{formula:'30/100 × 10 L = 3 L'},{formula:'12 L − 3 L = 9 L of strong juice'},{formula:'40 L − 10 L = 30 L of drink'}]},
    {title:'Pour in the stronger drink', text:'Half of the new drink is strong juice. That puts back 5 litres of strong juice. Add it to the 9 litres still in the tank. The tank now holds 40 litres again.',
      calculations:[{formula:'50/100 × 10 L = 5 L'},{formula:'9 L + 5 L = 14 L of strong juice'},{formula:'30 L + 10 L = 40 L of drink'}]},
    {title:'Find the share of strong juice', text:'14 of the 40 litres are strong juice. Divide by the amount of all the drink, then multiply by 100 to write the share as a percentage.',
      formula:'14/40 × 100% = 35%', latex:String.raw`\frac{14}{40}\times100\%=35\%`}
  ],
  finalAnswer:{text:'The final concentration is 35%.'},
  tip:'Taking out some of a well-mixed drink keeps its strength the same. Adding a drink with a different strength is what changes it.'
};

function exactlyOneRed(q, choice) {
  const match = q.question?.match(/^A box has (\d+) red, (\d+) blue and (\d+) green tokens\. Two are drawn without replacement\. What is the probability that exactly one is red\?$/);
  if (!match || !/^\d+\/\d+$/.test(choice ?? '')) return null;
  const [red, blue, green] = match.slice(1).map(Number);
  const nonRed = blue + green;
  const total = red + nonRed;
  const pairs = total * (total - 1) / 2;
  const favourable = red * nonRed;
  const [numerator, denominator] = choice.split('/').map(Number);
  if (!pairs || !denominator || !Number.isSafeInteger(numerator * pairs)
    || !Number.isSafeInteger(denominator * favourable)
    || numerator * pairs !== denominator * favourable) return null;
  const percent = (100 * favourable / pairs).toFixed(2);
  return {
    picture:{title:'Imagine picking two coloured tokens', text:'The box has red, blue and green tokens. For this question, blue and green can go in one group called “not red.” A pair works when one token is red and its partner comes from that other group.'},
    approach: 'Count unordered pairs. The order of the two draws does not affect whether a pair contains exactly one red token.',
    steps: [
      {title:'Count the tokens', text:`There are ${red} red, ${blue} blue and ${green} green tokens. Together that is ${total} tokens, of which ${nonRed} are non-red.`},
      {title:'Count every possible pair', text:'There is one fewer token to pick after the first pick. Picking A then B and picking B then A give the same pair. Multiplying the first and second counts includes both orders, so divide by 2.',
        formula:`C(${total}, 2) = (${total} × ${total - 1}) ÷ 2 = ${pairs}`,
        latex:String.raw`\binom{${total}}{2}=\frac{${total}\times${total - 1}}{2}=${pairs}`},
      {title:'Count pairs with exactly one red', text:`Each of the ${red} red tokens can sit beside any of the ${nonRed} tokens that are not red. So every red token gives you ${nonRed} pairs that work.`,
        formula:`C(${red}, 1) × C(${nonRed}, 1) = ${red} × ${nonRed} = ${favourable}`,
        latex:String.raw`\binom{${red}}{1}\times\binom{${nonRed}}{1}=${red}\times${nonRed}=${favourable}`},
      {title:'Find the chance', text:'Think of the fraction as pairs that work out of all possible pairs.',
        formula:`${favourable} ÷ ${pairs} = ${choice}`,
        latex:String.raw`P(\text{exactly one red})=\frac{${favourable}}{${pairs}}`}
    ],
    finalAnswer: {text:`About ${percent}%`, formula:choice, latex:String.raw`\frac{${numerator}}{${denominator}}`},
    shortcut: {text:'For two draws, multiply the red and non-red counts and divide by the total number of pairs.',
      formula:`(${red} × ${nonRed}) ÷ C(${total}, 2) = ${choice}`,
      latex:String.raw`\frac{${red}\times${nonRed}}{\binom{${total}}{2}}=\frac{${numerator}}{${denominator}}`},
    tip:`Without replacement, the first token stays out. If you solve using ordered draws, the second denominator is ${total - 1}, and you must include both red-first and red-second cases.`
  };
}

export function stationMasterSolution(q) {
  const choice = q.options?.[q.correctAnswer];
  if (q.question === tankQuestion && choice === '35%') return tankSolution;
  const data = rrbDataWalkthrough(q, choice);
  if (data) return data;
  const counted = exactlyOneRed(q, choice);
  if (counted) return counted;
  const beginnerMath = beginnerMathSolutions.get(q.question);
  if (beginnerMath && beginnerMath.answer === choice) return beginnerMath;
  const model = model2Solutions.get(q.id);
  if (model && model.answer === choice) return model;
  return rrbLogicWalkthrough(q, choice) ?? rrbReviewCalculation(q.question, choice);
}
