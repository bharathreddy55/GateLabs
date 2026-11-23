const sum = rows => rows.reduce((a,b)=>a+b,0);
const percentage = (n,d) => (100*n/d).toFixed(1)+'%';
const table = (title, header, rows, note='') => ({
  table:[title,header,...rows.map(row=>row.join(' | ')),note].filter(Boolean).join('\n')
});
const q = (topic,stem,key,wrong,why,context) => [topic,stem,key,wrong,why,context];

function despatch(k) {
  const target=30+k*2;
  const rows=[['North',target+20,target-2,target+2],['East',target+12,target-1,target-5],
    ['South',target+25,target+3,target-9],['West',target+14,target-4,target-6]];
  const context=table('Parcels at a consolidation depot','Lane | Capacity per shift | Morning arrivals | Evening arrivals',rows,
    'Each capacity is reset at the start of a shift. Unused morning capacity cannot carry forward.');
  const morning=rows.map(r=>r[2]), evening=rows.map(r=>r[3]);
  return [
    q('Multi-source data','A batch of 19 extra parcels goes to the morning lane with the smallest total capacity that can accept the entire batch. How many spaces remain in that lane afterwards?',
      3,[1,6,22],'Available morning spaces are 22, 13, 22 and 18. Both North and South qualify, but North has the smaller total capacity. Its remaining space is 22 − 19 = 3.',context),
    q('Comparing change and level','Which lane has the greatest drop in arrivals from morning to evening?',
      'South',['North','East','West'],'Subtract evening from morning for each lane: North −4, East 4, South 12, West 2. The largest decrease is 12.',context),
    q('Weighted utilisation','What percentage of the combined East and West capacity is used on the evening shift, to one decimal place?',
      percentage(evening[1]+evening[3],rows[1][1]+rows[3][1]),
      [percentage(morning[1]+morning[3],rows[1][1]+rows[3][1]),percentage(evening[1]+evening[3],sum(rows.map(row=>row[1]))),percentage(evening[1]+evening[3],sum(evening))],
      `Use the two relevant lanes only. Evening arrivals total ${evening[1]+evening[3]} and the combined capacity is ${rows[1][1]+rows[3][1]}.`,context),
    q('Counterfactual allocation','Six evening parcels are diverted from North to East. By how much does the combined spare capacity of North and East change that evening?',
      'It stays the same.',['It increases by 6 parcels.','It falls by 6 parcels.','It increases by 12 parcels.'],
      'The transfer changes each lane’s occupancy in opposite directions. Their combined arrivals and combined capacity are unchanged.',context)
  ];
}

function queues(k) {
  const waits=[10+k,12+k,11+k,16+k,14+k,13+k];
  const people=[10,15,10,25,20,20].map(n=>n*(1+k%3));
  const labels=['09:00','09:30','10:00','10:30','11:00','11:30'];
  const total=sum(people), weighted=sum(waits.map((wait,i)=>wait*people[i]));
  const context={...table('Passenger wait survey','Window | Passengers observed',labels.map((label,i)=>[label,people[i]])),
    figure:{type:'line',title:'Average wait in each time window (minutes)',labels,values:waits}};
  const before=people.slice(0,3).reduce((acc,n,i)=>acc+n*waits[i],0);
  const after=weighted-before;
  return [
    q('Cross-reference chart and table','What is the average wait across all observed passengers, rounded to one decimal place?',
      (weighted/total).toFixed(1),[(sum(waits)/waits.length).toFixed(1),((weighted+9*total/5)/total).toFixed(1),((weighted-total)/total).toFixed(1)],
      `Weight each plotted mean by the corresponding window’s passenger count. The sum of waiting minutes is ${weighted}, over ${total} passengers.`,context),
    q('Choosing the right measure','Which window contributes the most total passenger-minutes of waiting?',
      '10:30',['09:30','11:00','11:30'],`Multiply wait by people in each window: ${waits.map((wait,i)=>wait*people[i]).join(', ')}. The fourth product is largest.`,context),
    q('Comparing pooled observations','Among all waiting minutes, what share belongs to observations from 10:30 onward, to one decimal place?',
      percentage(after,weighted),[percentage(before,weighted),percentage(sum(people.slice(3)),total),percentage(waits[3]+waits[4]+waits[5],sum(waits))],
      `The last three windows contribute ${after} total minutes. Divide by ${weighted}, which pools minutes from all windows.`,context),
    q('Correcting a sample mean','A 10:30 passenger’s wait had been recorded six minutes too low. How much does that window’s average wait increase?',
      `6/${people[3]} min`,[`6/${total} min`,'6 min',`1/${people[3]} min`],
      `There are still ${people[3]} passengers in that window. Only the total wait increases, by six minutes.`,context)
  ];
}

function samples(k) {
  const baseline=17+k, loads=[10,20,30,40,50,60];
  const errors=[0,2,4,6,8,10].map(n=>n+baseline);
  errors[2]+=7+(k%4);
  const context={
    passage:'For this trial, a fitted comparison line through the observations at 10 and 60 crates is used as a reference. Deviation means observed minus fitted time. The sample contains one observation per load.',
    figure:{type:'scatter',title:'Dispatch time (minutes) by load (crates)',labels:loads.map(String),values:errors}
  };
  const lift=errors[2]-(baseline+4);
  return [
    q('Scatter plot and a trend','At which load is the observation furthest above the fitted reference line?',
      '30 crates',['20 crates','40 crates','60 crates'],'The line rises two minutes per ten crates. All plotted observations lie on it except the 30-crate observation, which is higher.',context),
    q('Reading a residual','By how many minutes does the observed time at 30 crates exceed the fitted value?',
      lift,[lift-2,lift+4,lift+8],`Interpolate between the endpoints: at 30 crates the fit predicts ${baseline+4}. The point is at ${errors[2]}, a positive difference of ${lift}.`,context),
    q('Inference and prediction','The pattern is used to estimate the effect of moving from 60 to 70 crates. What is the important qualification?',
      'The estimated trend is being extended beyond the observed load range.',['Using a fitted line proves the time will follow it exactly.','An unusual point below 60 rules out every estimate at 70.','The mean observed dispatch time is automatically the estimate at 70.'],
      'The plot ends at 60 crates. The fit can be extended, but it has not been verified at higher loads.',context),
    q('Robust comparison','Which summary is unaffected if the 30-crate recorded time is corrected upward by a further five minutes?',
      'The fitted line based on the two specified endpoints.',['The overall average recorded time.','The maximum recorded time.','The positive residual at 30 crates.'],
      'The reference line uses only the 10- and 60-crate observations. The 30-crate correction changes its residual, the overall mean and the maximum.',context)
  ];
}

function expenditure(k) {
  const total=9000+3600*k, angles=[94+k,86-k,74,68,38];
  const labels=['Wages','Power','Parts','Testing','Training'];
  const unit=total/360;
  const context={passage:`The annual budget is ₹${total}. Each pie segment label gives its angle in degrees. A revised budget keeps the rupee amount for Testing unchanged.`,
    figure:{type:'pie',title:'Original budget shares in degrees',labels,values:angles}};
  return [
    q('Weighted pie interpretation','If the revised total budget rises by 25%, by what factor is the testing angle multiplied?',
      '4/5',['5/4','3/4','1/4'],'Its rupee allocation stays fixed and its denominator becomes 1.25 times as large. Its angle is multiplied by 1/1.25.',context),
    q('Combining proportions','What fraction of the combined Parts and Training allocation goes to Training?',
      '19/56',['19/37','19/36','37/56'],'The two angles are 74° and 38°. The relevant fraction is 38/(74+38) = 19/56.',context),
    q('Changing two shares','With the original total unchanged, how much must move from Wages to Power to make their allocations equal?',
      `₹${(4+k)*unit}`,[`₹${(8+2*k)*unit}`,`₹${(2+k)*unit}`,`₹${(6+k)*unit}`],
      `The angular difference is ${8+2*k}°. Transferring one rupee reduces one allocation and increases the other. Move half the difference at ₹${unit} per degree.`,context),
    q('Change relative to an original share','To lift Training to 15% of the original total while leaving that total fixed, what additional angle must be assigned to it?',
      '16°',['15°','18°','54°'],'A 15% share occupies 54°. Its current angle is 38°, so the difference is 16°.',context)
  ];
}

function memberships(k) {
  const all=3+k, ab=all+7, ac=all+6, bc=all+5;
  const a=ab+ac-all+12, b=ab+bc-all+9, c=ac+bc-all+11;
  const union=a+b+c-ab-ac-bc+all, total=union+11+k%4;
  const context=table('Responses to a community facilities survey','Reported group | Residents',
    [['Survey total',total],['Use sports hall (A)',a],['Use park (B)',b],['Use reading room (C)',c],['Use A and B',ab],['Use A and C',ac],['Use B and C',bc],['Use all three',all]],
    'Inclusive pair counts contain residents who used all three facilities.');
  return [
    q('Inclusion–exclusion','How many surveyed residents used none of the three facilities?',
      total-union,[total-union+all,total-union-2,total-union+3],`Compute the union as ${a}+${b}+${c}−${ab}−${ac}−${bc}+${all} = ${union}. Subtract it from all ${total} respondents.`,context),
    q('Exclusive membership','Which single facility has the greatest number of people who use it exclusively?',
      'Sports hall',['Park','Reading room','Park and reading room are tied'],
      'Subtract the two pair intersections from each facility total and add back the triple intersection. The exclusive counts for A, B and C are 12, 9 and 11.',context),
    q('Conditional proportion','Among people who use both B and C, what percentage also uses A, to one decimal place?',
      percentage(all,bc),[percentage(all,b),percentage(all,c),percentage(all,ab+ac+bc)],
      `The numerator is the triple intersection ${all}. The relevant denominator is the inclusive B–C overlap ${bc}.`,context),
    q('Comparing exclusive and inclusive sets','Which calculation counts residents who use exactly two facilities?',
      'A∩B + A∩C + B∩C minus three times the triple intersection.',
      ['A∩B + A∩C + B∩C minus the triple intersection.','A∩B + A∩C + B∩C plus the triple intersection.','A∩B + A∩C + B∩C minus twice the triple intersection.'],
      'A resident in all three appears three times in the three inclusive pair counts. Remove all three appearances to count exactly two.',context)
  ];
}

function supply(k) {
  const n=40+4*k, pool=n+12, smaller=n/2-3, higher=n/2+3;
  const context=table('Boxes sent to P and Q before reallocation','Depot | Opening capacity', [['P',pool],['Q',pool+3],['Shared overnight stock',n]],
    'The shared stock is split in whole boxes. The capacity limits apply to the overnight split.');
  return [
    q('Data sufficiency','How many boxes went to P? Statement I: P received six more boxes than Q. Statement II: Q received fewer boxes than P.',
      'Statement I alone determines the split.',['Statement II alone determines the split.','Both statements are needed to determine the split.','Even together the statements leave more than one split.'],
      `Together with P+Q = ${n}, the exact difference gives P = ${higher} and Q = ${smaller}. A comparison without a difference is insufficient.`,context),
    q('Determining feasible allocation','If each depot must receive at least one third of the overnight stock, rounded up, how many more boxes can one depot receive than the other at most?',
      n-2*Math.ceil(n/3),[n-Math.ceil(n/3),n-2*Math.floor(n/3)-1,Math.ceil(n/3)+2],
      `To maximise the gap, give one depot the smallest permissible allocation, ${Math.ceil(n/3)}, and the other the rest. Subtract the smaller allocation from the larger.`,context),
    q('Transfer across categories','When P originally receives six more boxes than Q, how many boxes must be moved from P to Q for Q to finish with four more than P?',
      5,[3,4,10],'P−Q starts at +6 and must become −4. Each transfer of one box reduces the difference by two, so five boxes must move.',context),
    q('Maximum consistent change','By how much can Q’s received amount vary across all permissible splits if both depots must receive at least two boxes, with no additional minimum?',
      n-4,[n-2,n-1,n-6],`Q can receive from 2 up to ${n-2}. Neither capacity binds. The difference between the extremes is ${n-4}.`,context)
  ];
}

// Rotate the six data sources between tests. The retained question in each
// category is independently chosen from another setup in the original bank.
export function analyticalSets(k) {
  return [despatch,queues,samples,expenditure,memberships,supply].map(build=>build(k));
}
