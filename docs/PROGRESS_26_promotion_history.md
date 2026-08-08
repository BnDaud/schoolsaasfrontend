# Progress 26 — Student Promotion History (Admin, Read-Only)

**Needs push to GitHub.**

Roadmap step 14, third slice. `src/mocks/results.js` already carried multi-session results per student specifically "to demo promotion history without implementing promotion logic," but nothing read it, and `AdminUsers` was a page of 5 hardcoded fake rows identical for every tenant (same numeric `id`s, same names, regardless of which school you logged into) — it couldn't have keyed promotion history off real students even if something tried.

## What was done

- `src/pages/schoolpages/adminpages/adminusers.jsx` — replaced the hardcoded fake array with `listUsersForTenant(tenantId)` from `src/mocks/users.js`, so this page now shows the school's actual students/tutors/admins instead of the same 5 names in every tenant. Adjusted the stat tiles (`Total Users`, `Students`, `Tutors` — the old `Active`/`Admins` tiles depended on fields the real mock data doesn't have). Also wired `location.state.search` (same pattern already used by `superadmintenants.jsx`) so a header search (added in the next slice) can land here with a query pre-filled.
- Student rows are now clickable ("Promotion History" pill) and open a new `src/pages/schoolpages/adminpages/promotionHistoryModal.jsx` — reads `listResultsForStudent(studentId)`, shows each session/term's class, average, and position, and flags "Promoted from X" whenever the class changed between consecutive entries. This is read-only display of what already happened — it never decides or writes a promotion, per the roadmap's explicit "no logic" scope for this item.

## Verified

- `npx eslint` clean on both files. One real fix along the way: `useMemo` over a callback that also called a locally-defined `classNameFor` closure tripped `react-hooks/preserve-manual-memoization` — the React Compiler's inferred dependency (`classNameFor` itself) didn't match my declared array (`[roleFilter, searchTerm, users, classes]`), so it skipped optimizing the component. Simplest fix, and the more compiler-friendly habit going forward: dropped `useMemo` for `filteredUsers` entirely and just filter directly on each render — the array is small and the computation is cheap, so there's nothing worth hand-memoizing here anyway.
- Real browser test (puppeteer-core, `--no-save`, real in-app link click for navigation — not `page.goto`, which resets React auth state): Greenfield admin sees real students ("Amina Yusuf") and tutors ("Dr Musa Bello"), not the old fake "Lawal Sulaimon" row. Clicking Amina's card opens the modal, showing her SS2 Science term and a "Promoted from SS1" line (her two seeded results are in different classes). Bluecrest admin does NOT see Greenfield's student and sees its own Grade 9 students instead — tenant isolation holds on this page now that it reads real per-tenant data. Existing search-by-name/class filter still works against the real data shape.
