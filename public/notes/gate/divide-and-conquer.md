Divide an input into smaller pieces, solve each recursively, then combine. Recurrences such as T(n)=aT(n/b)+f(n) capture the balance of recursion and combine work. Use a recursion tree, substitution or a theorem when its conditions apply.

## Worked example

Mergesort splits a list in half and merges in linear time. Work per level is Θ(n), and there are Θ(log n) levels, so total time is Θ(n log n).

## Common mistake

Do not apply a master theorem mechanically to recurrences whose subproblem sizes or work do not meet its form.

## Practice

Solve T(n)=2T(n/2)+constant with constant base cost.

**Answer:** Θ(n), since level widths double and the final levels dominate.
