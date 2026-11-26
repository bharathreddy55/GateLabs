## Basics first

- **Row, column and unit.** A value belongs to the intersection of a row and column. Read the headings and footnote for whether it is a count, percentage, cumulative total or value in thousands.
- **Counts and rates.** A count answers how many. A rate answers how many per stated base. The same count can yield different rates at busy and quiet stations.
- **Weighted overall rates.** An overall rate reflects how many observations each group contributes. Recover the successes and eligible totals in every row before merging.
- **Cumulative counts.** “By 5 pm” accumulates all prior sales. To find activity in an interval, subtract the cumulative count at the beginning from the end.

## Methods and when to use them

### Method A · Extract your own small table

Copy only the relevant rows and name the two quantities you need. Keep a base column beside its rate column. This helps avoid borrowing a denominator from a different station or month.

### Method B · Recover missing totals

If an average and its count are given, multiply them to find the implied sum. Subtract all known entries. Check that the new total reproduces the stated average.

### Method C · Work from the requested period

For a change use (new − old)/old. For an interval share from a running log, subtract its two endpoint totals for the numerator and separately subtract the endpoints of the full period.

## Question models and worked examples

### Column comparison and percent change

**Question.** Passenger counts in April and May were 3200 and 3680 at A, and 2800 and 3110 at B. Which station grew faster by percentage?

**Picture it.** Imagine each station has its own pile of tickets in April. Compare its extra May tickets with the size of its own April pile.

1. **Calculate A’s percentage growth.** A gained 3,680 − 3,200 = 480 passengers. Divide by its April count, 480/3,200 × 100% = 15%.\
   `(3,680 − 3,200)/3,200 × 100% = 15%`
2. **Calculate B’s growth on its own base.** B gained 3,110 − 2,800 = 310. Relative to its April count, that is 310/2,800 × 100% ≈ 11.07%.\
   `(3,110 − 2,800)/2,800 × 100% ≈ 11.07%`
3. **Compare like measures.** A’s 15% exceeds B’s 11.07%. The comparison uses percentages with separate starting counts.\
   `15% > 11.07%`

**Answer:** A.

### Overall rate from rows

**Question.** Morning: 240 trains, 90% on time. Evening: 160 trains, 75% on time. Find overall punctuality.

**Picture it.** For every 100 morning trains, 90 are on time. Do the same for the evening group and count real trains before finding the overall share.

1. **Recover the morning on-time count.** Use the morning train count as the base, 240 × 90% = 216 on time.\
   `240 × 0.90 = 216`
2. **Recover the evening on-time count.** Use the evening base, 160 × 75% = 120 on time. The two shift totals are unequal.\
   `160 × 0.75 = 120`
3. **Combine both numerators and denominators.** There were 216 + 120 = 336 on-time trains out of 240 + 160 = 400. Divide to get 84%.\
   `(216 + 120)/(240 + 160) = 336/400 = 84%`

**Answer:** 84%.

### Find a missing row count

**Question.** A table lists 120 service requests on Monday, 140 on Tuesday and a three-day average of 135. Find Wednesday’s count.

**Picture it.** Picture three days sharing the same average. Multiply by three to recover the whole week's three-day pile, then remove the two piles already labelled.

1. **Recover the required total.** Average = total ÷ number of days. A three-day average of 135 requires 3 × 135 = 405 requests.\
   `3 × 135 = 405`
2. **Add the known days.** Monday and Tuesday jointly account for 120 + 140 = 260 requests.\
   `120 + 140 = 260`
3. **Find and check the remainder.** Wednesday accounts for 405 − 260 = 145. Including it restores the required three-day total.\
   `405 − 260 = 145`

**Answer:** 145.

### Cumulative figures

**Question.** A running log shows 780 tickets by noon, 1120 by 2 pm, and 1620 by 5 pm. What share of tickets sold from noon to 5 pm came after 2 pm?

**Picture it.** A running ticket number only goes up. Take a picture of it at noon, 2 pm and 5 pm. Subtract two pictures to see how many new tickets appeared between them.

1. **Extract the after-2 sales.** Running totals include all tickets sold before the reading time. Subtract the 2 pm reading from the 5 pm reading, 1,620 − 1,120 = 500.\
   `1,620 − 1,120 = 500`
2. **Extract all noon-to-5 sales.** Use the noon reading as the starting baseline for the full interval, 1,620 − 780 = 840.\
   `1,620 − 780 = 840`
3. **Form the requested share.** Divide the later subinterval’s 500 by the whole interval’s 840. This reduces to 25/42, or about 59.5%.\
   `500/840 = 25/42 ≈ 59.5%`

**Answer:** 25/42, about 59.5%.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Percent growth from A to B | (B − A) ÷ A × 100%. |
| Combined punctuality | Total on-time trains ÷ all scheduled trains. |
| Missing count given average | Count × average − sum of known values. |
| Activity between times | Cumulative total at end − cumulative total at start. |

## Exam tips

- **Underline the base.** “Share of evening services” and “share of all services” use different denominators.
- **Check time labels.** A cumulative 2 pm figure already includes sales that took place by noon.
- **Check headings for scale.** Convert counts in thousands if the question asks for individual units.
