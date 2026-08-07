import React, { useContext, useMemo, useState } from "react";
import { FiBookOpen, FiDownload, FiGlobe, FiLock, FiSearch, FiUnlock } from "react-icons/fi";
import Input from "../../../component/ui/input";
import { tenantContext } from "../../../app/tenant-provider";
import { listGlobalLibrary, loadTenantLibrary } from "../../../mocks/library";

const classes = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

const subjectsByClass = {
  JSS1: [
    "Mathematics",
    "English",
    "Basic Science",
    "Social Studies",
    "Business Studies",
    "Computer Studies",
  ],
  JSS2: [
    "Mathematics",
    "English",
    "Basic Science",
    "Social Studies",
    "Business Studies",
    "Civic Education",
  ],
  JSS3: [
    "Mathematics",
    "English",
    "Basic Science",
    "Social Studies",
    "Business Studies",
    "Basic Technology",
  ],
  SS1: [
    "Mathematics",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Economics",
  ],
  SS2: [
    "Mathematics",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Government",
  ],
  SS3: [
    "Mathematics",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Literature",
  ],
};

const buildBooks = (className) =>
  subjectsByClass[className].map((subject, idx) => ({
    id: `${className}-${subject}`,
    title: `${className} ${subject} Companion`,
    subject,
    className,
    author: ["Mat Learn Editorial", "School Press", "Exam Prep Team"][idx % 3],
    pages: 120 + idx * 18,
    level: idx % 2 === 0 ? "Core" : "Revision",
    description: `A focused ${subject.toLowerCase()} book for ${className} students with explanations, examples, and practice tasks.`,
  }));

const allBooks = classes.flatMap((className) => buildBooks(className));

const accessLevelStyle = (accessLevel) => {
  if (accessLevel === "free") return "bg-green/10 text-green";
  return "bg-amber-100 text-amber-600 dark:bg-amber_deep/20";
};

export default function Books() {
  const { tenantId } = useContext(tenantContext);
  const [selectedClass, setSelectedClass] = useState("JSS1");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const globalLibrary = listGlobalLibrary();
  const tenantLibrary = loadTenantLibrary(tenantId);

  const subjects = ["All", ...subjectsByClass[selectedClass]];
  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      const matchesClass = book.className === selectedClass;
      const matchesSubject =
        selectedSubject === "All" || book.subject === selectedSubject;
      const matchesSearch =
        searchTerm.trim() === "" ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesClass && matchesSubject && matchesSearch;
    });
  }, [searchTerm, selectedClass, selectedSubject]);

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">Books</p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Browse class-related study books and revision materials.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4 transition-all duration-700 dark:bg-black_bg sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {classes.map((className) => (
              <button
                key={className}
                type="button"
                onClick={() => {
                  setSelectedClass(className);
                  setSelectedSubject("All");
                }}
                className={`min-h-10 rounded-xl border px-4 font-bold transition-all duration-300 ${
                  selectedClass === className
                    ? "border-green bg-green text-white dark:text-black"
                    : "border-gray-200 text-gray-600 hover:border-green hover:text-green dark:border-gray-800 dark:text-gray-300"
                }`}
              >
                {className}
              </button>
            ))}
          </div>

          <Input
            type={"text"}
            width={"xl:w-80 w-full"}
            placeholder={"Search books..."}
            onChange={setSearchTerm}
            icon={<FiSearch className="text-lg" />}
          />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {subjects.map((subject) => (
            <button
              key={subject}
              type="button"
              onClick={() => setSelectedSubject(subject)}
              className={`min-h-9 shrink-0 rounded-xl border px-3 font-semibold transition-all duration-300 ${
                selectedSubject === subject
                  ? "border-green bg-green/10 text-green"
                  : "border-gray-200 text-gray-500 hover:border-green dark:border-gray-800 dark:text-gray-400"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="rounded-2xl bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:bg-black_bg"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-green/10 text-green">
                <FiBookOpen className="text-2xl" />
              </div>
              <p className="rounded-full bg-white_bg px-3 py-1 text-sm font-bold text-gray-600 dark:bg-black dark:text-gray-300">
                {book.level}
              </p>
            </div>

            <p className="mt-4 text-xl font-bold text-black dark:text-white">
              {book.title}
            </p>
            <p className="mt-1 font-semibold text-green">{book.subject}</p>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              {book.description}
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <p>{book.pages} pages</p>
              <p>{book.author}</p>
            </div>

            <button
              type="button"
              className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-green px-4 font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green/20 dark:text-black"
            >
              <FiDownload />
              Open Book
            </button>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="rounded-2xl bg-white p-8 text-center text-gray-600 dark:bg-black_bg dark:text-gray-300">
          No books found for this class and filter.
        </div>
      )}

      {/* E-Library: global (WAEC/JAMB/NECO) + this school's own resources,
          with access-level lock state (MATLEARN_ROADMAP.md §11 — browse +
          access-control UI). Distinct from the class books above. */}
      <div className="space-y-1 pt-4">
        <p className="text-2xl font-bold text-black dark:text-white">E-Library</p>
        <p className="text-gray-600 dark:text-gray-300">
          MatLearn's shared resources and this school's own uploads.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center gap-2">
            <FiGlobe className="text-green" />
            <p className="text-xl font-bold text-black dark:text-white">Global Resources</p>
          </div>
          <div className="space-y-3">
            {globalLibrary.map((resource) => (
              <div
                key={resource.resourceId}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <div>
                  <p className="font-semibold text-black dark:text-white">{resource.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{resource.type}</p>
                </div>
                <p
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${accessLevelStyle(
                    resource.accessLevel,
                  )}`}
                >
                  {resource.accessLevel === "free" ? <FiUnlock /> : <FiLock />}
                  {resource.accessLevel === "free" ? "Free" : "Subscriber"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="mb-4 flex items-center gap-2">
            <FiBookOpen className="text-green" />
            <p className="text-xl font-bold text-black dark:text-white">This School's Resources</p>
          </div>
          <div className="space-y-3">
            {tenantLibrary.map((resource) => (
              <div
                key={resource.resourceId}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <div>
                  {resource.url ? (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-black hover:text-green dark:text-white"
                    >
                      {resource.title}
                    </a>
                  ) : (
                    <p className="font-semibold text-black dark:text-white">{resource.title}</p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">{resource.type}</p>
                </div>
                <p className="flex items-center gap-1 rounded-full bg-green/10 px-3 py-1 text-sm font-bold text-green">
                  <FiUnlock />
                  School
                </p>
              </div>
            ))}
            {tenantLibrary.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No school resources uploaded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
