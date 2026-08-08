import { createContext, useEffect, useState } from "react";

export const globalContext = createContext();

// Per-tenant branding. Each tenant (school, or self-pace track) carries its own
// color/logo/name/favicon, set by that tenant's admin, visible everywhere post-login.
// TODO: replace default with GET /api/tenant/branding response on login/app-load.
// Contract:
//   GET /api/tenant/branding -> { "color": "#16a34a", "logoUrl": "https://cdn/.../logo.png",
//                                  "brandName": "Compro College", "faviconUrl": "https://cdn/.../favicon.png" }
//   PATCH /api/tenant/branding (SuperAdmin editing own platform, or School Admin editing own tenant)
//     Body: partial of the same shape. Response 200: updated branding object.
const defaultBrand = {
  color: "#16a34a",
  logoUrl: "",
  brandName: "Mat Learn",
  faviconUrl: "/vite.svg",
};

export default function GlobalContextFunction({ children }) {
  const [darkmode, setDarkmodeGlobally] = useState("dark");
  const [role, setRole] = useState("SuperAdmin"); // TODO: revert to backend-driven role once auth API is wired
  const [name, setName] = useState("Lawal Sulaimon");
  const [schoolName, setSchoolName] = useState("Compro");
  const [title, setTitle] = useState("Dr");
  const [brand, setBrand] = useState(defaultBrand);
  const [classId, setClassId] = useState(null); // logged-in student's own class, set on login
  const [assignedClassIds, setAssignedClassIds] = useState([]); // logged-in tutor's assigned classes
  const [assignedSubjectIds, setAssignedSubjectIds] = useState([]); // logged-in tutor's assigned subjects
  const [academicProfile, setAcademicProfile] = useState(null); // independent learner's self-managed profile

  // Apply branding live: CSS var drives any bg-[var(--brand-color)]/text-[var(--brand-color)]
  // usage, plus real <title> and favicon swap so each tenant feels like its own product.
  useEffect(() => {
    document.documentElement.style.setProperty("--brand-color", brand.color);
    document.title = brand.brandName;

    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = brand.faviconUrl;
  }, [brand]);

  return (
    <globalContext.Provider
      value={{
        darkmode,
        setDarkmodeGlobally,
        role,
        setRole,
        name,
        setName,
        schoolName,
        setSchoolName,
        title,
        setTitle,
        brand,
        setBrand,
        classId,
        setClassId,
        assignedClassIds,
        setAssignedClassIds,
        assignedSubjectIds,
        setAssignedSubjectIds,
        academicProfile,
        setAcademicProfile,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
