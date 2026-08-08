import React, { useContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiBookOpen, FiSearch, FiUserCheck, FiUsers } from "react-icons/fi";
import Input from "../../../component/ui/input";
import { tenantContext } from "../../../app/tenant-provider";
import { listUsersForTenant } from "../../../mocks/users";
import { listClasses } from "../../../mocks/academicStructure";
import PromotionHistoryModal from "./promotionHistoryModal";

export default function AdminUsers() {
  const location = useLocation();
  const { tenantId } = useContext(tenantContext);
  const [searchTerm, setSearchTerm] = useState(location.state?.search || "");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const users = useMemo(() => (tenantId ? listUsersForTenant(tenantId) : []), [tenantId]);
  const classes = useMemo(() => (tenantId ? listClasses(tenantId) : []), [tenantId]);
  const classNameFor = (classId) => classes.find((c) => c.classId === classId)?.name ?? classId ?? "—";

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const label = user.role === "Student" ? classNameFor(user.classId) : user.role;
    const matchesSearch =
      searchTerm.trim() === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      label.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesRole && matchesSearch;
  });

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
          value={searchTerm}
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
            <p className="font-bold">Students</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {users.filter((user) => user.role === "Student").length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black_bg">
          <div className="flex items-center gap-2 text-green">
            <FiBookOpen />
            <p className="font-bold">Tutors</p>
          </div>
          <p className="mt-3 text-3xl font-bold text-black dark:text-white">
            {users.filter((user) => user.role === "Tutor").length}
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
          {filteredUsers.map((user) => {
            const isStudent = user.role === "Student";
            return (
              <div
                key={user.id}
                onClick={isStudent ? () => setSelectedStudent(user) : undefined}
                className={`rounded-2xl border border-gray-200 bg-white_bg p-4 dark:border-gray-800 dark:bg-black ${
                  isStudent ? "cursor-pointer transition-all duration-300 hover:border-green" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-black dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {user.role} - {isStudent ? classNameFor(user.classId) : user.email}
                    </p>
                  </div>
                  {isStudent && (
                    <p className="rounded-full bg-green/10 px-3 py-1 text-sm font-bold text-green">
                      Promotion History
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedStudent && (
        <PromotionHistoryModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
}
