export const tutorAssignments = [
  { className: "JSS1", subject: "Mathematics" },
  { className: "SS3", subject: "Physics" },
  { className: "SS2", subject: "Chemistry" },
];

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
};

export const difficultyLevels = ["Easy", "Medium", "Hard", "Medium"];

export const defaultAssignment = tutorAssignments[0];

export const getSubjectsForClass = (className) =>
  tutorAssignments
    .filter((assignment) => assignment.className === className)
    .map((assignment) => assignment.subject);

export const getClassOptions = () => [
  ...new Set(tutorAssignments.map((assignment) => assignment.className)),
];

export const questionBank = tutorAssignments.flatMap(({ className, subject }) =>
  Array.from({ length: 40 }, (_, index) => {
    const questionNumber = index + 1;
    const topic =
      topicsBySubject[subject][index % topicsBySubject[subject].length];

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
  }),
);

const tutorQuestionBankStorageKey = "school-tutor-question-bank";

export const loadTutorQuestionBank = () => {
  if (typeof window === "undefined") return questionBank;

  try {
    const storedQuestions = window.localStorage.getItem(
      tutorQuestionBankStorageKey,
    );

    return storedQuestions ? JSON.parse(storedQuestions) : questionBank;
  } catch {
    return questionBank;
  }
};

export const saveTutorQuestionBank = (questions) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    tutorQuestionBankStorageKey,
    JSON.stringify(questions),
  );
};

export const initialTutorExams = [
  {
    id: 1,
    title: "JSS1 Mathematics Mid-Term",
    subject: "Mathematics",
    className: "JSS1",
    duration: 45,
    dateTime: "2026-06-02T09:00",
    selectedQuestions: ["JSS1-Mathematics-1", "JSS1-Mathematics-2"],
    status: "Draft",
  },
  {
    id: 2,
    title: "SS3 Physics Practical",
    subject: "Physics",
    className: "SS3",
    duration: 60,
    dateTime: "2026-06-10T11:30",
    selectedQuestions: ["SS3-Physics-1", "SS3-Physics-2", "SS3-Physics-3"],
    status: "Published",
  },
];
