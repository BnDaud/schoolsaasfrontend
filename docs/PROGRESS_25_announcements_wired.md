# Progress 25 — Announcements (Admin Authoring + Student/Tutor Banner)

**Needs push to GitHub.**

Roadmap step 14, second slice. `src/mocks/announcements.js` existed with seed data and a `listAnnouncementsForTenant` reader, but nothing in the app ever called it, and there was no admin authoring UI (the exact gap the roadmap table calls out: "Mentioned for student dashboard but no admin authoring UI defined").

## What was done

- `src/mocks/announcements.js` — added tenant-scoped `localStorage` persistence (same pattern as `mocks/library.js`'s tenant library: `matlearn:tenant-announcements:{tenantId}`, seed-or-stored) and `addAnnouncement(tenantId, authorId, title, body)`, which dispatches an `announcements:changed` window event so every open view picks up a new post without a page reload.
- `src/component/common/announcementsbanner.jsx` (new) — shared banner reading the current tenant's announcements; renders nothing at all when there are none, so it never adds empty-state clutter to a dashboard that already has its own.
- `src/pages/schoolpages/studentpages/studentdashboard.jsx` and `src/pages/schoolpages/tutorpages/dashboard.jsx` — both render `<AnnouncementsBanner />` at the top (mock's own comment already said "read by Student/Tutor").
- `src/pages/schoolpages/adminpages/admindashboard.jsx` — new "Announcements" section: a small post form (title + body) and the list of everything already posted for that tenant, newest first.
- Incidental one-line fix in the same file: `summaryCards`' "Students" stat card linked to `/app/admin-students`, a route that doesn't exist (the real one is `/app/admin-users`) — a pre-existing dead link, fixed while touching this file for the reason above.

## Verified

- `npx eslint` clean on every touched file.
- Caught and fixed one real bug before it shipped: my first pass read the tenant's announcements inside a `useEffect` that called `setAnnouncements(...)` with nothing else in the effect (no subscription/listener) — this repo's `eslint-plugin-react-hooks` flags that as an **error**, not a warning ("Calling setState synchronously within an effect can trigger cascading renders"). Fixed by computing the initial list with lazy `useState(() => ...)` instead, since `tenantId` resolves synchronously (via `useMemo` in `tenant-provider.jsx`, not an effect) and is already available by the time this component mounts.
- Real browser test (puppeteer-core, `--no-save`): Greenfield student and tutor both see the seeded "Resumption Date" announcement; Bluecrest student does NOT see Greenfield's announcement but does see its own ("Mid-term Break") — tenant isolation holds. Admin posted a new announcement and saw it appear immediately in their own list; a fresh student session (same tenant) saw that same new announcement, confirming the `localStorage` persistence and the `announcements:changed` event both work.
