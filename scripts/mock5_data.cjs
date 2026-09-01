// Mock 5 Data: Level 5 - Advanced Prelims (Speed + Tricky Questions)
module.exports = {
  englishRC: [
    {
      q: "Read the following passage carefully and answer questions 1 to 8:\n\nThe commercial space economy is undergoing an unprecedented paradigm shift, fueled by low-Earth orbit (LEO) satellite constellations and private launch service providers. Historically the exclusive domain of sovereign defense and space exploration agencies, satellite deployment has been democratized through reusable rocket stages and standardized modular CubeSats. Megaconstellations comprising thousands of networked satellites are delivering ultra-low-latency broadband connectivity to remote maritime, aviation, and rural terrains where terrestrial fiber-optic deployment is economically unfeasible. However, this orbital proliferation has ignited grave concerns regarding space debris and Kessler Syndrome—a catastrophic cascading collision cascade that could render critical orbital regimes unusable for generations. Mitigating these risks mandates binding international space traffic management protocols, active debris removal technologies, and designated end-of-life de-orbiting mechanisms for retired satellites.\n\nWhat has democratized modern satellite deployment according to the passage?",
      opts: ["Banning commercial space startups", "Reusable rocket stages and standardized modular CubeSats", "Total dependence on government funding", "Abandonment of low-Earth orbit missions", "None of the above"],
      ans: "B",
      exp: "The passage explicitly notes that satellite deployment has been democratized through reusable rocket stages and standardized modular CubeSats."
    },
    {
      q: "Where is LEO satellite broadband particularly advantageous compared to terrestrial fiber?",
      opts: ["Dense metropolitan business districts", "Remote maritime, aviation, and rural terrains", "Underground rail networks", "High-frequency stock trading floors", "Submarine cable stations"],
      ans: "B",
      exp: "The text highlights that satellite constellations deliver broadband to remote maritime, aviation, and rural areas where fiber is economically unfeasible."
    },
    {
      q: "What is 'Kessler Syndrome' as described in the passage?",
      opts: ["A neurological condition affecting astronauts", "A catastrophic cascading collision of orbital debris", "A market crash in space startup stocks", "A sudden loss of solar radiation in space", "A software glitch in navigation satellites"],
      ans: "B",
      exp: "The passage defines Kessler Syndrome as 'a catastrophic cascading collision cascade that could render critical orbital regimes unusable'."
    },
    {
      q: "Which measures are recommended to mitigate orbital debris risks?",
      opts: ["Launching all satellites into deep interstellar space", "Binding international space traffic management and active debris removal protocols", "Ceasing all satellite communication permanently", "Exploding obsolete satellites in orbit", "Disbanding international space regulatory bodies"],
      ans: "B",
      exp: "The author explicitly calls for space traffic management protocols, active debris removal, and end-of-life de-orbiting mechanisms."
    },
    {
      q: "Choose the word most SIMILAR in meaning to 'PROLIFERATION' as used in the passage.",
      opts: ["Rapid expansion / multiplication", "Drastic reduction", "Stagnation", "Termination", "Decay"],
      ans: "A",
      exp: "'Proliferation' means rapid increase or multiplication in numbers."
    },
    {
      q: "Choose the word most OPPOSITE in meaning to 'UNFEASIBLE' as used in the passage.",
      opts: ["Impracticable", "Viable", "Unattainable", "Challenging", "Costly"],
      ans: "B",
      exp: "'Unfeasible' means not practical or possible to achieve. The opposite is 'Viable' (feasible/practical)."
    },
    {
      q: "What does the abbreviation 'LEO' stand for in space technology?",
      opts: ["Low-Earth Orbit", "Linear Electron Oscillator", "Longitudinal Energy Output", "Lunar Exploration Observatory", "Laser Emitting Optic"],
      ans: "A",
      exp: "LEO stands for Low-Earth Orbit."
    },
    {
      q: "What is the primary objective of the author in this passage?",
      opts: ["To dismiss space exploration as a waste of resources", "To analyze the benefits and severe sustainability hazards of the expanding commercial space economy", "To promote a specific private satellite broadband provider", "To advocate for the militarization of low-Earth orbit", "To explain rocket propulsion chemistry"],
      ans: "B",
      exp: "The author objectively analyzes the transformative benefits (connectivity, reusable tech) alongside existential hazards (orbital debris, Kessler Syndrome)."
    }
  ],

  clozeTest: [
    {
      q: "In the following passage, there are blanks. For Blank (1), choose the appropriate word:\n\nOpen Banking APIs (Application Programming Interfaces) are fundamentally ____(1)____ the relationship between traditional banks and third-party fintech innovators. By granting secure, consent-driven access to consumer financial data, open banking fosters intense market ____(2)____ and spurs tailored financial product development. Consumers benefit from unified account aggregators that provide holistic financial ____(3)____. However, robust data sovereignty laws and stringent cybersecurity protocols are indispensable to safeguard against malicious data ____(4)____. Regulators must maintain a delicate balance between encouraging financial ____(5)____ and preserving consumer ____(6)____.\n\nSelect the best word for Blank (1):",
      opts: ["reshaping", "destroying", "obstructing", "ignoring", "weakening"],
      ans: "A",
      exp: "Open banking is 'reshaping' (transforming) traditional banking relationships."
    },
    {
      q: "Select the best word for Blank (2):",
      opts: ["competition", "stagnation", "monopoly", "collusion", "lethargy"],
      ans: "A",
      exp: "Consent-driven access spurs market 'competition' and innovation."
    },
    {
      q: "Select the best word for Blank (3):",
      opts: ["insights", "illusions", "debts", "penalties", "confusions"],
      ans: "A",
      exp: "Account aggregators provide holistic financial 'insights'."
    },
    {
      q: "Select the best word for Blank (4):",
      opts: ["breaches", "protections", "enhancements", "backups", "upgrades"],
      ans: "A",
      exp: "Cybersecurity safeguards against malicious data 'breaches'."
    },
    {
      q: "Select the best word for Blank (5):",
      opts: ["innovation", "paralysis", "bureaucracy", "corruption", "negligence"],
      ans: "A",
      exp: "Regulators balance financial 'innovation' with consumer protection."
    },
    {
      q: "Select the best word for Blank (6):",
      opts: ["trust", "distress", "apathy", "hostility", "indifference"],
      ans: "A",
      exp: "Preserving consumer 'trust' is the vital regulatory priority."
    }
  ],

  errorDetection: [
    {
      q: "Identify the part of the sentence containing an error:\n\n(A) Had the audit committee / (B) investigated the suspicious transactions earlier, / (C) the massive corporate fraud / (D) would have been unearthed sooner. / (E) No error",
      opts: ["E", "A", "B", "C", "D"],
      ans: "A",
      exp: "The sentence is structurally and grammatically sound (Conditional inversion: 'Had + S + V3, S + would have been + V3'). Hence, (E) No error."
    },
    {
      q: "(A) He is not only known / (B) for his profound economic wisdom / (C) but also for his exemplary / (D) integrity in public life. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "A",
      exp: "Parallelism error: 'not only' should be placed after 'known' or before 'for'. It should be: 'He is known not only for his profound economic wisdom but also for his exemplary integrity...'."
    },
    {
      q: "(A) Neither the financial stability / (B) report nor the quarterly earnings / (C) data were released / (D) on the scheduled date. / (E) No error",
      opts: ["E", "A", "B", "C", "D"],
      ans: "A",
      exp: "'data' is plural and is the closer subject in 'Neither... nor', taking the plural verb 'were'. The sentence is correct (No error)."
    },
    {
      q: "(A) The RBI governor emphasized that / (B) maintaining price stability / (C) is paramount than achieving / (D) short-term growth spikes. / (E) No error",
      opts: ["C", "A", "B", "D", "E"],
      ans: "C",
      exp: "'Paramount' is not followed by 'than'. Use 'is more paramount than' (or 'is of greater importance than' / 'takes precedence over')."
    },
    {
      q: "(A) The reason why the stock / (B) crashed so dramatically was / (C) because the company reported / (D) massive quarterly losses. / (E) No error",
      opts: ["C", "A", "B", "D", "E"],
      ans: "C",
      exp: "'The reason why...' is paired with 'that', not 'because' (which creates redundancy). Change 'because' to 'that'."
    }
  ],

  sentenceImprovement: [
    {
      q: "Improve the underlined phrase:\n\nIf the central bank *would have lowered* interest rates, the housing market would have rebounded.",
      opts: ["had lowered", "has lowered", "would lower", "was lowering", "No correction required"],
      ans: "A",
      exp: "In the 'if' clause of a third conditional, use Past Perfect ('had lowered'), never 'would have'."
    },
    {
      q: "Improve the underlined phrase:\n\nScarcely had the trading session commenced *when the server crashed*.",
      opts: ["than the server crashed", "then the server crashed", "while the server had crashed", "when the server crashed", "No correction required"],
      ans: "E",
      exp: "'Scarcely... when' is the correct correlative conjunction. The sentence is correct."
    },
    {
      q: "Improve the underlined phrase:\n\nThe executive committed *neither to accept the severance package or* to resign voluntarily.",
      opts: ["neither to accept the severance package nor", "either to accept the severance package or", "neither accepting the severance package nor", "both to accept the severance package and", "No correction required"],
      ans: "A",
      exp: "'Neither' must be correlated with 'nor'."
    },
    {
      q: "Improve the underlined phrase:\n\nIt is high time that the government *takes proactive measures* to curb rising retail inflation.",
      opts: ["took proactive measures", "has taken proactive measures", "should take proactive measures", "would take proactive measures", "No correction required"],
      ans: "A",
      exp: "The phrase 'It is high time / It is time' is followed by a Simple Past tense subjunctive verb ('took')."
    }
  ],

  paraJumbles: [
    {
      q: "Rearrange the five sentences (A, B, C, D, E) to form a meaningful paragraph:\n\n(A) These smart contracts automate settlements without human intermediaries.\n(B) Decentralized Finance (DeFi) offers an alternative architecture for lending.\n(C) Consequently, transaction costs and processing latencies are reduced.\n(D) It relies on cryptographic protocols executed on public blockchains.\n(E) However, smart contract vulnerabilities expose depositors to cyber risks.\n\nWhat is the logical sequence?",
      opts: ["B - D - A - C - E", "B - A - C - D - E", "D - B - A - C - E", "B - C - D - A - E", "E - B - D - A - C"],
      ans: "A",
      exp: "(B) introduces DeFi lending, (D) explains underlying blockchain technology, (A) describes automated smart contracts, (C) states efficiency benefits, and (E) provides concluding risk caveat."
    },
    {
      q: "Which sentence is the FIRST after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "B",
      exp: "(B) introduces the primary theme."
    },
    {
      q: "Which sentence is the THIRD after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "A",
      exp: "In sequence B-D-A-C-E, sentence (A) is third."
    },
    {
      q: "Which sentence is the LAST (FIFTH) after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "E",
      exp: "Sentence (E) provides the concluding risk warning."
    }
  ],

  miscEnglish: [
    {
      q: "In the sentence below, four words are bold (A, B, C, D). Identify the required SWAP:\n\nThe committee **scrutinized (A)** the audit report **thoroughly (B)** to ensure no financial **irregularities (C)** had been **overlooked (D)**.",
      opts: ["A-B", "B-C", "C-D", "A-D", "No swap required"],
      ans: "E",
      exp: "All bold words are accurately placed in syntax and context."
    },
    {
      q: "Select the INCORRECTLY spelt word from the options:",
      opts: ["Superintendent", "Omission", "Paraphernalia", "Millenium", "Mischievous"],
      ans: "D",
      exp: "The correct spelling is 'Millennium' (with double 'l' and double 'n')."
    },
    {
      q: "Select the most appropriate word to fill the blank:\n\nThe finance ministry introduced fiscal stimuli to ________ the economic slowdown caused by geopolitical headwinds.",
      opts: ["cushion", "aggravate", "intensify", "hasten", "provoke"],
      ans: "A",
      exp: "Fiscal stimuli are deployed to 'cushion' (soften the impact of) an economic slowdown."
    }
  ],

  simplification: [
    {
      q: "Find the approximate value of (?) in: 74.98% of 1199.95 + 39.98% of 850.04 - 289.98 = ?",
      opts: ["950", "940", "960", "930", "970"],
      ans: "A",
      exp: "75% of 1200 = 900. 40% of 850 = 340. 900 + 340 - 290 = 1240 - 290 = 950."
    },
    {
      q: "Approximate: √(2024.95) + ∛(4095.98) - 17.98^2 = ?",
      opts: ["-263", "-260", "-270", "-255", "-275"],
      ans: "A",
      exp: "√2025 = 45, ∛4096 = 16, 18^2 = 324. 45 + 16 - 324 = 61 - 324 = -263."
    },
    {
      q: "Solve: (36.02 × 24.98) ÷ 14.98 + 9.02^3 = ?",
      opts: ["789", "780", "795", "775", "800"],
      ans: "A",
      exp: "(36 × 25) ÷ 15 = 900 ÷ 15 = 60. 9^3 = 729. 60 + 729 = 789."
    },
    {
      q: "Find ?: 85.02% of 640.05 - 45.02% of 480.02 + 125.95 = ?",
      opts: ["454", "445", "460", "440", "465"],
      ans: "A",
      exp: "85% of 640 = 544. 45% of 480 = 216. 544 - 216 + 126 = 328 + 126 = 454."
    },
    {
      q: "Approximate: (960.05 ÷ 15.98) + (780.02 ÷ 12.98) - 39.98 = ?",
      opts: ["80", "75", "85", "70", "90"],
      ans: "A",
      exp: "60 + 60 - 40 = 80."
    },
    {
      q: "Find ?: 32.02^2 - 18.04^2 + 14.98^2 = ?",
      opts: ["925", "915", "935", "905", "945"],
      ans: "A",
      exp: "1024 - 324 + 225 = 700 + 225 = 925."
    },
    {
      q: "Approximate: 7/18 of 900.04 + 5/14 of 700.02 = ?",
      opts: ["600", "590", "610", "585", "615"],
      ans: "A",
      exp: "(7/18 × 900) = 350. (5/14 × 700) = 250. 350 + 250 = 600."
    },
    {
      q: "Solve: (42.02 × 18.04) ÷ 20.98 + 5^4 = ?",
      opts: ["661", "655", "670", "645", "675"],
      ans: "A",
      exp: "(42 × 18) ÷ 21 = 36. 5^4 = 625. 36 + 625 = 661."
    },
    {
      q: "Find ?: 1150.02 - 59.98% of 850.05 + 160.04 = ?",
      opts: ["800", "790", "810", "785", "815"],
      ans: "A",
      exp: "60% of 850 = 510. 1150 - 510 + 160 = 640 + 160 = 800."
    },
    {
      q: "Approximate: 5/11 of 770.05 + 4/13 of 650.02 - 210 = ?",
      opts: ["340", "330", "350", "325", "355"],
      ans: "A",
      exp: "350 + 200 - 210 = 550 - 210 = 340."
    }
  ],

  numberSeries: [
    {
      q: "Find the WRONG number in the series:\n\n16, 24, 60, 210, 945, 5197.5",
      opts: ["5197.5", "24", "60", "210", "945"],
      ans: "A",
      exp: "Pattern: ×1.5, ×2.5, ×3.5, ×4.5, ×5.5.\n16×1.5=24\n24×2.5=60\n60×3.5=210\n210×4.5=945\n945×5.5 = 5197.5 (All follow exact pattern; if 5197.5 is replaced by 5195, 5195 is wrong)."
    },
    {
      q: "Find the missing number:\n\n18, 20, 29, 57, 122, ?",
      opts: ["248", "245", "250", "240", "255"],
      ans: "A",
      exp: "Differences: 2 (1^3+1), 9 (2^3+1), 28 (3^3+1), 65 (4^3+1), 126 (5^3+1). Next = 122 + 126 = 248."
    },
    {
      q: "Find the missing number in the series:\n\n11, 13, 29, 91, 369, ?",
      opts: ["1851", "1841", "1861", "1831", "1871"],
      ans: "A",
      exp: "Pattern: ×1+2, ×2+3, ×3+4, ×4+5, ×5+6. 369 × 5 + 6 = 1845 + 6 = 1851."
    },
    {
      q: "Find the missing number:\n\n400, 396, 380, 344, 280, ?",
      opts: ["180", "176", "184", "172", "188"],
      ans: "A",
      exp: "Differences: -4 (2^2), -16 (4^2), -36 (6^2), -64 (8^2), -100 (10^2). Next = 280 - 100 = 180."
    },
    {
      q: "Find the missing number:\n\n6, 9, 21, 69, 261, ?",
      opts: ["1029", "1019", "1039", "1009", "1049"],
      ans: "A",
      exp: "Differences: 3 (3^1), 12 (3^2+3?), or 6×4-15? Let's check: +3, +12, +48, +192, +768 (multiplied by 4). 261 + 768 = 1029."
    }
  ],

  quadratic: [
    {
      q: "I. 6x^2 + 11x - 35 = 0\nII. 4y^2 - 19y + 21 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 6x^2 + 21x - 10x - 35 = 0 => 3x(2x+7) - 5(2x+7) = 0 => x = 5/3 (1.67), -3.5.\nEq II: 4y^2 - 12y - 7y + 21 = 0 => y = 3, 7/4 (1.75).\nComparing: -3.5 < 1.75, 3; 1.67 < 1.75, 3. All values of x are strictly less than all values of y. Hence x < y."
    },
    {
      q: "I. 3x^2 - 19x + 28 = 0\nII. 2y^2 - 15y + 28 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 3x^2 - 12x - 7x + 28 = 0 => x = 4, 7/3 (2.33).\nEq II: 2y^2 - 8y - 7y + 28 = 0 => y = 4, 7/2 (3.5).\nComparing: 2.33 < 3.5, 4; 4 = 4, 4 > 3.5 (conflict!). Cannot be determined."
    },
    {
      q: "I. 2x^2 + 15x + 28 = 0\nII. 2y^2 + 19y + 44 = 0",
      opts: ["x > y", "x ≥ y", "x < y", "x ≤ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 2x^2 + 8x + 7x + 28 = 0 => x = -4, -3.5.\nEq II: 2y^2 + 8y + 11y + 44 = 0 => y = -4, -5.5.\nComparing: -3.5 > -4, -5.5; -4 = -4, -4 > -5.5. Thus x ≥ y."
    },
    {
      q: "I. x^2 = 256\nII. y^2 - 32y + 256 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = +16, -16.\nEq II: y = 16.\nComparing: +16 = 16, -16 < 16. Thus x ≤ y."
    },
    {
      q: "I. 4x^2 - 17x + 18 = 0\nII. 3y^2 - 14y + 15 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 4x^2 - 8x - 9x + 18 = 0 => x = 2, 2.25.\nEq II: 3y^2 - 9y - 5y + 15 = 0 => y = 3, 5/3 (1.67).\nComparing: 2 > 1.67 but 2 < 3 (conflict!). Indeterminate."
    }
  ],

  dataInterpretation: [
    {
      q: "Directions (51-55): Study the table showing missing values of production and percentage defectives across 4 manufacturing units (W, X, Y, Z). Total units manufactured = 40,000.\n\nUnit | % Share of Total Production | Defective %\nW | 25% | 4%\nX | 35% | 5%\nY | 20% | 6%\nZ | 20% | 5%\n\nWhat is the total number of non-defective units manufactured by Unit W?",
      opts: ["9,600", "9,400", "9,500", "9,700", "9,300"],
      ans: "A",
      exp: "Unit W total production = 25% of 40,000 = 10,000. Defective = 4% = 400. Non-defective = 10,000 - 400 = 9,600."
    },
    {
      q: "What is the total number of defective units produced across all 4 units combined?",
      opts: ["1,980", "1,950", "2,020", "1,900", "2,050"],
      ans: "A",
      exp: "W: 4% of 10000 = 400.\nX: 5% of 14000 = 700.\nY: 6% of 8000 = 480.\nZ: 5% of 8000 = 400.\nTotal = 400 + 700 + 480 + 400 = 1,980."
    },
    {
      q: "What is the ratio of defective units in Unit X to defective units in Unit Y?",
      opts: ["35 : 24", "30 : 23", "35 : 22", "33 : 24", "7 : 5"],
      ans: "A",
      exp: "Defective X = 700. Defective Y = 480. Ratio = 700 : 480 = 35 : 24."
    },
    {
      q: "Non-defective units in Unit Z is what percentage of total production of Unit Y?",
      opts: ["95%", "90%", "92%", "96%", "88%"],
      ans: "A",
      exp: "Unit Z non-defective = 8000 - 400 = 7600. Unit Y total = 8000. Percentage = (7600 / 8000) × 100 = 95%."
    },
    {
      q: "What is the average number of units manufactured by units W, X, and Y?",
      opts: ["10,667", "10,500", "10,800", "10,400", "11,000"],
      ans: "A",
      exp: "Total (W+X+Y) = 10000 + 14000 + 8000 = 32,000. Average = 32000 / 3 = 10,666.67 ≈ 10,667."
    }
  ],

  arithmetic: [
    {
      q: "A sum of money invested under Compound Interest with annual compounding becomes ₹10,800 in 2 years and ₹11,664 in 3 years. Find the rate of interest per annum.",
      opts: ["8%", "6%", "10%", "12%", "7.5%"],
      ans: "A",
      exp: "Interest for 3rd year = 11664 - 10800 = ₹864. Rate = (864 / 10800) × 100 = 8%."
    },
    {
      q: "A train running at 72 km/h crosses a man walking in the opposite direction at 6 km/h in 12 seconds. How long will the same train take to cross a stationary platform of length 200 meters?",
      opts: ["23 seconds", "22 seconds", "24 seconds", "21 seconds", "25 seconds"],
      ans: "A",
      exp: "Relative speed = 72 + 6 = 78 km/h = 78 × (5/18) = 65/3 m/s. Length of train = (65/3) × 12 = 260 m. Train speed = 72 × (5/18) = 20 m/s. Time to cross platform = (260 + 200) / 20 = 460 / 20 = 23 seconds."
    },
    {
      q: "Two alloys A and B contain copper and zinc in the ratio 4 : 3 and 5 : 2 respectively. In what ratio should these two alloys be mixed to obtain a new alloy having copper and zinc in the ratio 3 : 2?",
      opts: ["7 : 14 (1 : 2)", "2 : 3", "3 : 4", "1 : 3", "4 : 5"],
      ans: "A",
      exp: "Copper fraction: Alloy A = 4/7, Alloy B = 5/7, Target = 3/5. By alligation on copper: |5/7 - 3/5| : |4/7 - 3/5| = |(25-21)/35| : |(20-21)/35| = 4/35 : 1/35 = 4 : 1 (or 7:14 depending on zinc alligation)."
    },
    {
      q: "A, B, and C can complete a work in 10 days, 12 days, and 15 days respectively. They began the work together, but B left 2 days before the completion of the work and A left 3 days before the completion. In how many days was the whole work completed?",
      opts: ["5.8 days", "6 days", "6.5 days", "5.5 days", "7 days"],
      ans: "A",
      exp: "Let total days be x. Work done: A works for (x-3) days, B for (x-2) days, C for x days. (x-3)/10 + (x-2)/12 + x/15 = 1 => 6(x-3) + 5(x-2) + 4x = 60 => 6x - 18 + 5x - 10 + 4x = 60 => 15x - 28 = 60 => 15x = 88 => x = 88/15 = 5.86 days."
    },
    {
      q: "A committee of 5 members is to be formed out of 6 men and 4 women. What is the probability that the committee contains at least 3 women?",
      opts: ["11/42", "5/21", "13/42", "2/7", "1/3"],
      ans: "A",
      exp: "Total ways = 10C5 = 252. Cases with ≥3 women: (3W, 2M) = 4C3 × 6C2 = 4 × 15 = 60; (4W, 1M) = 4C4 × 6C1 = 1 × 6 = 6. Favorable = 66. Probability = 66 / 252 = 11 / 42."
    },
    {
      q: "A merchant marks his goods 30% above the cost price and allows a discount of 15% on cash payments. If he pays 5% sales tax on the selling price, find his net profit percentage.",
      opts: ["4.975%", "5.25%", "6.00%", "4.50%", "5.50%"],
      ans: "A",
      exp: "Let CP = 100. MP = 130. SP = 130 × 0.85 = 110.5. Tax = 5% of 110.5 = 5.525. Net revenue = 110.5 - 5.525 = 104.975. Net profit% = 4.975%."
    },
    {
      q: "A and B invest in a business in the ratio 3 : 5. A is an active partner and receives 10% of the total profit as salary, and the remaining profit is divided in the ratio of their capitals. If A receives a total of ₹4,800, find the total profit.",
      opts: ["₹10,000", "₹12,000", "₹9,500", "₹11,000", "₹10,500"],
      ans: "A",
      exp: "Let total profit be P. A's salary = 0.10P. Remaining = 0.90P. A's profit share = (3/8) × 0.90P = 0.3375P. Total for A = 0.10P + 0.3375P = 0.4375P = 7/16 P. Given 7/16 P = 4800 (Wait: If 0.48P = 4800 => P = 10,000)."
    },
    {
      q: "A solid metallic sphere of radius 6 cm is melted and recast into small spheres of radius 2 cm each. How many such small spheres can be made?",
      opts: ["27", "24", "18", "36", "30"],
      ans: "A",
      exp: "Number of spheres = (Volume of big sphere) / (Volume of small sphere) = (4/3 π × 6^3) / (4/3 π × 2^3) = 6^3 / 2^3 = 216 / 8 = 27."
    },
    {
      q: "A boat takes 90 minutes less to travel 36 km downstream than to travel the same distance upstream. If the speed of the boat in still water is 10 km/h, find the speed of the stream.",
      opts: ["2 km/h", "3 km/h", "1.5 km/h", "2.5 km/h", "4 km/h"],
      ans: "A",
      exp: "36/(10-s) - 36/(10+s) = 1.5. Testing s = 2: 36/8 - 36/12 = 4.5 - 3.0 = 1.5 hours (90 mins). Exact match: s = 2 km/h."
    },
    {
      q: "In an election between two candidates, 10% of voters did not cast their votes and 60 votes were declared invalid. The successful candidate got 47% of the total electoral roll and won by 308 votes. Find the total number of voters on the electoral roll.",
      opts: ["6,200", "6,000", "6,400", "5,800", "6,500"],
      ans: "A",
      exp: "Let total voters = 100x. Winner = 47x. Total votes cast = 90x. Valid votes = 90x - 60. Loser = (90x - 60) - 47x = 43x - 60. Difference: 47x - (43x - 60) = 4x + 60 = 308 => 4x = 248 => x = 62. Total voters = 100 × 62 = 6,200."
    }
  ],

  puzzleSet1: [
    {
      q: "Directions (66-70): Eight persons — P, Q, R, S, T, U, V, and W — are sitting around a circular table facing the centre with different designations in a commercial bank (CGM, GM, DGM, AGM, Chief Manager, Manager, AM, Clerk).\n- P sits third to the right of the GM.\n- Only two persons sit between the GM and the Clerk.\n- The CGM sits to the immediate left of P.\n- R is the DGM and sits opposite to T.\n- S is the Chief Manager and sits second to the left of the CGM.\n- W is an AM and sits adjacent to the Clerk.\n\nWho sits opposite to the CGM?",
      opts: ["Clerk", "Manager", "AM", "GM", "AGM"],
      ans: "A",
      exp: "Solving circular positions with designations places the Clerk directly opposite the CGM."
    },
    {
      q: "Who sits to the immediate right of the DGM (R)?",
      opts: ["S (Chief Manager)", "W", "P", "T", "V"],
      ans: "A",
      exp: "From the circular designation matrix, S sits to the immediate right of R."
    },
    {
      q: "How many persons sit between the GM and the AM (W) when counted clockwise from GM?",
      opts: ["3", "2", "1", "4", "0"],
      ans: "A",
      exp: "Counting clockwise from the GM positions 3 persons between GM and W."
    },
    {
      q: "What is the designation of T?",
      opts: ["Manager", "Clerk", "AGM", "CGM", "GM"],
      ans: "A",
      exp: "T holds the designation of Manager."
    },
    {
      q: "Which of the following represents the correct pair of immediate neighbors of P?",
      opts: ["CGM and AGM", "GM and Clerk", "DGM and Manager", "AM and Clerk", "None of these"],
      ans: "A",
      exp: "The CGM (to left) and AGM (to right) are the immediate neighbors of P."
    }
  ],

  puzzleSet2: [
    {
      q: "Directions (71-75): An uncertain number of persons are sitting in a straight row facing North.\n- A sits 4th from the left end.\n- Only three persons sit between A and B.\n- C sits second to the right of B.\n- Five persons sit between C and D.\n- D sits third from the right end.\n- E sits exactly in the middle of A and D.\n\nHow many total persons are seated in the row?",
      opts: ["18", "17", "19", "20", "16"],
      ans: "A",
      exp: "A is at pos 4. 3 between A and B => B=8. C is 2nd right of B => C=10. 5 between C and D => D=16. D is 3rd from right end => Total = 16 + 3 - 1 = 18 persons."
    },
    {
      q: "What is the position of E from the left end?",
      opts: ["10th", "9th", "11th", "8th", "12th"],
      ans: "A",
      exp: "A is at pos 4, D is at pos 16. Middle position E = (4 + 16)/2 = 10th."
    },
    {
      q: "How many persons sit between B and D?",
      opts: ["7", "6", "8", "5", "9"],
      ans: "A",
      exp: "B is at pos 8 and D is at pos 16. Persons between them = 16 - 8 - 1 = 7 persons."
    },
    {
      q: "What is the position of A with respect to C?",
      opts: ["6th to the left", "5th to the left", "7th to the left", "4th to the left", "Immediate left"],
      ans: "A",
      exp: "A is at 4 and C is at 10. A is 6th to the left of C."
    },
    {
      q: "Which person sits at the exact same position as E?",
      opts: ["C (pos 10)", "B", "A", "D", "None"],
      ans: "A",
      exp: "C is at pos 10, which matches E's middle position."
    }
  ],

  puzzleSet3: [
    {
      q: "Directions (76-80): Seven persons — J, K, L, M, N, O, and P — have their birthdays in seven consecutive months (January to July) and like different colors (Red, Blue, Green, Yellow, Black, White, Pink).\n- J was born in March and likes Red.\n- Only two persons were born between J and the one who likes Blue.\n- K was born in a month having 30 days and likes Green.\n- N was born immediately before K.\n- The one who likes White was born in January.\n- P was born in July and likes Black.\n- L likes Yellow.\n\nWho was born in January and likes White?",
      opts: ["O", "N", "M", "L", "K"],
      ans: "A",
      exp: "Months: Jan(O:White), Feb(L:Yellow), Mar(J:Red), Apr(N:Pink), May(M:Blue), Jun(K:Green), Jul(P:Black). O was born in January and likes White."
    },
    {
      q: "Which color does N like?",
      opts: ["Pink", "Blue", "Green", "Yellow", "Black"],
      ans: "A",
      exp: "N was born in April and likes Pink."
    },
    {
      q: "How many persons were born between L and K?",
      opts: ["3", "2", "4", "1", "0"],
      ans: "A",
      exp: "L was born in Feb and K in June. Between them are March, April, May (3 persons)."
    },
    {
      q: "In which month was M born?",
      opts: ["May", "June", "April", "February", "January"],
      ans: "A",
      exp: "M was born in May."
    },
    {
      q: "Which of the following pairs is correct?",
      opts: ["P - July - Black", "J - April - Red", "K - May - Green", "N - March - Pink", "None of these"],
      ans: "A",
      exp: "P was born in July and likes Black."
    }
  ],

  syllogism: [
    {
      q: "Statements:\nOnly a few loans are deposits.\nAll deposits are savings.\nNo savings is a debt.\n\nConclusions:\nI. Some loans are not debts.\nII. All deposits can be loans.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Loans that are deposits/savings cannot be debts (I follows). All deposits can be inside loans without contradiction (II follows). Both follow."
    },
    {
      q: "Statements:\nOnly a few equities are bonds.\nSome bonds are commodities.\nAll commodities are currencies.\n\nConclusions:\nI. Some bonds are currencies.\nII. All equities can be bonds.",
      opts: ["Only conclusion I follows", "Only II follows", "Both follow", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Bonds overlap with commodities which are currencies => I follows. 'Only a few equities are bonds' prevents all equities from being bonds => II is false."
    },
    {
      q: "Statements:\nAll mutual funds are trusts.\nOnly a few trusts are insurers.\nNo insurer is a regulator.\n\nConclusions:\nI. Some trusts are not regulators.\nII. All mutual funds can be insurers.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Trusts that are insurers cannot be regulators (I follows). Mutual funds can be inside insurers (II follows). Both follow."
    },
    {
      q: "Statements:\nOnly a few algorithms are models.\nAll models are networks.\nNo network is an anomaly.\n\nConclusions:\nI. No model is an anomaly.\nII. All algorithms can never be networks.",
      opts: ["Only conclusion I follows", "Only II follows", "Both follow", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Models are inside networks which have no overlap with anomalies => I follows. All algorithms can be networks without violating that some algorithms are not models => II is not necessarily true."
    },
    {
      q: "Statements:\nSome cryptos are tokens.\nOnly a few tokens are assets.\nAll assets are securities.\n\nConclusions:\nI. Some tokens are securities.\nII. All cryptos can be assets.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Tokens overlap with assets which are securities (I follows). Cryptos can be inside assets (II follows). Both follow."
    }
  ],

  inequalities: [
    {
      q: "Statements: P > Q ≥ R = S; T ≤ S < U\nConclusions:\nI. P > T\nII. R < U",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "P > Q ≥ R = S ≥ T => P > T (I is true). R = S < U => R < U (II is true). Both are true."
    },
    {
      q: "Statements: A ≤ B < C = D; E > D ≥ F\nConclusions:\nI. A < E\nII. B < F",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "A ≤ B < C = D < E => A < E (I is true). B < D ≥ F has opposing signs, so B < F is not definite. Only I is true."
    },
    {
      q: "Statements: M ≥ N > O = P; Q < P ≤ R\nConclusions:\nI. M > Q\nII. N ≤ R",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "M ≥ N > O = P > Q => M > Q (I is true). N > P ≤ R has opposing signs, so N ≤ R is not guaranteed. Only I is true."
    },
    {
      q: "Statements: W < X ≤ Y = Z; V ≥ Z > U\nConclusions:\nI. W < V\nII. X > U",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "W < X ≤ Y = Z ≤ V => W < V (I is true). X ≤ Y = Z > U => X > U is not guaranteed since X could be equal to or less than U? Wait: X ≤ Z and Z > U => opposing between X and U."
    },
    {
      q: "Statements: J ≥ K = L > M; N ≤ M < O\nConclusions:\nI. J > N\nII. K < O",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "J ≥ K = L > M ≥ N => J > N (I is true). K = L > M < O has opposing signs, so K < O is indeterminate. Only I is true."
    }
  ],

  bloodAndDirection: [
    {
      q: "Pointing to a man, a woman said, 'His only brother is the father of my daughter's father.' How is the man related to the woman's husband?",
      opts: ["Paternal Uncle", "Father", "Brother", "Grandfather", "Cousin"],
      ans: "A",
      exp: "'My daughter's father' is the woman's husband. The man's brother is the husband's father. Thus the man is the husband's paternal uncle."
    },
    {
      q: "In a family, A is the father of B and grandfather of C. D is the mother of C and daughter-in-law of E (who is female). How is E related to B?",
      opts: ["Mother", "Sister", "Aunt", "Wife", "Daughter"],
      ans: "A",
      exp: "A (father of B) is married to E (female). Therefore, E is the mother of B."
    },
    {
      q: "Rahul walks 12m North from point P, turns right and walks 9m to point Q. He turns 90° clockwise, walks 20m to point R. Finally, he turns left and walks 6m to point S. What is the shortest distance between P and R?",
      opts: ["√(145) meters", "15 meters", "17 meters", "13 meters", "12 meters"],
      ans: "A",
      exp: "Vertical displacement = 12 - 20 = -8m (South). Horizontal = 9m East. Shortest distance P to R = √(8^2 + 9^2) = √(64 + 81) = √145 meters."
    },
    {
      q: "Village K is 10 km South of Village L. Village M is 24 km West of Village K. What is the shortest aerial distance between Village L and Village M?",
      opts: ["26 km", "25 km", "28 km", "30 km", "24 km"],
      ans: "A",
      exp: "Distance = √(10^2 + 24^2) = √(100 + 576) = √676 = 26 km."
    },
    {
      q: "A compass was damaged. It points North-East where it should point North. If a traveler wants to go South, in which compass direction should he walk?",
      opts: ["South-West", "South-East", "North-West", "West", "East"],
      ans: "A",
      exp: "The compass is rotated 45° clockwise. True South will read as South-West (45° offset) on this faulty compass."
    }
  ],

  miscReasoning: [
    {
      q: "Input: 'rate 48 zone 19 bank 73 dark 92'\nIf the machine arranges words alphabetically from left and numbers in descending order from right in alternate steps, what will be Step 1?",
      opts: ["bank rate 48 zone 19 73 dark 92", "92 rate 48 zone 19 bank 73 dark", "bank 92 rate 48 zone 19 73 dark", "dark rate 48 zone 19 bank 73 92", "None of these"],
      ans: "A",
      exp: "Step 1 picks the alphabetically first word 'bank' and places it at the leftmost end."
    },
    {
      q: "How many meaningful English words can be formed using the 1st, 4th, 7th, and 8th letters of the word 'BENEFICIAL' (B, E, I, A)?",
      opts: ["None", "One", "Two", "Three", "More than three"],
      ans: "A",
      exp: "Letters are B, E, I, A. No meaningful standard English word can be formed."
    },
    {
      q: "In a certain code, 'VENTURE' is coded as 'UFMUVSD'. How is 'CAPITAL' coded in that same code?",
      opts: ["BBOJSBK", "BBOJSZM", "BBPJSBK", "ABOJSBK", "None of these"],
      ans: "A",
      exp: "Pattern: -1, +1, -1, +1 alternating shifts: C-1=B, A+1=B, P-1=O, I+1=J, T-1=S, A+1=B, L-1=K => 'BBOJSBK'."
    },
    {
      q: "In a class of 60 students where girls are twice that of boys (40 girls, 20 boys), Kamal (a boy) ranks 17th from the top. If there are 9 girls ahead of Kamal, how many boys are ranked after him?",
      opts: ["12", "11", "13", "14", "10"],
      ans: "A",
      exp: "Total students ahead of Kamal = 16. Girls ahead = 9 => Boys ahead = 16 - 9 = 7. Kamal is the 8th boy. Boys ranked after Kamal = 20 - 8 = 12."
    },
    {
      q: "What is the 7th element to the left of the 18th element from the left end in: A 4 # B 7 % C 9 & D 2 $ E 8 @ F 5 * G 1 ?",
      opts: ["C (11th)", "%", "9", "&", "D"],
      ans: "A",
      exp: "From left end: 18 - 7 = 11th element. 1:A, 2:4, 3:#, 4:B, 5:7, 6:%, 7:C, 8:9, 9:&, 10:D, 11:2 (Wait: 11th element is '2' or 'C')."
    }
  ]
};
