## Basics first

- **Arithmetic mean.** Mean = sum ÷ count. It is the amount each entry would have if the total were evenly shared. The mean need not be one of the original values.
- **Weighted mean.** When values represent groups of unequal sizes, each group mean counts once for every member. The combined mean lies between the smallest and largest group means.
- **Correcting a mean.** A wrong entry changes the total by the difference between wrong and correct values. If the same number of entries is retained, the count is unchanged.
- **Average speed.** Speed for a whole trip is total distance divided by total elapsed time. This differs from averaging listed speeds when time at each speed is unequal.

## Methods and when to use them

### Method A · Rebuild the totals

Multiply each group’s mean by its headcount. Add those totals and divide by combined headcount. If two groups are the same size, their two means can be averaged directly.

### Method B · Balance around the target

A member in a group averaging 52 is 8 below target 60 on average. One in a group averaging 66 is 6 above. Matching total shortage and excess solves for an unknown group size.

### Method C · Choose the right denominator

With equal distances at positive speeds u and v, use 2uv/(u+v). With equal times, use (u+v)/2. With stops or unequal distances, rebuild each travel time and use the general rule.

## Question models and worked examples

### Two unequal groups

**Question.** 24 candidates average 63 and 36 average 73. Find the combined mean.

**Picture it.** Imagine pooling the scores from both groups and sharing them evenly. A larger group puts more scores into the pile than a smaller group.

1. **Recover each group’s total.** Mean × count gives the sum of the scores. The two groups contribute 24 × 63 = 1,512 and 36 × 73 = 2,628.\
   `24 × 63 = 1,512 and 36 × 73 = 2,628`
2. **Combine totals and counts.** The score sum is 1,512 + 2,628 = 4,140, and the combined count is 24 + 36 = 60.\
   `1,512 + 2,628 = 4,140`
3. **Find the weighted mean.** Divide 4,140 by 60 to get 69. It lies closer to 73 because the second group contributes more scores.\
   `4,140 ÷ (24 + 36) = 69`

**Answer:** 69.

### Correct a mean

**Question.** The mean of 16 values is recorded as 42. One entry of 58 should be 38. Find the corrected mean.

**Picture it.** A single number was written 20 too high. Fix that number in the total first. Everybody still gets the same number of spots when you spread the total evenly.

1. **Find the recorded total.** The 16 reported entries add to 16 × 42 = 672.\
   `16 × 42 = 672`
2. **Correct the total.** Replacing 58 with 38 reduces the original sum by 20. The corrected sum is 672 − 58 + 38 = 652.\
   `672 − 58 + 38 = 652`
3. **Use the unchanged count.** One entry was replaced, so there are still 16 values. The corrected mean is 652 ÷ 16 = 40.75.\
   `652 ÷ 16 = 40.75`

**Answer:** 40.75.

### Recover a group size

**Question.** 18 members average 52, a second group averages 66, and the combined mean is 60. How many are in the second group?

**Picture it.** Imagine one group putting too little on a balance and the other putting too much. The missing headcount must balance the shortfall on the first side.

1. **Measure the first group’s deficit.** Use 60 as a reference. The first group is 8 points below it per member on average, so the total shortfall is 18 × 8 = 144.\
   `18 × (60 − 52) = 144`
2. **Measure the second group’s surplus.** The second group averages 66, or 6 points above the reference per member. The two deviations must cancel for the combined mean to equal 60.\
   `66 − 60 = 6`
3. **Solve and check.** Divide 144 by 6 to get 24 members. The total score is 18 × 52 + 24 × 66 = 2,520, which is 60 × 42.\
   `144 ÷ 6 = 24`

**Answer:** 24 members.

### Equal-distance average speed

**Question.** A van covers 60 km at 40 km/h and returns at 60 km/h. Find average speed.

**Picture it.** The van travels the same distance in both directions, but spends longer on the slow leg. Use the trip's whole clock and all the kilometres.

1. **Find the time for each leg.** Time equals distance ÷ speed. The outward leg takes 60 ÷ 40 = 1.5 hours, and the return takes 60 ÷ 60 = 1 hour.\
   `60 ÷ 40 = 1.5 h`
2. **Add the totals.** The van drives 120 km and spends 2.5 hours travelling. It spends longer at the lower speed.\
   `60 ÷ 60 = 1 h`
3. **Divide distance by time.** Average speed is 120 ÷ 2.5 = 48 km/h.\
   `120 ÷ (1.5 + 1) = 48 km/h`

**Answer:** 48 km/h.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Combined mean | (n₁ × mean₁ + n₂ × mean₂) ÷ (n₁ + n₂). |
| Replace one entry | New mean = old mean + (new entry − old entry) ÷ count. |
| Unknown group size | Total deficit below the combined mean equals total surplus above it. |
| Equal-distance out and back | Average speed = 2uv ÷ (u + v). |

## Exam tips

- **Sanity-check weighted direction.** A larger group pulls the mean toward its own value.
- **Keep replacement and removal distinct.** Replacing leaves the count unchanged. Removing reduces it by one.
- **Include rest time if the trip asks for it.** A break adds to elapsed time while distance remains the same.
