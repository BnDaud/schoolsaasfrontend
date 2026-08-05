import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiBarChart2,
  FiBookOpen,
  FiCalendar,
  FiChevronRight,
  FiEdit3,
  FiFileText,
  FiPlus,
  FiUsers,
} from "react-icons/fi";
import { PiHandWaving } from "react-icons/pi";
import { globalContext } from "../../../context/globalcontext";
import {
  initialTutorExams,
  questionBank,
  tutorAssignments,
} from "../../../utils/tutorQuestionBank";

const classPerformance = [
  {
    className: "JSS1",
    subject: "Mathematics",
    students: 40,
    average: 72,
    passRate: 78,
    change: 6,
  },
  {
    className: "SS3",
    subject: "Physics",
    students: 16,
    average: 81,
    passRate: 86,
    change: 4,
  },
  {
    className: "SS2",
    subject: "Chemistry",
    students: 24,
    average: 76,
    passRate: 80,
    change: -2,
  },
];

const topPerformers = [
  { name: "Daniel Emeka", className: "SS3", subject: "Physics", score: 89 },
  { name: "Lawal Sulaimon", className: "SS2", subject: "Chemistry", score: 90 },
  { name: "Aisha Bello", className: "JSS1", subject: "Mathematics", score: 74 },
];

const studentsNeedingAttention = [
  { name: "Hassan Musa", className: "JSS1", subject: "Mathematics", score: 48 },
  { name: "Adewale Martins", className: "SS3", subject: "Physics", score: 51 },
];

const getStatusStyle = (status) => {
  if (status === "Published") return "bg-green/10 text-green";
  return "bg-amber-100 text-amber-600 dark:bg-amber_deep/20";
};

export default function Dashboard() {
  const { name, title, role } = useContext(globalContext);
  const navigate = useNavigate();

  const publishedExams = initialTutorExams.filter(
    (exam) => exam.status === "Published",
  );
  const draftExams = initialTutorExams.filter((exam) => exam.status === "Draft");

  const dashboardCards = [
    {
      name: "Assigned Classes",
      value: tutorAssignments.length,
      to: "/app/classes",
      icon: <FiUsers />,
    },
    {
      name: "Published Exams",
      value: publishedExams.length,
      to: "/app/manage-exam",
      icon: <FiCalendar />,
    },
    {
      name: "Draft Exams",
      value: draftExams.length,
      to: "/app/manage-exam",
      icon: <FiEdit3 />,
    },
    {
      name: "Question Bank",
      value: questionBank.length,
      to: "/app/question-bank",
      icon: <FiFileText />,
    },
  ];

  const quickActions = [
    {
      label: "Create Exam",
      to: "/app/manage-exam",
      icon: <FiPlus />,
      primary: true,
    },
    {
      label: "Add Question",
      to: "/app/question-bank",
      icon: <FiFileText />,
    },
    {
      label: "View My Classes",
      to: "/app/classes",
      icon: <FiBookOpen />,
    },
    {
      label: "Insights",
      to: "/app/performance",
      icon: <FiBarChart2 />,
    },
  ];

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            {role} Dashboard
          </p>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <p className="text-lg">{`Welcome back, ${title} ${name}`}</p>
            <PiHandWaving className="text-2xl text-amber-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/app/question-bank")}
            className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-gray-300 px-5 font-bold text-black transition-all duration-300 hover:border-green hover:text-green dark:border-gray-700 dark:text-white"
          >
            <FiFileText />
            Add Question
          </button>
          <button
            type="button"
            onClick={() => navigate("/app/manage-exam")}
            className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-green px-5 font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green/20 dark:text-black"
          >
            <FiPlus />
            Create Exam
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((item, index) => (
          <motion.button
            key={item.name}
            type="button"
            onClick={() => navigate(item.to)}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-black_bg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.06 }}
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-green/10 text-2xl text-green">
              {item.icon}
            </span>
            <p className="mt-4 text-3xl font-bold text-black dark:text-white">
              {item.value}
            </p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">{item.name}</p>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-2xl text-green" />
              <p className="text-lg font-bold text-black dark:text-white">
                Recent Exams
              </p>
            </div>
            <Link
              to="/app/manage-exam"
              className="font-bold text-green hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {initialTutorExams.map((exam) => (
              <div
                key={exam.id}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-gray-200 bg-white_bg p-4 dark:border-gray-800 dark:bg-black sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-bold text-black dark:text-white">
                    {exam.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {exam.className} - {exam.subject} -{" "}
                    {exam.selectedQuestions.length} questions
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p
                    className={`rounded-full px-3 py-1 text-sm font-bold ${getStatusStyle(
                      exam.status,
                    )}`}
                  >
                    {exam.status}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/app/manage-exam")}
                    className="flex size-10 items-center justify-center rounded-xl border border-gray-200 text-black transition-all duration-300 hover:border-green hover:text-green dark:border-gray-700 dark:text-white"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
            <div className="mb-4 flex items-center gap-2">
              <FiPlus className="text-2xl text-green" />
              <p className="text-lg font-bold text-black dark:text-white">
                Quick Actions
              </p>
            </div>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => navigate(action.to)}
                  className={`flex min-h-14 w-full items-center justify-between rounded-2xl px-4 font-bold transition-all duration-300 ${
                    action.primary
                      ? "bg-green text-white hover:shadow-lg hover:shadow-green/20 dark:text-black"
                      : "border border-gray-200 bg-white_bg text-black hover:border-green hover:text-green dark:border-gray-800 dark:bg-black dark:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {action.icon}
                    {action.label}
                  </span>
                  <FiChevronRight />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-green bg-white p-5 dark:bg-black_bg">
            <div className="flex items-center gap-2 text-green">
              <span className="size-2 animate-pulse rounded-full bg-green" />
              <p className="font-bold">Published Exam</p>
            </div>
            <p className="mt-3 font-bold text-black dark:text-white">
              {publishedExams[0]?.title || "No published exam yet"}
            </p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {publishedExams[0]
                ? `${publishedExams[0].className} ${publishedExams[0].subject}`
                : "Publish a draft exam when it is ready for students."}
            </p>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FiAlertTriangle className="text-2xl text-amber-500" />
              <p className="font-bold text-black dark:text-white">
                Needs Attention
              </p>
            </div>
            <p className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-600 dark:bg-amber_deep/20">
              {studentsNeedingAttention.length}
            </p>
          </div>
          <div className="space-y-3">
            {studentsNeedingAttention.map((student) => (
              <div
                key={student.name}
                className="rounded-2xl bg-white_bg p-4 dark:bg-black"
              >
                <p className="font-bold text-black dark:text-white">
                  {student.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                      {student.className} {student.subject} - {student.score}%
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center gap-2">
            <FiBarChart2 className="text-2xl text-green" />
            <p className="font-bold text-black dark:text-white">
              Class Performance
            </p>
          </div>
          <div className="space-y-4">
            {classPerformance.map((item) => (
              <div key={`${item.className}-${item.subject}`} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-black dark:text-white">
                      {item.className} {item.subject}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.students} students - {item.passRate}% pass rate
                    </p>
                  </div>
                  <p
                    className={`rounded-full px-3 py-1 text-sm font-bold ${
                      item.change < 0
                        ? "bg-red-100 text-red-600 dark:bg-red-950/30"
                        : "bg-green/10 text-green"
                    }`}
                  >
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                  <motion.div
                    className="h-full rounded-full bg-green"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.average}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center gap-2">
            <FiUsers className="text-2xl text-green" />
            <p className="font-bold text-black dark:text-white">
              Top Performers
            </p>
          </div>
          <div className="space-y-3">
            {topPerformers.map((student, index) => (
              <div
                key={student.name}
                className="flex items-center justify-between rounded-2xl bg-white_bg p-4 dark:bg-black"
              >
                <div className="flex items-center gap-3">
                  <p className="flex size-10 items-center justify-center rounded-full bg-green/10 font-bold text-green">
                    {index + 1}
                  </p>
                  <div>
                    <p className="font-bold text-black dark:text-white">
                      {student.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {student.className} {student.subject}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-green">{student.score}%</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
