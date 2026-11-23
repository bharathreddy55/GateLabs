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

1. Positions 13,16,20,25 show steps +3,+4,+5.
2. Add +6 to reach position 31. Wrap once by subtracting 26.

**Answer:** E.

### Parallel columns

**Question.** Complete BC, EF, HI, KL, ?

1. First letters B,E,H,K rise by 3; next is N.
2. Second letters C,F,I,L also rise by 3; next is O.

**Answer:** NO.

### Interleaved opposite shifts

**Question.** Complete A, Z, C, X, E, V, ?

1. Odd positions are A,C,E, moving forward by 2. Even positions are Z,X,V, moving back by 2.
2. The missing position is seventh, so use the forward track.

**Answer:** G.

### Index a repeated block

**Question.** The block AABC repeats. What is the 38th letter?

1. Divide 38 by 4. Nine full blocks use 36 positions.
2. Position 38 is the second entry of the next block.

**Answer:** A.
