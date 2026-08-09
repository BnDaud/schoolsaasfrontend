# Progress 32 — Super Admin Login Redesigned as Its Own Surface

**Needs push to GitHub.**

You called out that `PROGRESS_28`'s Super Admin login was too close to the one already built for schools — reasonably: it was wrapped in the shared `Auth` layout, which shows "Welcome to Mat Learn", the school logo, and "Powered by Vectored Matrix" — a consumer-product identity that doesn't fit the people who *operate* the platform.

## What changed

- `src/pages/Authpages/superAdminLoginpage.jsx` — rewritten as a fully standalone page, no shared layout. Dark slate console styling (`bg-slate-950`, indigo accent instead of the app's green), a shield icon, "MatLearn Platform Console" wordmark, and copy that reads as an internal tool ("Operator access only. Not for school staff or students.") instead of a product welcome screen. Still uses the shared `Input` component for the form fields themselves (behavior/accessibility, not branding), but the page shell around it is entirely its own.
- `src/routes/route.jsx` — `/matlearn/login` now renders the page directly instead of being nested inside the `<Auth>` layout route.
- Same auth logic as before (unchanged): validates against `findUserByEmail`, requires `role === "SuperAdmin" && tenantId === "platform"`, unchecked password (consistent with every other login in the app), lands on `/matlearn/super-admin-dashboard`.

## Verified

- `npx eslint` clean.
- Real browser test (puppeteer-core, `--no-save`): `/matlearn/login` shows "Platform Console" and does **not** show "Welcome to Mat Learn" or "Powered by Vectored Matrix" (confirming it's no longer the shared shell). Login with `superadmin@matlearn.com` still succeeds and lands on the real dashboard.

## Login

`http://localhost:3000/matlearn/login` → `superadmin@matlearn.com` / any password.
