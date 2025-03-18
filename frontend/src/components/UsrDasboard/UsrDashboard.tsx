import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // Removed unnecessary Router
import { Sidebar } from "./Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Properties } from "./pages/Properties";
import { Leads } from "./pages/Leads";
import { Settings } from "./pages/Settings";
import { Notifications } from "./pages/Notifications";
import { ToastContainer } from "./ToastContainer";
import { Notification } from "./types";

function UsrDashboard() {
  const [toasts, setToasts] = useState<Notification[]>([]);

  // Function to remove toast
  const removeToast = (id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  // Function to add toast
  const addToast = (notification: Notification) => {
    setToasts((current) => [...current, notification]);
  };

  // Event listener for toast notifications
  useEffect(() => {
    const handleShowToast = (event: CustomEvent<Notification>) => {
      addToast(event.detail);
    };

    window.addEventListener("showToast", handleShowToast as EventListener);
    return () => window.removeEventListener("showToast", handleShowToast as EventListener);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onNewNotification={addToast} />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-14 lg:pt-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="leads" element={<Leads />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="*" element={<h1 className="text-center mt-10">Page Not Found</h1>} />
        </Routes>
      </main>

      {/* Toast Notifications */}
      <ToastContainer notifications={toasts} onClose={removeToast} />
    </div>
  );
}

export default UsrDashboard;
