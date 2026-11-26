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

**Question.** Find the missing digit x in 74x2 so the number is divisible by both 4 and 9.

1. **Apply the rule for 9.** A number is divisible by 9 when its digits add to a multiple of 9. Here the sum is 7 + 4 + x + 2 = 13 + x.
2. **Find the only possible digit.** Since x is between 0 and 9, the digit sum is between 13 and 22. The only multiple of 9 in that range is 18. Solve 13 + x = 18 to get x = 5.
3. **Check divisibility by 4.** Putting 5 in the blank gives 7452. Only the last two digits matter because 100 is divisible by 4. The last two digits give 52 ÷ 4 = 13, so 7452 also passes this test.

**Answer:** x = 5.

### Remainder of powers

**Question.** Find the remainder of 7⁸³+3⁴² divided by 10.

1. **Work with the last digits.** The remainder on division by 10 is the units digit. Starting at 7 and multiplying by 7 repeatedly, keep only the units digit at each step. The cycle is 7 → 9 → 3 → 1, then it starts again at 7.
2. **Locate 7⁸³ in its cycle.** Each cycle has four entries. Since 83 = 4 × 20 + 3, there are 20 complete cycles and three more entries. The third entry is 3.
3. **Do the same for 3⁴².** The units digits of powers of 3 cycle through 3 → 9 → 7 → 1. Since 42 = 4 × 10 + 2, take the second entry, which is 9.
4. **Add the two remainders.** The sum of the units digits is 3 + 9 = 12. Dividing 12 by 10 leaves a remainder of 2.

**Answer:** 2.

### Restricted divisor count

**Question.** How many positive even divisors does 360 have?

1. **Prime-factor the number.** Write 360 = 8 × 45 = 2³ × 3² × 5. Every positive divisor has the form 2ᵃ × 3ᵇ × 5ᶜ, with each exponent at most the corresponding exponent in 360.
2. **Require at least one factor of 2.** An even divisor needs a = 1, 2 or 3. That gives three choices. Choosing a = 0 would leave only odd prime factors.
3. **Count the other choices.** The exponent of 3 can be 0, 1 or 2, and the exponent of 5 can be 0 or 1. A zero exponent leaves that prime out. These choices are independent, and each exponent combination gives a different divisor.

**Answer:** There are 3 × 3 × 2 = 18 positive even divisors.

### Classifying a fraction

**Question.** Does 42/168 terminate?

1. **Reduce the fraction first.** Since 168 = 4 × 42, dividing the numerator and denominator by 42 gives 42/168 = 1/4.
2. **Check the reduced denominator.** A fraction terminates in base ten when its reduced denominator has only 2 and 5 as prime factors. Here 4 = 2², so 4 divides 100 = 2² × 5² and the fraction can be written in hundredths.
3. **Write it as a decimal.** Multiply both parts of 1/4 by 25 to get 25/100. Twenty-five hundredths is 0.25.

**Answer:** Yes, 0.25.
