## What it means

An arithmetic progression adds the same signed difference d at each step. A decreasing progression has negative d. Keep the running term position separate from the term value. The first term has zero increments of d because it is already the starting value.

## Formulas and rules

- **nth term:** aₙ=a+(n−1)d, with first term a. Terms i and j differ by (j−i)d.
- **Sum:** Sₙ=n(a+aₙ)/2=n[2a+(n−1)d]/2. Pair the first and last term, then second and second-last, to see the constant pair sum.
- **Inclusive count:** When endpoints are on the progression and d≠0, n=(last−first)/d+1.
- **Three terms:** Use x−d, x, x+d. The middle is the average of the two outside terms.

## How to study it for Station Master

- Mark the number of gaps before dividing to obtain d. For multiples inside an interval, locate the first and last valid multiple before using the sum.
- Practise all three directions: recover a and d, sum a range, and infer n from a sum or cutoff. Check whether the inequality includes equality.

## Question models and worked examples

### Difference from two positions

**Question.** The 5th term is 23 and the 11th term is 47. Find the first and 20th.

1. **Count the equal gaps.** From the 5th to the 11th term there are 11 − 5 = 6 steps. The value rises by 47 − 23 = 24, so the common difference is 24 ÷ 6 = 4.
2. **Work back to the first term.** There are four steps from term 1 to term 5. Subtract 4 × 4 from 23 to get a = 7.
3. **Apply the nth-term rule.** Term 20 is a + (20−1)d = 7 + 19 × 4 = 83.

**Answer:** 7 and 83.

### Sum of bounded multiples

**Question.** Sum all multiples of 7 between 30 and 100 inclusive.

1. **Find the endpoints that qualify.** 35 = 7 × 5 is the first multiple at or above 30. 98 = 7 × 14 is the last at or below 100.
2. **Count terms inclusively.** From 35 to 98 there are (98−35) ÷ 7 = 9 gaps, hence 10 terms.
3. **Multiply the count by the mean.** Pairing the endpoints produces a mean of (35 + 98) ÷ 2 = 66.5. The sum is 10 × 66.5 = 665.

**Answer:** 665.

### Number of terms from a sum

**Question.** Rows have 12, 15, 18, … seats, totalling 255. How many rows?

1. **Write the sum of n rows.** The first term is 12 and the common difference is 3, so Sₙ = n[2 × 12 + (n−1) × 3]/2 = 3n(n+7)/2.
2. **Set the sum to the capacity.** Equating this to 255 yields n(n+7) = 170. The positive factors 10 and 17 differ by 7.
3. **Check the row count.** For 10 rows, the last has 39 seats. The total is 10 × (12 + 39) ÷ 2 = 255.

**Answer:** 10 rows.

### First value below a cutoff

**Question.** Readings by check are 92, 85, 78, … cm. When is the level first below 40 cm?

1. **Express the nth reading.** Each check reduces the level by 7 cm. At check n the reading is 92 − 7(n−1).
2. **Solve the strict cutoff.** Require 92 − 7(n−1) < 40, which gives 7(n−1) > 52. The smallest whole number of gaps satisfying it is 8.
3. **Verify the crossing.** Check 8 gives 43 cm, still above 40. Check 9 gives 36 cm, so it is the first below the cutoff.

**Answer:** 9th check.
