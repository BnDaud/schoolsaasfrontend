import React from "react";
import { GiHistogram } from "react-icons/gi";
import { demoExams, demoPractice } from "../../../utils/constant";
import Button from "../../../component/ui/button";
import { IoBookOutline } from "react-icons/io5";
import { VscOutput } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { GoTrophy } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";

import { FaRegClock, FaRegBell, FaAngleRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Result() {
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

  const getExamsCompleted = () => {
    const c = demoExams.filter((p) => getExamStatus(p).status === "completed");
    return c.length;
  };

  const dashboard = [
    {
      name: "Average Score",

      icon: (
        <p className="flex items-center justify-center size-12 bg-green/10 rounded-lg">
          <GoTrophy className="text-2xl text-green" />
        </p>
      ),
      score: getExamsCompleted(),
    },
    {
      name: "Improvement",

      icon: (
        <p className="flex items-center justify-center size-12 bg-green/10 rounded-lg">
          <FaArrowTrendUp className="text-2xl text-green" />
        </p>
      ),
      score: "78%",
    },
    {
      name: "Exam Taken",

      icon: (
        <p className="flex items-center justify-center size-12 bg-amber-100 dark:bg-amber_deep/20 rounded-lg">
          <GiHistogram className="text-2xl text-amber-500" />
        </p>
      ),
      score: demoPractice.length,
    },
    {
      name: "Best Subject",

      icon: (
        <p className="flex items-center justify-center size-12 bg-amber-100 dark:bg-amber_deep/20 rounded-lg">
          {" "}
          <GoTrophy className="text-2xl text-amber-500" />
        </p>
      ),
      score: "Government",
    },
  ];

  return (
    <div className="px-[3%] py-[2%] dark:bg-black bg-white_bg transition-all duration-700 w-full min-h-screen space-y-5">
      <div className="md:flex justify-between">
        {" "}
        <div className="space-y-1">
          {" "}
          <p className=" text-black dark:text-white font-bold text-3xl">
            {" "}
            Results & Reports
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-200">
            {" "}
            View your exam results and performance analysis
          </p>
        </div>
        <Button
          name={"Export"}
          icon={<FiDownload className="text-lg" />}
          style={
            "flex flex-row-reverse items-center justify-center text-lg gap-2 h-10 border-2 mt-5 md:mt-0 w-full md:w-max dark:border-gray-700 border-gray-300 dark:text-white text-sm text-black px-5  rounded-lg hover:bg-amber-500 hover:text-black font-bold"
          }
          action={() => navigate("/app/practice")}
        />{" "}
      </div>{" "}
      <div className="flex flex-wrap gap-4 justify-between">
        {" "}
        {dashboard.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 space-y-2  p-4 min-h-30 rounded-2xl w-[48%]  lg:w-[24%] hover:shadow-lg hover:-translate-y-1 duration-700 cursor-pointer"
            initial={{ opacity: 0, x: 0, scale: 0.1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: idx * 0.2,
              ease: "easeInOut",
            }}
          >
            {item.icon}
            <p className="text-black dark:text-white font-bold text-2xl w-12 text-center ">
              {" "}
              {item.score}
            </p>
            <p className="dark:text-gray-400 text-gray-700"> {item.name}</p>
          </motion.div>
        ))}
      </div>
      <div
        className={` w-full bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 space-y-2  p-5 min-h-30 rounded-2xl transition-all duration-700`}
      >
        <div className="flex gap-2">
          <VscOutput className="text-2xl text-green" />{" "}
          <p className="font-bold text-lg dark:text-white"> Recent Results</p>
        </div>

        {demoExams.slice(0, 3).map((item, idx) => {
          const ongoing = "ongoing";
          const { status } = getExamStatus(item);
          return (
            <motion.div
              key={idx}
              className={`flex justify-between px-4 items-center bg-white_bg dark:bg-black  h-20 rounded-2xl`}
              initial={{ opacity: 0, y: 20, scale: 0.1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.5,
                ease: "easeInOut",
              }}
            >
              {" "}
              <div className="flex ">
                <div className="flex gap-4">
                  {" "}
                  <p
                    className={`flex items-center justify-center font-bold  size-14   rounded-xl  bg-green text-white dark:text-black text-lg rounded-2xl"} `}
                  >
                    {`${item.noQuestions}%`}
                  </p>{" "}
                  <div>
                    {" "}
                    <p className="dark:text-white text-black font-bold">
                      {" "}
                      {item.name}
                    </p>{" "}
                    <div className="flex gap-4 text-sm dark:text-gray-400 text-gray-700">
                      {new Date(item.dateTime).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>{" "}
              </div>{" "}
            </motion.div>
          );
        })}
      </div>{" "}
    </div>
  );
}
