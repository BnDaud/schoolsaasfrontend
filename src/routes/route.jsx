import React from "react";
import { Outlet, Route } from "react-router-dom";

import NotFound from "../pages/nofFound";
import Home from "../pages/home";
import Features from "../pages/features";
import Contact from "../pages/contact";
import About from "../pages/about";
import Pricing from "../pages/pricing";
import SelfStudy from "../pages/selfstudy";
import LandingPagenav from "../layouts/publiclayout/landingpagenav";

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
  </>
);
