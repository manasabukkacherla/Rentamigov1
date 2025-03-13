import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  Bell,
  Settings,
  Sun,
  Moon,
  UserPlus,
  X,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  darkMode,
  toggleDarkMode,
  activeSection,
  onSectionChange,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'properties', icon: Building2, label: 'Properties' },
    { id: 'leads', icon: UserPlus, label: 'Leads' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    // Clear all session storage
    sessionStorage.clear();
    // Clear all local storage
    localStorage.clear();
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800
        transition-transform duration-300 ease-in-out z-50
        w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-black dark:text-white">PropManager</h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  activeSection === item.id ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-800">
          
          
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;