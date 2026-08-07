// Global e-library (MatLearn's own resources) + per-tenant resources, with
// demo access_level states (MATLEARN_ROADMAP.md §12).
// BACKEND: GET /api/library/global ; GET /api/schools/{tenantId}/library ;
//   POST /api/schools/{tenantId}/library { title, type, url } — resources are
//   external links, not uploaded files, so the backend only ever stores a
//   URL reference, never file content.

const globalLibrary = [
  { resourceId: "lib-waec-past-questions-2023", title: "WAEC Past Questions 2023", type: "PDF", scope: "global", accessLevel: "free" },
  { resourceId: "lib-jamb-syllabus-2025", title: "JAMB Syllabus 2025", type: "PDF", scope: "global", accessLevel: "subscriber" },
  { resourceId: "lib-neco-past-questions-2024", title: "NECO Past Questions 2024", type: "PDF", scope: "global", accessLevel: "subscriber" },
];

const tenantLibrarySeed = {
  greenfield: [
    {
      resourceId: "greenfield-lib-1",
      title: "Greenfield SS2 Biology Notes",
      type: "Link",
      scope: "tenant",
      tenantId: "greenfield",
      accessLevel: "school",
      url: "https://example.com/greenfield-ss2-biology-notes",
    },
  ],
  bluecrest: [
    {
      resourceId: "bluecrest-lib-1",
      title: "Bluecrest Grade 9 Chemistry Workbook",
      type: "Link",
      scope: "tenant",
      tenantId: "bluecrest",
      accessLevel: "school",
      url: "https://example.com/bluecrest-grade9-chemistry-workbook",
    },
  ],
  royalheights: [
    {
      resourceId: "royalheights-lib-1",
      title: "Royal Heights SS1 Biology Practicals",
      type: "Link",
      scope: "tenant",
      tenantId: "royalheights",
      accessLevel: "school",
      url: "https://example.com/royalheights-ss1-biology-practicals",
    },
  ],
};

export function listGlobalLibrary() {
  return globalLibrary;
}

// Static seed only — kept for callers that don't need admin-added resources.
export function listTenantLibrary(tenantId) {
  return tenantLibrarySeed[tenantId] ?? [];
}

// localStorage-backed, namespaced per tenant (same pattern as
// utils/tutorQuestionBank.js) — lets a school admin add link-based resources
// without a backend, and without leaking into another tenant's library.
const tenantLibraryStorageKeyFor = (tenantId) => `matlearn:tenant-library:${tenantId ?? "default"}`;

export function loadTenantLibrary(tenantId) {
  const seed = listTenantLibrary(tenantId);
  if (typeof window === "undefined") return seed;

  try {
    const stored = window.localStorage.getItem(tenantLibraryStorageKeyFor(tenantId));
    return stored ? JSON.parse(stored) : seed;
  } catch {
    return seed;
  }
}

export function saveTenantLibrary(tenantId, resources) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(tenantLibraryStorageKeyFor(tenantId), JSON.stringify(resources));
}

export function getResourceById(resourceId) {
  return (
    globalLibrary.find((r) => r.resourceId === resourceId) ??
    Object.values(tenantLibrarySeed)
      .flat()
      .find((r) => r.resourceId === resourceId) ??
    null
  );
}
