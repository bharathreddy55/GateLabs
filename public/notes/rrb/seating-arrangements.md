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

1. Place C at 3, E at 5 and A at 2. D lies between slots 3 and 5, so D is at 4.
2. The unused seat 1 belongs to B.

**Answer:** B–A–C–D–E from left to right.

### Circular opposition

**Question.** Six people sit in evenly spaced seats. B is opposite A, and C is one seat clockwise from B. How far clockwise from A is C?

1. Fix A at index 0. Three steps clockwise reach the opposite seat B.
2. One more clockwise step reaches C.

**Answer:** Four seats clockwise, equivalent to two anticlockwise.

### Facing sets the direction

**Question.** Four people face the centre of a circle. B is to the immediate right of A, and C is opposite A. Who is immediately left of C?

1. Place A at top. A faces down on the diagram, so A’s right points to the viewer’s left, where B sits.
2. C is at the bottom and faces up. C’s left also points to the viewer’s left.

**Answer:** B.

### Gap and both cases

**Question.** In a row of six seats, P sits in seat 3. Exactly one person sits between P and Q. R is immediately to Q’s right, as seen from the front of the diagram. Seats are numbered left to right in that view. If R cannot be in seat 6, where is Q?

1. Q is two positions from P, so it is either 1 or 5.
2. Q at 5 puts R at 6, forbidden. Q at 1 places R at 2.

**Answer:** Q is in seat 1.
