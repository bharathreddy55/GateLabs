## Basics first

- **Alphabet index.** Use A=1, B=2 and so on through Z=26. Comparing indices makes forward and backward jumps explicit.
- **Wraparound.** After Z comes A and before A comes Z when the exercise uses cyclic shifts. A forward index above 26 wraps back by subtracting 26.
- **Positions and tracks.** In a list, odd and even positions may use separate patterns. In a pair of letters, the first column may advance independently of the second.
- **Repeated block.** A block of length L repeats every L positions. For a one-based position, the remainder selects a letter, and remainder zero selects the final letter of the block.

## Methods and when to use them

### Method A · Find the steps between alphabet positions

Write the indices under each letter. Check whether differences are constant, growing or alternating. A sequence crossing Z can continue its pattern even though the index resets to 1.

### Method B · Split pairs and alternate positions

For pairs such as BC, EF and HI, read first letters down one column and second letters down another. For interleaving, label each term’s position and read the two tracks independently.

### Method C · Index a periodic block directly

Divide the requested position by the block length. Full blocks use quotient × length characters. A nonzero remainder gives the next block’s position. When it is zero, use the end of the last complete block.

## Question models and worked examples

### Increasing shifts with wrap

**Question.** Find the next letter: M, P, T, Y, ?

**Picture it.** Give each letter an alphabet seat number and count how far the letters move. When a move passes Z, circle back to A.

1. **Convert letters into positions.** With A=1 through Z=26, the sequence M, P, T, Y has positions 13, 16, 20 and 25.\
   `M=13, P=16, T=20, Y=25`
2. **Find the growing shifts.** The shifts are +3, +4 and +5, so the next shift is +6. From Y that gives 25+6=31.\
   `shifts +3, +4, +5, then +6`\
   `25 + 6 = 31`
3. **Wrap back after Z.** Subtract 26 from 31 to get position 5. Position 5 is E.\
   `31 − 26 = 5 ⇒ E`

**Answer:** E.

### Parallel columns

**Question.** Complete BC, EF, HI, KL, ?

**Picture it.** Write pairs in two columns. Check the left letters as their own row and the right letters as another. Put the next two together.

1. **Read the two columns separately.** The left letters B, E, H, K have positions 2, 5, 8, 11. The right letters C, F, I, L have positions 3, 6, 9, 12.\
   `left: 2, 5, 8, 11. Right: 3, 6, 9, 12.`
2. **Advance each by three.** The next left letter is at position 14, N. The next right letter is at position 15, O.\
   `11 + 3 = 14 ⇒ N. 12 + 3 = 15 ⇒ O.`
3. **Recombine and check.** Put the left letter before the right to get NO. The two letters remain adjacent as in every given pair.\
   `positions 14, 15 ⇒ NO`

**Answer:** NO.

### Interleaved opposite shifts

**Question.** Complete A, Z, C, X, E, V, ?

**Picture it.** Read the first, third and fifth letters as one row and the second, fourth and sixth as a different row. The missing spot belongs to just one of them.

1. **Extract the alternating tracks.** Odd positions show A, C, E. Even positions show Z, X, V.\
   `odd: A,C,E. Even: Z,X,V.`
2. **Identify the directions.** The odd track advances two letters at a time, while the even track moves two letters backward.\
   `odd +2, even −2`
3. **Fill the correct position.** The blank is position 7 on the odd track. Move two letters forward from E to reach G.\
   `position 7 is odd, E(5) + 2 ⇒ G(7)`

**Answer:** G.

### Index a repeated block

**Question.** The block AABC repeats. What is the 38th letter?

**Picture it.** Imagine stamps that print AABC four letters at a time. Count the complete stamps before the 38th spot and then count inside the next stamp.

1. **Count complete blocks.** AABC has four letters. Divide 38 by 4 to get nine complete blocks and a remainder of two.\
   `38 = 4 × 9 + 2`
2. **Locate the letter after those blocks.** Nine blocks use 36 positions, so position 38 is the second position of the next block.\
   `38 − 36 = 2`
3. **Read the indexed letter.** The second letter of AABC is A. Both of its first two positions are A, so check the calculation even though position 1 happens to yield the same letter.\
   `AABC at position 2 ⇒ A`

**Answer:** A.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Forward wrap | Position 27 becomes 1. Subtract 26 until in range. |
| Backward wrap | Position 0 becomes 26. Add 26 until in range. |
| Two letters in each term | Read the two columns separately. |
| Repeated block of length L | Use position mod L, with zero meaning L. |

## Exam tips

- **Keep A=1 consistent.** Switching to A=0 mid-problem moves every answer one place.
- **Inspect each track.** The whole series can appear irregular even if each track is simple.
- **Check the position before the letter.** A block can repeat the same letter at different positions, hiding an indexing error.
