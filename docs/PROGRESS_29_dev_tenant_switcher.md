# Progress 29 — Dev Tenant Switcher (Fixes "MatLearn Homepage Won't Show")

**Needs push to GitHub.**

You reported the MatLearn homepage (the marketing page explaining the platform) wasn't showing — it kept loading Greenfield's homepage instead. Traced it: not a bug in the sense of broken logic, but a real UX trap in how local dev simulates multi-tenancy.

## Root cause

There's no wildcard DNS on a laptop, so `src/app/tenant-resolver.js` simulates subdomain-based tenant resolution via a `?tenant=` query param, persisted to `localStorage` (`tenant-resolver.js:32-40`) so it survives in-app navigation without repeating the param on every link — this is necessary and correct: a school's own public site (`SchoolNavbar`, `src/component/navigations/schoolnavbar.jsx:12`) links its own "Home" to bare `/` and relies on that persistence to keep showing that school's site, the same way a real subdomain would.

The trap: once you visit `?tenant=greenfield`, bare `/` keeps showing Greenfield indefinitely — including in a brand new browser tab — until you know to visit the undocumented `?tenant=matlearn` reset param. There was no visible way to get back to the generic MatLearn homepage.

## What was done

- `src/component/common/devtenantswitcher.jsx` (new) — a small fixed-position picker (bottom-right, above the mobile bottom nav) listing "MatLearn (Public)" plus every seeded tenant (`mocks/tenants.js`). Selecting one navigates to `/?tenant=<value>`, which is exactly the mechanism `tenant-resolver.js` already understands (including the built-in `localStorage` clear for `"matlearn"`). Labeled in-code as a local-dev convenience, same spirit as the resolver itself — not a production feature.
- `src/App.jsx` — mounted it as a sibling to `<Routes>`, inside `TenantProvider`, so it's visible on every surface (public MatLearn, any school tenant, dashboard layouts) regardless of route.

## Verified

- `npx eslint` clean.
- Real browser test (puppeteer-core, `--no-save`): reproduced the exact reported bug (visit `?tenant=greenfield`, then bare `/` — still shows Greenfield). Used the new switcher to select "MatLearn (Public)" — landed back on the real MatLearn marketing homepage (confirmed hero copy, feature list, footer). Switched again to Bluecrest and confirmed that tenant's content loads too.
- Mobile viewport (375px) overflow check on the switcher: clean, no horizontal scroll.
