export const beginnerMathSolutions = new Map([
  ["A sum is divided in the ratio 3:5. If the larger share is ₹250, what is the total?", {
    answer:"₹400",
    picture:{title:"Picture eight equal money envelopes", text:"The bigger person gets five envelopes and the smaller person gets three. All the envelopes hold the same amount."},
    steps:[
      {title:"Find one envelope", text:"Share the bigger person's money equally over their five envelopes.", formula:"₹250 ÷ 5 = ₹50"},
      {title:"Count all the envelopes", text:"The two people get eight envelopes altogether. Put ₹50 in each.", formula:"(3 + 5) × ₹50 = ₹400"}
    ]
  }],
  ["The average of five numbers is 18. Removing 10 leaves what average?", {
    answer:"20",
    picture:{title:"Picture sharing sweets evenly", text:"An average of 18 means five equal shares of 18 would use the same total as the five original numbers."},
    steps:[
      {title:"Build the original total", text:"Put five shares of 18 together.", formula:"5 × 18 = 90"},
      {title:"Remove one number", text:"The sum loses 10. The row also loses one of its five spots.", formula:"90 − 10 = 80 and 5 − 1 = 4"},
      {title:"Share what is left", text:"Spread the new total across four spots.", formula:"80 ÷ 4 = 20"}
    ]
  }],
  ["An item costing ₹800 is sold for ₹920. Find profit percent.", {
    answer:"15%",
    picture:{title:"Picture a shop till", text:"The shop spent ₹800 and got ₹920 back. Profit is the extra money above what the shop spent."},
    steps:[
      {title:"Count the extra cash", text:"Subtract what went out from what came in.", formula:"₹920 − ₹800 = ₹120"},
      {title:"Compare with the starting cost", text:"Divide the extra cash by ₹800. Multiply by 100 to say how much extra there was for every hundred rupees spent.", formula:"120 ÷ 800 × 100% = 15%"}
    ]
  }],
  ["A ₹1,500 marked price receives a 20% discount. What is paid?", {
    answer:"₹1,200",
    picture:{title:"Picture a sale sticker", text:"A 20% discount means that for every ₹100 on the tag, ₹20 comes off and ₹80 stays."},
    steps:[
      {title:"Find the part you still pay", text:"Start from 100% and remove the discount.", formula:"100% − 20% = 80%"},
      {title:"Use the full price tag", text:"Find 80 out of every 100 parts of ₹1,500.", formula:"80/100 × ₹1,500 = ₹1,200"}
    ]
  }],
  ["Find simple interest on ₹2,000 at 6% annually for three years.", {
    answer:"₹360",
    picture:{title:"Picture the same savings bonus every year", text:"Simple interest pays a bonus on the starting money each year. The first bonus does not make the later bonuses bigger."},
    steps:[
      {title:"Find one year's bonus", text:"Take ₹6 for every ₹100 of the original ₹2,000.", formula:"₹2,000 × 6/100 = ₹120"},
      {title:"Add three equal bonuses", text:"The question asks for the bonus alone, so add the interest for the three years.", formula:"3 × ₹120 = ₹360"}
    ]
  }],
  ["At 10% compounded annually, ₹1,000 becomes what after two years?", {
    answer:"₹1,210",
    picture:{title:"Picture a balance that grows each year", text:"Each year adds a tenth of the money currently in the account. The second year starts from the new balance."},
    steps:[
      {title:"Work out year one", text:"Add 10% and keep the original money too, so the balance becomes 110% of the old one.", formula:"₹1,000 × 1.10 = ₹1,100"},
      {title:"Work out year two", text:"Use the new balance as the starting point for the next 10%.", formula:"₹1,100 × 1.10 = ₹1,210"}
    ]
  }],
  ["A train covers 180 km in 2.5 hours. What is its average speed?", {
    answer:"72 km/h",
    picture:{title:"Picture 180 kilometres shared over the travel clock", text:"Average speed asks how many kilometres the train would cover per hour if it covered an equal amount each hour."},
    steps:[
      {title:"Read the distance and time", text:"The full trip covers 180 km in two and a half hours.", formula:"Distance = 180 km, time = 2.5 h"},
      {title:"Find kilometres in one hour", text:"Divide the total distance by the number of hours.", formula:"180 ÷ 2.5 = 72 km/h"}
    ]
  }],
  ["Convert 54 km/h to metres per second.", {
    answer:"15 m/s",
    picture:{title:"Picture changing the two labels on the same speed", text:"The train still moves just as fast. You want metres instead of kilometres and seconds instead of hours."},
    steps:[
      {title:"Turn kilometres into metres", text:"Every kilometre holds 1,000 metres.", formula:"54 km = 54,000 m"},
      {title:"Share the distance over the seconds", text:"An hour has 3,600 seconds, so divide the distance by 3,600 to find what fits in one second.", formula:"54,000 ÷ 3,600 = 15 m/s"}
    ]
  }],
  ["A can finish work in 12 days and B in 6 days. Together they need how long?", {
    answer:"4 days",
    picture:{title:"Picture a job made of 12 equal squares", text:"A does one square each day and B can do the same sheet in half the time."},
    steps:[
      {title:"Find their daily output", text:"Each worker shares the same 12-square job across their own number of days.", formula:"A: 12 ÷ 12 = 1 square/day; B: 12 ÷ 6 = 2 squares/day"},
      {title:"Put their work together", text:"They complete three squares every day. Count how many sets of three fill the sheet.", formula:"12 ÷ (1 + 2) = 4 days"}
    ]
  }],
  ["Solve 3x + 7 = 28.", {
    answer:"7",
    picture:{title:"Picture three mystery bags and seven loose counters", text:"All three bags hold the same amount. Together with the seven loose counters they make 28."},
    steps:[
      {title:"Take away the counters outside the bags", text:"This leaves only the three matching bags.", formula:"28 − 7 = 21"},
      {title:"Share the rest into three bags", text:"The amount in one bag is x.", formula:"21 ÷ 3 = 7"}
    ]
  }],
  ["If x + y = 12 and x − y = 4, find x.", {
    answer:"8",
    picture:{title:"Picture two lines that can help each other", text:"One line adds y and the other takes away y. Add the two lines so the y pieces cancel."},
    steps:[
      {title:"Combine both equal lines", text:"The two x pieces stay. The plus-y and minus-y pieces add to zero.", formula:"(x + y) + (x − y) = 12 + 4 ⇒ 2x = 16"},
      {title:"Find one x", text:"Two matching copies of x total 16, so split 16 into two equal parts.", formula:"x = 16 ÷ 2 = 8"}
    ]
  }],
  ["Find the tenth term of 5, 8, 11, ...", {
    answer:"32",
    picture:{title:"Picture hopping from the first tile to the tenth", text:"The tile marked 5 is already the first one. Measure the jump between two neighbours."},
    steps:[
      {title:"Find one jump", text:"Each step adds the same amount.", formula:"8 − 5 = 3"},
      {title:"Count the jumps from tile one", text:"You make nine jumps to reach tile ten, then add their total to 5.", formula:"5 + (10 − 1) × 3 = 32"}
    ]
  }],
  ["Find the sum of the first ten positive integers.", {
    answer:"55",
    picture:{title:"Picture pairing the ends of a number line", text:"Put 1 with 10, 2 with 9 and keep going inward. All of the pairs make the same total."},
    steps:[
      {title:"Find the size of a pair", text:"Each small number is matched with a larger number the same distance from the other end.", formula:"1 + 10 = 2 + 9 = 3 + 8 = 11"},
      {title:"Count the pairs", text:"Ten numbers make five pairs. Add five copies of 11.", formula:"(10 ÷ 2) × 11 = 55"}
    ]
  }],
  ["A rectangle is 12 m long and 7 m wide. Find its area.", {
    answer:"84 m²",
    picture:{title:"Picture covering a floor with square tiles", text:"A square metre is one tile one metre wide and one metre long. Fill the rectangle without gaps."},
    steps:[
      {title:"Read the rows", text:"There are seven rows. Twelve tiles fit along each row."},
      {title:"Count every tile", text:"Multiply the number of rows by the number in each row.", formula:"7 × 12 = 84 m²"}
    ]
  }],
  ["Find a circle's circumference for radius 7 cm, using π = 22/7.", {
    answer:"44 cm",
    picture:{title:"Picture wrapping string once around a circle", text:"The length of that string is the circumference. The diameter is the straight line through the middle from edge to edge."},
    steps:[
      {title:"Find the diameter", text:"The radius only goes from the centre to one edge. Double it for the whole distance.", formula:"2 × 7 = 14 cm"},
      {title:"Use the circle rule", text:"The string is π times as long as the diameter. Use the value of π given in the question.", formula:"14 × 22/7 = 44 cm"}
    ]
  }],
  ["A cube has side 4 cm. Find its volume.", {
    answer:"64 cm³",
    picture:{title:"Picture a box packed with one-centimetre cubes", text:"There are four little cubes across, four from front to back, and four layers reaching up."},
    steps:[
      {title:"Count one layer", text:"Multiply the two sides of the square floor.", formula:"4 × 4 = 16 cubes"},
      {title:"Count all four layers", text:"Stack four copies of that layer. Each little cube fills one cubic centimetre.", formula:"4 × 16 = 64 cm³"}
    ]
  }],
  ["In a right triangle, sides opposite and adjacent to angle θ are 3 and 4. Find tan θ.", {
    answer:"3/4",
    picture:{title:"Picture a ramp and the angle at its foot", text:"Across from the angle is the rise. Next to the angle along the ground is the run. Tangent compares how tall the rise is for the run you have."},
    steps:[
      {title:"Pick the two labelled sides", text:"The question gives 3 across from the angle, and 4 next to it."},
      {title:"Put the rise over the run", text:"The tangent of the angle is the opposite side divided by the adjacent side.", formula:"tan θ = 3 ÷ 4 = 3/4"}
    ]
  }],
  ["A fair die is rolled once. What is the probability of an even number?", {
    answer:"1/2",
    picture:{title:"Picture the six faces of a die", text:"A fair die gives every face the same chance. We care about faces that show an even number."},
    steps:[
      {title:"Count the faces that fit", text:"The even faces are 2, 4 and 6. That is three useful picks from the six faces."},
      {title:"Write the chance", text:"Three out of six is the same as one out of two.", formula:"P(even) = 3/6 = 1/2"}
    ]
  }],
  ["Find the median of 3, 5, 8, 10, 14.", {
    answer:"8",
    picture:{title:"Picture five children in a line by height", text:"The median is the number in the middle spot. Count equal numbers of spots from both sides to find it."},
    steps:[
      {title:"Write the ordered line", text:"The values are already in order, so put one value in each spot.", formula:"3, 5, 8, 10, 14"},
      {title:"Find the third spot", text:"Two values sit before 8 and two sit after it. That makes it the middle value."}
    ]
  }],
  ["What is the SI unit of force?", {
    answer:"newton",
    picture:{title:"Picture pushing a small trolley", text:"A force is a push or pull. Its unit tells us how strong that push is."},
    steps:[
      {title:"Match the unit to a push", text:"A newton is the push that makes a 1 kg object speed up by one metre per second in each second, when that is the net push.", formula:"1 N = 1 kg × 1 m/s²"},
      {title:"Read what the question asks for", text:"The SI unit that names this push is the newton."}
    ]
  }],
  ["A body has mass 5 kg. With g = 10 m/s², its weight is what?", {
    answer:"50 N",
    picture:{title:"Picture how hard gravity pulls on a bag", text:"Mass is how much stuff is in the bag. Weight is the size of the pull on all that stuff."},
    steps:[
      {title:"Find the pull on each kilogram", text:"With the given g, every kilogram feels a downward pull of 10 newtons."},
      {title:"Count five copies of that pull", text:"The mass is 5 kg. Multiply by the pull per kilogram.", formula:"5 × 10 = 50 N"}
    ]
  }],
  ["A 200 g object occupies 50 cm³. Find density.", {
    answer:"4 g/cm³",
    picture:{title:"Picture sharing the mass across little cubes", text:"Density tells you how much mass belongs to each cubic centimetre of space."},
    steps:[
      {title:"Read the two totals", text:"The whole object is 200 grams and takes up 50 cubic centimetres."},
      {title:"Find the mass per cube of space", text:"Share the mass equally across that volume.", formula:"200 ÷ 50 = 4 g/cm³"}
    ]
  }],
  ["A force of 10 N moves an object 5 m in the force direction. Find work.", {
    answer:"50 J",
    picture:{title:"Picture pushing a box straight ahead", text:"Work measures the energy a push transfers as something moves. Here the push and the movement point the same way."},
    steps:[
      {title:"Count the push along the movement", text:"All 10 newtons are in the direction the object moves."},
      {title:"Use the full distance", text:"For a steady push in the movement's direction, multiply the push by the distance moved.", formula:"10 × 5 = 50 J"}
    ]
  }],
  ["A machine does 600 J of work in 3 seconds. Find power.", {
    answer:"200 W",
    picture:{title:"Picture the work shared into three seconds", text:"Power tells how much work gets done each second on average."},
    steps:[
      {title:"Read the whole job", text:"The machine does 600 joules of work in three seconds."},
      {title:"Find the work in one second", text:"Divide the amount by the time. One joule in one second equals one watt.", formula:"600 ÷ 3 = 200 W"}
    ]
  }],
  ["Find kinetic energy of a 2 kg body travelling at 3 m/s.", {
    answer:"9 J",
    picture:{title:"Picture a moving toy cart", text:"A moving thing has energy. A faster cart has more. The rule uses speed times speed, so speed makes a big difference."},
    steps:[
      {title:"Square the speed", text:"The speed is 3 m/s. Use 3 twice in the multiplication.", formula:"3² = 3 × 3 = 9"},
      {title:"Use half the mass", text:"Multiply the squared speed by half of 2 kg.", formula:"½ × 2 × 9 = 9 J"}
    ]
  }],
  ["A 12 V source is connected across a 6 Ω resistor. Find current.", {
    answer:"2 A",
    picture:{title:"Picture the push and the squeeze in a circuit", text:"Voltage is like the push that makes charge move. Resistance tells how much the path holds that flow back."},
    steps:[
      {title:"Match the rule to the numbers", text:"The voltage is 12 volts and the resistance is 6 ohms. Ohm's law says current equals voltage divided by resistance."},
      {title:"Find the current", text:"Do the division to get the number of amperes.", formula:"12 ÷ 6 = 2 A"}
    ]
  }],
  ["An ideal lever has effort arm 60 cm and load arm 20 cm. Find mechanical advantage.", {
    answer:"3",
    picture:{title:"Picture a seesaw with a long side and a short side", text:"Pushing farther from the pivot gives the same push more turning effect. Look at how many times longer the effort arm is."},
    steps:[
      {title:"Read both distances from the pivot", text:"The effort acts 60 cm from it. The load acts 20 cm from it."},
      {title:"Compare the lengths", text:"In an ideal lever, that length ratio is its force gain, called mechanical advantage.", formula:"60 ÷ 20 = 3"}
    ]
  }],
  ["A town’s annual ridership increases by 25% one year and falls by 16% the next year. What is the net change over the two years?", {
    answer:"5% increase",
    picture:{title:"Picture 100 rides to begin with", text:"The first year changes the size of the group. The second year's 16% comes out of the new group."},
    steps:[
      {title:"Add a quarter to the first year", text:"25% of 100 is 25.", formula:"100 + 25 = 125"},
      {title:"Remove 16% of the new amount", text:"The fall applies to all 125 rides in the example.", formula:"125 × 16/100 = 20; 125 − 20 = 105"},
      {title:"Compare with the very first amount", text:"There are five more rides for every 100 original rides.", formula:"(105 − 100)/100 × 100% = 5% increase"}
    ]
  }],
  ["A small depot handles 60 consignments with mean processing time 12 minutes and a larger depot handles 90 with mean time 20 minutes. Nine consignments at the larger depot took 10 minutes each and are excluded. What is the mean processing time of the remaining 141 consignments to two decimal places?", {
    answer:"17.23 min",
    picture:{title:"Picture each consignment bringing its own minutes", text:"Each depot's average is an equal share of its own minute pile. Bring the two whole piles together before crossing any records out."},
    steps:[
      {title:"Build the original piles", text:"Multiply the average by the number of consignments at each depot.", formula:"60 × 12 = 720 min; 90 × 20 = 1,800 min"},
      {title:"Remove the nine excluded records", text:"Each removed record took 10 minutes. Remove those minutes and nine places in the count.", formula:"720 + 1,800 − 9 × 10 = 2,430 min; 60 + 90 − 9 = 141"},
      {title:"Spread the new total evenly", text:"Divide by the count still included, then round to two decimal places.", formula:"2,430 ÷ 141 ≈ 17.23 min"}
    ]
  }],
  ["In an insulated vessel, 200 g of water at 70°C is mixed with 300 g of water at 20°C. Neglect the heat capacity of the vessel. What is the equilibrium temperature?", {
    answer:"40°C",
    picture:{title:"Picture a warm cup poured into a bigger cool cup", text:"Both cups hold water, so equal amounts need equal energy to warm by a degree. The bigger cup has more say in the final temperature."},
    steps:[
      {title:"Give each temperature its proper weight", text:"The warm reading counts for 200 grams. The cool reading counts for 300 grams.", formula:"200 × 70 + 300 × 20 = 20,000"},
      {title:"Divide by all the water", text:"The result must sit between 20°C and 70°C, nearer the cooler cup because it has more water.", formula:"20,000 ÷ (200 + 300) = 40°C"}
    ]
  }],
  ["Two blocks of equal mass receive the same amount of heat. Block X warms up by 18°C and block Y by 12°C, with no heat losses. What is the ratio of X’s specific heat capacity to Y’s?", {
    answer:"2:3",
    picture:{title:"Picture giving two equal blocks identical packets of heat", text:"The block whose thermometer moves less needs more heat to make it move one degree."},
    steps:[
      {title:"Compare their temperature rises", text:"X rises by 18°C and Y rises by 12°C with the same heat and mass. Their heat capacity per kilogram times their rise has to match.", formula:"cX × 18 = cY × 12"},
      {title:"Compare the heat needed per degree", text:"Put the smaller rise on top for the ratio X to Y, then simplify.", formula:"cX/cY = 12/18 = 2/3"}
    ]
  }],
  ["A 4 Ω resistor and an 8 Ω resistor are in series across an ideal 24 V source. What power is dissipated in the 8 Ω resistor?", {
    answer:"32 W",
    picture:{title:"Picture a loop with two tight spots", text:"The charge takes one path through both resistors, so both carry the same current. Only the power at the 8 Ω part is requested."},
    steps:[
      {title:"Find the resistance of the loop", text:"Add the two resistances because they sit one after the other.", formula:"4 + 8 = 12 Ω"},
      {title:"Find the current through both", text:"Divide the supply voltage by the total resistance.", formula:"24 ÷ 12 = 2 A"},
      {title:"Find the power at one spot", text:"Use the same current, but multiply its square by the requested resistor alone.", formula:"2² × 8 = 32 W"}
    ]
  }],
  ["A 1.2 kW appliance operates for 45 minutes each day for 20 days. At ₹7.50 per kWh, what is its energy cost?", {
    answer:"₹135",
    picture:{title:"Picture paying for the energy an appliance uses each day", text:"The price is for one kilowatt running for one hour. First put the daily running time in hours."},
    steps:[
      {title:"Count total hours", text:"Forty-five minutes is three quarters of an hour. Repeat that for 20 days.", formula:"45 ÷ 60 = 0.75 h; 20 × 0.75 = 15 h"},
      {title:"Find the energy used", text:"Multiply 1.2 kilowatts by the time in hours.", formula:"1.2 × 15 = 18 kWh"},
      {title:"Find the cost", text:"Each unit of energy costs ₹7.50.", formula:"18 × ₹7.50 = ₹135"}
    ]
  }],
  ["A 20 kg box slides along a level floor with coefficient of kinetic friction 0.25. With g = 10 m/s², how much work does friction do while the box moves 6 m?", {
    answer:"−300 J",
    picture:{title:"Picture dragging a box across the floor", text:"The floor rubs against the box as it slides. That force points backwards while the box travels forward."},
    steps:[
      {title:"Find how hard the floor holds up the box", text:"There is no up-or-down movement or extra vertical force, so the floor balances its weight.", formula:"20 × 10 = 200 N"},
      {title:"Find the backwards rubbing force", text:"Friction is a quarter of the force from the floor.", formula:"0.25 × 200 = 50 N"},
      {title:"Count the work with its sign", text:"A force going the opposite way from the movement does negative work.", formula:"−50 × 6 = −300 J"}
    ]
  }],
  ["A 2 kg cart moves at 4 m/s. A net force transfers another 20 J of energy into its kinetic energy. What is the new speed?", {
    answer:"6 m/s",
    picture:{title:"Picture topping up the cart's moving energy", text:"The cart already moves. Add the new energy to what it already had before looking for its new speed."},
    steps:[
      {title:"Find the starting energy", text:"Use half the mass and multiply by the speed squared.", formula:"½ × 2 × 4² = 16 J"},
      {title:"Add the energy that went into the cart", text:"The extra 20 joules increases the moving energy.", formula:"16 + 20 = 36 J"},
      {title:"Find the speed that gives 36 joules", text:"Half the mass is one, so the number you want multiplied by itself is 36.", formula:"v = √36 = 6 m/s"}
    ]
  }],
  ["Two identical loads are lifted the same vertical distance at constant speed. Motor A takes 24 s and motor B takes 18 s. What is the ratio of B’s useful power to A’s useful power?", {
    answer:"4:3",
    picture:{title:"Picture two people finishing the same task at different times", text:"Both motors lift the same load the same distance. The faster one does the same work in fewer seconds."},
    steps:[
      {title:"Compare their work each second", text:"If the shared work is W, A does W divided by 24 each second, and B does W divided by 18.", formula:"Power A = W/24; power B = W/18"},
      {title:"Divide B's power by A's power", text:"The shared work cancels. The time ratio flips because fewer seconds means more done per second.", formula:"(W/18) ÷ (W/24) = 24/18 = 4/3"}
    ]
  }],
  ["A real machine lifts a 360 N load by 0.8 m while its input point moves 3 m. If its efficiency is 80%, what input force is needed along the motion?", {
    answer:"120 N",
    picture:{title:"Picture some of the input energy getting wasted", text:"Only 80 out of 100 parts of what goes in reaches the load. Find the useful lift first."},
    steps:[
      {title:"Find the work needed for the lift", text:"Multiply the load's weight by how high it goes.", formula:"360 × 0.8 = 288 J"},
      {title:"Find the work put in", text:"288 J is 80% of the input. Divide by 0.80 to recover the whole.", formula:"288 ÷ 0.80 = 360 J"},
      {title:"Find the push over three metres", text:"Input work equals the input force times its distance, because the force is along the movement.", formula:"360 ÷ 3 = 120 N"}
    ]
  }],
  ["A trolley covers 30 m in the first 5 s and 24 m in the next 3 s. What is its average speed over the full motion?", {
    answer:"6.75 m/s",
    picture:{title:"Picture a trip with two stretches", text:"You want the rate for the whole trip. Join the distances and join the times before dividing."},
    steps:[
      {title:"Add both distances", text:"The trolley covers both parts of the route.", formula:"30 + 24 = 54 m"},
      {title:"Add both times", text:"The clock records both stretches.", formula:"5 + 3 = 8 s"},
      {title:"Find metres per second for the whole trip", text:"Divide the total distance by the full time.", formula:"54 ÷ 8 = 6.75 m/s"}
    ]
  }],
  ["A 2.0 m rail expands by 0.024 mm per degree Celsius over the temperature range considered. How long is it after a 50°C rise?", {
    answer:"2.0012 m",
    picture:{title:"Picture a rail growing by tiny bits as it warms", text:"Each degree adds a small piece to the length. Find all the extra pieces first."},
    steps:[
      {title:"Count the extra length", text:"Each of the 50 degrees adds 0.024 millimetres.", formula:"50 × 0.024 = 1.2 mm"},
      {title:"Change the extra length to metres", text:"There are 1,000 millimetres in a metre.", formula:"1.2 ÷ 1,000 = 0.0012 m"},
      {title:"Add it to the rail", text:"The starting rail is 2.0 metres long, so add the converted extra length.", formula:"2.0 + 0.0012 = 2.0012 m"}
    ]
  }]
]);
