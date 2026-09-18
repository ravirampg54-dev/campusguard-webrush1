import { useNavigate } from "react-router-dom";
import { ShieldAlert, GraduationCap, LayoutDashboard, Radio } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Landing() {
  const navigate = useNavigate();
  const { setRole, incidents } = useApp();

  const active = incidents.filter((i) => i.status !== "Resolved").length;

  function enter(role, path) {
    setRole(role);
    navigate(path);
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink-900 text-white">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500">
          <ShieldAlert size={26} />
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">CampusGuard</h1>
        <p className="mt-3 text-base text-ink-300 sm:text-lg">Smart Campus Emergency Response</p>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-brand-400">
          Report · Respond · Resolve
        </p>

        <div className="mt-3 flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs text-ink-300">
          <Radio size={12} className="text-signal-critical" />
          {active} active incident{active !== 1 ? "s" : ""} on campus right now
        </div>

        <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => enter("student", "/student")}
            className="group flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:-translate-y-1 hover:bg-white/10"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500">
              <GraduationCap size={18} />
            </span>
            <p className="font-display text-lg font-semibold">Enter Student Portal</p>
            <p className="text-sm text-ink-300">Report emergencies and track response in real time.</p>
          </button>

          <button
            onClick={() => enter("admin", "/admin")}
            className="group flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:-translate-y-1 hover:bg-white/10"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-700">
              <LayoutDashboard size={18} />
            </span>
            <p className="font-display text-lg font-semibold">Enter Admin Dashboard</p>
            <p className="text-sm text-ink-300">Monitor, prioritize, and respond to incidents.</p>
          </button>
        </div>
      </div>
      <p className="pb-6 text-center text-[11px] text-ink-500">Frontend-only prototype · Data is simulated for demo purposes</p>
    </div>
  );
}
