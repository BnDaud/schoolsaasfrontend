import { Route, Routes } from "react-router-dom";
import SuperAdminDashboard from "../../pages/schoolpages/superadminpages/superadmindashboard";
import SuperAdminTenants from "../../pages/schoolpages/superadminpages/superadmintenants";
import SuperAdminSettings from "../../pages/schoolpages/superadminpages/superadminsettings";
import NotAllowed from "../../pages/Restricted/restricted";

export default function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="super-admin-dashboard" element={<SuperAdminDashboard />} />
      <Route path="super-admin-tenants" element={<SuperAdminTenants />} />
      <Route path="super-admin-settings" element={<SuperAdminSettings />} />
      <Route path="*" element={<NotAllowed />} />
    </Routes>
  );
}
