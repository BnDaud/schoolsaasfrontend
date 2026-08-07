import React, { useContext } from "react";
import { FiBookOpen } from "react-icons/fi";
import { globalContext } from "../../../context/globalcontext";
import { tenantContext } from "../../../app/tenant-provider";
import { listSubjects, listClasses } from "../../../mocks/academicStructure";

// MATLEARN_ROADMAP.md §4.2 /app/student/subjects — missing entirely before
// this. Browse-only for now: no subject-detail drill-in yet, since Practice
// doesn't support subject-level filtering to link into (§10, later).
// BACKEND: GET /api/schools/{tenantId}/subjects?classId=
export default function StudentSubjects() {
  const { classId } = useContext(globalContext);
  const { tenantId } = useContext(tenantContext);

  const subjects = listSubjects(tenantId);
  const classes = listClasses(tenantId);
  const className = classes.find((k) => k.classId === classId)?.name;

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">Subjects</p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {className ? `Subjects for ${className}.` : "Your subjects for this session."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {subjects.map((subject) => (
          <div
            key={subject.subjectId}
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-green/10 text-green">
              <FiBookOpen className="text-xl" />
            </div>
            <p className="font-bold text-black dark:text-white">{subject.name}</p>
          </div>
        ))}
      </div>

      {subjects.length === 0 && (
        <div className="rounded-2xl bg-white p-8 text-center text-gray-600 dark:bg-black_bg dark:text-gray-300">
          No subjects found for this school yet.
        </div>
      )}
    </div>
  );
}
