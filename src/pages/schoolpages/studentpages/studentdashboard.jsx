import { useContext, useEffect, useState } from "react";
import { PiHandWaving } from "react-icons/pi";

import Button from "../../../component/ui/button";
import { IoBookOutline, IoPlayOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { GoTrophy } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";
import { FaRegClock, FaRegBell, FaAngleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { globalContext } from "../../../context/globalcontext";
import { listNotificationsForUser, markAllNotificationsRead } from "../../../mocks/notifications";

export default function Dashboard() {
  const { name, userId } = useContext(globalContext);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const refresh = () => setNotifications(userId ? listNotificationsForUser(userId) : []);
    refresh();
    window.addEventListener("notifications:changed", refresh);
    return () => window.removeEventListener("notifications:changed", refresh);
  }, [userId]);
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

  const upComingExams = () => {
    const upComing = data?.exams.filter(
      (p) => getExamStatus(p).status != "completed",
    );
    // upcoming variable returns exams that ongoing or yet to be done

    return upComing;
  };
  // data is the payload expected from the backend
  const data = {
    dashboard: [
      {
        name: "Exams Completed",
        to: "/app/exam",
        icon: (
          <p className="flex items-center justify-center size-12 bg-green/10 rounded-lg">
            <LuClipboardList className="text-2xl text-green" />
          </p>
        ),
        score: 3,
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
          <p className="flex items-center justify-center size-12 bg-amber-100 dark:bg-amber_deep/20 rounded-lg">
            <IoBookOutline className="text-2xl text-amber-500" />
          </p>
        ),
        score: 10,
      },
      {
        name: "Leaderboard Rank",
        to: "/app/leaderboard",
        icon: (
          <p className="flex items-center justify-center size-12 bg-amber-100 dark:bg-amber_deep/20 rounded-lg">
            {" "}
            <GoTrophy className="text-2xl text-amber-500" />
          </p>
        ),
        score: <i>#6</i>,
      },
    ],
    exams: [
      {
        id: 1,
        name: "Mathematics",
        type: "Mathematics Mid-Term",
        duration: 60,
        noQuestions: 40,
        class: "SS1",
        dateTime: "2026-04-24T10:00:00",
        closesAt: "2026-04-26T23:59:00",
      },
      {
        id: 2,
        name: "Physics",
        type: "Practical",
        duration: 90,
        noQuestions: 30,
        class: "SS3",
        dateTime: "2026-06-25T13:00:00",
        closesAt: "2026-06-25T18:00:00",
      },

      {
        id: 3,
        name: "Biology",
        type: "Quiz",
        duration: 45,
        noQuestions: 25,
        class: "JSS1",
        dateTime: "2026-04-04T10:00:00",
        closesAt: "2026-04-04T23:59:00",
      },

      {
        id: 4,
        name: "Chemistry",
        type: "Final",
        duration: 120,
        noQuestions: 60,
        class: "SS2",
        dateTime: "2026-10-10T09:00:00",
        closesAt: "2026-10-10T12:00:00",
      },
      {
        id: 5,
        name: "English",
        type: "Literature Test",
        duration: 75,
        noQuestions: 50,
        class: "JS3",
        dateTime: "2026-11-18T14:00:00",
        closesAt: "2026-11-18T18:00:00",
      },
      {
        id: 6,
        name: "Computer Science",
        type: "Programming Fundamentals",
        duration: 100,
        noQuestions: 35,
        class: "SS1",
        dateTime: "2026-04-22T16:00:00",
        closesAt: "2026-04-22T20:00:00",
      },
    ],
  };

  return (
    <div className="px-[3%] py-[2%] dark:bg-black bg-white_bg transition-all duration-700 w-full min-h-screen space-y-5">
      <div className="md:flex justify-between">
        {" "}
        <div className="space-y-1">
          {" "}
          <div className="flex items-center gap-2 min-h-4 text-black dark:text-white font-bold text-3xl">
            <p> Hi {name}</p>
            <PiHandWaving />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-200">
            {" "}
            You have {upComingExams().length} upcoming exam (/s){" "}
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
        {data?.dashboard?.map((item, idx) => (
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
              <p className="font-bold text-lg dark:text-white">
                {" "}
                Upcoming Exams
              </p>
            </div>
            <p className="text-green">
              {" "}
              <Link to={"/app/exam"}> View All</Link>
            </p>
          </div>

          {upComingExams()
            .slice(0, 3)
            .map((item, idx) => {
              const ongoing = "ongoing";

              const { status } = getExamStatus(item);
              return (
                <motion.div
                  key={idx}
                  className={`flex justify-between px-4 items-center  ${status === ongoing ? "bg-amber-500" : "bg-white_bg dark:bg-black"}  h-20 rounded-2xl`}
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
                        className={`flex items-center justify-center font-bold  size-12  ${status === ongoing ? "animate-pulse bg-amber-800 text-2xl rounded-full" : "bg-green text-white dark:text-black text-lg rounded-2xl"} `}
                      >
                        {status === ongoing ? <IoPlayOutline /> : item.name[0]}
                      </p>{" "}
                      <div>
                        {" "}
                        <p className="dark:text-white text-black font-bold">
                          {" "}
                          {item.name}
                        </p>{" "}
                        <div className="flex gap-4 text-sm dark:text-gray-400 text-gray-700">
                          <p className="flex gap-2 items-center min-h-2">
                            {" "}
                            <span>
                              <FaRegClock />
                            </span>{" "}
                            {item.duration} mins
                          </p>{" "}
                          <p>{item.noQuestions} questions</p>
                        </div>
                      </div>
                    </div>{" "}
                  </div>{" "}
                  <div className="dark:text-white text-black">
                    {status === "ongoing" ? (
                      <p className="text-lg w-max bg-red-700 px-2 py-1 rounded-lg cursor-pointer animate-pulse">
                        {" "}
                        On Going
                      </p>
                    ) : (
                      new Date(item.dateTime).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>{" "}
        <div className="relative w-full lg:w-[33%]  bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 space-y-2  p-5 min-h-30 rounded-2xl ">
          <div className="flex justify-between">
            {" "}
            <div className="flex gap-2">
              <FaRegBell className="text-2xl text-green" />{" "}
              <p className="font-bold text-lg dark:text-white">
                {" "}
                Notifications
              </p>
            </div>
            {unreadCount > 0 && (
              <p className="flex min-h-3 items-center text-red-600 bg-red-200 px-2 rounded-2xl text-sm ">
                {" "}
                {unreadCount} new
              </p>
            )}
          </div>{" "}
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex items-center justify-center bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 p-4 w-full h-20 rounded-2xl font-semibold text-gray-500 dark:text-gray-400">
                No notifications yet.
              </div>
            ) : (
              notifications.slice(0, 3).map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-2xl border border-gray-200 dark:border-gray-800 ${n.read ? "bg-white dark:bg-black_bg" : "bg-green/5"}`}
                >
                  <p className="font-bold text-sm dark:text-white">{n.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{n.body}</p>
                </div>
              ))
            )}
          </div>
          {unreadCount > 0 && (
            <div className="hidden lg:block absolute bottom-3 left-1/2 -translate-x-1/2 w-full px-5">
              {" "}
              <Button
                style={
                  "flex gap-2 min-h-5 w-full justify-center py-2 items-center text-sm font-bold hover:bg-amber-500 dark:text-white rounded-lg"
                }
                name={"Mark All Read"}
                icon={<FaAngleRight />}
                action={() => markAllNotificationsRead(userId)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
