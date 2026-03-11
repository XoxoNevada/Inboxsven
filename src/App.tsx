import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";
import DashboardLayout from "./components/DashboardLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Integrations from "./pages/Integrations";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<AuthGuard><DashboardLayout><Dashboard /></DashboardLayout></AuthGuard>} />
          <Route path="/inbox" element={<AuthGuard><DashboardLayout><Inbox /></DashboardLayout></AuthGuard>} />
          <Route path="/integrations" element={<AuthGuard><DashboardLayout><Integrations /></DashboardLayout></AuthGuard>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
