import React, { useContext } from "react";
import { studentNav, tutorNav } from "../../utils/constant";
import { NavLink } from "react-router-dom";
import { globalContext } from "../../context/globalcontext";

export default function Footernav() {
  const { role } = useContext(globalContext);
  const navItem = role === "Student" ? studentNav : tutorNav;
  return (
    <div className="flex justify-between items-center px-[10%] bg-white_bg dark:bg-black_bg  h-full transition-all duration-700">
      {navItem.slice(0, 4).map((item) => (
        <NavLink
          to={item.href}
          className={({ isActive }) =>
            `${isActive ? "text-green" : "text-gray-500 dark:text-gray-400"}`
          }
        >
          <div className="flex  flex-col gap-2  items-center justify-center">
            {item.icon}
            <p className="font-semibold text-sm">{item.name}</p>{" "}
          </div>
        </NavLink>
      ))}
    </div>
  );
}
