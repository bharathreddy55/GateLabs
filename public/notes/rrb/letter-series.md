## What it means

A letter series uses alphabet positions, repeated groups or several interleaved rules. Letter groups can have a different shift in each column. Removing gaps by writing the positions makes step size and direction visible. If a rule wraps past Z, continue at A only when the examples support wrapping.

## Formulas and rules

- **Position scale:** A=1, …, Z=26. Reverse-alphabet partners have positions summing to 27.
- **Wrap:** On a zero-based scale A=0 through Z=25, shift by k using (position+k) modulo 26.
- **Columns and tracks:** For groups of fixed length, compare each aligned column. For alternating patterns, split odd and even positions.
- **Repeated block:** For a periodic pattern of length p, locate position n by (n−1) modulo p as a zero-based index.

## How to study it for Station Master

- Convert letters to numbers only far enough to expose the rule. Memorise a few alphabet anchors and practise rotating forward and backward across the ends.
- Run separate drills for one-letter sequences, multi-column groups and repeated patterns. Cross-check a candidate against the last two transitions.

## Question models and worked examples

### Increasing shifts with wrap

**Question.** Find the next letter: M, P, T, Y, ?

1. **Convert letters into positions.** With A=1 through Z=26, the sequence M, P, T, Y has positions 13, 16, 20 and 25.
2. **Find the growing shifts.** The shifts are +3, +4 and +5, so the next shift is +6. From Y that gives 25+6=31.
3. **Wrap back after Z.** Subtract 26 from 31 to get position 5. Position 5 is E.

**Answer:** E.

### Parallel columns

**Question.** Complete BC, EF, HI, KL, ?

1. **Read the two columns separately.** The left letters B, E, H, K have positions 2, 5, 8, 11. The right letters C, F, I, L have positions 3, 6, 9, 12.
2. **Advance each by three.** The next left letter is at position 14, N. The next right letter is at position 15, O.
3. **Recombine and check.** Put the left letter before the right to get NO. The two letters remain adjacent as in every given pair.

**Answer:** NO.

### Interleaved opposite shifts

**Question.** Complete A, Z, C, X, E, V, ?

1. **Extract the alternating tracks.** Odd positions show A, C, E. Even positions show Z, X, V.
2. **Identify the directions.** The odd track advances two letters at a time, while the even track moves two letters backward.
3. **Fill the correct position.** The blank is position 7 on the odd track. Move two letters forward from E to reach G.

**Answer:** G.

### Index a repeated block

**Question.** The block AABC repeats. What is the 38th letter?

1. **Count complete blocks.** AABC has four letters. Divide 38 by 4 to get nine complete blocks and a remainder of two.
2. **Locate the letter after those blocks.** Nine blocks use 36 positions, so position 38 is the second position of the next block.
3. **Read the indexed letter.** The second letter of AABC is A. Both of its first two positions are A, so check the calculation even though position 1 happens to yield the same letter.

**Answer:** A.
