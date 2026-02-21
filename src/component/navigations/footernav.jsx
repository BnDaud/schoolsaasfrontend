import React from "react";
import { studentNav } from "../../utils/constant";
import { NavLink } from "react-router-dom";

export default function Footernav() {
  return (
    <div className="flex justify-between items-center px-[10%] bg-white_bg dark:bg-black_bg  h-full ">
      {studentNav.slice(0, 4).map((item) => (
        <NavLink
          to={item.href}
          className={({ isActive }) =>
            `${isActive ? "text-green" : "text-gray-500 dark:text-gray-400"}`
          }
        >
          <div className="flex  flex-col items-center justify-center">
            {item.icon}
            <p className="font-semibold text-lg">{item.name}</p>{" "}
          </div>
        </NavLink>
      ))}
    </div>
  );
}
