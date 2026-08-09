# Progress 35 — Super Admin Login Was Reachable Only By Typing the URL

**Needs push to GitHub.**

You asked about the route to the Super Admin login. Checked: `/matlearn/login` existed as a route, but nothing in the UI linked to it anywhere — the only way to reach it was typing the exact URL. Confirmed via `grep -rn "matlearn/login" src/` finding zero references outside the route definition and the page itself.

## What was done

- `src/component/common/footer.jsx` — added a small "Platform Login" link next to the copyright line, pointing to `/matlearn/login`. This footer (`Footer`) is only used on the generic public MatLearn site (`LandingPagenav`) — a school tenant's own public site uses a separate `SchoolFooter` component, so this link correctly never appears on a school's own branded pages.

## Verified

- `npx eslint` clean.
- Real browser test (puppeteer-core, `--no-save`): the link is present on the public MatLearn homepage footer, resolves to `/matlearn/login`, and clicking it lands on the real "Platform Sign In" page. Confirmed it does NOT appear on a school's own public site (e.g. `?tenant=greenfield`), since that uses `SchoolFooter`, not this component.

## Link

`http://localhost:3000/matlearn/login` — also now in the footer of `http://localhost:3000/` as "Platform Login".
