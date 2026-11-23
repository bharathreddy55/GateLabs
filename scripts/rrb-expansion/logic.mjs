import { item, near, permutations, quantity as q, rotate } from './items.mjs';

const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letters=k=>Array.from({length:6},(_,i)=>alphabet[(k+5*i)%26]);
const slots=order=>order.map(name=>name).join(' → ');

function schedule(k) {
  const [a,b,c,d,e,f]=letters(k);
  const names=[a,b,c,d,e,f];
  const rules=[
    [`${a} opens the schedule and ${f} closes it.`,p=>p(a)===0&&p(f)===5],
    [`${c} directly follows ${b}.`,p=>p(c)===p(b)+1],
    [`${e} is immediately before ${f}.`,p=>p(e)+1===p(f)],
    [`${d} is later than ${c}.`,p=>p(d)>p(c)]
  ];
  const orders=permutations(names);
  const valid=(order,only=rules)=>only.every(([,check])=>check(name=>order.indexOf(name)));
  const matches=orders.filter(order=>valid(order));
  if (matches.length!==1) throw Error('Schedule is not unique');
  const order=matches[0];
  const context={passage:`Six review appointments ${names.join(', ')} run in slots 1–6. Each slot has one appointment.\n${rules.map(([text],i)=>`${i+1}. ${text}`).join('\n')}`};
  const placement=2+k%2;
  const placements=order.filter((_,i)=>i!==placement).slice(0,3);
  const reduced=rules.slice(0,-1);
  const omitted=orders.filter(candidate=>valid(candidate,reduced));
  const orderOptions=[order,[a,b,d,c,e,f],[a,d,b,c,e,f],[a,b,c,e,d,f]];
  return [
    item('Schedule deduction',`Which appointment occupies slot ${placement+1}?`,order[placement],placements,
      option=>matches.every(candidate=>candidate[placement]===option),
      [`Fix ${a} and ${f} at the ends and ${e} before ${f}. The pair ${b}–${c} must be earlier than ${d}.`,`The resulting schedule is ${slots(order)}. Read the requested slot.`],context),
    item('Testing a full schedule','If all four rules are kept, which appointment order is valid?',slots(orderOptions[0]),orderOptions.slice(1).map(slots),
      option=>valid(option.split(' → ')),
      [`The ends and penultimate appointment are fixed. The three remaining slots must contain the pair ${b}–${c} followed by ${d}.`,`Read the complete order: ${slots(order)}.`],context),
    q('Counting with one relaxed rule','Ignore rule 4 and retain rules 1–3. How many schedules are possible?',
      2,[1,3,4],v=>v===omitted.length,
      [`The free middle slots must hold the adjacent pair ${b}–${c} and the single appointment ${d}.`,`The pair can use the first two or last two of those three slots. The valid orders are ${omitted.map(slots).join(' and ')}.`],' valid schedules',context)
  ];
}

function floor(k) {
  const [a,b,c,d,e,f]=letters(k+3);
  const names=[a,b,c,d,e,f];
  const orders=permutations(names);
  const rules=[
    [`${d} is two floors above ${b}.`,p=>p(d)===p(b)+2],
    [`${c} is immediately below ${d}.`,p=>p(c)+1===p(d)],
    [`${f} is on the highest floor.`,p=>p(f)===5],
    [`${a} is below ${b} and ${e} is above ${d}.`,p=>p(a)<p(b)&&p(e)>p(d)]
  ];
  const check=order=>rules.every(([,rule])=>rule(name=>order.indexOf(name)));
  const valid=orders.filter(check);
  if(valid.length!==1)throw Error('Floor placement is not unique');
  const labels=valid[0];
  const moved=labels.map(name=>name===b?e:name===e?b:name);
  const context={passage:`Six archive rooms ${names.join(', ')} occupy a building’s six floors, one room per floor. Floor 1 is the lowest.\n${rules.map(([text])=>text).join('\n')}`};
  return [
    q('Floor gaps',`How many occupied floors lie strictly between rooms ${a} and ${e}?`,
      3,[2,4,5],v=>v===labels.indexOf(e)-labels.indexOf(a)-1,
      [`The block ${b}, ${c}, ${d} occupies floors 2–4. Only this arrangement leaves room below the block for ${a} and above it for ${e} and ${f}.`,`There are floors 2, 3 and 4 between ${a} on floor 1 and ${e} on floor 5.`],' floors between',context),
    item('Cross-checking a floor assignment',`The labels on rooms ${b} and ${e} are swapped after placement. Which statement is correct for the resulting layout?`,
      `${f} is on the highest floor.`,
      [`${d} is two floors above ${b}.`,`${e} is above ${d}.`,`${b} is immediately below ${c}.`],
      option=>{
        const p=name=>moved.indexOf(name);
        if(option.startsWith(f+' '))return p(f)===5;
        if(option.startsWith(d+' '))return p(d)===p(b)+2;
        if(option.startsWith(e+' '))return p(e)>p(d);
        return p(b)+1===p(c);
      },
      [`Swap only the two named labels. ${b} now appears on floor 5 and ${e} on floor 2.`,`${f} was unaffected and remains on floor 6. The statements involving the new ${b} and ${e} positions fail.`],context)
  ];
}

function truth(k) {
  const limit=60+k;
  const outcomes=[false,true];
  const records=outcomes.flatMap(p=>outcomes.flatMap(r=>outcomes.map(s=>[p,r,s])));
  const allowed=records.filter(([p,r,s])=>p!==r&&(!r||s)&&(!s||!p));
  const flag = option=>allowed.every(([p,r,s])=>{
    if(option==='P and S cannot both be active.')return !(p&&s);
    if(option==='R is always active.')return r;
    if(option==='S is never active.')return !s;
    return !p&&!r;
  });
  const labels=letters(k+8);
  const context={passage:`The three alarm flags ${labels.slice(0,3).join(', ')} are called P, R and S in the statements. Exactly one of P and R is active. If R is active, S is active. If S is active, P is inactive. At least one alarm combination is allowed.`};
  const count=allowed.length;
  return [
    item('Finding a forced statement','Which conclusion is true for every allowed alarm combination?',
      'P and S cannot both be active.',['R is always active.','S is never active.','Both P and R are inactive.'],flag,
      ['Check the two cases for the exclusive pair. If P is active, S must be inactive. If R is active, P is inactive and S must be active.', 'These cases force P and S to be incompatible.'],context),
    q('Counting feasible alarm states','How many distinct on/off combinations meet all the alarm rules?',count,[1,3,4],
      v=>v===records.filter(([p,r,s])=>(+p+ +r)===1&&Number(r)<=Number(s)&&(+s+ +p)<=1).length,
      ['For P active, only (on, off, off) satisfies the conditions. For R active, only (off, on, on) satisfies them.', 'Each case yields one distinct combination.'],' combinations',context),
    q('Charge threshold and necessity',`A claim must have both a receipt and an authorisation to be paid. Among ${limit} claims, ${k} lack a receipt and nine lack authorisation. Exactly four lack both. What is the maximum number that could be paid?`,
      55,[51,56,59],v=>v===limit-(k-4)-(9-4)-4,
      [`The union of the missing-requirement groups has ${k} + 9 − 4 = ${k+5} claims.`,`Removing those affected leaves at most ${limit} − ${k+5} = 55 payable claims.`],' payable claims')
  ];
}

function calendar(k) {
  const weekdays=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const start=k%7, pause=19+2*k, shift=7+k%5, count=pause+shift, final=weekdays[(start+count)%7];
  const alternatives=[...new Set([weekdays[(start+pause)%7],...weekdays.slice(start),...weekdays.slice(0,start)])]
    .filter(day=>day!==final).slice(0,3);
  const hour=3+k%4, minute=6+k%10;
  const angle=30*hour-5.5*minute;
  const a=k+7;
  return [
    item('Calendar with a second delay',`A permit was checked on a ${weekdays[start]}. A renewal due ${pause} days later was delayed by another ${shift} days. Which weekday was it renewed?`,
      final,alternatives,
      answer=>{let day=start;for(let i=0;i<count;i++)day=(day+1)%7;return weekdays[day]===answer;},
      [`The actual elapsed time is ${pause} + ${shift} = ${count} days.`,`Whole weeks leave the weekday fixed. Advance by the remainder ${count%7}.`]),
    q('Clock hands before overlap',`Between ${hour}:00 and the first overlap, the minute and hour hands are separated by ${angle}°. How many minutes after ${hour}:00 is this?`,
      minute,[minute-2,minute+1,minute+4],v=>near(30*hour+.5*v-6*v,angle),
      [`At ${hour}:00, the hour hand starts ${30*hour}° ahead of the minute hand.`,`They close at 6 − 0.5 = 5.5° per minute. Solve ${30*hour} − 5.5m = ${angle}.`],' minutes'),
    q('Two calendars coincide',`One check takes place every ${a} days and another every ${2*a} days. Both took place today. How many times will both take place on the same day over the next ${7*a} days, excluding today?`,
      3,[2,4,6],v=>v===Array.from({length:7*a},(_,i)=>i+1).filter(i=>i%a===0&&i%(2*a)===0).length,
      [`The common period is ${2*a} days because the longer interval is a multiple of the shorter.`,`List ${2*a}, ${4*a} and ${6*a}. The next common day is outside the window.`],' joint dates')
  ];
}

function deductions(k) {
  const [a,b,c,d,e,f]=letters(k+12);
  const n=8+k;
  const all=Array.from({length:16},(_,i)=>[a,b,c,d].filter((_,p)=>i&(1<<p)));
  const valid=all.filter(x=>x.length===2&&(!x.includes(a)||x.includes(c))&&
    !(x.includes(c)&&x.includes(b))&&!(x.includes(d)&&x.includes(c))&&!(x.includes(b)&&x.includes(d)));
  const asPair=x=>x.join(' and ');
  return [
    item('Conditional selection of records',`An auditor selects exactly two of records ${a}, ${b}, ${c} and ${d}. Selecting ${a} requires selecting ${c}. Selecting ${b} rules out both ${c} and ${d}. Records ${c} and ${d} cannot be selected together. Which pair is feasible?`,
      asPair([a,c]),[asPair([a,b]),asPair([b,d]),asPair([c,d])],
      option=>valid.some(x=>asPair(x)===option),
      [`Any pair containing ${a} must include ${c}. Without ${a}, every pair among the other three violates a restriction.`,`The feasible pair is ${a} with ${c}.`]),
    q('Lower bound from intersecting sets',`During a review of ${5*n} files, at least ${3*n} contain a signature and at least ${3*n+2} contain a seal. What is the least possible number containing both?`,
      n+2,[n,n-2,2*n+2],v=>v>=0&&(3*n-v)+(3*n+2-v)+v<=5*n&&(3*n-(v-1))+(3*n+2-(v-1))+(v-1)>5*n,
      [`The two groups have at least ${6*n+2} memberships but at most ${5*n} distinct files.`,`The overlap must be at least ${n+2}. That bound is attainable if the two groups together cover every file.`],' files in both'),
    item('Kinship through symbols',`Use “X > Y” for “X is the mother of Y”, “X ~ Y” for “X is the brother of Y”, and “X : Y” for “X is the father of Y”. For ${a} ~ ${b} > ${c} : ${d}, how is ${a} related to ${d}?`,
      'The brother of the paternal grandmother.',['The brother of the maternal grandmother.','The father of the paternal grandmother.','The brother of the father.'],
      option=>option.includes('brother of the paternal grandmother'),
      [`${c} is ${d}’s father. ${b} is the mother of ${c}, so ${b} is the paternal grandmother of ${d}.`,`${a} is ${b}’s brother.`]),
    item('Class inclusion and an exception',`All registered units of type ${a} are tagged ${b}, and no tagged unit is marked ${c}. At least one type-${a} unit is registered and inspected ${e}. An unregistered type-${a} unit inspected ${f} is marked ${c}. What is established?`,
      `At least one inspected type-${a} unit is not marked ${c}.`,
      [`No unit of type ${a} can be marked ${c}.`,`Every inspected unit is tagged ${b}.`,`Every unit tagged ${b} is a registered type-${a} unit.`],
      option=>option.startsWith('At least one inspected'),
      [`The registered and inspected type-${a} unit has tag ${b}. That tag rules out mark ${c}.`,`The unregistered unit does not inherit the registration-based restriction.`]),
    q('Comparing clock frequency with a fixed maximum',`Three events occur ${n}, ${n+5}, and ${n+10} times. Exactly one event is assigned to each of ${a}, ${b}, and ${c}. ${a} is not the most frequent, ${b} is less frequent than ${c}, and ${a} is more frequent than ${b}. How many times more in absolute count does ${c} occur than ${b}?`,
      10,[5,15,20],v=>permutations([n,n+5,n+10]).filter(([x,y,z])=>x<z&&y<z&&x>y).every(([,y,z])=>z-y===v),
      [`The constraints give ${b} < ${a} < ${c}.`,`Subtract the smallest frequency ${n} from the largest ${n+10}.`],' more events')
  ];
}

export function reasoning(k, full) {
  const parts=[schedule(k),floor(k),truth(k),calendar(k),deductions(k)];
  return full ? rotate(parts,k).flatMap((part,i)=>rotate(part,k+i)) :
    rotate(parts,k).slice(0,4).map((part,i)=>part[(k+i)%part.length]);
}
