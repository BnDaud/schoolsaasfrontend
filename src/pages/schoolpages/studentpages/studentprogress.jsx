import React, { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GiHistogram } from "react-icons/gi";
import { FaRegCalendar } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { RiAwardLine, RiFlashlightLine } from "react-icons/ri";
import { FiBookOpen, FiTarget, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";

const progressByRange = {
  Week: [
    { name: "Mon", score: 58, average: 55 },
    { name: "Tue", score: 66, average: 58 },
    { name: "Wed", score: 62, average: 60 },
    { name: "Thu", score: 75, average: 63 },
    { name: "Fri", score: 81, average: 66 },
  ],
  Month: [
    { name: "Week 1", score: 60, average: 58 },
    { name: "Week 2", score: 67, average: 62 },
    { name: "Week 3", score: 73, average: 65 },
    { name: "Week 4", score: 82, average: 69 },
  ],
  Term: [
    { name: "Jan", score: 54, average: 56 },
    { name: "Feb", score: 61, average: 59 },
    { name: "Mar", score: 69, average: 62 },
    { name: "Apr", score: 77, average: 66 },
    { name: "May", score: 86, average: 70 },
  ],
  Year: [
    { name: "Q1", score: 63, average: 58 },
    { name: "Q2", score: 72, average: 64 },
    { name: "Q3", score: 79, average: 68 },
    { name: "Q4", score: 86, average: 72 },
  ],
};

const subjectData = [
  { subject: "Math", value: 72 },
  { subject: "English", value: 84 },
  { subject: "Physics", value: 68 },
  { subject: "Chemistry", value: 61 },
  { subject: "Biology", value: 91 },
  { subject: "Government", value: 76 },
];

const recommendations = [
  {
    title: "Review Chemistry",
    detail: "Spend 20 minutes on equations and periodic table practice.",
    icon: <FiBookOpen className="text-xl text-green" />,
  },
  {
    title: "Take a timed Math drill",
    detail: "Your accuracy is good, but speed can still improve.",
    icon: <FiTarget className="text-xl text-green" />,
  },
  {
    title: "Keep the streak alive",
    detail: "Complete one practice session today to reach 8 days.",
    icon: <RiFlashlightLine className="text-xl text-green" />,
  },
];

export default function Progress() {
  const [range, setRange] = useState("Month");
  const chartData = progressByRange[range];
  const averageScore = Math.round(
    chartData.reduce((total, item) => total + item.score, 0) / chartData.length,
  );
  const strongestSubject = subjectData.reduce((best, subject) =>
    subject.value > best.value ? subject : best,
  );
  const weakestSubject = subjectData.reduce((weakest, subject) =>
    subject.value < weakest.value ? subject : weakest,
  );

  const dashboard = useMemo(
    () => [
      {
        name: "Average Score",
        icon: (
          <p className="flex size-12 items-center justify-center rounded-lg bg-green/10">
            <GiHistogram className="text-2xl text-green" />
          </p>
        ),
        score: `${averageScore}%`,
      },
      {
        name: "Study Time",
        icon: (
          <p className="flex size-12 items-center justify-center rounded-lg bg-green/10">
            <FaRegClock className="text-2xl text-green" />
          </p>
        ),
        score: "45h",
      },
      {
        name: "Exams Completed",
        icon: (
          <p className="flex size-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber_deep/20">
            <RiAwardLine className="text-2xl text-amber-500" />
          </p>
        ),
        score: 8,
      },
      {
        name: "Current Streak",
        icon: (
          <p className="flex size-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber_deep/20">
            <RiFlashlightLine className="text-2xl text-amber-500" />
          </p>
        ),
        score: "7 days",
      },
    ],
    [averageScore],
  );

  const insights = [
    {
      label: "Strongest Subject",
      value: strongestSubject.subject,
      helper: `${strongestSubject.value}% proficiency`,
    },
    {
      label: "Needs Attention",
      value: weakestSubject.subject,
      helper: `${weakestSubject.value}% proficiency`,
    },
    {
      label: "Weekly Goal",
      value: "4/5",
      helper: "practice sessions completed",
    },
  ];

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            Progress Tracker
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track your learning growth and subject performance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.keys(progressByRange).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              className={`flex min-h-10 items-center gap-2 rounded-xl border px-4 font-bold transition-all duration-300 ${
                range === item
                  ? "border-green bg-green text-white dark:text-black"
                  : "border-gray-200 text-gray-600 hover:border-green hover:text-green dark:border-gray-800 dark:text-gray-300"
              }`}
            >
              <FaRegCalendar />
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {dashboard.map((item, idx) => (
          <motion.div
            key={item.name}
            className="min-h-30 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-700 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-black_bg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: idx * 0.1 }}
          >
            {item.icon}
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">
              {item.score}
            </p>
            <p className="text-gray-700 dark:text-gray-400">{item.name}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-700 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center justify-between gap-4">
            <p className="text-lg font-bold text-black dark:text-white">
              Performance Over Time
            </p>
            <p className="rounded-full bg-green/10 px-3 py-1 text-sm font-bold text-green">
              {range}
            </p>
          </div>
          <div className="mt-4 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  fill="#2eb89c33"
                  stroke="#2eb89c"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="average"
                  fill="#94a3b833"
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-700 dark:border-gray-800 dark:bg-black_bg">
          <p className="text-lg font-bold text-black dark:text-white">
            Subject Proficiency
          </p>
          <div className="mt-4 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={subjectData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  dataKey="value"
                  fill="#2eb89c"
                  fillOpacity={0.35}
                  stroke="#2eb89c"
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {insights.map((insight) => (
          <div
            key={insight.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg"
          >
            <div className="flex items-center gap-2 text-green">
              <FiTrendingUp />
              <p className="font-bold">{insight.label}</p>
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">
              {insight.value}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {insight.helper}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
        <p className="text-lg font-bold text-black dark:text-white">
          Recommended Next Steps
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation.title}
              className="rounded-2xl bg-white_bg p-4 dark:bg-black"
            >
              <div className="flex items-center gap-3">
                <p className="flex size-10 items-center justify-center rounded-xl bg-green/10">
                  {recommendation.icon}
                </p>
                <p className="font-bold text-black dark:text-white">
                  {recommendation.title}
                </p>
              </div>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {recommendation.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
