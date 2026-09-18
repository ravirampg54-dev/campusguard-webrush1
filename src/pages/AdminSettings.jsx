import { useState } from "react";
import { Bell, Shield, Palette, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useApp } from "../context/AppContext";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-brand-500" : "bg-ink-200"}`}
      aria-pressed={checked}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function AdminSettings() {
  const { pushToast } = useApp();
  const [notifs, setNotifs] = useState(true);
  const [autoAssign, setAutoAssign] = useState(true);
  const [sound, setSound] = useState(false);

  function clearData() {
    localStorage.removeItem("cg_incidents");
    localStorage.removeItem("cg_notifications");
    pushToast("Local demo data cleared. Refresh to reseed.");
  }

  return (
    <Sidebar>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Settings</h1>
        <p className="mt-1 text-sm text-ink-500">Prototype preferences for this demo session.</p>
      </div>

      <div className="max-w-xl space-y-4">
        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-50 text-ink-600"><Bell size={16} /></span>
              <div>
                <p className="text-sm font-medium text-ink-900">Push notifications</p>
                <p className="text-xs text-ink-500">Get notified on new and updated incidents</p>
              </div>
            </div>
            <Toggle checked={notifs} onChange={setNotifs} />
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-50 text-ink-600"><Shield size={16} /></span>
              <div>
                <p className="text-sm font-medium text-ink-900">Auto-assign critical incidents</p>
                <p className="text-xs text-ink-500">Instantly notify the nearest responder</p>
              </div>
            </div>
            <Toggle checked={autoAssign} onChange={setAutoAssign} />
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-50 text-ink-600"><Palette size={16} /></span>
              <div>
                <p className="text-sm font-medium text-ink-900">Alert sound</p>
                <p className="text-xs text-ink-500">Play a sound for critical alerts</p>
              </div>
            </div>
            <Toggle checked={sound} onChange={setSound} />
          </div>
        </div>

        <div className="rounded-2xl border border-red-100 bg-alert-50 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-signal-critical"><Trash2 size={16} /></span>
              <div>
                <p className="text-sm font-medium text-ink-900">Reset demo data</p>
                <p className="text-xs text-ink-500">Clears locally stored incidents & notifications</p>
              </div>
            </div>
            <button onClick={clearData} className="rounded-lg bg-signal-critical px-3 py-2 text-xs font-semibold text-white">
              Clear
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
