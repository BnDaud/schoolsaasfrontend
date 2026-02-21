import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../../component/navigations/sidenav";
import { PiList } from "react-icons/pi";
import Footernav from "../../component/navigations/footernav";

export default function SchoolDashboard() {
  const [shownav, setShownav] = useState(false);

  return (
    <div className="flex flex-row">
      <div
        className={`fixed top-0 left-0 z-50 w-65 xl:static xl:w-1/5 ${shownav ? "translate-x-0 " : "-translate-x-full"} transition-transform duration-500 xl:translate-x-0 xl:h-screen h-[90vh]`}
      >
        {" "}
        <Sidenav />
      </div>

      <main className="relative w-full">
        <div
          className="xl:hidden absolute flex items-center cursor-pointer justify-center size-10"
          onClick={() => setShownav(true)}
        >
          {" "}
          <PiList className="text-3xl" />
        </div>

        <div onClick={() => setShownav(false)}>
          {" "}
          <Outlet />
        </div>
      </main>
      <div className="xl:hidden fixed left-0 bottom-0 h-[10vh] z-100 w-full">
        {" "}
        <Footernav />
      </div>
    </div>
  );
}
