# Progress 12 — E-Library (Global + Tenant Resources, Access-Level UI)

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 10 ("E-library"), first slice.

## Context

Existing `books.jsx` (shared by student + tutor nav, `/app/books`) is a fully working class/subject book browser — but entirely generic, procedurally generated, no `tenantId`, no relation to `mocks/library.js` (built in step 2: global WAEC/JAMB/NECO resources + per-tenant resources with `accessLevel` demo states). That mock had sat unused since step 2, exactly like `mocks/questions.js` did before step 10 — same shape of gap, same fix pattern.

## What was done

- **`books.jsx`** — added an "E-Library" section below the existing class-books browser (left untouched; it's a stateless, read-only display, no persistence to worry about, unlike the question-bank engine). Two panels:
  - **Global Resources** — from `listGlobalLibrary()`, each tagged Free (unlocked) or Subscriber (locked icon) per its `accessLevel` — the "access-control UI" §11 asks for.
  - **This School's Resources** — from `listTenantLibrary(tenantId)` — genuinely tenant-specific (Greenfield/Bluecrest/Royal Heights each show their own single uploaded resource, not shared).

## Verified

- `npx eslint` clean.
- Scripted a real browser run (puppeteer-core, `--no-save`, uninstalled after — confirmed `package.json`/`package-lock.json` untouched via `git status`): logged in as a student for each of the 3 tenants, navigated to Books via the actual nav link, confirmed each tenant's "This School's Resources" panel shows only its own resource (Greenfield → "Greenfield SS2 Biology Notes", Bluecrest → "Bluecrest Grade 9 Chemistry Workbook", Royal Heights → "Royal Heights SS1 Biology Practicals"), and the Global Resources panel renders identically for all three. Zero browser errors.

## Not done yet (explicitly deferred, same roadmap item)

- Detail/reader view (`/library/:resourceId`) — resources aren't clickable through to a detail page; roadmap's §4.1 lists this as a separate route, not built.
- Subscription/"My Plan" UI — the locked (Subscriber-only) resources have no actual upgrade flow; §8 lists this as its own MVP item, not this one.
- Admin's own library management (`/app/admin/library` — uploading a school resource) — browse-only from the admin/tutor/student side for now.
