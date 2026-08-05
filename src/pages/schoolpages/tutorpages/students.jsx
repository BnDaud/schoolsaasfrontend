import React, { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiBookOpen,
  FiMail,
  FiPhone,
  FiSearch,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import Input from "../../../component/ui/input";

const teachingAssignments = [
  { id: "jss1-math", className: "JSS1", subject: "Mathematics" },
  { id: "ss3-physics", className: "SS3", subject: "Physics" },
  { id: "ss2-chemistry", className: "SS2", subject: "Chemistry" },
  { id: "jss2-class", className: "JSS2", subject: "All Subjects" },
];

const students = [
  {
    id: 1,
    name: "Ben Hassan",
    className: "JSS1",
    admissionNo: "JSS1-001",
    guardian: "Mr Hassan",
    phone: "08030000001",
    email: "ben.hassan@student.test",
    attendance: 92,
    subjects: { Mathematics: 60, English: 80, "Basic Science": 68 },
    lastExam: "Fractions Quiz",
  },
  {
    id: 2,
    name: "Hassan Musa",
    className: "JSS1",
    admissionNo: "JSS1-002",
    guardian: "Mrs Musa",
    phone: "08030000002",
    email: "hassan.musa@student.test",
    attendance: 88,
    subjects: { Mathematics: 58, English: 79, "Basic Science": 65 },
    lastExam: "Algebra Check",
  },
  {
    id: 3,
    name: "Aisha Bello",
    className: "JSS1",
    admissionNo: "JSS1-003",
    guardian: "Mr Bello",
    phone: "08030000003",
    email: "aisha.bello@student.test",
    attendance: 95,
    subjects: { Mathematics: 74, English: 72, "Basic Science": 77 },
    lastExam: "Geometry Quiz",
  },
  {
    id: 4,
    name: "Daniel Emeka",
    className: "SS3",
    admissionNo: "SS3-001",
    guardian: "Mrs Emeka",
    phone: "08030000004",
    email: "daniel.emeka@student.test",
    attendance: 90,
    subjects: { Physics: 89, Mathematics: 90, Chemistry: 83 },
    lastExam: "Motion Test",
  },
  {
    id: 5,
    name: "Ifeoma Nwosu",
    className: "SS3",
    admissionNo: "SS3-002",
    guardian: "Mr Nwosu",
    phone: "08030000005",
    email: "ifeoma.nwosu@student.test",
    attendance: 86,
    subjects: { Physics: 84, Chemistry: 78, Biology: 82 },
    lastExam: "Electricity Test",
  },
  {
    id: 6,
    name: "Adewale Martins",
    className: "SS3",
    admissionNo: "SS3-003",
    guardian: "Mrs Martins",
    phone: "08030000006",
    email: "adewale.martins@student.test",
    attendance: 81,
    subjects: { Physics: 70, Mathematics: 75, Chemistry: 69 },
    lastExam: "Waves Quiz",
  },
  {
    id: 7,
    name: "Lawal Sulaimon",
    className: "SS2",
    admissionNo: "SS2-001",
    guardian: "Mr Lawal",
    phone: "08030000007",
    email: "lawal.sulaimon@student.test",
    attendance: 96,
    subjects: { Chemistry: 90, English: 70, Biology: 88 },
    lastExam: "Acids and Bases",
  },
  {
    id: 8,
    name: "Chidi Okafor",
    className: "SS2",
    admissionNo: "SS2-002",
    guardian: "Mrs Okafor",
    phone: "08030000008",
    email: "chidi.okafor@student.test",
    attendance: 89,
    subjects: { Chemistry: 78, Mathematics: 91, Physics: 84 },
    lastExam: "Periodic Table",
  },
  {
    id: 9,
    name: "Zainab Lawal",
    className: "SS2",
    admissionNo: "SS2-003",
    guardian: "Mrs Lawal",
    phone: "08030000009",
    email: "zainab.lawal@student.test",
    attendance: 93,
    subjects: { Chemistry: 82, Biology: 83, Mathematics: 80 },
    lastExam: "Chemical Bonding",
  },
  {
    id: 10,
    name: "Tunde Adeyemi",
    className: "JSS2",
    admissionNo: "JSS2-001",
    guardian: "Mr Adeyemi",
    phone: "08030000010",
    email: "tunde.adeyemi@student.test",
    attendance: 91,
    subjects: { Mathematics: 82, English: 70, "Basic Science": 75 },
    lastExam: "Class Review",
  },
  {
    id: 11,
    name: "Mariam Ibrahim",
    className: "JSS2",
    admissionNo: "JSS2-002",
    guardian: "Mrs Ibrahim",
    phone: "08030000011",
    email: "mariam.ibrahim@student.test",
    attendance: 84,
    subjects: { Mathematics: 67, English: 76, "Basic Science": 80 },
    lastExam: "Class Review",
  },
  {
    id: 12,
    name: "Peter James",
    className: "JSS2",
    admissionNo: "JSS2-003",
    guardian: "Mr James",
    phone: "08030000012",
    email: "peter.james@student.test",
    attendance: 79,
    subjects: { Mathematics: 71, English: 68, "Basic Science": 73 },
    lastExam: "Class Review",
  },
];

const getAverage = (scores) =>
  Math.round(scores.reduce((total, score) => total + score, 0) / scores.length);

const getScoreStyle = (score) => {
  if (score >= 80) return "bg-green/10 text-green";
  if (score >= 60) return "bg-amber-100 text-amber-600 dark:bg-amber_deep/20";
  return "bg-red-100 text-red-600 dark:bg-red-950/30";
};

const getStudentScore = (student, assignment) => {
  if (assignment.subject === "All Subjects") {
    return getAverage(Object.values(student.subjects));
  }

  return student.subjects[assignment.subject] || 0;
};

export default function Students() {
  const [activeAssignmentId, setActiveAssignmentId] = useState(
    teachingAssignments[0].id,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const activeAssignment = teachingAssignments.find(
    (assignment) => assignment.id === activeAssignmentId,
  );

  const visibleStudents = useMemo(() => {
    return students
      .filter((student) => {
        const matchesClass = student.className === activeAssignment.className;
        const hasSubject =
          activeAssignment.subject === "All Subjects" ||
          student.subjects[activeAssignment.subject] !== undefined;
        const matchesSearch =
          searchTerm.trim() === "" ||
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesClass && hasSubject && matchesSearch;
      })
      .map((student) => ({
        ...student,
        score: getStudentScore(student, activeAssignment),
      }));
  }, [activeAssignment, searchTerm]);

  const averageScore = visibleStudents.length
    ? getAverage(visibleStudents.map((student) => student.score))
    : 0;
  const averageAttendance = visibleStudents.length
    ? getAverage(visibleStudents.map((student) => student.attendance))
    : 0;
  const attentionCount = visibleStudents.filter(
    (student) => student.score < 60 || student.attendance < 80,
  ).length;

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            Students
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            View students by the class and subject you teach.
          </p>
        </div>

        <Input
          type={"text"}
          width={"lg:w-80 w-full"}
          placeholder={"Search name or admission no..."}
          onChange={setSearchTerm}
          icon={<FiSearch className="text-lg" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUsers />
            <p className="font-bold">Students</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {visibleStudents.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiBookOpen />
            <p className="font-bold">Average Score</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {averageScore}%
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUserCheck />
            <p className="font-bold">Attendance</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {averageAttendance}%
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-amber-500">
            <FiAlertTriangle />
            <p className="font-bold">Need Attention</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {attentionCount}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
        <p className="font-bold text-black dark:text-white">
          Teaching Assignment
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {teachingAssignments.map((assignment) => (
            <button
              key={assignment.id}
              type="button"
              onClick={() => setActiveAssignmentId(assignment.id)}
              className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                activeAssignmentId === assignment.id
                  ? "border-green bg-green/10"
                  : "border-gray-200 bg-white_bg hover:border-green dark:border-gray-800 dark:bg-black"
              }`}
            >
              <p className="font-bold text-black dark:text-white">
                {assignment.className}
              </p>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {assignment.subject}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {visibleStudents.map((student) => {
          const needsAttention = student.score < 60 || student.attendance < 80;

          return (
            <div
              key={student.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-bold text-black dark:text-white">
                    {student.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {student.admissionNo} - {student.className}
                  </p>
                </div>
                <p
                  className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${getScoreStyle(
                    student.score,
                  )}`}
                >
                  {student.score}%
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white_bg p-3 dark:bg-black">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Attendance
                  </p>
                  <p className="mt-1 font-bold text-black dark:text-white">
                    {student.attendance}%
                  </p>
                </div>
                <div className="rounded-2xl bg-white_bg p-3 dark:bg-black">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Last Exam
                  </p>
                  <p className="mt-1 font-bold text-black dark:text-white">
                    {student.lastExam}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p className="font-bold text-black dark:text-white">
                  Guardian: {student.guardian}
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone className="text-green" />
                  {student.phone}
                </p>
                <p className="flex items-center gap-2">
                  <FiMail className="text-green" />
                  {student.email}
                </p>
              </div>

              {needsAttention && (
                <p className="mt-4 rounded-2xl bg-amber-100 px-4 py-3 text-sm font-bold text-amber-600 dark:bg-amber_deep/20">
                  Follow up recommended
                </p>
              )}
            </div>
          );
        })}
      </div>

      {visibleStudents.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600 dark:border-gray-800 dark:bg-black_bg dark:text-gray-300">
          No students match this assignment or search.
        </div>
      )}
    </div>
  );
}
