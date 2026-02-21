import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGhost, FaArrowLeft, FaHome } from "react-icons/fa";
import { AppName } from "../../utils/constant";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Check if there is a history stack to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback if they opened the link in a new tab
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white_bg dark:bg-black_bg transition-colors duration-500">
      {/* Hero Section - Following your About page Section 1 styles */}
      <div className="pt-24 pb-12 px-[5%] lg:px-[10%] flex flex-col justify-center items-center space-y-5 bg-linear-to-b from-green/30 to-green-10 dark:bg-linear-to-br dark:from-deep_green dark:to-deep_orange">
        <div className="bg-white dark:bg-black_card p-6 rounded-3xl shadow-xl mb-4 border border-gray-100 dark:border-gray-800">
          <FaGhost className="text-5xl lg:text-6xl text-green animate-bounce" />
        </div>

        <h1 className="text-4xl lg:text-6xl lg:w-8/9 md:w-5/7 text-center font-semibold dark:text-white text-black">
          404 <span className="text-green">Lost </span>
          <span className="bg-linear-to-r from-green to-amber-300 bg-clip-text text-transparent">
            In Space
          </span>
        </h1>

        <p className="lg:w-2/3 md:w-5/7 text-center text-xl dark:text-white/50 text-gray-700">
          We looked everywhere, but we couldn't find the page you're looking
          for. It might have been moved or deleted from {AppName}.
        </p>
      </div>

      {/* Action Cards - Following your Section 3 "Our Values" styles */}
      <div className="px-[5%] lg:px-[10%] py-16 flex flex-wrap gap-8 justify-center items-center bg-white_bg dark:bg-black_bg">
        {/* Go Back Card */}
        <div
          onClick={handleGoBack}
          className="flex flex-col items-center justify-center md:size-72 w-full h-64 px-6 rounded-2xl dark:bg-black_card bg-white outline-1 dark:outline-gray-800 outline-gray-200 space-y-5 shadow-lg hover:-translate-y-2 transition-all ease-in-out duration-700 hover:shadow-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-center rounded-2xl bg-green/20 size-16 group-hover:bg-green/30 transition-colors">
            <FaArrowLeft className="text-2xl text-green" />
          </div>
          <p className="font-bold text-xl dark:text-white text-black">
            Go Back
          </p>
          <p className="dark:text-gray-300 text-gray-700 text-center">
            Return to the previous page you were on.
          </p>
        </div>

        {/* Home Card */}
        <div
          onClick={() => navigate("/")}
          className="flex flex-col items-center justify-center md:size-72 w-full h-64 px-6 rounded-2xl dark:bg-black_card bg-white outline-1 dark:outline-gray-800 outline-gray-200 space-y-5 shadow-lg hover:-translate-y-2 transition-all ease-in-out duration-700 hover:shadow-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-center rounded-2xl bg-green/20 size-16 group-hover:bg-green/30 transition-colors">
            <FaHome className="text-2xl text-green" />
          </div>
          <p className="font-bold text-xl dark:text-white text-black">
            Main Home
          </p>
          <p className="dark:text-gray-300 text-gray-700 text-center">
            Head back to the {AppName} landing page.
          </p>
        </div>
      </div>

      {/* Subtle Footer branding */}
      <div className="pb-10 text-center">
        <p className="dark:text-white/20 text-gray-400 text-xs tracking-widest uppercase">
          {AppName} Navigation System
        </p>
      </div>
    </div>
  );
}
