import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/schoolpages/studentpages/studentdashboard";
import Result from "../../pages/schoolpages/studentpages/studentresult";
import Progress from "../../pages/schoolpages/studentpages/studentprogress";
import Practice from "../../pages/schoolpages/studentpages/studentpractice";
import Exam from "../../pages/schoolpages/studentpages/studentexams";
import NotAllowed from "../../pages/Restricted/restricted";

export default function StudentRoutes() {
  return (
    <Routes>
      {" "}
      <Route path="student-dashboard" element={<Dashboard />} />{" "}
      <Route path="exam" element={<Exam />} />
      <Route path="practice" element={<Practice />} />
      <Route path="results" element={<Result />} />
      <Route path="progress" element={<Progress />} />
      <Route path="*" element={<NotAllowed />} />
    </Routes>
  );
}
