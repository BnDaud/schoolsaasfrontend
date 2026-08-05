import React, { useState } from "react";
import { FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import { RiPauseCircleLine, RiPlayCircleLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import Input from "../../../component/ui/input";
import Button from "../../../component/ui/button";
import TenantDetailModal from "../../../component/common/tenantdetailmodal";

/**
 * BACKEND CONTRACT
 *
 * GET /api/superadmin/tenants?search=&status=&page=1&pageSize=20
 * Auth: Bearer token, role=SuperAdmin
 * Response 200:
 * {
 *   "data": [
 *     {
 *       "tenantId": "t_123",
 *       "schoolName": "Compro College",
 *       "subdomain": "compro",              // used for tenant resolution, NOT path-based
 *       "adminEmail": "admin@compro.edu.ng",
 *       "plan": "Standard",                  // Trial | Standard | Premium
 *       "status": "active",                  // active | trial | suspended
 *       "studentCount": 480,
 *       "studentCap": 500,
 *       "createdAt": "2026-02-11"
 *     }
 *   ],
 *   "total": 128,
 *   "page": 1,
 *   "pageSize": 20
 * }
 *
 * POST /api/superadmin/tenants
 * Body: {
 *   "schoolName": "New School",
 *   "subdomain": "newschool",              // must be unique, used for tenant resolution
 *   "adminName": "Jane Doe",
 *   "adminEmail": "jane@newschool.edu.ng",
 *   "adminPhone": "+2348012345678",
 *   "plan": "Trial"
 * }
 * Response 201: { "tenantId": "t_999", ...createdTenant }
 * Response 409: { "error": "subdomain_taken" }
 * -> Backend should send admin invite/setup email with temp password on success.
 *
 * PATCH /api/superadmin/tenants/:tenantId
 * Body: partial { "status": "suspended" } | { "plan": "Premium" } | { "studentCap": 600 }
 * Response 200: updatedTenant
 *
 * DELETE /api/superadmin/tenants/:tenantId
 * Response 204 (soft-delete recommended, keep records for billing history)
 */
const mockTenants = [
  {
    tenantId: "t_123",
    schoolName: "Compro College",
    subdomain: "compro",
    adminEmail: "admin@compro.edu.ng",
    plan: "Standard",
    status: "active",
    studentCount: 480,
    studentCap: 500,
    createdAt: "2026-02-11",
    apiKey: "sk_live_compro_9f8a2c1d",
  },
  {
    tenantId: "t_456",
    schoolName: "Bright Kids",
    subdomain: "brightkids",
    adminEmail: "admin@brightkids.edu.ng",
    plan: "Trial",
    status: "trial",
    studentCount: 60,
    studentCap: 100,
    createdAt: "2026-06-02",
    apiKey: null,
  },
  {
    tenantId: "t_789",
    schoolName: "Greenfield Academy",
    subdomain: "greenfield",
    adminEmail: "admin@greenfield.edu.ng",
    plan: "Premium",
    status: "suspended",
    studentCount: 292,
    studentCap: 300,
    createdAt: "2025-11-30",
    apiKey: "sk_live_greenfield_44bb210e",
  },
];

const statusStyle = {
  active: "bg-green/10 text-green",
  trial: "bg-amber-500/10 text-amber-500",
  suspended: "bg-red-500/10 text-red-500",
};

export default function SuperAdminTenants() {
  const location = useLocation();
  const [tenants, setTenants] = useState(mockTenants); // TODO: GET /api/superadmin/tenants
  const [search, setSearch] = useState(location.state?.search || "");
  const [statusFilter, setStatusFilter] = useState(location.state?.statusFilter || "all");
  const [showCreate, setShowCreate] = useState(false);
  const [activeTenant, setActiveTenant] = useState(null);
  const [form, setForm] = useState({
    schoolName: "",
    subdomain: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    plan: "Trial",
  });

  const filtered = tenants
    .filter((tenant) => tenant.schoolName.toLowerCase().includes(search.toLowerCase()))
    .filter((tenant) => statusFilter === "all" || tenant.status === statusFilter);

  const updateForm = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleCreate = (e) => {
    e.preventDefault();
    // TODO: POST /api/superadmin/tenants with `form`, then refresh list from response.
    const newTenant = {
      tenantId: `t_${Date.now()}`,
      schoolName: form.schoolName,
      subdomain: form.subdomain,
      adminEmail: form.adminEmail,
      plan: form.plan,
      status: "trial",
      studentCount: 0,
      studentCap: 100,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setTenants((prev) => [newTenant, ...prev]);
    setForm({
      schoolName: "",
      subdomain: "",
      adminName: "",
      adminEmail: "",
      adminPhone: "",
      plan: "Trial",
    });
    setShowCreate(false);
  };

  const handleToggleSuspend = (e, tenant) => {
    e.stopPropagation();
    // TODO: PATCH /api/superadmin/tenants/:tenantId { status: "active" | "suspended" }
    setTenants((prev) =>
      prev.map((t) =>
        t.tenantId === tenant.tenantId
          ? { ...t, status: t.status === "suspended" ? "active" : "suspended" }
          : t,
      ),
    );
  };

  const handleDelete = (e, tenant) => {
    e.stopPropagation();
    if (!window.confirm(`Delete ${tenant.schoolName}? This cannot be undone.`)) return;
    // TODO: DELETE /api/superadmin/tenants/:tenantId
    setTenants((prev) => prev.filter((t) => t.tenantId !== tenant.tenantId));
  };

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">Tenants</p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Every school on the platform. Resolved by subdomain, not URL slug.
          </p>
        </div>
        <Button
          name={"Create Tenant"}
          icon={<FiPlus />}
          iconStyle={"text-lg"}
          action={() => setShowCreate(true)}
          style={
            "flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-green px-5 font-bold text-white dark:text-black"
          }
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="max-w-md flex-1">
          <Input
            name="search"
            placeholder="Search by school name"
            width="w-full"
            value={search}
            onChange={setSearch}
            icon={<FiSearch />}
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "trial", "suspended"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition-all duration-300 ${
                statusFilter === status
                  ? "bg-green text-white dark:text-black"
                  : "border border-gray-200 text-gray-600 hover:border-green hover:text-green dark:border-gray-800 dark:text-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-black_bg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <th className="p-4">School</th>
              <th className="p-4">Subdomain</th>
              <th className="p-4">Admin Email</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Students</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tenant) => (
              <tr
                key={tenant.tenantId}
                onClick={() => setActiveTenant(tenant)}
                className="cursor-pointer border-b border-gray-100 last:border-0 hover:bg-white_bg dark:border-gray-900 dark:hover:bg-black"
              >
                <td className="p-4 font-bold text-black dark:text-white">
                  {tenant.schoolName}
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {tenant.subdomain}.matlearn.app
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {tenant.adminEmail}
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{tenant.plan}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {tenant.studentCount}/{tenant.studentCap}
                </td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyle[tenant.status]}`}
                  >
                    {tenant.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-3 text-lg">
                    <button
                      type="button"
                      title={tenant.status === "suspended" ? "Activate" : "Suspend"}
                      onClick={(e) => handleToggleSuspend(e, tenant)}
                      className="text-amber-500 hover:scale-110 transition-transform"
                    >
                      {tenant.status === "suspended" ? (
                        <RiPlayCircleLine />
                      ) : (
                        <RiPauseCircleLine />
                      )}
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={(e) => handleDelete(e, tenant)}
                      className="text-red-500 hover:scale-110 transition-transform"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg space-y-5 rounded-2xl bg-white p-6 dark:bg-black_bg">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-black dark:text-white">
                Create Tenant
              </p>
              <button type="button" onClick={() => setShowCreate(false)}>
                <FiX className="text-2xl text-gray-500" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleCreate}>
              <Input
                name="schoolName"
                label="School Name"
                required
                width="w-full"
                value={form.schoolName}
                onChange={updateForm("schoolName")}
              />
              <Input
                name="subdomain"
                label="Subdomain"
                required
                placeholder="e.g. compro"
                width="w-full"
                value={form.subdomain}
                onChange={updateForm("subdomain")}
              />
              <Input
                name="adminName"
                label="School Admin Name"
                required
                width="w-full"
                value={form.adminName}
                onChange={updateForm("adminName")}
              />
              <Input
                name="adminEmail"
                label="School Admin Email"
                type="email"
                required
                width="w-full"
                value={form.adminEmail}
                onChange={updateForm("adminEmail")}
              />
              <Input
                name="adminPhone"
                label="School Admin Phone"
                width="w-full"
                value={form.adminPhone}
                onChange={updateForm("adminPhone")}
              />
              <Button
                name="Create Tenant"
                type="submit"
                style="flex h-11 w-full items-center justify-center rounded-xl bg-green font-bold text-white dark:text-black"
              />
            </form>
          </div>
        </div>
      )}

      {activeTenant && (
        <TenantDetailModal
          tenant={activeTenant}
          onClose={() => setActiveTenant(null)}
          onChange={(updated) => {
            if (updated.deleted) {
              setTenants((prev) => prev.filter((t) => t.tenantId !== updated.tenantId));
            } else {
              setTenants((prev) =>
                prev.map((t) => (t.tenantId === updated.tenantId ? { ...t, ...updated } : t)),
              );
            }
          }}
        />
      )}
    </div>
  );
}
