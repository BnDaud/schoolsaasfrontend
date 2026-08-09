# Progress 34 — Public Site: Self-Paced Learner Content + Broken/Inconsistent Link Audit

**Needs push to GitHub.**

You asked me to go through the home page and features content, add what's missing for schools and self-paced learners, and fix broken/inconsistent UI. Audited every navigation destination across the public site (`home`, `features`, `self-study`, `pricing`, `about`, `contact`, the navbar, and the footer) plus content coverage — found more than expected.

## The biggest one: navbar sent every visitor into a broken flow

`navbar.jsx` — the navbar used on the generic public MatLearn site (Home/Features/Self Study/Pricing/About/Contact — anywhere `tenantType !== "school"`) had its "Login" and "Get Started" buttons pointing at `/auth/login` / `/auth/register` — the **school-tenant** auth routes, which require a resolved `?tenant=` context and show an error without one. Anyone landing on the real public MatLearn homepage and clicking the main nav's own Login/Get Started buttons hit a dead end. Fixed to `/login` / `/register` — the independent-learner routes, correct for this navbar's actual audience.

## Content gap: self-paced learners were invisible on the home page

`home.jsx` was 100% school-focused — hero copy, testimonials, every CTA. There was no mention anywhere that MatLearn also serves independent learners directly, and no link to `/self-study` at all. Added a new section (between the achievement stats and the school testimonials, so the testimonials block stays coherent as school-specific) introducing the self-paced track with a real CTA into `/self-study`.

## Broken/dead links fixed

- **`/signup` was never a real route** (only `/register` and `/auth/register` exist) — 5 buttons across `home.jsx`, `pricing.jsx`, and `selfstudy.jsx` (×3) linked to it. Fixed each to the correct real destination for its actual audience.
- **Every "Start Free Trial" / "Talk to Sales" / "Contact Sales" button aimed at schools** (`home.jsx` ×2, `features.jsx`, `about.jsx` ×2, `pricing.jsx`) pointed at `/features` or, in one case, back at `/` — none of which make sense for a trial/sales CTA. There is no self-serve "sign up my school" flow yet (`/auth/register` only lets someone **join** an existing tenant, it can't create a new one — confirmed by reading `schoolRegister.jsx`), so these now point at `/contact`, the honest real destination until that flow exists.
- **The contact form didn't submit** — its "Send Message" button had an `href` that navigated to `/features` instead of submitting the form. Now a real `onSubmit` handler shows a "Message sent!" confirmation.
- **"Partnership Inquiry" button** also had a dead `href="/features"` — changed to a real `mailto:` link.
- **Footer**: `/demo`, `/updates`, `/help-center`, `/documentation`, `/blog`, `/support`, `/careers`, `/privacy` were all links to pages that don't exist anywhere in the app. Rather than link to nothing (or invent placeholder pages, which is its own kind of broken), mapped the ones with a real substitute (Help Center/Support → `/contact`, added a "Self-Paced Learning" → `/self-study` link) and removed the rest — a missing link is more honest than a dead one.
- **`selfstudy.jsx`**'s own bottom banner: "View Pricing" pointed at `/features` instead of `/pricing`.

## Also fixed while in these files (pre-existing, unrelated to the above, but trivial and safe)

- `home.jsx` had a stray comma in its `reviews` array (`{...}, , {...}`), creating a sparse-array hole flagged by `no-sparse-arrays`. `.map()` silently skips holes so it wasn't visibly broken, but it was dead weight from a past edit.
- `footer.jsx` had unused `useEffect` and `navigate` — removed.

## Verified

- `npx eslint` clean on every touched file.
- Full `src/` lint sweep: 36 problems (down from 39 — the two baseline fixes above, no regressions).
- Real browser test (puppeteer-core, `--no-save`): navbar Login/Get Started now resolve to `/login`/`/register`; home page shows the new self-paced-learner section with a working `/self-study` link; every button destination re-audited (`grep`) confirms a coherent split — school CTAs → `/contact`, learner CTAs → `/register`/`/login`, all real routes; contact form shows "Message sent!" and stays on `/contact` instead of navigating away; all 3 testimonials render (confirming the sparse-array fix didn't break anything).
- Mobile (375px) and desktop (1280px) overflow check across all 7 touched public pages: clean.
