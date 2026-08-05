import { Route, Routes } from "react-router-dom";
import AdminClasses from "../../pages/schoolpages/adminpages/adminclasses";
import AdminDashboard from "../../pages/schoolpages/adminpages/admindashboard";
import AdminExams from "../../pages/schoolpages/adminpages/adminexams";
import AdminInsights from "../../pages/schoolpages/adminpages/admininsights";
import AdminQuestionBank from "../../pages/schoolpages/adminpages/adminquestionbank";
import AdminSettings from "../../pages/schoolpages/adminpages/adminsettings";
import AdminTutors from "../../pages/schoolpages/adminpages/admintutors";
import AdminUsers from "../../pages/schoolpages/adminpages/adminusers";
import NotAllowed from "../../pages/Restricted/restricted";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="admin-dashboard" element={<AdminDashboard />} />
      <Route path="admin-users" element={<AdminUsers />} />
      <Route path="admin-classes" element={<AdminClasses />} />
      <Route path="admin-tutors" element={<AdminTutors />} />
      <Route path="admin-exams" element={<AdminExams />} />
      <Route path="admin-question-bank" element={<AdminQuestionBank />} />
      <Route path="admin-insights" element={<AdminInsights />} />
      <Route path="admin-settings" element={<AdminSettings />} />
      <Route path="*" element={<NotAllowed />} />
    </Routes>
  );
}
