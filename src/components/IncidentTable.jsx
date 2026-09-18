import { useMemo, useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { PriorityBadge, StatusBadge } from "./Badges";
import { CATEGORIES, STATUS_FLOW } from "../data/mockIncidents";
import { priorityRank } from "../utils/priorityCalculator";

function fmt(iso) {
  return new Date(iso).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit", month: "short", day: "numeric" });
}

export default function IncidentTable({ incidents, onView }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortDesc, setSortDesc] = useState(true);

  const filtered = useMemo(() => {
    let list = incidents.filter((i) => {
      if (category !== "All" && i.category !== category) return false;
      if (priority !== "All" && i.priorityLevel !== priority) return false;
      if (status !== "All" && i.status !== status) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          i.id.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
    list = [...list].sort((a, b) =>
      sortDesc ? priorityRank(b.priorityLevel) - priorityRank(a.priorityLevel) : priorityRank(a.priorityLevel) - priorityRank(b.priorityLevel)
    );
    return list;
  }, [incidents, query, category, priority, status, sortDesc]);

  return (
    <div className="rounded-2xl border border-ink-100 bg-white shadow-card">
      <div className="flex flex-col gap-3 border-b border-ink-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search incidents..."
            className="w-full rounded-lg border border-ink-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-brand-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-ink-200 bg-white px-2.5 py-2 text-xs text-ink-600">
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded-lg border border-ink-200 bg-white px-2.5 py-2 text-xs text-ink-600">
            <option value="All">All priorities</option>
            {["CRITICAL", "HIGH", "MEDIUM", "LOW"].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-ink-200 bg-white px-2.5 py-2 text-xs text-ink-600">
            <option value="All">All statuses</option>
            {STATUS_FLOW.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={() => setSortDesc((s) => !s)}
            className="flex items-center gap-1 rounded-lg border border-ink-200 bg-white px-2.5 py-2 text-xs text-ink-600 hover:bg-ink-50"
          >
            <ArrowUpDown size={13} /> Priority
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3 font-medium">Incident</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Reported</th>
              <th className="px-4 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inc) => (
              <tr key={inc.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60">
                <td className="px-4 py-3 font-mono text-xs text-ink-500">{inc.id}</td>
                <td className="px-4 py-3 text-ink-800">{inc.category}</td>
                <td className="px-4 py-3 text-ink-600">{inc.location}</td>
                <td className="px-4 py-3"><PriorityBadge level={inc.priorityLevel} /></td>
                <td className="px-4 py-3"><StatusBadge status={inc.status} /></td>
                <td className="px-4 py-3 text-xs text-ink-500">{fmt(inc.reportedAt)}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onView(inc)} className="rounded-lg border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-ink-100">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="px-4 py-10 text-center text-sm text-ink-400">No incidents match your filters.</p>}
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-ink-50 lg:hidden">
        {filtered.map((inc) => (
          <button key={inc.id} onClick={() => onView(inc)} className="flex w-full flex-col gap-2 p-4 text-left hover:bg-ink-50/60">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-ink-900">{inc.category}</p>
                <p className="text-xs text-ink-500">{inc.location} · {inc.id}</p>
              </div>
              <PriorityBadge level={inc.priorityLevel} />
            </div>
            <div className="flex items-center justify-between">
              <StatusBadge status={inc.status} />
              <span className="text-xs text-ink-400">{fmt(inc.reportedAt)}</span>
            </div>
          </button>
        ))}
        {filtered.length === 0 && <p className="px-4 py-10 text-center text-sm text-ink-400">No incidents match your filters.</p>}
      </div>
    </div>
  );
}
