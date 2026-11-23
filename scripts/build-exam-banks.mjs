import { currentAffairs2026 } from './current-affairs-2026.mjs';
import { rrbModel2 } from './rrb-model-2.mjs';
import { rrbModel3 } from './rrb-model-3.mjs';
import { reviewedReasoning, stationMasterSeries } from './rrb-practice-series.mjs';
import { analyticalSets } from './rrb-data-analysis.mjs';
import { crossPaperRepeats, inspectPaper, numberTemplateKey, promptKey } from './paper-quality.mjs';
// Original model questions. Deterministic construction; no scraped or AI-labelled PYQs.
import fs from 'node:fs';
import { EXAMS } from '../src/config/exams.js';
import { logicalReasoning, reserveDeductions } from './rrb-logical.mjs';
import { stationMasterExpansion } from './rrb-expansion/index.mjs';
const banks={group2:[],rrb:[]};
function modelQuestion(exam,model,index,section,topic,question,answer,others,explanation,extra={}) {
  const seed=model>3?`${model}:${question}`:question;
  let hash=2166136261;for(const char of seed)hash=Math.imul(hash^char.charCodeAt(0),16777619)>>>0;
  const position=hash%4, options=others.map(String);
  options.splice(position,0,String(answer));
  return {id:`${exam}-model${model}-${index+1}`,section:EXAMS[exam].sections[section][0],subject:EXAMS[exam].sections[section][0],topic,question,options,correctAnswer:position,marks:1,type:'MCQ',explanation,source:'GateLabs original model question; '+EXAMS[exam].source,...extra};
}
function add(exam,...data) {
  banks[exam].push(modelQuestion(exam,1,banks[exam].length,...data));
}
function rrbPracticePaper(model,groups) {
  const questions=[];
  for(const [section,text,context] of groups) {
    for(const line of text.trim().split('\n')) {
      const fields=line.split('|').map(field=>field.trim());
      if(fields.length!==7||fields.some(field=>!field)) throw Error(`RRB model ${model}, question ${questions.length+1}: invalid content row`);
      const [topic,stem,answer,b,c,d,explanation]=fields;
      questions.push(modelQuestion('rrb',model,questions.length,section,topic,stem,answer,[b,c,d],explanation,context));
    }
  }
  return {
    title:`${EXAMS.rrb.name} · Practice model ${model}`,
    category:'Model paper',
    provenance:'GateLabs original practice material',
    note:'Full-length CBT practice with multi-step maths and science, shared data sets, English comprehension and reasoning. Uses the indicative 30/30/20/20 breakdown of CEN 08/2026.',
    questions
  };
}
function replaceRrbReasoning(paper,model) {
  const reasoning=reviewedReasoning(model).flatMap((rows,i)=>rows.map((row,index)=>{
    const question=modelQuestion('rrb',model,60+i*20+index,2+i,...row);
    return {...question,id:question.id+'-v2'};
  }));
  const analytical=model===1?[
    ...paper.questions.slice(30,31),
    ...analyticalSets(20).flat().map((row,i)=>{
      const question=modelQuestion('rrb',1,31+i,1,...row);
      return {...question,id:question.id+'-v2'};
    }),
    ...paper.questions.slice(55,60)
  ]:paper.questions.slice(30,60);
  return {...paper,questions:[...paper.questions.slice(0,30),...analytical,...reasoning]};
}

function uniqueRrbPapers(papers, reserve) {
  const seen=new Set();
  return papers.map(paper=>{
    const optionsKey=q=>q.options.toSorted().join('\n');
    const choiceSets=new Set(paper.questions.map(optionsKey));
    const reserved=new Set(paper.questions.map(promptKey));
    const templates=new Set(paper.questions.map(numberTemplateKey));
    const questions=paper.questions.map(q=>{
      const key=promptKey(q);
      if(!seen.has(key)){seen.add(key);return q;}
      const unique=reserve.find(candidate=>candidate.section===q.section&&!seen.has(promptKey(candidate))&&
        !reserved.has(promptKey(candidate))&&!choiceSets.has(optionsKey(candidate))&&!templates.has(numberTemplateKey(candidate)));
      if(!unique)throw Error(`No distinct replacement for ${q.id} in ${paper.title}`);
      choiceSets.add(optionsKey(unique));
      templates.add(numberTemplateKey(unique));
      seen.add(promptKey(unique));
      return {...unique,id:q.id};
    });
    return {...paper,questions};
  });
}
function rows(exam,section,topic,text) {
  for(const line of text.trim().split('\n')) {
    const [q,a,b,c,d,why]=line.split('|');add(exam,section,topic,q,a,[b,c,d],why);
  }
}
rows('rrb',0,'Arithmetic and basic science',`
What is the HCF of 84 and 126?|42|21|14|63|84 = 2 × 42 and 126 = 3 × 42; 2 and 3 are coprime.
What is the LCM of 18 and 24?|72|36|48|144|Use the highest prime powers: 2³ × 3² = 72.
A quantity increases from 240 to 300. What is the percentage increase?|25%|20%|30%|60%|Increase 60 divided by original 240 gives 25%.
A sum is divided in the ratio 3:5. If the larger share is ₹250, what is the total?|₹400|₹150|₹350|₹450|One part is 50; eight parts total 400.
The average of five numbers is 18. Removing 10 leaves what average?|20|16|22|18|Total 90 minus 10 is 80; divide by four.
An item costing ₹800 is sold for ₹920. Find profit percent.|15%|12%|20%|10%|Profit 120 divided by cost 800 gives 15%.
A ₹1,500 marked price receives a 20% discount. What is paid?|₹1,200|₹1,250|₹1,300|₹1,000|80% of 1500 is 1200.
Find simple interest on ₹2,000 at 6% annually for three years.|₹360|₹120|₹300|₹380|Interest = principal × rate × years / 100.
At 10% compounded annually, ₹1,000 becomes what after two years?|₹1,210|₹1,200|₹1,100|₹1,220|1000 × 1.1 × 1.1 = 1210.
A train covers 180 km in 2.5 hours. What is its average speed?|72 km/h|60 km/h|75 km/h|90 km/h|Speed = distance / time = 180 / 2.5.
Convert 54 km/h to metres per second.|15 m/s|12 m/s|18 m/s|20 m/s|Multiply by 5/18.
A can finish work in 12 days and B in 6 days. Together they need how long?|4 days|3 days|6 days|9 days|Their combined daily rate is 1/12 + 1/6 = 1/4.
Solve 3x + 7 = 28.|7|5|6|9|Subtract 7 and divide by 3.
If x + y = 12 and x − y = 4, find x.|8|4|6|10|Adding the equations gives 2x = 16.
Find the tenth term of 5, 8, 11, ...|32|29|35|30|a10 = 5 + 9 × 3.
Find the sum of the first ten positive integers.|55|45|50|60|n(n+1)/2 = 10 × 11 / 2.
A rectangle is 12 m long and 7 m wide. Find its area.|84 m²|38 m²|42 m²|96 m²|Area = length × width.
Find a circle's circumference for radius 7 cm, using π = 22/7.|44 cm|22 cm|154 cm|88 cm|Circumference = 2πr.
A cube has side 4 cm. Find its volume.|64 cm³|16 cm³|48 cm³|96 cm³|Volume = side cubed.
In a right triangle, sides opposite and adjacent to angle θ are 3 and 4. Find tan θ.|3/4|4/3|3/5|4/5|Tangent is opposite divided by adjacent.
A fair die is rolled once. What is the probability of an even number?|1/2|1/3|2/3|1/6|Three of six outcomes are even.
Find the median of 3, 5, 8, 10, 14.|8|5|10|7|The middle of five ordered observations is the third value.
What is the SI unit of force?|newton|joule|watt|pascal|One newton accelerates one kilogram by one metre per second squared.
A body has mass 5 kg. With g = 10 m/s², its weight is what?|50 N|5 N|0.5 N|500 N|Weight = mass × gravitational acceleration.
A 200 g object occupies 50 cm³. Find density.|4 g/cm³|0.25 g/cm³|10 g/cm³|100 g/cm³|Density = mass / volume.
A force of 10 N moves an object 5 m in the force direction. Find work.|50 J|2 J|15 J|500 J|Work = force × distance along force.
A machine does 600 J of work in 3 seconds. Find power.|200 W|1800 W|603 W|100 W|Power = work / time.
Find kinetic energy of a 2 kg body travelling at 3 m/s.|9 J|6 J|18 J|3 J|Kinetic energy = one half × mass × speed squared.
A 12 V source is connected across a 6 Ω resistor. Find current.|2 A|0.5 A|72 A|6 A|Ohm's law: I = V/R.
An ideal lever has effort arm 60 cm and load arm 20 cm. Find mechanical advantage.|3|1/3|40|80|For an ideal lever, mechanical advantage is effort arm / load arm.
`);
// Four chart/table sets, followed by set operations and a frequency distribution.
for(let set=0;set<4;set++){
  const a=40+set*10,b=60+set*10,c=80+set*10,d=100+set*10;
  const labels=['Passenger counts','Parcel dispatches','Ticket sales','Platform entries','Freight wagons','Enquiry desk visits'];
  const table=`${labels[set]} in one observation period (counts)\nStation A: ${a}\nStation B: ${b}\nStation C: ${c}\nStation D: ${d}`;
  const extra={table,figure:{type:['bar','line','pie','bar'][set],labels:['A','B','C','D'],values:[a,b,c,d],title:labels[set]+' by station'}};
  add('rrb',1,'Tabular comparison',`Data set ${set+1}: what is the total count?`,a+b+c+d,[a+b+c,a+b+c+d+20,a+b+c+d-20],`Add ${a} + ${b} + ${c} + ${d}.`,extra);
  add('rrb',1,'Average',`Data set ${set+1}: what is the mean count per station?`,(a+b+c+d)/4,[(a+b+c+d)/4+10,(a+b+c+d)/4-10,(a+b+c+d)/4+5],'Divide the total for four stations by four.',extra);
  add('rrb',1,'Ratio',`Data set ${set+1}: which expression equals the ratio of A to D?`,`${a}/${d}`,[`${d}/${a}`,`${b}/${d}`,`${a}/${c}`],'Use A as numerator and D as denominator.',extra);
  add('rrb',1,'Change',`Data set ${set+1}: B increases by 50%. What is its new count?`,b*1.5,[b*2,b*1.1,b*1.25],`The new count is ${b} × 1.5.`,extra);
  add('rrb',1,'Data sufficiency',`Data set ${set+1}: can the number of women at Station C be determined from this table?`,'No, the gender breakdown is absent',[`${c/2}`,`${c}`,`${c/4}`],'The table gives only total counts; no gender proportion is supplied.',extra);
}
const venn={table:'Of 100 surveyed passengers, 60 use buses, 50 use trains and 30 use both. The survey permits neither mode.',figure:{type:'venn',labels:['Bus only','Both','Train only'],values:[30,30,20],title:'Transport choices: numbers inside the two sets'}};
for(const [q,a,o,why] of [
 ['How many surveyed passengers use at least one of the two modes?',80,[70,90,110],'Union = 60 + 50 − 30 = 80.'],
 ['How many surveyed passengers use neither mode?',20,[10,30,40],'Subtract the union of 80 from the total of 100.'],
 ['How many surveyed passengers use only buses?',30,[60,50,20],'Bus-only = 60 − 30.'],
 ['How many surveyed passengers use exactly one mode?',50,[80,30,60],'Bus-only 30 plus train-only 20 equals 50.'],
 ['Among train users in this survey, what percentage also use buses?','60%',['30%','50%','40%'],'The conditional proportion is 30 / 50 = 60%.']
])add('rrb',1,'Venn diagrams',q,a,o,why,venn);
const distribution={table:'Ticket counters observed in one hour:\nTickets sold per counter: 10 | 20 | 30 | 40\nNumber of counters:        2 |  3 |  4 |  1',figure:{type:'bar',labels:['10','20','30','40'],values:[2,3,4,1],title:'Frequency distribution: counters by tickets sold'}};
for(const [q,a,o,why] of [
 ['How many counters were observed in the ticket distribution?',10,[4,9,100],'Total frequency = 2 + 3 + 4 + 1.'],
 ['What fraction of all tickets was sold by counters that sold at least the modal number?', '2/3',['1/2','1/3','3/4'],'The modal count is 30. The four counters at 30 and one at 40 sold 160 of the 240 tickets.'],
 ['How many tickets did all observed counters sell in total?',240,[100,200,260],'Weighted total = 10×2 + 20×3 + 30×4 + 40×1.'],
 ['What is the mean tickets sold per observed counter?',24,[25,20,30],'Divide the weighted total of 240 by 10 counters.'],
 ['Can the observed counters’ total revenue be determined from ticket counts alone?','No, ticket prices are required',['Yes, it is ₹240','Yes, it is ₹24','Yes, it is ₹100'],'Counts alone do not specify the prices paid and therefore do not determine revenue.']
])add('rrb',1,'Statistical distributions and sufficiency',q,a,o,why,distribution);
rows('rrb',2,'Logical reasoning',`
All signals are devices. Some devices are electronic. Which conclusion must follow?|All signals are devices|All signals are electronic|Some signals are electronic|No signal is electronic|Only the first statement is guaranteed; the overlap with electronic devices is unspecified.
If P is true and Q is false, what is P AND Q?|False|True|Both true and false|Cannot be evaluated|Conjunction requires both propositions to be true.
If P is false and Q is true, what is P OR Q in inclusive logic?|True|False|Undefined|Equal to P only|Inclusive OR is true when at least one operand is true.
What is the smaller angle between clock hands at 3:00?|90°|0°|60°|120°|The hands are three hour intervals apart; each is 30 degrees.
If today is Monday, which day is 45 days later?|Thursday|Wednesday|Friday|Sunday|45 leaves remainder 3 on division by 7; move three weekdays forward.
Which year is a leap year under Gregorian rules?|2000|1900|2100|2023|Century years are leap years only when divisible by 400.
A is B's mother. B is C's father. How is A related to C?|Grandmother|Aunt|Sister|Daughter|A is the mother of C's father.
Four people stand in order W, X, Y, Z from left to right. Who is immediately right of X?|Y|W|Z|X|The given sequence places Y immediately after X.
No trains are buses. All expresses are trains. Which must be true?|No expresses are buses|All buses are expresses|Some expresses are buses|All trains are expresses|The express set is inside the train set, which is disjoint from buses.
A notice says: Use the footbridge to cross tracks safely. What is the intended course of action?|Use the designated footbridge|Cross between moving trains|Wait on the tracks|Climb over a stopped train|The notice directly recommends the footbridge.
`);
const passages=[
['A station replaced paper notices with electronic boards. The boards update faster, but staff retained spoken announcements for passengers who cannot read them. The change aimed to improve access rather than eliminate every older method.','Why were spoken announcements retained?','To serve passengers who cannot read the boards',['To prevent updates','To remove staff','To replace all signs'],'The passage explicitly connects announcements with passengers unable to read the boards.'],
['A river town installed rain gauges upstream. When rainfall crossed a threshold, volunteers warned residents. The system reduced warning delays, but it could not stop flooding.','Which claim is supported?','Warnings became quicker',['Flooding became impossible','Rain gauges stopped rain','Volunteers controlled the river'],'The passage distinguishes quicker warnings from flood prevention.'],
['A study compared two seed varieties under equal water and soil conditions. Variety A produced a larger yield in this trial. The researchers recommended further trials in other climates before generalising.','Why recommend further trials?','The result may depend on climate',['The first trial had no result','Water was never controlled','Variety B was not planted'],'A result under one set of conditions does not establish performance in every climate.'],
['An archive digitised fragile letters. Researchers could read the digital copies without handling the originals. The originals were still preserved because digital copies do not replace every physical feature of an object.','What is the main benefit described?','Reduced handling of fragile originals',['Destruction of originals','Elimination of research','Proof that paper lasts forever'],'Digital access reduces physical handling while preservation continues.'],
['A commuter survey found that punctuality mattered more than decorative interiors to most respondents. The operator used this result to prioritise timetable improvements. The survey did not measure every passenger in the region.','Which statement avoids overgeneralisation?','Most respondents prioritised punctuality',['Every passenger disliked decoration','No passenger valued interiors','All regional passengers were surveyed'],'The claim is limited to the surveyed respondents and their reported preference.']
];
for(let i=0;i<passages.length;i++){
 const [passage,q,a,o,why]=passages[i];
 add('rrb',2,'English reading comprehension',`Passage ${i+1}: ${q}`,a,o,why,{passage});
 add('rrb',2,'English reading comprehension',`Passage ${i+1}: which best describes the author's approach?`,'Present a benefit and a limitation',['Reject all evidence','Describe an unrelated fantasy','Make a universal guarantee'],'Each passage states a useful change or finding while qualifying its reach.',{passage});
}
rows('rrb',3,'Series, analogy and coding',`
Find the next number: 3, 6, 12, 24, ...|48|36|42|30|Each term is doubled.
Find the next number: 2, 5, 10, 17, ...|26|24|25|28|Terms are n² + 1 for n = 1, 2, 3, 4, 5.
Find the next number: 81, 27, 9, 3, ...|1|0|2|6|Each term is divided by 3.
Find the next number: 1, 4, 9, 16, ...|25|20|24|36|These are consecutive positive integer squares.
Find the next letter: B, D, F, H, ...|J|I|K|L|Advance two alphabet positions each time.
Find the next letter: Z, W, T, Q, ...|N|O|M|P|Move back three alphabet positions.
If CAT is coded DBU by shifting each letter forward one, how is DOG coded?|EPH|EOG|FQI|CNE|D becomes E, O becomes P and G becomes H.
With A=1, B=2, ..., Z=26, what is the sum for RAIL?|40|38|42|44|18 + 1 + 9 + 12 = 40.
Book is to reading as fork is to what?|Eating|Writing|Sleeping|Drawing|The relationship is object to its typical use.
Thermometer is to temperature as speedometer is to what?|Speed|Pressure|Mass|Current|Both instruments indicate the named physical quantity.
Find the odd one out: 8, 27, 64, 100.|100|8|27|64|The first three are perfect cubes; 100 is not.
Find the odd one out: triangle, square, circle, rectangle.|Circle|Triangle|Square|Rectangle|A circle has no straight sides; the other figures are polygons.
Ravi is 7th from the front and 9th from the back of a queue. How many people are there?|15|16|14|17|Total = 7 + 9 − 1.
In a line of 20 people, Leela is 6th from the left. What is her rank from the right?|15th|14th|16th|13th|Right rank = 20 − 6 + 1.
A is taller than B, and B is taller than C. Who is shortest?|C|A|B|Cannot be determined|The given strict order is A > B > C.
P sits between Q and R in a three-person row. Who occupies the middle seat?|P|Q|R|Cannot be determined|Between the other two in a row of three identifies the middle seat.
A person walks 3 km north and then 4 km east. What is the straight-line distance from the start?|5 km|7 km|1 km|6 km|Apply Pythagoras: √(3² + 4²) = 5.
Facing east, you turn left and then turn right. Which direction do you face?|East|North|South|West|East → north → east.
Find the missing number: 4, 9, 14, __, 24.|19|18|20|21|The arithmetic progression adds 5 each time.
If 2 maps to 6, 3 to 12 and 4 to 20 using n(n+1), what does 5 map to?|30|25|35|40|5 × 6 = 30.
`);

rows('group2',0,'Indian history',`
Which feature is strongly associated with Harappan urban planning?|Covered drainage systems|Gothic cathedrals|Railway terminals|Gunpowder magazines|Harappan cities are known for planned streets and drainage.
The Great Bath was excavated at which site?|Mohenjo-daro|Sanchi|Pataliputra|Ajanta|The Great Bath is a major structure at Mohenjo-daro.
Which is the oldest of the four Vedas?|Rigveda|Samaveda|Yajurveda|Atharvaveda|The Rigveda contains the oldest Vedic hymns.
The Four Noble Truths are central to which tradition?|Buddhism|Jainism|Zoroastrianism|Sikhism|The Buddha's teaching explains suffering, its origin, cessation and the path.
Mahavira is traditionally regarded as which Jain Tirthankara?|24th|1st|10th|12th|Jain tradition identifies Mahavira as the twenty-fourth Tirthankara.
Who founded the Mauryan Empire?|Chandragupta Maurya|Ashoka|Samudragupta|Harsha|Chandragupta established the Mauryan dynasty.
Which war is associated with Ashoka's remorse in his inscriptions?|Kalinga war|Battle of Plassey|Battle of Talikota|Third battle of Panipat|Ashoka's Major Rock Edict XIII describes the suffering caused by the Kalinga conquest.
Most Ashokan inscriptions in the subcontinent used which script?|Brahmi|Roman|Cyrillic|Persian Nastaliq|Brahmi predominated, although other scripts were used in some regions.
The Arthashastra is traditionally attributed to whom?|Kautilya|Kalidasa|Bana|Tulsidas|Kautilya, also called Chanakya, is associated with this treatise on statecraft.
The Prayaga inscription praising Samudragupta was composed by whom?|Harisena|Megasthenes|Al-Biruni|Amir Khusrau|Harisena was Samudragupta's court poet.
Aryabhata is especially associated with which field?|Mathematics and astronomy|Mughal painting|Ocean navigation under the Portuguese|Colonial revenue administration|Aryabhata wrote on mathematics and astronomy.
Who wrote the Harshacharita?|Banabhatta|Kalhana|Kautilya|Ibn Battuta|Banabhatta's prose biography describes Harsha.
The Brihadisvara temple at Thanjavur was built under which ruler?|Rajaraja I|Ashoka|Akbar|Harshavardhana|The temple is a major monument of Rajaraja I's Chola reign.
The Uttaramerur inscriptions are noted for information about what?|Local village administration|The 1857 revolt|Mughal mansabdari|Portuguese naval warfare|They describe local assembly arrangements during the Chola period.
Who founded the Slave or Mamluk dynasty of Delhi?|Qutb-ud-din Aibak|Babur|Sher Shah|Alauddin Khalji|Aibak established independent rule in Delhi in 1206.
Market-control measures in the Delhi Sultanate are associated with whom?|Alauddin Khalji|Iltutmish|Ibrahim Lodi|Bahadur Shah Zafar|Alauddin used price regulation and market supervision.
Which ruler shifted his capital from Delhi to Daulatabad?|Muhammad bin Tughlaq|Akbar|Balban|Razia Sultan|The transfer is associated with Muhammad bin Tughlaq.
The first battle of Panipat in 1526 was fought between Babur and whom?|Ibrahim Lodi|Rana Pratap|Hemu|Sher Shah|Babur defeated Ibrahim Lodi, opening the way for Mughal rule.
The mansabdari system developed under which Mughal ruler?|Akbar|Bahadur Shah II|Babur only|Farrukhsiyar|Akbar organised imperial service through graded mansabs.
Who built the Taj Mahal?|Shah Jahan|Akbar|Aurangzeb|Jahangir|Shah Jahan commissioned the mausoleum in memory of Mumtaz Mahal.
Kabir's verses are known for criticism of what?|Ritualism and sectarian divisions|All forms of poetry|Agricultural irrigation|Maritime trade|Kabir emphasised devotion while questioning rigid religious divisions and empty ritual.
Nizamuddin Auliya belonged to which Sufi order?|Chishti|Jesuit|Theravada|Digambara|Nizamuddin Auliya was a prominent Chishti saint.
Shivaji's council of eight ministers was called what?|Ashtapradhan|Navaratna|Diwan-i-Khas|Sabha of Forty|Ashta means eight; the council comprised eight principal offices.
Vasco da Gama reached Calicut by sea in which year?|1498|1526|1757|1857|His arrival in 1498 established the direct sea route from Europe to India.
The battle of Plassey took place in which year?|1757|1764|1857|1799|The East India Company defeated Siraj ud-Daulah at Plassey in 1757.
The Permanent Settlement of 1793 was introduced under whom?|Lord Cornwallis|Lord Curzon|Lord Ripon|Lord Mountbatten|Cornwallis implemented the settlement in Bengal and neighbouring areas.
The 1857 uprising first broke out among sepoys at which major centre on 10 May?|Meerut|Bombay|Madras|Pondicherry|Sepoys at Meerut rebelled and then moved toward Delhi.
Who founded the Brahmo Sabha in 1828?|Raja Rammohan Roy|Jyotirao Phule|Dayananda Saraswati|Swami Vivekananda|Rammohan Roy founded the body later known as the Brahmo Samaj.
Gandhi's Salt March in 1930 began at which place?|Sabarmati Ashram|Wardha|Champaran|Chauri Chaura|The march began at Sabarmati and ended at Dandi.
Andhra State was formed in 1953 primarily for speakers of which language?|Telugu|Tamil|Kannada|Marathi|Andhra State was carved out of the Telugu-speaking areas of Madras State.
`);
rows('group2',1,'Physical, human and AP geography',`
Which planet is nearest to the Sun?|Mercury|Venus|Earth|Mars|Mercury is the innermost planet.
Earth's rotation primarily causes what?|Day and night|The annual seasonal cycle alone|Ocean salinity|Continental drift|Rotation turns different parts of Earth toward and away from the Sun.
The Earth's crust and uppermost rigid mantle together form what?|Lithosphere|Hydrosphere|Outer core|Mesosphere of the atmosphere|The lithosphere includes the crust and rigid upper mantle.
Most weather phenomena occur in which atmospheric layer?|Troposphere|Thermosphere|Exosphere|Stratosphere above the ozone layer|The troposphere contains most atmospheric water vapour and weather.
The ozone layer is concentrated mainly in which layer?|Stratosphere|Troposphere|Exosphere|Inner core|Stratospheric ozone absorbs much harmful ultraviolet radiation.
Which instrument measures atmospheric pressure?|Barometer|Hygrometer|Seismograph|Anemometer|A barometer measures air pressure.
The principal cause of ocean tides is what?|Gravitational attraction of Moon and Sun|Daily fishing activity|Ocean salinity alone|Earthquakes every day|Lunar and solar gravity produce tidal forces.
The Gulf Stream is classified as which type of current?|Warm ocean current|Cold ocean current|Underground river|Tidal bore only|It transports warm water in the North Atlantic system.
Which process forms a river delta?|Deposition near a river mouth|Glacial plucking at a summit|Volcanic eruption alone|Wind erosion in a desert|Sediment accumulation where a river enters a slower body of water can build a delta.
Black cotton soils are particularly associated with which parent material in India?|Basaltic lava|Coral fragments only|Recent dune sand only|Granite alone in every region|Weathering of Deccan basalt is a major source of black soils.
Laterite soils develop strongly under which conditions?|High rainfall and temperature with leaching|Permanent ice cover|No rainfall|Deep ocean darkness|Intense tropical weathering and leaching favour laterite formation.
Which river flows westward into the Arabian Sea?|Narmada|Godavari|Krishna|Mahanadi|The Narmada flows west through a rift valley.
The Godavari originates near which place?|Trimbakeshwar|Amarkantak|Gangotri|Talakaveri|Its source is near Trimbakeshwar in Maharashtra.
The Krishna River originates near which place?|Mahabaleshwar|Nashik|Amarkantak|Yamunotri|The Krishna rises in the Western Ghats near Mahabaleshwar.
Which sea lies along Andhra Pradesh's eastern coast?|Bay of Bengal|Arabian Sea|Red Sea|Caspian Sea|Andhra Pradesh fronts the Bay of Bengal.
The hills running through eastern peninsular India and Andhra Pradesh are called what?|Eastern Ghats|Aravallis|Karakoram|Pir Panjal|The Eastern Ghats form a discontinuous hill system in eastern India.
Kolleru Lake lies between the deltas of which rivers?|Godavari and Krishna|Narmada and Tapi|Ganga and Yamuna|Mahanadi and Brahmani|Kolleru is a freshwater lake between the Godavari and Krishna deltas.
Pulicat Lake is best described as what?|A coastal lagoon|A volcanic crater lake|A glacial tarn|An artificial hill reservoir|Pulicat is a brackish coastal lagoon on the Andhra Pradesh–Tamil Nadu coast.
Which vegetation is adapted to saline tidal coastal conditions?|Mangroves|Alpine meadow|Tundra moss only|Desert cactus alone|Mangroves tolerate saline intertidal habitats.
Which is a renewable source of energy?|Solar radiation|Coal|Petroleum|Natural gas|Solar energy is replenished naturally on human timescales.
Which activity belongs to the primary economic sector?|Fishing|Banking|Software services|Car assembly|Primary activities directly obtain natural resources.
Cotton textile manufacturing is an example of which industry?|Agro-based|Purely mineral-based|Space-based|Forest-only|Its principal raw material is an agricultural crop.
Which factor usually favours locating a bulky raw-material industry near its source?|Reduced transport cost|Guaranteed absence of labour|No need for electricity|Elimination of all taxes|Moving bulky inputs can be costly, encouraging source proximity.
Population density is normally expressed as what?|Persons per square kilometre|Births per doctor|Households per school|Deaths per year|Density relates population size to land area.
Movement of people from rural areas to towns contributes directly to what?|Urbanisation|Glaciation|Desert longitude|Ocean tides|Rural-to-urban migration adds to urban population.
Which is a push factor in migration?|Loss of local livelihood|Better wages at destination|Better destination universities|More destination hospitals|A push factor is an adverse condition at the place of origin.
The Human Development Index combines health and education with what?|Standard of living|Military expenditure|Land area|Number of political parties|The income dimension represents a decent standard of living.
Which action is appropriate before a forecast cyclone makes landfall?|Follow official evacuation advice|Move toward the shoreline|Shelter under isolated trees|Ignore local warnings|Evacuation to designated safe shelters reduces exposure to surge and wind.
Contour lines on a map join points of equal what?|Elevation|Rainfall|Temperature|Population|Contours connect equal heights above a datum.
A map scale is 1:50,000. What ground distance does 2 cm represent?|1 km|100 m|10 km|500 m|2 × 50,000 cm = 100,000 cm = 1 km.
`);
rows('group2',2,'Society and inclusion',`
Kinship refers primarily to relationships based on what?|Descent, marriage or recognised family ties|Income tax rates|Ocean currents|Election symbols|Kinship organises socially recognised familial relationships.
A family comprising parents and their dependent children is commonly called what?|Nuclear family|Joint family of several generations|Clan of all descendants|Entire village council|The nuclear family is a small parent–child unit.
Marriage within a specified social group is called what?|Endogamy|Exogamy|Migration|Secularisation|Endogamy requires marriage within the defined group.
Marriage outside a specified group is called what?|Exogamy|Endogamy|Urbanisation|Industrialisation|Exogamy requires a partner outside the specified group.
Descent traced through the mother's line is called what?|Matrilineal descent|Patrilineal descent|Bilateral tax|Patrilocal residence|Matrilineality traces lineage through women; it does not by itself mean female political rule.
Residence with or near the husband's family after marriage is called what?|Patrilocal residence|Matrilineal descent|Exogamy|Polyandry|Patrilocality concerns residence, not descent.
Which best describes an ascribed social status?|A status assigned by birth or involuntarily|A qualification earned through an exam|A promotion earned at work|An elected office won by campaign|Ascribed status is not primarily acquired through individual achievement.
Which is an example of achieved status?|Becoming a trained engineer|Birth order|Age at birth|Inherited lineage|Professional qualification is acquired through education and effort.
Socialisation is the process of learning what?|Social norms and roles|Only arithmetic tables|Only biological reflexes|Only foreign currency rates|Socialisation transmits culture, values and expected behaviour.
Which is generally an early agent of socialisation?|Family|Stock exchange|Ocean current|Customs tariff|Family interactions are a major influence in childhood social learning.
Ethnicity commonly involves shared perceptions of what?|Cultural origin and identity|Identical personal income|Same blood group only|Same occupation for every member|Ethnic identity often draws on ancestry, language, history and culture.
Discrimination based on a person's caste is an example of what?|Social exclusion|Universal inclusion|Ecological succession|Fiscal decentralisation|Such discrimination limits equal participation and opportunities.
Communalism in the Indian social context involves what?|Antagonistic political mobilisation around religious communities|All community volunteering|All rural cooperation|Any shared household|Communalism treats religious communities as opposed political interests.
Regionalism becomes exclusionary when it does what?|Denies equal treatment to people from other regions|Protects local language through inclusive teaching|Studies regional history|Improves transport within a state|Exclusion arises when regional identity is used to deny others equal treatment.
Gender stereotyping means what?|Assigning fixed roles on the basis of gender|Providing equal opportunities|Measuring rainfall|Recognising each person's individual skills|Stereotypes generalise what people should do based on gender.
Which is an example of unpaid care work?|Caring for a dependent family member without pay|A paid bank job|A factory wage shift|A paid transport contract|Care inside households often lacks monetary remuneration despite its economic value.
Which response best supports a child disclosing abuse?|Listen without blame and seek appropriate protection|Blame the child|Publicly circulate the child's identity|Ignore the disclosure|A supportive, protective response prioritises the child's safety and dignity.
Which approach addresses child labour most comprehensively?|Education, family support and protection from exploitation|Punishing the child alone|Closing every school|Treating hazardous work as play|Prevention requires tackling vulnerability while securing education and protection.
Which is an example of accessibility for a wheelchair user?|Step-free entry with a suitable ramp|Stairs as the only entrance|Locked accessible toilets|Information available only above eye level|Accessible design removes physical participation barriers.
An inclusive classroom aims to do what?|Adapt learning so diverse students can participate|Exclude students needing support|Teach only the highest scorers|Use one inaccessible format for everyone|Inclusion responds to differing needs rather than excluding learners.
A social welfare programme is evaluated most meaningfully by what?|Coverage and improvement in intended beneficiaries' wellbeing|Number of posters alone|Office wall colour|Length of its name|Outcome and coverage measures assess whether objectives are achieved.
Which measure improves accountability in welfare delivery?|Transparent eligibility and grievance redressal|Undisclosed selection rules|No appeal mechanism|Destroying beneficiary records|Clear rules and accessible complaints mechanisms help correct exclusion and misuse.
Why collect data disaggregated by gender and social group?|To identify unequal outcomes|To assume every group is identical|To eliminate privacy safeguards|To avoid programme evaluation|Aggregate averages can hide disparities across groups.
What is intersectionality concerned with?|Overlapping social disadvantages and identities|Only road intersections|Only differences in climate|Only one category in isolation|Multiple identities can interact to produce distinct experiences of disadvantage.
Which approach can reduce youth unrest constructively?|Channels for participation, education and employment|Ignoring grievances|Blanket stereotyping of youth|Withholding all information|Participation and opportunity can address underlying exclusion and frustration.
What distinguishes equality of opportunity from identical treatment in every circumstance?|Removing barriers may require different support|It requires ignoring disability|It forbids all education|It guarantees identical outcomes|Equal opportunity may require accommodations for unequal starting conditions.
What is a demographic indicator?|Age distribution of a population|Colour of a building|Length of a poem|A rock's hardness|Demography studies population size, composition and change.
Which is a form of social mobility?|Moving from one occupational status to another|A river changing course|A planet revolving|A train changing platform|Social mobility concerns movement within a social hierarchy.
Why involve intended beneficiaries in programme design?|Their experience helps identify practical barriers|They can never understand their needs|Participation removes all need for evidence|It guarantees unlimited funding|Participation improves understanding of access barriers and local priorities.
What does secular governance seek in relation to religious citizens?|Equal civic treatment regardless of religion|Citizenship determined only by one faith|A ban on every cultural practice without distinction|Exclusion of all minorities|Equal citizenship is a core principle of secular public institutions.
`);
for(const [question,answer,b,c,d,explanation,source] of currentAffairs2026){
  add('group2',3,'Current affairs: 2025–2026 snapshot',question,answer,[b,c,d],explanation,{source,asOf:'2026-11-16'});
}
// Thirty varied arithmetic/reasoning questions drawn from the original RRB set.
for(const original of [...banks.rrb.slice(0,22),...banks.rrb.slice(80,88)]) {
 const {id,section,subject,...q}=original;
 banks.group2.push({...q,id:`group2-model1-${banks.group2.length+1}`,section:'Mental Ability',subject:'Mental Ability'});
}
const screeningRevisions=[
  [7,0,'Ashokan inscriptions','A historian wants direct evidence that Ashoka publicly addressed the suffering caused by conquest. Which source and event give the strongest match?','Major Rock Edict XIII and the Kalinga war',['The Allahabad Pillar inscription and the Kalinga war','Major Rock Edict XIII and the Second Battle of Tarain','The Aihole inscription and the Kalinga war'],'Major Rock Edict XIII records Ashoka’s response to the suffering associated with his conquest of Kalinga. The other inscriptions concern different rulers or events.'],
  [16,0,'Sultanate administration','Two accounts describe maintaining a large standing army. One adds that the ruler intervened in Delhi’s prices for grain and other goods. Which ruler’s administration is most directly associated with these market controls?','Alauddin Khalji',['Balban','Iltutmish','Firuz Shah Tughlaq'],'Alauddin Khalji’s system of market regulation is the clue. The description of an army alone would not single him out.'],
  [59,1,'Topographic maps','Two routes climb from 200 m to 400 m. Route A crosses the contour intervals in 1 km horizontally, and Route B in 2 km. Which comparison follows?','A has twice the average gradient of B.',['Both gradients are equal because the endpoints have the same elevations.','B has twice the average gradient of A.','A gains twice as much height as B.'],'Both routes gain 200 m. Averaged over horizontal distance, the rise per kilometre is twice as large on the shorter route.'],
  [64,2,'Marriage and kinship','A community requires spouses to belong to the same broad community but forbids marriage within one’s own clan. Which combination describes these two rules?','Community endogamy with clan exogamy',['Community exogamy with clan endogamy','Exogamy at both levels','Endogamy at both levels'],'Endogamy draws the marriage partner from inside the reference group. Exogamy requires going outside it. The rules refer to two different levels.'],
  [84,2,'Overlapping barriers','A training scheme finds that distance reduces attendance and language barriers reduce successful enrolment. Participants facing both barriers are especially underrepresented. What analysis best examines the combined effect?','Compare outcomes across all four combinations of distance and language access.',['Measure only average attendance across the entire scheme.','Compare language groups solely among participants living far away.','Pool all applicants with either barrier as one undifferentiated group.'],'The four groups separate each single barrier from the group experiencing both. This makes their combined association visible.'],
  [143,4,'Alternating series','Odd and even positions follow separate arithmetic progressions. In 8, 41, 13, 36, 18, 31, ?, ?, what replaces the two blanks, in order?','23, 26',['23, 31','22, 26','26, 23'],'The odd-position values increase by 5. The even-position values decrease by 5. Extend each independently.'],
  [144,4,'Schedule constraints','Five sessions run in order from 1 to 5. Archiving follows indexing immediately. Scanning is first, checks are later than archiving, and dispatch is last. Which session is third?','Archiving',['Indexing','Checks','Scanning'],'Slots 1 and 5 are fixed. The consecutive indexing–archiving pair must end before checks, so slots 2–4 are indexing, archiving and checks.'],
  [145,4,'Using relative ranks','Asha is 9th from the front of a queue of 34 and Bala is 11th from the back. Four people between them leave. If nobody changes relative position, how many remain between them?','10',['11','13','14'],'Bala was 34 − 11 + 1 = 24th from the front. The original gap was 24 − 9 − 1 = 14. Four departures leave 10.'],
  [146,4,'Sound deduction','Every verified form is signed. No unsigned form can be paid. Some signed forms are awaiting verification. What must be true?','Some forms are signed without yet being verified.',['Every signed form is already verified.','No signed form can be paid.','Every form awaiting verification is unsigned.'],'The final premise supplies a signed form awaiting verification. Signing is required for verification, but signing alone does not establish completion.']
];
for(const [position,section,topic,stem,key,wrong,reason] of screeningRevisions){
 const question=modelQuestion('group2',1,position-1,section,topic,stem,key,wrong,reason);
 banks.group2[position-1]={...question,id:question.id+'-applied'};
}
const output=[];
let challengeOutput;
for(const [exam,questions] of Object.entries(banks)){
 const paper={title:EXAMS[exam].name+' · Foundation model 1',provenance:'GateLabs original practice material',note:exam==='group2'?'150-question foundation paper with a sourced 2025–2026 current-affairs snapshot checked 16 November 2026: AP, national and international topics. This is a practice selection, not a prediction or exhaustive coverage; update it as new events occur.':'100-question model with foundational Maths and Science, applied data analysis and multi-step reasoning. Uses the indicative 30/30/20/20 distribution.',questions};
 let papers=[paper];
 if(exam==='rrb'){
   const prior=[rrbPracticePaper(2,rrbModel2),rrbPracticePaper(3,rrbModel3)];
   const variations=Array.from({length:7},(_,i)=>logicalReasoning(21+i)
     .filter(row=>['Nested conditions','Binary logic and parity','Truth-count deduction','Possibility versus certainty','Constrained data arrangement'].includes(row[0]))
     .map((row,j)=>modelQuestion('rrb',21+i,j,2,...row)));
   const reserve=[
     ...prior.flatMap(item=>item.questions.slice(60).filter(q=>!q.passage)),
     ...reserveDeductions.map((row,i)=>modelQuestion('rrb',30,i,2,...row)),...variations.flat()
   ];
   papers=uniqueRrbPapers([replaceRrbReasoning(paper,1),...prior.map((item,i)=>replaceRrbReasoning(item,i+2)),
     ...stationMasterSeries(modelQuestion,EXAMS.rrb.name)],reserve);
   const extension=stationMasterExpansion();
   const challengeFile='public/exams/challenges/rrb.json';
   const priorChallenges=JSON.parse(fs.readFileSync(challengeFile,'utf8')).filter(item=>item.title!==extension.challenge.title);
   challengeOutput=[challengeFile,[...priorChallenges,extension.challenge]];
   papers=[...papers.filter(item=>item.full!==false),...extension.papers,...papers.filter(item=>item.full===false),...extension.drills];
   if(crossPaperRepeats([...papers,...challengeOutput[1]]).length)throw Error('Repeated question prompts across Station Master papers');
 }
 for(const candidate of papers) {
   const {errors}=inspectPaper({...candidate,examId:exam,full:candidate.full!==false,original:true});
   if(errors.length) throw Error(candidate.title+': '+errors.join(' · '));
 }
 output.push([exam,papers]);
}
fs.mkdirSync('public/exams',{recursive:true});
for(const [exam,papers] of output){
 fs.writeFileSync(`public/exams/${exam}.json`,JSON.stringify(papers,null,2)+'\n');
 console.log(`${exam}: ${papers.length} papers and drills validated`);
}
if(challengeOutput)fs.writeFileSync(challengeOutput[0],JSON.stringify(challengeOutput[1],null,2)+'\n');
