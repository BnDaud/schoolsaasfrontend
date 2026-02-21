import React, { useContext } from "react";
import { Route } from "react-router-dom";

import Home from "../pages/landingpages/home";
import Features from "../pages/landingpages/features";
import Contact from "../pages/landingpages/contact";
import About from "../pages/landingpages/about";
import Pricing from "../pages/landingpages/pricing";
import SelfStudy from "../pages/landingpages/selfstudy";
import LandingPagenav from "../layouts/publiclayout/landingpagenav";

import SchoolDashboard from "../layouts/dashboardlayout/Schooldashboard";

import RoleBaseRoute from "./rolebaseroute";
import NotFound from "../pages/Restricted/notFound";
import Leaderboard from "../pages/schoolpages/commonpages/leaderboard";

export const CustomRoutes = (
  <>
    {/* Public Pages*/}
    <Route element={<LandingPagenav />}>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/self-study" element={<SelfStudy />} />
      <Route path="/about" element={<About />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="contact" element={<Contact />} />
    </Route>
    {/* School Route */}
    <Route path="/app/" element={<SchoolDashboard />}>
      <Route path="*" element={<RoleBaseRoute />} />
      <Route path="leaderboard" element={<Leaderboard />} />
    </Route>

    {/* Not Found*/}
    <Route path="*" element={<NotFound />} />
  </>
);
