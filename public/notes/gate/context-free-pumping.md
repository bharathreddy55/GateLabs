Context-free languages are closed under union, concatenation and star and under intersection with a regular language. They are not generally closed under intersection with each other or complement. The CFL pumping lemma decomposes a long word uvxyz, with |vxy|≤p and |vy|>0, and pumps v and y together. To refute the property, show every allowed split fails for some exponent.

## Worked example

For aᵖbᵖcᵖ, the short window vxy cannot cover all three symbol blocks. Pumping changes at least one block and leaves another unchanged, or disrupts order, so equal counts fail.

## Common mistake

The pumped parts v and y need not each be nonempty. Their combined length must be positive.

## Practice

What operation can isolate a regular pattern inside a CFL while keeping it context-free?

**Answer:** Intersection with a regular language.
