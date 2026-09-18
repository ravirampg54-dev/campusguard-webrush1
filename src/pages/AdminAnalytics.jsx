import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useApp } from "../context/AppContext";

const PRIORITY_COLORS = { CRITICAL: "#DC2626", HIGH: "#EA580C", MEDIUM: "#D97706", LOW: "#0D9488" };

function ChartCard({ title, children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-ink-100 bg-white p-5 shadow-card ${className}`}>
      <p className="mb-4 text-sm font-semibold text-ink-900">{title}</p>
      {children}
    </div>
  );
}

export default function AdminAnalytics() {
  const { incidents } = useApp();

  const byCategory = useMemo(() => {
    const map = {};
    incidents.forEach((i) => (map[i.category] = (map[i.category] || 0) + 1));
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [incidents]);

  const byPriority = useMemo(() => {
    const map = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
    incidents.forEach((i) => (map[i.priorityLevel] = (map[i.priorityLevel] || 0) + 1));
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [incidents]);

  // simulated 7-day trend
  const trend = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((d, i) => ({
      day: d,
      incidents: Math.max(1, Math.round(3 + Math.sin(i * 1.3) * 3 + (i === 5 ? 4 : 0))),
    }));
  }, []);

  const responseTrend = [
    { day: "Mon", minutes: 7.2 },
    { day: "Tue", minutes: 6.5 },
    { day: "Wed", minutes: 5.9 },
    { day: "Thu", minutes: 6.1 },
    { day: "Fri", minutes: 4.8 },
    { day: "Sat", minutes: 4.5 },
    { day: "Sun", minutes: 4.3 },
  ];

  const total = incidents.length;
  const resolvedCount = incidents.filter((i) => i.status === "Resolved").length;
  const resolutionRate = total ? Math.round((resolvedCount / total) * 100) : 0;

  return (
    <Sidebar>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Analytics</h1>
        <p className="mt-1 text-sm text-ink-500">Trends and performance across campus incident response.</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-card">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-alert-50 text-signal-critical">
            <TrendingUp size={16} />
          </span>
          <p className="text-sm text-ink-700">Medical incidents increased <span className="font-semibold">18%</span> this week.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-card">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-brand-600">
            <TrendingDown size={16} />
          </span>
          <p className="text-sm text-ink-700">Average response time improved by <span className="font-semibold">12%</span>.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Incidents by category">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byCategory} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 11, fill: "#334155" }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "#F4F6F9" }} />
              <Bar dataKey="count" fill="#0F172A" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Incidents by priority">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={byPriority} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {byPriority.map((entry) => (
                  <Cell key={entry.name} fill={PRIORITY_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Incident trend (7 days)">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="incidents" stroke="#0D9488" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Response time (avg minutes)">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={responseTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="minutes" stroke="#EA580C" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Resolution rate" className="lg:col-span-2">
          <div className="flex items-center gap-6">
            <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="50" fill="none" stroke="#0D9488" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 50}
                  strokeDashoffset={2 * Math.PI * 50 * (1 - resolutionRate / 100)}
                />
              </svg>
              <span className="absolute font-display text-2xl font-semibold text-ink-900">{resolutionRate}%</span>
            </div>
            <div>
              <p className="text-sm text-ink-700">
                <span className="font-semibold">{resolvedCount}</span> of <span className="font-semibold">{total}</span> reported incidents have been resolved.
              </p>
              <p className="mt-1 text-xs text-ink-400">Resolution rate is calculated live from current incident data.</p>
            </div>
          </div>
        </ChartCard>
      </div>
    </Sidebar>
  );
}
