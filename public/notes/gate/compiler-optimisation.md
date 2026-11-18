Constant propagation replaces a value if all relevant incoming paths establish the same constant. Live-variable analysis propagates backward and asks whether a value may be read before redefinition. Common subexpression elimination reuses a prior result if operands and relevant memory have not changed. Meet operators combine flow facts at joins; the fixed point reflects repeated propagation through loops.

## Worked example

If both branches assign x=5, subsequent y=x+2 can fold to 7. If one branch sets x=6, x is not established as one constant at the merge.

## Common mistake

Avoid deleting a computation with externally visible side effects merely because its result is unused.

## Practice

Is x live just before 'x=3' if the old x will never be read on any path from there?

**Answer:** No. The assignment defines a new value and kills the old value's liveness.
