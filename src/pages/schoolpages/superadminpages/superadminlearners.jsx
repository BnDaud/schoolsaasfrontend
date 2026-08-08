import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiStar,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Input from "../../../component/ui/input";
import { listIndependentLearners } from "../../../mocks/users";

/**
 * BACKEND CONTRACT
 * GET /api/superadmin/independent-learners?search=&tier=
 * Auth: Bearer token, role=SuperAdmin
 * Response 200: [{ id, name, email, educationLevel, examGoals[], subscriptionTier,
 *                   createdAt, lastActiveAt }]
 * Super Admin sees learner metadata (counts, tiers, goals) — never their
 * practice/exam performance data, same §14 boundary as tenant students.
 */

const ACTIVE_WINDOW_DAYS = 14;

const monthLabel = (isoDate) =>
  new Date(isoDate).toLocaleString(undefined, { month: "short", year: "2-digit" });

export default function SuperAdminLearners() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  const learners = useMemo(() => listIndependentLearners(), []);

  const now = useMemo(() => new Date(), []);
  const activeCutoff = new Date(now.getTime() - ACTIVE_WINDOW_DAYS * 24 * 60 * 60 * 1000);

  const activeCount = learners.filter((l) => new Date(l.lastActiveAt) >= activeCutoff).length;
  const subscriberCount = learners.filter((l) => l.subscriptionTier === "subscriber").length;
  const freeCount = learners.length - subscriberCount;

  const signupTrend = useMemo(() => {
    const counts = new Map();
    learners
      .slice()
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .forEach((learner) => {
        const label = monthLabel(learner.createdAt);
        counts.set(label, (counts.get(label) ?? 0) + 1);
      });
    return Array.from(counts, ([month, signups]) => ({ month, signups }));
  }, [learners]);

  const examGoalBreakdown = useMemo(() => {
    const counts = new Map();
    learners.forEach((learner) => {
      (learner.examGoals ?? []).forEach((goal) => {
        counts.set(goal, (counts.get(goal) ?? 0) + 1);
      });
    });
    return Array.from(counts, ([goal, count]) => ({ goal, count })).sort(
      (a, b) => b.count - a.count,
    );
  }, [learners]);

  const filteredLearners = learners.filter((learner) => {
    const matchesTier = tierFilter === "All" || learner.subscriptionTier === tierFilter.toLowerCase();
    const matchesSearch =
      searchTerm.trim() === "" ||
      learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      learner.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTier && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">
          Independent Learners
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Public MatLearn platform users, not affiliated with any school.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUsers />
            <p className="font-bold">Total Learners</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">{learners.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUserCheck />
            <p className="font-bold">Active (14 days)</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiStar />
            <p className="font-bold">Subscribers</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">{subscriberCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUsers />
            <p className="font-bold">Free Tier</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">{freeCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-2xl text-green" />
            <p className="text-lg font-bold text-black dark:text-white">Signup Trend</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={signupTrend}>
                <XAxis dataKey="month" stroke="currentColor" className="text-xs" />
                <YAxis stroke="currentColor" className="text-xs" allowDecimals={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="signups"
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
            <FiStar className="text-2xl text-green" />
            <p className="text-lg font-bold text-black dark:text-white">Top Exam Goals</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={examGoalBreakdown} layout="vertical">
                <XAxis type="number" stroke="currentColor" className="text-xs" allowDecimals={false} />
                <YAxis type="category" dataKey="goal" stroke="currentColor" className="text-xs" width={60} />
                <Tooltip />
                <Bar dataKey="count" fill="#16a34a" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
        <div className="mb-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <p className="text-lg font-bold text-black dark:text-white">All Learners</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              type={"text"}
              width={"sm:w-72 w-full"}
              placeholder={"Search name or email..."}
              onChange={setSearchTerm}
              icon={<FiSearch className="text-lg" />}
            />
            <select
              value={tierFilter}
              onChange={(event) => setTierFilter(event.target.value)}
              className="h-10 rounded-xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
            >
              <option>All</option>
              <option>Free</option>
              <option>Subscriber</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Level</th>
                <th className="pb-3 font-semibold">Exam Goals</th>
                <th className="pb-3 font-semibold">Tier</th>
                <th className="pb-3 font-semibold">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredLearners.map((learner) => (
                <tr
                  key={learner.id}
                  className="border-b border-gray-100 last:border-0 dark:border-gray-800"
                >
                  <td className="py-3">
                    <p className="font-bold text-black dark:text-white">{learner.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{learner.email}</p>
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{learner.educationLevel}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">
                    {(learner.examGoals ?? []).join(", ")}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${
                        learner.subscriptionTier === "subscriber"
                          ? "bg-green/10 text-green"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {learner.subscriptionTier === "subscriber" ? "Subscriber" : "Free"}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">
                    {new Date(learner.lastActiveAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLearners.length === 0 && (
            <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              No learners match this search or filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
