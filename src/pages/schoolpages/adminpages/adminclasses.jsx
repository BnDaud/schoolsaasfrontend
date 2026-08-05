import React from "react";
import { FiBookOpen, FiUserCheck, FiUsers } from "react-icons/fi";

const classes = [
  { className: "JSS1", students: 128, classTeacher: "Mrs Bello", subjects: 9 },
  { className: "JSS2", students: 118, classTeacher: "Mr James", subjects: 9 },
  { className: "SS1", students: 106, classTeacher: "Dr Musa", subjects: 11 },
  { className: "SS2", students: 96, classTeacher: "Mrs Lawal", subjects: 12 },
  { className: "SS3", students: 88, classTeacher: "Mr Emeka", subjects: 12 },
];

export default function AdminClasses() {
  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">
          Classes
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Manage class arms, class teachers, subjects, and student capacity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiBookOpen />
            <p className="font-bold">Classes</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {classes.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUsers />
            <p className="font-bold">Students</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {classes.reduce((total, item) => total + item.students, 0)}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUserCheck />
            <p className="font-bold">Class Teachers</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {classes.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {classes.map((item) => (
          <div
            key={item.className}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-bold text-black dark:text-white">
                  {item.className}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Class teacher: {item.classTeacher}
                </p>
              </div>
              <p className="rounded-full bg-green/10 px-3 py-1 text-sm font-bold text-green">
                {item.subjects} subjects
              </p>
            </div>
            <p className="mt-4 font-bold text-black dark:text-white">
              {item.students} students enrolled
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
