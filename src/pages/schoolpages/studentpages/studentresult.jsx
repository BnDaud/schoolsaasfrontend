import React, { useMemo, useState } from "react";
import { FiDownload, FiEye, FiFilter } from "react-icons/fi";
import { GiHistogram } from "react-icons/gi";
import { GoTrophy } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { RiAwardLine } from "react-icons/ri";
import { motion } from "framer-motion";

const results = [
  {
    id: 1,
    subject: "Mathematics",
    exam: "Mathematics Mid-Term",
    score: 84,
    totalQuestions: 40,
    answered: 38,
    date: "2026-04-24T10:00:00",
  },
  {
    id: 2,
    subject: "Physics",
    exam: "Physics Practical",
    score: 72,
    totalQuestions: 30,
    answered: 28,
    date: "2026-04-18T13:00:00",
  },
  {
    id: 3,
    subject: "Biology",
    exam: "Biology Quiz",
    score: 91,
    totalQuestions: 25,
    answered: 25,
    date: "2026-04-04T10:00:00",
  },
  {
    id: 4,
    subject: "Chemistry",
    exam: "Chemistry Final",
    score: 48,
    totalQuestions: 60,
    answered: 54,
    date: "2026-03-20T09:00:00",
  },
  {
    id: 5,
    subject: "English",
    exam: "English Literature Test",
    score: 67,
    totalQuestions: 50,
    answered: 45,
    date: "2026-03-08T14:00:00",
  },
];

const getScoreStyle = (score) => {
  if (score >= 80) return "bg-green/10 text-green";
  if (score >= 50) return "bg-amber-100 text-amber-600 dark:bg-amber_deep/20";
  return "bg-red-100 text-red-600 dark:bg-red-950/30";
};

const getGrade = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Pass";
  return "Needs Review";
};

export default function Result() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const subjects = ["All", ...new Set(results.map((result) => result.subject))];
  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Passed" && result.score >= 50) ||
        (statusFilter === "Needs Review" && result.score < 50);
      const matchesSubject =
        subjectFilter === "All" || result.subject === subjectFilter;

      return matchesStatus && matchesSubject;
    });
  }, [statusFilter, subjectFilter]);

  const averageScore = Math.round(
    results.reduce((total, result) => total + result.score, 0) / results.length,
  );
  const bestResult = results.reduce((best, result) =>
    result.score > best.score ? result : best,
  );
  const improvedBy = 12;

  const dashboard = [
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
      name: "Improvement",
      icon: (
        <p className="flex size-12 items-center justify-center rounded-lg bg-green/10">
          <FaArrowTrendUp className="text-2xl text-green" />
        </p>
      ),
      score: `+${improvedBy}%`,
    },
    {
      name: "Exams Taken",
      icon: (
        <p className="flex size-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber_deep/20">
          <RiAwardLine className="text-2xl text-amber-500" />
        </p>
      ),
      score: results.length,
    },
    {
      name: "Best Subject",
      icon: (
        <p className="flex size-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber_deep/20">
          <GoTrophy className="text-2xl text-amber-500" />
        </p>
      ),
      score: bestResult.subject,
    },
  ];

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            Results & Reports
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Review your exam scores, grades, and subject performance.
          </p>
        </div>
        <button
          type="button"
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-gray-300 px-5 font-bold text-gray-700 transition-all duration-300 hover:bg-white dark:border-gray-700 dark:text-gray-200 dark:hover:bg-black_bg md:w-max"
        >
          <FiDownload />
          Export
        </button>
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
            <p className="mt-3 break-words text-2xl font-bold text-black dark:text-white">
              {item.score}
            </p>
            <p className="text-gray-700 dark:text-gray-400">{item.name}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-700 dark:border-gray-800 dark:bg-black_bg sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <FiFilter className="text-2xl text-green" />
            <p className="text-lg font-bold text-black dark:text-white">
              Recent Results
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-11 rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
            >
              <option>All</option>
              <option>Passed</option>
              <option>Needs Review</option>
            </select>
            <select
              value={subjectFilter}
              onChange={(event) => setSubjectFilter(event.target.value)}
              className="h-11 rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
            >
              {subjects.map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {filteredResults.map((result, idx) => (
            <motion.div
              key={result.id}
              className="flex flex-col gap-4 rounded-2xl bg-white_bg p-4 transition-all duration-500 dark:bg-black lg:flex-row lg:items-center lg:justify-between"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
            >
              <div className="flex items-start gap-4">
                <p
                  className={`flex size-16 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${getScoreStyle(
                    result.score,
                  )}`}
                >
                  {result.score}%
                </p>
                <div className="min-w-0">
                  <p className="font-bold text-black dark:text-white">
                    {result.exam}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {result.subject} • {result.answered}/
                    {result.totalQuestions} answered
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(result.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <p
                  className={`w-max rounded-full px-3 py-1 text-sm font-bold ${getScoreStyle(
                    result.score,
                  )}`}
                >
                  {getGrade(result.score)}
                </p>
                <button
                  type="button"
                  className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 font-bold text-gray-700 transition-all duration-300 hover:bg-white dark:border-gray-700 dark:text-gray-200 dark:hover:bg-black_bg"
                >
                  <FiEye />
                  View Report
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="mt-5 rounded-2xl bg-white_bg p-8 text-center text-gray-600 dark:bg-black dark:text-gray-300">
            No results match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
