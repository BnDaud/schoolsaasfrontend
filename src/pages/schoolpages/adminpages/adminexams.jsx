import React, { useContext, useMemo } from "react";
import { FiCalendar, FiCheckCircle, FiClock, FiFileText } from "react-icons/fi";
import {
  buildInitialExams,
  mergeTutorAssignments,
  resolveTutorAssignments,
} from "../../../utils/tutorQuestionBank";
import { tenantContext } from "../../../app/tenant-provider";
import { listUsersForTenant } from "../../../mocks/users";

const getStatusStyle = (status) => {
  if (status === "Published") return "bg-green/10 text-green";
  return "bg-amber-100 text-amber-600 dark:bg-amber_deep/20";
};

export default function AdminExams() {
  const { tenantId } = useContext(tenantContext);

  const initialTutorExams = useMemo(() => {
    const tutors = listUsersForTenant(tenantId).filter((user) => user.role === "Tutor");
    const perTutorAssignments = tutors.map((tutor) =>
      resolveTutorAssignments(tenantId, tutor.assignedClassIds, tutor.assignedSubjectIds),
    );
    return buildInitialExams(mergeTutorAssignments(perTutorAssignments));
  }, [tenantId]);

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">Exams</p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Monitor exams created across the school.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiFileText />
            <p className="font-bold">Total Exams</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {initialTutorExams.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiCheckCircle />
            <p className="font-bold">Published</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {initialTutorExams.filter((exam) => exam.status === "Published").length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiClock />
            <p className="font-bold">Drafts</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {initialTutorExams.filter((exam) => exam.status === "Draft").length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {initialTutorExams.map((exam) => (
          <div
            key={exam.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-bold text-black dark:text-white">
                  {exam.title}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {exam.className} - {exam.subject}
                </p>
              </div>
              <p
                className={`rounded-full px-3 py-1 text-sm font-bold ${getStatusStyle(
                  exam.status,
                )}`}
              >
                {exam.status}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white_bg p-3 dark:bg-black">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Questions
                </p>
                <p className="font-bold text-black dark:text-white">
                  {exam.selectedQuestions.length}
                </p>
              </div>
              <div className="rounded-2xl bg-white_bg p-3 dark:bg-black">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <FiCalendar />
                  <p className="text-sm">Schedule</p>
                </div>
                <p className="font-bold text-black dark:text-white">
                  {exam.dateTime ? new Date(exam.dateTime).toLocaleDateString() : "Not set"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
