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

1. The block AB needs two consecutive positions before C. With D before A, AB cannot start at 1.
2. AB uses positions 2 and 3, leaving D at 1 and C at 4.

**Answer:** D, A, B, C.

### Count per group

**Question.** Exactly two of A, B, C, D and E go to Morning and three to Evening. C is in Evening, E is in Morning, A and B are in the same shift. Who else is in Morning?

1. Only one Morning place remains, so A and B both go to Evening.
2. Evening has A, B and C, leaving D alongside E.

**Answer:** D.

### Find what could be true

**Question.** Place A, B, C, D in slots 1–4. A precedes C and B is immediately before D. Could C occupy slot 3?

1. If C is at 3, the BD block must occupy the only adjacent pair among slots 1,2,4, namely 1 and 2.
2. A would then be at 4 and would fail to precede C.

**Answer:** No.

### Fixed fact from multiple layouts

**Question.** Four events P, Q, R and S use consecutive slots. Q is last. P is before R. Is position 2 determined?

1. Before Q, P/R can occupy 1/2, 1/3 or 2/3 as long as P comes first.
2. The valid layouts P,R,S,Q and S,P,R,Q put different events at position 2.

**Answer:** No. Only some facts such as Q being fourth are fixed.
