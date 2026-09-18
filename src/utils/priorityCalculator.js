// Simulated, frontend-only "AI-Inspired Priority Analysis".
// Deterministic weighted scoring — clearly not a real model call.

const SEVERITY_WEIGHT = { Low: 10, Medium: 30, High: 55, Critical: 80 };

const CATEGORY_WEIGHT = {
  "Medical Emergency": 20,
  Fire: 22,
  "Security Threat": 18,
  "Suspicious Activity": 8,
  "Infrastructure Damage": 6,
  Accident: 12,
  "Lost / Stranded Person": 7,
  Other: 4,
};

const LOCATION_RISK = {
  "Science Lab": 10,
  "Computer Lab": 6,
  Hostel: 9,
  "Parking Area": 8,
  "Main Building": 5,
  "Block A": 5,
  "Block B": 5,
  Library: 4,
  Canteen: 6,
  "Sports Ground": 5,
};

export function calculatePriority({ severity, category, location, peopleAffected }) {
  const severityScore = SEVERITY_WEIGHT[severity] ?? 20;
  const categoryScore = CATEGORY_WEIGHT[category] ?? 5;
  const locationScore = LOCATION_RISK[location] ?? 5;
  const peopleScore = Math.min(18, Number(peopleAffected || 0) * 2.2);

  const raw = severityScore + categoryScore + locationScore + peopleScore;
  const score = Math.max(1, Math.min(100, Math.round(raw)));

  let level = "LOW";
  if (score >= 80) level = "CRITICAL";
  else if (score >= 60) level = "HIGH";
  else if (score >= 35) level = "MEDIUM";

  const reasons = [];
  if (severity === "Critical" || severity === "High") reasons.push(`${severity.toLowerCase()} severity`);
  if (Number(peopleAffected) > 5) reasons.push("multiple people affected");
  else if (Number(peopleAffected) > 0) reasons.push("people directly affected");
  if (locationScore >= 8) reasons.push("a high-risk campus location");
  if (["Medical Emergency", "Fire", "Security Threat"].includes(category)) reasons.push(`the nature of a ${category.toLowerCase()} incident`);

  const explanation = reasons.length
    ? `${level.charAt(0) + level.slice(1).toLowerCase()} priority due to ${reasons.join(", ")}.`
    : `${level.charAt(0) + level.slice(1).toLowerCase()} priority based on reported details.`;

  return { score, level, explanation };
}

export function priorityRank(level) {
  return { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }[level] ?? 0;
}
