# Progress 08 — Tutor Grading Queue

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 7 ("Tutor portal"), first slice.

## Context

Checked existing tutor pages first — `dashboard.jsx`, `classes.jsx`, `manageexam.jsx`, `performance.jsx`, `questionbank.jsx`, `students.jsx` are all already substantial (300-700+ lines each). `analytics.jsx` is a deliberate 6-line redirect to `performance.jsx`, not a stub. The one genuinely missing piece against §8's named MVP gaps was the **grading queue** ("essay/manual-grade queue") — no route, page, or nav entry existed at all.

## What was done

- **`src/mocks/gradingQueue.js` (new)** — pending/graded submission records, tagged by `tenantId` + `classId` + `subjectId` + `studentId`. `listGradingQueueForTutor(tenantId, assignedClassIds)` filters to only classes the tutor is actually assigned to — enforcing the §14 rule ("role alone is never enough for a teacher, always check the assignment") in the UI layer, not just conceptually.
- **`globalcontext.jsx`** — added `assignedClassIds`/`assignedSubjectIds`, the tutor equivalent of the `classId` fix from step 6. Same root cause: the login form read these fields off the mock tutor record but never persisted them, so no tutor-facing screen could know its own scope.
- **`schoolLoginpage.jsx`** — now also calls `setAssignedClassIds`/`setAssignedSubjectIds` on successful tutor login.
- **`grading.jsx` (new)** — pending/graded stat tiles + a submissions list, each row resolving student name (`mocks/users`), class and subject name (`mocks/academicStructure`). Scoped to the logged-in tutor's own classes via context, not a hardcoded tenant-wide list.
- Wired: `grading` route in `tutorroutes.jsx`, "Grading" entry in `tutorNav` (`constant.jsx`).

## Verified

- `npx eslint` clean on all new/changed files (same 18 pre-existing `react-refresh` errors in `globalcontext.jsx`/`constant.jsx`, confirmed unchanged from step 6/7 — not new).
- Ran the actual scoping logic (`listGradingQueueForTutor`) as a standalone Node script against real mock data for all 3 tenants: Greenfield's tutor sees only their own pending Biology essay, Bluecrest's only their Chemistry submission, Royal Heights' only their (already-graded) Genetics essay — no cross-tutor or cross-tenant leakage.
- Headless Chrome: `/app/grading` unauthenticated still shows "Access Restricted" (gate unchanged).

## Not done yet

- No actual grading UI (open a submission, enter a score/feedback, mark graded) — this is a queue/list view only, matching the "UI shell" scope §8 explicitly calls for at MVP.
- Assessment lifecycle states (draft → published → active → closed → graded → results-released) — the queue treats submissions as already "submitted," doesn't model the earlier states. Separate, still-open §8 gap.
