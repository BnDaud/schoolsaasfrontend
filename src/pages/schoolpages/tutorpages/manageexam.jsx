import React, { useContext, useMemo, useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUploadCloud,
} from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { motion } from "framer-motion";
import Input from "../../../component/ui/input";
import { globalContext } from "../../../context/globalcontext";
import { tenantContext } from "../../../app/tenant-provider";
import {
  buildInitialExams,
  buildQuestionBank,
  getClassOptions,
  getDefaultAssignment,
  getSubjectsForClass,
  loadTutorQuestionBank,
  resolveTutorAssignments,
} from "../../../utils/tutorQuestionBank";

const getStatusStyle = (status) => {
  if (status === "Published") return "bg-green/10 text-green";
  return "bg-amber-100 text-amber-600 dark:bg-amber_deep/20";
};

export default function ManageExams() {
  const { assignedClassIds, assignedSubjectIds } = useContext(globalContext);
  const { tenantId } = useContext(tenantContext);

  const tutorAssignments = useMemo(
    () => resolveTutorAssignments(tenantId, assignedClassIds, assignedSubjectIds),
    [tenantId, assignedClassIds, assignedSubjectIds],
  );
  const defaultAssignment = useMemo(() => getDefaultAssignment(tutorAssignments), [tutorAssignments]);
  const fallbackQuestionBank = useMemo(() => buildQuestionBank(tutorAssignments), [tutorAssignments]);

  const [exams, setExams] = useState(() => buildInitialExams(tutorAssignments));
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [availableQuestions] = useState(() => loadTutorQuestionBank(tenantId, fallbackQuestionBank));
  const [form, setForm] = useState({
    title: "",
    subject: defaultAssignment.subject,
    className: defaultAssignment.className,
    duration: 45,
    dateTime: "",
  });
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [editingExamId, setEditingExamId] = useState(null);

  const classOptions = useMemo(
    () => getClassOptions(tutorAssignments),
    [tutorAssignments],
  );
  const subjectOptions = useMemo(
    () => getSubjectsForClass(form.className, tutorAssignments),
    [form.className, tutorAssignments],
  );

  const filteredQuestions = useMemo(() => {
    return availableQuestions.filter(
      (question) =>
        question.subject === form.subject &&
        question.className === form.className,
    );
  }, [availableQuestions, form.className, form.subject]);

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.className.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || exam.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [exams, searchTerm, statusFilter]);

  const updateForm = (key, value) => {
    if (key === "className") {
      const nextSubject = getSubjectsForClass(value, tutorAssignments)[0];

      setForm((prev) => ({
        ...prev,
        className: value,
        subject: nextSubject,
      }));
      setSelectedQuestions([]);
      return;
    }

    setForm((prev) => ({ ...prev, [key]: value }));

    if (key === "subject") {
      setSelectedQuestions([]);
    }
  };

  const toggleQuestion = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId],
    );
  };

  const resetForm = () => {
    setForm({
      title: "",
      subject: defaultAssignment.subject,
      className: defaultAssignment.className,
      duration: 45,
      dateTime: "",
    });
    setSelectedQuestions([]);
    setEditingExamId(null);
  };

  const saveExam = (event) => {
    event.preventDefault();

    if (!form.title.trim() || selectedQuestions.length === 0) return;

    const examPayload = {
      ...form,
      duration: Number(form.duration),
      selectedQuestions,
      status: "Draft",
    };

    if (editingExamId) {
      setExams((prev) =>
        prev.map((exam) =>
          exam.id === editingExamId ? { ...exam, ...examPayload } : exam,
        ),
      );
      resetForm();
      return;
    }

    setExams((prev) => [{ id: Date.now(), ...examPayload }, ...prev]);
    resetForm();
  };

  const startEditExam = (exam) => {
    if (exam.status !== "Draft") return;

    setEditingExamId(exam.id);
    setForm({
      title: exam.title,
      subject: exam.subject,
      className: exam.className,
      duration: exam.duration,
      dateTime: exam.dateTime,
    });
    setSelectedQuestions(exam.selectedQuestions);
  };

  const deleteExam = (examId) => {
    setExams((prev) => prev.filter((exam) => exam.id !== examId));

    if (editingExamId === examId) {
      resetForm();
    }
  };

  const updateExamStatus = (examId, status) => {
    setExams((prev) =>
      prev.map((exam) => (exam.id === examId ? { ...exam, status } : exam)),
    );

    if (editingExamId === examId && status === "Published") {
      resetForm();
    }
  };

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            Manage Exams
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Create exams from your question bank and manage exams you created.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[420px_1fr]">
        <form
          onSubmit={saveExam}
          className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5"
        >
          <div className="flex items-center gap-2">
            {editingExamId ? (
              <FiEdit2 className="text-2xl text-green" />
            ) : (
              <FiPlus className="text-2xl text-green" />
            )}
            <p className="text-lg font-bold text-black dark:text-white">
              {editingExamId ? "Edit Draft Exam" : "Create Draft Exam"}
            </p>
          </div>

          <label className="block">
            <p className="mb-2 font-bold text-black dark:text-white">
              Exam Title
            </p>
            <input
              value={form.title}
              onChange={(event) => updateForm("title", event.target.value)}
              placeholder="e.g. JSS1 Mathematics Quiz"
              className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-black outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-white"
            />
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <p className="mb-2 font-bold text-black dark:text-white">Class</p>
              <select
                value={form.className}
                onChange={(event) =>
                  updateForm("className", event.target.value)
                }
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
                value={form.subject}
                onChange={(event) => updateForm("subject", event.target.value)}
                className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
              >
                {subjectOptions.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <p className="mb-2 font-bold text-black dark:text-white">
                Duration
              </p>
              <input
                type="number"
                min="1"
                value={form.duration}
                onChange={(event) => updateForm("duration", event.target.value)}
                className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-black outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-white"
              />
            </label>
            <label className="block">
              <p className="mb-2 font-bold text-black dark:text-white">
                Date & Time
              </p>
              <input
                type="datetime-local"
                value={form.dateTime}
                onChange={(event) => updateForm("dateTime", event.target.value)}
                className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-black outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-white"
              />
            </label>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="font-bold text-black dark:text-white">
                Question Bank: {form.className} {form.subject}
              </p>
              <p className="text-sm font-bold text-green">
                {selectedQuestions.length} / {filteredQuestions.length} selected
              </p>
            </div>
            <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
              {filteredQuestions.map((question) => {
                const isSelected = selectedQuestions.includes(question.id);

                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => toggleQuestion(question.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-green bg-green/10"
                        : "border-gray-200 bg-white_bg hover:border-green dark:border-gray-800 dark:bg-black"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-black dark:text-white">
                          {question.topic}
                        </p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {question.question}
                        </p>
                      </div>
                      {isSelected && (
                        <FiCheckCircle className="shrink-0 text-xl text-green" />
                      )}
                    </div>
                    <p className="mt-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                      {question.difficulty}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={!form.title.trim() || selectedQuestions.length === 0}
            className="min-h-11 w-full rounded-2xl bg-green px-5 font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green/20 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 dark:text-black dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
          >
            {editingExamId ? "Save Draft" : "Create Draft"}
          </button>
          {editingExamId && (
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
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-lg font-bold text-black dark:text-white">
                  Created Exams
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Exams created by this tutor from question bank questions.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type={"text"}
                  width={"lg:w-72 w-full"}
                  placeholder={"Search exams..."}
                  onChange={setSearchTerm}
                  icon={<FiSearch className="text-lg" />}
                />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-11 rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
                >
                  <option>All</option>
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredExams.map((exam, idx) => (
              <motion.div
                key={exam.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-black_bg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="break-words text-xl font-bold text-black dark:text-white">
                      {exam.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {exam.className} • {exam.subject}
                    </p>
                  </div>
                  <p
                    className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${getStatusStyle(
                      exam.status,
                    )}`}
                  >
                    {exam.status}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white_bg p-3 dark:bg-black">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <FiClock className="text-green" />
                      <p className="text-sm">Duration</p>
                    </div>
                    <p className="mt-1 font-bold text-black dark:text-white">
                      {exam.duration} mins
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white_bg p-3 dark:bg-black">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <GrDocumentText className="text-green" />
                      <p className="text-sm">Questions</p>
                    </div>
                    <p className="mt-1 font-bold text-black dark:text-white">
                      {exam.selectedQuestions.length}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white_bg p-3 dark:bg-black">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <FiCalendar className="text-green" />
                      <p className="text-sm">Schedule</p>
                    </div>
                    <p className="mt-1 font-bold text-black dark:text-white">
                      {exam.dateTime
                        ? new Date(exam.dateTime).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "Not set"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <div className="flex flex-wrap justify-end gap-2">
                    {exam.status === "Draft" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => startEditExam(exam)}
                          className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 font-bold text-gray-700 transition-all duration-300 hover:border-green hover:text-green dark:border-gray-700 dark:text-gray-200"
                        >
                          <FiEdit2 />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => updateExamStatus(exam.id, "Published")}
                          className="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-green px-4 font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green/20 dark:text-black"
                        >
                          <FiUploadCloud />
                          Publish
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteExam(exam.id)}
                          className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 font-bold text-red-600 transition-all duration-300 hover:bg-red-50 dark:border-red-900/60 dark:hover:bg-red-950/30"
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => updateExamStatus(exam.id, "Draft")}
                          className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-amber-200 px-4 font-bold text-amber-600 transition-all duration-300 hover:bg-amber-50 dark:border-amber-900/60 dark:hover:bg-amber-950/30"
                        >
                          Move to Draft
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteExam(exam.id)}
                          className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 font-bold text-red-600 transition-all duration-300 hover:bg-red-50 dark:border-red-900/60 dark:hover:bg-red-950/30"
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredExams.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600 dark:border-gray-800 dark:bg-black_bg dark:text-gray-300">
              No exams match this search or filter.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
