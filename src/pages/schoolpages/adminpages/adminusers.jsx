import React, { useMemo, useState } from "react";
import { FiSearch, FiShield, FiUserCheck, FiUsers } from "react-icons/fi";
import Input from "../../../component/ui/input";

const users = [
  { id: 1, name: "Lawal Sulaimon", role: "Student", className: "SS2", status: "Active" },
  { id: 2, name: "Dr Musa Bello", role: "Tutor", className: "JSS1, SS3", status: "Active" },
  { id: 3, name: "Amina Yusuf", role: "Student", className: "SS1", status: "Active" },
  { id: 4, name: "Admin Officer", role: "Admin", className: "School Office", status: "Active" },
  { id: 5, name: "Peter James", role: "Student", className: "JSS2", status: "Inactive" },
];

const getStatusStyle = (status) => {
  if (status === "Active") return "bg-green/10 text-green";
  return "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300";
};

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesSearch =
        searchTerm.trim() === "" ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.className.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesRole && matchesSearch;
    });
  }, [roleFilter, searchTerm]);

  return (
    <div className="min-h-screen w-full space-y-5 bg-white_bg px-[3%] py-[2%] transition-all duration-700 dark:bg-black">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-black dark:text-white">
            Users
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage admin, tutor, and student accounts.
          </p>
        </div>
        <Input
          type={"text"}
          width={"lg:w-80 w-full"}
          placeholder={"Search users..."}
          onChange={setSearchTerm}
          icon={<FiSearch className="text-lg" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUsers />
            <p className="font-bold">Total Users</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {users.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiUserCheck />
            <p className="font-bold">Active</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {users.filter((user) => user.status === "Active").length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiShield />
            <p className="font-bold">Admins</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {users.filter((user) => user.role === "Admin").length}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-lg font-bold text-black dark:text-white">
            User Directory
          </p>
          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="h-11 rounded-2xl border border-gray-200 bg-white_bg px-4 font-bold text-gray-700 outline-none focus:border-green dark:border-gray-800 dark:bg-black dark:text-gray-200"
          >
            <option>All</option>
            <option>Admin</option>
            <option>Tutor</option>
            <option>Student</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="rounded-2xl border border-gray-200 bg-white_bg p-4 dark:border-gray-800 dark:bg-black"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-black dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {user.role} - {user.className}
                  </p>
                </div>
                <p
                  className={`rounded-full px-3 py-1 text-sm font-bold ${getStatusStyle(
                    user.status,
                  )}`}
                >
                  {user.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
