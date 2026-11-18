Attribute grammars associate properties and semantic rules with productions. Synthesized attributes depend on children, while inherited attributes can depend on context such as parent and appropriate siblings. Evaluate attributes in a dependency-respecting order. Translation schemes can place semantic actions within productions.

## Worked example

For E→E₁+T, set E.val=E₁.val+T.val. Leaf tokens supply numeric values, so the expression result is synthesized upward.

## Common mistake

An inherited attribute should not be used before it is available in a particular evaluation order.

## Practice

What kind of attribute can pass a declaration type down to an identifier list?

**Answer:** An inherited attribute, because the information comes from the surrounding declaration.
