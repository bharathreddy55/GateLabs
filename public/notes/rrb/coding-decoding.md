## What it means

Coding and decoding uses a stated or inferred mapping between an input and an output. A rule can shift individual letters, reverse order, substitute symbols, depend on positions, or give the same token to a word across phrases. Separate the method that changes order from the method that changes values.

## Formulas and rules

- **Shift direction:** Encode by adding the specified shift and decode by subtracting it on a wrapped alphabet.
- **Position-dependent rules:** Mark odd/even or vowel/consonant conditions on the original positions before applying transformations.
- **Order of operations:** “Reverse then shift” and “shift then reverse” can differ when the shift depends on position. Apply the exact sequence.
- **Common-token method:** If each word has its own token and code order is unspecified, the intersection of two phrases with one common word reveals that word’s token.

## How to study it for Station Master

- Align examples one character at a time. Test any inferred rule on all given pairs before decoding the asked word.
- Practise conditional codes and unordered token phrases. Track whether a “second position” is counted before or after a reversing step.

## Question models and worked examples

### Decode a uniform shift

**Question.** Each letter is shifted forward by two, wrapping after Z. Decode TCKN.

1. Move each letter back two places: T→R, C→A, K→I, N→L.
2. Apply the original forward shift to confirm RAIL returns TCKN.

**Answer:** RAIL.

### Reverse then alternate

**Question.** Reverse RAIL, then shift odd positions forward one and even positions back one. Give the code.

1. Reversing yields L,I,A,R at positions 1–4.
2. Apply L→M, I→H, A→B and R→Q.

**Answer:** MHBQ.

### Common token across phrases

**Question.** “blue signal ready” becomes “pa ku ne” and “signal open” becomes “za ku”; order is unspecified and each word has a distinct token. Find the code for signal.

1. The only shared word is signal.
2. The only shared token is ku. Unordered positions within either phrase do not matter.

**Answer:** ku.

### Conditional word code

**Question.** Shift vowels one letter forward and consonants one letter back, with wrap. Encode TRAIN.

1. Classify the original letters: T and R consonants, A and I vowels, N consonant.
2. T→S, R→Q, A→B, I→J, N→M.

**Answer:** SQBJM.
