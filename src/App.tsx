import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Integrations from "./pages/Integrations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/inbox" element={<DashboardLayout><Inbox /></DashboardLayout>} />
        <Route path="/integrations" element={<DashboardLayout><Integrations /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
