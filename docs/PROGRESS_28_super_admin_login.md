# Progress 28 — Super Admin Login Page + Real Auth Gate

**Needs push to GitHub.**

You asked whether Super Admin has its own login page. It didn't — and worse, it didn't need one: `src/context/globalcontext.jsx:22` defaulted `role` to `"SuperAdmin"` (with a `// TODO: revert to backend-driven role once auth API is wired` comment already flagging it), so anyone loading the app was the platform operator by default, with `/matlearn/*`'s `ProtectedRoute` check (`role !== "SuperAdmin"`) passing trivially. This was a real, previously-undiscovered hole — not just a missing page.

## What was done

- `src/pages/Authpages/superAdminLoginpage.jsx` (new) — modeled on `learnerLoginpage.jsx`'s structure (no tenant gating needed, since the platform operator isn't scoped to a school tenant). Validates against `findUserByEmail` requiring `role === "SuperAdmin" && tenantId === "platform"` (the existing seeded user `superadmin@matlearn.com` in `mocks/users.js`). Password is unchecked, same as every other login page in this app (no backend yet) — any non-empty value passes.
- `src/routes/route.jsx` — added `/matlearn/login` (wrapped in the shared `Auth` layout, same as `/auth/login` and `/login`).
- `src/context/globalcontext.jsx` — changed the default `role` from `"SuperAdmin"` to `null`. This is the actual fix: without it, the new login page would be cosmetic — you'd already be signed in as Super Admin before ever seeing it.

## Verified

- `npx eslint` clean on all touched files (only the pre-existing baseline `globalcontext.jsx` context/component export warning, confirmed unrelated).
- Real browser test (puppeteer-core, `--no-save`): a fresh, no-login visit to `/matlearn/` now redirects through to `super-admin-dashboard` and correctly shows "Access Restricted" (previously would have shown the real dashboard). `/matlearn/login` renders and rejects a wrong email with an error message; `superadmin@matlearn.com` succeeds and lands on the real dashboard. Regression check: a fresh no-login visit to `/app/` still correctly shows "Access Restricted" (unaffected — Student/Tutor/Admin never had a default-role hole), and the full student login flow still works end-to-end with the new `null` default.

## Login

`http://localhost:3000/matlearn/login` → `superadmin@matlearn.com` / any password.
