import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  adminNav,
  SchoolLogo,
  studentNav,
  superAdminNav,
  tutorNav,
} from "../../utils/constant";
import { IoExitOutline } from "react-icons/io5";
import { LuMoon, LuSun } from "react-icons/lu";
import { globalContext } from "../../context/globalcontext";
import Button from "../ui/button";
import useDarkMode from "../../hooks/darkmode";

export default function Sidenav() {
  const { darkmode, role, brand } = useContext(globalContext);
  const [toggleDarkMode] = useDarkMode();
  const navItem =
    role === "Student"
      ? studentNav
      : role === "Admin"
        ? adminNav
        : role === "SuperAdmin"
          ? superAdminNav
          : tutorNav;

  return (
    <div className="w-full bg-white dark:bg-black_bg h-full transition-all duration-700">
      <div className="flex flex-col h-full ">
        {" "}
        <div className="flex items-center justify-center px-4  h-[10vh] border-b  border-gray-200 dark:border-gray-700 ">
          {" "}
          {brand?.logoUrl ? (
            <div className="flex items-center gap-2">
              <img src={brand.logoUrl} alt={brand.brandName} className="w-10 rounded-lg object-cover" />
              <p className="font-bold text-black dark:text-white">{brand.brandName}</p>
            </div>
          ) : role === "SuperAdmin" ? (
            <div
              className="flex size-10 items-center justify-center rounded-lg font-bold text-white"
              style={{ backgroundColor: "var(--brand-color)" }}
            >
              {brand?.brandName?.[0] || "M"}
            </div>
          ) : (
            SchoolLogo("w-45 ")
          )}
        </div>
        <div className="flex-1  ">
          <ul className="px-4 space-y-3 pt-6">
            {navItem.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.href}
                  style={({ isActive }) =>
                    isActive ? { backgroundColor: "var(--brand-color)" } : undefined
                  }
                  className={({ isActive }) =>
                    `flex h-11 items-center gap-5 px-4 rounded-xl  ${isActive ? "text-white dark:text-black" : "hover:bg-amber-500 hover:text-black  dark:text-gray-400 text-gray-500 "}`
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
                  "flex  gap-3  items-center w-full text-lg rounded-xl hover:bg-amber-500 h-12 px-4"
                }
                icon={<LuMoon />}
              />
            ) : (
              <Button
                name={"Light Mode"}
                action={toggleDarkMode}
                style={
                  "flex  gap-3  items-center w-full  text-gray-400 text-lg rounded-xl hover:bg-amber-500 hover:text-black  h-12 px-4"
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
