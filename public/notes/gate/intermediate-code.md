Three-address code decomposes expressions into simple operations with temporaries. Represent branches with labels and conditional jumps. Basic blocks have one entry and no internal branch to a different instruction in the block. The control-flow graph shows possible transitions. Short-circuit Boolean translation can avoid evaluating the right operand when the left already fixes the answer.

## Worked example

Translate a=b+c*d as t1=c*d, t2=b+t1, a=t2. The order captures precedence explicitly.

## Common mistake

A temporary represents a value at a point. Reusing its name without analysis can overwrite a still-needed value.

## Practice

Why is intermediate representation useful?

**Answer:** It gives analysis and code generation a uniform structure separate from source and target syntax.
