import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ToastHost from "./components/ToastHost";
import Landing from "./pages/Landing";
import StudentDashboard from "./pages/StudentDashboard";
import StudentIncidents from "./pages/StudentIncidents";
import ReportEmergency from "./pages/ReportEmergency";
import AdminDashboard from "./pages/AdminDashboard";
import AdminIncidents from "./pages/AdminIncidents";
import AdminLiveMap from "./pages/AdminLiveMap";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminContacts from "./pages/AdminContacts";
import AdminSettings from "./pages/AdminSettings";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/incidents" element={<StudentIncidents />} />
          <Route path="/report" element={<ReportEmergency />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/incidents" element={<AdminIncidents />} />
          <Route path="/admin/map" element={<AdminLiveMap />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
      <ToastHost />
    </AppProvider>
  );
}
