## Basics first

- **Position grid.** Use numbered boxes for a row or a table with one column per group. Each item goes in one slot unless the question says otherwise.
- **Fixed, relative and adjacent clues.** “C in slot 4” fixes a position. “A before B” permits a gap. “A immediately before B” creates a neighbouring block AB in that order.
- **Capacity.** If Morning holds two, a fixed member leaves at most one other slot. Linked people who must stay together can fit only in a group with enough open slots.
- **Possibility and necessity.** One valid arrangement can establish that something is possible. Two different valid placements disprove that a particular position is forced.

## Methods and when to use them

### Method A · Start with hard anchors

Write the fixed slots first and mark full groups. Turn an immediate pair into a two-slot block. Test only starts where the full block fits.

**When to use it.** Use this in **Data Arrangement / Fixed Positions and Blocks** questions when clues fix a slot or require two entries to occupy consecutive slots.

**Key rule.** Place fixed entries first and treat immediate neighbours as one ordered block.

#### Type 1 · Assign by elimination

**Question.** Four deliveries A, B, C and D use slots 1–4, one each. C is at 4. B is immediately after A. D precedes A. Find the order.

**Picture it.** Draw four empty spaces. Put C in its given place and tape A to B in that order. Look for a place the pair fits with space for D before it.

1. **Place the fixed delivery.** C occupies slot 4. A, B and D must therefore occupy slots 1–3.
2. **Use the adjacent pair.** Since B immediately follows A, treat AB as a block. It could occupy 1–2 or 2–3 before applying the D clue.
3. **Require an earlier slot for D.** If AB occupies 1–2, nothing can precede A. The only valid block is 2–3, leaving slot 1 for D.

**Answer:** D, A, B, C.

### Method B · Use a capacity table for grouping

Write total positions and used positions beside each group. A group with one free position cannot take a linked pair. Place the pair where it fits, then allocate leftover members.

**When to use it.** Use this in **Data Arrangement / Group Capacity** questions when people or items must be split between groups of fixed sizes and some must stay together.

**Key rule.** Free slots = capacity − slots already assigned. A linked group can go only where everyone in it fits.

#### Type 1 · Count per group

**Question.** Exactly two of A, B, C, D and E go to Morning and three to Evening. C is in Evening, E is in Morning, A and B are in the same shift. Who else is in Morning?

**Picture it.** Draw two boxes for the morning workers and three for the evening workers. A and B stay together, so look for a group with two empty spaces.

1. **Count free morning slots.** E is already in Morning, leaving one slot open. C has a slot in Evening.
2. **Place the linked pair.** A and B must be in the same shift and need two places. They cannot fit alongside E, so both go to Evening, filling its two remaining slots.
3. **Assign the last person.** D is the only unplaced person and takes the final Morning slot.

**Answer:** D.

### Method C · Branch on a requested placement

Assume the proposed slot and run each clue. If every continuation violates a rule it is impossible. For “must be true,” look for a second valid layout where the claimed position changes.

**When to use it.** Use this in **Data Arrangement / Possible and Forced Placements** questions when asked whether a candidate can fit in a position or must appear there in every valid arrangement.

**Key rule.** For ‘could’, find one complete valid layout. For ‘must’, try to build a complete layout where the claim fails.

#### Type 1 · Find what could be true

**Question.** Place A, B, C, D in slots 1–4. A precedes C and B is immediately before D. Could C occupy slot 3?

**Picture it.** Try putting C in slot 3 as the question suggests. Then follow the other clues. If they ask one person to be in two places or the wrong order, that setup cannot work.

1. **Test the proposed slot.** Put C in slot 3 and leave slots 1, 2 and 4 for A, B and D.
2. **Check the immediate pair.** B and D must occupy consecutive slots in that order. Among the available slots only 1 and 2 are consecutive.
3. **Apply A’s precedence clue.** A is forced into slot 4, after C, although A must come before C. This rules out the proposed arrangement.

**Answer:** No.

#### Type 2 · Fixed fact from multiple layouts

**Question.** Four events P, Q, R and S use consecutive slots. Q is last. P is before R. Is position 2 determined?

**Picture it.** Make two different rows that each obey the clues. If they put different events in the second place, the clues do not fix the second place.

1. **Identify the fixed part.** Q sits fourth. P, R and S use the first three slots, with P before R.
2. **Make one valid arrangement.** P–R–S–Q meets both clues and puts R in position 2.
3. **Make a second witness.** S–P–R–Q also meets both clues and puts P in position 2. Different valid outcomes show the position is unfixed.

**Answer:** No. Only some facts such as Q being fourth are fixed.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Immediately after | A and B occupy consecutive slots with B later. |
| Order only | Earlier and later slots may have other items between them. |
| Pair larger than free capacity | Place it in a group with at least two vacancies. |
| Possible or forced | One witness proves possibility. A valid counterexample defeats necessity. |

## Exam tips

- **Write slot numbers above the scratch row.** The last free position can be easy to miss.
- **Keep capacity restrictions visible.** Recalculate free slots after each placement.
- **Verify the final layout against every clue.** A valid block alone can still violate precedence.
