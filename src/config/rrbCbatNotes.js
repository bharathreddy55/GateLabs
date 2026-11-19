export const CBAT_NOTES = {
  intelligence:{
    skill:'Figure comparison, rotation, and spotting the odd shape.',
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
