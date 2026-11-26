## Basics first

- **Assignment.** Each person or item gets a slot, group or category. A one-to-one rule means placing one item removes that slot and item from the others.
- **Fixed order and adjacency.** “Above” or “later” is an inequality. “Immediately above” requires a one-position difference.
- **Conditional clue.** If P then Q rules out exactly the case P true and Q false. Its contrapositive can eliminate P when Q is known false.
- **Witness.** A complete assignment that meets every clue proves that a proposed state could occur. Necessity requires checking all remaining assignments or contradicting their alternatives.

## Methods and when to use them

### Method A · Combine the constraints into a chain

For floors, write below to above in one direction. If four ordered items fill four distinct floors, the chain fixes their positions. Verify the strict adjacency after placement.

### Method B · Use an elimination grid for categories

Make a row per person and mark impossible colours or topics. Place the fixed values. Carry exclusivity both ways so each fixed cell crosses out its row and column alternatives.

### Method C · Branch only on clues with few options

Try the requested slot or the tightest condition first. Propagate its consequences until you find a completion or conflict. For a schedule with dates and topics, keep both columns attached to each date.

## Question models and worked examples

### Floors and adjacency

**Question.** P, Q, R and S occupy floors 1–4. Q is immediately above P. R is above Q, and S is below P. Who lives on floor 3?

**Picture it.** Draw four floors in a stack. P and Q live on neighbouring floors. Keep room for somebody above Q and somebody below P when placing the pair.

1. **Combine the individual inequalities.** S is below P, Q is directly above P, and R is higher than Q. The order is S < P < Q < R.
2. **Assign the four occupied floors.** The four people fill all floors 1–4. This strict order assigns S to 1, P to 2, Q to 3 and R to 4.
3. **Verify the tight clue.** Q is exactly one floor above P, as required. Floor 3 is Q.

**Answer:** Q.

### Conditional assignment

**Question.** A, B and C take one each of red, blue and green. If A has blue, C has green. B has red and C does not have green. Find the colours.

**Picture it.** Give red to B. Try giving blue to A. If that forces C to take a colour the clues forbid, blue belongs in the remaining place.

1. **Fix the certain colour.** B has red, leaving blue and green for A and C.
2. **Apply the conditional.** If A has blue, C has green. The clue that C lacks green rules out A having blue.
3. **Fill and verify the remaining colours.** A must take green and C blue. Each colour is used once, and the forbidden case never arises.

**Answer:** A green, B red, C blue.

### Two-category scheduling

**Question.** On Monday, Tuesday and Wednesday, each of Jan, Kim and Lee presents one distinct topic: safety, scheduling or signals. Lee goes Wednesday. Signals is the day immediately after Kim. Jan covers safety. Who covers signals?

**Picture it.** Put Lee in Wednesday's square. Try Kim on each open day and see where the next day's Signals talk would go.

1. **Fix Wednesday and consider Kim’s options.** Lee presents Wednesday. Kim therefore presents Monday or Tuesday, leaving the other day for Jan.
2. **Eliminate Monday for Kim.** Then Signals would be on Tuesday. Jan would be the Tuesday speaker, but Jan’s topic is Safety.
3. **Use the remaining schedule.** Kim presents Tuesday, so Signals is on Wednesday. Lee presents on Wednesday and therefore covers Signals.

**Answer:** Lee.

### Find a possible arrangement

**Question.** A, B, C and D take slots 1–4. C follows A somewhere later, B is not 1, and D is not adjacent to C. Could C be 4?

**Picture it.** Put C in the last space as a test. Fill the rest while checking each clue. One complete row shows the placement can work.

1. **Fix C in the proposed slot.** Assume C occupies slot 4. D cannot be adjacent to C, so D cannot take slot 3 and can take slot 1 or 2.
2. **Construct a valid witness.** Put D in 1, A in 2, B in 3 and C in 4. This places A before C and keeps B out of slot 1.
3. **Check the final constraint.** D in 1 is not adjacent to C in 4. One arrangement satisfying all the clues proves C can occupy slot 4.

**Answer:** Yes, D–A–B–C is valid.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Immediately above in numbered floors | upper floor = lower floor + 1. |
| “If A has blue then C has green” with C not green | A cannot have blue. |
| Each person has one distinct topic | A fixed topic excludes it from every other person. |
| Could be true | Find one complete valid assignment. |

## Exam tips

- **Read direction once and label it.** An inverted floor drawing can reverse every clue.
- **Cross out invalid cases deliberately.** Name the exact clue that fails so you do not discard a valid branch.
- **Verify linked details together.** A name can be on the right day with the wrong topic.
