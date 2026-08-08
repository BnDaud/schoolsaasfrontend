# Progress 27 — Scoped Header Search (Admin/Tutor)

**Needs push to GitHub.**

Roadmap step 14, fourth and final slice. The roadmap's own feature table scopes this explicitly: "Global search ... Needs scoping rules per role ... **MVP for admin/tutor**, Phase 2 for full-text/library search." Every list page already had its own working local search (admin users, tutor students, tutor question bank, tutor manage-exam, library) — what was missing was a header-level entry point that jumps into the right one, the way `superadmindashboard.jsx` already does for `superadmintenants.jsx` via `location.state.search`.

## What was done

- `src/component/common/statusbanner.jsx` — added a search box in the header, visible only when `role` is `Admin` or `Tutor` (`hidden md:block`, so it doesn't crowd the mobile header where the hamburger menu already lives). Submitting navigates to that role's own directory page (`/app/admin-users` for Admin, `/app/students` for Tutor) with `location.state.search` set, reusing the exact pattern `superadmintenants.jsx` already established — no new search index or backend, just a shortcut into the scoped page that already knows how to filter.
- `src/pages/schoolpages/tutorpages/students.jsx` — read `location.state?.search` into its existing `searchTerm` state on mount (same one-line addition `adminusers.jsx` got in the previous slice), and gave its `Input` a `value` so it now actually shows the pre-filled term (previously write-only).

## Verified

- `npx eslint` clean on both files.
- Real browser test (puppeteer-core, `--no-save`): Admin's header search for "Amina" lands on `/app/admin-users` showing Amina Yusuf and hiding non-matching rows (Dr Musa Bello). Tutor's header search input is present and submits to `/app/students`. Student role does not render either search input at all — confirmed absent, not just hidden.
