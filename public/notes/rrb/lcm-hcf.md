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

1. **Translate the cutting condition.** The piece length must divide all three rope lengths exactly. Choosing the longest such piece means taking their HCF.
2. **Find the HCF.** 84 = 2 × 42 and 126 = 3 × 42. Since 2 and 3 are coprime, their HCF is 42. The third rope is 210 = 5 × 42 and does not reduce it.
3. **Count the pieces.** The ropes give 84/42 = 2, 126/42 = 3 and 210/42 = 5 pieces. Add them to get 10.

**Answer:** 42 m per piece, 10 pieces.

### Repeating signals

**Question.** Lights flash together at 10:00, then every 18, 24 and 40 seconds. When are they next together?

1. **Translate the repeat condition.** After the common flash, each light returns at multiples of its own interval. The first shared positive time is the LCM.
2. **Take the largest prime powers.** 18 = 2 × 3², 24 = 2³ × 3 and 40 = 2³ × 5. A common multiple needs 2³, 3² and 5, so the least one is 360 seconds.
3. **Convert and add the interval.** 360 seconds is six minutes. Add six minutes to 10:00 to get 10:06.

**Answer:** 10:06.

### Same remainder

**Question.** Find the greatest divisor giving remainder 5 for each of 149, 197 and 245.

1. **Remove the required remainder.** If division leaves 5, subtracting 5 gives an exact multiple of the divisor. The adjusted numbers are 144, 192 and 240.
2. **Find their greatest common divisor.** 192 − 144 = 48 and 240 − 192 = 48, so every common divisor divides 48. All three adjusted numbers are divisible by 48.
3. **Check the original remainders.** 149 = 3 × 48 + 5, 197 = 4 × 48 + 5 and 245 = 5 × 48 + 5. Since 5 < 48, these are valid remainders.

**Answer:** 48.

### Recover a number

**Question.** HCF=12, LCM=240 and one number is 48. Find the other.

1. **Use the two-number identity.** For positive integers, HCF × LCM equals their product. Here the product is 12 × 240 = 2,880.
2. **Isolate the missing number.** Divide the product by the known number 48, obtaining 2,880 ÷ 48 = 60.
3. **Verify both conditions.** 48 = 12 × 4 and 60 = 12 × 5. The co-factors 4 and 5 are coprime, giving HCF 12 and LCM 12 × 4 × 5 = 240.

**Answer:** 60.
