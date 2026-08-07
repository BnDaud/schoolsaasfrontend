import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiBookOpen, FiLayers } from "react-icons/fi";
import { tenantContext } from "../../../app/tenant-provider";
import { listClasses, listSubjects, listDepartments } from "../../../mocks/academicStructure";

// This is the payoff for the tenant resolver + branding work from earlier
// roadmap steps: visiting with a different ?tenant= (or subdomain, in
// production) now changes the actual page body, not just the browser tab
// (MATLEARN_ROADMAP.md §16 item 5 — "prove it's not one school renamed").
export default function SchoolHome() {
  const { tenantId, tenant } = useContext(tenantContext);
  const navigate = useNavigate();

  const classes = listClasses(tenantId);
  const subjects = listSubjects(tenantId);
  const departments = listDepartments(tenantId);

  const stats = [
    { icon: <FiLayers />, label: "Classes", value: classes.length },
    { icon: <FiBookOpen />, label: "Subjects", value: subjects.length },
    { icon: <FiUsers />, label: "Departments", value: departments.length },
  ];

  return (
    <div className="min-h-screen bg-white_bg transition-colors duration-500 dark:bg-black_bg">
      <div className="flex flex-col items-center space-y-5 px-[5%] pt-24 pb-16 text-center lg:px-[10%]">
        <p
          className="rounded-full px-4 py-1 text-sm font-bold text-white"
          style={{ backgroundColor: "var(--brand-color)" }}
        >
          {tenant?.publicSite?.motto ?? "Welcome"}
        </p>
        <h1 className="text-4xl font-semibold text-black md:w-3/4 lg:text-6xl dark:text-white">
          {tenant?.name ?? "School"}
        </h1>
        <p className="text-xl text-gray-700 md:w-2/3 dark:text-white/70">
          {tenant?.publicSite?.about ?? "A MatLearn-powered school."}
        </p>
        <button
          onClick={() => navigate("/auth/login")}
          className="rounded-xl px-6 py-3 font-bold text-white transition hover:scale-105"
          style={{ backgroundColor: "var(--brand-color)" }}
        >
          Student / Staff Login
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-8 px-[5%] pb-20 lg:px-[10%]">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex w-full flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:w-56 dark:border-gray-800 dark:bg-black_card"
          >
            <div className="text-2xl" style={{ color: "var(--brand-color)" }}>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-black dark:text-white">{stat.value}</p>
            <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
