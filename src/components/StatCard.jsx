export default function StatCard({ label, value, icon: Icon, tone = "default", sub }) {
  const toneStyles = {
    default: "bg-ink-900 text-white",
    critical: "bg-alert-500 text-white",
    brand: "bg-brand-500 text-white",
  };
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</p>
        {Icon && (
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${toneStyles[tone]}`}>
            <Icon size={15} />
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-ink-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink-500">{sub}</p>}
    </div>
  );
}
