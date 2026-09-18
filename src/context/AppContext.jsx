import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { initialIncidents, STATUS_FLOW } from "../data/mockIncidents";
import { calculatePriority } from "../utils/priorityCalculator";

const AppContext = createContext(null);

const LS_INCIDENTS = "cg_incidents";
const LS_NOTIFS = "cg_notifications";
const LS_ROLE = "cg_role";

function loadLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const seedNotifications = [
  { id: "n1", text: "Incident CG-1000 has been acknowledged.", at: new Date(Date.now() - 5 * 60000).toISOString(), read: false },
  { id: "n2", text: "Security team is responding to Block A.", at: new Date(Date.now() - 12 * 60000).toISOString(), read: false },
  { id: "n3", text: "Incident CG-1003 has been resolved.", at: new Date(Date.now() - 60 * 60000).toISOString(), read: true },
];

export function AppProvider({ children }) {
  const [incidents, setIncidents] = useState(() => loadLS(LS_INCIDENTS, initialIncidents));
  const [notifications, setNotifications] = useState(() => loadLS(LS_NOTIFS, seedNotifications));
  const [role, setRole] = useState(() => loadLS(LS_ROLE, null));
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  useEffect(() => localStorage.setItem(LS_INCIDENTS, JSON.stringify(incidents)), [incidents]);
  useEffect(() => localStorage.setItem(LS_NOTIFS, JSON.stringify(notifications)), [notifications]);
  useEffect(() => localStorage.setItem(LS_ROLE, JSON.stringify(role)), [role]);

  const pushToast = useCallback((message, tone = "default") => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3800);
  }, []);

  const pushNotification = useCallback((text) => {
    setNotifications((n) => [{ id: `n-${Date.now()}`, text, at: new Date().toISOString(), read: false }, ...n]);
  }, []);

  const addIncident = useCallback(
    (draft) => {
      const { score, level, explanation } = calculatePriority(draft);
      const id = `CG-${1000 + Math.floor(Math.random() * 8000) + incidents.length}`;
      const incident = {
        id,
        ...draft,
        priorityScore: score,
        priorityLevel: level,
        priorityExplanation: explanation,
        status: "Reported",
        reportedAt: new Date().toISOString(),
        timeline: [{ step: "Reported", at: new Date().toISOString() }],
      };
      setIncidents((prev) => [incident, ...prev]);
      pushNotification(`New ${draft.category} reported at ${draft.location} — Incident ${id}.`);
      return incident;
    },
    [incidents.length, pushNotification]
  );

  const updateStatus = useCallback(
    (id, nextStatus) => {
      setIncidents((prev) =>
        prev.map((inc) => {
          if (inc.id !== id) return inc;
          const timeline = [...inc.timeline, { step: nextStatus, at: new Date().toISOString() }];
          return { ...inc, status: nextStatus, timeline };
        })
      );
      const messages = {
        Acknowledged: `Incident ${id} has been acknowledged.`,
        Responding: `Security team is responding to incident ${id}.`,
        Resolved: `Incident ${id} has been resolved.`,
      };
      if (messages[nextStatus]) pushNotification(messages[nextStatus]);
      pushToast(`Status updated to "${nextStatus}"`, nextStatus === "Resolved" ? "success" : "default");
    },
    [pushNotification, pushToast]
  );

  const nextStatusFor = useCallback((status) => {
    const idx = STATUS_FLOW.indexOf(status);
    return STATUS_FLOW[Math.min(idx + 1, STATUS_FLOW.length - 1)];
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((n) => n.map((x) => ({ ...x, read: true })));
  }, []);

  const value = {
    incidents,
    addIncident,
    updateStatus,
    nextStatusFor,
    notifications,
    markAllNotificationsRead,
    role,
    setRole,
    toasts,
    pushToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
