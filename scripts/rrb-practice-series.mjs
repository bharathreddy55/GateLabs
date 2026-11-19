import { rrbReading } from './rrb-reading.mjs';

const labels = ['Anantapur','Bapatla','Chittoor','Dharmavaram','Eluru','Guntakal','Hindupur','Jammalamadugu','Kadapa','Kurnool','Madanapalle','Nandyal','Ongole','Pakala','Renigunta','Srikalahasti'];
const round = (n, digits=2) => n.toFixed(digits);
const pct = n => round(n,1)+'%';
const sum = values => values.reduce((a,b)=>a+b,0);
const money = n => '₹'+n;
const question = (topic,stem,answer,wrong,explanation,context) => [topic,stem,answer,wrong,explanation,context];
const numeric = (topic,stem,answer,wrong,explanation,unit='',context) =>
  question(topic,stem,answer+unit,wrong.map(n=>n+unit),explanation,context);

function scienceAndMath(k) {
  const n=(base)=>base+k;
  const gridHeight=n(10), radius=n(4);
  const amount=100*n(11), stock=7*n(18);
  const force=n(31), factor=n(3);
  const friction=5*n(2);
  const r1=n(2), r2=2*r1;
  const v=6*r1;
  const mass=n(5), distance=n(4);
  return [
    question('Successive discounts','A depot marks a spare part at '+money(amount)+'. It applies discounts of 20% and then 15%. What is the sale price?',money(68*n(11)),[65,70,72].map(p=>money(p*n(11))), 'Multiply the marked price by 0.8×0.85 = 0.68. The second discount applies to the reduced price.'),
    numeric('Successive sales','After selling 30% of its ticket stock, a depot has '+stock+' tickets. How many would remain if it then sold one-seventh of the remaining tickets?',6*n(18),[n(18),5*n(18),10*n(18)],'The second sale leaves six-sevenths of '+stock+'. The original stock is unnecessary for this step.'),
    numeric('Weighted average','The mean mass of '+(2*k+10)+' sacks is 41 kg. Four other sacks averaging '+(k+43)+' kg are added. What is the combined mean to two decimal places?',round(((2*k+10)*41+4*(k+43))/(2*k+14)),[round((41+k+43)/2),round(41),round(k+43)],'Add the two total masses before dividing by the new number of sacks.',' kg'),
    numeric('Time and work','P can complete a task in '+(6*k)+' days and Q in '+(12*k)+' days. They work together for '+k+' days. How many more days does Q need alone?',9*k,[3*k,8*k,10*k],'Together they complete k(1/(6k)+1/(12k)) = one-quarter. Q completes the remaining three-quarters in 9k days. Here k = '+k+'.',' days'),
    numeric('Relative velocity','A '+(24*n(3))+' m train travels at 72 km/h and passes a second train moving towards it at 36 km/h. If the entire pass takes '+n(3)+' seconds, how long is the second train?',6*n(3),[12*n(3),18*n(3),30*n(3)],'The combined speed is 30 m/s. Multiply by the passing time to get both lengths together and subtract the length of the first train.',' m'),
    numeric('Two-variable equations','A total of '+(12*k+30)+' tickets cost '+money(375*k+930)+'. Regular tickets cost ₹40 and concession tickets cost ₹25. How many regular tickets were sold?',5*k+12,[5*k+6,4*k+4,7*k+18],'Subtract what all concession tickets would cost from the actual total, then divide the difference by ₹15.'),
    numeric('Arithmetic progression','A waiting hall has '+(2*k+8)+' rows. The first row has 13 seats and each subsequent row has 3 more. How many seats are in the last four rows together?',4*(13+3*(2*k+7))-18,[4*(13+3*(2*k+7))-12,4*(13+3*(2*k+7))-24,4*(13+3*(2*k+7))],'The last four rows have L, L−3, L−6 and L−9 seats, where L is the final row count.'),
    numeric('LCM and offsets','A status display refreshes every '+(4*k)+' min and a timer every '+(6*k)+' min. Both refresh at 08:00. How many minutes after 08:00 do they refresh together for the third time, excluding 08:00?',36*k,[12*k,24*k,72*k],'The joint period is LCM(4k,6k) = 12k, with k = '+k+'. The third joint refresh is after three such periods.',' min'),
    question('Probability without replacement','There are '+n(4)+' red and '+n(7)+' blue tokens. Two are sampled without replacement. What is the probability of sampling two reds, to three decimals?',round(n(4)*n(3)/(n(4)+n(7))/(n(4)+n(7)-1),3),[round((n(4)/(n(4)+n(7)))**2,3),round(n(7)*n(6)/(n(4)+n(7))/(n(4)+n(7)-1),3),round(n(4)/(n(4)+n(7)),3)],'Multiply the probability of a red first by the conditional probability of another red after one has been removed.'),
    numeric('Volume by displacement','The water level in a cuboid tank of base '+(5*k)+' cm by 24 cm rises from 7 cm to '+gridHeight+' cm when an object is fully submerged. What is the object’s volume?',120*k*(gridHeight-7),[120*k*gridHeight,120*k*(gridHeight-6),120*k*(gridHeight-8)],'The object displaces the base area multiplied by the rise in water level.',' cm³'),
    numeric('Annular area','A circular island of radius '+radius+' m is surrounded by a walkway 3 m wide. What is the walkway area, in multiples of π?',6*radius+9,[6*radius,3*radius+9,9*radius+6],'Subtract the inner disk from the outer disk: (r+3)²−r² = 6r+9.','π m²'),
    question('Trigonometry','A '+(3*k)+' m vertical pole casts a '+(4*k)+' m shadow. From the shadow tip what is the cosine of the angle of elevation?','4/5',['3/5','3/4','5/4'],'The right triangle is a scaled 3–4–5 triangle. Cosine is the horizontal side over the hypotenuse.'),
    numeric('Unit conversion','A metal sheet measures '+(k+12)+' cm by 25 cm and is 4 mm thick. What is its volume?',10*(k+12),[100*(k+12),5*(k+12),25*(k+12)],'Convert the thickness to 0.4 cm. Multiplying it by the base area gives 10 times the first side length.',' cm³'),
    numeric('Combined density','A '+(12*k)+' cm³ sample of density 3 g/cm³ is combined with a '+(8*k)+' cm³ sample of density 5 g/cm³ without volume change. What is their combined density?',3.8,[4,4.2,5],'The mass is 36k+40k = 76k g and the volume is 20k cm³, where k = '+k+'. Divide to obtain the density.',' g/cm³'),
    numeric('Mass and weight','A component has a mass of '+mass+' kg. What is the decrease in weight when moved from a location with g = 10 m/s² to one with g = 8 m/s²?',2*mass,[mass,8*mass,10*mass],'Mass stays constant. Weight changes by the mass times the 2 m/s² difference in g.',' N'),
    numeric('Balanced forces','A '+mass+' kg trolley is pulled east by '+(7*mass)+' N and west by '+(4*mass)+' N. It starts at rest. How far does it travel in 4 s if the forces are constant?',24,[12,32,48],'The net force is 3 times the mass, giving 3 m/s² east. From rest, distance = ½×3×4².',' m'),
    numeric('Friction','A sliding crate is pulled with a horizontal force of '+(3*friction)+' N along '+distance+' m. Kinetic friction is '+friction+' N. What is the net work on the crate?',2*friction*distance,[friction*distance,3*friction*distance,4*friction*distance],'Only horizontal forces do work here. Their net value is twice the friction force in the direction of travel.',' J'),
    numeric('Work–energy','A '+mass+' kg object slows from 8 m/s to 4 m/s. Find the magnitude of net work done during braking.',24*mass,[8*mass,16*mass,32*mass],'The magnitude of the kinetic energy decrease is ½m(8²−4²) = 24m.',' J'),
    numeric('Power and efficiency','A lift raises a '+(5*mass)+' kg load by 3 m in 6 s at a steady speed. Take g = 10 m/s² and efficiency 75%. What input power is needed to the nearest watt?',Math.round(125*mass/.75),[Math.round(125*mass*.75),125*mass,250*mass],'Useful power is (5m)×10×3/6 = 125m watts. Divide by 0.75 to find the input power.',' W'),
    numeric('Moments','A '+(force*factor)+' N load acts 20 cm to the left of a frictionless pivot. A '+force+' N load counterbalances it on the right. What is the right-hand lever arm?',20*factor,[10*factor,20+factor,40*factor],'For equilibrium the moments are equal. The smaller force must have '+factor+' times the lever arm.',' cm'),
    numeric('Electrical circuits','Resistors of '+r1+' Ω and '+r2+' Ω are connected in series to '+v+' V. What power is delivered to the larger resistor?',8*r1,[4*r1,12*r1,18*r1],'Total resistance is '+(r1+r2)+' Ω. The series current is 2 A, so the larger resistor receives I²R = 4×'+r2+'.',' W'),
    numeric('Parallel circuits','Two '+r2+' Ω resistors are connected in parallel to '+v+' V. One branch opens. How much does the current drawn from the source decrease?',3,[1.5,4,6],'Each connected branch draws V/R = 3 A. Disconnecting one branch removes its 3 A contribution.',' A'),
    numeric('Electrical energy','A '+(0.25*k+1)+' kW appliance runs for 48 min each day for 10 days. What is its electricity cost at ₹6.50/kWh?',52+13*k,[65+16.25*k,39+9.75*k,26+6.5*k],'Forty-eight minutes is 0.8 hour. Multiply power by 8 hours total and then by ₹6.50/kWh.',' rupees'),
    numeric('Heat exchange','Mix '+(100*k)+' g of water at 75°C with '+(300*k)+' g at 15°C in an insulated vessel of negligible heat capacity. What is the equilibrium temperature?',30,[25,37.5,45],'The cooler water has triple the mass. The weighted mean is (75+3×15)/4.','°C'),
    numeric('Heating power','A heater transfers '+(900*k)+' J of energy into a '+(0.1*k).toFixed(1)+' kg metal block. If the temperature rises by 15°C, find the block’s specific heat capacity.',600,[450,900,1350],'Use c=Q/(mΔT), which gives '+900*k+' divided by '+(0.1*k).toFixed(1)+'×15.',' J/(kg·°C)'),
    numeric('Scale calibration','A linear sensor reads '+k+' units at 0°C and '+(100+2*k)+' units at 100°C. What is the reading at 40°C, to one decimal place?',round(k+.4*(100+k),1),[round(.4*(100+k),1),round(k+40,1),round(k+.6*(100+k),1)],'Add 40% of the change from zero to boiling to the sensor’s reading at 0°C.',' units'),
    numeric('Simple machines','An ideal pulley system has four rope segments supporting a '+(60*k)+' N load. What is the work done at the free end to raise the load 1.5 m?',90*k,[15*k,60*k,360*k],'In an ideal machine the input work equals the increase in potential energy: weight × height.',' J'),
    numeric('Median and perturbations','The ordered measurements are '+[k,k+3,k+6,k+8,k+10,k+15,k+20].join(', ')+'. The smallest is corrected to '+(k+25)+'. What is the new median?',k+10,[k+6,k+8,k+15],'The corrected value moves to the end. The old fifth observation becomes the new fourth observation.'),
    numeric('Bills and linear rates','A workshop pays a fixed fee of ₹'+(85+k)+' plus ₹7 per unit. It pays ₹'+(85+k+7*(30+2*k))+' total. What would the bill have been if it had used 6 fewer units?',85+k+7*(24+2*k),[85+k+7*(29+2*k),85+k+7*(27+2*k),85+k+7*(25+2*k)],'The fee is unchanged. Subtract 6×₹7 from the original bill.',' rupees'),
    numeric('Geometry and angles','Two adjacent interior angles of a parallelogram differ by '+(2*k)+'°. What is the larger angle?',90+k,[90,90+2*k,180-2*k],'Adjacent angles sum to 180°. The larger is 90° plus half their stated difference.','°')
  ];
}

function dataAnalysis(k,label) {
  const t=(title,header,rows)=>({table:[title+' · '+label+' (practice data)',header,...rows.map(row=>row.join(' | '))].join('\n')});
  const schedules=[100,120,150,170].map(n=>n+10*k);
  const delays=[10+k,24+k,15+2*k,34+k];
  const total=sum(schedules), late=sum(delays), timely=total-late;
  const punctual={...t('Service punctuality','Group | Scheduled | Late',schedules.map((n,i)=>['ABCD'[i],n,delays[i]])),
    figure:{type:'bar',labels:['A','B','C','D'],values:delays,title:'Late departures by service group'}};
  const f=[k+1,k+3,k+6,k+2,k];
  const times=[5,10,15,20,25], count=sum(f), mins=sum(f.map((n,i)=>n*times[i]));
  const frequency={...t('Queue observations','Wait (min) | Frequency',times.map((n,i)=>[n,f[i]])),
    figure:{type:'bar',labels:times.map(String),values:f,title:'Frequency by waiting time'}};
  const [a,b,c,ab,ac,bc,abc,none]=[21,18,14,13,8,9,6,10].map(n=>n+k);
  const setTotal=sum([a,b,c,ab,ac,bc,abc,none]);
  const sets=t('Course participation','Category | Workers',[
    ['Survey total',setTotal],['A',a+ab+ac+abc],['B',b+ab+bc+abc],['C',c+ac+bc+abc],
    ['A and B',ab+abc],['A and C',ac+abc],['B and C',bc+abc],['All three',abc]
  ]);
  sets.table+='\nTwo-course overlaps include workers who took all three.';
  const angles=[130+k,78-k,61,54,37], budget=3600*k;
  const pie={table:`Annual allocation · ${label} (practice data). Total: ${money(budget)}.`,
    figure:{type:'pie',labels:['Staff','Energy','Tracks','Facilities','Other'],values:angles,title:'Spending by category (sector angles in degrees)'}};
  const quantities=[120+10*k,96+6*k,145+5*k,140+8*k];
  const prices=[25,35,20,30];
  const receipts=quantities.map((n,i)=>n*prices[i]);
  const sales=t('Fare receipts','Ticket class | Tickets | Fare (₹)',quantities.map((n,i)=>['ABCD'[i],n,prices[i]]));
  return [
    question('Weighted rates','What was the combined on-time departure rate, to one decimal place?',pct(100*timely/total),[pct(100*(timely-10)/total),pct(100*(timely+10)/total),pct(100*(timely-20)/total)],`${timely} departures were on time out of ${total}. Compute 100×${timely}/${total}.`,punctual),
    numeric('Counterfactual rates','How many of the late group D trains must become on time for group D to reach 90% punctuality?',delays[3]-schedules[3]/10,[delays[3],schedules[3]/10,delays[3]+4],`At 90% punctuality at most ${schedules[3]/10} group D departures can be late. Subtract this limit from the current ${delays[3]}.`,'',punctual),
    numeric('Difference between proportions','If five group B delays are reclassified as on time, by how much does the system’s punctuality rate rise, to two decimals?',round(500/total),[round(500/schedules[1]),round(500/late),round(1000/total)],'There are five more on-time departures with the same system-wide denominator.',' percentage points',punctual),
    numeric('Combined totals','How many departures from groups A and C were on time?',schedules[0]+schedules[2]-delays[0]-delays[2],[schedules[0]+schedules[2],schedules[0]+schedules[2]-delays[0],schedules[0]+schedules[2]-delays[2]],'Subtract each group’s late count from its scheduled count and add the two results.','',punctual),
    numeric('Chart interpretation','What is the difference between the late counts for groups D and A?',delays[3]-delays[0],[delays[3],delays[1]-delays[0],delays[3]+delays[0]],`Read D and A from the chart: ${delays[3]}−${delays[0]}.`,'',punctual),
    numeric('Weighted mean','What is the overall mean waiting time, rounded to two decimals?',round(mins/count),[round(mins/(count+2)),round(mins/(count-2)),round(15)],`The weighted total is ${mins} minutes across ${count} observations.`,' min',frequency),
    numeric('Corrected observations','A wait recorded as 10 minutes actually took 25 minutes. What is the corrected total recorded waiting time?',mins+15,[mins+10,mins+25,mins-15],'Replace a 10-minute wait with 25 minutes. The total grows by 15.',' min',frequency),
    numeric('Combined frequencies','How many waits were between 10 and 20 minutes inclusive?',sum(f.slice(1,4)),[f[2],sum(f.slice(1,3)),sum(f.slice(2,4))],'Add the frequencies at 10, 15 and 20 minutes.','',frequency),
    question('Conditional frequencies','Among waits of at least 20 minutes, what share took 25 minutes, to one decimal place?',pct(100*f[4]/(f[3]+f[4])),[pct(100*f[3]/(f[3]+f[4])),pct(100*f[4]/count),pct(100*f[4]/f[3])],'Restrict the denominator to the waits of 20 or 25 minutes.',frequency),
    numeric('New sample size','How many additional 5-minute waits would bring the number of 5-minute waits up to the number of 15-minute waits?',f[2]-f[0],[f[2],f[2]-f[1],f[2]-f[4]],`The difference between the two frequencies is ${f[2]}−${f[0]}.`,'',frequency),
    numeric('Set inclusion','How many surveyed workers took at least one course?',setTotal-none,[setTotal,setTotal-none-abc,setTotal-none+abc],'Apply inclusion–exclusion: add course counts, subtract the three reported overlaps and add back the triple overlap.','',sets),
    numeric('Set overlap','How many took exactly two courses?',ab+ac+bc,[ab+ac+bc+abc,ab+ac+bc+2*abc,ab+ac+bc+3*abc],'Each reported pair includes all three. Subtract the triple overlap separately from each pair before summing.','',sets),
    numeric('Exclusive memberships','How many took course C only?',c,[c+abc,c+bc,c+ac],'Subtract A∩C and B∩C from course C and add back the triple overlap once.','',sets),
    numeric('Subsets','How many took A and B but did not take C?',ab,[ab+abc,ab+ac,ab+bc],'Subtract the triple intersection from the reported A–B overlap.','',sets),
    numeric('Complementary counts','How many surveyed workers took no course?',none,[abc,none+abc,none+ab],'Subtract the three-course union obtained by inclusion–exclusion from the survey total.','',sets),
    numeric('Pie-chart proportions','What was the amount allocated to tracks?',10*k*angles[2],[10*k*angles[3],10*k*angles[1],10*k*angles[4]],'The tracks sector takes 61/360 of the budget. Multiply the budget by that fraction.',' rupees',pie),
    numeric('Fixed total reallocation','Five degrees of the staff sector are transferred to energy without changing the total budget. By how many rupees does the energy allocation increase?',50*k,[10*k,60*k,100*k],'Each degree corresponds to budget/360 = ₹'+10*k+'. Five degrees is five times that.',' rupees',pie),
    numeric('Combined angles','How many degrees do facilities and other spending occupy together?',angles[3]+angles[4],[angles[2]+angles[4],angles[3]+angles[2],angles[2]+angles[1]],'Add the 54° facilities sector and the 37° other sector.','°',pie),
    question('Comparing pie sectors','What share of energy plus track spending is for energy, to one decimal place?',pct(100*angles[1]/(angles[1]+angles[2])),[pct(100*angles[2]/(angles[1]+angles[2])),pct(100*angles[1]/360),pct(100*angles[1]/(angles[1]+angles[3]))],'Use the energy angle as numerator and the combined energy and track angles as denominator.',pie),
    numeric('Comparing amounts','How many more rupees did the depot allocate to staff than to energy?',10*k*(angles[0]-angles[1]),[10*k*(angles[0]-angles[2]),10*k*(angles[0]+angles[1]),10*k*(angles[1]-angles[2])],'Subtract the sector angles and multiply the difference by ₹'+10*k+' per degree.',' rupees',pie),
    numeric('Two-way tables','What was the combined revenue from ticket classes B and C?',receipts[1]+receipts[2],[receipts[0]+receipts[3],receipts[1]+receipts[2]+20,receipts[1]+receipts[2]-35],'Calculate the two revenues separately as quantity × unit fare, then add.',' rupees',sales),
    numeric('Weighted fare','What was the average fare across all tickets, rounded to two decimals?',round(sum(receipts)/sum(quantities)),[round(sum(prices)/4),round(sum(receipts)/(sum(quantities)+15)),round(sum(receipts)/(sum(quantities)-15))],'Divide the sum of revenues by the sum of quantities. Ticket classes have different quantities.',' rupees',sales),
    numeric('Counterfactual receipts','If 15 class C tickets were class B tickets instead, what would the increase in revenue be?',225,[150,300,525],'Each replacement earns an extra ₹(35−20), or ₹15. Multiply by 15 replacements.',' rupees',sales),
    question('Share of receipts','Which ticket class contributed the largest revenue?','D',['A','B','C'],'Multiply each class’s count by its fare. The totals for A, B, C and D are '+receipts.map(money).join(', ')+'.',sales),
    numeric('Bundled fares','What revenue would be gained from selling ten additional tickets of each class?',10*sum(prices),[5*sum(prices),10*(sum(prices)-20),10*(sum(prices)+25)],'Ten additional tickets in each class generate ten times the sum of the four fares.',' rupees',sales),
    question('Data sufficiency',`Counters P and Q sold ${100+12*k} tickets together. How many did P sell? I. P sold ${2*k} more than Q. II. P sold more than 40 tickets.`,'I alone is sufficient',['II alone is sufficient','Both are required','Both are insufficient'],'The total and exact difference determine P. A lower bound alone leaves several possible counts.'),
    question('Data sufficiency',`A service by ${label} has a total of ${240+20*k} seats in two coaches. How many seats does coach A have? I. A has more seats than B. II. B has exactly ${100+5*k} seats.`,'II alone is sufficient',['I alone is sufficient','Both are required','Both are insufficient'],'Subtract the known B count from the total. Knowing only which is larger does not determine the count.'),
    question('Data sufficiency',`A dispatcher at ${label} sees two queues. Is the service rate of X higher than that of Y? I. X serves three times as many people. II. X takes twice as long for that number. Both counts are positive.`,'Both are required',['I alone is sufficient','II alone is sufficient','Both are insufficient'],'The rate comparison needs both the count ratio and the time ratio. Together they give X at 1.5 times Y.'),
    numeric('Arrangement from totals',`Three docks dispatched ${30+k}, ${40+k}, and ${50+k} parcels in some order. B dispatched more than C. A did not dispatch the fewest or the most. What was B’s count?`,50+k,[30+k,40+k,60+k],'A must be the middle dock. Of the remaining two, B is larger.'),
    numeric('Inference from aggregate data',`Three weekly totals average ${80+k}. The first two were ${65+k} and ${90+k}. What was the final total?`,85+k,[75+k,80+k,95+k],'Multiply the mean by three, then subtract the two known observations.')
  ];
}

const weekdays=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const day=n=>weekdays[n%7];
const alpha=n=>String.fromCharCode(65+((n%26)+26)%26);
const code=(word,shift)=>[...word].map((letter,i)=>alpha(letter.charCodeAt(0)-65+shift(i))).join('');
const names=['Asha','Bina','Charu','Deepa','Esha','Farah','Gita','Hema','Indu','Jaya','Kiran','Lata','Mina','Nila','Omi','Pia'];

function logic(k,label) {
  const [x,y,z]=[0,3,7].map(i=>names[(k-1+i)%names.length]);
  const hour=2+k%5, minute=5+k;
  const angle=Math.abs(30*hour-5.5*minute);
  const smaller=Math.min(angle,360-angle);
  const dayChoices=offset=>[1,3,5].map(j=>day(offset+j));
  const weekday=k%7;
  return [
    question('Syllogism',`At ${label}, all inspected consignments are tagged. No tagged consignment is in bay Z. Some priority consignments are inspected. Which conclusion is forced?`,'Some priority consignments are outside bay Z.',['Every priority consignment is inspected.','Some inspected consignments are in bay Z.','Every consignment outside bay Z is tagged.'],'An inspected priority consignment is tagged and therefore outside bay Z.'),
    question('Statement and assumption',`An office in ${label} moves a help desk next to the numbered gates to cut requests for directions. Which assumption is needed?`,'Some people needing directions can find the relocated desk.',['All visitors prefer speaking to an official.','The desk handles refunds at every gate.','The number of gates will decrease.'],'For the relocation to affect direction requests, at least some intended users must be able to reach the desk.'),
    question('Evidence and causation',`After a digital guide was installed at ${label}, missed connections fell. Which observation most weakens the argument that the guide caused the reduction?`,'The timetable simultaneously lengthened the connection windows.',['The guide uses larger text than the old notice.','The total number of express routes remained steady.','Users consulted the guide on both weekdays and weekends.'],'More time to connect is an alternative explanation that changed when the guide changed.'),
    question('Binary logic',`At ${label}, two switches start open. An indicator turns on exactly when one switch is closed. The first switch is now closed and the indicator is off. What follows?`,'The second switch is closed.',['The second switch is open.','Exactly one switch is closed.','Both switches remain open.'],'With the first switch closed, an open second switch would turn the indicator on.'),
    question('Contrapositive',`The rule at ${label} states that each accepted request has a reference number. Request ${30+k} has no reference number. What can be concluded?`,'The request was not accepted.',['The request was accepted with a special code.','The request has been deleted.','All requests without account IDs are accepted.'],'An accepted request necessarily has a reference number. Its absence rules out acceptance.'),
    numeric('Clock angles',`What is the smaller angle between the hands of a clock at ${hour}:${String(minute).padStart(2,'0')}?`,smaller,[smaller+5,smaller+10,smaller+15],`The minute hand is at ${6*minute}°. The hour hand is at ${30*hour+.5*minute}°. Take the smaller angular separation.`,'°'),
    question('Calendar',`A review at ${label} was held on ${day(weekday)}. What weekday is the next review if it is ${48+4*k} days later?`,day(weekday+48+4*k),dayChoices(weekday+48+4*k),`The day shift is the remainder when ${48+4*k} is divided by seven.`),
    question('Family tree',`${x} is the sister of ${y}. ${y} is the mother of ${z}. How is ${x} related to ${z}?`,'Maternal aunt',['Paternal aunt','Maternal grandmother','Niece'],'The person described is the sister of the child’s mother.'),
    question('Negation',`What negates the claim “Every consignment checked at ${label} was both tagged and sealed”?`,'At least one checked consignment was untagged or unsealed.',['Every checked consignment was untagged and unsealed.','Some checked consignments were both tagged and sealed.','No unchecked consignments were tagged.'],'To refute the universal claim, one checked consignment need only fail either requirement.'),
    question('Logical constraints',`At ${label}, exactly two tasks are selected from A, B, C and D. Choosing A requires C. Tasks B and C cannot both be selected. Which pair is valid?`,'A and C',['A and B','A and D','B and C'],'The pair includes A’s prerequisite and avoids the prohibited combination.'),
    question('Inference',`Some enquiries at ${label} are forwarded. Every forwarded enquiry receives a tracking number. Some enquiries are urgent. What is certain?`,'Some enquiries receive tracking numbers.',['All urgent enquiries are forwarded.','Every enquiry with a tracking number is urgent.','No enquiry with a tracking number is urgent.'],'At least one forwarded enquiry exists, and every forwarded enquiry receives a number. Urgency is unrelated in the premises.'),
    question('Truth statements',`Only one of ${x}, ${y} and ${z} signed a receipt. ${x} says that ${y} signed it. ${y} says that ${z} signed it. ${z} says that ${y} did not sign it. Exactly two statements are true. Who signed it?`,z,[x,y,'Cannot be determined'],'The statements by the first and third people are complements. The middle statement must be true as well.'),
    question('Rule application',`A box may leave shelf ${40+k} only when it has passed inspection and has a collection code. A box has passed inspection and lacks a collection code. What follows?`,'It may not leave under this rule.',['It may leave immediately.','It must have failed inspection.','It necessarily belongs to another shelf.'],'Passing inspection meets one requirement. A collection code is also required.'),
    question('Sampling and conclusions',`Surveyors at ${label} interviewed only passengers who arrived before 08:00. Most interviewed passengers favoured a morning service. Which conclusion is defensible?`,'Most members of the interviewed group favoured the service.',['Most passengers at all hours favoured the service.','Evening passengers opposed the service.','The survey sampled all types of passengers equally.'],'The survey supports a statement about its sample. The time restriction limits broader inference.'),
    question('Necessary and sufficient conditions',`At ${label}, a form is accepted whenever its two signatures are present. A particular form was not accepted. What must follow?`,'At least one signature was absent.',['Both signatures were absent.','Exactly one signature was absent.','The form was accepted without a signature.'],'If both signatures were present, the rule would guarantee acceptance. Nonacceptance rules out both being present.'),
    question('Ordering from constraints',`During review ${10+k}, case P is earlier than Q. R is earlier than P and S is later than Q. Which case is third in time order?`,'Q',['P','R','S'],'The constraints force R, P, Q, S in that order.')
  ];
}

function mental(k,label) {
  const word=label.slice(0,5).toUpperCase();
  const forward=code(word,i=>i%2?-2:1);
  const back=code(word,()=>-1).split('').reverse().join('');
  const step=2+k%4, start=3+k;
  const progressing=[start];
  for(let i=1;i<=5;i++)progressing.push(progressing.at(-1)+step*i);
  const pair=[alpha(k+15),alpha(k+3)];
  const series=[0,1,3,6,10].map(n=>alpha(k+15-n)+alpha(k+3+n));
  const tens=Math.ceil(k/4), digitGap=1+(k-1)%4;
  return [
    numeric('Second differences',`Find the next term: ${progressing.slice(0,5).join(', ')}, …`,progressing[5],[progressing[4]+3*step,progressing[4]+4*step,progressing[4]+6*step],`Differences are successive multiples of ${step}. The next difference is ${5*step}.`),
    numeric('Alternating operations',`Find the next term: ${start}, ${3*start}, ${3*start-2}, ${9*start-6}, ${9*start-8}, …`,27*start-24,[9*start-10,18*start-16,27*start-18],'Apply ×3 and −2 alternately. The next operation is ×3.'),
    numeric('Interleaved progressions',`Complete ${k+2}, ${40+k}, ${k+6}, ${37+k}, ${k+10}, ${34+k}, …`,k+14,[k+13,k+15,k+16],'Odd positions increase by four, while even positions decrease by three. The next position is odd.'),
    question('Letter series',`What pair follows ${series.slice(0,4).join(', ')}, …? The alphabet wraps around.`,series[4],[alpha(k+6)+alpha(k+12),alpha(k+5)+alpha(k+12),pair.join('')],'The first letter moves backwards and the second forwards by 1, 2, 3 and then 4 places.'),
    question('Positional coding',`How is ${word} coded if letters in odd positions advance one place and letters in even positions move back two places, wrapping when necessary?`,forward,[code(word,i=>i%2?2:1),code(word,()=>1),code(word,i=>i%2?-1:1)],'Apply the alternating shifts independently to each letter. The transformed letters are '+forward.split('').join(', ')+'.'),
    question('Reverse coding',`Encode ${word} by moving every letter back one place and then reversing the result. The letter before A is Z.`,back,[code(word,()=>-1),code(word,()=>1).split('').reverse().join(''),word.split('').reverse().join('')],'First substitute the preceding letter for each character, then read the substituted word backwards.'),
    numeric('Ranks from opposite ends',`A person is ${10+k}th from the front of a ${36+2*k}-person queue. What is their rank from the back, counting the person?`,27+k,[26+k,28+k,29+k],'Subtract the front rank from the total and add one.'),
    numeric('Rank after additions',`A runner was ${8+k}th from the end. After ${3+k} entrants finish behind the runner and two ahead, what is their new rank from the end?`,11+2*k,[10+2*k,12+2*k,13+2*k],'Only finishers behind the runner increase their rank from the end.'),
    numeric('Number analogy',`The pair ${k+5} : ${(k+5)**2+2*(k+5)} follows a rule: square the first number and add twice the first number. What pairs with ${k+7}?`,(k+7)**2+2*(k+7),[(k+7)**2,(k+7)**2+(k+7),(k+7)**2+4*(k+7)],'Apply n²+2n to '+(k+7)+'.'),
    numeric('Place-value coding',`A two-digit number is coded as three times its tens digit plus twice its units digit. What is the code for ${24+k}?`,3*Math.floor((24+k)/10)+2*((24+k)%10),[1,3,5].map(diff=>3*Math.floor((24+k)/10)+2*((24+k)%10)+diff),'Read the tens and units digits separately and apply the two stated weights.'),
    numeric('Counting orders',`There are ${k+5} assignments. Two designated assignments must be consecutive, in either order. If just their leftmost starting slot and their internal order are counted, how many placements are possible?`,2*(k+4),[k+4,k+5,2*(k+5)],'The consecutive pair can start in any slot except the last and has two orientations.'),
    numeric('Relative directions',`A person walks ${6*k} m west, then ${2*k} m east and ${3*k} m north. What is the distance from the start?`,5*k,[4*k,7*k,9*k],'The net legs are 4k west and 3k north, so the straight-line distance is the 5k hypotenuse.',' m'),
    question('Arrangement',`In file batch ${50+k}, A sits left of B; D immediately follows B; C is first and E is last. What is third in the order?`,'B',['A','C','D'],'After fixing the ends, the three middle positions can only be A, B, D.'),
    question('Relative ranks',`In team ${label}, P scored higher than Q and R. Q scored higher than S but lower than R. Who placed second?`,'R',['P','Q','S'],'The four place in descending order P, R, Q, S.'),
    numeric('Missing term',`Fill the blank in ${k+3}, ${k+8}, …, ${k+18}, ${k+23}.`,k+13,[k+11,k+12,k+15],'The arithmetic progression increases by five.'),
    numeric('Multiplicative pattern',`Apply the same rule as the sequence ${k}, ${2*k}, ${6*k}, ${12*k}, ${36*k} to find the next term.`,72*k,[54*k,90*k,108*k],'The multipliers alternate between 2 and 3. After ×3 comes ×2.'),
    numeric('Ratio analogy',`The quantities ${k+4} and ${3*(k+4)} are paired. Applying the same ratio to ${k+9} gives what paired number?`,3*(k+9),[2*(k+9),3*(k+8),4*(k+9)],'The second quantity in the example is three times the first.'),
    numeric('Queue arrangements',`At ${label}, five counters line up in a fixed list. Counter A must come first and counter E last. How many possible orders of the remaining counters meet the requirement that B is before C?`,3,[2,4,6],'Of the 3! orders of the middle counters, exactly half have B before C.'),
    question('Classification',`Which of these proposed pairs for block ${k} fails the rule that the second letter is two alphabet positions after the first, with wraparound?`,alpha(k)+alpha(k+3),[1,4,7].map(offset=>alpha(k+offset)+alpha(k+offset+2)),'The failing pair moves by three positions. The other three move by two.'),
    numeric('Reverse a number','A number has '+tens+' as its tens digit and '+(tens+digitGap)+' as its units digit. What is the difference between the reversed number and the original?',9*digitGap,[9*digitGap+9,9*digitGap+18,9*digitGap+1],'Swapping digits changes the number by nine times their difference, which is '+digitGap+'.')
  ];
}

function rotate(rows,offset) {
  const start=offset%rows.length;
  return [...rows.slice(start),...rows.slice(0,start)];
}

export function stationMasterSeries(modelQuestion, examName) {
  return Array.from({length:16},(_,index)=>{
    const k=index+1,label=labels[index],full=index<7;
    const reasoning=logic(k,label);
    const groups=[
      rotate(scienceAndMath(k),3*k),
      dataAnalysis(k,label),
      full?[...rotate(reasoning,k),...rrbReading[index]]:rotate(reasoning,k),
      rotate(mental(k,label),2*k)
    ];
    const lengths=[6,6,4,4];
    if(!full) groups[1]=Array.from({length:6},(_,group)=>groups[1][5*group+k%5]);
    const questions=groups.flatMap((rows,section)=>(full?rows:rows.slice(0,lengths[section]))
      .map((payload,i)=>modelQuestion('rrb',index+4,section*100+i,section,...payload)));
    return {
      title:`${examName} · ${full?`Practice model ${index+4}`:`Timed drill ${index-5}`}`,
      category:full?'Model paper':'Timed drill',
      full,
      provenance:'GateLabs original practice material',
      note:full
        ? 'A full-length paper with newly parameterised calculations, charts, data sufficiency, comprehension and reasoning. It follows the indicative 30/30/20/20 breakdown.'
        : 'An original 20-question timed drill covering the four CBT blocks. It uses a 6/6/4/4 mix with worked explanations.',
      questions
    };
  });
}
