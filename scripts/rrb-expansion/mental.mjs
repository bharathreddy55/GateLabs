import { item, permutations, quantity as q, rotate, sum } from './items.mjs';

const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letter=n=>alphabet[(n%26+26)%26];
const pos=c=>alphabet.indexOf(c);
const transform=(word,operation)=>[...word].map((c,i)=>letter(operation(pos(c),i))).join('');
const words=['FLUTE','CLASP','BRICK','DUSKY','HONEY','GLOVE','MAPLE','ZEBRA','NORTH','WHEAT',
  'QUILT','JOKER','PILOT','BREAD','PARCH','TANGY','SPARK','WHIRL','CROWN','MIXED'];

function number(k) {
  const a=k+3,d=4+k%5;
  const powers=Array.from({length:6},(_,i)=>a+d*i*(i+1)/2);
  const copied=[...powers];
  const bad=k%3+2;
  copied[bad]+=1;
  const geometric=[a,2*a,(2*a)-3,4*a-6,4*a-9,8*a-18];
  const odd=[a,a+d,a+2*d,a+3*d], even=[3*a,3*a-2,3*a-5,3*a-9];
  const shown=odd.flatMap((n,i)=>[n,even[i]]);
  const terms=Array.from({length:5},(_,i)=>(a+i)*(a+i)+d);
  return [
    q('Correcting a second-difference sequence',`A copied sequence reads ${copied.join(', ')}. Its first two terms are correct. In the intended sequence the gaps increase by ${d} each time. Which position needs correction?`,
      bad+1,[bad,bad+2,7],v=>copied[v-1]!==powers[v-1]&&v!==7,
      [`The successive gaps should be ${d}, ${2*d}, ${3*d}, ${4*d}, and ${5*d}.`,`Regenerate from ${a}. The first mismatch is at position ${bad+1}.`],'th position'),
    q('Next two steps in a sequence',`The sequence ${geometric.join(', ')} repeats two operations in alternation. What is the eighth term if that pattern continues?`,
      16*a-42,[8*a-21,16*a-36,16*a-39],v=>v===2*(geometric.at(-1)-3),
      ['The differences between odd and even positions reveal alternating doubling and subtraction of three.', 'The seventh term subtracts three from the sixth. Double the seventh for the eighth.']),
    item('Maintaining two progressions',`Two rules are interleaved to give ${shown.slice(0,6).join(', ')}. Odd-position terms form an arithmetic progression. Even-position decreases are 2, 3, 4, … . What ordered pair continues the sequence?`,
      `${odd[3]}, ${even[3]}`,[`${odd[3]}, ${even[3]+1}`,`${odd[3]+1}, ${even[3]}`,`${even[3]}, ${odd[3]}`],
      v=>{const [x,y]=v.split(', ').map(Number);return x-odd[2]===d&&even[2]-y===4;},
      [`The odd positions add ${d} each time, giving ${odd[3]} next.`,`The even positions decrease from ${even[2]} by 4, giving ${even[3]}.`]),
    q('A missing interior square',`The five sequence entries are ${terms[0]}, ${terms[1]}, ?, ${terms[3]}, ${terms[4]}. They are squares of consecutive positive integers with the same constant added to each. What is the missing entry?`,
      terms[2],[terms[2]-1,terms[2]+3,(terms[1]+terms[3])/2],
      v=>v-terms[1]===terms[1]-terms[0]+2&&terms[3]-v===v-terms[1]+2,
      [`Successive squares have differences increasing by two. The first visible gap is ${terms[1]-terms[0]}.`,`Increase that gap by two and add it to ${terms[1]}. Verify the next gap as well.`]),
    q('A threshold in a decreasing series',`A sequence begins at ${6*a+10} and subtracts ${a}, then ${a+1}, then ${a+2}, increasing the subtraction by one each time. At which entry, counting the starting entry as 1, does the value first drop below 10?`,
      7,[5,6,8],v=>{
        let term=6*a+10;
        for(let i=1;i<=v;i++){if(term<10)return i===v;term-=a+i-1;}
        return false;
      },
      [`After five subtractions the value is ${6*a+10-(5*a+10)}. That is still at least 10.`, 'The sixth subtraction gives −5, so the seventh displayed value is the first below 10.'],'th entry')
  ];
}

function codes(k) {
  const word=words[(k-21)%words.length], d=1+k%8;
  const mixed=(n,i)=>i%2?n-2:n+d;
  const folded=transform(word,mixed);
  const sequence=Array.from({length:6},(_,i)=>[0,7,12].map((base,j)=>letter(k+base+i*(j+2))).join(''));
  const wrong=[...sequence];
  const bad=(k%3)+2;
  wrong[bad]=wrong[bad].slice(0,2)+letter(pos(wrong[bad][2])+1);
  const inverse=transform(word,(n,i)=>25-n+i);
  const codeRows=Array.from({length:8},(_,i)=>letter(2*i+k));
  const raw=[1,4,2,7,3,0,5];
  const regular=raw.map(x=>codeRows[x]);
  const conditional=[...regular];
  [conditional[1],conditional[5]]=[conditional[5],conditional[1]];
  const alt=Array.from({length:6},(_,i)=>[k+i*3,34-i*4,9+k+2*i].map(letter).join(''));
  return [
    item('Reverse a positional code',`Starting at position 1, a code shifts letters forward by ${d} on odd positions and back by two on even positions, wrapping through the alphabet. Which original word is encoded as ${folded}?`,
      word,[transform(word,n=>n+1),transform(word,(n,i)=>i%2?n-2:n),transform(word,(n,i)=>i%2?n:n-d)],
      v=>transform(v,mixed)===folded,
      [`Reverse the odd-position shift by moving back ${d} letters. Reverse the even-position shift by moving forward two.`,`This recovers ${word}.`]),
    item('Identify an incorrect letter cluster',`Read the three columns of ${wrong.join(', ')} as independent alphabet progressions with wraparound. The first two clusters are correct and exactly one of the remaining clusters is wrong. Which cluster violates the progression?`,
      wrong[bad],wrong.slice(2).filter((_,i)=>i+2!==bad),
      v=>{const i=wrong.indexOf(v);return [...v].some((c,j)=>pos(c)!==(pos(sequence[0][j])+i*(j+2))%26);},
      [`The first two clusters establish forward shifts of 2, 3 and 4 in the three columns.`,`At position ${bad+1}, the last letter should be ${sequence[bad][2]}, giving ${sequence[bad]}.`]),
    item('Reverse a composite cipher',`To encode five letters, mirror each (A↔Z, B↔Y, …), then advance the mirrored letter by its zero-based position. For example, the first letter is advanced zero places. Which word gives ${inverse}?`,
      word,[transform(word,n=>25-n),transform(word,(n,i)=>n+i+1),transform(word,(n,i)=>n-i-1)],
      v=>transform(v,(n,i)=>25-n+i)===inverse,
      ['First undo the shifts of 0, 1, 2, 3 and 4. Only then mirror each recovered letter.',`That inverse order gives ${word}.`]),
    item('Conditional symbol code',`The digits 0 to 7 map in order to ${codeRows.join(', ')}. For a seven-digit input, swap the codes of positions 2 and 6 only if the first digit is odd and the last exceeds 4. What is the code for ${raw.join(' ')}?`,
      conditional.join(''),[regular.join(''),conditional.toReversed().join(''),[regular[6],...regular.slice(1,6),regular[0]].join('')],
      v=>[...v].map(ch=>codeRows.indexOf(ch)).map((digit,i)=>i===1?raw[5]===digit:i===5?raw[1]===digit:digit===raw[i]).every(Boolean)&&raw[0]%2===1&&raw.at(-1)>4,
      [`The direct mapping is ${regular.join(' ')}. The first digit is 1 and the last is 5, so both swap conditions hold.`,`Swap the second and sixth codes only: ${conditional.join(' ')}.`]),
    item('Three-column letter analogy',`In the letter groups ${alt.slice(0,5).join(' / ')}, the columns change independently by +3, −4 and +2 places, wrapping the alphabet. Which group is sixth?`,
      alt[5],[alt[4],transform(alt[4],(n,i)=>n+[3,4,2][i]),transform(alt[4],(n,i)=>n+[2,-4,3][i])],
      v=>[...v].every((c,i)=>c===letter(pos(alt[4][i])+[3,-4,2][i])),
      [`Start with ${alt[4]}. Advance column 1 three places, move column 2 back four, and advance column 3 two.`,`This produces ${alt[5]}.`])
  ];
}

function orders(k) {
  const n=43+k,r=17+k%10,s=13+k%9,a=k+10;
  const left=n-s+1, gap=left-r-1;
  const letters=['G','P','R','T','V','Z'].map(c=>letter(pos(c)+k));
  const [u,v,w,x,y,z]=letters;
  return [
    q('Relative ranks after departures',`In a row of ${n}, a supervisor is ${r}th from the front and an inspector is ${s}th from the rear, behind the supervisor. Five people between them leave. Two people ahead of the supervisor also leave. How many people remain strictly between them?`,
      gap-5,[gap-2,gap-7,gap-4],m=>m===((left-7)-(r-2)-1),
      [`Convert the inspector’s rank to ${left} from the front. There were ${gap} between the pair.`, 'Only the five departures from inside that gap reduce it.'],' people between'),
    item('Combining a partial order',`Six runners have distinct times. ${u} is ahead of ${w}, and ${v} is ahead of ${u}. ${x} is behind ${w} but ahead of ${z}. ${y} is behind ${x} but ahead of ${z}. Who is fourth from the front?`,
      x,[u,w,y],
      option=>permutations(letters).filter(order=>{
        const p=name=>order.indexOf(name);
        return p(v)<p(u)&&p(u)<p(w)&&p(w)<p(x)&&p(x)<p(y)&&p(y)<p(z);
      }).every(order=>order[3]===option),
      [`Chain the comparisons to get ${[v,u,w,x,y,z].join(' → ')}.`,`The fourth runner is ${x}.`]),
    q('Ordering with a score tie',`Five results have scores ${a+8}, ${a+4}, ${a+4}, ${a+1} and ${a}. Larger scores rank higher. Two tied entries use the same ranking position, and the next position skips one number. What rank does the entry scoring ${a+1} receive?`,
      4,[2,3,5],rank=>rank===1+[a+8,a+4,a+4,a+1,a].filter(v=>v>a+1).length,
      ['There are three entries with larger scores, even though the middle two share position 2.', 'The next entry therefore receives rank 4.'],' in the ranking'),
    q('Restricted ordering count',`Four of the first ${a} numbered slots must be filled with four named markers. Two named markers are already fixed in slots 2 and 5. The other two markers occupy distinct empty slots. How many placements of those two markers are possible?`,
      (a-2)*(a-3),[(a-2)**2,(a-2)*(a-3)/2,a*(a-1)],
      count=>count===sum(Array.from({length:a},(_,i)=>i+1).filter(i=>i!==2&&i!==5).map(()=>a-3)),
      [`There are ${a-2} available slots for the first unfixed marker.`,`Every such placement leaves ${a-3} choices for the other one. Multiply because the markers are distinct.`],' placements'),
    q('Analogy with paired differences',`Input pair (4, 7) gives 33 and (5, 9) gives 56. The output is the positive difference between the squares of the inputs. What output corresponds to (${a}, ${a+5})?`,
      5*(2*a+5),[5*(2*a),2*a+5,5*(2*a+6)],v=>v===(a+5)**2-a**2,
      [`Use y² − x² = (y − x)(y + x). The gap between the inputs here is 5.`,`The sum is ${2*a+5}, giving ${5*(2*a+5)}.`])
  ];
}

function mixed(k) {
  const a=k+7,b=k+13;
  const tokens=['#',letter(k),'5','@',letter(k+1),'2','%','7',letter(k+2),'&','4',letter(k+3),'!','9'];
  const retained=tokens.filter(token=>!/^\d$/.test(token));
  const distance=4+k%3;
  const out=retained.at(-distance);
  const pair=[a,a+3,a+5,a+9];
  return [
    item('Filter a mixed sequence',`Read left to right: ${tokens.join(' ')}. Remove all digits. Which element is number ${distance} when counting the remaining elements from the right?`,
      out,retained.filter(c=>c!==out).slice(2,5),c=>retained.toReversed()[distance-1]===c,
      [`After filtering, the sequence is ${retained.join(' ')}.`,`Count ${distance} elements from the right.`]),
    q('Interchanging operators',`The operator + is read as × and the operator − is read as +. Interpret the expression ${a} − 4 + 3 using the substituted operators and normal precedence.`,
      a+12,[(a+4)*3,a+7,a-12],v=>v-4*3===a,
      [`Substitute before calculation: ${a} + 4 × 3.`, 'Do multiplication before addition.']),
    item('Minimum block condition',`Four ranges start at ${pair.join(', ')}. Each range contains exactly five consecutive integers including its start. Which adjacent pair of ranges has exactly three integers in common?`,
      `${pair[1]} and ${pair[2]}`,[`${pair[0]} and ${pair[1]}`,`${pair[2]} and ${pair[3]}`,`${pair[0]} and ${pair[3]}`],
      option=>{const [x,y]=option.split(' and ').map(Number);return Array.from({length:5},(_,i)=>x+i).filter(n=>n>=y&&n<y+5).length===3;},
      [ 'Five-integer ranges have exactly three overlapping values when their starts are two apart.',`Only ${pair[1]} and ${pair[2]} meet that condition.`]),
    q('Piecewise number encoding',`To encode a number, first subtract ${a} from ${2*b}. Then add either 8 or 11, choosing 8 when the result is even and 11 when it is odd. What final number is produced?`,
      2*b-a+((2*b-a)%2?11:8),[2*b-a+((2*b-a)%2?8:11),2*b-a,2*b-a+19],
      v=>v-(2*b-a)===((2*b-a)%2===0?8:11),
      [`The initial result is ${2*b-a}. Test that intermediate result for parity.`,`Then apply just the matching offset.`]),
    q('Recover the analogue from the result',`A device first doubles a positive integer and then adds ${a}. A different device triples the same integer and subtracts ${a}. Their outputs differ by exactly one, with the second greater. What was the input?`,
      2*a+1,[2*a-1,a+1,2*a],v=>(3*v-a)-(2*v+a)===1,
      ['Subtract the first device’s output from the second. The difference simplifies to x − twice the offset.',`Set it equal to 1 and add ${2*a}.`])
  ];
}

export function mental(k,full) {
  const blocks=[number(k),codes(k),orders(k),mixed(k)];
  const arranged=rotate(blocks,k).map((block,i)=>rotate(block,i+k));
  return full ? arranged.flat() : arranged.map(block=>block[0]);
}
