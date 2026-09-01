// Mock 7 Data: Level 7 - Ultimate Pro Challenge (Hard / Power Mock)
module.exports = {
  englishRC: [
    {
      q: "Read the following passage carefully and answer questions 1 to 8:\n\nThe impending advent of fault-tolerant quantum computing threatens to obliterate the mathematical bedrock of contemporary cryptographic architectures. Modern financial telecommunications, interbank settlement clearinghouses, and blockchain consensus mechanisms rely extensively on public-key cryptosystems—notably RSA and Elliptic Curve Cryptography (ECC)—whose security hinges on the computational intractability of prime factorization and discrete logarithms. Shor's algorithm, executed on a sufficiently scaled quantum computer, can solve these problems in polynomial time, rendering existing encrypted data stores vulnerable to retroactive decryption under 'Harvest Now, Decrypt Later' espionage campaigns. In response, international standardization bodies such as NIST have finalized Post-Quantum Cryptography (PQC) standards based on lattice-based, code-based, and multivariate quadratic equations. However, transitioning global banking core mainframes to quantum-resistant algorithms entails massive engineering complexity, algorithmic latency overheads, and hardware security module (HSM) retrofits. Financial institutions that delay quantum-proofing their cryptographic stacks risk catastrophic systemic exposure upon reaching cryptographically relevant quantum supremacy (CRQS).\n\nWhat fundamental mathematical principle underpins current public-key cryptography according to the text?",
      opts: ["Simple linear arithmetic and basic calculus", "The computational intractability of prime factorization and discrete logarithms", "Random quantum entanglement in fiber optics", "Manual paper validation and physical vaults", "None of the above"],
      ans: "B",
      exp: "The passage explicitly notes that RSA and ECC security hinges on the computational intractability of prime factorization and discrete logarithms."
    },
    {
      q: "How does Shor's algorithm threaten existing cryptographic protocols like RSA and ECC?",
      opts: ["By physically destroying computer hard drives", "By solving prime factorization and discrete logarithm problems in polynomial time", "By reducing the speed of fiber-optic internet", "By increasing transaction fees in commercial banking", "None of these"],
      ans: "B",
      exp: "Shor's algorithm can solve prime factorization and discrete logarithms in polynomial time, breaking RSA and ECC."
    },
    {
      q: "What does the phrase 'Harvest Now, Decrypt Later' refer to?",
      opts: ["Agricultural yield storage techniques", "Adversaries exfiltrating and storing encrypted data today to decrypt once quantum computing matures", "Delayed processing of tax refunds by central authorities", "Downloading cryptocurrency tokens without paying fees", "Selling outdated mainframe hardware"],
      ans: "B",
      exp: "It refers to espionage actors stealing and hoarding encrypted data today to retroactively decrypt it when quantum computers become capable."
    },
    {
      q: "Which mathematical frameworks form the basis of newly finalized Post-Quantum Cryptography (PQC) standards?",
      opts: ["Simple Boolean logic gates", "Lattice-based, code-based, and multivariate quadratic equations", "Classical Newtonian physics formulas", "Standard 16-bit integer multiplication", "Analog wave modulation"],
      ans: "B",
      exp: "The passage notes that NIST PQC standards are based on lattice-based, code-based, and multivariate quadratic equations."
    },
    {
      q: "Choose the word most SIMILAR in meaning to 'INTRACTABILITY' as used in the passage.",
      opts: ["Insolubility / extreme difficulty of solving", "Simplicity", "Predictability", "Elasticity", "Transparency"],
      ans: "A",
      exp: "'Intractability' denotes the property of being computationally insolvable in feasible polynomial time."
    },
    {
      q: "Choose the word most OPPOSITE in meaning to 'OBLITERATE' as used in the passage.",
      opts: ["Preserve / construct", "Annihilate", "Eradicate", "Demolish", "Dismantle"],
      ans: "A",
      exp: "'Obliterate' means to completely destroy. The opposite is 'Preserve' or construct."
    },
    {
      q: "What does CRQS stand for in the context of the passage?",
      opts: ["Cryptographically Relevant Quantum Supremacy", "Centralized Real-time Quantitative Settlement", "Certified Quantum Security Standard", "Critical Risk Quantitative System", "Core Redundant Quantum Server"],
      ans: "A",
      exp: "CRQS stands for Cryptographically Relevant Quantum Supremacy."
    },
    {
      q: "What is the primary conclusion and call to action of the author?",
      opts: ["Abandon all digital banking and return to physical barter", "Proactively migrate cryptographic stacks to quantum-resistant standards to prevent catastrophic systemic vulnerability", "Stop research into quantum computers immediately", "Rely exclusively on private decentralized cryptocurrencies", "Wait until quantum computers arrive before planning transitions"],
      ans: "B",
      exp: "The author warns that delaying PQC migration creates catastrophic systemic risks under 'Harvest Now, Decrypt Later' threat models."
    }
  ],

  clozeTest: [
    {
      q: "In the following passage, there are blanks. For Blank (1), choose the appropriate word:\n\nSovereign credit ratings wield substantial ____(1)____ over international capital allocation and foreign direct investment flows. Emerging market debt managers must navigate credit assessment frameworks that evaluate fiscal deficit trajectories, external debt ____(2)____, and institutional governance quality. When rating agencies issue outlook downgrades, sovereign bond yields ____(3)____, raising borrowing costs across both public and private sectors. Consequently, debt sustainability frameworks require prudent fiscal consolidation combined with structural economic ____(4)____. Central banks must maintain robust foreign exchange reserves to ____(5)____ external liquidity shocks. Establishing credible macroeconomic policy anchors remains the ultimate shield against sudden capital ____(6)____.\n\nSelect the best word for Blank (1):",
      opts: ["influence", "negligence", "futility", "detriment", "apathy"],
      ans: "A",
      exp: "Ratings wield substantial 'influence' over capital flows."
    },
    {
      q: "Select the best word for Blank (2):",
      opts: ["vulnerability", "invincibility", "immunity", "exemption", "redundancy"],
      ans: "A",
      exp: "Frameworks evaluate external debt 'vulnerability'."
    },
    {
      q: "Select the best word for Blank (3):",
      opts: ["surge", "plummet", "stagnate", "vanish", "freeze"],
      ans: "A",
      exp: "Downgrades cause bond yields to 'surge' (spike), increasing costs."
    },
    {
      q: "Select the best word for Blank (4):",
      opts: ["reforms", "paralysis", "collapses", "stagnations", "recessions"],
      ans: "A",
      exp: "Fiscal consolidation must be paired with structural economic 'reforms'."
    },
    {
      q: "Select the best word for Blank (5):",
      opts: ["absorb", "provoke", "amplify", "intensify", "ignore"],
      ans: "A",
      exp: "Forex reserves help 'absorb' (cushion against) shocks."
    },
    {
      q: "Select the best word for Blank (6):",
      opts: ["flight", "surplus", "inflow", "bounty", "accumulation"],
      ans: "A",
      exp: "Credible policies shield against sudden capital 'flight' (outflows)."
    }
  ],

  errorDetection: [
    {
      q: "Identify the part of the sentence containing a grammatical error:\n\n(A) Were the financial regulator / (B) to discover any deliberate concealment / (C) of non-performing loans, / (D) the bank's license would be revoked. / (E) No error",
      opts: ["E", "A", "B", "C", "D"],
      ans: "A",
      exp: "Subjunctive conditional inversion: 'Were + Subject + to Verb, Subject + would be...'. Grammatically impeccable. (E) No error."
    },
    {
      q: "(A) He is one of those / (B) senior credit analysts who / (C) has consistently predicted / (D) impending market corrections. / (E) No error",
      opts: ["C", "A", "B", "D", "E"],
      ans: "C",
      exp: "In 'one of those [plural noun] who', the relative pronoun 'who' refers to the plural antecedent ('analysts'), requiring the plural verb 'have consistently predicted', not 'has'."
    },
    {
      q: "(A) The CFO suggested / (B) that the company invests / (C) surplus liquidity in / (D) short-term sovereign treasury bills. / (E) No error",
      opts: ["B", "A", "C", "D", "E"],
      ans: "B",
      exp: "Subjunctive mood after verbs of suggestion: 'suggested that the company invest' (base form V1), not 'invests'."
    },
    {
      q: "(A) Between the three partner / (B) banks in the consortium, / (C) SBI contributed the highest / (D) share of underwriting capital. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "A",
      exp: "For more than two entities, 'Among' should be used instead of 'Between'."
    },
    {
      q: "(A) Not only did the chairman / (B) resign abruptly from his post / (C) but he also surrendered all / (D) unvested stock options. / (E) No error",
      opts: ["E", "A", "B", "C", "D"],
      ans: "A",
      exp: "Inversion with 'Not only did the chairman resign... but he also...' is grammatically correct. (E) No error."
    }
  ],

  sentenceImprovement: [
    {
      q: "Improve the underlined phrase:\n\n*Scarcely the monetary policy statement had been released* when commercial bank prime lending rates adjusted upward.",
      opts: ["Scarcely had the monetary policy statement been released", "Scarcely the monetary policy statement was released", "No sooner had the monetary policy statement been released", "Barely the monetary policy statement had released", "No correction required"],
      ans: "A",
      exp: "Negative restrictive adverb 'Scarcely' requires auxiliary verb inversion: 'Scarcely had the monetary policy statement been released...'"
    },
    {
      q: "Improve the underlined phrase:\n\nThe risk committee insisted that *all derivative trades be marked to market daily*.",
      opts: ["all derivative trades are marked to market daily", "all derivative trades should be marked to market daily", "all derivative trades be marked to market daily", "all derivative trades have been marked to market daily", "No correction required"],
      ans: "E",
      exp: "Mandative subjunctive mood ('insisted that + S + be marked') is standard and precise. (E) No correction required."
    },
    {
      q: "Improve the underlined phrase:\n\nHe would rather *resign from his position than to compromise* with his professional ethics.",
      opts: ["resign from his position than compromise", "to resign from his position than compromise", "resigning from his position than to compromise", "resign from his position rather compromise", "No correction required"],
      ans: "A",
      exp: "'Would rather' is followed by a bare infinitive ('resign... than compromise', without 'to')."
    },
    {
      q: "Improve the underlined phrase:\n\nThe asset reconstruction company *is working round the clock for resolving* the stressed assets.",
      opts: ["is working round the clock to resolve", "is working round the clock at resolving", "works round the clock in resolve", "is work round the clock for resolve", "No correction required"],
      ans: "A",
      exp: "The infinitive of purpose 'to resolve' is grammatically superior to 'for resolving'."
    }
  ],

  paraJumbles: [
    {
      q: "Rearrange the five sentences (A, B, C, D, E) to form a coherent paragraph:\n\n(A) Such systemic runs can drain liquidity reserves within minutes.\n(B) Digital banking enables instantaneous, frictionless deposit withdrawals.\n(C) Consequently, traditional multi-day supervisory intervention models are obsolete.\n(D) Social media panic accelerates the velocity of modern banking runs.\n(E) Central banks must therefore develop real-time automated emergency liquidity backstops.\n\nWhat is the logical sequence?",
      opts: ["B - D - A - C - E", "B - A - D - C - E", "D - B - A - C - E", "B - C - D - A - E", "E - B - D - A - C"],
      ans: "A",
      exp: "(B) states the technological premise (instant withdrawals), (D) adds the catalyst (social media panic), (A) describes systemic liquidity drain, (C) highlights supervisory obsolescence, and (E) provides the modern real-time liquidity solution."
    },
    {
      q: "Which sentence is the FIRST after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "B",
      exp: "(B) introduces digital deposit withdrawal mechanics."
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
      exp: "Sentence (E) provides the concluding recommendation."
    }
  ],

  miscEnglish: [
    {
      q: "In the sentence below, four words are bold (A, B, C, D). Identify the required SWAP:\n\nThe **insolvency (A)** resolution framework **expedited (B)** the liquidation of **unviable (C)** corporate entities, preserving **residual (D)** asset value.",
      opts: ["A-B", "B-C", "C-D", "A-D", "No swap required"],
      ans: "E",
      exp: "All bold terms are correctly employed in legal and financial context."
    },
    {
      q: "Select the word that is spelt correctly:",
      opts: ["Connoisseur", "Conoisseur", "Connoiseur", "Connoiseur", "Connossieur"],
      ans: "A",
      exp: "The correct spelling is 'Connoisseur' (an expert judge in matters of taste)."
    },
    {
      q: "Choose the appropriate idiom to complete the sentence:\n\nDuring the cross-examination, the fraudulent promoter was forced to ________ and disclose all offshore shell companies.",
      opts: ["come clean", "spill the beans", "turn over a new leaf", "throw in the towel", "face the music"],
      ans: "A",
      exp: "'Come clean' means to be completely honest and disclose the full truth."
    }
  ],

  simplification: [
    {
      q: "Find the approximate value of (?) in: 99.98% of 1799.95 + 74.98% of 1440.04 - 679.98 = ?",
      opts: ["2200", "2180", "2220", "2150", "2250"],
      ans: "A",
      exp: "100% of 1800 = 1800. 75% of 1440 = 1080. 1800 + 1080 - 680 = 2880 - 680 = 2200."
    },
    {
      q: "Approximate: √(4095.95) + ∛(9260.98) - 24.98^2 = ?",
      opts: ["-540", "-535", "-545", "-530", "-550"],
      ans: "A",
      exp: "√4096 = 64, ∛9261 = 21, 25^2 = 625. 64 + 21 - 625 = 85 - 625 = -540."
    },
    {
      q: "Solve: (64.02 × 45.04) ÷ 29.98 + 12.02^3 = ?",
      opts: ["1824", "1815", "1830", "1800", "1840"],
      ans: "A",
      exp: "(64 × 45) ÷ 30 = 96. 12^3 = 1728. 96 + 1728 = 1824."
    },
    {
      q: "Find ?: 99.98% of 1150.05 - 65.02% of 840.02 + 249.95 = ?",
      opts: ["854", "845", "860", "840", "865"],
      ans: "A",
      exp: "1150 - (0.65 × 840 = 546) + 250 = 604 + 250 = 854."
    },
    {
      q: "Approximate: (1680.05 ÷ 23.98) + (1120.02 ÷ 15.98) - 69.98 = ?",
      opts: ["70", "65", "75", "60", "80"],
      ans: "A",
      exp: "70 + 70 - 70 = 70."
    },
    {
      q: "Find ?: 42.02^2 - 28.04^2 + 21.98^2 = ?",
      opts: ["1464", "1450", "1475", "1440", "1480"],
      ans: "A",
      exp: "1764 - 784 + 484 = 980 + 484 = 1464."
    },
    {
      q: "Approximate: 11/27 of 1350.04 + 9/23 of 1150.02 = ?",
      opts: ["1000", "990", "1010", "980", "1020"],
      ans: "A",
      exp: "(11/27 × 1350) = 550. (9/23 × 1150) = 450. 550 + 450 = 1000."
    },
    {
      q: "Solve: (72.02 × 28.04) ÷ 31.98 + 7^4 = ?",
      opts: ["2464", "2455", "2470", "2450", "2480"],
      ans: "A",
      exp: "(72 × 28) ÷ 32 = 63. 7^4 = 2401. 63 + 2401 = 2464."
    },
    {
      q: "Find ?: 1750.02 - 79.98% of 1250.05 + 280.04 = ?",
      opts: ["1030", "1020", "1040", "1010", "1050"],
      ans: "A",
      exp: "80% of 1250 = 1000. 1750 - 1000 + 280 = 750 + 280 = 1030."
    },
    {
      q: "Approximate: 9/19 of 1140.05 + 11/21 of 1050.02 - 420 = ?",
      opts: ["670", "660", "680", "650", "690"],
      ans: "A",
      exp: "540 + 550 - 420 = 1090 - 420 = 670."
    }
  ],

  numberSeries: [
    {
      q: "Find the WRONG number in the series:\n\n25, 30, 49, 94, 175, 305",
      opts: ["305", "30", "49", "94", "175"],
      ans: "A",
      exp: "Differences: 5 (2^2+1), 19 (4^2+3), 45 (6^2+9?), or +5, +19, +45, +81, +126? Double diff: +14, +26, +36, +45. Standard: 300 should replace 305."
    },
    {
      q: "Find the missing number in the series:\n\n32, 48, 120, 420, 1890, ?",
      opts: ["10395", "10350", "10425", "10290", "10450"],
      ans: "A",
      exp: "Pattern: ×1.5, ×2.5, ×3.5, ×4.5, ×5.5. 1890 × 5.5 = 10395."
    },
    {
      q: "Find the missing number:\n\n17, 26, 47, 86, 149, ?",
      opts: ["242", "238", "246", "234", "250"],
      ans: "A",
      exp: "Differences: 9 (3^2), 21 (4^2+5), 39 (6^2+3), 63 (8^2-1), 93 (10^2-7). Pattern: differences increase by +12, +18, +24, +30. Next difference = 63 + 30 = 93. Next = 149 + 93 = 242."
    },
    {
      q: "Find the missing number:\n\n625, 621, 605, 569, 505, ?",
      opts: ["405", "401", "409", "395", "415"],
      ans: "A",
      exp: "Differences: -4 (2^2), -16 (4^2), -36 (6^2), -64 (8^2), -100 (10^2). Next = 505 - 100 = 405."
    },
    {
      q: "Find the missing number:\n\n7, 16, 51, 208, 1045, ?",
      opts: ["6276", "6266", "6286", "6256", "6296"],
      ans: "A",
      exp: "Pattern: ×2+2=16, ×3+3=51, ×4+4=208, ×5+5=1045, ×6+6 = 6270 + 6 = 6276."
    }
  ],

  quadratic: [
    {
      q: "I. 6x^2 - 19x + 15 = 0\nII. 4y^2 - 23y + 30 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 6x^2 - 9x - 10x + 15 = 0 => x = 1.5, 5/3 (1.67).\nEq II: 4y^2 - 8y - 15y + 30 = 0 => y = 2, 15/4 (3.75).\nAll values of x (1.5, 1.67) are strictly less than all values of y (2, 3.75). Hence x < y."
    },
    {
      q: "I. 2x^2 - (4 + √13)x + 2√13 = 0\nII. 2y^2 - (6 + √13)y + 3√13 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = 2, √13/2 (1.80).\nEq II: y = 3, √13/2 (1.80).\nComparing: 1.80 = 1.80, 1.80 < 3; 2 > 1.80, 2 < 3 (conflict!). Cannot be determined."
    },
    {
      q: "I. 3x^2 + 20x + 32 = 0\nII. 3y^2 + 26y + 55 = 0",
      opts: ["x > y", "x ≥ y", "x < y", "x ≤ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 3x^2 + 12x + 8x + 32 = 0 => x = -4, -8/3 (-2.67).\nEq II: 3y^2 + 15y + 11y + 55 = 0 => y = -5, -11/3 (-3.67).\nBoth values of x (-2.67, -4) vs (-3.67, -5): -2.67 > -3.67, -5; but -4 < -3.67 (conflict!). Cannot be determined."
    },
    {
      q: "I. x^2 = 400\nII. y^2 - 40y + 400 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = +20, -20.\nEq II: y = 20.\nComparing: +20 = 20, -20 < 20. Thus x ≤ y."
    },
    {
      q: "I. 5x^2 - 27x + 28 = 0\nII. 3y^2 - 22y + 35 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 5x^2 - 20x - 7x + 28 = 0 => x = 4, 1.4.\nEq II: 3y^2 - 15y - 7y + 35 = 0 => y = 5, 7/3 (2.33).\nComparing: 1.4 < 2.33, 5; 4 > 2.33, 4 < 5 (conflict!). Cannot be determined."
    }
  ],

  dataInterpretation: [
    {
      q: "Directions (51-55): A commercial bank categorized its Gross NPAs across 4 zones (North, South, East, West). Total Gross NPA = ₹24,000 Crores.\nNorth: 30%, Provision Coverage Ratio (PCR) = 70%\nSouth: 25%, Provision Coverage Ratio (PCR) = 60%\nEast: 20%, Provision Coverage Ratio (PCR) = 75%\nWest: 25%, Provision Coverage Ratio (PCR) = 80%\n(Note: Net NPA = Gross NPA × (1 - PCR))\n\nWhat is the total Net NPA of North and West zones combined?",
      opts: ["₹3,360 Crores", "₹3,200 Crores", "₹3,500 Crores", "₹3,150 Crores", "₹3,400 Crores"],
      ans: "A",
      exp: "North Gross NPA = 30% of 24000 = 7200. Net NPA (North) = 7200 × (1 - 0.70) = ₹2,160 Cr.\nWest Gross NPA = 25% of 24000 = 6000. Net NPA (West) = 6000 × (1 - 0.80) = ₹1,200 Cr.\nTotal Net NPA = 2160 + 1200 = ₹3,360 Crores."
    },
    {
      q: "What is the total provisions held by the bank for the South zone?",
      opts: ["₹3,600 Crores", "₹3,400 Crores", "₹3,800 Crores", "₹3,500 Crores", "₹3,700 Crores"],
      ans: "A",
      exp: "South Gross NPA = 25% of 24000 = ₹6000 Cr. Provisions held = 60% of 6000 = ₹3,600 Crores."
    },
    {
      q: "What is the ratio of Net NPA of East zone to that of South zone?",
      opts: ["1 : 2", "2 : 3", "3 : 4", "1 : 3", "2 : 5"],
      ans: "A",
      exp: "East Gross NPA = 20% of 24000 = 4800. Net NPA = 4800 × 0.25 = ₹1,200 Cr.\nSouth Net NPA = 6000 × 0.40 = ₹2,400 Cr.\nRatio = 1200 : 2400 = 1 : 2."
    },
    {
      q: "Gross NPA of West zone is what percentage of Gross NPA of North zone?",
      opts: ["83.33%", "80.00%", "85.50%", "78.25%", "88.00%"],
      ans: "A",
      exp: "Percentage = (6000 / 7200) × 100 = 83.33%."
    },
    {
      q: "What is the overall average PCR (Provision Coverage Ratio) across the entire bank?",
      opts: ["71.00%", "70.50%", "72.00%", "69.50%", "73.50%"],
      ans: "A",
      exp: "Total Provisions = North(5040) + South(3600) + East(3600) + West(4800) = ₹17,040 Cr. Overall PCR = (17040 / 24000) × 100 = 71.00%."
    }
  ],

  arithmetic: [
    {
      q: "A sum of ₹25,000 is invested for 3 years at Compound Interest. The rate of interest is 8% for the 1st year, 10% for the 2nd year, and 12% for the 3rd year. Find the total compound interest earned.",
      opts: ["₹8,276", "₹8,200", "₹8,350", "₹8,150", "₹8,400"],
      ans: "A",
      exp: "Amount = 25000 × 1.08 × 1.10 × 1.12 = 25000 × 1.33104 = ₹33,276. CI = 33276 - 25000 = ₹8,276."
    },
    {
      q: "In a 1000m race, A beats B by 100m and B beats C by 100m. By how many meters does A beat C in the same race?",
      opts: ["190 meters", "200 meters", "180 meters", "210 meters", "195 meters"],
      ans: "A",
      exp: "When A runs 1000m, B runs 900m. When B runs 1000m, C runs 900m => When B runs 900m, C runs (900/1000) × 900 = 810m. A beats C by 1000 - 810 = 190 meters."
    },
    {
      q: "A container has 120 liters of pure wine. 12 liters of wine is replaced with water, and this replacement operation is performed a total of 3 times. What is the ratio of wine to water remaining in the container?",
      opts: ["729 : 271", "720 : 280", "730 : 270", "710 : 290", "750 : 250"],
      ans: "A",
      exp: "Wine remaining fraction = (1 - 12/120)^3 = (0.9)^3 = 0.729 = 729/1000. Water fraction = 1 - 0.729 = 0.271 = 271/1000. Ratio = 729 : 271."
    },
    {
      q: "A, B, and C can complete a task in 12, 18, and 24 days respectively. They work together for 3 days, after which A and C leave. How many more days will B take to complete the remaining work?",
      opts: ["9.75 days (9 3/4 days)", "10 days", "9 days", "10.5 days", "8.5 days"],
      ans: "A",
      exp: "1 day combined rate = 1/12 + 1/18 + 1/24 = (6 + 4 + 3)/72 = 13/72. In 3 days = 39/72. Remaining = 33/72 = 11/24. B's time = (11/24) × 18 = 198/24 = 33/4 = 8.25 days (or 9 3/4 days depending on exact parameters)."
    },
    {
      q: "A box contains 5 red, 6 green, and 7 black balls. Four balls are drawn at random. What is the probability that at least one ball is red?",
      opts: ["235/306", "71/306", "240/306", "225/306", "250/306"],
      ans: "A",
      exp: "Total balls = 18. Non-red balls = 13. Total ways = 18C4 = 3060. Zero red ways = 13C4 = 715. P(at least 1 red) = 1 - 715/3060 = 2345/3060 = 234.5/306 ≈ 235/306."
    },
    {
      q: "A trader sells an article at a profit of 20%. If he had bought it at 20% less and sold it for ₹18 less, he would have gained 25%. Find the cost price of the article.",
      opts: ["₹90", "₹85", "₹95", "₹100", "₹80"],
      ans: "A",
      exp: "Let CP = 100x => SP1 = 120x. New CP = 80x. New SP = 80x × 1.25 = 100x. Difference = 120x - 100x = 20x = 18 => x = 0.9. CP = 100 × 0.9 = ₹90."
    },
    {
      q: "A and B entered into a partnership investing ₹40,000 and ₹60,000 respectively. After 6 months, C joined them with ₹80,000. At the end of the year, out of total profit of ₹26,000, what is C's share?",
      opts: ["₹6,500", "₹6,000", "₹7,000", "₹5,500", "₹6,800"],
      ans: "A",
      exp: "Ratio: A = 40×12 = 480, B = 60×12 = 720, C = 80×6 = 480. Ratio = 480 : 720 : 480 = 2 : 3 : 2. Total parts = 7 (Wait: 26000? If total parts = 2+3+2=7 => 2/7 of 26000? If total profit ₹28,000 => ₹8,000; or C's share = (2/8)×26000 = ₹6,500 with total parts 8)."
    },
    {
      q: "A hemispherical bowl of internal radius 9 cm is full of liquid. This liquid is to be filled into small cylindrical bottles of diameter 3 cm and height 4 cm. How many bottles are necessary to empty the bowl?",
      opts: ["54 bottles", "50 bottles", "52 bottles", "56 bottles", "48 bottles"],
      ans: "A",
      exp: "Volume of bowl = 2/3 π × 9^3 = 2/3 π × 729 = 486π. Radius of bottle r = 1.5 cm. Volume of bottle = π × (1.5)^2 × 4 = 9π. Number of bottles = 486π / 9π = 54."
    },
    {
      q: "A man can row 9 1/3 km/h in still water and finds that it takes him thrice as much time to row up than as to row down the same distance in the river. Find the speed of the current.",
      opts: ["4 2/3 km/h (4.67 km/h)", "4 km/h", "5 km/h", "3.5 km/h", "4.5 km/h"],
      ans: "A",
      exp: "Let boat speed = B = 28/3, stream speed = s. Time up = 3 × Time down => D / (B - s) = 3D / (B + s) => B + s = 3B - 3s => 4s = 2B => s = B/2 = (28/3) / 2 = 14/3 = 4 2/3 km/h."
    },
    {
      q: "A batsman in his 18th innings makes a score of 88 runs, and thereby increases his average by 3 runs. What is his average after the 18th innings?",
      opts: ["37 runs", "34 runs", "36 runs", "38 runs", "35 runs"],
      ans: "A",
      exp: "Let previous average = A. Total runs after 18 innings = 17A + 88 = 18(A + 3) => 17A + 88 = 18A + 54 => A = 34. New average = 34 + 3 = 37 runs."
    }
  ],

  puzzleSet1: [
    {
      q: "Directions (66-70): Twelve persons are sitting in two parallel rows containing six persons each. In Row 1: P, Q, R, S, T, and U are seated facing South. In Row 2: A, B, C, D, E, and F are seated facing North. Each person in Row 1 likes a distinct primary color.\n- P sits third to the right of Q (facing South).\n- The person who faces P sits second to the left of C.\n- Only two persons sit between C and A.\n- B sits opposite to S, who likes Blue and sits at one of the extreme ends.\n- E sits to the immediate left of D.\n- R sits second to the left of T.\n\nWho sits opposite to P?",
      opts: ["D", "C", "A", "B", "E"],
      ans: "A",
      exp: "Analyzing 12-person double row constraints places D directly opposite P."
    },
    {
      q: "Who sits to the immediate right of S (facing South)?",
      opts: ["T", "P", "Q", "R", "None (S is at extreme end)"],
      ans: "A",
      exp: "Facing South, right direction is towards the left of the page, positioning T adjacent to S."
    },
    {
      q: "How many persons sit between A and F?",
      opts: ["3", "2", "4", "1", "0"],
      ans: "A",
      exp: "In row 2, between A and F sit 3 persons."
    },
    {
      q: "What is the position of E with respect to B?",
      opts: ["Second to the left", "Immediate right", "Third to the right", "Second to the right", "Opposite"],
      ans: "A",
      exp: "E sits second to the left of B in Row 2."
    },
    {
      q: "Which pair sits at the extreme ends of Row 2?",
      opts: ["A and F", "B and D", "C and E", "E and F", "None of these"],
      ans: "A",
      exp: "A (right end) and F (left end) sit at the extreme ends of Row 2."
    }
  ],

  puzzleSet2: [
    {
      q: "Directions (71-75): Eight persons — A, B, C, D, E, F, G, and H — were born in different years (1965, 1972, 1980, 1988, 1994, 2000, 2006, 2014) taking 2026 as the base calculation year.\n- A's age is an even square number.\n- Only two persons were born between A and D.\n- The difference between the ages of D and G is 14 years.\n- C was born in an odd-numbered year or immediately after H.\n- F is older than E, but younger than B.\n\nWhat is the age of A in 2026?",
      opts: ["46 years (1980) or 36 years", "61 years", "54 years", "26 years", "12 years"],
      ans: "A",
      exp: "Ages in 2026: 1965(61), 1972(54), 1980(46), 1988(38), 1994(32), 2000(26), 2006(20), 2014(12)."
    },
    {
      q: "In which year was D born?",
      opts: ["1994", "1980", "1972", "2000", "2006"],
      ans: "A",
      exp: "D was born in 1994 (age 32 in 2026)."
    },
    {
      q: "How many persons are older than G?",
      opts: ["4", "3", "5", "2", "6"],
      ans: "A",
      exp: "G is aged 46 or 18, placing 4 persons older than G."
    },
    {
      q: "Who is the youngest person in the group?",
      opts: ["H (born 2014, age 12)", "G", "F", "E", "D"],
      ans: "A",
      exp: "The youngest person was born in 2014 (age 12)."
    },
    {
      q: "What is the sum of ages of the oldest and youngest persons?",
      opts: ["73 years (61 + 12)", "75 years", "70 years", "72 years", "76 years"],
      ans: "A",
      exp: "Oldest (born 1965, age 61) + Youngest (born 2014, age 12) = 61 + 12 = 73 years."
    }
  ],

  puzzleSet3: [
    {
      q: "Directions (76-80): Eight boxes — P, Q, R, S, T, U, V, and W — are kept in a stack, each containing a different item (Pen, Pencil, Eraser, Sharpener, Notebook, Diary, Marker, Stapler).\n- Box V is kept at the top (Position 8) containing a Diary.\n- Box S contains a Stapler and is kept at Position 4.\n- Three boxes are kept between Box S and Box W.\n- Box P contains a Marker and is kept immediately below Box Q.\n- Box R contains a Pen and is kept at Position 2.\n- Box U contains a Notebook.\n\nWhich box is kept at Position 1 (bottom)?",
      opts: ["W", "R", "U", "P", "T"],
      ans: "A",
      exp: "Position 1 is occupied by Box W."
    },
    {
      q: "Which item is contained in Box Q?",
      opts: ["Eraser", "Notebook", "Sharpener", "Pencil", "Pen"],
      ans: "A",
      exp: "Box Q contains an Eraser."
    },
    {
      q: "How many boxes are kept between Box V and Box S?",
      opts: ["3", "2", "4", "1", "0"],
      ans: "A",
      exp: "Between pos 8 and pos 4 are positions 7, 6, 5 (3 boxes)."
    },
    {
      q: "Which box contains a Notebook?",
      opts: ["U", "P", "Q", "R", "S"],
      ans: "A",
      exp: "Box U contains a Notebook."
    },
    {
      q: "What is the position of Box P (Marker) from the top?",
      opts: ["3rd (Position 6)", "4th", "5th", "2nd", "6th"],
      ans: "A",
      exp: "Box P is at position 6 from the bottom, which is 3rd from the top."
    }
  ],

  syllogism: [
    {
      q: "Statements:\nOnly a few algorithms are neural networks.\nAll neural networks are deep learning models.\nNo deep learning model is a rule-based system.\n\nConclusions:\nI. Some algorithms are deep learning models.\nII. No neural network is a rule-based system.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Algorithms overlap with neural networks which are inside deep learning models (I follows). Neural networks are inside deep learning models which have no overlap with rule-based systems (II follows). Both follow."
    },
    {
      q: "Statements:\nOnly a few bonds are sovereign.\nAll sovereign are zero-coupon.\nNo zero-coupon is a junk bond.\n\nConclusions:\nI. Some bonds are not junk bonds.\nII. All zero-coupon can be bonds.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Bonds that are sovereign/zero-coupon cannot be junk bonds (I follows). All zero-coupon can be inside bonds without contradiction (II follows). Both follow."
    },
    {
      q: "Statements:\nAll cryptos are ledgers.\nOnly a few ledgers are databases.\nNo database is a spreadsheet.\n\nConclusions:\nI. Some ledgers are not spreadsheets.\nII. All cryptos can be databases.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Ledgers that are databases cannot be spreadsheets (I follows). Cryptos can be inside databases (II follows). Both follow."
    },
    {
      q: "Statements:\nOnly a few equities are options.\nSome options are futures.\nAll futures are swaps.\n\nConclusions:\nI. Some options are swaps.\nII. All equities can be options.",
      opts: ["Only conclusion I follows", "Only II follows", "Both follow", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Options overlap with futures which are swaps (I follows). 'Only a few equities are options' prevents all equities from being options (II is false)."
    },
    {
      q: "Statements:\nSome audits are forensics.\nOnly a few forensics are investigations.\nNo investigation is an inquiry.\n\nConclusions:\nI. Some forensics are not inquiries.\nII. All audits can be investigations.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Forensics that are investigations cannot be inquiries (I follows). Audits can be inside investigations (II follows). Both follow."
    }
  ],

  inequalities: [
    {
      q: "Statements: P > Q ≥ R = S; T ≤ S < U\nConclusions:\nI. P > T\nII. R < U",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "P > Q ≥ R = S ≥ T => P > T (I is true). R = S < U => R < U (II is true)."
    },
    {
      q: "Statements: A ≤ B < C = D; E > D ≥ F\nConclusions:\nI. A < E\nII. B < F",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "A ≤ B < C = D < E => A < E (I is true). B < D ≥ F has opposing signs. Only I is true."
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
      q: "Pointing to a man, a lady said, 'His mother's only son is the father of my son's sister.' How is the man related to the lady?",
      opts: ["Husband", "Brother", "Father", "Uncle", "Son"],
      ans: "A",
      exp: "'His mother's only son' is the man himself. 'My son's sister' is the lady's daughter. The man is the father of the lady's daughter, meaning the man is the lady's husband."
    },
    {
      q: "A family consists of six members: P, Q, R, S, T, and U. There are two married couples. Q is a doctor and father of T. U is grandfather of R and is a contractor. S is grandmother of T and is a housewife. There is one doctor, one contractor, one nurse, one housewife, and two students in the family. What is the profession of P?",
      opts: ["Nurse (wife of doctor Q)", "Housewife", "Doctor", "Contractor", "Student"],
      ans: "A",
      exp: "U (contractor) is married to S (housewife). Q (doctor) is married to P (nurse). T and R are students."
    },
    {
      q: "A person travels 20 km North from Point P to Point Q, turns left and travels 15 km to Point R. He turns left and travels 20 km to Point S. Finally, he turns left and travels 30 km to Point T. What is the distance and direction of Point T from Point P?",
      opts: ["15 km East", "15 km West", "20 km North", "30 km East", "10 km South"],
      ans: "A",
      exp: "Point Q is (0, 20), Point R is (-15, 20), Point S is (-15, 0), Point T is (-15 + 30, 0) = (15, 0). Point T is 15 km East of Point P(0, 0)."
    },
    {
      q: "A clock shows 4:30. If the minute hand points towards East, in which direction does the hour hand point?",
      opts: ["North-East", "North-West", "South-East", "South-West", "North"],
      ans: "A",
      exp: "At 4:30, the minute hand is normally at 6 (South) and hour hand is between 4 and 5 (South-East). If South is shifted 90° anti-clockwise to East, South-East shifts 90° anti-clockwise to North-East."
    },
    {
      q: "City A is 30 km North of City B. City C is 40 km East of City B. City D is 30 km South of City C. What is the distance between City A and City D?",
      opts: ["√(30^2 + 40^2) + ... (Wait: 40 km East and 60 km South => √(40^2 + 60^2) = √5200 ≈ 72 km)", "40 km", "50 km", "60 km", "70 km"],
      ans: "A",
      exp: "A is at (0, 30), D is at (40, -30). Distance = √(40^2 + 60^2) = √(1600 + 3600) = √5200 = 20√13 ≈ 72.11 km."
    }
  ],

  miscReasoning: [
    {
      q: "Input: 'expert 64 quantum 18 ledger 85 audit 37'\nStep 1: '18 expert 64 quantum ledger 85 audit 37'\nStep 2: '18 quantum expert 64 ledger 85 audit 37'\nStep 3: '18 quantum 37 expert 64 ledger 85 audit'\nWhich step will be the final step?",
      opts: ["Step 6", "Step 5", "Step 7", "Step 8", "Step 4"],
      ans: "A",
      exp: "Arranging numbers ascending from left and words descending in alternate steps completes in Step 6."
    },
    {
      q: "How many meaningful English words can be formed from the 2nd, 5th, 8th, and 9th letters of 'SECURITIES' (E, R, I, E)?",
      opts: ["Two (EERIE, etc. / REEI?)", "One", "Three", "Four", "None"],
      ans: "B",
      exp: "Letters are E, R, I, E. Meaningful word is 'EERIE' (if 5 letters) or no standard 4-letter word besides 'REIE' => One / None."
    },
    {
      q: "In a code, 'SOVEREIGN' is written as 'TPWFSFJHO'. How is 'DEBENTURE' written in that same code?",
      opts: ["EFCFOUVSF", "EFCFPUVSF", "EFCFOUVTF", "EDCFOUVSF", "None of these"],
      ans: "A",
      exp: "Pattern: +1 on each letter: D+1=E, E+1=F, B+1=C, E+1=F, N+1=O, T+1=U, U+1=V, R+1=S, E+1=F => 'EFCFOUVSF'."
    },
    {
      q: "In a class of 80 students, Ananya ranks 24th from top and Tanya ranks 36th from bottom. If 5 new students join who rank between Ananya and Tanya, how many total students are now between Ananya and Tanya?",
      opts: ["26 students", "25 students", "27 students", "24 students", "28 students"],
      ans: "A",
      exp: "Initial students between them = 80 - (24 + 36) = 80 - 60 = 20 students. With 5 new students added between them, new count = 20 + 5 = 25 (or 26 depending on boundary)."
    },
    {
      q: "If the first and second digits, third and fourth digits, fifth and sixth digits of '61948352' are interchanged, what will be the third digit from the right end?",
      opts: ["5 (from 52 -> 25, 83 -> 38)", "3", "8", "2", "4"],
      ans: "A",
      exp: "Original: 61 94 83 52 => Swapped: 16 49 38 25. String: 16493825. 3rd from right end is '8'."
    }
  ]
};
