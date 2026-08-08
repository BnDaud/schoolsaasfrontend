# Progress 22 — Responsive Pass + a Real Login-Redirect Bug Found & Fixed

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 13 ("Responsive pass — dedicated pass across everything, prioritizing Student layout").

## What was done

**Automated mobile-overflow scan.** Scripted a real browser (puppeteer-core, `--no-save`, uninstalled after) to check all 34 reachable pages — every student/tutor/admin/super-admin/public page, including every one built this session — at a 375px mobile viewport for horizontal overflow (`document.documentElement.scrollWidth` vs `clientWidth`). **Zero overflow found anywhere.** The existing Tailwind responsive patterns (`grid-cols-1 sm:/md:/xl:` breakpoints, `overflow-x-auto` on tables) already used consistently throughout this whole session's work hold up.

**Visual screenshots (Student layout, per the roadmap's explicit priority).** An overflow check alone doesn't prove a page actually *works* — screenshotted real rendered pages at mobile width to check visual quality, not just absence of horizontal scroll.

## A real bug this caught: login landed on a blank page

The very first screenshot (student dashboard, right after login) came back **completely blank** — header and bottom nav rendered, but the entire content area between them was empty. Traced it down:

- `schoolLoginpage.jsx`'s `handleSubmit` called `navigate("/app/")` — the bare app root, not a specific dashboard path.
- None of `StudentRoutes`/`TutorRoutes`/`AdminRoutes`/`SuperAdminRoutes` had a route for the bare/empty path.
- Diagnosed with console logging at each layer: confirmed `ProtectedRoute` and even the *outer* `<Route path="*">` (nested via `<Outlet/>` under `/app/`) never fired for a URL with zero remaining path segments in this app's React Router v7 setup — `path="*"` doesn't match a zero-length remainder here, even though it correctly matches every other page (verified extensively all session). A `<Route index>` placed *inside* the deeper freestanding `<Routes>` components (`StudentRoutes` etc.) didn't work either, for the same reason those trees are descendant `<Routes>` rendered via a component call, not real `<Outlet/>` nesting.
- **Real fix, at the right layer:** added a proper `<Route index>` directly in `route.jsx`, where the nesting is genuine `<Outlet/>`-based and index routes resolve correctly — `AppRootRedirect` (new, `src/routes/approotredirect.jsx`) reads the role from context and redirects to the right dashboard, or shows `NotAllowed` if the role doesn't belong under `/app/`. Same fix for `/matlearn/` (always redirects to `super-admin-dashboard`).
- **Also fixed the login handler directly** (defense in depth, not relying solely on the index-route fix): `schoolLoginpage.jsx` now navigates straight to `DASHBOARD_PATH_BY_ROLE[user.role]` instead of the bare root.
- This means **every student, tutor, and admin who has ever logged in via this app landed on a blank page** until they clicked a sidebar link — a real, previously-undiscovered bug affecting the core login flow for every school role, caught only because this responsive pass actually looked at rendered content instead of just checking route gates.

## Verified

- `npx eslint` clean on all 3 touched files.
- Confirmed the root cause precisely via targeted `console.log` instrumentation at each routing layer (`SchoolDashboard`, `ProtectedRoute`, the inner catch-all) before settling on the fix — didn't guess.
- Re-ran the full 34-page mobile overflow scan after the fix: still zero overflow, no regressions.
- Confirmed all 3 school roles (student/tutor/admin) land on their correct, fully-rendered dashboard immediately after login.
- Confirmed Super Admin's bare `/matlearn/` now correctly redirects to `/matlearn/super-admin-dashboard` with real content (stat tiles, tenant growth chart) — tested via a genuine cold page load, the most reliable test available for that no-login surface.
- Confirmed the catch-all still correctly shows "Access Restricted" for genuinely invalid paths under both `/app/*` and `/matlearn/*` — unaffected by this fix.
- Re-screenshotted the (now-fixed) student dashboard, subjects, and books/E-Library pages at mobile width — all render cleanly, single-column, no cramped elements.
- One screenshot briefly looked like a second bug (the fixed bottom nav appearing duplicated mid-page) — verified via real scrolled-viewport screenshots (not `fullPage`) that this was a known Puppeteer `fullPage`-screenshot artifact with `position: fixed` elements, not a real issue; the nav correctly stays pinned during actual scrolling.

## Not done

- Didn't pixel-audit every one of the 34 pages visually (only screenshotted a Student-priority sample, per the roadmap's own stated focus) — the automated overflow scan covers the rest at the "doesn't visibly break" level, not a full design review.
