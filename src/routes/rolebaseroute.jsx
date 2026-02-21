import React, { useContext } from "react";
import { globalContext } from "../context/globalcontext";
import StudentRoutes from "./schoolroutes/studentroutes";
import TutorRoutes from "./schoolroutes/tutorroutes";
import { Navigate } from "react-router-dom";
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
        <TutorRoutes />;
      </ProtectedRoute>
    );
  return <NotAllowed />;
}
