Worst-case time maximizes operation count among inputs of the same size. O is an asymptotic upper bound, Ω a lower bound and Θ a tight bound. Analyze how often inner loops run; count recursion frames separately for auxiliary space. Ignore constants only after identifying the meaningful growth expression.

## Worked example

For i=1 to n, an inner loop running i times contributes 1+2+…+n=n(n+1)/2=Θ(n²).

## Common mistake

Nested loops may not be quadratic if the inner loop runs geometrically or its total work is shared.

## Practice

What is the order of repeatedly doubling i from 1 while i≤n?

**Answer:** Θ(log n), because powers of two reach n in logarithmically many steps.
