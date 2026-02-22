import React, { useContext, useEffect } from "react";
import { RiGraduationCapLine } from "react-icons/ri";
import { AppName, Logo } from "../../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCopyright } from "react-icons/fa";
import Button from "../ui/button";
import useDarkMode from "../../hooks/darkmode";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { globalContext } from "../../context/globalcontext";

export default function Footer() {
  const year = new Date().getFullYear();
  const [toggleDarkMode] = useDarkMode();
  const { darkmode } = useContext(globalContext);

  console.log(year);
  const navigate = useNavigate();
  return (
    <>
      <hr className="dark:text-gray-800 text-gray-200 " />
      <div className="lg:px-[10%] px-[5%] py-10 space-y-5 md:flex md:flex-wrap justify-between  bg-white dark:bg-black_card transition-all duration-700">
        <div className="w-full md:w-2/9">
          {" "}
          <div className="flex flex-col gap-4 ">
            <p className="w-35"> {Logo}</p>
            <p className="dark:text-gray-300 text-gray-700">
              Modern CBT platform designed for African schools. Making education
              assessment better.
            </p>
          </div>
        </div>
        <div className="w-full md:w-2/9 ">
          <p className="font-bold mb-3 dark:text-white text-black"> Product</p>
          <ul className="space-y-2 dark:text-gray-300 text-gray-700">
            {" "}
            <li>
              <Link to={"/features"}> Features</Link>
            </li>
            <li>
              <Link to={"/pricing"}> Pricing</Link>
            </li>
            <li>
              <Link to={"/demo"}> Demo</Link>
            </li>
            <li>
              <Link to={"/updates"}> Updates</Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-2/9 ">
          <p className="font-bold mb-3 dark:text-white text-black">
            {" "}
            Resources
          </p>
          <ul className="space-y-2 dark:text-gray-300 text-gray-700">
            {" "}
            <li>
              <Link to={"/help-center"}> Help Center</Link>
            </li>
            <li>
              <Link to={"/documentation"}> Documentation</Link>
            </li>
            <li>
              <Link to={"/blog"}> Blog</Link>
            </li>
            <li>
              <Link to={"/support"}> Support</Link>
            </li>
          </ul>
        </div>{" "}
        <div className="w-full md:w-2/9 ">
          <p className="font-bold mb-3 dark:text-white text-black"> Company</p>
          <ul className="space-y-2 dark:text-gray-300 text-gray-700">
            {" "}
            <li>
              <Link to={"/about"}> About</Link>
            </li>
            <li>
              <Link to={"/careers"}> Careers</Link>
            </li>
            <li>
              <Link to={"/contact"}> Contact</Link>
            </li>
            <li>
              <Link to={"/privacy"}> Privacy</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:px-[10%] px-[5%]  ">
        {" "}
        <div className="outline-1 dark:outline-gray-800 outline-gray-200"></div>
      </div>
      <div className="lg:px-[10%] px-[5%]  flex flex-wrap justify-between items-center h-15 pb-30 bg-white dark:bg-black_card transition-all duration-700">
        <div className="flex h-15 justify-center items-center gap-2 w-full md:w-max dark:text-gray-300 text-gray-700">
          <FaRegCopyright />{" "}
          <p>{`${year} ${AppName}. All rights reserved.`}</p>{" "}
        </div>
        <div className="flex justify-center hover:cursor-pointer w-full md:w-max dark:text-gray-300 text-gray-700">
          {darkmode ? (
            <Button
              icon={<MdOutlineWbSunny className="text-xl" />}
              style={
                "p-2 hover:bg-amber-500  rounded-lg transition duration-500"
              }
              action={toggleDarkMode}
            />
          ) : (
            <Button
              icon={<BsMoon className="text-xl" />}
              style={
                "p-2 hover:bg-amber-500  rounded-lg transition duration-500"
              }
              action={toggleDarkMode}
            />
          )}
        </div>{" "}
      </div>
    </>
  );
}
