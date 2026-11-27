export const stationMasterFormulaDeck = {
  'Basic Maths': [
    {
      id:'number-system', title:'Divisibility and remainders', expression:'Remainder = number − (divisor × quotient)',
      rule:'For division by 3 or 9, test the digit sum. For division by 4, test the last two digits. A remainder is always smaller than the positive divisor.',
      example:['To divide 347 by 9, add its digits. 3 + 4 + 7 = 14.', '14 = 9 × 1 + 5, so 347 also leaves remainder 5.'],
      trap:'The digit-sum shortcut applies to 3 and 9. Use the rule for the actual divisor.'
    },
    {
      id:'lcm-hcf', title:'LCM and HCF', math:'\\operatorname{HCF}(a,b)\\times\\operatorname{LCM}(a,b)=ab',
      rule:'For positive integers, the HCF uses the smallest shared powers of primes. The LCM uses the largest power of every prime that appears.',
      example:['12 = 2² × 3 and 18 = 2 × 3².', 'HCF = 2 × 3 = 6. LCM = 2² × 3² = 36.', 'Check: 6 × 36 = 12 × 18 = 216.'],
      trap:'HCF answers how large equal groups can be. LCM answers when repeating events first line up together.'
    },
    {
      id:'ratio-proportion', title:'Ratio, proportion and mixtures', math:'\\text{Share}=\\frac{\\text{part}}{\\text{total parts}}\\times\\text{total}',
      rule:'Treat each ratio number as a count of equal shares. In a mixture, concentration is ingredient amount divided by total mixture amount.',
      example:['A 20 L drink has juice and water in the ratio 2:3. There are 5 parts.', 'One part is 20 ÷ 5 = 4 L. Juice is 2 × 4 = 8 L.', 'Juice concentration is 8 ÷ 20 × 100 = 40%.'],
      trap:'In a 2:3 juice-to-water ratio, the fraction of juice in the full drink is 2/5.'
    },
    {
      id:'averages', title:'Mean and combined average', math:'\\bar x=\\frac{n_1\\bar x_1+n_2\\bar x_2}{n_1+n_2}',
      rule:'Convert each group’s mean into its total. Combine those totals and divide by the combined number of entries.',
      example:['4 scores average 10, so their total is 4 × 10 = 40.', '6 scores average 20, so their total is 6 × 20 = 120.', 'The combined average is (40 + 120) ÷ (4 + 6) = 16.'],
      trap:'A direct average of two group means works if the groups have equal sizes.'
    },
    {
      id:'percentages', title:'Percentage change and successive changes', math:'\\%\\text{ change}=\\frac{\\text{new}-\\text{original}}{\\text{original}}\\times100',
      rule:'Convert each increase or decrease to a multiplier. A 20% rise multiplies by 1.20. A 10% fall multiplies by 0.90.',
      example:['Start with 100. A 20% rise gives 100 × 1.20 = 120.', 'A 10% fall from 120 gives 120 × 0.90 = 108.', 'The combined result is an 8% increase from the original 100.'],
      trap:'Successive changes usually have different starting amounts. Multiply their factors before comparing with the original.'
    },
    {
      id:'profit-loss-discount', title:'Profit, loss and discount', math:'\\text{Profit\\%}=\\frac{SP-CP}{CP}\\times100',
      rule:'Profit and loss percentages use cost price (CP). A discount uses marked price. Selling price (SP) is the price paid after the discount.',
      example:['An item costs ₹800 and is marked ₹1,000. A 10% discount saves ₹100.', 'Selling price = ₹900. Profit = ₹900 − ₹800 = ₹100.', 'Profit percentage = 100 ÷ 800 × 100 = 12.5%.'],
      trap:'Identify the base price of each percentage before calculating.'
    },
    {
      id:'interest', title:'Simple and compound interest', math:'SI=\\frac{Prt}{100}\\quad A=P\\left(1+\\frac{r}{100}\\right)^t',
      rule:'P is the original principal, r is the annual percent and t is time in years. In compound interest with annual compounding, A includes the principal and the interest.',
      example:['On ₹1,000 at 10% for two years, simple interest is 1,000 × 10 × 2 ÷ 100 = ₹200.', 'Annual compounding gives ₹1,000 × 1.10 × 1.10 = ₹1,210.', 'Compound interest = ₹1,210 − ₹1,000 = ₹210.'],
      trap:'Use the rate and time for the compounding period if the question uses a period other than one year.'
    },
    {
      id:'time-and-distance', title:'Speed, distance and average speed', math:'v_{\\text{avg}}=\\frac{\\text{total distance}}{\\text{total time}}',
      rule:'Distance = speed × time. Convert km/h to m/s by multiplying by 5/18. Use total elapsed time for a trip’s average speed.',
      example:['A 60 km leg at 30 km/h takes 2 h. A 60 km return at 60 km/h takes 1 h.', 'Average speed = (60 + 60) ÷ (2 + 1) = 40 km/h.'],
      trap:'A plain average of speeds works only for equal time intervals.'
    },
    {
      id:'time-and-work', title:'Time and work rates', math:'r_{\\text{net}}=r_1+r_2\\quad\\text{with}\\quad r=\\frac{1}{t}',
      rule:'Treat the full task as one job. A person who takes t days completes 1/t of the job per day. Give an outlet or an undoing process a negative rate.',
      example:['One worker completes 1/6 of the job per day and another completes 1/12.', 'Together they complete 1/6 + 1/12 = 3/12 = 1/4 of the job per day.', 'One job at 1/4 per day takes 4 days.'],
      trap:'Add rates for simultaneous work. Add times only for consecutive stages.'
    },
    {
      id:'algebra', title:'Algebraic identities and factorisation', math:'(a+b)^2=a^2+2ab+b^2\\qquad a^2-b^2=(a-b)(a+b)',
      rule:'Expand a square by keeping the middle product twice. Factor a difference of squares into the product of a sum and a difference.',
      example:['48 × 52 = (50 − 2)(50 + 2).', 'Use the difference of squares. 50² − 2² = 2,500 − 4 = 2,496.'],
      trap:'When you square a sum, include 2ab. When you square a difference, the middle term is −2ab.'
    },
    {
      id:'linear-equations', title:'Linear equations and elimination', expression:'Keep equality by doing the same operation to both sides',
      rule:'Isolate one unknown by undoing operations. For two equations, add or subtract equations with matching coefficients to eliminate a variable.',
      example:['Given x + y = 12 and x − y = 4, add both equations.', 'The y terms cancel. 2x = 16, so x = 8.', 'Then 8 + y = 12, so y = 4. Check 8 − 4 = 4.'],
      trap:'When subtracting an equation, change the sign of every term being subtracted.'
    },
    {
      id:'arithmetic-progression', title:'Arithmetic progressions', math:'a_n=a+(n-1)d\\quad S_n=\\frac{n}{2}(a+a_n)',
      rule:'An arithmetic progression adds the same difference d each time. Starting at term 1, reaching term n takes n − 1 jumps.',
      example:['For 5, 8, 11, … the first term a = 5 and d = 3.', 'Term 10 = 5 + 9 × 3 = 32.', 'The first 10 terms sum to 10 ÷ 2 × (5 + 32) = 185.'],
      trap:'This sum formula applies to equally spaced terms.'
    },
    {
      id:'geometry', title:'Angles, similar triangles and circles', math:'A_{\\triangle}=\\tfrac12 bh\\quad C=2\\pi r',
      rule:'A triangle’s angles add to 180°. Similar triangles have equal corresponding angles and the same ratio of corresponding side lengths. Circle circumference uses radius r.',
      example:['Two similar triangles have matching bases 6 cm and 9 cm. The length scale is 9/6 = 1.5.', 'A 4 cm height in the smaller triangle becomes 6 cm in the larger one.', 'The areas are ½ × 6 × 4 = 12 cm² and ½ × 9 × 6 = 27 cm².'],
      trap:'Area scales with the square of the length ratio.'
    },
    {
      id:'trigonometry', title:'Right-triangle trigonometry', math:'\\sin\\theta=\\frac{O}{H}\\quad\\cos\\theta=\\frac{A}{H}\\quad\\tan\\theta=\\frac{O}{A}',
      rule:'Choose the reference angle first. O is its opposite side, A is its adjacent leg and H is the hypotenuse opposite the right angle.',
      example:['From a point 12 m from a tower, the angle of elevation is 45°.', 'tan 45° = height ÷ 12 = 1. The height above the observer’s eye level is 12 m.'],
      trap:'Add the observer’s eye height when the question wants the full height from ground level.'
    },
    {
      id:'areas-volumes', title:'Areas, volumes and capacity', math:'A=\\pi r^2\\qquad V_{\\text{cylinder}}=\\pi r^2h',
      rule:'Area measures a surface. Volume measures the space inside a solid. For a prism or cylinder, multiply the constant cross-sectional area by length or height.',
      example:['A cylinder has radius 5 cm and height 12 cm.', 'Its base area is π × 5² = 25π cm². Volume = 25π × 12 = 300π cm³.', 'Since 1 cm³ = 1 mL, this is 300π mL, about 942 mL.'],
      trap:'Square or cube the unit conversion along with the measurement. Use radius, which is half the diameter.'
    },
    {
      id:'basic-probability', title:'Probability and draws without replacement', math:'P(E)=\\frac{\\text{favourable outcomes}}{\\text{equally likely outcomes}}',
      rule:'Use equally likely outcomes in the count. For successive draws without replacement, update the counts after the first draw.',
      example:['A bag contains 3 red and 2 blue tokens. The chance of drawing red first is 3/5.', 'After drawing red and keeping it out, 2 red remain among 4 tokens.', 'The chance of two red tokens is (3/5) × (2/4) = 3/10.'],
      trap:'Across different possible orders, calculate each order with the right updated counts and then add the disjoint cases.'
    },
    {
      id:'basic-statistics', title:'Mean, median, mode and range', math:'\\bar x=\\frac{\\sum x_i}{n}\\qquad\\text{range}=\\max-\\min',
      rule:'The mean shares the total evenly. Sort the values to find the median. The mode appears most often. The range measures the spread from smallest to largest.',
      example:['Sort 2, 2, 5 and 11. Mean = 20 ÷ 4 = 5.', 'Median = (2 + 5) ÷ 2 = 3.5. Mode = 2. Range = 11 − 2 = 9.'],
      trap:'If the number of entries is even, the median is the average of the two middle values.'
    }
  ],
  'Basic Science': [
    {
      id:'units-measurement', title:'SI units and conversions', expression:'1 N = 1 kg·m/s²   ·   1 J = 1 N·m   ·   1 W = 1 J/s',
      rule:'Keep units consistent before substituting. Convert lengths first, then square or cube the conversion factor for area or volume.',
      example:['1 cm = 0.01 m, so 1 cm³ = (0.01)³ m³ = 0.000001 m³.', 'A density of 1 g/cm³ is 0.001 kg ÷ 0.000001 m³ = 1,000 kg/m³.'],
      trap:'When converting cubic centimetres, multiply the centimetre-to-metre factor three times.'
    },
    {
      id:'mass-weight-density', title:'Mass, weight and density', math:'W=mg\\qquad \\rho=\\frac{m}{V}',
      rule:'Mass m is measured in kilograms. Weight W is the gravitational force in newtons. Density ρ is mass per unit volume.',
      example:['An object has mass 2 kg and volume 0.001 m³.', 'At g = 9.8 m/s² its weight is 2 × 9.8 = 19.6 N.', 'Density = 2 ÷ 0.001 = 2,000 kg/m³.'],
      trap:'When the gravitational field changes, the object’s weight changes while its mass stays the same.'
    },
    {
      id:'pressure', title:'Pressure and contact area', math:'p=\\frac{F_{\\perp}}{A}',
      rule:'Pressure is perpendicular force spread over a contact area. The SI unit is the pascal, equal to one newton per square metre.',
      example:['A 200 N load rests on 0.04 m². Pressure = 200 ÷ 0.04 = 5,000 Pa.', 'Halve the contact area with the same load and the pressure doubles to 10,000 Pa.'],
      trap:'Use the face in contact with the surface and convert its area to m² when working in pascals.'
    },
    {
      id:'velocity-relative-motion', title:'Velocity, acceleration and relative motion', math:'v_{A/B}=v_A-v_B\\qquad a=\\frac{v-u}{t}',
      rule:'Choose a positive direction and use signed velocities. Constant acceleration means velocity changes by the same amount per second.',
      example:['Train A moves east at +20 m/s and train B moves west at −15 m/s.', 'A’s velocity relative to B is 20 − (−15) = +35 m/s.'],
      trap:'Average velocity uses displacement. Average speed uses total distance.'
    },
    {
      id:'net-force', noteId:'velocity-relative-motion', title:'Net force and acceleration', math:'F_{\\text{net}}=ma',
      rule:'Add forces with direction. If forces balance, the acceleration is zero, so an object can remain still or keep moving at constant velocity.',
      example:['A 4 kg cart is pulled right by 22 N and left by 6 N.', 'Net force = 22 − 6 = 16 N to the right.', 'Acceleration = 16 ÷ 4 = 4 m/s² to the right.'],
      trap:'Use the combined net force in F = ma.'
    },
    {
      id:'friction', title:'Static and kinetic friction', math:'f_s\\leq \\mu_sN\\qquad f_k=\\mu_kN',
      rule:'Static friction matches the force trying to slide an object up to its limit. In the common dry-friction model, kinetic friction has magnitude μₖN when sliding.',
      example:['A box has N = 50 N and μₛ = 0.4, giving a 20 N static limit.', 'If a horizontal 12 N push acts on the resting box, static friction is 12 N in the opposite direction.'],
      trap:'Use μₛN as the maximum static friction. The actual static friction can be smaller.'
    },
    {
      id:'work-power-energy', title:'Work, energy and power', math:'W=Fs\\cos\\theta\\qquad P=\\frac{W}{t}',
      rule:'A force does work through displacement along its direction. Kinetic energy = ½mv². Near Earth, lifting a mass by h raises its gravitational potential energy by mgh.',
      example:['A 20 N force moves a box 5 m in the force’s direction.', 'Work = 20 × 5 = 100 J.', 'If it takes 4 s, average power = 100 ÷ 4 = 25 W.'],
      trap:'Force perpendicular to motion does zero work. Doubling speed quadruples kinetic energy.'
    },
    {
      id:'efficiency', noteId:'work-power-energy', title:'Efficiency and useful output', math:'\\eta=\\frac{\\text{useful output}}{\\text{total input}}\\times100\\%',
      rule:'Efficiency compares the portion of input that becomes useful output. Use energy on both sides or power on both sides.',
      example:['A motor draws 500 W and delivers 400 W of useful power.', 'Efficiency = 400 ÷ 500 × 100% = 80%.', 'The remaining 100 W is transferred in other ways, such as heating.'],
      trap:'When given efficiency and output, divide the output by efficiency as a decimal to find input.'
    },
    {
      id:'heat-temperature', title:'Specific heat and thermal equilibrium', math:'Q=mc\\Delta T',
      rule:'Q is heat transferred, m is mass and c is specific heat capacity. For an insulated mixture without phase changes, heat lost by the warmer part equals heat gained by the cooler part.',
      example:['Mix 200 g of water at 60°C with 300 g of water at 20°C, with negligible heat loss.', 'The final temperature T satisfies 200(60 − T) = 300(T − 20).', 'So 18,000 = 500T and T = 36°C.'],
      trap:'For a temperature change, 1°C equals 1 K. For an absolute temperature, convert using K = °C + 273.15.'
    },
    {
      id:'basic-electricity', title:'Ohm’s law, series and parallel circuits', math:'V=IR\\qquad R_{\\rm series}=\\sum R_i\\qquad \\frac{1}{R_{\\rm parallel}}=\\sum\\frac{1}{R_i}',
      rule:'Series components share the same current and their voltage drops add. Parallel branches connected across the same two points share their voltage and their currents add.',
      example:['Put 6 Ω and 3 Ω resistors in parallel across 12 V.', 'The branch currents are 12 ÷ 6 = 2 A and 12 ÷ 3 = 4 A.', 'Total current is 6 A, so equivalent resistance is 12 ÷ 6 = 2 Ω.'],
      trap:'For positive resistances, a parallel equivalent is smaller than the smallest branch resistance.'
    },
    {
      id:'electrical-energy', noteId:'basic-electricity', title:'Electrical power and energy bills', math:'P=VI=I^2R=\\frac{V^2}{R}\\qquad E=Pt',
      rule:'Use P = VI for electrical power. The resistance-based forms come from Ohm’s law. Multiply kilowatts by hours to get kilowatt-hours (kWh).',
      example:['A 500 W appliance runs 4 h. 500 W = 0.5 kW.', 'Energy used is 0.5 × 4 = 2 kWh.', 'At ₹7 per kWh, the energy charge is 2 × ₹7 = ₹14.'],
      trap:'A kW is a unit of power. A kWh is a unit of energy.'
    },
    {
      id:'levers-machines', title:'Moments, levers and mechanical advantage', math:'\\tau=F d_{\\perp}\\qquad MA=\\frac{\\text{load force}}{\\text{effort force}}',
      rule:'A moment is a force’s turning effect about a pivot. A balanced lever has equal total clockwise and anticlockwise moments.',
      example:['A 120 N load sits 0.25 m from the pivot. Its moment is 30 N·m.', 'Apply the effort 0.75 m away on the opposite side. Required effort = 30 ÷ 0.75 = 40 N.', 'Mechanical advantage = 120 ÷ 40 = 3.'],
      trap:'Use the perpendicular distance from the pivot to the line of action of the force.'
    }
  ],
  'Logical Capability': [
    {
      id:'binary-logic', title:'AND, OR and if–then rules', expression:'“If P, then Q” fails only when P is true and Q is false',
      rule:'AND requires both parts to be true. Inclusive OR needs at least one true part. A conditional lets you infer “not P” from “not Q.”',
      example:['Rule: If the platform is closed, the sign is lit.', 'The sign is dark, so the platform cannot be closed under that rule.', 'If the sign is lit, the rule alone leaves the platform’s status open.'],
      trap:'The converse “if Q, then P” needs its own evidence.'
    },
    {
      id:'syllogisms', title:'Syllogisms and set diagrams', expression:'All A are B and all B are C ⇒ all A are C',
      rule:'Draw “all” as containment, “no” as separation and “some” as at least one member in an overlap. A conclusion must survive every arrangement allowed by the clues.',
      example:['All tickets are slips. No slips are metal objects.', 'Draw tickets inside slips and keep slips away from metal objects.', 'Every ticket is a slip, so no ticket is a metal object.'],
      trap:'“All A are B” gives containment. It doesn’t prove that any A exist or that all B are A.'
    },
    {
      id:'clock-angles', title:'Clock-hand angles', math:'\\theta=\\left|30h-5.5m\\right|',
      rule:'The hour hand moves 0.5° per minute and the minute hand moves 6° per minute. Use the hour h on a 12-hour dial with 12 as 0. For the smaller angle, take the lesser of θ and 360° − θ.',
      example:['At 3:20, the hour hand is at 3 × 30° + 20 × 0.5° = 100°.', 'The minute hand is at 20 × 6° = 120°.', 'Their smaller angle is |120° − 100°| = 20°.'],
      trap:'The hour hand moves between hour marks as the minutes pass.'
    },
    {
      id:'calendars', title:'Calendar shifts and leap years', math:'\\text{weekday shift}=\\text{elapsed days}\\bmod 7',
      rule:'Each full week has no effect on the weekday. A leap year is divisible by 4, except a century year must also be divisible by 400.',
      example:['Suppose today is Monday. In 17 days, the shift is 17 ÷ 7 with remainder 3.', 'Move three days forward from Monday to Thursday.'],
      trap:'Check whether the interval includes 29 February. For an elapsed-day question, begin counting the day after the start.'
    },
    {
      id:'statement-assumptions', title:'Assumptions and conclusions', expression:'Negate a proposed assumption and see whether the reasoning breaks',
      rule:'An assumption is an unstated premise the argument needs. A conclusion is the claim the stated evidence is meant to support.',
      example:['“Move the bus stop closer so users walk less.”', 'A necessary assumption is that the move shortens the walk for the users being discussed.', 'If their walks stay the same or get longer, the stated reason for the move fails.'],
      trap:'A helpful fact may make an argument stronger without being required for it.'
    },
    {
      id:'family-relations', title:'Family relations and generations', expression:'Trace the relationship from the named person',
      rule:'Draw each generation on its own row. Connect parents to children and keep siblings at the same level. Record gender only when given or implied by a relationship word.',
      example:['Asha is Ravi’s sister. Ravi is Meera’s father.', 'Asha and Ravi are on the same generation row. Meera is one row below Ravi.', 'Asha is Meera’s aunt on her father’s side.'],
      trap:'Check which person is the reference. “A’s relation to B” asks what A is to B.'
    },
    {
      id:'logic-puzzles', title:'Constraint puzzles and forced conclusions', expression:'A forced answer holds in every valid arrangement',
      rule:'Start with fixed clues. Keep clues like “immediately before” as a single ordered block. Test the remaining arrangements against every condition.',
      example:['A, B and C fill three slots. B is immediately after A and C is not first.', 'The block AB can start in slot 1 or 2.', 'The second placement gives CAB, which puts C first. Only ABC works.'],
      trap:'A valid arrangement proves that something can happen. Rule out every alternative before saying it must happen.'
    },
    {
      id:'comprehension-main-idea', title:'Reading comprehension: main and supporting ideas', expression:'Main idea = the claim that ties together the supporting details',
      rule:'Put the passage’s central claim into one sentence. Use dates, names, examples and statistics as evidence for that claim.',
      example:['A paragraph describes three villages cutting water waste after repairing leaks.', 'The repairs and village figures support the idea that fixing leaks reduced waste.', 'An option focused on a single village covers only one example.'],
      trap:'A true detail can be too narrow to be the main idea.'
    },
    {
      id:'comprehension-application', title:'Reading comprehension: evidence and inference', expression:'A supported inference follows from the words and their context',
      rule:'Find the sentence or pair of sentences that provides evidence. Choose the smallest conclusion those lines justify.',
      example:['The notice says the bridge was closed for inspection and reopened by noon.', 'Anyone who needed to cross while it was closed would have had to wait or use another route.', 'The notice gives no reason to assume the bridge was damaged.'],
      trap:'Match the strength of the answer to the strength of the evidence. “Some” and “always” make different claims.'
    },
    {
      id:'comprehension-structure-style', title:'Reading comprehension: structure and tone', expression:'Look for the job each paragraph does',
      rule:'A paragraph may introduce a claim, give evidence, present a contrast or qualify the conclusion. Signposts such as “however” and “therefore” make the relationship easier to see.',
      example:['A passage lists the benefits of an app, then begins the next paragraph with “However, access remains uneven.”', 'The second paragraph qualifies the first. The tone is measured if the author weighs benefits and limits.'],
      trap:'Use the author’s own wording to judge tone. The passage’s subject may be emotional while the author writes calmly.'
    }
  ],
  'Mental Reasoning': [
    {
      id:'analogy', title:'Number, letter and word analogies', expression:'Find the relationship A → B, then apply it to C',
      rule:'Test the relationship on every example pair. In number analogies try simple operations first. In word analogies name the relationship and keep its direction.',
      example:['In 4 : 17 :: 6 : ?, test “square, then add 1.”', '4² + 1 = 17, so 6² + 1 = 37.', 'If options fit several rules, use another given pair or the intended simplest consistent relationship.'],
      trap:'A pattern that fits only one pair may be one of many possible patterns.'
    },
    {
      id:'number-series', title:'Number series and second differences', expression:'Write the gap between adjacent terms, then compare those gaps',
      rule:'Look for a constant difference, a constant ratio, changing differences or alternating operations. For a quadratic pattern, the differences between gaps are constant.',
      example:['In 2, 5, 10, 17, … the gaps are +3, +5 and +7.', 'Each gap grows by 2, so the next gap is +9.', 'The next term is 17 + 9 = 26.'],
      trap:'Apply the pattern to every visible term before extending the series.'
    },
    {
      id:'interleaved-series', noteId:'number-series', title:'Alternating and interleaved series', expression:'Split the odd and even positions into separate sequences',
      rule:'Use this check when adjacent terms jump between two styles or sizes. One strand can increase while the other decreases.',
      example:['For 3, 30, 6, 27, 9, 24, ?, odd positions give 3, 6, 9 and even positions give 30, 27, 24.', 'The missing term is at position 7, which belongs to the odd strand.', 'Add 3 to 9 to get 12.'],
      trap:'Take the next term from the strand that contains the blank.'
    },
    {
      id:'letter-series', title:'Letter positions and wraparound', expression:'A = 1, B = 2, …, Z = 26',
      rule:'Turn each letter into an alphabet position, calculate the changes, then turn the result back into a letter. In cyclic patterns, one step after Z is A.',
      example:['In Y, A, D, H, … the forward moves are +2, +3 and +4.', 'The next move is +5. H is 8, and 8 + 5 = 13, which is M.'],
      trap:'Check whether the pattern actually wraps around before translating a position above 26.'
    },
    {
      id:'coding-decoding', title:'Coding, decoding and inverse steps', math:'\\text{reverse position}=27-\\text{forward position}',
      rule:'Write each operation in order, such as shift, reverse or swap. To decode, undo them in reverse order.',
      example:['A code shifts each letter forward by 1, then reverses the word. CAT becomes DBU and then UBD.', 'To decode UBD, reverse it to DBU first, then shift each letter back by 1 to CAT.'],
      trap:'Undo the last operation first, especially when positions change.'
    },
    {
      id:'rankings', title:'Ranks from both ends', math:'N=r_{\\text{left}}+r_{\\text{right}}-1',
      rule:'If one person has a unique position, counting from both ends counts that person twice.',
      example:['Meera is 8th from the left and 11th from the right.', 'There are 7 people before her, 10 after her and Meera herself. Total = 7 + 1 + 10 = 18.'],
      trap:'Use both ranks for the same person. For people instead counted between two ranks from one end, take the rank difference minus one.'
    },
    {
      id:'seating-arrangements', title:'Seating and ordering arrangements', expression:'Treat immediate neighbours as an ordered block',
      rule:'For a row, draw numbered slots. For a circle where rotations count as the same, fix one person and track the stated facing direction.',
      example:['Four people sit around a round table, with rotations treated as identical. Fix A in one seat.', 'The other three have 3 × 2 × 1 = 6 orders around A.'],
      trap:'Left and right depend on which way a person faces. A mirror image generally gives a different order.'
    },
    {
      id:'operator-substitution', title:'Interchanging operators', expression:'Substitute the symbols first, then apply normal precedence',
      rule:'Rewrite every operation according to the code. Then use brackets, powers, multiplication and division, and finally addition and subtraction.',
      example:['If + means × and − means +, rewrite 28 − 4 + 3 as 28 + 4 × 3.', 'Multiply first. 4 × 3 = 12, so the result is 28 + 12 = 40.'],
      trap:'Substitute each symbol based on the original expression once. Leave its replacement as written.'
    }
  ],
  'Data Analysis': [
    {
      id:'data-tables', title:'Tables and totals', math:'\\text{share\\%}=\\frac{\\text{part}}{\\text{matching total}}\\times100',
      rule:'Read the column titles and units first. Select the rows the question names and keep every numerator paired with its own denominator.',
      example:['Station A has 18 punctual trains of 20. Station B has 36 of 60.', 'Punctual trains = 18 + 36 = 54. Scheduled trains = 20 + 60 = 80.', 'Overall punctuality = 54 ÷ 80 × 100 = 67.5%.'],
      trap:'Use the pooled counts for the overall rate. The two stations have unequal totals.'
    },
    {
      id:'multi-source-data', title:'Combining data from multiple sources', math:'\\text{actual}=\\frac{\\text{attainment\\%}}{100}\\times\\text{target}',
      rule:'Join tables or charts on the same row label, time period and unit. Convert percentages to quantities before comparing actual outputs.',
      example:['A unit’s target is 150 and attainment is 60%, giving 150 × 0.60 = 90.', 'Next period, the target is 180 and attainment is 75%, giving 180 × 0.75 = 135.', 'Actual output rose by 135 − 90 = 45 units.'],
      trap:'A higher attainment percentage can correspond to fewer units if the target was smaller.'
    },
    {
      id:'data-bar-charts', title:'Bar charts and comparisons', expression:'Compare heights using the axis scale and series legend',
      rule:'For grouped bars, identify each series by its legend. For stacked bars, find one segment’s height by subtracting its bottom value from its top value.',
      example:['In a stack, ticket sales reach 80 on the axis and the refunds segment extends from 80 to 110.', 'The refunds segment measures 110 − 80 = 30 units.'],
      trap:'Read numerical ticks when the axis starts above zero.'
    },
    {
      id:'data-line-graphs', title:'Line graphs, changes and slopes', math:'\\text{rate of change}=\\frac{y_2-y_1}{x_2-x_1}',
      rule:'Read the two points and subtract the earlier value from the later one. Divide by elapsed time only when asked for a rate.',
      example:['A line shows 120 passengers at 8 am and 180 at 11 am.', 'The increase is 180 − 120 = 60 passengers over 3 h.', 'The average rate of increase is 60 ÷ 3 = 20 passengers per hour.'],
      trap:'If time intervals differ, compare slopes by dividing each rise by its own interval.'
    },
    {
      id:'scatter-plots', title:'Scatter plots, residuals and prediction', math:'\\text{residual}=y_{\\text{observed}}-y_{\\text{predicted}}',
      rule:'A scatter plot displays pairs of measurements. A positive residual means the observed point is above its predicted value.',
      example:['At a given temperature, a line predicts 72 sales and the recorded count is 80.', 'Residual = 80 − 72 = +8 sales. The model predicted 8 fewer than observed.'],
      trap:'A trend alone does not prove cause and effect. Predictions beyond the observed range have weaker support.'
    },
    {
      id:'data-pie-charts', title:'Pie charts and sector angles', math:'\\frac{\\text{part}}{\\text{whole}}=\\frac{\\theta}{360^\\circ}',
      rule:'Each pie has its own total. Convert sectors to quantities with the matching total when comparing two separate pies.',
      example:['A 72° sector in a pie of 250 tickets is 72 ÷ 360 = 1/5 of the pie.', 'The sector contains 250 × 1/5 = 50 tickets.'],
      trap:'An identical angle in two pies can represent different amounts.'
    },
    {
      id:'statistical-distributions', title:'Frequency tables and weighted means', math:'\\bar x=\\frac{\\sum fx}{\\sum f}',
      rule:'Frequency f tells you how many times value x occurs. Multiply each value by its frequency to recover its contribution. Use cumulative counts to locate the median.',
      example:['The value 2 occurs 3 times and 5 occurs twice. Total = 2 × 3 + 5 × 2 = 16.', 'There are 3 + 2 = 5 entries. Mean = 16 ÷ 5 = 3.2.', 'The middle entry is third, which is 2.'],
      trap:'The denominator is the number of observations, including repeats.'
    },
    {
      id:'venn-diagrams', title:'Venn diagrams and overlap', math:'|A\\cup B|=|A|+|B|-|A\\cap B|',
      rule:'Add the two sets and subtract the intersection once so shared members are counted once in the union. To find “neither”, subtract the union from the total.',
      example:['In a 50-person group, 30 use service A, 20 use B and 10 use both.', 'At least one = 30 + 20 − 10 = 40 people.', 'Neither = 50 − 40 = 10. Exactly one = 40 − 10 = 30.'],
      trap:'The intersection and “exactly one” are distinct regions.'
    },
    {
      id:'data-sufficiency', title:'Data sufficiency tests', expression:'Can the given statement determine one answer?',
      rule:'Test each statement alone using the question stem. Then combine them if the individual statements leave multiple possible answers.',
      example:['Question: What is x? Statement I: x + y = 10. Statement II: y = 4.', 'I leaves different pairs possible. II sets y only.', 'Together they force x = 10 − 4 = 6, so both are needed.'],
      trap:'On a yes-or-no question, a definite “no” is also sufficient.'
    },
    {
      id:'data-arrangement', title:'Arranging counts and reconstructing totals', math:'A=\\frac{T+D}{2}\\qquad B=\\frac{T-D}{2}',
      rule:'Use these formulas when A + B = T and A − B = D. Combine the equations to recover the two counts.',
      example:['Two sections contain 46 items together. The first contains 8 more than the second.', 'First = (46 + 8) ÷ 2 = 27. Second = (46 − 8) ÷ 2 = 19.', 'Check 27 + 19 = 46 and 27 − 19 = 8.'],
      trap:'For counts, check both results are nonnegative whole numbers.'
    },
    {
      id:'percentage-points', noteId:'data-tables', title:'Percentage points versus relative change', expression:'Percentage-point change = new rate − old rate',
      rule:'Subtract rates directly for a change in percentage points. For a relative percent change, divide that difference by the original rate and multiply by 100.',
      example:['A completion rate rises from 40% to 50%. The rise is 50 − 40 = 10 percentage points.', 'Relative change = 10 ÷ 40 × 100 = 25%.'],
      trap:'Read whether the question asks for a difference in rates or a percentage increase over the original rate.'
    },
    {
      id:'conditional-share', noteId:'venn-diagrams', title:'Conditional percentages and changing the base', math:'P(A\\mid B)=\\frac{|A\\cap B|}{|B|}',
      rule:'“Among B” means count only the members of B as the denominator. Use the overlap with A as the numerator.',
      example:['Of 100 tickets, 40 are reserved and 10 of those were cancelled.', 'Among reserved tickets, the cancellation rate is 10 ÷ 40 × 100 = 25%.'],
      trap:'Dividing by 100 would answer “what share of all tickets were reserved and cancelled?”'
    }
  ]
};
