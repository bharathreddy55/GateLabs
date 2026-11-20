Divide an input into smaller pieces, solve each recursively, then combine. Recurrences such as T(n)=aT(n/b)+f(n) capture the balance of recursion and combine work. Use a recursion tree, substitution or a theorem when its conditions apply.

## Concepts in depth

Write the recurrence T(n)=aT(n/b)+f(n) where the split assumptions hold. Compare the combined work per level to leaf work. Master theorem cases depend on relative growth and on regularity conditions for the leaf-versus-root regimes.

## How to apply it

Mergesort has T(n)=2T(n/2)+Θ(n). Each of Θ(log n) levels costs Θ(n), giving Θ(n log n). Unbalanced splits may require a recursion-tree or substitution analysis instead. For T(n)=T(n/2)+Θ(1), one subproblem survives at each level, so the total work is Θ(log n).

## Worked example

Mergesort splits a list in half and merges in linear time. Work per level is Θ(n), and there are Θ(log n) levels, so total time is Θ(n log n).

## Common mistake

Do not apply a master theorem mechanically to recurrences whose subproblem sizes or work do not meet its form.

## Practice

Solve T(n)=2T(n/2)+constant with constant base cost.

**Answer:** Θ(n), since level widths double and the final levels dominate.
