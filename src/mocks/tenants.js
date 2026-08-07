// Repository-shaped mock — same function signatures a real API-backed module
// will expose later (see docs/MATLEARN_ROADMAP.md §12), so swapping mock for
// API is a one-file change, not a component rewrite.

const tenants = [
  {
    tenantId: "greenfield",
    name: "Greenfield Academy",
    brand: {
      color: "#16a34a",
      logoUrl: "",
      brandName: "Greenfield Academy",
      faviconUrl: "/vite.svg",
    },
  },
  {
    tenantId: "bluecrest",
    name: "Bluecrest College",
    brand: {
      color: "#2563eb",
      logoUrl: "",
      brandName: "Bluecrest College",
      faviconUrl: "/vite.svg",
    },
  },
  {
    tenantId: "royalheights",
    name: "Royal Heights School",
    brand: {
      color: "#dc2626",
      logoUrl: "",
      brandName: "Royal Heights School",
      faviconUrl: "/vite.svg",
    },
  },
];

export function getTenantById(tenantId) {
  return tenants.find((tenant) => tenant.tenantId === tenantId) ?? null;
}

export function listTenants() {
  return tenants;
}
