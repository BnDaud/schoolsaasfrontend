import React from "react";
import { Outlet } from "react-router-dom";
import NavbarHomePage from "../../component/navigations/navbar";
import Footer from "../../component/common/footer";

export default function LandingPagenav() {
  return (
    <div className=" flex flex-col min-h-screen">
      <NavbarHomePage />
      <main className="flex-1">
        {" "}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
