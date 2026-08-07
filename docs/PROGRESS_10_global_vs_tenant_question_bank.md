# Progress 10 — Global vs Tenant Question Bank Distinction

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 9 ("Question bank + assessment engine"), scoped down after a risk check.

## Why scoped down from the full roadmap item

§16 item 9 in the roadmap describes building one shared assessment engine that admin/tutor/student screens all consume. Investigated first: the existing codebase **already has** a shared engine at `src/utils/tutorQuestionBank.js` — 120 procedurally-generated questions plus `localStorage`-backed persistence, already consumed by both `adminquestionbank.jsx` and the 738-line `tutorpages/questionbank.jsx`, and very likely wired into the live exam/practice-taking flow (`manageexam.jsx`, `studentexams.jsx`, `studentpractice.jsx`, `component/exam/exampage.jsx`, `component/practice/practiceQuestion.jsx`).

That engine is tenant-agnostic (one global bank, no `tenantId` anywhere) and stateful (real `localStorage` persistence backing what's very likely the actual exam-taking feature this branch is named for). Retrofitting it to be tenant-aware and reconciling it with this session's `mocks/questions.js` would mean touching several files that back live, interactive, currently-working functionality I haven't fully traced — real risk of breaking exam-taking for a "move to next" autonomous step, not a decision to make silently.

Deferred that retrofit explicitly (flagging it here rather than attempting it) and instead closed a smaller, safe, concretely-named gap from the same roadmap area: **"Global vs tenant question bank distinction"** (§9's MVP list) — `mocks/questions.js` (built in step 2: global WAEC/JAMB/NECO bank + one private bank per tenant) sat completely unused until now.

## What was done

- **`adminquestionbank.jsx`** — added two new sections, purely additive (existing `tutorAssignments`/`questionBank`-based section untouched, zero risk to that data or its consumers): "Global Exam Bank" (WAEC/JAMB/NECO counts from `listGlobalQuestions()`) and "This School's Private Bank" (`listTenantQuestions(tenantId)`), visually distinct so it's clear which bank is which per §9's ask.

## Verified

- `npx eslint` clean.
- Ran the actual data calls (`listGlobalQuestions`, `listTenantQuestions`) as a standalone Node script for all 3 tenants — global bank identical (WAEC/JAMB/NECO) across tenants as it should be, private bank distinct per tenant (Greenfield: Biology/Cell Structure, Bluecrest: Chemistry/Periodic Table, Royal Heights: Biology/Genetics).
- Headless Chrome: `/app/admin-question-bank` unauthenticated still shows "Access Restricted" (gate unchanged); dev server HMR picked up the change with no new errors.

## Not done yet (explicitly flagged, not silently skipped)

- The actual shared-engine unification/tenant-aware retrofit of `utils/tutorQuestionBank.js` and its consumers — this is the bigger, riskier piece of §16 item 9. Recommend treating this as its own reviewed decision, not another "move to next" autonomous step, since it touches live exam-taking state.
- Tutor's question bank page (738 lines) untouched.
