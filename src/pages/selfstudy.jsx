import React, { useRef } from "react";
import Button from "../component/ui/button";
import { LuGraduationCap } from "react-icons/lu";
import { FaArrowRight, FaRegCheckCircle, FaAngleRight } from "react-icons/fa";
import Banner from "../component/ui/banner";
import { RiRobot2Line, RiGeminiLine } from "react-icons/ri";
import { MdLightbulbOutline } from "react-icons/md";
import { IoChatbubbleOutline, IoPlayOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

import {
  HowItWorks,
  achivement,
  whyPracticeWithUs,
  Exams,
} from "../utils/constant";
import { GoBook } from "react-icons/go";
export default function SelfStudy() {
  const browseExam = useRef();

  const scrollToSection = () => {
    browseExam.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      {" "}
      <div className="pt-16 pb-8 px-[5%] lg:px-[10%] flex flex-col justify-center items-center space-y-5 min-h-150  bg-linear-to-b from-green/30 to-green-10 dark:bg-black_bg dark:bg-none">
        <div className="flex gap-2 justify-center items-center h-10  px-4 rounded-full text-green bg-green/10">
          {" "}
          <LuGraduationCap className="text-xl font-bold" />{" "}
          <p className="text-sm">For Independent Learners</p>
        </div>
        <p className="text-4xl lg:text-6xl lg:w-8/9 md:w-5/7 text-center font-semibold dark:text-white">
          {" "}
          Ace Your Exams with{" "}
          <span className="text-green">Confidence</span>{" "}
        </p>{" "}
        <p className=" lg:w-2/3 md:w-5/7 text-center text-2xl dark:text-white/50">
          {" "}
          Whether you're preparing for JAMB, WAEC, NECO, GCE, BECE, or Common
          Entrance — get access to thousands of past questions, mock tests, and
          personalized practice sessions.
        </p>
        <div className="lg:flex lg:gap-8 lg:justify-center items-center lg:h-15  space-y-5 lg:space-y-0">
          {" "}
          <div>
            {" "}
            <Button
              style={
                "flex items-center justify-center gap-2 text-white font-bold dark:text-black h-12 px-4 text-center bg-green rounded-xl  transition-all   hover:shadow-2xl shadow:xl  shadow-green cursor-pointer "
              }
              name={"Try Demo Exam"}
              href={"/login"}
              icon={<FaArrowRight className="text-sm" />}
            />
          </div>
          <div>
            {" "}
            <Button
              style={
                "flex items-center justify-center h-12 w-40 text-lg hover:bg-amber-500 hover:text-black dark:text-white outline-2 outline-gray-200 dark:outline-gray-800 rounded-xl  font-bold cursor-pointer  "
              }
              name={"Browse Exams"}
              action={scrollToSection}
            />
          </div>
        </div>
      </div>
      {/*Section 2 */}
      <div className="px-[5%] lg:px-[10%]  flex flex-wrap gap-[15%] justify-center items-center min-h-50 py-6 bg-linear-to-r dark:from-deep_green dark:via-deep_orange dark:to-deep_green from-[#E6F1ED] via-[#FAF0E4] to-[#E6F1ED]   ">
        {" "}
        <div className="block lg:flex w-[90%] lg:w-[63% min-h-50 outline-1 outline-green rounded-xl">
          {" "}
          <div className="lg:w-4/7 w-full p-8 bg-white dark:bg-black space-y-4  lg:rounded-l-xl rounded-t-xl lg:rounded-t-none">
            <div className="flex items-center gap-4 min-h-10">
              {" "}
              <p className="flex justify-center items-center rounded-2xl bg-green size-12 ">
                {" "}
                <RiRobot2Line className="text-2xl text-white dark:text-black" />{" "}
              </p>
              <div className="space-y-2">
                {" "}
                <div className="flex  gap-3 bg-amber-400 w-36 h-6 items-center justify-center rounded-full">
                  <RiGeminiLine /> <p className="text-black">AI Powered</p>
                </div>
                <p className="dark:text-white text-black font-bold text-xl">
                  {" "}
                  Smart Study Assistant
                </p>
              </div>
            </div>
            <p className="text-gray-400 dark:text-gray-70 text-lg">
              Get instant help while you practice! Our AI tutor explains
              concepts, provides hints without giving away answers, and helps
              you understand your mistakes.{" "}
            </p>
            <div className="space-y-1">
              {" "}
              <div className="flex gap-3 min-h-1 items-center">
                <MdLightbulbOutline className="text-green text-lg" />{" "}
                <p className="text-black dark:text-white font-bold text-sm lg:text-lg">
                  {" "}
                  Get hints when you're stuck on a question
                </p>
              </div>{" "}
              <div className="flex gap-3 min-h-1 items-center">
                <IoChatbubbleOutline className="text-green text-lg" />{" "}
                <p className="text-black dark:text-white text-sm lg:text-lg font-bold">
                  {" "}
                  Ask questions about any topic
                </p>
              </div>{" "}
              <div className="flex gap-3 min-h-1 items-center">
                <FaRegCheckCircle className="text-green text-lg" />{" "}
                <p className="text-black dark:text-white text-sm lg:text-lg font-bold">
                  {" "}
                  Understand why answers are correct
                </p>
              </div>
            </div>

            <Button
              name={"Start Free Trial"}
              icon={<FaAngleRight className="text-sm" />}
              style={
                "flex gap-4 h-max lg:w-max w-full mt-6 justify-center items-center  text-lg font-bold dark:text-black text-white  px-6 py-3 rounded-2xl cursor-pointer bg-green "
              }
              href={"/signup"}
            />
          </div>{" "}
          <div className="lg:w-3/7 w-full p-8 dark:bg-black_bg  bg-white_bg  lg:rounded-r-xl rounded-b-xl lg:rounded-b-none ">
            <div className="bg-white dark:bg-black p-4 space-y-4 rounded-2xl shadow-lg ">
              {" "}
              <div className="flex gap-3 min-h-10 items-start">
                {" "}
                <div className="w-13">
                  {" "}
                  <p className="flex items-center justify-center rounded-full bg-green/20 size-10 ">
                    <RiRobot2Line className="text-green text-xl" />
                  </p>
                </div>
                <p className="min-h-10 w-full bg-white_bg p-4 rounded-2xl">
                  Think about the relationship between velocity and
                  acceleration. What happens to acceleration when velocity is
                  constant?{" "}
                </p>
              </div>{" "}
              <div className="flex gap-3 min-h-10 items-start">
                <p className="min-h-10 w-full bg-green/30 dark:text-white text-black p-4 rounded-2xl">
                  Oh! Acceleration becomes zero!
                </p>
                <div className="w-13  ">
                  {" "}
                  <p className="flex  items-center justify-center rounded-full bg-green/20 size-10 ">
                    <CiUser className="text-green text-xl" />
                  </p>
                </div>
              </div>
              <div className="flex gap-3 min-h-10 items-start">
                {" "}
                <div className="w-13  ">
                  {" "}
                  <p className="flex  items-center justify-center rounded-full bg-green/20 size-10 ">
                    <RiRobot2Line className="text-green text-xl" />
                  </p>
                </div>
                <p className="min-h-10 w-full bg-white_bg p-4 rounded-2xl">
                  Exactly! Now you can solve the problem. 🎉
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Section 3 */}
      <div className="px-[5%] lg:px-[10%] py-10 flex flex-col gap-4 min-h-50 items-center justify-center bg-white dark:bg-black space-y-3">
        <div className="flex  gap-3 px-4 bg-amber-400 min-w-36 h-6 items-center justify-center rounded-full">
          <IoPlayOutline />
          <p className="text-black">See It In Action</p>
        </div>
        <div className=" w-full lg:w-[50%] space-y-3">
          <p className="text-center text-3xl font-bold dark:text-white text-black  ">
            Watch How It Works{" "}
          </p>
          <p className="text-center dark:text-gray-400 text-gray-800">
            Take a quick tour of our platform and see how thousands of students
            are using it to ace their exams.{" "}
          </p>
        </div>
        <div className="relative flex items-center justify-center bg-linear-to-b from-white/20 to-black_bg/20 outline-1 outline-gray-200 dark:outline-gray-900 rounded-xl shadow-xl size-80 lg:w-2/3 lg:h-120">
          {" "}
          <p className="flex items-center justify-center bg-green size-15 lg:size-20 rounded-full cursor-pointer">
            {" "}
            <IoPlayOutline className="text-2xl lg:text-4xl " />
          </p>
          <div className="absolute bottom-5 left-5 font-bold lg:text-2xl text-lg dark:text-white">
            {" "}
            <p> Platform Demo</p>
            <p className="text-sm"> Complete waikthrough</p>
          </div>
        </div>
        <Button
          name={"Or Try a Live Demo Exam"}
          icon={<FaAngleRight className="text-sm" />}
          style={
            "flex gap-4 h-max lg:w-max w-full mt-6 justify-center items-center  text-sm font-bold dark:text-white text-black  px-6 py-3 rounded-xl cursor-pointer dark:bg-black outline dark:outline-gray-700 outline-gray-300 "
          }
          href={"/signup"}
        />
      </div>
      {/*Section 4 */}
      <div className="px-[5%] lg:px-[10%] flex flex-wrap gap-[15%] justify-center items-center h-50 py-6 dark:bg-black_bg bg-white_bg   ">
        {achivement.map((a) => (
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold bg-linear-to-r from-green to-amber-200/50 bg-clip-text text-transparent">
              {a.score}
            </p>
            <p className="dark:text-white_bg/60 text-gray-500">{a.title}</p>
          </div>
        ))}
      </div>
      {/*Section 5 */}
      <div className="px-[5%] lg:px-[10%] py-10 flex flex-col gap-4 min-h-50 items-center justify-center bg-white dark:bg-black space-y-3">
        <div className=" w-full lg:w-[90%] space-y-3">
          <p className="text-center text-3xl font-bold dark:text-white text-black  ">
            Why Practice With Us?
          </p>
          <p className="text-center dark:text-gray-400 text-gray-800">
            Everything you need to prepare for your exams, all in one place.
          </p>
          <div className="flex flex-wrap gap-5  justify-center">
            {whyPracticeWithUs.map((item) => (
              <div className="flex flex-col items-center justify-center md:size-65 w-full h-60 px-4 rounded-2xl dark:bg-black_card bg-white outline-1 dark:outline-gray-800 dark:text-white/60 text-black/50 outline-gray-200 space-y-5 shadow-lg hover:-translate-y-1 transition-all ease-in-out duration-700 hover:shadow-2xl ">
                <p className="flex items-center justify-center rounded-2xl bg-green/20 size-15">
                  {" "}
                  {item.icon}
                </p>
                <p className="font-bold text-xl dark:text-white text-black">
                  {item.title}
                </p>
                <p className="dark:text-gray-300 text-sm text-gray-700 text-center">
                  {" "}
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*Section 6 */}
      <div className="px-[5%] lg:px-[10%] py-10 flex flex-col gap-4 min-h-50 items-center justify-center bg-white dark:bg-black space-y-3">
        <div className=" w-full lg:w-[90%] space-y-3" ref={browseExam}>
          <p className="text-center text-3xl font-bold dark:text-white text-black  ">
            Choose Your Exam{" "}
          </p>
          <p className="text-center dark:text-gray-400 text-gray-800">
            Select the exam you're preparing for and start practicing right
            away.
          </p>
          <div className=" flex flex-wrap gap-5  justify-center mt-10">
            {Exams.map((item) => (
              <div className="relative xl:w-3/11 lg:w-5/11 w-11/12 h-110 p-6 rounded-2xl dark:bg-black_card bg-white outline-1  dark:outline-gray-800  outline-gray-200 space-y-3 shadow-lg hover:-translate-y-1 transition-all ease-in-out duration-700 hover:outline-green ">
                <LuGraduationCap className="text-black dark:text-white text-3xl" />

                <div>
                  {" "}
                  <p className="text-lg font-bold text-black dark:text-white">
                    {item.name}{" "}
                  </p>
                  <p className="text-sm text-gray-800 dark:textgray-200 dark:text-white">
                    {item.fullname}{" "}
                  </p>
                </div>

                <p className="text-sm text-gray-800 dark:textgray-200 dark:text-white">
                  {" "}
                  {item.about}
                </p>

                <div className="flex items-center text-sm text-gray-800 dark:textgray-200 dark:text-white min-h-6 gap-2 ">
                  {" "}
                  <GoBook />{" "}
                  <p className="text-black dark:text-white font-bold">
                    {item.totalAvailbleQuestions}+
                  </p>{" "}
                  <p> questions</p>
                </div>
                <div className="flex gap-2 justify-start flex-wrap">
                  {" "}
                  {item.ListOfSubjects.map((subject) => (
                    <p className="min-w-15 bg-amber-500 px-3 py-1 text-sm rounded-full">
                      {subject}
                    </p>
                  ))}{" "}
                </div>
                <div className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 flex justify-center ">
                  {" "}
                  <Button
                    name={"Start Practice"}
                    icon={<FaAngleRight className="text-sm" />}
                    style={
                      "flex gap-4 h-max w-max mt-6 justify-center items-center  text-sm font-bold dark:text-white text-black  px-6 py-3 rounded-xl cursor-pointer dark:bg-black hover:bg-green hover:text-black outline dark:outline-gray-700 outline-gray-300 "
                    }
                    href={"/signup"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*Section 7 */}
      <div className="flex justify-center w-full dark:bg-black bg-white min-h-50 py-20">
        {" "}
        <div className="w-6/7  lg:min-w-3/5 space-y-5 ">
          {" "}
          <p className="text-black dark:text-white text-center text-2xl font-bold">
            {" "}
            How it Works
          </p>
          <p className="dark:text-white/50 text-gray-500 text-center">
            {" "}
            Get Started in 3 simple steps
          </p>{" "}
          <div className="flex justify-center text-white">
            {" "}
            <div className="w-full lg:w-3/7 md:space-y-7 space-y-10 ">
              {HowItWorks.map((p) => (
                <div className="flex gap-10 md:gap-4 w-full h-20">
                  {" "}
                  <div className="w-1/11">
                    <div className="bg-green size-12 flex justify-center items-center rounded-full text-xl font-bold text-white dark:text-black">
                      {p.id}
                    </div>
                  </div>{" "}
                  <div className=" w-full space-y-2">
                    {" "}
                    <p className="font-bold text-xl text-black dark:text-white capitalize">
                      {p.title}
                    </p>{" "}
                    <p className="text-gray-600 dark:text-gray-400">
                      {p.exempt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*Section 8 */}
      <div>
        <Banner
          boxStyle={
            "flex justify-center items-center bg-green  w-full min-h-40 "
          }
          text1Style={
            "dark:text-black text-white font-[1000] tracking-wide text-3xl text-center"
          }
          text2Style={
            "dark:text-black/60 text-gray-100  text-center text-lg tracking-wider  "
          }
          text1={"Ready To Start Your Exam Preparation?"}
          text2={
            "Join thousands of students who have improved their exam scores with our comprehensive practice platform."
          }
          Buttons={[
            {
              name: "Create Free Account",
              icon: <FaArrowRight className="text-xs" />,
              style:
                "flex gap-4 h-max w-max items-center  text-lg font-bold dark:text-white text-black bg-white dark:bg-black px-6 py-3 rounded-lg cursor-pointer hover:bg-white/90 dark:hover:bg-black/90",
              href: "/features",
            },
            {
              name: "View Pricing",

              style:
                "flex  h-max w-max text-lg font-bold dark:text-black text-white bg-black dark:bg-white px-6 py-3 rounded-lg cursor-pointer hover:bg-black/80 dark:hover:bg-white/90",
              href: "/features",
            },
          ]}
        />
      </div>
    </div>
  );
}
