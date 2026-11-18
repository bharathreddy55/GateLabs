Place minterms in Gray-code order so adjacent cells differ in one bit. Cover ones with rectangles whose sizes are powers of two. Edges wrap. Group overlap is allowed. Include don't-care cells only if they simplify a group, and identify literals constant across that group.

## Worked example

The four cells with A=1 while B and C vary become one term A.

## Common mistake

Diagonal cells alone are not adjacent. A 3-cell region cannot become a single implicant.

## Practice

What happens to a variable that changes within a valid group?

**Answer:** It is eliminated from the resulting product term.
