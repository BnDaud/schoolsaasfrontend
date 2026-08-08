// Admin/Super Admin audit trail (MATLEARN_ROADMAP.md §32).
// BACKEND: GET /api/schools/{tenantId}/audit-log ; GET /api/platform/audit-log

// Tenant-internal activity (a school admin managing their own users/results)
// stays scoped to that school — Super Admin never sees it here. Per §14,
// Super Admin gets platform metadata only, never a tenant's own business.
const auditLog = [
  { id: "log1", tenantId: "greenfield", actorId: "greenfield-admin-1", action: "user.created", target: "greenfield-tutor-1", createdAt: "2026-07-20T11:00:00Z" },
  { id: "log2", tenantId: "greenfield", actorId: "greenfield-admin-1", action: "result.released", target: "greenfield-r2", createdAt: "2026-08-01T09:00:00Z" },
  { id: "log4", tenantId: "bluecrest", actorId: "bluecrest-admin-1", action: "user.created", target: "bluecrest-tutor-1", createdAt: "2026-07-22T13:00:00Z" },
  { id: "log5", tenantId: "bluecrest", actorId: "bluecrest-admin-1", action: "result.released", target: "bluecrest-r2", createdAt: "2026-08-02T10:00:00Z" },
  { id: "log6", tenantId: "royalheights", actorId: "royalheights-admin-1", action: "user.created", target: "royalheights-tutor-1", createdAt: "2026-07-25T09:00:00Z" },
];

export function listAuditLogForTenant(tenantId) {
  return auditLog.filter((entry) => entry.tenantId === tenantId);
}

// Platform-operator actions only — things done TO the platform itself
// (tenant lifecycle, plan changes, super admin roster), never a tenant's
// internal activity. This is what Super Admin's own audit log shows (§4.3).
const platformAuditLog = [
  {
    id: "plog1",
    actorId: "super-1",
    action: "tenant.created",
    target: "Royal Heights School",
    createdAt: "2026-06-15T10:00:00Z",
  },
  {
    id: "plog2",
    actorId: "super-1",
    action: "tenant.plan_changed",
    target: "Greenfield Academy → Standard",
    createdAt: "2026-06-20T09:30:00Z",
  },
  {
    id: "plog3",
    actorId: "super-1",
    action: "superadmin.invited",
    target: "Amaka Obi",
    createdAt: "2026-07-01T08:00:00Z",
  },
  {
    id: "plog4",
    actorId: "super-1",
    action: "tenant.suspended",
    target: "Bluecrest College",
    createdAt: "2026-07-10T14:00:00Z",
  },
  {
    id: "plog5",
    actorId: "super-1",
    action: "tenant.reactivated",
    target: "Bluecrest College",
    createdAt: "2026-07-12T11:00:00Z",
  },
];

export function listPlatformAuditLog() {
  return platformAuditLog;
}
