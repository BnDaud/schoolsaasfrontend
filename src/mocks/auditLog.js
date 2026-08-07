// Admin/Super Admin audit trail (MATLEARN_ROADMAP.md §32).
// BACKEND: GET /api/schools/{tenantId}/audit-log ; GET /api/platform/audit-log (Super Admin, tenantId "platform")

const auditLog = [
  { id: "log1", tenantId: "greenfield", actorId: "greenfield-admin-1", action: "user.created", target: "greenfield-tutor-1", createdAt: "2026-07-20T11:00:00Z" },
  { id: "log2", tenantId: "greenfield", actorId: "greenfield-admin-1", action: "result.released", target: "greenfield-r2", createdAt: "2026-08-01T09:00:00Z" },
  { id: "log3", tenantId: "platform", actorId: "super-1", action: "tenant.created", target: "royalheights", createdAt: "2026-06-15T10:00:00Z" },
];

export function listAuditLogForTenant(tenantId) {
  return auditLog.filter((entry) => entry.tenantId === tenantId);
}
