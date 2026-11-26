## What it means

Ranking problems describe positions from one or more ends of an ordered group. A rank counts the person or item as one of the positions. Changes in rank can come from changes to position, entrants and exits or swaps. The number of people between ranks excludes both endpoints.

## Formulas and rules

- **Same person, both ends:** N=left rank+right rank−1 because the person is counted twice.
- **Convert a rank:** Rank from opposite end=N+1−known rank.
- **Between ranks:** Once ranks refer to the same end, between count=absolute difference−1 for distinct people.
- **Swaps and exits:** A person who swaps inherits the other person’s slot. If a person ahead leaves, the target moves one rank closer to the front.

## How to study it for Station Master

- Draw endpoints and label the direction of each rank before subtracting. Check whether two opposite end ranks describe the same person or different people.
- Practise swap, overlap and removal variants. If total size is unknown for different people, test both relative orders when the clues allow them.

## Question models and worked examples

### Total from two ends

**Question.** K is 18th from the left and 27th from the right. How many people are in the line?

1. **Count who stands to the left.** 18th from the left means there are 17 people before K on that side.
2. **Count who stands to the right.** 27th from the right means there are 26 people on the other side.
3. **Include K once.** The whole line has 17+1+26=44 people. The shortcut 18+27−1 removes the double count of K.

**Answer:** 44.

### Distance between ranks

**Question.** In a line of 48, A is 14th from the left and B is 12th from the right. How many are between them?

1. **Put both ranks on the same scale.** A is at left position 14. B is 12th from the right, so B’s left position is 48−12+1=37.
2. **Measure the span.** The position difference is 37−14=23. That counts steps from A’s position to B’s position.
3. **Exclude the endpoints.** The intervening positions go from 15 to 36 inclusive, giving 37−14−1=22 people.

**Answer:** 22.

### Total after a swap

**Question.** A is 9th from left and B is 16th from right. After exchanging seats A is 21st from left. Find total size.

1. **Locate B’s original seat from the left.** A moves into B’s seat after the swap. A’s new rank of 21st from the left therefore describes B’s original seat.
2. **Use B’s right rank at that same seat.** B was originally 16th from the right. That seat has 20 people on the left and 15 on the right.
3. **Add the seat and both sides.** The size of the line is 20+1+15=36.

**Answer:** 36.

### Rank changes with exits

**Question.** D ranks 17th out of 40. Three people ahead of D and two behind leave. What are D’s ranks from the top and bottom now?

1. **Count the people above and below first.** Originally 16 people were ahead of D and 40−17=23 were behind D.
2. **Remove people from the proper sides.** After three ahead leave, 13 remain ahead. After two behind leave, 21 remain behind.
3. **Convert counts back to ranks.** Include D when counting from either end. D is 13+1=14th from the top and 21+1=22nd from the bottom. The ranks add to 36, one more than the new total of 35.

**Answer:** 14th from top, 22nd from bottom.
