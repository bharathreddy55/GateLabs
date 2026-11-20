Activation records can contain parameters, return address, saved state, locals and temporaries. Stack allocation suits calls with nested lifetimes, including recursive activations. Dynamic links identify callers. Static links or equivalent mechanisms serve lexically nested scopes. Objects outliving a call may need a different lifetime strategy, such as heap allocation.

## Concepts in depth

An activation record may store parameters, locals, saved registers and return address. A dynamic link follows the caller chain. A static link follows lexical nesting to access nonlocals where that language model applies.

## How to apply it

A recursive routine creates multiple frames even if each invocation has the same code and local variable names. Locals that outlive a call may need other storage. Distinguish lifetime from scope.

## Worked example

Two recursive calls to the same function keep different parameter values in distinct frames. Returning from the inner call restores the outer call's execution context.

## Common mistake

Lexical parent and runtime caller can differ. Use the static relationship for lexical scope.

## Practice

Why can a closure require heap-managed data?

**Answer:** It may reference captured variables after the creating function has returned.
