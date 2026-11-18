Dynamic programming stores solutions to recurring states. Write a state definition, transition, base cases and evaluation order. Correctness usually follows by induction over dependencies. For trace recovery store decisions or reconstruct from table values. Time is often number of states times work per state.

## Worked example

For 0/1 knapsack, best(i,w) compares skipping item i with taking its value plus best(i−1,w−weight[i]) if it fits. Both choices refer to the shorter prefix.

## Common mistake

In a one-dimensional 0/1 knapsack implementation, updating capacities upward can allow the same item to be used more than once. Descending iteration protects previous-prefix states.

## Practice

When is memoization useful?

**Answer:** When different recursive branches revisit the same states and the cached result is valid for identical state parameters.
