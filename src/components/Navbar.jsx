import { Link, useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeftRight } from "lucide-react";
import NotificationPanel from "./NotificationPanel";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { setRole } = useApp();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/student" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-white">
            <ShieldAlert size={17} />
          </span>
          <span className="font-display text-[17px] font-semibold tracking-tight text-ink-900">
            CampusGuard
          </span>
          <span className="hidden rounded-full bg-ink-50 px-2 py-0.5 text-[11px] font-medium text-ink-500 sm:inline">
            Campus Safety
          </span>
        </Link>

        <div className="flex items-center gap-2.5">
          <NotificationPanel />
          <button
            onClick={() => {
              setRole(null);
              navigate("/");
            }}
            className="flex items-center gap-1.5 rounded-lg border border-ink-100 bg-white px-3 py-2 text-xs font-medium text-ink-600 hover:bg-ink-50 transition-colors"
          >
            <ArrowLeftRight size={14} />
            <span className="hidden sm:inline">Switch role</span>
          </button>
          <div className="flex items-center gap-2 rounded-lg bg-ink-50 py-1.5 pl-1.5 pr-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-[11px] font-semibold text-white">
              JS
            </span>
            <span className="hidden text-xs font-medium text-ink-700 sm:inline">Jordan Silva</span>
          </div>
        </div>
      </div>
    </header>
  );
}
