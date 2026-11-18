# QA remediation record — 18 November 2026

The code changes addressing QA-01–QA-17 in [the original review](qa-review-2026-11-17.md) have been implemented, tested, committed and pushed individually to `main`. The visual, accessibility, storage and CI recommendations also have implementations below. External release checks remain explicitly open; this record does not certify production permissions or educational answer keys.

## Numbered findings

| Finding | Result | Initial fix |
| --- | --- | --- |
| QA-01 | Plain text and attributes escaped across imported content, notes, formulas, practice and assistant responses; limited Markdown cannot execute supplied HTML. | `d77e402` |
| QA-02 | Device/cloud save status, failures, export, retry and pending sync; deletion preserves copies on failure. Follow-ups cover archived and unsynced deletion. | `6701d85`, `1b5e5cd` |
| QA-03 | Account-scoped personal data and AI settings; old unscoped data is not silently assigned. In-flight saves retain their original owner. | `1df4307`, `00f4fe8` |
| QA-04 | Hosted AI requires a verified Firebase token, shared quota enforcement, bounded payload/model/output and upstream timeout. Configuration instructions are included. | `855999a` |
| QA-05 | One typed parser preserves fifth options, MCQ/MSQ/NAT keys and context; incomplete keys are quarantined instead of guessed. | `22c428f` |
| QA-06 | Shared typed answer controls and evaluation across practice, bookmarks and timed exams. | `b90a1fa` |
| QA-07 | Disconnected/error/retry assistant states preserve the question; fabricated fallback explanations removed. Safe Markdown and locally rendered math supported. | `b6f0515` |
| QA-08 | One merged account-scoped history repository for Home, progress and analytics, with offline status. | `17978a2` |
| QA-09 | Versioned validated backup/merge covers all exams and personal material, excludes AI keys and requires explicit account restore confirmation. Full IndexedDB archive is included. | `fde3e16`, `312ebf7` |
| QA-10 | Auth restoration retains the requested route and query. | `cdbae0c` |
| QA-11 | Invalid storage shapes recover without overwriting original data; recovery export is available. | `9b57bea` |
| QA-12 | Saved answer review loads by stable attempt ID in the URL and survives refresh. | `977cfc2` |
| QA-13 | Answer and review palette status updates immediately, including accessible labels. | `3bf7353` |
| QA-14 | Shared SBI puzzle/passages retained; corrected practice reconstructions are labelled and exposed. Original files retained. Structural tests pass; official-key certification remains open. | `b578c87`, `fafcefa` |
| QA-15 | Published versioned subject shards and cached reads replace browser-triggered imports/Firestore scans. Uploads remain personal. Publishing validates committed content and quarantines incomplete records. | `e8de8d1` |
| QA-16 | Local lazy math/PDF libraries, bundled icons, readable retry/fallback errors; real PDF extraction tested with external CDNs blocked. | `fb17ff4` |
| QA-17 | Shared accent tokens with contrast-aware reading colours and button foregrounds across light/dark themes. | `a1b836f` |

## Broader recommendations

- Formula cards use native keyboard disclosures and natural height; search has an accessible name (`1d93448`).
- Paper libraries filter by type/status, sort ready papers first, show section coverage and disclose source notes (`fafcefa`). Difficulty is honestly marked uncalibrated.
- Result review filters wrong, unanswered and bookmarked questions and launches missed-question revision; results distinguish full mocks and section practice (`97ce68a`).
- Exam tabs have standard keyboard behaviour, selected state, automatic visibility and a mobile continuation cue; progress shows section counts and last practice date (`b2a7411`).
- Community is labelled personal device-local study notes; fake default posts and leaderboard removed (`c03ca69`).
- About stays within the signed-in shell; README, metadata, surfaces and reading sizes describe all five exams (`db098a2`).
- Drawers and dialogs contain focus, make the background inert, close with Escape and restore focus (`c995bc6`).
- Mobile syllabus headings and revision counts wrap, with workspace captions at least 12 px. Acceptance checks inspect the actual syllabus content bounds rather than relying only on hidden page overflow (`52ae651`, `9ae1013`).
- Firestore owner/publisher rules and demo emulator regression tests are in the repository (`84a6222`, `1b5e5cd`).
- Browser tooling is declared and CI runs unit/build/browser plus emulator checks (`f973196`, `fd53e01`).
- Routes load on demand and charts are destroyed when leaving their pages (`2a624d0`).
- Full attempts use IndexedDB with a bounded cache; full backup, ownership, sync retries and archive deletion are covered (`312ebf7`, `00f4fe8`, `1b5e5cd`).
- Dependencies updated; the patched gRPC override and direct checksum-verified emulator remove all reported npm advisories (`3176053`, `3204764`). See [dependency verification](dependency-verification-2026-11-17.md).

## Verification and its limits

- `npm test`: 26 tests pass, including scoring, parsing, injection, storage, backup, ownership and API failure checks.
- `npm run test:browser:all`: exam workflows, five workspaces, delayed authentication, PDF/math/archive/backup checks and a 15-route UI acceptance suite.
- `npm run test:rules`: actual local Firestore emulator verifies owner isolation, constrained queries, publisher authorization, denial for anonymous users and safe deletion of unsynced attempts.
- `npm run build`: production build passes with lazy route/library chunks.
- `npm audit` and production-only audit: zero reported vulnerabilities. The final full-tree report is [saved here](../artifacts/npm-audit-final-2026-11-17.json).
- GitHub Actions has passed on the remediation commits, including [the dependency/emulator change at `3204764`](https://github.com/bharathreddy55/GateLabs/actions/runs/44205647428). The final run should be checked against the latest pushed SHA before release.

Browser suites use real application modules with fixture auth/cloud/provider boundaries and Chromium. Emulator tests use `demo-gatelabs`, never production. Use Node.js >=24.12 and Java 21+; the local Node 24.11.1 runtime emits an engine warning despite passing the exercised checks.

## Open external release checks

1. Deploy and independently verify Firestore rules and hosted AI configuration in the intended test/production project. Real signup, sign-in, reset, multi-device sync and paid provider calls have not been exercised. See [Firestore permissions](firestore-permissions.md) and [AI proxy configuration](ai-proxy-configuration.md).
2. Subject-expert review of answer correctness, full syllabus coverage and difficulty remains necessary. SBI reconstructions are practice resources, not verified official booklets. See [content corrections](content-corrections.md).
3. Actual screen-reader testing, Firefox/WebKit/iOS Safari, measured Lighthouse/network performance and production load/header checks remain unverified. The automated keyboard and contrast checks do not establish formal WCAG conformance.

Pre-existing uncommitted PYQ additions were preserved and excluded from these commits.
