import { createContext, useState } from "react";

export const globalContext = createContext();

export default function GlobalContextFunction({ children }) {
  const [darkmode, setDarkmodeGlobally] = useState("dark");
  const [role, setRole] = useState("Tutor");
  return (
    <globalContext.Provider
      value={{ darkmode, setDarkmodeGlobally, role, setRole }}
    >
      {children}
    </globalContext.Provider>
  );
}
