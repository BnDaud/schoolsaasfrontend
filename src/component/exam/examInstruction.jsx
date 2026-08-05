import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/button";
import { FaArrowLeft, FaPlay } from "react-icons/fa6";
import { CgDanger } from "react-icons/cg";
import { FiCalendar, FiClock, FiUsers } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";

const defaultInstructions = [
  "Read each question carefully before answering.",
  "You cannot go back to previous questions once submitted.",
  "Each question carries equal marks.",
  "There is no negative marking.",
  "Ensure stable internet connection throughout the exam.",
  "Do not refresh or close the browser during the exam.",
];

const getInstructions = (exam) => {
  const nextInstructions = [...defaultInstructions];

  if (exam?.negMark) {
    nextInstructions[3] = "There is negative marking.";
  }

  if (!exam?.eqMark) {
    nextInstructions[2] = "Each question carries variable marks.";
  }

  return nextInstructions;
};

export const getExamStatus = (exam) => {
  const now = new Date().getTime();
  const start = new Date(exam.dateTime).getTime();
  const close = new Date(exam.closesAt).getTime();

  if (now > close) {
    return {
      status: "completed",
      style: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    };
  }

  if (now >= start && now <= close) {
    return {
      status: "ongoing",
      style: "bg-green/10 text-green animate-pulse",
    };
  }

  return {
    status: "upcoming",
    style: "bg-amber-100 text-amber-500 dark:bg-amber_deep/20",
  };
};

export default function ExamInstruction({ data, onStartExam }) {
  const [acceptedInstructions, setAcceptedInstructions] = useState(false);
  const navigate = useNavigate();

  const instructions = getInstructions(data);
  const examStatus = data
    ? getExamStatus(data)
    : {
        status: "",
        style: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
      };
  const canStartExam = examStatus.status != "ongoing" && acceptedInstructions;
  const formattedSchedule = data?.dateTime
    ? new Date(data.dateTime).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-4 py-4 transition-all duration-700 dark:bg-black sm:px-[3%] sm:py-[2%]">
      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-5xl space-y-5 sm:space-y-6">
          <div>
            <Button
              name={"Back to Exams"}
              icon={<FaArrowLeft />}
              style={
                "flex gap-3 min-h-max items-center flex-row-reverse w-max text-gray-500 dark:text-gray-300"
              }
              action={() => navigate("/app/exam")}
            />
          </div>
          <div className="min-h-70 w-full rounded-2xl bg-white p-4 transition-all duration-700 dark:bg-black_bg sm:p-6 lg:p-8">
            <div className="flex min-h-max flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="break-words text-xl font-bold text-black dark:text-white">
                  {data?.name}
                </p>
                <p className="text-gray-500 dark:text-gray-400">{data?.type}</p>
              </div>
              <div
                className={`w-max shrink-0 rounded-full px-2 capitalize ${examStatus.style}`}
              >
                {examStatus.status}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              <div className="min-w-0 rounded-2xl bg-white_bg p-4 transition-all duration-700 dark:bg-black">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <FiClock className="shrink-0 text-xl text-green" />
                  <p>Duration</p>
                </div>
                <p className="mt-3 font-bold text-black dark:text-white">
                  {data?.duration} mins
                </p>
              </div>
              <div className="min-w-0 rounded-2xl bg-white_bg p-4 transition-all duration-700 dark:bg-black">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <GrDocumentText className="shrink-0 text-xl text-green" />
                  <p>Questions</p>
                </div>
                <p className="mt-3 font-bold text-black dark:text-white">
                  {data?.noQuestions}
                </p>
              </div>
              <div className="min-w-0 rounded-2xl bg-white_bg p-4 transition-all duration-700 dark:bg-black">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <FiCalendar className="shrink-0 text-xl text-green" />
                  <p>Schedule</p>
                </div>
                <p className="mt-3 break-words font-bold text-black dark:text-white">
                  {formattedSchedule}
                </p>
              </div>
              <div className="min-w-0 rounded-2xl bg-white_bg p-4 transition-all duration-700 dark:bg-black">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <FiUsers className="shrink-0 text-xl text-green" />
                  <p>Class</p>
                </div>
                <p className="mt-3 font-bold text-black dark:text-white">
                  {data?.class}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-200 dark:border-gray-800 sm:mt-8">
              <div className="mt-3 flex min-h-10 items-center gap-3 sm:gap-4">
                <CgDanger className="shrink-0 text-2xl text-amber-300" />
                <p className="font-bold text-black dark:text-white">
                  Exam Instructions
                </p>
              </div>
              <div className="mt-4 space-y-3 text-gray-600 dark:text-gray-300">
                {instructions.map((instruction, idx) => (
                  <div key={instruction} className="flex items-start gap-3">
                    <p className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green/10 text-sm font-bold text-green">
                      {idx + 1}
                    </p>
                    <p>{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {examStatus.status != "ongoing" && (
            <>
              <div className="min-h-20 space-y-4 rounded-2xl border border-gray-200 bg-white_bg p-4 shadow-sm transition-all duration-700 dark:border-gray-800 dark:bg-black_bg sm:p-5">
                <div className="flex min-h-max items-center gap-3 sm:gap-4">
                  <p className="size-3 shrink-0 animate-pulse rounded-full bg-amber-500"></p>
                  <p className="font-bold text-black dark:text-white">
                    Before you begin
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Make sure you have a stable internet connection and you're
                  ready to complete the exam in one sitting. The timer will
                  start immediately once you begin.
                </p>

                <label className="flex cursor-pointer items-start gap-3 text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={acceptedInstructions}
                    onChange={(e) => setAcceptedInstructions(e.target.checked)}
                    className="mt-1 size-5 accent-green"
                  />
                  <p>I have read and understood the instructions above</p>
                </label>
              </div>
              <div className="mb-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/app/exam")}
                  className="flex min-h-max w-full items-center justify-center rounded-2xl border border-gray-300 px-5 py-3 font-bold text-gray-700 transition-all duration-300 hover:bg-white dark:border-gray-700 dark:text-gray-200 dark:hover:bg-black_bg sm:w-max"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!canStartExam}
                  onClick={onStartExam}
                  className={`flex min-h-max w-full flex-row-reverse items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold transition-all duration-300 sm:w-max ${
                    canStartExam
                      ? "bg-green text-white hover:shadow-lg hover:shadow-green/20 dark:text-black"
                      : "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                  }`}
                >
                  Start Exam
                  <FaPlay />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
