import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Leads from './components/Leads';
import Properties from './components/Properties';
import Users from './components/Users';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import { Menu } from 'lucide-react';

function Empapp() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Enhanced mock data with comparative revenue streams
  const dashboardStats = {
    totalProperties: 156,
    activeProperties: 142,
    rentedProperties: 128,
    monthlyRevenue: 284500,
    occupancyRate: 82,
    propertyTypes: [
      { type: 'Apartment', count: 80 },
      { type: 'House', count: 45 },
      { type: 'Commercial', count: 31 }
    ],
    revenueHistory: [
      { 
        month: 'Jan',
        rental: 250000,
        maintenance: 15000,
        deposits: 25000
      },
      { 
        month: 'Feb',
        rental: 265000,
        maintenance: 18000,
        deposits: 30000
      },
      { 
        month: 'Mar',
        rental: 275000,
        maintenance: 16000,
        deposits: 35000
      },
      { 
        month: 'Apr',
        rental: 284500,
        maintenance: 19000,
        deposits: 40000
      }
    ],
    leads: [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        propertyInterest: 'Luxury Apartment 2B',
        status: 'new',
        priority: 'high',
        createdAt: '2025-03-15T09:00:00Z'
      },
      {
        id: '2',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        phone: '+1 (555) 234-5678',
        propertyInterest: 'Commercial Space 5A',
        status: 'viewing-scheduled',
        priority: 'medium',
        createdAt: '2025-03-14T15:30:00Z'
      },
      {
        id: '3',
        name: 'Michael Brown',
        email: 'michael@example.com',
        phone: '+1 (555) 345-6789',
        propertyInterest: 'Family House 12',
        status: 'negotiating',
        priority: 'high',
        createdAt: '2025-03-13T11:15:00Z'
      }
    ]
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-black text-black dark:text-white shadow-lg border border-gray-200 dark:border-gray-800"
      >
        <Menu className="w-6 h-6" />
      </button>

      <Sidebar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection}
        onSectionChange={(section) => {
          setActiveSection(section);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className={`transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64 ml-0' : 'lg:ml-64 ml-0'
      }`}>
        <div className="pt-16 lg:pt-0">
          {activeSection === 'dashboard' && <Dashboard stats={dashboardStats} />}
          {activeSection === 'leads' && <Leads leads={dashboardStats.leads} />}
          {activeSection === 'properties' && <Properties />}
          {activeSection === 'users' && <Users />}
          {activeSection === 'notifications' && <Notifications />}
          {activeSection === 'settings' && <Settings />}
        </div>
      </div>
    </div>
  );
}

export default Empapp;