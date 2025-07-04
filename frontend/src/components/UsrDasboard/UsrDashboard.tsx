import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Properties } from "./pages/Properties";
import Leads from "./pages/Leads";
import { Settings } from "./pages/Settings";
import { Notifications } from "./pages/Notifications";
import { ToastContainer } from "./ToastContainer";
import { Notification } from "./types";

// Import Plans component
import Plans from "./pages/Plans";

// Define the types
import { Plan, TokenPackage } from "./types";

function UsrDashboard() {
  const [toasts, setToasts] = useState<Notification[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<Plan[]>([]);
  const [tokenPackages, setTokenPackages] = useState<TokenPackage[]>([]);

  // Example handler functions for editing and deleting
  const handleEditPlan = (plan: Plan) => {
    console.log("Editing plan", plan);
  };

  const handleEditToken = (token: TokenPackage) => {
    console.log("Editing token", token);
  };

  const handleDeletePlan = (planId: string) => {
    console.log("Deleting plan with ID", planId);
  };

  const handleDeleteToken = (tokenId: string) => {
    console.log("Deleting token with ID", tokenId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onNewNotification={function (notification: Notification): void {
        throw new Error("Function not implemented.");
      } } />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-14 lg:pt-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="leads" element={<Leads />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />

          {/* Pass props to Plans component */}
          <Route
            path="plans"
            element={
              <Plans
                subscriptionPlans={subscriptionPlans}
                tokenPackages={tokenPackages}
                onEditPlan={handleEditPlan}
                onEditToken={handleEditToken}
                onDeletePlan={handleDeletePlan}
                onDeleteToken={handleDeleteToken}
              />
            }
          />

          <Route
            path="*"
            element={<h1 className="text-center mt-10">Page Not Found</h1>}
          />
        </Routes>
      </main>

      {/* Toast Notifications */}
      <ToastContainer notifications={toasts} onClose={() => setToasts([])} />
    </div>
  );
}

export default UsrDashboard;
