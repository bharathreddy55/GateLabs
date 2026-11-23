import { item, near, quantity as q, rotate, sum, table } from './items.mjs';

const rounded=(n,d)=>Number((n/d).toFixed(1));
const matchesRounded=(value,n,d)=>near(value,rounded(n,d));

function facilities(k) {
  const single=[37+k,29+k,24+2*k],pairs=[14+k,9+k,10+k],triple=6+k,none=8+k;
  const [a,b,c]=single, [ab,ac,bc]=pairs;
  const A=a+ab+ac+triple, B=b+ab+bc+triple, C=c+ac+bc+triple;
  const total=sum(single)+sum(pairs)+triple+none;
  const context=table('Library service survey','Reported group | Count',[
    ['All respondents',total],['Reserve a desk (A)',A],['Borrow equipment (B)',B],['Attend workshops (C)',C],
    ['A and B',ab+triple],['A and C',ac+triple],['B and C',bc+triple],['All three',triple]
  ],'Pairwise figures include respondents who used all three. Survey totals count each individual once.');
  return [
    q('Exactly two services','How many respondents used two of the listed services and no third service?',sum(pairs),
      [sum(pairs)+triple,sum(pairs)+2*triple,sum(pairs)-triple],
      v=>near(v+3*triple,ab+ac+bc+3*triple),
      [`Each of the three pair totals includes the same ${triple} triple users. Subtract those users from each pair.`,`The exclusive pairs contain ${ab}, ${ac} and ${bc} users. Add them.`],' respondents',context),
    q('Set union with a restricted base','Of those who used at least one service, what share used workshops, to one decimal place?',
      rounded(100*C,total-none),[rounded(100*C,total),rounded(100*c,total-none),rounded(100*(C-triple),total-none)],
      v=>matchesRounded(v,100*C,sum(single)+sum(pairs)+triple),
      [`Inclusion–exclusion gives ${total-none} distinct users of at least one service.`,`Use all ${C} workshop users in the numerator, including those who used other services.`],'%',context),
    q('Complement of a two-set union','How many respondents used neither desks nor equipment, whether or not they attended workshops?',
      c+none,[none,c+none+triple,c+none+bc],
      v=>v+A+B-(ab+triple)===total,
      [`A ∪ B contains ${A} + ${B} − ${ab+triple} people. Subtract it from the survey total of ${total}.`,`The remainder consists of workshop-only users and respondents using none.`],' people',context),
    q('Corrected survey record',`${Math.min(7,k+2)} of the workshop-only records were recoded to show desk use as well. How many workshop users now used more than one service?`,
      ac+bc+triple+Math.min(7,k+2),[ac+bc+triple,ac+bc+2*triple+Math.min(7,k+2),ac+bc+triple+2*Math.min(7,k+2)],
      v=>C-v===c-Math.min(7,k+2),
      ['The number of workshop users is unchanged. The recoding turns workshop-only users into workshop-plus-desk users.', 'Subtract the corrected workshop-only count from the workshop total.'],' users',context)
  ];
}

function quality(k) {
  const labels=['Elm','Fir','Maple','Oak','Pine'];
  const checks=[120+10*k,150+10*k,160+10*k,140+10*k,170+10*k], fails=[9+k,15+k,12+k,7+k,11+k];
  const context={...table('Component checks by lot','Lot | Components checked',labels.map((label,i)=>[label,checks[i]])),
    figure:{type:'bar',title:'Components rejected in each lot',labels,values:fails}};
  const total=sum(checks), failed=sum(fails), row=checks[1]-fails[1];
  return [
    q('Aggregate quality rate','Calculate the rejection rate across all five lots, to one decimal place.',
      rounded(100*failed,total),[rounded(100*failed,total-failed),rounded(100*sum(fails.slice(0,-1)),total),rounded(100*Math.max(...fails),total)],
      v=>matchesRounded(v,100*failed,total),
      [`The bars give ${failed} rejections in all. The table gives ${total} checked units in all.`, 'Calculate 100 × rejections ÷ checked units.'],'%',context),
    q('Corrected rate comparison','Four units rejected in the Fir lot are reclassified as passing. What is the new Fir pass count?',
      row+4,[row-4,row,checks[1]-4],v=>v+fails[1]-4===checks[1],
      [`Fir has ${checks[1]} inspected pieces. The corrected rejection count is ${fails[1]} − 4.`, 'Subtract corrected rejections from all checked components.'],' passes',context),
    q('Percentage-point effect','Eight more units pass a repeat check, with the original number checked unchanged. By how many percentage points does the overall pass rate increase, to one decimal place?',
      rounded(800,total),[rounded(800,checks[0]),8,rounded(1600,total)],
      v=>matchesRounded(v,100*(total-failed+8)/total-100*(total-failed)/total,1),
      [ 'The denominator stays fixed. The numerator increases by eight.',`Multiply 8 ÷ ${total} by 100 and report a percentage-point change.`],' percentage points',context),
    q('Meeting a rejection threshold',`What is the minimum number of Elm rejections that must be turned into passes to reach at most ${fails[0]-3} rejected components per ${checks[0]} checks, if the check count is fixed?`,
      3,[1,2,4],v=>fails[0]-v<=fails[0]-3&&fails[0]-(v-1)>fails[0]-3,
      [`The target rate corresponds to at most ${fails[0]-3} rejections at the given denominator.`, 'Subtract this maximum from the original count.'],' reclassifications',context)
  ];
}

function routes(k) {
  const prices=[18,24,36,42], amounts=[50+k,65+2*k,32+k,29+3*k];
  const names=['Harbour','Market','Park','Mill'];
  const context=table('Tickets issued before refunds','Route | Unit fare (₹) | Tickets issued',names.map((name,i)=>[name,prices[i],amounts[i]]),
    'All tickets were paid in full at issue. Any refund stated in a question is complete.');
  const receipts=prices.map((p,i)=>p*amounts[i]);
  return [
    q('Net receipts after refunds',`All issued Harbour and Mill tickets are initially paid. ${k+5} Harbour tickets and four Mill tickets are refunded. What are the combined net receipts for the two routes?`,
      receipts[0]+receipts[3]-18*(k+5)-4*42,
      [receipts[0]+receipts[3]-18*(k+5),receipts[0]+receipts[3]-4*42,receipts[0]+receipts[3]+18*(k+5)-4*42],
      v=>v===(amounts[0]-k-5)*18+(amounts[3]-4)*42,
      ['Subtract each route’s refunds from its issued ticket count.', 'Multiply by each route’s fare and add the net receipts.'],' rupees',context),
    q('Price change with fixed demand','Park raises its fare by ₹3 with its issued count unchanged. How much extra revenue comes from Park?',
      amounts[2]*3,[amounts[2]*2,amounts[0]*3,receipts[2]+amounts[2]*3],
      v=>v+receipts[2]===(prices[2]+3)*amounts[2],
      [`Each of the ${amounts[2]} tickets now brings in three additional rupees.`, 'Multiply the increase per ticket by the number sold.'],' rupees',context),
    q('Reclassification between fare groups',`Exactly ${k+7} recorded Market tickets were actually Mill tickets. How much additional revenue should the corrected records show?`,
      (k+7)*18,[(k+7)*24,(k+7)*42,(k+7)*12],
      v=>v+(k+7)*24===(k+7)*42,
      ['Moving a ticket from Market to Mill changes its fare from ₹24 to ₹42.',`Multiply the ₹18 difference by ${k+7} replacements.`],' rupees',context),
    q('Weighted ticket price','Across all sold tickets on the four routes, what average fare was collected before refunds, to one decimal place?',
      rounded(sum(receipts),sum(amounts)),[rounded(sum(receipts),sum(amounts))===30?42:30,rounded(sum(receipts),sum(amounts)+10),rounded(sum(receipts),sum(amounts)-10)],
      v=>matchesRounded(v,sum(receipts),sum(amounts)),
      [`Compute the total receipts of ₹${sum(receipts)} by weighting each fare by tickets sold.`,`Divide by the total of ${sum(amounts)} tickets.`],' rupees per ticket',context)
  ];
}

function delays(k) {
  const values=[3,7,11,15,19], counts=[4+k,7+k,8+k,4+k,2+k], total=sum(counts),minutes=sum(values.map((v,i)=>v*counts[i]));
  const context=table('Dispatch delay distribution','Delay (minutes) | Services',values.map((v,i)=>[v,counts[i]]));
  const target=8, upcoming=minutes-target*total;
  const low=counts[0]+counts[1];
  return [
    q('Pooling a distribution with a fixed target',`How many additional delay-minutes above the 8-minute target did the observed services contribute in total? Include the below-target services as negative contributions.`,
      upcoming,[upcoming+total,minutes,upcoming-total],v=>v+8*total===minutes,
      [`The observed delay-minute total is ${minutes}. The target total is 8 × ${total}.`, 'Subtract the second total from the first.'],' delay-minutes',context),
    q('Median from a frequency table','What is the median dispatch delay across the displayed services?',
      11,[7,15,19],v=>{
        const sorted=values.flatMap((time,i)=>Array(counts[i]).fill(time));
        return near(v,(sorted[Math.floor(total/2)]+sorted[Math.floor((total-1)/2)])/2);
      },
      [`The cumulative count below 11 minutes is ${low}. Including 11 minutes brings it to ${low+counts[2]}.`, 'The middle observation or both central observations fall in that group.'],' min',context),
    q('Changing the upper tail',`One delay recorded as 19 minutes was really 7 minutes. By how many minutes does the total delay fall?`,
      12,[7,19,26],v=>minutes-v===minutes-19+7,
      ['Remove the incorrect 19-minute observation from the sum and add the corrected 7 minutes.', 'The difference is 12 minutes.'],' total minutes',context),
    q('Conditional counts in a distribution','If one service is drawn from those delayed more than seven minutes, what is the probability it was delayed exactly 15 minutes, as a percentage to one decimal place?',
      rounded(100*counts[3],total-low),[rounded(100*counts[3],total),rounded(100*counts[3],total-counts[0]),rounded(100*counts[4],total-low)],
      v=>matchesRounded(v,100*counts[3],sum(counts.slice(2))),
      [`Restrict the denominator to delay groups 11, 15 and 19. That leaves ${total-low} services.`,`The favourable group has ${counts[3]} services.`],'%',context)
  ];
}

function allocations(k) {
  const labels=['Tools','Repairs','Safety','Training','Stores'];
  const angles=[82+k,104-k,68,54,52], total=3600+720*k, rate=total/360;
  const context={passage:`The present annual cost is ₹${total}. The chart labels each category’s share in degrees.`,
    figure:{type:'pie',title:'Breakdown of annual costs',labels,values:angles}};
  const angle=(angles[1]-angles[0])/2;
  return [
    q('Pie chart and refunds','Repairs gets a refund equal to 10% of its original allocation. What cash amount is refunded?',
      angles[1]*rate/10,[angles[1]*rate/5,angles[0]*rate/10,total/10],
      v=>near(v*10*360,angles[1]*total),
      [`Repairs occupies ${angles[1]}° of the full circle, giving an original value of ₹${angles[1]*rate}.`, 'Take ten percent of that amount.'],' rupees',context),
    q('Shares after a transfer','Training transfers ₹72 to Stores with the same total annual cost. By how many degrees does the Stores slice increase, to one decimal place?',
      rounded(72,rate),[rounded(36,rate),rounded(144,rate),rounded(72,total/100)],
      v=>matchesRounded(v,72*360,total),
      [`At ₹${rate} per degree, divide ₹72 by that amount.`, 'The overall denominator stays constant during the transfer.'],'°',context),
    q('Equalising two sectors','If the total stays fixed, by how many degrees must the larger of Tools and Repairs shrink to make the two sectors equal after transferring that share to the smaller one?',
      Math.abs(angle),[Math.abs(angle)*2,Math.abs(angle)+2,Math.abs(angle)+1],
      v=>near(Math.max(...angles.slice(0,2))-v,Math.min(...angles.slice(0,2))+v),
      [`The difference between the two original sectors is ${Math.abs(angle)*2}°.`, 'A transfer reduces the larger by the same amount that it increases the smaller. Move half of the gap.'],' degrees',context),
    q('Combined slice allocation','What fraction of the combined Safety and Stores budget belongs to Safety? Express the answer as a percentage to one decimal place.',
      rounded(100*angles[2],angles[2]+angles[4]),[rounded(100*angles[4],angles[2]+angles[4]),rounded(100*angles[2],360),rounded(100*angles[2],angles[2]+angles[3])],
      v=>matchesRounded(v,100*angles[2]*rate,(angles[2]+angles[4])*rate),
      ['Safety and Stores together occupy 120°. Safety occupies 68°.', 'Use the combined slice as the denominator.'],'%',context)
  ];
}

function journey(k) {
  const load=[0,5,10,15,20,25], time=load.map(n=>18+k+2*n), spike=8+k;
  time[2]+=spike;
  const context={...table('Trial journeys','Load units | Journey minutes',load.map((n,i)=>[n,time[i]]),
    'Use the straight reference line through the first and last observations. A residual is observed time minus reference time.'),
    figure:{type:'scatter',title:'Journey time by load',labels:load.map(String),values:time}};
  return [
    q('Slope of a reference line','According to the reference line, how much additional time is predicted for a 10-unit load increase?',
      20,[10,25,50],v=>near(v/10,(time[5]-time[0])/(load[5]-load[0])),
      [`The line increases by ${time[5]-time[0]} minutes over ${load[5]-load[0]} units.`, 'Multiply its slope by the requested 10-unit increase.'],' predicted minutes',context),
    q('Correcting a residual','The time for the 10-unit journey was overstated by five minutes. What is its corrected residual?',
      spike-5,[spike,spike+5,spike-2],v=>v+time[0]+10*(time[5]-time[0])/25===time[2]-5,
      [`The fit at 10 units is the starting time plus 20 minutes.`, 'The original residual loses five minutes because the endpoint-based fit did not change.'],' residual minutes',context),
    q('Mean residual for one outlier','What is the average residual across the six observations, to the nearest tenth of a minute?',
      rounded(spike,6),[rounded(spike,5),rounded(spike-3,6),rounded(spike+5,6)],
      v=>matchesRounded(v,sum(time.map((observed,i)=>observed-time[0]-2*load[i])),6),
      [ 'The reference line passes through every observation except the one at 10 units.',`Sum the six residuals to get ${spike} and divide by six.`],' min',context),
    item('Limits of prediction','Which statement about a 30-unit journey is justified by these observations?',
      'The reference line can produce a prediction at 30 units, but its accuracy outside the observed range is untested.',
      ['The reference line guarantees a 30-unit journey will follow the same rate.','The 30-unit journey must take the same time as the 25-unit journey.','The observed 10-unit residual rules out making any numerical prediction.'],
      answer=>answer.includes('accuracy outside')&&30>Math.max(...load),['The largest observed load is 25 units.', 'Using the reference line at 30 units extrapolates beyond the sample, so treat its accuracy as untested.'],context)
  ];
}

function capacity(k) {
  const levels=[40+k,48+k,58+k,66+k,70+k], limit=72+k, transfer=7+k%12;
  const context=table('Storage occupancy in five zones','Zone | Units currently stored',levels.map((n,i)=>[i+1,n]),
    `Each zone holds at most ${limit} units. A consignment sent to one zone counts against that zone’s limit.`);
  const free=levels.map(value=>limit-value);
  return [
    q('Pooled spare capacity','What is the sum of the spare capacities of the three most occupied zones?',
      sum(free.slice(2)),[sum(free.slice(0,3)),sum(free.slice(1,4)),free[3]+free[4]],
      v=>v+sum(levels.slice(2))===3*limit,
      ['The three most occupied zones are 3, 4 and 5.',`Subtract their total occupancy from three times the common limit of ${limit}.`],' units of space',context),
    q('Transfer and a fixed limit',`Zone 4 sends ${transfer} units to Zone 1. How many spaces are now free in Zone 4?`,
      free[3]+transfer,[free[3],free[3]+transfer-2,free[3]+transfer+4],v=>v+levels[3]-transfer===limit,
      [`Zone 4 loses ${transfer} units while its limit remains ${limit}.`, 'Its free space grows by precisely the size of the transfer.'],' spaces',context),
    q('Removing occupancy above a threshold','What is the minimum number of units that must be removed to leave at least 10 empty spaces in each zone?',
      12,[8,14,18],v=>v===sum(levels.map(n=>Math.max(0,n-(limit-10)))),
      [`The occupancy threshold is ${limit-10}. Only Zones 4 and 5 exceed it.`, 'Remove the excess of 4 units from Zone 4 and 8 units from Zone 5.'],' removals',context),
    q('Even allocation to two zones','A batch is split equally between Zones 2 and 3. What is the largest batch that fits without exceeding either capacity?',
      2*free[2],[free[1]+free[2],2*free[1],free[2]],
      v=>v%2===0&&v/2<=Math.min(free[1],free[2])&&(v+2)/2>Math.min(free[1],free[2]),
      ['Each zone must receive the same number of units.',`Zone 3 has only ${free[2]} spaces, fewer than Zone 2. The combined batch can contain twice that number.`],' units in the batch',context)
  ];
}

function ticketMix(k) {
  const n=100+6*k, diff=2*k+8, expected=(n+diff)/2;
  const context={passage:`At a depot, counters X and Y jointly issued exactly ${n} permits. Each permit was issued by one counter, and the number issued at each counter is a whole number.`};
  const candidates=Array.from({length:n+1},(_,i)=>i);
  const possibilities=(includeI,includeII)=>candidates.filter(x=>candidates.some(y=>
    (!includeI||x+y===n)&&(!includeII||y===n-expected))).length;
  const sufficiency=[
    ['Both statements together are needed.',()=>possibilities(true,true)===1&&possibilities(true,false)>1&&possibilities(false,true)>1],
    ['Only statement I is sufficient.',()=>possibilities(true,false)===1&&possibilities(false,true)>1],
    ['Only statement II is sufficient.',()=>possibilities(false,true)===1&&possibilities(true,false)>1],
    ['Even both statements leave different possible counts.',()=>possibilities(true,true)>1]
  ];
  return [
    q('Combining total and difference',`Counter X issued ${diff} more permits than counter Y. How many permits did X issue?`,
      expected,[expected-2,expected+2,n-expected],v=>v-(n-v)===diff,
      [`Write X + Y = ${n} and X − Y = ${diff}. Adding the equations gives 2X = ${n+diff}.`,`Divide by two to find X = ${expected}.`],' permits',context),
    q('Determining a feasible range',`Both counters issued at least ${k+18} permits. Permit counts are integers. How many different values could be the count at X?`,
      n-2*(k+18)+1,[n-2*(k+18),n-2*(k+18)+2,n-(k+18)],
      v=>v===Array.from({length:n+1},(_,x)=>x).filter(x=>x>=k+18&&n-x>=k+18).length,
      [`The smallest X is ${k+18}. The largest is ${n-(k+18)}, when only the minimum goes to Y.`, 'Count both endpoints of this integer interval.'],' possible values',context),
    q('Rebalancing a difference',`X starts with ${diff} more permits than Y. How many permits must be moved from X to Y so that Y ends with six more than X?`,
      (diff+6)/2,[diff+6,(diff+6)/2+2,(diff+6)/2-2],v=>diff-2*v===-6,
      [`The signed gap X − Y goes from +${diff} to −6.`, 'One transfer lowers X by one and raises Y by one, so the gap decreases by two each time.'],' permits moved',context),
    item('Data sufficiency',`Determine X’s count using these statements. I. The counters together issued ${n} permits. II. Y issued ${n-expected} permits. For this question, use only the statements selected in an option.`,
      sufficiency[0][0],sufficiency.slice(1).map(([label])=>label),
      option=>sufficiency.find(([label])=>option===label)[1](),
      ['A total alone permits several splits. Y’s count alone leaves X undetermined.',`Together they give X = ${n} − ${n-expected} = ${expected}.`])
  ];
}

export function data(k,full) {
  const groups=[facilities,quality,routes,delays,allocations,journey,capacity,ticketMix].map(build=>build(k));
  if (!full) return rotate(groups,k).slice(0,6).map((group,i)=>group[(k+i)%4]);
  return rotate(groups,k).flatMap((group,i)=>rotate(group,k+i).slice(0,i<2?3:4));
}
