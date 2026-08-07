// hostname -> { tenantType, tenantId }
// BACKEND: production resolution happens at the edge/CDN from the Host header
// (see docs/MATLEARN_ROADMAP.md §1-2). Local dev has no wildcard DNS, so we fall
// back to a `?tenant=` query param, persisted in localStorage so it survives
// navigation without repeating the param on every link.

const DEV_TENANT_STORAGE_KEY = "matlearn:dev-tenant-id";

export function resolveTenant(hostname, search) {
  if (hostname === "admin.matlearn.com") {
    return { tenantType: "matlearn-admin", tenantId: null };
  }
  if (hostname === "matlearn.com" || hostname === "www.matlearn.com") {
    return { tenantType: "matlearn", tenantId: null };
  }

  const subdomainMatch = hostname.match(/^([a-z0-9-]+)\.matlearn\.com$/);
  if (subdomainMatch) {
    return { tenantType: "school", tenantId: subdomainMatch[1] };
  }

  const params = new URLSearchParams(search);
  const devTenant = params.get("tenant");

  if (devTenant === "admin") {
    return { tenantType: "matlearn-admin", tenantId: null };
  }
  if (devTenant === "matlearn") {
    window.localStorage.removeItem(DEV_TENANT_STORAGE_KEY);
    return { tenantType: "matlearn", tenantId: null };
  }
  if (devTenant) {
    window.localStorage.setItem(DEV_TENANT_STORAGE_KEY, devTenant);
    return { tenantType: "school", tenantId: devTenant };
  }

  const storedTenantId = window.localStorage.getItem(DEV_TENANT_STORAGE_KEY);
  if (storedTenantId) {
    return { tenantType: "school", tenantId: storedTenantId };
  }

  return { tenantType: "matlearn", tenantId: null };
}
