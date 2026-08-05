import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { demoExams } from "../../utils/constant";
import ExamInstruction from "./examInstruction";
import ExamQuestion from "./examQuestion";

const ExamPage = () => {
  const [startExam, setStartExam] = useState(false);
  const [data, setData] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const detail =
      location.state?.detail ||
      demoExams.find((exam) => String(exam.id) === id);

    if (!detail) {
      navigate("/app/exam", { replace: true });
      return;
    }

    setData(detail);
  }, [id, location.state, navigate]);

  if (!data) return null;

  if (startExam) {
    return <ExamQuestion data={data} />;
  }

  return <ExamInstruction data={data} onStartExam={() => setStartExam(true)} />;
};

export default ExamPage;
