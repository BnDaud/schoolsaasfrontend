import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidenav() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white_bg dark:bg-black_bg h-screen">
      <div className="flex flex-col h-full">
        {" "}
        <div className="h-16 bg-red-400"> Logo</div>
        <div className="flex-1 bg-green "> List</div>
        <div className="bg-amber-600 h-24"> footer</div>
      </div>
    </div>
  );
}
