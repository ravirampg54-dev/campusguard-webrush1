import { useNavigate } from "react-router-dom";
import { ShieldAlert, ListChecks, PhoneCall, HeartPulse, Flame, Building2 } from "lucide-react";
import Navbar from "../components/Navbar";
import QuickAction from "../components/QuickAction";
import IncidentCard from "../components/IncidentCard";
import { useApp } from "../context/AppContext";
import { useState } from "react";
import IncidentModal from "../components/IncidentModal";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { incidents, pushToast } = useApp();
  const [selected, setSelected] = useState(null);

  const active = incidents.filter((i) => i.status !== "Resolved").slice(0, 6);

  function callAction(label) {
    pushToast(`Calling ${label}... (simulated for prototype)`);
  }

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Hero */}
        <section className="overflow-hidden rounded-2xl bg-ink-900 px-6 py-10 text-white sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-300">Campus Safety</p>
          <h1 className="mt-2 max-w-lg font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Stay Safe. Report Fast.
          </h1>
          <p className="mt-3 max-w-md text-sm text-ink-300 sm:text-base">
            Report campus emergencies and track response in real time.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/report")}
              className="flex items-center justify-center gap-2 rounded-xl bg-signal-critical px-5 py-3 text-sm font-semibold shadow-glow transition-transform hover:-translate-y-0.5 animate-pulseRing"
            >
              <ShieldAlert size={17} /> Report Emergency
            </button>
            <button
              onClick={() => navigate("/student/incidents")}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <ListChecks size={17} /> View Active Incidents
            </button>
          </div>
        </section>

        {/* Quick actions */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-ink-900">Emergency quick actions</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              icon={PhoneCall}
              tone="critical"
              label="Call Campus Security"
              sub="Always on duty"
              onClick={() => callAction("Campus Security")}
            />
            <QuickAction
              icon={HeartPulse}
              label="Medical Assistance"
              sub="6 AM – 11 PM"
              onClick={() => callAction("Medical Center")}
            />
            <QuickAction icon={Flame} label="Fire & Safety" sub="Always on duty" onClick={() => callAction("Fire & Safety")} />
            <QuickAction
              icon={Building2}
              label="Campus Administration"
              sub="8 AM – 6 PM"
              onClick={() => callAction("Campus Administration")}
            />
          </div>
        </section>

        {/* Active incidents */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink-900">Current incidents</h2>
            <button onClick={() => navigate("/student/incidents")} className="text-xs font-medium text-brand-600 hover:underline">
              View all
            </button>
          </div>
          {active.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center">
              <p className="text-sm text-ink-500">No active incidents right now. Campus is calm.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((inc) => (
                <IncidentCard key={inc.id} incident={inc} onClick={() => setSelected(inc)} />
              ))}
            </div>
          )}
        </section>
      </main>
      {selected && <IncidentModal incident={selected} onClose={() => setSelected(null)} readOnly />}
    </div>
  );
}
