## What it means

Binary logic considers statements as true or false under given rules. In a truth-teller puzzle, a truth-teller’s complete statement is true and a liar’s complete statement is false. If behaviour can vary, such as alternating truth and lies, use the rule for that particular turn. Test assignments against every statement.

## Formulas and rules

- **AND and OR:** A and B is true only when both are true. Inclusive A or B is true when at least one is true. Exclusive or requires exactly one true part.
- **Implication:** If P then Q is false only when P is true and Q false. The valid contrapositive is if not Q then not P.
- **Negation:** Not(A and B) means at least one is false. Not(A or B) means both are false.
- **Exactly one true:** Count complete statements whose truth values hold under an assumed case, not separate phrases inside those statements.

## How to study it for Station Master

- Make a two-column case table and begin with a fixed count or self-restricting remark. In each case check that a speaker’s assigned type matches the whole statement.
- Practise rejecting false converses and using compound claims. Distinguish “an answer can be true” from “the answer is forced”.

## Question models and worked examples

### Truth-teller and liar

**Question.** A says “B is a liar.” B says “Both of us are liars.” Each always tells the truth or always lies. Determine their types.

1. If B were truthful, B’s own claim would require B to be a liar, a contradiction.
2. So B lies. A’s statement that B lies is true. B’s claim that both lie is false because A tells the truth.

**Answer:** A tells the truth and B lies.

### Exactly one true claim

**Question.** Exactly one of A’s “the token is in X” and B’s “the token is not in Y” is true. One token is in X, Y or Z. Where is it?

1. In X, both claims are true. In Y, both claims are false.
2. In Z, A is false and B is true. That matches the required count.

**Answer:** Z.

### Contrapositive

**Question.** If a signal is active, its indicator is lit. The indicator is unlit. What follows under this rule?

1. Write active⇒lit. An active signal with an unlit indicator would violate the conditional.
2. The unlit indicator therefore rules out an active signal.

**Answer:** The signal is inactive.

### Negate a compound instruction

**Question.** What does it mean to say “It is false that both the alarm and its backup are off”?

1. Negate the entire AND statement, which rules out the single case where both are off.
2. The cases with only the alarm on, only the backup on, or both on are all allowed.

**Answer:** At least one of them is on.
