# Progress 21 — Global Question Bank: URL Import Uses JSON, Not CSV

**Needs push to GitHub.**

Correction to `PROGRESS_20`, per your feedback: the browser naturally parses JSON from a fetched link — that's the correct format for the "import from URL/API" path, not CSV. CSV stays for the local file-upload path (the natural format for a spreadsheet export).

## What was done

- **`superadminquestionbank.jsx`** — `importFromUrl` now calls `parseJsonQuestions` (`JSON.parse` an array of question objects) instead of `parseCsvQuestions`. Added `getSampleJson()`/`downloadSampleJson()` — a "Download sample JSON" link next to the URL field, plus an inline note spelling out the exact expected shape (`examBody, year, subject, topic, text, options[], answer, difficulty`) right under the input, so it's visible without downloading anything.
- Updated the `BACKEND CONTRACT` comment to state the import endpoint expects JSON.
- CSV file upload (`importFromFile`) and the CSV sample template are untouched — still CSV, since that path is about uploading a local file, not fetching from an API.

## Verified

- `npx eslint` clean.
- Scripted a real browser run (puppeteer-core, `--no-save`, uninstalled after; dev server needed a restart with a temporary `vite.config.js` polling patch again, reverted immediately after — same recurring inotify exhaustion as `PROGRESS_20`):
  - Spun up a tiny local CORS-enabled **JSON** server, imported from it — both questions appeared with the correct import-count message.
  - "Download sample JSON" doesn't crash.
  - Re-confirmed CSV file upload still works unaffected by the URL-path's format switch.
  - Cleaned up all test data and the temporary server after.
