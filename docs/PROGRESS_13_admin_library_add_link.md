# Progress 13 — Admin "Add Resource" (Link-Based, not File Upload)

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 10 ("E-library"), continuation — closes the gap flagged right after step 12 shipped: no way for a school admin to actually add their own resource, and per your steer, resources should be **links**, not uploaded files, so the (future) database only ever stores a URL reference and doesn't grow with file content.

## What was done

- **`mocks/library.js`** — added a `url` field to every seeded tenant resource (now `type: "Link"`, each pointing at a placeholder URL). Added `loadTenantLibrary(tenantId)`/`saveTenantLibrary(tenantId, resources)`, `localStorage`-backed and namespaced per tenant — same pattern as `utils/tutorQuestionBank.js`'s persistence, so admin-added resources persist and stay isolated per school. `listTenantLibrary` (static seed) kept as-is for anything that doesn't need admin-added resources.
- **`adminlibrary.jsx` (new)** — the school admin "Library" screen the roadmap names at `/app/admin/library`, which didn't exist. Form: Title, URL (validated with `new URL(...)`, rejects garbage input with an inline error), Type (Link/PDF/Video). Submitting adds it to the tenant's persisted list; each entry lists as a real clickable link with a Remove button.
- **`books.jsx`** — switched the "This School's Resources" panel from the static `listTenantLibrary` to `loadTenantLibrary`, so resources an admin just added actually show up for students/tutors immediately (not just on next mock-data deploy). Titles now render as real `<a href>` links when a `url` is present.
- Wired: `admin-library` route, "Library" nav entry (admin sidebar).

## Verified

- `npx eslint` clean on all 5 touched files (17 pre-existing `constant.jsx` errors, unchanged baseline).
- Scripted a real browser run (puppeteer-core, `--no-save`, uninstalled after — `git status` confirms `package.json`/lock untouched):
  - Greenfield admin adds "Greenfield Term 2 Chemistry Slides" → appears immediately, renders as a real link with the exact href submitted.
  - Greenfield **student** (different login, different page) sees the admin-added resource in Books/E-Library — proves the shared persisted read path works across roles.
  - Bluecrest admin does **not** see Greenfield's resource, and still has its own seeded one — tenant isolation holds for this new persistence layer too, not just the question-bank one from step 11.
  - Greenfield admin deletes the resource → gone.
  - Invalid-URL rejection: the browser step hit a Puppeteer tooling timeout unrelated to the app (`Runtime.callFunctionOn timed out` inside puppeteer-core itself), so verified the actual validation logic directly instead — `new URL("not-a-url")` throws (rejected), `new URL("https://example.com/x")` doesn't (accepted), matching exactly what `adminlibrary.jsx`'s `addResource` checks.

## Not done yet

- Global library resources still have no `url` field / no add-UI — this request was specifically about the school's own resources, per your clarification that the global library is MatLearn-hosted, not tenant-scoped.
- No edit-in-place for an existing resource (only add/remove).
