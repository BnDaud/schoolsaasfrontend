import React from "react";
import { FiBell, FiLock, FiSettings } from "react-icons/fi";

const settings = [
  {
    title: "Academic Session",
    description: "2026/2027 session, second term active",
    icon: <FiSettings />,
  },
  {
    title: "Exam Controls",
    description: "Window-change warnings and auto-submit policies enabled",
    icon: <FiLock />,
  },
  {
    title: "Notifications",
    description: "Tutor and student result notifications enabled",
    icon: <FiBell />,
  },
];

export default function AdminSettings() {
  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">
          Settings
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Configure school-wide academic, exam, and notification preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {settings.map((setting) => (
          <div
            key={setting.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-green/10 text-2xl text-green">
              {setting.icon}
            </div>
            <p className="mt-4 text-xl font-bold text-black dark:text-white">
              {setting.title}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {setting.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
