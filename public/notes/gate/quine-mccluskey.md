Quine–McCluskey sorts minterms by number of ones, combines terms with one differing position and iterates. Uncombined terms are prime implicants. A coverage chart identifies essential primes and choices needed to cover remaining minterms. Don't-care inputs can assist combining but need not be covered.

## Concepts in depth

Tabular minimisation combines binary patterns that differ in one fixed bit at compatible dash positions. Uncombined patterns are prime implicants. Build a coverage chart, select essential implicants and then solve the remaining cover.

## How to apply it

000 and 001 merge into 00–. 00– and 01– merge into 0––. A don't-care can help form a larger pattern but is not a column that must be covered. Minimum term count and minimum literal count can be different objectives.

## Worked example

Binary 010 and 011 combine to 01–, representing ¬A·B when input order is ABC.

## Common mistake

Combine terms only when their existing dash positions align and one specified position differs.

## Practice

What makes a prime implicant essential?

**Answer:** It covers a required minterm covered by no other prime implicant.
