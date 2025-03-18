import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { Properties } from './pages/Properties';
import { Leads } from './pages/Leads';
import { Settings } from './pages/Settings';
import { Notifications } from './pages/Notifications';
import { Plans } from './pages/Plans';

import { Notification } from './types';

function UsrDashboad() {
  const [toasts, setToasts] = useState<Notification[]>([]);

  const removeToast = (id: string) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  };

  const addToast = (notification: Notification) => {
    setToasts(current => [...current, notification]);
  };

  useEffect(() => {
    const handleShowToast = (event: CustomEvent<Notification>) => {
      addToast(event.detail);
    };

    window.addEventListener('showToast', handleShowToast as EventListener);
    return () => window.removeEventListener('showToast', handleShowToast as EventListener);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Desktop Header */}
        <div className="hidden lg:block fixed top-0 left-64 right-0 h-16 bg-white border-b border-black/10 z-40">
          <div className="h-full flex items-center justify-start px-6">
            <h1 className="text-xl font-bold text-black">RentAmigo</h1>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-black/10 flex items-center justify-end px-3 z-50">
          <h1 className="text-lg font-bold text-black">RentAmigo</h1>
        </div>

        {/* Sidebar */}
       

        {/* Main Content */}
        <main className="lg:ml-64 min-h-screen pt-14 lg:pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/plans" element={<Plans />} />
          </Routes>
        </main>

        {/* Toast Notifications */}
        
      </div>
    </Router>
  );
}

export default UsrDashboad;