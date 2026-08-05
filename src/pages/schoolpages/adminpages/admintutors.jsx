import React from "react";
import { FiBookOpen, FiCheckCircle, FiUsers } from "react-icons/fi";

const tutors = [
  { name: "Dr Musa Bello", subjects: "Mathematics", classes: "JSS1", load: 40 },
  { name: "Mr Daniel Emeka", subjects: "Physics", classes: "SS3", load: 16 },
  { name: "Mrs Lawal Aisha", subjects: "Chemistry", classes: "SS2", load: 24 },
  { name: "Miss Mary James", subjects: "English", classes: "JSS2, SS1", load: 64 },
];

export default function AdminTutors() {
  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">Tutors</p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Review tutor assignments, class loads, and subject coverage.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUsers />
            <p className="font-bold">Tutors</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {tutors.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiBookOpen />
            <p className="font-bold">Subjects Covered</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {new Set(tutors.map((tutor) => tutor.subjects)).size}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiCheckCircle />
            <p className="font-bold">Assigned</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {tutors.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {tutors.map((tutor) => (
          <div
            key={tutor.name}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg"
          >
            <p className="text-xl font-bold text-black dark:text-white">
              {tutor.name}
            </p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {tutor.subjects} - {tutor.classes}
            </p>
            <p className="mt-4 w-max rounded-full bg-green/10 px-3 py-1 text-sm font-bold text-green">
              {tutor.load} students
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
