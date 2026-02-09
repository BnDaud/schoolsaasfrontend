import React, { useContext } from "react";
import { TbPointFilled } from "react-icons/tb";
import { globalContext } from "../App";
export default function Home() {
  const { darkmode } = useContext(globalContext);

  return (
    <div className={`${darkmode} `}>
      <div className="pt-25 px-[5%] lg:px-[10%] flex flex-col justify-center items-center space-y-5 min-h-150  bg-linear-to-b from-green/10 to-green-2 dark:bg-linear-to-br dark:from-deep_green dark:to-deep_orange ">
        <div className="flex gap-2 justify-center items-center h-10  px-4 rounded-full text-green bg-green/10">
          {" "}
          <TbPointFilled className="text-xl font-bold" />{" "}
          <p className="text-sm">Trusted by 500+ Nigerian Schools</p>
        </div>
        <p className="text-4xl lg:text-6xl lg:w-8/9 md:w-5/7 text-center font-semibold dark:text-white">
          {" "}
          Modern CBT Platform for African Schools
        </p>{" "}
        <p className=" lg:w-2/3 md:w-5/7 text-center  dark:text-white/50">
          {" "}
          Conduct secure, efficient computer-based tests. Reduce exam costs, get
          instant results, and track student performance across your school or
          network of schools.
        </p>
        <div className="lg:flex gap-8 justify-center space-y-5 lg:space-y-0">
          {" "}
          <div className="px-6 py-3 text-center bg-green rounded-xl scale-110 font-bold  ">
            {" "}
            Start Free Trials
          </div>{" "}
          <div className="px-12 py-3 text-center hover:bg-green hover:text-black text-green outline-3 outline-green rounded-xl  font-bold  ">
            {" "}
            Watch Demo
          </div>
        </div>
      </div>
    </div>
  );
}
