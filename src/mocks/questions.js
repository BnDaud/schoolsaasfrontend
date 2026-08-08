// Global exam-body question bank (WAEC/JAMB/NECO) + one private bank per demo
// tenant. Same canonical shape for both, so global and tenant banks can be
// merged/filtered identically by the assessment engine (MATLEARN_ROADMAP.md §10).
// BACKEND: GET /api/questions/global?examBody=&year=&subject= ; GET /api/schools/{tenantId}/questions

const globalQuestions = [
  {
    questionId: "waec-2023-math-q1",
    examBody: "WAEC",
    year: 2023,
    subject: "Mathematics",
    topic: "Algebra",
    text: "Solve for x: 2x + 5 = 15",
    options: ["3", "5", "10", "20"],
    answer: "5",
    difficulty: "Easy",
  },
  {
    questionId: "waec-2023-eng-q1",
    examBody: "WAEC",
    year: 2023,
    subject: "English Language",
    topic: "Comprehension",
    text: "Choose the word that best completes the sentence: She was ___ to attend the meeting.",
    options: ["unable", "unables", "inable", "disable"],
    answer: "unable",
    difficulty: "Easy",
  },
  {
    questionId: "jamb-2024-bio-q1",
    examBody: "JAMB",
    year: 2024,
    subject: "Biology",
    topic: "Cell Biology",
    text: "Which organelle is responsible for protein synthesis?",
    options: ["Mitochondria", "Ribosome", "Golgi body", "Lysosome"],
    answer: "Ribosome",
    difficulty: "Medium",
  },
  {
    questionId: "neco-2024-phy-q1",
    examBody: "NECO",
    year: 2024,
    subject: "Physics",
    topic: "Mechanics",
    text: "A body moving at constant velocity has an acceleration of:",
    options: ["Zero", "Positive", "Negative", "Infinite"],
    answer: "Zero",
    difficulty: "Medium",
  },
];

const tenantQuestions = {
  greenfield: [
    {
      questionId: "greenfield-bio-q1",
      subject: "Biology",
      topic: "Cell Structure",
      text: "Name the powerhouse of the cell.",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Vacuole"],
      answer: "Mitochondria",
      difficulty: "Easy",
    },
  ],
  bluecrest: [
    {
      questionId: "bluecrest-chem-q1",
      subject: "Chemistry",
      topic: "Periodic Table",
      text: "What is the atomic number of Carbon?",
      options: ["4", "6", "8", "12"],
      answer: "6",
      difficulty: "Easy",
    },
  ],
  royalheights: [
    {
      questionId: "royalheights-bio-q1",
      subject: "Biology",
      topic: "Genetics",
      text: "A cross between two heterozygous parents (Aa x Aa) produces what ratio of dominant to recessive traits?",
      options: ["1:1", "3:1", "1:3", "2:2"],
      answer: "3:1",
      difficulty: "Medium",
    },
  ],
};

// Single shared key — this bank is genuinely global (same for every tenant
// and every independent learner), not namespaced like a tenant's own data.
const GLOBAL_QUESTIONS_STORAGE_KEY = "matlearn:global-questions";

function loadGlobalQuestionsRaw() {
  if (typeof window === "undefined") return globalQuestions;

  try {
    const stored = window.localStorage.getItem(GLOBAL_QUESTIONS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : globalQuestions;
  } catch {
    return globalQuestions;
  }
}

// Super Admin curation (MATLEARN_ROADMAP.md §16 item 12) — add/remove from
// the shared WAEC/JAMB/NECO bank without touching any tenant's own data.
export function loadGlobalQuestions() {
  return loadGlobalQuestionsRaw();
}

export function saveGlobalQuestions(questions) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(GLOBAL_QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
}

export function listGlobalQuestions({ examBody, year, subject } = {}) {
  return loadGlobalQuestionsRaw().filter(
    (q) =>
      (!examBody || q.examBody === examBody) &&
      (!year || q.year === year) &&
      (!subject || q.subject === subject),
  );
}

export function listTenantQuestions(tenantId) {
  return tenantQuestions[tenantId] ?? [];
}

export function getQuestionById(questionId) {
  return (
    loadGlobalQuestionsRaw().find((q) => q.questionId === questionId) ??
    Object.values(tenantQuestions)
      .flat()
      .find((q) => q.questionId === questionId) ??
    null
  );
}
