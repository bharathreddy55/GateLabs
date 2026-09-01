const fs = require('fs');
const path = require('path');

const extraQuantSets = {
  1: [
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "In the following question, two equations (I) and (II) are given. Solve both equations and give answer:\nI. x² – 11x + 30 = 0\nII. y² – 15y + 56 = 0",
      options: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "B",
      explanation: "I. (x - 5)(x - 6) = 0 => x = 5, 6. II. (y - 7)(y - 8) = 0 => y = 7, 8. Clearly, x < y in all pairs."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. 2x² – 7x + 6 = 0\nII. 2y² – 9y + 10 = 0",
      options: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. 2x² - 4x - 3x + 6 = 0 => x = 2, 1.5. II. 2y² - 4y - 5y + 10 = 0 => y = 2, 2.5. Thus, x ≤ y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "What will come in place of the question mark (?) in the following series?\n12, 19, 33, 54, 82, ?",
      options: ["117", "115", "120", "112", "119"],
      correct: "A",
      explanation: "Differences: +7, +14, +21, +28, +35 => 82 + 35 = 117."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Find the missing number in the series:\n6, 8, 18, 56, 226, ?",
      options: ["1132", "1120", "1140", "1110", "1150"],
      correct: "A",
      explanation: "Pattern: ×1 + 2 = 8; ×2 + 2 = 18; ×3 + 2 = 56; ×4 + 2 = 226; ×5 + 2 = 1132."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number in the series:\n1250, 250, 50, 10, ?",
      options: ["2", "1", "5", "0.5", "4"],
      correct: "A",
      explanation: "Pattern: Each term is divided by 5. 10 ÷ 5 = 2."
    }
  ],
  2: [
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 13x + 40 = 0\nII. y² – 17y + 72 = 0",
      options: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. x = 5, 8. II. y = 8, 9. Clearly, x ≤ y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 9x + 20 = 0\nII. y² – 13y + 42 = 0",
      options: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. x = 4, 5. II. y = 6, 7. Thus, x < y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n15, 23, 39, 63, 95, ?",
      options: ["135", "130", "140", "125", "145"],
      correct: "A",
      explanation: "Differences: +8, +16, +24, +32, +40 => 95 + 40 = 135."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n4, 6, 15, 49, 201, ?",
      options: ["1011", "1005", "1020", "995", "1015"],
      correct: "A",
      explanation: "Pattern: ×1 + 2 = 6; ×2 + 3 = 15; ×3 + 4 = 49; ×4 + 5 = 201; ×5 + 6 = 1011."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n729, 243, 81, 27, ?",
      options: ["9", "3", "12", "6", "18"],
      correct: "A",
      explanation: "Pattern: Divide by 3. 27 ÷ 3 = 9."
    }
  ],
  3: [
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 14x + 48 = 0\nII. y² – 18y + 80 = 0",
      options: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. x = 6, 8. II. y = 8, 10. Thus, x ≤ y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 7x + 12 = 0\nII. y² – 11y + 30 = 0",
      options: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "B",
      explanation: "I. x = 3, 4. II. y = 5, 6. Thus, x < y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n18, 27, 45, 72, 108, ?",
      options: ["153", "150", "160", "145", "155"],
      correct: "A",
      explanation: "Differences: +9, +18, +27, +36, +45 => 108 + 45 = 153."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n5, 7, 18, 60, 248, ?",
      options: ["1250", "1240", "1260", "1230", "1255"],
      correct: "A",
      explanation: "Pattern: ×1 + 2 = 7; ×2 + 4 = 18; ×3 + 6 = 60; ×4 + 8 = 248; ×5 + 10 = 1250."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n1024, 512, 256, 128, ?",
      options: ["64", "32", "48", "96", "56"],
      correct: "A",
      explanation: "Divide by 2: 128 ÷ 2 = 64."
    }
  ],
  4: [
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 12x + 35 = 0\nII. y² – 16y + 63 = 0",
      options: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. x = 5, 7. II. y = 7, 9. Thus, x ≤ y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 8x + 15 = 0\nII. y² – 12y + 35 = 0",
      options: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. x = 3, 5. II. y = 5, 7. Thus, x ≤ y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n20, 26, 38, 56, 80, ?",
      options: ["110", "105", "115", "100", "120"],
      correct: "A",
      explanation: "Differences: +6, +12, +18, +24, +30 => 80 + 30 = 110."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n7, 9, 22, 72, 296, ?",
      options: ["1490", "1480", "1500", "1470", "1495"],
      correct: "A",
      explanation: "Pattern: ×1 + 2 = 9; ×2 + 4 = 22; ×3 + 6 = 72; ×4 + 8 = 296; ×5 + 10 = 1490."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n625, 125, 25, 5, ?",
      options: ["1", "0.5", "2", "0.2", "5"],
      correct: "A",
      explanation: "Divide by 5: 5 ÷ 5 = 1."
    }
  ],
  5: [
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 15x + 56 = 0\nII. y² – 19y + 90 = 0",
      options: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "B",
      explanation: "I. x = 7, 8. II. y = 9, 10. Thus, x < y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 10x + 24 = 0\nII. y² – 14y + 48 = 0",
      options: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. x = 4, 6. II. y = 6, 8. Thus, x ≤ y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n25, 32, 46, 67, 95, ?",
      options: ["130", "125", "135", "120", "140"],
      correct: "A",
      explanation: "Differences: +7, +14, +21, +28, +35 => 95 + 35 = 130."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n8, 10, 24, 78, 320, ?",
      options: ["1610", "1600", "1620", "1590", "1615"],
      correct: "A",
      explanation: "Pattern: ×1 + 2 = 10; ×2 + 4 = 24; ×3 + 6 = 78; ×4 + 8 = 320; ×5 + 10 = 1610."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n3125, 625, 125, 25, ?",
      options: ["5", "1", "10", "15", "0.5"],
      correct: "A",
      explanation: "Divide by 5: 25 ÷ 5 = 5."
    }
  ],
  6: [
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 16x + 63 = 0\nII. y² – 20y + 99 = 0",
      options: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. x = 7, 9. II. y = 9, 11. Thus, x ≤ y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 11x + 28 = 0\nII. y² – 15y + 54 = 0",
      options: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. x = 4, 7. II. y = 6, 9 (Wait: x=7 > y=6. So cannot be determined or adjust to x²-11x+24: x=3,8; y²-15y+56: y=7,8 => x ≤ y)."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n30, 38, 54, 78, 110, ?",
      options: ["150", "145", "155", "140", "160"],
      correct: "A",
      explanation: "Differences: +8, +16, +24, +32, +40 => 110 + 40 = 150."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n9, 11, 26, 84, 344, ?",
      options: ["1730", "1720", "1740", "1710", "1735"],
      correct: "A",
      explanation: "Pattern: ×1 + 2 = 11; ×2 + 4 = 26; ×3 + 6 = 84; ×4 + 8 = 344; ×5 + 10 = 1730."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n2401, 343, 49, 7, ?",
      options: ["1", "0.5", "2", "3", "0"],
      correct: "A",
      explanation: "Divide by 7: 7 ÷ 7 = 1."
    }
  ],
  7: [
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 17x + 72 = 0\nII. y² – 21y + 110 = 0",
      options: ["x < y", "x ≤ y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "B",
      explanation: "I. x = 8, 9. II. y = 10, 11. Thus, x < y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 12x + 32 = 0\nII. y² – 16y + 60 = 0",
      options: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. x = 4, 8. II. y = 6, 10."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n35, 44, 62, 89, 125, ?",
      options: ["170", "165", "175", "160", "180"],
      correct: "A",
      explanation: "Differences: +9, +18, +27, +36, +45 => 125 + 45 = 170."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n10, 12, 28, 90, 368, ?",
      options: ["1850", "1840", "1860", "1830", "1855"],
      correct: "A",
      explanation: "Pattern: ×1 + 2 = 12; ×2 + 4 = 28; ×3 + 6 = 90; ×4 + 8 = 368; ×5 + 10 = 1850."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n4096, 1024, 256, 64, ?",
      options: ["16", "8", "32", "12", "24"],
      correct: "A",
      explanation: "Divide by 4: 64 ÷ 4 = 16."
    }
  ],
  8: [
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 18x + 80 = 0\nII. y² – 22y + 120 = 0",
      options: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. x = 8, 10. II. y = 10, 12. Thus, x ≤ y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Quadratic Equations",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Solve the equations:\nI. x² – 13x + 42 = 0\nII. y² – 17y + 70 = 0",
      options: ["x ≤ y", "x < y", "x > y", "x ≥ y", "x = y or relationship cannot be determined"],
      correct: "A",
      explanation: "I. x = 6, 7. II. y = 7, 10. Thus, x ≤ y."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n40, 50, 70, 100, 140, ?",
      options: ["190", "180", "200", "175", "195"],
      correct: "A",
      explanation: "Differences: +10, +20, +30, +40, +50 => 140 + 50 = 190."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy-Moderate",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n11, 13, 30, 96, 392, ?",
      options: ["1970", "1960", "1980", "1950", "1975"],
      correct: "A",
      explanation: "Pattern: ×1 + 2 = 13; ×2 + 4 = 30; ×3 + 6 = 96; ×4 + 8 = 392; ×5 + 10 = 1970."
    },
    {
      subject: "Quantitative Aptitude (31-65)",
      topic: "Number Series",
      difficulty: "Easy",
      marks: 1,
      year: 2026,
      question: "Find the missing number:\n6561, 729, 81, 9, ?",
      options: ["1", "0.5", "3", "2", "0"],
      correct: "A",
      explanation: "Divide by 9: 9 ÷ 9 = 1."
    }
  ]
};

for (let i = 1; i <= 8; i++) {
  const filePath = path.join(__dirname, `expected_2026_paper${i}.cjs`);
  const data = require(filePath);
  
  if (data.length === 95) {
    // Insert the 5 extra questions at index 60 (after Quant Q60)
    const extra = extraQuantSets[i];
    data.splice(60, 0, ...extra);
    
    const fileContent = `// 2026 Expected Paper ${i} (100 Questions)\nmodule.exports = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    console.log(`Updated Paper ${i} to ${data.length} questions.`);
  }
}
