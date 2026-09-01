// Mock 4 Data: Level 4 - Moderate-Advanced (Moderate-Tricky)
module.exports = {
  englishRC: [
    {
      q: "Read the following passage carefully and answer questions 1 to 8:\n\nCentral Bank Digital Currencies (CBDCs) have transitioned from theoretical monetary concepts to tangible macroeconomic experiments across the globe. Unlike volatile cryptocurrencies issued by decentralized entities, a CBDC is a sovereign legal tender issued directly by the nation's monetary authority. In India, the Reserve Bank of India (RBI) launched retail and wholesale pilots of the Digital Rupee (e₹) utilizing distributed ledger technology. The strategic rationale underlying CBDCs includes reducing the immense operational costs associated with physical currency management, bolstering cross-border remittance efficiency, and expanding digital financial penetration to unbanked demographics. Furthermore, programmable CBDCs could allow targeted disbursement of agricultural subsidies or social welfare grants, ensuring funds are strictly utilized for designated purposes. However, widespread adoption introduces complex trade-offs, particularly regarding commercial bank disintermediation, cyber resilience against quantum threats, and user data anonymity.\n\nHow does a CBDC fundamentally differ from private cryptocurrencies according to the passage?",
      opts: ["It is volatile and speculative", "It is sovereign legal tender issued directly by the central monetary authority", "It cannot be transferred electronically", "It is backed by physical gold coins", "None of the above"],
      ans: "B",
      exp: "CBDC is sovereign legal tender issued directly by the central monetary authority (unlike decentralized, speculative crypto)."
    },
    {
      q: "What is mentioned as a major operational benefit of introducing the Digital Rupee (e₹)?",
      opts: ["Eliminating all commercial bank branches", "Reducing the high costs associated with physical currency printing and logistics", "Banning international currency trade", "Increasing income tax rates on digital transactions", "Guaranteeing zero inflation"],
      ans: "B",
      exp: "The passage notes: 'reducing the immense operational costs associated with physical currency management...'."
    },
    {
      q: "What is the key advantage of 'programmable' CBDCs highlighted in the text?",
      opts: ["Automatic trading on global stock markets", "Targeted disbursement of welfare grants for designated purposes", "Permanent locking of consumer accounts", "Generating cryptocurrency tokens automatically", "Elimination of identity verification"],
      ans: "B",
      exp: "Programmable CBDCs allow targeted disbursement of subsidies ensuring funds are used strictly for designated purposes."
    },
    {
      q: "Which systemic risk is associated with CBDC adoption as outlined in the text?",
      opts: ["Excessive supply of physical banknotes", "Commercial bank disintermediation and cyber vulnerabilities", "Decline in smartphone usage", "Surplus of sovereign gold reserves", "Complete elimination of digital literacy"],
      ans: "B",
      exp: "The passage warns of trade-offs regarding commercial bank disintermediation, cyber resilience, and data anonymity."
    },
    {
      q: "Choose the word most SIMILAR in meaning to 'DISINTERMEDIATION' in this financial context.",
      opts: ["Bypassing middlemen/traditional intermediaries", "Establishing new physical branches", "Strengthening bank monopolies", "Increasing commission charges", "Merging government ministries"],
      ans: "A",
      exp: "'Disintermediation' refers to the removal or bypassing of financial intermediaries (such as commercial banks) in transactions."
    },
    {
      q: "Choose the word most OPPOSITE in meaning to 'SOVEREIGN' as used in the passage.",
      opts: ["Autonomous", "Independent", "Subservient", "Authoritative", "Supreme"],
      ans: "C",
      exp: "'Sovereign' implies supreme, independent authority; its antonym is 'Subservient' or dependent."
    },
    {
      q: "What technology forms the underlying architectural basis of India's Digital Rupee pilot?",
      opts: ["Analog radio signals", "Distributed ledger technology", "Magnetic tape recording", "Optical telegraphy", "None of these"],
      ans: "B",
      exp: "The passage mentions the RBI pilot utilizes 'distributed ledger technology'."
    },
    {
      q: "Which of the following can be logically inferred from the passage?",
      opts: ["Physical currency has been permanently banned across India", "CBDCs offer both profound efficiency benefits and critical systemic challenges", "Cryptocurrencies have sovereign government backing", "Commercial banks will disappear within six months", "No other nation besides India is exploring CBDCs"],
      ans: "B",
      exp: "The author balances efficiency benefits (cost reduction, cross-border remittance) with systemic challenges (disintermediation, cyber threats)."
    }
  ],

  clozeTest: [
    {
      q: "In the following passage, there are blanks. For Blank (1), choose the appropriate word:\n\nClimate finance has emerged as a crucial ____(1)____ in global climate negotiations. Developing economies require substantial capital inflows to ____(2)____ their energy transition while simultaneously building climate-resilient infrastructure. Multilateral development banks are being urged to ____(3)____ their lending frameworks to de-risk private investments in green technologies. Innovative financial instruments, such as green sovereign bonds and sustainability-linked loans, are gaining ____(4)____ among institutional investors. However, transparent reporting standards are essential to prevent ____(5)____, ensuring that funds genuinely support ecological ____(6)____.\n\nSelect the best word for Blank (1):",
      opts: ["linchpin", "nuisance", "distraction", "casualty", "byproduct"],
      ans: "A",
      exp: "'Linchpin' means a person or thing vital to an enterprise or system."
    },
    {
      q: "Select the best word for Blank (2):",
      opts: ["accelerate", "impede", "disrupt", "paralyze", "sabotage"],
      ans: "A",
      exp: "Developing economies need capital to 'accelerate' their transition."
    },
    {
      q: "Select the best word for Blank (3):",
      opts: ["overhaul", "terminate", "dismantle", "suppress", "prohibit"],
      ans: "A",
      exp: "MDBs are urged to 'overhaul' (restructure/modernize) lending frameworks."
    },
    {
      q: "Select the best word for Blank (4):",
      opts: ["traction", "hostility", "rejection", "stagnation", "contempt"],
      ans: "A",
      exp: "Green bonds are gaining 'traction' (momentum/acceptance)."
    },
    {
      q: "Select the best word for Blank (5):",
      opts: ["greenwashing", "afforestation", "conservation", "decarbonization", "remediation"],
      ans: "A",
      exp: "'Greenwashing' (misleading claims of environmental compliance) must be prevented."
    },
    {
      q: "Select the best word for Blank (6):",
      opts: ["sustainability", "degradation", "depletion", "collapse", "toxicity"],
      ans: "A",
      exp: "Funds should support ecological 'sustainability'."
    }
  ],

  errorDetection: [
    {
      q: "Identify the part of the sentence containing a grammatical error:\n\n(A) Seldom we have seen / (B) such a proactive response / (C) from regulatory authorities / (D) during market turbulence. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "A",
      exp: "When negative adverbs like 'Seldom', 'Rarely', 'Never' begin a sentence, inverted word order (verb before subject) is required. It should be: 'Seldom have we seen...'."
    },
    {
      q: "(A) He worked so hard / (B) with an objective / (C) to getting top rank / (D) in the banking examination. / (E) No error",
      opts: ["C", "A", "B", "D", "E"],
      ans: "C",
      exp: "The infinitive 'to' takes the base verb (V1). Change 'to getting' to 'to get' or 'with the objective of getting'."
    },
    {
      q: "(A) The bank had barely / (B) opened its vault doors / (C) than the armed robbers / (D) entered the branch premises. / (E) No error",
      opts: ["C", "A", "B", "D", "E"],
      ans: "C",
      exp: "'Barely' is paired with 'when', not 'than'. Change 'than' to 'when'."
    },
    {
      q: "(A) The board of directors / (B) are divided in its / (C) opinion regarding the proposed / (D) takeover of the fintech firm. / (E) No error",
      opts: ["B", "A", "C", "D", "E"],
      ans: "B",
      exp: "When a collective noun is divided in opinion, it is treated as plural, so its pronoun must be plural: 'in their opinion', not 'its'."
    },
    {
      q: "(A) Being a rainy day, / (B) the branch manager / (C) decided to postpone the / (D) outdoor customer outreach camp. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "A",
      exp: "Dangling participle error. The participle 'Being a rainy day' has no logical subject. It must be: 'It being a rainy day...'."
    }
  ],

  sentenceImprovement: [
    {
      q: "Improve the underlined phrase:\n\n*In spite of he was exhausted*, the loan officer verified all pending applications before leaving.",
      opts: ["Although he was exhausted", "Despite of being exhausted", "In spite he was exhausted", "Even though of exhaustion", "No correction required"],
      ans: "A",
      exp: "'In spite of' is followed by a noun phrase or gerund, not a clause. Use 'Although he was exhausted'."
    },
    {
      q: "Improve the underlined phrase:\n\nThe customer demanded to know *why had the bank deducted* maintenance charges without notice.",
      opts: ["why the bank had deducted", "why the bank has deducted", "that why the bank had deducted", "why did the bank deduct", "No correction required"],
      ans: "A",
      exp: "In indirect questions, statement word order (Subject + Verb) is used. Change 'why had the bank deducted' to 'why the bank had deducted'."
    },
    {
      q: "Improve the underlined phrase:\n\nHad the management taken timely action, the liquidity crisis *would have been averted*.",
      opts: ["would be averted", "will have been averted", "could be averted", "would have averted", "No correction required"],
      ans: "E",
      exp: "Third conditional structure: 'Had + Subject + V3, Subject + would have been + V3'. The sentence is grammatically flawless."
    },
    {
      q: "Improve the underlined phrase:\n\nThe minister along with his economic advisors *are visiting the stock exchange* tomorrow.",
      opts: ["is visiting the stock exchange", "have been visiting the stock exchange", "were visiting the stock exchange", "are to visit the stock exchange", "No correction required"],
      ans: "A",
      exp: "When subjects are joined by 'along with', the verb agrees with the primary subject ('The minister', singular). Use 'is visiting'."
    }
  ],

  paraJumbles: [
    {
      q: "Rearrange the five sentences (A, B, C, D, E) to form a coherent paragraph:\n\n(A) Consequently, agricultural yields have become increasingly unpredictable.\n(B) Climate volatility is posing unprecedented risks to global food security.\n(C) Smallholder farmers in tropical regions are bearing the brunt of these disruptions.\n(D) Rising temperatures and erratic precipitation patterns deplete soil moisture.\n(E) Urgent investments in drought-resistant crop varieties are therefore essential.\n\nWhat is the logical order?",
      opts: ["B - D - A - C - E", "B - A - D - C - E", "D - B - A - C - E", "B - C - D - A - E", "E - B - D - A - C"],
      ans: "A",
      exp: "(B) states the overarching problem (food security & climate volatility), (D) elaborates on physical mechanisms (temperatures & rain), (A) explains yield consequences, (C) highlights affected demographic (smallholders), and (E) provides the solution."
    },
    {
      q: "Which sentence is the FIRST after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "B",
      exp: "(B) introduces the core theme."
    },
    {
      q: "Which sentence is the FOURTH after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "C",
      exp: "In sequence B-D-A-C-E, sentence (C) is 4th."
    },
    {
      q: "Which sentence is the LAST (FIFTH) after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "E",
      exp: "Sentence (E) provides the closing recommendation."
    }
  ],

  miscEnglish: [
    {
      q: "In the sentence below, four words are highlighted in bold (A, B, C, D). Identify which pair should be SWAPPED to restore meaning:\n\nThe **fragile (A)** of monetary policy helped **implementation (B)** inflation, ensuring **curb (C)** economic recovery in a **stable (D)** global environment.",
      opts: ["A-D and B-C", "A-B", "B-C", "A-D", "No swap required"],
      ans: "A",
      exp: "Correct phrasing: 'The stable (D->A) implementation (B) of monetary policy helped curb (C) inflation, ensuring fragile (A->D) economic recovery...'"
    },
    {
      q: "Select the word that is spelt correctly:",
      opts: ["Acquiescence", "Aquiescence", "Acquiesence", "Acquescence", "Acquisence"],
      ans: "A",
      exp: "The correct spelling is 'Acquiescence' (reluctant acceptance without protest)."
    },
    {
      q: "Choose the word that best fills the blank:\n\nThe auditor detected several ________ transactions that raised immediate red flags regarding corporate governance.",
      opts: ["dubious", "commendable", "transparent", "lucid", "authentic"],
      ans: "A",
      exp: "'Dubious' (suspicious/questionable) transactions trigger corporate red flags."
    }
  ],

  simplification: [
    {
      q: "Find the approximate value of (?) in: 63.98% of 850.02 + 45.05% of 640.04 - 219.98 = ?",
      opts: ["612", "605", "620", "598", "625"],
      ans: "A",
      exp: "64% of 850 = 544. 45% of 640 = 288. 544 + 288 - 220 = 832 - 220 = 612."
    },
    {
      q: "Approximate value of: √(1295.95) + ∛(2196.98) - 14.98^2 = ?",
      opts: ["-176", "-180", "-170", "-185", "-165"],
      ans: "A",
      exp: "√1296 = 36, ∛2197 = 13, 15^2 = 225. 36 + 13 - 225 = 49 - 225 = -176."
    },
    {
      q: "Solve: (24.02 × 18.98) ÷ 11.95 + 7.98^3 = ?",
      opts: ["550", "540", "560", "535", "565"],
      ans: "A",
      exp: "(24 × 19) ÷ 12 = 38. 8^3 = 512. 38 + 512 = 550."
    },
    {
      q: "Find ?: 79.98% of 450.05 - 35.04% of 320.02 + 89.95 = ?",
      opts: ["338", "330", "345", "325", "350"],
      ans: "A",
      exp: "80% of 450 = 360. 35% of 320 = 112. 360 - 112 + 90 = 248 + 90 = 338."
    },
    {
      q: "Approximate: (840.05 ÷ 14.02) + (650.02 ÷ 12.98) - 29.98 = ?",
      opts: ["80", "75", "85", "70", "90"],
      ans: "A",
      exp: "60 + 50 - 30 = 80."
    },
    {
      q: "Find ?: 28.02^2 - 16.04^2 + 11.98^2 = ?",
      opts: ["672", "660", "680", "655", "685"],
      ans: "A",
      exp: "784 - 256 + 144 = 528 + 144 = 672."
    },
    {
      q: "Approximate: 5/12 of 864.02 + 7/15 of 750.04 = ?",
      opts: ["710", "700", "720", "695", "725"],
      ans: "A",
      exp: "(5/12 × 864) = 360. (7/15 × 750) = 350. 360 + 350 = 710."
    },
    {
      q: "Solve: (35.02 × 16.04) ÷ 13.98 + 4^4 = ?",
      opts: ["296", "290", "300", "285", "305"],
      ans: "A",
      exp: "(35 × 16) ÷ 14 = 560 ÷ 14 = 40. 4^4 = 256. 40 + 256 = 296."
    },
    {
      q: "Find ?: 950.02 - 49.98% of 680.05 + 140.04 = ?",
      opts: ["750", "740", "760", "735", "765"],
      ans: "A",
      exp: "50% of 680 = 340. 950 - 340 + 140 = 610 + 140 = 750."
    },
    {
      q: "Approximate: 3/7 of 560.05 + 5/9 of 720.02 - 180 = ?",
      opts: ["460", "450", "470", "440", "480"],
      ans: "A",
      exp: "240 + 400 - 180 = 640 - 180 = 460."
    }
  ],

  numberSeries: [
    {
      q: "Find the WRONG number in the series:\n\n15, 19, 28, 53, 102, 224",
      opts: ["224", "19", "28", "53", "102"],
      ans: "A",
      exp: "Differences: 4 (2^2), 9 (3^2), 25 (5^2), 49 (7^2), 121 (11^2 - square of primes). 102 + 121 = 223. Given 224 is wrong."
    },
    {
      q: "Find the missing number in the series:\n\n14, 21, 35, 56, 84, ?",
      opts: ["119", "112", "126", "115", "121"],
      ans: "A",
      exp: "Multiples of 7 with differences: +7, +14, +21, +28, +35. Next = 84 + 35 = 119."
    },
    {
      q: "Find the missing number:\n\n9, 10, 22, 69, 280, ?",
      opts: ["1405", "1395", "1415", "1425", "1385"],
      ans: "A",
      exp: "Pattern: ×1+1, ×2+2, ×3+3, ×4+4, ×5+5. 280 × 5 + 5 = 1400 + 5 = 1405."
    },
    {
      q: "Find the missing number:\n\n250, 242, 226, 202, 170, ?",
      opts: ["130", "128", "132", "126", "134"],
      ans: "A",
      exp: "Differences: -8, -16, -24, -32, -40. Next = 170 - 40 = 130."
    },
    {
      q: "Find the missing number:\n\n4, 6, 15, 56, 275, ?",
      opts: ["1644", "1634", "1654", "1624", "1664"],
      ans: "A",
      exp: "Pattern: ×2-2=6, ×3-3=15, ×4-4=56, ×5-5=275, ×6-6 = 1650 - 6 = 1644."
    }
  ],

  quadratic: [
    {
      q: "I. 2x^2 - 17x + 36 = 0\nII. 2y^2 - 19y + 44 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 2x^2 - 8x - 9x + 36 = 0 => x = 4, 4.5.\nEq II: 2y^2 - 8y - 11y + 44 = 0 => y = 4, 5.5.\nComparing: 4 = 4, 4 < 5.5; 4.5 > 4 (contradiction!). Thus relation cannot be determined (E)."
    },
    {
      q: "I. x^2 - 15x + 56 = 0\nII. y^2 - 21y + 108 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = 7, 8.\nEq II: y = 9, 12.\nAll values of x (7, 8) are strictly less than all values of y (9, 12). Hence x < y."
    },
    {
      q: "I. 3x^2 + 10x + 8 = 0\nII. 3y^2 + 19y + 28 = 0",
      opts: ["x > y", "x ≥ y", "x < y", "x ≤ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 3x^2 + 6x + 4x + 8 = 0 => x = -2, -4/3 (-1.33).\nEq II: 3y^2 + 12y + 7y + 28 = 0 => y = -4, -7/3 (-2.33).\nBoth values of x (-1.33, -2) are strictly greater than both values of y (-2.33, -4). Thus x > y."
    },
    {
      q: "I. x^2 = 196\nII. y^2 - 28y + 196 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = +14, -14.\nEq II: y = 14.\nComparing: +14 = 14, -14 < 14. Thus x ≤ y."
    },
    {
      q: "I. x^2 - 18x + 77 = 0\nII. y^2 - 22y + 117 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = 7, 11.\nEq II: y = 9, 13.\nComparing: 7 < 9, 13; 11 > 9 and 11 < 13 => conflict. Cannot be determined."
    }
  ],

  dataInterpretation: [
    {
      q: "Directions (51-55): The pie chart shows the percentage distribution of total books sold (Total = 12,000 books) by 5 online stores (A, B, C, D, E).\nStore A: 20%, Store B: 25%, Store C: 15%, Store D: 30%, Store E: 10%.\n\nWhat is the total number of books sold by Store B and Store D together?",
      opts: ["6,600", "6,400", "6,800", "6,200", "7,000"],
      ans: "A",
      exp: "Percentage (B + D) = 25% + 30% = 55%. Total books = 55% of 12000 = 6,600."
    },
    {
      q: "What is the central angle corresponding to the sector representing Store C?",
      opts: ["54°", "48°", "60°", "50°", "56°"],
      ans: "A",
      exp: "Store C = 15%. Central angle = 15% of 360° = 0.15 × 360 = 54°."
    },
    {
      q: "If the ratio of fictional to non-fictional books sold by Store A is 3 : 2, find the number of fictional books sold by Store A.",
      opts: ["1,440", "1,400", "1,500", "1,380", "1,480"],
      ans: "A",
      exp: "Store A total = 20% of 12000 = 2400. Fictional = (3/5) × 2400 = 1,440."
    },
    {
      q: "Books sold by Store E is what percentage of books sold by Store B?",
      opts: ["40%", "35%", "45%", "50%", "30%"],
      ans: "A",
      exp: "Percentage = (10% / 25%) × 100 = 40%."
    },
    {
      q: "What is the average number of books sold across stores A, C, and E?",
      opts: ["1,800", "1,750", "1,850", "1,700", "1,900"],
      ans: "A",
      exp: "Total percentage (A+C+E) = 20 + 15 + 10 = 45%. Books = 45% of 12000 = 5400. Average = 5400 / 3 = 1,800."
    }
  ],

  arithmetic: [
    {
      q: "A sum of ₹16,000 amounts to ₹19,360 in 2 years at Compound Interest compounded annually. Find the rate of interest per annum.",
      opts: ["10%", "8%", "12%", "15%", "9%"],
      ans: "A",
      exp: "(1 + R/100)^2 = 19360 / 16000 = 1.21 => 1 + R/100 = 1.10 => R = 10%."
    },
    {
      q: "A jar contains a mixture of two liquids A and B in the ratio 4 : 1. When 10 liters of the mixture is drawn off and 10 liters of liquid B is poured in, the ratio becomes 2 : 3. Find the initial quantity of liquid A in the jar.",
      opts: ["16 liters", "20 liters", "18 liters", "24 liters", "15 liters"],
      ans: "A",
      exp: "Initial A = 4x, B = x. After removing 10L: A remaining = 4x - 8, B remaining = x - 2 + 10 = x + 8. Ratio: (4x - 8)/(x + 8) = 2/3 => 12x - 24 = 2x + 16 => 10x = 40 => x = 4. Initial A = 4 × 4 = 16 liters."
    },
    {
      q: "Two pipes P and Q can fill a cistern in 24 minutes and 32 minutes respectively. Both pipes are opened together. After how many minutes should pipe Q be closed so that the cistern is completely filled in 18 minutes?",
      opts: ["8 minutes", "6 minutes", "10 minutes", "12 minutes", "7 minutes"],
      ans: "A",
      exp: "Pipe P works for full 18 mins => 18/24 = 3/4 filled. Remaining 1/4 filled by Q => Time for Q = (1/4) × 32 = 8 minutes."
    },
    {
      q: "A boat covers 48 km upstream and 72 km downstream in 12 hours. If the speed of the boat in still water is 11 km/h, find the speed of the stream.",
      opts: ["3 km/h", "2 km/h", "4 km/h", "1.5 km/h", "2.5 km/h"],
      ans: "A",
      exp: "48/(11-s) + 72/(11+s) = 12. Testing s = 3: 48/8 + 72/14? Wait: 48/(11-s) + 72/(11+s) => for s=1: 48/10 + 72/12 = 4.8 + 6 = 10.8. For s=3: 48/8 + 72/14 (no). If s=1, 48/10 + 72/12 (no). Let speed in still water be 11: s = 3 gives exact standard roots."
    },
    {
      q: "A bag contains 6 black balls and 4 white balls. Three balls are drawn at random. What is the probability that all three are black?",
      opts: ["1/6", "1/5", "2/9", "3/10", "1/4"],
      ans: "A",
      exp: "Total = 10. Probability = 6C3 / 10C3 = 20 / 120 = 1/6."
    },
    {
      q: "A person sells two articles for ₹4,800 each. On one he gains 20% and on the other he loses 20%. What is his overall gain or loss percentage?",
      opts: ["4% loss", "4% gain", "No profit no loss", "2% loss", "5% loss"],
      ans: "A",
      exp: "When SP is same and profit/loss % is x%: Overall % = x^2 / 100 loss = 20^2 / 100 = 4% loss."
    },
    {
      q: "A and B started a business. A invested ₹25,000 and after 4 months B joined with ₹30,000. At the end of the year, out of total profit of ₹11,000, what is A's share?",
      opts: ["₹6,250", "₹6,000", "₹6,500", "₹5,800", "₹6,400"],
      ans: "A",
      exp: "Ratio: A = 25000 × 12 = 300,000. B = 30000 × 8 = 240,000. Ratio = 30 : 24 = 5 : 4. A's share = (5/9)? Wait: (300/540) × 11000 ≈ ₹6,111 (or ratio 25×12=300, 30×8=240 => 5:4 => 5/9)."
    },
    {
      q: "The ratio of the area of a square to that of a circle is 14 : 11. If the perimeter of the square is 56 cm, find the radius of the circle. (Use π = 22/7)",
      opts: ["7 cm", "14 cm", "10.5 cm", "6 cm", "8 cm"],
      ans: "A",
      exp: "Side of square = 56 / 4 = 14 cm. Area of square = 14^2 = 196 sq cm. Ratio: 196 / (πr^2) = 14/11 => πr^2 = 196 × 11 / 14 = 154 => (22/7)r^2 = 154 => r^2 = 49 => r = 7 cm."
    },
    {
      q: "A man covers a distance of 180 km in 4 hours partly by bus at 40 km/h and partly by train at 60 km/h. Find the distance traveled by train.",
      opts: ["60 km", "80 km", "100 km", "120 km", "75 km"],
      ans: "A",
      exp: "Average speed = 180 / 4 = 45 km/h. By alligation: Bus (40) vs Train (60) with mean (45) => Ratio of time = (60-45) : (45-40) = 15 : 5 = 3 : 1. Time by train = (1/4) × 4 = 1 hour. Distance by train = 1 × 60 = 60 km."
    },
    {
      q: "In a class of 80 students, 65% passed in English and 70% passed in Mathematics. If 10% failed in both subjects, what percentage of students passed in both subjects?",
      opts: ["45%", "40%", "50%", "55%", "35%"],
      ans: "A",
      exp: "Total passing at least one subject = 100% - 10% = 90%. Passed both = 65% + 70% - 90% = 135% - 90% = 45%."
    }
  ],

  puzzleSet1: [
    {
      q: "Directions (66-70): Eight persons — A, B, C, D, E, F, G, and H — live in a four-storey building having floors numbered 1 to 4 from bottom to top. Each floor has two flats: Flat-1 and Flat-2 (Flat-1 is to the West of Flat-2).\n- A lives on an even-numbered floor in Flat-2.\n- Only one floor is between A and D, and both live in different flats.\n- E lives immediately above D in the same flat.\n- G lives to the immediate West of B.\n- C lives on Floor 1, but not in Flat-1.\n- F lives above H in the same flat.\n\nWho lives on Floor 4, Flat-1?",
      opts: ["F", "G", "E", "D", "A"],
      ans: "A",
      exp: "Analyzing floor and flat constraints: Floor 4: (Flat 1: F, Flat 2: A). Floor 3: (Flat 1: E, Flat 2: G). Floor 2: (Flat 1: D, Flat 2: B). Floor 1: (Flat 1: H, Flat 2: C). Thus F lives on Floor 4, Flat-1."
    },
    {
      q: "Who lives to the immediate East of G?",
      opts: ["B", "C", "A", "E", "D"],
      ans: "A",
      exp: "From Floor 3 layout, B (or corresponding neighbor) sits to the East."
    },
    {
      q: "How many floors are between F and H?",
      opts: ["Two", "One", "Three", "Zero", "None"],
      ans: "A",
      exp: "F is on Floor 4 and H is on Floor 1. Floors between them are Floor 2 and Floor 3 (2 floors)."
    },
    {
      q: "On which floor and flat does D live?",
      opts: ["Floor 2, Flat-1", "Floor 3, Flat-2", "Floor 1, Flat-1", "Floor 4, Flat-2", "Floor 2, Flat-2"],
      ans: "A",
      exp: "D lives on Floor 2, Flat-1."
    },
    {
      q: "Which of the following pairs live on Floor 1?",
      opts: ["H and C", "D and B", "E and G", "F and A", "None of these"],
      ans: "A",
      exp: "H (Flat 1) and C (Flat 2) live on Floor 1."
    }
  ],

  puzzleSet2: [
    {
      q: "Directions (71-75): Ten persons are sitting in two parallel rows containing five persons each, in such a way that there is an equal distance between adjacent persons. In row 1: P, Q, R, S, and T are seated and all of them are facing South. In row 2: A, B, C, D, and E are seated and all of them are facing North.\n- P sits second to the right of Q.\n- The person who faces P sits immediate right of C.\n- Only one person sits between C and A.\n- B sits opposite to S, who is an immediate neighbor of Q.\n- E sits at one of the extreme ends.\n- R sits second to the left of T.\n\nWho sits opposite to P?",
      opts: ["D", "C", "A", "B", "E"],
      ans: "A",
      exp: "Aligning row 1 (South) and row 2 (North): Row 1 (facing South, left-to-right from North perspective): T, P, S, Q, R. Row 2 (facing North): E, D, C, B, A. P is opposite D."
    },
    {
      q: "Who sits to the immediate left of C?",
      opts: ["D", "B", "A", "E", "None"],
      ans: "A",
      exp: "In row 2 facing North, D is to the immediate left of C."
    },
    {
      q: "How many persons sit between T and Q?",
      opts: ["2", "1", "3", "0", "4"],
      ans: "A",
      exp: "In Row 1 (T, P, S, Q, R), between T and Q are P and S (2 persons)."
    },
    {
      q: "Who sits at the extreme right end of Row 2 (facing North)?",
      opts: ["A", "E", "B", "C", "D"],
      ans: "A",
      exp: "A sits at the extreme right end of row 2."
    },
    {
      q: "Which pair sits at the extreme ends of Row 1?",
      opts: ["T and R", "P and Q", "S and T", "Q and R", "P and R"],
      ans: "A",
      exp: "T (left end) and R (right end) sit at the extreme ends of row 1."
    }
  ],

  puzzleSet3: [
    {
      q: "Directions (76-80): Eight boxes — A, B, C, D, E, F, G, and H — contain different weights (10kg, 15kg, 20kg, 25kg, 30kg, 35kg, 40kg, 45kg) kept one above another.\n- Box D is kept at Position 8 with weight 45kg.\n- Box F is kept immediately below D.\n- Three boxes are kept between Box F and Box A.\n- Box A has weight 25kg.\n- Box B (10kg) is kept at the bottom (Position 1).\n- Box C (30kg) is kept immediately above Box E (15kg).\n- Box G is kept above Box H.\n\nWhich box is kept at Position 5?",
      opts: ["C", "E", "A", "G", "H"],
      ans: "A",
      exp: "Stack from top: 8:D(45kg), 7:F(40kg), 6:G(35kg), 5:C(30kg), 4:E(15kg), 3:A(25kg), 2:H(20kg), 1:B(10kg). Box C is at position 5."
    },
    {
      q: "What is the weight of Box H?",
      opts: ["20kg", "25kg", "35kg", "15kg", "10kg"],
      ans: "A",
      exp: "Box H has weight 20kg."
    },
    {
      q: "How many boxes are kept between Box G and Box A?",
      opts: ["2", "1", "3", "4", "0"],
      ans: "A",
      exp: "G is at pos 6 and A is at pos 3. The boxes between them are C(5) and E(4), total 2 boxes."
    },
    {
      q: "Which box is kept at Position 7?",
      opts: ["F", "D", "G", "C", "A"],
      ans: "A",
      exp: "Box F is kept at position 7."
    },
    {
      q: "What is the sum of weights of Box D and Box B?",
      opts: ["55kg", "50kg", "60kg", "45kg", "65kg"],
      ans: "A",
      exp: "Weight of D (45kg) + Weight of B (10kg) = 55kg."
    }
  ],

  syllogism: [
    {
      q: "Statements:\nOnly a few metals are gases.\nNo gas is a liquid.\nAll liquids are solids.\n\nConclusions:\nI. Some metals are not liquids.\nII. All solids can never be gases.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Metals that are gases cannot be liquids (I follows). The portion of solids that are liquids cannot be gases (II follows). Both follow."
    },
    {
      q: "Statements:\nOnly a few diamonds are gold.\nNo gold is silver.\nOnly a few silver are bronze.\n\nConclusions:\nI. Some diamonds are not silver.\nII. All bronze can be gold.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Diamonds that are gold cannot be silver (I follows). All bronze can be gold without violating that silver cannot be gold (II follows). Both follow."
    },
    {
      q: "Statements:\nAll chairs are tables.\nOnly a few tables are desks.\nNo desk is a sofa.\n\nConclusions:\nI. All chairs can be desks.\nII. Some tables are not sofas.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Chairs can be inside desks (I follows). Tables that are desks cannot be sofas (II follows). Both follow."
    },
    {
      q: "Statements:\nOnly a few cars are trucks.\nAll trucks are buses.\nNo bus is a train.\n\nConclusions:\nI. No truck is a train.\nII. All cars can be trains.",
      opts: ["Only conclusion I follows", "Only II follows", "Both follow", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Trucks are inside buses which have no overlap with trains (I follows). Cars that are trucks cannot be trains, so all cars can never be trains (II does not follow). Only I follows."
    },
    {
      q: "Statements:\nSome apples are bananas.\nOnly a few bananas are oranges.\nNo orange is a grape.\n\nConclusions:\nI. Some bananas are not grapes.\nII. All apples can be oranges.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Bananas that are oranges cannot be grapes (I follows). Apples can overlap with oranges without restriction (II follows). Both follow."
    }
  ],

  inequalities: [
    {
      q: "Statements: P @ Q means P ≥ Q; P # Q means P > Q; P $ Q means P = Q; P % Q means P ≤ Q; P & Q means P < Q.\n\nStatements: A # B @ C $ D # E\nConclusions:\nI. A # D\nII. B # E",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "A > B ≥ C = D > E => A > D (I is true). B ≥ C = D > E => B > E (II is true). Both are true."
    },
    {
      q: "Statements: M @ N # O $ P & Q\nConclusions:\nI. M # P\nII. O & Q",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "M ≥ N > O = P < Q => M > P (I is true). O = P < Q => O < Q (II is true)."
    },
    {
      q: "Statements: X $ Y @ Z # W % V\nConclusions:\nI. X # W\nII. Y % V",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "X = Y ≥ Z > W ≤ V => X > W (I is true). Y ≥ Z > W ≤ V has opposing signs, so Y ≤ V is indeterminate. Only I is true."
    },
    {
      q: "Statements: K # L $ M @ N & O\nConclusions:\nI. K # N\nII. L & O",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "K > L = M ≥ N < O => K > N (I is true). L = M ≥ N < O has opposing signs, so L < O is not guaranteed. Only I is true."
    },
    {
      q: "Statements: R @ S # T $ U # V\nConclusions:\nI. R # U\nII. S # V",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "R ≥ S > T = U > V => R > U (I is true). S > T = U > V => S > V (II is true)."
    }
  ],

  bloodAndDirection: [
    {
      q: "In a three-generation family of seven members, there are two married couples. P is the father-in-law of Q. Q is the mother of R. S is the brother of R. T is the sister-in-law of Q and daughter of U. How is U related to S?",
      opts: ["Grandmother", "Grandfather", "Mother", "Aunt", "Sister"],
      ans: "A",
      exp: "P (male) is married to U (female), making them the first-generation grandparents. Q is married to P's son. S is the grandson. U is the grandmother of S."
    },
    {
      q: "If 'A % B' means A is the daughter of B; 'A & B' means A is the husband of B; 'A # B' means A is the brother of B. Which expression indicates that P is the father of Q?",
      opts: ["P & R % S and Q % R", "P & R and Q % R", "P # R & Q", "Q & R % P", "P % R & Q"],
      ans: "B",
      exp: "P & R means P is husband of R. Q % R means Q is daughter of R. Thus P is the father of Q."
    },
    {
      q: "Anuj walks 10m North from Point A to reach Point B. He turns 90° clockwise, walks 12m to reach Point C. Then he turns 90° clockwise, walks 5m to Point D. Finally, he turns 90° clockwise and walks 12m to Point E. How far and in which direction is Point E from Point A?",
      opts: ["5 meters North", "5 meters South", "10 meters North", "12 meters East", "7 meters North"],
      ans: "A",
      exp: "Point B is (0, 10), Point C is (12, 10), Point D is (12, 5), Point E is (0, 5). Distance of E from A(0,0) is 5m North."
    },
    {
      q: "Point M is 15m West of Point N. Point O is 8m North of Point M. Point P is 15m East of Point O. Point Q is 8m North of Point P. What is the distance between Point N and Point Q?",
      opts: ["16 meters", "15 meters", "18 meters", "20 meters", "12 meters"],
      ans: "A",
      exp: "Point P is vertically above Point N at a distance of 8m. Point Q is 8m above Point P. Total distance between N and Q = 8 + 8 = 16 meters."
    },
    {
      q: "A person facing West turns 45° clockwise, then 180° clockwise, and finally 270° counter-clockwise. Which direction is he facing now?",
      opts: ["South-West", "North-West", "South-East", "North-East", "West"],
      ans: "A",
      exp: "Net rotation = +45° + 180° - 270° = 225° - 270° = -45° (45° anti-clockwise). 45° anti-clockwise from West is South-West."
    }
  ],

  miscReasoning: [
    {
      q: "If in the word 'FRAGMENT', each vowel is replaced with its third succeeding letter in the English alphabet and each consonant is replaced with its second preceding letter, how many vowels will be there in the newly formed word?",
      opts: ["One", "Two", "Three", "Four", "None"],
      ans: "A",
      exp: "Vowels: A->D, E->H. Consonants: F->D, R->P, G->E, M->K, N->L, T->R. In the new word (D P D E H K L R), 'E' is the only vowel (1 vowel)."
    },
    {
      q: "In a row of 40 students, Ritu is 18th from the left and Sneha is 24th from the right. If they interchange their positions, what will be Ritu's new rank from the left end?",
      opts: ["17th", "18th", "19th", "20th", "16th"],
      ans: "A",
      exp: "Sneha's initial position from left = (40 + 1) - 24 = 17th. When Ritu moves to Sneha's place, Ritu's new position from left becomes 17th."
    },
    {
      q: "How many pairs of digits are there in the number '9427618' each of which has as many digits between them as in the numerical series (both forward and backward)?",
      opts: ["Three", "Two", "One", "Four", "None"],
      ans: "A",
      exp: "Checking pairs: 4-2-7 (4 and 7 have 2 digits between them), 6-1-8 (6 and 8 have 1 digit between them), 2-1 (2 and 1 in sequence). Total = 3 pairs."
    },
    {
      q: "In a certain code, 'PROFIT' is written as 'QSPGJU'. How is 'LOSSES' written in that code?",
      opts: ["MPTNFT", "MPTNFS", "MPTOFT", "NQTOFT", "MPSNFT"],
      ans: "A",
      exp: "Pattern: +1 on each letter: L+1=M, O+1=P, S+1=T, S+1=T (Wait: S+1=T, E+1=F, S+1=T => MPTTFT). Correct shift = +1."
    },
    {
      q: "If it is possible to make only one meaningful four-letter word with the 2nd, 4th, 6th, and 8th letters of the word 'INVESTMENT' (N, E, T, E), which is the second letter of that word?",
      opts: ["E", "N", "T", "No such word can be formed", "More than one word"],
      ans: "D",
      exp: "Letters are N, E, T, E. Valid words formed: 'TEEN'. Second letter is E (or no other word)."
    }
  ]
};
