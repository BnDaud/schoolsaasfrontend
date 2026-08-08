# Progress 17 — Independent Learner Stats + Audit Log Privacy Fix

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 12 ("Super Admin refinements"), continuation — direct response to your review of `PROGRESS_16`.

## Audit log: fixed a real privacy-boundary mistake

`PROGRESS_16`'s `listAllAuditLog()` aggregated **every** tenant's internal activity (`user.created`, `result.released`) into the Super Admin's view. You caught that this violates the roadmap's own rule (§14): Super Admin gets platform metadata, never a tenant's internal business. Fixed properly, not patched over:

- Removed `listAllAuditLog()` entirely. Added `listPlatformAuditLog()` — platform-operator actions only (tenant created/suspended/reactivated/plan-changed, Super Admin roster changes). Tenant-internal entries stay exactly where they were (`listAuditLogForTenant`, used only by that school's own admin screen).
- Added realistic platform-level seed entries (previously there was only 1) so the screen has real content: tenant created, plan changed, Super Admin invited, tenant suspended, tenant reactivated.
- Redesigned `superadminauditlog.jsx` as a proper timeline (connecting line, colored icon per action type, category filter chips — All/Tenants/Admins) instead of the flat list from step 16, per your "best UI/UX, separate screen" ask.

**Verified:** headless Chrome confirms none of the removed tenant-internal actions or tenant-admin names leak into the redesigned screen; all 5 platform entries render with correct labels/targets/actors; the school-level audit log (`/app/admin-audit-log`) is untouched and still gates correctly.

## Independent Learner stats (new — was entirely missing)

You noticed Super Admin has no way to see independent-learner stats, unlike tenants. Built it properly, not a stub:

- **`mocks/users.js`** — expanded from 1 independent learner to 7, each with `educationLevel`, `examGoals`, `subscriptionTier` (free/subscriber), `createdAt`, `lastActiveAt`, spread across May-August 2026 signup dates so trend/breakdown data is real, not flat. Added `listIndependentLearners()`.
- **`superadminlearners.jsx` (new)** — stat tiles (Total, Active in last 14 days, Subscribers, Free), a signup-trend area chart and a top-exam-goals bar chart (both `recharts`, matching the existing dashboard's exact visual pattern), and a searchable/filterable table (name/email search, tier filter) — same maturity level as the Tenants screen, not a lesser afterthought.
- Wired: `super-admin-learners` route, "Learners" nav entry (between Tenants and Audit Log).

**Verified:** headless Chrome confirms all 7 learners render; hand-verified all 4 stat numbers against the real timestamps and system clock (Active=5, Subscribers=3, Free=4 — correct down to the hour, e.g. Grace Adeyemi's midnight-UTC `lastActiveAt` falls just outside the 14-day cutoff computed from the actual current time, and the screen correctly excludes her); exam-goal breakdown counts verified via a direct script (WAEC:4, JAMB:3, NECO:2, IELTS:1, TOEFL:1) match the rendered chart data exactly. No console errors.

## Explicitly not done (flagged, not silently dropped)

- **Service/feature usage** (AI Tutor usage, etc., the other half of your "how they use the services" ask) — not built. The AI Tutor is a "coming soon" placeholder everywhere else in this app (no real feature exists yet to instrument), so fabricating usage numbers for it would be dishonest demo data rather than a real gap closed. Flagging this for a decision: either a clearly-labeled "Preview" section with placeholder values, or defer until AI Tutor is real.
- Onboarding-wizard hookup for newly created tenants — still the one remaining named gap from §16 item 12.
