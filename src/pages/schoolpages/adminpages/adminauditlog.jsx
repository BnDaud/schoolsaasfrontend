import React, { useContext } from "react";
import { FiActivity } from "react-icons/fi";
import { tenantContext } from "../../../app/tenant-provider";
import { listAuditLogForTenant } from "../../../mocks/auditLog";
import { getUserById } from "../../../mocks/users";

// MATLEARN_ROADMAP.md §8/§32 — explicitly requested, needed a real screen,
// not just a concept. Backend logging itself is later; this is the UI + the
// mock entries the roadmap calls for at MVP.
// BACKEND: GET /api/schools/{tenantId}/audit-log
export default function AdminAuditLog() {
  const { tenantId } = useContext(tenantContext);
  const entries = listAuditLogForTenant(tenantId).slice().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">Audit Log</p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Who did what, and when, for this school.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
        <div className="space-y-3">
          {entries.map((entry) => {
            const actor = getUserById(entry.actorId);
            return (
              <div
                key={entry.id}
                className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <div className="mt-1 text-green">
                  <FiActivity />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-black dark:text-white">
                    {actor?.name ?? entry.actorId} <span className="font-normal text-gray-500 dark:text-gray-400">{entry.action}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Target: {entry.target}
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(entry.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>

        {entries.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No activity recorded for this school yet.
          </p>
        )}
      </div>
    </div>
  );
}
