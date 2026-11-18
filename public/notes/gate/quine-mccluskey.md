Quine–McCluskey sorts minterms by number of ones, combines terms with one differing position and iterates. Uncombined terms are prime implicants. A coverage chart identifies essential primes and choices needed to cover remaining minterms. Don't-care inputs can assist combining but need not be covered.

## Worked example

Binary 010 and 011 combine to 01–, representing ¬A·B when input order is ABC.

## Common mistake

Combine terms only when their existing dash positions align and one specified position differs.

## Practice

What makes a prime implicant essential?

**Answer:** It covers a required minterm covered by no other prime implicant.
