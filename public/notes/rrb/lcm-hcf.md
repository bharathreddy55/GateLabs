## What it means

The highest common factor is the greatest positive integer that divides all the given numbers. The least common multiple is the smallest positive integer each given positive number divides. HCF models the largest equal pieces or groups. LCM models the return of repeating events that start in sync.

## Formulas and rules

- **Prime factors:** HCF takes the minimum exponent of each prime, including zero for an absent prime. LCM takes the maximum.
- **Two numbers:** HCF(a,b)×LCM(a,b)=ab for positive a,b. Do not apply this product identity to three numbers.
- **Euclidean method:** Replace (a,b) with (b,a mod b) for b>0 until the remainder reaches zero. The last nonzero divisor is the HCF.
- **Common remainder:** A divisor giving remainder r for each input must divide all values after subtracting r, and must exceed r.

## How to study it for Station Master

- Translate “largest equal size” or “earliest repeat” into the corresponding operation. For schedules with different phases, test actual occurrence times.
- Practise an HCF by division and by factors. For a remainder question verify the candidate against all original inputs.

## Question models and worked examples

### Largest equal pieces

**Question.** Cut ropes of 84, 126 and 210 m into the longest identical whole-metre lengths. Find length and count.

1. HCF(84,126)=42, which also divides 210.
2. The ropes yield 84/42=2, 126/42=3 and 210/42=5 pieces.

**Answer:** 42 m per piece, 10 pieces.

### Repeating signals

**Question.** Lights flash together at 10:00, then every 18, 24 and 40 seconds. When are they next together?

1. Factor 18=2×3², 24=2³×3 and 40=2³×5.
2. Maximum exponents give 2³×3²×5=360 seconds, or six minutes.

**Answer:** 10:06.

### Same remainder

**Question.** Find the greatest divisor giving remainder 5 for each of 149, 197 and 245.

1. Subtract 5 to get 144, 192 and 240.
2. Their HCF is 48, which exceeds the required remainder.

**Answer:** 48.

### Recover a number

**Question.** HCF=12, LCM=240 and one number is 48. Find the other.

1. Use the two-number product relation: other=12×240/48=60.
2. The numbers are 12×4 and 12×5, with coprime cofactors. This confirms the HCF and LCM.

**Answer:** 60.
