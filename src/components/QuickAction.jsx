export default function QuickAction({ icon: Icon, label, sub, onClick, tone = "default" }) {
  const tones = {
    default: "bg-ink-900",
    critical: "bg-signal-critical",
  };
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-3.5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tones[tone]} text-white`}>
        <Icon size={17} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink-900">{label}</p>
        <p className="truncate text-xs text-ink-500">{sub}</p>
      </div>
    </button>
  );
}
