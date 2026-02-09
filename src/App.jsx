import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavbarHomePage from "./component/navbar";
import NotFound from "./pages/nofFound";
import Home from "./pages/home";
import Features from "./pages/features";
import Contact from "./pages/contact";
import About from "./pages/about";
import Pricing from "./pages/pricing";
import SelfStudy from "./pages/selfstudy";

export const globalContext = createContext();

function App() {
  const [darkmode, setDarkmode] = useState("dark");

  return (
    <globalContext.Provider value={{ darkmode, setDarkmode }}>
      <NavbarHomePage />

      <Routes>
        {" "}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/self-study" element={<SelfStudy />} />
        <Route path="/about" element={<About />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </globalContext.Provider>
  );
}

export default App;
