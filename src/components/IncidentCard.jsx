import { MapPin, Clock, Users } from "lucide-react";
import { PriorityBadge, StatusBadge } from "./Badges";

function timeAgo(iso) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function IncidentCard({ incident, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border border-ink-100 bg-white p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink-900">{incident.category}</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-ink-500">
            <MapPin size={12} /> {incident.location}
          </div>
        </div>
        <PriorityBadge level={incident.priorityLevel} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <StatusBadge status={incident.status} />
        <div className="flex items-center gap-3 text-xs text-ink-400">
          {incident.peopleAffected > 0 && (
            <span className="flex items-center gap-1">
              <Users size={12} /> {incident.peopleAffected}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={12} /> {timeAgo(incident.reportedAt)}
          </span>
        </div>
      </div>
    </button>
  );
}
