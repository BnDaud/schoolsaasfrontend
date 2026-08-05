import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiCheckCircle, FiClock, FiRotateCcw } from "react-icons/fi";
import { demoPractice } from "../../utils/constant";

const questionTemplates = [
  "Pick the best answer for this practice question.",
  "Which option correctly completes the idea in this question?",
  "Choose the most accurate response from the options below.",
  "Select the option that best matches the topic being practiced.",
  "Which answer would you choose after reviewing this concept?",
];

const buildPracticeQuestions = (count = 40, subject = "Practice") =>
  Array.from({ length: count }, (_, idx) => ({
    id: idx + 1,
    question: `${subject} practice question ${idx + 1}: ${
      questionTemplates[idx % questionTemplates.length]
    }`,
    options: [
      `Practice option A for question ${idx + 1}`,
      `Practice option B for question ${idx + 1}`,
      `Practice option C for question ${idx + 1}`,
      `Practice option D for question ${idx + 1}`,
    ],
  }));

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0",
    )}`;
  }

  return `${mins}:${String(secs).padStart(2, "0")}`;
};

export default function PracticeQuestion() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const data =
    location.state?.detail ||
    demoPractice.find((practice) => String(practice.id) === id);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [practiceMinutes, setPracticeMinutes] = useState(data?.duration || 30);
  const [remainingSeconds, setRemainingSeconds] = useState(
    (data?.duration || 30) * 60,
  );
  const [timerRunning, setTimerRunning] = useState(true);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(
    () => buildPracticeQuestions(40, data?.name),
    [data?.name],
  );

  const activeQuestion = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const questionsLeft = questions.length - answeredCount;
  const timeElapsed = remainingSeconds === 0;

  useEffect(() => {
    if (!data) {
      navigate("/app/practice", { replace: true });
    }
  }, [data, navigate]);

  useEffect(() => {
    if (!timerRunning || finished || remainingSeconds <= 0) return undefined;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [finished, remainingSeconds, timerRunning]);

  const applyPracticeTime = () => {
    const minutes = Number(practiceMinutes);
    const safeMinutes = Number.isFinite(minutes) && minutes > 0 ? minutes : 30;

    setPracticeMinutes(safeMinutes);
    setRemainingSeconds(safeMinutes * 60);
    setTimerRunning(true);
  };

  const selectAnswer = (optionIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: optionIdx,
    }));
  };

  const goToQuestion = (idx) => {
    setCurrentQuestion(idx);
  };

  const goNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const goPrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  if (!data) return null;

  if (finished) {
    return (
      <div className="min-h-screen w-full bg-white_bg px-4 py-4 transition-all duration-700 dark:bg-black sm:px-[3%] sm:py-[2%]">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center">
          <div className="w-full rounded-2xl bg-white p-6 text-center transition-all duration-700 dark:bg-black_bg sm:p-8">
            <FiCheckCircle className="mx-auto text-5xl text-green" />
            <p className="mt-4 text-2xl font-bold text-black dark:text-white">
              Practice Complete
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              You answered {answeredCount} of {questions.length} questions.
            </p>
            <button
              type="button"
              onClick={() => navigate("/app/practice")}
              className="mt-6 min-h-11 rounded-2xl bg-green px-5 font-bold text-white transition-all duration-300 dark:text-black"
            >
              Back to Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white_bg px-4 py-4 transition-all duration-700 dark:bg-black sm:px-[3%] sm:py-[2%]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <div className="rounded-2xl bg-white p-4 transition-all duration-700 dark:bg-black_bg sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="break-words text-xl font-bold text-black dark:text-white">
                {data?.name} Practice
              </p>
              <p className="text-gray-500 dark:text-gray-400">{data?.type}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div
                className={`flex w-max items-center gap-2 rounded-full px-3 py-1 font-bold ${
                  timeElapsed ? "bg-amber-100 text-amber-600" : "bg-green/10 text-green"
                }`}
              >
                <FiClock />
                <p>{formatTime(remainingSeconds)}</p>
              </div>
              <button
                type="button"
                onClick={() => setFinished(true)}
                className="flex min-h-11 items-center justify-center rounded-2xl bg-green px-5 font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green/20 dark:text-black"
              >
                Finish Practice
              </button>
            </div>
          </div>
        </div>

        {timeElapsed && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 font-semibold text-amber-700 dark:border-amber-900/60 dark:bg-amber_deep/20 dark:text-amber-400">
            Your practice timer has ended. You can still continue because
            practice mode does not auto-submit.
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
          <div className="rounded-2xl bg-white p-4 transition-all duration-700 dark:bg-black_bg sm:p-6">
            <div className="mb-5 flex flex-col gap-2 border-b border-gray-200 pb-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-bold text-black dark:text-white">
                Practice Question {currentQuestion + 1}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {currentQuestion + 1} of {questions.length}
              </p>
            </div>

            <p className="text-lg font-semibold leading-8 text-black dark:text-white">
              {activeQuestion.question}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {activeQuestion.options.map((option, idx) => {
                const isSelected = answers[activeQuestion.id] === idx;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectAnswer(idx)}
                    className={`flex min-h-14 items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-green bg-green/10 text-green"
                        : "border-gray-200 bg-white_bg text-gray-700 hover:border-green hover:bg-green/10 dark:border-gray-800 dark:bg-black dark:text-gray-300"
                    }`}
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green/10 font-bold text-green">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goPrevious}
                disabled={currentQuestion === 0}
                className="min-h-11 rounded-2xl border border-gray-300 px-5 font-bold text-gray-700 transition-all duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-black"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={currentQuestion === questions.length - 1}
                className="min-h-11 rounded-2xl bg-green px-5 font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green/20 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 dark:text-black dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
              >
                Next
              </button>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl bg-white p-4 transition-all duration-700 dark:bg-black_bg sm:p-5">
              <p className="font-bold text-black dark:text-white">
                Practice Time
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={practiceMinutes}
                  onChange={(e) => setPracticeMinutes(e.target.value)}
                  className="h-11 min-w-0 flex-1 rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-black outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-white"
                />
                <button
                  type="button"
                  onClick={applyPracticeTime}
                  className="flex h-11 items-center justify-center rounded-2xl bg-green px-4 font-bold text-white dark:text-black"
                >
                  Set
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setTimerRunning((prev) => !prev)}
                  className="min-h-10 flex-1 rounded-2xl border border-gray-300 px-3 font-bold text-gray-700 dark:border-gray-700 dark:text-gray-200"
                >
                  {timerRunning ? "Pause" : "Resume"}
                </button>
                <button
                  type="button"
                  onClick={applyPracticeTime}
                  className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-300 px-3 font-bold text-gray-700 dark:border-gray-700 dark:text-gray-200"
                >
                  <FiRotateCcw />
                  Reset
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 transition-all duration-700 dark:bg-black_bg sm:p-5">
              <p className="font-bold text-black dark:text-white">
                Question Navigator
              </p>
              <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-10 xl:grid-cols-6">
                {questions.map((question, idx) => {
                  const isCurrent = idx === currentQuestion;
                  const isAnswered = answers[question.id] !== undefined;

                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => goToQuestion(idx)}
                      className={`flex size-9 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-300 ${
                        isCurrent
                          ? "border-green bg-green text-white dark:text-black"
                          : isAnswered
                            ? "border-green/30 bg-green/10 text-green"
                            : "border-gray-200 bg-white_bg text-gray-500 hover:border-green dark:border-gray-800 dark:bg-black dark:text-gray-400"
                      }`}
                    >
                      {question.id}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-green/10 p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Answered
                  </p>
                  <p className="mt-2 text-2xl font-bold text-green">
                    {answeredCount}
                  </p>
                </div>
                <div className="rounded-2xl bg-amber-100 p-4 dark:bg-amber_deep/20">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Left
                  </p>
                  <p className="mt-2 text-2xl font-bold text-amber-600">
                    {questionsLeft}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
