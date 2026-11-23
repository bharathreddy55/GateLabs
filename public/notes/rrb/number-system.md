## What it means

A number system classifies numbers and specifies how digits represent values. Whole numbers include zero, integers include negative whole numbers, and rational numbers can be written as p/q for integers p and nonzero q. Irrational decimals neither terminate nor repeat. In base ten, each place to the left multiplies a digit’s value by 10.

## Formulas and rules

- **Division algorithm:** N = dq + r, with 0 ≤ r < d for positive divisor d. This identifies a unique remainder even for negative N.
- **Divisibility:** Test 3 or 9 using the digit sum, 4 using the last two digits, 8 using the last three, and 11 with the alternating digit sum.
- **Prime factors:** If N = pᵃqᵇ, the positive divisor count is (a+1)(b+1). Each prime exponent can independently range from zero to its maximum.
- **Terminating decimals:** Reduce p/q first. It terminates exactly when the positive denominator has no prime factors besides 2 and 5.
- **Last digits:** Work modulo 10. If the exponent is a multiple of the cycle length, take the last entry in the cycle.

## How to study it for Station Master

- Train a trigger for each question: missing digit → divisibility, large exponent → cycle, divisors → prime exponents.
- Practise combined tests. Substitute a missing digit back into every condition and verify each remainder is smaller than its positive divisor.

## Question models and worked examples

### Missing digit under two conditions

**Question.** Find x if 74x2 is divisible by both 4 and 9.

1. The digit sum is 13+x. The only multiple of 9 possible is 18, so x=5.
2. The last two digits are 52, a multiple of 4.

**Answer:** x=5.

### Remainder of powers

**Question.** Find the remainder of 7⁸³+3⁴² divided by 10.

1. The last digits of powers of 7 cycle 7,9,3,1. Exponent 83 gives position 3.
2. Powers of 3 cycle 3,9,7,1. Exponent 42 gives position 2.
3. Add residues 3+9=12 and reduce again.

**Answer:** 2.

### Restricted divisor count

**Question.** How many positive even divisors does 360 have?

1. Factor 360=2³×3²×5.
2. Even divisors allow three powers of 2 (1 through 3), three powers of 3, and two powers of 5.

**Answer:** 3×3×2=18.

### Classifying a fraction

**Question.** Does 42/168 terminate?

1. Reduce by 42 to get 1/4.
2. The reduced denominator is 2². Its reciprocal is 25/100.

**Answer:** Yes, 0.25.
