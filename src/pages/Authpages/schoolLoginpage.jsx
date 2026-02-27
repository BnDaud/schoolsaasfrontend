import React from "react";
import { FaArrowLeft, FaRegUser } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { useContext } from "react";
import { globalContext } from "../../context/globalcontext";
import useDarkMode from "../../hooks/darkmode";
import Button from "../../component/ui/button";
import { SchoolLogo } from "../../utils/constant";
import Input from "../../component/ui/input";
import { GiPadlockOpen } from "react-icons/gi";
import { CiUser } from "react-icons/ci";

export default function SchoolLoginPage() {
  const { darkmode } = useContext(globalContext);
  const [toggleDarkMode] = useDarkMode();
  return (
    <div className="p-[5%] dark:bg-black min-h-screen w-full">
      <div className="flex items-center justify-between w-full min-h-5 mb-10">
        {" "}
        <p className="flex gap-3 min-h-3 items-center dark:text-gray-400 text-gray-700">
          <FaArrowLeft />
          <p> Back to Home</p>
        </p>{" "}
        {darkmode ? (
          <Button
            icon={<BsMoon className="text-xl" />}
            style={"p-2 hover:bg-amber-500  rounded-lg transition duration-500"}
            action={toggleDarkMode}
          />
        ) : (
          <Button
            icon={<MdOutlineWbSunny className="text-xl" />}
            style={
              "p-2 hover:bg-amber-500  rounded-lg transition duration-500 text-gray-400"
            }
            action={toggleDarkMode}
          />
        )}
      </div>

      <div className="flex w-full  justify-center">
        {" "}
        <div className="flex flex-col items-center space-y-3 md:w-2/3 w-full">
          {SchoolLogo("size-30")}
          <p className="text-black dark:text-white font-bold text-2xl">
            Welcome Back
          </p>{" "}
          <p className="text-gray-700 dark:text-gray-400">
            {" "}
            Sign in to your portal
          </p>
          <Input
            label={"Email Address"}
            required={true}
            placeholder={"Reg/No or Email"}
            width={"w-full"}
            type={"email"}
            icon={<FaRegUser className="text-lg" />}
          />
          <Input
            label={"Password"}
            required={true}
            placeholder={"Enter Your Password"}
            width={"w-full"}
            type={"password"}
            icon={<GiPadlockOpen className="text-lg" />}
          />
        </div>
      </div>
    </div>
  );
}
