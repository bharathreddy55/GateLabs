## Basics first

- **Linear seating.** Use numbered slots from a declared viewing direction. A fixed end or middle position is an anchor. The person’s facing direction determines their left and right unless the question specifies the viewer’s perspective.
- **Circular seating.** Number seats clockwise and wrap after the last seat. In an even-sized circle, a person opposite someone is half the total seat count away.
- **Relative direction.** Freeze a simple reference view. A person at the top facing the centre looks down the page, so their right points to page left. At the bottom, someone facing the centre looks up and their right points to page right.
- **Gaps and adjacency.** Immediate neighbours have zero people between them. A clue saying k people between two positions requires k+1 seat moves along the specified row or arc.

## Methods and when to use them

### Method A · Start with an anchor and a block

Fill a fixed end, middle or named position first. Treat immediate pairs as ordered blocks and test only where both seats fit. Use the remaining exact gap to place other people.

**When to use it.** Use this in **Seating Arrangements / Linear Rows** questions when an end or middle seat is fixed or a clue requires specific people to sit together.

### Method B · Fix rotation in a circle

If no absolute seat is fixed, put the reference person at the top since rotating everyone together preserves relative clues. Mark the person’s facing direction before translating a handed direction into a clockwise or anticlockwise step.

**When to use it.** Use this in **Seating Arrangements / Circular Tables** questions when the seats have no fixed numbers and left or right depends on which way each person faces.

### Method C · Check both sides of an unsigned gap

If Q is two seats from P, test P−2 and P+2 where they exist. Apply all other clues to each and cross out any incompatible candidate. Verify a surviving arrangement rather than guessing from the more natural view.

**When to use it.** Use this in **Seating Arrangements / Gaps without Direction** questions when the question gives a seat gap between two people without telling you who sits on which side.

## Question models and worked examples

### Linear row with a fixed end

**Question.** Five people A, B, C, D, E sit facing north in a row. C is in the middle, E is at the far right, A is immediately left of C, and D is between C and E. Find the order.

**Picture it.** Draw five chairs. Mark the middle and far-right chairs first. Those anchors make the other clues easier to follow.

1. **Fix the seats named outright.** Number the seats 1–5 from left to right. C takes seat 3 and E takes seat 5.\
   `C = 3, E = 5`
2. **Apply the position clues.** The people face north, so A immediately to C’s left goes in seat 2. The only seat between C and E is seat 4, so D goes there.\
   `A = 3 − 1 = 2 and D = 4`
3. **Fill the remaining seat and verify.** B takes seat 1. Reading the row gives B–A–C–D–E, with A directly left of C and D between C and E.\
   `positions 1–5: B, A, C, D, E`

**Answer:** B–A–C–D–E from left to right.

### Circular opposition

**Question.** Six people sit in evenly spaced seats. B is opposite A, and C is one seat clockwise from B. How far clockwise from A is C?

**Picture it.** Picture a round table with six chairs. Walk halfway around to the opposite chair, then take one more step clockwise.

1. **Measure opposition in seat moves.** There are six equally spaced seats, so the opposite seat is half a circle away, or three moves clockwise from A.\
   `6 ÷ 2 = 3 moves to B`
2. **Add the move from B to C.** C is one further clockwise move beyond B. This places C 3+1=4 moves clockwise from A.\
   `3 + 1 = 4 moves clockwise to C`
3. **Check the alternative direction.** A full circuit is six moves. The remaining arc is 6−4=2 moves anticlockwise.\
   `6 − 4 = 2 moves anticlockwise`

**Answer:** Four seats clockwise, equivalent to two anticlockwise.

### Facing sets the direction

**Question.** Four people face the centre of a circle. B is to the immediate right of A, and C is opposite A. Who is immediately left of C?

**Picture it.** Put a little arrow at each person's chair to show where they face. At opposite seats, their own left and right can point different ways on your paper.

1. **Choose a fixed view of the circle.** Put A in the top seat, facing down towards the centre. From that position A’s right points towards the left-hand seat on the page, so B sits there.
2. **Place the opposite person.** C is at the bottom, facing up towards the centre. C’s own left now points towards the left-hand seat on the page.
3. **Read the neighbour from C’s perspective.** C’s immediate left is the seat already occupied by B. Rotate the diagram mentally if A starts in a different position and the relative answer stays the same.

**Answer:** B.

### Gap and both cases

**Question.** In a row of six seats, P sits in seat 3. Exactly one person sits between P and Q. R is immediately to Q’s right, as seen from the front of the diagram. Seats are numbered left to right in that view. If R cannot be in seat 6, where is Q?

**Picture it.** Start at P in seat 3. Try putting Q two seats to the left and two to the right. Use R's blocked seat to cross out one of those drawings.

1. **Translate the gap into a seat difference.** Exactly one person between P and Q means their seat numbers differ by two. With P in seat 3, Q could be in seat 1 or 5.\
   `Q = 3 ± (1 + 1) ⇒ Q = 1 or 5`
2. **Check the right-neighbour clue in each case.** If Q is in seat 1, R is in seat 2. If Q is in seat 5, R is in seat 6, following the left-to-right numbering in the diagram.\
   `Q = 1 ⇒ R = 2. Q = 5 ⇒ R = 6.`
3. **Eliminate the forbidden case.** R cannot be in seat 6, so discard Q in seat 5. The remaining arrangement has Q in seat 1 and R in seat 2.\
   `R ≠ 6 ⇒ Q = 1`

**Answer:** Q is in seat 1.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Middle in an odd row of n | Position (n+1)/2. |
| Opposite in an even circle of n | n/2 seat moves. |
| k people between row positions | Absolute seat difference = k + 1. |
| Immediate left or right | One adjacent seat using the stated facing or viewing direction. |

## Exam tips

- **Mark viewpoint before placing people.** A top-down diagram’s left is not always another person’s left.
- **Do not count the starting seat as a move.** The neighbour is one seat away.
- **Check whether rotation matters.** Relative clues alone usually identify a circular order only up to rotation.
