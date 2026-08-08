import React, { useContext, useState } from "react";
import { FaArrowLeft, FaRegUser } from "react-icons/fa6";
import { MdOutlineMail, MdOutlineWbSunny } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { globalContext } from "../../context/globalcontext";
import useDarkMode from "../../hooks/darkmode";
import Button from "../../component/ui/button";
import { AppName, SchoolLogo } from "../../utils/constant";
import Input from "../../component/ui/input";
import { GiPadlockOpen } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

// Independent-learner signup for the public MatLearn platform. No backend yet
// (MATLEARN_ROADMAP.md §0 assumption 5) — registering just signs the learner
// in for this session, nothing is persisted, then routes into the
// academic-profile onboarding flow (§4.1 /onboarding/academic-profile).
export default function LearnerRegisterPage() {
  const { darkmode, setRole, setName } = useContext(globalContext);
  const [toggleDarkMode] = useDarkMode();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    // BACKEND: POST /api/auth/register { fullName, email, password } -> { token }
    setRole("Learner");
    setName(fullName);
    navigate("/onboarding/academic-profile");
  };

  return (
    <div className="p-[5%] dark:bg-black min-h-screen w-full transition-all duration-700">
      <div className="flex items-center justify-between w-full min-h-5 mb-10">
        <p
          className="flex gap-3 min-h-3 items-center dark:text-gray-400 text-gray-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft />
          <p> Back to Home</p>
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
            Create Your Account
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            Join {AppName} to practice WAEC, JAMB & NECO
          </p>
          <form className="w-full space-y-8 mt-5" onSubmit={handleSubmit}>
            <Input
              name={"fullname"}
              label={"Full Name"}
              required={true}
              placeholder={"Ben Abdullah"}
              width={"w-full"}
              type={"text"}
              value={fullName}
              onChange={setFullName}
              icon={<FaRegUser className="text-lg" />}
            />
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
              name={"confirmpassword"}
              label={"Confirm Password"}
              required={true}
              placeholder={"Enter Your Password"}
              width={"w-full"}
              type={"password"}
              value={confirmPassword}
              onChange={setConfirmPassword}
              icon={<GiPadlockOpen className="text-lg" />}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              name={"Create Account"}
              style={
                "flex items-center justify-center text-white dark:text-black font-bold text-lg bg-green h-10 w-full rounded-xl hover:scale-x-103 transition duration-500 "
              }
              type={"submit"}
            />
          </form>
          <p className="mt-3 dark:text-gray-400 text-gray-700">
            Already have an account?{" "}
            <Link to={"/login"} className="text-green font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
