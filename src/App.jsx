import { Routes, Route } from "react-router-dom";
import "./App.css";

import GlobalContextFunction from "./context/globalcontext";
import TenantProvider from "./app/tenant-provider";
import { CustomRoutes } from "./routes/route";
function App() {
  return (
    <GlobalContextFunction>
      <TenantProvider>
        <Routes> {CustomRoutes}</Routes>
      </TenantProvider>
    </GlobalContextFunction>
  );
}

export default App;
