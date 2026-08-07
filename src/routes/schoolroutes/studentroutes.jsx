import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/schoolpages/studentpages/studentdashboard";
import StudentSubjects from "../../pages/schoolpages/studentpages/studentsubjects";
import Result from "../../pages/schoolpages/studentpages/studentresult";
import Progress from "../../pages/schoolpages/studentpages/studentprogress";
import Practice from "../../pages/schoolpages/studentpages/studentpractice";
import Exam from "../../pages/schoolpages/studentpages/studentexams";
import NotAllowed from "../../pages/Restricted/restricted";
import ExamPage from "../../component/exam/exampage";
import PracticeQuestion from "../../component/practice/practiceQuestion";

export default function StudentRoutes() {
  return (
    <Routes>
      {" "}
      <Route path="student-dashboard" element={<Dashboard />} />{" "}
      <Route path="subjects" element={<StudentSubjects />} />
      <Route path="exam" element={<Exam />} />
      <Route path="exam/:id" element={<ExamPage />} />
      <Route path="practice" element={<Practice />} />
      <Route path="practice/:id" element={<PracticeQuestion />} />
      <Route path="results" element={<Result />} />
      <Route path="progress" element={<Progress />} />
      <Route path="*" element={<NotAllowed />} />
    </Routes>
  );
}
