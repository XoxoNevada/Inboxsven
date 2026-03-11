import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";

const AuthGuard = lazy(() => import("./components/AuthGuard"));
const DashboardLayout = lazy(() => import("./components/DashboardLayout"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Inbox = lazy(() => import("./pages/Inbox"));
const Integrations = lazy(() => import("./pages/Integrations"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<AuthGuard><DashboardLayout><Dashboard /></DashboardLayout></AuthGuard>} />
            <Route path="/inbox" element={<AuthGuard><DashboardLayout><Inbox /></DashboardLayout></AuthGuard>} />
            <Route path="/integrations" element={<AuthGuard><DashboardLayout><Integrations /></DashboardLayout></AuthGuard>} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
