## What it means

A syllogism tests whether a conclusion is forced by statements about sets. Represent categories as circles and use a mark for existence. “All” describes containment, “no” describes separation, and “some” asserts at least one member. Follow the stated groups even when the labels suggest different real-world facts.

## Formulas and rules

- **All A are B:** A is a subset of B. It does not reverse to “all B are A”, and a universal statement alone need not prove an A exists in standard logic.
- **No A are B:** A∩B is empty. This separation is symmetric.
- **Some A are B:** Mark at least one point in A∩B. “Some A are not B” places one in A outside B and does not reverse.
- **Validity check:** If any arrangement satisfies the premises and makes a conclusion false, the conclusion does not follow. Apply any explicit existence convention stated in the question.

## How to study it for Station Master

- Draw containment first, then separation, then place the existence marks. If a mark may sit on either side of a third circle, keep both alternatives open.
- Practise keeping separate “some” witnesses separate, and distinguish necessary conclusions from possible overlap. Verify on two diagrams if uncertain.

## Question models and worked examples

### Containment chain

**Question.** All signal fitters are technicians. All technicians are trained staff. Does it follow that all signal fitters are trained staff?

1. **Draw the first containment.** Place the signal fitter set inside the technician set. Any fitter selected is therefore a technician.
2. **Draw the second containment.** The technician set lies inside the trained staff set. The same selected fitter, being a technician, must be trained staff.
3. **Read the forced conclusion.** The chain is fitter ⇒ technician ⇒ trained staff. It works for any member of the fitter set.

**Answer:** Yes.

### Existence propagated through separation

**Question.** Some readers are editors. No editor is a trainee. What must follow about readers and trainees?

1. **Use the existing witness.** “Some readers are editors” guarantees at least one person in both groups. Pick such a person.
2. **Apply the exclusion.** No editor is a trainee, so this reader–editor is outside the trainee group.
3. **State the conclusion at the right strength.** The witness is a reader outside the trainee set. This guarantees that some readers are not trainees, while other readers may still be trainees.

**Answer:** Some readers are not trainees.

### Two marks and an unsupported overlap

**Question.** Some A are B and some B are C. Must some A be C?

1. **Separate the two existence claims.** The first “some” may refer to x, a member of A and B. The second may refer to a different person y, in B and C.
2. **Build a counterexample.** Take A = {x}, B = {x,y} and C = {y}. Both stated overlaps exist, but A and C are disjoint.
3. **Test necessity.** One valid arrangement where the conclusion fails is enough to show it does not follow.

**Answer:** No.

### Reverse containment

**Question.** All freight engines are engines. Must all engines be freight engines?

1. **Translate the given direction.** Every freight engine lies in the broader engine set, so Freight ⇒ Engine.
2. **Test the reverse direction.** A passenger engine can belong to the engine set without belonging to the freight-engine set. Adding it leaves the original statement true.
3. **Judge the conclusion.** That counterexample rules out Engine ⇒ Freight as a guaranteed deduction.

**Answer:** No, the direction cannot be reversed.
