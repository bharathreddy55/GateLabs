Predicates describe properties and relations; quantifiers range over a specified domain. Quantifier order matters. The negation of ∀x P(x) is ∃x ¬P(x), and vice versa. A free variable remains unbound. Different bound variables can represent different witnesses.

## Concepts in depth

Universal quantification applies to every domain member. Existential quantification needs a witness. Swapping ∀ and ∃ can change whether one witness must work for all or may depend on the outer variable. Negation swaps the quantifier and negates its scope.

## How to apply it

∀x∃y(y>x) is true on integers. ∃y∀x(y>x) is false there because no fixed integer exceeds them all. Negating ∀x(P(x)→Q(x)) gives an x satisfying P and failing Q.

## Worked example

∀x∃y (y>x) is true over integers. ∃y∀x (y>x) is false there, since no integer exceeds every integer.

## Common mistake

When pushing a negation through several quantifiers, flip each one and keep the original order.

## Practice

Negate ∃x∀y R(x,y).

**Answer:** ∀x∃y ¬R(x,y).
