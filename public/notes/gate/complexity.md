Worst-case time maximizes operation count among inputs of the same size. O is an asymptotic upper bound, Ω a lower bound and Θ a tight bound. Analyze how often inner loops run; count recursion frames separately for auxiliary space. Ignore constants only after identifying the meaningful growth expression.

## Concepts in depth

O is an upper bound, Ω a lower bound and Θ a tight asymptotic bound. Keep worst-case, expected and amortised claims separate. Nested loops require summing their per-iteration work if inner bounds depend on outer indexes.

## How to apply it

An inner loop running i times after outer iteration i totals 1+…+n=Θ(n²). A loop which halves its index until zero takes Θ(log n). Include auxiliary recursion stack when asked for extra space.

## Worked example

For i=1 to n, an inner loop running i times contributes 1+2+…+n=n(n+1)/2=Θ(n²).

## Common mistake

Nested loops may not be quadratic if the inner loop runs geometrically or its total work is shared.

## Practice

What is the order of repeatedly doubling i from 1 while i≤n?

**Answer:** Θ(log n), because powers of two reach n in logarithmically many steps.
