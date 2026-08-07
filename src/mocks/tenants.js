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
    publicSite: {
      motto: "Where Character Meets Excellence",
      about:
        "Greenfield Academy has prepared students for WAEC, JAMB, and NECO success since 2005, with a focus on Science and Art tracks from JSS1 through SS3.",
      address: "12 Greenfield Road, Ikeja, Lagos",
      email: "info@greenfield.matlearn.com",
      phone: "+234 801 234 5678",
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
    publicSite: {
      motto: "Building Global Thinkers",
      about:
        "Bluecrest College runs a Grade 7-10 international curriculum with dedicated Science and Humanities tracks, and a strong record in JAMB and WAEC prep.",
      address: "45 Bluecrest Avenue, Abuja",
      email: "info@bluecrest.matlearn.com",
      phone: "+234 802 345 6789",
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
    publicSite: {
      motto: "Rising to Every Height",
      about:
        "Royal Heights School is a growing JSS1-SS1 school with Science and Art departments, focused on personalized attention in smaller class sizes.",
      address: "8 Royal Close, Port Harcourt",
      email: "info@royalheights.matlearn.com",
      phone: "+234 803 456 7890",
    },
  },
];

export function getTenantById(tenantId) {
  return tenants.find((tenant) => tenant.tenantId === tenantId) ?? null;
}

export function listTenants() {
  return tenants;
}
