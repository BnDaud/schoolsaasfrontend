// Admin-authored announcements, read by Student/Tutor (MATLEARN_ROADMAP.md §8).
// BACKEND: GET /api/schools/{tenantId}/announcements ; POST (Admin only)

const announcementSeed = [
  {
    id: "a1",
    tenantId: "greenfield",
    authorId: "greenfield-admin-1",
    title: "Resumption Date",
    body: "School resumes for the new term on Monday, August 10.",
    audience: "all",
    createdAt: "2026-08-01T08:00:00Z",
  },
  {
    id: "a2",
    tenantId: "bluecrest",
    authorId: "bluecrest-admin-1",
    title: "Mid-term Break",
    body: "Mid-term break runs from August 14 to August 18.",
    audience: "all",
    createdAt: "2026-08-05T08:00:00Z",
  },
];

function seedForTenant(tenantId) {
  return announcementSeed.filter((a) => a.tenantId === tenantId);
}

// localStorage-backed, namespaced per tenant (same pattern as
// mocks/library.js's tenant library) — lets a school admin post an
// announcement without a backend, without leaking into another tenant's feed.
const announcementStorageKeyFor = (tenantId) => `matlearn:tenant-announcements:${tenantId ?? "default"}`;

export function listAnnouncementsForTenant(tenantId) {
  const seed = seedForTenant(tenantId);
  if (typeof window === "undefined") return seed;

  try {
    const stored = window.localStorage.getItem(announcementStorageKeyFor(tenantId));
    return stored ? JSON.parse(stored) : seed;
  } catch {
    return seed;
  }
}

export function addAnnouncement(tenantId, authorId, title, body) {
  const current = listAnnouncementsForTenant(tenantId);
  const next = [
    {
      id: `a-${tenantId}-${Date.now()}`,
      tenantId,
      authorId,
      title,
      body,
      audience: "all",
      createdAt: new Date().toISOString(),
    },
    ...current,
  ];

  if (typeof window !== "undefined") {
    window.localStorage.setItem(announcementStorageKeyFor(tenantId), JSON.stringify(next));
    window.dispatchEvent(new Event("announcements:changed"));
  }
  return next;
}
