In a list of N people with distinct ranks, a person at rank r from the top is N−r+1 from the bottom. Add the two ranks and subtract one to find the total. For positions strictly between two top ranks, subtract the smaller from the larger and then subtract one.

## Concepts in depth

For n people, the same person's left and right ranks add to n+1. The number between two known positions is their rank difference less one. Recheck whose position is being reported after swaps or insertions.

## How to apply it

If R is 9th from the left and 14th from the right, n=22. If S is three places to R's right, S is 12th from the left and 11th from the right. Additional people to the left do not change R's right rank.

## Worked example

Ria is 7th from the top and 12th from the bottom. The group has 7+12−1=18 people.

## Common mistake

The person is counted in both stated ranks, so subtract one when finding the total.

## Practice

How many people lie strictly between ranks 5 and 13?

**Answer:** Seven, because 13−5−1=7.
