# Progress 02 — Mock Data Layer

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 2 ("Mock data layer §12").

## What was done

Added `src/mocks/` repository-shaped modules, each with plain data + accessor functions (same signature shape real API calls will take later, per §12):

- `tenants.js` (already existed from step 1) — 3 demo tenants (Greenfield Academy, Bluecrest College, Royal Heights School), distinct branding.
- `users.js` — one demo account per role (SuperAdmin, Admin, Tutor, Student) per tenant, plus one independent Learner (`tenantId: null`). Tutors carry `assignedClassIds`/`assignedSubjectIds` per the §3/§14 scoped-role model. `getUserById`, `findUserByEmail`, `listUsersForTenant`.
- `academicStructure.js` — sessions/terms/departments/classes/subjects, one structure per tenant, distinct naming per tenant (not one school renamed — greenfield uses JSS/SS, bluecrest uses Grade 7-10, royalheights a smaller set). `getAcademicStructure`, `listSessions`, `getCurrentSession`, `listClasses`, `listDepartments`, `listSubjects`.
- `questions.js` — global exam-body bank (WAEC/JAMB/NECO, tagged `examBody`/`year`/`subject`) + one private bank per tenant, same canonical question shape. `listGlobalQuestions`, `listTenantQuestions`, `getQuestionById`.
- `library.js` — global e-library + per-tenant resources with `accessLevel` demo states (`free`/`subscriber`/`school`). `listGlobalLibrary`, `listTenantLibrary`, `getResourceById`.
- `results.js` — 2 sessions of historical results per demo student, to support promotion-history UI later without promotion logic. `listResultsForStudent`, `listResultsForTenant`.
- `notifications.js` — per-user notification shell. `listNotificationsForUser`.
- `announcements.js` — per-tenant admin-authored announcements. `listAnnouncementsForTenant`.
- `auditLog.js` — per-tenant + platform (`tenantId: "platform"`) audit entries. `listAuditLogForTenant`.

Every module carries a `// BACKEND:` comment with the real endpoint shape, per the existing convention (§13).

## Verified

- `npx eslint src/mocks/*.js` — clean, no errors.
- Dev server still hot-reloads with no runtime errors (these modules aren't imported by any page yet, so nothing to break).

## Not done yet (deliberately, later roadmap step)

- **No existing page wired to these mocks yet.** `adminusers.jsx`, `adminclasses.jsx`, etc. still use their own inline dummy arrays. Roadmap §18 calls for gradual migration as `features/` absorbs logic — retrofitting every existing page now would be a much larger, separate change, not part of "build the mock layer" scope.
- Route-tree switching by `tenantType` — still roadmap §16 items 4+.
