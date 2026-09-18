import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CampusMap from "../components/CampusMap";
import IncidentModal from "../components/IncidentModal";
import { useApp } from "../context/AppContext";

export default function AdminLiveMap() {
  const { incidents } = useApp();
  const [openDetail, setOpenDetail] = useState(null);

  return (
    <Sidebar>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Live Campus Map</h1>
        <p className="mt-1 text-sm text-ink-500">Simulated campus layout with real-time incident markers.</p>
      </div>
      <CampusMap incidents={incidents} onSelect={() => {}} />
      <p className="mt-4 text-xs text-ink-400">Tap a marker to preview, or open an incident from the Incidents page for full details.</p>
      {openDetail && <IncidentModal incident={openDetail} onClose={() => setOpenDetail(null)} />}
    </Sidebar>
  );
}
