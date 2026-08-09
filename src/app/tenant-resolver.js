// hostname -> { tenantType, tenantId }
// BACKEND: production resolution happens at the edge/CDN from the Host header
// (see docs/MATLEARN_ROADMAP.md §1-2). Local dev has no wildcard DNS, so we
// fall back to a `?tenant=` query param.
//
// The bare root (no `?tenant=` param, no matching host) always means "MatLearn
// public homepage" — never a remembered tenant. Just previewing a school's
// public site via `?tenant=X` does NOT stick: that would silently hijack
// every future visit to "/" in the same browser. Only an actual login
// (rememberDevTenant, called from the login pages) persists a tenant, so
// authenticated /app/ pages — whose internal nav links carry no `?tenant=`
// param — stay correctly scoped for the rest of that logged-in session.
// forgetDevTenant() (called on logout) clears it again.

const DEV_TENANT_STORAGE_KEY = "matlearn:dev-tenant-id";

function notifyDevTenantChanged() {
  window.dispatchEvent(new Event("dev-tenant:changed"));
}

export function rememberDevTenant(tenantId) {
  window.localStorage.setItem(DEV_TENANT_STORAGE_KEY, tenantId);
  notifyDevTenantChanged();
}

export function forgetDevTenant() {
  window.localStorage.removeItem(DEV_TENANT_STORAGE_KEY);
  notifyDevTenantChanged();
}

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
    // Caller (TenantProvider) is responsible for clearing storage as a side
    // effect — resolveTenant just reports what the URL says right now.
    return { tenantType: "matlearn", tenantId: null };
  }
  if (devTenant) {
    return { tenantType: "school", tenantId: devTenant };
  }

  const storedTenantId = window.localStorage.getItem(DEV_TENANT_STORAGE_KEY);
  if (storedTenantId) {
    return { tenantType: "school", tenantId: storedTenantId };
  }

  return { tenantType: "matlearn", tenantId: null };
}
