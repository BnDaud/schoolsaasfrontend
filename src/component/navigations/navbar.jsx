import React, { useContext, useState } from "react";
import { globalContext } from "../../context/globalcontext";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";
import { RxDropdownMenu } from "react-icons/rx";
import useDarkMode from "../../hooks/darkmode";
import { AppName } from "../../utils/constant";
import Button from "../ui/button";
function NavbarHomePage() {
  const [dropdown, setDropDown] = useState(false);
  const [toggleDarkMode] = useDarkMode();
  const { darkmode } = useContext(globalContext);

  const links = [
    { name: "Features", to: "/features" },
    { name: "Self Study", to: "/self-study" },
    { name: "Pricing", to: "/pricing" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <div
      className={` fixed top-0 left-0 z-50 w-full inset-0  h-15 dark:bg-black_bg/40 backdrop-blur-md  dark:border-gray-800 border-gray-200 border-b bg-white_bg/70 transition duration-1000`}
    >
      <div className="">
        {" "}
        <div className="flex lg:px-[10%] px-[5%] h-15 items-center justify-between">
          <div className=" bg-green p-2 rounded-xl cursor-pointer ">
            {" "}
            <Link to={"/"}>
              {" "}
              <div className="flex gap-2">
                {" "}
                <RiGraduationCapLine className="text-2xl  dark:text-black text-white" />{" "}
                <p className="md:block hidden font-bold dark:text-black text-white ">
                  {AppName}
                </p>
              </div>
            </Link>
          </div>{" "}
          <div className="lg:block hidden">
            {" "}
            <ul className="flex gap-4 capitalize dark:text-white/40 text-black/40">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive
                        ? "text-black dark:text-white font-bold"
                        : "hover:text-black dark:hover:text-white"
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>{" "}
          <div className="lg:block hidden">
            {" "}
            <div className="flex gap-4  dark:text-white h-15 items-center">
              <div className="flex justify-center hover:cursor-pointer ">
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
              <Button
                style={
                  "hover:font-bold px-4 py-2 w-full border-2 border-gray-200 dark:border-gray-700 dark:outline-0  text-center hover:bg-amber-500 hover:cursor-pointer  rounded-lg"
                }
                name={"Login"}
                href={"/login"}
              />
              <Button
                style={
                  "font-bold text-white w-full dark:text-black w-5/12 text-center  px-4 py-2  bg-green rounded-lg ease-out duration-300 hover:-translate-y-0.5 hover:scale-101 hover:shadow-2xl shadow:xl hover:cursor-pointer  shadow-green transition"
                }
                name={"Get Started"}
                href={"/login"}
              />
            </div>
          </div>
          {/* Mobile View*/}
          <div className="lg:hidden block">
            <RxDropdownMenu
              className={` text-4xl text-black dark:text-white
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
            {links.map((link) => (
              <li key={link.to} onClick={() => setDropDown(false)}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black dark:text-white font-bold"
                      : "hover:text-black dark:hover:text-white"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <hr className="mb-5 bg-gray-950" />
          </ul>

          <div className=" mb-5">
            {" "}
            <div className="flex gap-4 justify-between dark:text-white h-15 items-center">
              <div className="flex justify-center w-1/12 hover:cursor-pointer text-center">
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
              <div className="w-5/12">
                <Button
                  style={
                    "hover:font-bold px-2 py-2 w-full border-2 border-gray-200 dark:border-gray-700 dark:outline-0  text-center hover:bg-amber-500 hover:cursor-pointer  rounded-lg"
                  }
                  name={"Login"}
                  href={"/login"}
                  action={() => setDropDown(false)}
                />
              </div>
              <div className="w-5/12">
                <Button
                  style={
                    "font-bold text-white w-full dark:text-black w-5/12 text-center  px-4 py-2  bg-green rounded-lg ease-out duration-300 hover:-translate-y-0.5 hover:scale-101 hover:shadow-2xl shadow:xl hover:cursor-pointer  shadow-green transition"
                  }
                  name={"Get Started"}
                  href={"/login"}
                  action={() => setDropDown(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarHomePage;
