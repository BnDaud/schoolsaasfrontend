import React, { useState, useEffect } from "react";
import Input from "../../../component/ui/input";
import { FiClock } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { FaRegCalendar } from "react-icons/fa";
import Button from "../../../component/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Practice() {
  const [show, setshow] = useState("all");
  const [whatToList, setWhatToList] = useState([
    { name: "all" },
    { name: "Upcoming" },
    { name: "Ongoing" },
    { name: "Completed" },
  ]);
  const date = new Date().getMonth();
  console.log(date);

  const [demoExam, setDemoExam] = useState([
    {
      id: 1,
      name: "Mathematics",
      type: "Mid-Term",
      duration: 60,
      noQuestions: 40,
      dateTime: "2026-03-01T10:00:00",
      closesAt: "2026-03-01T23:59:00",
    },
    {
      id: 2,
      name: "Physics",
      type: "Practical",
      duration: 90,
      noQuestions: 30,
      dateTime: "2026-03-03T13:00:00",
      closesAt: "2026-03-03T18:00:00",
    },
    {
      id: 3,
      name: "Chemistry",
      type: "Final",
      duration: 120,
      noQuestions: 60,
      dateTime: "2026-02-15T09:00:00",
      closesAt: "2026-02-15T12:00:00",
    },
    {
      id: 4,
      name: "Biology",
      type: "Quiz",
      duration: 45,
      noQuestions: 25,
      dateTime: "2026-02-22T12:30:00", // ongoing now
      closesAt: "2026-02-22T15:00:00",
    },
    {
      id: 5,
      name: "English",
      type: "Literature Test",
      duration: 75,
      noQuestions: 50,
      dateTime: "2026-03-10T14:00:00",
      closesAt: "2026-03-11T00:00:00",
    },
    {
      id: 6,
      name: "Computer Science",
      type: "Programming Fundamentals",
      duration: 100,
      noQuestions: 35,
      dateTime: "2026-02-10T16:00:00",
      closesAt: "2026-02-10T20:00:00",
    },
  ]);
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
  const [filteredExams, setFilteredExams] = useState(demoExam); // State to hold filtered list
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    let filtered = demoExam;

    // 1. Filter by Status Tab
    if (show !== "all") {
      filtered = filtered.filter((exam) => {
        const { status } = getExamStatus(exam);
        return status.toLowerCase() === show.toLowerCase();
      });
    }

    // 2. Filter by Search Input
    if (searchTerm !== "") {
      filtered = filtered.filter((exam) =>
        exam.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredExams(filtered);
  }, [show, searchTerm, demoExam]);

  const navigate = useNavigate();

  return (
    <div className="p-[3%] dark:bg-black bg-white_bg transition-all duration-700 w-full min-h-screen space-y-5">
      <div className="space-y-1">
        {" "}
        <p className="text-black dark:text-white font-bold text-3xl"> Exams</p>
        <p className="text-lg text-gray-600 dark:text-gray-200">
          {" "}
          View and manage all your exams
        </p>
      </div>

      <div className="md:flex justify-between block ">
        <Input
          type={"text"}
          width={"xl:w-[66.7%] md:w-[48%] w-full"}
          placeholder={"Search exams..."}
          onChange={setSearchTerm}
        />
        <div className="flex gap-4  mt-5 md:mt-0 ">
          {whatToList.map((item) => (
            <p
              className={`flex border justify-center items-center dark:border-gray-800 border-gray-200 text-black dark:text-white font-semibold w-max px-3 py-2 rounded-xl capitalize ${show === item.name ? "dark:text-black text-white bg-green" : "dark:text-white text-black"} cursor-pointer`}
              onClick={() => setshow(item.name)}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {" "}
        {filteredExams.map((detail) => {
          const { status, style } = getExamStatus(detail);
          return (
            <div className="relative min-h-50 bg-white dark:bg-black_bg w-full md:w-[48%] rounded-2xl  p-5 space-y-2 hover:shadow-lg hover:-translate-y-1 duration-500 ease-in-out">
              <p className={style}>{status}</p>
              <p className="text-black dark:text-white font-bold text-xl">
                {detail.type}
              </p>
              <p className="text-gray-500 dark:text-gray-100 font-light text-lg">
                {" "}
                {detail.name}
              </p>
              <div className="flex gap-3 mt-4">
                {" "}
                <div className="flex gap-2 items-center text-gray-500 dark:text-gray-100 font-light min-h-5 w-max">
                  {" "}
                  <FiClock /> <p>{detail.duration} mins</p>
                </div>{" "}
                <div className="flex gap-2 items-center text-gray-500 dark:text-gray-100 font-light min-h-5 w-max">
                  {" "}
                  <GrDocumentText /> <p>{detail.noQuestions} questions</p>
                </div>{" "}
                <div className="flex gap-2 items-center text-gray-500 dark:text-gray-100 font-light min-h-5 w-max">
                  {" "}
                  <FaRegCalendar />{" "}
                  <p>
                    {new Date(detail.dateTime).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="absolute left-6 bottom-5">
                {" "}
                <Button
                  name={"View Details"}
                  style={
                    "flex items-center gap-3 min-h-5 text-green font-semibold"
                  }
                  iconStyle={"rotate-180"}
                  action={() =>
                    navigate("/exams", { state: { examId: detail.id } })
                  }
                  icon={<IoMdArrowRoundBack />}
                />
              </div>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}
