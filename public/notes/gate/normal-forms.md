X→Y means agreeing on X forces agreement on Y. Attribute closure determines what a set can derive. 2NF removes partial dependency of nonprime attributes on candidate keys. 3NF allows a nontrivial X→A when X is a superkey or A is prime. BCNF requires X to be a superkey. Test losslessness and dependency preservation separately when decomposing.

## Worked example

For R(A,B,C) with A→B and B→C, A is a key and B→C violates BCNF. Decompose into AB and BC. B is their common attribute and determines BC, so the binary decomposition is lossless.

## Common mistake

A lossless decomposition can still fail to preserve a dependency without recombining tables.

## Practice

What makes an attribute prime?

**Answer:** It belongs to at least one candidate key.
