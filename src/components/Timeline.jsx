import { Check } from "lucide-react";
import { STATUS_FLOW } from "../data/mockIncidents";

function fmt(iso) {
  return new Date(iso).toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
  });
}

export default function Timeline({ timeline, currentStatus }) {
  const currentIdx = STATUS_FLOW.indexOf(currentStatus);
  const byStep = Object.fromEntries((timeline || []).map((t) => [t.step, t.at]));

  return (
    <ol className="relative ml-3 border-l border-ink-100">
      {STATUS_FLOW.map((step, i) => {
        const done = i <= currentIdx;
        const at = byStep[step];
        return (
          <li key={step} className="mb-5 ml-5 last:mb-0">
            <span
              className={`absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white ${
                done ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
              }`}
            >
              {done ? <Check size={12} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
            </span>
            <p className={`text-sm font-medium ${done ? "text-ink-900" : "text-ink-400"}`}>{step}</p>
            {at && <p className="text-xs text-ink-400">{fmt(at)}</p>}
          </li>
        );
      })}
    </ol>
  );
}
