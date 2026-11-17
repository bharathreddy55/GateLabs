# SBI content corrections

Source text files were preserved. `scripts/build-sbi-corrections.mjs` creates three explicitly labelled practice reconstructions in `public/exams/sbi-corrections.json`.

- Practice set 8: corrected the two seating-clue sets to match the stated solutions. The left-to-right orders are **P W R T S V U Q** and **E C B D F A**. Repeated question stems belong to distinct passages and have distinct stable IDs.
- Mock 7, Q29: replaced one duplicated incorrect spelling distractor. **Connoisseur** remains the correct answer.
- 20 September shift 1, Q40: 45% corresponds to 378, total 840; 15% difference is **126**. Q45: 3/5 of 400 is **240**. Only duplicated incorrect distractors were replaced.
- 21 September shift 1, Q87/Q98: distinct direction/box-puzzle contexts now propagate to every question in their direction ranges. They are not duplicate questions merely because their stems match.

The UI labels altered memory-based material as practice reconstruction. None of these edits establish that a file is an official historical booklet or certify the correctness of every untouched source question. Editorial verification against an official final key remains necessary before making that claim.
