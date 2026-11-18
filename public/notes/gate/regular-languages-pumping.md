Regular languages are closed under union, intersection, complement, concatenation and star. For a regular language a pumping length p exists such that every word of length at least p has a decomposition xyz with |xy|≤p, |y|>0 and xyⁱz in the language for all i≥0. To refute regularity, choose a word and defeat every allowed split.

## Worked example

For {0ⁿ1ⁿ}, choose 0ᵖ1ᵖ. All allowed y contain only zeros. Pump down i=0 to reduce zeros and destroy equality.

## Common mistake

A decomposition that pumps one long word does not prove regularity. Build a finite automaton or use closure to prove regularity.

## Practice

Why might complement require completing a DFA first?

**Answer:** Each input must have a well-defined run before swapping accepting and rejecting states.
