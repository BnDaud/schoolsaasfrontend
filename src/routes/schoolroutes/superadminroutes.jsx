import { Route, Routes } from "react-router-dom";
import SuperAdminDashboard from "../../pages/schoolpages/superadminpages/superadmindashboard";
import SuperAdminTenants from "../../pages/schoolpages/superadminpages/superadmintenants";
import SuperAdminSettings from "../../pages/schoolpages/superadminpages/superadminsettings";
import SuperAdminAuditLog from "../../pages/schoolpages/superadminpages/superadminauditlog";
import SuperAdminLearners from "../../pages/schoolpages/superadminpages/superadminlearners";
import NotAllowed from "../../pages/Restricted/restricted";

export default function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="super-admin-dashboard" element={<SuperAdminDashboard />} />
      <Route path="super-admin-tenants" element={<SuperAdminTenants />} />
      <Route path="super-admin-learners" element={<SuperAdminLearners />} />
      <Route path="super-admin-settings" element={<SuperAdminSettings />} />
      <Route path="super-admin-audit-log" element={<SuperAdminAuditLog />} />
      <Route path="*" element={<NotAllowed />} />
    </Routes>
  );
}
