import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Components
import Sidebar from './components/Sidebar';

// Pages
import DashboardOverview from './pages/DashboardOverview';
import PGListings from './pages/PGListings';
import PGDetails from './pages/PGDetails';
import Leads from './pages/Leads';
import Notifications from './pages/Notifications';
import Plans from './pages/Plans';
import RevenueAnalytics from './pages/RevenueAnalytics';
import ReviewsRatings from './pages/ReviewsRatings';
import Settings from './pages/Settings';

function Pgapp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 fixed w-full z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-900">PG Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Add New PG
              </button>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="p-6">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/listings" element={<PGListings />} />
              <Route path="/listings/:id" element={<PGDetails />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/revenue" element={<RevenueAnalytics />} />
              <Route path="/reviews" element={<ReviewsRatings />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
   
  );
}

export default Pgapp;