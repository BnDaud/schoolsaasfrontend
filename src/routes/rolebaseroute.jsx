import React, { useContext } from "react";
import { globalContext } from "../context/globalcontext";
import AdminRoutes from "./schoolroutes/adminroutes";
import StudentRoutes from "./schoolroutes/studentroutes";
import TutorRoutes from "./schoolroutes/tutorroutes";

import ProtectedRoute from "./schoolroutes/protectedRoutes";
import NotAllowed from "../pages/Restricted/restricted";

export default function RoleBaseRoute() {
  const { role } = useContext(globalContext);

  if (role === "Student")
    return (
      <ProtectedRoute allowedRole="Student">
        <StudentRoutes />
      </ProtectedRoute>
    );
  if (role === "Tutor")
    return (
      <ProtectedRoute allowedRole="Tutor">
        <TutorRoutes />
      </ProtectedRoute>
    );
  if (role === "Admin")
    return (
      <ProtectedRoute allowedRole="Admin">
        <AdminRoutes />
      </ProtectedRoute>
    );
  return <NotAllowed />;
}
