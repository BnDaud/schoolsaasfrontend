import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRegUser } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { GiPadlockOpen } from "react-icons/gi";
import { globalContext } from "../../context/globalcontext";
import { findUserByEmail } from "../../mocks/users";
import { Logo } from "../../utils/constant";
import Input from "../../component/ui/input";
import Button from "../../component/ui/button";
import useDarkMode from "../../hooks/darkmode";

// Platform-operator login for /matlearn/ (MATLEARN_ROADMAP.md §14) — its own
// standalone page (not the shared <Auth> layout, which shows a school logo
// and "Welcome to Mat Learn" copy meant for a specific school's own
// staff/students) — but same MatLearn brand (green, real logo) and same
// light/dark support as every other page, not a separate look.
export default function SuperAdminLoginPage() {
  const navigate = useNavigate();
  const { darkmode, setRole, setName, setUserId } = useContext(globalContext);
  const [toggleDarkMode] = useDarkMode();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // BACKEND: POST /api/platform/auth/login { email, password } -> { token }.
    // Token's tenantId must be "platform" — never a school tenantId, never
    // usable on any school tenant's own session (§14 cross-surface rejection).
    // Password is unchecked here — no backend yet, any non-empty value passes
    // (same convention as every other login page in this app).
    const user = findUserByEmail(email);
    if (!user || user.role !== "SuperAdmin" || user.tenantId !== "platform") {
      setError("Invalid email or password.");
      return;
    }

    setRole(user.role);
    setName(user.name);
    setUserId(user.id);
    navigate("/matlearn/super-admin-dashboard");
  };

  return (
    <div className="p-[5%] dark:bg-black bg-white_bg min-h-screen w-full transition-all duration-700">
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
          {Logo}
          <p className="text-black dark:text-white font-bold text-2xl">
            Platform Sign In
          </p>
          <p className="text-gray-700 dark:text-gray-400 text-center">
            Operator access for MatLearn staff. Not for school staff or
            students — use your school's own sign-in link for that.
          </p>
          <form className="w-full space-y-8 mt-5" onSubmit={handleSubmit}>
            <Input
              name={"email"}
              label={"Email Address"}
              required={true}
              placeholder={"you@matlearn.com"}
              width={"w-full"}
              type={"email"}
              value={email}
              onChange={setEmail}
              icon={<FaRegUser className="text-lg" />}
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
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              name={"Sign In"}
              style={
                "flex items-center justify-center text-white dark:text-black font-bold text-lg bg-green h-10 w-full rounded-xl hover:scale-x-103 transition duration-500 "
              }
              type={"submit"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
