/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      colors: {
        ink: {
          950: "#0A0F1A",
          900: "#0F172A",
          800: "#161F32",
          700: "#212B41",
          600: "#334155",
          500: "#475569",
          400: "#64748B",
          300: "#94A3B8",
          200: "#CBD5E1",
          100: "#E2E8F0",
          50: "#F4F6F9",
        },
        signal: {
          critical: "#DC2626",
          high: "#EA580C",
          medium: "#D97706",
          low: "#0D9488",
          resolved: "#16A34A",
        },
        alert: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#DC2626",
          600: "#B91C1C",
        },
        brand: {
          500: "#0D9488",
          600: "#0F766E",
          400: "#2DD4BF",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.08)",
        elevated: "0 8px 24px rgba(15,23,42,0.12), 0 2px 6px rgba(15,23,42,0.08)",
        glow: "0 0 0 4px rgba(220,38,38,0.12)",
      },
      keyframes: {
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(220,38,38,0.45)" },
          "70%": { boxShadow: "0 0 0 12px rgba(220,38,38,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(220,38,38,0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        toastIn: {
          from: { opacity: "0", transform: "translateX(16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 2s infinite",
        slideUp: "slideUp 0.25s ease-out",
        toastIn: "toastIn 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
