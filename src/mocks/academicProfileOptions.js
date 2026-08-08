// Generic option lists for the independent learner's self-managed academic
// profile (MATLEARN_ROADMAP.md §0 assumption 3) — deliberately separate from
// mocks/academicStructure.js, which is a school tenant's own (admin-managed)
// structure. An independent learner has no tenant, so has no classId/
// departmentId to resolve against; these are plain, tenant-agnostic options.

export const educationLevels = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

export const departments = ["Science", "Art", "Commercial"];

export const subjects = [
  "Mathematics",
  "English Language",
  "Biology",
  "Physics",
  "Chemistry",
  "Economics",
  "Government",
  "Geography",
  "Literature in English",
  "History",
  "Civic Education",
];

// Multiple selectable at once (a learner can prep for JAMB and WAEC
// together, or a local exam alongside a foreign one like IELTS).
export const examGoals = ["WAEC", "JAMB", "NECO", "NAPTEB", "IELTS", "TOEFL", "SAT"];
