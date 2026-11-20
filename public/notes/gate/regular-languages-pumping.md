Regular languages are closed under union, intersection, complement, concatenation and star. For a regular language a pumping length p exists such that every word of length at least p has a decomposition xyz with |xy|≤p, |y|>0 and xyⁱz in the language for all i≥0. To refute regularity, choose a word and defeat every allowed split.

## Concepts in depth

The pumping lemma gives a necessary condition for regularity. For a pumping length p choose a word of length at least p. A valid split uvw has nonempty v within the first p positions and must stay in the language for every pump count.

## How to apply it

For aⁿbⁿ choose aᵖbᵖ. Every allowed middle piece lies in the initial a-block. Pumping it changes the a-count alone. Showing some well-chosen split fails is insufficient. Every allowed split must be addressed.

## Worked example

For {0ⁿ1ⁿ}, choose 0ᵖ1ᵖ. All allowed y contain only zeros. Pump down i=0 to reduce zeros and destroy equality.

## Common mistake

A decomposition that pumps one long word does not prove regularity. Build a finite automaton or use closure to prove regularity.

## Practice

Why might complement require completing a DFA first?

**Answer:** Each input must have a well-defined run before swapping accepting and rejecting states.
