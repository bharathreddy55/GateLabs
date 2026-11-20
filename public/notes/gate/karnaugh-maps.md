Place minterms in Gray-code order so adjacent cells differ in one bit. Cover ones with rectangles whose sizes are powers of two. Edges wrap. Group overlap is allowed. Include don't-care cells only if they simplify a group, and identify literals constant across that group.

## Concepts in depth

For SOP, group adjacent ones in power-of-two rectangles, using don't-cares only where useful. Edges opposite each other touch in Gray-code order. The group's changing variables disappear. A prime implicant is essential if it alone covers a required cell.

## How to apply it

A group of four cells in a four-variable map eliminates two variables. Diagonal touching is not adjacency. For POS, group zeros and choose the literals of the clause that is false on those assignments.

## Worked example

The four cells with A=1 while B and C vary become one term A.

## Common mistake

Diagonal cells alone are not adjacent. A 3-cell region cannot become a single implicant.

## Practice

What happens to a variable that changes within a valid group?

**Answer:** It is eliminated from the resulting product term.
