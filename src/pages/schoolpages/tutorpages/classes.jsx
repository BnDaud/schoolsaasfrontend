import React, { useMemo, useState } from "react";
import {
  FiBookOpen,
  FiSearch,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import { GiHistogram } from "react-icons/gi";
import Input from "../../../component/ui/input";

const subjectClasses = [
  {
    id: "jss1-math",
    className: "JSS1",
    subject: "Mathematics",
    schedule: "Mon, Wed • 9:00 AM",
    averageScore: 72,
  },
  {
    id: "ss3-physics",
    className: "SS3",
    subject: "Physics",
    schedule: "Tue, Thu • 11:30 AM",
    averageScore: 81,
  },
  {
    id: "ss2-chemistry",
    className: "SS2",
    subject: "Chemistry",
    schedule: "Fri • 10:00 AM",
    averageScore: 76,
  },
];

const classTeacherClasses = [
  {
    id: "jss2-class",
    className: "JSS2",
    role: "Class Teacher",
    schedule: "Form period • Daily",
    averageScore: 69,
  },
];

const students = [
  {
    id: 1,
    name: "Ben Hassan",
    className: "JSS1",
    subjects: { Mathematics: 60, English: 80, "Basic Science": 68 },
    attendance: 92,
  },
  {
    id: 2,
    name: "Hassan Musa",
    className: "JSS1",
    subjects: { Mathematics: 58, English: 79, "Basic Science": 65 },
    attendance: 88,
  },
  {
    id: 3,
    name: "Aisha Bello",
    className: "JSS1",
    subjects: { Mathematics: 74, English: 72, "Basic Science": 77 },
    attendance: 95,
  },
  {
    id: 4,
    name: "Daniel Emeka",
    className: "SS3",
    subjects: { Physics: 89, Mathematics: 90, Chemistry: 83 },
    attendance: 90,
  },
  {
    id: 5,
    name: "Ifeoma Nwosu",
    className: "SS3",
    subjects: { Physics: 84, Chemistry: 78, Biology: 82 },
    attendance: 86,
  },
  {
    id: 6,
    name: "Adewale Martins",
    className: "SS3",
    subjects: { Physics: 70, Mathematics: 75, Chemistry: 69 },
    attendance: 81,
  },
  {
    id: 7,
    name: "Lawal Sulaimon",
    className: "SS2",
    subjects: { Chemistry: 90, English: 70, Biology: 88 },
    attendance: 96,
  },
  {
    id: 8,
    name: "Chidi Okafor",
    className: "SS2",
    subjects: { Chemistry: 78, Mathematics: 91, Physics: 84 },
    attendance: 89,
  },
  {
    id: 9,
    name: "Zainab Lawal",
    className: "SS2",
    subjects: { Chemistry: 82, Biology: 83, Mathematics: 80 },
    attendance: 93,
  },
  {
    id: 10,
    name: "Tunde Adeyemi",
    className: "JSS2",
    subjects: { Mathematics: 82, English: 70, "Basic Science": 75 },
    attendance: 91,
  },
  {
    id: 11,
    name: "Mariam Ibrahim",
    className: "JSS2",
    subjects: { Mathematics: 67, English: 76, "Basic Science": 80 },
    attendance: 84,
  },
  {
    id: 12,
    name: "Peter James",
    className: "JSS2",
    subjects: { Mathematics: 71, English: 68, "Basic Science": 73 },
    attendance: 79,
  },
];

const getScoreStyle = (score) => {
  if (score >= 80) return "bg-green/10 text-green";
  if (score >= 60) return "bg-amber-100 text-amber-600 dark:bg-amber_deep/20";
  return "bg-red-100 text-red-600 dark:bg-red-950/30";
};

const getAverage = (scores) =>
  Math.round(scores.reduce((total, score) => total + score, 0) / scores.length);

export default function Classes() {
  const assignments = [
    ...subjectClasses.map((item) => ({ ...item, type: "subject" })),
    ...classTeacherClasses.map((item) => ({ ...item, type: "classTeacher" })),
  ];
  const [activeAssignmentId, setActiveAssignmentId] = useState(assignments[0].id);
  const [classTeacherClass, setClassTeacherClass] = useState(
    classTeacherClasses[0]?.className || "",
  );
  const [searchTerm, setSearchTerm] = useState("");

  const activeAssignment = assignments.find(
    (assignment) => assignment.id === activeAssignmentId,
  );
  const isClassTeacherView = activeAssignment?.type === "classTeacher";
  const selectedClassName = isClassTeacherView
    ? classTeacherClass
    : activeAssignment?.className;
  const selectedSubject = isClassTeacherView ? "All" : activeAssignment?.subject;

  const visibleStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesClass = student.className === selectedClassName;
      const hasSubject =
        selectedSubject === "All" ||
        student.subjects[selectedSubject] !== undefined;
      const matchesSearch =
        searchTerm.trim() === "" ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesClass && hasSubject && matchesSearch;
    });
  }, [searchTerm, selectedClassName, selectedSubject]);

  const averageScore = visibleStudents.length
    ? getAverage(
        visibleStudents.map((student) =>
          selectedSubject === "All"
            ? getAverage(Object.values(student.subjects))
            : student.subjects[selectedSubject],
        ),
      )
    : 0;

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            My Classes
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            View only the classes you teach, plus class-teacher assignments.
          </p>
        </div>

        <Input
          type={"text"}
          width={"lg:w-80 w-full"}
          placeholder={"Search students..."}
          onChange={setSearchTerm}
          icon={<FiSearch className="text-lg" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiBookOpen />
            <p className="font-bold">Subject Classes</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {subjectClasses.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUserCheck />
            <p className="font-bold">Class Teacher</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {classTeacherClasses.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <GiHistogram />
            <p className="font-bold">Selected Avg.</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {averageScore}%
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="xl:w-2/3">
              <p className="font-bold text-black dark:text-white">
                Teaching Assignments
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {assignments.map((assignment) => (
                  <button
                    key={assignment.id}
                    type="button"
                    onClick={() => {
                      setActiveAssignmentId(assignment.id);
                      if (assignment.type === "classTeacher") {
                        setClassTeacherClass(assignment.className);
                      }
                    }}
                    className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                      activeAssignmentId === assignment.id
                        ? "border-green bg-green/10"
                        : "border-gray-200 bg-white_bg hover:border-green dark:border-gray-800 dark:bg-black"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-black dark:text-white">
                        {assignment.className}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {assignment.type === "classTeacher"
                          ? assignment.role
                          : assignment.subject}
                      </p>
                    </div>
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      {assignment.schedule}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {classTeacherClasses.length > 0 && (
              <div className="xl:w-1/3">
                <p className="font-bold text-black dark:text-white">
                  Class Teacher Selector
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Use this for class-teacher student lists, even when you do not
                  teach the class subject.
                </p>
                <select
                  value={classTeacherClass}
                  onChange={(event) => {
                    setClassTeacherClass(event.target.value);
                    const classAssignment = assignments.find(
                      (assignment) => assignment.type === "classTeacher",
                    );
                    if (classAssignment)
                      setActiveAssignmentId(classAssignment.id);
                  }}
                  className="mt-4 h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
                >
                  {classTeacherClasses.map((assignment) => (
                    <option key={assignment.id}>{assignment.className}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <p className="text-xl font-bold text-black dark:text-white">
                {selectedClassName} Students
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedSubject === "All"
                  ? "Class teacher view: all students in this class."
                  : `${selectedSubject} students for this class only.`}
              </p>
            </div>
            <p className="w-max rounded-full bg-green/10 px-3 py-1 font-bold text-green">
              {visibleStudents.length} students
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleStudents.map((student) => {
              const score =
                selectedSubject === "All"
                  ? getAverage(Object.values(student.subjects))
                  : student.subjects[selectedSubject];
              const initials = student.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2);

              return (
                <div
                  key={student.id}
                  className="rounded-2xl bg-white_bg p-4 text-gray-700 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:bg-black dark:text-gray-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <p className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green/10 font-bold text-green">
                        {initials}
                      </p>
                      <div className="min-w-0">
                        <p className="truncate font-bold text-black dark:text-white">
                          {student.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {student.className} • {selectedSubject}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`shrink-0 rounded-full px-3 py-1 font-bold ${getScoreStyle(
                        score,
                      )}`}
                    >
                      {score}%
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white p-3 dark:bg-black_bg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Attendance
                      </p>
                      <p className="mt-1 font-bold text-black dark:text-white">
                        {student.attendance}%
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white p-3 dark:bg-black_bg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Subjects
                      </p>
                      <p className="mt-1 font-bold text-black dark:text-white">
                        {Object.keys(student.subjects).length}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-4 min-h-10 w-full rounded-xl border border-gray-300 px-4 font-bold text-gray-700 transition-all duration-300 hover:bg-white dark:border-gray-700 dark:text-gray-200 dark:hover:bg-black_bg"
                  >
                    View Student
                  </button>
                </div>
              );
            })}
          </div>

          {visibleStudents.length === 0 && (
            <div className="mt-5 rounded-2xl bg-white_bg p-8 text-center text-gray-600 dark:bg-black dark:text-gray-300">
              No students found for this class selection.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
