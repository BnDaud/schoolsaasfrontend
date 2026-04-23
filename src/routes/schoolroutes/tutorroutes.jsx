import { Route, Routes } from "react-router-dom";

import Classes from "../../pages/schoolpages/tutorpages/classes";
import Dashboard from "../../pages/schoolpages/tutorpages/dashboard";
import ManageExam from "../../pages/schoolpages/tutorpages/manageexam";
import Students from "../../pages/schoolpages/tutorpages/students";
import Analytics from "../../pages/schoolpages/tutorpages/analytics";
import QuestionBank from "../../pages/schoolpages/tutorpages/questionbank";
import NotAllowed from "../../pages/Restricted/restricted";
import Performance from "../../pages/schoolpages/tutorpages/performance";

export default function TutorRoutes() {
  return (
    <Routes>
      <Route path="tutor-dashboard" element={<Dashboard />} />
      <Route path="manage-exam" element={<ManageExam />} />
      <Route path="question-bank" element={<QuestionBank />} />
      <Route path="students" element={<Students />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="performance" element={<Performance />} />
      <Route path="classes" element={<Classes />} />
      <Route path="*" element={<NotAllowed />} />
    </Routes>
  );
}
