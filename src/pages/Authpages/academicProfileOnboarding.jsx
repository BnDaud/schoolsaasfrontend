import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../../context/globalcontext";
import Button from "../../component/ui/button";
import { SchoolLogo } from "../../utils/constant";
import {
  departments,
  educationLevels,
  examGoals,
  subjects,
} from "../../mocks/academicProfileOptions";

// MATLEARN_ROADMAP.md §4.1 /onboarding/academic-profile — the step
// learnerRegisterpage.jsx explicitly skipped (flagged in PROGRESS_03) since
// this screen didn't exist yet. Self-managed profile, not tenant/admin data
// (§0 assumption 3) — reads/writes globalContext.academicProfile only.
export default function AcademicProfileOnboarding() {
  const { setAcademicProfile } = useContext(globalContext);
  const navigate = useNavigate();

  const [educationLevel, setEducationLevel] = useState(educationLevels[0]);
  const [department, setDepartment] = useState(departments[0]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);

  const toggle = (list, setList, value) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // BACKEND: PATCH /api/learners/me/academic-profile
    // { educationLevel, department, subjects, examGoals }
    setAcademicProfile({
      educationLevel,
      department,
      subjects: selectedSubjects,
      examGoals: selectedGoals,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-white_bg px-[5%] py-[5%] transition-all duration-700 dark:bg-black">
      <div className="mx-auto flex max-w-2xl flex-col items-center space-y-3">
        {SchoolLogo("size-24")}
        <p className="text-3xl font-bold text-black dark:text-white">
          Set Up Your Academic Profile
        </p>
        <p className="text-center text-gray-600 dark:text-gray-300">
          This personalizes practice and library content to what you're actually studying.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-6 pt-4">
          <label className="block">
            <p className="mb-2 font-bold text-black dark:text-white">Education Level</p>
            <select
              value={educationLevel}
              onChange={(event) => setEducationLevel(event.target.value)}
              className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
            >
              {educationLevels.map((level) => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <p className="mb-2 font-bold text-black dark:text-white">Department</p>
            <select
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              className="h-11 w-full rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
            >
              {departments.map((dept) => (
                <option key={dept}>{dept}</option>
              ))}
            </select>
          </label>

          <div>
            <p className="mb-2 font-bold text-black dark:text-white">Subjects of Interest</p>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggle(selectedSubjects, setSelectedSubjects, subject)}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                    selectedSubjects.includes(subject)
                      ? "border-green bg-green/10 text-green"
                      : "border-gray-200 text-gray-600 hover:border-green dark:border-gray-800 dark:text-gray-300"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 font-bold text-black dark:text-white">Exam Goals</p>
            <div className="flex flex-wrap gap-2">
              {examGoals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggle(selectedGoals, setSelectedGoals, goal)}
                  className={`rounded-xl border px-4 py-2 text-sm font-bold transition-all duration-300 ${
                    selectedGoals.includes(goal)
                      ? "border-green bg-green/10 text-green"
                      : "border-gray-200 text-gray-600 hover:border-green dark:border-gray-800 dark:text-gray-300"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          <Button
            name={"Finish Setup"}
            type={"submit"}
            style={
              "flex items-center justify-center text-white dark:text-black font-bold text-lg bg-green h-11 w-full rounded-xl hover:scale-x-103 transition duration-500"
            }
          />
        </form>
      </div>
    </div>
  );
}
