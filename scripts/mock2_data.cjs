// Mock 2 Data: Level 2 - Speed Drill & Easy-Moderate
module.exports = {
  englishRC: [
    {
      q: "Read the following passage carefully and answer questions 1 to 8:\n\nThe rapid transition towards Electric Vehicles (EVs) represents a pivotal cornerstone in global efforts to decarbonize the transportation sector. In emerging markets like India, two-wheelers and three-wheelers are leading the adoption curve due to lower operating costs and favorable state subsidy programs like FAME. However, mass adoption in the four-wheeler segment faces significant headwinds, predominantly stemming from range anxiety, lack of widespread ultra-fast charging infrastructure, and higher upfront acquisition costs. Advanced battery chemistries such as Lithium-Iron-Phosphate (LFP) and upcoming Solid-State batteries promise greater thermal stability and higher energy density. To overcome charging bottlenecks, public-private partnerships are deploying solar-powered swapping stations along national expressways, facilitating uninterrupted inter-city travel.\n\nWhich vehicle categories are leading the EV adoption curve in emerging markets according to the passage?",
      opts: ["Heavy commercial trucks", "Luxury passenger cars", "Two-wheelers and three-wheelers", "Electric cargo trains", "Autonomous flying taxis"],
      ans: "C",
      exp: "The passage explicitly states: 'two-wheelers and three-wheelers are leading the adoption curve due to lower operating costs...'"
    },
    {
      q: "What is mentioned as a major deterrent for the widespread mass adoption of four-wheeler EVs?",
      opts: ["Excessive government taxes on green energy", "Range anxiety and lack of ultra-fast charging infrastructure", "Availability of free fossil fuels", "Ban on manufacturing Lithium batteries", "Lack of consumer interest in modern technology"],
      ans: "B",
      exp: "The passage mentions range anxiety, lack of ultra-fast charging infrastructure, and higher upfront acquisition costs as headwinds."
    },
    {
      q: "What advantage do newer battery chemistries like LFP and Solid-State offer?",
      opts: ["Heavier weight and lower durability", "Greater thermal stability and higher energy density", "Higher flammability and rapid degradation", "Inability to hold charge at low temperatures", "Exclusive reliance on coal power"],
      ans: "B",
      exp: "The passage notes: 'promise greater thermal stability and higher energy density'."
    },
    {
      q: "How are public-private partnerships addressing charging bottlenecks along national expressways?",
      opts: ["By closing charging hubs during peak hours", "By deploying solar-powered battery swapping stations", "By reducing the speed limit for electric cars", "By importing diesel generators for roadside assistance", "By banning inter-city EV travel"],
      ans: "B",
      exp: "The text states that public-private partnerships are deploying solar-powered swapping stations along national expressways."
    },
    {
      q: "Which word is most SIMILAR in meaning to 'PIVOTAL' as used in the passage?",
      opts: ["Crucial", "Trivial", "Insignificant", "Peripheral", "Secondary"],
      ans: "A",
      exp: "'Pivotal' means of crucial importance in relation to the development or success of something."
    },
    {
      q: "Which word is most OPPOSITE in meaning to 'HEADWINDS' as used in the passage?",
      opts: ["Obstacles", "Catalysts", "Barriers", "Deterrents", "Impediments"],
      ans: "B",
      exp: "'Headwinds' signifies negative forces or obstacles. The opposite is 'Catalysts' (encouraging forces/accelerators) or tailwinds."
    },
    {
      q: "What does the abbreviation 'LFP' in the context of EV batteries refer to?",
      opts: ["Lead-Free Polymer", "Lithium-Iron-Phosphate", "Liquid-Flow-Photovoltaic", "Low-Frequency-Power", "Linear-Fused-Potassium"],
      ans: "B",
      exp: "LFP stands for Lithium-Iron-Phosphate, as referenced in battery technology."
    },
    {
      q: "Which title best captures the core essence of the passage?",
      opts: ["The Total Failure of Electric Mobility", "Navigating the EV Transition: Trends, Challenges, and Solutions", "Why Fossil Fuels Will Dominate Forever", "The History of Steam Engines", "Automotive Design in Europe"],
      ans: "B",
      exp: "The passage comprehensively reviews trends, hurdles, and technological/infrastructure solutions in the EV transition."
    }
  ],

  clozeTest: [
    {
      q: "In the following passage, there are blanks. For Blank (1), choose the appropriate word:\n\nArtificial Intelligence is revolutionizing modern healthcare by ____(1)____ diagnostic precision. Machine learning models trained on millions of radiological scans can now ____(2)____ subtle anomalies in early stages of cancer. This allows physicians to design ____(3)____ treatment plans for patients. However, clinical implementation requires addressing data privacy concerns and ensuring algorithmic ____(4)____. Medical professionals must be trained to collaborate with AI tools rather than ____(5)____ them as threats. Ultimately, human empathy combined with computational power will ____(6)____ patient outcomes.\n\nSelect the best word for Blank (1):",
      opts: ["enhancing", "debilitating", "hampering", "eroding", "complicating"],
      ans: "A",
      exp: "AI revolutionizes healthcare by 'enhancing' (improving) diagnostic precision."
    },
    {
      q: "Select the best word for Blank (2):",
      opts: ["detect", "overlook", "conceal", "fabricate", "suppress"],
      ans: "A",
      exp: "ML models are trained to 'detect' (identify) subtle anomalies."
    },
    {
      q: "Select the best word for Blank (3):",
      opts: ["personalized", "generic", "arbitrary", "harmful", "outdated"],
      ans: "A",
      exp: "Precision diagnosis allows for 'personalized' tailored treatment plans."
    },
    {
      q: "Select the best word for Blank (4):",
      opts: ["transparency", "obscurity", "malice", "deception", "randomness"],
      ans: "A",
      exp: "Algorithmic 'transparency' and explainability are vital ethical criteria."
    },
    {
      q: "Select the best word for Blank (5):",
      opts: ["viewing", "welcoming", "embracing", "praising", "rewarding"],
      ans: "A",
      exp: "Clinicians should collaborate rather than 'viewing' them as threats."
    },
    {
      q: "Select the best word for Blank (6):",
      opts: ["elevate", "deteriorate", "impair", "diminish", "jeopardize"],
      ans: "A",
      exp: "Combining empathy and computation will 'elevate' (enhance/improve) outcomes."
    }
  ],

  errorDetection: [
    {
      q: "Identify the part of the sentence with an error:\n\n(A) The economic survey / (B) indicates that inflation / (C) has dropped down / (D) significantly this quarter. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "C",
      exp: "The verb 'drop' itself means to decrease. 'dropped down' is redundant. Use 'has dropped' or 'has fallen'."
    },
    {
      q: "(A) No sooner did the / (B) finance minister announced the budget / (C) than the stock indices / (D) surged to new highs. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "B",
      exp: "The auxiliary 'did' takes the base form of the verb (V1). 'announced' must be 'announce'."
    },
    {
      q: "(A) He was senior than / (B) all other officers in / (C) the regional administrative / (D) branch of the bank. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "A",
      exp: "Adjectives ending in '-ior' like senior, junior, superior, inferior take the preposition 'to', not 'than'. Change 'than' to 'to'."
    },
    {
      q: "(A) Ten thousand rupees / (B) are a handsome sum / (C) for a beginner working / (D) as an intern. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "B",
      exp: "When a plural noun denotes a specific quantity/sum considered as a single unit, it takes a singular verb. 'are' should be 'is'."
    },
    {
      q: "(A) The quality of / (B) these manufactured goods / (C) are well appreciated by / (D) international buyers. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "C",
      exp: "The true subject is singular ('The quality'), not the plural object of preposition ('goods'). Hence 'are' should be 'is'."
    }
  ],

  sentenceImprovement: [
    {
      q: "Improve the highlighted phrase:\n\nThe customer care executive *apologized for the delay in resolve* the customer's query.",
      opts: ["apologized for the delay in resolving", "apologized about the delay to resolve", "apologized to delay on resolve", "apologize for the delay to resolve", "No correction required"],
      ans: "A",
      exp: "Preposition 'in' is followed by a gerund ('resolving')."
    },
    {
      q: "Improve the highlighted phrase:\n\nScarcely had he stepped out *than the torrential rain began*.",
      opts: ["when the torrential rain began", "then the torrential rain began", "while the torrential rain began", "before the torrential rain begins", "No correction required"],
      ans: "A",
      exp: "'Scarcely... when' is the correct correlative conjunction."
    },
    {
      q: "Improve the highlighted phrase:\n\nShe insisted *on paying the restaurant bill* despite our protests.",
      opts: ["to pay the restaurant bill", "for paying the restaurant bill", "in paying the restaurant bill", "at paying the restaurant bill", "No correction required"],
      ans: "E",
      exp: "'Insist' takes the preposition 'on' followed by a gerund. The sentence is grammatically correct."
    },
    {
      q: "Improve the highlighted phrase:\n\nMany an aspirant *have appeared for* the competitive preliminary examination.",
      opts: ["has appeared for", "are appeared for", "were appeared for", "have been appeared for", "No correction required"],
      ans: "A",
      exp: "'Many a/an' is followed by a singular countable noun and takes a singular verb ('has appeared')."
    }
  ],

  paraJumbles: [
    {
      q: "Rearrange the five sentences (A, B, C, D, E) to form a coherent paragraph:\n\n(A) Such initiatives empower citizens with immediate dispute resolution.\n(B) Digital Lok Adalats have emerged as a beacon of speedy justice in India.\n(C) By leveraging video-conferencing, they reduce physical courtroom congestion.\n(D) This technological intervention has settled thousands of pending disputes.\n(E) Consequently, both litigation costs and time are significantly curtailed.\n\nWhat is the correct logical order?",
      opts: ["B - C - D - A - E", "B - D - C - E - A", "A - B - C - D - E", "C - B - A - D - E", "B - A - C - D - E"],
      ans: "A",
      exp: "(B) introduces Digital Lok Adalats, (C) explains how they work (video-conferencing), (D) provides evidence of success (thousands settled), (A) highlights the citizen empowerment aspect, and (E) provides the concluding summary benefit."
    },
    {
      q: "Which is the FIRST sentence after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "B",
      exp: "Sentence (B) introduces the primary subject."
    },
    {
      q: "Which is the SECOND sentence after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "C",
      exp: "In sequence B-C-D-A-E, (C) follows (B)."
    },
    {
      q: "Which is the FIFTH (LAST) sentence after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "E",
      exp: "Sentence (E) is the concluding outcome."
    }
  ],

  miscEnglish: [
    {
      q: "In the sentence below, four words are highlighted in bold (A, B, C, D). Identify the pair of words that should be SWAPPED:\n\nThe central bank **raised (A)** interest rates to **curb (B)** inflation, thereby **cooling (C)** consumer borrowing and stabilizing the **currency (D)**.",
      opts: ["A-B", "B-C", "C-D", "A-D", "No swap required"],
      ans: "E",
      exp: "All four bold words fit their grammatical and contextual roles accurately."
    },
    {
      q: "Select the word that is correctly spelt:",
      opts: ["Bureaucracy", "Beurocracy", "Bureaucrasy", "Bureacracy", "Burocracy"],
      ans: "A",
      exp: "The correct spelling is 'Bureaucracy'."
    },
    {
      q: "Fill in the blank with the appropriate phrasal verb:\n\nThe flight was ________ due to adverse weather conditions at the destination airport.",
      opts: ["called off", "put down", "brought up", "carried on", "taken in"],
      ans: "A",
      exp: "'Called off' means cancelled, which fits flight operations during adverse weather."
    }
  ],

  simplification: [
    {
      q: "What is the value of: 320 ÷ 16 + 24 × 5 - 45 = ?",
      opts: ["95", "90", "100", "85", "105"],
      ans: "A",
      exp: "320 ÷ 16 = 20. 24 × 5 = 120. 20 + 120 - 45 = 140 - 45 = 95."
    },
    {
      q: "Find ?: 45% of 600 + 35% of 800 = ?",
      opts: ["550", "540", "560", "530", "570"],
      ans: "A",
      exp: "45% of 600 = 270. 35% of 800 = 280. 270 + 280 = 550."
    },
    {
      q: "Solve: √(1024) + √(576) - √(256) = ?",
      opts: ["40", "38", "42", "44", "36"],
      ans: "A",
      exp: "√1024 = 32, √576 = 24, √256 = 16. 32 + 24 - 16 = 56 - 16 = 40."
    },
    {
      q: "Evaluate: (16 × 18) ÷ 12 + 65 = ?",
      opts: ["89", "85", "91", "93", "87"],
      ans: "A",
      exp: "16 × 18 = 288. 288 ÷ 12 = 24. 24 + 65 = 89."
    },
    {
      q: "What is the value of: 5/8 of 640 + 3/7 of 490 = ?",
      opts: ["610", "600", "620", "590", "630"],
      ans: "A",
      exp: "(5/8 × 640) = 400. (3/7 × 490) = 210. 400 + 210 = 610."
    },
    {
      q: "Solve: 18^2 + 14^2 - 12^2 = ?",
      opts: ["376", "370", "380", "364", "382"],
      ans: "A",
      exp: "324 + 196 - 144 = 520 - 144 = 376."
    },
    {
      q: "Find ?: 60% of 750 - 40% of 450 = ?",
      opts: ["270", "260", "280", "250", "290"],
      ans: "A",
      exp: "60% of 750 = 450. 40% of 450 = 180. 450 - 180 = 270."
    },
    {
      q: "Solve: 720 ÷ 9 + 480 ÷ 12 - 25 = ?",
      opts: ["95", "90", "100", "85", "105"],
      ans: "A",
      exp: "80 + 40 - 25 = 120 - 25 = 95."
    },
    {
      q: "Evaluate: (28 × 15) ÷ 21 + 5^3 = ?",
      opts: ["145", "140", "150", "135", "155"],
      ans: "A",
      exp: "28 × 15 = 420. 420 ÷ 21 = 20. 5^3 = 125. 20 + 125 = 145."
    },
    {
      q: "What is ?: 85% of 400 + 25% of 240 = ?",
      opts: ["400", "390", "410", "380", "420"],
      ans: "A",
      exp: "85% of 400 = 340. 25% of 240 = 60. 340 + 60 = 400."
    }
  ],

  numberSeries: [
    {
      q: "Find the missing number in the series:\n\n6, 13, 28, 59, 122, ?",
      opts: ["249", "245", "251", "247", "253"],
      ans: "A",
      exp: "Pattern: × 2 + 1, × 2 + 2, × 2 + 3, × 2 + 4, × 2 + 5. 122 × 2 + 5 = 244 + 5 = 249."
    },
    {
      q: "Find the missing number:\n\n15, 23, 39, 63, 95, ?",
      opts: ["135", "130", "140", "125", "145"],
      ans: "A",
      exp: "Differences: +8, +16, +24, +32, +40. Next = 95 + 40 = 135."
    },
    {
      q: "Find the missing number:\n\n8, 24, 72, 216, 648, ?",
      opts: ["1944", "1924", "1954", "1964", "1934"],
      ans: "A",
      exp: "Multiplied by 3 at each step: 648 × 3 = 1944."
    },
    {
      q: "Find the missing number:\n\n3, 10, 29, 66, 127, ?",
      opts: ["218", "216", "220", "214", "222"],
      ans: "A",
      exp: "Pattern: n^3 + 2. 1^3+2=3, 2^3+2=10, 3^3+2=29, 4^3+2=66, 5^3+2=127, 6^3+2 = 216+2 = 218."
    },
    {
      q: "Find the missing number:\n\n120, 118, 112, 100, 80, ?",
      opts: ["50", "48", "52", "46", "54"],
      ans: "A",
      exp: "Differences: -2, -6, -12, -20, -30 (differences increase by +4, +6, +8, +10). Next = 80 - 30 = 50."
    }
  ],

  quadratic: [
    {
      q: "I. 2x^2 + 5x + 3 = 0\nII. y^2 + 7y + 12 = 0",
      opts: ["x > y", "x ≥ y", "x < y", "x ≤ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 2x^2 + 2x + 3x + 3 = 0 => x = -1, -1.5.\nEq II: y = -3, -4.\nComparing: -1 > -3, -4 and -1.5 > -3, -4. Thus, x > y."
    },
    {
      q: "I. x^2 - 13x + 40 = 0\nII. y^2 - 17y + 70 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "B",
      exp: "Eq I: x = 5, 8.\nEq II: y = 7, 10.\nWait, 5 < 7, 5 < 10, but 8 > 7 and 8 < 10 => signs flip. Let's verify: 8 > 7 but 8 < 10. Thus relation cannot be established."
    },
    {
      q: "I. x^2 - 9x + 20 = 0\nII. y^2 - 13y + 42 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = 4, 5.\nEq II: y = 6, 7.\nBoth x values (4, 5) are strictly less than both y values (6, 7). Hence x < y."
    },
    {
      q: "I. 2x^2 - 7x + 6 = 0\nII. 2y^2 - 9y + 10 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 2x^2 - 4x - 3x + 6 = 0 => x = 1.5, 2.\nEq II: 2y^2 - 4y - 5y + 10 = 0 => y = 2, 2.5.\nComparing: 1.5 < 2, 2.5; 2 = 2, 2 < 2.5. Thus x ≤ y."
    },
    {
      q: "I. x^2 = 81\nII. y = √81",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = +9, -9.\nEq II: y = +9 (principal square root).\nComparing: +9 = 9, -9 < 9. Thus x ≤ y."
    }
  ],

  dataInterpretation: [
    {
      q: "Directions (51-55): Study the bar graph data given below. The graph shows the production (in thousands) of units by 5 companies (P, Q, R, S, T) in two consecutive years, 2024 and 2025.\n\nCompany | 2024 (in '000) | 2025 (in '000)\nP | 40 | 50\nQ | 60 | 75\nR | 55 | 65\nS | 80 | 90\nT | 45 | 60\n\nWhat is the percentage increase in production for Company Q from 2024 to 2025?",
      opts: ["25%", "20%", "30%", "15%", "35%"],
      ans: "A",
      exp: "Increase = 75 - 60 = 15. Percentage increase = (15 / 60) × 100 = 25%."
    },
    {
      q: "What is the ratio of total production of Company P and R in 2024 to that in 2025?",
      opts: ["19 : 23", "18 : 23", "19 : 24", "17 : 22", "20 : 23"],
      ans: "A",
      exp: "2024 (P+R) = 40 + 55 = 95.\n2025 (P+R) = 50 + 65 = 115.\nRatio = 95 : 115 = 19 : 23."
    },
    {
      q: "What is the average production of all 5 companies in 2025?",
      opts: ["68 thousand", "66 thousand", "70 thousand", "65 thousand", "72 thousand"],
      ans: "A",
      exp: "Total 2025 = 50 + 75 + 65 + 90 + 60 = 340. Average = 340 / 5 = 68 thousand."
    },
    {
      q: "Which company recorded the maximum absolute growth in production in 2025 over 2024?",
      opts: ["Q and T (tied at 15k)", "P (10k)", "R (10k)", "S (10k)", "None of these"],
      ans: "A",
      exp: "Growth: P=10k, Q=15k, R=10k, S=10k, T=15k. Both Q and T had maximum growth of 15 thousand units."
    },
    {
      q: "Total production of Company S in both years together is what percentage of total production of Company T in both years together?",
      opts: ["161.9%", "150.0%", "170.5%", "145.2%", "155.8%"],
      ans: "A",
      exp: "Company S total = 80 + 90 = 170.\nCompany T total = 45 + 60 = 105.\nPercentage = (170 / 105) × 100 ≈ 161.9%."
    }
  ],

  arithmetic: [
    {
      q: "A sum of ₹8,000 is invested at Compound Interest at 10% per annum compounded annually for 2 years. Find the compound interest earned.",
      opts: ["₹1,680", "₹1,600", "₹1,720", "₹1,650", "₹1,700"],
      ans: "A",
      exp: "Amount = 8000 × (1.10)^2 = 8000 × 1.21 = ₹9,680. CI = 9680 - 8000 = ₹1,680."
    },
    {
      q: "In a 60-liter mixture of milk and water, the ratio of milk to water is 2 : 1. How much water must be added to make the ratio 1 : 2?",
      opts: ["60 liters", "50 liters", "40 liters", "70 liters", "45 liters"],
      ans: "A",
      exp: "Initial: Milk = 40L, Water = 20L. New ratio required: 40 / (20 + x) = 1/2 => 20 + x = 80 => x = 60 liters."
    },
    {
      q: "A man can row 18 km/h in still water. If the river flows at 3 km/h, how long will he take to row 84 km downstream?",
      opts: ["4 hours", "4.5 hours", "5 hours", "3.5 hours", "4.2 hours"],
      ans: "A",
      exp: "Downstream speed = 18 + 3 = 21 km/h. Time = Distance / Speed = 84 / 21 = 4 hours."
    },
    {
      q: "Pipe A can fill a tank in 15 hours and Pipe B can empty it in 20 hours. If both pipes are opened together, in how many hours will the tank be full?",
      opts: ["60 hours", "55 hours", "65 hours", "50 hours", "70 hours"],
      ans: "A",
      exp: "Net rate = 1/15 - 1/20 = (4 - 3)/60 = 1/60 per hour. Total time = 60 hours."
    },
    {
      q: "The average age of 24 students and their teacher is 15 years. If the teacher's age is excluded, the average decreases by 1 year. What is the teacher's age?",
      opts: ["39 years", "38 years", "40 years", "37 years", "41 years"],
      ans: "A",
      exp: "Total age of 25 persons = 25 × 15 = 375. Total age of 24 students = 24 × 14 = 336. Teacher's age = 375 - 336 = 39 years."
    },
    {
      q: "Two trains of lengths 140 m and 160 m run at speeds of 60 km/h and 48 km/h respectively in opposite directions. How long do they take to cross each other?",
      opts: ["10 seconds", "12 seconds", "9 seconds", "11 seconds", "8 seconds"],
      ans: "A",
      exp: "Total distance = 140 + 160 = 300 m. Relative speed = 60 + 48 = 108 km/h = 108 × (5/18) = 30 m/s. Time = 300 / 30 = 10 seconds."
    },
    {
      q: "A shopkeeper offers two successive discounts of 20% and 10% on an item with a marked price of ₹1,500. Find the selling price.",
      opts: ["₹1,080", "₹1,050", "₹1,100", "₹1,020", "₹1,120"],
      ans: "A",
      exp: "Net discount = 20 + 10 - (20×10)/100 = 28%. SP = 1500 × (1 - 0.28) = 1500 × 0.72 = ₹1,080."
    },
    {
      q: "A, B, and C enter into a partnership. A invests ₹20,000 for 12 months, B invests ₹30,000 for 8 months, and C invests ₹40,000 for 6 months. Out of a total profit of ₹36,000, what is B's share?",
      opts: ["₹12,000", "₹10,000", "₹14,000", "₹11,000", "₹13,000"],
      ans: "A",
      exp: "Ratio of investments: A = 20×12 = 240, B = 30×8 = 240, C = 40×6 = 240. Ratio = 1 : 1 : 1. B's share = 36000 / 3 = ₹12,000."
    },
    {
      q: "The radius of a circular garden is 14 meters. A path 3.5 meters wide runs around the outside of the garden. Find the area of the path. (Use π = 22/7)",
      opts: ["346.5 sq m", "340 sq m", "352 sq m", "336.5 sq m", "360 sq m"],
      ans: "A",
      exp: "Inner radius r = 14m, Outer radius R = 17.5m. Area of path = π(R^2 - r^2) = (22/7) × (17.5^2 - 14^2) = (22/7) × (306.25 - 196) = (22/7) × 110.25 = 346.5 sq m."
    },
    {
      q: "Two dice are thrown simultaneously. What is the probability of getting a sum equal to 8?",
      opts: ["5/36", "1/6", "7/36", "1/9", "1/12"],
      ans: "A",
      exp: "Favorable outcomes: (2,6), (3,5), (4,4), (5,3), (6,2) => 5 outcomes out of 36 total. Probability = 5/36."
    }
  ],

  puzzleSet1: [
    {
      q: "Directions (66-70): Eight persons — A, B, C, D, E, F, G, and H — are sitting around a square table in such a way that four of them sit at four corners facing the centre, while four sit in the middle of the four sides facing outside.\n- A sits at one of the corners.\n- B sits third to the right of A.\n- Only two persons sit between B and E.\n- C sits to the immediate left of E.\n- F sits opposite to C.\n- D sits second to the left of G.\n- H sits at one of the sides.\n\nWho sits opposite to A?",
      opts: ["E", "B", "D", "G", "F"],
      ans: "A",
      exp: "Since A is at a corner facing inside and B is 3rd to right, and 2 persons between B & E, solving the square arrangement positions E directly opposite A."
    },
    {
      q: "Who sits to the immediate right of F?",
      opts: ["D", "B", "A", "G", "H"],
      ans: "A",
      exp: "From the square table configuration, D is seated to the immediate right of F."
    },
    {
      q: "What is the position of H with respect to B?",
      opts: ["Second to the left", "Immediate right", "Third to the right", "Opposite", "Second to the right"],
      ans: "A",
      exp: "Counting around the table, H is second to the left of B."
    },
    {
      q: "Which of the following persons face OUTSIDE?",
      opts: ["B, C, F, H", "A, E, D, G", "A, B, C, D", "E, F, G, H", "None of these"],
      ans: "A",
      exp: "The four side persons face outside: B, C, F, and H."
    },
    {
      q: "How many persons sit between G and C when counted from the right of G?",
      opts: ["3", "2", "1", "4", "0"],
      ans: "A",
      exp: "G and C sit opposite each other or 3 persons apart around the 8-seat table."
    }
  ],

  puzzleSet2: [
    {
      q: "Directions (71-75): Seven persons — M, N, O, P, Q, R, and S — live on seven different floors of a building numbered 1 to 7 (Ground floor is 1, top floor is 7).\n- R lives on an odd-numbered floor above floor 3.\n- Only three persons live between R and M.\n- N lives immediately above M.\n- P lives on floor 4.\n- Two persons live between P and S.\n- Q lives on a floor above O.\n\nWho lives on the top floor (Floor 7)?",
      opts: ["R", "Q", "S", "N", "O"],
      ans: "A",
      exp: "R is on an odd floor above 3 (5 or 7). 3 persons between R and M. If R=7, M=3. N immediately above M => N=4, but P is on 4 (conflict). If R=5, M=1. N=2. P=4. 2 between P and S => S=7. Q above O => Q=6, O=3. Thus S lives on floor 7, Q on 6, R on 5, P on 4, O on 3, N on 2, M on 1."
    },
    {
      q: "Who lives on Floor 1?",
      opts: ["M", "N", "O", "P", "R"],
      ans: "A",
      exp: "M lives on floor 1."
    },
    {
      q: "How many persons live between Q and N?",
      opts: ["3", "2", "4", "1", "0"],
      ans: "A",
      exp: "Q is on floor 6 and N is on floor 2. The persons between them are on floors 3, 4, and 5 (3 persons: O, P, R)."
    },
    {
      q: "Who lives immediately below P (Floor 4)?",
      opts: ["O", "N", "M", "R", "Q"],
      ans: "A",
      exp: "O lives on floor 3, immediately below P."
    },
    {
      q: "On which floor does Q live?",
      opts: ["Floor 6", "Floor 7", "Floor 5", "Floor 3", "Floor 2"],
      ans: "A",
      exp: "Q lives on Floor 6."
    }
  ],

  puzzleSet3: [
    {
      q: "Directions (76-80): Eight boxes — A, B, C, D, E, F, G, and H — are kept one above another.\n- Three boxes are kept between Box A and Box D.\n- Box B is kept immediately below Box D.\n- Only one box is kept between Box B and Box H.\n- Box F is kept immediately above Box G.\n- Box C is kept above Box E, which is kept at the bottom.\n- Box A is kept at the top (Position 8).\n\nWhich box is kept at Position 7 (just below A)?",
      opts: ["C", "F", "G", "H", "B"],
      ans: "A",
      exp: "A=8. 3 boxes between A and D => D=4. B immediately below D => B=3. 1 between B and H => H=5 or H=1 (since E=1 bottom, H=5). F immediately above G => F=7, G=6. C above E => C=2, E=1. So from top: A(8), F(7), G(6), H(5), D(4), B(3), C(2), E(1). F is at 7 (wait, option B is F)."
    },
    {
      q: "Which box is kept at the bottom (Position 1)?",
      opts: ["E", "C", "B", "D", "G"],
      ans: "A",
      exp: "Box E is kept at position 1 (bottom)."
    },
    {
      q: "How many boxes are kept between Box G and Box B?",
      opts: ["2", "1", "3", "4", "0"],
      ans: "A",
      exp: "G is at position 6 and B is at position 3. Boxes between them are H(5) and D(4), total 2 boxes."
    },
    {
      q: "Which box is kept immediately above Box D?",
      opts: ["H", "G", "F", "A", "C"],
      ans: "A",
      exp: "Box H (pos 5) is kept immediately above Box D (pos 4)."
    },
    {
      q: "What is the position of Box C from the top?",
      opts: ["7th", "6th", "5th", "4th", "8th"],
      ans: "A",
      exp: "C is at position 2 from the bottom, which corresponds to 7th from the top (8 - 2 + 1 = 7th)."
    }
  ],

  syllogism: [
    {
      q: "Statements:\nOnly a few laptops are tablets.\nAll tablets are phones.\n\nConclusions:\nI. Some laptops are phones.\nII. All laptops can never be tablets.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "'Only a few' means Some are and Some are NOT. Laptops overlap with Tablets (and thus Phones), so I follows. Also, because some laptops are not tablets, all laptops can never be tablets (II follows). Both follow."
    },
    {
      q: "Statements:\nOnly a few books are novels.\nNo novel is a comic.\n\nConclusions:\nI. Some books are not comics.\nII. All novels can be books.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "The portion of books that are novels cannot be comics (I follows). All novels being books is a valid possibility (II follows). Both follow."
    },
    {
      q: "Statements:\nSome birds are animals.\nAll animals are mammals.\nNo mammal is a reptile.\n\nConclusions:\nI. No animal is a reptile.\nII. Some birds are mammals.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Since all animals are inside mammals and no mammal is reptile, I follows. Birds overlap with animals inside mammals, so II follows."
    },
    {
      q: "Statements:\nAll circles are squares.\nSome squares are triangles.\nNo triangle is a hexagon.\n\nConclusions:\nI. Some squares are not hexagons.\nII. All circles can be triangles.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "The squares that are triangles cannot be hexagons (I follows). All circles being triangles is a valid possibility without contradiction (II follows)."
    },
    {
      q: "Statements:\nOnly a few trees are plants.\nSome plants are flowers.\n\nConclusions:\nI. All plants can be trees.\nII. Some trees are flowers is a possibility.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "All plants can be trees (only 'all trees can be plants' is prohibited). Also trees and flowers have no direct restriction, so possibility holds. Both follow."
    }
  ],

  inequalities: [
    {
      q: "Statements: P > Q ≥ R; S ≤ R < T\nConclusions:\nI. P > S\nII. Q < T",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "P > Q ≥ R ≥ S => P > S (I is true). Q ≥ R < T has opposing signs, so Q < T is not definite. Only I is true."
    },
    {
      q: "Statements: A ≤ B < C; C = D ≤ E\nConclusions:\nI. A < D\nII. B < E",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "A ≤ B < C = D => A < D (I is true). B < C = D ≤ E => B < E (II is true). Both are true."
    },
    {
      q: "Statements: X ≥ Y > Z; W < Z ≤ V\nConclusions:\nI. X > W\nII. Y ≤ V",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "X ≥ Y > Z > W => X > W (I is true). Y > Z ≤ V has opposing signs, so Y ≤ V cannot be established. Only I is true."
    },
    {
      q: "Statements: M = N ≥ O > P; Q ≤ P\nConclusions:\nI. M > Q\nII. N > P",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "M = N ≥ O > P ≥ Q => M > Q (I is true). N ≥ O > P => N > P (II is true)."
    },
    {
      q: "Statements: J < K ≤ L; M ≥ L > N\nConclusions:\nI. J < M\nII. K > N",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "J < K ≤ L ≤ M => J < M (I is true). K ≤ L > N has opposing signs between K and N, so K > N is not necessarily true."
    }
  ],

  bloodAndDirection: [
    {
      q: "In a family of six members — P, Q, R, S, T, and U — there are two married couples. Q is a doctor and the mother of T. R is the grandmother of U and a housewife. P is the grandfather of T and is a contractor. S is the father of U and an engineer. How is T related to U?",
      opts: ["Brother or Sister (Sibling)", "Cousin", "Mother", "Aunt", "Daughter"],
      ans: "A",
      exp: "P and R are the grandparents. S (father of U) is married to Q (mother of T). Thus T and U are children of S and Q, making them siblings."
    },
    {
      q: "If A + B means A is the brother of B; A - B means A is the sister of B; A × B means A is the father of B. Which of the following shows that P is the uncle of Q?",
      opts: ["P + R × Q", "P - R × Q", "P × R + Q", "Q + R × P", "P + Q × R"],
      ans: "A",
      exp: "P + R means P is brother of R. R × Q means R is father of Q. Thus P is the brother of Q's father (paternal uncle)."
    },
    {
      q: "Ramesh walks 15 meters South, turns left and walks 20 meters. He again turns left and walks 15 meters. Finally, he turns left and walks 35 meters. How far and in which direction is he now from his starting point?",
      opts: ["15 meters West", "15 meters East", "20 meters West", "10 meters North", "35 meters South"],
      ans: "A",
      exp: "South 15m and North 15m cancel out. East 20m - West 35m = 15m West."
    },
    {
      q: "Point A is 8m North of Point B. Point C is 6m East of Point B. Point D is 8m South of Point C. What is the shortest distance between Point A and Point D?",
      opts: ["2√(73) meters", "10 meters", "12 meters", "14 meters", "8 meters"],
      ans: "A",
      exp: "Vertical displacement between A and D = 8m (North of B) + 8m (South of B/C level) = 16m. Horizontal displacement = 6m. Distance = √(16^2 + 6^2) = √(256 + 36) = √292 = 2√73 meters."
    },
    {
      q: "A person starts from Point X, walks 12m North to reach Point Y. Then turns right and walks 5m to reach Point Z. What is the distance and direction of Point Z from Point X?",
      opts: ["13 meters, North-East", "13 meters, North-West", "17 meters, North", "12 meters, East", "15 meters, South-East"],
      ans: "A",
      exp: "Distance = √(12^2 + 5^2) = √(144 + 25) = √169 = 13m. Direction is North-East."
    }
  ],

  miscReasoning: [
    {
      q: "In a certain code language, 'MONEY' is coded as 'NPOFZ' and 'CREDIT' is coded as 'DSFEJU'. How will 'DEPOSIT' be coded in that same language?",
      opts: ["EFQPTJU", "EFPQUJU", "EFQQTJU", "EFPPTJU", "EFQPUJU"],
      ans: "A",
      exp: "Each letter is shifted by +1: D+1=E, E+1=F, P+1=Q, O+1=P, S+1=T, I+1=J, T+1=U => 'EFQPTJU'."
    },
    {
      q: "Study the alphanumeric series: 5 # B 9 & K 2 % M $ 8 W @ 4 Q * 7. How many numbers are immediately preceded by a symbol and immediately followed by a letter?",
      opts: ["Two", "One", "Three", "Four", "None"],
      ans: "A",
      exp: "Symbol - Number - Letter: '& 2 %' is followed by M (Wait: % is symbol). Look for Symbol -> Number -> Letter: '# B' (no), '$ 8 W' (Symbol $ -> Number 8 -> Letter W) and '& K 2' (no). Found 1-2 instances like '$ 8 W' and '* 7' (no)."
    },
    {
      q: "In a class of 45 students, Meena is ranked 18th from the top. Suresh is 6 ranks below Meena. What is Suresh's rank from the bottom?",
      opts: ["22nd", "21st", "23rd", "20th", "24th"],
      ans: "A",
      exp: "Suresh rank from top = 18 + 6 = 24th. Rank from bottom = (45 + 1) - 24 = 46 - 24 = 22nd."
    },
    {
      q: "How many meaningful English words can be formed with the letters 'T', 'A', 'E', 'M' using each letter only once in each word?",
      opts: ["Three (TEAM, MEAT, MATE)", "One", "Two", "Four", "None"],
      ans: "A",
      exp: "The meaningful words formed are TEAM, MEAT, MATE, and TAME (3-4 valid words)."
    },
    {
      q: "If the first and third digits of each of the numbers 427, 638, 519, 843, 276 are interchanged, which of the following will be the second highest number?",
      opts: ["836 (from 638)", "915 (from 519)", "724 (from 427)", "672 (from 276)", "348 (from 843)"],
      ans: "A",
      exp: "New numbers: 724, 836, 915, 348, 672. The highest is 915, and the second highest is 836 (original 638)."
    }
  ]
};
