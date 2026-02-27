import React, { useState, useEffect } from "react";
import Input from "../../../component/ui/input";
import { FiClock } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import Button from "../../../component/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Practice() {
  const [show, setshow] = useState("all");
  const whatToList = [
    { name: "all" },
    { name: "Science" },
    { name: "Commerce" },
    { name: "Arts" },
  ];
  const date = new Date().getMonth();
  console.log(date);

  const demoExam = [
    {
      id: 9,
      name: "Geography",
      type: "Mid-Term",
      duration: 70,
      noQuestions: 35,
      department: "Art",
    },
    {
      id: 2,
      name: "Physics",
      type: "Practical",
      duration: 90,
      noQuestions: 30,
      department: "Science",
    },
    {
      id: 7,
      name: "Business Studies",
      type: "Quiz",
      duration: 60,
      noQuestions: 30,
      department: "Commerce",
    },
    {
      id: 4,
      name: "Biology",
      type: "Quiz",
      duration: 45,
      noQuestions: 25,
      department: "Science",
    },
    {
      id: 3,
      name: "Chemistry",
      type: "Final",
      duration: 120,
      noQuestions: 50,
      department: "Science",
    },
    {
      id: 6,
      name: "Economics",
      type: "Final",
      duration: 80,
      noQuestions: 35,
      department: "Commerce",
    },
    {
      id: 8,
      name: "History",
      type: "Final",
      duration: 90,
      noQuestions: 45,
      department: "Art",
    },
    {
      id: 1,
      name: "Mathematics",
      type: "Mid-Term",
      duration: 60,
      noQuestions: 40,
      department: "Science",
    },
    {
      id: 5,
      name: "Accountancy",
      type: "Mid-Term",
      duration: 75,
      noQuestions: 40,
      department: "Commerce",
    },
    {
      id: 10,
      name: "Literature",
      type: "Quiz",
      duration: 50,
      noQuestions: 25,
      department: "Art",
    },
  ];
  const getDepartment = (exam) => {
    // 1. If current time is past the closing time
    if (exam.department.toLowerCase() == "science") {
      return {
        department: "Science",
        style:
          "top-5 right-5 absolute bg-blue-300 w-max px-2 rounded-full text-sm text-blue-700",
      };
    }

    // 2. If current time is between start and closing time
    // Note: We use 'close' instead of 'duration' to define the active window
    if (exam.department.toLowerCase() == "commerce") {
      return {
        department: "Commerce",
        style:
          "top-5 right-5 absolute bg-green-300 w-max px-2 rounded-full text-sm text-green-700 ",
      };
    }

    // 3. Otherwise, it must be in the future
    return {
      department: "Arts",
      style:
        "top-5 right-5 absolute bg-amber-300 text-amber-700 w-max px-2 rounded-full text-sm ",
    };
  };
  const [filteredExams, setFilteredExams] = useState(demoExam); // State to hold filtered list
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    let filtered = demoExam;

    // 1. Filter by Status Tab
    if (show !== "all") {
      filtered = filtered.filter((exam) => {
        const { department } = getDepartment(exam);
        return department.toLowerCase() === show.toLowerCase();
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
        <p className="text-black dark:text-white font-bold text-3xl">
          {" "}
          Practice Tests
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-200">
          {" "}
          Sharpen your skills with practice questions
        </p>
      </div>
      <div className="md:flex justify-between block ">
        <Input
          type={"text"}
          width={"xl:w-[66.7%] md:w-[48%] w-full"}
          placeholder={"Search exams..."}
          onChange={setSearchTerm}
          icon={<IoSearch className="text-lg" />}
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
        {filteredExams.map((detail, index) => {
          const { department, style } = getDepartment(detail);

          return (
            <motion.div
              key={detail.id}
              className="relative min-h-50 bg-white dark:bg-black_bg w-full md:w-[48%] rounded-2xl p-5 space-y-2 "
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            >
              <p className={style}>{department}</p>
              <p className="text-black dark:text-white font-bold text-xl">
                {detail.type}
              </p>
              <p className="text-gray-500 dark:text-gray-100 font-light text-lg">
                {detail.name}
              </p>

              <div className="flex gap-3 mt-4">
                <div className="flex gap-2 items-center text-gray-500 dark:text-gray-100 font-light min-h-5 w-max">
                  <FiClock /> <p>{detail.duration} mins</p>
                </div>
                <div className="flex gap-2 items-center text-gray-500 dark:text-gray-100 font-light min-h-5 w-max">
                  <GrDocumentText /> <p>{detail.noQuestions} questions</p>
                </div>
              </div>

              <div className="absolute left-6 bottom-5">
                <Button
                  name={"Practice"}
                  style={
                    "flex items-center gap-3 min-h-5 text-green font-semibold"
                  }
                  iconStyle={"rotate-180"}
                  action={() =>
                    navigate("/app/exams", { state: { examId: detail.id } })
                  }
                  icon={<IoMdArrowRoundBack />}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
