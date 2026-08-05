import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiCheckCircle, FiClock } from "react-icons/fi";

const questionTemplates = [
  "What is the correct answer to this sample question?",
  "Which option best completes the statement shown in this question?",
  "Choose the most appropriate response from the options below.",
  "Identify the option that matches the concept being tested.",
  "Which of the following is most likely to be correct?",
];

const buildDemoQuestions = (count = 40, subject = "General") =>
  Array.from({ length: count }, (_, idx) => ({
    id: idx + 1,
    question: `${subject} question ${idx + 1}: ${
      questionTemplates[idx % questionTemplates.length]
    }`,
    options: [
      `Option A for question ${idx + 1}`,
      `Option B for question ${idx + 1}`,
      `Option C for question ${idx + 1}`,
      `Option D for question ${idx + 1}`,
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

const playBeep = (duration = 160, frequency = 880) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.value = 0.08;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration / 1000);
  oscillator.onended = () => audioContext.close();
};

export default function ExamQuestion({ data }) {
  const navigate = useNavigate();
  const questions = useMemo(
    () => buildDemoQuestions(40, data?.name),
    [data?.name],
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(
    (data?.duration || 60) * 6,
  );
  const [showWarning, setShowWarning] = useState(false);
  const [hasWindowWarning, setHasWindowWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitReason, setSubmitReason] = useState("");
  const warningCountRef = useRef(0);
  const submittedRef = useRef(false);
  const isAwayRef = useRef(false);
  const hasFiveMinuteBeepRef = useRef(false);
  const hasOneMinuteBeepRef = useRef(false);

  const answeredCount = Object.keys(answers).length;
  const questionsLeft = questions.length - answeredCount;
  const activeQuestion = questions[currentQuestion];
  const isLowTime = remainingSeconds <= 300;

  const submitExam = useCallback((reason = "manual") => {
    if (submittedRef.current) return;

    submittedRef.current = true;
    setSubmitted(true);
    setSubmitReason(reason);
    setShowWarning(false);
  }, []);

  useEffect(() => {
    if (submitted) return undefined;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          submitExam("time-up");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, submitExam]);

  useEffect(() => {
    if (!submitted) return undefined;

    const redirectTimer = setTimeout(() => {
      navigate("/app/exam", { replace: true });
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [navigate, submitted]);

  useEffect(() => {
    if (submitted) return;

    if (remainingSeconds <= 60 && !hasOneMinuteBeepRef.current) {
      hasOneMinuteBeepRef.current = true;
      playBeep(700, 520);
      return;
    }

    if (remainingSeconds <= 300 && !hasFiveMinuteBeepRef.current) {
      hasFiveMinuteBeepRef.current = true;
      playBeep(160, 900);
    }
  }, [remainingSeconds, submitted]);

  useEffect(() => {
    const handleWindowChange = () => {
      if (submittedRef.current) return;
      if (isAwayRef.current) return;

      isAwayRef.current = true;

      if (warningCountRef.current === 0) {
        warningCountRef.current = 1;
        setHasWindowWarning(true);
        setShowWarning(true);
        return;
      }

      submitExam("window-change");
    };

    const handleWindowReturn = () => {
      isAwayRef.current = false;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleWindowChange();
      } else {
        handleWindowReturn();
      }
    };

    window.addEventListener("blur", handleWindowChange);
    window.addEventListener("focus", handleWindowReturn);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleWindowChange);
      window.removeEventListener("focus", handleWindowReturn);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [submitExam]);

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

  if (submitted) {
    return (
      <div className="min-h-screen w-full bg-white_bg px-4 py-4 transition-all duration-700 dark:bg-black sm:px-[3%] sm:py-[2%]">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center">
          <div className="w-full rounded-2xl bg-white p-6 text-center transition-all duration-700 dark:bg-black_bg sm:p-8">
            <FiCheckCircle className="mx-auto text-5xl text-green" />
            <p className="mt-4 text-2xl font-bold text-black dark:text-white">
              Exam Submitted
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Your answers have been recorded locally for now. API submission
              can be connected later.
            </p>
            {submitReason === "window-change" && (
              <p className="mt-4 rounded-2xl bg-red-50 p-3 font-semibold text-red-600 dark:bg-red-950/30">
                The exam was submitted because the exam window was left twice.
              </p>
            )}
            {submitReason === "time-up" && (
              <p className="mt-4 rounded-2xl bg-amber-50 p-3 font-semibold text-amber-600 dark:bg-amber_deep/20">
                Time elapsed, so the exam was submitted automatically.
              </p>
            )}
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
                {data?.name}
              </p>
              <p className="text-gray-500 dark:text-gray-400">{data?.type}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div
                className={`flex w-max items-center gap-2 rounded-full px-3 py-1 font-bold transition-all duration-300 ${
                  isLowTime
                    ? "bg-red-100 text-red-600"
                    : "bg-green/10 text-green"
                }`}
              >
                <FiClock />
                <p>{formatTime(remainingSeconds)}</p>
              </div>
              <button
                type="button"
                onClick={() => submitExam("manual")}
                className="flex min-h-11 items-center justify-center rounded-2xl bg-green px-5 font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green/20 dark:text-black"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>

        {hasWindowWarning && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-700 dark:border-amber-900/60 dark:bg-amber_deep/20 dark:text-amber-400">
            <FiAlertTriangle className="mt-0.5 shrink-0 text-xl" />
            <p className="font-semibold">
              Warning active: you have already left the exam window once. If it
              happens again, the exam will be submitted automatically.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
          <div className="rounded-2xl bg-white p-4 transition-all duration-700 dark:bg-black_bg sm:p-6">
            <div className="mb-5 flex flex-col gap-2 border-b border-gray-200 pb-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-bold text-black dark:text-white">
                Question {currentQuestion + 1}
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

          <aside className="rounded-2xl bg-white p-4 transition-all duration-700 dark:bg-black_bg sm:p-5">
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
                <p className="text-sm text-gray-600 dark:text-gray-300">Left</p>
                <p className="mt-2 text-2xl font-bold text-amber-600">
                  {questionsLeft}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {showWarning && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-black_bg">
            <FiAlertTriangle className="text-5xl text-amber-500" />
            <p className="mt-4 text-xl font-bold text-black dark:text-white">
              Exam Window Warning
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              You changed away from the exam window. If this happens again, the
              exam will be submitted automatically.
            </p>
            <button
              type="button"
              onClick={() => setShowWarning(false)}
              className="mt-6 min-h-11 w-full rounded-2xl bg-green px-5 font-bold text-white transition-all duration-300 dark:text-black"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
