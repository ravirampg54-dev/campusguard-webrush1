import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutGrid,
  ListChecks,
  MapPin,
  BarChart3,
  PhoneCall,
  Settings,
  ShieldAlert,
  Menu,
  X,
  ArrowLeftRight,
} from "lucide-react";
import NotificationPanel from "./NotificationPanel";
import { useApp } from "../context/AppContext";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/admin/incidents", label: "Incidents", icon: ListChecks },
  { to: "/admin/map", label: "Live Map", icon: MapPin },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/contacts", label: "Emergency Contacts", icon: PhoneCall },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function NavItems({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? "bg-white/10 text-white" : "text-ink-300 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Icon size={17} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Sidebar({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setRole } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink-50 lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-ink-900 px-4 py-5 lg:flex">
        <div className="mb-6 flex items-center gap-2 px-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
            <ShieldAlert size={17} />
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-white leading-none">CampusGuard</p>
            <p className="mt-1 text-[11px] text-ink-400">Admin Console</p>
          </div>
        </div>
        <NavItems />
        <div className="mt-auto space-y-2 pt-4">
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <p className="text-xs text-ink-300">System status: Operational</p>
          </div>
          <button
            onClick={() => {
              setRole(null);
              navigate("/");
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-ink-300 hover:bg-white/5 hover:text-white"
          >
            <ArrowLeftRight size={14} /> Switch role
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink-100 bg-white/90 px-4 backdrop-blur lg:px-8">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-100 text-ink-600 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-ink-900">CampusGuard Admin</p>
          </div>
          <div className="flex items-center gap-2.5">
            <NotificationPanel />
            <div className="flex items-center gap-2 rounded-lg bg-ink-50 py-1.5 pl-1.5 pr-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-[11px] font-semibold text-white">
                AD
              </span>
              <span className="hidden text-xs font-medium text-ink-700 sm:inline">Admin</span>
            </div>
          </div>
        </header>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-ink-950/50" onClick={() => setMobileOpen(false)} />
            <div className="animate-slideUp absolute left-0 top-0 h-full w-72 bg-ink-900 px-4 py-5">
              <div className="mb-6 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                    <ShieldAlert size={17} />
                  </span>
                  <p className="font-display text-sm font-semibold text-white">CampusGuard</p>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-ink-300">
                  <X size={20} />
                </button>
              </div>
              <NavItems onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
