import {parseQuestionTable} from './questionTable.js';

const sum = values => values.reduce((total, value) => total + value, 0);
const number = value => /^[−+-]?\d+(?:,\d{3})*(?:\.\d+)?$/.test(value)
  ? Number(value.replaceAll(',', '').replace('−', '-'))
  : NaN;
const show = value => String(Number(value.toFixed(8))).replace('-', '−');
const signed = value => value > 0 ? '+' + show(value) : show(value);
const rounded = (value, places) => Number(value.toFixed(places));
const step = (title, text, formula) => ({title, text, formula});
const picture = (title, text) => ({title, text});
const rule = (formula, latex) => ({formula, latex});
const working = (headers, rows, caption, highlight=[]) => ({headers, rows, caption, highlight});
const numericChoice = choice => {
  const match = String(choice ?? '').match(/^(?:₹\s*)?([−+-]?\d+(?:,\d{3})*(?:\.\d+)?)(?:%|°| [a-z][a-z -]*)?$/i);
  return match ? number(match[1]) : NaN;
};
const verifies = (answer, choice) => typeof answer === 'number' ?
  Math.abs(answer - numericChoice(choice)) < 1e-8 : answer === choice;

function largest(rows, column) {
  const best = Math.max(...rows.map(row => row[column]));
  const indexes = rows.flatMap((row,index) => row[column] === best ? [index] : []);
  return indexes.length === 1 ? indexes[0] : -1;
}

function outputFromTargets(q, rows) {
  const data = rows.map(([label,t1,p1,t2,p2]) => [label,t1*p1/100,t2*p2/100,t2*p2/100-t1*p1/100]);
  const first = sum(data.map(row => row[1])), second = sum(data.map(row => row[2]));
  const ruleFormula = rule('Actual output = target × percent attained ÷ 100',
    String.raw`\displaystyle \text{Actual output}=\frac{\text{Target}\times\text{Percent attained}}{100}`);
  const intro = picture('Picture a goal and a stack of finished boxes',
    'The target is how many boxes a unit planned to finish. The percent attained tells us how much of that goal it finished. For 60%, count 60 finished boxes out of every 100 planned.');
  const convert = step('Turn goals into finished boxes',
    `Take each target times its own percentage, then divide by 100. For unit ${rows[0][0]}, do that once for each period.`,
    `Period 1: ${show(rows[0][1])} × ${show(rows[0][2])} ÷ 100 = ${show(data[0][1])}\nPeriod 2: ${show(rows[0][3])} × ${show(rows[0][4])} ÷ 100 = ${show(data[0][2])}`);
  const solved = (answer, steps, highlight=[], tip, shortcut) => ({
    answer, picture:intro, rule:ruleFormula, steps:[convert,...steps], tip, shortcut,
    working:working(['Unit','Period 1 actual','Period 2 actual','Gain'],data.map(([label,a,b,gain])=>[label,show(a),show(b),signed(gain)]),'Actual output and gain by unit',highlight)
  });

  switch(q.question) {
    case 'Which unit recorded the largest absolute gain in actual output from period 1 to period 2?': {
      const best = largest(data,3);
      if (best < 0 || data[best][3] <= 0) return null;
      const [label,a,b,gain] = data[best];
      return solved(label,[
        step('Find what changed for each unit','Take away the old count from the new count. A plus sign means more boxes were finished. A minus sign means fewer.',
          `Unit ${label}: ${show(b)} − ${show(a)} = ${signed(gain)}`),
        step('Pick the biggest gain',`Read down the Gain column. Unit ${label} has the largest increase, ${show(gain)} more finished boxes.`)
      ],[best],'Compare the change in finished boxes. Targets and percentages tell you different things.',
      {text:'Find actual output for both periods. Subtract period 1 from period 2. Pick the biggest positive difference.'});
    }
    case 'By what percentage did total actual output grow from period 1 to period 2?': {
      if (first <= 0) return null;
      const change=second-first, percent=rounded(100*change/first,2);
      return solved(percent,[
        step('Add the finished boxes in each period',`All units together finished ${show(first)} boxes before and ${show(second)} after.`,
          `${show(second)} − ${show(first)} = ${show(change)} extra boxes`),
        step('Compare the extra boxes with the old pile','Use the period 1 total to say how many extra boxes there were for every 100 originally finished.',
          `${show(change)} ÷ ${show(first)} × 100% = ${show(percent)}%`)
      ]);
    }
    case 'What percentage of the combined target did all units attain in period 2, to two decimal places?': {
      const target=sum(rows.map(row=>row[3]));
      if (target <= 0) return null;
      const percent=rounded(100*second/target,2);
      return solved(percent,[
        step('Make one big goal for period 2','Add the four period 2 targets. Add the four actual counts in that same period.',
          `Goal = ${rows.map(row=>show(row[3])).join(' + ')} = ${show(target)}\nFinished = ${data.map(row=>show(row[2])).join(' + ')} = ${show(second)}`),
        step('Find what share of the big goal was finished','Divide the finished pile by the planned pile and write it out of 100.',
          `${show(second)} ÷ ${show(target)} × 100% ≈ ${percent.toFixed(2)}%`)
      ]);
    }
    case 'Among the units whose targets fell, what was the net change in their combined actual output?': {
      const group = rows.flatMap((row,index) => row[3] < row[1] ? [index] : []);
      if (!group.length) return null;
      const change=sum(group.map(i=>data[i][3]));
      const answer=change > 0 ? `It increased by ${show(change)}.` :
        change < 0 ? `It decreased by ${show(-change)}.` : 'It stayed the same.';
      return solved(answer,[
        step('Keep only the units with smaller goals',`Compare their targets in the question table. The units with a smaller goal in period 2 are ${group.map(i=>data[i][0]).join(' and ')}.`),
        step('Put their changes together','Use only those units’ actual changes. A loss takes away from a gain.',
          `${group.map(i=>signed(data[i][3])).join(' + ')} = ${signed(change)}`)
      ],group);
    }
    case 'What fraction of actual period 2 output came from A and D together?': {
      const group = data.flatMap(([label],index) => ['A','D'].includes(label) ? [index] : []);
      if (group.length !== 2 || second <= 0) return null;
      const part=sum(group.map(i=>data[i][2]));
      return solved(`${show(part)}/${show(second)}`,[
        step('Make the A and D pile','Count only their finished boxes in period 2.',
          `${group.map(i=>show(data[i][2])).join(' + ')} = ${show(part)}`),
        step('Put that small pile over the whole pile','The bottom number is every box finished in period 2, including A and D.',
          `${show(part)}/${show(second)}`)
      ],group);
    }
    default: return null;
  }
}

function laneComparisons(q, rows) {
  const intro=picture('Picture parcels arriving in four lanes',
    'Each lane has a fresh set of spaces for the morning and evening. For a change, compare the same lane at the two times. For free space, take the parcels away from the number of spaces.');
  const data = rows.map(([label,cap,a,b])=>[label,cap,a,b,cap-a,a-b]);
  if (q.question==='Which lane has the greatest drop in arrivals from morning to evening?') {
    const best=largest(data,5);
    if (best < 0 || data[best][5] <= 0) return null;
    const [label,,a,b,,drop]=data[best];
    return {
      answer:label,picture:intro,rule:rule('Drop = morning arrivals − evening arrivals'),
      working:working(['Lane','Morning','Evening','Drop'],data.map(([name,,x,y,,diff])=>[name,show(x),show(y),signed(diff)]),'Change in the number of parcels',[best]),
      steps:[
        step('Subtract along each row','Start with the morning count and take away the evening count. A positive result means fewer parcels came in the evening.'),
        step('Find the biggest drop',`Look down the last column. ${label} lost the most arrivals.`,`${show(a)} − ${show(b)} = ${show(drop)} fewer parcels`)
      ]
    };
  }
  if (q.question==='What percentage of the combined East and West capacity is used on the evening shift, to one decimal place?') {
    const group=data.filter(([label])=>['East','West'].includes(label));
    if (group.length!==2) return null;
    const cap=sum(group.map(row=>row[1])), used=sum(group.map(row=>row[3]));
    if (cap<=0) return null;
    const pct=rounded(100*used/cap,1);
    return {
      answer:pct,picture:intro,rule:rule('Percent used = parcels in the two lanes ÷ spaces in the two lanes × 100'),
      working:working(['Lane','Evening parcels','Spaces'],[...group.map(([label,spaces,,arrivals])=>[label,arrivals,spaces]),['Together',used,cap]],'East and West evening totals',[2]),
      steps:[
        step('Bring East and West together','Add the parcels from those two lanes. Then add the spaces from the same two lanes.',`${used} parcels in ${cap} spaces`),
        step('Say how many spaces are used out of 100','Divide the filled spaces by all the spaces, then multiply by 100.',`${used} ÷ ${cap} × 100% ≈ ${pct.toFixed(1)}%`)
      ]
    };
  }
  const batch=q.question?.match(/^A batch of (\d+) extra parcels goes to the morning lane with the smallest total capacity that can accept the entire batch\. How many spaces remain in that lane afterwards\?$/);
  if (!batch) return null;
  const amount=Number(batch[1]);
  const candidates=data.filter(row=>row[4]>=amount).sort((a,b)=>a[1]-b[1]);
  if (!candidates.length || candidates[1]?.[1]===candidates[0][1]) return null;
  const [label,,,,free]=candidates[0], left=free-amount;
  return {
    answer:left,picture:intro,rule:rule('Empty spaces = capacity − arrivals'),
    working:working(['Lane','Capacity','Morning parcels','Empty spaces'],data.map(row=>row.slice(0,5).filter((_,i)=>i!==3)),'Can the morning lane fit the extra parcels?',[data.indexOf(candidates[0])]),
    steps:[
      step('Look for room for the whole batch',`Keep only lanes with at least ${amount} empty spaces. The whole batch has to fit in one lane.`),
      step('Pick the qualifying lane with the smallest capacity',`Compare the Capacity column for lanes that fit the batch. ${label} qualifies and has the smallest capacity among those lanes.`),
      step('Put the new parcels in that lane','Take the batch size away from the empty spaces that lane had before.',`${free} − ${amount} = ${left} empty spaces`)
    ]
  };
}

function punctuality(q, rows, reportsLate) {
  if (rows.some(([,count,recorded])=>count<=0||recorded<0||recorded>count)) return null;
  const data=rows.map(([label,total,reported])=>[label,total,reportsLate?total-reported:reported]);
  const scheduled=sum(data.map(row=>row[1])), onTime=sum(data.map(row=>row[2]));
  const table=working([reportsLate?'Group':'Station','Scheduled','On time','Late','On time %'],
    data.map(([label,total,early])=>[label,total,early,total-early,show(rounded(100*early/total,2))+'%']),
    'Departures worked out by row');
  const pictureNote=picture('Picture two piles of train tickets',
    'Sort each station’s trains into two piles, on time and late. The two piles together make all the scheduled trains. Use the same station or group of stations for both the part and the whole.');
  const solved=(answer,steps,highlight=[],formula='On-time percentage = on-time trains ÷ scheduled trains × 100')=>({
    answer,picture:pictureNote,rule:rule(formula),working:{...table,highlight},steps
  });
  const at=(label)=>data.findIndex(row=>row[0]===label);
  const ratio=(part,total,places)=> {
    const percent=rounded(100*part/total,places);
    return step('Write the share out of 100','Divide the on-time pile by the whole pile. Multiply by 100 to put the answer in percent.',
      `${part} ÷ ${total} × 100% ${100*part/total===percent?'=':'≈'} ${show(percent)}%`);
  };

  switch(q.question) {
    case 'What percentage of all scheduled departures across the four stations were on time?':
    case 'What was the combined on-time departure rate, to one decimal place?': {
      const places=q.question.includes('one decimal')?1:8;
      return solved(rounded(100*onTime/scheduled,places),[
        step('Count the trains that left on time',reportsLate?
          'For each row, take away the late trains from the scheduled trains. Add the on-time counts you get.' :
          'Add the numbers in the On time column. This counts every train that left on time exactly once.',
          `${data.map(row=>row[2]).join(' + ')} = ${onTime}`),
        step('Count every planned train','Add the Scheduled column. It includes the on-time trains and the late ones.',
          `${data.map(row=>row[1]).join(' + ')} = ${scheduled}`),
        ratio(onTime,scheduled,places)
      ]);
    }
    case 'Which station had the highest share of its own departures on time?': {
      const best=largest(data.map(row=>[row[0],row[2]/row[1]]),1);
      if (best<0) return null;
      return solved(data[best][0],[
        step('Work out a score out of 100 for each station','For each row, divide on-time trains by the planned trains in that same row. This lets us compare stations of different sizes.'),
        step('Read the highest score',`Station ${data[best][0]} has the highest on-time percentage in the last column.`,
          `${data[best][2]} ÷ ${data[best][1]} × 100% = ${show(100*data[best][2]/data[best][1])}%`),
        step('Check what “share” asks for','A station with more trains can have a higher count and a lower percentage. Here we compare the percentages.')
      ],[best]);
    }
    case 'Twelve late departures at Station B are excluded from the records. Its on-time count is unchanged. What is the new system-wide punctuality rate to one decimal place?': {
      const b=at('B');
      if (b<0 || data[b][1]-data[b][2]<12) return null;
      const total=scheduled-12;
      return solved(rounded(100*onTime/total,1),[
        step('Keep all trains that were on time','The removed trains were all late, so the on-time pile stays the same.',`On-time trains = ${onTime}`),
        step('Take 12 out of all the trains','Only the whole pile gets smaller.',`${scheduled} − 12 = ${total} trains still counted`),
        ratio(onTime,total,1)
      ],[b]);
    }
    case 'If departures from C double while each station’s on-time rate stays fixed, what is the new network on-time percentage?': {
      const c=at('C');
      if (c<0) return null;
      const total=scheduled+data[c][1], totalOnTime=onTime+data[c][2];
      return solved(rounded(100*totalOnTime/total,8),[
        step('Make another copy of C’s row','C keeps its own rate, so twice as many trains also means twice as many on-time trains at C.'),
        step('Add the extra copy to the old totals','Leave the other stations unchanged.',
          `All trains: ${scheduled} + ${data[c][1]} = ${total}\nOn time: ${onTime} + ${data[c][2]} = ${totalOnTime}`),
        ratio(totalOnTime,total,8)
      ],[c]);
    }
    case 'What is the difference between the late counts for groups D and A?':
    case 'How many departures from groups A and C were on time?': {
      const compare=q.question.startsWith('What is the difference');
      const indexes=[at('A'),at(compare?'D':'C')];
      if (indexes.some(index=>index<0)) return null;
      const [a,b]=indexes.map(i=>compare?data[i][1]-data[i][2]:data[i][2]);
      const result=compare?Math.abs(b-a):a+b;
      return solved(result,[
        step('Read only the two named rows',compare?'Take the late counts in A and D.':'Take the on-time counts in A and C.'),
        step(compare?'Find the gap between the piles':'Put the on-time piles together',compare?'Take the smaller pile from the bigger one.':'Count the two piles together.',
          compare?`${Math.max(a,b)} − ${Math.min(a,b)} = ${result}`:`${a} + ${b} = ${result}`)
      ],indexes,compare?'Difference = larger late count − smaller late count':'On time = scheduled − late');
    }
    default: break;
  }
  const goal=q.question.match(/^(?:Station|group) ([A-Z]) (?:wants|.*reach) (\d+)%/i);
  const legacyGoal=q.question.match(/^How many of the late group ([A-Z]) trains must become on time for group [A-Z] to reach (\d+)% punctuality\?$/);
  const target=goal??legacyGoal;
  if (!target) return null;
  const index=at(target[1]);
  if (index<0) return null;
  const [label,total,early]=data[index], pct=Number(target[2]);
  const needed=Math.ceil(total*pct/100-1e-10), more=needed-early;
  if (pct>100 || more<0) return null;
  return solved(more,[
    step('Read the chosen row',`${label} has ${total} planned trains. We keep that total and move some trains from the late pile to the on-time pile.`),
    step('Find how big the on-time pile needs to be','Take the goal percentage of that row’s scheduled trains. A part of a train would not reach the goal, so round up to a whole train.',
      `${total} × ${pct} ÷ 100 → at least ${needed} on time`),
    step('Find how many trains have to switch piles',`The row already has ${early} on-time trains. Only add what is missing.`,
      `${needed} − ${early} = ${more}`)
  ],[index],'On-time trains needed = scheduled trains × target percentage ÷ 100, rounded up');
}

function seriesValues(q, rows, type) {
  const figure=q.figure;
  if (figure?.type!==type || !Array.isArray(figure.labels) || !Array.isArray(figure.values) || figure.labels.length!==rows.length
    || figure.values.length!==figure.labels.length || new Set(figure.labels).size!==figure.labels.length) return null;
  const byLabel=new Map(figure.labels.map((label,i)=>[label,figure.values[i]]));
  const values=rows.map(([label])=>byLabel.get(label));
  return values.every(value=>typeof value==='number'&&Number.isFinite(value)&&value>=0)?values:null;
}

function waitWindows(q, rows) {
  const means=seriesValues(q,rows,'line');
  if (!means) return null;
  const data=rows.map(([name,people],i)=>[name,people,means[i],people*means[i]]);
  const count=sum(rows.map(row=>row[1])), minutes=sum(data.map(row=>row[3]));
  if (count<=0 || minutes<=0) return null;
  const solved=(answer,steps,highlight=[])=>({
    answer,picture:picture('Picture everyone handing in their waiting minutes',
      'One window might have a long wait and only a few people. A busy window could supply more waiting minutes even if each person waited less. Count the minutes from every person in a window.'),
    rule:rule('Total waiting minutes for a window = people × average minutes per person'),
    working:working(['Window','People','Minutes each','Total minutes'],data,'Waiting minutes by window',highlight),
    steps:[step('Match each time in the chart to the same time in the table','Multiply the people in that row by their average wait. That gives the whole row’s pile of waiting minutes.'),...steps]
  });
  switch(q.question) {
    case 'What is the average wait across all observed passengers, rounded to one decimal place?': {
      const mean=rounded(minutes/count,1);
      return solved(mean,[
        step('Add the rows',`There are ${minutes} waiting minutes and ${count} people.`),
        step('Share those minutes evenly among everyone','Divide by the number of people to find minutes per person.',`${minutes} ÷ ${count} ≈ ${mean.toFixed(1)} min`)
      ]);
    }
    case 'Which window contributes the most total passenger-minutes of waiting?': {
      const best=largest(data,3);
      if (best<0) return null;
      return solved(data[best][0],[step('Find the largest pile',`The biggest value in the last column is ${data[best][3]} minutes at ${data[best][0]}.`)], [best]);
    }
    case 'Among all waiting minutes, what share belongs to observations from 10:30 onward, to one decimal place?': {
      const selected=data.flatMap(([name],i)=>name>='10:30'?[i]:[]);
      const total=sum(selected.map(i=>data[i][3])), pct=rounded(100*total/minutes,1);
      return solved(pct,[
        step('Keep the rows starting at 10:30 and later','Add their waiting minutes. They are the small pile we are comparing.',`${selected.map(i=>data[i][3]).join(' + ')} = ${total}`),
        step('Use all waiting minutes as the whole','Divide the small pile by the whole pile and multiply by 100.',`${total} ÷ ${minutes} × 100% ≈ ${pct.toFixed(1)}%`)
      ],selected);
    }
    default: return null;
  }
}

function frequencyReview(q, rows) {
  const data=rows.map(([label,count])=>[number(label),count]).sort((a,b)=>a[0]-b[0]);
  if (data.some(([value,count])=>!Number.isFinite(value)||!Number.isInteger(count)||count<0)) return null;
  const total=sum(data.map(row=>row[1]));
  if (total<=0) return null;
  const minutes=sum(data.map(([value,count])=>value*count));
  const intro=picture('Picture a card for every wait',
    'If a row says 4 waits of 10 minutes, imagine four cards marked 10. A frequency is the number of those cards. Multiplying is a quick way to add all the 10s.');
  const minutesTable=working(['Minutes each','Number of waits','Minutes in this row'],
    [...data.map(([value,count])=>[value,count,value*count]),['Total',total,minutes]],'Count the waits and their minutes',[data.length]);
  const solved=(answer,steps,table=minutesTable,formula='Minutes in a row = minutes per wait × number of waits')=>({
    answer,steps,picture:intro,rule:formula?rule(formula):undefined,working:table
  });
  if (['What was the mean waiting time across all recorded observations?','What is the overall mean waiting time, rounded to two decimals?'].includes(q.question)) {
    const places=q.question.includes('two decimals')?2:8;
    const mean=rounded(minutes/total,places);
    return solved(mean,[
      step('Find how many minutes each row brings',`The first row has ${data[0][1]} waits of ${data[0][0]} minutes.`,
        `${data[0][1]} × ${data[0][0]} = ${data[0][1]*data[0][0]} minutes`),
      step('Add all the rows',`There are ${minutes} minutes spread across ${total} waits.`),
      step('Share the minutes evenly','Divide all the minutes by all the waits.',
        `${minutes} ÷ ${total} ${mean===minutes/total?'=':'≈'} ${show(mean)} min`)
    ]);
  }
  if (q.question==='What is the median dispatch delay across the displayed services?') {
    let running=0;
    const groups=data.map(([value,count])=>{
      const first=running+1;
      running+=count;
      return [value,count,first,running];
    }).filter(([,count])=>count>0);
    const left=Math.floor((total+1)/2), right=Math.ceil((total+1)/2);
    const a=groups.findIndex(([, ,first,last])=>left>=first&&left<=last);
    const b=groups.findIndex(([, ,first,last])=>right>=first&&right<=last);
    const middle=(groups[a][0]+groups[b][0])/2;
    return solved(middle,[
      step('Line up every wait from shortest to longest','All waits of the same length sit together. The table shows which positions each group fills.'),
      step('Find the middle of the line',`With ${total} waits, the middle ${left===right?'is position '+left:'uses positions '+left+' and '+right}.`),
      step('Read the wait at the middle',a===b?`The middle is in the row with waits of ${groups[a][0]} minutes.`:
        `The two middle waits are ${groups[a][0]} and ${groups[b][0]} minutes. Average the two.`)
    ],working(['Minutes waited','Number of waits','Positions in order'],
      groups.map(([value,count,first,last])=>[value,count,first===last?String(first):`${first}–${last}`]),
      'Find the middle wait',[...new Set([a,b])]),null);
  }
  const band=q.question.match(/^How many waits were between (\d+) and (\d+) minutes inclusive\?$/);
  if (band) {
    const indexes=data.flatMap(([value],i)=>value>=Number(band[1])&&value<=Number(band[2])?[i]:[]);
    if (!indexes.length) return null;
    const counts=indexes.map(i=>data[i][1]);
    return solved(sum(counts),[
      step('Keep the waits inside the two limits',`“Inclusive” means we count ${band[1]} and ${band[2]} as well as any waits in between.`),
      step('Add the counts in those rows','Use the number of cards in each row.',`${counts.join(' + ')} = ${sum(counts)} waits`)
    ],working(['Minutes waited','Number of waits'],data,'Waits within the requested range',indexes),null);
  }
  const requested=q.question.match(/^Among waits of at least (\d+) minutes, what share took (\d+) minutes, to one decimal place\?$/);
  const delays=q.question.match(/^If one service is drawn from those delayed more than seven minutes, what is the probability it was delayed exactly (\d+) minutes, as a percentage to one decimal place\?$/);
  if (!requested&&!delays) return null;
  const limit=requested?Number(requested[1]):8;
  const choice=Number(requested?.[2]??delays[1]);
  const keep=data.flatMap(([value],i)=>value>=limit?[i]:[]);
  const group=sum(keep.map(i=>data[i][1])), part=data.find(([value])=>value===choice)?.[1];
  if (group<=0 || part==null || choice<limit) return null;
  const percent=rounded(100*part/group,1);
  return solved(percent,[
    step('Make a smaller pile first',`Keep only waits of ${limit} minutes or longer. Those are the rows you can choose from.`,
      `${keep.map(i=>data[i][1]).join(' + ')} = ${group} waits in the smaller pile`),
    step('Count the cards with the exact wait',`There are ${part} waits of ${choice} minutes in that pile. Compare them with all ${group} waits you kept.`,
      `${part} ÷ ${group} × 100% ≈ ${percent.toFixed(1)}%`)
  ],working(['Minutes waited','Number of waits'],data,'Choose only from the highlighted rows',keep),
  'Percent = count in the requested row ÷ count in the selected rows × 100');
}

function fares(q, rows, areRoutes) {
  const data=rows.map(([label,a,b])=>[label,areRoutes?b:a,areRoutes?a:b,(a*b)]);
  if (data.some(([,count,fare])=>count<0||fare<0)) return null;
  const count=sum(data.map(row=>row[1])), cash=sum(data.map(row=>row[3]));
  const intro=picture('Picture a ticket seller’s cash box','Every ticket puts one fare into the box. A cheaper ticket can bring in more money for its group if many more of it are sold.');
  const solved=(answer,steps,highlight=[],table=data,caption='Money from each ticket group')=>({
    answer,steps,picture:intro,rule:rule('Money collected = number of tickets paid for × fare per ticket'),
    working:working([areRoutes?'Route':'Class','Tickets','Fare (₹)','Money (₹)'],table,caption,highlight)
  });
  if (['What was the average fare across all tickets, rounded to two decimals?',
    'Across all sold tickets on the four routes, what average fare was collected before refunds, to one decimal place?'].includes(q.question)) {
    if (count<=0) return null;
    const places=areRoutes?1:2, average=rounded(cash/count,places);
    return solved(average,[
      step('Make a money pile for each row','Multiply how many tickets were sold by what each ticket costs. Use that row’s own fare.'),
      step('Combine the money and the tickets','Add the money column and the ticket column separately.',`Money = ₹${cash}\nTickets = ${count}`),
      step('Find the price per ticket across all rows','Share the total money across every ticket sold.',`${cash} ÷ ${count} ≈ ₹${average.toFixed(places)}`)
    ]);
  }
  if (q.question==='Which ticket class contributed the largest revenue?') {
    const best=largest(data,3);
    if (best<0) return null;
    const [label,count,fare,money]=data[best];
    return solved(label,[
      step('Open a separate cash box for each class','Work out what all the tickets in each class earned together.'),
      step('Compare the boxes',`Class ${label} has the biggest total in the Money column.`,`${count} tickets × ₹${fare} = ₹${money}`)
    ],[best]);
  }
  const refund=q.question.match(/^All issued Harbour and Mill tickets are initially paid\. (\d+) Harbour tickets and four Mill tickets are refunded\. What are the combined net receipts for the two routes\?$/);
  if (refund) {
    const back=new Map([['Harbour',Number(refund[1])],['Mill',4]]);
    const group=data.filter(([label])=>back.has(label)).map(([label,count,fare])=>{
      const paid=count-back.get(label);
      return [label,paid,fare,paid*fare];
    });
    if (group.length!==2 || group.some(([,paid])=>paid<0)) return null;
    const paid=sum(group.map(row=>row[3]));
    return solved(paid,[
      step('Remove the tickets that got their money back','Take each refund away from that route’s ticket pile. The table shows the paid tickets left.'),
      step('Count what the seller keeps','Multiply the paid tickets by their route’s fare, then add the money still in both boxes.',
        `${group.map(row=>'₹'+row[3]).join(' + ')} = ₹${paid}`)
    ],[],group,'Tickets still paid after refunds');
  }
  return null;
}

function storageCapacity(q, table, rows) {
  const limit=number(table.note.match(/^Each zone holds at most (\d+) units\./)?.[1]);
  if (!Number.isFinite(limit) || rows.some(([,count])=>count<0||count>limit)) return null;
  const intro=picture('Picture shelves with a fixed number of spaces','Each zone is a shelf. The total number of spaces stays the same. Every stored item takes one space, and the rest are empty.');
  const solved=(answer,steps,data,caption,highlight,header='Stored')=>({
    answer,steps,picture:intro,rule:rule('Free spaces = total spaces − units stored'),
    working:working(['Zone',header,'Free spaces'],data,caption,highlight)
  });
  const data=rows.map(([zone,stored])=>[zone,stored,limit-stored]);
  const transfer=q.question.match(/^Zone 4 sends (\d+) units to Zone 1\. How many spaces are now free in Zone 4\?$/);
  if (transfer) {
    const index=data.findIndex(([zone])=>zone==='4');
    if (index<0) return null;
    const moved=Number(transfer[1]), old=data[index][1], stored=old-moved;
    if (stored<0) return null;
    const free=limit-stored;
    const after=data.map(([zone,count,spaces],i)=>i===index?[zone,stored,free]:
      zone==='1'?[zone,count+moved,spaces-moved]:[zone,count,spaces]);
    return solved(free,[
      step('Take the moved items off Zone 4’s shelf','Only the number of items stored changes on that shelf.',
        `${old} − ${moved} = ${stored} units still stored`),
      step('Count the empty spaces','Take the new stored count away from the shelf’s total space.',
        `${limit} − ${stored} = ${free} free spaces`)
    ],after,'Spaces after the move',[index],'Stored after move');
  }
  if (q.question==='What is the sum of the spare capacities of the three most occupied zones?') {
    const most=data.toSorted((a,b)=>b[1]-a[1]);
    if (most.length<3 || most[3]?.[1]===most[2][1]) return null;
    const chosen=most.slice(0,3), amounts=chosen.map(row=>row[2]);
    return solved(sum(amounts),[
      step('Pick the three shelves with the most items',`The biggest stored counts are in zones ${chosen.map(row=>row[0]).join(', ')}.`),
      step('Add the free spaces from just those shelves','The question first picks the zones by how full they are, then asks for their empty spaces.',
        `${amounts.join(' + ')} = ${sum(amounts)} free spaces`)
    ],data,'Free space in the three fullest zones',chosen.map(row=>data.indexOf(row)));
  }
  if (q.question==='A batch is split equally between Zones 2 and 3. What is the largest batch that fits without exceeding either capacity?') {
    const group=data.filter(([zone])=>['2','3'].includes(zone));
    if (group.length!==2) return null;
    const perZone=Math.min(group[0][2],group[1][2]);
    return solved(2*perZone,[
      step('Look at the shelf with less empty space',`The two zones must get the same number. The smaller free-space count is ${perZone}, so each half can have at most that many.`),
      step('Join the two equal halves','The bigger shelf can hold that many too. Double one half to get the biggest whole batch.',
        `2 × ${perZone} = ${2*perZone} units`)
    ],data,'Compare Zones 2 and 3',group.map(row=>data.indexOf(row)));
  }
  return null;
}

function scatterReview(q, rows) {
  if (rows.length<2) return null;
  const sorted=rows.toSorted((a,b)=>a[0]-b[0]);
  const [start,base]=sorted[0], [end,finish]=sorted.at(-1);
  if (end<=start || new Set(sorted.map(([x])=>x)).size!==sorted.length) return null;
  const slope=(finish-base)/(end-start);
  const correction=q.question==='The time for the 10-unit journey was overstated by five minutes. What is its corrected residual?';
  const data=sorted.map(([x,y])=>{
    const fitted=base+(x-start)*slope;
    const observed=y-(correction&&x===10?5:0);
    return [x,observed,fitted,observed-fitted];
  });
  const solved=(answer,steps,highlight=[])=>({
    answer,steps,rule:rule('Gap = measured time − time predicted by the line'),
    picture:picture('Picture a dot above a ruler','The straight line is a guide. The dot is the time someone actually recorded. Slide your finger up from one load and read the dot and the guide at that same load.'),
    working:working(['Load','Measured (min)','Predicted (min)','Gap (min)'],
      data.map(([x,y,f,gap])=>[x,show(y),show(f),signed(gap)]),
      correction?'Measurements after correcting the 10-unit row':'Measured times compared with the guide line',highlight)
  });
  const locate=data.findIndex(([x])=>x===(correction?10:30));
  if (q.question==='Which load is the observation furthest above the fitted reference line?' ||
      q.question==='At which load is the observation furthest above the fitted reference line?') {
    const best=largest(data,3);
    if (best<0 || data[best][3]<=0) return null;
    return solved(`${data[best][0]} crates`,[
      step('Draw the guide through the two end dots','Find how many minutes the guide rises for each unit of load.',
        `(${finish} − ${base}) ÷ (${end} − ${start}) = ${show(slope)} minute(s) per unit`),
      step('Look for the dot farthest above that guide',`The largest positive gap is ${show(data[best][3])} minutes. It appears at ${data[best][0]} crates.`)
    ],[best]);
  }
  if (correction || q.question==='By how many minutes does the observed time at 30 crates exceed the fitted value?') {
    if (locate<0 || (correction&&(start===10||end===10))) return null;
    const [x,y,f,diff]=data[locate];
    return solved(diff,[
      step('Read the guide at the chosen load','Start at the first dot and move along the straight line. Each extra load unit uses the same rise.',
        `${base} + (${x} − ${start}) × ${show(slope)} = ${show(f)} predicted minutes`),
      step('Compare the dot with the guide',correction?
        'Take five minutes off the recorded dot. The two end dots stayed put, so the guide still gives the same value there.':
        'Read the dot at the same load as the guide. Subtract the guide’s time to see how far above it the dot sits.',
        `${show(y)} − ${show(f)} = ${show(diff)} min`)
    ],[locate]);
  }
  if (q.question==='What is the average residual across the six observations, to the nearest tenth of a minute?') {
    const total=sum(data.map(row=>row[3])), mean=rounded(total/data.length,1);
    return solved(mean,[
      step('Find every signed gap','For each row, take the guide’s time away from the measured time. Dots below the guide contribute negative gaps.'),
      step('Add and share the gaps','Combine the gaps, then divide by how many dots there are.',
        `${show(total)} ÷ ${data.length} ≈ ${mean.toFixed(1)} min`)
    ],data.flatMap((row,i)=>row[3]!==0?[i]:[]));
  }
  return null;
}

export function rrbDataWalkthrough(q, choice) {
  if (q.section !== 'Data Analysis' || typeof q.question !== 'string') return null;
  const table=parseQuestionTable(q.table);
  if (!table) {
    if (q.figure?.type !== 'scatter' || !Array.isArray(q.figure.labels) || !Array.isArray(q.figure.values) ||
      q.figure.labels.length!==q.figure.values.length ||
      !q.passage?.startsWith('For this trial, a fitted comparison line through the observations at 10 and 60 crates is used as a reference.')) return null;
    const rows=q.figure.labels.map((label,i)=>[number(label),q.figure.values[i]]);
    if (rows.some(row=>row.some(value=>!Number.isFinite(value)))) return null;
    const loads=rows.map(row=>row[0]);
    if (Math.min(...loads)!==10 || Math.max(...loads)!==60) return null;
    const result=scatterReview(q,rows);
    return result && verifies(result.answer,choice)?result:null;
  }
  const rows=table.rows.map(([label,...values])=>[label,...values.map(number)]);
  if (new Set(rows.map(row=>row[0])).size!==rows.length || rows.some(row=>row.slice(1).some(value=>!Number.isFinite(value)))) return null;
  const header=table.headers.join('|');
  let result;
  if (header==='Unit|Period 1 target|% attained|Period 2 target|% attained') result=outputFromTargets(q,rows);
  if (header==='Lane|Capacity per shift|Morning arrivals|Evening arrivals') result=laneComparisons(q,rows);
  if (header==='Window|Passengers observed') result=waitWindows(q,rows);
  if (header==='Station|Scheduled|On time'||header==='Station|Departures|On time') result=punctuality(q,rows,false);
  if (header==='Group|Scheduled|Late') result=punctuality(q,rows,true);
  if (['Delay (minutes)|Services','Wait (min)|Frequency','Waiting time (min)|Observations'].includes(header)) result=frequencyReview(q,rows);
  if (header==='Ticket class|Tickets|Fare (₹)') result=fares(q,rows,false);
  if (header==='Route|Unit fare (₹)|Tickets issued') result=fares(q,rows,true);
  if (header==='Zone|Units currently stored') result=storageCapacity(q,table,rows);
  if (header==='Load units|Journey minutes' && table.note.startsWith('Use the straight reference line through the first and last observations.')) {
    const points=rows.map(([x,y])=>[number(x),y]);
    if (points.every(([x])=>Number.isFinite(x))) result=scatterReview(q,points);
  }
  if (!result || !verifies(result.answer,choice)) return null;
  return result;
}
