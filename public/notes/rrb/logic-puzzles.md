## What it means

Logic puzzles use several statements to restrict an arrangement. Different dimensions, such as person, floor and colour, can appear in one puzzle. Use a grid or slots to make the restrictions explicit. A clue with two branches can become decisive when one branch conflicts with an exclusion.

## Formulas and rules

- **Grid rule:** Where each item is used once, a confirmed assignment excludes that item from every other slot in the same category.
- **Boundaries:** “Above” means greater floor number, and “immediately above” means one greater. An adjacent block cannot fit past an end.
- **Conditions:** If P then Q excludes P with not Q. To test a possibility, construct an entire valid assignment.
- **Clue order:** Start with fixed slots and linked blocks, then apply precedence, exclusions and conditional clues.

## How to study it for Station Master

- Practise a four-item problem without timing, record the clue that forces the first placement, and repeat with a different anchor.
- Use branches only after propagating forced facts. Before claiming a unique answer, check whether another complete branch is valid.

## Question models and worked examples

### Floors and adjacency

**Question.** P, Q, R and S occupy floors 1–4. Q is immediately above P. R is above Q, and S is below P. Who lives on floor 3?

1. **Combine the individual inequalities.** S is below P, Q is directly above P, and R is higher than Q. The order is S < P < Q < R.
2. **Assign the four occupied floors.** The four people fill all floors 1–4. This strict order assigns S to 1, P to 2, Q to 3 and R to 4.
3. **Verify the tight clue.** Q is exactly one floor above P, as required. Floor 3 is Q.

**Answer:** Q.

### Conditional assignment

**Question.** A, B and C take one each of red, blue and green. If A has blue, C has green. B has red and C does not have green. Find the colours.

1. **Fix the certain colour.** B has red, leaving blue and green for A and C.
2. **Apply the conditional.** If A has blue, C has green. The clue that C lacks green rules out A having blue.
3. **Fill and verify the remaining colours.** A must take green and C blue. Each colour is used once, and the forbidden case never arises.

**Answer:** A green, B red, C blue.

### Two-category scheduling

**Question.** On Monday, Tuesday and Wednesday, each of Jan, Kim and Lee presents one distinct topic: safety, scheduling or signals. Lee goes Wednesday. Signals is the day immediately after Kim. Jan covers safety. Who covers signals?

1. **Fix Wednesday and consider Kim’s options.** Lee presents Wednesday. Kim therefore presents Monday or Tuesday, leaving the other day for Jan.
2. **Eliminate Monday for Kim.** Then Signals would be on Tuesday. Jan would be the Tuesday speaker, but Jan’s topic is Safety.
3. **Use the remaining schedule.** Kim presents Tuesday, so Signals is on Wednesday. Lee presents on Wednesday and therefore covers Signals.

**Answer:** Lee.

### Find a possible arrangement

**Question.** A, B, C and D take slots 1–4. C follows A somewhere later, B is not 1, and D is not adjacent to C. Could C be 4?

1. **Fix C in the proposed slot.** Assume C occupies slot 4. D cannot be adjacent to C, so D cannot take slot 3 and can take slot 1 or 2.
2. **Construct a valid witness.** Put D in 1, A in 2, B in 3 and C in 4. This places A before C and keeps B out of slot 1.
3. **Check the final constraint.** D in 1 is not adjacent to C in 4. One arrangement satisfying all the clues proves C can occupy slot 4.

**Answer:** Yes, D–A–B–C is valid.
