import React from "react";
import {
  FiAlertTriangle,
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiClipboard,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const summaryCards = [
  { label: "Students", value: 842, icon: <FiUsers />, to: "/app/admin-students" },
  { label: "Tutors", value: 48, icon: <FiBookOpen />, to: "/app/admin-tutors" },
  { label: "Active Exams", value: 18, icon: <FiClipboard />, to: "/app/admin-exams" },
  { label: "Avg. Score", value: "76%", icon: <FiBarChart2 />, to: "/app/admin-insights" },
];

const schoolHealth = [
  { label: "Exam Completion", value: 88, status: "Good" },
  { label: "Question Coverage", value: 72, status: "Needs review" },
  { label: "Tutor Activity", value: 91, status: "Good" },
];

const recentActivity = [
  "SS3 Physics Practical was published",
  "12 questions imported into JSS1 Mathematics",
  "New tutor account created for Chemistry",
  "JSS2 class list updated",
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            Admin Dashboard
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage school-wide users, classes, exams, question banks, and performance.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/app/admin-settings")}
          className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-green px-5 font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green/20 dark:text-black"
        >
          <FiSettings />
          School Settings
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <button
            key={card.label}
            type="button"
            onClick={() => navigate(card.to)}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-black_bg"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-green/10 text-2xl text-green">
              {card.icon}
            </span>
            <p className="mt-4 text-3xl font-bold text-black dark:text-white">
              {card.value}
            </p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">{card.label}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center gap-2">
            <FiCheckCircle className="text-2xl text-green" />
            <p className="text-lg font-bold text-black dark:text-white">
              School Health
            </p>
          </div>
          <div className="space-y-4">
            {schoolHealth.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between gap-3">
                  <p className="font-bold text-black dark:text-white">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold text-green">{item.status}</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                  <div
                    className="h-full rounded-full bg-green"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center gap-2">
            <FiAlertTriangle className="text-2xl text-amber-500" />
            <p className="text-lg font-bold text-black dark:text-white">
              Recent Activity
            </p>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <p
                key={activity}
                className="rounded-2xl bg-white_bg p-4 font-semibold text-gray-700 dark:bg-black dark:text-gray-300"
              >
                {activity}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
