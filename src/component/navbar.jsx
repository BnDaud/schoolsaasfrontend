import React, { useContext, useState } from "react";
import { globalContext } from "../App";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RxDropdownMenu } from "react-icons/rx";

function NavbarHomePage() {
  const { darkmode, setDarkmode } = useContext(globalContext);
  const [dropdown, setDropDown] = useState(false);

  return (
    <div
      className={`${darkmode} fixed top-0 left-0 z-50 w-full inset-0  h-15 dark:bg-black_bg/40 backdrop-blur-md  border-gray-300 border-b bg-white_bg/70 transition duration-1000`}
    >
      <div className="">
        {" "}
        <div className="flex lg:px-[10%] px-[5%] h-15 items-center justify-between">
          <div className=" bg-green p-2 rounded-lg cursor-pointer ">
            {" "}
            <Link to={"/"}>
              {" "}
              <RiGraduationCapLine className="text-2xl text-white" />
            </Link>
          </div>{" "}
          <div className="lg:block hidden">
            {" "}
            <ul className=" flex gap-4 capitalize  dark:text-white/40 text-black/40 ">
              {" "}
              <li className="hover:text-black dark:hover:text-white">
                <Link to="/features"> Features</Link>{" "}
              </li>
              <li className="hover:text-black dark:hover:text-white">
                {" "}
                <Link to={"/self-study"}>Self Study</Link>{" "}
              </li>
              <li className="hover:text-black dark:hover:text-white">
                <Link to={"/pricing"}> Pricing </Link>{" "}
              </li>
              <li className="hover:text-black dark:hover:text-white">
                <Link to={"/about"}> About</Link>
              </li>
              <li className="hover:text-black dark:hover:text-white">
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>{" "}
          <div className="lg:block hidden">
            {" "}
            <div className="flex gap-4  dark:text-white h-15 items-center">
              <div>
                {darkmode === "dark" ? (
                  <p
                    className="p-2 hover:bg-amber-500 rounded-lg transition duration-500"
                    onClick={() => setDarkmode("")}
                  >
                    <MdOutlineWbSunny className="text-xl" />
                  </p>
                ) : (
                  <p
                    className="p-2 hover:bg-amber-500 rounded-lg transition duration-500"
                    onClick={() => setDarkmode("dark")}
                  >
                    {" "}
                    <BsMoon className="text-xl" />
                  </p>
                )}
              </div>{" "}
              <div className="hover:font-bold px-2 py-2 hover:bg-amber-500 rounded-lg">
                {" "}
                Login
              </div>
              <div
                className="font-bold text-white dark:text-black   px-4 py-2  bg-green rounded-lg ease-out duration-300 hover:-translate-y-0.5 hover:scale-101 
           hover:shadow-2xl shadow:xl  shadow-green transition"
              >
                {" "}
                Get Started
              </div>
            </div>
          </div>
          <div>
            <RxDropdownMenu
              className={`lg:hidden block text-4xl text-black dark:text-white
      transition-transform duration-700 ease-in-out cursor-pointer
      ${dropdown ? "rotate-180" : "rotate-0"}`}
              onClick={() => setDropDown(!dropdown)}
            />
          </div>
        </div>
      </div>
      <div
        className={`absolute lg:hidden block w-full bg-white dark:bg-black_card  transition-all duration-700 ease-in-out ${dropdown ? " opacity-100 pointer-events-auto min-h-20" : " opacity-0 pointer-events-none"}`}
      >
        <div
          className={`lg:px-[10%] px-[5%] border-b border-gray-300 ${dropdown ? "block" : "hidden"} `}
        >
          <ul className="mt-5  space-y-8 capitalize  dark:text-white/40 text-black/40 ">
            {" "}
            <li className="hover:text-black dark:hover:text-white">
              <Link to="/features"> Features</Link>{" "}
            </li>
            <li className="hover:text-black dark:hover:text-white">
              {" "}
              <Link to={"/self-study"}>Self Study</Link>{" "}
            </li>
            <li className="hover:text-black dark:hover:text-white">
              <Link to={"/pricing"}> Pricing </Link>{" "}
            </li>
            <li className="hover:text-black dark:hover:text-white">
              <Link to={"/about"}> About</Link>
            </li>
            <li className="hover:text-black dark:hover:text-white">
              <Link to={"/contact"}>Contact</Link>
            </li>
            <hr className="mb-5 bg-gray-950" />
          </ul>

          <div className=" mb-5">
            {" "}
            <div className="flex gap-4 justify-between dark:text-white h-15 items-center">
              <div className=" w-1/12">
                {darkmode === "dark" ? (
                  <p
                    className="p-2 hover:bg-amber-500 rounded-lg transition duration-500"
                    onClick={() => setDarkmode("")}
                  >
                    <MdOutlineWbSunny className="text-xl" />
                  </p>
                ) : (
                  <p
                    className="p-2 hover:bg-amber-500 rounded-lg transition duration-500"
                    onClick={() => setDarkmode("dark")}
                  >
                    {" "}
                    <BsMoon className="text-xl" />
                  </p>
                )}
              </div>{" "}
              <div className="hover:font-bold px-2 py-2 w-5/12 border-2 border-gray-200 dark:border-gray-700 dark:outline-0  text-center hover:bg-amber-500 rounded-lg">
                {" "}
                Login
              </div>
              <div
                className="font-bold text-white dark:text-black w-5/12 text-center  px-4 py-2  bg-green rounded-lg ease-out duration-300 hover:-translate-y-0.5 hover:scale-101 
           hover:shadow-2xl shadow:xl  shadow-green transition"
              >
                {" "}
                Get Started
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarHomePage;
