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

1. **Reverse the encoding shift.** Each original letter moved two places forward to make the code. To decode, move each coded letter two places backward, wrapping before A if needed.
2. **Decode each letter in sequence.** T→R, C→A, K→I and N→L. Keep the four letters in the same order.
3. **Verify by re-encoding.** R→T, A→C, I→K and L→N takes RAIL back to TCKN.

**Answer:** RAIL.

### Reverse then alternate

**Question.** Reverse RAIL, then shift odd positions forward one and even positions back one. Give the code.

1. **Follow the operations in order.** Reverse RAIL first, giving LIAR. Number the positions from 1 at the left of the reversed word.
2. **Shift the odd positions forward.** Position 1 changes from L to M, and position 3 changes from A to B.
3. **Shift the even positions backward and assemble.** Position 2 changes from I to H, and position 4 changes from R to Q. Reading positions 1 through 4 gives MHBQ.

**Answer:** MHBQ.

### Common token across phrases

**Question.** “blue signal ready” becomes “pa ku ne” and “signal open” becomes “za ku”; order is unspecified and each word has a distinct token. Find the code for signal.

1. **Find the repeated word.** The two phrases share just one word, “signal.” Because the code may rearrange the tokens, compare which tokens repeat across the phrases.
2. **Intersect the token sets.** The first code contains pa, ku and ne. The second contains za and ku. Only ku appears in both.
3. **Match the shared word to the shared token.** Each word has a distinct token, so the only possible code for “signal” is ku.

**Answer:** ku.

### Conditional word code

**Question.** Shift vowels one letter forward and consonants one letter back, with wrap. Encode TRAIN.

1. **Classify before shifting.** In TRAIN, A and I are vowels. T, R and N are consonants. Apply the rule to each original letter.
2. **Apply the two directions.** Move A→B and I→J forward. Move T→S, R→Q and N→M backward.
3. **Read in word order.** Keeping the positions of TRAIN gives S, Q, B, J and M. The final code is SQBJM.

**Answer:** SQBJM.
