// Admin-authored announcements, read by Student/Tutor (MATLEARN_ROADMAP.md §8).
// BACKEND: GET /api/schools/{tenantId}/announcements ; POST (Admin only)

const announcements = [
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

export function listAnnouncementsForTenant(tenantId) {
  return announcements.filter((a) => a.tenantId === tenantId);
}
