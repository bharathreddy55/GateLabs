# GateLabs workspace redesign

Implemented 17 November 2026.

## Navigation and page order

1. **Home**: resume a saved test or recent exam, see real device activity and choose an exam.
2. **Explore exams**: searchable directory of GATE CS, AP TET, APPSC Group 2, RRB Station Master and SBI Clerk.
3. **Exam preparation**: a direct sidebar shortcut to each exam.
4. **Study & review**: question practice, results and mistakes, formula notes and study assistant.
5. **More**: GATE study planner and device backup, community and app information.

Every exam now follows the same order: **Overview → Mock tests → Syllabus → Previous papers → My progress**. Only the selected panel is displayed. Tabs have shareable URLs such as `#/group2?tab=mocks` and preserve the exam context.

## Main changes

- Replaced the previous dashboard with a focused home page and a searchable exam directory.
- Rebuilt the shared shell with grouped navigation, a location indicator, inline SVG icons, visible focus states and a skip link.
- Replaced the permanent mobile sidebar with an opening drawer and backdrop. Escape and navigation close the drawer.
- Applied shared light and dark surfaces, readable type, consistent spacing and a single primary action style. Removed ambient glow and excessive animation from the workspace.
- Rebuilt the signed-out introduction while retaining the sign-in and registration form handlers. Added an icon-independent close control and associated labels.
- Consolidated existing TET and SBI text banks into the same paper-card workflow as Group 2 and Station Master. The original source files and their answer rules are unchanged. Invalid source papers remain visibly unavailable.
- Moved personal target editing and pattern details behind disclosures. Kept paper imports under an advanced disclosure.
- Kept GATE topic practice and year-wise bank practice reachable from GATE preparation. Removed duplicate TET cards from the GATE paper library. Year-wise pools are labelled question-bank practice rather than complete official papers.
- Moved the previous GATE syllabus, bookmarks, milestones and backup controls to `#/study-planner`, initially showing the syllabus.
- Added route loading feedback and a compact, scrollable question navigator in the exam room.
- Refreshed labels on practice, results and the assistant. Results navigation now returns to the list when the URL has no attempt ID.

## Implementation

- `src/config/navigation.js`: exam directory, navigation groups, page titles and inline icons.
- `src/pages/WorkspaceHome.js`: home and searchable exam directory.
- `src/pages/ExamPrep.js`: shared exam workspace and existing-bank adapters.
- `src/components/Layout.js`: shared shell, drawer and retained settings dialogs.
- `src/styles/workspace.css`: shared desktop/mobile and light/dark design.

Existing routes and storage IDs are retained. New sections reuse existing per-account progress, targets, imports and attempt snapshots. Existing tests continue to isolate live Firebase writes.

## Verification

- `npm test`: scoring, exact paper validation, account isolation and persistence checks.
- `npm run test:browser`: complete exam launch, answer, refresh, submission and review flow, including TET and SBI rules.
- `node tests/workspace.browser.mjs`: directory search, all five exam tabs, preserved SBI paper inventory, drawer interaction, light/dark appearance, mobile overflow, signed-out introduction and auth dialog.
- `npm run build`: production build.

Screenshots are saved in `artifacts/workspace/`. Live Firebase authentication and sync are outside the isolated browser checks. The existing PDF.js empty-chunk and Firebase bundle-size build warnings remain.
