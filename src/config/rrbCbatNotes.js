export const CBAT_NOTES = {
  intelligence:{
    skill:'Figure comparison, rotation, and spotting the odd shape.',
    details:[
      'Think of the shaded squares as a single rigid shape. Moving that shape across the grid changes its position, and turning it changes its orientation, but neither changes the side on which a branch sits once the long arm is aligned. A reflection reverses that relationship. Count consecutive squares, find an endpoint or an elbow, and compare its surroundings after aligning the main arms.',
      'On a square grid a quarter-turn swaps the horizontal and vertical directions. If a figure has two branches of different lengths, anchor the longer branch first so both turns are interpreted from the same end. If the branches match in length, use a third feature or try all four orientations. The square count and bounding box alone cannot identify a mirror.'
    ],
    rules:[
      'Translation moves every cell by the same offset. Rotation turns the shape by 0°, 90°, 180° or 270° on a square grid. Both preserve cell count and edge adjacency.',
      'For an asymmetric elbow, align the long arm and then check the turn of the short arm. A reflection reverses that turn.',
      'Count how many edge-neighbours each cell has. A junction with three edge-neighbours cannot become part of a chain where each cell has at most two.'
    ],
    method:[
      'Compare features that stay the same under rotation, such as the number of cells and which cells touch.',
      'Match a distinctive feature, such as a long arm and its short side branch. Rotate the figure mentally until the arms line up.',
      'Check which way the branch turns. A reflected figure can have the same outline size and cell count.'
    ],
    exampleTitle:'Rotation versus mirror image',
    prompt:'Which figure cannot be made by rotating Figure A?',
    figures:[[0,4,8,9],[3,2,1,5],[1,5,8,9]],
    solution:'Figure C. Figure B is a quarter-turn of A. Figure C mirrors A, putting its short arm on the opposite side after the long arms are aligned.',
    models:[
      {
        title:'Same shape at a different grid position',
        prompt:'Figure X shades A1, A2 and B2. Figure Y shades B2, B3 and C3. Compare them with rows A to D and columns 1 to 4.',
        steps:['Use the top-left filled cell as the anchor in each figure. In X, the others are one cell right of the anchor and then one down.','Y has the identical offsets from B2. Moving X down one row and right one column aligns all three cells.'],
        answer:'They match by translation.'
      },
      {
        title:'Eliminate a shape by its junction',
        prompt:'A figure shades B1, B2, B3 and C2. Could it rotate into one shading A1, B1, C1 and C2?',
        steps:['In the first figure the central B2 touches three neighbours by edges.','In the second, every cell has one or two edge-neighbours. Turning the grid cannot change an edge-neighbour count.'],
        answer:'No. The first has a three-way junction and the second has none.'
      }
    ],
    mistake:'Comparing only the number of shaded cells. All three examples have four, so compare how the cells are joined.',
    practice:'Work through the sample without a timer before starting an Intelligence set. For missed items, identify the feature that changed before retrying.'
  },
  attention:{
    skill:'Filtering distractors and adding only the digits the prompt specifies.',
    details:[
      'First identify the target digits, then add their values. In an odd-digit item, the targets are 1, 3, 5, 7 and 9. Zero and the other even digits contribute nothing. Treat each printed digit as a separate entry unless the instructions say otherwise. Every repeated target contributes again.',
      'Use small, contiguous chunks when a line is long. For 9 2 7 7 8 1, divide after the fourth digit. The first subtotal is 23 and the second is 1, giving 24. Chunk boundaries keep your place while you add. On review, classify each error as an omitted target, a distractor included, or incorrect addition, and practise the stage that failed.'
    ],
    rules:[
      'Odd digits are 1, 3, 5, 7 and 9. Even digits are 0, 2, 4, 6 and 8. The instructions determine which set to scan for.',
      'For a sum, each match contributes its value. For a count, each match contributes one. Repeated matches count separately in both operations.',
      'Use adjacent chunks and visit each chunk once. Adding a zero affects the count of even digits but has no effect on their sum.'
    ],
    method:[
      'Read the target rule before scanning. The RDSO example practises summing odd digits.',
      'Scan left to right in small groups. Ignore even digits and keep a running total instead of counting matches.',
      'Use groups that add to ten when they stand out. Check the sum once against the options.'
    ],
    exampleTitle:'Filter and sum the target digits',
    prompt:'Add only the odd digits in 8 7 2 3 6 9 4 5 2 1.',
    solution:'The matching digits are 7, 3, 9, 5 and 1. Group 7+3 and 9+1 into two tens, then add 5. The answer is 25.',
    models:[
      {
        title:'Repeated targets across chunks',
        prompt:'Add the odd digits in 7 8 7 6 7 4 1 8 9 2 9 6.',
        steps:['Read four digits at a time. The first chunk gives 7+7=14. The second gives 7+1=8.','The last chunk gives 9+9=18. Add the subtotals without dropping repeated values.'],
        answer:'14+8+18=40.'
      },
      {
        title:'Practise switching from sum to count',
        prompt:'In 0 5 2 0 7 4 8 1, give both the count and sum of even digits.',
        steps:['The even targets are 0,2,0,4,8. Both zeroes are matches for the count.','Their summed values are 0+2+0+4+8. Keep the count and sum separate.'],
        answer:'Five matches, sum 14.'
      }
    ],
    mistake:'Counting five matching digits instead of finding their sum, or skipping over the final odd digit.',
    practice:'Run the Selective Attention set and compare accuracy with how many items you reach before the timer ends.'
  },
  spatial:{
    skill:'Following connected routes, respecting barriers, and finding the marked building on the shortest route.',
    details:[
      'Treat junctions as points and open road segments as connections. Trace only connections printed on the map. In the equal-length practice maps, fewer segments give a shorter route. A diagonal shortcut or a visually adjacent junction does not create a connection. If a question gives unequal distances, compare their totals instead.',
      'At a fork, keep track of the number of segments already used and compare the remaining alternatives. Count from the start, never from a bend halfway through a route. A parallel side street can make the route with fewer turns longer. After comparing the complete paths, scan along the winning path again for the numbered building.'
    ],
    rules:[
      'A valid route visits consecutive connected junctions. The number of segments is one less than the number of listed junctions along the route.',
      'For equal-length segments, compare segment counts. For labelled distances, add the lengths along each valid path.',
      'Trace the finished path from A to B again to report the house number. Choose by the route even when a house off the path is visually closer to B.'
    ],
    method:[
      'Locate the start and finish and trace only the connections allowed by the map. Treat an interrupted or blocked connection according to the instructions.',
      'Follow plausible routes from both ends. Count street segments when all segments have equal length.',
      'After finding the shortest valid route, read the requested house number along that route.'
    ],
    exampleTitle:'Shortest equal-length route and its house',
    prompt:'Every segment is equally long. Which numbered house lies on the shortest route from A to B?',
    map:{size:4,start:0,end:11,edges:[[0,1],[1,2],[2,6],[6,7],[7,11],[0,4],[4,8],[8,9],[9,10],[10,14],[14,15],[15,11]],houseCells:[9,6]},
    solution:'House 2. The upper route goes right, right, down, right, down and takes five segments. The lower route goes past House 1 and takes seven.',
    models:[
      {
        title:'Eliminate a branch blocked by a gap',
        prompt:'A, C and B appear along the top of a map, but C–B is closed. The open roads are A–C, A–D, D–E and E–B. House 3 is at C and House 5 is at E. Which house is on the shortest open route?',
        steps:['A–C reaches a dead end because C–B is closed. Do not count the closed segment.','The open route is A–D–E–B, which passes E.'],
        answer:'House 5.'
      },
      {
        title:'Variation with unequal lengths',
        prompt:'Two open routes are A–P–B with lengths 4 and 7, and A–Q–R–B with lengths 3, 3 and 4. Which is shorter by distance?',
        steps:['A–P–B has two segments but total length 4+7=11.','A–Q–R–B has three segments and total length 3+3+4=10. The distances are explicitly unequal, so use the totals.'],
        answer:'A–Q–R–B, total length 10.'
      }
    ],
    mistake:'Going towards the destination in a straight line where the map shows a gap, or reporting the length when the question asks for a house number.',
    practice:'Practise tracing from both endpoints before choosing. Compare the correct route with any shorter-looking path that was blocked.'
  },
  ordering:{
    skill:'Applying a set of instructions about sequence, fixed positions, and adjacency.',
    details:[
      'Draw one slot per task and translate each rule into a positional constraint. “X immediately before Y” means the pair XY moves as one block. “X before Y” permits a gap. “Two tasks between X and Y” means that the positions differ by three. Keep the direction of each rule intact as you place items.',
      'Work forward and backward from fixed positions. If five tasks include R in slot 4 and Q immediately before R, Q has to occupy slot 3. Two tasks between Q and S would put S in slot 0 or 6, so that combination is impossible. The same check lets you reject choices quickly before testing weaker precedence rules.'
    ],
    rules:[
      'With slot numbers increasing left to right, “X before Y” means slot(X) < slot(Y). “Immediately before” means slot(Y)=slot(X)+1.',
      'Exactly k tasks between X and Y means their slot difference has magnitude k+1.',
      'For a valid order, each item appears once and every rule holds on the same arrangement.'
    ],
    method:[
      'Place any task with a fixed position first. Turn immediate-before or immediate-after rules into a single block.',
      'Use before and after rules to order the blocks, and count carefully when a rule specifies a gap.',
      'Test every rule against the final order. One failed rule rules out that option.'
    ],
    exampleTitle:'Fixed slot, linked pair and gap',
    prompt:'Arrange K, M, P, R and T. T is last. P immediately follows M. K comes before R, and R comes before P. Exactly one task lies between K and M.',
    solution:'K → R → M → P → T. Since K and R must precede P and M must be directly before P, P is fourth and M is third. K and R fill slots 1 and 2. R sits between K and M, satisfying the gap rule.',
    models:[
      {
        title:'Place a chain backward from the last slot',
        prompt:'F, G, H and J take slots 1–4. G immediately follows F. J immediately follows G. H is before F. Give the order.',
        steps:['F, G and J occupy a contiguous block in that order.','H must fit before the block, so the block occupies 2–4.'],
        answer:'H → F → G → J.'
      },
      {
        title:'Check what is forced when two orders fit',
        prompt:'A, B, C and D take slots 1–4. C is last, B follows A somewhere later, and D is in slot 1 or 2. Must B be third?',
        steps:['D is in one of the first two slots and C is fourth, so A and B fill two of slots 1–3 including slot 3.','Since B comes after A, B takes the later slot, which is 3 in both cases.'],
        answer:'Yes. B is third whether D is first or second.'
      }
    ],
    mistake:'Reading “immediately follows” as simply “comes later”, or counting the two endpoints as the items between them.',
    practice:'In the timed set, cross out options that violate a fixed position or immediate adjacency first.'
  },
  personality:{
    skill:'Becoming familiar with self-report prompts and their response options.',
    details:[
      'Personality familiarisation helps you become comfortable with how a prompt is presented and how responses are selected. A question may ask for an agreement rating or ask you to choose between stated preferences. Read the scale each time and check whether the prompt is asking about your usual behaviour, a preference, or your reaction in a stated situation.',
      'Use a typical example from your own experience when a statement feels broad. Notice qualifiers such as “usually”, “under pressure”, and “when learning something new”. Consider the wording independently instead of choosing what you imagine a recruiter would favour. GateLabs records completion for these self-report items.'
    ],
    rules:[
      'Identify what the scale measures: agreement, frequency or preference. The same position on two different scales can have a different meaning.',
      'Read qualifiers such as “usually” and “when instructions are unclear”. Base your response on comparable situations.',
      'Use the response choices given for that prompt. GateLabs practice shows completion for self-report questions.'
    ],
    method:[
      'Read the full prompt and the response scale before choosing.',
      'Think about your usual preference or behaviour in comparable situations.',
      'Follow the instructions on the day. GateLabs records completion for this practice type.'
    ],
    exampleTitle:'Choose between two preferences',
    prompt:'When learning a new task, do you usually prefer written instructions or a live demonstration?',
    solution:'Choose the option that best reflects your experience, or the middle option if both suit you equally and that response is offered.',
    models:[
      {
        title:'Agreement scale',
        prompt:'“I usually ask for clarification when instructions are ambiguous.” Select the level of agreement that best describes your usual behaviour.',
        steps:['Identify the condition, ambiguous instructions, and the qualifier, usually.','Think of several comparable situations. Match your typical behaviour to the scale provided.']
      },
      {
        title:'Frequency scale',
        prompt:'“When a plan changes, how often do you review the new sequence before continuing?”',
        steps:['The prompt asks for frequency under a specific condition. Think about episodes when a plan actually changed.','Choose the offered frequency closest to what you typically do.']
      }
    ],
    mistake:'Searching for an answer key for these familiarisation items. They ask about your own preferences.',
    practice:'Use a Personality set to get used to reading and responding to the prompts.'
  }
};
