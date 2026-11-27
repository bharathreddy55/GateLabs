## Basics first

- **Factor and multiple.** A factor divides a number exactly. The factors of 12 are 1, 2, 3, 4, 6 and 12. Positive multiples come from the times table. For 4 they begin 4, 8, 12 and 16.
- **Prime and co-prime.** A prime has exactly two positive factors, 1 and itself. Two numbers are co-prime when their only common factor is 1. For example, 8 and 15 are co-prime even though each is composite.
- **Highest common factor.** The HCF, also called GCD, is the greatest positive number that fits into every given number exactly. For 12 and 18, size 6 fits both. The HCF cannot exceed the smallest input.
- **Least common multiple.** The LCM is the smallest positive number into which every given number fits exactly. Bells starting together with periods of 12 and 18 minutes first ring together again 36 minutes later. The LCM cannot be below the largest input.

## Methods and when to use them

### Method A · Prime factorisation

For HCF, take the smallest power of each prime, counting an absent prime as power zero. For LCM, take the largest power of each prime. For 12 = 2² × 3 and 18 = 2 × 3², HCF = 2 × 3 = 6 and LCM = 2² × 3² = 36. Think shared blocks for HCF and enough blocks for every input for LCM.

**When to use it.** Use this in **LCM and HCF / Prime Factors** questions when the numbers have manageable prime factors and you need the LCM, HCF or both.

**Key rule.** HCF takes the smallest exponent of each prime, including zero when absent. LCM takes the largest exponent.

#### Type 1 · Largest equal pieces

**Question.** Cut ropes of 84, 126 and 210 m into the longest identical whole-metre lengths. Find length and count.

**Picture it.** Imagine cutting all three ropes with one ruler. A good ruler length fits every rope with no piece left over. We want the longest ruler that works.

1. **Translate the cutting condition.** The piece length must divide all three rope lengths exactly. Choosing the longest such piece means taking their HCF.
2. **Find the HCF.** 84 = 2 × 42 and 126 = 3 × 42. Since 2 and 3 are coprime, their HCF is 42. The third rope is 210 = 5 × 42 and does not reduce it.\
   `84 = 2 × 42, 126 = 3 × 42, 210 = 5 × 42`
3. **Count the pieces.** The ropes give 84/42 = 2, 126/42 = 3 and 210/42 = 5 pieces. Add them to get 10.\
   `2 + 3 + 5 = 10 pieces`

**Answer:** 42 m per piece, 10 pieces.

#### Type 2 · Repeating signals

**Question.** Lights flash together at 10:00, then every 18, 24 and 40 seconds. When are they next together?

**Picture it.** Imagine three blinking toys starting at the same moment. Put their blink times on three lines and find the first time all the lines share.

1. **Translate the repeat condition.** After the common flash, each light returns at multiples of its own interval. The first shared positive time is the LCM.
2. **Take the largest prime powers.** 18 = 2 × 3², 24 = 2³ × 3 and 40 = 2³ × 5. A common multiple needs 2³, 3² and 5, so the least one is 360 seconds.\
   `LCM = 2³ × 3² × 5 = 360 s`
3. **Convert and add the interval.** 360 seconds is six minutes. Add six minutes to 10:00 to get 10:06.\
   `360 s ÷ 60 = 6 min`\
   `10:00 + 0:06 = 10:06`

**Answer:** 10:06.

### Method B · Division for HCF

Divide the larger number by the smaller, then divide the previous divisor by the remainder. A common factor of the previous pair also divides the remainder, so the HCF stays the same. Stop at remainder zero and take the last divisor. For three inputs, find the HCF of the first two and take the HCF of that result and the third.

**When to use it.** Use this in **LCM and HCF / Euclidean Division** questions when asked for the HCF of two or more numbers whose prime factors are hard to spot.

**Key rule.** HCF(a, b) = HCF(b, remainder of a ÷ b). Stop at a zero remainder and use the last nonzero divisor.

#### Type 1 · HCF by repeated division

**Question.** Find the HCF of 48 and 18 without listing all their factors.

**Picture it.** Start with a big pile and make groups from it. Anything left over can also be split by every size that split the bigger two piles. Keep making smaller groups until nothing is left.

1. **Start with the larger dividend.** Two groups of 18 leave 12.\
   `48 = 2 × 18 + 12`
2. **Carry the remainder into the next division.** The new pair is 18 and 12.\
   `18 = 1 × 12 + 6`
3. **Stop at an exact division.** The last divisor is 6.\
   `12 = 2 × 6 + 0`

**Answer:** 6.

### Method C · Ladder for LCM

Write the inputs in a row. At each stage divide every entry that the chosen prime divides and carry the other entries down. A prime can divide just one of the entries. Once all entries are 1, multiply the primes you used.

**When to use it.** Use this in **LCM and HCF / Ladder Division** questions when you need the least common multiple of several numbers at once, such as intervals that need to line up.

**Key rule.** Divide each divisible entry by the chosen prime and carry the others forward. Multiply the ladder divisors once all entries reach 1.

#### Type 1 · LCM by ladder

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

#### Type 2 · Largest four-digit common multiple

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

#### Type 3 · Return to a marked point

**Question.** Three runners start together and take 10, 15 and 20 minutes per lap. When are all three next at the starting line?

**Picture it.** Each runner can only appear back at the line after a whole number of their own laps. Look for the first time all three have finished whole laps.

1. **Count whole laps.** Each runner is at the line after any positive multiple of their own lap time.
2. **Find the first shared time.** The necessary prime powers are 2², 3 and 5.\
   `LCM(10, 15, 20) = 2² × 3 × 5 = 60 min`
3. **Check the lap counts.** All runners have finished whole laps.\
   `60 ÷ 10 = 6, 60 ÷ 15 = 4, 60 ÷ 20 = 3`

**Answer:** 60 minutes after the start.

### Method D · Two-number identity and ratios

For positive a and b, a × b = HCF(a,b) × LCM(a,b). This works for a pair. If the reduced ratio is m:n and the HCF is h, the numbers are mh and nh. Their LCM is mnh because the parts remaining after removing h are co-prime.

**When to use it.** Use this in **LCM and HCF / Two-Number Relationships** questions when you are given an HCF, an LCM, a number, or a reduced ratio and need to recover information about the pair.

**Key rule.** For two positive integers, a × b = HCF(a, b) × LCM(a, b). If the reduced ratio is m:n and the HCF is h, the numbers are mh and nh.

#### Type 1 · Recover a number

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

### Method E · HCF and LCM of fractions and decimals

Reduce positive fractions first. A common denominator lets you treat their numerators as counts in one unit. Equivalently, fraction HCF is HCF of numerators divided by LCM of denominators, and fraction LCM uses LCM of numerators divided by HCF of denominators. For decimals, multiply all inputs by the same power of 10, solve with integers, then divide the result by that power of 10.

**When to use it.** Use this in **LCM and HCF / Fractions and Decimals** questions when the inputs are fractions or decimals and the question asks for their HCF or LCM.

**Key rule.** Reduce fractions first. For decimals, use one power of 10 for every input and divide the integer HCF or LCM by that same factor.

#### Type 1 · HCF of fractions

**Question.** Find the HCF of 2/3 and 4/9.

**Formula.** HCF of fractions = HCF of numerators ÷ LCM of denominators

**Picture it.** Imagine both fractions as pieces of the same-sized whole. In ninths, 2/3 is 6 pieces and 4/9 is 4 pieces. Find the largest equal bundle that fits both.

1. **Reduce each fraction.** 2/3 and 4/9 are already in simplest form. The numerators are 2 and 4, and the denominators are 3 and 9.\
   `(2, 4) over (3, 9)`
2. **Match each pair to the formula.** The largest number that divides 2 and 4 is 2. The first common multiple of 3 and 9 is 9.\
   `HCF(2, 4) = 2 and LCM(3, 9) = 9`
3. **Divide and check.** The result is 2/9. The given fractions contain 3 and 2 whole multiples of 2/9, so it fits both.\
   `(2/3) ÷ (2/9) = 3 and (4/9) ÷ (2/9) = 2`

**Answer:** 2/9.

#### Type 2 · LCM of fractions

**Question.** Find the LCM of 2/3 and 4/9.

**Formula.** LCM of fractions = LCM of numerators ÷ HCF of denominators

**Picture it.** Imagine each fraction as the length of a small strip. Lay copies of each strip end to end. The LCM is the first length both lines reach together.

1. **Start with reduced fractions.** Both fractions are already reduced. Apply the LCM rule to numerators 2 and 4, and the HCF rule to denominators 3 and 9.\
   `LCM(2, 4) = 4 and HCF(3, 9) = 3`
2. **Put the two results together.** Divide the LCM of the numerators by the HCF of the denominators.\
   `4 ÷ 3 = 4/3`
3. **Check the multiples.** The result contains two copies of 2/3 and three copies of 4/9. Using one copy of 2/3 cannot work because it is only 1½ copies of 4/9.\
   `2 × (2/3) = 3 × (4/9) = 4/3`

**Answer:** 4/3.

#### Type 3 · HCF of decimals

**Question.** Find the HCF of 1.2 and 1.8.

**Formula.** Decimal HCF = HCF of the scaled integers ÷ the common scale

**Picture it.** Count everything in tenths. The two amounts are 12 tenths and 18 tenths. Find the biggest bundle of tenths that fits both amounts exactly.

1. **Choose one common scale.** Both decimals have one decimal place, so multiply each by 10.\
   `1.2 × 10 = 12 and 1.8 × 10 = 18`
2. **Find the integer HCF.** 12 = 2 × 6 and 18 = 3 × 6. Since 2 and 3 share only 1, the HCF is 6.\
   `HCF(12, 18) = 6`
3. **Undo the scale and check.** Divide 6 by the same factor of 10. Two copies of 0.6 give 1.2, and three copies give 1.8.\
   `6 ÷ 10 = 0.6`

**Answer:** 0.6.

#### Type 4 · LCM of decimals

**Question.** Find the LCM of 1.2 and 1.8.

**Formula.** Decimal LCM = LCM of the scaled integers ÷ the common scale

**Picture it.** Think of two lights flashing every 1.2 and 1.8 seconds. Count in tenths of a second to find the first time they flash together again.

1. **Convert both to integers.** Multiply both decimals by 10 so they are counts of the same unit.\
   `1.2 × 10 = 12 and 1.8 × 10 = 18`
2. **Find the integer LCM.** The first multiples of 12 are 12, 24, 36, and the first multiples of 18 are 18, 36. The first common multiple is 36.\
   `LCM(12, 18) = 36`
3. **Undo the scale and check.** Divide 36 by 10. The result is three copies of 1.2 and two copies of 1.8.\
   `36 ÷ 10 = 3.6`

**Answer:** 3.6.

#### Type 5 · HCF and LCM of fractions

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

#### Type 6 · Decimal HCF

**Question.** Find the greatest positive size that fits exactly into 0.60, 0.90 and 1.20.

**Picture it.** Think of every decimal amount as a number of little hundredth squares. Find the biggest shared bundle of those squares, then translate its size back.

1. **Convert to hundredths.** Use the same scale for all values.\
   `(0.60, 0.90, 1.20) × 100 = (60, 90, 120)`
2. **Find the HCF of the counts.** All three are multiples of 30. The first two have co-prime quotients 2 and 3.\
   `60 = 2 × 30, 90 = 3 × 30, 120 = 4 × 30`
3. **Undo the scale.** The greatest size is 30 hundredths.\
   `30 ÷ 100 = 0.30`

**Answer:** 0.30.

#### Type 7 · Decimals with different numbers of places

**Question.** Find the HCF and LCM of 0.36 and 1.2.

**Picture it.** Write 1.2 as 1.20. Now both numbers are counts of hundredths, so you can use the same-sized pieces for both.

1. **Choose a scale that works for both inputs.** Multiplying by 10 would leave 0.36 as 3.6. Multiply both by 100 to get 36 and 120.
2. **Find the two integer results.** The HCF of 36 and 120 is 12 because 36 = 3 × 12 and 120 = 10 × 12. Their LCM is 36 × 120 ÷ 12 = 360.
3. **Undo the scale and check.** The HCF is 12 ÷ 100 = 0.12, and the LCM is 360 ÷ 100 = 3.6. The two inputs are 3 and 10 copies of 0.12. Ten copies of 0.36 and three copies of 1.2 give 3.6.

**Answer:** HCF = 0.12, LCM = 3.6.

**Fractions and decimals at a glance**

| Problem type | Formula or steps |
| --- | --- |
| HCF of reduced fractions | HCF of numerators ÷ LCM of denominators |
| LCM of reduced fractions | LCM of numerators ÷ HCF of denominators |
| HCF of decimals | Scale to integers → find HCF → divide by the scale |
| LCM of decimals | Scale to integers → find LCM → divide by the scale |

**Exam check.** Reduce each fraction first. When decimal lengths differ, use the power of 10 that makes every input an integer. For 0.36 and 1.2, use 100 for both.

### Method F · Remainder problems

Write N = dq + r, with 0 ≤ r < d. If the dividend N is known, subtract r before checking what d can divide. If the divisors are known and share a remainder r, N − r is a common multiple. Select the multiple using the question’s range. If every divisor exceeds its remainder by k, N + k is the common multiple.

**When to use it.** Use this in **LCM and HCF / Remainder Constraints** questions when the same number leaves a specified remainder for several divisors, or the possible divisors must leave stated remainders.

**Key rule.** A remainder r on division by d means d divides N − r, with 0 ≤ r < d. If all d − r equal k, every d divides N + k.

#### Type 1 · Same remainder

**Question.** Find the greatest divisor giving remainder 5 for each of 149, 197 and 245.

**Picture it.** Imagine putting the same five spare counters aside from each pile. The counters still on the table must split evenly into groups of the unknown size.

1. **Remove the required remainder.** If division leaves 5, subtracting 5 gives an exact multiple of the divisor. The adjusted numbers are 144, 192 and 240.\
   `149 − 5 = 144, 197 − 5 = 192, 245 − 5 = 240`
2. **Find their greatest common divisor.** 192 − 144 = 48 and 240 − 192 = 48, so every common divisor divides 48. All three adjusted numbers are divisible by 48.\
   `GCD(144, 192, 240) = 48`
3. **Check the original remainders.** 149 = 3 × 48 + 5, 197 = 4 × 48 + 5 and 245 = 5 × 48 + 5. Since 5 < 48, these are valid remainders.\
   `149 = 48 × 3 + 5, 197 = 48 × 4 + 5, 245 = 48 × 5 + 5`

**Answer:** 48.

#### Type 2 · Common remainder with a lower bound

**Question.** Find the smallest number greater than 12 leaving remainder 5 on division by 6, 8 and 12.

**Picture it.** Put five extra counters aside. What stays on the table has to split cleanly into groups of six, eight and twelve. Check the rule that the total is above 12.

1. **Remove the required remainder.** N − 5 must be a multiple of every divisor.\
   `LCM(6, 8, 12) = 2³ × 3 = 24`
2. **Apply the bound.** Candidates start at 5, 29, 53 and so on. The bound rules out 5.\
   `N = 24 × k + 5`
3. **Check the first remaining candidate.** 29 exceeds a multiple of every divisor by 5, and 5 is below all three divisors.\
   `29 − 5 = 24`

**Answer:** 29.

#### Type 3 · Constant gap

**Question.** Find the least positive integer leaving remainders 3, 4, 5 on division by 4, 5, 6 respectively.

**Picture it.** Picture three piles that are each one tiny piece away from being full. Add that one piece, find the first shared full size, then take the piece back out.

1. **Compare each divisor with its remainder.** Each division is one short of the next full group.\
   `4 − 3 = 5 − 4 = 6 − 5 = 1`
2. **Add one to make an exact multiple.** N + 1 must be a positive common multiple.\
   `LCM(4, 5, 6) = 2² × 3 × 5 = 60`
3. **Remove the extra one.** The least positive common multiple gives the first admissible value.\
   `N = 60 − 1 = 59`

**Answer:** 59.

#### Type 4 · Remainders larger than the candidate divisor

**Question.** Does a positive integer divide 62, 132 and 237 with respective remainders 6, 6 and 5?

**Picture it.** If someone promises six counters will be left, a full bundle has to hold more than six. Find the biggest possible bundle first and see if it is big enough.

1. **Remove the specified remainders.** The proposed divisor must divide the adjusted numbers.\
   `62 − 6 = 56, 132 − 6 = 126, 237 − 5 = 232`
2. **Bound all candidates.** First combine 56 and 126, then include 232.\
   `GCD(56, 126) = 14`\
   `GCD(14, 232) = 2`
3. **Check division is possible.** The divisor would have to be at most 2 and greater than 6. The two conditions are incompatible.

**Answer:** No such divisor exists.

#### Type 5 · Known valid remainders

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

#### Type 6 · Unknown common remainder

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
