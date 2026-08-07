import React from "react";
import { Route } from "react-router-dom";

import Features from "../pages/landingpages/features";
import About from "../pages/landingpages/about";
import Pricing from "../pages/landingpages/pricing";
import SelfStudy from "../pages/landingpages/selfstudy";
import { PublicLayoutDispatch, HomeDispatch, ContactDispatch } from "../app/public-site-dispatch";

import SchoolDashboard from "../layouts/dashboardlayout/Schooldashboard";

import RoleBaseRoute from "./rolebaseroute";
import NotFound from "../pages/Restricted/notFound";
import Leaderboard from "../pages/schoolpages/commonpages/leaderboard";
import Books from "../pages/schoolpages/commonpages/books";
import Auth from "../layouts/authlayout/auth";
import SchoolLoginPage from "../pages/Authpages/schoolLoginpage";
import SchoolRegister from "../pages/Authpages/schoolRegister";
import ForgotPasswordPage from "../pages/Authpages/forgotPasswordPage";
import LearnerLoginPage from "../pages/Authpages/learnerLoginpage";
import LearnerRegisterPage from "../pages/Authpages/learnerRegisterpage";

// MatLearn platform operator (the SaaS itself, not a tenant). Lives outside /app/
// on purpose — /app/ is per-tenant (school) space; /matlearn/ is the operator space
// that creates and manages every tenant.
import SuperAdminRoutes from "./schoolroutes/superadminroutes";
import ProtectedRoute from "./schoolroutes/protectedRoutes";

export const CustomRoutes = (
  <>
    {/* Public Pages — layout and content switch by tenantType (school vs
        public MatLearn) for the paths a school tenant actually has its own
        version of; see app/public-site-dispatch.jsx */}
    <Route element={<PublicLayoutDispatch />}>
      <Route path="/" element={<HomeDispatch />} />
      <Route path="/features" element={<Features />} />
      <Route path="/self-study" element={<SelfStudy />} />
      <Route path="/about" element={<About />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="contact" element={<ContactDispatch />} />
    </Route>
    {/* School Route */}
    <Route path="/app/" element={<SchoolDashboard />}>
      <Route path="*" element={<RoleBaseRoute />} />
      <Route path="leaderboard" element={<Leaderboard />} />{" "}
      <Route path="books" element={<Books />} />
    </Route>
    {/* MatLearn (platform operator, not a tenant) */}
    <Route path="/matlearn/" element={<SchoolDashboard />}>
      <Route
        path="*"
        element={
          <ProtectedRoute allowedRole="SuperAdmin">
            <SuperAdminRoutes />
          </ProtectedRoute>
        }
      />
    </Route>
    {/* Auth Page (school tenant) */}
    <Route path="/auth/" element={<Auth />}>
      <Route path="login" element={<SchoolLoginPage />} />
      <Route path="register" element={<SchoolRegister />} />
      <Route
        path="forgot-password"
        element={<ForgotPasswordPage backHref="/auth/login" loginHref="/auth/login" />}
      />
    </Route>{" "}
    {/* Auth Pages (public MatLearn, independent learner) */}
    <Route element={<Auth />}>
      <Route path="/login" element={<LearnerLoginPage />} />
      <Route path="/register" element={<LearnerRegisterPage />} />
      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage backHref="/login" loginHref="/login" />}
      />
    </Route>
    {/* Not Found*/}
    <Route path="*" element={<NotFound />} />
  </>
);
