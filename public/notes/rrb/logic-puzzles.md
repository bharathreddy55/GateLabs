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

1. S<P<Q<R gives a strict order across all four floors.
2. Place them bottom to top. The middle adjacent block is P on 2 and Q on 3.

**Answer:** Q.

### Conditional assignment

**Question.** A, B and C take one each of red, blue and green. If A has blue, C has green. B has red and C does not have green. Find the colours.

1. The conditional rules out blue for A because C lacks green.
2. With B on red, A must take green. C takes the remaining blue.

**Answer:** A green, B red, C blue.

### Two-category scheduling

**Question.** On Monday, Tuesday and Wednesday, each of Jan, Kim and Lee presents one distinct topic: safety, scheduling or signals. Lee goes Wednesday. Signals is the day immediately after Kim. Jan covers safety. Who covers signals?

1. Kim is either Monday or Tuesday. If Monday, Tuesday is signals, but Tuesday would then be Jan, who covers safety.
2. So Kim is Tuesday, Jan Monday and Lee Wednesday. The day after Kim is Wednesday.

**Answer:** Lee.

### Find a possible arrangement

**Question.** A, B, C and D take slots 1–4. C follows A somewhere later, B is not 1, and D is not adjacent to C. Could C be 4?

1. If C=4 then D must be 1 or 2, avoiding slot 3.
2. Try D=1, A=2 and B=3. All clues hold, which is enough for possibility.

**Answer:** Yes, D–A–B–C is valid.
