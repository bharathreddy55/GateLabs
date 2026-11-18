Tuple relational calculus specifies the condition a result tuple must satisfy. Tuple variables range over relations or domains as defined. Use existential quantifiers for a matching tuple and negated existentials for absence. Safe expressions restrict output to the active domain and yield finite, domain-independent results under ordinary relational assumptions.

## Worked example

Find customers with no order by selecting customer tuples c for which there is no order tuple o with o.customer_id=c.id.

## Common mistake

Avoid free variables that range over arbitrary values. Bind variables and restrict output through relation membership.

## Practice

How can a universal condition be rewritten using existential logic?

**Answer:** There exists no counterexample satisfying the premise while failing the target property.
