import React from "react";
import { PiHandWaving } from "react-icons/pi";
import { demoExams, demoPractice } from "../../../utils/constant";
import Button from "../../../component/ui/button";
import { IoBookOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { GoTrophy } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function Dashboard() {
  const navigate = useNavigate();
  const getExamStatus = (exam) => {
    const now = new Date().getTime(); // Use timestamps for reliable comparison
    const start = new Date(exam.dateTime).getTime();
    const close = new Date(exam.closesAt).getTime();

    // 1. If current time is past the closing time
    if (now > close) {
      return {
        status: "completed",
        style:
          "top-5 right-5 absolute bg-gray-400 w-max px-2 rounded-full text-sm text-white",
      };
    }

    // 2. If current time is between start and closing time
    // Note: We use 'close' instead of 'duration' to define the active window
    if (now >= start && now <= close) {
      return {
        status: "ongoing",
        style:
          "top-5 right-5 absolute bg-green-500 w-max px-2 rounded-full text-sm text-white animate-pulse",
      };
    }

    // 3. Otherwise, it must be in the future
    return {
      status: "upcoming",
      style:
        "top-5 right-5 absolute bg-amber-500 w-max px-2 rounded-full text-sm text-white",
    };
  };

  const getUpComingExams = () => {
    const number = demoExams.filter(
      (p) => getExamStatus(p).status === "upcoming",
    );

    return number;
  };
  const getExamsCompleted = () => {
    const c = demoExams.filter((p) => getExamStatus(p).status === "completed");
    return c.length;
  };

  const dashboard = [
    {
      name: "Exams Completed",
      to: "/app/exam",
      icon: (
        <p className="flex items-center justify-center size-12 bg-green/10 rounded-lg">
          <LuClipboardList className="text-2xl text-green" />
        </p>
      ),
      score: getExamsCompleted(),
    },
    {
      name: "Average Score",
      to: "/app/progress",
      icon: (
        <p className="flex items-center justify-center size-12 bg-green/10 rounded-lg">
          <FaArrowTrendUp className="text-2xl text-green" />
        </p>
      ),
      score: "78%",
    },
    {
      name: "Practice test",
      to: "/app/practice",
      icon: (
        <p className="flex items-center justify-center size-12 bg-amber-100 rounded-lg">
          <IoBookOutline className="text-2xl text-amber-500" />
        </p>
      ),
      score: demoPractice.length,
    },
    {
      name: "Leaderboard Rank",
      to: "/app/leaderboard",
      icon: (
        <p className="flex items-center justify-center size-12 bg-amber-100 rounded-lg">
          {" "}
          <GoTrophy className="text-2xl text-amber-500" />
        </p>
      ),
      score: "#5",
    },
  ];

  return (
    <div className="px-[3%] py-[2%] dark:bg-black bg-white_bg transition-all duration-700 w-full min-h-screen space-y-5">
      <div className="md:flex justify-between">
        {" "}
        <div className="space-y-1">
          {" "}
          <div className="flex items-center gap-2 min-h-4 text-black dark:text-white font-bold text-3xl">
            <p> Hi student name</p>
            <PiHandWaving />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-200">
            {" "}
            You have {getUpComingExams().length} upcoming exam (/s){" "}
          </p>
        </div>
        <div className="flex w-max gap-2 mt-4 md:mt-0">
          {" "}
          <Button
            name={"Pratice"}
            icon={<IoBookOutline />}
            style={
              "flex flex-row-reverse items-center text-lg gap-2 h-10 border-2 dark:border-gray-700 border-gray-300 dark:text-white text-sm text-black px-5  rounded-lg hover:bg-amber-500 hover:text-black font-bold"
            }
            action={() => navigate("/app/practice")}
          />{" "}
          <Button
            name={"View All Exams"}
            icon={<LuClipboardList />}
            style={
              "flex flex-row-reverse items-center text-lg gap-2 h-10 dark:text-white text-sm text-black px-5  rounded-lg bg-green  font-bold"
            }
            action={() => navigate("/app/exam")}
          />{" "}
        </div>
      </div>{" "}
      <div className="flex flex-wrap gap-4 justify-between">
        {" "}
        {dashboard.map((item) => (
          <div
            className="bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 space-y-2  p-4 min-h-30 rounded-2xl w-[48%]  lg:w-[24%] hover:shadow-lg hover:-translate-y-1 duration-700 cursor-pointer"
            onClick={() => navigate(item.to)}
          >
            {item.icon}
            <p className="text-black dark:text-white font-bold text-2xl">
              {" "}
              {item.score}
            </p>
            <p className="dark:text-gray-400 text-gray-700"> {item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
