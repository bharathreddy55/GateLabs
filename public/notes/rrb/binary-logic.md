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

1. **Test B as truthful.** B claims that both people are liars. If B told the truth, that claim would make B a liar, a contradiction.
2. **Reclassify B.** The contradiction rules out a truthful B. Thus B is a liar and the claim that both lie must be false.
3. **Check A’s statement and the pair.** A correctly says B is a liar. With A truthful and B lying, “both are liars” is indeed false.

**Answer:** A tells the truth and B lies.

### Exactly one true claim

**Question.** Exactly one of A’s “the token is in X” and B’s “the token is not in Y” is true. One token is in X, Y or Z. Where is it?

1. **Try X.** A says the token is in X and B says it is outside Y. With the token in X, both statements are true.
2. **Try Y.** The token is outside X and inside Y, so A’s and B’s statements are both false.
3. **Try Z.** A’s claim about X is false and B’s claim about being outside Y is true. Only this case gives exactly one true statement.

**Answer:** Z.

### Contrapositive

**Question.** If a signal is active, its indicator is lit. The indicator is unlit. What follows under this rule?

1. **Write the implication.** The rule is Active ⇒ Lit. Every active signal must have a lit indicator.
2. **Test the fact given.** The indicator is unlit. An active signal in this situation would violate the rule.
3. **Use the contrapositive.** Unlit ⇒ Inactive. Therefore the signal is inactive.

**Answer:** The signal is inactive.

### Negate a compound instruction

**Question.** What does it mean to say “It is false that both the alarm and its backup are off”?

1. **Identify the prohibited state.** “Both off” describes the single case in which neither alarm is on. The sentence denies that whole case.
2. **List the remaining possibilities.** The alarm only can be on, the backup only can be on, or both can be on.
3. **Express the shared condition.** All three possibilities have at least one device on. The wording permits both devices to be on.

**Answer:** At least one of them is on.
