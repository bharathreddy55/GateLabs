// Mock 1 Data: Level 1 - Foundation & Starter (Easy)
module.exports = {
  englishRC: [
    {
      q: "Read the following passage carefully and answer questions 1 to 8:\n\nFinancial inclusion in rural India has witnessed a remarkable transformation with the expansion of digital banking services. The introduction of the Unified Payments Interface (UPI) and Aadhaar-enabled Payment Systems (AePS) has empowered millions of unbanked citizens. Rural entrepreneurs and small farmers no longer need to travel miles to reach a brick-and-mortar bank branch. Instead, Micro-ATMs operated by local banking correspondents (Bank Mitras) bring banking right to their doorsteps. This has expedited government subsidy transfers and minimized leakages in Direct Benefit Transfer (DBT) schemes. However, digital literacy and network connectivity in remote tribal pockets remain formidable challenges that need continuous attention.\n\nAccording to the passage, what has significantly minimized leakages in government subsidy transfers?",
      opts: ["Establishment of more commercial physical branches", "Direct Benefit Transfer supported by digital banking", "Distribution of cash subsidies directly by local leaders", "Elimination of Bank Mitras in rural villages", "None of the above"],
      ans: "B",
      exp: "The passage explicitly states that digital banking and AePS have expedited transfers and minimized leakages in Direct Benefit Transfer (DBT) schemes."
    },
    {
      q: "Who operates Micro-ATMs to provide banking services at the doorsteps of rural citizens?",
      opts: ["Commercial bank branch managers", "Local banking correspondents (Bank Mitras)", "Postmasters of urban post offices", "Tribal community heads", "Foreign institutional investors"],
      ans: "B",
      exp: "The passage mentions: 'Micro-ATMs operated by local banking correspondents (Bank Mitras) bring banking right to their doorsteps.'"
    },
    {
      q: "Which two technologies are highlighted as drivers of rural financial transformation?",
      opts: ["SWIFT and RTGS", "UPI and AePS", "Credit cards and Cheques", "Blockchain and Cryptocurrency", "None of these"],
      ans: "B",
      exp: "The passage highlights the Unified Payments Interface (UPI) and Aadhaar-enabled Payment Systems (AePS)."
    },
    {
      q: "What remains a significant hurdle in remote tribal pockets according to the text?",
      opts: ["Excessive number of bank branches", "Lack of government interest in agriculture", "Digital literacy and network connectivity", "High interest rates on UPI transactions", "Over-reliance on foreign remittances"],
      ans: "C",
      exp: "The passage states that digital literacy and network connectivity in remote tribal pockets remain formidable challenges."
    },
    {
      q: "Choose the word most SIMILAR in meaning to 'EXPEDITED' as used in the passage.",
      opts: ["Delayed", "Accelerated", "Hindered", "Postponed", "Ignored"],
      ans: "B",
      exp: "'Expedite' means to make an action or process happen sooner or be accomplished more quickly; hence 'Accelerated' is the closest synonym."
    },
    {
      q: "Choose the word most OPPOSITE in meaning to 'TRANSFORMATION' as used in the passage.",
      opts: ["Stagnation", "Evolution", "Metamorphosis", "Modification", "Innovation"],
      ans: "A",
      exp: "'Transformation' indicates dramatic change or progress. The opposite is 'Stagnation' (lack of activity, growth, or development)."
    },
    {
      q: "What is the primary theme of the passage?",
      opts: ["The decline of traditional banking in metropolitan cities", "The role of digital banking in rural financial inclusion", "Technological failures in agricultural credit", "International trade and currency valuation", "The disadvantages of mobile payments"],
      ans: "B",
      exp: "The passage primarily discusses how digital systems like UPI, AePS, and Bank Mitras have brought financial inclusion to rural India."
    },
    {
      q: "Which of the following is TRUE based on the passage?",
      opts: ["Farmers still must travel long miles for every minor transaction", "Bank Mitras charge high penalties on DBT transfers", "Rural citizens are benefiting from doorstep Micro-ATM services", "UPI has completely eliminated physical money in India", "Tribal areas have perfect network connectivity"],
      ans: "C",
      exp: "Doorstep Micro-ATM services operated by Bank Mitras are explicitly mentioned as benefiting rural citizens."
    }
  ],

  clozeTest: [
    {
      q: "In the following passage, there are blanks. For Blank (1), choose the appropriate word:\n\nPlanting trees is one of the most effective ways to ____(1)____ climate change. Forests act as natural carbon sinks, absorbing carbon dioxide from the atmosphere and ____(2)____ oxygen. Moreover, trees prevent soil erosion and provide natural ____(3)____ for diverse wildlife species. Community-led afforestation programs help ____(4)____ environmental awareness among students. Everyone should ____(5)____ in local green drives to ensure a sustainable future for the next ____(6)____.\n\nSelect the best word for Blank (1):",
      opts: ["combat", "promote", "aggravate", "ignore", "accelerate"],
      ans: "A",
      exp: "Tree planting is done to 'combat' (fight/mitigate) climate change."
    },
    {
      q: "Select the best word for Blank (2):",
      opts: ["consuming", "destroying", "releasing", "polluting", "hiding"],
      ans: "C",
      exp: "Trees absorb carbon dioxide and 'releasing' (release) oxygen."
    },
    {
      q: "Select the best word for Blank (3):",
      opts: ["barriers", "habitats", "traps", "hazards", "poisons"],
      ans: "B",
      exp: "Trees provide natural 'habitats' (living environments) for wildlife."
    },
    {
      q: "Select the best word for Blank (4):",
      opts: ["curtail", "diminish", "foster", "suppress", "neglect"],
      ans: "C",
      exp: "'Foster' means to encourage or promote the development of environmental awareness."
    },
    {
      q: "Select the best word for Blank (5):",
      opts: ["participate", "hesitate", "withdraw", "refuse", "procrastinate"],
      ans: "A",
      exp: "People should 'participate' in green drives."
    },
    {
      q: "Select the best word for Blank (6):",
      opts: ["generations", "seasons", "centuries", "decades", "moments"],
      ans: "A",
      exp: "The common idiom and context is 'future generations'."
    }
  ],

  errorDetection: [
    {
      q: "Read the sentence to find out whether there is any grammatical error in it. The error, if any, will be in one part of the sentence.\n\n(A) Neither the manager / (B) nor the employees was / (C) present at the annual / (D) general meeting yesterday. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "B",
      exp: "In 'Neither... nor' constructions, the verb agrees with the closer subject ('employees', which is plural). Therefore, 'was' should be replaced with 'were'."
    },
    {
      q: "(A) She is one of the / (B) most hardworking student / (C) in our entire / (D) coaching institute. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "B",
      exp: "The phrase 'one of the' is always followed by a plural noun ('students'). Hence, 'student' should be 'students'."
    },
    {
      q: "(A) Although he worked / (B) very hard for the exam, / (C) but he could not / (D) secure the top rank. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "C",
      exp: "'Although' is not paired with 'but'. It should be paired with a comma or 'yet'. Remove 'but'."
    },
    {
      q: "(A) The news regarding / (B) the bank merger / (C) are spreading rapidly / (D) across the country. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "C",
      exp: "'News' is an uncountable singular noun and takes a singular verb. 'are spreading' should be 'is spreading'."
    },
    {
      q: "(A) The teacher asked / (B) the students to / (C) discuss about the / (D) historical event in pairs. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "C",
      exp: "The verb 'discuss' is transitive and takes a direct object without the preposition 'about'. Remove 'about'."
    }
  ],

  sentenceImprovement: [
    {
      q: "Improve the underlined part of the sentence:\n\nHe *has arrived* in Mumbai yesterday morning to attend the conference.",
      opts: ["arrived", "had arrived", "was arrived", "is arriving", "No correction required"],
      ans: "A",
      exp: "With specific past time expressions like 'yesterday morning', the Simple Past tense ('arrived') must be used."
    },
    {
      q: "Improve the underlined part:\n\nIf I *was the Prime Minister*, I would prioritize education and healthcare.",
      opts: ["am the Prime Minister", "were the Prime Minister", "have been the Prime Minister", "will be the Prime Minister", "No correction required"],
      ans: "B",
      exp: "In hypothetical/subjunctive conditional clauses (second conditional), 'were' is used with all subjects."
    },
    {
      q: "Improve the underlined part:\n\nThe train *departed before we reached* the platform.",
      opts: ["had departed before we reached", "has departed before we reached", "departs before we will reach", "was departing before we had reached", "No correction required"],
      ans: "A",
      exp: "When two past actions occur, the earlier past action takes Past Perfect ('had departed') and the subsequent action takes Simple Past ('reached')."
    },
    {
      q: "Improve the underlined part:\n\nHardly had the bell rung *when the students rushed* out of their classrooms.",
      opts: ["than the students rushed", "then the students rushed", "when the students rush", "when the students rushed", "No correction required"],
      ans: "E",
      exp: "'Hardly... when' is the correct correlative conjunction pairing. The sentence is already correct."
    }
  ],

  paraJumbles: [
    {
      q: "Rearrange the following sentences (A, B, C, D) to form a coherent paragraph:\n\n(A) This remarkable growth is driven by increasing internet penetration.\n(B) India's digital economy has expanded rapidly over the past decade.\n(C) Furthermore, government policies have encouraged homegrown tech startups.\n(D) As a result, millions of citizens now access services at their fingertips.\n\nWhat is the correct logical sequence?",
      opts: ["B - A - C - D", "A - B - C - D", "B - C - D - A", "D - B - A - C", "C - B - A - D"],
      ans: "A",
      exp: "(B) introduces the topic (digital economy growth), (A) explains the primary driver (internet penetration), (C) adds another factor (government policy), and (D) concludes with the positive outcome."
    },
    {
      q: "Which of the following should be the FIRST sentence after rearrangement?",
      opts: ["A", "B", "C", "D", "None"],
      ans: "B",
      exp: "Sentence (B) provides the introductory foundation for the topic."
    },
    {
      q: "Which of the following should be the THIRD sentence after rearrangement?",
      opts: ["A", "B", "C", "D", "None"],
      ans: "C",
      exp: "In sequence B-A-C-D, the third sentence is (C)."
    },
    {
      q: "Which of the following should be the LAST (FOURTH) sentence after rearrangement?",
      opts: ["A", "B", "C", "D", "None"],
      ans: "D",
      exp: "Sentence (D) serves as the concluding result."
    }
  ],

  miscEnglish: [
    {
      q: "In the sentence given below, four words are highlighted in bold (A, B, C, D). Choose the pair of words that should be SWAPPED to make the sentence grammatically correct and contextually meaningful:\n\nThe committee decided to **postpone (A)** the meeting because the **attendance (B)** was too **low (C)** to achieve a valid **quorum (D)**.",
      opts: ["A-B", "B-C", "C-D", "A-D", "No swap required"],
      ans: "E",
      exp: "All four words are in their correct logical and grammatical positions. No swap is needed."
    },
    {
      q: "Select the INCORRECTLY spelt word from the options below:",
      opts: ["Accommodate", "Embarrassment", "Occurrence", "Priviledge", "Conscientious"],
      ans: "D",
      exp: "The correct spelling is 'Privilege' (without a 'd')."
    },
    {
      q: "Fill in the blank with the most appropriate word:\n\nThe Reserve Bank of India keeps a close ________ on inflation to ensure macroeconomic stability.",
      opts: ["watch", "view", "sound", "touch", "sight"],
      ans: "A",
      exp: "The standard English idiom is 'to keep a close watch on' (to monitor vigilantly)."
    }
  ],

  simplification: [
    {
      q: "What will come in place of the question mark (?) in the given expression?\n\n144 ÷ 12 + 18 × 5 - 35 = ?",
      opts: ["67", "65", "69", "71", "63"],
      ans: "A",
      exp: "BODMAS: 144 ÷ 12 = 12. 18 × 5 = 90. 12 + 90 - 35 = 102 - 35 = 67."
    },
    {
      q: "What is the value of: 25% of 480 + 40% of 350 = ?",
      opts: ["260", "250", "270", "280", "240"],
      ans: "A",
      exp: "25% of 480 = 120. 40% of 350 = 140. 120 + 140 = 260."
    },
    {
      q: "Solve: √(625) + √(441) - √(196) = ?",
      opts: ["32", "30", "34", "36", "28"],
      ans: "A",
      exp: "√625 = 25, √441 = 21, √196 = 14. 25 + 21 - 14 = 46 - 14 = 32."
    },
    {
      q: "Find the value of: (35 × 12) ÷ 14 + 45 = ?",
      opts: ["75", "70", "80", "65", "85"],
      ans: "A",
      exp: "35 × 12 = 420. 420 ÷ 14 = 30. 30 + 45 = 75."
    },
    {
      q: "What is the value of: 3/5 of 450 + 2/3 of 360 = ?",
      opts: ["510", "490", "520", "500", "480"],
      ans: "A",
      exp: "(3/5 × 450) = 270. (2/3 × 360) = 240. 270 + 240 = 510."
    },
    {
      q: "Solve: 850 - 45% of 600 + 120 = ?",
      opts: ["700", "680", "720", "710", "690"],
      ans: "A",
      exp: "45% of 600 = 270. 850 - 270 + 120 = 580 + 120 = 700."
    },
    {
      q: "Find ?: 15^2 - 12^2 + 8^2 = ?",
      opts: ["145", "140", "150", "135", "155"],
      ans: "A",
      exp: "225 - 144 + 64 = 81 + 64 = 145."
    },
    {
      q: "Solve: 480 ÷ 8 + 650 ÷ 13 - 15 = ?",
      opts: ["95", "90", "100", "85", "105"],
      ans: "A",
      exp: "60 + 50 - 15 = 110 - 15 = 95."
    },
    {
      q: "Evaluate: (18 × 15) ÷ 9 + 4^3 = ?",
      opts: ["94", "90", "96", "88", "102"],
      ans: "A",
      exp: "18 × 15 = 270. 270 ÷ 9 = 30. 4^3 = 64. 30 + 64 = 94."
    },
    {
      q: "Solve: 75% of 400 - 30% of 250 = ?",
      opts: ["225", "220", "230", "215", "235"],
      ans: "A",
      exp: "75% of 400 = 300. 30% of 250 = 75. 300 - 75 = 225."
    }
  ],

  numberSeries: [
    {
      q: "Find the missing number in the series:\n\n4, 11, 25, 53, 109, ?",
      opts: ["221", "219", "225", "217", "223"],
      ans: "A",
      exp: "Pattern: × 2 + 3. 4×2+3=11, 11×2+3=25, 25×2+3=53, 53×2+3=109, 109×2+3=221."
    },
    {
      q: "Find the missing number in the series:\n\n12, 19, 33, 54, 82, ?",
      opts: ["117", "115", "119", "121", "113"],
      ans: "A",
      exp: "Differences: +7, +14, +21, +28, +35. Next = 82 + 35 = 117."
    },
    {
      q: "Find the missing number in the series:\n\n5, 15, 45, 135, 405, ?",
      opts: ["1215", "1205", "1225", "1235", "1195"],
      ans: "A",
      exp: "Pattern: Multiply by 3 each step. 405 × 3 = 1215."
    },
    {
      q: "Find the missing number in the series:\n\n2, 6, 12, 20, 30, ?",
      opts: ["42", "40", "44", "46", "38"],
      ans: "A",
      exp: "Pattern: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42."
    },
    {
      q: "Find the missing number in the series:\n\n100, 96, 87, 71, 46, ?",
      opts: ["10", "12", "15", "8", "14"],
      ans: "A",
      exp: "Differences: -4 (-2^2), -9 (-3^2), -16 (-4^2), -25 (-5^2), -36 (-6^2). 46 - 36 = 10."
    }
  ],

  quadratic: [
    {
      q: "In each of the following questions, two equations (I) and (II) are given. Solve both equations and establish the relationship between x and y.\n\nI. x^2 - 7x + 12 = 0\nII. y^2 - 9y + 20 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "B",
      exp: "Eq I: (x-3)(x-4) = 0 => x = 3, 4.\nEq II: (y-4)(y-5) = 0 => y = 4, 5.\nComparing: 3 < 4, 3 < 5; 4 = 4, 4 < 5. Thus, x ≤ y."
    },
    {
      q: "I. x^2 - 11x + 30 = 0\nII. y^2 - 15y + 56 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = 5, 6.\nEq II: y = 7, 8.\nBoth values of x (5, 6) are strictly less than both values of y (7, 8). Hence x < y."
    },
    {
      q: "I. x^2 + 8x + 15 = 0\nII. y^2 + 11y + 30 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "D",
      exp: "Eq I: x = -3, -5.\nEq II: y = -5, -6.\nComparing: -3 > -5, -3 > -6; -5 = -5, -5 > -6. Thus, x ≥ y."
    },
    {
      q: "I. x^2 = 64\nII. y^2 - 16y + 64 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "B",
      exp: "Eq I: x = +8, -8.\nEq II: y = 8.\nComparing: +8 = 8, -8 < 8. Thus, x ≤ y."
    },
    {
      q: "I. x^2 - 5x + 6 = 0\nII. y^2 - 7y + 12 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "B",
      exp: "Eq I: x = 2, 3.\nEq II: y = 3, 4.\nComparing: 2 < 3, 2 < 4; 3 = 3, 3 < 4. Hence x ≤ y."
    }
  ],

  dataInterpretation: [
    {
      q: "Directions (51-55): Study the following table carefully and answer the questions. The table shows the total number of students enrolled in 4 colleges (A, B, C, D) and the ratio of Male to Female students.\n\nCollege | Total Students | Male : Female Ratio\nA | 600 | 3 : 2\nB | 800 | 5 : 3\nC | 500 | 1 : 1\nD | 700 | 4 : 3\n\nWhat is the total number of male students in College A and College B together?",
      opts: ["860", "850", "870", "840", "880"],
      ans: "A",
      exp: "College A males = (3/5) × 600 = 360.\nCollege B males = (5/8) × 800 = 500.\nTotal = 360 + 500 = 860."
    },
    {
      q: "What is the number of female students in College D?",
      opts: ["300", "280", "320", "350", "290"],
      ans: "A",
      exp: "College D total = 700, Ratio = 4:3. Female students = (3/7) × 700 = 300."
    },
    {
      q: "What is the ratio of male students in College C to female students in College A?",
      opts: ["25 : 24", "24 : 25", "5 : 4", "4 : 5", "1 : 1"],
      ans: "A",
      exp: "College C males = (1/2) × 500 = 250.\nCollege A females = (2/5) × 600 = 240.\nRatio = 250 : 240 = 25 : 24."
    },
    {
      q: "The total number of students in College B is what percentage more than that in College C?",
      opts: ["60%", "50%", "55%", "65%", "45%"],
      ans: "A",
      exp: "Diff = 800 - 500 = 300. Percentage more = (300 / 500) × 100 = 60%."
    },
    {
      q: "What is the average number of students across all 4 colleges?",
      opts: ["650", "640", "660", "630", "670"],
      ans: "A",
      exp: "Total = 600 + 800 + 500 + 700 = 2600. Average = 2600 / 4 = 650."
    }
  ],

  arithmetic: [
    {
      q: "A sum of ₹12,000 is invested at 10% per annum Simple Interest for 3 years. Find the total interest earned.",
      opts: ["₹3,600", "₹3,400", "₹3,800", "₹3,200", "₹4,000"],
      ans: "A",
      exp: "SI = (P × R × T) / 100 = (12000 × 10 × 3) / 100 = ₹3,600."
    },
    {
      q: "A trader buys an article for ₹800 and marks it up by 25%. If he gives a discount of 10% on the marked price, what is his profit percentage?",
      opts: ["12.5%", "15%", "10%", "14%", "16%"],
      ans: "A",
      exp: "CP = ₹800. MP = 800 × 1.25 = ₹1000. SP = 1000 × 0.90 = ₹900. Profit = 900 - 800 = 100. Profit% = (100/800) × 100 = 12.5%."
    },
    {
      q: "The present ages of Amit and Suresh are in the ratio 4 : 5. Six years hence, their ages will be in the ratio 5 : 6. Find Amit's present age.",
      opts: ["24 years", "20 years", "28 years", "30 years", "22 years"],
      ans: "A",
      exp: "(4x + 6) / (5x + 6) = 5/6 => 24x + 36 = 25x + 30 => x = 6. Amit's present age = 4 × 6 = 24 years."
    },
    {
      q: "A can complete a piece of work in 12 days, and B can complete it in 18 days. If they work together, in how many days will the work be completed?",
      opts: ["7.2 days", "6.8 days", "7.5 days", "8 days", "6.5 days"],
      ans: "A",
      exp: "1-day work = 1/12 + 1/18 = (3 + 2)/36 = 5/36. Days = 36/5 = 7.2 days."
    },
    {
      q: "A train 180 meters long is running at a speed of 54 km/h. How much time will it take to cross a standing pole?",
      opts: ["12 seconds", "10 seconds", "14 seconds", "15 seconds", "11 seconds"],
      ans: "A",
      exp: "Speed = 54 × (5/18) = 15 m/s. Time = Distance / Speed = 180 / 15 = 12 seconds."
    },
    {
      q: "In a class of 60 students, 40% are girls. How many boys are there in the class?",
      opts: ["36", "34", "38", "32", "40"],
      ans: "A",
      exp: "Percentage of boys = 100% - 40% = 60%. Number of boys = 60% of 60 = 36."
    },
    {
      q: "P and Q started a business investing ₹15,000 and ₹25,000 respectively. At the end of the year, the total profit was ₹16,000. What is P's share in the profit?",
      opts: ["₹6,000", "₹5,500", "₹6,500", "₹7,000", "₹5,000"],
      ans: "A",
      exp: "Ratio of investment = 15000 : 25000 = 3 : 5. P's share = (3/8) × 16000 = ₹6,000."
    },
    {
      q: "A boat travels 36 km downstream in 3 hours and 24 km upstream in 3 hours. Find the speed of the boat in still water.",
      opts: ["10 km/h", "9 km/h", "11 km/h", "8 km/h", "12 km/h"],
      ans: "A",
      exp: "Downstream speed (D) = 36/3 = 12 km/h. Upstream speed (U) = 24/3 = 8 km/h. Speed in still water = (D + U)/2 = (12 + 8)/2 = 10 km/h."
    },
    {
      q: "The length and breadth of a rectangular field are 24 meters and 15 meters respectively. Find the perimeter of the field.",
      opts: ["78 meters", "75 meters", "80 meters", "72 meters", "84 meters"],
      ans: "A",
      exp: "Perimeter = 2 × (Length + Breadth) = 2 × (24 + 15) = 2 × 39 = 78 meters."
    },
    {
      q: "A bag contains 5 red balls, 4 green balls, and 3 blue balls. If one ball is drawn at random, what is the probability that it is green?",
      opts: ["1/3", "1/4", "1/2", "5/12", "1/6"],
      ans: "A",
      exp: "Total balls = 5 + 4 + 3 = 12. Green balls = 4. Probability = 4/12 = 1/3."
    }
  ],

  puzzleSet1: [
    {
      q: "Directions (66-70): Read the information given below and answer the questions.\n\nSeven persons — A, B, C, D, E, F, and G — are sitting in a single row facing North. D sits third to the right of A. Only one person sits between D and F. B sits to the immediate left of C. G is not an immediate neighbor of A. E sits at one of the extreme ends. D sits in the exact middle of the row.\n\nWho sits at the extreme left end of the row?",
      opts: ["E", "A", "G", "B", "C"],
      ans: "B",
      exp: "Since 7 persons are seated and D sits in the middle (pos 4), and D is 3rd to right of A, A must be at pos 1 (extreme left). Order from left to right is: A, B, C, D, F, G, E."
    },
    {
      q: "Who sits to the immediate right of D?",
      opts: ["F", "G", "C", "B", "E"],
      ans: "A",
      exp: "From the arrangement (A-B-C-D-F-G-E), F sits to the immediate right of D."
    },
    {
      q: "How many persons sit between A and E?",
      opts: ["5", "4", "3", "2", "6"],
      ans: "A",
      exp: "A is at position 1 and E is at position 7. The number of persons between them is 5 (B, C, D, F, G)."
    },
    {
      q: "What is the position of G with respect to D?",
      opts: ["Second to the right", "Immediate left", "Third to the right", "Second to the left", "Immediate right"],
      ans: "A",
      exp: "D is at pos 4 and G is at pos 6. Thus, G is second to the right of D."
    },
    {
      q: "Which pair of persons sit at the extreme ends of the row?",
      opts: ["A and E", "B and G", "C and E", "A and F", "D and E"],
      ans: "A",
      exp: "A is at the extreme left end (pos 1) and E is at the extreme right end (pos 7)."
    }
  ],

  puzzleSet2: [
    {
      q: "Directions (71-75): Six friends — P, Q, R, S, T, and U — are sitting around a circular table facing towards the centre.\n- P sits second to the left of T.\n- Q sits immediate right of P.\n- R sits second to the right of S.\n- U is an immediate neighbor of both T and S.\n\nWho sits opposite to P?",
      opts: ["T", "S", "R", "U", "Q"],
      ans: "B",
      exp: "Placing positions clockwise 1 to 6: Let T=1 => P=5 (2nd left). Q=6 (immediate right of P). U is between T & S => U=2, S=3. Then R=4 (2nd right of S). Opposite to P (pos 5) is S (pos 2/3 opposite in 6-circle => pos 5 opposite pos 2/pos 5+3=pos 2/8-6). Hence S sits opposite P."
    },
    {
      q: "Who sits to the immediate left of R?",
      opts: ["S", "Q", "P", "T", "U"],
      ans: "A",
      exp: "Moving clockwise around the circle, S is immediate left of R."
    },
    {
      q: "How many persons sit between Q and T when counted clockwise from Q?",
      opts: ["0 (They are adjacent)", "1", "2", "3", "4"],
      ans: "A",
      exp: "Q is at position 6 and T is at position 1. They are adjacent, so 0 persons sit between them."
    },
    {
      q: "What is the position of U with respect to P?",
      opts: ["Third to the right (opposite)", "Second to the left", "Immediate right", "Second to the right", "Third to the left"],
      ans: "A",
      exp: "U is at pos 2 and P is at pos 5 in a 6-person circle, making them exactly opposite (3 places away)."
    },
    {
      q: "Who sits second to the right of Q?",
      opts: ["U", "T", "S", "R", "P"],
      ans: "A",
      exp: "Clockwise from Q (pos 6): 1st right is T (pos 1), 2nd right is U (pos 2)."
    }
  ],

  puzzleSet3: [
    {
      q: "Directions (76-80): Seven boxes — J, K, L, M, N, O, and P — are kept one above another in a stack.\n- Box P is kept at the top (Position 7).\n- Box J is kept immediately above Box L.\n- Three boxes are kept between Box P and Box M.\n- Box N is kept immediately below Box M.\n- Box K is kept above Box O.\n\nWhich box is kept at the bottom (Position 1)?",
      opts: ["O", "N", "L", "M", "K"],
      ans: "A",
      exp: "P=7. 3 boxes between P and M => M=3. N immediately below M => N=2. J immediately above L => J=5, L=4. K above O => K=6, O=1 (bottom)."
    },
    {
      q: "Which box is kept immediately below Box P?",
      opts: ["K", "J", "L", "M", "N"],
      ans: "A",
      exp: "Box K is at position 6, immediately below Box P (pos 7)."
    },
    {
      q: "How many boxes are kept between Box J and Box N?",
      opts: ["2", "1", "3", "4", "0"],
      ans: "A",
      exp: "Box J is at position 5 and Box N is at position 2. Boxes between them are L (4) and M (3), total 2 boxes."
    },
    {
      q: "Which box is kept at position 4?",
      opts: ["L", "M", "J", "K", "O"],
      ans: "A",
      exp: "Box L is kept at position 4."
    },
    {
      q: "What is the position of Box M from the bottom?",
      opts: ["Third", "Second", "Fourth", "Fifth", "First"],
      ans: "A",
      exp: "Box M is at position 3 from the bottom."
    }
  ],

  syllogism: [
    {
      q: "Statements:\nSome pens are books.\nAll books are pencils.\n\nConclusions:\nI. Some pens are pencils.\nII. All pencils are books.",
      opts: ["Only conclusion I follows", "Only conclusion II follows", "Either I or II follows", "Neither I nor II follows", "Both I and II follow"],
      ans: "A",
      exp: "Pen overlaps with Book, and all Book is inside Pencil. Thus, Pen definitely overlaps with Pencil (Conclusion I follows). Conclusion II is not necessarily true."
    },
    {
      q: "Statements:\nAll mangoes are fruits.\nNo fruit is a vegetable.\n\nConclusions:\nI. No mango is a vegetable.\nII. Some fruits are mangoes.",
      opts: ["Both I and II follow", "Only conclusion I follows", "Only conclusion II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Since all mangoes are inside fruits and no fruit is vegetable, no mango can be vegetable (I follows). Since all mangoes are fruits, some fruits are definitely mangoes (II follows)."
    },
    {
      q: "Statements:\nSome cars are buses.\nSome buses are trucks.\n\nConclusions:\nI. Some cars are trucks.\nII. No car is a truck.",
      opts: ["Either I or II follows", "Only conclusion I follows", "Only conclusion II follows", "Neither I nor II follows", "Both follow"],
      ans: "A",
      exp: "Cars and trucks have no direct relation. 'Some' and 'No' form a complementary pair with same subjects. Hence, Either I or II follows."
    },
    {
      q: "Statements:\nAll chairs are tables.\nAll tables are desks.\n\nConclusions:\nI. All chairs are desks.\nII. Some desks are chairs.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Chairs ⊂ Tables ⊂ Desks. Therefore, all chairs are desks (I follows) and some desks are chairs (II follows)."
    },
    {
      q: "Statements:\nNo cat is a dog.\nAll dogs are animals.\n\nConclusions:\nI. Some animals are dogs.\nII. No cat is an animal.",
      opts: ["Only conclusion I follows", "Only conclusion II follows", "Both follow", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "All dogs are animals implies some animals are dogs (I follows). Cats cannot be dogs, but cats can still be animals; hence II does not follow."
    }
  ],

  inequalities: [
    {
      q: "Statements: A > B ≥ C = D > E\nConclusions:\nI. A > D\nII. C > E",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither I nor II is true", "Either I or II is true"],
      ans: "A",
      exp: "A > B ≥ C = D => A > D (I is true). C = D > E => C > E (II is true). Both are true."
    },
    {
      q: "Statements: P ≥ Q > R = S ≤ T\nConclusions:\nI. P > S\nII. R ≤ T",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "P ≥ Q > R = S => P > S (I is true). R = S ≤ T => R ≤ T (II is true)."
    },
    {
      q: "Statements: M < N ≤ O = P < Q\nConclusions:\nI. M < P\nII. N < Q",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "M < N ≤ O = P => M < P (I is true). N ≤ O = P < Q => N < Q (II is true)."
    },
    {
      q: "Statements: K ≥ L = M > N ≥ O\nConclusions:\nI. K > N\nII. L ≥ O",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "K ≥ L = M > N => K > N (I is true). L = M > N ≥ O => L > O, not necessarily L ≥ O with equality. Thus only I is true."
    },
    {
      q: "Statements: X > Y ≥ Z = W < V\nConclusions:\nI. X > W\nII. Y > V",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "X > Y ≥ Z = W => X > W (I is true). Y ≥ Z = W < V has opposing signs, so relation between Y and V cannot be determined. Only I is true."
    }
  ],

  bloodAndDirection: [
    {
      q: "Pointing to a photograph, Rohit said, 'She is the daughter of my grandfather's only son.' How is the girl in the photograph related to Rohit?",
      opts: ["Sister", "Mother", "Cousin", "Aunt", "Daughter"],
      ans: "A",
      exp: "Grandfather's only son is Rohit's father. Father's daughter is Rohit's sister."
    },
    {
      q: "A is the father of B. C is the mother of B. D is the sister of A. How is D related to B?",
      opts: ["Aunt", "Mother", "Sister", "Grandmother", "Niece"],
      ans: "A",
      exp: "D is the sister of B's father (A). Therefore, D is B's paternal aunt."
    },
    {
      q: "A man walks 10 meters North, then turns right and walks 6 meters. He again turns right and walks 10 meters. How far is he from his starting point?",
      opts: ["6 meters", "10 meters", "16 meters", "8 meters", "12 meters"],
      ans: "A",
      exp: "10m North and 10m South cancel out on the vertical axis. The remaining horizontal displacement is 6 meters East."
    },
    {
      q: "Kunal walks 8 km towards East, then turns left and walks 6 km. What is the shortest distance between his starting point and end point?",
      opts: ["10 km", "14 km", "12 km", "8 km", "9 km"],
      ans: "A",
      exp: "Shortest distance = √(8^2 + 6^2) = √(64 + 36) = √100 = 10 km."
    },
    {
      q: "Introducing a lady, a man said, 'Her mother is the only daughter of my mother.' How is the man related to the lady?",
      opts: ["Maternal Uncle", "Father", "Brother", "Grandfather", "Son"],
      ans: "A",
      exp: "'Only daughter of my mother' is the man's sister. The lady's mother is the man's sister, making the man her Maternal Uncle."
    }
  ],

  miscReasoning: [
    {
      q: "In a certain code language, 'ROAD' is coded as 'URDG'. How will 'SWAN' be coded in that same language?",
      opts: ["VZDQ", "VYDQ", "VZDP", "UZDQ", "WZEQ"],
      ans: "A",
      exp: "Each letter is shifted by +3: R+3=U, O+3=R, A+3=D, D+3=G. S+3=V, W+3=Z, A+3=D, N+3=Q => 'VZDQ'."
    },
    {
      q: "In a row of 30 students, Rahul is 12th from the left end. What is his rank from the right end?",
      opts: ["19th", "18th", "20th", "21st", "17th"],
      ans: "A",
      exp: "Rank from right = (Total + 1) - Rank from left = (30 + 1) - 12 = 31 - 12 = 19th."
    },
    {
      q: "If it is possible to make only one meaningful four-letter word with the 1st, 3rd, 5th, and 7th letters of the word 'BANKING', what will be the third letter of that word? (Letters are B, N, I, G)",
      opts: ["N", "B", "I", "G", "No such word can be formed"],
      ans: "E",
      exp: "The letters are B, N, I, G. No meaningful English word can be formed."
    },
    {
      q: "How many pairs of letters are there in the word 'REPORT' which have as many letters between them as in the English alphabet (both forward and backward)?",
      opts: ["Two", "One", "Three", "Four", "None"],
      ans: "A",
      exp: "Forward: P-Q-R (P and R have 1 letter between them: P(16), O(15), R(18)). Backward: P-Q-R. Total = 2 pairs."
    },
    {
      q: "If all digits in the number '7394265' are arranged in ascending order from left to right, how many digits will remain in their original positions?",
      opts: ["One", "Two", "Three", "Four", "None"],
      ans: "A",
      exp: "Original: 7 3 9 4 2 6 5\nSorted:   2 3 4 5 6 7 9\nOnly '3' remains in its original second position (1 digit)."
    }
  ]
};
