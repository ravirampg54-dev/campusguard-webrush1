import { PhoneCall, MapPin, Clock3 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { EMERGENCY_CONTACTS } from "../data/mockIncidents";
import { useApp } from "../context/AppContext";

export default function AdminContacts() {
  const { pushToast } = useApp();
  return (
    <Sidebar>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Emergency Contacts</h1>
        <p className="mt-1 text-sm text-ink-500">Key contacts for coordinating campus emergency response.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EMERGENCY_CONTACTS.map((c) => (
          <div key={c.id} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
            <p className="text-sm font-semibold text-ink-900">{c.name}</p>
            <p className="mt-0.5 text-xs text-ink-500">{c.role}</p>
            <div className="mt-4 space-y-2 text-xs text-ink-600">
              <div className="flex items-center gap-1.5"><Clock3 size={13} /> {c.availability}</div>
              <div className="flex items-center gap-1.5"><MapPin size={13} /> {c.location}</div>
            </div>
            <button
              onClick={() => pushToast(`Calling ${c.name} at ${c.phone}... (simulated)`)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-ink-900 px-3 py-2.5 text-xs font-semibold text-white hover:-translate-y-0.5 transition-transform"
            >
              <PhoneCall size={14} /> Call {c.phone}
            </button>
          </div>
        ))}
      </div>
    </Sidebar>
  );
}
