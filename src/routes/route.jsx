import React from "react";
import { Outlet, Route } from "react-router-dom";

import NotFound from "../pages/landingpages/nofFound";
import Home from "../pages/landingpages/home";
import Features from "../pages/landingpages/features";
import Contact from "../pages/landingpages/contact";
import About from "../pages/landingpages/about";
import Pricing from "../pages/landingpages/pricing";
import SelfStudy from "../pages/landingpages/selfstudy";
import LandingPagenav from "../layouts/publiclayout/landingpagenav";
import Sidenav from "../component/navigations/sidenav";
import SchoolDashboard from "../layouts/dashboardlayout/Schooldashboard";
import Dashboard from "../pages/schoolpages/studentpages/dashboard";
import Exams from "../pages/schoolpages/studentpages/exams";
import Progress from "../pages/schoolpages/studentpages/progress";
import Practice from "../pages/schoolpages/studentpages/practice";
import Results from "../pages/schoolpages/studentpages/result";
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
    {/* Not Found*/}
    <Route path="*" element={<NotFound />} />
    <Route element={<SchoolDashboard />}>
      {" "}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/exam" element={<Exams />} />
      <Route path="/practice" element={<Practice />} />{" "}
      <Route path="/progress" element={<Progress />} />{" "}
      <Route path="/results" element={<Results />} />{" "}
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Route>
  </>
);
