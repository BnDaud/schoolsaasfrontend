import React, { useContext } from "react";
import { FiCalendar, FiLayers, FiBookOpen, FiUsers } from "react-icons/fi";
import { tenantContext } from "../../../app/tenant-provider";
import {
  listSessions,
  getCurrentSession,
  listDepartments,
  listClasses,
  listSubjects,
} from "../../../mocks/academicStructure";
import { listUsersForTenant } from "../../../mocks/users";

// Foundational academic structure screen (MATLEARN_ROADMAP.md §8/§37 gap) —
// promotion history, results, and "current vs previous class" all hang off
// session/term, which had nowhere to live until this screen. Also covers the
// two related §8 gaps: teacher assignment records and student enrollment
// (the Student × Class × Department × Session join).
// BACKEND: GET /api/schools/{tenantId}/academic-structure
export default function AdminSessions() {
  const { tenantId } = useContext(tenantContext);

  const sessions = listSessions(tenantId);
  const currentSession = getCurrentSession(tenantId);
  const departments = listDepartments(tenantId);
  const classes = listClasses(tenantId);
  const subjects = listSubjects(tenantId);

  const tutors = listUsersForTenant(tenantId).filter((user) => user.role === "Tutor");
  const students = listUsersForTenant(tenantId).filter((user) => user.role === "Student");

  const classNameById = (classId) => classes.find((k) => k.classId === classId)?.name ?? "—";
  const subjectNameById = (subjectId) => subjects.find((s) => s.subjectId === subjectId)?.name ?? "—";
  const departmentNameForClass = (classId) => {
    const klass = classes.find((k) => k.classId === classId);
    return departments.find((d) => d.departmentId === klass?.departmentId)?.name ?? "—";
  };

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">
          Academic Sessions
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Sessions, terms, departments, and subjects for this school.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiCalendar />
            <p className="font-bold">Sessions</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {sessions.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiLayers />
            <p className="font-bold">Current Session</p>
          </div>
          <p className="mt-3 text-2xl font-bold text-black dark:text-white">
            {currentSession?.label ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiBookOpen />
            <p className="font-bold">Subjects</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {subjects.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUsers />
            <p className="font-bold">Departments</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {departments.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <p className="mb-4 text-xl font-bold text-black dark:text-white">
            Sessions &amp; Terms
          </p>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.sessionId}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <p className="font-semibold text-black dark:text-white">
                  {session.label}
                </p>
                {session.isCurrent && (
                  <p className="rounded-full bg-green/10 px-3 py-1 text-sm font-bold text-green">
                    Current
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <p className="mb-4 text-xl font-bold text-black dark:text-white">
            Classes by Department
          </p>
          <div className="space-y-3">
            {classes.map((klass) => (
              <div
                key={klass.classId}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <p className="font-semibold text-black dark:text-white">
                  {klass.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {departments.find((d) => d.departmentId === klass.departmentId)?.name ?? "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <p className="mb-4 text-xl font-bold text-black dark:text-white">
            Teacher Assignments
          </p>
          <div className="space-y-3">
            {tutors.map((tutor) => (
              <div
                key={tutor.id}
                className="rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <p className="font-semibold text-black dark:text-white">{tutor.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(tutor.assignedSubjectIds ?? []).map(subjectNameById).join(", ") || "—"}
                  {" · "}
                  {(tutor.assignedClassIds ?? []).map(classNameById).join(", ") || "—"}
                </p>
              </div>
            ))}
            {tutors.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">No tutors assigned yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <p className="mb-4 text-xl font-bold text-black dark:text-white">
            Student Enrollment
          </p>
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <div>
                  <p className="font-semibold text-black dark:text-white">{student.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {classNameById(student.classId)} · {departmentNameForClass(student.classId)}
                  </p>
                </div>
                <p className="rounded-full bg-green/10 px-3 py-1 text-sm font-bold text-green">
                  {currentSession?.label ?? "—"}
                </p>
              </div>
            ))}
            {students.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">No students enrolled yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
