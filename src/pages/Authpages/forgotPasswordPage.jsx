import React, { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineMail, MdOutlineWbSunny } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { globalContext } from "../../context/globalcontext";
import useDarkMode from "../../hooks/darkmode";
import Button from "../../component/ui/button";
import Input from "../../component/ui/input";
import { SchoolLogo } from "../../utils/constant";
import { Link, useNavigate } from "react-router-dom";

// One component, mounted per surface with different back/login targets
// (school: /auth/*, public MatLearn: /*) — same shell, per
// MATLEARN_ROADMAP.md §5 "don't fork the shell".
// BACKEND: POST /api/auth/forgot-password { email } -> always 202, regardless
// of whether the email exists, so this never leaks account existence.
export default function ForgotPasswordPage({ backHref = "/", loginHref = "/auth/login" }) {
  const { darkmode } = useContext(globalContext);
  const [toggleDarkMode] = useDarkMode();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-[5%] dark:bg-black min-h-screen w-full transition-all duration-700">
      <div className="flex items-center justify-between w-full min-h-5 mb-10">
        <p
          className="flex gap-3 min-h-3 items-center dark:text-gray-400 text-gray-700 cursor-pointer"
          onClick={() => navigate(backHref)}
        >
          <FaArrowLeft />
          <p> Back</p>
        </p>
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

      <div className="flex w-full justify-center">
        <div className="flex flex-col items-center space-y-3 md:w-2/3 w-full">
          {SchoolLogo("size-30")}
          <p className="text-black dark:text-white font-bold text-2xl">
            Reset Password
          </p>
          <p className="text-center text-gray-700 dark:text-gray-400">
            Enter the email on your account and we'll send a reset link.
          </p>

          {submitted ? (
            <p className="mt-5 text-center font-semibold text-green">
              If an account exists for {email}, a reset link is on its way.
            </p>
          ) : (
            <form className="w-full space-y-8 mt-5" onSubmit={handleSubmit}>
              <Input
                name={"email"}
                label={"Email Address"}
                required={true}
                placeholder={"you@example.com"}
                width={"w-full"}
                type={"email"}
                value={email}
                onChange={setEmail}
                icon={<MdOutlineMail className="text-lg" />}
              />
              <Button
                name={"Send Reset Link"}
                style={
                  "flex items-center justify-center text-white dark:text-black font-bold text-lg bg-green h-10 w-full rounded-xl hover:scale-x-103 transition duration-500 "
                }
                type={"submit"}
              />
            </form>
          )}

          <p className="mt-3 dark:text-gray-400 text-gray-700">
            Remembered it?{" "}
            <Link to={loginHref} className="text-green font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
