import { useState } from "react";
import Navbar from "../components/Navbar";
import IncidentCard from "../components/IncidentCard";
import IncidentModal from "../components/IncidentModal";
import { useApp } from "../context/AppContext";

export default function StudentIncidents() {
  const { incidents } = useApp();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("Active");

  const list = incidents.filter((i) => (filter === "Active" ? i.status !== "Resolved" : true));

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink-900">Active Incidents</h1>
            <p className="mt-1 text-sm text-ink-500">Track the status of reported emergencies on campus.</p>
          </div>
          <div className="flex rounded-lg border border-ink-100 bg-white p-1">
            {["Active", "All"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === f ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center">
            <p className="text-sm text-ink-500">Nothing to show here.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((inc) => (
              <IncidentCard key={inc.id} incident={inc} onClick={() => setSelected(inc)} />
            ))}
          </div>
        )}
      </main>
      {selected && <IncidentModal incident={selected} onClose={() => setSelected(null)} readOnly />}
    </div>
  );
}
