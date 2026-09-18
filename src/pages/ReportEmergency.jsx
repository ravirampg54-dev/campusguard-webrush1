import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Flame,
  ShieldAlert,
  Eye,
  Wrench,
  CarFront,
  UserSearch,
  MoreHorizontal,
  ImagePlus,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { CATEGORIES, LOCATIONS, SEVERITIES } from "../data/mockIncidents";
import { calculatePriority } from "../utils/priorityCalculator";
import PriorityScoreRing from "../components/PriorityScoreRing";
import { PriorityBadge } from "../components/Badges";
import { useApp } from "../context/AppContext";

const CATEGORY_ICONS = {
  "Medical Emergency": HeartPulse,
  Fire: Flame,
  "Security Threat": ShieldAlert,
  "Suspicious Activity": Eye,
  "Infrastructure Damage": Wrench,
  Accident: CarFront,
  "Lost / Stranded Person": UserSearch,
  Other: MoreHorizontal,
};

const STEPS = ["Category", "Details", "Review"];

export default function ReportEmergency() {
  const navigate = useNavigate();
  const { addIncident, pushToast } = useApp();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageName, setImageName] = useState(null);

  const [form, setForm] = useState({
    category: "",
    location: "",
    severity: "",
    peopleAffected: "",
    description: "",
  });

  function update(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validateStep1() {
    const e = {};
    if (!form.category) e.category = "Choose an incident category";
    return e;
  }
  function validateStep2() {
    const e = {};
    if (!form.location) e.location = "Select where this is happening";
    if (!form.severity) e.severity = "Select a severity level";
    if (form.peopleAffected !== "" && Number(form.peopleAffected) < 0) e.peopleAffected = "Must be zero or more";
    if (!form.description || form.description.trim().length < 10)
      e.description = "Add at least 10 characters describing what's happening";
    return e;
  }

  function next() {
    const e = step === 0 ? validateStep1() : step === 1 ? validateStep2() : {};
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit() {
    const draft = { ...form, peopleAffected: Number(form.peopleAffected) || 0 };
    const incident = addIncident(draft);
    setSubmitted(incident);
    pushToast(`Incident ${incident.id} submitted successfully.`, "success");
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-ink-50">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-10">
            <div className="mb-6 flex items-center gap-2 text-brand-600">
              <Sparkles size={18} />
              <p className="text-xs font-semibold uppercase tracking-wide">AI-Inspired Priority Analysis</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <PriorityScoreRing score={submitted.priorityScore} level={submitted.priorityLevel} />
              <div className="mt-3">
                <PriorityBadge level={submitted.priorityLevel} />
              </div>
              <p className="mt-4 max-w-sm text-sm text-ink-600">{submitted.priorityExplanation}</p>
              <p className="mt-2 text-[11px] text-ink-400">
                This score is a simulated, frontend-only estimate — not output from a live AI model.
              </p>
            </div>

            <div className="mt-8 rounded-xl bg-ink-50 p-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={16} />
                <p className="text-sm font-semibold">Incident {submitted.id} created</p>
              </div>
              <p className="mt-1 text-xs text-ink-500">
                {submitted.category} · {submitted.location} · Security has been notified.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                onClick={() => navigate("/student")}
                className="flex-1 rounded-xl bg-ink-900 px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Back to dashboard
              </button>
              <button
                onClick={() => navigate("/student/incidents")}
                className="flex-1 rounded-xl border border-ink-200 px-4 py-3 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50"
              >
                Track this incident
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Report Emergency</h1>
        <p className="mt-1 text-sm text-ink-500">Give us a few details so responders can act fast.</p>

        {/* Stepper */}
        <div className="mt-6 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  i <= step ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-400"
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-xs font-medium ${i <= step ? "text-ink-900" : "text-ink-400"}`}>{label}</span>
              {i < STEPS.length - 1 && <div className="h-px flex-1 bg-ink-100" />}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-7">
          {step === 0 && (
            <div className="animate-slideUp">
              <p className="mb-3 text-sm font-semibold text-ink-900">What kind of emergency is this?</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat];
                  const active = form.category === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => update("category", cat)}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-3.5 text-center transition-all ${
                        active
                          ? "border-ink-900 bg-ink-900 text-white shadow-elevated"
                          : "border-ink-100 bg-white text-ink-700 hover:border-ink-300"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-xs font-medium leading-tight">{cat}</span>
                    </button>
                  );
                })}
              </div>
              {errors.category && <p className="mt-2 text-xs text-signal-critical">{errors.category}</p>}
            </div>
          )}

          {step === 1 && (
            <div className="animate-slideUp space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Location</label>
                <select
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-500"
                >
                  <option value="">Select campus location</option>
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                {errors.location && <p className="mt-1 text-xs text-signal-critical">{errors.location}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Severity</label>
                <div className="grid grid-cols-4 gap-2">
                  {SEVERITIES.map((s) => (
                    <button
                      key={s}
                      onClick={() => update("severity", s)}
                      className={`rounded-lg border py-2 text-xs font-semibold transition-colors ${
                        form.severity === s
                          ? "border-ink-900 bg-ink-900 text-white"
                          : "border-ink-200 text-ink-600 hover:border-ink-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {errors.severity && <p className="mt-1 text-xs text-signal-critical">{errors.severity}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">People affected</label>
                <input
                  type="number"
                  min="0"
                  value={form.peopleAffected}
                  onChange={(e) => update("peopleAffected", e.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-500"
                />
                {errors.peopleAffected && <p className="mt-1 text-xs text-signal-critical">{errors.peopleAffected}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={4}
                  placeholder="What's happening? Be as specific as you can."
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-500"
                />
                {errors.description && <p className="mt-1 text-xs text-signal-critical">{errors.description}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">
                  Photo <span className="text-ink-400 font-normal">(optional)</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-ink-300 px-3 py-3 text-sm text-ink-500 hover:border-brand-500 hover:text-brand-600">
                  <ImagePlus size={16} />
                  {imageName || "Upload an image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImageName(e.target.files?.[0]?.name || null)}
                  />
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-slideUp space-y-4">
              <p className="text-sm font-semibold text-ink-900">Confirm before you submit</p>
              <dl className="divide-y divide-ink-100 rounded-xl border border-ink-100">
                {[
                  ["Category", form.category],
                  ["Location", form.location],
                  ["Severity", form.severity],
                  ["People affected", form.peopleAffected || "0"],
                  ["Description", form.description],
                  ["Photo", imageName || "None attached"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                    <dt className="shrink-0 text-ink-500">{k}</dt>
                    <dd className="text-right text-ink-900">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2.5 text-xs text-brand-600">
                <Sparkles size={14} />
                Submitting will generate an AI-inspired priority score automatically.
              </div>
            </div>
          )}

          <div className="mt-7 flex items-center justify-between">
            <button
              onClick={back}
              disabled={step === 0}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-500 disabled:opacity-0"
            >
              <ChevronLeft size={16} /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="flex items-center gap-1 rounded-xl bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-xl bg-signal-critical px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
              >
                <ShieldAlert size={16} /> Submit Emergency
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
