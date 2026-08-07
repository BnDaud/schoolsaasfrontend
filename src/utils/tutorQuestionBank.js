import { listClasses, listSubjects } from "../mocks/academicStructure";

export const topicsBySubject = {
  Mathematics: [
    "Fractions",
    "Algebra",
    "Geometry",
    "Ratio",
    "Decimals",
    "Number Line",
    "Simple Interest",
    "Statistics",
  ],
  Physics: [
    "Motion",
    "Electricity",
    "Waves",
    "Light",
    "Energy",
    "Magnetism",
    "Pressure",
    "Heat",
  ],
  Chemistry: [
    "Acids and Bases",
    "Periodic Table",
    "Chemical Bonding",
    "Mole Concept",
    "Organic Chemistry",
    "Separation Techniques",
    "Oxidation",
    "Atomic Structure",
  ],
  Biology: [
    "Cell Structure",
    "Genetics",
    "Photosynthesis",
    "Respiration",
    "Ecology",
    "Reproduction",
    "Classification",
    "Nutrition",
  ],
};

const FALLBACK_TOPICS = ["General"];

export const difficultyLevels = ["Easy", "Medium", "Hard", "Medium"];

// Resolves a tutor's assigned class/subject IDs into real {className, subject}
// pairs for the given tenant. Replaces the old hardcoded tutorAssignments
// constant, which was the same 3 pairs (JSS1/Math, SS3/Physics, SS2/Chemistry)
// for every tutor on every tenant — never tenant-scoped, never tied to who
// was actually logged in (MATLEARN_ROADMAP.md §14).
export const resolveTutorAssignments = (tenantId, assignedClassIds = [], assignedSubjectIds = []) => {
  const classes = listClasses(tenantId);
  const subjects = listSubjects(tenantId);
  const classNames = assignedClassIds
    .map((classId) => classes.find((k) => k.classId === classId)?.name)
    .filter(Boolean);
  const subjectNames = assignedSubjectIds
    .map((subjectId) => subjects.find((s) => s.subjectId === subjectId)?.name)
    .filter(Boolean);

  return classNames.flatMap((className) =>
    subjectNames.map((subject) => ({ className, subject })),
  );
};

// Merges several tutors' resolved assignments (e.g. every tutor in a
// tenant) into one deduplicated list, for admin-facing school-wide views.
export const mergeTutorAssignments = (assignmentArrays) => {
  const seen = new Set();
  return assignmentArrays.flat().filter((assignment) => {
    const key = `${assignment.className}|${assignment.subject}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const getDefaultAssignment = (tutorAssignments) =>
  tutorAssignments[0] ?? { className: "", subject: "" };

export const getSubjectsForClass = (className, tutorAssignments) =>
  tutorAssignments
    .filter((assignment) => assignment.className === className)
    .map((assignment) => assignment.subject);

export const getClassOptions = (tutorAssignments) => [
  ...new Set(tutorAssignments.map((assignment) => assignment.className)),
];

export const buildQuestionBank = (tutorAssignments) =>
  tutorAssignments.flatMap(({ className, subject }) => {
    const topics = topicsBySubject[subject] ?? FALLBACK_TOPICS;

    return Array.from({ length: 40 }, (_, index) => {
      const questionNumber = index + 1;
      const topic = topics[index % topics.length];

      return {
        id: `${className}-${subject}-${questionNumber}`,
        className,
        subject,
        topic,
        question: `${className} ${subject} question ${questionNumber}: answer a ${topic.toLowerCase()} problem from the tutor question bank.`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
        difficulty: difficultyLevels[index % difficultyLevels.length],
        mark: 1,
      };
    });
  });

// Namespaced per tenant. The old single global key meant a tutor's saved
// questions at one tenant leaked into every other tenant viewed in the same
// browser — trivially reproducible in this demo just by switching ?tenant=.
const storageKeyFor = (tenantId) => `school-tutor-question-bank:${tenantId ?? "default"}`;

export const loadTutorQuestionBank = (tenantId, fallbackQuestionBank) => {
  if (typeof window === "undefined") return fallbackQuestionBank;

  try {
    const storedQuestions = window.localStorage.getItem(storageKeyFor(tenantId));

    return storedQuestions ? JSON.parse(storedQuestions) : fallbackQuestionBank;
  } catch {
    return fallbackQuestionBank;
  }
};

export const saveTutorQuestionBank = (tenantId, questions) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(storageKeyFor(tenantId), JSON.stringify(questions));
};

export const buildInitialExams = (tutorAssignments) =>
  tutorAssignments.slice(0, 2).map((assignment, index) => ({
    id: index + 1,
    title: `${assignment.className} ${assignment.subject} ${index === 0 ? "Mid-Term" : "Practical"}`,
    subject: assignment.subject,
    className: assignment.className,
    duration: 45,
    dateTime: index === 0 ? "2026-08-12T09:00" : "2026-08-20T11:30",
    selectedQuestions: [
      `${assignment.className}-${assignment.subject}-1`,
      `${assignment.className}-${assignment.subject}-2`,
    ],
    status: index === 0 ? "Draft" : "Published",
  }));
