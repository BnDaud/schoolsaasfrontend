import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { PiList } from "react-icons/pi";
import { globalContext } from "../../context/globalcontext";
import {
  listNotificationsForUser,
  markAllNotificationsRead,
  markNotificationRead,
} from "../../mocks/notifications";

// Global search MVP scope is Admin/Tutor only (MATLEARN_ROADMAP.md §16 item
// 14's table: "Needs scoping rules per role ... MVP for admin/tutor, Phase 2
// for full-text/library search") — jumps into that role's own directory
// page, reusing the location.state.search pattern already used by
// superadmintenants.jsx, rather than building a separate global index.
const SEARCH_DESTINATION_BY_ROLE = {
  Admin: "/app/admin-users",
  Tutor: "/app/students",
};

function timeAgo(isoDate) {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function StatusBanner({ open }) {
  const { name, schoolName, role, brand, userId } = useContext(globalContext);
  const navigate = useNavigate();
  const displayName = role === "SuperAdmin" ? brand?.brandName : schoolName;
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [headerSearch, setHeaderSearch] = useState("");
  const unreadCount = notifications.filter((n) => !n.read).length;
  const searchDestination = SEARCH_DESTINATION_BY_ROLE[role];

  const handleHeaderSearch = (e) => {
    e.preventDefault();
    if (!searchDestination || !headerSearch.trim()) return;
    navigate(searchDestination, { state: { search: headerSearch.trim() } });
  };

  useEffect(() => {
    const refresh = () => setNotifications(userId ? listNotificationsForUser(userId) : []);
    refresh();
    window.addEventListener("notifications:changed", refresh);
    return () => window.removeEventListener("notifications:changed", refresh);
  }, [userId]);

  const handleMarkRead = (id) => markNotificationRead(id);

  const handleMarkAllRead = () => {
    if (userId) markAllNotificationsRead(userId);
  };

  return (
    <div className="fixed top-0 z-30  flex h-[10vh]  items-center xl:w-5/6 w-full   bg-white dark:bg-black_bg border-b border-gray-200 dark:border-gray-700  transition-all duration-700">
      <p
        className="xl:hidden cursor-pointer xl:px-[0%] px-[3%] "
        onClick={() => open()}
      >
        {" "}
        <PiList className="text-3xl text-black dark:text-white" />
      </p>
      <div className="flex justify-between items-center xl:px-[3%] px-[0%] w-full h-full ">
        {" "}
        <div>
          <p className="font-semibold text-xl text-black dark:text-white">
            {displayName}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{role} Dashboard</p>
        </div>
        <div className="flex h-full items-center gap-6 text-black dark:text-white">
          {searchDestination && (
            <form onSubmit={handleHeaderSearch} className="hidden md:block">
              <div className="flex h-10 w-56 items-center gap-2 rounded-2xl bg-white_bg px-4 dark:bg-black">
                <FiSearch className="text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  placeholder={role === "Admin" ? "Search users..." : "Search students..."}
                  className="w-full bg-transparent text-sm outline-none dark:text-white"
                />
              </div>
            </form>
          )}
          <div className="relative">
            <div
              className="relative flex cursor-pointer items-center justify-center size-10"
              onClick={() => setShowNotifications((s) => !s)}
            >
              <FaRegBell className="text-xl" />
              {unreadCount > 0 && (
                <p className="absolute flex items-center justify-center top-0 right-0 bg-red-500 size-4 rounded-full text-xs text-white ">
                  {unreadCount}
                </p>
              )}
            </div>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 top-12 z-50 w-80 max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-800 dark:bg-black_bg">
                  <div className="flex items-center justify-between px-2 pb-2">
                    <p className="font-bold text-black dark:text-white">Notifications</p>
                    {unreadCount > 0 && (
                      <p
                        className="cursor-pointer text-sm font-semibold text-green"
                        onClick={handleMarkAllRead}
                      >
                        Mark all read
                      </p>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <p className="px-2 py-4 text-center text-gray-500 dark:text-gray-400">
                      No notifications yet.
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => handleMarkRead(n.id)}
                          className={`cursor-pointer rounded-xl p-3 transition-all duration-300 hover:bg-white_bg dark:hover:bg-black ${
                            n.read ? "" : "bg-green/5"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-sm text-black dark:text-white">
                              {n.title}
                            </p>
                            {!n.read && <span className="mt-1 size-2 shrink-0 rounded-full bg-green" />}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{n.body}</p>
                          <p className="mt-1 text-xs text-gray-400">{timeAgo(n.createdAt)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex gap-3 h-full items-center">
            <p
              className="flex items-center justify-center text-2xl font-bold rounded-full size-10 text-white"
              style={{ backgroundColor: "var(--brand-color)" }}
            >
              {name?.[0] || "A"}
            </p>{" "}
            <p className="text-lg font-semibold w-3/5 truncate"> {name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
