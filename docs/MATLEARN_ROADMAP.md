# MatLearn — Product Understanding, Architecture & Frontend Roadmap

**Status:** Planning document. Not implementation. Local file only — not committed/pushed automatically (contains product strategy; commit/push is your call).

**Owner org:** VectoredMatrix. **Product:** MatLearn (multi-tenant school SaaS + public exam-prep platform).

---

## 0. Stated Understanding & Assumptions

**Understanding, in one paragraph:** MatLearn is one frontend codebase serving two audiences under one brand. First, schools (tenants) get a white-labeled website + LMS/exam portal that feels like their own product, resolved by hostname (subdomain now, custom domain later). Second, MatLearn itself runs a public exam-prep platform (WAEC/JAMB/NECO practice, e-library, eventually AI Tutor) for independent learners who have no school affiliation. A third, separate surface — MatLearn Super Admin — operates the whole platform, provisions tenants, and sees platform metadata but never a tenant's private academic data. All three surfaces share one design system and one codebase; none shares a login boundary with another (a credential valid on one surface must be rejected on the others — this was the original bug that started this project).

**Assumptions made (flag if wrong):**

1. Tenant resolution is **hostname-based**, not slug/path-based (you confirmed this earlier). `school-a.matlearn.com` and eventually `www.school-a.com` both resolve to the same tenant config.
2. One person = one account = one scope. A user is a School Admin *or* Teacher *or* Student *or* Independent Learner *or* Super Admin — not several at once. (If a real person needs two hats, e.g. a school admin who's also a parent, that's two accounts. Revisit if wrong.)
3. "Independent learner" and "school student" are the same underlying `User`/`LearnerProfile` shape with different *authority* over the academic-profile fields (self-managed vs school-managed) — not two different data models.
4. Payments/subscriptions are Phase 2+ for the public platform; MVP ships with demo subscription states only, per your instruction.
5. No backend exists yet. Every screen ships against realistic mock data plus a `BACKEND:` contract comment — no fake fetch calls pretending an API exists.
6. Custom domains (`www.school-a.com`) are a later capability; MVP targets subdomain-only tenant resolution, architected so custom domains slot in without a rewrite (DNS/CDN concern, not a frontend rewrite).

---

## 1. Recommended SaaS Architecture

```
Request (hostname)
   │
   ▼
Edge / CDN — TLS termination, routes *.matlearn.com and mapped custom domains to one app
   │
   ▼
Tenant Resolver (runs before app renders)
   │  input: hostname
   │  output: { tenantId, tenantType: "school" | "matlearn" | "matlearn-admin" }
   │  - subdomain.matlearn.com        → tenantType "school", tenantId = subdomain
   │  - matlearn.com / www            → tenantType "matlearn" (public platform)
   │  - admin.matlearn.com            → tenantType "matlearn-admin" (super admin, own hostname —
   │                                     confirms your "super admin isn't under /app/" call, taken
   │                                     one step further: it isn't even under the same host)
   │  - custom domain (Phase 2)       → looked up via a domain→tenantId map fetched once at edge
   ▼
Tenant Config Fetch (mocked now, API later)
   │  branding, enabled landing sections, feature flags, plan limits
   ▼
Theme Provider (CSS vars from tenant config — extends what's already in globalcontext.jsx)
   ▼
Route Tree for that tenantType (three distinct route trees — see §5)
   ▼
Auth Guard (role + tenantId scope check, not just role — see §16)
   ▼
Page
```

One codebase, one deploy. "Which tenant" is a runtime lookup, not a build-time or folder-time decision — adding School #500 is a database row, never a new frontend project.

---

## 2. Tenant / Domain Strategy

| Stage | Mechanism | Notes |
|---|---|---|
| MVP | `*.matlearn.com` wildcard subdomain, resolved by a small tenant-lookup step (mocked as a JSON map today, an API call later) | Matches your no-slug constraint |
| Phase 2 | Custom domain (`www.school-a.com`) | School points a CNAME at MatLearn's edge; edge/CDN maps the incoming `Host` header to the same tenant lookup. **No new frontend deploy** — same resolver, one more entry in the domain→tenant map |
| Always | `matlearn.com` (bare) | Public platform — not a tenant, its own `tenantType` |
| Always | `admin.matlearn.com` (or a non-guessable internal path if a subdomain isn't available yet) | Super Admin — isolated host, separate from both tenant and public traffic |

Frontend never treats `tenantId` as a security boundary (per §35 of your spec) — it's routing/theming context only. Every real authorization decision is a backend concern; the frontend's job is to *not lie* about what's available, not to *guarantee* privacy.

---

## 3. User / Role Model

```
Platform (VectoredMatrix / MatLearn)
   │
   ├── Super Admin           — platform operator, zero tenants, sees metadata not academic data
   │
   ├── Tenant: School A
   │      ├── School Admin   — full control of School A's config/users/content
   │      ├── Teacher/Tutor  — scoped to assigned classes/subjects only
   │      ├── Staff          — narrower admin subset (future: registrar, bursar-style roles)
   │      └── Student        — scoped to own academic records only
   │
   ├── Tenant: School B  (identical shape, zero visibility into School A)
   │
   └── Independent Learners (no tenant)
          └── Learner (self-managed academic profile; may hold a subscription)
```

Roles are **scoped**, never global. `role: "Teacher"` is meaningless alone — it's always `(role, tenantId, [assignedClassIds], [assignedSubjectIds])`. This is the fix generalized from the login-endpoint bug: authorization checks must always be `role AND tenant match AND assignment match`, never `role` alone.

---

## 4. Complete Route Architecture

Three top-level route trees, matched by `tenantType` from the resolver — **not** three separate apps.

### 4.1 Public MatLearn (`matlearn.com`)

```
/                          landing
/about
/pricing
/exams                     browse exam bodies (WAEC/JAMB/NECO/...)
/exams/:examId             years + subjects available for that exam
/exams/:examId/:year/:subject/practice   practice session
/practice/history          learner's past attempts across all exams
/practice/history/:attemptId              review a specific attempt
/subjects                  browse-by-subject entry point (alt path into same content)
/library
/library/:resourceId
/ai-tutor                  polished "coming soon" placeholder
/for-schools               marketing page selling the school SaaS side
/pricing/schools
/login
/register                  independent learner signup → academic-profile onboarding
/onboarding/academic-profile
/subscribe
/account
/account/profile
/account/academic-profile
/account/subscription
/forgot-password
```

### 4.2 School Tenant (`school-x.matlearn.com`)

**Public (unauthenticated) side:**
```
/
/about
/academics
/staff
/admissions
/blog
/blog/:slug
/events
/gallery
/contact
/login
/forgot-password
```

**Student app** (`/app/student/...` — keeping your existing `/app/` convention for tenant-authenticated space):
```
/app/student/dashboard
/app/student/subjects
/app/student/subjects/:subjectId
/app/student/tests                 assigned, not yet taken
/app/student/tests/:testId
/app/student/exams
/app/student/exams/:examId
/app/student/practice              school questions + MatLearn global bank, clearly labeled apart
/app/student/practice/:sessionId
/app/student/results
/app/student/results/:resultId
/app/student/progress              own performance only (§10 "Student" scope)
/app/student/library
/app/student/library/:resourceId
/app/student/announcements
/app/student/ai-tutor              placeholder
/app/student/profile
```

**Tutor/Teacher app:**
```
/app/tutor/dashboard
/app/tutor/classes                 only assigned classes
/app/tutor/classes/:classId
/app/tutor/classes/:classId/students
/app/tutor/subjects                only assigned subjects
/app/tutor/questions               only questions the tutor owns/is permitted to edit
/app/tutor/questions/:questionId
/app/tutor/tests
/app/tutor/tests/create
/app/tutor/tests/:testId
/app/tutor/grading                 essay/manual-grade queue
/app/tutor/analytics               class + subject scope only, not school-wide
/app/tutor/profile
```

**School Admin app:**
```
/app/admin/dashboard
/app/admin/students
/app/admin/students/:studentId     includes promotion history (§11)
/app/admin/staff
/app/admin/staff/:staffId
/app/admin/classes
/app/admin/subjects
/app/admin/sessions                academic sessions & terms (§37 gap — see below)
/app/admin/question-bank
/app/admin/tests
/app/admin/exams
/app/admin/results
/app/admin/analytics               school-wide scope (§10 "School")
/app/admin/website                 landing-page section toggles/content (§12)
/app/admin/website/blog
/app/admin/website/events
/app/admin/website/gallery
/app/admin/library                 school's own uploaded resources, if allowed
/app/admin/settings/branding
/app/admin/settings/users
/app/admin/settings/promotion-rules
/app/admin/audit-log               (§32)
```

### 4.3 MatLearn Super Admin (`admin.matlearn.com`, own host — not under `/app/`)

```
/dashboard                 platform stats (already built)
/tenants                   list + create (already built)
/tenants/:tenantId         modal today; fine to stay a modal, or graduate to a route later if it
                            needs deep-linking (e.g. support sending a direct link to one tenant)
/global-question-bank      MatLearn's own WAEC/JAMB/NECO content — distinct from any tenant's
/global-library
/admins                    super admin accounts (already built)
/settings                  platform config, branding of the operator surface itself
/audit-log
```

---

## 5. Layout Architecture

Five distinct layouts. No universal dashboard shell.

```
<MatLearnPublicLayout>        Navbar + Content + Footer                (public MatLearn)
<SchoolPublicLayout>          SchoolNavbar (themed) + Content + SchoolFooter   (school website)
<StudentAppLayout>            Sidebar/BottomNav (mobile-first) + Topbar + Content
<TutorAppLayout>               Sidebar + Topbar + Workspace (desktop-leaning, still responsive)
<AdminAppLayout>               Sidebar + Topbar + Management workspace (desktop-leaning)
<SuperAdminLayout>             Already exists (School/src/layouts/dashboardlayout/Schooldashboard.jsx,
                                mounted at /matlearn/ today) — should move to its own host per §2,
                                but the layout component itself doesn't need to change.
```

`StudentAppLayout`, `TutorAppLayout`, `AdminAppLayout` all currently render through the same `Schooldashboard.jsx` + `Sidenav`/`StatusBanner` — that's fine to keep *structurally* (same shell component), but each should compose it with a role-specific nav config, which the codebase already does (`studentNav`/`tutorNav`/`adminNav` in `constant.jsx`). Keep that pattern; don't fork the shell three times.

---

## 6. Information Architecture — User Journeys

**Independent learner:** land on `matlearn.com` → register → academic-profile onboarding (education level, class, department, subjects, exam goals) → personalized dashboard → practice/e-library, filtered by profile by default, explorable beyond it.

**School student:** land on `school-x.matlearn.com/login` (never on `matlearn.com` — different host, different session) → dashboard scoped to the class/department/subjects the school's admin assigned → cannot self-edit official placement (§ Academic Profile Authority).

**Teacher:** logs into same school host → dashboard shows only assigned classes/subjects → creating a test only offers their own question pool + permitted shared pools.

**School Admin:** manages users/content/branding for their tenant only; landing-page builder toggles which public sections render.

**Super Admin:** separate host entirely → tenant list/create/suspend/delete, platform stats, global content — **no drill-down into a tenant's gradebook or student records**. If support needs to help a school with a data issue, that's a "log in as" audited impersonation flow (Phase 2, not MVP), never ambient access.

---

## 7. Feature Map (condensed)

| Domain | School Tenant | Public MatLearn | Super Admin |
|---|---|---|---|
| Identity/branding | ✅ per-tenant | ✅ MatLearn's own | manages tenant branding metadata |
| Question bank | private + can opt into global | global (WAEC/JAMB/NECO) | owns/curates global bank |
| Practice/exams | school tests/exams + optionally global | global practice | — |
| E-library | tenant can add own resources | global library + subscription gating | owns/curates global resources |
| Analytics | student/class/school scopes | learner's own progress only | platform metadata only |
| AI Tutor | placeholder, tenant-branded shell | placeholder | — |
| Users | admin manages all tenant users | self-service learner accounts | manages super admins + tenants |
| Billing | tenant subscription (Phase 2) | learner subscription (Phase 2) | sees revenue/plan metadata |

---

## 8. Missing Features Discovered

Going through §37's checklist against the spec — here's what's genuinely absent and needs a decision, each rated:

| Feature | Why MatLearn needs it | Who uses it | Priority |
|---|---|---|---|
| **Academic Sessions & Terms** | Promotion (§11), historical results, and "current vs previous class" all hang off session/term. Without it, "SS2 2026/2027" has nowhere to live. | Admin, Student, Teacher | **MVP** — foundational, everything else in §11 depends on it |
| **Subject allocation / Teacher assignment records** | "Teacher A → Mathematics → SS2" needs to be a real assignable relationship, not implied by nav filtering | Admin, Teacher | **MVP** |
| **Student enrollment record** | The join between Student × Class × Department × Session × Subjects — this *is* the school-authority academic profile from your addendum | Admin, Student | **MVP** |
| **Assessment lifecycle states** | A test needs `draft → published → active → closed → graded → results-released` — the spec mentions creating/taking/grading tests but not the state machine between them | Teacher, Student, Admin | **MVP** (UI states only, no backend logic) |
| **Question metadata schema** | You listed fields in §5/§43 for personalization — needs to be one canonical schema used by global bank, school bank, and library alike | Admin, Teacher, Super Admin | **MVP** |
| **Notifications (in-app)** | Listed in §29 but not wired to any screen yet — needs a bell icon + list UI minimum | All roles | **MVP** (UI shell), real-time delivery Phase 2 |
| **Announcements** | Mentioned for student dashboard (§9) but no admin authoring UI defined | Admin authors, Student/Teacher read | **MVP** |
| **Role/permission management UI** | Admin can "create tutors" but there's no screen for defining *what* a tutor role can touch beyond class/subject assignment (e.g. can they see school-wide analytics?) | Admin | **MVP**, simple first (fixed roles), granular permissions Phase 2 |
| **Admissions/enrollment intake** | §12 lists "Admissions info" as a landing-page section but there's no applicant flow — right now it's just marketing copy with no CTA outcome | Prospective parent/student | **Phase 2** |
| **Parent/Guardian accounts** | Not mentioned anywhere in the 43 sections, but any real school SaaS gets asked for this immediately post-launch | Parent | **Phase 2** |
| **Attendance** | Explicitly asked about, explicitly not detailed — likely wanted eventually but adds ERP weight per your own §38 principle | Teacher, Admin | **Future** — cut unless a specific school demands it |
| **Timetables** | Same — real feature, but orthogonal to "education + assessment + progress" core; adds scheduling complexity | Student, Teacher, Admin | **Future** |
| **Fees/payments (school-side)** | Distinct from the public-platform subscription in §33 — schools will eventually want fee tracking, but that's a finance module, not core LMS | Admin, Parent | **Future**, likely a separate product surface even later |
| **Messaging (teacher↔student/parent)** | Mentioned implicitly via "feedback" (§8) but no inbox/thread UI defined | Teacher, Student, Parent | **Phase 2** |
| **Audit log (admin)** | Explicitly requested (§32) — needs a real screen, not just a concept | Admin | **MVP** (UI + mock entries), backend logging later |
| **Subscription management (learner)** | §33 asks for it conceptually; needs an actual "My Plan" screen with locked/unlocked resource states | Independent Learner | **MVP** (UI + demo states), real payment **Phase 2** |
| **File/media management** | Logos, gallery images, blog images, library files all need *some* upload UI even against mock storage | Admin | **MVP** (upload UI with local preview, mock persistence) |
| **Search (global)** | §30 requested — students/teachers/classes/questions/library/blog. Needs scoping rules per role from day one, not bolted on later | Admin, Teacher (scoped), Student (own scope only) | **MVP** for admin/tutor (small dataset), **Phase 2** for full-text/library search |
| **Reporting/export** | Admin will want CSV/PDF export of results and rosters almost immediately | Admin | **Phase 2** |
| **School onboarding flow** | §7 says "MatLearn creates the school's primary admin" — but there's no super-admin-side wizard for *what happens next* (first login, forced password change, initial setup checklist) | Super Admin, new School Admin | **MVP** — you already need "generate tenant" (built); this is the *next* screen after that |
| **Account recovery (forgot password)** | Listed in routes but no screen designed yet, per surface (school/public/super admin all need their own, since they're different hosts/sessions) | All | **MVP** |
| **Tenant plan/limits enforcement UI** | You already show "students near cap" on the super admin dashboard — but there's no tenant-facing "you're near your plan limit, upgrade" banner | School Admin | **Phase 2** |
| **Data export / privacy request UI** | Given the explicit tenant-privacy requirement (§17), a "request my data" or "delete my account" surface will eventually be a compliance need | Independent Learner, School Admin | **Future** unless you're targeting a market with strict data law now |

**Not adding, deliberately:** full ERP modules (HR/payroll, inventory, transport, hostel management) — explicitly against your §38 principle. If a future school asks for these, they belong in a separate integration, not MatLearn core.

---

## 9. MVP vs Phase 2 vs Future (rollup)

**MVP (build now, mock data, backend contracts documented):**
Tenant resolution + theming · School public site (configurable sections) · Auth screens (all surfaces) · Student/Tutor/Admin portals as scoped in §4.2 · Academic session/term/class/department/subject/enrollment model · Assessment lifecycle UI · Question metadata schema · Global vs tenant question bank distinction · E-library browse/detail/access-state UI · AI Tutor placeholder · Super Admin (tenants, stats, admins, branding — already largely built) · Notifications shell · Announcements · Audit log UI · Learner subscription UI (demo states) · Global search (admin/tutor scope) · Account recovery flows · School onboarding wizard (post-tenant-creation) · Promotion history UI (no logic)

**Phase 2 (design for, don't fully build):**
Custom domains · Real payments (school + learner) · Parent/guardian accounts · Messaging · Admissions/applicant flow · Reporting/export · Plan-limit enforcement banners · Granular permission editor · Full-text library search · "Log in as tenant" support impersonation (audited)

**Future (explicitly deferred, revisit only if demanded):**
Attendance · Timetables · Fees/finance module · Real AI Tutor · Data-export/privacy self-service tooling

---

## 10. Frontend Architecture

Building on the existing Vite + React 19 + Tailwind 4 + react-router 7 stack already in the repo — no framework change needed, just structural growth:

```
src/
  app/
    tenant-resolver.js         hostname → { tenantType, tenantId } (mocked now)
    tenant-provider.jsx        fetches tenant config, feeds ThemeProvider + route selection
  routes/
    public/                    matlearn.com route tree
    school/                    school tenant route tree (public + student + tutor + admin)
    superadmin/                already exists, relocate under this grouping
  layouts/
    matlearn-public/
    school-public/
    student-app/
    tutor-app/
    admin-app/
    super-admin/                already exists
  design-system/                tokens, primitives (see §11)
  features/                     one folder per domain, not per role — avoids the current
                                 split where "admin exams" and "tutor exams" duplicate logic
    academic-profile/
    question-bank/
    assessment/                 tests/exams/practice — shared engine, role-specific screens
    library/
    analytics/
    notifications/
    branding/
    tenants/                    super admin's tenant CRUD (existing superadminpages, moved here)
  mocks/                        see §12
  context/                      existing globalcontext.jsx grows into a composed set of
                                 providers (auth, tenant, brand — brand already extracted)
```

Rationale for `features/` by domain rather than by role: today's `pages/schoolpages/{admin,tutor,student}pages/` structure duplicates "exams" three times. A shared `assessment` feature with role-scoped screen wrappers avoids drift (fix a bug in exam-taking once, not three times) — worth doing before the question bank grows.

---

## 11. Design System Strategy

```
MatLearn Design System (tokens + primitives, host-agnostic)
        ↓
Tenant Theme (CSS vars: --brand-color, spacing/radius overrides if ever needed)
        ↓
School Branding (logo, favicon, name — already wired via globalcontext.jsx §brand)
```

You've already built the right *mechanism* (`--brand-color` CSS var + context-driven favicon/title swap) for the Super Admin surface. Generalize it: the same `brand` object shape should be what a school tenant's config resolves into, not a parallel concept.

**Primitives to formalize** (several already exist ad hoc — `Button`, `Input` — formalize the rest): Card, Table, Modal (the tenant-detail modal is a good template), Drawer (mobile nav already half-is one), Tabs, Badge (status pills already exist inline — extract), Alert/Toast, Chart wrapper (recharts already in use — wrap it once for consistent theming instead of re-configuring per chart), Empty/Loading/Error state components (§31 — currently absent; every list screen should render one of these, not a blank div).

**Responsive strategy:** mobile-first for Student layout specifically (bottom nav pattern already exists in `Footernav`/`Sidenav` mobile toggle — good, keep it as the student pattern). Tutor/Admin can be desktop-first but must not break below ~768px — table-heavy screens (question bank, results) need a card-view fallback under that width, not horizontal scroll as the only mobile answer.

---

## 12. Mock/Demo-Data Architecture

```
src/mocks/
  tenants.js          Greenfield Academy, Bluecrest College, Royal Heights School —
                       distinct logos/colors/staff/classes, per §25 (not one school renamed)
  users.js            one demo account per role per §26, tagged with tenantId (or null for
                       independent learners)
  academicStructure.js  sessions, terms, classes, departments, subject lists — per tenant
  questions.js        global bank (WAEC/JAMB/NECO, tagged per the §Question-Bank-Personalization
                       metadata schema) + one private bank per demo tenant, clearly non-overlapping
  library.js          global + per-tenant resources, with access_level demo states
  results.js          historical results across 2+ academic sessions, to demo promotion history
                       without implementing promotion logic
  notifications.js
  announcements.js
  auditLog.js
```

Each mock module is a **repository-shaped module** (`getTenantById`, `listStudentsForTenant(tenantId)`, etc.) — the function signatures are what get swapped for real API calls later; components never import raw arrays directly. This is the seam that makes "replace mock with API" a one-file change per repository, not a component rewrite.

---

## 13. Backend Contract Strategy

Every data-consuming component keeps the `BACKEND:` comment convention already used in the Super Admin work (see `superadmindashboard.jsx`, `superadmintenants.jsx` for the established format — reuse that exact style). Extend it with a tenant-scope line since most of this system is now multi-tenant:

```js
// BACKEND:
// GET /api/schools/{tenantId}/students/{studentId}/performance
// Auth: JWT (role=Student, studentId must equal caller) OR (role=Teacher, must have
//       an active assignment to one of this student's classes) OR (role=Admin, same tenantId)
// Tenant scope: tenantId must match caller's tenant — reject cross-tenant even with valid JWT
// Returns: { subjectPerformance[], historicalScores[], topicWeaknesses[], progressTrend[] }
```

Every protected screen gets: **endpoint, method, required role(s), tenant-scope rule, response shape.** This is the artifact §18 asked for — document it inline, not in a separate spec that drifts from the code.

---

## 14. Security/Authorization Considerations

- **Cross-surface rejection is the founding requirement** — a JWT minted for `school-a.matlearn.com` must be rejected on `matlearn.com`, `school-b.matlearn.com`, and `admin.matlearn.com`. Carry `tenantId` (or `null` for independent/`"platform"` for super admin) inside the token claims, and check it against the resolved host's tenant on every request — this generalizes the fix already applied in `protectedRoutes.jsx`.
- Frontend route guards (`ProtectedRoute`, `RoleBaseRoute`) are UX conveniences, never the security boundary — restate this from §18 because it's easy to forget once the UI "looks" secure.
- Super Admin must not receive academic-data endpoints at all — not "hidden in the UI," genuinely absent from what that role's token can call. Enforce with role+scope, not screen-hiding.
- Teacher scope is the trickiest: `role=Teacher` is insufficient; every teacher-facing endpoint needs an assignment check (`assignedClassIds`/`assignedSubjectIds`) alongside role+tenant.
- Impersonation ("log in as tenant" for support, Phase 2) must be its own audited token type, never a super-admin token that silently gains tenant scope.

---

## 15. Development Roadmap (phases, restated against your §36 structure)

Already covered in §8/§9 as MVP/Phase2/Future; sequencing is in §16 below.

---

## 16. Recommended Implementation Order

Dependencies flow roughly: **identity/config → academic structure → content → assessment → analytics → polish.**

1. **Tenant resolver + theme provider** (extends existing `globalcontext.jsx` brand work) — nothing else can be demoed convincingly without this
2. **Mock data layer** (§12) — build this early so every subsequent screen has real-feeling data, not empty states
3. **Auth screens per surface** (§Phase 6) — school login, student login, tutor login, admin login, independent learner login/register, forgot password ×N surfaces, first-time admin setup
4. **Academic structure UI** (sessions/terms/classes/departments/subjects/enrollment) — foundational per §8's top gap; almost everything else reads from this
5. **School public website + landing builder** (§12) — high visual payoff, validates the multi-tenant branding story end-to-end (this is the "prove it's not one school renamed" milestone — do it with all 3 demo tenants before moving on)
6. **Student portal** (§7) — dashboard, subjects, practice, tests, results, progress, library
7. **Tutor portal** (§8) — scoped classes/subjects, question authoring, test creation, grading queue
8. **School admin portal** (§9/§13) — users, classes, question bank, tests/exams, results, analytics, website settings, audit log
9. **Question bank + assessment engine** (§10) — this is shared logic; build it once the three role-specific screens above already exist as consumers, so the shared engine is validated against real usage rather than designed in a vacuum
10. **E-library** (§11) — browse/search/detail/reader/access-control/subscription UI
11. **Public MatLearn platform** (§Phase 4) — practice, subjects, library, AI Tutor placeholder, independent learner onboarding + academic profile
12. **Super Admin refinements** (§Phase 12) — mostly done; extend with global question bank/library management, audit log, onboarding-wizard hookup for newly created tenants
13. **Responsive pass** (§Phase 13) — dedicated pass across everything, prioritizing Student layout
14. **Notifications/announcements/search/promotion-history polish** — cross-cutting, slot in wherever a screen needs them, don't build as one big "notifications sprint"

---

## 17. Risks & Architectural Decisions to Revisit

- **Tenant resolver without a real backend**: for local dev, hostname-based resolution needs a workaround (e.g. a dev-only query param or `/etc/hosts` entries mapping to `*.matlearn.local`) since you can't wildcard-DNS a laptop. Decide this before building the resolver, not after.
- **Modal vs route for tenant detail** (already decided for Super Admin — modal). Revisit if you ever need to deep-link directly to a tenant (e.g. from a support ticket link) — a modal can't be bookmarked/shared as a URL the way a route can.
- **`features/` by domain vs current `pages/{role}pages/` by role**: recommended restructure in §10 is a real refactor of existing code, not just new code — decide whether to do it now (cheaper, less code exists) or after MVP ships (safer, but the duplication in §8's "Assessment lifecycle" gap will already exist three times over by then).
- **Independent-learner vs school-student as one model vs two**: recommended one model with different write-authority (Assumption 3). If backend team disagrees, the whole `LearnerProfile` shape in §12's mocks needs revisiting — flag this decision explicitly to whoever builds the backend.

---

## 18. Recommended Project Structure (practical, incremental — not a rewrite)

Given the current codebase already exists and works, this is additive/reorganizing, not a from-scratch layout:

```
School/                              (keep as-is; the git repo root)
  src/
    app/                             NEW — tenant-resolver.js, tenant-provider.jsx
    mocks/                           NEW — §12
    design-system/                   NEW — extract Button/Input into here + add missing primitives
    features/                        NEW, GRADUAL — start with `assessment/` (highest duplication
                                      pain today), migrate others opportunistically
    context/
      globalcontext.jsx              EXISTING — grows brand/tenant awareness already begun
    routes/
      route.jsx                      EXISTING — becomes the tenantType switch described in §1
      public/                        NEW grouping for matlearn.com tree
      school/                        NEW grouping — today's schoolroutes/* moves here conceptually
      superadmin/                    EXISTING schoolroutes/superadminroutes.jsx, pages/.../superadminpages/
                                      — rename path only if you also move it off /app/ per §2
    layouts/                         EXISTING dashboardlayout/, authlayout/, publiclayout/ — add
                                      school-public/ and matlearn-public/ as siblings
    pages/                           EXISTING — keep during migration, thin out as features/ absorbs logic
  docs/
    MATLEARN_ROADMAP.md              this file
```

Nothing here requires throwing away what's built (branding system, Super Admin tenant CRUD, exam/practice components) — it's the scaffolding the next phases hang on.

---

*End of roadmap. This file is local-only. To hand it to another AI: paste its contents directly, or share the file — do not publish it as a hosted link given the proprietary strategy content.*
