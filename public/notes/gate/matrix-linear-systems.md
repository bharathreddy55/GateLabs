For Ax=b, Gaussian elimination reduces the augmented matrix using elementary row operations. Compare rank(A), rank([A|b]) and the number of variables to classify solutions. Row swaps flip determinant sign, scaling a row scales the determinant and adding a multiple of one row to another preserves it. LU decomposes a matrix into triangular factors, sometimes with a permutation for pivoting. Solve triangular systems by forward and backward substitution.

## Concepts in depth

For Ax=b, consistency is equivalent to equal ranks of A and [A b]. There is a unique solution if the system is consistent and rank(A) equals the number of unknowns. For a square matrix, nonzero determinant gives invertibility. LU decomposition supports repeated solves with the same coefficient matrix.

## How to apply it

If a two-variable reduction produces 0=5, the system is inconsistent. If the second row becomes 0=0 and the first has a pivot, one variable is free. Row swaps change determinant sign. Adding a multiple of another row does not.

## Worked example

For x+y=3 and 2x+2y=6, the rows are dependent and compatible, so there are infinitely many solutions. Changing the second right-hand side to 7 makes the system inconsistent.

## Common mistake

A zero determinant of a square coefficient matrix rules out a unique solution but can permit infinitely many or no solutions.

## Practice

If a 3×3 system is consistent and coefficient rank is two, how many free variables are there?

**Answer:** One, because the nullity is three minus two.
