## Basics first

- **Term and position.** A term is the value at a specific position. Label positions before deciding whether a pattern alternates.
- **First and second differences.** First differences are changes between adjacent terms. Second differences are changes between those changes. A constant second difference suggests regularly growing jumps.
- **Multiplicative and recursive rules.** Some sequences use ×k and a fixed adjustment. Others form each term from more than one predecessor, such as the sum of the prior two.
- **Interleaved tracks.** A single line can weave together two sequences. Read odd and even positions separately when adjacent jumps swing between two patterns.

## Methods and when to use them

### Method A · Try differences before more complex rules

Write each first difference above its gap. If the jumps change systematically, take a second difference. When a jump table fails, test ratios or simple multiply-and-adjust rules.

**When to use it.** Use this in **Number Series / Changing Gaps** questions when a sequence grows or shrinks and the differences between neighbouring terms may follow their own pattern.

### Method B · Make two scratch rows for alternation

Separate positions 1,3,5 and 2,4,6. Determine each track’s step, then use the one containing the blank. An apparent combined jump need not fit either rule.

**When to use it.** Use this in **Number Series / Alternating Patterns** questions when odd and even positions appear to follow different rules.

### Method C · Verify over the blank from both sides

For a missing or wrong term, find a simple rule that fits the known terms. Insert the candidate and check both neighbouring transitions and all available checkpoints.

**When to use it.** Use this in **Number Series / Missing or Incorrect Interior Terms** questions when the blank or suspected error lies between known terms and you can test the rule on both sides.

## Question models and worked examples

### Second differences

**Question.** Find the next term: 5, 9, 15, 23, 33.

**Picture it.** Draw an arrow between every two numbers. Put how much you added above it. The arrows can have their own easy pattern even when the numbers do not.

1. **Calculate the first differences.** Subtract each term from its successor to get 9−5=4, 15−9=6, 23−15=8 and 33−23=10.\
   `first differences: 4, 6, 8, 10`
2. **Find the change in those differences.** Each jump is 2 larger than the previous one. Extending that pattern gives the next jump as 10+2=12.\
   `next jump = 10 + 2 = 12`
3. **Apply the new jump.** Add 12 to the last actual term, 33. The next term is 45.\
   `33 + 12 = 45`

**Answer:** 45.

### Alternating tracks

**Question.** Find the next term: 4, 30, 7, 25, 10, 20, 13.

**Picture it.** Use two colours. Colour positions 1, 3, 5 and 7 one colour and positions 2, 4 and 6 another. Read each colour on its own.

1. **Split the positions by parity.** Positions 1, 3, 5 and 7 give 4, 7, 10, 13. Positions 2, 4 and 6 give 30, 25, 20.\
   `odd positions: 4, 7, 10, 13`\
   `even positions: 30, 25, 20`
2. **Find each track’s rule.** The odd-position track adds 3 each time. The even-position track subtracts 5 each time.\
   `odd step = +3, even step = −5`
3. **Extend the relevant track.** The blank is in position 8, an even position. Subtract 5 from the previous even-position value, 20, to get 15.\
   `a₈ = 20 − 5 = 15`

**Answer:** 15.

### Multiply and adjust

**Question.** Find the next term: 3, 8, 18, 38, 78.

**Picture it.** Try doubling one number. Look at how much more you still need to reach the next. See whether that extra amount stays the same.

1. **Compare the terms after doubling.** Doubling 3 gives 6, which is 2 short of 8. Doubling 8 gives 16, which is 2 short of 18.\
   `8 − 2 × 3 = 2 and 18 − 2 × 8 = 2`
2. **Check the rule near the end.** 18×2+2=38 and 38×2+2=78, so the same adjustment works across the given terms.\
   `18 × 2 + 2 = 38 and 38 × 2 + 2 = 78`
3. **Repeat the full operation.** Double 78 to get 156 and add 2 to obtain 158.\
   `78 × 2 + 2 = 158`

**Answer:** 158.

### Missing term across both neighbours

**Question.** Complete 2, 5, 7, ?, 19, 31.

**Picture it.** Imagine keeping the last two tiles in your hands. Add them to make the next tile. Test the new tile against the numbers already printed after it.

1. **Find a rule in the known terms.** The first two terms add to the third: 2+5=7. Try the rule that every term is the sum of the two terms before it.\
   `2 + 5 = 7`
2. **Compute the missing term.** Using 5 and 7 as the preceding terms gives 5+7=12.\
   `5 + 7 = 12`
3. **Check the rule on the far side.** The next two terms should be 7+12=19 and 12+19=31. Both match the given values.\
   `7 + 12 = 19 and 12 + 19 = 31`

**Answer:** 12.

### Identify the wrong term

**Question.** One term is wrong: 4, 9, 16, 26, 36, 49. Correct it.

**Picture it.** Picture squares of 2 by 2, 3 by 3 and 4 by 4 tiles. The next square must have five tiles on each side.

1. **Recognise the perfect squares.** The early terms are 2²=4, 3²=9 and 4²=16. The later terms are 6²=36 and 7²=49.\
   `2², 3², 4², ?, 6², 7²`
2. **Fill the missing square in order.** The value between 4² and 6² should be 5²=25. The listed 26 interrupts the consecutive-square pattern.\
   `5² = 25`
3. **Check the adjacent gaps.** With 25 in its place, the jumps from 16 to 25 and 25 to 36 are 9 and 11, continuing the odd differences 5, 7, 9, 11, 13.\
   `25 − 16 = 9 and 36 − 25 = 11`

**Answer:** Replace 26 with 25.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Increasing jumps | Use differences of differences. |
| Alternating high and low values | Split into odd and even positions. |
| Nearly doubles each time | Test next − 2 × previous for a constant. |
| Two consecutive terms add to the next | Check the rule on both sides of the blank. |
| Values near 4, 9, 16, 25 | Test consecutive perfect squares before inventing a rule. |

## Exam tips

- **Prefer the simplest rule supported by every term.** A short list can fit several contrived formulas.
- **Count from position one.** A missing value on one track does not advance the other.
- **Test the correction on its neighbours.** Fixing one gap while breaking another is a sign that the rule is wrong.
