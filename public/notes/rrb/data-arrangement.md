## What it means

Data arrangement represents constraints on which item belongs in which slot, category or time. Start with the required assignment, then turn statements about positions, counts and exclusions into constraints. A puzzle can have several valid layouts and still have one fact common to all layouts.

## Formulas and rules

- **Slots and uniqueness:** One item per slot means placing an item rules it out elsewhere. Use a grid for assignment across categories.
- **Gaps:** “Immediately before” means next slot. Exactly k items between positions i and j means their index difference is k+1.
- **Capacity:** If remaining items equal the remaining available places, those places must all be used. Tally group quotas separately.
- **Possibility and necessity:** “Could” needs one complete witness. “Must” must hold across every viable layout, so actively look for counterexamples.

## How to study it for Station Master

- Place exact values and tight blocks first. Use compact substitute names and stop adding details once the asked property is forced.
- For “could be true” test each surviving option by completing a full layout. For “must” cross out any option that fails in a valid branch.

## Question models and worked examples

### Assign by elimination

**Question.** Four deliveries A, B, C and D use slots 1–4, one each. C is at 4. B is immediately after A. D precedes A. Find the order.

1. **Place the fixed delivery.** C occupies slot 4. A, B and D must therefore occupy slots 1–3.
2. **Use the adjacent pair.** Since B immediately follows A, treat AB as a block. It could occupy 1–2 or 2–3 before applying the D clue.
3. **Require an earlier slot for D.** If AB occupies 1–2, nothing can precede A. The only valid block is 2–3, leaving slot 1 for D.

**Answer:** D, A, B, C.

### Count per group

**Question.** Exactly two of A, B, C, D and E go to Morning and three to Evening. C is in Evening, E is in Morning, A and B are in the same shift. Who else is in Morning?

1. **Count free morning slots.** E is already in Morning, leaving one slot open. C has a slot in Evening.
2. **Place the linked pair.** A and B must be in the same shift and need two places. They cannot fit alongside E, so both go to Evening, filling its two remaining slots.
3. **Assign the last person.** D is the only unplaced person and takes the final Morning slot.

**Answer:** D.

### Find what could be true

**Question.** Place A, B, C, D in slots 1–4. A precedes C and B is immediately before D. Could C occupy slot 3?

1. **Test the proposed slot.** Put C in slot 3 and leave slots 1, 2 and 4 for A, B and D.
2. **Check the immediate pair.** B and D must occupy consecutive slots in that order. Among the available slots only 1 and 2 are consecutive.
3. **Apply A’s precedence clue.** A is forced into slot 4, after C, although A must come before C. This rules out the proposed arrangement.

**Answer:** No.

### Fixed fact from multiple layouts

**Question.** Four events P, Q, R and S use consecutive slots. Q is last. P is before R. Is position 2 determined?

1. **Identify the fixed part.** Q sits fourth. P, R and S use the first three slots, with P before R.
2. **Make one valid arrangement.** P–R–S–Q meets both clues and puts R in position 2.
3. **Make a second witness.** S–P–R–Q also meets both clues and puts P in position 2. Different valid outcomes show the position is unfixed.

**Answer:** No. Only some facts such as Q being fourth are fixed.
