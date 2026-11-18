A recursive function needs terminating base cases and calls on strictly smaller or otherwise progressing states. Each active call has its own state. A recurrence describes cost while the deepest active path governs stack space. Tail calls may still use stack frames absent an optimization guarantee.

## Worked example

factorial(4) calls factorial(3), factorial(2), factorial(1) and factorial(0) under the base case n=0, then multiplies to 24 on return.

## Common mistake

A recursion tree's total calls can greatly exceed its maximum depth.

## Practice

What is the maximum depth order of recursive binary search on n elements?

**Answer:** O(log n), since each step halves the remaining interval.
