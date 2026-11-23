const q = (topic,stem,key,options,explanation,passage) =>
  [topic,stem,key,options,explanation,passage?{passage}:undefined];

function permutations(items) {
  if (!items.length) return [[]];
  return items.flatMap((item,i)=>permutations(items.filter((_,j)=>i!==j)).map(rest=>[item,...rest]));
}

const people = [
  ['Asha','Bina','Charu','Deepa','Esha'],['Farah','Gita','Hema','Indu','Jaya'],
  ['Kiran','Lata','Meena','Nila','Pia'],['Omar','Rahul','Sahil','Tara','Uma'],
  ['Vidya','Waseem','Yamini','Zoya','Anil'],['Bela','Dev','Ela','Hari','Isha']
];
const layouts = [
  {
    setting:'Five sealed art crates are displayed in positions one to five, counted from the entrance.',
    rule:([a,b,c,d,e])=>[
      [`${c} is exactly two positions after ${a}.`,p=>p(c)===p(a)+2],
      [`${b} is immediately before ${c}.`,p=>p(b)+1===p(c)],
      [`${d} is before ${e} but after ${c}.`,p=>p(c)<p(d)&&p(d)<p(e)]
    ],
    names:[['Amber','Bronze','Copper','Dusk','Ember'],['Fern','Gold','Hazel','Indigo','Jade']]
  },
  {
    setting:'Five colleagues are assigned one each to desks numbered 1–5 from left to right.',
    rule:([a,b,c,d,e])=>[
      [`${c} works at desk 3.`,p=>p(c)===2],
      [`${e} works two desks to the right of ${c}.`,p=>p(e)===p(c)+2],
      [`${a} has a lower desk number than ${b}.`,p=>p(a)<p(b)],
      [`${b} is not immediately to the left of ${e}.`,p=>p(b)+1!==p(e)],
      [`${d} sits to the right of ${a}.`,p=>p(a)<p(d)]
    ],
    names:people
  },
  {
    setting:'Five activities occupy successive slots, one per slot, with no breaks between slots.',
    rule:([a,b,c,d,e])=>[
      [`${b} immediately follows ${a}, and ${e} immediately follows ${d}.`,p=>p(b)===p(a)+1&&p(e)===p(d)+1],
      [`${c} is earlier than ${d} but later than ${b}.`,p=>p(b)<p(c)&&p(c)<p(d)]
    ],
    names:[['Briefing','Inspection','Handover','Testing','Sign-off'],['Mapping','Weighing','Labelling','Packing','Dispatch']]
  },
  {
    setting:'Five candidates are ranked 1 through 5 by score. All scores differ.',
    rule:([a,b,c,d,e])=>[
      [`${a} ranks above ${c} and exactly one position separates them.`,p=>p(c)===p(a)+2],
      [`${e} is lower than ${c} but is more than one position below ${c}.`,p=>p(e)>p(c)+1],
      [`${b} ranks higher than ${d}.`,p=>p(b)<p(d)]
    ],
    names:people
  },
  {
    setting:'Five interviews take place on Monday through Friday, one per day. Positions 1–5 are Monday–Friday.',
    rule:([a,b,c,d,e])=>[
      [`${d} is interviewed immediately before ${e}.`,p=>p(d)+1===p(e)],
      [`${b} is interviewed two days before ${d}.`,p=>p(b)+2===p(d)],
      [`${c} is interviewed after ${b} but before ${d}.`,p=>p(b)<p(c)&&p(c)<p(d)],
      [`${a} is earlier than ${b}.`,p=>p(a)<p(b)]
    ],
    names:people
  }
];

function arrangement(k, counterfactual=false) {
  const layout=layouts[(k-1)%layouts.length];
  const names=layout.names[Math.floor((k-1)/layouts.length)%layout.names.length];
  const desired=names.map((_,i)=>names[(k+2*i)%names.length]);
  const rules=layout.rule(desired);
  const candidates=permutations(names);
  const passes=(order, constraints)=>constraints.every(([,test])=>test(value=>order.indexOf(value)));
  const [solution,...extra]=candidates.filter(order=>passes(order,rules));
  if (!solution||extra.length) throw Error('RRB arrangement has no unique answer: '+layout.setting);
  const alternatives=candidates.filter(order=>order!==solution).map(order=>({
    order, failures:rules.filter(([,test])=>!test(item=>order.indexOf(item))).length
  })).sort((a,b)=>a.failures-b.failures);
  const context=layout.setting+'\n'+rules.map(([clue],i)=>`${i+1}. ${clue}`).join('\n');
  if (!counterfactual) {
    return q('Constraint-based arrangements','Which order satisfies every clue, from position 1 to position 5?',solution.join(' → '),
      alternatives.slice(0,3).map(({order})=>order.join(' → ')),
      `Checking the stated restrictions leaves only ${solution.join(' → ')}. ${alternatives.slice(0,3).map(({order})=>{
        const violated=rules.findIndex(([,test])=>!test(item=>order.indexOf(item)))+1;
        return `${order.join(' → ')} violates clue ${violated}.`;
      }).join(' ')}`,context);
  }
  const targets=rules.map((_,i)=>({i,count:candidates.filter(order=>passes(order,rules.filter((_,j)=>j!==i))).length}));
  const selected=targets.find(({count},i)=>count>1&&targets.every((other,j)=>i===j||other.count!==count));
  if (!selected) {
    const rank=(k+2)%5;
    return q('Deduction from an arrangement',`Which item occupies position ${rank+1}?`,solution[rank],
      solution.filter((_,i)=>i!==rank).slice(0,3),`The only permissible order is ${solution.join(' → ')}. Its position ${rank+1} is ${solution[rank]}.`,context);
  }
  const count=selected.count;
  return q('Effect of removing a constraint',`If clue ${selected.i+1} is dropped and all other clues still apply, how many orders are possible?`,count,
    [count-1,count+1,2*count],`Retain all clues except ${selected.i+1}. The remaining constraints admit ${count} distinct permutations, including the original order. Count arrangements with position 1 fixed before moving to the next permitted first item.`,context);
}

const argumentsBank=[
  ['Supporting an inference','An archive introduced an optional guide to help visitors locate maps. Which finding most strongly supports the claim that the guide reduces the time spent searching?', 'Randomly assigned guide users locate the same maps faster than non-users.', ['Frequent visitors use the guide more often and are also faster searchers.','Downloads rise after signs pointing to the archive are installed.','Most guide users say the maps were accurately catalogued.'],'A randomised comparison using the same tasks reduces pre-existing differences and measures the relevant outcome.'],
  ['Necessary assumption','A manager expects staggered break times to reduce the longest queue without adding staff. What must the argument assume?', 'The change leaves enough staff available during at least part of the existing peak.', ['The total daily number of customers will fall.','Every staff member takes the same length of break.','The average queue outside the peak is longer than during it.'],'Staggering could help only if it changes available service capacity when the longest queue forms.'],
  ['Counterexample','A supervisor claims that whenever a report is read, an acknowledgement is received. Which observation is sufficient to refute the claim?', 'One read report has no acknowledgement.',['An unread report has no acknowledgement.','A read report has two acknowledgements.','A report receives an acknowledgement before its author checks the log.'],'The claim is R → A. The only direct counterexample is R true and A false.'],
  ['Syllogism','All sealed copies are archived. No archived copy is editable. Some reviewed files are sealed copies. Which conclusion is forced?', 'Some reviewed files are not editable.',['Every uneditable file is archived.','Some archived copies are editable.','Every reviewed file is a sealed copy.'],'At least one reviewed file is sealed and therefore archived. No archived copy can be editable.'],
  ['Quantified negation','The claim is: “Every trainee who passes the practical also passes at least one written module.” What directly contradicts this claim?', 'At least one practical passer passes no written module.',['At least one trainee passes a written module without passing the practical.','Every trainee who fails the practical passes one written module.','Some practical passers fail one written module.'],'The within-group universal is false when one member of the group has none of the required written passes.'],
  ['Confounding and comparison','Two workshops report fewer errors after a common training session. Only one workshop replaced unreliable equipment at the same time. Which comparison best isolates the equipment change?', 'Compare changes in error rates for equivalent work across both workshops over the same dates.',['Compare both workshops’ new error totals without adjusting for work volumes.','Compare workers who volunteered for the training with those who attended once.','Use only the workshop receiving new equipment and count the number of repairs.'],'The shared training can affect both. Comparing changes for equivalent work highlights a difference specific to the equipment workshop, subject to comparable conditions.'],
  ['Validity of a test','A quality screen catches almost all faulty items but also flags many sound ones. A clerk asserts that almost every flagged item is faulty. Which fact is most relevant to testing that assertion?', 'The proportion of all inspected items that were faulty before screening.',['The number of separate inspectors who operate the screen.','The order in which faulty items entered the inspection room.','Whether the screen flags multiple defects on one item under the same code.'],'The mix of faulty and sound items determines the numbers of true and false flags. A low underlying fault rate can produce many false flags despite high sensitivity.'],
  ['Hidden assumption','A bus operator proposes extending a route because most current passengers say they would benefit. Which assumption is needed to infer that most current passengers as a whole support the change from a survey of weekday evening riders?', 'Rider opinions in the surveyed time window are representative of the relevant wider ridership.',['The extension will attract more new riders than current ones.','The survey asked every driver to vote on the proposal.','Passengers who support the change will travel a strictly higher number of trips.'],'The sample covers a time window. A claim about the entire group requires the sampled riders’ opinions to generalise beyond it.'],
  ['Evaluating a policy','A store removes the cheapest parcel option. Average revenue per parcel rises, and the manager claims total revenue must have risen. Which figure is most directly needed to test that claim?', 'The number of parcels before and after the change.',['The median parcel weight after the change.','The total number of delivery destinations.','The discount rate offered on premium parcels before the change.'],'Total revenue equals average revenue per parcel multiplied by the parcel count. A rise in the average can be offset by a lower count.'],
  ['Interpreting evidence','All errors with a missing seal were detected in an audit. The auditor concludes that an undetected error has an intact seal. What makes the conclusion valid?', 'Any error with a missing seal belongs to the detected set.',['Every detected error involved a missing seal.','The audit covered every intact seal at least twice.','A seal was inspected after every detected error was repaired.'],'The conclusion applies the contrapositive of missing seal → detected. It does not require the reverse implication.'],
  ['Use of an analogy','A report uses the example of a queue to explain why a list of waiting tasks can grow even when work speeds up. Which observation best transfers the analogy?', 'New tasks arrive faster than the improved processing rate.',['The tasks vary in age but not in arrival rate.','Staff change how completed work is labelled.','The queue is divided into two lines with the same total capacity.'],'The waiting stock rises whenever inflow exceeds outflow, even if outflow has increased.'],
  ['Alternative explanation','An app appears to improve completion rates. Users may choose whether to install it, and users with earlier unfinished work are also more likely to install it. What comparison best examines the app’s effect?', 'Offer access randomly among users with comparable unfinished work and compare their later results.',['Compare users on the app by the time of day they install it.','Compare current app users with a different group from an earlier year.','Count how many downloads occur after a publicity campaign.'],'Randomising access within a comparable group addresses the imbalance in users’ prior unfinished work.']
];

function appliedLogic(k) {
  const t=k+2, amplitude=3+k%4;
  // The hands separate at 5.5 degrees per minute. Times on either
  // side of the overlap are derived from the stated angular distance.
  const hour=2+k%7, min=Math.floor(30*hour/5.5)-2-k%4;
  const degrees=30*hour-5.5*min;
  const days=28+3*k;
  const week=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const index=(k+days+2)%7;
  const weights=[2,4,7,11,17].map(value=>value+t);
  const capacity=weights[0]+weights[4];
  const selections=permutations(weights).filter(order=>order.slice(0,2).reduce((a,b)=>a+b)===capacity);
  if (selections.length!==12) throw Error('RRB loading example must admit exactly one unordered pair');
  const trainOptions=[weights[0],weights[1],weights[2],weights[3]];
  const selectedWeight=selections.find(order=>order[0]>order[1])[1];
  return [
    q('Clock angles',`Between ${hour}:00 and the first overlap after it, when is the smaller angle between the clock hands ${degrees}°?`,`${hour}:${String(min).padStart(2,'0')}`,
      [min+1,min-1,min-3].map(value=>`${hour}:${String(value).padStart(2,'0')}`),
      `On this side of the overlap the separation is 30 × ${hour} − 5.5m. Set that equal to ${degrees} and solve for m = ${min}.`),
    q('Calendar with two shifts',`A register is inspected on a ${week[k%7]}. Its next inspection is due ${days} days later, but it is carried out two days after the due date. On which weekday is the inspection carried out?`,week[index],
      [week[(index+1)%7],week[(index+5)%7],week[(index+4)%7]],
      `The actual interval is ${days+2} days. Its remainder on division by seven is ${(days+2)%7}. Advance that many weekdays from ${week[k%7]}.`),
    q('Family-tree inference',`${people[k%6][0]} and ${people[k%6][1]} are sisters. The second sister’s husband has a son from an earlier marriage and a daughter with her. What is the first sister’s relationship to that daughter?`,
      'Maternal aunt',['Paternal aunt','Step-sister','Maternal grandmother'],'The girl’s mother is the second sister. The mother’s sister is the maternal aunt. The earlier child is unrelated to that identification.'),
    q('Constrained data arrangement',`Five containers weigh ${weights.join(', ')} kg. A loading bay accepts exactly two whose combined weight is exactly ${capacity} kg. The heavier selected container is loaded first. Which weight is loaded second?`,
      `${selectedWeight} kg`,trainOptions.filter(w=>w!==selectedWeight).map(w=>`${w} kg`),
      `Testing pairs against the capacity leaves ${weights[4]} + ${weights[0]} = ${capacity}. In descending weight order the second is ${selectedWeight} kg.`),
    q('Binary logic and parity',`A lamp is already on. Each pulse reverses its state. It receives ${3*k+1} pulses before a pause, then ${2*k+amplitude} more pulses. During maintenance the technician manually toggles it once and disconnects it before any further pulse. What was its state immediately before the manual toggle and immediately afterwards?`,
      (k+amplitude+1)%2?'Off, then on':'On, then off',
      [(k+amplitude+1)%2?'On, then off':'Off, then on','On, then on','Off, then off'],
      `The total number of automatic toggles is ${5*k+1+amplitude}. Each pair cancels. The manual toggle then reverses the state once more.`),
    conditionalLabels(k)
  ];
}

function conditionalLabels(k) {
  const [a,b,c]=people[k%6];
  const worlds=[a,b,c];
  const all=[
    [`${a} is assigned the report.`,x=>x===a],[`${b} is assigned the report.`,x=>x===b],[`${c} is assigned the report.`,x=>x===c],
    [`${a} is not assigned the report.`,x=>x!==a],[`${b} is not assigned the report.`,x=>x!==b],[`${c} is not assigned the report.`,x=>x!==c]
  ];
  const records=all.flatMap((first,i)=>all.slice(i+1).flatMap((second,j)=>all.slice(i+j+2).flatMap(third=>{
    const clues=[first,second,third];
    const trueCounts=worlds.map(name=>clues.filter(([,test])=>test(name)).length);
    return [0,1,2,3].flatMap(total=>trueCounts.filter(n=>n===total).length===1?[{clues,trueCounts,total}]:[]);
  })));
  const {clues,trueCounts,total}=records[k%records.length];
  const answer=worlds[trueCounts.indexOf(total)];
  return q('Truth-count deduction',`Exactly one of ${worlds.join(', ')} is assigned a report, and exactly ${total} of the following claims are true.\n${clues.map(([label],i)=>`${i+1}. ${label}`).join('\n')}\nWho receives the report?`,
    answer,[...worlds.filter(name=>name!==answer),'The assignment is ambiguous'],
    `Test the three possible recipients. Assigning the report to ${worlds.map((name,i)=>`${name} makes ${trueCounts[i]} claims true`).join('; assigning it to ')}. Only ${answer} yields the required count.`);
}

function multiStepDeductions(k) {
  const t=k+4, n=t+7;
  const [a,b,c,d,e]=people[(k+2)%people.length];
  const start=k%2 ? 'north' : 'south';
  return [
    q('Nested conditions',`An audit reviews ${4*t} requests. A request can pass only if both its date and fare are verified. All requests with verified fares have reference codes. Exactly ${t} requests lack a code and ${t+2} requests lack date verification. The two groups overlap in two cases. What is the largest possible number of passes?`,
      2*t,[2*t-2,3*t-2,3*t],`Any request without a code lacks fare verification and therefore fails. The union of the two groups is ${t} + ${t+2} − 2 = ${2*t} requests. At most ${4*t} − ${2*t} can pass, and that is possible if all other requests meet both requirements.`),
    q('One common member',`Five applicants ${a}, ${b}, ${c}, ${d} and ${e} are each on at least one of two lists. List X has three names and List Y has three names. X includes ${a} and ${b}; Y includes ${c} and ${d}. Both lists exclude the two names already given for the other list. Who must appear on both?`,
      e,[a,c,d],`The given members are exclusive. The only remaining applicant, ${e}, must fill the third place on both lists.`),
    q('Relative direction with a reversal',`A surveyor starts facing ${start}, goes ${n} m forward, turns left and goes ${t} m, then turns left again and goes ${n-3} m. Ignoring obstacles, which displacement from the start is correct?`,
      k%2?`3 m north and ${t} m west`:`3 m south and ${t} m east`,
      [k%2?`3 m south and ${t} m west`:`3 m north and ${t} m east`,k%2?`3 m north and ${t} m east`:`3 m south and ${t} m west`,`${n+n-3} m ${start} and ${t} m west`],
      `The first and third walks are opposite, leaving ${n} − ${n-3} = 3 m along the original heading. The middle walk is to the left of the starting direction.`),
    q('Excluded option by chain',`Exactly two of ${a}, ${b}, ${c} and ${d} are on leave. ${a} is on leave if and only if ${c} is on leave. ${d} is working. The two people at work must cover reception and records, one duty each. ${d} covers records. Who covers reception?`,
      b,[a,c,d],`Because ${d} is working and exactly two people are on leave, the paired leave status must put ${a} and ${c} on leave. The working pair is ${b} and ${d}.`),
    q('Possibility versus certainty',`Team P inspected ${2*t} boxes and team Q inspected ${t} boxes. Exactly ${t+2} of all inspected boxes were rejected. Each team inspected a disjoint set. What is the minimum possible number of rejections from P?`,
      2,[0,1,t+2],`At most ${t} rejections can come from Q because Q inspected only ${t}. That leaves at least 2 among P. The minimum is attainable if every Q box was rejected.`),
    q('Conditional selection',`A committee selects exactly two of reports ${a}, ${b}, ${c} and ${d}. Selecting ${a} forces ${c}. Selecting ${d} rules out ${c}. New rules also forbid choosing ${b} together with ${c}, and forbid choosing ${b} together with ${d}. Which pair can be selected?`,
      `${a} and ${c}`,[`${a} and ${b}`,`${b} and ${d}`,`${c} and ${d}`],
      `Any pair containing ${a} must also contain ${c}. Without ${a}, all three possible pairs among ${b}, ${c} and ${d} breach a prohibition. The single valid pair is ${a}–${c}.`)
  ];
}

export function logicalReasoning(k) {
  return [
    arrangement(k),arrangement(k+7,true),
    ...appliedLogic(k),
    ...multiStepDeductions(k),
    ...Array.from({length:2},(_,i)=>argumentsBank[(k*5+i)%argumentsBank.length]).map(([topic,stem,key,wrong,why])=>q(topic,stem,key,wrong,why))
  ];
}

export const reserveDeductions = [
  q('Sufficient evidence','All files with missing pages are flagged, but files with incorrect dates and no missing pages are flagged only when scanned. A file was never scanned and was not flagged. What follows?','It has no missing page, and its date could be correct or incorrect.',['It has a correct date, and a page may be missing.','It has both an incorrect date and a missing page.','It has neither defect.'],'No flag rules out a missing page. Without scanning, the date check could not have triggered a flag.'),
  q('Necessary versus sufficient','A machine restarts under exactly two conditions: both switches are closed, or the override is active. It restarts with the override off. Would closing switch P alone have been enough?','Both switches were closed at restart, and P alone would meet neither condition.',['Both were closed, so either switch alone could trigger a restart.','At least one was closed, and the other switch’s state is unknown.','P alone would suffice whenever the override is off.'],'With no override, only the conjunction of both switches can trigger the restart.'),
  q('Overlapping schedules','A shuttle runs every day except Tuesday and also skips any day when the depot is closed. During one Monday–Friday week the depot closes for exactly two days and only two shuttles run. What is necessary?','The depot was open on Tuesday.',['The depot was closed on Tuesday.','The two shuttles ran on consecutive days.','The depot was closed on Monday and Friday.'],'There are four scheduled days. Both closures must each remove a scheduled day. A closure on Tuesday would leave three runs.'),
  q('Contrapositive chain','Every inspected parcel gets a scan record. Any parcel with a scan record can be traced. Item X cannot be traced, while item Y can. Which inference is justified?','X was not inspected; Y may or may not have been inspected.',['Both were inspected.','Y was inspected and X might have been inspected.','Neither could have a scan record.'],'Inspection implies a scan and therefore tracing. The lack of tracing rules out inspection for X. Tracing Y does not establish the reverse implication.'),
  q('Comparing claims','A report says the number of cancelled appointments doubled while the cancellation rate fell. Which change is consistent with both claims?','Total appointments more than doubled.',['Total appointments exactly doubled.','Total appointments stayed the same.','Total appointments grew by less than a factor of two.'],'The rate is cancellations divided by appointments. A smaller ratio with twice as many cancellations requires the denominator to more than double.'),
  q('Counting under two restrictions','A display uses three different cards selected from Q, R, S, T and U. Q must appear first. R and S cannot both be used. The other two chosen cards can be in either order. How many displays are possible?',10,[5,8,12],'Of the six unordered pairs from R, S, T and U, remove {R,S}. Each of the five remaining pairs can be ordered in two ways after Q.'),
  q('Interpreting an exception','A depot closes early whenever power is unavailable, except when a backup generator works. It stayed open and normal power was unavailable. Which fact follows under this rule?','The backup generator worked.',['The generator was unavailable.','Power was restored at the moment of early closure.','An early closure was scheduled before the power loss.'],'Without normal power, early closure is required unless the generator works. Remaining open establishes the exception.'),
  q('Testing an inferred relationship','A teacher says that pupils who voluntarily took extra quizzes learned more because their later scores were higher. Which comparison most directly addresses the missing starting information?','Compare score gains among pupils with comparable initial scores.',['Compare only pupils who completed exactly one quiz.','Compare the total number of quizzes across classrooms.','Compare later scores without measuring initial performance.'],'Later scores can reflect differences that pre-date the quizzes. Changes from similar baselines address those initial differences.'),
  q('Applying a stated policy','Every parcel sent overnight is checked. Other parcels are checked only if they weigh over 10 kg. A checked parcel weighed 8 kg. Another checked parcel weighed 16 kg. What is certain?','Only the 8 kg parcel is known to have been sent overnight.',['Both were sent overnight.','The 16 kg parcel cannot have been sent overnight.','Neither could have been sent overnight.'],'A non-overnight parcel weighing 8 kg could not have been checked. A 16 kg parcel might qualify for inspection regardless of delivery category.')
];
