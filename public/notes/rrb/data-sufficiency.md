## Basics first

- **Target.** The stem asks for a particular value or a yes/no result. Test whether that target is determined even if other quantities remain free.
- **Domain.** A restriction like x > 0 belongs to every check. It can remove otherwise valid roots or restrict the eligible cases.
- **Statements.** Test I and II independently under the stem constraints. When working with II alone, set aside any result found using I. Combine only after testing each alone.
- **Uniqueness and counterexamples.** A statement is sufficient when every admissible case yields the same answer. Two admissible cases with different answers prove insufficiency.

## Methods and when to use them

### Method A · Factor or simplify the target first

For 2x+2y, rewrite the target as 2(x+y). Knowing the sum can determine it even though x and y individually vary. Avoid solving irrelevant unknowns.

### Method B · Treat yes and no alike

If a statement forces no for every admissible case, it is sufficient for a yes/no question. If both yes and no remain possible, give one witness for each to disprove sufficiency.

### Method C · Combine deliberately

If neither statement works alone, test their intersection. Watch for contradictions with the domain. Map the result to the choices shown, since option letters can vary between papers.

## Question models and worked examples

### Both needed

**Question.** Find x. I: x+y=11. II: y=4. Are they sufficient?

**Picture it.** Treat each statement like a separate clue card. See whether you can pick two different values for x while using just that card. Then try both cards together.

1. **Test statement I on its own.** x + y = 11 leaves several pairs, such as (7,4) and (8,3). They give different answers for x.\
   `(x,y) = (6,5) or (7,4)`
2. **Test statement II on its own.** y = 4 leaves x free. It gives no equation involving x without I.\
   `y = 4 still permits x = 1 or x = 9`
3. **Test both together.** Substitute y = 4 into x + y = 11. This forces x = 7, so the combination gives a unique value.\
   `x + 4 = 11 ⇒ x = 7`

**Answer:** Both together are sufficient, neither alone.

### Domain makes a statement enough

**Question.** For positive x, find x. I: x²=49. II: x<10.

**Picture it.** The question itself allows only positive x. Keep that rule even when you pick up just one statement. It can cross out one answer that would otherwise fit.

1. **Use the domain in the stem.** We are asked for a positive x. This condition applies in both separate statement tests.\
   `domain: x > 0`
2. **Test statement I.** x² = 49 gives roots +7 and −7. Only +7 is positive, so I fixes x.\
   `x² = 49 and x > 0 ⇒ x = 7`
3. **Test statement II separately.** x < 10 allows many positive values, such as 4 and 8. Only I is sufficient by itself.\
   `x = 4 and x = 8 both satisfy x < 10`

**Answer:** I alone is sufficient.

### Yes/no with definite no

**Question.** Is n even? I: n is an odd integer. II: n is a multiple of 3.

**Picture it.** A definite no answers a yes-or-no question. Look for a clue that always tells you yes or always tells you no.

1. **Identify the kind of answer.** A sufficient statement must settle the yes/no question. It may settle it by proving “no”.
2. **Test statement I.** Every odd integer is non-even, so I fixes the answer as no in all allowed cases.
3. **Test statement II.** Multiples of 3 include both 3 and 6. They give different answers to the evenness question, so II alone is insufficient.\
   `3 is odd and 6 is even, both divisible by 3`

**Answer:** I alone is sufficient.

### Target expression despite free variables

**Question.** Find 2x+2y. I: x+y=9. II: x−y=3.

**Picture it.** You need the total of two doubled numbers. You might know their sum well enough to find the answer even while their separate values are hidden.

1. **Factor the requested expression.** The target is 2x + 2y = 2(x+y), so it depends on the sum of the variables.\
   `2x + 2y = 2(x + y)`
2. **Test statement I.** It supplies the sum, 9, so the target is 2 × 9 = 18 regardless of the individual values.\
   `2 × 9 = 18`
3. **Test statement II.** Both (3,0) and (4,1) satisfy x − y = 3, but the target is 6 in the first case and 10 in the second. II alone fails.\
   `(3,0) ⇒ target 6. (4,1) ⇒ target 10.`

**Answer:** I alone is sufficient.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Two valid cases give different targets | The statement is insufficient. |
| Every case gives a definite no | Sufficient for a yes/no target. |
| Same target, different underlying values | Still sufficient. |
| Neither statement alone works | Try both under the original restrictions. |

## Exam tips

- **Put the stem constraints at the top.** Carry them into each independent check.
- **Avoid carrying values between separate checks.** Statement II alone cannot borrow an equation from I.
- **Distinguish possible and forced.** A value that fits a statement is not necessarily the only value.
