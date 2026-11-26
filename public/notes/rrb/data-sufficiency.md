## What it means

Data sufficiency asks whether the supplied facts force a unique answer, or a definite yes/no where that is what the question asks. A statement can be sufficient without computing the exact value if its uniqueness is obvious. An example proving one possible solution does not prove uniqueness. The answer-choice labels depend on the instructions of the item.

## Formulas and rules

- **Separate tests:** First combine the stem with statement I only, then start again with statement II only. Combine statements only if needed for the choice scheme.
- **Value question:** A statement is sufficient if all allowed cases produce the same requested value. For yes/no, an unambiguous “no” also counts as sufficient.
- **Counterexample:** Find two allowed cases giving different answers to demonstrate insufficiency. Use the domain in the stem: positive, integer, distinct or otherwise.
- **Expression focus:** A target expression can be determined even when its individual variables are free.

## How to study it for Station Master

- Write the exact target on top, then I / II / combined on separate lines. Avoid carrying evidence from I into the test of II.
- Work a domain-dependent square, a yes/no case and one case where both facts are still insufficient. Read the sufficiency answer-code key each time.

## Question models and worked examples

### Both needed

**Question.** Find x. I: x+y=11. II: y=4. Are they sufficient?

1. **Test statement I on its own.** x + y = 11 leaves several pairs, such as (7,4) and (8,3). They give different answers for x.
2. **Test statement II on its own.** y = 4 leaves x free. It gives no equation involving x without I.
3. **Test both together.** Substitute y = 4 into x + y = 11. This forces x = 7, so the combination gives a unique value.

**Answer:** Both together are sufficient, neither alone.

### Domain makes a statement enough

**Question.** For positive x, find x. I: x²=49. II: x<10.

1. **Use the domain in the stem.** We are asked for a positive x. This condition applies in both separate statement tests.
2. **Test statement I.** x² = 49 gives roots +7 and −7. Only +7 is positive, so I fixes x.
3. **Test statement II separately.** x < 10 allows many positive values, such as 4 and 8. Only I is sufficient by itself.

**Answer:** I alone is sufficient.

### Yes/no with definite no

**Question.** Is n even? I: n is an odd integer. II: n is a multiple of 3.

1. **Identify the kind of answer.** A sufficient statement must settle the yes/no question. It may settle it by proving “no”.
2. **Test statement I.** Every odd integer is non-even, so I fixes the answer as no in all allowed cases.
3. **Test statement II.** Multiples of 3 include both 3 and 6. They give different answers to the evenness question, so II alone is insufficient.

**Answer:** I alone is sufficient.

### Target expression despite free variables

**Question.** Find 2x+2y. I: x+y=9. II: x−y=3.

1. **Factor the requested expression.** The target is 2x + 2y = 2(x+y), so it depends on the sum of the variables.
2. **Test statement I.** It supplies the sum, 9, so the target is 2 × 9 = 18 regardless of the individual values.
3. **Test statement II.** Both (3,0) and (4,1) satisfy x − y = 3, but the target is 6 in the first case and 10 in the second. II alone fails.

**Answer:** I alone is sufficient.
