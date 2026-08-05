import React from "react";
import {
  FiAlertTriangle,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * BACKEND CONTRACT
 * GET /api/superadmin/stats
 * Auth: Bearer token, role=SuperAdmin required (401/403 otherwise)
 *
 * Response 200:
 * {
 *   "tenants": { "total": 128, "active": 110, "trial": 12, "suspended": 6 },
 *   "users": { "students": 18420, "tutors": 940, "selfPaceStudents": 3210 },
 *   "revenue": { "mrr": 4820000, "currency": "NGN", "growthPercent": 8.4 },
 *   "newTenantsThisMonth": 9,
 *   "tenantsNearLimit": [
 *     { "tenantId": "t_123", "schoolName": "Compro College", "studentCount": 480, "studentCap": 500 }
 *   ],
 *   "expiringSubscriptions": [
 *     { "tenantId": "t_456", "schoolName": "Bright Kids", "expiresAt": "2026-08-20" }
 *   ],
 *   "growthTrend": [
 *     { "month": "2026-03", "tenants": 90 },
 *     { "month": "2026-04", "tenants": 98 }
 *   ]
 * }
 */
const mockStats = {
  tenants: { total: 128, active: 110, trial: 12, suspended: 6 },
  users: { students: 18420, tutors: 940, selfPaceStudents: 3210 },
  revenue: { mrr: 4820000, currency: "NGN", growthPercent: 8.4 },
  newTenantsThisMonth: 9,
  tenantsNearLimit: [
    { tenantId: "t_123", schoolName: "Compro College", studentCount: 480, studentCap: 500 },
    { tenantId: "t_789", schoolName: "Greenfield Academy", studentCount: 292, studentCap: 300 },
  ],
  expiringSubscriptions: [
    { tenantId: "t_456", schoolName: "Bright Kids", expiresAt: "2026-08-20" },
  ],
  growthTrend: [
    { month: "Mar", tenants: 90 },
    { month: "Apr", tenants: 98 },
    { month: "May", tenants: 105 },
    { month: "Jun", tenants: 114 },
    { month: "Jul", tenants: 121 },
    { month: "Aug", tenants: 128 },
  ],
};

const formatCurrency = (value, currency) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const stats = mockStats; // TODO: replace with GET /api/superadmin/stats

  const goToTenants = (status) =>
    navigate("/matlearn/super-admin-tenants", { state: { statusFilter: status } });

  const summaryCards = [
    {
      label: "Tenants",
      value: stats.tenants.total,
      sub: `${stats.tenants.active} active · ${stats.tenants.trial} trial · ${stats.tenants.suspended} suspended`,
      icon: <HiOutlineOfficeBuilding />,
      to: "/matlearn/super-admin-tenants",
    },
    {
      label: "School Students",
      value: stats.users.students.toLocaleString(),
      sub: `${stats.users.selfPaceStudents.toLocaleString()} self-pace SS3`,
      icon: <FiUsers />,
    },
    {
      label: "MRR",
      value: formatCurrency(stats.revenue.mrr, stats.revenue.currency),
      sub: `+${stats.revenue.growthPercent}% vs last month`,
      icon: <FiDollarSign />,
    },
    {
      label: "New Tenants (mo)",
      value: stats.newTenantsThisMonth,
      sub: "Since start of month",
      icon: <FiTrendingUp />,
    },
  ];

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            Super Admin Dashboard
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Platform-wide view across every tenant (school) and self-pace account.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/matlearn/super-admin-tenants")}
          className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-green px-5 font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green/20 dark:text-black"
        >
          <HiOutlineOfficeBuilding />
          Create Tenant
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <button
            key={card.label}
            type="button"
            onClick={() => card.to && navigate(card.to)}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-black_bg"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-green/10 text-2xl text-green">
              {card.icon}
            </span>
            <p className="mt-4 text-3xl font-bold text-black dark:text-white">
              {card.value}
            </p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">{card.label}</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">{card.sub}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {[
          { label: "Active", value: stats.tenants.active, status: "active" },
          { label: "Trial", value: stats.tenants.trial, status: "trial" },
          { label: "Suspended", value: stats.tenants.suspended, status: "suspended" },
        ].map((chip) => (
          <button
            key={chip.status}
            type="button"
            onClick={() => goToTenants(chip.status)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition-all duration-300 hover:border-green hover:text-green dark:border-gray-800 dark:bg-black_bg dark:text-gray-300"
          >
            {chip.label}: {chip.value}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-2xl text-green" />
            <p className="text-lg font-bold text-black dark:text-white">
              Tenant Growth
            </p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.growthTrend}>
                <XAxis dataKey="month" stroke="currentColor" className="text-xs" />
                <YAxis stroke="currentColor" className="text-xs" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="tenants"
                  stroke="#16a34a"
                  fill="#16a34a"
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center gap-2">
            <FiAlertTriangle className="text-2xl text-amber-500" />
            <p className="text-lg font-bold text-black dark:text-white">
              Needs Attention
            </p>
          </div>
          <div className="space-y-3">
            {stats.tenantsNearLimit.map((tenant) => (
              <button
                key={tenant.tenantId}
                type="button"
                onClick={() => navigate("/matlearn/super-admin-tenants", { state: { search: tenant.schoolName } })}
                className="w-full rounded-2xl bg-white_bg p-4 text-left transition-all duration-300 hover:-translate-y-0.5 dark:bg-black"
              >
                <p className="font-bold text-black dark:text-white">
                  {tenant.schoolName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {tenant.studentCount}/{tenant.studentCap} students — near plan limit
                </p>
              </button>
            ))}
            {stats.expiringSubscriptions.map((tenant) => (
              <button
                key={tenant.tenantId}
                type="button"
                onClick={() => navigate("/matlearn/super-admin-tenants", { state: { search: tenant.schoolName } })}
                className="w-full rounded-2xl bg-white_bg p-4 text-left transition-all duration-300 hover:-translate-y-0.5 dark:bg-black"
              >
                <p className="font-bold text-black dark:text-white">
                  {tenant.schoolName}
                </p>
                <p className="text-sm text-red-500">
                  Subscription expires {tenant.expiresAt}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
