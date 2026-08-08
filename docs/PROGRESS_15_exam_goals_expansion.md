# Progress 15 — Exam Goals: More Options

**Needs push to GitHub.**

Follow-up to step 11 (`PROGRESS_14`), per your feedback after trying the onboarding screen.

## What was done

Multi-select on exam goals already worked (independent toggle buttons, same mechanism as the subjects picker — confirmed in step 11's E2E run, where both WAEC and JAMB were selected together). What was actually missing was the *option list* itself, per your point that learners may target JAMB and WAEC together, or a local exam alongside a foreign one like IELTS.

- `mocks/academicProfileOptions.js` — `examGoals` expanded from `["WAEC", "JAMB", "NECO"]` to `["WAEC", "JAMB", "NECO", "NAPTEB", "IELTS", "TOEFL", "SAT"]`.

## Verified

- `npx eslint` clean.
- Loaded the module directly to confirm all 7 values present, no typos/duplicates.
- No mechanism change (still the same toggle-multiple pattern already verified end-to-end in step 11), so a full browser re-run wasn't repeated for what's purely a data-list addition.
