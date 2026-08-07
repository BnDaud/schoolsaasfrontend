import React, { useContext, useMemo, useState } from "react";
import {
  FiBookOpen,
  FiCheckCircle,
  FiDownload,
  FiEdit2,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Input from "../../../component/ui/input";
import { globalContext } from "../../../context/globalcontext";
import { tenantContext } from "../../../app/tenant-provider";
import {
  buildQuestionBank,
  getClassOptions,
  getDefaultAssignment,
  getSubjectsForClass,
  loadTutorQuestionBank,
  resolveTutorAssignments,
  saveTutorQuestionBank,
} from "../../../utils/tutorQuestionBank";

const emptyQuestion = {
  topic: "",
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  difficulty: "Easy",
  mark: 1,
};

const getDifficultyStyle = (difficulty) => {
  if (difficulty === "Hard") return "bg-red-100 text-red-600 dark:bg-red-950/30";
  if (difficulty === "Medium")
    return "bg-amber-100 text-amber-600 dark:bg-amber_deep/20";
  return "bg-green/10 text-green";
};

const sampleImportRows = [
  {
    topic: "Fractions",
    question: "What is 1/2 + 1/4?",
    optionA: "3/4",
    optionB: "1/4",
    optionC: "2/6",
    optionD: "1/8",
    correctAnswer: "3/4",
    difficulty: "Easy",
    mark: 1,
  },
  {
    topic: "Algebra",
    question: "Solve for x: 2x + 4 = 10",
    optionA: "3",
    optionB: "4",
    optionC: "5",
    optionD: "6",
    correctAnswer: "3",
    difficulty: "Medium",
    mark: 1,
  },
];

const parseCsvLine = (line) => {
  const cells = [];
  let value = "";
  let insideQuote = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && insideQuote && nextChar === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      insideQuote = !insideQuote;
    } else if (char === "," && !insideQuote) {
      cells.push(value.trim());
      value = "";
    } else {
      value += char;
    }
  }

  cells.push(value.trim());
  return cells;
};

const parseCsvQuestions = (text, className, subject) => {
  const rows = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseCsvLine);
  const dataRows =
    rows[0]?.[0]?.toLowerCase() === "topic" ? rows.slice(1) : rows;

  return dataRows
    .map((row, index) => {
      const [
        topic,
        question,
        optionA = "",
        optionB = "",
        optionC = "",
        optionD = "",
        correctAnswer = optionA,
        difficulty = "Easy",
        mark = "1",
      ] = row;

      if (!topic || !question) return null;

      return {
        id: `${className}-${subject}-import-${Date.now()}-${index}`,
        className,
        subject,
        topic,
        question,
        options: [optionA, optionB, optionC, optionD],
        correctAnswer: correctAnswer || optionA,
        difficulty: ["Easy", "Medium", "Hard"].includes(difficulty)
          ? difficulty
          : "Easy",
        mark: Number(mark) || 1,
      };
    })
    .filter(Boolean);
};

const getTemplateCsv = () => {
  const header =
    "Topic,Question,Option A,Option B,Option C,Option D,Correct Answer,Difficulty,Mark";
  const rows = sampleImportRows.map((row) =>
    [
      row.topic,
      row.question,
      row.optionA,
      row.optionB,
      row.optionC,
      row.optionD,
      row.correctAnswer,
      row.difficulty,
      row.mark,
    ]
      .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
      .join(","),
  );

  return [header, ...rows].join("\n");
};

export default function QuestionBank() {
  const { assignedClassIds, assignedSubjectIds } = useContext(globalContext);
  const { tenantId } = useContext(tenantContext);

  const tutorAssignments = useMemo(
    () => resolveTutorAssignments(tenantId, assignedClassIds, assignedSubjectIds),
    [tenantId, assignedClassIds, assignedSubjectIds],
  );
  const defaultAssignment = useMemo(() => getDefaultAssignment(tutorAssignments), [tutorAssignments]);
  const fallbackQuestionBank = useMemo(() => buildQuestionBank(tutorAssignments), [tutorAssignments]);

  const [questions, setQuestions] = useState(() => loadTutorQuestionBank(tenantId, fallbackQuestionBank));
  const [selectedClass, setSelectedClass] = useState(defaultAssignment.className);
  const [selectedSubject, setSelectedSubject] = useState(defaultAssignment.subject);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState(emptyQuestion);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importMessage, setImportMessage] = useState("");

  const classOptions = useMemo(() => getClassOptions(tutorAssignments), [tutorAssignments]);
  const subjectOptions = useMemo(
    () => getSubjectsForClass(selectedClass, tutorAssignments),
    [selectedClass, tutorAssignments],
  );

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesAssignment =
        question.className === selectedClass && question.subject === selectedSubject;
      const matchesSearch =
        searchTerm.trim() === "" ||
        question.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.question.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesAssignment && matchesSearch;
    });
  }, [questions, searchTerm, selectedClass, selectedSubject]);

  const updateSelectedClass = (className) => {
    setSelectedClass(className);
    setSelectedSubject(getSubjectsForClass(className, tutorAssignments)[0]);
    resetForm();
  };

  const updateOption = (index, value) => {
    setForm((prev) => ({
      ...prev,
      options: prev.options.map((option, optionIndex) =>
        optionIndex === index ? value : option,
      ),
    }));
  };

  const resetForm = () => {
    setForm(emptyQuestion);
    setEditingQuestionId(null);
  };

  const saveQuestion = (event) => {
    event.preventDefault();

    if (!form.topic.trim() || !form.question.trim()) return;

    const cleanedOptions = form.options.map((option) => option.trim());
    const nextQuestion = {
      id:
        editingQuestionId ||
        `${selectedClass}-${selectedSubject}-custom-${Date.now()}`,
      className: selectedClass,
      subject: selectedSubject,
      topic: form.topic.trim(),
      question: form.question.trim(),
      options: cleanedOptions,
      correctAnswer: form.correctAnswer.trim() || cleanedOptions[0],
      difficulty: form.difficulty,
      mark: Number(form.mark),
    };

    if (editingQuestionId) {
      setQuestions((prev) => {
        const nextQuestions = prev.map((question) =>
          question.id === editingQuestionId ? nextQuestion : question,
        );

        saveTutorQuestionBank(tenantId, nextQuestions);
        return nextQuestions;
      });
      resetForm();
      return;
    }

    setQuestions((prev) => {
      const nextQuestions = [nextQuestion, ...prev];

      saveTutorQuestionBank(tenantId, nextQuestions);
      return nextQuestions;
    });
    resetForm();
  };

  const importQuestionsFromFile = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      setImportMessage(
        "Excel files should be saved as CSV first. XLS/XLSX parsing needs an Excel parser package when we wire the backend.",
      );
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const importedQuestions = parseCsvQuestions(
        String(reader.result || ""),
        selectedClass,
        selectedSubject,
      );

      if (importedQuestions.length === 0) {
        setImportMessage("No valid questions found in the selected file.");
        return;
      }

      setQuestions((prev) => {
        const nextQuestions = [...importedQuestions, ...prev];

        saveTutorQuestionBank(tenantId, nextQuestions);
        return nextQuestions;
      });
      setImportMessage(`${importedQuestions.length} questions imported.`);
      event.target.value = "";
    };

    reader.readAsText(file);
  };

  const downloadCsvTemplate = () => {
    const blob = new Blob([getTemplateCsv()], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${selectedClass}-${selectedSubject}-question-template.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const editQuestion = (question) => {
    setEditingQuestionId(question.id);
    setSelectedClass(question.className);
    setSelectedSubject(question.subject);
    setForm({
      topic: question.topic,
      question: question.question,
      options: question.options || ["", "", "", ""],
      correctAnswer: question.correctAnswer || "",
      difficulty: question.difficulty,
      mark: question.mark || 1,
    });
  };

  const deleteQuestion = (questionId) => {
    setQuestions((prev) => {
      const nextQuestions = prev.filter((question) => question.id !== questionId);

      saveTutorQuestionBank(tenantId, nextQuestions);
      return nextQuestions;
    });

    if (editingQuestionId === questionId) {
      resetForm();
    }
  };

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            Question Bank
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Add and manage questions only for the classes and subjects you teach.
          </p>
        </div>

        <Input
          type={"text"}
          width={"lg:w-80 w-full"}
          placeholder={"Search questions..."}
          onChange={setSearchTerm}
          icon={<FiSearch className="text-lg" />}
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[420px_1fr]">
        <form
          onSubmit={saveQuestion}
          className="max-h-[calc(100vh-140px)] space-y-4 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5"
        >
          <div className="flex items-center gap-2">
            {editingQuestionId ? (
              <FiEdit2 className="text-2xl text-green" />
            ) : (
              <FiPlus className="text-2xl text-green" />
            )}
            <p className="text-lg font-bold text-black dark:text-white">
              {editingQuestionId ? "Edit Question" : "Add Question"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <p className="mb-2 font-bold text-black dark:text-white">Class</p>
              <select
                value={selectedClass}
                onChange={(event) => updateSelectedClass(event.target.value)}
                className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
              >
                {classOptions.map((className) => (
                  <option key={className}>{className}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <p className="mb-2 font-bold text-black dark:text-white">
                Subject
              </p>
              <select
                value={selectedSubject}
                onChange={(event) => {
                  setSelectedSubject(event.target.value);
                  resetForm();
                }}
                className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
              >
                {subjectOptions.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="rounded-2xl border border-dashed border-gray-300 bg-white_bg p-3 dark:border-gray-700 dark:bg-black">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="font-bold text-black dark:text-white">
                  Bulk Import
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Upload a CSV exported from Excel for this class and subject.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setImportMessage("");
                  setShowImportModal(true);
                }}
                className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 font-bold text-gray-700 transition-all duration-300 hover:border-green hover:text-green dark:border-gray-700 dark:text-gray-200"
              >
                <FiUploadCloud />
                Import
              </button>
            </div>
          </div>

          <label className="block">
            <p className="mb-2 font-bold text-black dark:text-white">Topic</p>
            <input
              value={form.topic}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, topic: event.target.value }))
              }
              placeholder="e.g. Algebra"
              className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-black outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-white"
            />
          </label>

          <label className="block">
            <p className="mb-2 font-bold text-black dark:text-white">Question</p>
            <textarea
              value={form.question}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, question: event.target.value }))
              }
              placeholder="Write the question here..."
              className="min-h-28 w-full resize-none rounded-2xl border border-gray-200 bg-white_bg px-4 py-3 font-bold text-black outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-white"
            />
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {form.options.map((option, index) => (
              <label key={index} className="block">
                <p className="mb-2 font-bold text-black dark:text-white">
                  Option {index + 1}
                </p>
                <input
                  value={option}
                  onChange={(event) => updateOption(index, event.target.value)}
                  className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-black outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-white"
                />
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="block">
              <p className="mb-2 font-bold text-black dark:text-white">Answer</p>
              <input
                value={form.correctAnswer}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    correctAnswer: event.target.value,
                  }))
                }
                placeholder="Correct option"
                className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-black outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-white"
              />
            </label>
            <label className="block">
              <p className="mb-2 font-bold text-black dark:text-white">
                Difficulty
              </p>
              <select
                value={form.difficulty}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    difficulty: event.target.value,
                  }))
                }
                className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </label>
            <label className="block">
              <p className="mb-2 font-bold text-black dark:text-white">Mark</p>
              <input
                type="number"
                min="1"
                value={form.mark}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, mark: event.target.value }))
                }
                className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-black outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-white"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={!form.topic.trim() || !form.question.trim()}
            className="min-h-11 w-full rounded-2xl bg-green px-5 font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green/20 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 dark:text-black dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
          >
            {editingQuestionId ? "Save Question" : "Add to Bank"}
          </button>
          {editingQuestionId && (
            <button
              type="button"
              onClick={resetForm}
              className="min-h-11 w-full rounded-2xl border border-gray-300 px-5 font-bold text-gray-700 transition-all duration-300 hover:border-green hover:text-green dark:border-gray-700 dark:text-gray-200"
            >
              Cancel Edit
            </button>
          )}
        </form>

        <section className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
              <div className="flex items-center gap-2 text-green">
                <FiBookOpen />
                <p className="font-bold">Current Bank</p>
              </div>
              <p className="mt-3 text-3xl font-bold text-black dark:text-white">
                {filteredQuestions.length}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedClass} {selectedSubject}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
              <div className="flex items-center gap-2 text-green">
                <FiCheckCircle />
                <p className="font-bold">Total Questions</p>
              </div>
              <p className="mt-3 text-3xl font-bold text-black dark:text-white">
                {questions.length}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Across assigned subjects
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
              <div className="flex items-center gap-2 text-green">
                <FiEdit2 />
                <p className="font-bold">Format</p>
              </div>
              <p className="mt-3 text-3xl font-bold text-black dark:text-white">
                Match
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Ready for exam creation
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-lg font-bold text-black dark:text-white">
                  {selectedClass} {selectedSubject} Questions
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  These are the same questions Create Exam can select.
                </p>
              </div>
              <p className="w-max rounded-full bg-green/10 px-3 py-1 text-sm font-bold text-green">
                {filteredQuestions.length} available
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filteredQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  className="rounded-2xl border border-gray-200 bg-white_bg p-4 dark:border-gray-800 dark:bg-black"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.2) }}
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-black dark:text-white">
                          {question.topic}
                        </p>
                        <p
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getDifficultyStyle(
                            question.difficulty,
                          )}`}
                        >
                          {question.difficulty}
                        </p>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {question.question}
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-500 dark:text-gray-400">
                        {question.mark} mark - Answer: {question.correctAnswer}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => editQuestion(question)}
                        className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 font-bold text-gray-700 transition-all duration-300 hover:border-green hover:text-green dark:border-gray-700 dark:text-gray-200"
                      >
                        <FiEdit2 />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteQuestion(question.id)}
                        className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 font-bold text-red-600 transition-all duration-300 hover:bg-red-50 dark:border-red-900/60 dark:hover:bg-red-950/30"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600 dark:border-gray-800 dark:bg-black_bg dark:text-gray-300">
                No questions match this class, subject, or search.
              </div>
            )}
          </div>
        </section>
      </div>

      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl dark:bg-black_bg sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-2xl font-bold text-black dark:text-white">
                  Import Questions
                </p>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Importing into {selectedClass} {selectedSubject}. Save Excel as
                  CSV, then upload the CSV file here.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-black transition-all duration-300 hover:border-red-300 hover:text-red-600 dark:border-gray-700 dark:text-white"
              >
                <FiX />
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-gray-200 bg-white_bg p-4 dark:border-gray-800 dark:bg-black">
              <p className="font-bold text-black dark:text-white">
                CSV column order
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="text-gray-600 dark:text-gray-300">
                      <th className="p-2">Topic</th>
                      <th className="p-2">Question</th>
                      <th className="p-2">Option A</th>
                      <th className="p-2">Option B</th>
                      <th className="p-2">Option C</th>
                      <th className="p-2">Option D</th>
                      <th className="p-2">Correct Answer</th>
                      <th className="p-2">Difficulty</th>
                      <th className="p-2">Mark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleImportRows.map((row) => (
                      <tr
                        key={row.question}
                        className="border-t border-gray-200 text-gray-700 dark:border-gray-800 dark:text-gray-200"
                      >
                        <td className="p-2">{row.topic}</td>
                        <td className="p-2">{row.question}</td>
                        <td className="p-2">{row.optionA}</td>
                        <td className="p-2">{row.optionB}</td>
                        <td className="p-2">{row.optionC}</td>
                        <td className="p-2">{row.optionD}</td>
                        <td className="p-2">{row.correctAnswer}</td>
                        <td className="p-2">{row.difficulty}</td>
                        <td className="p-2">{row.mark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[220px_1fr]">
              <button
                type="button"
                onClick={downloadCsvTemplate}
                className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-gray-300 bg-white px-5 text-center font-bold text-black transition-all duration-300 hover:border-green hover:text-green dark:border-gray-700 dark:bg-black dark:text-white"
              >
                <FiDownload className="text-3xl text-green" />
                <span className="mt-2">Download Template</span>
              </button>

              <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white_bg px-5 text-center transition-all duration-300 hover:border-green dark:border-gray-700 dark:bg-black">
                <FiUploadCloud className="text-3xl text-green" />
                <p className="mt-2 font-bold text-black dark:text-white">
                  Upload CSV File
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Accepts .csv. For Excel, choose Save As CSV before uploading.
                </p>
                <input
                  type="file"
                  accept=".csv,text/csv,.xls,.xlsx"
                  onChange={importQuestionsFromFile}
                  className="hidden"
                />
              </label>
            </div>

            {importMessage && (
              <p className="mt-4 rounded-2xl bg-green/10 px-4 py-3 font-bold text-green">
                {importMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
