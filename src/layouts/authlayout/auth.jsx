import React from "react";
import { Outlet } from "react-router-dom";
import { AppName, SchoolLogo, SchoolMotto } from "../../utils/constant";

export default function Auth() {
  return (
    <div className="flex w-full">
      <div className="md:w-1/2 w-full">
        {" "}
        <Outlet />
      </div>

      <div className="hidden fixed right-0 top-0 z-50 min-h-screen w-1/2 md:flex flex-col justify-center items-center space-y-2 bg-linear-to-b from-green/50 to-green/5 dark:bg-linear-to-br dark:from-deep_green dark:to-amber_deep">
        <div> {SchoolLogo("size-30 ")}</div>
        <p className="text-lg font-semibold dark:text-white">
          Welcome to {AppName}
        </p>

        <p className="text-base text-gray-600 dark:text-gray-300">
          {SchoolMotto}
        </p>

        <p className="text-black dark:text-white font-semibold">
          Powered by Vectored Matrix
        </p>
      </div>
    </div>
  );
}
