import React from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../../component/navigations/sidenav";

export default function SchoolDashboard() {
  return (
    <div className="flex flex-row">
      <div className="xl:w-1/5">
        {" "}
        <Sidenav />
      </div>

      <Outlet />
    </div>
  );
}
