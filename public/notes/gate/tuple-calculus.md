Tuple relational calculus specifies the condition a result tuple must satisfy. Tuple variables range over relations or domains as defined. Use existential quantifiers for a matching tuple and negated existentials for absence. Safe expressions restrict output to the active domain and yield finite, domain-independent results under ordinary relational assumptions.

## Concepts in depth

Tuple relational calculus describes what results satisfy a predicate. Free variables appear in the result expression and bound variables are quantified. Safety or domain independence prevents dependence on arbitrarily many outside values.

## How to apply it

To express “students who passed every required course,” rule out an existing required course for which no matching pass tuple exists. Quantify over relation memberships so the query remains tied to the data.

## Worked example

Find customers with no order by selecting customer tuples c for which there is no order tuple o with o.customer_id=c.id.

## Common mistake

Avoid free variables that range over arbitrary values. Bind variables and restrict output through relation membership.

## Practice

How can a universal condition be rewritten using existential logic?

**Answer:** There exists no counterexample satisfying the premise while failing the target property.
