FIRST records which terminals can begin strings derived from a symbol sequence, including epsilon when nullable. FOLLOW records terminals that can immediately follow a nonterminal. LL parsers choose productions top-down with lookahead; direct left recursion breaks naive predictive parsing. LR parsers shift tokens and reduce handles bottom-up. Conflicts indicate competing choices in a parser table.

## Worked example

A grammar A→aB | bC can choose by the first token because FIRST sets are disjoint. If two alternatives begin with the same terminal, left factoring may help.

## Common mistake

A conflict can reflect the parser class or grammar, and does not always establish that the language itself is ambiguous.

## Practice

How do LR parsing actions differ?

**Answer:** Shift consumes an input token onto the stack, while reduce replaces a recognized right-hand side by its left-hand nonterminal.
