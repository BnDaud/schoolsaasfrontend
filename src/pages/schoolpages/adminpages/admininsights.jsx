import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FiAlertTriangle, FiBarChart2, FiTrendingUp, FiUsers } from "react-icons/fi";

const schoolPerformance = [
  { className: "JSS1", average: 72, attendance: 92 },
  { className: "JSS2", average: 69, attendance: 85 },
  { className: "SS1", average: 74, attendance: 88 },
  { className: "SS2", average: 76, attendance: 93 },
  { className: "SS3", average: 81, attendance: 90 },
];

export default function AdminInsights() {
  const schoolAverage = Math.round(
    schoolPerformance.reduce((total, item) => total + item.average, 0) /
      schoolPerformance.length,
  );
  const attendanceAverage = Math.round(
    schoolPerformance.reduce((total, item) => total + item.attendance, 0) /
      schoolPerformance.length,
  );

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">
          Insights
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Monitor school-wide performance and attendance trends.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiTrendingUp />
            <p className="font-bold">School Average</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {schoolAverage}%
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUsers />
            <p className="font-bold">Attendance</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {attendanceAverage}%
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-amber-500">
            <FiAlertTriangle />
            <p className="font-bold">Watchlist Classes</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">1</p>
        </div>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
        <div className="mb-4 flex items-center gap-2">
          <FiBarChart2 className="text-2xl text-green" />
          <p className="text-lg font-bold text-black dark:text-white">
            Class Comparison
          </p>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={schoolPerformance}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="className" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="average" fill="#22c55e" radius={[8, 8, 0, 0]} />
              <Bar dataKey="attendance" fill="#60a5fa" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
