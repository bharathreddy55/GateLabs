## What it means

A seating problem places people using order, relative directions and gaps. Straight rows have ends. Circular arrangements wrap from the last seat to the first. “Left” or “right” can be read from a person’s facing direction, while clockwise and anticlockwise are fixed around a circle. Make a small diagram to prevent a silent orientation switch.

## Formulas and rules

- **Linear gaps:** An immediate neighbour is one seat away. With k people between two seats, their indices differ by k+1.
- **Circle orientation:** For people facing the centre, a person’s right is anticlockwise and left is clockwise when viewed from above. Facing outward reverses those links. Draw one person at the top to check.
- **Opposite seat:** In an evenly spaced even-sized circle, move N/2 seats. Positions wrap around the ends of the index list.
- **Blocks and cases:** Move adjacent people as a block if orientation is fixed. Try mirror versions when a clue gives adjacency without left/right order.

## How to study it for Station Master

- Fix one reference seat in a circle when rotation is irrelevant. Put facing arrows on the drawing and anchor tight pairs before weaker relationships.
- Practise rows and both centre-facing and outward-facing circles. For an ambiguous stem, distinguish “clockwise” from “to a person’s right” explicitly.

## Question models and worked examples

### Linear row with a fixed end

**Question.** Five people A, B, C, D, E sit facing north in a row. C is in the middle, E is at the far right, A is immediately left of C, and D is between C and E. Find the order.

1. **Fix the seats named outright.** Number the seats 1–5 from left to right. C takes seat 3 and E takes seat 5.
2. **Apply the position clues.** The people face north, so A immediately to C’s left goes in seat 2. The only seat between C and E is seat 4, so D goes there.
3. **Fill the remaining seat and verify.** B takes seat 1. Reading the row gives B–A–C–D–E, with A directly left of C and D between C and E.

**Answer:** B–A–C–D–E from left to right.

### Circular opposition

**Question.** Six people sit in evenly spaced seats. B is opposite A, and C is one seat clockwise from B. How far clockwise from A is C?

1. **Measure opposition in seat moves.** There are six equally spaced seats, so the opposite seat is half a circle away, or three moves clockwise from A.
2. **Add the move from B to C.** C is one further clockwise move beyond B. This places C 3+1=4 moves clockwise from A.
3. **Check the alternative direction.** A full circuit is six moves. The remaining arc is 6−4=2 moves anticlockwise.

**Answer:** Four seats clockwise, equivalent to two anticlockwise.

### Facing sets the direction

**Question.** Four people face the centre of a circle. B is to the immediate right of A, and C is opposite A. Who is immediately left of C?

1. **Choose a fixed view of the circle.** Put A in the top seat, facing down towards the centre. From that position A’s right points towards the left-hand seat on the page, so B sits there.
2. **Place the opposite person.** C is at the bottom, facing up towards the centre. C’s own left now points towards the left-hand seat on the page.
3. **Read the neighbour from C’s perspective.** C’s immediate left is the seat already occupied by B. Rotate the diagram mentally if A starts in a different position and the relative answer stays the same.

**Answer:** B.

### Gap and both cases

**Question.** In a row of six seats, P sits in seat 3. Exactly one person sits between P and Q. R is immediately to Q’s right, as seen from the front of the diagram. Seats are numbered left to right in that view. If R cannot be in seat 6, where is Q?

1. **Translate the gap into a seat difference.** Exactly one person between P and Q means their seat numbers differ by two. With P in seat 3, Q could be in seat 1 or 5.
2. **Check the right-neighbour clue in each case.** If Q is in seat 1, R is in seat 2. If Q is in seat 5, R is in seat 6, following the left-to-right numbering in the diagram.
3. **Eliminate the forbidden case.** R cannot be in seat 6, so discard Q in seat 5. The remaining arrangement has Q in seat 1 and R in seat 2.

**Answer:** Q is in seat 1.
