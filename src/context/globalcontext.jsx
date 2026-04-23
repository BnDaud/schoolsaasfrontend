import { createContext, useState } from "react";

export const globalContext = createContext();

export default function GlobalContextFunction({ children }) {
  const [darkmode, setDarkmodeGlobally] = useState("dark");
  const [role, setRole] = useState("Student");
  const [name, setName] = useState("Lawal Sulaimon");
  const [schoolName, setSchoolName] = useState("Compro");
  const [title, setTitle] = useState("Dr");

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
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
