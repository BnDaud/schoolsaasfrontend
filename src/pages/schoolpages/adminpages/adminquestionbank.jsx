import React from "react";
import { FiBookOpen, FiCheckCircle, FiDatabase } from "react-icons/fi";
import { questionBank, tutorAssignments } from "../../../utils/tutorQuestionBank";

export default function AdminQuestionBank() {
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
    </div>
  );
}
