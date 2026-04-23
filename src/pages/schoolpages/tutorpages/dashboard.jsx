import { useContext } from "react";
import { PiHandWaving } from "react-icons/pi";
import { demoExams, demoPractice } from "../../../utils/constant";
import Button from "../../../component/ui/button";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { LuClipboardList } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiCalendar, FiUser, FiUsers } from "react-icons/fi";
import { FaAngleRight, FaPlus, FaRegFolderOpen } from "react-icons/fa";
import { motion, percent } from "framer-motion";
import { globalContext } from "../../../context/globalcontext";
import { GoTrophy, GoDotFill } from "react-icons/go";
import { GiHistogram, GiPodiumWinner } from "react-icons/gi";
import { IoEyeOutline } from "react-icons/io5";
import { CgDanger } from "react-icons/cg";
export default function Dashboard() {
  const { name, title, role } = useContext(globalContext);
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
    return c;
  };

  const topPerformance = [
    { name: "Fatima Abdullahi", class: "SS3", score: "91", increment: 8 },
    { name: "Chidi Okafor", class: "SS2", score: "89", increment: -5 },
    { name: "Kwame Mensah", class: "SS3", score: "87", increment: 12 },
    { name: "Amina Yusuf", class: "SS1", score: "85", increment: 7 },
    { name: "Olumide Bakare", class: "SS2", score: "82", increment: 4 },
  ];
  const classPerformance = [
    {
      class: "SS1",
      noStudent: 32,
      score: 85,
      percentIncrease: 8,
      passrate: 72,
    },
    {
      class: "SS2",
      noStudent: 12,
      score: 63,
      percentIncrease: -2,
      passrate: 72,
    },
    ,
    {
      class: "JS1",
      noStudent: 40,
      score: 25,
      percentIncrease: 4,
      passrate: 42,
    },
    {
      class: "SS3",
      noStudent: 16,
      score: 55,
      percentIncrease: -5,
      passrate: 50,
    },
  ];

  const dashboard = [
    {
      name: "Total Students",
      to: "/app/students",
      icon: (
        <p className="flex items-center justify-center size-12 bg-green/10 rounded-lg">
          <FiUsers className="text-2xl text-green" />
        </p>
      ),
      score: 130,
    },
    {
      name: "Active Exams",
      to: "/app/manage-exam",
      icon: (
        <p className="flex items-center justify-center size-12 bg-green/10 rounded-lg">
          <LuClipboardList className="text-2xl text-green" />
        </p>
      ),
      score: getUpComingExams().length,
    },
    {
      name: "Question Bank",
      to: "/app/question-bank",
      icon: (
        <p className="flex items-center justify-center size-12 bg-amber-100 dark:bg-amber_deep/20 rounded-lg">
          <IoDocumentTextOutline className="text-2xl text-amber-500" />
        </p>
      ),
      score: demoPractice.length,
    },
    {
      name: "Avg performance",
      to: "/app/performance",
      icon: (
        <p className="flex items-center justify-center size-12 bg-amber-100 dark:bg-amber_deep/20 rounded-lg">
          {" "}
          <FaArrowTrendUp className="text-2xl text-amber-500" />
        </p>
      ),
      score: "72%",
    },
  ];
  const quickAction = [
    {
      icon: (
        <p className="flex items-center justify-center size-10 bg-green rounded-lg">
          <FaPlus className="text-xl text-black" />
        </p>
      ),
      to: "/app/manage-exam",
      action: "Create New Exam",
    },
    {
      icon: (
        <p className="flex items-center justify-center size-10 bg-amber-100 dark:bg-amber_deep/20  rounded-lg">
          <IoDocumentTextOutline className="text-xl text-amber-500" />
        </p>
      ),
      to: "/app/question-bank",
      action: "Question Bank",
    },
    {
      icon: (
        <p className="flex items-center justify-center size-10 bg-amber-100 dark:bg-amber_deep/20  rounded-lg">
          <FaRegFolderOpen className="text-xl text-amber-500" />
        </p>
      ),
      to: "/app/classes",
      action: "Manage Classes",
    },
    {
      icon: (
        <p className="flex items-center justify-center size-10 bg-purple-900/20 rounded-lg">
          <GoTrophy className="text-xl text-purple-500" />
        </p>
      ),
      to: "/app/leaderboard",
      action: "Leaderboard",
    },
    {
      icon: (
        <p className="flex items-center justify-center size-10 bg-green/10 rounded-lg">
          <GiHistogram className="text-xl text-green" />
        </p>
      ),
      to: "/app/analytics",
      action: "View Analytics",
    },
  ];

  return (
    <div className="px-[3%] py-[2%] dark:bg-black bg-white_bg transition-all duration-700 w-full min-h-screen space-y-5">
      <div className="md:flex justify-between">
        {" "}
        <div className="space-y-1">
          {" "}
          <p className="min-h-4 text-black dark:text-white font-bold text-3xl">
            {" "}
            {role} Dashboard
          </p>
          <div className="flex items-center gap-2 text-2xl">
            {" "}
            <p className="text-lg text-gray-600 dark:text-gray-200">
              {" "}
              {`Welcome back, ${title} ${name}`}
            </p>
            <PiHandWaving />
          </div>
        </div>
        <div className="flex w-max gap-2 mt-4 md:mt-0">
          {" "}
          <Button
            name={"Add Question"}
            icon={<IoDocumentTextOutline />}
            style={
              "flex flex-row-reverse items-center text-lg gap-2 h-10 border-2 dark:border-gray-700 border-gray-300 dark:text-white text-sm text-black px-5  rounded-lg hover:bg-amber-500 hover:text-black font-bold"
            }
            action={() => navigate("/app/practice")}
          />{" "}
          <Button
            name={"Create Exam"}
            icon={<FaPlus />}
            style={
              "flex flex-row-reverse items-center text-lg gap-2 h-10 dark:text-black text-white text-sm text-black px-5  rounded-lg bg-green  font-bold"
            }
            action={() => navigate("/app/exam")}
          />{" "}
        </div>
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
            onClick={() => navigate(item.to)}
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
      <div className="flex justify-between gap-4 lg:gap-0 flex-wrap">
        {" "}
        <div
          className={`lg:w-[66%] w-full bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 space-y-2  p-5 min-h-30 rounded-2xl transition-all duration-700`}
        >
          <div className="flex justify-between">
            {" "}
            <div className="flex gap-2">
              <FiCalendar className="text-2xl text-green" />{" "}
              <p className="font-bold text-lg dark:text-white"> Recent Exams</p>
            </div>
            <p className="text-green font-semibold">
              {" "}
              <Link to={"/app/manage-exam"}> View All</Link>
            </p>
          </div>

          <table className="w-full">
            <thead>
              <tr className=" w-full text-gray-700 h-10 dark:text-gray-400 font-bold">
                <td className="w-[39%] lg:w-[25%]  "> Exam Title</td>
                <td className="w-[29%] lg:w-[15%]"> Class</td>
                <td className="w-[29%] lg:w-[15%]"> Status</td>
                <td className="lg:table-cell hidden lg:w-[15%]"> Questions</td>
                <td className="hidden lg:table-cell lg:w-[15%]"> Actions</td>
              </tr>
            </thead>
            <tbody>
              {demoExams.slice(0, 5).map((exam, idx) => {
                const ongoing = "ongoing";
                const { status } = getExamStatus(exam);
                return (
                  <tr
                    key={idx}
                    className="h-15 border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="w-[39%] lg:w-[25%] ">
                      <p className="dark:text-white font-bold text-ellipsis">
                        {exam?.type}
                      </p>
                      <p className="text-gray-700 dark:text-gray-400">
                        {exam.name}
                      </p>
                    </td>
                    <td className="w-[29%] lg:w-[15%] text-gray-600 dark:text-gray-400 ">
                      {exam?.class}
                    </td>
                    <td className={`w-[29%] lg:w-[15%] `}>
                      <p
                        className={`text-center w px-3 rounded-full w-max ${status == "completed" ? "text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300" : status == "upcoming" ? "bg-amber-100 dark:bg-amber_deep/20 text-amber-500  " : " text-green bg-green/10"}`}
                      >
                        {status}
                      </p>
                    </td>
                    <td className="hidden lg:table-cell lg:w-[15%] text-gray-600 dark:text-gray-400">
                      {exam?.noQuestions}
                    </td>
                    <td className="hidden lg:table-cell lg:w-[15%]">
                      <CiEdit className="text-xl text-black dark:text-white" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>{" "}
        <div className="relative w-full lg:w-[33%] ">
          <div className=" bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 space-y-2  p-5 min-h-70 rounded-2xl ">
            {" "}
            <div className="flex gap-2">
              <AiOutlineThunderbolt className="text-2xl text-green" />{" "}
              <p className="font-bold text-lg dark:text-white">
                {" "}
                Quick Actions
              </p>
            </div>
            <div className=" min-h-[40] space-y-2">
              {" "}
              {quickAction.map((action, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(action.to)}
                  className="flex items-center justify-between bg-white_bg dark:bg-black_bg border dark:text-white border-gray-200 dark:border-gray-800   p-4  w-full h-15 rounded-2xl hover:shadow-lg hover:-translate-y-0.5 duration-700 font-semibold"
                >
                  {" "}
                  <div className="flex gap-4 items-center h-full">
                    {action.icon}
                    <p className="">{action.action}</p>
                  </div>
                  <p>
                    {" "}
                    <FaAngleRight className="text-sm h-full" />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 bg-white dark:bg-black_bg  border-green border p-5 min-h-40 rounded-2xl ">
            {" "}
            <div className="flex gap-3 items-center h-6  font-semibold  text-green">
              {" "}
              <GoDotFill className=" animate-pulse " /> <p> Exam in Progress</p>
            </div>
            <div className="mt-2 space-y-2 text-black dark:text-white">
              <p className="font-bold">{demoExams[0].type} </p>
              <p> 32 students currently taking this exam</p>{" "}
              <Button
                name={"Monitor Live"}
                style={
                  "flex justify-center text-white dark:text-black items-center gap-3 font-bold w-full   h-10  bg-green rounded-lg"
                }
                icon={<IoEyeOutline />}
                type={"submit"}
                action={() => navigate("/app/manage-exam")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex space-y-3 lg:space-y-0 justify-between">
        {" "}
        <div className="relative lg:w-[32%] w-full bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 space-y-2  p-5 min-h-70 rounded-2xl ">
          <div className=" flex justify-between items-center h-6">
            {" "}
            <div className="flex gap-3 w-[65%] items-center h-6">
              <CgDanger className="text-amber-500 text-2xl" />{" "}
              <p className="text-black dark:text-white font-bold text-sm ">
                {" "}
                Students Needing Attentions{" "}
              </p>
            </div>{" "}
            <p className="bg-amber-100 dark:bg-amber_deep/20  text-amber-500 w-max px-2 py-1 rounded-2xl">
              {" "}
              0 Students
            </p>
          </div>
          <div className="absolute w-11/12 left-1/2 bottom-3">
            {" "}
            <Button
              name={"View All Students"}
              style={
                "-translate-x-1/2 w-full  flex items-center justify-center  gap-3 h-10  text-black dark:text-white font-semibold"
              }
              action={() => navigate("/app/students")}
              icon={<FaAngleRight />}
            />
          </div>
        </div>{" "}
        <div className="lg:w-[32%] w-full bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 space-y-2  p-5 min-h-70 rounded-2xl ">
          <div className="flex gap-3 w-[65%] items-center h-6">
            <FiUsers className="text-green text-2xl" />{" "}
            <p className="text-black dark:text-white font-bold text-sm ">
              {" "}
              Class Performance{" "}
            </p>{" "}
          </div>
          {classPerformance.map((cp, idx) => (
            <div
              key={idx}
              className="flex flex-col space-y-3 my-4 dark:text-white font-bold"
            >
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <p> {cp.class}</p>{" "}
                  <p className="w-max px-2 border border-gray-200 dark:border-gray-700 rounded-full text-sm">
                    {cp.noStudent} students
                  </p>{" "}
                </div>{" "}
                <div className="flex gap-2 h-full items-center text-green">
                  {" "}
                  <p
                    className={`font-bold  ${cp.score < 50 ? "text-red-500" : ""}`}
                  >
                    {cp.score} %
                  </p>
                  <div
                    className={`flex h-full items-center text-sm px-2 gap-2 rounded-full ${cp.percentIncrease < 0 ? "text-red-600 bg-red-200 dark:bg-red-400/30" : "bg-green/20"}`}
                  >
                    {" "}
                    <FaArrowTrendUp
                      className={`${cp.percentIncrease < 0 ? "rotate-180" : ""}`}
                    />{" "}
                    <p>{Math.abs(cp.percentIncrease)}%</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-2 bg-amber-500 rounded-full overflow-hidden">
                {/* Fill */}
                <motion.div
                  className={`h-full ${cp.score < 50 ? "bg-red-500" : "bg-emerald-400"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${cp?.score}%` }}
                  transition={{ ease: "easeInOut", duration: 0.6 }}
                />
              </div>
              <div className="flex gap-2 text-xs ">
                {" "}
                Pass Rate{" "}
                <p
                  className={`${cp.passrate < 50 ? "text-red-500" : " text-green"}`}
                >
                  {cp?.passrate}%
                </p>{" "}
              </div>
            </div>
          ))}
        </div>{" "}
        <div className="lg:w-[32%] w-full bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 space-y-4  p-5 min-h-70 rounded-2xl ">
          <div className="flex gap-3 w-[65%] items-center h-6">
            <GiPodiumWinner className="text-amber-500 text-2xl" />{" "}
            <p className="text-black dark:text-white font-bold text-sm ">
              {" "}
              Top Performers{" "}
            </p>{" "}
          </div>
          {topPerformance.map((top, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-2 dark:bg-gray-800 bg-gray-100 h-15 rounded-xl"
            >
              {" "}
              <div className="flex gap-2 items-center">
                {" "}
                <p
                  className={`flex justify-center items-center font-bold size-10 rounded-full ${idx + 1 === 1 ? "bg-amber-500" : idx + 1 === 2 ? "bg-pink-500" : idx + 1 === 3 ? "dark:bg-white bg-yellow-900 " : "dark:bg-gray-400 bg-gray-200"} `}
                >
                  {idx + 1}
                </p>
                <div>
                  <p className="font-bold text-black dark:text-white">
                    {top.name}
                  </p>
                  <p className="dark:text-gray-400 text-gray-600">
                    {top.class}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-green font-bold">
                {" "}
                <p>{top.score}%</p>{" "}
                <p
                  className={`flex gap-2 text-xs ${top.increment < 0 ? "text-red-500" : ""}`}
                >
                  <FaArrowTrendUp
                    className={`${top.increment < 0 ? "rotate-180" : ""}`}
                  />{" "}
                  <p> {Math.abs(top.increment)}%</p>
                </p>
              </div>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
}
