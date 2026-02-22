import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../../component/navigations/sidenav";

import Footernav from "../../component/navigations/footernav";

import StatusBanner from "../../component/common/statusbanner";

export default function SchoolDashboard() {
  const [shownav, setShownav] = useState(false);
  const open = () => {
    setShownav(true);
  };
  return (
    <div className="flex flex-row ">
      {" "}
      <div
        className={`fixed top-0 left-0 z-50 w-65  xl:w-1/6 ${shownav ? "translate-x-0 " : "-translate-x-full"} transition-transform duration-500 xl:translate-x-0 xl:h-screen h-[90vh]`}
      >
        {" "}
        <Sidenav />
      </div>
      <main className=" w-full xl:ml-[16.67%]">
        <div className="w-full  ">
          {" "}
          <StatusBanner open={open} />{" "}
        </div>{" "}
        <div
          className="pt-[10vh] dark:bg-black bg-white_bg pb-[10vh] xl:pb-0 transition-all duration-700"
          onClick={() => setShownav(false)}
        >
          {" "}
          <Outlet />
        </div>
      </main>
      <div
        className="xl:hidden fixed left-0 bottom-0 h-[10vh]  z-100 w-full"
        onClick={() => setShownav(false)}
      >
        {" "}
        <Footernav />
      </div>
    </div>
  );
}
