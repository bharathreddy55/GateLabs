# Exam sections and simulator

Implemented for the GateLabs hash-router application. Research snapshot: 15 November 2026; implementation verification: 16 November 2026.

## User flow

Sidebar → exam section → syllabus / sources / model paper → instructions → timed test → raw score and answer review → exam-specific history and bookmarks.

- `#/group2`: APPSC Group 2 screening, notification 37/2026. 150 MCQs, 150 marks, 150 minutes; five sections of 30; wrong answers deduct one third. The actual screening is OMR; this is an online practice simulation.
- `#/rrb-station-master`: dedicated Station Master CEN 08/2026. 100 MCQs, 100 marks, 120 minutes; indicative 30 basic science/maths, 30 data analysis, 20 logical capability, 20 mental reasoning. Wrong answers deduct one third. Older NTPC papers do not define this new pattern.
- Existing SBI prelims launches use 100 questions, 60 minutes, one-quarter deduction and three locked 20-minute sections (30 English, 35 numerical, 35 reasoning).
- GATE bank practice retains MCQ proportional penalties and zero MSQ/NAT penalties. An incomplete bank pool is labelled practice, not an official full paper.

The source URLs, version and research date live in `src/config/exams.js`. The research inventory is in `research/exams-2026-11-15/RESEARCH.md`. SBI and GATE pattern references are older published rule documents, not claims of newly verified recruitment dates.

## Implementation boundaries

| Responsibility | Location |
| --- | --- |
| Exam rules, syllabus taxonomy, date and paper-source links | `src/config/exams.js` |
| Count, section, key and option validation; scoring; IST date countdown | `src/utils/examEngine.js` |
| Safe structured bar/line/pie/scatter/Venn figures | `src/utils/examFigures.js` |
| Strict existing text-bank parsing and section aliases | `src/utils/parseExamText.js`, `src/utils/examAdapters.js` |
| Instructions, deadline timer, answers, review and submission | `src/pages/ExamRunner.js` |
| Backward-compatible import entry | `src/pages/MockTest.js` |
| New exam sections and paper import | `src/pages/ExamPrep.js` |
| Independent official/personal countdowns | `src/components/ExamCountdown.js` |
| Original model banks and reproducible authoring script | `public/exams/`, `scripts/build-exam-banks.mjs` |

No new backend service or secret is required. Attempts use the existing Firebase adapter, with a device copy retained before cloud saving. Deadline timestamps survive reloads. Missing answers score zero; negative totals are preserved. Answered-and-marked questions are scored. SBI section expiry is checked both by the timer and before accepting an answer. Imported content is escaped in the runner and analytics.

## Content and schedule limits

- One full-length **foundation** model is included per new exam, plus section drills. These are original introductory exercises, not official papers, predictions, or difficulty-calibrated test series. Every item has an answer, explanation and provenance. Structural validation does not certify expert editorial review.
- Group 2 model 1 includes a sourced **2025–2026 current-affairs snapshot checked 16 November 2026**, with ten AP, ten national and ten international questions. This is an editorial sample, not an exhaustive news digest or prediction. Update it for subsequent events. The AP budget webpage’s stale tables were excluded; amounts come from the official 2026–27 speech PDF.
- APPSC historical PDFs and final-key index are linked. They have not been transcribed into verified interactive PYQs. The large 2024 PDF and older scanned papers require question/key comparison and handling of deleted questions before import.
- Older railway archives are labelled supplemental/memory-based. A previous sitting for the new standalone Station Master notice was not established.
- CBAT is an information section, not a simulated aptitude battery. No fabricated T-scores, AIR, recruitment cutoffs or normalization are shown.
- Each exam uses its published schedule when available and supports a separately labelled personal practice target. Recheck official notices before changing dates or rules.

## Storage and existing history

New attempts use `gate_attempts:<uid>` for the existing history/adapter and `exam-results:<uid>` for recoverable runner reviews. Active tests use `exam-active:<uid>`. New-section checklists, imports, bookmarks and targets include both the user ID and exam ID. Progress, personal targets and imported banks are device-local. Cloud security rules and deployed Firebase access were not changed or live-tested.

The older unscoped `gate_attempts` key is preserved. **Mistake Analysis → Recover older device history** explicitly lets the owner copy their old records into the current account; records are not silently assigned to whoever signs in next. Legacy attempts remain unclassified unless they already have an exam ID. Existing dashboard backup uses the scoped attempt key.

Four existing SBI files fail the new validation and are intentionally rejected without altering the originals:

- `sbi_clerk_expected_2026_paper_8.txt`: duplicate question text at question 97.
- `sbi_clerk_mock_7.txt`: duplicate options at question 29.
- `sbi_clerk_pyq_2025_sep20_shift1.txt`: duplicate options at questions 40 and 45.
- `sbi_clerk_pyq_2025_sep21_shift1.txt`: duplicate question text at question 98.

## Adding a reviewed paper

Use the JSON shape in `public/exams/group2.json` or `public/exams/rrb.json`. Import one paper object through the section's JSON import control. The published bank file is an array of these objects. A question needs a stable ID, exact section name, topic, text, four distinct options, zero-based answer index, one mark, MCQ type, explanation and source. Optional `passage`, `table`, and structured `figure` fields preserve context. User-provided HTML/SVG is not executed.

Full-paper imports must satisfy every section quota, the total marks/count, and valid keys/options. Drills use the same scoring rule with shorter durations. Update the source, version and checked date when notification rules change; old active sessions with mismatched versions are not silently resumed under new rules.

## Verification

Run `npm test`, `npm run test:browser`, and `npm run build`.

The browser script uses Playwright from `PLAYWRIGHT_MODULE` (or the locally bundled Codex runtime) and Chrome from `CHROME_PATH` (or the Windows installation). It serves Vite-transformed files through an in-memory transport to work in socket-restricted environments. Firebase/auth are stubbed so tests cannot write production records. The persistence test executes the actual adapter with a stubbed Firebase SDK.

Verified: exact bank totals and section counts; missing/invalid keys; duplicate options; all exam penalties; unanswered and negative scores; GATE exact-set and numeric-range scoring; IST countdown boundaries; account isolation and idempotent saves; Group 2 launch/answer/reload/submit/reopen/bookmark; independent targets/checklists; RRB timeout; SBI section locking; mobile dark layout. Screenshots are in `artifacts/exams/`.

The production build retains existing empty PDF.js-chunk and Firebase bundle-size warnings. No deployment, commit, push or live-cloud test is part of this change.
