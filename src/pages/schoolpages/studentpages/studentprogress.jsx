import { GiHistogram } from "react-icons/gi";
import { FaRegCalendar } from "react-icons/fa6";
import Button from "../../../component/ui/button";
import { FaRegClock } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Line,
} from "recharts";

import { RiFlashlightLine, RiAwardLine } from "react-icons/ri";

import { motion } from "framer-motion";

export default function Progress() {
  const navigate = useNavigate();

  const data = [
    { subject: "Speed", value: 80 },
    { subject: "Power", value: 60 },
    { subject: "Accuracy", value: 90 },
    { subject: "Defense", value: 70 },
    { subject: "Skill", value: 70 },
    { subject: "Acuracy", value: 90 },
    { subject: "Goverment", value: 60 },
    { subject: "Skil", value: 70 },
  ];
  const dataline = [
    { name: "Jan", value: 30, average: 35 },
    { name: "Feb", value: 45, average: 37 },
    { name: "Mar", value: 28, average: 34 },
    { name: "Apr", value: 60, average: 41 },
    { name: "May", value: 50, average: 42 },
  ];

  const dashboard = [
    {
      name: "Average Score",

      icon: (
        <p className="flex items-center justify-center size-12 bg-green/10 rounded-lg">
          <GiHistogram className="text-2xl text-green" />
        </p>
      ),
      score: "86%",
    },
    {
      name: "Study Time",

      icon: (
        <p className="flex items-center justify-center size-12 bg-green/10 rounded-lg">
          <FaRegClock className="text-2xl text-green" />
        </p>
      ),
      score: `${45}h`,
    },
    {
      name: "Exams Completed ",

      icon: (
        <p className="flex items-center justify-center size-12 bg-amber-100 dark:bg-amber_deep/20 rounded-lg">
          <RiAwardLine className="text-2xl text-amber-500" />
        </p>
      ),
      score: 8,
    },
    {
      name: "Current Streak",

      icon: (
        <p className="flex items-center justify-center size-12 bg-amber-100 dark:bg-amber_deep/20 rounded-lg">
          {" "}
          <RiFlashlightLine className="text-2xl text-amber-500" />
        </p>
      ),
      score: `${7}days`,
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
          name={"This Month"}
          icon={<FaRegCalendar className="text-lg" />}
          style={
            "flex flex-row-reverse items-center justify-center text-lg gap-2 h-10 border-2 mt-5 md:mt-0 w-full md:w-max dark:border-gray-700 border-gray-300 dark:text-white text-sm text-black px-5  rounded-lg h font-bold "
          }
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
      <div className="flex flex-wrap justify-between gap-4 md:gap-0">
        {" "}
        <div
          className={` w-full md:w-[49%] bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 space-y-2  p-5 min-h-30 rounded-2xl transition-all duration-700`}
        >
          <p className="font-bold text-lg dark:text-white">
            Performance Over Time
          </p>
          <div className="flex h-full w-full justify-center items-center text-sm mb-5">
            <AreaChart width={600} height={300} data={dataline}>
              <XAxis dataKey="name" />
              <YAxis />
              <Area
                type="monotone"
                dataKey="value"
                fill="#E6FFE6"
                stroke="#2eb89c"
              />{" "}
              <Line
                type="monotone"
                dataKey="average"
                stroke="#C2C7C2"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </div>
        </div>{" "}
        <div
          className={` w-full md:w-[49%] bg-white dark:bg-black_bg border border-gray-200 dark:border-gray-800 space-y-2  p-5 min-h-30 rounded-2xl transition-all duration-700`}
        >
          <p className="font-bold text-lg dark:text-white">
            Subject Proficiency
          </p>
          <div className="flex h-full w-full justify-center items-center text-sm mb-5">
            {" "}
            <RadarChart width={400} height={200} data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                dataKey="value"
                fillOpacity={0.6}
                stroke="#2eb89c"
                fill="#E6FFE6"
              />
            </RadarChart>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
