import { useContext, useEffect, useState } from "react";
import { FiSpeaker } from "react-icons/fi";
import { tenantContext } from "../../app/tenant-provider";
import { listAnnouncementsForTenant } from "../../mocks/announcements";

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// Shown on Student and Tutor dashboards (MATLEARN_ROADMAP.md §16 item 14) —
// renders nothing when the tenant has no announcements, so it never adds
// empty-state clutter to a dashboard that already has one.
export default function AnnouncementsBanner() {
  const { tenantId } = useContext(tenantContext);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const refresh = () => setAnnouncements(tenantId ? listAnnouncementsForTenant(tenantId) : []);
    refresh();
    window.addEventListener("announcements:changed", refresh);
    return () => window.removeEventListener("announcements:changed", refresh);
  }, [tenantId]);

  if (announcements.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black_bg sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <FiSpeaker className="text-2xl text-green" />
        <p className="text-lg font-bold text-black dark:text-white">Announcements</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {announcements.slice(0, 2).map((a) => (
          <div key={a.id} className="rounded-2xl bg-white_bg p-4 dark:bg-black">
            <div className="flex items-start justify-between gap-3">
              <p className="font-bold text-black dark:text-white">{a.title}</p>
              <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400">{formatDate(a.createdAt)}</p>
            </div>
            <p className="mt-1 text-gray-600 dark:text-gray-300">{a.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
