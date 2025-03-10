import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  DollarSign, 
  Bell,
  BarChart3,
  Settings as SettingsIcon,
  Menu,
  X,
  UserCircle
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Properties from './components/Properties';
import Revenue from './components/Revenue';
import Employees from './components/Employees';
import Analytics from './components/Analytics';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import UserStats from './components/UserStats.tsx';

function Admindash() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties', icon: Home },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: UserCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <Properties />;
      case 'revenue':
        return <Revenue />;
      case 'employees':
        return <Employees />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <UserStats />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out
        lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          menuItems={menuItems} 
          activeSection={activeSection} 
          onSectionChange={(section) => {
            setActiveSection(section);
            setIsMobileMenuOpen(false);
          }} 
        />
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default Admindash;