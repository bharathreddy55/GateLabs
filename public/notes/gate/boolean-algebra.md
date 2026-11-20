Boolean variables take 0 or 1. Use identities including idempotence, complements, absorption and De Morgan's laws. Express a target as sum of products or product of sums. A minterm fixes every variable for an input where the output is one.

## Concepts in depth

Boolean + means OR, multiplication means AND, and an overbar or prime means NOT. Absorption X+XY=X removes redundant terms. De Morgan interchanges AND/OR under negation. Compare canonical SOP and POS by which outputs they encode.

## How to apply it

X'Y+XY factors to Y(X'+X)=Y. A minterm uses all variables and evaluates to one at one assignment. A maxterm evaluates to zero at one assignment. A simplified expression need not remain canonical.

## Worked example

Simplify AB + A¬B + AB C. The last term is absorbed by AB. Factor A(B+¬B)=A.

## Common mistake

Boolean plus denotes OR, so A+A=A rather than 2A.

## Practice

Simplify A + AB.

**Answer:** A, by absorption.
