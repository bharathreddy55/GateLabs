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

1. Use 36 ordered outcomes. The pairs are (3,6),(4,5),(5,4),(6,3).
2. (3,6) and (6,3) are distinct. Divide four by 36.

**Answer:** 1/9.

### At least one

**Question.** Three independent fair coin tosses are made. Find the chance of at least one head.

1. The complement is all tails. Its probability is (1/2)³=1/8.
2. Subtract from 1.

**Answer:** 7/8.

### Two draws without replacement

**Question.** A bag has 5 red and 3 blue balls. Find the chance of drawing two red without replacement.

1. First-red probability is 5/8. On that branch, red balls drop to 4 and total to 7.
2. Multiply 5/8 by 4/7.

**Answer:** 5/14.

### Overlapping events

**Question.** A number from 1 through 30 is picked uniformly. Find the probability it is a multiple of 3 or 5.

1. There are 10 multiples of 3 and 6 of 5. Two, 15 and 30, belong to both.
2. Union size=10+6−2=14. Divide by 30.

**Answer:** 7/15.
