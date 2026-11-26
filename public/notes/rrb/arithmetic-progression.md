## Basics first

- **Arithmetic progression.** An AP is a sequence with constant step d. For 12, 15, 18, … the difference is 3. If d is negative, terms decrease.
- **Index and gaps.** The first term a has made zero moves. Term n is a + (n−1)d because there are n−1 gaps from term 1.
- **Sum.** Pair the first and last, then the second and next-to-last. Each pair has the same sum, so the sequence’s mean is (first + last)/2.
- **Multiples and limits.** Consecutive multiples of m form an AP with difference m. To count over a range, find the first and last eligible multiples and include both.

## Methods and when to use them

### Method A · Recover the step from two terms

Subtract positions and values separately. Divide the value change by the number of gaps. Once d is known, work backward to a.

### Method B · Translate a capacity to a sum

Use Sₙ = n[2a+(n−1)d]/2. Solve for an admissible positive whole n when the problem is a count. Check by computing the last row and recalculating the sum.

### Method C · Treat a bound as an inequality

For the first term strictly below a threshold, write a+(n−1)d < threshold. Dividing by a negative d reverses the inequality. Find the first admissible index and test its predecessor.

## Question models and worked examples

### Difference from two positions

**Question.** The 5th term is 23 and the 11th term is 47. Find the first and 20th.

1. **Count the equal gaps.** From the 5th to the 11th term there are 11 − 5 = 6 steps. The value rises by 47 − 23 = 24, so the common difference is 24 ÷ 6 = 4.\
   `d = (47 − 23) ÷ (11 − 5) = 4`
2. **Work back to the first term.** There are four steps from term 1 to term 5. Subtract 4 × 4 from 23 to get a = 7.\
   `a = 23 − 4 × 4 = 7`
3. **Apply the nth-term rule.** Term 20 is a + (20−1)d = 7 + 19 × 4 = 83.\
   `a₂₀ = 7 + 19 × 4 = 83`

**Answer:** 7 and 83.

### Sum of bounded multiples

**Question.** Sum all multiples of 7 between 30 and 100 inclusive.

1. **Find the endpoints that qualify.** 35 = 7 × 5 is the first multiple at or above 30. 98 = 7 × 14 is the last at or below 100.\
   `First = 5 × 7 = 35, last = 14 × 7 = 98`
2. **Count terms inclusively.** From 35 to 98 there are (98−35) ÷ 7 = 9 gaps, hence 10 terms.\
   `n = (98 − 35) ÷ 7 + 1 = 10`
3. **Multiply the count by the mean.** Pairing the endpoints produces a mean of (35 + 98) ÷ 2 = 66.5. The sum is 10 × 66.5 = 665.\
   `10 × (35 + 98) ÷ 2 = 665`

**Answer:** 665.

### Number of terms from a sum

**Question.** Rows have 12, 15, 18, … seats, totalling 255. How many rows?

1. **Write the sum of n rows.** The first term is 12 and the common difference is 3, so Sₙ = n[2 × 12 + (n−1) × 3]/2 = 3n(n+7)/2.\
   `Sₙ = n[24 + 3(n−1)]/2`
2. **Set the sum to the capacity.** Equating this to 255 yields n(n+7) = 170. The positive factors 10 and 17 differ by 7.\
   `n(3n + 21) = 510 ⇒ n(n + 7) = 170 ⇒ n = 10`
3. **Check the row count.** For 10 rows, the last has 39 seats. The total is 10 × (12 + 39) ÷ 2 = 255.\
   `a₁₀ = 39 and 10 × (12 + 39) ÷ 2 = 255`

**Answer:** 10 rows.

### First value below a cutoff

**Question.** Readings by check are 92, 85, 78, … cm. When is the level first below 40 cm?

1. **Express the nth reading.** Each check reduces the level by 7 cm. At check n the reading is 92 − 7(n−1).\
   `aₙ = 92 − 7(n − 1)`
2. **Solve the strict cutoff.** Require 92 − 7(n−1) < 40, which gives 7(n−1) > 52. The smallest whole number of gaps satisfying it is 8.\
   `92 − 7(n − 1) < 40 ⇒ n − 1 > 52/7 ⇒ n ≥ 9`
3. **Verify the crossing.** Check 8 gives 43 cm, still above 40. Check 9 gives 36 cm, so it is the first below the cutoff.\
   `a₈ = 43 and a₉ = 36`

**Answer:** 9th check.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Term at position n | aₙ = a + (n − 1)d. |
| Two terms aᵢ and aⱼ | d = (aⱼ − aᵢ) ÷ (j − i). |
| Number of terms between known endpoints | n = (last − first) ÷ d + 1 for nonzero d. |
| Sum of n equally spaced terms | Sₙ = n(first + last)/2. |

## Exam tips

- **Count gaps and terms separately.** Five terms have four gaps.
- **Distinguish less than from at most.** An exact match qualifies only for inclusive bounds.
- **Check the units and index.** An n from a sum counts rows. An n from an inequality counts the reading position.
