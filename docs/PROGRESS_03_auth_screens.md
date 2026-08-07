# Progress 03 — Auth Screens (School + Public MatLearn)

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 3 ("Auth screens per surface"), partial.

## What was done

- **Fixed `schoolLoginpage.jsx` (real bug, not just wiring):** the email/password `Input`s had no `value`/`onChange` props at all, so typing in either field called `onChange(e.target.value)` with `onChange` undefined and crashed. Now controlled, and `onSubmit` actually authenticates: looks up `findUserByEmail` from the mock users layer (step 2), rejects if the account's `tenantId` doesn't match the tenant resolved for this host (cross-tenant rejection per §14), sets `role`/`name`/`schoolName` on `globalContext`, and navigates to `/app/`. Password value itself isn't checked — no backend exists (§0 assumption 5), so any non-empty value passes; that's called out in a `BACKEND:` comment.
- **`forgotPasswordPage.jsx` (new)** — one shared component (`backHref`/`loginHref` props) mounted at both `/auth/forgot-password` (school) and `/forgot-password` (public). Submitting shows a generic "if an account exists…" message — never confirms/denies the email exists, per standard practice. Was a listed MVP gap in §8 with zero existing screen.
- **`learnerLoginpage.jsx` / `learnerRegisterpage.jsx` (new)** — independent-learner auth for the public MatLearn platform, mounted at `/login` and `/register` (§4.1 route table; these routes didn't exist before). Login checks the mock user's `role === "Learner"` and `tenantId === null`. Register has no backend to persist to, so it just signs the learner into `globalContext` for the session and returns home — it does **not** route into `/onboarding/academic-profile`, since that screen doesn't exist yet (§16 item 11, later).
- **`route.jsx`** — added the 3 new routes above, reusing the existing `<Auth>` layout for both surfaces (no new layout component forked). Also dropped a pre-existing unused `useContext` import that was failing lint on this file.

## Verified

- `npx eslint` clean on all 5 touched/new files.
- Dev server HMR reloaded with no errors.
- `/login`, `/register`, `/forgot-password`, `/auth/login`, `/auth/forgot-password`, `/auth/login?tenant=greenfield` all return HTTP 200.

## Not done yet (explicitly deferred)

- **Super Admin login screen.** No `admin.matlearn.com`-side login exists; `/matlearn/` still relies on `globalContext`'s hardcoded default role. Roadmap §4.3 doesn't itemize a login route either — deferred as its own step rather than guessed at.
- **First-time admin setup wizard** (§8 MVP gap: what a newly-created tenant's admin sees on first login) — not started.
- **`schoolRegister.jsx`** still has a no-op `onSubmit={() => {}}` — pre-existing gap, not touched this pass (self-registration for school-tenant roles isn't actually called for by the roadmap's user journeys in §6; school admins create tutors/students, they don't self-register).
