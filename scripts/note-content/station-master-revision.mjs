// Topic | rule to recall | two or three label:value steps | common exam trap.
// Row values are original miniature examples. The lesson contains the full method.
const rows = `
number-system|For ÷9, the number and its digit sum have the same remainder.|Number:428 > Digit sum:4 + 2 + 8 = 14 > Remainder:14 mod 9 = 5|Test ÷4 using the last two digits.
ratio-proportion|To split a total, divide by the sum of the ratio parts.|Ratio:3 : 2 > Total:₹600 ÷ 5 = ₹120 > Two shares:₹360 and ₹240|Make both quantities use the same unit.
averages|Combined mean = combined total ÷ combined count.|2 at 50:100 total > 3 at 70:210 total > Mean:310 ÷ 5 = 62|Unequal groups carry different weights.
percentages|Change % = (new − old) ÷ old × 100.|Start:200 > Up 20%:×1.20 = 240 > Down 20%:×0.80 = 192|Opposite percentages use different bases.
profit-loss-discount|Profit % uses cost price. Discount % uses marked price.|Cost:₹100 > Marked:₹150 > Sell (−20%):₹120|₹20 profit is 20% of the ₹100 cost.
time-and-distance|Crossing time = distance to clear ÷ relative speed.|Train:150 m > Platform:+ 90 m > At 20 m/s:240 ÷ 20 = 12 s|Both lengths count when the rear must clear.
time-and-work|Add work rates. Subtract a leak or drain.|A in 6 days:2 units/day > B in 12 days:1 unit/day > 12-unit job:12 ÷ 3 = 4 days|Add output per day, then invert for time.
algebra|(a + b)² = a² + 2ab + b².|Given:x + y = 10 > Square:x² + 2xy + y² = 100 > If xy = 21:x² + y² = 58|Cancel common factors across a fraction.
linear-equations|For elimination, match the coefficient of one unknown.|Equation 1:x + y = 9 > Equation 2:x − y = 3 > Add:2x = 12; x = 6|Adding or subtracting acts on both sides.
arithmetic-progression|aₙ = a + (n−1)d. Sum = n(first + last) ÷ 2.|Progression:4, 7, 10, 13 > Four terms:mean 8.5 > Sum:4 × 8.5 = 34|The first term has zero increments of d.
lcm-hcf|Choose lowest prime powers for HCF and highest for LCM.|Inputs:12 and 18 > HCF:2 × 3 = 6 > LCM:2² × 3² = 36|Same starting time matters for cycle questions.
geometry|Similar triangles have area ratio equal to the square of their side ratio.|Side ratio:2 : 3 > Square both:2² : 3² > Area ratio:4 : 9|Match corresponding sides before forming ratios.
trigonometry|From angle θ, tan θ = opposite ÷ adjacent.|Opposite:6 m > Adjacent:8 m > Tangent:6 ÷ 8 = ¾|The reference angle determines which leg is opposite.
areas-volumes|Area scales by k². Volume scales by k³.|Lengths:×2 > Surface area:×4 > Volume:×8|Capacity uses inside dimensions.
basic-probability|P(at least one) = 1 − P(none).|2 fair tosses:4 outcomes > No heads:TT → ¼ > At least 1 head:1 − ¼ = ¾|Without replacement, update the remaining total.
basic-statistics|Mean uses every value. Median uses the middle rank.|Ordered data:2, 4, 6, 8, 30 > Mean:50 ÷ 5 = 10 > Median:6|Sort first. With even n, average the middle two.
units-measurement|Square the length conversion for area. Cube it for volume.|Length:1 cm = 10⁻² m > Area:1 cm² = 10⁻⁴ m² > Volume:1 cm³ = 10⁻⁶ m³|Convert both numerator and denominator of compound units.
mass-weight-density|Weight = mg. Density = mass ÷ volume.|Object:2 kg, 1 L > Weight at g = 10:20 N > Density:2 kg/L|Mass stays fixed when local gravity changes.
work-power-energy|Work W = Fs cos θ. Average P = W ÷ t. Kinetic energy = ½mv².|Push and move:40 N × 5 m > Work:200 J > Over 4 seconds:50 W|A perpendicular force does zero work.
friction|Static friction adjusts up to μₛN. Sliding friction is modelled by μₖN.|Push:18 N > Static limit:30 N > Still at rest:friction = 18 N|Use the limiting value only at impending slip.
velocity-relative-motion|Average velocity = signed displacement ÷ time.|Out:+60 m > Back:−20 m > Over 10 s:+4 m/s|Average speed uses 80 m of distance here.
heat-temperature|Heating: Q = mcΔT. A phase change: Q = mL.|Before melting:temperature rises > During melting:T stays flat > After melting:temperature rises|Use the latent heat on the plateau.
basic-electricity|V = IR. Series shares current. Parallel shares voltage.|6 Ω ∥ 3 Ω:across 12 V > Branch currents:2 A and 4 A > Supply:6 A; total R = 2 Ω|Parallel resistance is below the smallest branch resistance.
levers-machines|Balance the moments about the pivot: effort × arm = load × arm.|Load:120 N at 10 cm > Moment:1,200 N·cm > 30 cm arm:effort = 40 N|Use the perpendicular distance from the pivot.
data-tables|An overall rate divides the total successes by the total count.|Morning:80 of 100 > Evening:30 of 50 > Overall:110/150 ≈ 73.3%|Raw counts and rates can rank groups differently.
multi-source-data|Match date, group and units before combining two sources.|Table:500 bookings > Chart:40% online > Count:500 × 0.40 = 200|Use the base for the group described by the rate.
data-bar-charts|A stacked segment is top boundary minus bottom boundary.|Bottom edge:30 > Top edge:70 > Segment size:70 − 30 = 40|Read the legend and axis scale first.
data-line-graphs|Slope = change in value ÷ change in time.|Read points:(1, 10), (4, 25) > Rise and run:15 over 3 > Rate:5 per day|Highest value and fastest rise are different comparisons.
scatter-plots|Residual = observed y − fitted y at the same x.|At x = 3:observed 9 > Fitted line:predicts 6 > Residual:+3|Association alone cannot establish cause.
data-pie-charts|Count = total × sector angle ÷ 360°.|Whole:400 tickets > Slice:90° = ¼ > Count:100 tickets|Comparing counts across pies requires both totals.
statistical-distributions|For a frequency-density histogram, frequency = width × height.|Bin A:5 × 4 = 20 > Bin B:10 × 3 = 30 > Larger count:B|Unequal bin widths make heights alone misleading.
venn-diagrams|At least one = A + B − both.|Group A:10 only + 5 both > Group B:7 only + 5 both > Union:10 + 5 + 7 = 22|Count the overlap once. Neither lies outside both.
data-sufficiency|Test each statement alone against the exact target.|Find x:I: x + y = 9 > Statement II:y = 4 > Together:x = 5|Keep statement I out of your test of II alone.
data-arrangement|With k items between two slots, their indices differ by k + 1.|P in slot:2 > Two between:gap = 3 > Q can use:slot 5 in a 5-slot row|One valid layout establishes possibility.
binary-logic|P ⇒ Q fails only when P is true and Q is false.|Rule:active ⇒ lit > Given:light is off > Deduce:signal inactive|A lit indicator alone cannot prove an active signal.
syllogisms|Containment travels forward: A ⊆ B ⊆ C gives A ⊆ C.|Sparrows:inside birds > Birds:inside animals > Therefore:sparrows are animals|“Some” must identify a member. “All” gives containment.
clock-angles|Hour hand moves 0.5°/min. Minute hand moves 6°/min.|Hour hand:3:30 → 105° > Minute hand:180° > Smaller angle:75°|Move the hour hand as minutes pass.
calendars|Shift weekdays by elapsed days modulo 7.|Given:Tuesday > After 16 days:16 mod 7 = 2 > Weekday:Thursday|Count a leap day only if the interval crosses it.
statement-assumptions|Negate the proposed assumption. Does the reasoning still work?|Plan:add a counter > Needed:it can serve the queue > Negate:cannot serve → plan fails|A plausible benefit can be irrelevant to the argument.
family-relations|Answer from the viewpoint of the person named after “to”.|Start:R > R’s mother:Q > Q’s brother:P, maternal uncle|Mark gender only when a clue establishes it.
logic-puzzles|Place fixed slots and immediate neighbours before loose clues.|Four floors:S below P > Linked pair:P immediately below Q > R above Q:S → P → Q → R|Check every clue on the same complete layout.
comprehension-main-idea|Main idea = topic + the author’s central claim.|Topic:park lighting > Evidence:glare and insect activity > Main point:shield lights and limit spill|A memorable detail may cover just one sentence.
comprehension-application|Carry the passage rule and all its conditions into the new case.|Rule:reserve + shut door > New case:reserved; door open > Result:condition unmet|An inference needs evidence from the passage.
comprehension-structure-style|Map what each sentence does: claim, contrast, evidence or result.|Benefit:updates are consistent > However:they can lag > Therefore:keep a manual backup|Support a tone choice with the writer’s words.
analogy|Name the relationship and preserve its direction.|Barometer:measures pressure > Same link:instrument → quantity > Odometer:measures distance|A similar theme can hide a different relationship.
number-series|Check differences, multipliers and alternating tracks.|Terms:5, 9, 15, 23 > Differences:+4, +6, +8 > Next:+10 gives 33|Verify the rule against every known transition.
letter-series|Number A to Z, and check separate columns in letter groups.|First column:B → E → H → K > Second column:C → F → I → L > Both +3:next group NO|Wrap after Z when the rule supports it.
coding-decoding|Track the order: rearrange first if the prompt says so, then shift.|Original:RAIL > Reverse:LIAR > +1, −1, +1, −1:MHBQ|Odd/even positions may change after reversal.
rankings|Opposite-end rank = total + 1 − known rank.|People:48 > B:12th from right > From left:49 − 12 = 37th|Count between two ranks with the same reference end.
seating-arrangements|In an evenly spaced circle, the opposite seat is N ÷ 2 steps away.|Start:A in a 6-seat circle > Opposite:B, 3 steps clockwise > Next clockwise:C, 4 steps from A|Facing out reverses personal left and right.
intelligence|Rotate and align the long arm. Check which side the short arm turns.|Anchor:long arm > Compare:turn direction > Reject mirror:branch changes sides|Equal cell counts do not establish a match.
attention|Filter the target digits first. Then perform the operation named.|Scan:7 8 7 2 3 > Keep odds:7 + 7 + 3 > Sum:17|Every repeated target contributes again.
spatial|Shortest route = least total distance along open streets.|Upper route:3 equal segments > Lower route:5 equal segments > Use upper:house 2|A visually adjacent street can be disconnected.
ordering|Place fixed slots, keep immediate neighbours together, then check gaps.|Fixed:T is last > Linked:M immediately before P > Example:K → R → M → P → T|One task between means a difference of two slots.
personality|Read the response scale and answer for your usual behaviour.|Prompt:“I ask for clarification” > Consider:typical situations > Respond:match your experience|Agreement and frequency scales ask different things.
`;

export const stationMasterRevision = new Map();
for (const row of rows.trim().split('\n')) {
  const [id, rule, model, trap] = row.split('|');
  if (!id || !rule || !model || !trap || stationMasterRevision.has(id)) {
    throw new Error('Invalid Station Master revision card: ' + row);
  }
  // Split at the label separator only. Values can contain additional punctuation.
  const steps = model.split(' > ').map(step => {
    const index = step.indexOf(':');
    if (index < 1 || index === step.length - 1) throw new Error('Invalid revision step: ' + step);
    return [step.slice(0, index), step.slice(index + 1)];
  });
  stationMasterRevision.set(id, { rule, steps, trap });
}
