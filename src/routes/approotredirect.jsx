import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { globalContext } from "../context/globalcontext";
import NotAllowed from "../pages/Restricted/restricted";

const DASHBOARD_PATH_BY_ROLE = {
  Student: "student-dashboard",
  Tutor: "tutor-dashboard",
  Admin: "admin-dashboard",
};

// Handles the bare "/app/" case (right after login, or a bookmark/typed URL)
// — a real index route at the Outlet-nesting level, where index routes
// resolve correctly (unlike a `path="*"` splat nested the same way, which
// does not match a zero-length remainder here — see docs/MATLEARN_ROADMAP.md
// PROGRESS_22 for how that was diagnosed).
export default function AppRootRedirect() {
  const { role } = useContext(globalContext);
  const dashboardPath = DASHBOARD_PATH_BY_ROLE[role];

  if (!dashboardPath) return <NotAllowed />;
  return <Navigate to={dashboardPath} replace />;
}
