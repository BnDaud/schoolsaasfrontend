import React from "react";
import Banner from "../../component/ui/banner";
import { FaAngleRight } from "react-icons/fa";
import { AppName, ourValues, team } from "../../utils/constant";
import { CiLinkedin } from "react-icons/ci";
import { achivement } from "../../utils/constant";
export default function About() {
  return (
    <div>
      {" "}
      <div className="pt-16 pb-8 px-[5%] lg:px-[10%] flex flex-col justify-center items-center space-y-5 h-100  bg-linear-to-b from-green/30 to-green-10 dark:bg-linear-to-br dark:from-deep_green dark:to-deep_orange ">
        <p className="text-4xl lg:text-6xl lg:w-8/9 md:w-5/7 text-center font-semibold dark:text-white">
          {" "}
          Transforming Education<span className="text-green">Across </span>{" "}
          <span className="bg-linear-to-r from-green to-amber-300 bg-clip-text text-transparent">
            Africa
          </span>
        </p>{" "}
        <p className=" lg:w-2/3 md:w-5/7 text-center text-xl dark:text-white/50">
          {" "}
          We're on a mission to make quality assessment accessible to every
          school in Africa. Built by educators, for educators.
        </p>
        `
      </div>
      {/* Section 2  */}
      <div className="p-16 px-[5%] lg:px-[10%] xl:flex gap-5 items-center justify-center min-h-100 bg-white_bg dark:bg-black_bg space-y-10">
        {" "}
        <div className="space-y-5 dark:text-gray-300 text-gray-700 w-full xl:w-1/3">
          <p className="text-3xl font-bold dark:text-white text-black">
            Our Story
          </p>{" "}
          <p>
            {" "}
            {AppName} was born from frustration. As teachers and school
            administrators, we saw firsthand how paper-based exams consumed
            valuable time and resources that could be better spent on teaching.
          </p>
          <p>
            {" "}
            We tried existing solutions, but they were built for Western schools
            with reliable internet and expensive hardware. None understood the
            unique challenges African schools face.
          </p>{" "}
          <p>
            So in 2021, we built EduTest — a platform designed from the ground
            up for African schools. Low bandwidth? Works perfectly. Old
            computers? No problem. Limited tech skills? Our interface is so
            simple, anyone can use it.
          </p>{" "}
          <p>
            Today, we're proud to serve 500+ schools and counting. But we're
            just getting started.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 justify-center min-h-max w-full xl:w-1/3">
          {" "}
          {achivement.map((a) => (
            <div className="flex flex-col justify-center items-center space-y-2 w-2/5 px-2 dark:bg-black_bg bg-white shadow-xl rounded-xl min-h-30  border border-gray-100 dark:border-gray-800">
              <p className="text-3xl font-bold bg-linear-to-r from-green to-amber-200/50 bg-clip-text text-transparent">
                {a.score}
              </p>
              <p className="dark:text-white_bg/60 text-gray-500 text-center">
                {a.title}
              </p>
            </div>
          ))}
        </div>
      </div>{" "}
      {/* Section 3  */}
      <div className="px-[5%] lg:px-[10%] py-10 flex flex-col gap-4 min-h-50 items-center justify-center bg-white dark:bg-black space-y-3">
        <div className=" w-full lg:w-[90%] space-y-3">
          <p className="text-center text-3xl font-bold dark:text-white text-black  ">
            Our Values
          </p>
          <p className="text-center text-lg dark:text-gray-400 text-gray-800">
            These principles guide everything we do at {AppName}
          </p>
          <div className="flex flex-wrap gap-5  justify-center">
            {ourValues.map((item) => (
              <div className="flex flex-col items-center justify-center md:size-65 w-full h-60 px-4 rounded-2xl dark:bg-black_card bg-white outline-1 dark:outline-gray-800 dark:text-white/60 text-black/50 outline-gray-200 space-y-5 shadow-lg hover:-translate-y-1 transition-all ease-in-out duration-700 hover:shadow-2xl ">
                <p className="flex items-center justify-center rounded-2xl bg-green/20 size-15">
                  {" "}
                  {item.icon}
                </p>
                <p className="font-bold text-xl dark:text-white text-black">
                  {item.title}
                </p>
                <p className="dark:text-gray-300  text-gray-700 text-center">
                  {" "}
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
      {/* Section 4  */}
      <div className="px-[5%] lg:px-[10%] py-10 flex flex-col gap-4 min-h-50 items-center justify-center bg-white_bg dark:bg-black_bg space-y-3">
        <div className=" w-full lg:w-[90%] space-y-3">
          <p className="text-center text-3xl font-bold dark:text-white text-black  ">
            Meet the Team
          </p>
          <p className="text-center text-lg dark:text-gray-400 text-gray-800">
            Passionate educators and technologists building the future of
            assessment.
          </p>
          <div className="flex flex-wrap gap-5  justify-center">
            {team.map((item) => (
              <div className="flex flex-col  items-center justify-center md:w-65 w-full min-h-70 px-4 py-6 rounded-2xl dark:bg-black_card bg-white outline-1 dark:outline-gray-800 dark:text-white/60 text-black/50 outline-gray-200 space-y-5 shadow-lg hover:-translate-y-1 transition-all ease-in-out duration-700 hover:shadow-2xl ">
                <p className="flex items-center justify-center ">
                  {" "}
                  <img src={item.img} className="size-25 rounded-full" />
                </p>
                <p className="font-bold text-xl dark:text-white text-black">
                  {item.name}
                </p>
                <p className="text-green text-lg font-bold text-center">
                  {" "}
                  {item.position}
                </p>
                <p className="flex items-center justify-center rounded-2xl bg-green/20 size-12 cursor-pointer">
                  {" "}
                  <a href={item.linkedin} target="_blank">
                    {" "}
                    <CiLinkedin className="text-green text-3xl" />
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Section 6  */}
      <div className="px-[5%] lg:px-[10%] py-20 dark:bg-black_bg bg-white_bg w-full">
        <Banner
          boxStyle={
            "flex justify-center items-center bg-green rounded-3xl w-full min-h-40 "
          }
          text1Style={
            "dark:text-black text-white font-[1000] tracking-wide text-3xl text-center"
          }
          text2Style={
            "dark:text-black/60 text-gray-100  text-center text-lg tracking-wider  "
          }
          text1={"Ready To Transform Your School's Exams?"}
          text2={
            "Join hundreds of Nigerian schools already using Mat Learn. Start your free trial today and see results within days."
          }
          Buttons={[
            {
              name: "Start Free Trial",
              icon: <FaAngleRight className="text-sm" />,
              style:
                "flex gap-4 h-max w-max items-center  text-lg font-bold dark:text-white text-black bg-white dark:bg-black px-6 py-3 rounded-lg cursor-pointer hover:bg-white/90 dark:hover:bg-black/90",
              href: "/features",
            },
            {
              name: "Contact us",

              style:
                "flex gap-4 h-max w-max items-center  text-lg font-bold dark:text-black text-white bg-black dark:bg-white px-6 py-3 rounded-lg cursor-pointer hover:bg-black/80 dark:hover:bg-white/90",
              href: "/features",
            },
          ]}
        />
      </div>
    </div>
  );
}
