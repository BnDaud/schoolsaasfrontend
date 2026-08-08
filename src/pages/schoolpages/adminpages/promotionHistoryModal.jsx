import { useContext } from "react";
import { FiX } from "react-icons/fi";
import { GiHistogram } from "react-icons/gi";
import { tenantContext } from "../../../app/tenant-provider";
import { listResultsForStudent } from "../../../mocks/results";
import { getAcademicStructure } from "../../../mocks/academicStructure";

// Read-only history — MATLEARN_ROADMAP.md §16 item 14 calls for a promotion
// history UI without promotion logic. This shows what already happened
// (session/term/class per result); it never decides whether to promote.
export default function PromotionHistoryModal({ student, onClose }) {
  const { tenantId } = useContext(tenantContext);
  const structure = tenantId ? getAcademicStructure(tenantId) : null;
  const history = listResultsForStudent(student.id);

  const sessionLabel = (sessionId) =>
    structure?.sessions.find((s) => s.sessionId === sessionId)?.label ?? sessionId;
  const termLabel = (termId) => structure?.terms.find((t) => t.termId === termId)?.label ?? termId;
  const classLabel = (classId) => structure?.classes.find((c) => c.classId === classId)?.name ?? classId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 dark:bg-black_bg">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <GiHistogram className="text-2xl text-green" />
            <div>
              <p className="text-lg font-bold text-black dark:text-white">Promotion History</p>
              <p className="text-gray-600 dark:text-gray-300">{student.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-xl text-gray-500 transition-all duration-300 hover:bg-white_bg dark:text-gray-400 dark:hover:bg-black"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {history.length === 0 ? (
          <p className="rounded-2xl bg-white_bg p-4 text-gray-500 dark:bg-black dark:text-gray-400">
            No results on record yet for this student.
          </p>
        ) : (
          <div className="space-y-3">
            {history.map((entry, index) => {
              const previous = history[index - 1];
              const promoted = previous && previous.classId !== entry.classId;
              return (
                <div key={entry.resultId} className="rounded-2xl bg-white_bg p-4 dark:bg-black">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-black dark:text-white">
                        {sessionLabel(entry.sessionId)} — {termLabel(entry.termId)}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">{classLabel(entry.classId)}</p>
                    </div>
                    <p className="rounded-full bg-green/10 px-3 py-1 text-sm font-bold text-green">
                      Avg {entry.average}%
                    </p>
                  </div>
                  {promoted && (
                    <p className="mt-2 text-sm font-semibold text-amber-600">
                      Promoted from {classLabel(previous.classId)}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Position {entry.position} · {entry.subjectScores.length} subjects recorded
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
