import React from "react";
import { FaRegBell } from "react-icons/fa";
import { PiList } from "react-icons/pi";
export default function StatusBanner({ open }) {
  return (
    <div className="fixed top-0 z-30  flex h-[10vh]  items-center xl:w-5/6 w-full   bg-white_bg dark:bg-black_bg border-b border-gray-200 dark:border-gray-700  transition-all duration-700">
      <p
        className="xl:hidden cursor-pointer xl:px-[0%] px-[3%] "
        onClick={() => open()}
      >
        {" "}
        <PiList className="text-3xl text-black dark:text-white" />
      </p>
      <div className="flex justify-between items-center xl:px-[3%] px-[0%] w-full h-full ">
        {" "}
        <div>
          <p className="font-semibold text-xl text-black dark:text-white">
            School Name
          </p>
          <p className="text-gray-700 dark:text-gray-300">Student Dashboard</p>
        </div>
        <div className="flex h-full items-center gap-6 text-black dark:text-white">
          <div className="relative flex items-center justify-center  size-10">
            {" "}
            <FaRegBell className="text-xl" />
            <p className="absolute flex items-center justify-center top-0 right-0 bg-red-500 size-4 rounded-full text-xs text-white ">
              2
            </p>
          </div>
          <div className="flex gap-3 h-full items-center">
            <p className="flex items-center justify-center text-2xl font-bold rounded-full size-10 bg-green">
              {" "}
              A{" "}
            </p>{" "}
            <p className="text-lg font-semibold w-3/5 truncate">
              {" "}
              Adebayo John
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
