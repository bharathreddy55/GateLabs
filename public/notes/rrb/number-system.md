## Basics first

- **Number sets.** Whole numbers start at zero, and integers extend them below zero. Rational numbers can be written p/q with integer p and nonzero q. A decimal that neither terminates nor repeats is irrational.
- **Place value.** In 7452, the 7 is worth 7000 and the 2 is worth 2. A digit’s weight is a power of 10. This lets you test the ending independently whenever the divisor divides a power of 10.
- **Factors, primes and zero.** A factor divides without a remainder. A prime has exactly two positive factors. The number 1 has one and is neither prime nor composite. Zero is an even integer.
- **Quotient and remainder.** For positive divisor d, write N = dq + r with 0 ≤ r < d. To divide −17 by 5 in this form, use −17 = 5 × (−4) + 3, giving remainder 3.

## Methods and when to use them

### Method A · Test divisibility using the digits

For 3 or 9, use the digit sum because 10 leaves remainder 1 under both divisors. For 4, use the last two digits because 100 is divisible by 4. For 8, use the last three. For 11, test whether the alternate digit sums differ by a multiple of 11, including zero.

### Method B · Factor first when counting divisors

Write the number as a product of prime powers. Each exponent is an independent choice from 0 through that prime’s maximum. For even divisors require the exponent on 2 to be positive. For perfect-square divisors, every chosen exponent must be even.

### Method C · Use a cycle or a reduced denominator

For the units digit of a power, multiply by the base repeatedly and keep the final digit. Reduce the exponent by the cycle length. For a decimal, reduce the fraction first. A terminating expansion is possible exactly when the reduced denominator divides some power of 10, which means only powers of 2 and 5 occur.

## Question models and worked examples

### Missing digit under two conditions

**Question.** Find the missing digit x in 74x2 so the number is divisible by both 4 and 9.

**Picture it.** Picture a number with a blank tile. We will use one rule to choose the tile and another rule to make sure it fits.

1. **Apply the rule for 9.** A number is divisible by 9 when its digits add to a multiple of 9. Here the sum is 7 + 4 + x + 2 = 13 + x.\
   `7 + 4 + x + 2 = 13 + x`
2. **Find the only possible digit.** Since x is between 0 and 9, the digit sum is between 13 and 22. The only multiple of 9 in that range is 18. Solve 13 + x = 18 to get x = 5.\
   `13 + x = 18 ⇒ x = 5`
3. **Check divisibility by 4.** Putting 5 in the blank gives 7452. Only the last two digits matter because 100 is divisible by 4. The last two digits give 52 ÷ 4 = 13, so 7452 also passes this test.\
   `52 ÷ 4 = 13`

**Answer:** x = 5.

### Remainder of powers

**Question.** Find the remainder of 7⁸³+3⁴² divided by 10.

**Picture it.** Imagine the last digit is the only part of a number you can see. As you keep multiplying, that window shows the same few digits over and over.

1. **Work with the last digits.** The remainder on division by 10 is the units digit. Starting at 7 and multiplying by 7 repeatedly, keep only the units digit at each step. The cycle is 7 → 9 → 3 → 1, then it starts again at 7.\
   `7 → 9 → 3 → 1 → 7`
2. **Locate 7⁸³ in its cycle.** Each cycle has four entries. Since 83 = 4 × 20 + 3, there are 20 complete cycles and three more entries. The third entry is 3.\
   `83 = 4 × 20 + 3 ⇒ last digit 3`
3. **Do the same for 3⁴².** The units digits of powers of 3 cycle through 3 → 9 → 7 → 1. Since 42 = 4 × 10 + 2, take the second entry, which is 9.\
   `42 = 4 × 10 + 2 ⇒ last digit 9`
4. **Add the two remainders.** The sum of the units digits is 3 + 9 = 12. Dividing 12 by 10 leaves a remainder of 2.\
   `3 + 9 = 12 ⇒ remainder 2`

**Answer:** 2.

### Restricted divisor count

**Question.** How many positive even divisors does 360 have?

**Picture it.** Think of 360 as a box of prime building blocks. A divisor is a smaller pile made from those blocks. Any pile with a block of 2 is even.

1. **Prime-factor the number.** Write 360 = 8 × 45 = 2³ × 3² × 5. Every positive divisor has the form 2ᵃ × 3ᵇ × 5ᶜ, with each exponent at most the corresponding exponent in 360.\
   `360 = 2³ × 3² × 5`
2. **Require at least one factor of 2.** An even divisor needs a = 1, 2 or 3. That gives three choices. Choosing a = 0 would leave only odd prime factors.\
   `a ∈ {1, 2, 3}`
3. **Count the other choices.** The exponent of 3 can be 0, 1 or 2, and the exponent of 5 can be 0 or 1. A zero exponent leaves that prime out. These choices are independent, and each exponent combination gives a different divisor.\
   `3 × 3 × 2 = 18`

**Answer:** There are 3 × 3 × 2 = 18 positive even divisors.

### Classifying a fraction

**Question.** Does 42/168 terminate?

**Picture it.** Imagine cutting the same pizza into smaller pieces. First describe the slice in the fewest pieces you can. Then see whether you can count it in tenths or hundredths.

1. **Reduce the fraction first.** Since 168 = 4 × 42, dividing the numerator and denominator by 42 gives 42/168 = 1/4.\
   `42/168 = 1/4`
2. **Check the reduced denominator.** A fraction terminates in base ten when its reduced denominator has only 2 and 5 as prime factors. Here 4 = 2², so 4 divides 100 = 2² × 5² and the fraction can be written in hundredths.\
   `4 = 2² and 100 = 2² × 5²`
3. **Write it as a decimal.** Multiply both parts of 1/4 by 25 to get 25/100. Twenty-five hundredths is 0.25.\
   `1/4 = 25/100 = 0.25`

**Answer:** Yes, 0.25.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Missing digit under 3 or 9 | Set the digit sum to a reachable multiple and check the other conditions. |
| Last digit of a large power | Use the units-digit cycle. A zero exponent remainder selects the last cycle entry for positive exponents. |
| Divisors of pᵃqᵇ | Count (a + 1)(b + 1), including zero exponents. Restrict choices to meet any parity or square condition. |
| Fraction to terminating decimal | Reduce p/q. A denominator of the form 2ᵃ5ᵇ can be scaled to a power of 10. |

## Exam tips

- **Keep leading digits valid.** If the unknown is the first digit of a fixed-length number, it cannot be 0.
- **Check the original number.** A digit that clears one test may fail another. Substitute it back into every requirement.
- **Reduce after summing residues.** Add the small remainders, then take the remainder of that sum again.
