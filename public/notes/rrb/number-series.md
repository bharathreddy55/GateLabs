## What it means

A number series tests the intended rule that generates successive terms. A simple consistent pattern is usually the goal, since a finite list can mathematically fit many formulas. Look for arithmetic differences, ratios, alternating subsequences or a recurrence that uses the previous terms. A missing interior term must fit both sides.

## Formulas and rules

- **Differences:** Constant first difference gives an AP. Constant second difference gives a steady change in first differences.
- **Ratios and operations:** If differences grow fast, test constant multiplication or multiplication plus a fixed adjustment.
- **Alternation:** Separate odd and even positions if adjacent steps look irregular. Each subsequence can have its own rule.
- **Families and recurrences:** Check squares, cubes, primes or combinations such as the sum of the preceding two terms. Verify your candidate on every known transition.

## How to study it for Station Master

- Write either a difference row or two alternating rows before trying more complicated rules. Use the simplest rule consistent with all given terms and choices.
- Practise missing terms and wrong-term detection. For a proposed error, verify that correcting it repairs both nearby transitions and leaves the rest intact.

## Question models and worked examples

### Second differences

**Question.** Find the next term: 5, 9, 15, 23, 33.

1. **Calculate the first differences.** Subtract each term from its successor to get 9−5=4, 15−9=6, 23−15=8 and 33−23=10.
2. **Find the change in those differences.** Each jump is 2 larger than the previous one. Extending that pattern gives the next jump as 10+2=12.
3. **Apply the new jump.** Add 12 to the last actual term, 33. The next term is 45.

**Answer:** 45.

### Alternating tracks

**Question.** Find the next term: 4, 30, 7, 25, 10, 20, 13.

1. **Split the positions by parity.** Positions 1, 3, 5 and 7 give 4, 7, 10, 13. Positions 2, 4 and 6 give 30, 25, 20.
2. **Find each track’s rule.** The odd-position track adds 3 each time. The even-position track subtracts 5 each time.
3. **Extend the relevant track.** The blank is in position 8, an even position. Subtract 5 from the previous even-position value, 20, to get 15.

**Answer:** 15.

### Multiply and adjust

**Question.** Find the next term: 3, 8, 18, 38, 78.

1. **Compare the terms after doubling.** Doubling 3 gives 6, which is 2 short of 8. Doubling 8 gives 16, which is 2 short of 18.
2. **Check the rule near the end.** 18×2+2=38 and 38×2+2=78, so the same adjustment works across the given terms.
3. **Repeat the full operation.** Double 78 to get 156 and add 2 to obtain 158.

**Answer:** 158.

### Missing term across both neighbours

**Question.** Complete 2, 5, 7, ?, 19, 31.

1. **Find a rule in the known terms.** The first two terms add to the third: 2+5=7. Try the rule that every term is the sum of the two terms before it.
2. **Compute the missing term.** Using 5 and 7 as the preceding terms gives 5+7=12.
3. **Check the rule on the far side.** The next two terms should be 7+12=19 and 12+19=31. Both match the given values.

**Answer:** 12.

### Identify the wrong term

**Question.** One term is wrong: 4, 9, 16, 26, 36, 49. Correct it.

1. **Recognise the perfect squares.** The early terms are 2²=4, 3²=9 and 4²=16. The later terms are 6²=36 and 7²=49.
2. **Fill the missing square in order.** The value between 4² and 6² should be 5²=25. The listed 26 interrupts the consecutive-square pattern.
3. **Check the adjacent gaps.** With 25 in its place, the jumps from 16 to 25 and 25 to 36 are 9 and 11, continuing the odd differences 5, 7, 9, 11, 13.

**Answer:** Replace 26 with 25.
