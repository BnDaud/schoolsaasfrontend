# Progress 11 — Tenant-Aware Question Bank / Assessment Engine

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 9, the part explicitly deferred in step 10 (`PROGRESS_10`). Per instruction: since no later roadmap step covers this, fixing it now before moving on, rather than leaving it as permanent unfinished business.

## The bug being fixed

`src/utils/tutorQuestionBank.js` was a genuinely well-built shared engine — already consumed by both admin and tutor question-bank/exam screens (`adminquestionbank.jsx`, `adminexams.jsx`, `tutorpages/dashboard.jsx`, `tutorpages/manageexam.jsx`, `tutorpages/questionbank.jsx`) — but entirely **tenant-agnostic**: one hardcoded `tutorAssignments` constant (JSS1/Mathematics, SS3/Physics, SS2/Chemistry) for every tutor on every tenant, and one **global `localStorage` key** for saved questions. Since this demo's multi-tenancy is driven by `?tenant=` on the same browser, that global key meant a tutor's saved question at Greenfield would leak into Bluecrest's bank the moment you switched tenants — a real cross-tenant data bug, not hypothetical.

## What was done

Rewrote `tutorQuestionBank.js`'s exports as functions parameterized by resolved tenant/tutor data instead of module-level constants:

- `resolveTutorAssignments(tenantId, assignedClassIds, assignedSubjectIds)` — resolves a tutor's real assigned IDs (from step 7/8's `assignedClassIds`/`assignedSubjectIds` context fields) into real `{className, subject}` pairs via `mocks/academicStructure`, replacing the hardcoded constant.
- `mergeTutorAssignments(...)` — dedupes multiple tutors' assignments for school-wide (admin) views.
- `buildQuestionBank`, `buildInitialExams`, `getClassOptions`, `getSubjectsForClass`, `getDefaultAssignment` — same generation logic as before, now taking the resolved assignments as a parameter instead of closing over the old constant.
- `loadTutorQuestionBank`/`saveTutorQuestionBank` — `localStorage` key namespaced per `tenantId` (`school-tutor-question-bank:{tenantId}`), fixing the cross-tenant leak directly.
- Added a `Biology` entry to `topicsBySubject` (2 of 3 demo tutors teach it; was missing and would have crashed `buildQuestionBank`).

Updated all 5 consumers to compute the resolved assignments via `useContext`/`useMemo` and pass them through — same variable names in local scope, so each file's actual rendering/interaction logic is untouched. Admin's two screens (`adminquestionbank.jsx`, `adminexams.jsx`) aggregate across *every* tutor in the tenant (`listUsersForTenant` + `mergeTutorAssignments`), correctly showing school-wide coverage rather than one tutor's view.

## Verified (properly, given the stakes)

This touches live, interactive, `localStorage`-backed state — the actual exam-authoring feature this branch is named for — so `curl`/headless-dump-dom wasn't enough. Installed `puppeteer-core` (`--no-save`, package.json/lock untouched, confirmed via `git status`; uninstalled again after) and scripted a real end-to-end run against the live dev server:

- Logged in as each of the 3 tenants' tutors — each sees their own **real** assignment (Greenfield: SS2 Science / Biology, Physics — not the old hardcoded JSS1/SS3/SS2).
- Added a question as Greenfield's tutor, confirmed it appears immediately, confirmed it **survives a full re-login** (real persistence).
- Confirmed Bluecrest's tutor's bank does **not** contain Greenfield's question — the exact cross-tenant leak this fix closes.
- Confirmed Manage Exams shows the real class name and never the old hardcoded "JSS1 Mathematics".
- Confirmed the tutor dashboard, admin question bank (with the "Global Exam Bank" section from step 10 still intact), and admin exams all render correctly against the same real data.
- Zero `pageerror` events across the entire scripted run (login × 4, question add, reload, 3 tenant switches, admin views).
- `npx eslint` on all 6 touched files: 0 new errors (3 pre-existing `motion`-unused errors confirmed via `git stash` to predate this change, in files this fix didn't need to touch that logic in).

## Not done yet

- `manageexam.jsx`'s question-selection interaction (choosing questions for a new exam) wasn't separately scripted beyond confirming the page renders the right class/subject data — lower risk since it reads from the same now-verified `buildQuestionBank` output.
- Tutor's dashboard `classPerformance`/`topPerformers`/`studentsNeedingAttention` tables are still separate, unrelated static illustrative data (not part of the shared engine, out of scope for this fix).
