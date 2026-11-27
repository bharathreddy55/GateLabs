## Basics first

- **Mean.** The mean spreads the total evenly over all observations. A frequency table can represent repeated values by multiplication.
- **Median.** The median is the middle value after sorting when the count is odd. For an even count, average the two central values.
- **Mode.** The mode is a most frequent value. A distribution can have more than one tied most frequent value.
- **Range.** Range = largest minus smallest. One extreme can widen the range and move the mean, while the median may stay unchanged.

## Methods and when to use them

### Method A · Read a frequency table as a compressed list

Multiply each value by its frequency to recover its contribution to the sum. Add frequencies to recover the observation count. If the question asks for mode, read the highest frequency and return its value.

**When to use it.** Use this in **Statistics / Frequency Tables** questions when repeated observations are listed as values and counts and you need the total, mean or mode.

**Key rule.** Mean = sum of (value × frequency) ÷ total frequency. The mode is the value with the largest frequency.

#### Type 1 · Mean from frequencies

**Question.** Values 2, 5 and 8 occur 3, 4 and 1 times. Find the mean.

**Picture it.** Imagine laying out a card for every reading. Instead of writing 5 four times, count four copies of 5 with multiplication.

1. **Recover the weighted sum.** Each frequency tells how many copies of its value contribute. The sum is 2 × 3 + 5 × 4 + 8 × 1 = 34.\
   `2 × 3 + 5 × 4 + 8 × 1 = 34`
2. **Count all observations.** The frequencies add to 3 + 4 + 1 = 8. This includes repeated values.\
   `3 + 4 + 1 = 8`
3. **Divide sum by count.** The mean is 34 ÷ 8 = 4.25. Dividing by the three distinct values would use the wrong count.\
   `34 ÷ 8 = 4.25`

**Answer:** 4.25.

### Method B · Locate ranks with cumulative frequencies

Compute the needed middle rank or ranks first. Add frequencies in numerical order and find the first cumulative total reaching each rank. If the middle pair lie in different values, average those values.

**When to use it.** Use this in **Statistics / Median from Frequencies** questions when the data are given as counts and you must find the middle value without writing out every observation.

**Key rule.** Locate the middle rank or ranks using the running frequency totals. For two middle ranks, average the corresponding values.

#### Type 1 · Median and mode from a table

**Question.** Values 4, 7, 9 and 12 occur 3, 2, 3 and 2 times. Find median and modes.

**Picture it.** Draw all ten spots in a line. Repeated numbers still get their own spots. The middle is between spots five and six, while the mode depends on which number has the most spots.

1. **Locate the middle positions.** The frequencies add to 10, so the median is the average of the 5th and 6th observations in sorted order.\
   `n = 3 + 2 + 3 + 2 = 10 ⇒ ranks 5 and 6`
2. **Use cumulative counts.** Value 4 occupies positions 1–3, value 7 positions 4–5, and value 9 positions 6–8. Thus the middle values are 7 and 9, with mean 8.\
   `cumulative counts: 3, 5, 8, 10`\
   `median = (7 + 9)/2 = 8`
3. **Find the most frequent values.** The largest frequency is 3, reached by both 4 and 9. Both are modes.\
   `largest frequency = 3 at values 4 and 9`

**Answer:** Median 8, modes 4 and 9.

### Method C · Track what a transformation preserves

Adding a constant c to each value adds c to its mean and median. Because both endpoints move equally, the range is unchanged. For a one-entry replacement the total changes by the entry difference and the ordering must be rechecked.

**When to use it.** Use this in **Statistics / Changes to a Dataset** questions when every entry is shifted by the same amount or a single observation is corrected and you need updated statistics.

**Key rule.** Adding c to every value adds c to mean and median and leaves the range unchanged. Replacing one value changes the sum by new − old.

#### Type 1 · Sensitivity to an outlier

**Question.** For 2,3,4,5,6 replace 6 by 36. Compare mean and median.

**Picture it.** One high number gets much bigger, so it lifts the total. Ask whether it also moves the number that stands in the middle of the line.

1. **Find the original centre.** The values total 20, so their mean is 4. The third value is also 4, giving median 4.\
   `(2 + 3 + 4 + 5 + 6) ÷ 5 = 4`
2. **Update the mean.** Replacing 6 with 36 adds 30 to the sum. The new sum is 50 with the same five observations, so the mean becomes 10.\
   `new mean = 4 + (36 − 6) ÷ 5 = 10`
3. **Recheck the middle position.** The order is 2, 3, 4, 5, 36. The third position is still 4, so only the mean changed.\
   `2, 3, 4, 5, 36 ⇒ median 4`

**Answer:** Mean rises by 6, median stays 4.

#### Type 2 · Translate readings

**Question.** Readings have mean 18 and range 7. Add 12 to every reading. Find mean and range.

**Picture it.** Think of picking up the whole line of numbers and sliding it to the right by 12. The middle moves with the line. The space between its ends stays the same.

1. **Track the change to the sum.** If there are n readings, adding 12 to each raises their total by 12n.\
   `new sum = old sum + 12n`
2. **Find the new mean.** Dividing by n increases the mean by 12, giving 18 + 12 = 30.\
   `new mean = 18 + 12 = 30`
3. **Check the two endpoints.** Both minimum and maximum rise by 12. The subtraction maximum − minimum cancels those increases, leaving range 7.\
   `(max + 12) − (min + 12) = 7`

**Answer:** Mean 30, range 7.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Mean from frequencies | Σ(value × frequency) ÷ Σ(frequency). |
| Median ranks | Odd n: (n+1)/2. Even n: n/2 and n/2+1. |
| Mode | Value or values at the highest frequency. |
| Range after common shift | (max+c) − (min+c) = max − min. |

## Exam tips

- **Sort by data value for the median.** A frequency ranking serves a different purpose.
- **Distinguish a frequency from a value.** The answer for mode is the category’s value.
- **Check both central ranks for even samples.** They may sit in different rows of a table.
