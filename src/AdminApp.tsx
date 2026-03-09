import { useState } from "react";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { PanchangManagement } from "./components/admin/PanchangManagement";
import { FestivalManagement } from "./components/admin/FestivalManagement";
import { Toaster } from "./components/ui/sonner";

type AdminScreen =
  | "dashboard"
  | "panchang"
  | "festivals"
  | "astrology"
  | "pujas"
  | "shop"
  | "users"
  | "subscriptions"
  | "notifications";

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<AdminScreen>("dashboard");

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as AdminScreen);
  };

  const handleBack = () => {
    setCurrentScreen("dashboard");
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      
      {currentScreen === "dashboard" && (
        <AdminDashboard onNavigate={handleNavigate} />
      )}

      {currentScreen === "panchang" && (
        <PanchangManagement onBack={handleBack} />
      )}

      {currentScreen === "festivals" && (
        <FestivalManagement onBack={handleBack} />
      )}

      {currentScreen === "astrology" && (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleBack}
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-2xl text-gray-900 mb-4">Astrology Content Management</h2>
              <p className="text-gray-600">
                Manage horoscopes, predictions, zodiac content, and Kundali templates.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Full CRUD interface similar to Panchang and Festival management
              </p>
            </div>
          </div>
        </div>
      )}

      {currentScreen === "pujas" && (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleBack}
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-2xl text-gray-900 mb-4">Puja Library Management</h2>
              <p className="text-gray-600">
                Manage puja guides, rituals, mantras, audio files, and video content.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Full CRUD interface with media upload capabilities
              </p>
            </div>
          </div>
        </div>
      )}

      {currentScreen === "shop" && (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleBack}
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-2xl text-gray-900 mb-4">Shop Management</h2>
              <p className="text-gray-600">
                Manage products, inventory, pricing, orders, and delivery tracking.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Complete e-commerce management with order fulfillment
              </p>
            </div>
          </div>
        </div>
      )}

      {currentScreen === "users" && (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleBack}
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-2xl text-gray-900 mb-4">User Management</h2>
              <p className="text-gray-600">
                View, edit, and manage user accounts, profiles, birth details, and permissions.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                User analytics, engagement metrics, and account management
              </p>
            </div>
          </div>
        </div>
      )}

      {currentScreen === "subscriptions" && (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleBack}
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-2xl text-gray-900 mb-4">Subscription Plans Management</h2>
              <p className="text-gray-600">
                Configure premium plans, pricing tiers, features, and billing cycles.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Subscription analytics, revenue tracking, and plan management
              </p>
            </div>
          </div>
        </div>
      )}

      {currentScreen === "notifications" && (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleBack}
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-2xl text-gray-900 mb-4">Notification Management</h2>
              <p className="text-gray-600">
                Send push notifications, alerts, and scheduled messages to users.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Campaign management, targeting, and notification analytics
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}