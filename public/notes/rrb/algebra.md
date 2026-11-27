## Basics first

- **Expressions.** A term is one addend in an expression, such as −3x in 2x² − 3x + 5. A factor is one multiplier, such as x − 5 in (x − 5)(x + 5).
- **Identity.** An identity holds for every allowed input. Expanding a product or factoring an expression lets you choose the form in which the information is easiest to see.
- **Like terms.** Terms of the same variable powers combine by adding coefficients. In 5x + 2x² − 3x, combine the x terms to get 2x + 2x².
- **Domain restriction.** A denominator cannot be zero. Factor and identify original exclusions before cancelling a factor.

## Methods and when to use them

### Method A · Match the requested expression to an identity

If x+y and xy are given, use (x+y)² = x² + 2xy + y². Isolate the unknown part directly. You can often find it without finding x and y individually.

**When to use it.** Use this in **Algebra / Identities** questions when the question gives the sum and product of two numbers and asks for a related expression such as the sum of their squares.

**Key rule.** x² + y² = (x + y)² − 2xy.

#### Type 1 · Hidden middle term

**Question.** Given x+y=13 and xy=36, find x²+y².

**Picture it.** Think of a square with sides made of an x piece and a y piece. It has two smaller squares and two rectangles. Take away the rectangles to leave the squares.

1. **Expand the known square.** Use (x + y)² = x² + 2xy + y². The left side is 13² = 169.\
   `13² = x² + 2xy + y²`
2. **Substitute the known product.** The cross term is 2xy = 2 × 36 = 72. Therefore 169 = x² + y² + 72.\
   `169 = x² + 72 + y²`
3. **Isolate the requested sum.** Subtract the cross term from 169 to get x² + y² = 97.\
   `x² + y² = 169 − 72 = 97`

**Answer:** 97.

### Method B · Factor before simplifying fractions

Use the difference of squares or look for factors of the constant whose sum is the middle coefficient for a monic quadratic. Cancel common factors only on the original domain.

**When to use it.** Use this in **Algebra / Rational Expressions** questions when a numerator and denominator contain polynomial expressions that may share factors.

**Key rule.** Factor numerator and denominator, then cancel shared factors while keeping the original restrictions on x.

#### Type 1 · Simplify with restrictions

**Question.** Simplify (x²−25)/(x²−x−20) and state exclusions.

**Picture it.** Picture two expressions made of smaller blocks multiplied together. A shared block can cancel after you check it was never zero in the original fraction.

1. **Factor both polynomials.** Use the difference of squares in the numerator. For the denominator, −5 and 4 multiply to −20 and add to −1. Thus the factors are (x−5)(x+5) and (x−5)(x+4).\
   `x² − 25 = (x−5)(x+5)`\
   `x² − x − 20 = (x−5)(x+4)`
2. **Record both restrictions.** The original denominator is zero at x = 5 and x = −4. Write down both before cancelling.\
   `x − 5 ≠ 0 and x + 4 ≠ 0`
3. **Cancel the common factor.** For the allowed values, divide numerator and denominator by x−5 to get (x+5)/(x+4). Both original exclusions still apply.\
   `(x−5)(x+5) ÷ [(x−5)(x+4)] = (x+5)/(x+4)`

**Answer:** (x+5)/(x+4), x≠5 and x≠−4.

### Method C · Use a convenient centre

For factors equally far from a round value a, write them as a+b and a−b. Their product is a²−b². With x+1/x, the cross term on squaring becomes 2 because x is nonzero.

**When to use it.** Use this in **Algebra / Symmetric Factors and Reciprocals** questions when two factors sit equally far above and below a convenient number, or when squaring an expression such as x + 1/x.

**Key rule.** For factors equally far from a centre, use (a + b)(a − b) = a² − b². For x ≠ 0, (x + 1/x)² = x² + 2 + 1/x².

#### Type 1 · Efficient product

**Question.** Evaluate 103×97 using an identity.

**Picture it.** Both numbers stand the same distance from 100. When you multiply them, one extra strip and one missing strip cancel, leaving the big square minus a small square.

1. **Write the factors around 100.** 103 is 100 + 3 and 97 is 100 − 3. Their offsets are equal in magnitude.\
   `103 × 97 = (100+3)(100−3)`
2. **Apply the difference of squares.** The cross terms cancel when multiplying (a + b)(a − b), giving a² − b².\
   `(100+3)(100−3) = 100² − 3²`
3. **Evaluate the two squares.** Here 100² − 3² = 10,000 − 9 = 9,991.\
   `10,000 − 9 = 9,991`

**Answer:** 9991.

#### Type 2 · Reciprocal expression

**Question.** Given x+1/x=5, find x²+1/x².

**Picture it.** When you square two pieces added together, each piece gets its own square and there are two cross-products. Here x times its reciprocal is exactly one.

1. **Square the given sum.** (x + 1/x)² is x² + 2x(1/x) + 1/x². The left side equals 5² = 25.\
   `(x + 1/x)² = 25`
2. **Simplify the cross term.** The given expression requires x ≠ 0. Therefore x(1/x) = 1 and the cross term is 2.\
   `x² + 2 + 1/x² = 25`
3. **Isolate the target.** Subtract 2 from 25 to get x² + 1/x² = 23.\
   `x² + 1/x² = 25 − 2 = 23`

**Answer:** 23.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Square of a sum | (a + b)² = a² + 2ab + b². |
| Square of a difference | (a − b)² = a² − 2ab + b². |
| Product of symmetric factors | (a − b)(a + b) = a² − b². |
| Reciprocal square | x² + 1/x² = (x + 1/x)² − 2 for x ≠ 0. |

## Exam tips

- **Cancel factors only.** In (x+2)/x, the numerator is a sum. You can split it into 1 + 2/x.
- **Preserve excluded inputs.** A factor removed during simplification still makes the original expression undefined at its root.
- **Retain the middle term.** Check for 2ab before squaring a sum.
