import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiGlobe } from "react-icons/fi";
import { tenantContext } from "../../app/tenant-provider";
import { listTenants } from "../../mocks/tenants";

// Local-dev-only convenience: there's no wildcard DNS on a laptop, so tenant
// identity is simulated via a `?tenant=` query param persisted in
// localStorage (see app/tenant-resolver.js) — meaning once you visit a
// school's site, bare "/" keeps showing it (correct: a school's own public
// pages link to "/" and expect to stay on that school, same as a real
// subdomain would). This picker is the easy way back to any surface,
// including MatLearn's own public homepage, without knowing that URL trick.
export default function DevTenantSwitcher() {
  const { tenantType, tenantId } = useContext(tenantContext);
  const navigate = useNavigate();
  const tenants = listTenants();

  const currentValue = tenantType === "school" ? tenantId : "matlearn";

  return (
    <div className="fixed bottom-20 right-4 z-[60] md:bottom-4">
      <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/95 px-3 py-2 text-sm shadow-lg backdrop-blur dark:border-gray-800 dark:bg-black_bg/95">
        <FiGlobe className="text-green" />
        <select
          value={currentValue}
          onChange={(e) => navigate(`/?tenant=${e.target.value}`)}
          className="bg-transparent font-semibold text-black outline-none dark:text-white"
        >
          <option value="matlearn">MatLearn (Public)</option>
          {tenants.map((tenant) => (
            <option key={tenant.tenantId} value={tenant.tenantId}>
              {tenant.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
