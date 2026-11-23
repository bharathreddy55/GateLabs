const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letter = n => alphabet[(n%26+26)%26];
const encode = (word, fn) => [...word].map((char,i)=>letter(fn(alphabet.indexOf(char),i))).join('');
const row = (topic,stem,key,wrong,why) => [topic,stem,key,wrong,why];
const seeds = ['TULIP','CROWN','MAPLE','BIRCH','FLINT','GROVE','PLUME','STONE','TRAIL','MARSH','DELTA','EMBER','RAINY','HONEY','VAULT','SHELF','WHEAT','QUART','LYRIC'];

function numberPatterns(k) {
  const s=k+4;
  const a=3+k%4, b=7+(k%6);
  const transcription=[1,2,3,4,5,6].map(n=>n*n+n*s+(n%2?a:0));
  const badPosition=k%4+1;
  transcription[badPosition]+=2;
  return [
    row('Alternating gaps',`The six readings are ${[s,s+a,s+a+2*b,s+2*a+2*b,s+2*a+6*b,s+3*a+6*b].join(', ')}. The gaps alternate an unchanged increment with an increasing increment forming an arithmetic progression. What is the sum of the seventh and eighth readings?`,
      2*(s+3*a+12*b)+a,[2*(s+3*a+12*b),2*(s+3*a+10*b)+a,2*(s+3*a+12*b)+2*b],
      `The changing gaps go ${2*b}, ${4*b}, ${6*b}, interleaved with +${a}. The seventh reading is ${s+3*a+12*b}. Add it to the eighth, which is ${a} higher.`),
    row('Error in a number series',`One term in ${transcription.join(', ')} was copied incorrectly. For the original sequence, at position n start with n² + ${s}n, then add ${a} on odd positions. Which value needs replacing?`,
      transcription[badPosition],transcription.filter((_,i)=>i!==badPosition).slice(1,4),
      `Calculate the expected values at positions 1 through 6. The value at position ${badPosition+1} should be ${transcription[badPosition]-2}, two less than the listed value.`),
    row('Backward recurrence',`Each value from the third onward is the sum of the previous two. In the display ${s}, ?, ${2*s+1}, ${3*s+2}, ${5*s+3}, ${8*s+5}, what value must replace the question mark?`,
      s+1,[s,s+2,2*s+1],`Subtract the first term ${s} from the third term ${2*s+1}. The answer ${s+1} also gives the correct fourth term when added to the third.`),
    row('Threshold in a sequence',`A register displays ${[s,2*s+1,6*s+2,12*s+5,36*s+14,72*s+29].join(', ')} using the same two affine operations in alternation. Which value is first to exceed ${216*s+85} if the pattern continues?`,
      216*s+86,[216*s+85,144*s+59,216*s+88],`Apply ×2 + 1, then ×3 − 1, alternately. The sixth term uses the ×2 rule, so the seventh is 3 × ${72*s+29} − 1 = ${216*s+86}.`),
    row('Interleaved number series',`Complete both blanks in this sequence: ${s}, ${5*s}, ${s+2}, ${5*s-1}, ${s+6}, ${5*s-4}, __, __.`,
      `${s+12}, ${5*s-9}`,[`${s+10}, ${5*s-9}`,`${s+12}, ${5*s-8}`,`${s+14}, ${5*s-7}`],
      'Odd positions increase by consecutive even numbers (+2, +4, +6). Even positions decrease by consecutive odd numbers (−1, −3, −5).'),
    row('Difference series',`Find the missing interior term in ${s}, ${s+2}, ?, ${s+14}, ${s+30}, ${s+62}, ${s+126}.`,s+6,
      [s+4,s+7,s+10],`The gaps double: 2, 4, 8, 16, 32 and 64. Add 4 to the second term to get ${s+6}.`)
  ];
}

function coding(k) {
  const word=seeds[k-1], example=seeds[(k+5)%seeds.length], pivot=1+k%3;
  const inverse=n=>25-n;
  const shift=word=>encode(word,(n,i)=>n+i+1);
  const fold=word=>encode(word,(n,i)=>i%2?inverse(n):n+pivot);
  const cross=word=>encode(word,(n,i)=>n+(i===0||i===4?pivot:-pivot)).split('').reverse().join('');
  const vowel=word=>encode(word,(n,i)=>n+('AEIOU'.includes(word[i])?-1:2));
  return [
    row('Infer a coding rule',`A five-letter code sends ${example} to ${shift(example)} and PLANT to ${shift('PLANT')}. What code does it give ${word}?`,
      shift(word),[encode(word,n=>n+1),encode(word,(n,i)=>n-i-1),encode(word,(n,i)=>n+5-i)],
      `Reading two examples reveals successive shifts +1, +2, +3, +4 and +5. Apply those position shifts to ${word} and wrap after Z.`),
    row('Decode alternating positions',`On odd positions a code advances the letter by ${pivot}. On even positions it uses A↔Z, B↔Y, and so on. Which plain word produces ${fold(word)}?`,
      word,[encode(word,n=>n+pivot),encode(word,(n,i)=>i%2?inverse(n):n),encode(word,(n,i)=>i%2?n:n-pivot)],
      'Move odd-position letters backward by the stated shift. Mirroring is its own inverse at even positions.'),
    row('Compound coding',`A code transforms ${example} into ${cross(example)}. First it shifts the two end letters forward by ${pivot} and the three inside letters back by ${pivot}. What does the same code produce for ${word}, if it then reverses the shifted letters?`,
      cross(word),[cross(word).split('').reverse().join(''),encode(word,n=>n+pivot).split('').reverse().join(''),word.split('').reverse().join('')],
      `The shifted intermediate word is ${cross(word).split('').reverse().join('')}. Its reversal is ${cross(word)}.`),
    row('Vowel–consonant coding',`In a cipher ${example} becomes ${vowel(example)} and GUIDE becomes ${vowel('GUIDE')}. The rule depends on whether the original letter is a vowel. How is ${word} encoded?`,
      vowel(word),[encode(word,n=>n+2),encode(word,(n,i)=>n+('AEIOU'.includes(word[i])?2:-1)),encode(word,n=>n-1)],
      'From the examples, a vowel goes back one letter, and a consonant goes forward two letters. Classify each original letter separately.'),
    row('Coding and place values',`To encode a word, write its last, first and middle letters in that order as alphabet positions (A = 1). Replace each successive number after the first with its sum with the preceding original number. If the result is ${[word[4],word[0],word[2]].map((c,i,x)=>alphabet.indexOf(c)+1+(i?alphabet.indexOf(x[i-1])+1:0)).join(' / ')}, what are the original first, middle and last letters in that order?`,
      word[0]+word[2]+word[4],[word[4]+word[0]+word[2],word[2]+word[4]+word[0],word[0]+word[4]+word[2]],
      'The first displayed number gives the last letter. Subtract it from the second number to recover the first letter. Subtract the recovered first-letter value from the third to recover the middle letter.')
  ].filter(item=>new Set([item[2],...item[3]]).size===4);
}

function analogies(k) {
  const n=k+7, m=k+3, x=k+11;
  const digits=[2+(k%3),5+(k%4)];
  const [t,u]=digits;
  const original=12*n;
  let remainder=original, product=1;
  for(let factor=2;factor<=remainder;factor++){
    if(remainder%factor!==0)continue;
    product*=factor;
    while(remainder%factor===0)remainder/=factor;
  }
  return [
    row('Number analogy',`Pairs ${m} → ${m*(m+1)/2+m%2} and ${m+1} → ${(m+1)*(m+2)/2+(m+1)%2} use the same rule. The rule uses the sum of the first n positive numbers, adjusted only when n is odd. Which output is paired with ${x}?`,
      x*(x+1)/2+x%2,[x*(x+1)/2+2+x%2,x*(x-1)/2+x%2,x*(x+1)/2+3+x%2],
      'An even input gives n(n+1)/2. The odd example is one larger than its triangular number, so add one only when the new input is odd.'),
    row('Reversed digit analogy',`For a two-digit number with unequal digits, 27 corresponds to 45 and 41 corresponds to 27. The output is the positive difference between the number and its reversal. Which input has the same output as ${10*t+u}?`,
      10*(u+1)+t+1,[10*t+u-1,10*(t+1)+u,10*(t-1)+u+1],
      `The difference is nine times the absolute digit gap. ${t} and ${u} differ by ${u-t}; both digits can increase by one without changing that gap.`),
    row('Analogy from paired rows',`In each pair (p,q) value one place apart gives (4,5) → 9 and (7,8) → 15. Check also (5,8) → 39. Under the same relation, what is (${n},${n+3})?`,
      3*(2*n+3),[2*n+3,3*(2*n),3*(2*n+4)],
      'The relation is q² − p² = (q − p)(q + p). The three-unit gap multiplies the sum of the two entries.'),
    row('Inverse analogy',`The rule sends 4 to 17, 7 to 47, and 9 to 77. It multiplies each input by one less than itself and adds a fixed constant. Which input gives ${m*(m-1)+5}?`,
      m,[m+1,m-1,2*m],'The examples establish the constant as 5. Subtract it from the target, then identify the adjacent factors. The larger factor is the input.'),
    row('Analogy using distinct factors',`A machine transforms 18 to 6 and 50 to 10 by replacing an integer with the product of its distinct prime factors. If ${original} is passed through the machine, and its output is passed through again, what is the final result?`,
      product,[product/2,product-1,original],
      `The first pass multiplies one copy of each distinct prime to give ${product}. The second pass sees exactly those same primes, each already present once.`)
  ];
}

function ranks(k) {
  const n=38+3*k, a=9+k, later=13+k;
  const b=n-later+1, gap=b-a-1;
  const p=16+k, q=26+2*k;
  const initial=['U','T','P','S','W','V'];
  const swapped=[...initial];
  const first=k%4, second=4+Math.floor(k/4)%2, place=k%6;
  [swapped[first],swapped[second]]=[swapped[second],swapped[first]];
  return [
    row('Ranking with a reversal',`In a queue of ${n}, H is ${a}th from the front and J is ${later}th from the back. They swap places and everyone faces the other way, reversing which end is the front. How many people are ahead of J in the new direction?`,
      n-a,[a-1,later-1,n-a+1],`J moves to H’s old position. Under reversal the ${n-a} people formerly behind that slot are now ahead.`),
    row('Opposite ranks and removals',`In a row of ${n}, H is ${a}th from the left and J is ${later}th from the right, with J right of H. Three people between them leave. Two new people join left of H. How many now stand between H and J?`,
      gap-3,[gap-1,gap-2,gap+2],`J began at position ${b} from the left, so the gap contained ${gap} people. Only the three removals affect that gap.`),
    row('Rank in a combined list',`H ranks ${p}th in a preliminary list. The final list removes two people originally above H and adds ${4+k} new entries. The number of new entries above H is half the new entries, rounded down. What is H’s final rank?`,
      p-2+Math.floor((4+k)/2),[p+Math.floor((4+k)/2),p-2+(4+k),p-3+Math.floor((4+k)/2)],
      'Remove two higher ranks and add the stated number of newly higher ranks. Removed or added entries below H do not change H’s position.'),
    row('Indirect ordering',`Six runners have distinct times. S is faster than W but slower than T and P. U is faster than T and P is slower than T. W is faster than V. If the times of ${initial[first]} and ${initial[second]} are swapped, who is at rank ${place+1}, where rank 1 is fastest?`,
      swapped[place],swapped.filter((_,i)=>i!==place).slice(0,3),`The original order is ${initial.join(', ')}. The swap gives ${swapped.join(', ')}. Read rank ${place+1} from the new order.`),
    row('Relative ranking from a gap',`In a list of ${n}, K ranks ${a}th from the front and L ranks ${later}th from the rear. M ranks midway between them, counting positions. If their two positions have different parity, use the central position closer to K. What is M’s rank from the rear?`,
      n-Math.floor((a+b)/2)+1,[n-Math.floor((a+b)/2),Math.floor((a+b)/2),n-Math.floor((a+b)/2)+2],
      `L is at position ${b} from the front. The lower of the central positions is ${Math.floor((a+b)/2)}. Convert it to the reverse rank by subtracting from ${n} and adding 1.`),
    row('Ordering and tie rules',`A list ranks higher score first. For tied scores, earlier submission wins. K scores ${p} at 09:21, L scores ${q} at 09:24, M scores ${q} at 09:18, and N scores ${p} at 09:14. Two entries from each score band are initially listed. If M’s time is corrected to 09:29, which consecutive pair occupies places 2 and 3, in order?`,
      'M, N',['L, N','M, K','N, M'],'L now leads M in the higher-score band. N leads K in the lower-score band. The order is L, M, N, K.')
  ];
}

export function mentalReasoning(k) {
  const alternating=(rows,offset)=>rows.map((_,i)=>rows[(i+offset)%rows.length]);
  const codeItems=coding(k);
  return [
    ...alternating(numberPatterns(k),k%6),
    ...alternating(codeItems,k%codeItems.length),
    ...alternating(analogies(k),k%5),
    ...alternating(ranks(k),k%6)
  ];
}
