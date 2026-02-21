import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo, studentNav } from "../../utils/constant";
import { IoExitOutline } from "react-icons/io5";
import { LuMoon, LuSun } from "react-icons/lu";

import { GiHistogram } from "react-icons/gi";

import { globalContext } from "../../context/globalcontext";
import Button from "../ui/button";
import useDarkMode from "../../hooks/darkmode";

export default function Sidenav() {
  const { darkmode } = useContext(globalContext);
  const [toggleDarkMode] = useDarkMode();

  return (
    <div className="w-full bg-white_bg dark:bg-black_bg h-full">
      <div className="flex flex-col h-full ">
        {" "}
        <div className="flex items-center px-4  h-16 border-b  border-gray-200 dark:border-gray-700">
          {" "}
          <p className="w-35">{Logo}</p>
        </div>
        <div className="flex-1  ">
          <ul className="px-4 space-y-6 pt-6">
            {" "}
            {studentNav.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex h-11 items-center gap-5 px-4 rounded-xl  ${isActive ? "bg-green  text-white dark:text-black" : "hover:bg-green dark:text-gray-400 text-gray-500"}`
                  }
                >
                  {" "}
                  {item.icon}
                  <p className="font-semibold text-lg">{item.name}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className=" h-32 px-4 space-y-3 py-3 border-y dark:border-gray-700 border-gray-200">
          {" "}
          <div className="">
            {darkmode ? (
              <Button
                name={"Dark Mode"}
                action={toggleDarkMode}
                style={
                  "flex  gap-3  items-center  text-lg rounded-xl hover:bg-amber-500 h-12 px-4"
                }
                icon={<LuMoon />}
              />
            ) : (
              <Button
                name={"Light Mode"}
                action={toggleDarkMode}
                style={
                  "flex  gap-3  items-center text-gray-400 text-lg rounded-xl hover:bg-amber-500 hover:text-black  h-12 px-4"
                }
                icon={<LuSun />}
              />
            )}
          </div>{" "}
          <div>
            {" "}
            <Button
              name={"Log Out"}
              style={
                "flex gap-3  items-center text-red-600 text-lg rounded-xl hover:bg-red-300 h-12 px-4"
              }
              icon={<IoExitOutline className="text-xl" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
