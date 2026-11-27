## Basics first

- **Outcome and event.** An outcome is one possible result such as (3,6) on two distinguishable dice. An event collects outcomes meeting the question’s condition.
- **Equally likely cases.** Count favourable over total only when every case being counted has the same probability. Fair dice have equally likely ordered pairs.
- **Independent and conditional events.** Independence means the earlier result leaves the next probability unchanged. Without replacement, remove the drawn item from both the total and its category before the next draw.
- **Complements and overlaps.** The complement of a condition contains every case where it fails. The union of two events includes their overlap once.

## Methods and when to use them

### Method A · Choose ordered or unordered counting

Use ordered pairs for a draw sequence or if you will multiply branch probabilities. Use combinations for a group selected without order. Keep the denominator and numerator on the same basis.

**When to use it.** Use this in **Probability / Counting Equally Likely Outcomes** questions when you draw, choose or arrange items and must decide whether different orders count as different outcomes.

### Method B · Translate key words before solving

“Both” requires the two conditions on the same outcome. “Exactly one” excludes zero and two. “At least one” includes all positive counts and often becomes 1 minus the none case.

**When to use it.** Use this in **Probability / Exactly, At Least and Both** questions when wording such as “exactly one”, “at least one” or “both” defines which results count.

### Method C · Pick inclusion–exclusion or a tree

For OR with overlap, add both event probabilities then subtract the shared cases once. For successive draws, follow the branch, update the counts and multiply. Add disjoint branches if several orders qualify.

**When to use it.** Use this in **Probability / Overlap and Successive Draws** questions when two events can happen together or when a later draw depends on what happened in an earlier draw.

## Question models and worked examples

### Two dice with a fixed sum

**Question.** Two fair six-sided dice are rolled. Find P(sum = 9).

**Picture it.** Imagine one red die and one blue die. A 3 on red and 6 on blue is different from a 6 on red and 3 on blue.

1. **Count all equally likely outcomes.** For each of six first-die values there are six second-die values. This gives 36 ordered results.\
   `6 × 6 = 36 outcomes`
2. **List the pairs with sum 9.** They are (3,6), (4,5), (5,4) and (6,3). For example, (3,6) counts separately from (6,3) because the dice are distinguished.\
   `(3,6), (4,5), (5,4), (6,3)`
3. **Divide favourable by total.** Four ordered outcomes meet the condition, giving 4/36 = 1/9.\
   `4/36 = 1/9`

**Answer:** 1/9.

### At least one

**Question.** Three independent fair coin tosses are made. Find the chance of at least one head.

**Picture it.** It is easier to picture the one way you never see a head. All three coins must land tails. Every other result counts towards the answer.

1. **Identify the complement.** At least one head includes one, two or three heads. The single excluded outcome is three tails.\
   `P(at least one head) = 1 − P(all tails)`
2. **Calculate the chance of three tails.** Each toss has a one-half chance of tails, and the tosses are independent. Multiply to get (1/2)³ = 1/8.\
   `(1/2)³ = 1/8`
3. **Subtract from certainty.** The chance of at least one head is 1 − 1/8 = 7/8.\
   `1 − 1/8 = 7/8`

**Answer:** 7/8.

### Two draws without replacement

**Question.** A bag has 5 red and 3 blue balls. Find the chance of drawing two red without replacement.

**Picture it.** The first red ball stays in your hand. When you reach into the bag again, there is one less red ball and one less ball altogether.

1. **Find the first-draw chance.** There are five red balls among eight total, so the first draw is red with probability 5/8.\
   `P(first red) = 5/8`
2. **Update after a red is removed.** Because the first ball stays out, four red balls remain among seven total. The chance of another red on this branch is 4/7.\
   `P(second red given first red) = 4/7`
3. **Multiply along the branch.** Both conditions must hold in order. Multiply 5/8 × 4/7 = 20/56 = 5/14.\
   `5/8 × 4/7 = 20/56 = 5/14`

**Answer:** 5/14.

### Overlapping events

**Question.** A number from 1 through 30 is picked uniformly. Find the probability it is a multiple of 3 or 5.

**Picture it.** Picture circling multiples of 3 in blue and multiples of 5 in red. Numbers circled in both colours should still be counted only once.

1. **Count each group separately.** There are 30 ÷ 3 = 10 multiples of 3 and 30 ÷ 5 = 6 multiples of 5.\
   `multiples of 3: 10. Multiples of 5: 6.`
2. **Correct the overlap.** Numbers divisible by both are multiples of 15. The two cases, 15 and 30, appear in both counts, so subtract them once.\
   `multiples of 15: 2`\
   `10 + 6 − 2 = 14`
3. **Divide by all possible draws.** There are 10 + 6 − 2 = 14 qualifying numbers out of 30 equally likely choices. This reduces to 7/15.\
   `14/30 = 7/15`

**Answer:** 7/15.

### Exactly one red without replacement

**Question.** A box has 5 red, 4 blue and 3 green tokens. Two are drawn without replacement. What is the probability that exactly one is red?

**Picture it.** Put blue and green in one pile called not red. A pair that works has one token from the red pile and one from the other pile.

1. **Count the pool.** Group the blue and green tokens together because either colour counts as non-red.\
   `5 + 4 + 3 = 12 tokens`\
   `4 + 3 = 7 non-red tokens`
2. **Count total pairs.** The draws are uniformly random. Each unordered pair occurs in two possible drawing orders, so divide the number of ordered pairs by 2.\
   `12 × 11 ÷ 2 = 66 pairs`
3. **Count qualifying pairs.** Choose one of the five red tokens and one of the seven non-red tokens. Each such choice produces a different pair.\
   `5 × 7 = 35 pairs`
4. **Divide and check another way.** The same probability results from adding the red-first branch and the non-red-first branch.\
   `P(exactly one red) = 35/66 ≈ 0.5303`\
   `(5/12 × 7/11) + (7/12 × 5/11) = 35/66`

**Answer:** 35/66, approximately 53.03%.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Equally likely outcomes | P(E) = favourable outcomes ÷ total outcomes. |
| At least one | 1 − P(none). |
| A or B | P(A) + P(B) − P(A and B). |
| A then B | P(A) × P(B given A). |
| Exactly one of two draws in a category | Category count × other count ÷ total unordered pairs for a uniform draw without replacement. |

## Exam tips

- **Match the sampling model.** With replacement, totals reset. Without replacement, totals shrink.
- **Count every valid order once.** Red then other and other then red are separate ordered branches.
- **Sanity-check the fraction.** The numerator can never exceed the total.
