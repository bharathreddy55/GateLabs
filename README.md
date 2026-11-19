# GateLabs

An exam preparation workspace for GATE CS & IT, APPSC Group 2 Prelims and Mains, RRB Station Master CBT and CBAT, and SBI Clerk Prelims.

Choose an exam to find its pattern, official source links, syllabus checklist, target countdown, practice papers and progress. Each runner uses the configured exam's marking rules. Full papers and section practice are distinguished. GATE study questions support MCQ, MSQ and numeric answers.

Results support review links, wrong/unanswered/bookmarked filters, missed-question revision and explicit device/cloud save status. Personal study notes and uploaded questions are account-scoped device data. Back up personal material regularly. AI is optional and requires a configured provider; generated explanations require checking.

## Development

Use Node.js 24.12 or newer and npm:

```sh
npm ci
npm run dev
npm test
npm run build
```

Browser checks use declared Playwright tooling. See package scripts and the CI workflow for browser and emulator setup. External provider and production Firebase services are not needed for fixture-based checks.

## Content and operations

- [Question bank publishing](docs/question-bank-publishing.md)
- [Content corrections and provenance](docs/content-corrections.md)
- [Protected AI proxy configuration](docs/ai-proxy-configuration.md)
- [QA review](docs/qa-review-2026-11-17.md)
- [QA remediation and remaining release checks](docs/qa-resolution-2026-11-18.md)

Model papers and memory-based reconstructions are labelled. Validation checks structure and marking rules; educational accuracy, current notification rules and syllabus coverage require independent review. User target dates are not official schedules.
