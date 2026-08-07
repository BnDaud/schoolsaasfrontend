// Historical results across 2+ academic sessions, to demo promotion history
// (MATLEARN_ROADMAP.md §11) without implementing promotion logic.
// BACKEND: GET /api/schools/{tenantId}/students/{studentId}/results

const results = [
  {
    resultId: "greenfield-r1",
    tenantId: "greenfield",
    studentId: "greenfield-student-1",
    sessionId: "2024-2025",
    termId: "third",
    classId: "ss1",
    subjectScores: [
      { subjectId: "mathematics", score: 78 },
      { subjectId: "biology", score: 82 },
      { subjectId: "english", score: 75 },
    ],
    average: 78.3,
    position: 3,
  },
  {
    resultId: "greenfield-r2",
    tenantId: "greenfield",
    studentId: "greenfield-student-1",
    sessionId: "2025-2026",
    termId: "first",
    classId: "ss2-science",
    subjectScores: [
      { subjectId: "mathematics", score: 85 },
      { subjectId: "biology", score: 88 },
      { subjectId: "physics", score: 80 },
    ],
    average: 84.3,
    position: 2,
  },
  {
    resultId: "bluecrest-r1",
    tenantId: "bluecrest",
    studentId: "bluecrest-student-1",
    sessionId: "2024-2025",
    termId: "third",
    classId: "grade8",
    subjectScores: [
      { subjectId: "mathematics", score: 70 },
      { subjectId: "chemistry", score: 74 },
    ],
    average: 72,
    position: 5,
  },
  {
    resultId: "bluecrest-r2",
    tenantId: "bluecrest",
    studentId: "bluecrest-student-1",
    sessionId: "2025-2026",
    termId: "first",
    classId: "grade9-science",
    subjectScores: [
      { subjectId: "mathematics", score: 76 },
      { subjectId: "chemistry", score: 81 },
    ],
    average: 78.5,
    position: 4,
  },
];

export function listResultsForStudent(studentId) {
  return results.filter((r) => r.studentId === studentId);
}

export function listResultsForTenant(tenantId) {
  return results.filter((r) => r.tenantId === tenantId);
}
