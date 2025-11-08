import React, { Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Landing/Navbar';
import Footer from './components/Landing/Footer';

// 1. Import the new components
import ProtectedRoute from './components/Landing/ProtectedRoute';
import LoginPage from './pages/Auth/Login';
import SignUpPage from './pages/Auth/Signup';

// 2. --- THIS IS THE FIX ---
// You were missing this import for your dashboard layout
import DashboardLayout from './layouts/DashboardLayout'; 

// Landing Pages
const LandingPage = React.lazy(() => import('./pages/landing/LandingPage'));
const PaymentPage = React.lazy(() => import('./pages/landing/Payment'));
const ThankYouPage = React.lazy(() => import('./pages/landing/ThankYou'));
const PaymentFailed = React.lazy(() => import('./pages/landing/PaymentFailed'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const DemoPage = React.lazy(() => import('./pages/landing/Demo'));
const AboutUsPage = React.lazy(() => import('./pages/landing/AboutUs'));
const HelpCenterPage = React.lazy(() => import('./pages/landing/HelpCentre'));
// Dashboard Pages
const ChatflowsPage = React.lazy(() => import('./pages/Dashboard/Chatflows'));
const ConversationsPage = React.lazy(() => import('./pages/Dashboard/Conversations'));
const CustomersPage = React.lazy(() => import('./pages/Dashboard/Customers'));
const AnalyticsPage = React.lazy(() => import('./pages/Dashboard/Analytics'));
const TrainingPage = React.lazy(() => import('./pages/Dashboard/Training'));
const IntegrationsPage = React.lazy(() => import('./pages/Dashboard/Integrations'));
const BillingPage = React.lazy(() => import('./pages/Dashboard/Billing'));
const SettingsPage = React.lazy(() => import('./pages/Dashboard/Settings'));
const NotificationsPage = React.lazy(() => import('./pages/Dashboard/Notifications'));

// --- ADD THIS LINE ---
const HelpCenter = React.lazy(() => import('./pages/Dashboard/Help'));

// Dashboard Page
const DashboardPage = React.lazy(() => import('./pages/Dashboard/Dashboard'));

function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="spinner"></div>
    </div>
  );
}

// This layout has Navbar and Footer
function LandingLayout() {
  return (
    <div className="bg-white text-gray-900 antialiased">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// 2. This is a new layout for Auth pages (no Navbar/Footer)
function AuthLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Group 1: Public Pages (with Navbar/Footer) */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="thank-you" element={<ThankYouPage />} />
          <Route path="payment-failed" element={<PaymentFailed />} />
          <Route path="demo" element={<DemoPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="help" element={<HelpCenterPage />} />
        </Route>

        {/* Group 2: Auth Pages (no Navbar/Footer) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* Group 3: Protected Pages (must be logged in) */}
        <Route element={<ProtectedRoute />}>
          {/* This route now correctly uses the imported DashboardLayout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="chatflows" element={<ChatflowsPage />} />
            <Route path="conversations" element={<ConversationsPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="integrations" element={<IntegrationsPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />

            {/* --- ADD THIS LINE --- */}
            <Route path="help" element={<HelpCenter />} />

          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;