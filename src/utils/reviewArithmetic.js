// Match complete, known question forms and check the computed result against
// the published key before offering a derivation.
const number = '([\\d,]+(?:\\.\\d+)?)';
const form = text => new RegExp('^'+text.replaceAll('#',number)+'$','u');
const format = value => String(Number(value.toFixed(8)));
const gcd = (a,b) => {
  while (b) [a,b]=[b,a%b];
  return a;
};

function quadraticRoots(a,b,c) {
  const discriminant=b*b-4*a*c, radical=Math.sqrt(discriminant);
  if (!Number.isSafeInteger(radical)) return null;
  const numerators=[-b-radical,-b+radical];
  const values=numerators.map(n=>n/(2*a));
  const labels=numerators.map(n=>{
    const divisor=gcd(Math.abs(n),2*a);
    return 2*a===divisor ? String(n/divisor) : `${n/divisor}/${2*a/divisor}`;
  });
  return {discriminant,values,labels};
}

function quadraticSolution(stem,choice) {
  const pair=stem.match(/^Choose the most precise relation that holds for every pair of real roots\.\s+I\.\s*(\d*)x(?:\^2|²)\s*([+−–-])\s*(\d+)x\s*([+−–-])\s*(\d+)\s*=\s*0\s+II\.\s*(\d*)y(?:\^2|²)\s*([+−–-])\s*(\d+)y\s*([+−–-])\s*(\d+)\s*=\s*0$/);
  if (!pair) return null;
  const coefficients = ([a,bSign,b,cSign,c])=>[Number(a||1),Number(b)*(bSign==='+'?1:-1),Number(c)*(cSign==='+'?1:-1)];
  const xCoeffs=coefficients(pair.slice(1,6)), yCoeffs=coefficients(pair.slice(6));
  if ([...xCoeffs,...yCoeffs].some(value=>!Number.isSafeInteger(value)||Math.abs(value)>1000000) || !xCoeffs[0] || !yCoeffs[0]) return null;
  const x=quadraticRoots(...xCoeffs), y=quadraticRoots(...yCoeffs);
  if (!x || !y) return null;
  const [xMin,xMax]=x.values, [yMin,yMax]=y.values;
  const compare = (a,b) => a<b?'<':a>b?'>':'=';
  let comparison='x = y or relationship cannot be determined';
  if (xMax<yMin) comparison='x < y';
  else if (xMin>yMax) comparison='x > y';
  else if (xMax===yMin && xMin<yMax) comparison='x ≤ y';
  else if (xMin===yMax && xMax>yMin) comparison='x ≥ y';
  if (comparison!==choice) return null;
  const substitution = (variable, [a,b,c], roots) =>
    `For ${variable}, a = ${a}, b = ${b} and c = ${c}. The discriminant b² − 4ac is ${roots.discriminant}. Substituting into (−b ± √(b² − 4ac)) ÷ (2a) gives ${variable} = ${roots.labels.join(' or ')}.`;
  return {
    approach:'Use the quadratic formula on each equation. Compare the two ranges of possible roots to find a relation that holds for every pair.',
    steps:[
      substitution('x',xCoeffs,x), substitution('y',yCoeffs,y),
      `Compare the endpoints. Smallest x versus largest y gives ${x.labels[0]} ${compare(xMin,yMax)} ${y.labels[1]}. Largest x versus smallest y gives ${x.labels[1]} ${compare(xMax,yMin)} ${y.labels[0]}.`,
      `Choose “${comparison}”.`
    ],
    tip:'Comparing only the two smaller roots can miss an equal or reversed pair.'
  };
}

const recipes = [
  [form('What is the (HCF|LCM) of # and #\\?'), ([kind,a,b])=>{
    const common=gcd(a,b);
    const divisions=[];
    for(let x=Math.max(a,b),y=Math.min(a,b);y;) {
      const remainder=x%y;
      divisions.push(`${x} = ${Math.floor(x/y)} × ${y} + ${remainder}.`);
      [x,y]=[y,remainder];
    }
    const steps=[...divisions,`The last non-zero divisor is ${common}, the highest common factor.`];
    if(kind==='HCF')return [common,'Apply the Euclidean algorithm. Divide the larger number by the smaller, then repeat with the divisor and remainder.',steps];
    const result=a/common*b;
    return [result,'Find the highest common factor first. The product of the two numbers equals HCF × LCM.',[...steps,`LCM = (${a} × ${b}) ÷ ${common} = ${result}.`]];
  }],
  [form('A quantity increases from # to #\\. What is the percentage increase\\?'), ([start,end])=>{
    const increase=end-start, percentage=100*increase/start;
    return [percentage,'Compare the change with the original quantity.',[`Increase = ${end} − ${start} = ${increase}.`,`Percentage increase = (${increase} ÷ ${start}) × 100 = ${format(percentage)}%.`],'The new quantity is the wrong base for percentage increase.'];
  }],
  [form('A depot marks a spare part at ₹#\\. It applies discounts of #% and then #%\\. What is the sale price\\?'), ([amount,first,second])=>{
    const reduced=amount*(100-first)/100, result=reduced*(100-second)/100;
    return [result,'Apply the discounts one at a time to the running price.',[`First discount: ₹${amount} × ${100-first}/100 = ₹${format(reduced)}.`,`Second discount: ₹${format(reduced)} × ${100-second}/100 = ₹${format(result)}.`],'The second discount uses the price after the first discount.'];
  }],
  [form('The mean mass of # sacks is # kg\\. Four other sacks averaging # kg are added\\. What is the combined mean to two decimal places\\?'), ([count,mean,other])=>{
    const more=4;
    const mass=count*mean+more*other, result=mass/(count+more);
    return [Number(result.toFixed(2)),'Recover the total mass of each group before finding the combined mean.',[`First group: ${count} × ${mean} = ${count*mean} kg. Added group: ${more} × ${other} = ${more*other} kg.`,`Combined mass = ${mass} kg. Combined count = ${count} + ${more} = ${count+more} sacks.`,`Mean = ${mass} ÷ ${count+more} = ${result.toFixed(2)} kg to two decimals.`],'A simple average of the two means only works when the groups have equal counts.'];
  }],
  [form('P can complete a task in # days and Q in # days\\. They work together for # days\\. How many more days does Q need alone\\?'), ([p,q,days])=>{
    const perDay=p+q, work=p*q, remaining=work-perDay*days, result=remaining/p;
    return [result,'Use a convenient work total divisible by both solo times. Add the workers’ daily outputs when both work.',[`Treat the task as ${work} units. P completes ${q} units per day and Q completes ${p} units per day.`,`In ${days} days the pair finishes ${days} × (${q} + ${p}) = ${perDay*days} units.`,`Work left = ${work} − ${perDay*days} = ${remaining} units. Q takes ${remaining} ÷ ${p} = ${format(result)} more days.`]];
  }],
  [form('A # m train travels at # km/h and passes a second train moving towards it at # km/h\\. If the entire pass takes # seconds, how long is the second train\\?'), ([length,speed,other,time])=>{
    const relative=(speed+other)*5/18, distance=relative*time, result=distance-length;
    return [result,'Use relative speed and the total distance needed for both trains to clear each other.',[`The trains move in opposite directions. Relative speed = (${speed} + ${other}) × 5/18 = ${format(relative)} m/s.`,`They close ${format(relative)} × ${time} = ${format(distance)} m during the complete pass. This is the sum of the two lengths.`,`Second train = ${format(distance)} − ${length} = ${format(result)} m.`],'Convert km/h to m/s before multiplying by seconds.'];
  }],
  [form('A total of # tickets cost ₹#\\. Regular tickets cost ₹# and concession tickets cost ₹#\\. How many regular tickets were sold\\?'), ([count,cost,regular,concession])=>{
    const baseline=count*concession, extra=regular-concession, result=(cost-baseline)/extra;
    return [result,'Assume all tickets are concessions, then count the upgrades needed to reach the actual total.',[`Concession-only total = ${count} × ₹${concession} = ₹${baseline}.`,`Each regular ticket adds ₹${regular} − ₹${concession} = ₹${extra}. The total difference is ₹${cost} − ₹${baseline} = ₹${cost-baseline}.`,`Regular tickets = ${cost-baseline} ÷ ${extra} = ${result}.`]];
  }],
  [form('A waiting hall has # rows\\. The first row has # seats and each subsequent row has # more\\. How many seats are in the last four rows together\\?'), ([rows,first,gap])=>{
    const last=first+(rows-1)*gap, counts=[last-3*gap,last-2*gap,last-gap,last];
    const result=counts.reduce((total,count)=>total+count,0);
    return [result,'Find the last term of the arithmetic progression, then work backward three terms.',[`Last row = ${first} + (${rows} − 1) × ${gap} = ${last} seats.`,`The final four rows have ${counts.join(', ')} seats.`,`Total = ${counts.join(' + ')} = ${result} seats.`]];
  }],
  [form('There are # red and # blue tokens\\. Two are sampled without replacement\\. What is the probability of sampling two reds, to three decimals\\?'), ([red,blue])=>{
    const total=red+blue, result=(red/total)*((red-1)/(total-1));
    return [Number(result.toFixed(3)),'Multiply the chance of red on the first draw by the chance of red on the second given the first result.',[`First draw: ${red} red tokens among ${total}, so P(red) = ${red}/${total}.`,`After a red is removed, ${red-1} red tokens remain among ${total-1}. The conditional probability is ${red-1}/${total-1}.`,`Product = (${red}/${total}) × (${red-1}/${total-1}) = ${result.toFixed(3)} to three decimals.`],'Without replacement, both the red count and the total count drop by one after the first red draw.'];
  }],
  [form('The water level in a cuboid tank of base # cm by # cm rises from # cm to # cm when an object is fully submerged\\. What is the object’s volume\\?'), ([length,width,start,end])=>{
    const area=length*width, rise=end-start, result=area*rise;
    return [result,'A fully submerged object displaces a volume of water equal to its own volume.',[`Tank base area = ${length} × ${width} = ${area} cm².`,`Water rise = ${end} − ${start} = ${rise} cm.`,`Displaced volume = ${area} × ${rise} = ${result} cm³.`]];
  }],
  [form('A sliding crate is pulled with a horizontal force of # N along # m\\. Kinetic friction is # N\\. What is the net work on the crate\\?'), ([pull,distance,friction])=>{
    const net=pull-friction, result=net*distance;
    return [result,'Sum the work done by the forces along the displacement. Horizontal pull does positive work and friction does negative work.',[`Net horizontal force = ${pull} − ${friction} = ${net} N.`,`Net work = ${net} × ${distance} = ${result} J.`,`Check: the pull contributes +${pull*distance} J and friction contributes −${friction*distance} J. The vertical forces do zero work for horizontal displacement.`]];
  }],
  [form('A # kg object slows from # m/s to # m/s\\. Find the magnitude of net work done during braking\\.'), ([mass,initial,final])=>{
    const before=mass*initial**2/2, after=mass*final**2/2, work=after-before;
    return [Math.abs(work),'Use the work–energy theorem. Net work equals the change in kinetic energy.',[`Initial kinetic energy = ½ × ${mass} × ${initial}² = ${before} J.`,`Final kinetic energy = ½ × ${mass} × ${final}² = ${after} J.`,`Net work = ${after} − ${before} = ${work} J. Its magnitude is ${Math.abs(work)} J.`]];
  }],
  [form('A lift raises a # kg load by # m in # s at a steady speed\\. Take g = # m/s² and efficiency #%\\. What input power is needed to the nearest watt\\?'), ([mass,height,time,gravity,efficiency])=>{
    const useful=mass*gravity*height/time, input=useful/(efficiency/100);
    return [Math.round(input),'Find useful output power from the gain in gravitational potential energy, then use efficiency = output ÷ input.',[`Gain in potential energy = mgh = ${mass} × ${gravity} × ${height} = ${mass*gravity*height} J.`,`Useful power = ${mass*gravity*height} ÷ ${time} = ${format(useful)} W.`,`Input power = ${format(useful)} ÷ ${format(efficiency/100)} = ${Math.round(input)} W to the nearest watt.`]];
  }],
  [form('Resistors of # Ω and # Ω are connected in series to # V\\. What power is delivered to the larger resistor\\?'), ([a,b,voltage])=>{
    const resistance=a+b, current=voltage/resistance, larger=Math.max(a,b), result=current**2*larger;
    return [result,'Find the shared series current, then compute power for the larger resistor alone.',[`Total resistance = ${a} + ${b} = ${resistance} Ω.`,`Ohm’s law gives current = ${voltage} ÷ ${resistance} = ${format(current)} A through both components.`,`Power in the ${larger} Ω resistor = I²R = ${format(current)}² × ${larger} = ${format(result)} W.`],'The full source voltage is shared across the two resistors.'];
  }],
  [form('Mix # g of water at #°C with # g at #°C in an insulated vessel of negligible heat capacity\\. What is the equilibrium temperature\\?'), ([hotMass,hot,coldMass,cold])=>{
    const total=hotMass+coldMass, result=(hotMass*hot+coldMass*cold)/total;
    return [result,'Set heat lost by the hotter water equal to heat gained by the colder water. Their specific heat capacities cancel.',[`${hotMass}(${hot} − T) = ${coldMass}(T − ${cold}).`,`Collect the T terms: (${hotMass} + ${coldMass})T = ${hotMass} × ${hot} + ${coldMass} × ${cold}.`,`T = ${hotMass*hot+coldMass*cold} ÷ ${total} = ${format(result)}°C.`],'The result lies between the starting temperatures and closer to that of the greater mass.'];
  }],
  [form('A heater transfers # J of energy into a # kg metal block\\. If the temperature rises by #°C, find the block’s specific heat capacity\\.'), ([heat,mass,rise])=>{
    const result=heat/(mass*rise);
    return [result,'Start from Q = mcΔT, which relates heat transferred to mass and temperature change.',[`Rearrange for specific heat capacity: c = Q ÷ (m × ΔT).`,`Substitute the given values: c = ${heat} ÷ (${mass} × ${rise}) = ${format(result)} J/(kg·°C).`]];
  }],
  [form('Two adjacent interior angles of a parallelogram differ by #°\\. What is the larger angle\\?'), ([difference])=>{
    const result=(180+difference)/2;
    return [result,'Adjacent interior angles of a parallelogram are supplementary.',[`Write L + S = 180° and L − S = ${difference}°, where L is the larger angle.`,`Add the equations to eliminate S: 2L = ${180+difference}°.`,`L = ${result}°. The smaller angle is ${180-result}°, which is ${difference}° less.`]];
  }],
  [form('A sum of ₹# is invested at #% per annum Simple Interest for # years\\. Find the total interest earned\\.'), ([principal,rate,years])=>{
    const annual=principal*rate/100, result=annual*years;
    return [result,'Simple interest is calculated on the original principal each year.',[`Annual interest = ₹${principal} × ${rate}/100 = ₹${format(annual)}.`,`Interest over ${years} years = ₹${format(annual)} × ${years} = ₹${format(result)}.`],'Add the principal only when the question asks for the final amount.'];
  }],
  [form('A boat covers # km upstream in # hours and # km downstream in # hours\\. Find the speed of the current\\.'), ([upDistance,upTime,downDistance,downTime])=>{
    const upstream=upDistance/upTime, downstream=downDistance/downTime, result=(downstream-upstream)/2;
    return [result,'The downstream speed adds the current to the boat speed. The upstream speed subtracts it.',[`Upstream speed = ${upDistance} ÷ ${upTime} = ${format(upstream)} km/h.`,`Downstream speed = ${downDistance} ÷ ${downTime} = ${format(downstream)} km/h.`,`Subtract the upstream speed from the downstream speed to get twice the current speed. The current speed is (${format(downstream)} − ${format(upstream)}) ÷ 2 = ${format(result)} km/h.`]];
  }],
  [form('A direct-mapped cache of size # KB has a block size of # bytes\\. If the physical address size is # bits, the size of the tag field is:'), ([capacity,block,address])=>{
    const lines=capacity*1024/block, offset=Math.log2(block), index=Math.log2(lines), tag=address-index-offset;
    if (![offset,index,tag].every(Number.isInteger) || tag < 0) return [];
    return [tag,'Split the physical byte address into tag, line index and block offset. A direct-mapped cache uses exactly one line for each index.',[
      `Block size is ${block} bytes, so the byte offset needs log₂(${block}) = ${offset} bits.`,
      `There are ${capacity} × 1024 ÷ ${block} = ${lines} cache lines, so the line index needs log₂(${lines}) = ${index} bits.`,
      `The remaining address bits form the tag: ${address} − ${index} − ${offset} = ${tag} bits.`
    ],'Calculate the index from the number of cache lines. The total byte capacity includes both the index and offset bits.'];
  }]
];

export function arithmeticSolution(q) {
  const stem = q.question?.trim();
  if (!stem) return null;
  const choice = q.options?.[q.correctAnswer];
  if (q.topic==='Quadratic Equations') return quadraticSolution(stem,choice);
  const keyed = String(choice ?? '').replaceAll(',','').match(/^\s*₹?(-?\d+(?:\.\d+)?)(?=\s|%|°|$)/)?.[1];
  if (keyed == null) return null;
  for (const [pattern, solve] of recipes) {
    const match = stem.match(pattern);
    if (!match) continue;
    const input = match.slice(1).map(value=>/^\d/.test(value) ? Number(value.replaceAll(',','')) : value);
    if (input.some(value=>typeof value==='number'&&!Number.isFinite(value))) return null;
    const [result,approach,steps,tip=''] = solve(input);
    if (!Number.isFinite(result) || Math.abs(result-Number(keyed))>1e-8) return null;
    return {approach,steps,tip};
  }
  return null;
}
