import React, { useState } from "react";
import { FiDownload, FiGlobe, FiPlus, FiTrash2, FiUploadCloud } from "react-icons/fi";
import Input from "../../../component/ui/input";
import Button from "../../../component/ui/button";
import { loadGlobalQuestions, saveGlobalQuestions } from "../../../mocks/questions";
import {
  subjects as SUBJECT_OPTIONS,
  examGoals as EXAM_BODIES,
} from "../../../mocks/academicProfileOptions";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const emptyForm = {
  examBody: EXAM_BODIES[0],
  year: new Date().getFullYear(),
  subject: SUBJECT_OPTIONS[0],
  topic: "",
  text: "",
  options: ["", "", "", ""],
  answer: "",
  difficulty: DIFFICULTIES[0],
};

const CSV_HEADER =
  "Exam Body,Year,Subject,Topic,Question,Option A,Option B,Option C,Option D,Correct Answer,Difficulty";

const sampleCsvRows = [
  ["WAEC", "2026", "Geography", "Map Reading", "Which map projection preserves angles?", "Mercator", "Robinson", "Mollweide", "Gall-Peters", "Mercator", "Medium"],
  ["JAMB", "2026", "Economics", "Demand and Supply", "An increase in price, other things equal, leads to:", "A fall in quantity demanded", "A rise in quantity demanded", "No change in demand", "A shift in the demand curve", "A fall in quantity demanded", "Easy"],
];

const parseCsvLine = (line) => {
  const cells = [];
  let value = "";
  let insideQuote = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && insideQuote && nextChar === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      insideQuote = !insideQuote;
    } else if (char === "," && !insideQuote) {
      cells.push(value.trim());
      value = "";
    } else {
      value += char;
    }
  }

  cells.push(value.trim());
  return cells;
};

const parseCsvQuestions = (text) => {
  const rows = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseCsvLine);
  const dataRows = rows[0]?.[0]?.toLowerCase() === "exam body" ? rows.slice(1) : rows;

  return dataRows
    .map((row, index) => {
      const [
        examBody,
        year,
        subject,
        topic,
        questionText,
        optionA = "",
        optionB = "",
        optionC = "",
        optionD = "",
        correctAnswer = optionA,
        difficulty = "Easy",
      ] = row;

      if (!examBody || !subject || !topic || !questionText) return null;

      return {
        questionId: `${examBody.toLowerCase()}-${year || "na"}-import-${Date.now()}-${index}`,
        examBody,
        year: Number(year) || new Date().getFullYear(),
        subject,
        topic,
        text: questionText,
        options: [optionA, optionB, optionC, optionD].filter(Boolean),
        answer: correctAnswer || optionA,
        difficulty: DIFFICULTIES.includes(difficulty) ? difficulty : "Easy",
      };
    })
    .filter(Boolean);
};

const getSampleCsv = () =>
  [CSV_HEADER, ...sampleCsvRows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))].join(
    "\n",
  );

/**
 * BACKEND CONTRACT
 * GET /api/questions/global?examBody=&year=&subject=
 * POST /api/questions/global { examBody, year, subject, topic, text, options, answer, difficulty }
 * POST /api/questions/global/import { sourceUrl } -> backend fetches + parses server-side
 *   (avoids browser CORS restrictions a client-side fetch would hit)
 * DELETE /api/questions/global/:questionId
 * Auth: Bearer token, role=SuperAdmin — this is MatLearn's own shared bank,
 * curated centrally, distinct from any tenant's private question bank.
 */
export default function SuperAdminQuestionBank() {
  const [questions, setQuestions] = useState(() => loadGlobalQuestions());
  const [examBodyFilter, setExamBodyFilter] = useState("All");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [importUrl, setImportUrl] = useState("");
  const [importMessage, setImportMessage] = useState("");
  const [importing, setImporting] = useState(false);

  const addImportedQuestions = (imported) => {
    if (imported.length === 0) {
      setImportMessage("No valid questions found.");
      return;
    }
    setQuestions((prev) => {
      const next = [...imported, ...prev];
      saveGlobalQuestions(next);
      return next;
    });
    setImportMessage(`${imported.length} question${imported.length === 1 ? "" : "s"} imported.`);
  };

  const downloadSampleCsv = () => {
    const blob = new Blob([getSampleCsv()], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "global-question-bank-sample.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importFromFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      addImportedQuestions(parseCsvQuestions(String(reader.result || "")));
      event.target.value = "";
    };
    reader.readAsText(file);
  };

  const importFromUrl = async (event) => {
    event.preventDefault();
    if (!importUrl.trim()) return;

    setImporting(true);
    setImportMessage("");
    try {
      // NOTE: a browser-side fetch only works if the URL's server allows
      // cross-origin requests (CORS). Most exam-body/API providers won't —
      // this is why the BACKEND CONTRACT above has the server do the fetch
      // instead. Kept client-side here since there's no backend yet.
      const response = await fetch(importUrl.trim());
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      const text = await response.text();
      addImportedQuestions(parseCsvQuestions(text));
    } catch (err) {
      setImportMessage(`Couldn't import from that URL: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  const updateOption = (index, value) => {
    setForm((prev) => ({
      ...prev,
      options: prev.options.map((option, optionIndex) => (optionIndex === index ? value : option)),
    }));
  };

  const addQuestion = (event) => {
    event.preventDefault();

    const cleanedOptions = form.options.map((option) => option.trim()).filter(Boolean);
    if (!form.subject.trim() || !form.topic.trim() || !form.text.trim() || cleanedOptions.length < 2) {
      setError("Fill subject, topic, question text, and at least 2 options.");
      return;
    }
    if (!form.answer.trim() || !cleanedOptions.includes(form.answer.trim())) {
      setError("Correct answer must match one of the options exactly.");
      return;
    }
    setError("");

    const question = {
      questionId: `${form.examBody.toLowerCase()}-${form.year}-custom-${Date.now()}`,
      examBody: form.examBody,
      year: Number(form.year),
      subject: form.subject.trim(),
      topic: form.topic.trim(),
      text: form.text.trim(),
      options: cleanedOptions,
      answer: form.answer.trim(),
      difficulty: form.difficulty,
    };

    setQuestions((prev) => {
      const next = [question, ...prev];
      saveGlobalQuestions(next);
      return next;
    });
    setForm(emptyForm);
  };

  const deleteQuestion = (questionId) => {
    setQuestions((prev) => {
      const next = prev.filter((question) => question.questionId !== questionId);
      saveGlobalQuestions(next);
      return next;
    });
  };

  const filteredQuestions =
    examBodyFilter === "All" ? questions : questions.filter((q) => q.examBody === examBodyFilter);

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">Global Question Bank</p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          MatLearn's own WAEC/JAMB/NECO/NAPTEB bank, shared by every school and every
          independent learner.
        </p>
      </div>

      <form
        onSubmit={addQuestion}
        className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="block">
            <p className="mb-2 font-bold text-black dark:text-white">Exam Body</p>
            <select
              value={form.examBody}
              onChange={(event) => setForm((prev) => ({ ...prev, examBody: event.target.value }))}
              className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
            >
              {EXAM_BODIES.map((body) => (
                <option key={body}>{body}</option>
              ))}
            </select>
          </label>
          <Input
            name={"year"}
            label={"Year"}
            required={true}
            width={"w-full"}
            type={"number"}
            value={form.year}
            onChange={(value) => setForm((prev) => ({ ...prev, year: value }))}
          />
          <label className="block">
            <p className="mb-2 font-bold text-black dark:text-white">Subject</p>
            <select
              name="subject"
              value={form.subject}
              onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
              className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
            >
              {SUBJECT_OPTIONS.map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </label>
        </div>

        <Input
          name={"topic"}
          label={"Topic"}
          required={true}
          placeholder={"e.g. Algebra"}
          width={"w-full"}
          type={"text"}
          value={form.topic}
          onChange={(value) => setForm((prev) => ({ ...prev, topic: value }))}
        />

        <label className="block">
          <p className="mb-2 font-bold text-black dark:text-white">Question</p>
          <textarea
            value={form.text}
            onChange={(event) => setForm((prev) => ({ ...prev, text: event.target.value }))}
            placeholder="Write the question here..."
            className="min-h-24 w-full resize-none rounded-2xl border border-gray-200 bg-white_bg px-4 py-3 font-bold text-black outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-white"
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {form.options.map((option, index) => (
            <label key={index} className="block">
              <p className="mb-2 font-bold text-black dark:text-white">Option {index + 1}</p>
              <input
                value={option}
                onChange={(event) => updateOption(index, event.target.value)}
                className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-black outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-white"
              />
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            name={"answer"}
            label={"Correct Answer"}
            required={true}
            placeholder={"Must match an option exactly"}
            width={"w-full"}
            type={"text"}
            value={form.answer}
            onChange={(value) => setForm((prev) => ({ ...prev, answer: value }))}
          />
          <label className="block">
            <p className="mb-2 font-bold text-black dark:text-white">Difficulty</p>
            <select
              value={form.difficulty}
              onChange={(event) => setForm((prev) => ({ ...prev, difficulty: event.target.value }))}
              className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
            >
              {DIFFICULTIES.map((level) => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </label>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          name={"Add to Global Bank"}
          icon={<FiPlus />}
          iconStyle={"ml-1"}
          type={"submit"}
          style={
            "flex h-11 w-full items-center justify-center gap-1 rounded-2xl bg-green px-5 font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green/20 dark:text-black"
          }
        />
      </form>

      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
        <div className="flex items-center gap-2">
          <FiUploadCloud className="text-2xl text-green" />
          <p className="text-lg font-bold text-black dark:text-white">Bulk Upload</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadSampleCsv}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 font-bold text-gray-700 transition-all duration-300 hover:border-green hover:text-green dark:border-gray-700 dark:text-gray-200"
          >
            <FiDownload />
            Download Sample CSV
          </button>

          <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 font-bold text-gray-700 transition-all duration-300 hover:border-green hover:text-green dark:border-gray-700 dark:text-gray-200">
            <FiUploadCloud />
            Upload CSV
            <input type="file" accept=".csv,text/csv" onChange={importFromFile} className="hidden" />
          </label>
        </div>

        <form onSubmit={importFromUrl} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input
              name={"importUrl"}
              label={"Import from API / CSV link"}
              placeholder={"https://api.example.com/waec-questions.csv"}
              width={"w-full"}
              type={"url"}
              value={importUrl}
              onChange={setImportUrl}
              icon={<FiGlobe className="text-lg" />}
            />
          </div>
          <Button
            name={importing ? "Importing..." : "Import"}
            type="submit"
            style={
              "flex h-11 items-center justify-center rounded-xl border border-green px-5 font-bold text-green transition-all duration-300 hover:bg-green/10 disabled:cursor-not-allowed disabled:opacity-50"
            }
          />
        </form>

        {importMessage && (
          <p className="text-sm text-gray-600 dark:text-gray-300">{importMessage}</p>
        )}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-lg font-bold text-black dark:text-white">
            {filteredQuestions.length} Questions
          </p>
          <div className="flex flex-wrap gap-2">
            {["All", ...EXAM_BODIES].map((body) => (
              <button
                key={body}
                type="button"
                onClick={() => setExamBodyFilter(body)}
                className={`min-h-9 rounded-xl border px-3 font-semibold transition-all duration-300 ${
                  examBodyFilter === body
                    ? "border-green bg-green/10 text-green"
                    : "border-gray-200 text-gray-500 hover:border-green dark:border-gray-800 dark:text-gray-400"
                }`}
              >
                {body}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredQuestions.map((question) => (
            <div
              key={question.questionId}
              className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 p-3 dark:border-gray-800"
            >
              <div>
                <p className="font-semibold text-black dark:text-white">{question.text}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {question.examBody} {question.year} · {question.subject} · {question.topic} ·{" "}
                  {question.difficulty}
                </p>
              </div>
              <button
                type="button"
                onClick={() => deleteQuestion(question.questionId)}
                className="flex min-h-9 shrink-0 items-center justify-center gap-1 rounded-xl border border-red-200 px-3 font-bold text-red-600 transition-all duration-300 hover:bg-red-50 dark:border-red-900/60 dark:hover:bg-red-950/30"
              >
                <FiTrash2 />
                Remove
              </button>
            </div>
          ))}
          {filteredQuestions.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No questions in this filter yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
