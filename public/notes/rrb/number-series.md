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

1. First differences are 4,6,8,10.
2. Continue the step increases by 2, so add 12 to 33.

**Answer:** 45.

### Alternating tracks

**Question.** Find the next term: 4, 30, 7, 25, 10, 20, 13.

1. Odd positions are 4,7,10,13, rising by 3.
2. The next term is in even position. Even values are 30,25,20, falling by 5.

**Answer:** 15.

### Multiply and adjust

**Question.** Find the next term: 3, 8, 18, 38, 78.

1. Check the relation ×2+2, which produces 8,18,38 and 78 from their predecessors.
2. Apply it once more: 2×78+2.

**Answer:** 158.

### Missing term across both neighbours

**Question.** Complete 2, 5, 7, ?, 19, 31.

1. 2+5=7 suggests that each subsequent term is the sum of the previous two. Then 5+7=12.
2. Check 7+12=19 and 12+19=31.

**Answer:** 12.

### Identify the wrong term

**Question.** One term is wrong: 4, 9, 16, 26, 36, 49. Correct it.

1. Most values match successive squares 2² through 7².
2. The fourth position should be 5²=25, which also restores the odd-number gaps 9 and 11 around it.

**Answer:** Replace 26 with 25.
