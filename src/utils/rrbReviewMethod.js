import { stationMasterReviewTopic } from './stationMasterReviewTopics.js';

// Match question types explicitly. A formula from a worked table takes
// precedence over a rule shared by a topic.
const science = [
  [/simple interest/i, 'Simple interest = starting amount × annual percent × years ÷ 100'],
  [/compound interest/i, 'Final amount = starting amount × (1 + annual percent ÷ 100) ^ number of years'],
  [/exactly one is red/i, 'Total unordered pairs = total tokens × (total tokens − 1) ÷ 2. Pairs with exactly one red = red tokens × non-red tokens. Chance = matching pairs ÷ total pairs.'],
  [/unordered pairs.*exactly one/i, 'Number of pairs with exactly one urgent permit = number of urgent permits × number of other permits'],
  [/without replacement/i, 'Chance of both draws in the required order = chance on first draw × chance on second draw after updating both counts'],
  [/conditional chance|complementary probability/i, 'Chance = number of equally likely results that work ÷ number of equally likely results still possible'],
  [/probability|fair die/i, 'Chance = number of equally likely results that work ÷ number of equally likely results'],
  [/^hcf and lcm|least common multiple \(LCM\)/i, 'For two positive whole numbers, HCF × LCM = first number × second number'],
  [/highest common factor/i, 'HCF of two numbers is the last nonzero divisor when you divide by the remainder repeatedly'],
  [/equal packs/i, 'Greatest possible number of identical packs = HCF of the counts. Items per pack = total items ÷ number of packs.'],
  [/lcm|offsets/i, 'Repeating events that start together meet at multiples of LCM. Wait after a stated time = next meeting time − stated time.'],
  [/minimum batch/i, 'Minimum trips = total boxes ÷ capacity per trip, rounded up to a whole trip'],
  [/concentration|ratio and mixtures/i, 'Amount of ingredient = total mixture × concentration ÷ 100. Concentration (%) = amount of ingredient ÷ total mixture × 100.'],
  [/mixture and density|combined density/i, 'Mass = density × volume. Mixture density = sum of masses ÷ total volume.'],
  [/ratio after transfers/i, 'When one item moves from the larger group to the smaller, their difference drops by 2. Transfers needed to tie = initial difference ÷ 2.'],
  [/ratio|dividing in a/i, 'Value of one share = total amount ÷ total number of shares'],
  [/^successive percentages|percentage increase/i, 'Percentage change = (new amount − original amount) ÷ original amount × 100. For successive changes, multiply the separate change factors.'],
  [/percentage area change/i, 'Area multiplier = length multiplier × width multiplier. Percentage change = (area multiplier − 1) × 100.'],
  [/discount|rebate/i, 'Price after discount = price before discount × (1 − discount rate as a decimal). Profit = selling price − cost price.'],
  [/profit|successive sales/i, 'Profit = total selling price − total cost. Profit (%) = profit ÷ total cost × 100.'],
  [/median/i, 'Put the values in order. For an odd count take the middle entry. For an even count average the middle two.'],
  [/average speed|^speed and travel time|^time, speed and distance/i, 'Travel time = distance ÷ speed. Average speed = total distance ÷ total elapsed time.'],
  [/bridge.*overtakes/i, 'Train speed = (train length + bridge length) ÷ crossing time. Overtaking time = train length ÷ (train speed − cyclist speed).'],
  [/circular track/i, 'Time to meet again = length of the track ÷ sum of the speeds when running in opposite directions'],
  [/train lengths|relative (speed|velocity).*opposing/i, 'Closing speed = sum of speeds when moving towards each other. Time to pass completely = sum of lengths ÷ closing speed. Convert km/h to m/s by dividing by 3.6.'],
  [/average velocity|displacement/i, 'Displacement = sum of signed movements. Average velocity = displacement ÷ total elapsed time.'],
  [/relative velocity/i, 'Velocity of B as seen from A = velocity of B − velocity of A, using one sign convention'],
  [/speed unit conversion/i, 'Speed in m/s = speed in km/h ÷ 3.6'],
  [/force and acceleration|forces and acceleration|balanced forces/i, 'Acceleration = net force ÷ mass. With constant acceleration, final velocity = starting velocity + acceleration × elapsed time.'],
  [/speed over two acceleration/i, 'For each interval with constant acceleration, new velocity = previous velocity + acceleration × interval time'],
  [/average|mean/i, 'Total = average × count. Corrected average = corrected total ÷ count. For merged groups, add their totals and their counts before dividing.'],
  [/time and work|work rate|combined work rates/i, 'Work completed = rate × time. Time for the work left = amount left ÷ combined rate. For a full job, solo rate = 1 ÷ solo time.'],
  [/linear|equation/i, 'Write an equality using the values from the question. Do the same thing to both sides to keep the equality true.'],
  [/progression/i, 'Term n = first term + (n − 1) × step. Sum = number of terms × (first term + last term) ÷ 2.'],
  [/remainders?|number systems/i, 'Number = divisor × whole quotient + remainder, with the remainder between 0 and the divisor minus one'],
  [/trigonometry|tangent/i, 'tan(angle) = opposite side ÷ adjacent side. For height questions, those sides are the rise and the horizontal distance.'],
  [/similar triangles/i, 'Matching lengths are in the same ratio. Ratio of areas = (ratio of matching lengths)².'],
  [/circumference/i, 'Circle circumference = 2 × π × radius'],
  [/annular area/i, 'Ring area = π × (outer radius² − inner radius²)'],
  [/geometry and angles/i, 'Triangle angles total 180°. Angles on a straight line total 180°.'],
  [/courtyard.*path/i, 'Path area = outer rectangle area − courtyard area. Rectangle area = length × width.'],
  [/rectangle|equal area|combined areas/i, 'Rectangle area = length × width. For combined shapes, add their separate areas and subtract any overlapping part counted twice.'],
  [/cylinder.*identical spheres/i, 'Number of spheres = cylinder volume ÷ sphere volume. Cylinder volume = πr²h. Sphere volume = 4πr³ ÷ 3.'],
  [/unit conversion and wall volume/i, 'Number of blocks = (panel length × width × thickness × fraction occupied) ÷ volume per block. First put all lengths and volumes in matching units.'],
  [/unit conversion/i, 'Volume = length × width × thickness. Convert mm to cm by dividing by 10 before multiplying measurements in cm.'],
  [/si unit of force|derived units|units and measurement/i, '1 N = 1 kg·m/s². A derived unit is built by using the matching units in the defining equation.'],
  [/volume and cross section|flow and volume/i, 'Volume = cross-sectional area × height. Change in height = change in volume ÷ base area.'],
  [/volume by displacement/i, 'Object volume = water reading after submerging it − water reading before'],
  [/volume of a cube/i, 'Cube volume = side × side × side'],
  [/mass and weight/i, 'Weight = mass × gravitational field strength'],
  [/density|mass and volume/i, 'Density = mass ÷ volume. Mass = density × volume.'],
  [/pressure at equal loads/i, 'Pressure = perpendicular force ÷ contact area'],
  [/static friction/i, 'Maximum static friction = coefficient of static friction × support force. Below the limit, static friction balances the push.'],
  [/kinetic friction|work against friction/i, 'Sliding friction = coefficient of kinetic friction × support force. Work by friction = −friction force × distance when it acts opposite the motion.'],
  [/stopping distance/i, 'Net work = change in kinetic energy. For a constant opposing force, stopping distance = initial kinetic energy ÷ opposing force.'],
  [/^friction$/i, 'Net work = (pulling force − opposing force) × distance when both act along the line of motion'],
  [/work[–-]energy|work and kinetic energy|net work and motion/i, 'Kinetic energy = ½ × mass × speed². Net work = final kinetic energy − initial kinetic energy.'],
  [/kinetic energy/i, 'Kinetic energy = ½ × mass × speed²'],
  [/mechanical work/i, 'Work = force along the movement × displacement'],
  [/potential energy and power/i, 'Useful work to lift a load = mass × gravitational field strength × height. Power = work ÷ time. Efficiency (%) = useful output ÷ input × 100.'],
  [/mechanical power|specific power|power and efficiency/i, 'Power = work ÷ time. Efficiency (%) = useful output ÷ input × 100 when efficiency is asked for.'],
  [/mechanical advantage|simple machines/i, 'Mechanical advantage = load force ÷ effort force. Work = force × distance along the force. Efficiency = useful work ÷ input work.'],
  [/lever|moments/i, 'Turning effect = force × perpendicular distance from pivot. A balanced lever has equal total turning effects on both sides.'],
  [/thermal expansion/i, 'Length change = expansion per degree × temperature change. Final length = initial length + length change in the same units.'],
  [/calibration/i, 'Use the difference between the two known readings to find the scale factor. For a linear change, new reading = reference reading + change from the reference.'],
  [/thermal equilibrium|heat exchange|insulated calorimeter/i, 'Heat lost by the warmer part = heat gained by the cooler parts, where heat = mass × specific heat capacity × temperature change'],
  [/heater operates.*temperature rise/i, 'Heat delivered = power × time × fraction delivered. Temperature rise = heat delivered ÷ (mass × specific heat capacity).'],
  [/heat transferred|heating power|specific heat and power|heat capacity/i, 'Energy delivered = power × time × fraction transferred. Heat capacity = energy delivered ÷ temperature rise.'],
  [/energy cost|electrical energy/i, 'Energy in kWh = power in kW × time in hours. Energy charge = energy in kWh × price per kWh.'],
  [/parallel branches|parallel changes|parallel circuits|electricity in series|series circuits|electrical power|circuits|ohm/i, 'V = I × R. Power = V × I = I²R = V² ÷ R. Series shares current and parallel branches share voltage across their ends.']
];

const scienceStemRules = [
  [/a signal cycles through/i, 'Displayed setting = remainder after dividing (starting setting + number of advances) by number of settings'],
  [/mixture contains milk and water in the ratio/i, 'Amount per ratio part = mixture volume ÷ total parts. Water to add = amount of milk − starting amount of water when the goal is equal amounts.'],
  [/blocks of equal mass receive the same amount of heat/i, 'Heat = mass × specific heat capacity × temperature rise. With equal heat and mass, cX ÷ cY = temperature rise of Y ÷ temperature rise of X.'],
  [/SI unit of pressure/i, 'Pressure = force ÷ area. 1 Pa = 1 N/m² = 1 kg/(m·s²).'],
  [/passes a second train moving towards it/i, 'Closing speed = (sum of speeds in km/h) ÷ 3.6. Second train length = closing speed × passing time − first train length.']
];

const data = [
  [/tabular comparison/i, 'Total count = sum of the counts in all rows the question asks you to include'],
  [/actual versus target|weighted attainment/i, 'Actual amount = target × percent attained ÷ 100. Change in amount = new actual amount − old actual amount.'],
  [/percentage.point|difference between proportions/i, 'Rate (%) = matching count ÷ matching total × 100. Difference in percentage points = new rate (%) − old rate (%).'],
  [/percentage growth|relative.*original|percentage comparison/i, 'Percentage change = (new − old) ÷ original × 100'],
  [/correct.*residual|reading a residual|scatter plot|reference line/i, 'Residual = observed value − value predicted at the same horizontal position. Slope = change in height ÷ change in horizontal position.'],
  [/inference and prediction|limits of prediction/i, 'Check the range of measured values. Predictions beyond that range need a new assumption about how the pattern continues.'],
  [/robust comparison/i, 'For each summary, list the points it uses. Changing another point leaves a calculation from those fixed points unchanged.'],
  [/exactly two services|exactly two sets|exclusive and inclusive/i, 'Exactly two = sum of counts in each pair only. For each pair, subtract the all-three count from the overlap.'],
  [/complementary counts/i, 'Number in none = whole group − number in at least one group'],
  [/set intersection/i, 'Number in both = size of first group + size of second group − size of their union'],
  [/set inclusion|set union|three.set union|inclusion.exclusion|set operations|venn diagrams|set overlap/i, 'Count each item once in the union. For two sets, add their sizes and subtract their shared count. For three sets, subtract all pairs and add back the all-three count.'],
  [/^subsets$/i, 'Number in A and B only = number in A and B − number also in C'],
  [/counterfactual update|corrected survey record/i, 'Move each changed record out of its original group and into its new group. Then count only the regions named in the question.'],
  [/exactly one|one set only|exclusive membership/i, 'For two sets, only A = A − both and only B = B − both. Exactly one = only A + only B.'],
  [/conditional|subset mean|share of a subset|different denominators/i, 'Use only the group requested. Share = count meeting the condition ÷ total in that group. For a mean, divide the sum in that group by its count.'],
  [/changing two shares/i, 'Amount to move = difference between the two amounts ÷ 2, because moving one unit reduces one side and increases the other'],
  [/combining proportions/i, 'Share of the combined group = target part ÷ sum of the named parts. You can use their angles when the parts come from one pie.'],
  [/pie|sector|slice|chart to amount|combined angles|chart recalculation|budget reallocation|fixed total reallocation|shares after a transfer/i, 'Sector amount = whole amount × angle ÷ 360°. Sector angle = sector amount ÷ matching whole × 360°.'],
  [/median|upper tail/i, 'Use running frequency totals to find the rank or cutoff. For an even-sized group’s median, average the two middle values.'],
  [/corrected records/i, 'Corrected total = old total − old entry + replacement entry. Corrected mean = corrected total ÷ number of entries.'],
  [/additional records|inference from aggregate data/i, 'Missing value = mean × number of entries − sum of the known entries'],
  [/frequency tables|combined frequencies|weighted mean|weighted averages|weighted consumption|sample mean|pooled observations|corrected observations|comparing means|comparison with averages/i, 'Multiply each value by its count to find its contribution to the total. Mean = total contribution ÷ total count.'],
  [/weighted rates|weighted utilisation|aggregate quality rate|rates versus counts|recomputed monthly figures/i, 'Overall rate (%) = sum of counts that qualify ÷ sum of their matching totals × 100'],
  [/tail probability|shares and bounds/i, 'Requested fraction = number of observations passing the cutoff ÷ total number of observations'],
  [/^variation$|maximum consistent change/i, 'Range = largest possible value − smallest possible value'],
  [/trends|new sample size/i, 'Difference = larger count − smaller count, using only the two counts being compared'],
  [/combining sources/i, 'Multiply each share by the whole it refers to. When one group sits inside another, find the outer group first.'],
  [/corrected rate|recomputed denominator|counterfactual rates/i, 'New rate (%) = updated count that qualifies ÷ updated total × 100'],
  [/spare capacity|occupancy above a threshold|counterfactual allocation/i, 'Empty spaces = full capacity − spaces used. Moving items within the same pool leaves the combined number of items and empty spaces unchanged.'],
  [/determining a feasible range/i, 'Number of allowed whole values = largest allowed value − smallest allowed value + 1, when every value in between is allowed'],
  [/determining feasible allocation/i, 'To get the largest difference, give one group the smallest allowed amount and the other group what is left'],
  [/transfer across categories/i, 'Each transferred item changes the gap by 2. Number to move = amount the gap must change ÷ 2.'],
  [/meeting a rejection threshold/i, 'Fixes needed = current rejected count − largest rejected count allowed, or zero if already within the limit'],
  [/reclassification between fare groups/i, 'Change in receipts = number of tickets moved × (new fare − original fare)'],
  [/price change with fixed demand/i, 'Extra receipts = increase per ticket × unchanged number of tickets'],
  [/net receipts after refunds|receipts|weighted fare|weighted ticket price|bundled fares|two-way tables/i, 'Receipts = tickets paid for × fare per ticket. Add receipts for each ticket group. Subtract refunds when asked for net receipts.'],
  [/combining total and difference|rebalancing a difference|arrangement from totals/i, 'If A + B = total and A − B = difference, A = (total + difference) ÷ 2 and B = (total − difference) ÷ 2.'],
  [/bounds and inferred data/i, 'Total = mean × count. Take away the known values first. Use the remaining total and the stated gap to find the missing values.'],
  [/pooling a distribution with a fixed target/i, 'Total above target = sum of observed delays − target delay × number of observations']
];

const counterRules = [
  [/how many counters were observed/i, 'Total counters = sum of the numbers of counters in each row or bar'],
  [/at least the modal number/i, 'Mode = ticket count with the largest frequency. Share = tickets from counters at or above the mode ÷ tickets from all counters.'],
  [/how many tickets did all observed counters/i, 'Tickets sold = sum of (tickets sold per counter × number of counters in that group)'],
  [/mean tickets sold per observed counter/i, 'Mean tickets per counter = total tickets sold ÷ total number of counters'],
  [/total revenue be determined/i, 'Revenue = sum of the prices paid for all tickets. Ticket counts alone leave those prices unknown.']
];

const logicRules = [
  [/clock frequency with a fixed maximum/i, 'Put the counts in the order the clues require. Absolute difference = larger count − smaller count.'],
  [/time.*clock|clock hands|clock angle|^clocks?$/i, 'After m minutes past hour h, the signed gap is 30h − 5.5m degrees. The smaller angle is at most 180°.'],
  [/calendar|weekday/i, 'A full week leaves the weekday unchanged. Weekday shift = elapsed days modulo 7, the days remaining after full weeks.'],
  [/relative direction/i, 'Net movement in one direction = distance that way − distance in the opposite direction'],
  [/rank in a combined list/i, 'New rank = old rank − removals ahead + additions ahead. Changes behind you leave your rank the same.'],
  [/^rank|rankings from|^opposite ranks|relative rank/i, 'Rank from one end = total + 1 − rank from the other end. People strictly between two positions = larger rank − smaller rank − 1.'],
  [/lower bound from intersecting sets|one common member/i, 'The count in both groups is at least their two sizes added together minus the size of the whole group, and at least zero.']
];

const reasoningRules = [
  [/assumption|necessary versus sufficient/i, 'Try making the proposed assumption false. If the stated argument still works, it does not need that assumption.'],
  [/syllogism|class inclusion|negat|counterexample/i, 'Use only the groups and overlap the statements give you. A conclusion is forced only if it holds in every allowed case.'],
  [/truth|binary|alarm state|condition|contrapositive|exception|constraint|possib|forced statement|counting with|counting under|excluded option|stated policy/i, 'Try each allowed case against every rule. A single case that breaks a universal claim is enough to rule it out.'],
  [/claim|confounding|evaluat|inferen|evidence|alternative explanation|validity of a test/i, 'Keep the observations separate from the proposed explanation. Check which claim those observations actually support and whether another explanation could fit.'],
  [/family|kinship/i, 'Start from the named person and follow one relationship at a time, keeping track of generation and side of the family.'],
  [/cipher|coding|encode|^decode|positional code/i, 'Apply the coding steps in the given order. To decode, undo the last step first and work backwards.'],
  [/series|progression|sequence|recurrence|gaps|letter cluster|interior square/i, 'Check the jumps between neighbours. If every other term follows a separate rule, make two rows and test each row on its own.'],
  [/analogy|analogue/i, 'Find the link between the first two items. Keep the same direction and steps when you apply it to the next pair.'],
  [/interchanging operators/i, 'Replace each symbol once using the given rule. Then perform the arithmetic in its usual order.'],
  [/minimum block condition/i, 'Count the shared whole numbers from the higher start to the lower end. If they overlap, the count is end − start + 1.'],
  [/order|schedule|arrangement|floor|slot/i, 'Place clues that fix a position first. Keep immediate neighbours together and check the final order against every clue.'],
  [/sufficiency|missing data/i, 'Try to make two different answers while keeping the supplied facts true. If you can, more information is needed.']
];

const batteryRules = {
  intelligence:'A turn keeps the squares joined in the same places. Line up a long side, then check which way the short side points.',
  attention:'Total = sum of the digits that pass the stated rule. Count every matching digit once, including repeated ones.',
  spatial:'Follow only open links. If they are equally long, the shortest route uses the fewest links. Read the house number from that route.',
  ordering:'Try each position rule on the proposed order. Keep an order only when every rule works.'
};

const matchingRule = (rules, text) => rules.find(([pattern]) => pattern.test(text))?.[1];

export function rrbReviewMethod(question, solution, battery) {
  if (battery && batteryRules[battery]) return {heading:'Rule used', text:batteryRules[battery]};
  const topic = question.topic ?? '';
  const stem = question.question ?? '';
  if (question.passage && /reading/i.test(topic)) {
    return {heading:'Rule used', text:'Use the passage as your evidence. Choose the answer the words support, keeping the same scope as the question.'};
  }
  if (solution.rule?.formula) {
    return {heading:'Formula used', equation:solution.rule};
  }
  const section = question.section;
  const scienceText = topic === 'Arithmetic and basic science' ? stationMasterReviewTopic(question)?.title ?? stem : topic;
  const appliedScienceRule = /^(Probability without replacement|Relative speed|Areas|Volumes|Heat and temperature)$/.test(topic)
    ? matchingRule(science, stem) : null;
  const counterRule = topic === 'Statistical distributions and sufficiency' ? matchingRule(counterRules, stem) : null;
  const text = section === 'Basic Science and Mathematics' ? matchingRule(scienceStemRules, stem) ?? appliedScienceRule ?? matchingRule(science, scienceText)
    : section === 'Data Analysis' ? counterRule ?? matchingRule(data, topic)
    : matchingRule(logicRules, topic);
  if (text) return {heading:text.includes('=') ? 'Formulas used' : 'Rule used', text};
  const reasoning = matchingRule(reasoningRules, topic);
  if (reasoning) return {heading:'Rule used', text:reasoning};
  const check = section === 'Data Analysis'
    ? 'Keep each value with its own row, unit and time period. Compare the values using the measure named in the question.'
    : 'Use the facts or calculation shown in the steps to check that the answer fits the question.';
  return {heading:'Check your answer', text:check};
}
