import React, { useContext } from "react";
import { FiClock, FiCheckCircle } from "react-icons/fi";
import { globalContext } from "../../../context/globalcontext";
import { tenantContext } from "../../../app/tenant-provider";
import { listGradingQueueForTutor } from "../../../mocks/gradingQueue";
import { getUserById } from "../../../mocks/users";
import { listClasses, listSubjects } from "../../../mocks/academicStructure";

// MATLEARN_ROADMAP.md §8 — "essay/manual-grade queue", MVP UI shell, no
// screen existed at all before this. Scoped to the logged-in tutor's own
// assigned classes only (§14 — role alone is never enough for a teacher).
// BACKEND: GET /api/schools/{tenantId}/grading-queue?classId=&subjectId=
export default function Grading() {
  const { assignedClassIds } = useContext(globalContext);
  const { tenantId } = useContext(tenantContext);

  const queue = listGradingQueueForTutor(tenantId, assignedClassIds);
  const classes = listClasses(tenantId);
  const subjects = listSubjects(tenantId);

  const classNameById = (id) => classes.find((k) => k.classId === id)?.name ?? "—";
  const subjectNameById = (id) => subjects.find((s) => s.subjectId === id)?.name ?? "—";

  const pending = queue.filter((item) => item.status === "pending");
  const graded = queue.filter((item) => item.status === "graded");

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">Grading Queue</p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Essay and manual-grade submissions from your assigned classes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiClock />
            <p className="font-bold">Pending</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">{pending.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiCheckCircle />
            <p className="font-bold">Graded</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">{graded.length}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
        <p className="mb-4 text-xl font-bold text-black dark:text-white">Submissions</p>
        <div className="space-y-3">
          {queue.map((item) => {
            const student = getUserById(item.studentId);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <div>
                  <p className="font-semibold text-black dark:text-white">{item.testTitle}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {student?.name ?? "—"} · {classNameById(item.classId)} · {subjectNameById(item.subjectId)}
                  </p>
                </div>
                <p
                  className={`rounded-full px-3 py-1 text-sm font-bold ${
                    item.status === "pending"
                      ? "bg-amber-500/10 text-amber-500"
                      : "bg-green/10 text-green"
                  }`}
                >
                  {item.status === "pending" ? "Pending" : "Graded"}
                </p>
              </div>
            );
          })}
        </div>

        {queue.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No submissions from your assigned classes yet.
          </p>
        )}
      </div>
    </div>
  );
}
