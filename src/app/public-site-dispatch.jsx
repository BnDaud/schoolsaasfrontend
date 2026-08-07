import React, { useContext } from "react";
import { tenantContext } from "./tenant-provider";
import LandingPagenav from "../layouts/publiclayout/landingpagenav";
import SchoolPublicLayout from "../layouts/schoolpublic/schoolpublicnav";
import Home from "../pages/landingpages/home";
import SchoolHome from "../pages/schoolpages/publicpages/schoolhome";
import Contact from "../pages/landingpages/contact";
import SchoolContact from "../pages/schoolpages/publicpages/schoolcontact";

// The paths shared between the public MatLearn site and a school tenant's
// public site ("/" and "/contact") render different layout AND different
// page content depending on tenantType — this is the "Route Tree for that
// tenantType" switch point from MATLEARN_ROADMAP.md §1. Paths with no school
// equivalent yet (/features, /about, /pricing, /self-study — later roadmap
// items) still render the MatLearn version even under a school tenant.
export function PublicLayoutDispatch() {
  const { tenantType } = useContext(tenantContext);
  return tenantType === "school" ? <SchoolPublicLayout /> : <LandingPagenav />;
}

export function HomeDispatch() {
  const { tenantType } = useContext(tenantContext);
  return tenantType === "school" ? <SchoolHome /> : <Home />;
}

export function ContactDispatch() {
  const { tenantType } = useContext(tenantContext);
  return tenantType === "school" ? <SchoolContact /> : <Contact />;
}
