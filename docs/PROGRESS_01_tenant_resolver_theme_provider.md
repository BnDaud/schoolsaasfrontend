# Progress 01 — Tenant Resolver + Theme Provider

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 1 ("Tenant resolver + theme provider").

## What was done

- `src/app/tenant-resolver.js` — pure function `resolveTenant(hostname, search)` → `{ tenantType, tenantId }`.
  - Production path: `admin.matlearn.com` → `matlearn-admin`; `matlearn.com`/`www` → `matlearn`; `*.matlearn.com` → `school` with `tenantId` = subdomain.
  - Local dev workaround (no wildcard DNS on a laptop, per roadmap §17 risk): `?tenant=<id>` query param, persisted to `localStorage` under `matlearn:dev-tenant-id` so it survives navigation without repeating the param. `?tenant=admin` simulates the super admin host; `?tenant=matlearn` clears back to the public platform.
- `src/mocks/tenants.js` — repository-shaped mock (`getTenantById`, `listTenants`) with 3 demo tenants (Greenfield Academy, Bluecrest College, Royal Heights School), each with distinct `brand` (color/logo/name/favicon), per roadmap §12/§25.
- `src/app/tenant-provider.jsx` — `TenantProvider`, mounted inside `GlobalContextFunction` and around `<Routes>` in `App.jsx`. Resolves tenant on route change, looks up mock tenant config, and pushes `brand` into the existing `globalContext` (extends the CSS-var/title/favicon mechanism already in `globalcontext.jsx`, not a parallel one, per roadmap §11). Exposes `{ tenantType, tenantId, tenant }` via `tenantContext` for later route-tree selection (§1, not yet consumed — that's a later roadmap step).
- `src/App.jsx` — wired `TenantProvider` between `GlobalContextFunction` and `Routes`.

## Verified

- Dev server (`npm run dev`, port 3000) hot-reloaded clean, no errors.
- `http://localhost:3000/?tenant=bluecrest` returns 200 and switches brand via existing favicon/title/CSS-var effect.

## Not done yet (later roadmap steps)

- No route-tree switching by `tenantType` yet (still one route tree in `routes/route.jsx`) — that's roadmap §16 items 4+.
- No mock data layer beyond tenants (users/academic structure/etc. — roadmap §12) yet.
