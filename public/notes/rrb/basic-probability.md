## What it means

Probability measures how likely an event is, from 0 to 1. A sample space lists possible outcomes; an event is a subset of those outcomes. Counting favourable outcomes gives a probability only when the listed outcomes are equally likely. Draws without replacement change the probabilities of later draws.

## Formulas and rules

- **Equally likely outcomes:** P(A)=favourable/total. Count ordered outcomes when the sequence of draws matters.
- **Complement:** P(at least one)=1−P(none). It combines all nonzero cases in one subtraction.
- **OR rule:** P(A or B)=P(A)+P(B)−P(A and B). Subtract the overlap once.
- **AND rule:** P(A and B)=P(A)×P(B given A). For independent events the second factor is P(B).

## How to study it for Station Master

- Write whether the prompt says “both”, “either”, “exactly” or “at least”. Sketch branch probabilities for sequential draws.
- Practise the same draw with and without replacement. Check whether outcomes that look like combinations are equally likely before counting them.

## Question models and worked examples

### Two dice with a fixed sum

**Question.** Two fair six-sided dice are rolled. Find P(sum = 9).

1. **Count all equally likely outcomes.** For each of six first-die values there are six second-die values. This gives 36 ordered results.
2. **List the pairs with sum 9.** They are (3,6), (4,5), (5,4) and (6,3). For example, (3,6) counts separately from (6,3) because the dice are distinguished.
3. **Divide favourable by total.** Four ordered outcomes meet the condition, giving 4/36 = 1/9.

**Answer:** 1/9.

### At least one

**Question.** Three independent fair coin tosses are made. Find the chance of at least one head.

1. **Identify the complement.** At least one head includes one, two or three heads. The single excluded outcome is three tails.
2. **Calculate the chance of three tails.** Each toss has a one-half chance of tails, and the tosses are independent. Multiply to get (1/2)³ = 1/8.
3. **Subtract from certainty.** The chance of at least one head is 1 − 1/8 = 7/8.

**Answer:** 7/8.

### Two draws without replacement

**Question.** A bag has 5 red and 3 blue balls. Find the chance of drawing two red without replacement.

1. **Find the first-draw chance.** There are five red balls among eight total, so the first draw is red with probability 5/8.
2. **Update after a red is removed.** Because the first ball stays out, four red balls remain among seven total. The chance of another red on this branch is 4/7.
3. **Multiply along the branch.** Both conditions must hold in order. Multiply 5/8 × 4/7 = 20/56 = 5/14.

**Answer:** 5/14.

### Overlapping events

**Question.** A number from 1 through 30 is picked uniformly. Find the probability it is a multiple of 3 or 5.

1. **Count each group separately.** There are 30 ÷ 3 = 10 multiples of 3 and 30 ÷ 5 = 6 multiples of 5.
2. **Correct the overlap.** Numbers divisible by both are multiples of 15. The two cases, 15 and 30, appear in both counts, so subtract them once.
3. **Divide by all possible draws.** There are 10 + 6 − 2 = 14 qualifying numbers out of 30 equally likely choices. This reduces to 7/15.

**Answer:** 7/15.
