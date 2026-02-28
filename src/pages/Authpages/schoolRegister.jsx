import React, { useState } from "react";
import { FaArrowLeft, FaRegUser } from "react-icons/fa6";
import { MdOutlineWbSunny, MdOutlineMail } from "react-icons/md";

import { BsMoon } from "react-icons/bs";
import { useContext } from "react";
import { globalContext } from "../../context/globalcontext";
import useDarkMode from "../../hooks/darkmode";
import Button from "../../component/ui/button";
import { SchoolLogo } from "../../utils/constant";
import Input from "../../component/ui/input";
import { GiPadlockOpen } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

export default function SchoolLoginPage() {
  const { darkmode } = useContext(globalContext);
  const [toggleDarkMode] = useDarkMode();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="p-[5%] dark:bg-black min-h-screen w-full transition-all duration-700">
      <div className="flex items-center justify-between w-full min-h-5 mb-10">
        {" "}
        <p
          className="flex gap-3 min-h-3 items-center dark:text-gray-400 text-gray-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
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
        <div className="flex flex-col  items-center space-y-3 md:w-2/3 w-full">
          {SchoolLogo("size-30")}
          <p className="text-black dark:text-white font-bold text-2xl">
            Complete Your Profile
          </p>{" "}
          <p className="text-gray-700 dark:text-gray-400">
            Enter your details to create your account
          </p>
          <form className="w-full space-y-8 mt-5 " onSubmit={() => {}}>
            {" "}
            <Input
              name={"firstname"}
              label={"First name"}
              required={true}
              placeholder={"Ben"}
              width={"w-full"}
              type={"text"}
              icon={<FaRegUser className="text-lg" />}
            />
            <Input
              name={"lastname"}
              label={"Last Name"}
              required={true}
              placeholder={"Abdullah"}
              width={"w-full"}
              type={"text"}
              icon={<FaRegUser className="text-lg" />}
            />
            <Input
              name={"email"}
              label={"Email Address"}
              required={true}
              placeholder={"Reg/No or Email"}
              width={"w-full"}
              type={"email"}
              icon={<MdOutlineMail className="text-lg" />}
            />{" "}
            <div className="flex flex-col gap-2">
              {" "}
              <label className="font-bold dark:text-white  ">
                Register As *
              </label>
              <select
                name="role"
                className="px-4 py-1  text-sm w-full text-black dark:text-white font-semibold rounded-xl h-10 border border-gray-200 dark:border-gray-800 bg-white_bg dark:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 
focus:ring-offset-white_bg 
dark:focus:ring-offset-black"
              >
                {" "}
                <option>Student</option> <option>Tutor</option>{" "}
                <option>Administrator</option>
              </select>
            </div>
            <Input
              name={"password"}
              label={"Password"}
              required={true}
              placeholder={"Enter Your Password"}
              width={"w-full"}
              type={"password"}
              value={password}
              onChange={setPassword}
              icon={<GiPadlockOpen className="text-lg" />}
            />
            <Input
              label={"Confirm Password"}
              required={true}
              placeholder={"Enter Your Password"}
              width={"w-full"}
              type={"password"}
              value={confirmPassword}
              onChange={setConfirmPassword}
              icon={<GiPadlockOpen className="text-lg" />}
            />
            <Button
              name={"Create Account"}
              style={
                "flex items-center justify-center text-white dark:text-black font-bold text-lg bg-green h-10 w-full rounded-xl hover:scale-x-103 transition duration-500 "
              }
              type={"submit"}
            />
          </form>
          <p className="mt-3 dark:text-gray-400 text-gray-700 ">
            Already have an account ? {""}
            <Link to={"/auth/login"} className="text-green font-bold">
              {" "}
              {"  "}Sign In
            </Link>
          </p>
          <p className="mt-3 dark:text-gray-400 text-gray-700 text-xs text-center">
            By creating an account, you agree to our{" "}
            <Link to={"/auth/login"} className="text-green font-bold">
              Terms of Services{" "}
            </Link>
            and{" "}
            <Link to={"/auth/login"} className="text-green font-bold">
              Privacy Policy
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
