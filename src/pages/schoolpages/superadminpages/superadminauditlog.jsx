import React from "react";
import { FiActivity } from "react-icons/fi";
import { listAllAuditLog } from "../../../mocks/auditLog";
import { getUserById } from "../../../mocks/users";
import { getTenantById } from "../../../mocks/tenants";

/**
 * BACKEND CONTRACT
 * GET /api/platform/audit-log
 * Auth: Bearer token, role=SuperAdmin
 * Response 200: [{ id, tenantId, actorId, action, target, createdAt }]
 * Note: platform-wide, spans every tenant — Super Admin sees action-log
 * metadata (who did what, when), never the underlying academic data itself.
 */
export default function SuperAdminAuditLog() {
  const entries = listAllAuditLog()
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const scopeLabel = (tenantId) => {
    if (tenantId === "platform") return "Platform";
    return getTenantById(tenantId)?.name ?? tenantId;
  };

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">Audit Log</p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Platform-wide activity across every tenant.
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
                    {actor?.name ?? entry.actorId}{" "}
                    <span className="font-normal text-gray-500 dark:text-gray-400">
                      {entry.action}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {scopeLabel(entry.tenantId)} · Target: {entry.target}
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
            No platform activity recorded yet.
          </p>
        )}
      </div>
    </div>
  );
}
