import React, { useContext, useState } from "react";
import { FaArrowLeft, FaRegUser } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { globalContext } from "../../context/globalcontext";
import { tenantContext } from "../../app/tenant-provider";
import useDarkMode from "../../hooks/darkmode";
import Button from "../../component/ui/button";
import { SchoolLogo } from "../../utils/constant";
import Input from "../../component/ui/input";
import { GiPadlockOpen } from "react-icons/gi";
import { findUserByEmail } from "../../mocks/users";
import { Link, useNavigate } from "react-router-dom";

const SCHOOL_ROLES = ["Admin", "Tutor", "Student"];

export default function SchoolLoginPage() {
  const { darkmode, setRole, setName, setSchoolName, setClassId } = useContext(globalContext);
  const { tenantType, tenantId, tenant } = useContext(tenantContext);
  const [toggleDarkMode] = useDarkMode();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tenantType !== "school" || !tenantId) {
      setError("No school selected for this address. Open this page from a school's own login link.");
      return;
    }

    // BACKEND: POST /api/auth/login { email, password } -> { token }; token's
    // tenantId must match the resolved host's tenant (MATLEARN_ROADMAP.md §14).
    // Password is unchecked here — no backend yet, any non-empty value passes.
    const user = findUserByEmail(email);
    if (!user || user.tenantId !== tenantId || !SCHOOL_ROLES.includes(user.role)) {
      setError("Invalid email or password for this school.");
      return;
    }

    setRole(user.role);
    setName(user.name);
    setSchoolName(tenant?.name ?? "");
    setClassId(user.classId ?? null);
    navigate("/app/");
  };

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
            Welcome Back
          </p>{" "}
          <p className="text-gray-700 dark:text-gray-400">
            {" "}
            Sign in to your portal
          </p>
          <form className="w-full space-y-8 mt-5 " onSubmit={handleSubmit}>
            {" "}
            <Input
              name={"email"}
              label={"Email Address"}
              required={true}
              placeholder={"Reg/No or Email"}
              width={"w-full"}
              type={"email"}
              value={email}
              onChange={setEmail}
              icon={<FaRegUser className="text-lg" />}
            />
            <div className="relative w-full">
              <Link
                to={"/auth/forgot-password"}
                className="absolute text-green top-0 right-1"
              >
                {" "}
                Forgot Password ?
              </Link>
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
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              name={"Sign In"}
              style={
                "flex items-center justify-center text-white dark:text-black font-bold text-lg bg-green h-10 w-full rounded-xl hover:scale-x-103 transition duration-500 "
              }
              type={"submit"}
            />
          </form>
          <p className="mt-3 dark:text-gray-400 text-gray-700 ">
            Don't have an account ? {""}
            <Link to={"/auth/register"} className="text-green font-bold">
              {" "}
              {"  "}Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
