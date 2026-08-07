// In-app notifications, per user (MATLEARN_ROADMAP.md §8 — UI shell only,
// real-time delivery is Phase 2).
// BACKEND: GET /api/users/{userId}/notifications ; PATCH .../{id} { read: true }

const notifications = [
  {
    id: "n1",
    tenantId: "greenfield",
    userId: "greenfield-student-1",
    title: "New result released",
    body: "Your First Term 2025/2026 result has been released.",
    read: false,
    createdAt: "2026-08-01T09:00:00Z",
  },
  {
    id: "n2",
    tenantId: "bluecrest",
    userId: "bluecrest-student-1",
    title: "New test assigned",
    body: "Chemistry test on Periodic Table is due Friday.",
    read: false,
    createdAt: "2026-08-03T10:30:00Z",
  },
  {
    id: "n3",
    tenantId: "greenfield",
    userId: "greenfield-tutor-1",
    title: "Grading queue updated",
    body: "3 new essay submissions await grading.",
    read: true,
    createdAt: "2026-07-28T14:00:00Z",
  },
];

export function listNotificationsForUser(userId) {
  return notifications.filter((n) => n.userId === userId);
}
