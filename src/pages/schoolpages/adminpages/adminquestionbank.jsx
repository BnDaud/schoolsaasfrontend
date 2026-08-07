import React, { useContext, useMemo } from "react";
import { FiBookOpen, FiCheckCircle, FiDatabase, FiGlobe, FiLock } from "react-icons/fi";
import {
  buildQuestionBank,
  mergeTutorAssignments,
  resolveTutorAssignments,
} from "../../../utils/tutorQuestionBank";
import { tenantContext } from "../../../app/tenant-provider";
import { listGlobalQuestions, listTenantQuestions } from "../../../mocks/questions";
import { listUsersForTenant } from "../../../mocks/users";

export default function AdminQuestionBank() {
  const { tenantId } = useContext(tenantContext);

  // School-wide coverage: every tutor's own assignment, merged — not the old
  // hardcoded 3-pair constant shared by every school (MATLEARN_ROADMAP.md §14).
  const tutorAssignments = useMemo(() => {
    const tutors = listUsersForTenant(tenantId).filter((user) => user.role === "Tutor");
    const perTutorAssignments = tutors.map((tutor) =>
      resolveTutorAssignments(tenantId, tutor.assignedClassIds, tutor.assignedSubjectIds),
    );
    return mergeTutorAssignments(perTutorAssignments);
  }, [tenantId]);
  const questionBank = useMemo(() => buildQuestionBank(tutorAssignments), [tutorAssignments]);

  const globalQuestions = listGlobalQuestions();
  const tenantQuestions = listTenantQuestions(tenantId);
  const examBodies = [...new Set(globalQuestions.map((q) => q.examBody))];

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">
          Question Bank
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Review question coverage across classes and subjects.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiDatabase />
            <p className="font-bold">Questions</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {questionBank.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiBookOpen />
            <p className="font-bold">Subjects</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {new Set(tutorAssignments.map((item) => item.subject)).size}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiCheckCircle />
            <p className="font-bold">Assigned Banks</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {tutorAssignments.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {tutorAssignments.map((assignment) => {
          const count = questionBank.filter(
            (question) =>
              question.className === assignment.className &&
              question.subject === assignment.subject,
          ).length;

          return (
            <div
              key={`${assignment.className}-${assignment.subject}`}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg"
            >
              <p className="text-xl font-bold text-black dark:text-white">
                {assignment.className} {assignment.subject}
              </p>
              <p className="mt-4 rounded-full bg-green/10 px-3 py-1 text-sm font-bold text-green">
                {count} questions
              </p>
            </div>
          );
        })}
      </div>

      {/* Global vs tenant question bank distinction (MATLEARN_ROADMAP.md §9) —
          the tutorAssignments bank above is this school's own generated
          coverage; these are MatLearn's shared WAEC/JAMB/NECO bank and this
          school's own private bank from the mock question layer (step 2),
          kept visually separate so it's clear which is which. */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center gap-2">
            <FiGlobe className="text-green" />
            <p className="text-xl font-bold text-black dark:text-white">
              Global Exam Bank
            </p>
          </div>
          <div className="space-y-3">
            {examBodies.map((examBody) => {
              const count = globalQuestions.filter((q) => q.examBody === examBody).length;
              return (
                <div
                  key={examBody}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800"
                >
                  <p className="font-semibold text-black dark:text-white">{examBody}</p>
                  <p className="rounded-full bg-green/10 px-3 py-1 text-sm font-bold text-green">
                    {count} questions
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center gap-2">
            <FiLock className="text-green" />
            <p className="text-xl font-bold text-black dark:text-white">
              This School's Private Bank
            </p>
          </div>
          <div className="space-y-3">
            {tenantQuestions.map((question) => (
              <div
                key={question.questionId}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <p className="font-semibold text-black dark:text-white">{question.subject}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{question.topic}</p>
              </div>
            ))}
            {tenantQuestions.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No private questions added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
