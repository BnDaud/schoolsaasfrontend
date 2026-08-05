import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidenav from "../../component/navigations/sidenav";

import Footernav from "../../component/navigations/footernav";

import StatusBanner from "../../component/common/statusbanner";

export default function SchoolDashboard() {
  const [shownav, setShownav] = useState(false);
  const location = useLocation();
  const isAssessmentSession = /^\/app\/(exam|practice)\/[^/]+/.test(
    location.pathname,
  );
  const open = () => {
    setShownav(true);
  };
  return (
    <div className="flex flex-row ">
      {" "}
      {!isAssessmentSession && (
        <div
          className={`fixed top-0 left-0 z-50 w-65  xl:w-1/6 ${shownav ? "translate-x-0 " : "-translate-x-full"} transition-transform duration-500 xl:translate-x-0 xl:h-screen h-[90vh]`}
        >
          {" "}
          <Sidenav />
        </div>
      )}
      <main className={`w-full ${isAssessmentSession ? "" : "xl:ml-[16.67%]"}`}>
        {!isAssessmentSession && (
          <div className="w-full  ">
            {" "}
            <StatusBanner open={open} />{" "}
          </div>
        )}{" "}
        <div
          className={`${isAssessmentSession ? "" : "pt-[10vh] pb-[10vh] xl:pb-0"} dark:bg-black bg-white_bg transition-all duration-700`}
          onClick={() => setShownav(false)}
        >
          {" "}
          <Outlet />
        </div>
      </main>
      {!isAssessmentSession && (
        <div
          className="xl:hidden fixed left-0 bottom-0 h-[10vh]  z-100 w-full"
          onClick={() => setShownav(false)}
        >
          {" "}
          <Footernav />
        </div>
      )}
    </div>
  );
}
