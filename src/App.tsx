import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";

const AuthGuard = lazy(() => import("./components/AuthGuard"));
const DashboardLayout = lazy(() => import("./components/DashboardLayout"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Inbox = lazy(() => import("./pages/Inbox"));
const Integrations = lazy(() => import("./pages/Integrations"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AIReplies = lazy(() => import("./pages/AIReplies"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Settings = lazy(() => import("./pages/Settings"));
const Billing = lazy(() => import("./pages/Billing"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<AuthGuard><DashboardLayout><Dashboard /></DashboardLayout></AuthGuard>} />
            <Route path="/inbox" element={<AuthGuard><DashboardLayout><Inbox /></DashboardLayout></AuthGuard>} />
            <Route path="/ai-replies" element={<AuthGuard><DashboardLayout><AIReplies /></DashboardLayout></AuthGuard>} />
            <Route path="/analytics" element={<AuthGuard><DashboardLayout><Analytics /></DashboardLayout></AuthGuard>} />
            <Route path="/integrations" element={<AuthGuard><DashboardLayout><Integrations /></DashboardLayout></AuthGuard>} />
            <Route path="/settings" element={<AuthGuard><DashboardLayout><Settings /></DashboardLayout></AuthGuard>} />
            <Route path="/billing" element={<AuthGuard><DashboardLayout><Billing /></DashboardLayout></AuthGuard>} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
