import React, { useState } from "react";
import {
  FiCopy,
  FiEye,
  FiEyeOff,
  FiKey,
  FiRefreshCw,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { RiPauseCircleLine, RiPlayCircleLine } from "react-icons/ri";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * BACKEND CONTRACT
 * GET /api/superadmin/tenants/:tenantId
 * Auth: Bearer token, role=SuperAdmin
 * Response 200:
 * {
 *   "tenantId": "t_123", "schoolName": "Compro College", "subdomain": "compro",
 *   "adminEmail": "admin@compro.edu.ng", "adminPhone": "+234...", "plan": "Standard",
 *   "status": "active", "studentCount": 480, "studentCap": 500, "tutorCount": 32,
 *   "createdAt": "2026-02-11",
 *   "apiKey": { "keyId": "key_1", "maskedKey": "sk_live_****9f8a", "createdAt": "2026-02-12", "lastUsedAt": "2026-08-04" },
 *   "usage": {
 *     "examsTaken": 3210, "practiceSessionsTaken": 8940, "avgScorePercent": 68,
 *     "aiAssistantQuestionsAsked": 1560, "activeStudentsToday": 210, "activeStudentsThisWeek": 402,
 *     "storageUsedMb": 340
 *   },
 *   "weeklyActivity": [ { "day": "Mon", "sessions": 120 }, { "day": "Tue", "sessions": 150 } ],
 *   "billing": { "mrr": 45000, "currency": "NGN", "nextInvoiceDate": "2026-09-01", "lastPaymentStatus": "paid" }
 * }
 *
 * POST /api/superadmin/tenants/:tenantId/api-key
 * -> generates/rotates key. Response 201: { "keyId": "key_2", "rawKey": "sk_live_...", "maskedKey": "sk_live_****abcd" }
 * NOTE: rawKey shown to SuperAdmin ONCE at generation time, never returned again — same pattern as
 * every provider key (Stripe, AWS). Backend stores only a hash. Tenant's backend sends this key alongside
 * every JWT-authenticated request (e.g. header `X-Tenant-Key`) so requests are tied to both a user (JWT)
 * and a tenant (key) — lets the API reject a valid JWT if the tenant key is missing/revoked/suspended.
 *
 * PATCH /api/superadmin/tenants/:tenantId  Body: { "status": "suspended" | "active" }
 * DELETE /api/superadmin/tenants/:tenantId  Response 204
 */
const mockDetailBase = {
  adminPhone: "+2348012345678",
  tutorCount: 32,
  apiKey: {
    keyId: "key_1",
    maskedKey: "sk_live_****9f8a",
    createdAt: "2026-02-12",
    lastUsedAt: "2026-08-04",
  },
  usage: {
    examsTaken: 3210,
    practiceSessionsTaken: 8940,
    avgScorePercent: 68,
    aiAssistantQuestionsAsked: 1560,
    activeStudentsToday: 210,
    activeStudentsThisWeek: 402,
    storageUsedMb: 340,
  },
  weeklyActivity: [
    { day: "Mon", sessions: 120 },
    { day: "Tue", sessions: 150 },
    { day: "Wed", sessions: 90 },
    { day: "Thu", sessions: 175 },
    { day: "Fri", sessions: 210 },
    { day: "Sat", sessions: 60 },
    { day: "Sun", sessions: 40 },
  ],
  billing: { mrr: 45000, currency: "NGN", nextInvoiceDate: "2026-09-01", lastPaymentStatus: "paid" },
};

export default function TenantDetailModal({ tenant: tenantSummary, onClose, onChange }) {
  const [tenant, setTenant] = useState({ ...mockDetailBase, ...tenantSummary }); // TODO: GET /api/superadmin/tenants/:tenantId
  const [revealKey, setRevealKey] = useState(false);
  const [generatedKey, setGeneratedKey] = useState(null); // raw key shown once, right after generation

  if (!tenantSummary) return null;

  const handleToggleSuspend = () => {
    // TODO: PATCH /api/superadmin/tenants/:tenantId { status }
    const nextStatus = tenant.status === "suspended" ? "active" : "suspended";
    setTenant((prev) => ({ ...prev, status: nextStatus }));
    onChange?.({ ...tenant, status: nextStatus });
  };

  const handleDelete = () => {
    if (!window.confirm(`Delete ${tenant.schoolName}? This cannot be undone.`)) return;
    // TODO: DELETE /api/superadmin/tenants/:tenantId
    onChange?.({ ...tenant, deleted: true });
    onClose();
  };

  const handleGenerateKey = () => {
    if (
      tenant.apiKey &&
      !window.confirm("Regenerating invalidates the current key immediately. Continue?")
    )
      return;
    // TODO: POST /api/superadmin/tenants/:tenantId/api-key -> use real rawKey/maskedKey from response
    const rawKey = `sk_live_${tenant.subdomain}_${Math.random().toString(16).slice(2, 10)}`;
    setGeneratedKey(rawKey);
    setTenant((prev) => ({
      ...prev,
      apiKey: {
        keyId: `key_${Date.now()}`,
        maskedKey: `sk_live_****${rawKey.slice(-4)}`,
        createdAt: new Date().toISOString().slice(0, 10),
        lastUsedAt: null,
      },
    }));
  };

  const statCards = [
    { label: "Students", value: `${tenant.studentCount}/${tenant.studentCap}` },
    { label: "Tutors", value: tenant.tutorCount },
    { label: "Exams Taken", value: tenant.usage.examsTaken },
    { label: "Practice Sessions", value: tenant.usage.practiceSessionsTaken },
    { label: "Avg Score", value: `${tenant.usage.avgScorePercent}%` },
    { label: "AI Questions Asked", value: tenant.usage.aiAssistantQuestionsAsked },
    { label: "Active Today", value: tenant.usage.activeStudentsToday },
    { label: "Active This Week", value: tenant.usage.activeStudentsThisWeek },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-4xl space-y-5 overflow-y-auto rounded-2xl bg-white p-6 dark:bg-black_bg"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-black dark:text-white">
                {tenant.schoolName}
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                  tenant.status === "active"
                    ? "bg-green/10 text-green"
                    : tenant.status === "trial"
                      ? "bg-amber-500/10 text-amber-500"
                      : "bg-red-500/10 text-red-500"
                }`}
              >
                {tenant.status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {tenant.subdomain}.matlearn.app · {tenant.plan} plan · {tenant.adminEmail}
            </p>
          </div>
          <button type="button" onClick={onClose}>
            <FiX className="text-2xl text-gray-500" />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleToggleSuspend}
            className="flex items-center gap-2 rounded-2xl border border-amber-500 px-4 py-2 font-bold text-amber-500"
          >
            {tenant.status === "suspended" ? <RiPlayCircleLine /> : <RiPauseCircleLine />}
            {tenant.status === "suspended" ? "Activate" : "Suspend"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-2xl border border-red-500 px-4 py-2 font-bold text-red-500"
          >
            <FiTrash2 /> Delete
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-gray-200 bg-white_bg p-4 dark:border-gray-800 dark:bg-black"
            >
              <p className="text-2xl font-bold text-black dark:text-white">{card.value}</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
          <section className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
            <p className="mb-4 font-bold text-black dark:text-white">
              Weekly Activity (sessions)
            </p>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tenant.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="day" stroke="currentColor" className="text-xs" />
                  <YAxis stroke="currentColor" className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="var(--brand-color)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <FiKey className="text-xl" style={{ color: "var(--brand-color)" }} />
              <p className="font-bold text-black dark:text-white">Tenant API Key</p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Sent by this tenant's backend alongside its JWT on every request — ties requests to
              both a user and a tenant, and lets a rotation kill the tenant instantly.
            </p>

            {generatedKey && (
              <div className="space-y-2 rounded-xl bg-amber-500/10 p-3">
                <p className="text-xs font-bold text-amber-600">
                  Copy now — shown once, won't be shown again.
                </p>
                <div className="flex items-center justify-between gap-2 rounded-lg bg-white p-2 dark:bg-black">
                  <code className="truncate text-xs">{generatedKey}</code>
                  <button type="button" onClick={() => navigator.clipboard.writeText(generatedKey)}>
                    <FiCopy />
                  </button>
                </div>
              </div>
            )}

            {tenant.apiKey ? (
              <div className="space-y-2 rounded-xl bg-white_bg p-3 dark:bg-black">
                <div className="flex items-center justify-between">
                  <code className="text-sm text-gray-700 dark:text-gray-300">
                    {revealKey ? tenant.apiKey.maskedKey : "sk_live_••••••••••"}
                  </code>
                  <button type="button" onClick={() => setRevealKey((v) => !v)}>
                    {revealKey ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Created {tenant.apiKey.createdAt} · Last used {tenant.apiKey.lastUsedAt || "never"}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No key generated yet for this tenant.</p>
            )}

            <button
              type="button"
              onClick={handleGenerateKey}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-xl font-bold text-white"
              style={{ backgroundColor: "var(--brand-color)" }}
            >
              <FiRefreshCw />
              {tenant.apiKey ? "Regenerate Key" : "Generate Key"}
            </button>

            <div className="border-t border-gray-200 pt-3 dark:border-gray-800">
              <p className="text-sm font-bold text-black dark:text-white">Billing</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {tenant.billing.currency} {tenant.billing.mrr.toLocaleString()}/mo · next invoice{" "}
                {tenant.billing.nextInvoiceDate} · last payment {tenant.billing.lastPaymentStatus}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
