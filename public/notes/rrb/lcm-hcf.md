## Basics first

- **Factor and multiple.** A factor divides a number exactly. The factors of 12 are 1, 2, 3, 4, 6 and 12. Positive multiples come from the times table. For 4 they begin 4, 8, 12 and 16.
- **Prime and co-prime.** A prime has exactly two positive factors, 1 and itself. Two numbers are co-prime when their only common factor is 1. For example, 8 and 15 are co-prime even though each is composite.
- **Highest common factor.** The HCF, also called GCD, is the greatest positive number that fits into every given number exactly. For 12 and 18, size 6 fits both. The HCF cannot exceed the smallest input.
- **Least common multiple.** The LCM is the smallest positive number into which every given number fits exactly. Bells starting together with periods of 12 and 18 minutes first ring together again 36 minutes later. The LCM cannot be below the largest input.

## Methods and when to use them

### Method A · Prime factorisation

For HCF, take the smallest power of each prime, counting an absent prime as power zero. For LCM, take the largest power of each prime. For 12 = 2² × 3 and 18 = 2 × 3², HCF = 2 × 3 = 6 and LCM = 2² × 3² = 36. Think shared blocks for HCF and enough blocks for every input for LCM.

### Method B · Division for HCF

Divide the larger number by the smaller, then divide the previous divisor by the remainder. A common factor of the previous pair also divides the remainder, so the HCF stays the same. Stop at remainder zero and take the last divisor. For three inputs, find the HCF of the first two and take the HCF of that result and the third.

### Method C · Ladder for LCM

Write the inputs in a row. At each stage divide every entry that the chosen prime divides and carry the other entries down. A prime can divide just one of the entries. Once all entries are 1, multiply the primes you used.

### Two-number identity and ratios

For positive a and b, a × b = HCF(a,b) × LCM(a,b). This works for a pair. If the reduced ratio is m:n and the HCF is h, the numbers are mh and nh. Their LCM is mnh because the parts remaining after removing h are co-prime.

### Fractions and decimals

Reduce positive fractions first. A common denominator lets you treat their numerators as counts in one unit. Equivalently, fraction HCF is HCF of numerators divided by LCM of denominators, and fraction LCM uses LCM of numerators divided by HCF of denominators. For decimals, multiply all inputs by the same power of 10, solve with integers, then divide the result by that power of 10.

### Remainder problems

Write N = dq + r, with 0 ≤ r < d. If the dividend N is known, subtract r before checking what d can divide. If the divisors are known and share a remainder r, N − r is a common multiple. Select the multiple using the question’s range. If every divisor exceeds its remainder by k, N + k is the common multiple.

## Question models and worked examples

### Largest equal pieces

**Question.** Cut ropes of 84, 126 and 210 m into the longest identical whole-metre lengths. Find length and count.

**Picture it.** Imagine cutting all three ropes with one ruler. A good ruler length fits every rope with no piece left over. We want the longest ruler that works.

1. **Translate the cutting condition.** The piece length must divide all three rope lengths exactly. Choosing the longest such piece means taking their HCF.
2. **Find the HCF.** 84 = 2 × 42 and 126 = 3 × 42. Since 2 and 3 are coprime, their HCF is 42. The third rope is 210 = 5 × 42 and does not reduce it.\
   `84 = 2 × 42, 126 = 3 × 42, 210 = 5 × 42`
3. **Count the pieces.** The ropes give 84/42 = 2, 126/42 = 3 and 210/42 = 5 pieces. Add them to get 10.\
   `2 + 3 + 5 = 10 pieces`

**Answer:** 42 m per piece, 10 pieces.

### Repeating signals

**Question.** Lights flash together at 10:00, then every 18, 24 and 40 seconds. When are they next together?

**Picture it.** Imagine three blinking toys starting at the same moment. Put their blink times on three lines and find the first time all the lines share.

1. **Translate the repeat condition.** After the common flash, each light returns at multiples of its own interval. The first shared positive time is the LCM.
2. **Take the largest prime powers.** 18 = 2 × 3², 24 = 2³ × 3 and 40 = 2³ × 5. A common multiple needs 2³, 3² and 5, so the least one is 360 seconds.\
   `LCM = 2³ × 3² × 5 = 360 s`
3. **Convert and add the interval.** 360 seconds is six minutes. Add six minutes to 10:00 to get 10:06.\
   `360 s ÷ 60 = 6 min`\
   `10:00 + 0:06 = 10:06`

**Answer:** 10:06.

### Same remainder

**Question.** Find the greatest divisor giving remainder 5 for each of 149, 197 and 245.

**Picture it.** Imagine putting the same five spare counters aside from each pile. The counters still on the table must split evenly into groups of the unknown size.

1. **Remove the required remainder.** If division leaves 5, subtracting 5 gives an exact multiple of the divisor. The adjusted numbers are 144, 192 and 240.\
   `149 − 5 = 144, 197 − 5 = 192, 245 − 5 = 240`
2. **Find their greatest common divisor.** 192 − 144 = 48 and 240 − 192 = 48, so every common divisor divides 48. All three adjusted numbers are divisible by 48.\
   `GCD(144, 192, 240) = 48`
3. **Check the original remainders.** 149 = 3 × 48 + 5, 197 = 4 × 48 + 5 and 245 = 5 × 48 + 5. Since 5 < 48, these are valid remainders.\
   `149 = 48 × 3 + 5, 197 = 48 × 4 + 5, 245 = 48 × 5 + 5`

**Answer:** 48.

### Recover a number

**Question.** HCF=12, LCM=240 and one number is 48. Find the other.

**Picture it.** Think of two whole numbers as sharing the same bundle size. Their product also matches the product of their biggest shared factor and smallest shared multiple.

1. **Use the two-number identity.** For positive integers, HCF × LCM equals their product. Here the product is 12 × 240 = 2,880.\
   `12 × 240 = 2,880`
2. **Isolate the missing number.** Divide the product by the known number 48, obtaining 2,880 ÷ 48 = 60.\
   `2,880 ÷ 48 = 60`
3. **Verify both conditions.** 48 = 12 × 4 and 60 = 12 × 5. The co-factors 4 and 5 are coprime, giving HCF 12 and LCM 12 × 4 × 5 = 240.\
   `12 × 4 = 48, 12 × 5 = 60`\
   `12 × 4 × 5 = 240`

**Answer:** 60.

### HCF by repeated division

**Question.** Find the HCF of 48 and 18 without listing all their factors.

**Picture it.** Start with a big pile and make groups from it. Anything left over can also be split by every size that split the bigger two piles. Keep making smaller groups until nothing is left.

1. **Start with the larger dividend.** Two groups of 18 leave 12.\
   `48 = 2 × 18 + 12`
2. **Carry the remainder into the next division.** The new pair is 18 and 12.\
   `18 = 1 × 12 + 6`
3. **Stop at an exact division.** The last divisor is 6.\
   `12 = 2 × 6 + 0`

**Answer:** 6.

### LCM by ladder

**Question.** Find LCM(12, 15, 20).

**Picture it.** Imagine three piles of building blocks. Each time a prime can come out of some piles, take it out of all the piles it fits. Keep a list of the primes used.

1. **Divide by 2.** Apply 2 to 12 and 20 and carry the 15.\
   `(12, 15, 20) → (6, 15, 10)`
2. **Divide by 2 again.** The first and third entries are still even.\
   `(6, 15, 10) → (3, 15, 5)`
3. **Remove the remaining primes.** Apply 3 and then 5.\
   `(3, 15, 5) → (1, 5, 5) → (1, 1, 1)`
4. **Multiply the chosen primes.** The ladder removed these four prime factors in order.\
   `2 × 2 × 3 × 5 = 60`

**Answer:** 60.

### HCF and LCM of fractions

**Question.** Find the HCF and LCM of 2/3, 4/9 and 5/6.

**Picture it.** Imagine three slices measured in differently cut pieces. Redraw them all in eighteenth pieces, and then compare the counts just as you would compare whole numbers.

1. **Use a common denominator.** 18 is the first common denominator of 3, 9 and 6.\
   `(2/3, 4/9, 5/6) = (12/18, 8/18, 15/18)`
2. **Find the HCF of the counts.** 12, 8 and 15 share only 1. Each count represents eighteenth parts.\
   `GCD(12, 8, 15) ÷ 18 = 1/18`
3. **Find the LCM of the counts.** Use the largest power of each prime, then put the result back in eighteenth parts.\
   `LCM(12, 8, 15) = 2³ × 3 × 5 = 120`\
   `120/18 = 20/3`

**Answer:** HCF = 1/18, LCM = 20/3.

### Decimal HCF

**Question.** Find the greatest positive size that fits exactly into 0.60, 0.90 and 1.20.

**Picture it.** Think of every decimal amount as a number of little hundredth squares. Find the biggest shared bundle of those squares, then translate its size back.

1. **Convert to hundredths.** Use the same scale for all values.\
   `(0.60, 0.90, 1.20) × 100 = (60, 90, 120)`
2. **Find the HCF of the counts.** All three are multiples of 30. The first two have co-prime quotients 2 and 3.\
   `60 = 2 × 30, 90 = 3 × 30, 120 = 4 × 30`
3. **Undo the scale.** The greatest size is 30 hundredths.\
   `30 ÷ 100 = 0.30`

**Answer:** 0.30.

### Common remainder with a lower bound

**Question.** Find the smallest number greater than 12 leaving remainder 5 on division by 6, 8 and 12.

**Picture it.** Put five extra counters aside. What stays on the table has to split cleanly into groups of six, eight and twelve. Check the rule that the total is above 12.

1. **Remove the required remainder.** N − 5 must be a multiple of every divisor.\
   `LCM(6, 8, 12) = 2³ × 3 = 24`
2. **Apply the bound.** Candidates start at 5, 29, 53 and so on. The bound rules out 5.\
   `N = 24 × k + 5`
3. **Check the first remaining candidate.** 29 exceeds a multiple of every divisor by 5, and 5 is below all three divisors.\
   `29 − 5 = 24`

**Answer:** 29.

### Constant gap

**Question.** Find the least positive integer leaving remainders 3, 4, 5 on division by 4, 5, 6 respectively.

**Picture it.** Picture three piles that are each one tiny piece away from being full. Add that one piece, find the first shared full size, then take the piece back out.

1. **Compare each divisor with its remainder.** Each division is one short of the next full group.\
   `4 − 3 = 5 − 4 = 6 − 5 = 1`
2. **Add one to make an exact multiple.** N + 1 must be a positive common multiple.\
   `LCM(4, 5, 6) = 2² × 3 × 5 = 60`
3. **Remove the extra one.** The least positive common multiple gives the first admissible value.\
   `N = 60 − 1 = 59`

**Answer:** 59.

### Remainders larger than the candidate divisor

**Question.** Does a positive integer divide 62, 132 and 237 with respective remainders 6, 6 and 5?

**Picture it.** If someone promises six counters will be left, a full bundle has to hold more than six. Find the biggest possible bundle first and see if it is big enough.

1. **Remove the specified remainders.** The proposed divisor must divide the adjusted numbers.\
   `62 − 6 = 56, 132 − 6 = 126, 237 − 5 = 232`
2. **Bound all candidates.** First combine 56 and 126, then include 232.\
   `GCD(56, 126) = 14`\
   `GCD(14, 232) = 2`
3. **Check division is possible.** The divisor would have to be at most 2 and greater than 6. The two conditions are incompatible.

**Answer:** No such divisor exists.

### Known valid remainders

**Question.** Find the greatest positive divisor that leaves remainders 4, 6 and 5 when dividing 60, 90 and 117, respectively.

**Picture it.** Imagine the three piles have different leftovers. Take away each pile's own leftovers. Then find the biggest bundle that fits the three cleaned-up piles.

1. **Strip off each required remainder.** The adjusted values must be divisible by the same number.\
   `60 − 4 = 56, 90 − 6 = 84, 117 − 5 = 112`
2. **Find the greatest common divisor of the adjusted values.** They are two, three and four copies of 28. The quotients 2 and 3 are co-prime, so no larger value can divide both 56 and 84.\
   `GCD(56, 84, 112) = 28`
3. **Verify each remainder in the originals.** All three requested remainders are less than 28.\
   `60 = 28 × 2 + 4`\
   `90 = 28 × 3 + 6`\
   `117 = 28 × 4 + 5`

**Answer:** 28.

### Unknown common remainder

**Question.** Find the largest divisor that leaves the same remainder when dividing 43, 91 and 183. The remainder is unknown.

**Picture it.** Each pile leaves the same extra bits, but we do not know how many. Comparing the difference between two piles makes those identical extra bits disappear.

1. **Subtract the dividends to cancel the shared remainder.** The differences are exact multiples of the divisor because the unknown remainder appears once in each dividend.\
   `91 − 43 = 48`\
   `183 − 91 = 92`
2. **Find the HCF of the differences.** Use successive remainders to find the largest divisor that could work.\
   `92 = 48 + 44, 48 = 44 + 4, 44 = 11 × 4`
3. **Check the original divisions.** All three leave remainder 3, which is less than the candidate 4.\
   `43 = 4 × 10 + 3, 91 = 4 × 22 + 3, 183 = 4 × 45 + 3`

**Answer:** 4.

### Largest four-digit common multiple

**Question.** Find the largest four-digit number divisible by 12, 15 and 20.

**Picture it.** Picture stepping along the multiples of 60 toward a ceiling of 9,999. If the ceiling falls between steps, walk back to the last step below it.

1. **Find the common step.** A valid number must be a multiple of the LCM.\
   `LCM(12, 15, 20) = 60`
2. **Divide the endpoint.** The remainder is how far 9,999 lies above the previous multiple.\
   `9,999 = 60 × 166 + 39`
3. **Subtract that excess.** The next multiple is out of range.\
   `9,999 − 39 = 9,960`\
   `9,960 + 60 = 10,020`

**Answer:** 9,960.

### Return to a marked point

**Question.** Three runners start together and take 10, 15 and 20 minutes per lap. When are all three next at the starting line?

**Picture it.** Each runner can only appear back at the line after a whole number of their own laps. Look for the first time all three have finished whole laps.

1. **Count whole laps.** Each runner is at the line after any positive multiple of their own lap time.
2. **Find the first shared time.** The necessary prime powers are 2², 3 and 5.\
   `LCM(10, 15, 20) = 2² × 3 × 5 = 60 min`
3. **Check the lap counts.** All runners have finished whole laps.\
   `60 ÷ 10 = 6, 60 ÷ 15 = 4, 60 ÷ 20 = 3`

**Answer:** 60 minutes after the start.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Greatest equal piece or tile | HCF of all dimensions in the same unit. |
| First repeat from a shared start | LCM of the intervals. If starts differ, check the offsets too. |
| Two numbers, one missing | Other = (HCF × LCM) ÷ known number. Check both conditions. |
| Reduced ratio m:n and HCF h | Numbers mh and nh. LCM = mnh. |
| Known dividends, unknown common remainder | Find the HCF of their nonzero differences. |
| Known dividends, specified remainders | Find HCF of N − r for each pair. It must exceed every remainder. |
| Unknown N leaves remainder r under all divisors | N = k × LCM + r. Choose k using the requested range. |
| Constant gap g from remainder to divisor | N = k × LCM − g. Check range and remainder. |
| Largest n-digit common multiple | Subtract the remainder when the upper endpoint is divided by the LCM. |
| Smallest n-digit common multiple | Add LCM − r to the lower endpoint if r > 0. Keep the endpoint if r = 0. |
| Reduced fractions | HCF = HCF upstairs ÷ LCM downstairs. LCM = LCM upstairs ÷ HCF downstairs. |

## Exam tips

- **Decide what must divide what.** If the answer divides every input, think HCF. If every input divides the answer, think LCM.
- **Check remainder size.** A divisor of 2 cannot leave remainder 6. If the largest candidate is already too small, there is no solution.
- **Read the lower bound.** For least positive, the common remainder itself may qualify. A bound above every divisor rules it out.
- **Match units.** Convert all lengths or times before finding a common value. Use elapsed time when adding the result to a clock reading.
