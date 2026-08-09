# Progress 31 — Root "/" Always MatLearn; Tenants Only Via `?tenant=`

**Needs push to GitHub.**

Follow-up to `PROGRESS_29` — the dev tenant switcher was a workaround, not the actual fix. You were direct about what you wanted: `:3000` should always be the MatLearn homepage; any tenant should only show up when explicitly routed via `?tenant=`. That's a real architecture question, not a UI patch, so this redoes it properly.

## Root cause (the real one)

`tenant-resolver.js` persisted `?tenant=X` to `localStorage` on **any** visit carrying that param — including just clicking a link to preview a school's public site, never mind logging in. Once written, bare `/` obeyed that stored value forever, in every new tab, until someone knew to visit the undocumented `?tenant=matlearn` reset. Worse: there was no working Log Out anywhere in the app to ever clear it — the Sidenav's "Log Out" button had no `action` prop at all (confirmed via `git show HEAD` — this button never did anything, in any commit before this one).

## What was done

- `src/app/tenant-resolver.js` — dropped the implicit write. `resolveTenant()` now only reads the URL and (for authenticated in-app pages) the stored tenant; it never writes. Two new explicit exports: `rememberDevTenant(tenantId)` and `forgetDevTenant()`, each dispatching a `dev-tenant:changed` window event.
- `src/pages/Authpages/schoolLoginpage.jsx` — calls `rememberDevTenant(tenantId)` on successful login. This is the **only** place a tenant gets remembered now — an actual login, not a preview click. It's needed because every internal `/app/*` nav link (`studentNav`, `tutorNav`, `adminNav` in `utils/constant.jsx`) has a plain `href` with no `?tenant=` param, so something has to keep the session's tenant scoped across that navigation.
- `src/pages/Authpages/learnerLoginpage.jsx` — calls `forgetDevTenant()` on success, so logging in as an independent learner can't inherit a stale school tenant from earlier browsing in the same browser.
- `src/component/navigations/sidenav.jsx` — **implemented real Log Out** (previously nonfunctional): resets `role`/`name`/`schoolName`/`userId`/`classId`/`assignedClassIds`/`assignedSubjectIds` to their logged-out defaults, calls `forgetDevTenant()`, navigates to `/`. Also removed an unused `useState` import that was sitting there since before this session (one fewer baseline lint error).
- `src/component/navigations/schoolnavbar.jsx` — a school's own public site no longer gets to rely on a remembered tenant to keep its "Home"/"Contact"/"Student / Staff Login" links working (since mere preview visits no longer persist anything). Those three links now explicitly carry `?tenant=${tenantId}`, matching your own stated model: tenants are only ever reached via that param.
- `src/app/tenant-provider.jsx` — this took two attempts to get right, both caught by testing, not assumed:
  1. First pass wrapped the resolution in `useMemo` keyed on `location.search` — stale by construction, since `resolveTenant` also reads `localStorage`, which can change (login/logout) without `location.search` changing.
  2. Second pass just called `resolveTenant()` directly in the render body, no memoization. Still stale — a real browser test after "Log Out" kept showing the just-logged-out tenant's own public site instead of MatLearn. Traced it to this repo's `babel-plugin-react-compiler`: it applies its **own** automatic memoization even with no explicit `useMemo` in the source, inferring `location.search` as the only real dependency (it can't see a `localStorage` read as one) — the exact same class of staleness the notifications fix (`PROGRESS_24`) already ran into, just via automatic rather than manual memoization this time.
  3. Real fix: `tenantType`/`tenantId` are now genuine `useState`, recomputed via an effect that runs on `location.search` change **and** listens for the new `dev-tenant:changed` event — the same pattern already proven correct for notifications/announcements. A real `setState` call can't go stale under compiler memoization the way a derived render-time value can.

## Verified

- `npx eslint` clean on every touched file except two confirmed-pre-existing baseline errors in `tenant-provider.jsx` (checked against `git show HEAD` — identical errors, same lines, before any of my changes).
- Full `src/` lint sweep: 39 problems (down from 41 — fixed the unused-import baseline error in `sidenav.jsx` as a side effect, no regressions elsewhere).
- Real browser test (puppeteer-core, `--no-save`): fresh `/` shows MatLearn's real homepage copy. Previewing `?tenant=greenfield` (no login) then returning to bare `/` now correctly shows MatLearn again — the exact bug you reported, fixed. Greenfield's own "Contact" nav link carries `?tenant=greenfield` and clicking it stays on Greenfield's site. Logging into Bluecrest and clicking an internal nav link with no `?tenant=` param stays correctly scoped to Bluecrest (the legitimate need the whole mechanism exists for). Clicking the now-real "Log Out" button returns to MatLearn's homepage immediately — no stale content, no reload needed — and a fresh visit to bare `/` afterward is still MatLearn (confirms the clear actually persisted, not just a one-render fluke).
- Mobile viewport (375px) overflow check: clean on all three surfaces touched.
