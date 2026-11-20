export const CBAT_NOTES = {
  intelligence:{
    skill:'Figure comparison, rotation, and spotting the odd shape.',
    recall:['Find an anchor','Turn the figure','Check handedness'],
    details:[
      'Think of the shaded squares as a single rigid shape. Moving that shape across the grid changes its position, and turning it changes its orientation, but neither changes the side on which a branch sits once the long arm is aligned. A reflection reverses that relationship. Count consecutive squares, find an endpoint or an elbow, and compare its surroundings after aligning the main arms.',
      'On a square grid a quarter-turn swaps the horizontal and vertical directions. If a figure has two branches of different lengths, anchor the longer branch first so both turns are interpreted from the same end. If the branches match in length, use a third feature or try all four orientations. The square count and bounding box alone cannot identify a mirror.'
    ],
    method:[
      'Compare features that stay the same under rotation, such as the number of cells and which cells touch.',
      'Match a distinctive feature, such as a long arm and its short side branch. Rotate the figure mentally until the arms line up.',
      'Check which way the branch turns. A reflected figure can have the same outline size and cell count.'
    ],
    prompt:'Which figure cannot be made by rotating Figure A?',
    figures:[[0,4,8,9],[3,2,1,5],[1,5,8,9]],
    solution:'Figure C. Figure B is a quarter-turn of A. Figure C mirrors A, putting its short arm on the opposite side after the long arms are aligned.',
    mistake:'Comparing only the number of shaded cells. All three examples have four, so compare how the cells are joined.',
    practice:'Work through the sample without a timer before starting an Intelligence set. For missed items, identify the feature that changed before retrying.'
  },
  attention:{
    skill:'Filtering distractors and adding only the digits the prompt specifies.',
    recall:['Pick target digits','Add in chunks','Verify the sum'],
    details:[
      'First identify the target digits, then add their values. In an odd-digit item, the targets are 1, 3, 5, 7 and 9. Zero and the other even digits contribute nothing. Treat each printed digit as a separate entry unless the instructions say otherwise. Every repeated target contributes again.',
      'Use small, contiguous chunks when a line is long. For 9 2 7 7 8 1, divide after the fourth digit. The first subtotal is 23 and the second is 1, giving 24. Chunk boundaries keep your place while you add. On review, classify each error as an omitted target, a distractor included, or incorrect addition, and practise the stage that failed.'
    ],
    method:[
      'Read the target rule before scanning. The RDSO example practises summing odd digits.',
      'Scan left to right in small groups. Ignore even digits and keep a running total instead of counting matches.',
      'Use groups that add to ten when they stand out. Check the sum once against the options.'
    ],
    prompt:'Add only the odd digits in 8 7 2 3 6 9 4 5 2 1.',
    solution:'The matching digits are 7, 3, 9, 5 and 1. Group 7+3 and 9+1 into two tens, then add 5. The answer is 25.',
    mistake:'Counting five matching digits instead of finding their sum, or skipping over the final odd digit.',
    practice:'Run the Selective Attention set and compare accuracy with how many items you reach before the timer ends.'
  },
  spatial:{
    skill:'Following connected routes, respecting barriers, and finding the marked building on the shortest route.',
    recall:['Locate A and B','Follow open streets','Report the house'],
    details:[
      'Treat junctions as points and open road segments as connections. Trace only connections printed on the map. In the equal-length practice maps, fewer segments give a shorter route. A diagonal shortcut or a visually adjacent junction does not create a connection. If a question gives unequal distances, compare their totals instead.',
      'At a fork, keep track of the number of segments already used and compare the remaining alternatives. Count from the start, never from a bend halfway through a route. A parallel side street can make the route with fewer turns longer. After comparing the complete paths, scan along the winning path again for the numbered building.'
    ],
    method:[
      'Locate the start and finish and trace only the connections allowed by the map. Treat an interrupted or blocked connection according to the instructions.',
      'Follow plausible routes from both ends. Count street segments when all segments have equal length.',
      'After finding the shortest valid route, read the requested house number along that route.'
    ],
    prompt:'Every segment is equally long. Which numbered house lies on the shortest route from A to B?',
    map:{size:4,start:0,end:11,edges:[[0,1],[1,2],[2,6],[6,7],[7,11],[0,4],[4,8],[8,9],[9,10],[10,14],[14,15],[15,11]],houseCells:[9,6]},
    solution:'House 2. The upper route goes right, right, down, right, down and takes five segments. The lower route goes past House 1 and takes seven.',
    mistake:'Going towards the destination in a straight line where the map shows a gap, or reporting the length when the question asks for a house number.',
    practice:'Practise tracing from both endpoints before choosing. Compare the correct route with any shorter-looking path that was blocked.'
  },
  ordering:{
    skill:'Applying a set of instructions about sequence, fixed positions, and adjacency.',
    recall:['Place fixed slots','Group neighbours','Check every rule'],
    details:[
      'Draw one slot per task and translate each rule into a positional constraint. “X immediately before Y” means the pair XY moves as one block. “X before Y” permits a gap. “Two tasks between X and Y” means that the positions differ by three. Keep the direction of each rule intact as you place items.',
      'Work forward and backward from fixed positions. If five tasks include R in slot 4 and Q immediately before R, Q has to occupy slot 3. Two tasks between Q and S would put S in slot 0 or 6, so that combination is impossible. The same check lets you reject choices quickly before testing weaker precedence rules.'
    ],
    method:[
      'Place any task with a fixed position first. Turn immediate-before or immediate-after rules into a single block.',
      'Use before and after rules to order the blocks, and count carefully when a rule specifies a gap.',
      'Test every rule against the final order. One failed rule rules out that option.'
    ],
    prompt:'Arrange K, M, P, R and T. T is last. P immediately follows M. K comes before R, and R comes before P. Exactly one task lies between K and M.',
    solution:'K → R → M → P → T. Since K and R must precede P and M must be directly before P, P is fourth and M is third. K and R fill slots 1 and 2. R sits between K and M, satisfying the gap rule.',
    mistake:'Reading “immediately follows” as simply “comes later”, or counting the two endpoints as the items between them.',
    practice:'In the timed set, cross out options that violate a fixed position or immediate adjacency first.'
  },
  personality:{
    skill:'Becoming familiar with self-report prompts and their response options.',
    recall:['Read the response scale','Think of typical behaviour','Choose honestly'],
    details:[
      'Personality familiarisation helps you become comfortable with how a prompt is presented and how responses are selected. A question may ask for an agreement rating or ask you to choose between stated preferences. Read the scale each time and check whether the prompt is asking about your usual behaviour, a preference, or your reaction in a stated situation.',
      'Use a typical example from your own experience when a statement feels broad. Notice qualifiers such as “usually”, “under pressure”, and “when learning something new”. Consider the wording independently instead of choosing what you imagine a recruiter would favour. GateLabs records completion for these self-report items.'
    ],
    method:[
      'Read the full prompt and the response scale before choosing.',
      'Think about your usual preference or behaviour in comparable situations.',
      'Follow the instructions on the day. GateLabs records completion for this practice type.'
    ],
    prompt:'Example prompt: When learning a new task, do you usually prefer written instructions or a live demonstration?',
    solution:'Choose the option that best reflects your experience, or the middle option if both suit you equally and that response is offered.',
    mistake:'Searching for an answer key for these familiarisation items. They ask about your own preferences.',
    practice:'Use a Personality set to get used to reading and responding to the prompts.'
  }
};
