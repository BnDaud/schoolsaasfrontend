# Progress 06 — School Public Site (Home + Contact, all 3 tenants)

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 5 ("School public website + landing builder"), first slice — the "prove it's not one school renamed" milestone, scoped to Home + Contact.

## What was done

This is the fix for the earlier open question: `?tenant=` only changed the browser tab (title/favicon/CSS var), not the page body, because no school-specific page existed yet. Now it does.

- **`src/layouts/schoolpublic/schoolpublicnav.jsx` (new layout)** — distinct shell from `LandingPagenav` per §5 ("don't fork the shell" applies to *sibling* roles sharing a shell; a school's public site and MatLearn's own are genuinely different products, so this is a real second shell, not a fork).
- **`src/component/navigations/schoolnavbar.jsx`** — tenant-branded navbar (brand color via the existing `--brand-color` CSS var, tenant name, Home/Contact links, Student/Staff Login button to `/auth/login`).
- **`src/component/common/schoolfooter.jsx`** — simple tenant-branded footer (not a retrofit of the existing MatLearn `Footer`, which is hardcoded to MatLearn's own marketing links).
- **`src/pages/schoolpages/publicpages/schoolhome.jsx`** — hero (tenant name, motto, about blurb) + stat tiles pulled live from the `academicStructure` mock (classes/subjects/departments counts) — genuinely tenant-specific, not copy-pasted numbers.
- **`src/pages/schoolpages/publicpages/schoolcontact.jsx`** — tenant address/email/phone, pulled from `tenants.js`.
- **`src/mocks/tenants.js`** — added a `publicSite` block per tenant (motto, about, address, email, phone) — 3 genuinely different write-ups, not one school renamed.
- **`src/app/public-site-dispatch.jsx` (new)** — the actual tenantType route-tree switch from roadmap §1's diagram: `PublicLayoutDispatch`/`HomeDispatch`/`ContactDispatch` pick the school or MatLearn layout+page based on `tenantContext`. Wired into `route.jsx` in place of the old static `<LandingPagenav>`/`<Home>`/`<Contact>` wiring for the `/` and `/contact` paths only.

## Verified (properly this time — headless Chrome, not curl)

Earlier steps over-trusted `curl -o /dev/null -w "%{http_code}"` as proof a route worked — for a client-side-routed SPA that only proves the shell loaded, not that React Router resolved to the right content (this is exactly what caused the "routes to 404" confusion earlier in this session). Fixed the verification method this time:

- `chromium --headless=new --dump-dom` against `/`, `/?tenant=greenfield`, `/?tenant=bluecrest`, `/?tenant=royalheights`, `/?tenant=matlearn`, and `/contact?tenant=bluecrest` — confirmed each renders **genuinely distinct page body content** (different `<h1>`, different motto, different contact info), and `?tenant=matlearn` correctly falls back to the public MatLearn home.
- Checked headless Chrome's stderr log for JS exceptions — none (all noise was Chrome's own internal telemetry/histograms).
- `npx eslint` clean on all 8 new/touched files.

## Not done yet (explicitly deferred, same roadmap item)

- Academics/Staff/Admissions/Blog/Events/Gallery school public pages (§4.2 route list) — only Home/Contact built this slice. Visiting `/features`, `/about`, `/pricing`, `/self-study` under a school tenant still shows MatLearn's own content (wrapped in the school-branded nav/footer, a known minor cosmetic mismatch, not a broken route).
- Admin landing-page builder (toggle which public sections render) — `/app/admin/website` from the route table, not started.
