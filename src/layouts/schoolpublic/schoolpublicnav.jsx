import React from "react";
import { Outlet } from "react-router-dom";
import SchoolNavbar from "../../component/navigations/schoolnavbar";
import SchoolFooter from "../../component/common/schoolfooter";

// Distinct layout from MatLearnPublicLayout (LandingPagenav) — one per
// MATLEARN_ROADMAP.md §5, not a fork of the same shell, since a school's
// public site is a genuinely different product surface from MatLearn's own.
export default function SchoolPublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SchoolNavbar />
      <main className="flex-1 pt-15">
        <Outlet />
      </main>
      <SchoolFooter />
    </div>
  );
}
