# Progress 20 — Global Question Bank & Library Management (Super Admin)

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 12 ("Super Admin refinements") — closes the last remaining named gap flagged in `PROGRESS_19`: global question bank/library management.

## What was done

- **`mocks/questions.js` / `mocks/library.js`** — added `loadGlobalQuestions`/`saveGlobalQuestions` and `loadGlobalLibrary`/`saveGlobalLibrary`, `localStorage`-backed under a single shared key each (genuinely global — same for every tenant and every independent learner, unlike the per-tenant-namespaced keys from steps 11/13). `listGlobalQuestions`/`listGlobalLibrary` now read through this persisted-or-seed layer internally, so every existing consumer (`adminquestionbank.jsx`'s Global Exam Bank section, `books.jsx`'s E-Library) picks up Super Admin's additions automatically, with no changes needed at those call sites.
- **`superadminquestionbank.jsx` (new)** — add/remove screen for MatLearn's shared exam-body bank, plus bulk upload:
  - CSV file upload (reused the parsing approach already proven in the tutor's question bank).
  - **Import from a URL** (API or hosted CSV) via `fetch()`, with an inline note that a real backend would do this server-side to avoid CORS, since a browser-side fetch only works if the source allows cross-origin requests.
  - Downloadable sample CSV template matching the exact columns the parser expects.
  - Exam-body filter chips and Subject field both pull from the **existing shared option lists** (`examGoals`, `subjects` in `mocks/academicProfileOptions.js`) instead of a new hardcoded list — this fixes a mistake I made mid-build (hardcoded only 4 exam bodies) that you caught; now all 7 (WAEC/JAMB/NECO/NAPTEB/IELTS/TOEFL/SAT) are selectable, matching the same list used everywhere else in the app.
- **`superadminlibrary.jsx` (new)** — add/remove screen for MatLearn's shared library, same link-based (not file-upload) pattern as the tenant-level admin library from step 13.
- Wired: `super-admin-question-bank` and `super-admin-library` routes, matching nav entries.

## Verified

- `npx eslint` clean — caught and fixed a real syntax error along the way (invalid `text: questionText` array-destructuring rename; array destructuring can't rename like object destructuring can — fixed before it ever reached the browser).
- Scripted a real browser run (puppeteer-core, `--no-save`, uninstalled after) against a temporary local dev server (had to restart it — and briefly patch `vite.config.js` with `watch: { usePolling: true }`, reverted immediately after — the box's inotify watcher limit was fully exhausted this time by another process, a recurring environment issue from earlier in this session):
  - Subject field confirmed to render as an actual `<select>`.
  - All 7 exam-body filter chips confirmed present (not just 4).
  - Uploaded a real CSV file (2 questions, including a SAT and an IELTS question) — both appeared with the correct import-count message.
  - Imported from a URL — spun up a tiny local CORS-enabled CSV server, fetched from it, confirmed the question count increased correctly (4 seed + 2 file + 2 URL = 8).
  - Confirmed a school admin's existing `/app/admin-question-bank` screen and the student/tutor `/app/books` E-Library both still render correctly and reflect Super Admin's additions, without needing any changes to those files.
  - Cleaned up all test data, temp files, and the temporary server after.

## §16 item 12 status: complete

All 3 named gaps now closed: global question bank/library management (this), platform audit log (`PROGRESS_16`/`17`), tenant-creation onboarding hookup (`PROGRESS_19`). No remaining flagged items for this roadmap step.
