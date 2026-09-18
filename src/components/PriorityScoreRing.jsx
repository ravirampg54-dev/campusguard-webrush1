import { useEffect, useState } from "react";

const COLORS = {
  CRITICAL: "#DC2626",
  HIGH: "#EA580C",
  MEDIUM: "#D97706",
  LOW: "#0D9488",
};

export default function PriorityScoreRing({ score, level }) {
  const [display, setDisplay] = useState(0);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const color = COLORS[level] || COLORS.LOW;

  useEffect(() => {
    setDisplay(0);
    let raf;
    const start = performance.now();
    const duration = 1100;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * score));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const offset = circumference - (display / 100) * circumference;

  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="12" />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke 0.3s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-4xl font-semibold text-ink-900">{display}</span>
        <span className="text-xs text-ink-400">out of 100</span>
      </div>
    </div>
  );
}
