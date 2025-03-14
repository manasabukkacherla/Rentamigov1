import React, { useState } from 'react';
import { LayoutDashboard, Building2, Users, Bell, Settings, Sun, Moon, UserPlus, X, LogOut, Waves as Wave } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LogoutAnimation from './Logoutanimation';

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
  const [showLogoutAnimation, setShowLogoutAnimation] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'properties', icon: Building2, label: 'Properties' },
    { id: 'leads', icon: UserPlus, label: 'Leads' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    onClose(); // Close the sidebar first
    setShowLogoutAnimation(true);
  };

  const completeLogout = () => {
    // Clear all session storage
    sessionStorage.clear();
    // Clear all local storage
    localStorage.clear();
    // Redirect to login page
    navigate('/login');
  };

  if (showLogoutAnimation) {
    return <LogoutAnimation onAnimationComplete={completeLogout} />;
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center z-30">
        <div className="flex-1 flex items-center justify-between px-4 max-w-[100vw]">
          <button
            onClick={() => onSectionChange('menu')}
            className="p-2 -ml-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <h1 className="text-xl font-bold text-black absolute left-1/2 transform -translate-x-1/2">
            PropManager
          </h1>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200
        transition-transform duration-300 ease-in-out z-50
        w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:top-0 pt-0 lg:pt-0
      `}>
        {/* Desktop Header */}
        <div className="hidden lg:flex p-4 items-center justify-between">
          <h1 className="text-xl font-bold text-black">PropManager</h1>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 transition-colors ${
                  activeSection === item.id ? 'bg-gray-100 text-black' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Logout Button */}
        <div className="hidden lg:block absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-lg transition-colors"
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