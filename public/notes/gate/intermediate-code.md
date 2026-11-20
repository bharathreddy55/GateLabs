Three-address code decomposes expressions into simple operations with temporaries. Represent branches with labels and conditional jumps. Basic blocks have one entry and no internal branch to a different instruction in the block. The control-flow graph shows possible transitions. Short-circuit Boolean translation can avoid evaluating the right operand when the left already fixes the answer.

## Concepts in depth

Three-address code uses small operations with temporaries and jumps. Basic blocks are straight-line sequences with entry at the start and exit at the end. The control-flow graph represents possible transfers between blocks.

## How to apply it

For (a+b)*(c−d), first set t1=a+b and t2=c−d, then t3=t1*t2. In short-circuit Boolean evaluation a branch may skip the right operand, so preserve its possible side effects.

## Worked example

Translate a=b+c*d as t1=c*d, t2=b+t1, a=t2. The order captures precedence explicitly.

## Common mistake

A temporary represents a value at a point. Reusing its name without analysis can overwrite a still-needed value.

## Practice

Why is intermediate representation useful?

**Answer:** It gives analysis and code generation a uniform structure separate from source and target syntax.
