const number = String.raw`(\d+(?:,\d{3})*(?:\.\d+)?)`;
const template = pattern => new RegExp('^' + pattern.replaceAll('#', number) + '$');
const step = (title, text, formula) => ({title, text, formula});
const format = value => String(Number(value.toFixed(8)));

const calculations = [
  [template(String.raw`Between #:00 and the first overlap after it, when is the smaller angle between the clock hands #°\?`), ([hour, angle]) => {
    const start = hour * 30, minute = (start - angle) / 5.5;
    if (hour < 1 || hour > 6 || minute < 0 || !Number.isInteger(minute)) return [];
    return [`${hour}:${String(minute).padStart(2, '0')}`, [
      step('Find the starting gap', 'The minute hand starts at 12. Each hour mark represents 30°.', `${hour} × 30° = ${start}°`),
      step('Find the closing rate', 'The minute hand moves 6° per minute and the hour hand moves 0.5° per minute. Before they overlap the minute hand is catching up.', '6 − 0.5 = 5.5° per minute'),
      step('Stop at the target gap', 'Subtract the desired gap from the starting gap. Divide the decrease by the closing rate.', `(${start} − ${angle}) ÷ 5.5 = ${minute} min`)
    ]];
  }],
  [template(String.raw`A register is inspected on a (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\. Its next inspection is due # days later, but it is carried out two days after the due date\. On which weekday is the inspection carried out\?`), ([day, due]) => {
    const week = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const elapsed = due + 2, remainder = elapsed % 7;
    const answer = week[(week.indexOf(day) + remainder) % 7];
    return [answer, [
      step('Find the actual date difference', 'The inspection happens two days after its due date.', `${due} + 2 = ${elapsed} days`),
      step('Remove complete weeks', 'Seven days return to the same weekday. Only the remainder affects the answer.', `${elapsed} = ${Math.floor(elapsed / 7)} × 7 + ${remainder}`),
      step('Count forward on the calendar', `Advance ${remainder} ${remainder === 1 ? 'day' : 'days'} from ${day} to reach ${answer}.`)
    ]];
  }],
  [template(String.raw`A lamp is already on\. Each pulse reverses its state\. It receives # pulses before a pause, then # more pulses\. During maintenance the technician manually toggles it once and disconnects it before any further pulse\. What was its state immediately before the manual toggle and immediately afterwards\?`), ([first, second]) => {
    const total = first + second;
    const before = total % 2 ? 'Off' : 'On';
    const after = total % 2 ? 'on' : 'off';
    return [`${before}, then ${after}`, [
      step('Count pulses before maintenance', 'The pause itself does not change the state. Include both batches of pulses.', `${first} + ${second} = ${total}`),
      step('Use pairs of reversals', `Two toggles restore the previous state. The total is ${total % 2 ? 'odd, so one unpaired toggle turns the lamp off' : 'even, so the lamp is still on'}.`, 'On → off → on'),
      step('Apply the manual toggle separately', 'The final manual toggle reverses the state once more before the lamp is disconnected.', `${before} → ${after}`)
    ]];
  }],
  [template(String.raw`Team P inspected # boxes and team Q inspected # boxes\. Exactly # of all inspected boxes were rejected\. Each team inspected a disjoint set\. What is the minimum possible number of rejections from P\?`), ([p, q, rejected]) => {
    if (rejected > p + q) return [];
    const maxQ = Math.min(q, rejected), minP = rejected - maxQ;
    return [String(minP), [
      step('Maximise the rejections assigned to Q', 'The two sets do not overlap. Giving Q as many rejections as its count allows leaves the fewest for P.', `Maximum for Q = min(${q}, ${rejected}) = ${maxQ}`),
      step('Count what remains for P', 'Every rejection not assigned to Q belongs to P.', `${rejected} − ${maxQ} = ${minP}`),
      step('Check that the bound can be achieved', `Assign ${maxQ} rejections among Q’s ${q} boxes and ${minP} among P’s ${p} boxes. Neither team exceeds its inspected count.`)
    ]];
  }],
  [template(String.raw`H ranks #(?:st|nd|rd|th) in a preliminary list\. The final list removes two people originally above H and adds # new entries\. The number of new entries above H is half the new entries, rounded down\. What is H’s final rank\?`), ([rank, added]) => {
    const above = Math.floor(added / 2), finalRank = rank - 2 + above;
    return [String(finalRank), [
      step('Remove the two higher ranks', 'Both removed people were ahead of H, so the rank number drops by two.', `${rank} − 2 = ${rank - 2}`),
      step('Count the newcomers who go ahead', 'Use only the entries placed above H and round the half down.', `Floor(${added} ÷ 2) = ${above}`),
      step('Update the rank', 'Each entry placed ahead moves H back one position.', `${rank - 2} + ${above} = ${finalRank}`)
    ], 'Entries placed below H do not affect H’s rank.'];
  }],
  [template(String.raw`Complete both blanks in this sequence: #, #, #, #, #, #, __, __\.`), ([a, b, c, d, e, f]) => {
    if (c - a !== 2 || e - c !== 4 || d - b !== -1 || f - d !== -3) return [];
    return [`${e + 6}, ${f - 5}`, [
      step('Separate the odd positions', 'The increases are +2 and +4. Continue by adding +6.', `${a} → ${c} → ${e} → ${e + 6}`),
      step('Separate the even positions', 'The decreases are −1 and −3. Continue by subtracting 5.', `${b} → ${d} → ${f} → ${f - 5}`),
      step('Place the answers in position order', 'The seventh term comes from the odd track and the eighth from the even track.', `${e + 6}, ${f - 5}`)
    ]];
  }],
  [template(String.raw`A circular island of radius # m is surrounded by a walkway # m wide\. What is the walkway area, in multiples of π\?`), ([radius, width]) => {
    const outside = radius + width;
    return [`${outside ** 2 - radius ** 2}π m²`, [
      step('Find the outer radius', 'The walkway extends from the edge of the island outward by its stated width.', `${radius} + ${width} = ${outside} m`),
      step('Find the two areas', 'Use πr² for each circle. The larger circle contains the path and the island.', `Outer: ${outside ** 2}π m². Inner: ${radius ** 2}π m².`),
      step('Subtract the inner disk', 'The difference is the area of the ring.', `(${outside ** 2} − ${radius ** 2})π = ${outside ** 2 - radius ** 2}π m²`)
    ]];
  }],
  [template(String.raw`A metal sheet measures # cm by # cm and is # mm thick\. What is its volume\?`), ([length, width, thickness]) => {
    const depth = thickness / 10;
    const area = length * width;
    return [`${format(area * depth)} cm³`, [
      step('Convert the thickness', 'Use centimetres for all three dimensions. One centimetre contains 10 millimetres.', `${thickness} mm ÷ 10 = ${format(depth)} cm`),
      step('Find the face area', 'Multiply the given length and width.', `${length} × ${width} = ${area} cm²`),
      step('Multiply by the thickness', 'Multiplying a square-centimetre area by a centimetre thickness gives cubic centimetres.', `${area} × ${format(depth)} = ${format(area * depth)} cm³`)
    ]];
  }],
  [template(String.raw`A # cm³ sample of density # g/cm³ is combined with a # cm³ sample of density # g/cm³ without volume change\. What is their combined density\?`), ([v1, d1, v2, d2]) => {
    const m1 = v1 * d1, m2 = v2 * d2, mass = m1 + m2, volume = v1 + v2;
    return [`${format(mass / volume)} g/cm³`, [
      step('Turn densities into masses', 'For each sample use mass = density × volume.', `Sample 1: ${d1} × ${v1} = ${format(m1)} g. Sample 2: ${d2} × ${v2} = ${format(m2)} g.`),
      step('Combine masses and volumes separately', 'The question says the volumes add without change.', `Mass = ${format(m1)} + ${format(m2)} = ${format(mass)} g. Volume = ${v1} + ${v2} = ${volume} cm³.`),
      step('Divide total mass by total volume', 'The volumes determine how much each density contributes.', `${format(mass)} ÷ ${volume} = ${format(mass / volume)} g/cm³`)
    ], 'A simple mean of the two densities only works for equal volumes.'];
  }],
  [template(String.raw`A component has a mass of # kg\. What is the decrease in weight when moved from a location with g = # m/s² to one with g = # m/s²\?`), ([mass, oldG, newG]) => {
    const oldWeight = mass * oldG, newWeight = mass * newG;
    return [`${format(oldWeight - newWeight)} N`, [
      step('Calculate the original weight', 'Weight is the force of gravity, W = mg.', `${mass} × ${oldG} = ${format(oldWeight)} N`),
      step('Calculate weight at the new location', 'Keep the same mass and replace g with the new acceleration.', `${mass} × ${newG} = ${format(newWeight)} N`),
      step('Find the decrease', 'Subtract the new weight from the original weight.', `${format(oldWeight)} − ${format(newWeight)} = ${format(oldWeight - newWeight)} N`)
    ]];
  }],
  [template(String.raw`A # kg trolley is pulled east by # N and west by # N\. It starts at rest\. How far does it travel in # s if the forces are constant\?`), ([mass, east, west, time]) => {
    const net = east - west, acceleration = Math.abs(net) / mass;
    const distance = acceleration * time ** 2 / 2;
    return [`${format(distance)} m`, [
      step('Combine the opposing forces', 'Take east as positive, so the westward force is subtracted.', `Fnet = ${east} − ${west} = ${format(net)} N`),
      step('Find the acceleration magnitude', 'Use Newton’s second law. The sign gives the direction, and the magnitude gives the distance calculation.', `a = ${Math.abs(net)} ÷ ${mass} = ${format(acceleration)} m/s²`),
      step('Use motion from rest', 'The initial speed is zero and acceleration is constant, so distance is ½at².', `½ × ${format(acceleration)} × ${time}² = ${format(distance)} m`)
    ]];
  }],
  [template(String.raw`A # N load acts # cm to the left of a frictionless pivot\. A # N load counterbalances it on the right\. What is the right-hand lever arm\?`), ([leftLoad, leftArm, rightLoad]) => {
    const moment = leftLoad * leftArm, arm = moment / rightLoad;
    return [`${format(arm)} cm`, [
      step('Find the known moment', 'Moment about a pivot is force × perpendicular lever arm.', `${leftLoad} × ${leftArm} = ${format(moment)} N·cm`),
      step('Balance the moments', 'The two loads act on opposite sides of a balanced pivot. Their moment magnitudes must match.', `${rightLoad} × right arm = ${format(moment)}`),
      step('Solve for the right arm', 'Divide the required moment by the known right-side force.', `${format(moment)} ÷ ${rightLoad} = ${format(arm)} cm`)
    ]];
  }],
  [template(String.raw`Two # Ω resistors are connected in parallel to # V\. One branch opens\. How much does the current drawn from the source decrease\?`), ([resistance, volts]) => {
    const branch = volts / resistance;
    return [`${format(branch)} A`, [
      step('Find one branch current', 'Both parallel resistors see the full source voltage. Apply Ohm’s law to one resistor.', `I = ${volts} ÷ ${resistance} = ${format(branch)} A`),
      step('Add the original currents', 'Two identical branches draw two copies of that current.', `2 × ${format(branch)} = ${format(2 * branch)} A`),
      step('Remove the open branch', 'The surviving branch still sees the same voltage, so the decrease equals the current of one branch.', `${format(2 * branch)} − ${format(branch)} = ${format(branch)} A`)
    ]];
  }],
  [template(String.raw`A # kW appliance runs for # min each day for # days\. What is its electricity cost at ₹#/kWh\?`), ([power, mins, days, tariff]) => {
    const hours = mins * days / 60, energy = power * hours;
    return [`${format(energy * tariff)} rupees`, [
      step('Convert total time to hours', 'Energy billing uses hours with kilowatts.', `(${mins} × ${days}) ÷ 60 = ${format(hours)} h`),
      step('Find the electrical energy', 'Multiply the power by the operating time.', `${power} × ${format(hours)} = ${format(energy)} kWh`),
      step('Apply the tariff', 'Each kWh costs the given rate.', `${format(energy)} × ₹${tariff.toFixed(2)} = ₹${format(energy * tariff)}`)
    ]];
  }],
  [template(String.raw`A linear sensor reads # units at 0°C and # units at 100°C\. What is the reading at 40°C, to one decimal place\?`), ([atZero, atHundred]) => {
    const span = atHundred - atZero, rise = 0.4 * span, answer = (atZero + rise).toFixed(1);
    return [`${answer} units`, [
      step('Find the calibrated span', 'Compare the two sensor readings to find the change over the 100°C interval.', `${atHundred} − ${atZero} = ${span} units`),
      step('Use the fraction of the span', 'At 40°C a linear sensor has moved 40% of the way from its zero-temperature reading.', `0.4 × ${span} = ${format(rise)} units`),
      step('Add the starting reading', 'The increase begins at the reading at 0°C. Round the result to one decimal place.', `${atZero} + ${format(rise)} = ${answer} units`)
    ]];
  }],
  [template(String.raw`An ideal pulley system has four rope segments supporting a # N load\. What is the work done at the free end to raise the load # m\?`), ([load, rise]) => {
    const effort = load / 4, pull = 4 * rise, work = load * rise;
    return [`${format(work)} J`, [
      step('Find the ideal effort', 'Four supporting rope segments share the load equally.', `${load} ÷ 4 = ${format(effort)} N`),
      step('Find the rope pulled through the free end', 'Each of the four supporting segments shortens by the same amount as the load rises.', `4 × ${rise} = ${format(pull)} m`),
      step('Multiply force by distance at the free end', 'The lowered effort and increased distance cancel in the work calculation.', `${format(effort)} × ${format(pull)} = ${format(work)} J`)
    ], '', {text:'For an ideal machine, input work equals the increase in the load’s potential energy.', formula:`Weight × rise = ${load} × ${rise} = ${format(work)} J`}];
  }],
  [template(String.raw`A # V source feeds # Ω and # Ω resistors in parallel\. The lower-resistance branch is disconnected\. What is the remaining source power\?`), ([volts, r1, r2]) => {
    const resistance = Math.max(r1, r2);
    const current = volts / resistance, power = volts * current;
    return [`${format(power)} W`, [
      step('Identify the surviving circuit', 'Disconnecting the lower-resistance branch removes that path. The higher resistance stays across the full source voltage.', `R = ${resistance} Ω, V = ${volts} V`),
      step('Find the remaining current', 'Apply I = V/R to the surviving branch.', `${volts} ÷ ${resistance} = ${format(current)} A`),
      step('Calculate the source power', 'The surviving branch draws all the current from the source.', `P = VI = ${volts} × ${format(current)} = ${format(power)} W`)
    ]];
  }],
  [template(String.raw`A crate pulled horizontally at constant speed covers # m on each of two surfaces\. Kinetic friction is # N on the first and # N on the second\. What total work does the pull supply\?`), ([distance, first, second]) => {
    const firstWork = first * distance, secondWork = second * distance, work = firstWork + secondWork;
    return [`${format(work)} J of work`, [
      step('Find the required pull on each surface', 'Constant speed means zero net force. The pull balances the local kinetic friction on each section.', `Pull on surface 1 = ${first} N. Pull on surface 2 = ${second} N.`),
      step('Find the work on each section', 'The pull acts in the direction of travel, so multiply each pull by the distance.', `${first} × ${distance} = ${format(firstWork)} J. ${second} × ${distance} = ${format(secondWork)} J.`),
      step('Add the two contributions', 'The question asks for work supplied by the pull. The two positive contributions add.', `${format(firstWork)} + ${format(secondWork)} = ${format(work)} J`)
    ], 'The net work is zero at constant speed. The positive work of the pull is cancelled by friction.'];
  }]
];

export function rrbReviewCalculation(question, choice) {
  for (const [pattern, solve] of calculations) {
    const matched = question?.match(pattern);
    if (!matched) continue;
    const values = matched.slice(1).map(value => /^\d/.test(value) ? Number(value.replaceAll(',', '')) : value);
    if (values.some(value => typeof value === 'number' && !Number.isFinite(value))) return null;
    const [result, steps, tip, shortcut] = solve(values);
    if (result == null || result !== choice?.replace(/(?<=\d),(?=\d)/g, '')) return null;
    return {steps, tip, shortcut};
  }
  return null;
}
