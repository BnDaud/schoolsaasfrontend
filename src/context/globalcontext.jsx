import { createContext, useState } from "react";

export const globalContext = createContext();

export default function GlobalContextFunction({ children }) {
  const [darkmode, setDarkmodeGlobally] = useState("dark");
  return (
    <globalContext.Provider value={{ darkmode, setDarkmodeGlobally }}>
      {children}
    </globalContext.Provider>
  );
}
