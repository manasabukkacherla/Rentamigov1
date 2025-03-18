import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Home, Users, Settings, Menu, X, LogOut, Bell, CreditCard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NotificationDropdown } from './NotificationDropdown';
import { Notification } from '../types';
import { LogoutAnimation } from './LogoutAnimation';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Home, label: 'Properties', path: '/properties' },
  { icon: Users, label: 'Leads', path: '/leads' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: CreditCard, label: 'Plans', path: '/plans' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Lead',
    message: 'You have received a new lead for Luxury Villa with Pool',
    type: 'success',
    timestamp: '2 minutes ago',
    read: false
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'Rent payment received for Modern City Apartment',
    type: 'info',
    timestamp: '1 hour ago',
    read: true
  }
];

interface SidebarProps {
  onNewNotification: (notification: Notification) => void;
}

export function Sidebar({ onNewNotification }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menu-button');
      
      if (isMobileMenuOpen && 
          sidebar && 
          menuButton && 
          !sidebar.contains(event.target as Node) && 
          !menuButton.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      // Here you would typically clear user session, tokens etc
      navigate('/');
      window.location.reload(); // Force reload to clear all state
    }, 2000);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: 'New Property Inquiry',
        message: 'You have a new inquiry for Luxury Villa',
        type: 'success',
        timestamp: 'Just now',
        read: false
      };
      onNewNotification(newNotification);
    }, 30000);

    return () => clearInterval(interval);
  }, [onNewNotification]);

  if (isLoggingOut) {
    return <LogoutAnimation />;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        id="menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-0 left-0 p-4 z-50"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-black" />
        ) : (
          <Menu className="w-5 h-5 text-black" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-black/10 z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64
        `}
      >
        {/* Navigation */}
        <nav className="mt-14 lg:mt-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isNotifications = item.path === '/notifications';
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-3 sm:px-4 md:px-5 py-2.5 sm:py-3
                  text-black/70 hover:bg-black/5 transition-colors
                  text-sm sm:text-base relative
                  ${isActive ? 'bg-black/5 border-r-4 border-black text-black font-medium' : ''}
                `}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-3" />
                <span>{item.label}</span>
                {isNotifications && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section with User Info and Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-black/10">
          {/* User Info */}
          <div className="p-3 sm:p-4 md:p-5 border-b border-black/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-medium text-black truncate">John Doe</p>
                <p className="text-xs sm:text-sm text-black/60 truncate">john@example.com</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 text-red-500 hover:bg-black/5 transition-colors text-sm sm:text-base"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}