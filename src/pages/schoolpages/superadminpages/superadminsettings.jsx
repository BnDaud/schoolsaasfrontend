import React, { useContext, useState } from "react";
import { FiKey, FiPlus, FiSettings, FiTrash2, FiUserPlus, FiX } from "react-icons/fi";
import { globalContext } from "../../../context/globalcontext";
import Input from "../../../component/ui/input";
import Button from "../../../component/ui/button";

/**
 * BACKEND CONTRACT
 * GET /api/superadmin/settings -> platform-level config (default plan limits, billing keys, support email)
 * PATCH /api/superadmin/settings -> update above
 *
 * Branding (this tenant's look — color/logo/name/favicon):
 * GET /api/tenant/branding -> { "color": "#16a34a", "logoUrl": "...", "brandName": "...", "faviconUrl": "..." }
 * PATCH /api/tenant/branding -> body: partial of same shape, response 200: updated object.
 * Applied live via globalContext.brand — see globalcontext.jsx.
 *
 * Super Admin accounts (platform operators, separate from any tenant's users):
 * GET /api/superadmin/admins -> [{ "adminId": "sa_1", "name": "...", "email": "...", "createdAt": "..." }]
 * POST /api/superadmin/admins  Body: { "name", "email" } -> backend generates temp password, emails invite.
 *   Response 201: { "adminId": "sa_2", ...created }
 * DELETE /api/superadmin/admins/:adminId -> Response 204. Backend must block self-delete (own adminId)
 *   and block deleting the last remaining super admin — platform can never end up with zero operators.
 *
 * PATCH /api/superadmin/me/password  Body: { "currentPassword", "newPassword" }
 *   Response 200 on success, 401 if currentPassword wrong. Self-service only — cannot target other admins.
 */
const mockSuperAdmins = [
  { adminId: "sa_1", name: "Lawal Sulaimon", email: "lawal.sulaimon@adeptengr.com", createdAt: "2026-01-04" },
  { adminId: "sa_2", name: "Amaka Obi", email: "amaka@matlearn.app", createdAt: "2026-03-19" },
];

export default function SuperAdminSettings() {
  const { brand, setBrand, name } = useContext(globalContext);
  const [form, setForm] = useState(brand);
  const [admins, setAdmins] = useState(mockSuperAdmins); // TODO: GET /api/superadmin/admins
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  const update = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: PATCH /api/tenant/branding with `form`, then setBrand(response) on success.
    setBrand(form);
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    // TODO: POST /api/superadmin/admins with `newAdmin`, then push response, not this mock row.
    setAdmins((prev) => [
      ...prev,
      { adminId: `sa_${Date.now()}`, ...newAdmin, createdAt: new Date().toISOString().slice(0, 10) },
    ]);
    setNewAdmin({ name: "", email: "" });
    setShowAddAdmin(false);
  };

  const handleDeleteAdmin = (admin) => {
    if (admin.name === name) return; // backend also enforces: can't self-delete
    if (!window.confirm(`Remove ${admin.name} as a Super Admin?`)) return;
    // TODO: DELETE /api/superadmin/admins/:adminId
    setAdmins((prev) => prev.filter((a) => a.adminId !== admin.adminId));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New password and confirmation don't match.");
      return;
    }
    // TODO: PATCH /api/superadmin/me/password { currentPassword, newPassword }
    setPasswordMessage("Password updated.");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex items-center gap-2">
        <FiSettings className="text-2xl" style={{ color: "var(--brand-color)" }} />
        <p className="text-3xl font-bold text-black dark:text-white">
          Platform Settings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg"
        >
          <p className="text-lg font-bold text-black dark:text-white">Branding</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Color, logo, name, and favicon — applied live across the dashboard.
          </p>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={form.color}
              onChange={(e) => update("color")(e.target.value)}
              className="h-11 w-16 cursor-pointer rounded-xl border border-gray-200 dark:border-gray-800"
            />
            <Input
              name="color"
              label="Brand Color"
              width="w-full"
              value={form.color}
              onChange={update("color")}
            />
          </div>

          <Input
            name="brandName"
            label="Brand Name"
            width="w-full"
            value={form.brandName}
            onChange={update("brandName")}
          />
          <Input
            name="logoUrl"
            label="Logo URL"
            placeholder="https://..."
            width="w-full"
            value={form.logoUrl}
            onChange={update("logoUrl")}
          />
          <Input
            name="faviconUrl"
            label="Favicon URL"
            placeholder="https://..."
            width="w-full"
            value={form.faviconUrl}
            onChange={update("faviconUrl")}
          />

          <Button
            name="Save Branding"
            type="submit"
            style="flex h-11 w-full items-center justify-center rounded-xl font-bold text-white bg-[var(--brand-color)]"
          />
        </form>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <p className="text-lg font-bold text-black dark:text-white">Live Preview</p>
          <div className="flex items-center gap-3">
            {form.logoUrl ? (
              <img src={form.logoUrl} alt="logo" className="size-10 rounded-lg object-cover" />
            ) : (
              <div
                className="flex size-10 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: form.color }}
              >
                {form.brandName?.[0] || "M"}
              </div>
            )}
            <p className="font-bold text-black dark:text-white">{form.brandName}</p>
          </div>
          <button
            type="button"
            className="h-11 w-full rounded-xl font-bold text-white"
            style={{ backgroundColor: form.color }}
          >
            Primary Button
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Favicon: {form.faviconUrl}
          </p>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_380px]">
        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-black dark:text-white">Super Admins</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Platform operators — not tied to any tenant.
              </p>
            </div>
            <Button
              name="Add Super Admin"
              icon={<FiUserPlus />}
              iconStyle="text-lg"
              action={() => setShowAddAdmin(true)}
              style="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[var(--brand-color)] px-4 font-bold text-white"
            />
          </div>

          <div className="space-y-3">
            {admins.map((admin) => (
              <div
                key={admin.adminId}
                className="flex items-center justify-between rounded-xl bg-white_bg p-4 dark:bg-black"
              >
                <div>
                  <p className="font-bold text-black dark:text-white">
                    {admin.name} {admin.name === name && <span className="text-xs text-gray-500">(You)</span>}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{admin.email}</p>
                </div>
                <button
                  type="button"
                  title={admin.name === name ? "Can't remove yourself" : "Remove"}
                  disabled={admin.name === name}
                  onClick={() => handleDeleteAdmin(admin)}
                  className={`text-lg ${admin.name === name ? "cursor-not-allowed text-gray-400" : "text-red-500 hover:scale-110"} transition-transform`}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2">
            <FiKey className="text-xl" style={{ color: "var(--brand-color)" }} />
            <p className="text-lg font-bold text-black dark:text-white">Change My Password</p>
          </div>
          <form onSubmit={handleChangePassword} className="space-y-3">
            <Input
              name="currentPassword"
              label="Current Password"
              type="password"
              required
              width="w-full"
              value={passwordForm.currentPassword}
              onChange={(v) => setPasswordForm((prev) => ({ ...prev, currentPassword: v }))}
            />
            <Input
              name="newPassword"
              label="New Password"
              type="password"
              required
              width="w-full"
              value={passwordForm.newPassword}
              onChange={(v) => setPasswordForm((prev) => ({ ...prev, newPassword: v }))}
            />
            <Input
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              required
              width="w-full"
              value={passwordForm.confirmPassword}
              onChange={(v) => setPasswordForm((prev) => ({ ...prev, confirmPassword: v }))}
            />
            {passwordMessage && (
              <p className="text-sm text-gray-600 dark:text-gray-300">{passwordMessage}</p>
            )}
            <Button
              name="Update Password"
              type="submit"
              style="flex h-11 w-full items-center justify-center rounded-xl bg-[var(--brand-color)] font-bold text-white"
            />
          </form>
        </section>
      </div>

      {showAddAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 dark:bg-black_bg">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-black dark:text-white">Add Super Admin</p>
              <button type="button" onClick={() => setShowAddAdmin(false)}>
                <FiX className="text-2xl text-gray-500" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleAddAdmin}>
              <Input
                name="name"
                label="Full Name"
                required
                width="w-full"
                value={newAdmin.name}
                onChange={(v) => setNewAdmin((prev) => ({ ...prev, name: v }))}
              />
              <Input
                name="email"
                label="Email"
                type="email"
                required
                width="w-full"
                value={newAdmin.email}
                onChange={(v) => setNewAdmin((prev) => ({ ...prev, email: v }))}
              />
              <p className="text-xs text-gray-500">
                Temp password + invite link sent to this email once backend is wired.
              </p>
              <Button
                name="Add Super Admin"
                icon={<FiPlus />}
                type="submit"
                style="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-color)] font-bold text-white"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
