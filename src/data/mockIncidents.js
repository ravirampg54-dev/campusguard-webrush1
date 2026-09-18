// Realistic seed data for CampusGuard. Priority scores are pre-computed
// with utils/priorityCalculator so seed data and live submissions share logic.

export const CATEGORIES = [
  "Medical Emergency",
  "Fire",
  "Security Threat",
  "Suspicious Activity",
  "Infrastructure Damage",
  "Accident",
  "Lost / Stranded Person",
  "Other",
];

export const LOCATIONS = [
  "Main Building",
  "Block A",
  "Block B",
  "Library",
  "Canteen",
  "Parking Area",
  "Hostel",
  "Computer Lab",
  "Science Lab",
  "Sports Ground",
];

export const SEVERITIES = ["Low", "Medium", "High", "Critical"];

export const STATUS_FLOW = ["Reported", "Acknowledged", "Responding", "Resolved"];

export const EMERGENCY_CONTACTS = [
  {
    id: "ec-1",
    name: "Campus Security",
    role: "24/7 rapid response unit",
    availability: "Always on duty",
    phone: "+1 (555) 010-1234",
    location: "Main Gate, Security Post",
  },
  {
    id: "ec-2",
    name: "Medical Center",
    role: "On-campus first aid & triage",
    availability: "6:00 AM – 11:00 PM",
    phone: "+1 (555) 010-5678",
    location: "Block A, Ground Floor",
  },
  {
    id: "ec-3",
    name: "Ambulance Dispatch",
    role: "Emergency medical transport",
    availability: "Always on duty",
    phone: "+1 (555) 010-9911",
    location: "Dispatched campus-wide",
  },
  {
    id: "ec-4",
    name: "Fire & Safety",
    role: "Fire suppression & evacuation",
    availability: "Always on duty",
    phone: "+1 (555) 010-3344",
    location: "Service Road, Block B",
  },
  {
    id: "ec-5",
    name: "Campus Administration",
    role: "General incident escalation",
    availability: "8:00 AM – 6:00 PM",
    phone: "+1 (555) 010-7788",
    location: "Main Building, 2nd Floor",
  },
];

// Building layout used by the SVG campus map (percentage-based coordinates)
export const CAMPUS_BUILDINGS = [
  { id: "main", name: "Main Building", x: 44, y: 46, w: 16, h: 12 },
  { id: "blockA", name: "Block A", x: 14, y: 20, w: 14, h: 10 },
  { id: "blockB", name: "Block B", x: 14, y: 62, w: 14, h: 10 },
  { id: "library", name: "Library", x: 68, y: 18, w: 13, h: 10 },
  { id: "canteen", name: "Canteen", x: 68, y: 62, w: 12, h: 9 },
  { id: "hostel", name: "Hostel", x: 82, y: 38, w: 13, h: 14 },
  { id: "parking", name: "Parking Area", x: 4, y: 42, w: 12, h: 10 },
  { id: "complab", name: "Computer Lab", x: 33, y: 18, w: 12, h: 9 },
  { id: "scilab", name: "Science Lab", x: 33, y: 72, w: 12, h: 9 },
  { id: "sports", name: "Sports Ground", x: 52, y: 76, w: 20, h: 14 },
];

const now = Date.now();
const minsAgo = (m) => new Date(now - m * 60 * 1000).toISOString();

// [category, location, severity, people, status, minutesAgo, description]
const RAW = [
  ["Medical Emergency", "Block A", "Critical", 1, "Responding", 6, "Student collapsed during lab session, unconscious but breathing. Needs immediate medical attention."],
  ["Fire", "Science Lab", "High", 12, "Acknowledged", 18, "Smoke reported near chemical storage cabinet. Alarm triggered, area being evacuated."],
  ["Infrastructure Damage", "Block B", "Medium", 0, "Responding", 34, "Electrical panel sparking near second floor corridor, burning smell noticed."],
  ["Lost / Stranded Person", "Parking Area", "Low", 1, "Resolved", 180, "First-year student unable to find way back to hostel after dark, escorted safely."],
  ["Suspicious Activity", "Parking Area", "Medium", 0, "Investigating", 52, "Unfamiliar individual seen loitering near two-wheeler parking for over an hour."],
  ["Security Threat", "Hostel", "High", 40, "Acknowledged", 9, "Unauthorized person attempted entry through hostel back gate."],
  ["Accident", "Sports Ground", "Medium", 1, "Responding", 22, "Player sustained ankle injury during football practice, unable to walk unassisted."],
  ["Medical Emergency", "Library", "Medium", 1, "Resolved", 260, "Student reported dizziness and fainting spell in reading hall, recovered after rest."],
  ["Infrastructure Damage", "Main Building", "Low", 0, "Resolved", 320, "Elevator stuck between floors for 10 minutes, occupants safely released."],
  ["Fire", "Canteen", "Critical", 30, "Responding", 4, "Gas cylinder leak detected in canteen kitchen, strong odor reported by staff."],
  ["Suspicious Activity", "Computer Lab", "Low", 0, "Resolved", 410, "Unattended bag found in lab, confirmed harmless after inspection."],
  ["Accident", "Block A", "Low", 1, "Resolved", 500, "Minor slip on wet staircase, student treated with first aid on site."],
  ["Security Threat", "Main Building", "Critical", 8, "Acknowledged", 3, "Verbal altercation escalating near admin office, security requested urgently."],
  ["Medical Emergency", "Hostel", "High", 1, "Investigating", 27, "Resident reports severe allergic reaction, breathing difficulty."],
  ["Infrastructure Damage", "Sports Ground", "Low", 0, "Reported", 60, "Floodlight pole leaning after storm, fenced area needed."],
];

export const initialIncidents = RAW.map((r, i) => {
  const [category, location, severity, people, status, mins, description] = r;
  return {
    id: `CG-${1000 + i}`,
    category,
    location,
    severity,
    peopleAffected: people,
    status,
    description,
    reportedAt: minsAgo(mins),
    reporter: i % 3 === 0 ? "Staff Member" : "Student",
    image: null,
    timeline: buildTimeline(status, mins),
  };
});

function buildTimeline(status, minsAgo) {
  const steps = ["Reported", "Acknowledged", "Responding", "Resolved"];
  const idx = steps.indexOf(status);
  const stamps = [];
  for (let i = 0; i <= idx; i++) {
    stamps.push({
      step: steps[i],
      at: new Date(now - (minsAgo - i * 3) * 60 * 1000).toISOString(),
    });
  }
  return stamps;
}
