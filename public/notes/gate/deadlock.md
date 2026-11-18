Deadlock needs mutual exclusion, hold-and-wait, no preemption and circular wait in the classical resource model. Prevention disables at least one necessary condition. Avoidance admits requests that keep a safe sequence under a model such as Banker's algorithm. Detection finds deadlock after it occurs. A wait-for cycle implies deadlock under common single-instance assumptions.

## Worked example

Thread A holds L1 and waits for L2 held by B, while B waits for L1. Requiring all threads to acquire L1 before L2 prevents that ordering cycle.

## Common mistake

An unsafe state means there is no guaranteed safe sequence under stated maximum claims. It does not establish an existing deadlock.

## Practice

Which condition is removed by a global resource ordering?

**Answer:** Circular wait, because a chain of strict increases in lock order cannot return to its starting resource.
