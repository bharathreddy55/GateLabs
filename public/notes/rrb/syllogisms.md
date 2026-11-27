## Basics first

- **Universal assertion.** “All A are B” places A inside B. By itself it neither asserts that A has a member nor that B is inside A.
- **Exclusion.** “No A is B” makes the sets disjoint. This exclusion works in either direction.
- **Particular assertion.** “Some A are B” means at least one witness lies in both A and B. “Some A are not B” puts a witness in A outside B.
- **Necessity.** A conclusion follows when it holds in every diagram consistent with the premises. A compatible diagram that makes it false defeats the conclusion.

## Methods and when to use them

### Method A · Draw containment and exclusion before adding witnesses

Sketch the universal constraints first. Place a dot for each stated existence only where the rules allow. The same dot may serve more than one premise when allowed, but two separate premises can require different dots.

**When to use it.** Use this in **Syllogisms / All, No and Some** questions when universal rules and existence claims must be combined to see which conclusions can follow.

**Key rule.** Put the smaller set inside the larger set for ‘all’ and keep sets separate for ‘no’. Place a member only where its existence is given.

#### Type 1 · Containment chain

**Question.** All signal fitters are technicians. All technicians are trained staff. Does it follow that all signal fitters are trained staff?

**Picture it.** Imagine a small box inside a bigger box inside the biggest box. Anything already in the small box must be inside both of the bigger boxes.

1. **Draw the first containment.** Place the signal fitter set inside the technician set. Any fitter selected is therefore a technician.
2. **Draw the second containment.** The technician set lies inside the trained staff set. The same selected fitter, being a technician, must be trained staff.
3. **Read the forced conclusion.** The chain is fitter ⇒ technician ⇒ trained staff. It works for any member of the fitter set.

**Answer:** Yes.

### Method B · Carry a given witness through the chain

If a dot is in A and A sits inside B, it is in B too. If B is disjoint from C, the same dot is outside C. State the result about that witness without upgrading it to all A.

**When to use it.** Use this in **Syllogisms / Tracing an Existing Member** questions when a premise says some member belongs to a set and other rules tell you where that same member must or cannot be.

**Key rule.** When a premise gives an existing member, carry that same member through each containment or exclusion rule.

#### Type 1 · Existence propagated through separation

**Question.** Some readers are editors. No editor is a trainee. What must follow about readers and trainees?

**Picture it.** Pick a reader who is also an editor and put a dot on that person. No one from the editor box can cross into the trainee box, so follow that dot.

1. **Use the existing witness.** “Some readers are editors” guarantees at least one person in both groups. Pick such a person.
2. **Apply the exclusion.** No editor is a trainee, so this reader–editor is outside the trainee group.
3. **State the conclusion at the right strength.** The witness is a reader outside the trainee set. This guarantees that some readers are not trainees, while other readers may still be trainees.

**Answer:** Some readers are not trainees.

### Method C · Build a minimal counterexample

To test whether “some A are B” and “some B are C” force A∩C, try two distinct B members. Put one in A and the other in C, leaving A and C disjoint.

**When to use it.** Use this in **Syllogisms / Testing an Uncertain Conclusion** questions when a conclusion links two sets and you need to see whether the premises allow one arrangement where the conclusion fails.

**Key rule.** A single allowed arrangement where the conclusion fails is enough to show the premises do not force it.

#### Type 1 · Two marks and an unsupported overlap

**Question.** Some A are B and some B are C. Must some A be C?

**Picture it.** Use two different dots in B. One can sit inside A and the other inside C. Both clues can be true even if A and C never touch.

1. **Separate the two existence claims.** The first “some” may refer to x, a member of A and B. The second may refer to a different person y, in B and C.
2. **Build a counterexample.** Take A = {x}, B = {x,y} and C = {y}. Both stated overlaps exist, but A and C are disjoint.
3. **Test necessity.** One valid arrangement where the conclusion fails is enough to show it does not follow.

**Answer:** No.

#### Type 2 · Reverse containment

**Question.** All freight engines are engines. Must all engines be freight engines?

**Picture it.** Imagine a bin for all toy engines. One corner holds the freight engines. An engine found in another corner still belongs to the engine bin.

1. **Translate the given direction.** Every freight engine lies in the broader engine set, so Freight ⇒ Engine.
2. **Test the reverse direction.** A passenger engine can belong to the engine set without belonging to the freight-engine set. Adding it leaves the original statement true.
3. **Judge the conclusion.** That counterexample rules out Engine ⇒ Freight as a guaranteed deduction.

**Answer:** No, the direction cannot be reversed.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| All A inside B, all B inside C | All A are C. |
| Some A in B and no B in C | Some A are outside C. |
| Some A in B, some B in C | Try separate witnesses before concluding overlap of A and C. |
| All A in B | Check the direction. This alone gives no claim that all B are A. |

## Exam tips

- **Separate all from some.** Do not add a member where a universal premise never asserted one.
- **Treat “some” as at least one.** It can include every member unless “some but not all” is stated.
- **Try a counterexample before choosing cannot-follow options.** One small diagram can settle the question.
