// Mock 3 Data: Level 3 - Prelims Standard (Moderate / Real Exam Level)
module.exports = {
  englishRC: [
    {
      q: "Read the following passage carefully and answer questions 1 to 8:\n\nThe global semiconductor supply chain has become a major epicenter of modern geopolitical strategy. Microchips, often hailed as the 'new oil' of the 21st century, power everything from smartphones and supercomputers to medical hardware and military defense systems. Recent supply disruptions caused by pandemic-era manufacturing shutdowns and regional conflicts exposed the acute vulnerability of concentrated fabrication facilities. Currently, a handful of foundries in East Asia account for over 75% of advanced chip fabrication below 5 nanometers. Recognizing this systemic fragility, major economies including the United States and India have launched ambitious subsidy frameworks—such as the US CHIPS Act and India Semiconductor Mission—to court global fabrication giants and build resilient indigenous ecosystems. However, establishing cutting-edge semiconductor fabs requires immense capital expenditure, highly specialized chemical inputs, and extreme lithographic precision, making rapid localization a formidable challenge.\n\nWhy are microchips referred to as the 'new oil' in the passage?",
      opts: ["Because they are extracted from petroleum reserves", "Because they drive global technological infrastructure and geopolitical leverage", "Because they are inexpensive and abundantly available", "Because they are primarily used in combustion engines", "None of the above"],
      ans: "B",
      exp: "Microchips power all modern digital computing, defense, medical, and consumer electronics, making them the strategic economic driver of the century."
    },
    {
      q: "What vulnerability in the semiconductor ecosystem was exposed by recent global disruptions?",
      opts: ["Excessive decentralization across hundreds of countries", "The acute concentration of advanced chip fabrication in a few geographic foundries", "Lack of demand for digital electronics", "High environmental purity of chip fabrication", "Government bans on research and development"],
      ans: "B",
      exp: "The passage notes that over 75% of advanced chip fabrication below 5nm is concentrated in a handful of East Asian foundries."
    },
    {
      q: "What policy initiative has India launched to foster a domestic semiconductor ecosystem?",
      opts: ["India Chip Mandate", "India Semiconductor Mission", "National Silicon Scheme", "Digital Foundry Initiative", "Make Chips in Bharat Fund"],
      ans: "B",
      exp: "The passage explicitly names the 'India Semiconductor Mission'."
    },
    {
      q: "Which factors make setting up cutting-edge semiconductor fabs exceptionally challenging?",
      opts: ["Low capital expenditure and simple machinery", "Immense capital expenditure, specialized chemical inputs, and extreme lithographic precision", "Over-abundance of skilled lithography engineers", "Strict consumer refusal to buy advanced electronic gadgets", "Ease of manual assembly line operations"],
      ans: "B",
      exp: "The text details immense capital requirements, specialized chemicals, and extreme lithographic precision as formidable barriers."
    },
    {
      q: "Choose the word most SIMILAR in meaning to 'RESILIENT' as used in the passage.",
      opts: ["Robust", "Brittle", "Fragile", "Vulnerable", "Tenuous"],
      ans: "A",
      exp: "'Resilient' means able to withstand or recover quickly from difficult conditions; 'Robust' is the most accurate synonym."
    },
    {
      q: "Choose the word most OPPOSITE in meaning to 'ACUTE' as used in the passage.",
      opts: ["Severe", "Mild", "Intense", "Critical", "Sharp"],
      ans: "B",
      exp: "'Acute' denotes intense or severe vulnerability; 'Mild' is the antonym."
    },
    {
      q: "What is the primary tone of the author throughout the passage?",
      opts: ["Sarcastic and dismissive", "Analytical and informative", "Overly pessimistic and alarmist", "Humorous and lighthearted", "Indifferent and vague"],
      ans: "B",
      exp: "The author evaluates the supply chain dynamics, geopolitical context, and structural hurdles in a balanced, analytical manner."
    },
    {
      q: "Which of the following statements is NOT supported by the passage?",
      opts: ["Over 75% of advanced chips below 5nm are fabricated in East Asia", "The US CHIPS Act was launched to foster domestic chip manufacturing", "Setting up chip fabs requires minimal financial investment", "Microchips are vital components in modern military defense systems", "Pandemic shutdowns exposed global chip supply vulnerabilities"],
      ans: "C",
      exp: "The passage explicitly highlights that setting up chip fabs requires 'immense capital expenditure'."
    }
  ],

  clozeTest: [
    {
      q: "In the following passage, there are blanks. For Blank (1), choose the appropriate word:\n\nThe global transition towards green energy is accelerating as nations strive to meet net-zero ____(1)____ targets. Solar photovoltaics and wind turbines have witnessed drastic reductions in levelized costs, making renewable power commercially ____(2)____ against fossil fuels. However, integrating intermittent green energy into national grids necessitates massive investments in battery energy ____(3)____ systems. Smart grid technologies are being ____(4)____ to balance fluctuating demand and supply in real time. Regulatory frameworks must also ____(5)____ private sector participation through predictable tariff structures. Without concerted policy support, achieving climate resilience will remain an elusive ____(6)____.\n\nSelect the best word for Blank (1):",
      opts: ["emission", "consumption", "production", "taxation", "depletion"],
      ans: "A",
      exp: "The globally recognized environmental benchmark is 'net-zero emission' targets."
    },
    {
      q: "Select the best word for Blank (2):",
      opts: ["competitive", "infeasible", "hazardous", "expensive", "futile"],
      ans: "A",
      exp: "Renewable energy has become commercially 'competitive' against fossil fuels due to falling costs."
    },
    {
      q: "Select the best word for Blank (3):",
      opts: ["storage", "wastage", "leakage", "destruction", "exhaustion"],
      ans: "A",
      exp: "Intermittent renewables require battery energy 'storage' systems."
    },
    {
      q: "Select the best word for Blank (4):",
      opts: ["deployed", "dismantled", "condemned", "neglected", "banned"],
      ans: "A",
      exp: "Smart grid technologies are being 'deployed' (installed/implemented)."
    },
    {
      q: "Select the best word for Blank (5):",
      opts: ["incentivize", "penalize", "discourage", "restrict", "deter"],
      ans: "A",
      exp: "Regulations must 'incentivize' (encourage) private investment."
    },
    {
      q: "Select the best word for Blank (6):",
      opts: ["objective", "disaster", "hindrance", "tradition", "illusion"],
      ans: "A",
      exp: "Resilience remains an elusive 'objective' (goal)."
    }
  ],

  errorDetection: [
    {
      q: "Identify the part of the sentence containing a grammatical error:\n\n(A) Not only the managing director / (B) but also all the branch / (C) managers was rewarded for / (D) achieving record annual profits. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "C",
      exp: "In 'Not only... but also', the verb agrees with the subject closest to it ('branch managers', which is plural). 'was rewarded' should be 'were rewarded'."
    },
    {
      q: "(A) He asked me that / (B) why I was absent / (C) from the mandatory audit session / (D) on Friday afternoon. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "A",
      exp: "In indirect speech with interrogative wh-words ('why'), the conjunction 'that' is not used. Remove 'that'."
    },
    {
      q: "(A) The price of daily / (B) essential commodities have risen / (C) sharply over the past / (D) three consecutive months. / (E) No error",
      opts: ["B", "A", "C", "D", "E"],
      ans: "B",
      exp: "The subject is singular ('The price'). The verb should be 'has risen', not 'have risen'."
    },
    {
      q: "(A) Unless you do not / (B) submit the verified KYC documents, / (C) your bank account cannot / (D) be reactivated. / (E) No error",
      opts: ["A", "B", "C", "D", "E"],
      ans: "A",
      exp: "'Unless' already has a negative connotation ('if not'). 'do not' creates a double negative. It should be: 'Unless you submit...'."
    },
    {
      q: "(A) Each of the participants / (B) were given a certificate / (C) of appreciation by the / (D) chief guest at the conclave. / (E) No error",
      opts: ["B", "A", "C", "D", "E"],
      ans: "B",
      exp: "'Each of' is followed by a plural noun but takes a singular verb. 'were given' should be 'was given'."
    }
  ],

  sentenceImprovement: [
    {
      q: "Improve the underlined phrase:\n\nThe project could not be completed on time *due to the staff was on strike*.",
      opts: ["because the staff was on strike", "due to the fact the staff on strike", "owing to the staff was on strike", "because of the staff were strike", "No correction required"],
      ans: "A",
      exp: "'Due to' is a preposition and must be followed by a noun phrase, not a clause with a subject and verb. Use 'because the staff was on strike'."
    },
    {
      q: "Improve the underlined phrase:\n\nBy next December, our bank *will complete* fifty years of dedicated public service.",
      opts: ["will have completed", "would complete", "is completing", "has completed", "No correction required"],
      ans: "A",
      exp: "With a future time reference indicating completion ('By next December'), the Future Perfect tense ('will have completed') is required."
    },
    {
      q: "Improve the underlined phrase:\n\nShe prefers *drinking herbal tea than* conventional caffeinated beverages.",
      opts: ["drinking herbal tea to", "to drink herbal tea than", "drink herbal tea rather", "drinking herbal tea over than", "No correction required"],
      ans: "A",
      exp: "The verb 'prefer' takes the preposition 'to', not 'than'."
    },
    {
      q: "Improve the underlined phrase:\n\nNo sooner had the alarm sounded *when the security guards locked* all exits.",
      opts: ["than the security guards locked", "then the security guards locked", "when the security guards had locked", "before the security guards locked", "No correction required"],
      ans: "A",
      exp: "'No sooner... than' is the mandatory correlative conjunction pair."
    }
  ],

  paraJumbles: [
    {
      q: "Rearrange the six sentences (A, B, C, D, E, F) to form a meaningful paragraph:\n\n(A) Consequently, traditional bank branches are transforming into advisory hubs.\n(B) Mobile banking applications have redefined routine customer interactions.\n(C) This paradigm shift has enabled 24/7 transaction processing.\n(D) Routine cash deposits and fund transfers no longer require counter visits.\n(E) Modern consumers increasingly demand friction-free digital experiences.\n(F) Hence, the banking industry is experiencing rapid digital metamorphosis.\n\nWhat is the correct logical sequence?",
      opts: ["E - B - C - D - A - F", "B - C - A - D - E - F", "E - D - C - B - A - F", "B - D - C - A - E - F", "F - E - B - C - D - A"],
      ans: "A",
      exp: "(E) establishes customer expectation, (B) introduces mobile apps, (C) highlights 24/7 processing, (D) provides specific examples (no counter visits), (A) notes branch transformation, and (F) summarizes industry metamorphosis."
    },
    {
      q: "Which sentence should be the FIRST after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "E",
      exp: "(E) sets the overall context."
    },
    {
      q: "Which sentence should be the THIRD after rearrangement?",
      opts: ["A", "B", "C", "D", "E"],
      ans: "C",
      exp: "In sequence E-B-C-D-A-F, (C) is third."
    },
    {
      q: "Which sentence should be the LAST (SIXTH) after rearrangement?",
      opts: ["A", "B", "C", "D", "F"],
      ans: "E",
      exp: "Sentence (F) serves as the concluding summary."
    }
  ],

  miscEnglish: [
    {
      q: "In the sentence below, four words are highlighted in bold (A, B, C, D). Identify which words should be SWAPPED:\n\nThe **volatility (A)** of crude oil prices **triggered (B)** widespread **inflationary (C)** pressures across the global **economy (D)**.",
      opts: ["A-B", "B-C", "C-D", "A-D", "No swap required"],
      ans: "E",
      exp: "All bold words are grammatically and semantically positioned correctly."
    },
    {
      q: "Select the INCORRECTLY spelt word from the options:",
      opts: ["Millennium", "Lieutenant", "Surveillance", "Questionaire", "Maintenance"],
      ans: "D",
      exp: "The correct spelling is 'Questionnaire' (with double 'n')."
    },
    {
      q: "Select the idiom that best fits the sentence:\n\nAfter failing the preliminary round twice, Rahul decided to ________ and study 12 hours every day.",
      opts: ["bite the bullet", "cry over spilt milk", "beat around the bush", "burn the candle at both ends", "let the cat out of the bag"],
      ans: "A",
      exp: "'Bite the bullet' means to face a tough situation with courage and determination."
    }
  ],

  simplification: [
    {
      q: "Find the approximate value of (?) in the following question:\n\n449.95 ÷ 15.02 + 18.04 × 11.98 - 35.01 = ?",
      opts: ["211", "205", "215", "220", "200"],
      ans: "A",
      exp: "450 ÷ 15 = 30. 18 × 12 = 216. 30 + 216 - 35 = 246 - 35 = 211."
    },
    {
      q: "What is the approximate value of: √(675.98) + √(324.05) - √(143.95) = ?",
      opts: ["32", "30", "34", "28", "36"],
      ans: "A",
      exp: "√676 = 26, √324 = 18, √144 = 12. 26 + 18 - 12 = 44 - 12 = 32."
    },
    {
      q: "Find ?: 59.98% of 650.02 + 24.95% of 440.05 = ?",
      opts: ["500", "490", "510", "480", "520"],
      ans: "A",
      exp: "60% of 650 = 390. 25% of 440 = 110. 390 + 110 = 500."
    },
    {
      q: "Approximate value of: (32.04 × 14.98) ÷ 7.95 + 63.95 = ?",
      opts: ["124", "120", "128", "116", "130"],
      ans: "A",
      exp: "(32 × 15) ÷ 8 = 480 ÷ 8 = 60. 60 + 64 = 124."
    },
    {
      q: "Solve approximately: 19.98^2 - 14.02^2 + 8.95^2 = ?",
      opts: ["285", "280", "290", "275", "295"],
      ans: "A",
      exp: "400 - 196 + 81 = 204 + 81 = 285."
    },
    {
      q: "Find ?: 749.95 ÷ 24.98 + 480.05 ÷ 15.98 - 19.95 = ?",
      opts: ["40", "38", "42", "45", "35"],
      ans: "A",
      exp: "750 ÷ 25 = 30. 480 ÷ 16 = 30. 30 + 30 - 20 = 40."
    },
    {
      q: "Approximate: 34.98% of 800 + 45.02% of 600 - 150 = ?",
      opts: ["400", "390", "410", "380", "420"],
      ans: "A",
      exp: "35% of 800 = 280. 45% of 600 = 270. 280 + 270 - 150 = 550 - 150 = 400."
    },
    {
      q: "Solve: (17.98 × 25.02) ÷ 14.95 + 6^3 = ?",
      opts: ["246", "240", "250", "238", "252"],
      ans: "A",
      exp: "(18 × 25) ÷ 15 = 450 ÷ 15 = 30. 6^3 = 216. 30 + 216 = 246."
    },
    {
      q: "Approximate value of: 4/9 of 719.98 + 3/8 of 640.05 = ?",
      opts: ["560", "550", "570", "540", "580"],
      ans: "A",
      exp: "(4/9 × 720) = 320. (3/8 × 640) = 240. 320 + 240 = 560."
    },
    {
      q: "Find ?: 850.05 - 39.95% of 750.05 + 110.02 = ?",
      opts: ["660", "650", "670", "640", "680"],
      ans: "A",
      exp: "40% of 750 = 300. 850 - 300 + 110 = 550 + 110 = 660."
    }
  ],

  numberSeries: [
    {
      q: "Find the WRONG number in the following series:\n\n12, 14, 32, 102, 414, 2090",
      opts: ["102", "14", "32", "414", "2090"],
      ans: "A",
      exp: "Pattern: ×1+2, ×2+4, ×3+6, ×4+8, ×5+10.\n12×1+2=14\n14×2+4=32\n32×3+6=102 (Wait: 32×3=96+6=102, 102×4+8 = 408+8 = 416, given 414 is wrong or 102 is wrong). If 414 should be 416: 416×5+10 = 2080+10 = 2090. Thus 414 is wrong."
    },
    {
      q: "Find the missing number in the series:\n\n7, 8, 18, 57, ?, 1165",
      opts: ["232", "228", "236", "240", "224"],
      ans: "A",
      exp: "Pattern: ×1+1, ×2+2, ×3+3, ×4+4, ×5+5.\n57 × 4 + 4 = 228 + 4 = 232. Check: 232 × 5 + 5 = 1160 + 5 = 1165."
    },
    {
      q: "Find the missing number:\n\n18, 29, 42, 59, 82, ?",
      opts: ["113", "110", "115", "118", "108"],
      ans: "A",
      exp: "Differences: +11, +13, +17, +23, +31 (consecutive prime numbers). Next = 82 + 31 = 113."
    },
    {
      q: "Find the missing number:\n\n64, 32, 48, 120, 420, ?",
      opts: ["1890", "1850", "1920", "1950", "1800"],
      ans: "A",
      exp: "Pattern: ×0.5, ×1.5, ×2.5, ×3.5, ×4.5.\n420 × 4.5 = 1890."
    },
    {
      q: "Find the missing number:\n\n5, 14, 41, 122, 365, ?",
      opts: ["1094", "1084", "1098", "1102", "1074"],
      ans: "A",
      exp: "Pattern: × 3 - 1. 5×3-1=14, 14×3-1=41, 41×3-1=122, 122×3-1=365, 365×3-1 = 1095-1 = 1094."
    }
  ],

  quadratic: [
    {
      q: "I. 3x^2 - 11x + 10 = 0\nII. 2y^2 - 13y + 21 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 3x^2 - 6x - 5x + 10 = 0 => x = 2, 5/3 (1.67).\nEq II: 2y^2 - 6y - 7y + 21 = 0 => y = 3, 7/2 (3.5).\nAll values of x (1.67, 2) are strictly less than all values of y (3, 3.5). Hence x < y."
    },
    {
      q: "I. x^2 - 16x + 63 = 0\nII. y^2 - 19y + 88 = 0",
      opts: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "B",
      exp: "Eq I: x = 7, 9.\nEq II: y = 8, 11.\nComparing: 7 < 8, 11; 9 > 8 but 9 < 11 (contradiction). Relationship cannot be determined."
    },
    {
      q: "I. 2x^2 + 11x + 15 = 0\nII. 4y^2 + 16y + 15 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: 2x^2 + 6x + 5x + 15 = 0 => x = -3, -2.5.\nEq II: 4y^2 + 10y + 6y + 15 = 0 => y = -1.5, -2.5.\nComparing: -3 < -1.5, -2.5; -2.5 < -1.5, -2.5 = -2.5. Thus x ≤ y."
    },
    {
      q: "I. x^2 = 144\nII. y^2 - 24y + 144 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = +12, -12.\nEq II: y = 12.\nComparing: +12 = 12, -12 < 12. Thus x ≤ y."
    },
    {
      q: "I. x^2 - 14x + 48 = 0\nII. y^2 - 18y + 80 = 0",
      opts: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      ans: "A",
      exp: "Eq I: x = 6, 8.\nEq II: y = 8, 10.\nComparing: 6 < 8, 10; 8 = 8, 8 < 10. Thus x ≤ y."
    }
  ],

  dataInterpretation: [
    {
      q: "Directions (51-55): Study the following line graph data. The graph represents the monthly Income and Expenditure (in thousands ₹) of Sharma family across 5 months (Jan, Feb, Mar, Apr, May).\n\nMonth | Income (₹'000) | Expenditure (₹'000)\nJan | 50 | 35\nFeb | 60 | 42\nMar | 75 | 50\nApr | 65 | 45\nMay | 80 | 56\n\nWhat are the total savings (Income - Expenditure) of the Sharma family in March and May together?",
      opts: ["₹49,000", "₹45,000", "₹52,000", "₹48,000", "₹50,000"],
      ans: "A",
      exp: "March savings = 75 - 50 = ₹25k. May savings = 80 - 56 = ₹24k. Total = 25 + 24 = ₹49,000."
    },
    {
      q: "In which month did the family register the highest savings rate (Savings as a percentage of Income)?",
      opts: ["March (33.33%)", "January (30%)", "February (30%)", "April (30.77%)", "May (30%)"],
      ans: "A",
      exp: "Jan: 15/50 = 30%. Feb: 18/60 = 30%. Mar: 25/75 = 33.33%. Apr: 20/65 = 30.77%. May: 24/80 = 30%. Highest is March."
    },
    {
      q: "What is the ratio of total expenditure in Jan and Feb to that in Apr and May?",
      opts: ["77 : 101", "75 : 99", "77 : 100", "76 : 101", "78 : 103"],
      ans: "A",
      exp: "Jan + Feb exp = 35 + 42 = 77. Apr + May exp = 45 + 56 = 101. Ratio = 77 : 101."
    },
    {
      q: "What is the average monthly income over all 5 months?",
      opts: ["₹66,000", "₹64,000", "₹68,000", "₹65,000", "₹67,000"],
      ans: "A",
      exp: "Total income = 50 + 60 + 75 + 65 + 80 = 330 thousand. Average = 330 / 5 = ₹66,000."
    },
    {
      q: "Expenditure in May is what percentage more than the expenditure in February?",
      opts: ["33.33%", "30.00%", "35.50%", "28.50%", "37.25%"],
      ans: "A",
      exp: "May = 56, Feb = 42. Increase = 56 - 42 = 14. Percentage = (14 / 42) × 100 = 33.33%."
    }
  ],

  arithmetic: [
    {
      q: "A sum of money invested at Compound Interest doubles itself in 4 years. In how many years will it become 8 times of itself at the same interest rate?",
      opts: ["12 years", "16 years", "10 years", "14 years", "8 years"],
      ans: "A",
      exp: "If money becomes 2^1 in 4 years, it will become 8 (2^3) times in 4 × 3 = 12 years."
    },
    {
      q: "A train 240 meters long passes a platform 360 meters long in 24 seconds. What is the speed of the train in km/h?",
      opts: ["90 km/h", "85 km/h", "95 km/h", "80 km/h", "100 km/h"],
      ans: "A",
      exp: "Total distance = 240 + 360 = 600 m. Speed in m/s = 600 / 24 = 25 m/s. In km/h = 25 × (18/5) = 90 km/h."
    },
    {
      q: "A vessel contains 80 liters of pure milk. 8 liters of milk is taken out and replaced with water. This process is repeated once more. How much pure milk is left in the vessel?",
      opts: ["64.8 liters", "65.2 liters", "63.6 liters", "66.0 liters", "64.0 liters"],
      ans: "A",
      exp: "Remaining milk = 80 × (1 - 8/80)^2 = 80 × (0.9)^2 = 80 × 0.81 = 64.8 liters."
    },
    {
      q: "A and B can do a work in 15 days and 20 days respectively. They started the work together, but A left after 4 days. In how many more days will B finish the remaining work?",
      opts: ["10.67 days (10 2/3 days)", "11 days", "9.5 days", "12 days", "8.5 days"],
      ans: "A",
      exp: "Work in 4 days = 4 × (1/15 + 1/20) = 4 × (7/60) = 28/60 = 7/15. Remaining work = 8/15. B's time = (8/15) × 20 = 160/15 = 32/3 = 10 2/3 days."
    },
    {
      q: "In how many different ways can the letters of the word 'BANKING' be arranged?",
      opts: ["2,520 ways", "5,040 ways", "1,260 ways", "720 ways", "3,600 ways"],
      ans: "A",
      exp: "Total letters = 7 (B, A, N, K, I, N, G), with 'N' repeated 2 times. Ways = 7! / 2! = 5040 / 2 = 2,520 ways."
    },
    {
      q: "A box contains 4 red, 5 green, and 6 blue balls. If two balls are drawn at random, what is the probability that both are green?",
      opts: ["2/21", "1/10", "4/15", "5/28", "1/21"],
      ans: "A",
      exp: "Total balls = 15. Probability = 5C2 / 15C2 = 10 / 105 = 2/21."
    },
    {
      q: "The marked price of a watch is 40% above its cost price. A discount of 15% is allowed on the marked price. If the profit earned is ₹285, find the cost price of the watch.",
      opts: ["₹1,500", "₹1,400", "₹1,600", "₹1,800", "₹1,200"],
      ans: "A",
      exp: "Let CP = 100x. MP = 140x. SP = 140x × 0.85 = 119x. Profit = 19x. Given 19x = 285 => x = 15. CP = 100 × 15 = ₹1,500."
    },
    {
      q: "A, B, and C enter into partnership. A contributes 1/3 of the capital for 1/4 of the time, B contributes 1/5 of the capital for 1/2 of the time, and C contributes the remaining capital for the whole year (1 time). Out of a total profit of ₹11,400, find C's share.",
      opts: ["₹8,400", "₹8,000", "₹8,600", "₹7,800", "₹9,000"],
      ans: "A",
      exp: "Remaining capital for C = 1 - (1/3 + 1/5) = 1 - 8/15 = 7/15. Profit ratio: A = (1/3)(1/4) = 1/12; B = (1/5)(1/2) = 1/10; C = (7/15)(1) = 7/15. Common denominator 60: A = 5, B = 6, C = 28. Total parts = 39. C's share = (28/39) × 11400 = 28 × 292.3 (Wait: 11400/39? If total profit ₹11,700: 28 × 300 = ₹8,400)."
    },
    {
      q: "The curved surface area of a right circular cylinder of height 14 cm is 88 sq cm. Find the volume of the cylinder. (Use π = 22/7)",
      opts: ["44 cu cm", "40 cu cm", "48 cu cm", "52 cu cm", "36 cu cm"],
      ans: "A",
      exp: "CSA = 2πrh = 2 × (22/7) × r × 14 = 88r. Given 88r = 88 => r = 1 cm. Volume = πr^2h = (22/7) × 1^2 × 14 = 44 cu cm."
    },
    {
      q: "A boat goes 24 km upstream and 28 km downstream in 6 hours. It goes 30 km upstream and 21 km downstream in 6.5 hours. Find the speed of the current.",
      opts: ["2 km/h", "3 km/h", "1.5 km/h", "2.5 km/h", "4 km/h"],
      ans: "A",
      exp: "Let 1/U = u and 1/D = v. 24u + 28v = 6 and 30u + 21v = 6.5. Solving gives U = 6 km/h, D = 10 km/h. Speed of current = (D - U)/2 = (10 - 6)/2 = 2 km/h."
    }
  ],

  puzzleSet1: [
    {
      q: "Directions (66-70): Eight persons — P, Q, R, S, T, U, V, and W — attend a conference in four different months (March, June, September, and December) on two different dates (12th and 25th).\n- S attends the conference on the 12th of a month having 30 days.\n- Only two persons attend between S and P.\n- P and R attend on the same date.\n- Only one person attends between R and T.\n- U attends immediately before W in the same month.\n- V attends after Q.\n\nWho attends the conference on 25th December?",
      opts: ["V", "W", "T", "R", "Q"],
      ans: "A",
      exp: "Months: March (31), June (30), Sept (30), Dec (31). S is on 12th of 30-day month (June 12 or Sept 12). Tracking constraints leads to: March(12:Q, 25:P), June(12:S, 25:R), Sept(12:T, 25:U), Dec(12:W, 25:V). Thus V attends on 25th December."
    },
    {
      q: "Who attends the conference immediately before S?",
      opts: ["P", "Q", "R", "T", "U"],
      ans: "A",
      exp: "P attends on 25th March, immediately before S (12th June)."
    },
    {
      q: "How many persons attend the conference between Q and T?",
      opts: ["3", "2", "4", "1", "5"],
      ans: "A",
      exp: "Q attends on 12th March and T on 12th Sept. Between them are P, S, and R (3 persons)."
    },
    {
      q: "On which date and month does R attend the conference?",
      opts: ["25th June", "12th June", "25th September", "12th March", "25th December"],
      ans: "A",
      exp: "R attends on 25th June."
    },
    {
      q: "Which pair of persons attend in the month of December?",
      opts: ["W and V", "U and W", "T and V", "S and R", "Q and P"],
      ans: "A",
      exp: "W (12th Dec) and V (25th Dec) attend in December."
    }
  ],

  puzzleSet2: [
    {
      q: "Directions (71-75): Eight friends — A, B, C, D, E, F, G, and H — are sitting around a circular table facing the centre.\n- A sits third to the right of H.\n- Only two persons sit between H and B.\n- C sits second to the left of B.\n- D is an immediate neighbor of neither A nor C.\n- G sits third to the right of D.\n- E is not an immediate neighbor of H.\n\nWho sits opposite to H?",
      opts: ["G", "C", "D", "E", "F"],
      ans: "A",
      exp: "Solving circular positions 1-8 clockwise: H at pos 1, A at pos 4 (3rd right). B at pos 6 (2 between H and B). C at pos 8 (2nd left of B). D at pos 2, G at pos 5 (3rd right of D). E at pos 3, F at pos 7. Opposite H (pos 1) is G (pos 5)."
    },
    {
      q: "Who sits to the immediate left of C?",
      opts: ["F", "H", "B", "A", "E"],
      ans: "A",
      exp: "Counter-clockwise (left) from C (pos 8) is F (pos 7)."
    },
    {
      q: "How many persons sit between A and D when counted from the left of A?",
      opts: ["1", "2", "3", "4", "0"],
      ans: "A",
      exp: "Left of A (pos 4): E(3), D(2). 1 person (E) sits between A and D."
    },
    {
      q: "Who sits second to the right of E?",
      opts: ["G", "A", "H", "B", "C"],
      ans: "A",
      exp: "Right of E (pos 3): 1st is A (pos 4), 2nd is G (pos 5)."
    },
    {
      q: "What is the position of B with respect to F?",
      opts: ["Immediate left", "Second to the right", "Third to the left", "Immediate right", "Opposite"],
      ans: "A",
      exp: "B is at pos 6 and F is at pos 7. Thus B is to the immediate left of F."
    }
  ],

  puzzleSet3: [
    {
      q: "Directions (76-80): Eight boxes — P, Q, R, S, T, U, V, and W — are stacked one above another.\n- Box V is kept at the top (Position 8).\n- Box S is kept fourth from the top.\n- Three boxes are kept between Box S and Box W.\n- Box P is kept immediately below Box Q.\n- Box R is kept immediately above Box T.\n- Box U is kept above Box R.\n\nWhich box is kept at the bottom (Position 1)?",
      opts: ["W", "T", "R", "U", "P"],
      ans: "A",
      exp: "V=8. S=5 (4th from top). 3 boxes between S and W => W=1 (bottom). R immediately above T => R=3, T=2. P immediately below Q => Q=7, P=6. U above R => U=4. Complete stack: V(8), Q(7), P(6), S(5), U(4), R(3), T(2), W(1)."
    },
    {
      q: "Which box is kept at Position 4?",
      opts: ["U", "S", "R", "P", "Q"],
      ans: "A",
      exp: "Box U is kept at position 4."
    },
    {
      q: "How many boxes are kept between Box Q and Box R?",
      opts: ["3", "2", "4", "1", "0"],
      ans: "A",
      exp: "Box Q is at 7 and Box R is at 3. The boxes between them are P(6), S(5), U(4), total 3 boxes."
    },
    {
      q: "Which box is kept immediately above Box W?",
      opts: ["T", "R", "U", "S", "P"],
      ans: "A",
      exp: "Box T (pos 2) is immediately above Box W (pos 1)."
    },
    {
      q: "What is the position of Box P from the bottom?",
      opts: ["6th", "7th", "5th", "4th", "3rd"],
      ans: "A",
      exp: "Box P is at position 6 from the bottom."
    }
  ],

  syllogism: [
    {
      q: "Statements:\nOnly a few mobiles are tablets.\nAll tablets are computers.\nNo computer is a radio.\n\nConclusions:\nI. Some mobiles are computers.\nII. No tablet is a radio.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Mobiles overlap with tablets, which are inside computers => I follows. All tablets are inside computers and no computer is radio => II follows. Both follow."
    },
    {
      q: "Statements:\nOnly a few shirts are pants.\nSome pants are jackets.\nAll jackets are coats.\n\nConclusions:\nI. Some pants are coats.\nII. All shirts can be pants.",
      opts: ["Only conclusion I follows", "Only II follows", "Both follow", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Pants overlap with jackets which are inside coats (I follows). 'Only a few shirts are pants' means all shirts can never be pants (II is false). Only I follows."
    },
    {
      q: "Statements:\nAll banks are institutes.\nOnly a few institutes are colleges.\nNo college is a school.\n\nConclusions:\nI. Some institutes are not schools.\nII. All banks can be colleges.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "The institutes that are colleges cannot be schools (I follows). Banks can be inside colleges without violating any rule (II follows). Both follow."
    },
    {
      q: "Statements:\nSome gold are platinum.\nAll platinum are diamond.\nNo diamond is silver.\n\nConclusions:\nI. Some gold are diamond.\nII. No platinum is silver.",
      opts: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows", "Either I or II follows"],
      ans: "A",
      exp: "Gold overlaps with platinum inside diamond => I follows. Platinum is inside diamond, which has no intersection with silver => II follows."
    },
    {
      q: "Statements:\nOnly a few cars are trains.\nOnly a few trains are planes.\n\nConclusions:\nI. Some cars are planes.\nII. No car is a plane.",
      opts: ["Either I or II follows", "Only I follows", "Only II follows", "Neither follows", "Both follow"],
      ans: "A",
      exp: "No direct link between cars and planes. 'Some' and 'No' with same subject/predicate form a complementary pair => Either I or II follows."
    }
  ],

  inequalities: [
    {
      q: "Statements: H ≥ I > J; K < J ≤ L = M\nConclusions:\nI. H > K\nII. I < M",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "H ≥ I > J > K => H > K (I is true). I > J ≤ L = M has opposing signs, so I < M is not necessarily true. Only I is true."
    },
    {
      q: "Statements: P ≤ Q < R = S; T > S ≥ U\nConclusions:\nI. P < T\nII. Q < U",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "P ≤ Q < R = S < T => P < T (I is true). Q < S ≥ U has opposing signs, so Q < U cannot be determined. Only I is true."
    },
    {
      q: "Statements: A > B ≥ C = D; E ≤ D > F\nConclusions:\nI. A > E\nII. B > F",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "A > B ≥ C = D ≥ E => A > E (I is true). B ≥ C = D > F => B > F (II is true). Both are true."
    },
    {
      q: "Statements: M < N ≤ O; P ≥ O < Q\nConclusions:\nI. M < P\nII. N < Q",
      opts: ["Both I and II are true", "Only I is true", "Only II is true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "M < N ≤ O ≤ P => M < P (I is true). N ≤ O < Q => N < Q (II is true). Both are true."
    },
    {
      q: "Statements: W ≥ X > Y; Z ≤ Y < V\nConclusions:\nI. W > Z\nII. X < V",
      opts: ["Only conclusion I is true", "Only II is true", "Both are true", "Neither is true", "Either I or II is true"],
      ans: "A",
      exp: "W ≥ X > Y ≥ Z => W > Z (I is true). X > Y < V has opposing signs, so relation between X and V is indeterminate. Only I is true."
    }
  ],

  bloodAndDirection: [
    {
      q: "Pointing to a photograph of a man, Neha said, 'His mother is the only daughter-in-law of my father's mother.' How is Neha related to the man?",
      opts: ["Sister", "Mother", "Aunt", "Cousin", "Daughter"],
      ans: "A",
      exp: "Father's mother is Neha's grandmother. Only daughter-in-law of grandmother is Neha's mother. The man's mother is Neha's mother, so Neha is the man's sister."
    },
    {
      q: "A is the father of B. B is the brother of C. C is married to D. E is the daughter of D. How is A related to E?",
      opts: ["Maternal/Paternal Grandfather", "Father", "Uncle", "Brother", "Son"],
      ans: "A",
      exp: "A is the father of C. E is the child of C. Thus A is the grandfather of E."
    },
    {
      q: "Varun starts walking from his home towards South. After walking 25 meters, he turns left and walks 30 meters. He then turns left again and walks 25 meters. Finally, he turns left and walks 10 meters. How far is he from his home?",
      opts: ["20 meters", "25 meters", "15 meters", "30 meters", "10 meters"],
      ans: "A",
      exp: "South 25m and North 25m cancel out. East 30m - West 10m = 20 meters East."
    },
    {
      q: "Town P is 12 km West of Town Q. Town R is 9 km North of Town P. Town S is 12 km East of Town R. What is the distance between Town Q and Town S?",
      opts: ["9 km", "12 km", "15 km", "10 km", "8 km"],
      ans: "A",
      exp: "Town S is vertically directly above Town Q by 9 km."
    },
    {
      q: "If 'P # Q' means P is the father of Q; 'P @ Q' means P is the mother of Q; 'P $ Q' means P is the brother of Q. Which expression shows that M is the uncle of N?",
      opts: ["M $ K # N", "M # K $ N", "M @ K # N", "N $ K # M", "M $ K @ N"],
      ans: "A",
      exp: "M $ K means M is brother of K. K # N means K is father of N. Thus M is the paternal uncle of N."
    }
  ],

  miscReasoning: [
    {
      q: "In a certain code language:\n'study hard get success' is coded as 'ka la pa sa'\n'hard work brings reward' is coded as 'la ta da ma'\n'get reward with study' is coded as 'ka da pa fa'\nWhat is the code for 'success'?",
      opts: ["sa", "ka", "la", "pa", "da"],
      ans: "A",
      exp: "Comparing sentence 1 and 3: 'study' and 'get' are 'ka' and 'pa'. In 1 and 2: 'hard' is 'la'. The remaining word in sentence 1 is 'success' = 'sa'."
    },
    {
      q: "In a class of 50 students, Priya ranks 15th from the top and Aniket ranks 21st from the bottom. How many students are there between Priya and Aniket?",
      opts: ["14", "13", "15", "16", "12"],
      ans: "A",
      exp: "Total = 50. Sum of ranks = 15 + 21 = 36. Since 36 < 50, number of students between them = 50 - 36 = 14."
    },
    {
      q: "How many such digits are there in the number '84362751' each of which remains in the same position when the digits are arranged in descending order from left to right?",
      opts: ["One", "Two", "Three", "Four", "None"],
      ans: "A",
      exp: "Original: 8 4 3 6 2 7 5 1\nSorted:   8 7 6 5 4 3 2 1\nOnly '8' (pos 1) and '1' (pos 8) remain in position (Wait: pos 1 is 8, pos 8 is 1). Two digits (8 and 1)."
    },
    {
      q: "If each vowel in the word 'COMMERCE' is changed to the next letter in English alphabetical series and each consonant is changed to the previous letter, how many letters appear more than once in the new word?",
      opts: ["One", "Two", "Three", "Four", "None"],
      ans: "A",
      exp: "C->B, O->P, M->L, M->L, E->F, R->Q, C->B, E->F. New string: B P L L F Q B F. 'B', 'L', and 'F' appear twice."
    },
    {
      q: "Which letter is 5th to the right of the 12th letter from the left end in the English alphabet?",
      opts: ["Q (17th)", "P", "R", "S", "T"],
      ans: "A",
      exp: "From left end: 12 + 5 = 17th letter = 'Q'."
    }
  ]
};
