import React, { useContext } from "react";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { tenantContext } from "../../../app/tenant-provider";

export default function SchoolContact() {
  const { tenant } = useContext(tenantContext);
  const publicSite = tenant?.publicSite;

  const details = [
    { icon: <FiMapPin />, label: "Address", value: publicSite?.address },
    { icon: <FiMail />, label: "Email", value: publicSite?.email },
    { icon: <FiPhone />, label: "Phone", value: publicSite?.phone },
  ].filter((detail) => detail.value);

  return (
    <div className="min-h-screen bg-white_bg px-[5%] py-[10%] transition-colors duration-500 lg:px-[10%] dark:bg-black_bg">
      <div className="space-y-1 text-center">
        <p className="text-3xl font-bold text-black dark:text-white">
          Contact {tenant?.name ?? "Us"}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We'd love to hear from you.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 md:w-80 dark:border-gray-800 dark:bg-black_card"
          >
            <div className="text-xl" style={{ color: "var(--brand-color)" }}>
              {detail.icon}
            </div>
            <div>
              <p className="font-bold text-black dark:text-white">{detail.label}</p>
              <p className="text-gray-600 dark:text-gray-300">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
