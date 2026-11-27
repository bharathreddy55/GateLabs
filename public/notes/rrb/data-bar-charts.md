## Basics first

- **Axes and legend.** Labels identify categories and the numeric scale. The legend says which bar or segment belongs to which measure.
- **Grouped bars.** Bars beside one another show multiple series in one category. Add their values only if they are disjoint parts of the requested total.
- **Stacked bars.** The top of a segment is a running boundary. The segment’s own value is its top minus its bottom.
- **Normalised bars.** A 100% stack shows composition. A shorter fraction can correspond to a greater absolute count when its group total is larger.

## Methods and when to use them

### Method A · Read labelled values before comparing heights

Check axis ticks and their spacing. If the baseline is above zero, take the actual values from the numeric labels. Use those values for percent changes.

**When to use it.** Use this in **Bar Charts / Axis and Scale** questions when the baseline is above zero, ticks jump by more than one unit or the question asks for a difference or percent change.

**Key rule.** Read values against the numerical scale before comparing. Percent change = (new value − old value) ÷ old value × 100.

#### Type 1 · Grouped comparison

**Question.** Dispatch bars for Monday are 28 express and 42 local. Tuesday shows 33 express and 35 local. Which day has the higher express share?

**Picture it.** Imagine sorting each day's trains into an express basket and a local basket. Compare the express basket with that day's two baskets together.

1. **Find Monday’s total.** Monday combines 28 express and 42 local dispatches, so express is 28/(28+42) = 40% of its total.\
   `28 + 42 = 70`\
   `28/70 = 40%`
2. **Find Tuesday’s share on its own base.** Tuesday combines 33 express with 35 local, so express is 33/68, about 48.5%.\
   `33 + 35 = 68`\
   `33/68 ≈ 48.53%`
3. **Compare the two proportions.** Tuesday’s express share is higher by about 8.5 percentage points.\
   `48.53% − 40% ≈ 8.53 percentage points`

**Answer:** Tuesday.

#### Type 2 · Axis starting above zero

**Question.** One bar ends at 110 and the other at 130 on an axis beginning at 100. What is the actual percent increase from first to second?

**Picture it.** The bottom of the drawing hides the first 100 units. Add those back in your mind by reading the numbers printed at the top of the bars.

1. **Read the true bar endpoints.** The axis begins at 100, but the actual values are 110 and 130. The visible heights above 100 are only 10 and 30.\
   `old value = 110, new value = 130`
2. **Find the change.** The recorded value increases by 130 − 110 = 20 units.\
   `130 − 110 = 20`
3. **Divide by the original reading.** The percentage increase is 20/110 × 100%, or about 18.18%. The base is 110, the original value.\
   `20/110 × 100% ≈ 18.18%`

**Answer:** About 18.18%.

### Method B · Recover a segment from boundaries

For a middle band, record its lower and upper coordinates. Subtract to get the band count. Divide by the full stack only if a share of the group is asked.

**When to use it.** Use this in **Bar Charts / Stacked Segments** questions when the target category sits in the middle or at the top of a stack and only the segment boundaries are readable.

**Key rule.** A stacked segment’s count is its upper boundary minus its lower boundary.

#### Type 1 · Read a stacked band

**Question.** In a count stack, the first band ends at 180, the second ends at 315 and the top ends at 420. Find the second band’s share.

**Picture it.** Picture blocks stacked to make one tall tower. The middle band's size is its top mark minus the height already underneath it.

1. **Locate the band boundaries.** The second band starts where the first ends, at 180, and finishes at 315. The value 315 includes the bands below it.\
   `lower = 180, upper = 315`
2. **Find the band’s own count.** Subtract its bottom boundary from its top, 315 − 180 = 135.\
   `315 − 180 = 135`
3. **Divide by the complete stack.** The total is 420. The band’s share is 135/420 × 100% ≈ 32.14%.\
   `135/420 × 100% ≈ 32.14%`

**Answer:** About 32.14%.

### Method C · Choose share or count explicitly

For shares, divide each subgroup by its own whole. For counts shown as shares, multiply by that group’s total. Only then compare like measures.

**When to use it.** Use this in **Bar Charts / Counts versus Proportions** questions when groups have different totals or the bars display percentages and you must compare underlying counts.

**Key rule.** Count = share as a decimal × group total. Share = count ÷ the total for that same group.

#### Type 1 · Normalised stack

**Question.** Digital shares are 40% at A and 35% at B. Totals are 300 and 480. Which has more digital transactions?

**Picture it.** A larger slice of a small cake can be smaller than a slightly thinner slice of a big cake. Turn both percentages into actual counts first.

1. **Recover A’s count.** Apply the 40% band to A’s 300 transactions, giving 120 digital transactions.\
   `0.40 × 300 = 120`
2. **Recover B’s count.** Apply B’s 35% band to its larger base of 480, giving 168 digital transactions.\
   `0.35 × 480 = 168`
3. **Compare like counts.** 168 − 120 = 48. B’s smaller percentage still represents more transactions because its whole is larger.\
   `168 − 120 = 48`

**Answer:** B, by 48.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Grouped share | Chosen bar ÷ sum of the bars comprising its whole. |
| Stack band count | Upper boundary − lower boundary. |
| 100% stack to count | Proportion × total for that group. |
| Actual percent increase | (new axis value − old axis value) ÷ old axis value × 100%. |

## Exam tips

- **Check the baseline.** A truncated axis makes differences look larger.
- **Check the legend.** Keep group, category and colour mapped correctly.
- **Use the same comparison unit.** Choose counts, percentages or percentage points according to the question.
