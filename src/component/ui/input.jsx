import React from "react";

export default function Input({
  label,
  required = false,
  placeholder,
  width,
  type,
  onChange,
}) {
  return (
    <div className={`flex flex-col ${width} dark:text-white `}>
      {" "}
      <label className="font-bold mb-2">
        {" "}
        {label} {required ? <span>*</span> : ""}
      </label>
      <input
        className={`px-4 py-1 text-sm text-black dark:text-white font-semibold rounded-xl h-10 border dark:border-gray-800 border-gray-200 bg-white_bg dark:bg-black  focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 
focus:ring-offset-white_bg 
dark:focus:ring-offset-black `}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
