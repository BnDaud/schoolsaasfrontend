import React, { useMemo, useState } from "react";
import {
  FiCheckCircle,
  FiDollarSign,
  FiPauseCircle,
  FiPlusCircle,
  FiUserPlus,
} from "react-icons/fi";
import { listPlatformAuditLog } from "../../../mocks/auditLog";
import { getUserById } from "../../../mocks/users";

/**
 * BACKEND CONTRACT
 * GET /api/platform/audit-log
 * Auth: Bearer token, role=SuperAdmin
 * Response 200: [{ id, actorId, action, target, createdAt }]
 * Platform-operator actions only (tenant lifecycle, plan changes, super
 * admin roster) — never a tenant's own internal activity (§14).
 */

const ACTION_META = {
  "tenant.created": {
    label: "Tenant created",
    icon: FiPlusCircle,
    color: "text-green bg-green/10",
    category: "Tenants",
  },
  "tenant.suspended": {
    label: "Tenant suspended",
    icon: FiPauseCircle,
    color: "text-amber-600 bg-amber-100 dark:bg-amber_deep/20",
    category: "Tenants",
  },
  "tenant.reactivated": {
    label: "Tenant reactivated",
    icon: FiCheckCircle,
    color: "text-green bg-green/10",
    category: "Tenants",
  },
  "tenant.plan_changed": {
    label: "Plan changed",
    icon: FiDollarSign,
    color: "text-blue-600 bg-blue-100 dark:bg-blue-950/30",
    category: "Tenants",
  },
  "superadmin.invited": {
    label: "Super Admin invited",
    icon: FiUserPlus,
    color: "text-purple-600 bg-purple-100 dark:bg-purple-950/30",
    category: "Admins",
  },
};

const CATEGORIES = ["All", "Tenants", "Admins"];

export default function SuperAdminAuditLog() {
  const [categoryFilter, setCategoryFilter] = useState("All");

  const entries = useMemo(
    () =>
      listPlatformAuditLog()
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [],
  );

  const filteredEntries = entries.filter((entry) => {
    if (categoryFilter === "All") return true;
    return ACTION_META[entry.action]?.category === categoryFilter;
  });

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">Audit Log</p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Platform-level actions only — tenant created, suspended, plan changed,
            Super Admin roster. A school's own activity stays inside that school.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setCategoryFilter(category)}
              className={`min-h-10 rounded-xl border px-4 font-bold transition-all duration-300 ${
                categoryFilter === category
                  ? "border-green bg-green text-white dark:text-black"
                  : "border-gray-200 text-gray-600 hover:border-green hover:text-green dark:border-gray-800 dark:text-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg sm:p-6">
        <div className="relative space-y-6 pl-2">
          {filteredEntries.length > 0 && (
            <div className="absolute top-2 bottom-2 left-[27px] w-px bg-gray-200 dark:bg-gray-800" />
          )}

          {filteredEntries.map((entry) => {
            const meta = ACTION_META[entry.action] ?? {
              label: entry.action,
              icon: FiCheckCircle,
              color: "text-gray-500 bg-gray-100 dark:bg-gray-800",
            };
            const Icon = meta.icon;
            const actor = getUserById(entry.actorId);

            return (
              <div key={entry.id} className="relative flex items-start gap-4">
                <div
                  className={`z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl text-xl ${meta.color}`}
                >
                  <Icon />
                </div>
                <div className="flex-1 rounded-2xl border border-gray-100 p-4 dark:border-gray-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-bold text-black dark:text-white">{meta.label}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(entry.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{entry.target}</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    by {actor?.name ?? entry.actorId}
                  </p>
                </div>
              </div>
            );
          })}

          {filteredEntries.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No platform activity in this category yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
