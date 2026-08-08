# Progress 14 — Independent Learner Academic-Profile Onboarding

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 11 ("Public MatLearn platform"), first slice — closes a gap this session itself flagged back in step 3 (`PROGRESS_03`): registration signed a learner in but had nowhere to route them, since `/onboarding/academic-profile` didn't exist.

## What was done

- **`mocks/academicProfileOptions.js` (new)** — plain, tenant-agnostic option lists (education levels, departments, subjects, exam goals). Deliberately separate from `mocks/academicStructure.js` (a school tenant's admin-managed structure) — an independent learner has no tenant, no `classId`/`departmentId` to resolve against, per roadmap §0 assumption 3 (self-managed vs school-managed profile, same underlying shape).
- **`globalcontext.jsx`** — added `academicProfile`/`setAcademicProfile` (default `null`).
- **`academicProfileOnboarding.jsx` (new)** — education level + department selects, subject and exam-goal multi-select (toggle buttons). Submitting sets `academicProfile` in context and returns to `/`. No learner dashboard exists yet to route into instead — that's a separate, later piece of this same roadmap item.
- **`learnerRegisterpage.jsx`** — now actually navigates to `/onboarding/academic-profile` after signup instead of straight to `/`, closing the exact gap flagged in step 3's progress doc.
- Wired: `/onboarding/academic-profile` route (top-level, own full-page layout, not nested under the split-screen `Auth` shell).

## Verified

- `npx eslint` clean (1 pre-existing `globalcontext.jsx` error, confirmed baseline from step 6).
- Scripted a real browser run (puppeteer-core, `--no-save`, uninstalled after — `git status` confirms `package.json`/lock untouched): registered a new learner, landed on `/onboarding/academic-profile`, selected an education level, two subjects, and two exam goals, submitted, confirmed it lands back on `/` with the onboarding form gone. Zero browser errors.

## Not done yet (explicitly deferred, same roadmap item)

- No learner dashboard/account page to route into post-onboarding — still lands on the public home page.
- Practice, subjects, library, AI Tutor placeholder for the public platform (the rest of §16 item 11) — not started.
- `academicProfile` isn't consumed anywhere yet (e.g. to filter practice/library by the learner's own subjects) — that only becomes relevant once those screens exist.
