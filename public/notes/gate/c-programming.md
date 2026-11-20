Trace declared types, promotions, scope, storage lifetime, pointer arithmetic and evaluation guarantees. C uses pass-by-value, including for pointer arguments. Arrays in many expressions decay to pointers, with exceptions such as sizeof on an actual array. Pointer arithmetic advances by elements and must remain within an array or one past. Do not assign a deterministic result to undefined behaviour.

## Concepts in depth

Trace declarations, promotions, array bounds, pointer types and storage duration before interpreting an output question. Arrays usually decay to a pointer in expressions, with exceptions such as sizeof on an array object. C passes arguments by value, including pointer values.

## How to apply it

A function taking an int pointer can update the pointed-to int but reassigning the local pointer does not update the caller's pointer. Avoid predicting a fixed output from signed overflow, out-of-bounds access or unsequenced changes to the same scalar.

## Worked example

For int a[4], *(a+2) names a[2]. Changing a through a received pointer can affect the caller's elements even though the pointer argument itself was copied.

## Common mistake

A returned pointer to a local automatic object becomes invalid when that object's lifetime ends.

## Practice

What does sizeof a / sizeof a[0] yield where a is declared int a[4]?

**Answer:** 4, because a is an array in that scope and sizeof gives its full size.
