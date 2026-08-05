import React, { useMemo, useState } from "react";
import {
  FiAward,
  FiBookOpen,
  FiFilter,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { GoTrophy } from "react-icons/go";
import { motion } from "framer-motion";

const students = [
  {
    id: 1,
    name: "Ben Hassan",
    className: "JSS1",
    scores: { English: 95, Mathematics: 60, "Basic Science": 68 },
    exams: 9,
    streak: 6,
  },
  {
    id: 2,
    name: "Lawal Sulaimon",
    className: "SS2",
    scores: { English: 70, Chemistry: 90, Mathematics: 84, Biology: 88 },
    exams: 12,
    streak: 15,
  },
  {
    id: 3,
    name: "Chidi Okafor",
    className: "SS2",
    scores: { English: 65, Mathematics: 91, Chemistry: 78, Physics: 84 },
    exams: 10,
    streak: 9,
  },
  {
    id: 4,
    name: "Amina Yusuf",
    className: "SS1",
    scores: { English: 89, Mathematics: 76, Government: 83, Economics: 79 },
    exams: 11,
    streak: 12,
  },
  {
    id: 5,
    name: "Olumide Bakare",
    className: "SS2",
    scores: { English: 62, Physics: 84, Chemistry: 73, Mathematics: 69 },
    exams: 9,
    streak: 7,
  },
  {
    id: 6,
    name: "Mariam Bello",
    className: "JSS3",
    scores: { English: 74, Mathematics: 78, "Basic Science": 88 },
    exams: 8,
    streak: 10,
  },
  {
    id: 7,
    name: "Tunde Adeyemi",
    className: "JSS2",
    scores: { English: 70, Mathematics: 82, "Basic Science": 75 },
    exams: 9,
    streak: 5,
  },
  {
    id: 8,
    name: "Ifeoma Nwosu",
    className: "SS3",
    scores: { English: 81, Chemistry: 78, Mathematics: 80, Biology: 82 },
    exams: 10,
    streak: 8,
  },
  {
    id: 9,
    name: "Hassan Musa",
    className: "JSS1",
    scores: { English: 79, Mathematics: 58, "Basic Science": 65 },
    exams: 7,
    streak: 4,
  },
  {
    id: 10,
    name: "Grace Johnson",
    className: "SS1",
    scores: { English: 78, Government: 85, Mathematics: 72, Economics: 81 },
    exams: 9,
    streak: 6,
  },
  {
    id: 11,
    name: "Samuel Peter",
    className: "JSS3",
    scores: { English: 66, Mathematics: 72, "Social Studies": 77 },
    exams: 8,
    streak: 3,
  },
  {
    id: 12,
    name: "Zainab Lawal",
    className: "SS2",
    scores: { English: 68, Biology: 83, Chemistry: 82, Mathematics: 80 },
    exams: 11,
    streak: 13,
  },
  {
    id: 13,
    name: "Daniel Emeka",
    className: "SS3",
    scores: { English: 76, Mathematics: 84, Physics: 82, Chemistry: 80 },
    exams: 12,
    streak: 11,
  },
  {
    id: 14,
    name: "Khadija Umar",
    className: "JSS3",
    scores: { English: 83, Mathematics: 94, "Basic Science": 72 },
    exams: 10,
    streak: 12,
  },
  {
    id: 15,
    name: "David Adeleke",
    className: "JSS3",
    scores: { English: 71, Mathematics: 86, "Basic Science": 80 },
    exams: 9,
    streak: 7,
  },
  {
    id: 16,
    name: "Blessing Okoro",
    className: "JSS3",
    scores: { English: 77, Mathematics: 81, "Social Studies": 84 },
    exams: 8,
    streak: 6,
  },
];

const aggregators = [
  { key: "overall", label: "Overall", icon: <GoTrophy /> },
  { key: "subject", label: "Per Subject", icon: <FiBookOpen /> },
  { key: "class", label: "Per Class", icon: <FiUsers /> },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

const rankStyles = {
  1: "bg-amber-100 text-amber-600 dark:bg-amber_deep/20",
  2: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  3: "bg-orange-100 text-orange-600 dark:bg-orange-950/30",
};

const getAggregatorLabel = (selectedSubject, selectedClass) => {
  if (selectedSubject === "All" && selectedClass === "All") {
    return "Overall School";
  }

  if (selectedSubject !== "All" && selectedClass !== "All") {
    return `${selectedClass} ${selectedSubject}`;
  }

  if (selectedSubject !== "All") {
    return `All ${selectedSubject}`;
  }

  return `All ${selectedClass}`;
};

const getAverage = (scores) =>
  Math.round(scores.reduce((total, score) => total + score, 0) / scores.length);

const getStudentLeaderboardScore = (student, selectedSubject) => {
  if (selectedSubject !== "All") {
    return student.scores[selectedSubject] ?? null;
  }

  return getAverage(Object.values(student.scores));
};

const getSubjectLabel = (selectedSubject) =>
  selectedSubject === "All" ? "Overall Average" : selectedSubject;

export default function Leaderboard() {
  const [aggregator, setAggregator] = useState("overall");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");

  const subjects = [
    "All",
    ...new Set(students.flatMap((student) => Object.keys(student.scores))),
  ];
  const classes = [
    "All",
    ...new Set(students.map((student) => student.className)),
  ];

  const rankedStudents = useMemo(() => {
    const filtered = students.filter((student) => {
      const matchesClass =
        selectedClass === "All" || student.className === selectedClass;
      const hasSubject =
        selectedSubject === "All" ||
        student.scores[selectedSubject] !== undefined;

      return matchesClass && hasSubject;
    });

    return filtered
      .map((student) => ({
        ...student,
        score: getStudentLeaderboardScore(student, selectedSubject),
        subject: getSubjectLabel(selectedSubject),
      }))
      .sort((a, b) => b.score - a.score || b.exams - a.exams)
      .map((student, idx) => ({ ...student, rank: idx + 1 }));
  }, [selectedClass, selectedSubject]);

  const topThree = rankedStudents.slice(0, 3);
  const averageScore = rankedStudents.length
    ? Math.round(
        rankedStudents.reduce((total, student) => total + student.score, 0) /
          rankedStudents.length,
      )
    : 0;
  const aggregatorLabel = getAggregatorLabel(selectedSubject, selectedClass);

  const selectAggregator = (key) => {
    setAggregator(key);

    if (key === "overall") {
      setSelectedSubject("All");
      setSelectedClass("All");
    }

    if (key === "subject") {
      setSelectedSubject((current) =>
        current === "All" ? "English" : current,
      );
      setSelectedClass("All");
    }

    if (key === "class") {
      setSelectedSubject("All");
      setSelectedClass((current) => (current === "All" ? "JSS3" : current));
    }
  };

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            Leaderboard
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track top performers across the school, subjects, and classes.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {aggregators.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => selectAggregator(item.key)}
              className={`flex min-h-10 items-center gap-2 rounded-xl border px-4 font-bold transition-all duration-300 ${
                aggregator === item.key
                  ? "border-green bg-green text-white dark:text-black"
                  : "border-gray-200 text-gray-600 hover:border-green hover:text-green dark:border-gray-800 dark:text-gray-300"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <FiFilter className="text-2xl text-green" />
            <p className="font-bold text-black dark:text-white">
              Aggregator: {aggregatorLabel}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={selectedSubject}
              onChange={(event) => {
                setSelectedSubject(event.target.value);
                setAggregator("custom");
              }}
              className="h-11 rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
            >
              {subjects.map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
            <select
              value={selectedClass}
              onChange={(event) => {
                setSelectedClass(event.target.value);
                setAggregator("custom");
              }}
              className="h-11 rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
            >
              {classes.map((className) => (
                <option key={className}>{className}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUsers />
            <p className="font-bold">Students Ranked</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {rankedStudents.length}
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
            <FiAward />
            <p className="font-bold">Current Leader</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {rankedStudents[0]?.name || "No data"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {topThree.map((student, idx) => (
          <motion.div
            key={student.id}
            className={`rounded-2xl border p-5 transition-all duration-700 dark:border-gray-800 ${
              idx === 0
                ? "border-amber-200 bg-amber-50 dark:bg-amber_deep/20"
                : "border-gray-200 bg-white dark:bg-black_bg"
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <p className="flex size-14 items-center justify-center rounded-2xl bg-green text-xl font-bold text-white dark:text-black">
                  {getInitials(student.name)}
                </p>
                <div>
                  <p className="font-bold text-black dark:text-white">
                    {student.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {student.className} • {student.subject}
                  </p>
                </div>
              </div>
              <p
                className={`rounded-full px-3 py-1 font-bold ${
                  rankStyles[student.rank] || "bg-green/10 text-green"
                }`}
              >
                #{student.rank}
              </p>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Score
                </p>
                <p className="text-3xl font-bold text-black dark:text-white">
                  {student.score}%
                </p>
              </div>
              <GoTrophy className="text-4xl text-amber-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {rankedStudents.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600 dark:border-gray-800 dark:bg-black_bg dark:text-gray-300">
          No students found for {aggregatorLabel}. Try another subject or class.
        </div>
      )}

      {rankedStudents.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
        <p className="text-lg font-bold text-black dark:text-white">
          Full Ranking
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                <th className="px-4">Rank</th>
                <th className="px-4">Student</th>
                <th className="px-4">Class</th>
                <th className="px-4">Subject</th>
                <th className="px-4">Exams</th>
                <th className="px-4">Streak</th>
                <th className="px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {rankedStudents.map((student) => (
                <tr
                  key={student.id}
                  className="bg-white_bg text-gray-700 dark:bg-black dark:text-gray-300"
                >
                  <td className="rounded-l-2xl px-4 py-4">
                    <p
                      className={`w-max rounded-full px-3 py-1 font-bold ${
                        rankStyles[student.rank] || "bg-green/10 text-green"
                      }`}
                    >
                      #{student.rank}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <p className="flex size-10 items-center justify-center rounded-xl bg-green/10 font-bold text-green">
                        {getInitials(student.name)}
                      </p>
                      <p className="font-bold text-black dark:text-white">
                        {student.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">{student.className}</td>
                  <td className="px-4 py-4">{student.subject}</td>
                  <td className="px-4 py-4">{student.exams}</td>
                  <td className="px-4 py-4">{student.streak} days</td>
                  <td className="rounded-r-2xl px-4 py-4 font-bold text-green">
                    {student.score}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
}
