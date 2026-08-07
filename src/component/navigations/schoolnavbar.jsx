import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { tenantContext } from "../../app/tenant-provider";

// Distinct shell from MatLearn's own navbar (MATLEARN_ROADMAP.md §5
// SchoolPublicLayout vs MatLearnPublicLayout) — themed off the tenant's
// brand color instead of MatLearn's fixed green.
export default function SchoolNavbar() {
  const { tenant } = useContext(tenantContext);

  const links = [
    { name: "Home", to: "/" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <div className="fixed inset-0 top-0 left-0 z-50 h-15 w-full border-b border-gray-200 bg-white_bg/70 backdrop-blur-md transition duration-1000 dark:border-gray-800 dark:bg-black_bg/40">
      <div className="flex h-15 items-center justify-between px-[5%] lg:px-[10%]">
        <p className="text-lg font-bold" style={{ color: "var(--brand-color)" }}>
          {tenant?.name ?? "School"}
        </p>

        <ul className="hidden gap-4 capitalize text-black/40 lg:flex dark:text-white/40">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-black dark:text-white"
                    : "hover:text-black dark:hover:text-white"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to={"/auth/login"}
          className="rounded-xl px-4 py-2 text-sm font-bold text-white"
          style={{ backgroundColor: "var(--brand-color)" }}
        >
          Student / Staff Login
        </Link>
      </div>
    </div>
  );
}
