Context-free languages are closed under union, concatenation and star and under intersection with a regular language. They are not generally closed under intersection with each other or complement. The CFL pumping lemma decomposes a long word uvxyz, with |vxy|≤p and |vy|>0, and pumps v and y together. To refute the property, show every allowed split fails for some exponent.

## Concepts in depth

The CFL pumping condition splits a long string into uvxyz. The middle span vxy is bounded in length, at least one of v and y is nonempty, and v and y pump together. The lemma supplies a necessary condition.

## How to apply it

For aᵖbᵖcᵖ, a middle span of length ≤p cannot cover all three blocks, so pumping cannot preserve all three counts. Consider boundary-crossing splits as well as splits entirely inside one block.

## Worked example

For aᵖbᵖcᵖ, the short window vxy cannot cover all three symbol blocks. Pumping changes at least one block and leaves another unchanged, or disrupts order, so equal counts fail.

## Common mistake

The pumped parts v and y need not each be nonempty. Their combined length must be positive.

## Practice

What operation can isolate a regular pattern inside a CFL while keeping it context-free?

**Answer:** Intersection with a regular language.
