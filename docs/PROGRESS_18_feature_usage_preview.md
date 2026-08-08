# Progress 18 — Feature Usage Preview (AI Tutor, etc.)

**Needs push to GitHub.**

Follow-up to `PROGRESS_17`, per your request to add it back after all.

## What was done

Added a "Feature Usage" section to `superadminlearners.jsx`, explicitly labeled **Preview** with dashed-border styling to visually distinguish it from real data — AI Tutor Sessions, Practice Attempts, Library Opens, all showing `—` placeholder values with an inline note that real tracking needs backend instrumentation, landing with the AI Tutor feature itself.

Deliberately not faked with plausible-looking numbers — every other AI Tutor touchpoint in this app (student/tutor placeholders) is honestly labeled "coming soon," and this should match that, not pretend to have real telemetry.

## Verified

- `npx eslint` clean.
- Headless Chrome confirms the section renders with all 3 metrics and the explanatory note.
