// Global e-library (MatLearn's own resources) + per-tenant resources, with
// demo access_level states (MATLEARN_ROADMAP.md §12).
// BACKEND: GET /api/library/global ; GET /api/schools/{tenantId}/library

const globalLibrary = [
  { resourceId: "lib-waec-past-questions-2023", title: "WAEC Past Questions 2023", type: "PDF", scope: "global", accessLevel: "free" },
  { resourceId: "lib-jamb-syllabus-2025", title: "JAMB Syllabus 2025", type: "PDF", scope: "global", accessLevel: "subscriber" },
  { resourceId: "lib-neco-past-questions-2024", title: "NECO Past Questions 2024", type: "PDF", scope: "global", accessLevel: "subscriber" },
];

const tenantLibrary = {
  greenfield: [
    { resourceId: "greenfield-lib-1", title: "Greenfield SS2 Biology Notes", type: "PDF", scope: "tenant", tenantId: "greenfield", accessLevel: "school" },
  ],
  bluecrest: [
    { resourceId: "bluecrest-lib-1", title: "Bluecrest Grade 9 Chemistry Workbook", type: "PDF", scope: "tenant", tenantId: "bluecrest", accessLevel: "school" },
  ],
  royalheights: [
    { resourceId: "royalheights-lib-1", title: "Royal Heights SS1 Biology Practicals", type: "PDF", scope: "tenant", tenantId: "royalheights", accessLevel: "school" },
  ],
};

export function listGlobalLibrary() {
  return globalLibrary;
}

export function listTenantLibrary(tenantId) {
  return tenantLibrary[tenantId] ?? [];
}

export function getResourceById(resourceId) {
  return (
    globalLibrary.find((r) => r.resourceId === resourceId) ??
    Object.values(tenantLibrary)
      .flat()
      .find((r) => r.resourceId === resourceId) ??
    null
  );
}
