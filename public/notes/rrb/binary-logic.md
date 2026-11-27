## Basics first

- **Proposition.** A proposition is a claim that can be true or false. Label its truth value with T or F rather than treating a speaker’s type as the claim itself.
- **AND, OR and exclusive OR.** AND is true only if both claims are true. Inclusive OR allows either or both. “Exactly one” is exclusive OR and rejects both-true and both-false.
- **Conditional.** If P then Q means every case with P also has Q. A case with Q alone leaves P undetermined. Contrapositive ¬Q ⇒ ¬P has the same meaning.
- **Negation.** Negating “both off” leaves all cases with at least one on. To negate “at least one on,” all must be off.

## Methods and when to use them

### Method A · Test a finite set of worlds

If a token can be in only X, Y or Z, make a row for each place and a column for each claim. For “exactly one,” retain rows with one T. This automatically handles claims containing a negation.

**When to use it.** Use this in **Binary Logic / Exactly One True Statement** questions when the prompt gives a small set of possible cases and specifies how many claims must be true.

**Key rule.** Make one row per possible case and keep only the rows with the required truth count. ‘Both off’ being false leaves every row with at least one on.

#### Type 1 · Exactly one true claim

**Question.** Exactly one of A’s “the token is in X” and B’s “the token is not in Y” is true. One token is in X, Y or Z. Where is it?

**Picture it.** Pretend the token is in X, then Y, then Z. For each place, tick the claims that become true. We want just one tick.

1. **Try X.** A says the token is in X and B says it is outside Y. With the token in X, both statements are true.
2. **Try Y.** The token is outside X and inside Y, so A’s and B’s statements are both false.
3. **Try Z.** A’s claim about X is false and B’s claim about being outside Y is true. Only this case gives exactly one true statement.

**Answer:** Z.

#### Type 2 · Negate a compound instruction

**Question.** What does it mean to say “It is false that both the alarm and its backup are off”?

**Picture it.** Draw both switches. Cross out the one drawing with both switches off. Look at what all the pictures left behind have in common.

1. **Identify the prohibited state.** “Both off” describes the single case in which neither alarm is on. The sentence denies that whole case.
2. **List the remaining possibilities.** The alarm only can be on, the backup only can be on, or both can be on.
3. **Express the shared condition.** All three possibilities have at least one device on. The wording permits both devices to be on.

**Answer:** At least one of them is on.

### Method B · Link a speaker to their statement

A truth-teller’s statement must evaluate true and a liar’s statement false. Start by testing a claim that refers to its own speaker or to everyone. If the assigned speaker type disagrees with the statement’s truth value, discard that world.

**When to use it.** Use this in **Binary Logic / Truth-tellers and Liars** questions when speakers’ statements give clues about who tells the truth and who lies.

**Key rule.** A truth-teller’s claim must evaluate true. A liar’s claim must evaluate false. Use both checks on each candidate assignment.

#### Type 1 · Truth-teller and liar

**Question.** A says “B is a liar.” B says “Both of us are liars.” Each always tells the truth or always lies. Determine their types.

**Picture it.** Imagine giving each person a truth or lie card. Read what they say and see whether the card fits. A person's own words can rule out one of their cards.

1. **Test B as truthful.** B claims that both people are liars. If B told the truth, that claim would make B a liar, a contradiction.
2. **Reclassify B.** The contradiction rules out a truthful B. Thus B is a liar and the claim that both lie must be false.
3. **Check A’s statement and the pair.** A correctly says B is a liar. With A truthful and B lying, “both are liars” is indeed false.

**Answer:** A tells the truth and B lies.

### Method C · Transform conditionals in the valid direction

From P and P⇒Q, deduce Q. From ¬Q and P⇒Q, deduce ¬P. If Q is given, look for a counterexample with P false before claiming P.

**When to use it.** Use this in **Binary Logic / Conditional Deductions** questions when the prompt gives an if–then rule and a fact about the condition or the result.

**Key rule.** If P implies Q, true P gives true Q and false Q gives false P.

#### Type 1 · Contrapositive

**Question.** If a signal is active, its indicator is lit. The indicator is unlit. What follows under this rule?

**Picture it.** The rule says the active signal always lights the lamp. If the lamp is dark, the signal cannot be in a state that forces it to light.

1. **Write the implication.** The rule is Active ⇒ Lit. Every active signal must have a lit indicator.
2. **Test the fact given.** The indicator is unlit. An active signal in this situation would violate the rule.
3. **Use the contrapositive.** Unlit ⇒ Inactive. Therefore the signal is inactive.

**Answer:** The signal is inactive.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Both true | P AND Q requires T,T. |
| Exactly one true | Retain only T,F and F,T. |
| Guaranteed inference from ¬Q and P⇒Q | Deduce ¬P. |
| Negation of P AND Q | At least one of P or Q is false. |

## Exam tips

- **Mark the scope of “not”.** Negating an entire statement changes which combinations remain.
- **Check every surviving assignment.** A one-speaker fit may conflict with the other person’s claim.
- **Allow both in ordinary OR.** Look for explicit wording such as “exactly one” before excluding T,T.
