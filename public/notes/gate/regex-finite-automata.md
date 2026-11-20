A regular expression builds languages through union, concatenation and Kleene star. A DFA has one transition per state and alphabet symbol; an NFA can choose among transitions and may use epsilon moves. Subset construction represents reachable NFA state sets as DFA states. Accept if at least one represented state accepts.

## Concepts in depth

Finite automata recognise regular languages. A DFA has one transition per state and symbol. An NFA accepts if any valid computation reaches an accepting state. Subset construction uses sets of NFA states as DFA states, accounting for ε-closure where needed.

## How to apply it

A language requiring an even number of 1s needs two parity states. Complement a complete DFA by flipping accepting states. Flipping accepting states in an NFA in general does not produce the complement.

## Worked example

The expression (0|1)*01 describes binary strings ending in 01. The DFA only needs to remember the longest suffix that is also a prefix of 01.

## Common mistake

A Kleene star includes zero repetitions, so it always allows the empty string.

## Practice

What language does 1(01)* describe?

**Answer:** A leading 1 followed by zero or more copies of 01.
