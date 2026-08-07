// Sessions/terms/departments/classes/subjects, one structure per tenant.
// BACKEND: GET /api/schools/{tenantId}/academic-structure

const academicStructure = {
  greenfield: {
    sessions: [
      { sessionId: "2024-2025", label: "2024/2025", isCurrent: false },
      { sessionId: "2025-2026", label: "2025/2026", isCurrent: true },
    ],
    terms: [
      { termId: "first", label: "First Term" },
      { termId: "second", label: "Second Term" },
      { termId: "third", label: "Third Term" },
    ],
    departments: [
      { departmentId: "science", name: "Science" },
      { departmentId: "art", name: "Art" },
      { departmentId: "commercial", name: "Commercial" },
    ],
    classes: [
      { classId: "jss1", name: "JSS1", departmentId: null },
      { classId: "jss2", name: "JSS2", departmentId: null },
      { classId: "jss3", name: "JSS3", departmentId: null },
      { classId: "ss1", name: "SS1", departmentId: null },
      { classId: "ss2-science", name: "SS2 Science", departmentId: "science" },
      { classId: "ss2-art", name: "SS2 Art", departmentId: "art" },
      { classId: "ss3-science", name: "SS3 Science", departmentId: "science" },
    ],
    subjects: [
      { subjectId: "mathematics", name: "Mathematics" },
      { subjectId: "english", name: "English Language" },
      { subjectId: "biology", name: "Biology" },
      { subjectId: "physics", name: "Physics" },
      { subjectId: "chemistry", name: "Chemistry" },
      { subjectId: "economics", name: "Economics" },
      { subjectId: "government", name: "Government" },
    ],
  },
  bluecrest: {
    sessions: [
      { sessionId: "2024-2025", label: "2024/2025", isCurrent: false },
      { sessionId: "2025-2026", label: "2025/2026", isCurrent: true },
    ],
    terms: [
      { termId: "first", label: "First Term" },
      { termId: "second", label: "Second Term" },
      { termId: "third", label: "Third Term" },
    ],
    departments: [
      { departmentId: "science", name: "Science" },
      { departmentId: "humanities", name: "Humanities" },
    ],
    classes: [
      { classId: "grade7", name: "Grade 7", departmentId: null },
      { classId: "grade8", name: "Grade 8", departmentId: null },
      { classId: "grade9-science", name: "Grade 9 Science", departmentId: "science" },
      { classId: "grade9-humanities", name: "Grade 9 Humanities", departmentId: "humanities" },
      { classId: "grade10-science", name: "Grade 10 Science", departmentId: "science" },
    ],
    subjects: [
      { subjectId: "mathematics", name: "Mathematics" },
      { subjectId: "english", name: "English Language" },
      { subjectId: "chemistry", name: "Chemistry" },
      { subjectId: "geography", name: "Geography" },
      { subjectId: "literature", name: "Literature in English" },
    ],
  },
  royalheights: {
    sessions: [
      { sessionId: "2024-2025", label: "2024/2025", isCurrent: false },
      { sessionId: "2025-2026", label: "2025/2026", isCurrent: true },
    ],
    terms: [
      { termId: "first", label: "First Term" },
      { termId: "second", label: "Second Term" },
      { termId: "third", label: "Third Term" },
    ],
    departments: [{ departmentId: "science", name: "Science" }, { departmentId: "art", name: "Art" }],
    classes: [
      { classId: "jss1", name: "JSS1", departmentId: null },
      { classId: "ss1-science", name: "SS1 Science", departmentId: "science" },
      { classId: "ss1-art", name: "SS1 Art", departmentId: "art" },
    ],
    subjects: [
      { subjectId: "mathematics", name: "Mathematics" },
      { subjectId: "english", name: "English Language" },
      { subjectId: "biology", name: "Biology" },
      { subjectId: "history", name: "History" },
    ],
  },
};

export function getAcademicStructure(tenantId) {
  return academicStructure[tenantId] ?? null;
}

export function listSessions(tenantId) {
  return academicStructure[tenantId]?.sessions ?? [];
}

export function getCurrentSession(tenantId) {
  return (academicStructure[tenantId]?.sessions ?? []).find((s) => s.isCurrent) ?? null;
}

export function listClasses(tenantId) {
  return academicStructure[tenantId]?.classes ?? [];
}

export function listDepartments(tenantId) {
  return academicStructure[tenantId]?.departments ?? [];
}

export function listSubjects(tenantId) {
  return academicStructure[tenantId]?.subjects ?? [];
}
