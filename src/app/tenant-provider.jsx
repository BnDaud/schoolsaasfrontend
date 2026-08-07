import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { resolveTenant } from "./tenant-resolver";
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

  const { tenantType, tenantId } = useMemo(
    () => resolveTenant(window.location.hostname, location.search),
    [location.search],
  );

  const [tenant, setTenant] = useState(null);

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
