// Pending essay/manual-grade submissions, scoped per tenant + class
// (MATLEARN_ROADMAP.md §8 — "essay/manual-grade queue", UI shell only).
// BACKEND: GET /api/schools/{tenantId}/grading-queue?classId=&subjectId=

const gradingQueue = [
  {
    id: "gf-g1",
    tenantId: "greenfield",
    classId: "ss2-science",
    subjectId: "biology",
    studentId: "greenfield-student-1",
    testTitle: "Cell Biology Essay",
    submittedAt: "2026-08-04T10:00:00Z",
    status: "pending",
  },
  {
    id: "bc-g1",
    tenantId: "bluecrest",
    classId: "grade9-science",
    subjectId: "chemistry",
    studentId: "bluecrest-student-1",
    testTitle: "Periodic Table Short Answer",
    submittedAt: "2026-08-05T09:00:00Z",
    status: "pending",
  },
  {
    id: "rh-g1",
    tenantId: "royalheights",
    classId: "ss1-science",
    subjectId: "biology",
    studentId: "royalheights-student-1",
    testTitle: "Genetics Essay",
    submittedAt: "2026-08-03T11:00:00Z",
    status: "graded",
  },
];

export function listGradingQueueForTutor(tenantId, assignedClassIds = []) {
  return gradingQueue.filter(
    (item) => item.tenantId === tenantId && assignedClassIds.includes(item.classId),
  );
}
