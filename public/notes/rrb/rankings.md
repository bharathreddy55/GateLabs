## Basics first

- **Rank and people before it.** A person ranked k from an end has k−1 people before them from that end. If ranks are distinct, one person occupies each position.
- **Rank conversion.** In a line of N, left rank plus right rank for the same person equals N+1 because the person appears in both counts.
- **People between.** Put both people on one position scale. The distance between their positions counts moves. People strictly between equals that distance minus 1 for different positions.
- **Swaps and exits.** Two people exchanging seats keep the same total and trade position numbers. When people leave, track who exits on each side separately.

## Methods and when to use them

### Method A · Convert to a single direction

Use left = N+1−right when N is known. Compare both positions in that system. If both end ranks refer to one person and N is missing, add and subtract one.

### Method B · Follow the seat on a swap

When A moves into B’s old seat, A’s new left rank can be combined with B’s old right rank. They refer to a single physical seat despite involving different names.

### Method C · Rebuild ranks after exits

Start with counts ahead and behind. Remove the numbers from those two counts. Add one for the person to get each new rank and verify the sum equals the new N+1.

## Question models and worked examples

### Total from two ends

**Question.** K is 18th from the left and 27th from the right. How many people are in the line?

1. **Count who stands to the left.** 18th from the left means there are 17 people before K on that side.\
   `18 − 1 = 17 left of K`
2. **Count who stands to the right.** 27th from the right means there are 26 people on the other side.\
   `27 − 1 = 26 right of K`
3. **Include K once.** The whole line has 17+1+26=44 people. The shortcut 18+27−1 removes the double count of K.\
   `17 + 1 + 26 = 44 people`

**Answer:** 44.

### Distance between ranks

**Question.** In a line of 48, A is 14th from the left and B is 12th from the right. How many are between them?

1. **Put both ranks on the same scale.** A is at left position 14. B is 12th from the right, so B’s left position is 48−12+1=37.\
   `B from left = 48 + 1 − 12 = 37`
2. **Measure the span.** The position difference is 37−14=23. That counts steps from A’s position to B’s position.\
   `37 − 14 = 23 seat moves`
3. **Exclude the endpoints.** The intervening positions go from 15 to 36 inclusive, giving 37−14−1=22 people.\
   `23 − 1 = 22 people`

**Answer:** 22.

### Total after a swap

**Question.** A is 9th from left and B is 16th from right. After exchanging seats A is 21st from left. Find total size.

1. **Locate B’s original seat from the left.** A moves into B’s seat after the swap. A’s new rank of 21st from the left therefore describes B’s original seat.\
   `B’s original left rank = A’s new left rank = 21`
2. **Use B’s right rank at that same seat.** B was originally 16th from the right. That seat has 20 people on the left and 15 on the right.\
   `21 − 1 = 20 left, 16 − 1 = 15 right`
3. **Add the seat and both sides.** The size of the line is 20+1+15=36.\
   `20 + 1 + 15 = 36`

**Answer:** 36.

### Rank changes with exits

**Question.** D ranks 17th out of 40. Three people ahead of D and two behind leave. What are D’s ranks from the top and bottom now?

1. **Count the people above and below first.** Originally 16 people were ahead of D and 40−17=23 were behind D.\
   `ahead = 17 − 1 = 16 and behind = 40 − 17 = 23`
2. **Remove people from the proper sides.** After three ahead leave, 13 remain ahead. After two behind leave, 21 remain behind.\
   `16 − 3 = 13 ahead and 23 − 2 = 21 behind`
3. **Convert counts back to ranks.** Include D when counting from either end. D is 13+1=14th from the top and 21+1=22nd from the bottom. The ranks add to 36, one more than the new total of 35.\
   `13 + 1 = 14th top, 21 + 1 = 22nd bottom`

**Answer:** 14th from top, 22nd from bottom.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Same person’s ranks from both ends | Total = left + right − 1. |
| Convert right rank r to left | Left = N + 1 − r. |
| People strictly between distinct positions | Absolute difference − 1. |
| Departures from each side | New rank from a side = old rank from that side − people who left before them. |

## Exam tips

- **Match names and time frames.** Do not combine ranks from different seats or different totals.
- **Exclude endpoints when asked for between.** People at both listed seats do not count.
- **Check edge cases.** The first person from the left must be Nth from the right.
