import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Input({
  label,
  required = false,
  placeholder,
  width,
  type = "text",
  onChange,
  icon,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={`flex flex-col ${width} dark:text-white`}>
      <label className="font-bold mb-2">
        {label} {required && <span>*</span>}
      </label>

      <div
        className="flex gap-2 items-center px-4 py-1 text-sm font-semibold rounded-xl h-10 
  bg-white_bg dark:bg-black
  ring-1 ring-gray-200 dark:ring-gray-800
  focus-within:ring-2 focus-within:ring-green
  transition-all duration-150"
      >
        {icon && <span>{icon}</span>}

        <input
          className="focus:outline-none w-full bg-transparent dark:text-white text-black"
          placeholder={placeholder}
          type={isPassword && showPassword ? "text" : type}
          onChange={(e) => onChange(e.target.value)}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-lg cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
}
