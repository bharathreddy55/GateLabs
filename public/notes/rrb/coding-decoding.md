## Basics first

- **Encode and decode.** Encoding applies the given transformation. Decoding reverses it. If the encoder moves +2, a decoder moves −2.
- **Order and shift.** Reordering positions and shifting letters can be separate operations. Reverse steps in reverse order to undo a multi-step code.
- **Conditional codes.** The rule can depend on a letter type or a position. Check whether it says “original letter,” “odd position after reversal” or another precise condition.
- **Word tokens.** In phrase coding, a distinct token represents a word. If word order is unspecified, compare the sets of words and tokens for overlaps.

## Methods and when to use them

### Method A · Draw a before-and-after row

Write the plain letters above the code. Test standard shifts and wrapping before trying a complex rule. If the prompt asks to decode, re-encode the candidate to check it.

**When to use it.** Use this in **Coding and Decoding / Single-letter Shifts** questions when an example gives the original and coded form of a word and individual letters may move by a pattern.

**Key rule.** Compare corresponding plain and coded letters, including any wraparound. Inverse shifts decode a uniform shift.

#### Type 1 · Decode a uniform shift

**Question.** Each letter is shifted forward by two, wrapping after Z. Decode TCKN.

**Picture it.** Pretend the code walks each letter two steps forward. To read it, make each letter take two steps back and keep the same order.

1. **Reverse the encoding shift.** Each original letter moved two places forward to make the code. To decode, move each coded letter two places backward, wrapping before A if needed.\
   `encode +2 ⇒ decode −2`
2. **Decode each letter in sequence.** T→R, C→A, K→I and N→L. Keep the four letters in the same order.\
   `T→R, C→A, K→I, N→L`
3. **Verify by re-encoding.** R→T, A→C, I→K and L→N takes RAIL back to TCKN.\
   `RAIL +2 letter by letter ⇒ TCKN`

**Answer:** RAIL.

### Method B · Carry out composite instructions in order

For “reverse then shift,” write the reversed word first. Number those positions before applying odd/even shifts. Classify vowels and consonants using the letters to which the stated rule applies.

**When to use it.** Use this in **Coding and Decoding / Multiple Operations** questions when the instructions combine steps such as reversing a word, shifting positions or treating vowels and consonants differently.

**Key rule.** Apply the instructions one at a time in their stated order. To undo several operations, reverse their order.

#### Type 1 · Reverse then alternate

**Question.** Reverse RAIL, then shift odd positions forward one and even positions back one. Give the code.

**Picture it.** Turn the whole word around before counting positions. Then move every odd spot's letter forward and every even spot's letter backward.

1. **Follow the operations in order.** Reverse RAIL first, giving LIAR. Number the positions from 1 at the left of the reversed word.\
   `RAIL → LIAR`
2. **Shift the odd positions forward.** Position 1 changes from L to M, and position 3 changes from A to B.\
   `positions 1 and 3: L→M, A→B`
3. **Shift the even positions backward and assemble.** Position 2 changes from I to H, and position 4 changes from R to Q. Reading positions 1 through 4 gives MHBQ.\
   `positions 2 and 4: I→H, R→Q`\
   `M H B Q ⇒ MHBQ`

**Answer:** MHBQ.

#### Type 2 · Conditional word code

**Question.** Shift vowels one letter forward and consonants one letter back, with wrap. Encode TRAIN.

**Picture it.** Mark each vowel on the original word. Move the marked letters one way and the other letters the other way, without switching their spots.

1. **Classify before shifting.** In TRAIN, A and I are vowels. T, R and N are consonants. Apply the rule to each original letter.\
   `vowels A, I. Consonants T, R, N.`
2. **Apply the two directions.** Move A→B and I→J forward. Move T→S, R→Q and N→M backward.\
   `A→B, I→J and T→S, R→Q, N→M`
3. **Read in word order.** Keeping the positions of TRAIN gives S, Q, B, J and M. The final code is SQBJM.\
   `S Q B J M ⇒ SQBJM`

**Answer:** SQBJM.

### Method C · Use phrase intersections

Find the shared word between two phrases, then the shared token. A unique overlap and a one-to-one coding rule lock the match. If several words overlap, a third phrase is needed to distinguish them.

**When to use it.** Use this in **Coding and Decoding / Shared Words and Tokens** questions when coded phrases overlap and you need to identify which token matches a specific word.

**Key rule.** A unique common word and a unique common token identify each other when the code is one-to-one.

#### Type 1 · Common token across phrases

**Question.** “blue signal ready” becomes “pa ku ne” and “signal open” becomes “za ku”; order is unspecified and each word has a distinct token. Find the code for signal.

**Picture it.** Imagine each word always wears one secret name tag. One word appears in both sentences. Look for the one tag that appears in both codes.

1. **Find the repeated word.** The two phrases share just one word, “signal.” Because the code may rearrange the tokens, compare which tokens repeat across the phrases.
2. **Intersect the token sets.** The first code contains pa, ku and ne. The second contains za and ku. Only ku appears in both.
3. **Match the shared word to the shared token.** Each word has a distinct token, so the only possible code for “signal” is ku.

**Answer:** ku.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Encode by a forward shift | Move each letter forward and wrap if required. |
| Decode a uniform shift | Use the opposite shift and verify by encoding. |
| Reverse then shift | Place the letters in the new order before numbering positions. |
| Unique repeated word and token | One shared word matches the one shared token under a one-to-one code. |

## Exam tips

- **Keep token boundaries.** A token such as ku is one code symbol here.
- **Apply letter rules once.** An A changed to B by the vowel rule does not get a second consonant shift.
- **Read ordering clues precisely.** Unspecified token order means position matching offers no proof.
