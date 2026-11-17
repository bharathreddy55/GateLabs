# Exam research — 15 November 2026, Asia/Kolkata

Scope: research first; implementation deferred. User confirmed Andhra Pradesh APPSC Group 2.

## Authoritative specifications

- [APPSC detailed notification 37/2026](https://psc.ap.gov.in/Documents/NotificationDocuments/Group_II_Detailed_Notification_37_2026.pdf): dated 10 November 2026. Full screening syllabus is Annexure II, printed pages 42–43; selection and marking rules are in the same document. Screening: 150 MCQs, 150 marks, 150 minutes, minus one third per incorrect answer. Five equally weighted blocks: Indian History, Geography, Indian Society, Current Affairs, Mental Ability. Official screening is OMR; our online version must be described as practice. Date: 21 February 2027; exact session time not yet established here. Applications close 11 December 2026. Mains date pending.
- [Railway announcement confirming separate Station Master recruitment](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2329071&lang=1&reg=3).
- [Official CEN 08/2026 PDF](https://rrb.indianrailways.gov.in/-/image/1793016771817CEN_08_2026_StationMaster.pdf/examsDocuments) timed out in web retrieval; [readable notification mirror](https://karnatakahelp.in/wp-content/uploads/2026/10/RRB-Station-Master-Recruitment-08_2026-Detailed-Notification.pdf), printed pages 20–21, contains the full syllabus. Single CBT: 100 questions, 120 minutes, +1 and minus one third. Indicative allocation: science/maths 30, data analysis 30, logical capability 20, mental reasoning 20. Followed by CBAT, document verification and medical examination. CBAT requires T-score 42 in every battery, no negative marks; merit weighting is CBT 70%, CBAT 30%. CBT date not announced in this notification. Application deadline 25 November 2026 at 23:59. Do not reuse the old NTPC 90-minute pattern as the current Station Master pattern.

## Full syllabus acquisition and topic mapping

Use the complete annexures linked above as the source of truth, including every named subtopic. The following implementation taxonomy groups those topics; it does not replace the annexures.

APPSC: ancient/medieval/modern history; physical/economic/human geography with India and AP coverage; society structure, social issues and welfare; international/national/AP current affairs; logical reasoning, series/coding/relations/shapes, arithmetic and data interpretation. Keep current affairs dated and sourced; no official fixed lookback window was established. No standalone mains polity/economy block should be inserted into the prelims blueprint.

Station Master: arithmetic, algebra, geometry/trigonometry, basic probability/statistics and mechanics/electricity; multi-source textual/tabular/graphical interpretation including scatter plots, distributions, Venn diagrams and sufficiency; binary logic, syllogisms, calendars/clocks, assumptions, family relations and puzzles; English reading comprehension; analogies, series, coding, rankings and arrangements. Preserve English passages as required by the notice. Do not add a legacy NTPC general-awareness section. No official suballocation between comprehension and logic is specified.

## Previous-paper inventory

- APPSC 25 February 2024 screening: [full booklet with final key, mirror](https://bloomappsc.com/documents/Group-II-Screening_FinalKey.pdf). Final key publication 10 April 2024, confirmed by [official key index](https://portal-psc.ap.gov.in/Homepages/keystopapers). Prefer final over initial key. Large PDF could not be parsed by the web tool; key circles and cancelled questions require visual inspection before import.
- [2019 bilingual screening PDF](https://bloomappsc.com/documents/G2_PRE_2019_SCREENING_BILINGUAL.pdf), 35 pages; [2017 bilingual screening PDF](https://bloomappsc.com/documents/G2_PRE_2017_SCREENING_BILINGUAL.pdf), 40 scanned pages. Older pattern; answers need independently sourced final keys. They are topic sources, not exact current-pattern mocks.
- [APPSC archive](https://bloomappsc.com/exam/appsc-group-2-previous-papers.html) also indexes 2008/2011/2017/2019 mains and 2025 mains. Keep mains separately labelled.
- [RRB paper archive](https://www.careerpower.in/rrb-ntpc-previous-year-question-papers.html): date/shift/language links for 2016, 2021, 2025 and 2026 CBT papers, including graduate CBT2. Publisher describes memory-based material; do not label all of it official.
- [Alternative RRB archive](https://career.aglasem.com/railway/rrb-ntpc/previous-papers): graduate/undergraduate and stage-labelled PDFs. Validate each paper and answer key before importing.
- New standalone CEN 08/2026 has no previous sitting established as of this research date. Older NTPC papers supply overlapping maths/reasoning practice only. New-pattern original mocks are necessary for data interpretation, basic science and English comprehension coverage.
- [Official RDSO aptitude guide](https://rdso.indianrailways.gov.in/works/uploads/File/ASM_guidline.pdf) and [FAQ](https://rdso.indianrailways.gov.in/uploads/File/FAQ%20.pdf) located. Guide retrieval timed out. CBAT is a separate battery-based exercise, not an ordinary MCQ paper; verify current battery instructions before building it. Do not invent T-scores from raw accuracy.

## Separate countdown requirements

Each section needs its own exam ID, recruitment cycle, date source, checked date, timezone, date precision and status. Group 2 can use 21 February 2027 as a date-only target until the session is published. Station Master must show awaiting exam schedule, not count down to the application deadline as an exam.

[Official regular AP TET June 2026 timetable](https://tet2dsc.apcfss.in/TET-PDF/PressNote/APTET-%20JUNE%202026%20PRSS%20NOTE%20-1.pdf) originally lists 5–21 August 2026, already past. Separate special in-service TET and DSC recruitment exist; do not substitute their dates for regular TET. No next regular TET future date was verified. Use awaiting announcement, with optional clearly labelled personal target date. Recheck [official portal](https://tet2dsc.apcfss.in/) before implementation.

## Requirements for reliable mock production

Create separate Group 2 and Station Master routes/sidebar entries modelled on the TET section, each with syllabus, pattern, original mocks, labelled PYQs, attempts and its own countdown. Use full-length and subject drills. Save examId, cycle, stage, paperId, source URL, original question number, language, syllabus topic, options, validated answer, explanation, marks and penalty. Preserve passages/diagrams and final-key amendments. Missing answers must remain unscored/unpublished rather than defaulting to A. Track review/approval status and question provenance; original generated mocks must be labelled as such.

Use exact one-third internally and round only the displayed total. Blank answers score zero. Calculate total marks from the actual paper. Retain per-question responses and timing for analytics. No simulated AIR, official normalization or qualifying cutoff claims from a small local sample. Category minimum qualifying percentages are not selection cutoffs.

Existing blockers found in prior project review: MockTest.refresh assigns an async render Promise to HTML; external launchers omit activeView=console; scorer substitutes 74.33 for zero score and does not end isTesting; attempt records omit responses/mistakes; text importer omits type and fifth options; engine uses fixed GATE title, sections and diagnostics. Resolve these when implementing the new sections. Keep user data scoped by user and exam, and preserve existing uncommitted question-bank work.

Research is sufficient for feature planning. Bulk PYQ transcription, answer validation, translation review, current-affairs authoring and live UI implementation remain separate production work. No claim that all archived papers have been imported or solved.
