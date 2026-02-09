import { Routes, Route } from "react-router-dom";
import "./App.css";

import GlobalContextFunction from "./context/globalcontext";
import { CustomRoutes } from "./routes/route";
function App() {
  return (
    <GlobalContextFunction>
      <Routes> {CustomRoutes}</Routes>
    </GlobalContextFunction>
  );
}

export default App;
