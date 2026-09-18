import { X, MapPin, Users, Clock, Sparkles } from "lucide-react";
import { PriorityBadge, StatusBadge } from "./Badges";
import Timeline from "./Timeline";
import { useApp } from "../context/AppContext";

function fmt(iso) {
  return new Date(iso).toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
  });
}

const ACTIONS = {
  Reported: { next: "Acknowledged", label: "Acknowledge" },
  Acknowledged: { next: "Responding", label: "Start Response" },
  Investigating: { next: "Responding", label: "Start Response" },
  Responding: { next: "Resolved", label: "Mark Resolved" },
};

export default function IncidentModal({ incident, onClose, readOnly = false }) {
  const { updateStatus } = useApp();
  const action = ACTIONS[incident.status];

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-ink-950/50 animate-toastIn" onClick={onClose} />
      <div className="animate-slideUp relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-elevated sm:rounded-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-ink-400 hover:text-ink-700" aria-label="Close">
          <X size={18} />
        </button>

        <p className="text-xs font-mono text-ink-400">{incident.id}</p>
        <h2 className="mt-1 font-display text-xl font-semibold text-ink-900">{incident.category}</h2>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <PriorityBadge level={incident.priorityLevel} />
          <StatusBadge status={incident.status} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-ink-600">
            <MapPin size={14} /> {incident.location}
          </div>
          <div className="flex items-center gap-1.5 text-ink-600">
            <Users size={14} /> {incident.peopleAffected} affected
          </div>
          <div className="col-span-2 flex items-center gap-1.5 text-ink-500 text-xs">
            <Clock size={13} /> Reported {fmt(incident.reportedAt)}
          </div>
        </div>

        <p className="mt-4 rounded-lg bg-ink-50 p-3 text-sm text-ink-700">{incident.description}</p>

        {incident.priorityExplanation && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-teal-50 p-3 text-xs text-brand-700">
            <Sparkles size={14} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">AI-Inspired Priority Analysis · Score {incident.priorityScore}/100</p>
              <p className="mt-0.5 text-brand-600">{incident.priorityExplanation}</p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">Timeline</p>
          <Timeline timeline={incident.timeline} currentStatus={incident.status} />
        </div>

        {!readOnly && (
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            {action ? (
              <button
                onClick={() => updateStatus(incident.id, action.next)}
                className="flex-1 rounded-xl bg-ink-900 px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                {action.label}
              </button>
            ) : (
              <div className="flex-1 rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700">
                Incident resolved
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
