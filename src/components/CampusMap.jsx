import { useState } from "react";
import { CAMPUS_BUILDINGS } from "../data/mockIncidents";
import { PriorityBadge, StatusBadge } from "./Badges";

const LOCATION_TO_BUILDING = {
  "Main Building": "main",
  "Block A": "blockA",
  "Block B": "blockB",
  Library: "library",
  Canteen: "canteen",
  Hostel: "hostel",
  "Parking Area": "parking",
  "Computer Lab": "complab",
  "Science Lab": "scilab",
  "Sports Ground": "sports",
};

const MARKER_COLOR = {
  CRITICAL: "#DC2626",
  HIGH: "#EA580C",
  MEDIUM: "#D97706",
  LOW: "#0D9488",
};

export default function CampusMap({ incidents, onSelect }) {
  const [active, setActive] = useState(null);
  const activeIncidents = incidents.filter((i) => i.status !== "Resolved");

  // group by building to offset overlapping markers
  const grouped = {};
  activeIncidents.forEach((inc) => {
    const key = LOCATION_TO_BUILDING[inc.location];
    if (!key) return;
    grouped[key] = grouped[key] || [];
    grouped[key].push(inc);
  });

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-ink-100 bg-gradient-to-br from-ink-50 to-white">
        <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
          {/* pathways */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="#E2E8F0" strokeWidth="1.6" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#E2E8F0" strokeWidth="1.6" />

          {CAMPUS_BUILDINGS.map((b) => (
            <g key={b.id} onClick={() => setActive(null)}>
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx="1.6"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="0.5"
              />
              <text
                x={b.x + b.w / 2}
                y={b.y + b.h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="2.6"
                fill="#475569"
                fontFamily="Inter, sans-serif"
              >
                {b.name}
              </text>
            </g>
          ))}

          {Object.entries(grouped).map(([buildingId, incs]) => {
            const b = CAMPUS_BUILDINGS.find((x) => x.id === buildingId);
            if (!b) return null;
            return incs.map((inc, idx) => {
              const cx = b.x + b.w - 2 - idx * 3;
              const cy = b.y - 1.5;
              const color = MARKER_COLOR[inc.priorityLevel] || MARKER_COLOR.LOW;
              return (
                <g
                  key={inc.id}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(inc);
                    onSelect && onSelect(inc);
                  }}
                >
                  {inc.priorityLevel === "CRITICAL" && (
                    <circle cx={cx} cy={cy} r="3.4" fill={color} opacity="0.25">
                      <animate attributeName="r" values="2.6;4.2;2.6" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.35;0.05;0.35" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={cx} cy={cy} r="2" fill={color} stroke="white" strokeWidth="0.5" />
                </g>
              );
            });
          })}
        </svg>

        {active && (
          <div className="animate-slideUp absolute bottom-3 left-3 right-3 rounded-xl border border-ink-100 bg-white/95 p-3 shadow-elevated backdrop-blur sm:left-3 sm:right-auto sm:w-72">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-ink-900">{active.category}</p>
              <PriorityBadge level={active.priorityLevel} />
            </div>
            <p className="mt-1 text-xs text-ink-500">{active.location} · {active.id}</p>
            <div className="mt-2">
              <StatusBadge status={active.status} />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">Legend</p>
        <ul className="space-y-2.5">
          {[
            ["Critical", MARKER_COLOR.CRITICAL],
            ["High", MARKER_COLOR.HIGH],
            ["Medium", MARKER_COLOR.MEDIUM],
            ["Low / Resolved", MARKER_COLOR.LOW],
          ].map(([label, color]) => (
            <li key={label} className="flex items-center gap-2 text-sm text-ink-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-400">
          {activeIncidents.length} active incident{activeIncidents.length !== 1 ? "s" : ""} on campus. Tap a marker for details.
        </p>
      </div>
    </div>
  );
}
