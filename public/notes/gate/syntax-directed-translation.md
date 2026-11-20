Attribute grammars associate properties and semantic rules with productions. Synthesized attributes depend on children, while inherited attributes can depend on context such as parent and appropriate siblings. Evaluate attributes in a dependency-respecting order. Translation schemes can place semantic actions within productions.

## Concepts in depth

Syntax-directed definitions attach attributes to grammar symbols. Synthesised attributes flow upwards, while inherited attributes can obtain context from parents or siblings. Evaluation order must respect dependency edges. Annotate a specific parse tree to see whether an attribute depends on its parent, siblings or children.

## How to apply it

A node's expression value is synthesised from its children. Type information carried from a declaration to an identifier list can be inherited. A cycle in the dependencies prevents a valid topological evaluation order.

## Worked example

For E→E₁+T, set E.val=E₁.val+T.val. Leaf tokens supply numeric values, so the expression result is synthesized upward.

## Common mistake

An inherited attribute should not be used before it is available in a particular evaluation order.

## Practice

What kind of attribute can pass a declaration type down to an identifier list?

**Answer:** An inherited attribute, because the information comes from the surrounding declaration.
