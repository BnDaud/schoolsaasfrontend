import { createContext, useState } from "react";

export const globalContext = createContext();

export default function GlobalContextFunction({ children }) {
  const [darkmode, setDarkmode] = useState("dark");
  return (
    <globalContext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </globalContext.Provider>
  );
}
