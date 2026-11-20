Dynamic programming stores solutions to recurring states. Write a state definition, transition, base cases and evaluation order. Correctness usually follows by induction over dependencies. For trace recovery store decisions or reconstruct from table values. Time is often number of states times work per state.

## Concepts in depth

Define each state in words before writing the recurrence. Identify what information is sufficient for future decisions and how to avoid counting the same case twice. Evaluate dependencies with memoisation or a safe bottom-up order.

## How to apply it

In 0/1 knapsack, a one-dimensional capacity array is updated from high capacity to low for each item, avoiding repeated use. A low-to-high update can use newly changed states and effectively allow the same positive-weight item again.

## Worked example

For 0/1 knapsack, best(i,w) compares skipping item i with taking its value plus best(i−1,w−weight[i]) if it fits. Both choices refer to the shorter prefix.

## Common mistake

In a one-dimensional 0/1 knapsack implementation, updating capacities upward can allow the same item to be used more than once. Descending iteration protects previous-prefix states.

## Practice

When is memoization useful?

**Answer:** When different recursive branches revisit the same states and the cached result is valid for identical state parameters.
