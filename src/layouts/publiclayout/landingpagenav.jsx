import React from "react";
import { Outlet } from "react-router-dom";
import NavbarHomePage from "../../component/navigations/navbar";

export default function LandingPagenav() {
  return (
    <>
      <NavbarHomePage />{" "}
      <main>
        {" "}
        <Outlet />
      </main>
    </>
  );
}
