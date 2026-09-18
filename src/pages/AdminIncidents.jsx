import { useState } from "react";
import Sidebar from "../components/Sidebar";
import IncidentTable from "../components/IncidentTable";
import IncidentModal from "../components/IncidentModal";
import { useApp } from "../context/AppContext";

export default function AdminIncidents() {
  const { incidents } = useApp();
  const [selected, setSelected] = useState(null);

  return (
    <Sidebar>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Incidents</h1>
        <p className="mt-1 text-sm text-ink-500">Search, filter, and manage every reported incident.</p>
      </div>
      <IncidentTable incidents={incidents} onView={setSelected} />
      {selected && <IncidentModal incident={selected} onClose={() => setSelected(null)} />}
    </Sidebar>
  );
}
