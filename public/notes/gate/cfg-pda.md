A context-free production replaces one nonterminal. A parse tree captures a derivation structure; distinct parse trees for one word witness grammar ambiguity. A PDA augments finite control with a stack. It can push a symbol for each item in one phase and pop for a matching item in another. Nondeterministic PDAs recognize the context-free languages.

## Concepts in depth

A context-free grammar replaces one nonterminal at a time. A pushdown automaton adds unbounded LIFO memory. Distinguish a derivation sequence from its parse tree. A grammar is ambiguous if some string has two distinct parse trees.

## How to apply it

S→aSb or ε generates aⁿbⁿ, matched by pushing for a and popping for b. A deterministic CFL is a CFL, but some CFLs require nondeterminism. Do not infer language ambiguity from one awkward parsing strategy alone.

## Worked example

S→0S1 | ε generates {0ⁿ1ⁿ}. For 0011, apply the recursive production twice and terminate with ε. A PDA pushes for zeros, then pops for ones.

## Common mistake

Multiple expansion orders can belong to the same parse tree. Ambiguity requires different trees or different leftmost derivations.

## Practice

Can a stack help recognize balanced parentheses?

**Answer:** Yes. Push for each open parenthesis and pop for each close, rejecting an unmatched close or leftover opens.
