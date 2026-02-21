import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaArrowLeft, FaHome } from "react-icons/fa";
import { AppName } from "../../utils/constant";

export default function NotAllowed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white_bg dark:bg-black_bg transition-colors duration-500">
      {/* Hero Section - Mirroring your About page Section 1 */}
      <div className="pt-24 pb-12 px-[5%] lg:px-[10%] flex flex-col justify-center items-center space-y-5 bg-linear-to-b from-green/30 to-green-10 dark:bg-linear-to-br dark:from-deep_green dark:to-deep_orange">
        <div className="bg-white dark:bg-black_card p-6 rounded-3xl shadow-xl mb-4 border border-gray-100 dark:border-gray-800">
          <FaLock className="text-5xl lg:text-6xl text-green animate-bounce" />
        </div>

        <h1 className="text-4xl lg:text-6xl lg:w-8/9 md:w-5/7 text-center font-semibold dark:text-white text-black">
          Access <span className="text-green">Restricted</span>
        </h1>

        <p className="lg:w-2/3 md:w-5/7 text-center text-xl dark:text-white/50 text-gray-700">
          You don't have the permissions required to view this section of{" "}
          {AppName}. If you believe this is a mistake, please contact your
          administrator.
        </p>
      </div>

      {/* Action Cards - Mirroring your Section 3 "Our Values" Cards */}
      <div className="px-[5%] lg:px-[10%] py-16 flex flex-wrap gap-8 justify-center items-center bg-white_bg dark:bg-black_bg">
        {/* Go Back Action */}
        <div
          onClick={() => navigate(-1)}
          className="flex flex-col items-center justify-center md:size-72 w-full h-64 px-6 rounded-2xl dark:bg-black_card bg-white outline-1 dark:outline-gray-800 outline-gray-200 space-y-5 shadow-lg hover:-translate-y-2 transition-all ease-in-out duration-700 hover:shadow-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-center rounded-2xl bg-green/20 size-16 group-hover:scale-110 transition-transform">
            <FaArrowLeft className="text-2xl text-green" />
          </div>
          <p className="font-bold text-xl dark:text-white text-black">
            Return Back
          </p>
          <p className="dark:text-gray-300 text-gray-700 text-center">
            Go back to where you were before.
          </p>
        </div>

        {/* Dashboard/Home Action */}
        <div
          onClick={() => navigate("/")}
          className="flex flex-col items-center justify-center md:size-72 w-full h-64 px-6 rounded-2xl dark:bg-black_card bg-white outline-1 dark:outline-gray-800 outline-gray-200 space-y-5 shadow-lg hover:-translate-y-2 transition-all ease-in-out duration-700 hover:shadow-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-center rounded-2xl bg-green/20 size-16 group-hover:scale-110 transition-transform">
            <FaHome className="text-2xl text-green" />
          </div>
          <p className="font-bold text-xl dark:text-white text-black">
            Main Home
          </p>
          <p className="dark:text-gray-300 text-gray-700 text-center">
            Return to the {AppName} landing page.
          </p>
        </div>
      </div>

      {/* Simple Footer style note */}
      <div className="pb-10 flex flex-col items-center">
        <div className="h-[1px] w-1/4 bg-gray-200 dark:bg-gray-800 mb-6"></div>
        <p className="dark:text-white/20 text-gray-400 text-sm">
          Error 403: Forbidden Access
        </p>
      </div>
    </div>
  );
}
