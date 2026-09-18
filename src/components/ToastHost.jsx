import { CheckCircle2, Info } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ToastHost() {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-[calc(100%-2.5rem)] max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-toastIn flex items-start gap-2.5 rounded-xl bg-ink-900 text-white px-4 py-3 shadow-elevated"
        >
          {t.tone === "success" ? (
            <CheckCircle2 size={18} className="mt-0.5 text-emerald-400 shrink-0" />
          ) : (
            <Info size={18} className="mt-0.5 text-teal-300 shrink-0" />
          )}
          <p className="text-sm leading-snug">{t.message}</p>
        </div>
      ))}
    </div>
  );
}
