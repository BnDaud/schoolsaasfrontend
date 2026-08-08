# Progress 24 — Real Notifications (Bell + Dashboard Card)

**Needs push to GitHub.**

Roadmap step: MATLEARN_ROADMAP.md §16 item 14 ("Notifications/announcements/search/promotion-history polish — cross-cutting, slot in wherever a screen needs them"). First slice: notifications.

## What was done

- `src/context/globalcontext.jsx` — added `userId` (mirrors the existing `classId` pattern), since nothing in context could key a per-user lookup before this.
- `src/pages/Authpages/schoolLoginpage.jsx` — sets `userId` from the matched mock user on login.
- `src/mocks/notifications.js` — added `markNotificationRead(id)` / `markAllNotificationsRead(userId)`, both dispatching a `notifications:changed` `window` event after mutating.
- `src/component/common/statusbanner.jsx` (the dashboard header, used by every role) — the bell icon's unread badge was hardcoded to `2`; it's now real: click opens a dropdown listing that user's notifications (`listNotificationsForUser`), click an item to mark it read, "Mark all read" when any are unread, "No notifications yet." when empty.
- `src/pages/schoolpages/studentpages/studentdashboard.jsx` — the "Notifications" card's body literally said "Coming Soon" with a dead button. Now shows up to 3 real notifications and a working "Mark All Read" action.

## A bug caught while verifying, and its real fix

First implementation used a manual "tick" `useState` + `useMemo(..., [userId, tick])` in both components to force recomputation after mutating the shared mock array. It looked fine, then a real browser test showed the header badge never updated after clicking "Mark All Read" on the dashboard card — in the *same* component that owns the tick.

Root cause: this repo's Vite config runs `babel-plugin-react-compiler`, which auto-memoizes `useMemo` by its own static analysis of what the callback body actually reads — not by trusting the manually-written dependency array. My callback (`() => listNotificationsForUser(userId)`) never referenced `tick` inside its body, so the compiler correctly (from its point of view) treated the memo as a pure function of `userId` alone and skipped recomputation when only `tick` changed. The "force-recompute via unused dependency" trick is a real anti-pattern under this compiler, not just here.

Fix: replaced both with a plain `useState` holding the notifications array itself, refreshed via a real `useEffect` (on `userId` change and on a `notifications:changed` window event dispatched by the two mark-read mutators) — no memo, no fake dependency, so there's nothing for the compiler to second-guess.

## Verified

- `npx eslint` clean on every touched file except the pre-existing baseline `'motion' is defined but never used` error in `studentdashboard.jsx` (confirmed pre-existing by linting the file at `HEAD` before any edits — same error, same line).
- Real browser test (puppeteer-core, `--no-save`): Greenfield student sees badge "1", dropdown shows "New result released", dashboard card shows it too; clicking "Mark All Read" clears the badge in the header (cross-component sync confirmed working after the fix above); Greenfield tutor's one notification is already-read, badge correctly stays hidden; Admin (who has no seeded notifications) sees "No notifications yet." instead of breaking.
