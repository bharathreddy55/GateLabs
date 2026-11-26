const step = (title, text, formula) => ({title,text,formula});
const picture = (title, text) => ({title,text});
const displayOrder = order => order.join(' → ');
const matchesChoice = (answer, choice) => typeof answer === 'number'
  ? new RegExp(`^${answer}(?: [a-z]+(?:[ -][a-z]+)*)?$`,'i').test(choice)
  : answer === choice;

function permutations(items) {
  if (!items.length) return [[]];
  return items.flatMap((item,i)=>permutations(items.filter((_,j)=>i!==j)).map(rest=>[item,...rest]));
}

const name=String.raw`([A-Za-z][\w-]*)`;
const clue = pattern => new RegExp('^'+pattern.replaceAll('#',name)+String.raw`\.$`);
const positionalClues = [
  [clue('# opens the schedule and # closes it'), ([a,b],p,n)=>p(a)===1&&p(b)===n],
  [clue('# is on the highest floor'), ([a],p,n)=>p(a)===n],
  [clue('# works at desk (\\d+)'), ([a,n],p)=>p(a)===Number(n), 1],
  [clue('# (?:directly|immediately) follows #'), ([a,b],p)=>p(a)===p(b)+1],
  [clue('# is immediately before #'), ([a,b],p)=>p(a)+1===p(b)],
  [clue('# is interviewed immediately before #'), ([a,b],p)=>p(a)+1===p(b)],
  [clue('# is immediately below #'), ([a,b],p)=>p(a)+1===p(b)],
  [clue('# is exactly two positions after #'), ([a,b],p)=>p(a)===p(b)+2],
  [clue('# is two floors above #'), ([a,b],p)=>p(a)===p(b)+2],
  [clue('# works two desks to the right of #'), ([a,b],p)=>p(a)===p(b)+2],
  [clue('# is interviewed two days before #'), ([a,b],p)=>p(a)+2===p(b)],
  [clue('# is before # but after #'), ([a,b,c],p)=>p(c)<p(a)&&p(a)<p(b)],
  [clue('# is interviewed after # but before #'), ([a,b,c],p)=>p(b)<p(a)&&p(a)<p(c)],
  [clue('# is earlier than # but later than #'), ([a,b,c],p)=>p(c)<p(a)&&p(a)<p(b)],
  [clue('# immediately follows #, and # immediately follows #'), ([a,b,c,d],p)=>p(a)===p(b)+1&&p(c)===p(d)+1],
  [clue('# is below # and # is above #'), ([a,b,c,d],p)=>p(a)<p(b)&&p(c)>p(d)],
  [clue('# is not immediately to the left of #'), ([a,b],p)=>p(a)+1!==p(b)],
  [clue('# ranks above # and exactly one position separates them'), ([a,b],p)=>p(b)===p(a)+2],
  [clue('# is lower than # but is more than one position below #'), ([a,b,c],p)=>b===c&&p(a)>p(b)+1],
  [clue('# has a lower desk number than #'), ([a,b],p)=>p(a)<p(b)],
  [clue('# sits to the right of #'), ([a,b],p)=>p(a)>p(b)],
  [clue('# ranks higher than #'), ([a,b],p)=>p(a)<p(b)],
  [clue('# is above #'), ([a,b],p)=>p(a)>p(b)],
  [clue('# is earlier than #'), ([a,b],p)=>p(a)<p(b)],
  [clue('# is later than #'), ([a,b],p)=>p(a)>p(b)]
];

function parseClue(text) {
  const spec=positionalClues.find(([pattern])=>pattern.test(text));
  if (!spec) return null;
  const [pattern,holds,nameCount]=spec, values=text.match(pattern).slice(1);
  return {text,names:values.slice(0,nameCount??values.length),holds:(p,n)=>holds(values,p,n)};
}

const orderChecks = (order, clues) => {
  const slots=new Map(order.map((label,index)=>[label,index+1]));
  return clues.map(rule=>rule.holds(label=>slots.get(label),order.length));
};

function arrangements(q) {
  if (typeof q.passage !== 'string') return null;
  const source=q.passage.replaceAll('\\n','\n').split(/\r?\n/).map(line=>line.trim()).filter(Boolean);
  if (!/^(?:Five |Six (?:review appointments|archive rooms))/.test(source[0])) return null;
  const count=source[0].startsWith('Five')?5:6;
  const clues=source.slice(1).map(line=>parseClue(line.replace(/^\d+\.\s*/,'')));
  if (!clues.length || clues.some(rule=>!rule)) return null;
  const names=[...new Set(clues.flatMap(rule=>rule.names))];
  if (names.length!==count) return null;
  const all=permutations(names);
  const valid=all.filter(order=>orderChecks(order,clues).every(Boolean));
  if (valid.length!==1) return null;
  const [order]=valid;
  const floor=source[0].startsWith('Six archive rooms');
  const slot=floor?'Floor':'Slot';
  const intro=picture(floor?'Picture an empty building':'Picture empty spaces in a row',
    floor?'Draw six floors from bottom to top. Put a room on one floor at a time. If two rooms must stay next to each other, move them as a pair.':
      'Draw numbered spaces for the names. A clue about a numbered place goes in first. Names that must be neighbours can move together like two cards taped together.');
  const rowTable=(rows,caption,highlight=[])=>({headers:[slot,'Name'],rows,caption,highlight});
  const rowOrder=order.map((label,i)=>[i+1,label]);
  const dropped=q.question.match(/^If clue (\d+) is dropped and all other clues still apply, how many orders are possible\?$/);
  const relaxed=q.question==='Ignore rule 4 and retain rules 1–3. How many schedules are possible?'&&clues.length===4;
  if (dropped || relaxed) {
    const drop=(relaxed?4:Number(dropped[1]))-1;
    if (!clues[drop]) return null;
    const keep=clues.filter((_,i)=>i!==drop), allowed=all.filter(candidate=>orderChecks(candidate,keep).every(Boolean));
    const firstNames=Map.groupBy(allowed,candidate=>candidate[0]);
    const groups=[...firstNames].map(([label,orders])=>[label,orders.length]);
    return {
      answer:allowed.length,picture:intro,
      working:relaxed
        ? {headers:['Possible order',...order.map((_,i)=>'Slot '+(i+1))],rows:allowed.map((candidate,i)=>[i+1,...candidate]),caption:'Orders that still fit the clues'}
        : {headers:['First in the row','Orders that fit'],rows:groups,caption:'Count the orders by who goes first'},
      steps:[
        {...step('Set aside one clue',`Leave out clue ${drop+1}. Keep every other clue.`),quote:source[drop+1].replace(/^\d+\.\s*/,'')},
        step('Try the remaining places',relaxed?'The two cards that must stay side by side can sit before or after the other free card. The table shows the two places the pair fits.':
          'Pick a first name and try the other names in the empty spaces. Count a row only when every clue we kept works. Each row has one first name, so the groups never count the same row twice.'),
        step('Count all the rows that work',`There are ${allowed.length} different orders.`,relaxed?undefined:`${groups.map(([,n])=>n).join(' + ')} = ${allowed.length}`)
      ]
    };
  }
  const readSlot=q.question.match(/^Which (?:item|appointment) occupies (?:position|slot) (\d+)\?$/);
  const chooseOrder=['Which order satisfies every clue, from position 1 to position 5?','If all four rules are kept, which appointment order is valid?'].includes(q.question);
  if (chooseOrder || readSlot) {
    const position=readSlot?Number(readSlot[1])-1:-1;
    const choices=q.options.map(option=>{
      const candidate=String(option).split(' → ');
      if (candidate.length!==count||new Set(candidate).size!==count||!candidate.every(label=>names.includes(label))) return null;
      const firstMiss=orderChecks(candidate,clues).indexOf(false);
      return [option,firstMiss<0?'All clues work':`Breaks clue ${firstMiss+1}`];
    });
    const useOptions=chooseOrder&&choices.every(Boolean);
    const firstRule=clues[0].text;
    return {
      answer:readSlot?order[position]:displayOrder(order),picture:intro,
      working:useOptions?{headers:['Try this order','What happens'],rows:choices,caption:'Check each proposed order',
        highlight:choices.flatMap(([,check],i)=>check==='All clues work'?[i]:[])}:
        rowTable(rowOrder,'Fill the places that fit every clue',readSlot?[position]:[]),
      steps:[
        {...step('Start with one clue','Write its position or direction beside the names. If you are testing choices, cross out every row that breaks this clue.'),quote:firstRule},
        step('Check the rest of the clues','Keep going one clue at a time. Even a row that works for the first clue must also fit all the others. Only this row passes them all.',displayOrder(order)),
        step(readSlot?'Read the numbered place':'Pick the row that passes all the checks',
          readSlot?`Start counting from 1. Slot ${position+1} has ${order[position]}.`:'The answer is the complete row. Choosing the right first name alone is not enough.')
      ]
    };
  }
  if (!floor) return null;
  const gap=q.question.match(/^How many occupied floors lie strictly between rooms ([A-Z]) and ([A-Z])\?$/);
  if (gap) {
    const ends=gap.slice(1).map(label=>order.indexOf(label)).sort((a,b)=>a-b);
    if (ends[0]<0 || ends[0]===ends[1]) return null;
    const middle=rowOrder.slice(ends[0]+1,ends[1]).map(([number])=>number);
    return {
      answer:middle.length,picture:intro,working:rowTable(rowOrder,'Rooms by floor',[...ends]),
      steps:[
        step('Fit the room clues into the building','Put the room named in the highest-floor clue at the top. Fill the group that must stay together, leaving room for the names above and below it.'),
        step('Find the two named rooms',`${gap[1]} is on floor ${order.indexOf(gap[1])+1}. ${gap[2]} is on floor ${order.indexOf(gap[2])+1}.`),
        step('Count only the floors inside the gap',middle.length?`Only floors ${middle.join(', ')} lie between the two. Skip both rooms’ own floors.`:'The two rooms are next to each other, so there are no floors in between.',
          `${ends[1]+1} − ${ends[0]+1} − 1 = ${middle.length}`)
      ]
    };
  }
  const swap=q.question.match(/^The labels on rooms ([A-Z]) and ([A-Z]) are swapped after placement\. Which statement is correct for the resulting layout\?$/);
  if (!swap || !swap.slice(1).every(label=>names.includes(label)) || swap[1]===swap[2]) return null;
  const changed=order.map(label=>label===swap[1]?swap[2]:label===swap[2]?swap[1]:label);
  const rules=q.options.map(parseClue);
  if (rules.some(rule=>!rule)) return null;
  const correct=orderChecks(changed,rules).flatMap((ok,i)=>ok?[i]:[]);
  if (correct.length!==1) return null;
  return {
    answer:q.options[correct[0]],picture:intro,
    working:{headers:['Floor','Before swap','After swap'],rows:rowOrder.map(([level,label],i)=>[level,label,changed[i]]),caption:'Move only the two named labels',
      highlight:order.flatMap((label,i)=>label!==changed[i]?[i]:[])},
    steps:[
      step('Put the original names in place','Use all the room clues to draw the first building. The Before swap column shows that layout.'),
      step('Trade just two labels',`Put ${swap[1]} on ${swap[2]}’s floor and ${swap[2]} on ${swap[1]}’s floor. Leave the other rooms alone.`),
      step('Read the choices using the new column',`Only this statement still works in the new layout. ${q.options[correct[0]]}`)
    ]
  };
}

function reportClaims(q) {
  const lines=q.question.replaceAll('\\n','\n').split(/\r?\n/);
  if (lines.length!==5 || lines[4]!=='Who receives the report?') return null;
  const intro=lines[0].match(/^Exactly one of ([A-Za-z]+), ([A-Za-z]+), ([A-Za-z]+) is assigned a report, and exactly ([0-3]) of the following claims are true\.$/);
  if (!intro) return null;
  const names=intro.slice(1,4), required=Number(intro[4]);
  const claims=lines.slice(1,4).map(line=>line.match(/^\d+\. ([A-Za-z]+) is (not )?assigned the report\.$/));
  if (claims.some(claim=>!claim||!names.includes(claim[1])) || new Set(names).size!==3) return null;
  const rows=names.map(candidate=>{
    const checks=claims.map(([,label,negated])=>negated?label!==candidate:label===candidate);
    return [candidate,...checks.map(ok=>ok?'True':'False'),checks.filter(Boolean).length];
  });
  const valid=rows.flatMap((row,i)=>row.at(-1)===required?[i]:[]);
  if (valid.length!==1) return null;
  return {
    answer:names[valid[0]],picture:picture('Picture one report to hand out','Try putting the report in one person’s hands. Check the three things written below. Then try the next person, starting again with a fresh row.'),
    working:{headers:['Who has it?','Claim 1','Claim 2','Claim 3','True claims'],rows,caption:'Try one person at a time',highlight:valid},
    steps:[
      step('Give the report to one person in each row','Only that person has it in that row. A claim with “not” is true when the named person does not have it.'),
      step('Count the true claims in each row',`The question wants exactly ${required} true claims. Count the “True” cells and compare the last column with that number.`),
      step('Keep the row with the right count',`Only ${names[valid[0]]}’s row matches the required count.`)
    ]
  };
}

function alarmCases(q) {
  if (!q.passage?.match(/^The three alarm flags [A-Z], [A-Z], [A-Z] are called P, R and S in the statements\. Exactly one of P and R is active\. If R is active, S is active\. If S is active, P is inactive\. At least one alarm combination is allowed\.$/)) return null;
  const askCount=q.question==='How many distinct on/off combinations meet all the alarm rules?';
  if (!askCount && q.question!=='Which conclusion is true for every allowed alarm combination?') return null;
  const configurations=[[true,false,false],[true,false,true],[false,true,false],[false,true,true]];
  const allowed=configurations.map(([p,r,s])=>(!r||s)&&(!s||!p));
  const rejected=['','S on would turn P off','R on requires S on',''];
  const working={headers:['P','R','S','Fits the clues?'],
    rows:configurations.map((row,i)=>[...row.map(value=>value?'On':'Off'),allowed[i]?'Yes':rejected[i]]),
    caption:'Check the switches one case at a time', highlight:allowed.flatMap((ok,i)=>ok?[i]:[])};
  return {
    answer:askCount?allowed.filter(Boolean).length:'P and S cannot both be active.',
    picture:picture('Picture three light switches','Each switch can be on or off. Start with the two switches that cannot both be on. Try S both ways for every start that is allowed.'),
    working,
    steps:[
      step('Start with P and R','Exactly one must be on. If P is on, R is off. If R is on, P is off.'),
      step('Try switching S on and off','When P is on, S must be off because S on would turn P off. When R is on, its rule makes S turn on.'),
      step(askCount?'Count the rows that work':'Look for what happens in every row that works',
        askCount?'One row works with P on and one works with R on. Count those two rows.':'In the first good row P is on and S is off. In the other good row S is on and P is off. They are never on together.')
    ]
  };
}

function pairs(q) {
  const auditor=q.question.match(/^An auditor selects exactly two of records ([A-Z]), ([A-Z]), ([A-Z]) and ([A-Z])\. Selecting \1 requires selecting \3\. Selecting \2 rules out both \3 and \4\. Records \3 and \4 cannot be selected together\. Which pair is feasible\?$/);
  const committee=q.question.match(/^A committee selects exactly two of reports ([A-Za-z]+), ([A-Za-z]+), ([A-Za-z]+) and ([A-Za-z]+)\. Selecting \1 forces \3\. Selecting \4 rules out \3\. New rules also forbid choosing \2 together with \3, and forbid choosing \2 together with \4\. Which pair can be selected\?$/);
  const names=(auditor??committee)?.slice(1);
  if (!names||new Set(names).size!==4) return null;
  const [a,b,c,d]=names;
  const rows=names.flatMap((first,i)=>names.slice(i+1).map(second=>{
    const pair=[first,second];
    let why='Fits all the rules';
    if (pair.includes(a)&&!pair.includes(c)) why=`${a} needs ${c}`;
    else if (pair.includes(b)&&pair.includes(c)) why=`${b} and ${c} cannot go together`;
    else if (pair.includes(b)&&pair.includes(d)) why=`${b} and ${d} cannot go together`;
    else if (pair.includes(c)&&pair.includes(d)) why=`${c} and ${d} cannot go together`;
    return [pair.join(' and '),why];
  }));
  const valid=rows.flatMap(([,why],i)=>why==='Fits all the rules'?[i]:[]);
  if (valid.length!==1) return null;
  return {
    answer:rows[valid[0]][0],
    picture:picture('Picture a tray with room for just two cards','Lay out all the two-card choices. Read each rule while looking at the cards in the same row. Cross out a pair as soon as it breaks one rule.'),
    working:{headers:['Try this pair','What the rule says'],rows,caption:'Test all six pairs',highlight:valid},
    steps:[
      step('Keep room for the card that has to come along',`If ${a} goes in, ${c} must come with it. Both spaces are then filled.`),
      step('Check the pairs that leave out that first card',`Try the pairs made from ${b}, ${c} and ${d}. Every one contains two cards the rules keep apart.`),
      step('Pick the pair that uses both spaces and follows every rule',`${rows[valid[0]][0]} is the only pair that passes.`)
    ]
  };
}

function overlapLimit(q) {
  const missing=q.question.match(/^A claim must have both a receipt and an authorisation to be paid\. Among (\d+) claims, (\d+) lack a receipt and nine lack authorisation\. Exactly four lack both\. What is the maximum number that could be paid\?$/);
  const audit=q.question.match(/^An audit reviews (\d+) requests\. A request can pass only if both its date and fare are verified\. All requests with verified fares have reference codes\. Exactly (\d+) requests lack a code and (\d+) requests lack date verification\. The two groups overlap in two cases\. What is the largest possible number of passes\?$/);
  if (!missing&&!audit) return null;
  const [total,a,b,shared]=missing?[Number(missing[1]),Number(missing[2]),9,4]:
    [Number(audit[1]),Number(audit[2]),Number(audit[3]),2];
  const blocked=a+b-shared, left=total-blocked;
  if (left<0 || shared>Math.min(a,b)) return null;
  const labels=missing?['No receipt','No authorisation']:['No code','Date not verified'];
  return {
    answer:left, picture:picture('Picture two piles of forms that cannot pass','A form needs both checks. Missing even one check puts it in a blocked pile. A form missing both checks still counts as just one form.'),
    rule:{formula:'Blocked forms = first blocked pile + second blocked pile − forms in both'},
    working:{headers:['What is missing?','Number of forms'],rows:[[labels[0]+' only',a-shared],[labels[1]+' only',b-shared],['Both checks',shared],['Blocked in all',blocked]],caption:'Count each blocked form once',highlight:[3]},
    steps:[
      step('Find who has no way to pass',missing?'A claim with no receipt or no authorisation cannot be paid.':
        'A verified fare would come with a code. A form with no code cannot have a verified fare. A form with an unchecked date also cannot pass.'),
      step('Undo the extra count',`The ${shared} forms common to both piles were counted twice. Take away one copy of those forms.`,
        `${a} + ${b} − ${shared} = ${blocked} blocked forms`),
      step('Count the forms left',`${left} is the most that could pass. This would happen if every form left meets both checks.`,
        `${total} − ${blocked} = ${left}`)
    ]
  };
}

export function rrbLogicWalkthrough(q, choice) {
  if (q.section !== 'Logical Capability' || typeof q.question !== 'string' || !Array.isArray(q.options)) return null;
  const result=arrangements(q)??reportClaims(q)??alarmCases(q)??pairs(q)??overlapLimit(q);
  if (!result || !matchesChoice(result.answer,choice)) return null;
  return result;
}
