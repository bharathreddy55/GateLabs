const picture = (title, text) => ({title, text});

const pictures = [
  [/concentration|mixtures?(?! and density)|solute|dilut/i, 'Picture a glass of juice', 'Keep two counts in your head. One is all the liquid. The other is just the strong juice mixed into it. The strength tells you how much of the whole drink is strong juice.'],
  [/hcf|gcd|equal packs/i, 'Picture identical bundles', 'If every bundle must be the same size, the size has to fit each pile exactly. For a repeating event, think of writing each event’s times down and circling the first time they share.'],
  [/lcm|overlapping schedules|calendars coincide/i, 'Picture two repeating alarms', 'Make one list of ring times for each alarm. A shared time must appear in both lists. If an alarm starts late, start its list at that later time.'],
  [/successive|discount|profit|rebate/i, 'Picture a shop price tag', 'After a price changes, write the new number on the tag. The next percentage usually uses that new tag. When comparing profit with cost, use the amount the seller originally paid.'],
  [/average|mean/i, 'Picture sharing the total equally', 'Add up what everyone has and imagine sharing the total equally. To join groups that already have an average, first work out how much each whole group brings.'],
  [/median|ordered observation|frequency table|distribution/i, 'Picture a line of number cards', 'Put the numbers in order. Repeated numbers each take their own spot. A frequency tells you how many times to write that number. The median sits in the middle of the full line.'],
  [/probab|chance|die |tail probability/i, 'Picture picking from a bag', 'Count what you could pick and which picks would work. If you take an item out and keep it out, update the bag before thinking about a second pick.'],
  [/time and work|work rate|flow and volume|minimum batch/i, 'Picture a job made of small pieces', 'Ask how many pieces get done in one minute or one day. Add the pieces done together. When someone leaves or the rate changes, count what is left before moving on.'],
  [/relative speed|train lengths|relative velocity|displacement|travel time|acceleration intervals/i, 'Picture movement on a straight road', 'Pick one direction as forward. Two things moving towards each other close a gap from both ends. When they move in the same direction, only the extra speed closes the gap.'],
  [/linear|equations|linear rates|combining total and difference/i, 'Picture a box with a missing number', 'Give the unknown amount a name. Write how it relates to the numbers you know. If both sides are equal, you can do the same thing to both sides and keep them equal.'],
  [/arithmetic progression|series|sequence|alternating gaps|progression|interior square|recurrence/i, 'Picture a row of numbered stepping stones', 'Look at what changes from one stone to the next. If the jumps alternate, read every other stone separately. The rule must work on the stones shown before you use it on a blank.'],
  [/remainder|number system|interior square/i, 'Picture making equal piles', 'A remainder is what is left when you make as many full, equal piles as you can. The leftover must be smaller than one full pile.'],
  [/^(?!.*(?:clock|pie|sector))[^\n]*(?:angle|trigonometry|triangles|geometry)/i, 'Picture drawing the shape', 'Mark the point the angle is measured from, and label the sides you know. In a right triangle, the side across from the right angle is the longest. The other side names depend on the angle you chose.'],
  [/^(?!.*(?:density|mass))[^\n]*(?:annular|area|wall volume|cross section|volume|dimensions)/i, 'Picture covering or filling the shape', 'Area tells you how much surface you can cover. Volume tells you how much space a shape holds. Work with one unit at a time and draw the parts you need to add or take away.'],
  [/density|mass and volume|mass and weight/i, 'Picture two blocks the same size', 'The block with more stuff packed into the same space has higher density. Mass tells you how much stuff there is. Weight tells you how hard gravity pulls on it.'],
  [/friction|balanced forces|net work|kinetic energy|work[–-]energy|force and accel/i, 'Picture pushing a box across the floor', 'A push can help the box move. Friction pushes against sliding. Before you work out how its motion changes, check which forces help and which forces push back.'],
  [/heat|warm|thermal|temperature|calibration/i, 'Picture warming a cup of water', 'Temperature tells you how hot it is. Heat is energy that moves from warmer things to cooler things. If you mix two cups, count how much water is in each before guessing the final temperature.'],
  [/circuits?|resistors?|electric|parallel branches/i, 'Picture the paths through a circuit', 'Parts in one unbroken path share the same current. Separate paths joined at both ends share the same voltage. Check which parts are in each path before you add anything.'],
  [/levers?|moments?|mechanical advantage|simple machines/i, 'Picture a playground seesaw', 'A push farther from the centre has more turning effect. A lever or rope can let a smaller push do the job by making you move farther.'],
  [/energy|power|work against/i, 'Picture a job and a stopwatch', 'Work measures how much energy goes into moving or lifting something. Power tells you how fast the job gets done. If some energy is wasted, only the useful part reaches the job.'],
  [/unit conversion|units and measurement|derived units/i, 'Picture measuring the same thing with a different ruler', 'Changing the unit changes the number you write, while the size stays the same. If you are filling a box, the change of unit applies along all three sides.'],
  [/ratio|proportion|share of|different denominators/i, 'Picture dividing things into shares', 'A share is one piece of the group you are counting. Say which group is the whole first. Dividing by the whole class answers a different question from dividing by just one team.'],
  [/pie|sector|slice|allocation.*budget/i, 'Picture a pie cut into pieces', 'All the pieces together make one whole circle, or 360°. Each slice uses some of that circle. You can compare how big the slices look, but the amount in a slice also depends on how large its whole pie is.'],
  [/venn|union|intersection|exclusive|overlap|one set|two sets|exactly .*categor|set inclusion|membership/i, 'Picture overlapping hoops', 'An item in the shared space belongs to both hoops. If you count each hoop and add the totals, shared items get counted twice. Think about whether the question wants them once, twice, or left out.'],
  [/scatter|trend|residual|slope|prediction/i, 'Picture dots next to a guide line', 'The dot shows what happened. The line shows what you expected at that same spot. Read both at the same horizontal position, then compare them.'],
  [/sufficien|missing data|aggregate data|bounds and inferred/i, 'Picture two answers that might fit', 'Try changing the thing the question asks for while keeping every given fact true. If two different answers fit, you need another fact.'],
  [/^clocks?$|clock angles?|clock hands/i, 'Picture two hands chasing each other', 'The long hand moves faster than the short hand. Both keep moving between the hour marks. To find how far apart they are, mark where each hand is at the same time.'],
  [/calendar|weekday|leap year/i, 'Picture turning the pages of a calendar', 'Moving forward seven days brings you back to the same weekday. Cross out complete weeks and count only the extra days. Check whether you pass 29 February.'],
  [/family|kinship|blood relation/i, 'Picture a family tree', 'Put parents on one line, their children on the next, and brothers and sisters side by side. Start at the person named in the question and follow the links one by one.'],
  [/syllogism|class inclusion/i, 'Picture boxes inside boxes', 'If all red cards are in a little box inside a big box, every red card is also in the big box. A card in the big box might be somewhere outside the little one.'],
  [/binary|truth|alarm state|logical possibility|negat|contrapositive/i, 'Picture checkboxes for true and false', 'Try the cases the question allows. In each case, tick the statements that are true, then compare the number of ticks with the rule. A single case can rule out a claim that says “always.”'],
  [/rank|ordering|arrang|schedules?|floor|slot|constraint|selected pair/i, 'Picture numbered places in a line', 'Fill places you know first. If two items must be side by side, move them as a pair. Keep the same direction when you count places or people between them.'],
  [/code|cipher|letter cluster|word token/i, 'Picture a row of alphabet cards', 'Write each letter or symbol in its own spot. Apply the rule listed for that spot. To read a secret code backwards, undo the last change before undoing the earlier ones.'],
  [/analogy|analogue/i, 'Picture a rule you can use twice', 'Say what takes the first item to its partner in a short sentence. Check that the rule also works on any other example, then carry it over to the item you are asked about.'],
  [/relative direction|direction sense/i, 'Picture walking on a map', 'Draw one arrow for each walk. Turning changes where you face. When two walks go in opposite directions, part of the first walk is undone.'],
  [/assumption|evidence|argument|confounding|exception|policy|inference|inferred/i, 'Picture a clue and the claim it is meant to prove', 'Read what you actually know. Then ask what the author wants you to believe. If another cause or a missing fact could change the answer, the clue alone might not prove the claim.'],
  [/percentage|rates|counts|utilisation|attainment|threshold/i, 'Picture a part sitting inside a whole', 'Write the part on one line and the whole it belongs to on another. A percentage tells you how many parts out of 100. The number at the bottom must be the group the question is asking about.']
];

const cbatPictures = {
  intelligence:picture('Picture turning a piece of cardboard', 'Keep every square attached as you turn it. A shape can face a different way and still be the same piece. Check how the corners and filled squares fit together.'),
  attention:picture('Picture sorting a row of number cards', 'Keep only 1, 3, 5, 7 and 9. If you pick up a card marked 7, add seven to your total. If there are two cards marked 7, add seven twice.'),
  spatial:picture('Picture walking from A to B', 'Keep your finger on a drawn street. At a fork, a path that ends without reaching B will not get you there. Follow the route and notice the house you pass.'),
  ordering:picture('Picture putting cards in numbered spaces', 'Fill the spaces that are already decided. If one card must come immediately after another, hold them together. Use the clues still left to place the other cards.')
};

const sectionPictures = {
  'Basic Science and Mathematics':picture('Start with what you can count', 'Name the thing you need to find, including its unit. Underline the numbers that help. Ask what each number tells you before choosing an operation.'),
  'Data Analysis':picture('Picture copying only the rows you need', 'Keep a label next to each number so you know where it came from. When you compare shares, use the whole that belongs to each share.'),
  'Logical Capability':picture('Turn the clues into small checks', 'Take one clue at a time. Write what it lets you say for sure. If you can find two possible stories that fit the clues, keep both until another clue rules one out.'),
  'Mental Reasoning':picture('Put the pieces in order', 'Make a small row on paper. Try the rule on pieces you already know. Once the rule works there, use it on the missing piece.')
};

const plainWords = [
  [/\bdenominator\b/gi, 'bottom number'],
  [/\bnumerator\b/gi, 'top number'],
  [/\bnonzero\b/gi, 'other than zero'],
  [/\bnet (increase|decrease|change)\b/gi, 'overall $1'],
  [/\bfavourable outcomes\b/gi, 'results that fit'],
  [/\bsolute\b/gi, 'material dissolved in the liquid'],
  [/\bdisjoint groups\b/gi, 'groups with nothing shared'],
  [/\binclusive pair counts\b/gi, 'pair counts that also include items in all three groups'],
  [/\bconfounder\b/gi, 'other possible cause'],
  [/\bweighted average\b/gi, 'average that gives each person or item one share'],
  [/\bweighted mean\b/gi, 'average that gives each person or item one share'],
  [/\bcumulative count\b/gi, 'running total'],
  [/\btriple intersection\b/gi, 'group that belongs to all three'],
  [/\bpair intersections\b/gi, 'people counted in each pair of groups'],
  [/\bexclusive pairs\b/gi, 'people in just two groups'],
  [/\bdistinct permutations\b/gi, 'different orders'],
  [/\bfixed capacity\b/gi, 'a limit that stays the same'],
  [/\battainable\b/gi, 'possible'],
  [/\bpaternal grandmother\b/gi, 'father’s mother'],
  [/\bmaternal grandmother\b/gi, 'mother’s mother'],
  [/\bresidual\b/gi, 'gap between the actual and predicted values'],
  [/\bcontrapositive\b/gi, 'rule read backwards with both statements turned into their opposites']
];

function plainText(value) {
  if (typeof value !== 'string') return value;
  return plainWords.reduce((result, [pattern, words]) => result.replace(pattern, words), value);
}

function plainStep(step) {
  if (typeof step === 'object' && step) {
    return {...step, title:plainText(step.title), text:plainText(step.text)};
  }
  const text = plainText(step);
  // Keep a numeric calculation on its own line only when it is clearly
  // separated in the source. Sentences that use "=" in prose stay intact.
  const split = typeof text === 'string' && text.match(/^(.*?)(?:\s*:\s*|\b gives )((?:[₹−-]?\d)[^.!?]*? = [^.!?]+)\.?$/);
  if (split) return {text:split[1] + '.', formula:split[2]};
  if (typeof text === 'string' && /^[₹(\d−][^\n]* = [^\n]*\d/.test(text)) return {formula:text.replace(/\.$/, '')};
  return text;
}

function passagePicture(question) {
  const stem = question.question ?? '';
  if (/main (idea|point)|best (title|summary)|primarily|main purpose|capture/i.test(stem)) {
    return picture('Find the whole story in one sentence', 'Ask what the passage keeps coming back to. The best answer covers that bigger idea. A line about one example can be true while still being too small to tell the whole story.');
  }
  if (/tone|style|organis|organiz|structure|function|contrast|role/i.test(stem)) {
    return picture('Ask what each part is doing', 'One sentence might give a reason, another might show an example, and another might point out a problem. Work out which job the question wants you to name.');
  }
  return picture('Look for the clue in the passage', 'Find the part that talks about what the question asks. Read a line before and after it. Say what these lines support, using just the clues the passage gives you.');
}

function plainReadingClue(question) {
  const passage=question.passage;
  if (typeof passage !== 'string') return null;
  const sentences=passage.match(/[^.!?\n]+(?:[.!?](?=\s|$)|$)/g)?.map(line=>line.trim())??[];
  if (/\b(?:last|final) sentence\b/i.test(question.question)) {
    const quote=sentences.at(-1);
    return quote ? {title:'Start with the last line',quote,
      text:'Read this line beside the thought just before it. Ask whether it adds a reason, shows an example or changes what the reader can conclude.'} : null;
  }
  const phrase=question.question.match(/[“"]([^”"]+)[”"]/);
  if (!phrase) return null;
  const quote=sentences.find(line=>line.includes(phrase[1]));
  return quote ? {title:'Find the words in the story',quote,
    text:'Read the words in this line as part of the whole thought. Use how the passage talks about them to work out what they mean here.'} : null;
}

const dataPictures = [
  [/sufficiency|missing data|inference from aggregate/i, 'Try each clue by itself', 'Cover the second clue and try the first. Then swap. If two different answers still fit the clues you can see, those clues are not enough.'],
  [/conditional|subset|different denominators/i, 'First make the smaller pile', 'Put aside everything outside the group named after “among” or “of those”. Count the part you want inside that smaller pile. Use the smaller pile as your whole.'],
  [/recomputed|corrected|reclassifi|changing the upper tail/i, 'Change only what the question changes', 'Keep a before pile and an after pile. If a record is corrected, take away its old value before adding its new value. Count the number of records again only if a record was added or removed.'],
  [/transfer|reallocat|counterfactual allocation/i, 'Move the same pieces between two piles', 'Take the moved pieces from the first pile and add those same pieces to the second pile. Work out which numbers change and which totals stay the same.'],
  [/percentage point/i, 'Compare two scores out of 100', 'First write both rates as percentages. Then subtract the old percentage from the new one. That gap is measured in percentage points.'],
  [/union|overlap|exclusive|three.set|exactly .*sets?|inclusion|membership|complementary counts/i, 'Sort people into parts of two or three hoops', 'Write the people in the shared middle first. When two group counts include the same people, take out the extra copy before counting everyone.'],
  [/pie|sector|slice|angles|refund.*allocation/i, 'Treat the circle as one whole pie', 'All the pieces make 360°. For a share of the full budget, use 360° as the whole. If the question compares just two pieces, use those two pieces together as the whole.'],
  [/target|threshold/i, 'Draw a line where the goal sits', 'Work out the number you have now and the number you need. The difference tells you how much must change to reach the goal.']
];

const logicPictures = [
  [/assumption|necessary versus sufficient/i, 'Find the missing piece the plan needs', 'Imagine the missing idea is false. If the plan could still work the same way, that idea is not needed. Look for the smallest idea the plan really depends on.'],
  [/counterexample|negation|negating/i, 'Find one case that breaks the promise', 'When a rule says “every”, one case can prove it wrong. Choose a case that starts the way the rule says and then fails to do what it promises.'],
  [/selection|possibility|constraints?|excluded/i, 'Try one choice at a time', 'Put the names or items in the places shown in a choice. Run every clue over that choice. If just one clue breaks, cross that choice out.'],
  [/evaluat|evidence|inference|comparing claims|causal|alternative explanation/i, 'Find the clue that tells the two stories apart', 'Say what changed and what someone thinks caused it. Ask whether something else could have made the same change. Look for a fair comparison that keeps those other things the same.'],
  [/nested conditions|applying a stated policy|exception|contrapositive/i, 'Turn the rule into a little checklist', 'Write what starts the rule and what has to happen next. Check whether the question says the required result happened, or whether it rules that result out.']
];

function guidedSteps(steps, focused) {
  if (!focused) return steps.map(plainStep);
  return steps.flatMap(raw=>{
    if (typeof raw !== 'string') return [plainStep(raw)];
    // The original author sometimes put two deductions on one line.
    // Keep decimals, quote text and symbolic chains intact.
    const parts=raw.split(/;\s+(?=[A-Za-z])|(?<![\dA-Z])\.\s+(?=[A-Z][a-z]{2,}\b)/);
    return parts.map((part,index)=>{
      const text=part.trim();
      if (!text) return null;
      const first=index?text[0].toUpperCase()+text.slice(1):text;
      return plainStep(/[.!?]$/.test(first)?first:first+'.');
    }).filter(Boolean);
  });
}

export function stationMasterBeginner(question, solution, battery) {
  if (!solution.steps.length && !solution.reason && !solution.approach) return solution;
  const topic = question.topic === 'Arithmetic and basic science' ? question.question : question.topic;
  const data = question.section === 'Data Analysis';
  const logic = question.section === 'Logical Capability';
  const sectionCues = data ? dataPictures : logic ? logicPictures : [];
  const cue = sectionCues.find(([pattern]) => pattern.test(topic ?? '')) ?? pictures.find(([pattern]) => pattern.test(topic ?? ''));
  const introduction = solution.picture ?? cbatPictures[battery] ??
    (question.passage && /reading/i.test(question.topic ?? '') ? passagePicture(question) :
      cue && picture(cue[1], cue[2])) ??
    sectionPictures[question.section];
  const steps = solution.steps.length ? solution.steps : solution.reason ? [solution.reason] : [];
  const workedSteps=guidedSteps(steps, data||logic);
  if (logic && question.passage && /reading/i.test(question.topic ?? '') && !workedSteps.some(step=>step.quote)) {
    const clue=plainReadingClue(question);
    if (clue) workedSteps.unshift(clue);
  }
  return {
    ...solution,
    picture:introduction,
    steps:workedSteps,
    reason:solution.steps.length ? plainText(solution.reason) : '',
    tip:plainText(solution.tip)
  };
}
