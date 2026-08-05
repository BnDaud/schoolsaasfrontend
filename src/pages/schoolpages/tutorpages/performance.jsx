import React, { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FiAlertTriangle,
  FiBarChart2,
  FiCheckCircle,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const assignments = [
  { id: "all", label: "All Assigned Classes", className: "All", subject: "All" },
  { id: "jss1-math", label: "JSS1 Mathematics", className: "JSS1", subject: "Mathematics" },
  { id: "ss3-physics", label: "SS3 Physics", className: "SS3", subject: "Physics" },
  { id: "ss2-chemistry", label: "SS2 Chemistry", className: "SS2", subject: "Chemistry" },
];

const performanceRows = [
  {
    className: "JSS1",
    subject: "Mathematics",
    students: 40,
    average: 72,
    passRate: 78,
    attendance: 92,
    completion: 86,
    risk: 6,
  },
  {
    className: "SS3",
    subject: "Physics",
    students: 16,
    average: 81,
    passRate: 86,
    attendance: 90,
    completion: 93,
    risk: 2,
  },
  {
    className: "SS2",
    subject: "Chemistry",
    students: 24,
    average: 76,
    passRate: 80,
    attendance: 93,
    completion: 88,
    risk: 4,
  },
];

const trendRows = [
  { week: "W1", Mathematics: 65, Physics: 74, Chemistry: 69 },
  { week: "W2", Mathematics: 68, Physics: 76, Chemistry: 72 },
  { week: "W3", Mathematics: 71, Physics: 79, Chemistry: 74 },
  { week: "W4", Mathematics: 72, Physics: 81, Chemistry: 76 },
];

const topicRows = [
  { topic: "Fractions", subject: "Mathematics", className: "JSS1", average: 66 },
  { topic: "Algebra", subject: "Mathematics", className: "JSS1", average: 74 },
  { topic: "Motion", subject: "Physics", className: "SS3", average: 82 },
  { topic: "Electricity", subject: "Physics", className: "SS3", average: 78 },
  { topic: "Acids", subject: "Chemistry", className: "SS2", average: 80 },
  { topic: "Periodic Table", subject: "Chemistry", className: "SS2", average: 73 },
];

const riskDistribution = [
  { name: "Strong", value: 41, color: "#22c55e" },
  { name: "Average", value: 31, color: "#f59e0b" },
  { name: "At Risk", value: 10, color: "#ef4444" },
];

const getAverage = (values) =>
  Math.round(values.reduce((total, value) => total + value, 0) / values.length);

const getFilteredRows = (activeAssignmentId) => {
  const activeAssignment = assignments.find(
    (assignment) => assignment.id === activeAssignmentId,
  );

  if (activeAssignmentId === "all") return performanceRows;

  return performanceRows.filter(
    (row) =>
      row.className === activeAssignment.className &&
      row.subject === activeAssignment.subject,
  );
};

const getStatusStyle = (value) => {
  if (value >= 80) return "bg-green/10 text-green";
  if (value >= 60) return "bg-amber-100 text-amber-600 dark:bg-amber_deep/20";
  return "bg-red-100 text-red-600 dark:bg-red-950/30";
};

export default function Performance() {
  const [activeAssignmentId, setActiveAssignmentId] = useState("all");

  const filteredRows = useMemo(
    () => getFilteredRows(activeAssignmentId),
    [activeAssignmentId],
  );
  const activeAssignment = assignments.find(
    (assignment) => assignment.id === activeAssignmentId,
  );
  const filteredTopics = useMemo(() => {
    if (activeAssignmentId === "all") return topicRows;

    return topicRows.filter(
      (topic) =>
        topic.className === activeAssignment.className &&
        topic.subject === activeAssignment.subject,
    );
  }, [activeAssignment, activeAssignmentId]);

  const totalStudents = filteredRows.reduce((total, row) => total + row.students, 0);
  const averageScore = getAverage(filteredRows.map((row) => row.average));
  const passRate = getAverage(filteredRows.map((row) => row.passRate));
  const riskCount = filteredRows.reduce((total, row) => total + row.risk, 0);

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            Insights
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track class outcomes, topic strength, completion, and students who need support.
          </p>
        </div>

        <select
          value={activeAssignmentId}
          onChange={(event) => setActiveAssignmentId(event.target.value)}
          className="h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black_bg dark:text-gray-200 lg:w-72"
        >
          {assignments.map((assignment) => (
            <option key={assignment.id} value={assignment.id}>
              {assignment.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUsers />
            <p className="font-bold">Students Covered</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {totalStudents}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiTrendingUp />
            <p className="font-bold">Average Score</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {averageScore}%
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiCheckCircle />
            <p className="font-bold">Pass Rate</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {passRate}%
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-amber-500">
            <FiAlertTriangle />
            <p className="font-bold">At Risk</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {riskCount}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <FiBarChart2 className="text-2xl text-green" />
            <p className="text-lg font-bold text-black dark:text-white">
              Score Trend
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendRows}>
                <defs>
                  <linearGradient id="mathGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Area
                  dataKey="Mathematics"
                  fill="url(#mathGradient)"
                  stroke="#22c55e"
                  strokeWidth={2}
                  type="monotone"
                />
                <Area
                  dataKey="Physics"
                  fill="#60a5fa33"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  type="monotone"
                />
                <Area
                  dataKey="Chemistry"
                  fill="#f59e0b33"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  type="monotone"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
          <p className="mb-4 text-lg font-bold text-black dark:text-white">
            Student Distribution
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={4}
                >
                  {riskDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
          <p className="mb-4 text-lg font-bold text-black dark:text-white">
            Topic Strength
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredTopics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis domain={[0, 100]} type="number" />
                <YAxis dataKey="topic" type="category" width={110} />
                <Tooltip />
                <Bar dataKey="average" fill="#22c55e" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-lg font-bold text-black dark:text-white">
                Class Breakdown
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Compare score, pass rate, attendance, and completion.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredRows.map((row) => (
              <div
                key={`${row.className}-${row.subject}`}
                className="rounded-2xl border border-gray-200 bg-white_bg p-4 dark:border-gray-800 dark:bg-black"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-lg font-bold text-black dark:text-white">
                      {row.className} {row.subject}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {row.students} students
                    </p>
                  </div>
                  <p
                    className={`w-max rounded-full px-3 py-1 text-sm font-bold ${getStatusStyle(
                      row.average,
                    )}`}
                  >
                    {row.average}% average
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Pass Rate
                    </p>
                    <p className="font-bold text-black dark:text-white">
                      {row.passRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Attendance
                    </p>
                    <p className="font-bold text-black dark:text-white">
                      {row.attendance}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Completion
                    </p>
                    <p className="font-bold text-black dark:text-white">
                      {row.completion}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      At Risk
                    </p>
                    <p className="font-bold text-black dark:text-white">
                      {row.risk}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
