## Basics first

- **Point and axes.** Each point pairs an x coordinate such as time with a plotted y value. Read actual axis labels before judging a rise by eye.
- **Change and rate.** Change is the difference in y values. Average rate is that difference divided by elapsed x, so equal-looking rises over unequal time spans can differ in rate.
- **Cumulative line.** Consecutive plotted values are running totals. The difference gives the new activity, even when the plotted total keeps increasing.
- **Interpolation.** Estimating between two plotted points uses the line segment or the stated trend assumption. Predicting past available data is extrapolation and carries extra uncertainty.

## Methods and when to use them

### Method A · Translate steepness into a unit rate

Subtract the y coordinates and divide by the x distance. Compare rates in the same units, such as calls per hour. Avoid comparing the raw increases when intervals have unequal length.

**When to use it.** Use this in **Line Graphs / Rates over Unequal Intervals** questions when asked which interval changes faster or how much the plotted quantity changes per unit of time.

**Key rule.** Rate of change = vertical change ÷ horizontal change. Compare slopes in the same units.

#### Type 1 · Steepest rise with uneven intervals

**Question.** Figures are 90 on day 0, 110 on day 2 and 134 on day 6. Which interval has faster daily growth?

**Picture it.** Imagine two climbers going up different heights in different times. To see who climbs faster, find how much height each gains in one day.

1. **Find the first segment’s slope.** The value rises from 90 to 110 over two days. Its average increase is 20 ÷ 2 = 10 per day.\
   `(110 − 90)/2 = 10 per day`
2. **Find the second segment’s slope.** The value rises from 110 to 134 over four days. Its rate is 24 ÷ 4 = 6 per day.\
   `(134 − 110)/4 = 6 per day`
3. **Compare in the same units.** Days 0–2 show the larger daily increase. Days 2–6 add more in total but take twice as long.\
   `10 > 6 per day`

**Answer:** Days 0–2.

#### Type 2 · Rate from a cumulative graph

**Question.** Cumulative calls rise from 50 at 9:00 to 170 at 11:00 and 245 at 12:00. Which interval had more calls per hour?

**Picture it.** Treat the graph like a running tally. Take the tally away at the start of each interval, then share the new calls across the hours in that interval.

1. **Extract calls from 9 to 11.** Cumulative counts increase from 50 to 170. The 120 additional calls over two hours give 60 per hour.\
   `(170 − 50)/2 = 60 calls/h`
2. **Extract calls from 11 to 12.** The count increases from 170 to 245. That is 75 additional calls in one hour, or 75 per hour.\
   `(245 − 170)/1 = 75 calls/h`
3. **Compare the hourly rates.** 75 per hour exceeds 60 per hour, so the shorter 11–12 interval is busier per hour.\
   `75 > 60 calls/h`

**Answer:** 11–12.

### Method B · Use the named endpoints

For net change across several intervals use final minus initial, regardless of intermediate rises or falls. For a relative change divide that net difference by the initial amount.

**When to use it.** Use this in **Line Graphs / Net and Relative Change** questions when the prompt names an initial and final point and asks for their overall change despite rises and falls in between.

**Key rule.** Net change = ending value − starting value. Relative change divides that difference by the starting value.

#### Type 1 · Net change versus interval change

**Question.** A series reads 80 in April, 100 in May and 90 in June. Find net percent change April to June.

**Picture it.** Cover the May point with your finger. You can still compare where the graph starts in April and where it ends in June.

1. **Choose the requested endpoints.** Net change from April to June compares April’s 80 with June’s 90. May’s intermediate peak is outside that endpoint calculation.\
   `April = 80, June = 90`
2. **Find the signed change.** June − April = 90 − 80 = +10 units.\
   `90 − 80 = +10`
3. **Use April as the base.** 10/80 × 100% = 12.5%. The positive difference makes this an increase.\
   `10/80 × 100% = 12.5%`

**Answer:** 12.5% increase.

### Method C · Walk along a straight segment

Compute slope m = ∆y/∆x. Multiply by how far the requested x is from the nearer known starting x, then add that increment to its y.

**When to use it.** Use this in **Line Graphs / Interpolation** questions when the requested x-value falls between two labelled points on a straight segment.

**Key rule.** On a straight segment, y at x = known y + slope × (x − known x).

#### Type 1 · Interpolation

**Question.** A straight segment connects (10 min, 40 L) and (18 min, 72 L). Estimate volume at 15 min.

**Picture it.** Imagine the line as a straight ramp. Find how much it rises per minute, then walk five minute-steps from the point you know.

1. **Find the constant slope.** The straight segment rises from 40 to 72 L between 10 and 18 min, giving (72−40)/(18−10) = 4 L/min.\
   `(72 − 40)/(18 − 10) = 4 L/min`
2. **Locate the requested time within the segment.** 15 min is five minutes after the first reading. Along the segment that adds 5 × 4 = 20 L.\
   `15 − 10 = 5 min`\
   `5 × 4 = 20 L`
3. **Add to the known starting volume.** 40 + 20 = 60 L, which lies between the two plotted volumes.\
   `40 + 20 = 60 L`

**Answer:** 60 L.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Absolute net change | y₂ − y₁. |
| Rate | (y₂ − y₁) ÷ (x₂ − x₁). |
| Relative change from start | (final − initial) ÷ initial × 100%. |
| Interpolate on a line | y = y₁ + m(x − x₁). |

## Exam tips

- **Check the time span.** An increase of 24 in four days is slower than 20 in two days.
- **Distinguish cumulative level from interval output.** A steepening curve means more activity per unit time.
- **Check interpolated bounds.** Between two increasing endpoints, the estimate should be between their y values.
