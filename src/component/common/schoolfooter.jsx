import React, { useContext } from "react";
import { FaRegCopyright } from "react-icons/fa";
import { tenantContext } from "../../app/tenant-provider";

export default function SchoolFooter() {
  const { tenant } = useContext(tenantContext);
  const year = 2026;

  return (
    <>
      <hr className="text-gray-200 dark:text-gray-800" />
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-[5%] py-6 transition-all duration-700 lg:px-[10%] dark:bg-black_card">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FaRegCopyright />
          <p>{`${year} ${tenant?.name ?? "School"}. All rights reserved.`}</p>
        </div>
        {tenant?.publicSite?.email && (
          <p className="text-gray-700 dark:text-gray-300">{tenant.publicSite.email}</p>
        )}
      </div>
    </>
  );
}
