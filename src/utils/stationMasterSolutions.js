import { model2Solutions } from '../config/rrbWorkedSolutions.js';
import { rrbReviewCalculation } from './rrbReviewCalculations.js';

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
    approach: 'Count unordered pairs. The order of the two draws does not affect whether a pair contains exactly one red token.',
    steps: [
      {title:'Count the tokens', text:`There are ${red} red, ${blue} blue and ${green} green tokens. Together that is ${total} tokens, of which ${nonRed} are non-red.`},
      {title:'Count every possible pair', text:'Choose any two distinct tokens. Divide the ordered count by 2 because each pair can be drawn in two orders.',
        formula:`C(${total}, 2) = (${total} × ${total - 1}) ÷ 2 = ${pairs}`,
        latex:String.raw`\binom{${total}}{2}=\frac{${total}\times${total - 1}}{2}=${pairs}`},
      {title:'Count pairs with exactly one red', text:`Choose one of the ${red} red tokens and one of the ${nonRed} non-red tokens. Each choice gives a different eligible pair.`,
        formula:`C(${red}, 1) × C(${nonRed}, 1) = ${red} × ${nonRed} = ${favourable}`,
        latex:String.raw`\binom{${red}}{1}\times\binom{${nonRed}}{1}=${red}\times${nonRed}=${favourable}`},
      {title:'Find the probability', text:'Divide the number of eligible pairs by the total number of pairs.',
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
  const counted = exactlyOneRed(q, choice);
  if (counted) return counted;
  const model = model2Solutions.get(q.id);
  if (model && model.answer === choice) return model;
  return rrbReviewCalculation(q.question, choice);
}
