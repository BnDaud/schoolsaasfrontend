import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { resolveTenant, forgetDevTenant } from "./tenant-resolver";
import { getTenantById } from "../mocks/tenants";
import { globalContext } from "../context/globalcontext";

export const tenantContext = createContext();

const matlearnBrand = {
  color: "#16a34a",
  logoUrl: "",
  brandName: "Mat Learn",
  faviconUrl: "/vite.svg",
};

export default function TenantProvider({ children }) {
  const location = useLocation();
  const { setBrand } = useContext(globalContext);
  const [{ tenantType, tenantId }, setResolved] = useState(() =>
    resolveTenant(window.location.hostname, location.search),
  );
  const [tenant, setTenant] = useState(null);

  // Real state, not a derived/memoized value: resolveTenant also reads
  // localStorage (tenant-resolver.js), which can change on login/logout
  // without location changing. A memoized value keyed only on
  // location.search — including the React Compiler's own automatic
  // memoization, which applies even without an explicit useMemo — would
  // keep serving a stale result until an unrelated navigation happened.
  // Recomputing into real state on a "dev-tenant:changed" event sidesteps
  // that entirely.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("tenant") === "matlearn") forgetDevTenant();

    const refresh = () => setResolved(resolveTenant(window.location.hostname, location.search));
    refresh();
    window.addEventListener("dev-tenant:changed", refresh);
    return () => window.removeEventListener("dev-tenant:changed", refresh);
  }, [location.search]);

  useEffect(() => {
    if (tenantType !== "school" || !tenantId) {
      setTenant(null);
      setBrand(matlearnBrand);
      return;
    }

    // BACKEND: GET /api/tenants/{tenantId}/config -> { tenantId, name, brand, ... }
    const found = getTenantById(tenantId);
    setTenant(found);
    setBrand(found ? found.brand : matlearnBrand);
  }, [tenantType, tenantId, setBrand]);

  return (
    <tenantContext.Provider value={{ tenantType, tenantId, tenant }}>
      {children}
    </tenantContext.Provider>
  );
}
