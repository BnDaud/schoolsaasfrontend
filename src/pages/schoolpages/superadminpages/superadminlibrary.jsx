import React, { useState } from "react";
import { FiExternalLink, FiLink, FiPlus, FiTrash2 } from "react-icons/fi";
import Input from "../../../component/ui/input";
import Button from "../../../component/ui/button";
import { loadGlobalLibrary, saveGlobalLibrary } from "../../../mocks/library";

const RESOURCE_TYPES = ["Link", "PDF", "Video"];
const ACCESS_LEVELS = ["free", "subscriber"];

/**
 * BACKEND CONTRACT
 * GET /api/library/global
 * POST /api/library/global { title, type, url, accessLevel }
 * DELETE /api/library/global/:resourceId
 * Auth: Bearer token, role=SuperAdmin — MatLearn's own shared library,
 * curated centrally. Resources are external links, never uploaded files.
 */
export default function SuperAdminLibrary() {
  const [resources, setResources] = useState(() => loadGlobalLibrary());
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState(RESOURCE_TYPES[0]);
  const [accessLevel, setAccessLevel] = useState(ACCESS_LEVELS[0]);
  const [error, setError] = useState("");

  const addResource = (event) => {
    event.preventDefault();

    if (!title.trim() || !url.trim()) return;

    try {
      new URL(url.trim());
    } catch {
      setError("Enter a valid URL (e.g. https://...)");
      return;
    }
    setError("");

    const resource = {
      resourceId: `lib-global-custom-${Date.now()}`,
      title: title.trim(),
      type,
      url: url.trim(),
      scope: "global",
      accessLevel,
    };

    setResources((prev) => {
      const next = [resource, ...prev];
      saveGlobalLibrary(next);
      return next;
    });

    setTitle("");
    setUrl("");
    setType(RESOURCE_TYPES[0]);
    setAccessLevel(ACCESS_LEVELS[0]);
  };

  const deleteResource = (resourceId) => {
    setResources((prev) => {
      const next = prev.filter((resource) => resource.resourceId !== resourceId);
      saveGlobalLibrary(next);
      return next;
    });
  };

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black dark:text-white">Global Library</p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          MatLearn's own shared resources, visible to every school and every independent
          learner.
        </p>
      </div>

      <form
        onSubmit={addResource}
        className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg md:grid-cols-[2fr_2fr_1fr_1fr_auto] md:items-end"
      >
        <Input
          name={"title"}
          label={"Title"}
          required={true}
          placeholder={"e.g. WAEC Past Questions 2026"}
          width={"w-full"}
          type={"text"}
          value={title}
          onChange={setTitle}
          icon={<FiLink className="text-lg" />}
        />
        <Input
          name={"url"}
          label={"URL"}
          required={true}
          placeholder={"https://..."}
          width={"w-full"}
          type={"url"}
          value={url}
          onChange={setUrl}
          icon={<FiExternalLink className="text-lg" />}
        />
        <label className="block">
          <p className="mb-2 font-bold text-black dark:text-white">Type</p>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="h-10 w-full rounded-xl border border-gray-200 bg-white_bg px-4 font-semibold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
          >
            {RESOURCE_TYPES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <p className="mb-2 font-bold text-black dark:text-white">Access</p>
          <select
            value={accessLevel}
            onChange={(event) => setAccessLevel(event.target.value)}
            className="h-10 w-full rounded-xl border border-gray-200 bg-white_bg px-4 font-semibold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
          >
            {ACCESS_LEVELS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <Button
          name={"Add"}
          icon={<FiPlus />}
          iconStyle={"ml-1"}
          type={"submit"}
          style={
            "flex h-10 items-center justify-center gap-1 rounded-xl bg-green px-5 font-bold text-white transition duration-300 hover:shadow-lg hover:shadow-green/20 dark:text-black"
          }
        />
        {error && <p className="text-sm text-red-500 md:col-span-5">{error}</p>}
      </form>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
        <p className="mb-4 text-xl font-bold text-black dark:text-white">
          {resources.length} Resources
        </p>
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.resourceId}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800"
            >
              <div>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-black hover:text-green dark:text-white"
                >
                  {resource.title}
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {resource.type} ·{" "}
                  {resource.accessLevel === "free" ? "Free" : "Subscriber"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => deleteResource(resource.resourceId)}
                className="flex min-h-9 items-center justify-center gap-1 rounded-xl border border-red-200 px-3 font-bold text-red-600 transition-all duration-300 hover:bg-red-50 dark:border-red-900/60 dark:hover:bg-red-950/30"
              >
                <FiTrash2 />
                Remove
              </button>
            </div>
          ))}
          {resources.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No global resources added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
