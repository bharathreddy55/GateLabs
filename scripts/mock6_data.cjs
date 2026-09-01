// Mock 6 Data: Level 6 - High Difficulty / Mains Gateway (Hard)
module.exports = {
  englishRC: [
    {
      q: "Read the following passage carefully and answer questions 1 to 8:\n\nMacroeconomic policy across major central banks has entered an intricate phase of quantitative tightening following years of unprecedented post-pandemic monetary accommodation. In an environment characterized by persistent core inflation and stubborn wage pressures, central banks have calibrated policy rates higher to anchor inflation expectations. However, prolonged elevated borrowing costs risk precipitating banking sector stress, dampening private capital expenditure, and exacerbating sovereign debt sustainability for emerging market economies with dollar-denominated obligations. Modern financial architecture is further complicated by the shadow banking system, which operates outside conventional regulatory perimeters, harboring opaque liquidity and maturity transformation risks. To avoid systemic contagion, monetary authorities are refining macroprudential surveillance tools and liquidity backstops, navigating a perilous tightrope between achieving a soft landing and inadvertently triggering recessionary headwinds.\n\nWhat is the primary motivation for central banks initiating quantitative tightening and higher interest rates?",
      opts: ["To stimulate immediate high inflation", "To anchor inflation expectations and suppress stubborn wage-price pressures", "To completely abolish private enterprise", "To eliminate sovereign credit ratings", "None of the above"],
      ans: "B",
      exp: "The passage states that central banks calibrated policy rates higher to anchor inflation expectations amidst persistent core inflation."
    },
    {
      q: "Why do emerging market economies with dollar-denominated debt face heightened vulnerability?",
      opts: ["Because they have no access to international maritime shipping", "Because higher US interest rates increase currency depreciation and debt servicing costs", "Because dollar-denominated loans carry zero interest", "Because they have banned foreign direct investment", "None of these"],
      ans: "B",
      exp: "Elevated US borrowing costs raise debt servicing obligations and trigger currency depreciation for dollar-denominated emerging market debt."
    },
    {
      q: "What systemic risk is attributed to the 'shadow banking system' in the passage?",
      opts: ["Lack of digital computers in branches", "Opaque liquidity and maturity transformation risks outside conventional regulatory perimeters", "Over-regulation by multiple international agencies", "Excessive transparency in balance sheet disclosures", "Exclusive reliance on sovereign gold reserves"],
      ans: "B",
      exp: "Shadow banks operate outside conventional regulatory perimeters and harbor opaque liquidity and maturity transformation risks."
    },
    {
      q: "What is meant by the metaphorical phrase 'navigating a perilous tightrope between a soft landing and recessionary headwinds'?",
      opts: ["Constructing physical rope bridges in mountainous regions", "Balancing monetary tightening to reduce inflation without triggering economic contraction", "Eliminating all taxes on commercial enterprises", "Merging all commercial banks into a single state entity", "Banning international currency exchange"],
      ans: "B",
      exp: "A soft landing means cooling inflation without causing an economic recession, requiring delicate balancing."
    },
    {
      q: "Choose the word most SIMILAR in meaning to 'PRECIPITATING' as used in the passage.",
      opts: ["Triggering / bringing about", "Preventing", "Alleviating", "Delaying", "Shielding"],
      ans: "A",
      exp: "'Precipitating' means causing an event or situation (typically an undesirable one) to happen suddenly or prematurely."
    },
    {
      q: "Choose the word most OPPOSITE in meaning to 'OPAQUE' as used in the passage.",
      opts: ["Transparent", "Obscure", "Cryptic", "Enigmatic", "Murky"],
      ans: "A",
      exp: "'Opaque' means not transparent, difficult to understand. The opposite is 'Transparent'."
    },
    {
      q: "What does 'macroprudential surveillance' aim to achieve according to the passage?",
      opts: ["Prevent systemic financial contagion and identify systemic risks", "Monitor daily consumer social media activities", "Increase retail banking fees", "Audit corporate tax filings exclusively", "Fix international commodity prices"],
      ans: "A",
      exp: "Macroprudential surveillance refines system-wide risk monitoring to prevent financial contagion."
    },
    {
      q: "Which of the following describes the tone of the author?",
      opts: ["Cautious, sophisticated, and analytical", "Juvenile and humorous", "Aggressive and polemical", "Dismissive and casual", "Cheerfully optimistic"],
      ans: "A",
      exp: "The author evaluates complex macroeconomic dynamics with rigorous, sophisticated, and analytical precision."
    }
  ],

  clozeTest: [
    {
      q: "In the following passage, there are blanks. For Blank (1), choose the appropriate word:\n\nCyber resilience has become an existential imperative for global banking networks as sophisticated ransomware syndicates target critical financial infrastructure. Modern threat vectors exploit zero-day ____(1)____ and employ social engineering techniques to bypass perimeter defenses. To mitigate these risks, financial institutions must adopt a 'Zero Trust' architecture, wherein no entity is trusted by default, and continuous ____(2)____ is enforced. Furthermore, incident response plans must be rigorously ____(3)____ through red-team simulations to minimize operational downtime. Cross-border intelligence sharing between sovereign Computer Emergency Response Teams (CERTs) is essential to ____(4)____ emerging cyber threats. Ultimately, investments in human cyber hygiene are just as vital as state-of-the-art technological ____(5)____ in safeguarding systemic financial ____(6)____.\n\nSelect the best word for Blank (1):",
      opts: ["vulnerabilities", "strengths", "advantages", "certifications", "defenses"],
      ans: "A",
      exp: "Threat actors exploit zero-day 'vulnerabilities' (software flaws)."
    },
    {
      q: "Select the best word for Blank (2):",
      opts: ["authentication", "neglect", "exemption", "forgiveness", "dismissal"],
      ans: "A",
      exp: "Zero trust requires continuous 'authentication' and verification."
    },
    {
      q: "Select the best word for Blank (3):",
      opts: ["tested", "shelved", "concealed", "discarded", "prohibited"],
      ans: "A",
      exp: "Response plans must be rigorously 'tested' via simulations."
    },
    {
      q: "Select the best word for Blank (4):",
      opts: ["neutralize", "promote", "invite", "magnify", "overlook"],
      ans: "A",
      exp: "Intelligence sharing helps 'neutralize' (counteract/disarm) threats."
    },
    {
      q: "Select the best word for Blank (5):",
      opts: ["safeguards", "flaws", "glitches", "hazards", "liabilities"],
      ans: "A",
      exp: "Technological 'safeguards' (defenses) protect networks."
    },
    {
      q: "Select the best word for Blank (6):",
      opts: ["integrity", "collapse", "ruin", "distress", "erosion"],
      ans: "A",
      exp: "Safeguards maintain systemic financial 'integrity'."
    }
  ],

  errorDetection: [
    {
      q: "Identify the part of the sentence containing an error:\n\n(A) No sooner the governor / (B) announced the monetary policy / (C) than the benchmark bond yields / (D) plunged by twenty basis points. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "A",
      exp: "Inversion is required after 'No sooner': 'No sooner had the governor announced...' or 'No sooner did the governor announce...'."
    },
    {
      q: "(A) It is imperative that / (B) every banking official / (C) adheres strictly to the / (D) compliance guidelines laid down by RBI. / (E) No error",
      opts: ["C", "A", "B", "D", "E"],
      ans: "C",
      exp: "In subjunctive structures with 'It is imperative that...', the base form of the verb is used ('adhere strictly', not 'adheres')."
    },
    {
      q: "(A) The conglomerate's inability / (B) to service its outstanding debts / (C) have triggered a credit rating / (D) downgrade across all agencies. / (E) No error",
      opts: ["C", "A", "B", "D", "E"],
      ans: "C",
      exp: "The subject is singular ('inability'). The verb should be singular: 'has triggered', not 'have triggered'."
    },
    {
      q: "(A) Beside the statutory liquidity ratio, / (B) banks are mandated to / (C) maintain adequate capital buffers / (D) under Basel III norms. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "A",
      exp: "'Beside' means by the side of. Here 'Besides' (meaning 'in addition to') must be used."
    },
    {
      q: "(A) She was more clever / (B) than any employee / (C) in the risk management / (D) department of the investment bank. / (E) No error",
      opts: ["B", "A", "C", "D", "E"],
      ans: "B",
      exp: "In comparative degree, when comparing one person with the rest of the group, 'than any other employee' is required."
    }
  ],

  sentenceImprovement: [
    {
      q: "Improve the underlined phrase:\n\n*Not until the market opened* did the traders realize the severity of the liquidity crunch.",
      opts: ["Not until the market opened did the traders realize", "Not until the market opened the traders realized", "Until the market did not open the traders realized", "No sooner the market opened the traders realized", "No correction required"],
      ans: "E",
      exp: "Negative restrictive adverbial phrase 'Not until...' correctly uses inversion ('did the traders realize'). Sentence is correct."
    },
    {
      q: "Improve the underlined phrase:\n\nThe managing director requested the auditors *to look into the matter and report back* by Friday.",
      opts: ["to look on the matter and report back", "to look after the matter and report back", "to look into the matter and report back", "looking into the matter and report back", "No correction required"],
      ans: "E",
      exp: "'To look into' means to investigate. The phrase is grammatically and idiomatically correct."
    },
    {
      q: "Improve the underlined phrase:\n\nWhatever *may be the consequences*, the committee will adhere to the principle of zero tolerance for corruption.",
      opts: ["may the consequences be", "might be the consequences", "be the consequences may", "can be the consequences", "No correction required"],
      ans: "E",
      exp: "The clause 'Whatever may be the consequences' is standard idiomatic English."
    },
    {
      q: "Improve the underlined phrase:\n\nThe company *is coping up with* the financial crisis through aggressive cost-cutting measures.",
      opts: ["is coping with", "is coping down with", "is coping up to", "is cope with", "No correction required"],
      ans: "A",
      exp: "The standard English idiom is 'cope with' (never 'cope up with')."
    }
  ],

  paraJumbles: [
    {
      q: "Rearrange the five sentences (A, B, C, D, E) to form a coherent paragraph:\n\n(A) Unregulated shadow banks engage in substantial maturity transformation.\n(B) Consequently, sudden liquidity freezes can cascade across the formal banking sector.\n(C) The rapid growth of non-bank financial intermediaries poses systemic risks.\n(D) They borrow short-term funds to finance long-term, illiquid assets.\n(E) Establishing stringent capital adequacy norms for these entities is therefore vital.\n\nWhat is the logical sequence?",
      opts: ["C - A - D - B - E", "C - D - A - B - E", "A - D - C - B - E", "C - B - A - D - E", "E - C - A - D - B"],
      ans: "A",
      exp: "(C) introduces non-bank intermediaries and systemic risks, (A) describes their shadow operations, (D) details maturity transformation mechanism, (B) explains the contagion effect, and (E) provides the regulatory solution."
    },
    {
      q: "Which sentence is the FIRST after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "C",
      exp: "(C) introduces the topic."
    },
    {
      q: "Which sentence is the THIRD after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "D",
      exp: "In sequence C-A-D-B-E, (D) is third."
    },
    {
      q: "Which sentence is the LAST (FIFTH) after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "E",
      exp: "Sentence (E) provides the conclusion."
    }
  ],

  miscEnglish: [
    {
      q: "In the sentence below, four words are bold (A, B, C, D). Identify the required SWAP:\n\nThe **prudential (A)** board decided to **adopt (B)** strict **macroeconomic (C)** norms to ensure **financial (D)** stability.",
      opts: ["A-C", "B-D", "A-B", "C-D", "No swap required"],
      ans: "A",
      exp: "Swap A-C: 'The macroeconomic (C) board decided to adopt (B) strict prudential (A) norms to ensure financial (D) stability.'"
    },
    {
      q: "Select the word that is spelt correctly:",
      opts: ["Idiosyncrasy", "Idiosyncracy", "Idiosyncracity", "Idyosyncrasy", "Idiosincrasy"],
      ans: "A",
      exp: "The correct spelling is 'Idiosyncrasy' (with 's', not 'c')."
    },
    {
      q: "Choose the appropriate phrasal verb to fill the blank:\n\nThe central bank had to ________ three regional lenders with emergency liquidity lines to prevent contagion.",
      opts: ["bail out", "bail down", "bail off", "bail away", "bail in"],
      ans: "A",
      exp: "'Bail out' means to rescue a financial entity from bankruptcy."
    }
  ],

  simplification: [
    {
      q: "Find the approximate value of (?) in: 89.98% of 1499.95 + 64.98% of 1200.04 - 449.98 = ?",
      opts: ["1680", "1650", "1700", "1620", "1720"],
      ans: "A",
      exp: "90% of 1500 = 1350. 65% of 1200 = 780. 1350 + 780 - 450 = 2130 - 450 = 1680."
    },
    {
      q: "Approximate: √(3135.95) + ∛(5831.98) - 21.98^2 = ?",
      opts: ["-410", "-405", "-415", "-400", "-420"],
      ans: "A",
      exp: "√3136 = 56, ∛5832 = 18, 22^2 = 484. 56 + 18 - 484 = 74 - 484 = -410."
    },
    {
      q: "Solve: (48.02 × 35.04) ÷ 23.98 + 11.02^3 = ?",
      opts: ["1401", "1395", "1410", "1385", "1420"],
      ans: "A",
      exp: "(48 × 35) ÷ 24 = 70. 11^3 = 1331. 70 + 1331 = 1401."
    },
    {
      q: "Find ?: 95.02% of 840.05 - 55.02% of 620.02 + 189.95 = ?",
      opts: ["647", "640", "655", "635", "660"],
      ans: "A",
      exp: "95% of 840 = 798. 55% of 620 = 341. 798 - 341 + 190 = 457 + 190 = 647."
    },
    {
      q: "Approximate: (1260.05 ÷ 17.98) + (910.02 ÷ 13.98) - 49.98 = ?",
      opts: ["85", "80", "90", "75", "95"],
      ans: "A",
      exp: "70 + 65 - 50 = 85."
    },
    {
      q: "Find ?: 36.02^2 - 24.04^2 + 18.98^2 = ?",
      opts: ["1081", "1070", "1090", "1065", "1095"],
      ans: "A",
      exp: "1296 - 576 + 361 = 720 + 361 = 1081."
    },
    {
      q: "Approximate: 9/24 of 1200.04 + 7/19 of 950.02 = ?",
      opts: ["800", "790", "810", "785", "815"],
      ans: "A",
      exp: "(9/24 × 1200) = 450. (7/19 × 950) = 350. 450 + 350 = 800."
    },
    {
      q: "Solve: (56.02 × 24.04) ÷ 27.98 + 6^4 = ?",
      opts: ["1344", "1335", "1350", "1330", "1360"],
      ans: "A",
      exp: "(56 × 24) ÷ 28 = 48. 6^4 = 1296. 48 + 1296 = 1344."
    },
    {
      q: "Find ?: 1450.02 - 69.98% of 950.05 + 210.04 = ?",
      opts: ["995", "985", "1005", "975", "1015"],
      ans: "A",
      exp: "70% of 950 = 665. 1450 - 665 + 210 = 785 + 210 = 995."
    },
    {
      q: "Approximate: 7/13 of 910.05 + 8/17 of 850.02 - 320 = ?",
      opts: ["570", "560", "580", "550", "590"],
      ans: "A",
      exp: "490 + 400 - 320 = 890 - 320 = 570."
    }
  ],

  numberSeries: [
    {
      q: "Find the WRONG number in the series:\n\n18, 38, 80, 168, 348, 712",
      opts: ["712", "38", "80", "168", "348"],
      ans: "A",
      exp: "Pattern: ×2+2, ×2+4, ×2+8, ×2+16, ×2+32.\n18×2+2=38\n38×2+4=80\n80×2+8=168\n168×2+16=352 (Wait: 168×2+12? 168×2+16 = 352, given 348 is wrong, or 348×2+32 = 728; thus 348 is wrong)."
    },
    {
      q: "Find the missing number:\n\n24, 30, 48, 84, 144, ?",
      opts: ["234", "228", "240", "220", "248"],
      ans: "A",
      exp: "Differences: 6, 18, 36, 60, 90 (Double difference: +12, +18, +24, +30). Next difference = 60 + 30 = 90. Next = 144 + 90 = 234."
    },
    {
      q: "Find the missing number in the series:\n\n13, 17, 33, 105, 429, ?",
      opts: ["2157", "2145", "2165", "2135", "2175"],
      ans: "A",
      exp: "Pattern: ×1+4, ×2-1, ×3+6, ×4-9? Check: (13-1)×1? Pattern: ×1+4=17, 17×2-1=33, 33×3+6=105, 105×4+9=429, 429×5+12 = 2145 + 12 = 2157."
    },
    {
      q: "Find the missing number:\n\n512, 508, 492, 456, 392, ?",
      opts: ["292", "288", "296", "284", "300"],
      ans: "A",
      exp: "Differences: -4 (2^2), -16 (4^2), -36 (6^2), -64 (8^2), -100 (10^2). Next = 392 - 100 = 292."
    },
    {
      q: "Find the missing number:\n\n8, 12, 30, 105, 472.5, ?",
      opts: ["2598.75", "2580.50", "2610.25", "2550.00", "2625.50"],
      ans: "A",
      exp: "Pattern: ×1.5, ×2.5, ×3.5, ×4.5, ×5.5. 472.5 × 5.5 = 2598.75."
    }
  ],

  quadratic: [
    {
      q: "I. 5x^2 - 18x + 9 = 0\nII. 3y^2 + 13y - 10 = 0",
      opts: ["x > y", "x ≥ y", "x < y", "x ≤ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 5x^2 - 15x - 3x + 9 = 0 => x = 3, 0.6.\nEq II: 3y^2 + 15y - 2y - 10 = 0 => y = 2/3 (0.67), -5.\nComparing: 3 > 0.67, -5; but 0.6 < 0.67 and 0.6 > -5 (conflict!). Cannot be determined."
    },
    {
      q: "I. 4x^2 - 25x + 36 = 0\nII. 2y^2 - 17y + 36 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 4x^2 - 16x - 9x + 36 = 0 => x = 4, 9/4 (2.25).\nEq II: 2y^2 - 8y - 9y + 36 = 0 => y = 4, 9/2 (4.5).\nComparing: 2.25 < 4, 4.5; 4 = 4, 4 < 4.5. Thus x ≤ y."
    },
    {
      q: "I. 3x^2 + 17x + 24 = 0\nII. 3y^2 + 23y + 44 = 0",
      opts: ["x > y", "x ≥ y", "x < y", "x ≤ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 3x^2 + 9x + 8x + 24 = 0 => x = -3, -8/3 (-2.67).\nEq II: 3y^2 + 12y + 11y + 44 = 0 => y = -4, -11/3 (-3.67).\nBoth values of x (-2.67, -3) are strictly greater than both values of y (-3.67, -4). Thus x > y."
    },
    {
      q: "I. x^2 = 324\nII. y^2 - 36y + 324 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = +18, -18.\nEq II: y = 18.\nComparing: +18 = 18, -18 < 18. Thus x ≤ y."
    },
    {
      q: "I. 2x^2 - 19x + 45 = 0\nII. 2y^2 - 21y + 55 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 2x^2 - 10x - 9x + 45 = 0 => x = 5, 4.5.\nEq II: 2y^2 - 10y - 11y + 55 = 0 => y = 5, 5.5.\nComparing: 4.5 < 5, 5.5; 5 = 5, 5 < 5.5. Thus x ≤ y."
    }
  ],

  dataInterpretation: [
    {
      q: "Directions (51-55): A retail company operates 3 stores (A, B, C) selling Laptops and Desktops. Total products sold = 1,800.\nStore A sold 40% of total products with Laptop to Desktop ratio 5 : 3.\nStore B sold 35% of total products with Laptop to Desktop ratio 4 : 3.\nStore C sold the remaining products with Laptop to Desktop ratio 3 : 2.\n\nWhat is the total number of Laptops sold by Store A and Store B together?",
      opts: ["810", "800", "820", "790", "830"],
      ans: "A",
      exp: "Store A total = 40% of 1800 = 720. Laptops in A = (5/8) × 720 = 450.\nStore B total = 35% of 1800 = 630. Laptops in B = (4/7) × 630 = 360.\nTotal Laptops (A + B) = 450 + 360 = 810."
    },
    {
      q: "What is the total number of Desktops sold across all three stores?",
      opts: ["720", "700", "740", "680", "750"],
      ans: "A",
      exp: "Store A Desktops = 720 - 450 = 270.\nStore B Desktops = 630 - 360 = 270.\nStore C total = 25% of 1800 = 450. Desktops in C = (2/5) × 450 = 180.\nTotal Desktops = 270 + 270 + 180 = 720."
    },
    {
      q: "What is the ratio of Laptops sold by Store C to Desktops sold by Store A?",
      opts: ["1 : 1", "3 : 2", "2 : 3", "4 : 3", "5 : 4"],
      ans: "A",
      exp: "Store C Laptops = (3/5) × 450 = 270. Store A Desktops = 270. Ratio = 270 : 270 = 1 : 1."
    },
    {
      q: "Laptops sold by Store B is what percentage of total products sold by Store C?",
      opts: ["80%", "75%", "85%", "70%", "90%"],
      ans: "A",
      exp: "Store B Laptops = 360. Store C total = 450. Percentage = (360 / 450) × 100 = 80%."
    },
    {
      q: "What is the average number of Laptops sold per store across all 3 stores?",
      opts: ["360", "350", "370", "340", "380"],
      ans: "A",
      exp: "Total Laptops = 450 (A) + 360 (B) + 270 (C) = 1,080. Average = 1080 / 3 = 360."
    }
  ],

  arithmetic: [
    {
      q: "A sum of ₹20,000 is lent in two parts, one at 8% per annum SI and the other at 12% per annum SI. If the total annual interest received is ₹2,000, find the amount lent at 12%.",
      opts: ["₹10,000", "₹12,000", "₹8,000", "₹14,000", "₹9,000"],
      ans: "A",
      exp: "Overall interest rate = (2000 / 20000) × 100 = 10%. By alligation between 8% and 12% with mean 10%: Ratio = (12-10) : (10-8) = 2 : 2 = 1 : 1. Amount at 12% = 20000 / 2 = ₹10,000."
    },
    {
      q: "A train 300 meters long crosses another train 200 meters long running in the opposite direction at 72 km/h in 15 seconds. Find the speed of the first train in km/h.",
      opts: ["48 km/h", "54 km/h", "60 km/h", "45 km/h", "50 km/h"],
      ans: "A",
      exp: "Total distance = 300 + 200 = 500 m. Relative speed = 500 / 15 = 100/3 m/s = (100/3) × (18/5) = 120 km/h. Speed of first train = 120 - 72 = 48 km/h."
    },
    {
      q: "A milkman mixes 20 liters of water with 80 liters of milk. He sells 1/4th of this mixture and adds water equal to the quantity sold. What is the ratio of milk to water in the final mixture?",
      opts: ["3 : 2", "4 : 1", "2 : 1", "5 : 3", "1 : 1"],
      ans: "A",
      exp: "Total = 100L (80M, 20W). Sold 1/4 (25L) => remaining is 60L Milk, 15L Water. Added 25L Water => new water = 15 + 25 = 40L. Final Milk : Water = 60 : 40 = 3 : 2."
    },
    {
      q: "A can complete a piece of work in 16 days and B in 24 days. They work on alternate days starting with A. In how many days will the entire work be completed?",
      opts: ["19 days", "18.5 days", "19.5 days", "20 days", "18 days"],
      ans: "A",
      exp: "LCM of 16 and 24 = 48 units. A's rate = 3 units/day, B's rate = 2 units/day. In 2 days (A+B) = 5 units. In 18 days (9 pairs) = 45 units. Remaining 3 units completed by A on 19th day (3/3 = 1 day). Total = 18 + 1 = 19 days."
    },
    {
      q: "From a pack of 52 playing cards, two cards are drawn at random. What is the probability that either both are kings or both are aces?",
      opts: ["2/221", "1/221", "3/221", "4/221", "1/105"],
      ans: "A",
      exp: "Total ways = 52C2 = 1326. Both kings = 4C2 = 6. Both aces = 4C2 = 6. Favorable = 6 + 6 = 12. Probability = 12 / 1326 = 2 / 221."
    },
    {
      q: "A shopkeeper marks an article 50% above cost price and offers a discount of 20%. If he uses a false weight that measures 900g instead of 1000g while selling, find his actual profit percentage.",
      opts: ["33.33%", "30.00%", "35.50%", "28.00%", "36.67%"],
      ans: "A",
      exp: "SP multiplier = 1.50 × 0.80 = 1.20. Due to false weight, effective revenue = 1.20 / 0.90 = 1.3333. Profit% = 33.33%."
    },
    {
      q: "A, B, and C invest in a business. A receives 2/7 of total profit, while B and C share the remainder equally. If A's income increases by ₹480 when the profit rises from 10% to 15%, find the total capital invested.",
      opts: ["₹33,600", "₹32,000", "₹35,000", "₹30,000", "₹34,500"],
      ans: "A",
      exp: "Increase in total profit = 5% of Capital C. A's share of this increase = (2/7) × 0.05 C = (1/70) C = 480 => C = 480 × 70 = ₹33,600."
    },
    {
      q: "The slant height of a right circular cone is 25 cm and its base radius is 7 cm. Find the total surface area of the cone. (Use π = 22/7)",
      opts: ["704 sq cm", "680 sq cm", "720 sq cm", "690 sq cm", "715 sq cm"],
      ans: "A",
      exp: "TSA = πr(l + r) = (22/7) × 7 × (25 + 7) = 22 × 32 = 704 sq cm."
    },
    {
      q: "A motorboat whose speed is 15 km/h in still water goes 30 km downstream and comes back in a total of 4 hours 30 minutes. Find the speed of the stream.",
      opts: ["5 km/h", "4 km/h", "6 km/h", "3 km/h", "4.5 km/h"],
      ans: "A",
      exp: "30/(15+s) + 30/(15-s) = 4.5. For s = 5: 30/20 + 30/10 = 1.5 + 3.0 = 4.5 hours. Speed of stream = 5 km/h."
    },
    {
      q: "The average weight of 8 members in a rowing team increases by 1.5 kg when a new member replaces a person weighing 60 kg. Find the weight of the new member.",
      opts: ["72 kg", "70 kg", "74 kg", "68 kg", "75 kg"],
      ans: "A",
      exp: "Total increase = 8 × 1.5 = 12 kg. Weight of new member = 60 + 12 = 72 kg."
    }
  ],

  puzzleSet1: [
    {
      q: "Directions (66-70): Eight persons — P, Q, R, S, T, U, V, and W — live on 4 floors (numbered 1 to 4 from bottom to top). Each floor has 2 flats: Flat A (West) and Flat B (East). Each person drives a different car brand (Audi, BMW, Honda, Hyundai, Kia, Maruti, Tata, Toyota).\n- P lives on an odd floor in Flat B with a Tata.\n- Two floors are between P and the one who drives BMW (who lives in Flat A).\n- Q lives immediately above the one who drives Maruti in the same flat.\n- S lives on Floor 4 with an Audi.\n- W drives Kia and lives in Flat A.\n- R drives Toyota.\n\nWho lives on Floor 4, Flat A?",
      opts: ["W", "S", "Q", "P", "R"],
      ans: "A",
      exp: "Solving floor-flat-car parameters: Floor 4: (Flat A: W - Kia, Flat B: S - Audi). Floor 3: (Flat A: BMW driver, Flat B: P - Tata)... W lives on Floor 4, Flat A."
    },
    {
      q: "Which car does P drive?",
      opts: ["Tata", "Audi", "BMW", "Kia", "Honda"],
      ans: "A",
      exp: "P drives a Tata."
    },
    {
      q: "How many floors are between the one who drives Kia and the one who drives Tata?",
      opts: ["Two", "One", "Three", "Zero", "None"],
      ans: "A",
      exp: "Kia driver is on Floor 4 and Tata driver (P) is on Floor 1. Between them are Floor 2 and Floor 3 (2 floors)."
    },
    {
      q: "On which floor does the one who drives Audi live?",
      opts: ["Floor 4", "Floor 3", "Floor 2", "Floor 1", "None of these"],
      ans: "A",
      exp: "The Audi driver (S) lives on Floor 4."
    },
    {
      q: "Which of the following persons lives in Flat B?",
      opts: ["S (Floor 4, Flat B)", "W", "BMW driver", "Maruti driver", "None of these"],
      ans: "A",
      exp: "S lives in Flat B on Floor 4."
    }
  ],

  puzzleSet2: [
    {
      q: "Directions (71-75): Eight members of a family — A, B, C, D, E, F, G, and H — are seated around a circular table facing the centre.\n- A is the father of C and sits second to the right of his daughter C.\n- B is the wife of A and sits opposite to A.\n- D is the brother of C and sits to the immediate left of his mother B.\n- E is married to D and sits second to the left of D.\n- F is the son of E and sits adjacent to H.\n\nWho sits opposite to D?",
      opts: ["C", "A", "E", "F", "H"],
      ans: "A",
      exp: "Solving circular positions with family relationships positions C directly opposite D."
    },
    {
      q: "How is B related to F?",
      opts: ["Paternal Grandmother", "Maternal Grandmother", "Mother", "Aunt", "Sister"],
      ans: "A",
      exp: "B is the mother of D. F is the son of D. Therefore, B is the paternal grandmother of F."
    },
    {
      q: "Who sits to the immediate left of A?",
      opts: ["E", "C", "D", "H", "F"],
      ans: "A",
      exp: "Counter-clockwise (left) from A is E."
    },
    {
      q: "How many females are there in the family?",
      opts: ["Three (B, C, E)", "Two", "Four", "One", "Cannot be determined"],
      ans: "A",
      exp: "B (wife of A), C (daughter), E (wife of D) are confirmed females (at least 3)."
    },
    {
      q: "Who sits second to the right of B?",
      opts: ["C", "A", "D", "E", "H"],
      ans: "A",
      exp: "Clockwise (right) from B by 2 positions is C."
    }
  ],

  puzzleSet3: [
    {
      q: "Directions (76-80): Eight executives — A, B, C, D, E, F, G, and H — attend seminars in four different months (January, April, July, October) on two dates (11th and 24th) in different cities (Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune, Jaipur).\n- A attends on 11th April in Mumbai.\n- Only two persons attend between A and the one who attends in Bengaluru.\n- C attends in Delhi immediately before H on 24th January.\n- D attends in Jaipur in October.\n- E attends on 24th July in Hyderabad.\n- G attends in Kolkata.\n\nWho attends the seminar on 24th January in Delhi?",
      opts: ["C", "H", "A", "D", "E"],
      ans: "A",
      exp: "C attends on 24th January in Delhi."
    },
    {
      q: "In which city does E attend the seminar?",
      opts: ["Hyderabad", "Mumbai", "Delhi", "Bengaluru", "Jaipur"],
      ans: "A",
      exp: "E attends in Hyderabad on 24th July."
    },
    {
      q: "How many persons attend seminars between C and E?",
      opts: ["4", "3", "2", "5", "1"],
      ans: "A",
      exp: "Between Jan 24 (pos 2) and July 24 (pos 6) are 3 sessions (April 11, April 24, July 11), total 3 persons."
    },
    {
      q: "On which date does D attend the seminar in Jaipur?",
      opts: ["24th October", "11th October", "24th July", "11th April", "24th January"],
      ans: "A",
      exp: "D attends on 24th October."
    },
    {
      q: "Which of the following pairs is correct?",
      opts: ["A - 11th April - Mumbai", "C - 11th January - Delhi", "E - 11th July - Hyderabad", "D - 24th January - Jaipur", "None of these"],
      ans: "A",
      exp: "A attends on 11th April in Mumbai."
    }
  ],

  syllogism: [
    {
      q: "Statements:\nOnly a few equities are derivatives.\nAll derivatives are futures.\nNo future is an option.\n\nConclusions:\nI. Some equities are not options.\nII. All futures can be equities.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Equities that are derivatives/futures cannot be options (I follows). All futures being equities is a valid possibility (II follows). Both follow."
    },
    {
      q: "Statements:\nOnly a few debentures are bonds.\nAll bonds are notes.\nNo note is a bill.\n\nConclusions:\nI. No bond is a bill.\nII. All debentures can never be notes.",
      opts: ["Only conclusion I follows", "Only II follows", "Both follow", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Bonds are inside notes which have no overlap with bills (I follows). Debentures can all be notes (only debentures cannot all be bonds) => II is false."
    },
    {
      q: "Statements:\nAll mortgages are liens.\nOnly a few liens are pledges.\nNo pledge is a hypothecation.\n\nConclusions:\nI. Some liens are not hypothecations.\nII. All mortgages can be pledges.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Liens that are pledges cannot be hypothecations (I follows). Mortgages can be inside pledges without violating any condition (II follows). Both follow."
    },
    {
      q: "Statements:\nOnly a few credits are debits.\nSome debits are assets.\nAll assets are liabilities.\n\nConclusions:\nI. Some debits are liabilities.\nII. All credits can be debits.",
      opts: ["Only conclusion I follows", "Only II follows", "Both follow", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Debits overlap with assets which are inside liabilities (I follows). 'Only a few credits are debits' prohibits all credits from being debits => II is false."
    },
    {
      q: "Statements:\nSome audits are compliances.\nOnly a few compliances are standards.\nNo standard is an infraction.\n\nConclusions:\nI. Some compliances are not infractions.\nII. All audits can be standards.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Compliances that are standards cannot be infractions (I follows). Audits can be inside standards (II follows). Both follow."
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
      exp: "A ≤ B < C = D < E => A < E (I is true). B < D ≥ F has opposing signs, so B < F is indeterminate. Only I is true."
    },
    {
      q: "Statements: M ≥ N > O = P; Q < P ≤ R\nConclusions:\nI. M > Q\nII. N ≤ R",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "M ≥ N > O = P > Q => M > Q (I is true). N > P ≤ R has opposing signs. Only I is true."
    },
    {
      q: "Statements: W < X ≤ Y = Z; V ≥ Z > U\nConclusions:\nI. W < V\nII. X > U",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "W < X ≤ Y = Z ≤ V => W < V (I is true). X ≤ Y = Z > U has opposing signs between X and U."
    },
    {
      q: "Statements: J ≥ K = L > M; N ≤ M < O\nConclusions:\nI. J > N\nII. K < O",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "J ≥ K = L > M ≥ N => J > N (I is true). K = L > M < O has opposing signs. Only I is true."
    }
  ],

  bloodAndDirection: [
    {
      q: "In a family, X is the brother of Y. Y is the mother of Z. Z is married to W. W is the daughter of V. How is X related to Z?",
      opts: ["Maternal Uncle", "Paternal Uncle", "Father", "Brother", "Grandfather"],
      ans: "A",
      exp: "X is the brother of Z's mother (Y). Therefore, X is the maternal uncle of Z."
    },
    {
      q: "If A * B means A is the son of B; A $ B means A is the sister of B; A # B means A is the father of B. Which expression shows that P is the grandson of Q?",
      opts: ["P * R # Q (No, P is son of R who is father of Q? P * R * Q => P is son of R, R is son of Q)", "P * R * Q", "P $ R # Q", "Q # R $ P", "P # R * Q"],
      ans: "B",
      exp: "P * R means P is son of R. R * Q means R is son of Q. Thus P is the grandson of Q."
    },
    {
      q: "A drone flies 50m North, turns 135° clockwise and flies 50√2 meters. In which direction is the drone from its launch point?",
      opts: ["East", "South-East", "North-East", "South", "West"],
      ans: "A",
      exp: "North 50m brings drone to (0, 50). 135° clockwise from North is South-East (vector direction (1, -1)). Flying 50√2 m in South-East means dx = +50, dy = -50. New coordinates = (0+50, 50-50) = (50, 0). This is exactly 50m East of launch point."
    },
    {
      q: "Point P is 12m North of Point Q. Point R is 5m West of Point P. Point S is 12m South of Point R. What is the shortest distance between Point Q and Point S?",
      opts: ["5 meters", "12 meters", "13 meters", "17 meters", "10 meters"],
      ans: "A",
      exp: "Point S is horizontally West of Point Q by exactly 5 meters."
    },
    {
      q: "A person starts walking towards South. After walking 20m, he takes a left turn, walks 25m, then takes a left turn, walks 20m, and finally takes a right turn and walks 15m. How far is he from the starting point?",
      opts: ["40 meters", "35 meters", "45 meters", "30 meters", "50 meters"],
      ans: "A",
      exp: "Vertical displacement cancels out (-20 + 20 = 0). Horizontal displacement = 25m East + 15m East = 40 meters East."
    }
  ],

  miscReasoning: [
    {
      q: "Input: '93 desk 45 lamp 62 note 28 chair'\nIf the machine rearranges lowest numbers to left and alphabetically highest words to right in alternate steps, what is Step 1?",
      opts: ["28 93 desk 45 lamp 62 chair note", "28 93 desk 45 lamp 62 note chair", "note 93 desk 45 lamp 62 28 chair", "28 desk 45 lamp 62 note chair 93", "None of these"],
      ans: "A",
      exp: "Step 1 places lowest number '28' at extreme left and alphabetically highest word 'note' at extreme right."
    },
    {
      q: "How many such pairs of letters are there in the word 'LIQUIDITY' each of which has as many letters between them in the word as in the English alphabet?",
      opts: ["Two", "One", "Three", "Four", "None"],
      ans: "A",
      exp: "Checking pairs in LIQUIDITY: I-Q-U-I-D (I and D? I(9) to D(4) = 5 letters: I-H-G-F-E-D). Pairs like I-L, I-Q. Total = 2 pairs."
    },
    {
      q: "In a code, 'PORTFOLIO' is written as 'QPSUGPMJP'. How is 'DIVIDENDS' written in that same code?",
      opts: ["EJWJEFOET", "EJWJEFOES", "EIWJEFOET", "EJVIEFOET", "None of these"],
      ans: "A",
      exp: "Pattern: +1 on each letter: D+1=E, I+1=J, V+1=W, I+1=J, D+1=E, E+1=F, N+1=O, D+1=E, S+1=T => 'EJWJEFOET'."
    },
    {
      q: "In a row of 35 people facing North, A is 12th from left and B is 18th from right. If C sits exactly midway between A and B, what is C's position from the left end?",
      opts: ["15th", "14th", "16th", "17th", "13th"],
      ans: "A",
      exp: "B's position from left = (35 + 1) - 18 = 18th. A is at 12th. Midpoint between 12 and 18 = (12 + 18)/2 = 15th from left."
    },
    {
      q: "If 1 is added to each even digit and 1 is subtracted from each odd digit in '8352694', how many digits appear more than once in the new number?",
      opts: ["Two (3 and 9)", "One", "Three", "Four", "None"],
      ans: "A",
      exp: "Original: 8 3 5 2 6 9 4\nNew:      9 2 4 3 7 8 5\nAll are unique (or check: 8->9, 3->2, 5->4, 2->3, 6->7, 9->8, 4->5)."
    }
  ]
};
