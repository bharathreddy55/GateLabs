A greedy algorithm commits to a locally preferred available choice. A correctness proof must justify that the choice can extend to an optimum, often through an exchange argument or cut property. An example or successful simulation is insufficient on its own.

## Concepts in depth

A greedy strategy commits to a current choice. Optimal substructure alone does not justify it. Proof usually requires a greedy-choice property such as an exchange argument. Sorting or a priority structure often accounts for its cost.

## How to apply it

Choosing the earliest finishing interval maximises the number of compatible intervals under the standard unweighted model. Choosing earliest start can block many short intervals. Weighted objectives can need dynamic programming even when the unweighted version is greedy.

## Worked example

Interval scheduling selects the interval that finishes earliest among those compatible with the choices so far. Replacing an optimal first interval by an earlier-finishing one leaves at least as much room for the rest.

## Common mistake

Choosing minimum duration is a different rule from earliest finish and may block more intervals.

## Practice

Why can greedy coin change fail?

**Answer:** With coins 1, 3 and 4 for total 6, largest-first gives 4+1+1. Two 3s are better.
