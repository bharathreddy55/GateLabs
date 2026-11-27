export const CBAT_NOTES = {
  intelligence:{
    skill:'Figure comparison, rotation, and spotting the odd shape.',
    methodUse:{
      type:'Figure Comparison / Rotation and Reflection',
      when:'when several grid figures look alike and you must find the one that cannot match by turning or sliding',
      rule:'Line up one distinctive feature and compare the remaining cells after each permitted turn. A turn preserves which cells share an edge.'
    },
    basics:[
      ["Cell and edge","A filled cell is one square. Edge-neighbours share a side. A diagonal touch leaves those cells disconnected in an edge comparison."],
      ["Translation","A slide adds the same row and column offsets to every cell. Relative offsets stay unchanged."],
      ["Rotation","A turn preserves cell count, edge connections and the shape’s handedness. A 90° turn swaps the horizontal and vertical axes."],
      ["Reflection","A mirror reverses handedness. Compare the direction of an off-centre branch after lining up a distinctive arm."]
    ],
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
    examplePicture:"Picture cutting Shape A out of paper. You can slide it around and turn it on the table. Keep the same side facing up. Which other shape would make you flip the paper over?",
    exampleTitle:'Rotation versus mirror image',
    prompt:'Which figure cannot be made by rotating Figure A?',
    figures:[[0,4,8,9],[3,2,1,5],[1,5,8,9]],
    exampleSteps:[
      ["Anchor the long arm", "In Figure A, three shaded cells run down the left. Its fourth cell extends right from the bottom cell. Use that elbow and the direction of its short arm to identify the shape.", "A: A1, B1, C1, C2"],
      ["Rotate A by one quarter-turn", "After a clockwise turn, the long arm runs along the top and the short arm points down from its left end. Slide it to the right and all four cells match Figure B.", "Clockwise turn plus slide: A2, A3, A4, B2"],
      ["Check the apparent mirror", "Figure C has its long arm on the right and its short arm extends left at the bottom. Keeping the long arm vertical after a rotation either keeps A’s original elbow or moves it to the top. Neither result matches C.", "C: A2, B2, C1, C2"]
    ],
    solution:"Figure C.",
    models:[
      {
        picture:"Cut the first pattern out of paper and slide it down and right. If each corner lands on the second pattern, the shapes are a match.",
        title:'Same shape at a different grid position',
        prompt:'Figure X shades A1, A2 and B2. Figure Y shades B2, B3 and C3. Compare them with rows A to D and columns 1 to 4.',
        steps:[
          ["Find an anchor in each drawing", "Use A1 in X and B2 in Y. These are the leftmost cells in the top occupied row of each figure.", "anchors: X = A1, Y = B2"],
          ["Compare relative moves", "From A1, a step right reaches A2 and then a step down reaches B2. From B2 in Y, the same moves reach B3 and C3.", "shared offsets: (0,0), (0,+1), (+1,+1)"],
          ["Check the translation", "Moving every cell in X down one row and right one column maps A1 to B2, A2 to B3 and B2 to C3. A single move of the whole shape makes the match.", "A1→B2, A2→B3, B2→C3"]
        ],
        answer:'They match by translation.'
      },
      {
        picture:"Think of each filled square as a house, with a door on every side it shares with another filled square. Turning the picture keeps those doors attached.",
        title:'Eliminate a shape by its junction',
        prompt:'A figure shades B1, B2, B3 and C2. Could it rotate into one shading A1, B1, C1 and C2?',
        steps:[
          ["Inspect the central cell", "In the first figure, B2 shares edges with B1, B3 and C2. That gives B2 three edge-neighbours.", "B2 touches B1, B3 and C2"],
          ["Trace the second figure", "Its cells form the chain A1–B1–C1–C2. Each end has one edge-neighbour and each interior cell has two.", "A1–B1–C1–C2"],
          ["Use a property rotation preserves", "Turning a shape preserves which edges touch. The second figure has nowhere for the first figure’s three-way junction to land.", "greatest edge-neighbour counts: 3 vs 2"]
        ],
        answer:'No. The first has a three-way junction and the second has none.'
      }
    ],
    review:[
      ["Same shape in a different place","Align a corresponding cell. Compare all offsets."],
      ["Different counts or junctions","A rotation cannot make the figures match."],
      ["Long and short arms","Align the long arm, then compare the side and end of the short arm."],
      ["Ambiguous mental turn","Try all four quarter-turn orientations on the scratch grid."]
    ],
    drill:"Practise one turn direction at a time. Record whether each missed figure was a wrong anchor, wrong turn or missed mirror. Then repeat those items with the timer.",
    mistake:'Comparing only the number of shaded cells. All three examples have four, so compare how the cells are joined.',
    practice:'Work through the sample without a timer before starting an Intelligence set. For missed items, identify the feature that changed before retrying.'
  },
  attention:{
    skill:'Filtering distractors and adding only the digits the prompt specifies.',
    methodUse:{
      type:'Selective Attention / Digit Filtering',
      when:'when a long row contains both target digits and distractors and the instructions ask you to add or count only the targets',
      rule:'Count one for each qualifying position if asked how many. Add each qualifying digit’s value if asked for the sum.'
    },
    basics:[
      ["Target and distractor","The instruction defines the qualifying entries. In an odd-digit row, 7 is a target and 8 is a distractor. A new instruction can reverse which digits apply."],
      ["Count and sum","A count adds one per match. A sum adds each match’s printed value. The same row can give different results."],
      ["Zero and repeats","Zero is even. It counts as one even match and adds zero to the sum. A repeated target counts at every position where it occurs."],
      ["Chunk","A chunk is a short consecutive part of a row. Use non-overlapping chunks to control where you resume scanning."]
    ],
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
    examplePicture:"Pretend every odd digit is a number card you collect. Add the value written on a card every time you pick it up. Skip the even cards.",
    exampleTitle:'Filter and sum the target digits',
    prompt:'Add only the odd digits in 8 7 2 3 6 9 4 5 2 1.',
    exampleSteps:[
      ["Filter the digits", "The prompt asks for odd digits only. Reading left to right leaves 7, 3, 9, 5 and 1. The other five digits are even.", "matches: 7, 3, 9, 5, 1"],
      ["Group convenient pairs", "The pairs 7+3 and 9+1 each make 10. The digit 5 remains outside the pairs.", "7 + 3 = 10 and 9 + 1 = 10"],
      ["Add the values and check coverage", "The sum is 10+10+5=25. Each of the five matches appears in the calculation once.", "10 + 10 + 5 = 25"]
    ],
    solution:"25.",
    models:[
      {
        picture:"Fold the long row into three short rows in your mind. Work through one row at a time. A second 7 gives you seven more, even if you just added another 7.",
        title:'Repeated targets across chunks',
        prompt:'Add the odd digits in 7 8 7 6 7 4 1 8 9 2 9 6.',
        steps:[
          ["Make three groups of four digits", "Group the line as (7 8 7 6), (7 4 1 8), and (9 2 9 6). Boundaries give you a place to resume scanning.", "(7 8 7 6) · (7 4 1 8) · (9 2 9 6)"],
          ["Compute each subtotal", "The first group contributes 7+7=14, the second contributes 7+1=8, and the third contributes 9+9=18. Every repeated odd digit has its own contribution.", "7 + 7 = 14, 7 + 1 = 8, 9 + 9 = 18"],
          ["Combine the subtotals", "Add 14+8=22, then add 18 to reach 40. A quick check counts six included positions across the three groups.", "14 + 8 + 18 = 40"]
        ],
        answer:'14+8+18=40.'
      },
      {
        picture:"Imagine a zero card in your even pile. It is one card when you count the pile, and it adds nothing when you add the numbers on the cards.",
        title:'Practise switching from sum to count',
        prompt:'In 0 5 2 0 7 4 8 1, give both the count and sum of even digits.',
        steps:[
          ["Identify every even entry", "Keep 0, 2, 0, 4 and 8. Both zeroes qualify because zero is divisible by 2.", "even entries: 0, 2, 0, 4, 8"],
          ["Count the matches", "Each qualifying position contributes one, so the five entries give a count of five.", "1 + 1 + 1 + 1 + 1 = 5 matches"],
          ["Add their values separately", "Compute 0+2+0+4+8=14. Both zeroes add to the count and contribute zero to the sum.", "0 + 2 + 0 + 4 + 8 = 14"]
        ],
        answer:'Five matches, sum 14.'
      }
    ],
    review:[
      ["Odd targets","1, 3, 5, 7, 9."],
      ["Even targets","0, 2, 4, 6, 8."],
      ["Sum the targets","Add their values, then combine subtotals."],
      ["Count the targets","Add one per occurrence, including any qualifying zero."]
    ],
    drill:"Start with four-digit chunks. Check one full row untimed, then practise under the battery timer. Record whether each mistake came from scanning, inclusion or addition.",
    mistake:'Counting five matching digits instead of finding their sum, or skipping over the final odd digit.',
    practice:'Run the Selective Attention set and compare accuracy with how many items you reach before the timer ends.'
  },
  spatial:{
    skill:'Following connected routes, respecting barriers, and finding the marked building on the shortest route.',
    methodUse:{
      type:'Spatial Scanning / Shortest Routes',
      when:'when a street map gives more than one way to reach the finish and you must identify a numbered building on the shortest valid route',
      rule:'Compare complete open routes from start to finish. Count the segments if they are equal in length or add the labelled distances if they differ.'
    },
    basics:[
      ["Junction and segment","A junction is a point you can visit. A segment is an open connection between two consecutive points on the route."],
      ["Obstacle","A closure removes an edge from the usable network. A visually close junction is reachable only if the map actually links it."],
      ["Route length","Sum the distances along the route. When every segment has equal length, counting segments is enough."],
      ["Requested landmark","A numbered building is part of the answer only if the selected route passes its marked position. Re-read the question before reporting a distance or house."]
    ],
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
    examplePicture:"Imagine walking to B on a map where all street blocks are the same length. Count the blocks on each route. Then reread the house number on the shorter walk.",
    exampleTitle:'Shortest equal-length route and its house',
    prompt:'Every segment is equally long. Which numbered house lies on the shortest route from A to B?',
    map:{size:4,start:0,end:11,edges:[[0,1],[1,2],[2,6],[6,7],[7,11],[0,4],[4,8],[8,9],[9,10],[10,14],[14,15],[15,11]],houseCells:[9,6]},
    exampleSteps:[
      ["Identify the two paths", "At A, the map allows one route to start to the right and one to start downward. Keep tracing actual road segments until each route reaches B.", "starts from A: right or down"],
      ["Count from A to B on both paths", "The upper route is right, right, down, right, down, for five segments. The lower route is down, down, right, right, down, right, up, for seven segments.", "lengths: upper = 5 segments, lower = 7 segments"],
      ["Compare and locate the house", "All segments are equally long, so the upper route is shorter by two segments. Trace it again to find House 2 along the route.", "7 − 5 = 2 segments saved"]
    ],
    solution:"House 2.",
    models:[
      {
        picture:"Picture an open road to C with a fence across the next street. Reaching C does not finish the walk, so look for a road that takes you all the way to B.",
        title:'Eliminate a branch blocked by a gap',
        prompt:'A, C and B appear along the top of a map, but C–B is closed. The open roads are A–C, A–D, D–E and E–B. House 3 is at C and House 5 is at E. Which house is on the shortest open route?',
        steps:[
          ["Check whether the upper branch reaches B", "A–C is open, but the next link C–B is closed. The path through C cannot reach B without backtracking to A.", "A–C open, C–B closed"],
          ["Trace the connected alternative", "A–D, D–E and E–B are all open. Together they give a complete three-segment route to B.", "A → D → E → B: 3 segments"],
          ["Read the house from that route", "The route includes E, which has House 5. House 3 is on the branch that ends at C.", "E is House 5"]
        ],
        answer:'House 5.'
      },
      {
        picture:"Think of two walks. One has fewer streets, but its streets can be longer. Write the distance beside each street and use the total to pick the shorter walk.",
        title:'Variation with unequal lengths',
        prompt:'Two open routes are A–P–B with lengths 4 and 7, and A–Q–R–B with lengths 3, 3 and 4. Which is shorter by distance?',
        steps:[
          ["Read the quantity being compared", "The prompt asks for total distance. With unequal lengths, count the length of each segment along a route.", "distance = sum of edge lengths"],
          ["Add the lengths on both routes", "A–P–B covers 4+7=11 distance units. A–Q–R–B covers 3+3+4=10 distance units.", "A–P–B: 4 + 7 = 11 • A–Q–R–B: 3 + 3 + 4 = 10"],
          ["Choose the lower total", "10 is one unit less than 11, so A–Q–R–B is shorter even though it uses three segments.", "11 − 10 = 1 unit"]
        ],
        answer:'A–Q–R–B, total length 10.'
      }
    ],
    review:[
      ["Equal segments","Compare the number of segments from A to B."],
      ["Labelled lengths","Sum distances on each complete open route."],
      ["Blocked edge","Reject any route that uses it. Check other live branches."],
      ["House requested","Retrace the winning path and read its house label."]
    ],
    drill:"Mark each current branch with its accumulated length. At a dead end, return to the last fork on your scratch trace. Once you choose a route, run it from A again before reading the answer.",
    mistake:'Going towards the destination in a straight line where the map shows a gap, or reporting the length when the question asks for a house number.',
    practice:'Practise tracing from both endpoints before choosing. Compare the correct route with any shorter-looking path that was blocked.'
  },
  ordering:{
    skill:'Applying a set of instructions about sequence, fixed positions, and adjacency.',
    methodUse:{
      type:'Information Ordering / Sequence Constraints',
      when:'when several possible orders are offered and clues specify fixed positions, immediate neighbours or gaps between tasks',
      rule:'Treat immediate neighbours as an ordered block. Every rule must hold in the final sequence.'
    },
    basics:[
      ["Position","Write one numbered slot per instruction or item. “Last” anchors an item at the highest slot number."],
      ["Precedence","“X before Y” means X has a smaller slot number. There may be any number of items between them."],
      ["Adjacency","“Y immediately follows X” fixes their order and makes them a block. Both items must fit in neighbouring slots."],
      ["Forced position","All valid layouts agree on that position. Other positions can remain open even when one requested position is certain."]
    ],
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
    examplePicture:"Draw five empty boxes. Put T in the last one. Keep M and P touching like two taped cards. Use the other clues to slide that pair to the only place that fits.",
    exampleTitle:'Fixed slot, linked pair and gap',
    prompt:'Arrange K, M, P, R and T. T is last. P immediately follows M. K comes before R, and R comes before P. Exactly one task lies between K and M.',
    exampleSteps:[
      ["Place T and form a block", "Put T in slot 5. Since P immediately follows M, reserve adjacent slots for the pair M–P, in that order.", "slot(T) = 5, slot(P) = slot(M) + 1"],
      ["Fit the predecessors before P", "K, R and M all come before P. With T already last, P must occupy slot 4 and M must be in slot 3.", "K, R, M before P ⇒ slot(P) = 4 and slot(M) = 3"],
      ["Fill and verify the remaining positions", "K precedes R, so assign K to slot 1 and R to slot 2. R is the only task between K and M, satisfying the final rule.", "K → R → M → P → T"]
    ],
    solution:"K → R → M → P → T.",
    models:[
      {
        picture:"Tape F, G and J together in that order. There have to be three boxes next to each other for the group, with room for H before all of them.",
        title:'Place a chain backward from the last slot',
        prompt:'F, G, H and J take slots 1–4. G immediately follows F. J immediately follows G. H is before F. Give the order.',
        steps:[
          ["Link the immediate neighbours", "G follows F immediately, and J follows G immediately. The three make the fixed block F–G–J.", "block: F–G–J"],
          ["Find a place for H before the block", "If the block started in slot 1, H could only go after it. Starting it in slot 2 leaves slot 1 for H. Those are the only two starts for a three-item block in four slots.", "possible starts: 1 or 2. H before F ⇒ start 2."],
          ["Verify the order", "H–F–G–J places H before F and keeps both pairs adjacent in the required direction.", "H → F → G → J"]
        ],
        answer:'H → F → G → J.'
      },
      {
        picture:"Put C at the finish. Try D in each place it is allowed. In each row, give A the earlier of the two spaces that are left.",
        title:'Check what is forced when two orders fit',
        prompt:'A, B, C and D take slots 1–4. C is last, B follows A somewhere later, and D is in slot 1 or 2. Must B be third?',
        steps:[
          ["Put C in the fixed last slot", "C takes slot 4. D can take slot 1 or slot 2, so slot 3 must go to A or B.", "slot(C) = 4, slot(D) = 1 or 2"],
          ["Compare both cases", "With D first, A and B occupy slots 2 and 3. With D second, they occupy slots 1 and 3.", "D in 1: D–A–B–C • D in 2: A–D–B–C"],
          ["Apply the order of A and B", "B follows A in both cases, so B takes the later open slot, which is slot 3. The position is forced even though the first two slots can vary.", "slot(B) = 3 in both cases"]
        ],
        answer:'Yes. B is third whether D is first or second.'
      }
    ],
    review:[
      ["X directly before Y","slot(Y) = slot(X) + 1."],
      ["X earlier than Y","slot(X) < slot(Y)."],
      ["k items between X and Y","Their slot difference in magnitude is k + 1."],
      ["Must occupy a slot","Check every remaining arrangement or rule out each alternative."]
    ],
    drill:"Practise placing fixed slots and linked blocks before reading weaker clues. In a timed set, cross out any option that breaks one of these conditions and check the remaining choices against the full instructions.",
    mistake:'Reading “immediately follows” as simply “comes later”, or counting the two endpoints as the items between them.',
    practice:'In the timed set, cross out options that violate a fixed position or immediate adjacency first.'
  },
  personality:{
    skill:'Becoming familiar with self-report prompts and their response options.',
    methodUse:{
      type:'Personality / Self-report Prompts',
      when:'when a prompt asks which response best describes your usual preferences or behaviour',
      rule:'Read the question and the response scale together, then choose the answer that reflects how you usually behave in that situation.'
    },
    basics:[
      ["Self-report item","A self-report prompt asks you to describe your own preference or behaviour from the options supplied."],
      ["Condition","A phrase such as “when a plan changes” limits which experiences are relevant. Read that part before thinking of examples."],
      ["Qualifier","Words like usually, often or rarely limit what a statement asserts. Use a typical pattern across comparable situations."],
      ["Response scale","Agreement asks how well a statement fits you. Frequency asks how often something happens. Preference asks which option suits you better."]
    ],
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
    examplePicture:"Remember learning a game or a new class activity. Did you like reading the rules first or seeing someone show you? Use an experience like that to choose.",
    exampleTitle:'Choose between two preferences',
    prompt:'When learning a new task, do you usually prefer written instructions or a live demonstration?',
    exampleSteps:[
      ["Identify what the item asks you to compare", "The prompt asks which format you usually prefer when learning something unfamiliar. Focus on that situation while considering the choices."],
      ["Recall comparable tasks", "Think of two or three new tasks you have learned. Consider which format you reached for first and which you would choose again in a similar situation."],
      ["Map your preference to the offered choices", "Select written instructions or a live demonstration according to your experience. If the formats suit you equally, use a middle choice if the prompt offers one."]
    ],
    solution:"This practice prompt records your own preference.",
    models:[
      {
        picture:"Imagine being given an instruction you did not understand. Think about what you did on a few occasions like that. Pick how well the statement describes you.",
        title:'Agreement scale',
        prompt:'“I usually ask for clarification when instructions are ambiguous.” Select the level of agreement that best describes your usual behaviour.',
        steps:[
          ["Identify the situation described", "Ambiguous instructions are the condition. The statement asks whether you usually seek clarification in that situation."],
          ["Recall your usual behaviour", "Think of several cases when a task was unclear. Consider whether you tended to ask about it, look it up independently or proceed with your interpretation."],
          ["Use the agreement scale", "Choose the offered level that best describes how closely the full statement matches your typical behaviour."]
        ]
      },
      {
        picture:"Remember a time when an activity changed after you had already made a plan. Think about whether you stopped to read the new order before starting again.",
        title:'Frequency scale',
        prompt:'“When a plan changes, how often do you review the new sequence before continuing?”',
        steps:[
          ["Identify the action and the condition", "The action is reviewing the new sequence before continuing. The condition is that a plan has changed."],
          ["Recall occasions that meet the condition", "Think through a few plan changes. In each case, ask whether you actually reviewed the updated sequence before taking your next action."],
          ["Choose the matching frequency", "Use the scale shown in the item to select the frequency closest to those occasions. Check the order of the response options before confirming."]
        ]
      }
    ],
    review:[
      ["Agreement scale","Match how closely the full statement describes you."],
      ["Frequency scale","Choose how often the specified behaviour happens under its condition."],
      ["Two preferences","Compare the choices in the situation described."],
      ["Neutral choice","Use it when it genuinely matches and the item offers one."]
    ],
    drill:"During familiarisation, read the scale in full before each answer. Notice whether you changed a response because you misread the wording or because you remembered a better comparable experience.",
    mistake:'Searching for an answer key for these familiarisation items. They ask about your own preferences.',
    practice:'Use a Personality set to get used to reading and responding to the prompts.'
  }
};
