import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubmissionsProvider } from "@/context/SubmissionsContext";

import Dashboard from "./pages/Dashboard";
import Consultants from "./pages/Consultants";
import ConsultantProfile from "./pages/ConsultantProfile";
import Jobs from "./pages/Jobs";
import Vendors from "./pages/Vendors";
import Submissions from "./pages/Submissions";
import Emails from "./pages/Emails";
import Analytics from "./pages/Analytics";
import Assistant from "./pages/Assistant";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <SubmissionsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/consultants" element={<Consultants />} />
          <Route path="/consultants/:id" element={<ConsultantProfile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/emails" element={<Emails />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </SubmissionsProvider>
  );
}
