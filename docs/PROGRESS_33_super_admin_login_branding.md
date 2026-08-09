# Progress 33 — Super Admin Login: Real Logo, Green, Dark Mode

**Needs push to GitHub.**

Follow-up to `PROGRESS_32`. You called out three specific things wrong with the redesign: it used a generic shield icon instead of MatLearn's real logo, indigo/dark-slate instead of the app's actual green branding, and no dark mode support (it was hardcoded to a dark background always, unlike every other page).

## What changed

`src/pages/Authpages/superAdminLoginpage.jsx` — rebuilt on the same visual language as the rest of the app, not a separate palette:
- Real logo: `Logo` from `utils/constant.jsx` (the green-box graduation-cap "Mat Learn" wordmark used in the site's own navbar), not `FiShield`.
- Green accent (`bg-green`), not indigo — matches the sign-in button styling used by `schoolLoginpage.jsx`/`learnerLoginpage.jsx`.
- Full light/dark support via the same `useDarkMode` hook and toggle button (`BsMoon`/`MdOutlineWbSunny`) used everywhere else, reading `darkmode` from `globalContext` — no more forced-dark `bg-slate-950`.
- Still its own standalone page (no shared `<Auth>` layout, no school-branding copy) — that distinction was correct and stays; only the *colors/logo/dark-mode* were wrong, not the "separate page" decision itself.

## Verified

- `npx eslint` clean.
- Real browser test (puppeteer-core, `--no-save`): page shows the real "Mat Learn" logo text, a `bg-green` sign-in button, and a working dark-mode toggle button. Login with `superadmin@matlearn.com` still succeeds and lands on the real dashboard.
