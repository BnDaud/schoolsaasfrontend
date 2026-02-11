import { useState, useEffect, useContext } from "react";
import { globalContext } from "../context/globalcontext";

export default function useDarkMode() {
  const { setDarkmodeGlobally } = useContext(globalContext);

  // check localStorage for user preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      return saved ? JSON.parse(saved) : true; // default: dark
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // toggle function
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    setDarkmodeGlobally(darkMode);
  };

  return [toggleDarkMode];
}
