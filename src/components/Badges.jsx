const PRIORITY_STYLES = {
  CRITICAL: "bg-alert-50 text-signal-critical ring-1 ring-inset ring-red-200",
  HIGH: "bg-orange-50 text-signal-high ring-1 ring-inset ring-orange-200",
  MEDIUM: "bg-amber-50 text-signal-medium ring-1 ring-inset ring-amber-200",
  LOW: "bg-teal-50 text-signal-low ring-1 ring-inset ring-teal-200",
};

export function PriorityBadge({ level, className = "" }) {
  const styles = PRIORITY_STYLES[level] || PRIORITY_STYLES.LOW;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold tracking-wide ${styles} ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}

const STATUS_STYLES = {
  Reported: "bg-ink-100 text-ink-600",
  Acknowledged: "bg-blue-50 text-blue-700",
  Investigating: "bg-blue-50 text-blue-700",
  Responding: "bg-amber-50 text-amber-700",
  Resolved: "bg-emerald-50 text-emerald-700",
};

export function StatusBadge({ status, className = "" }) {
  const styles = STATUS_STYLES[status] || STATUS_STYLES.Reported;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles} ${className}`}>
      {status}
    </span>
  );
}
