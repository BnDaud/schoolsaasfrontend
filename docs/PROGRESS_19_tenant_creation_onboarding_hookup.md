# Progress 19 — Tenant-Creation Onboarding Hookup

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 12 ("Super Admin refinements") — the last of the 3 named gaps, and an explicit §8 MVP item: "you already need 'generate tenant' (built); this is the *next* screen after that."

## What was done

Before this, `superadmintenants.jsx`'s create-tenant modal just closed silently on submit — no confirmation, no indication of what happens next for the new school. Replaced the silent close with a success step in the same modal:

- Confirms the school is live at its subdomain, and that an invite + temp password was sent to the admin's email (matching the existing `BACKEND CONTRACT` comment's stated behavior — the UI now actually reflects what that contract promises).
- Shows a 3-step "what the admin does next" checklist: open invite → set a real password on first login → complete initial setup (branding, first class, first teacher).
- "Done" closes the modal; the new tenant is already in the list underneath.

Scoped deliberately to the Super Admin side only — the confirmation screen right after tenant creation. The new admin's own first-login experience (forced password change screen, interactive setup checklist as a real page they walk through) is a separate, larger piece not built here; this closes "the *next* screen after generate tenant" specifically, per how the roadmap phrases the gap.

## Verified

- `npx eslint` clean.
- Scripted a real browser run (puppeteer-core, `--no-save`, uninstalled after): opened the create-tenant modal, filled the form, submitted, confirmed the success screen shows the correct school/subdomain line, the correct admin email in the invite-sent note, the admin's name in the checklist intro, and all 3 checklist steps. Clicked "Done", confirmed the modal closed and the new tenant appears in the underlying list.
- (Also had to restart the dev server mid-verification — it had died between sessions; unrelated to this change.)

## §16 item 12 status

All 3 named gaps now closed: global question bank/library management (deferred — see note below), platform audit log (`PROGRESS_16`/`17`), onboarding-wizard hookup (this). Actually: global question bank/library management for Super Admin (curating the shared WAEC/JAMB/NECO bank and global e-library) is **still not done** — flagging explicitly, not silently dropping it, since "don't leave anything behind" is the standing instruction for this phase.
