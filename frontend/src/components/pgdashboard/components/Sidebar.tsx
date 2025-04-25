import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  Bell,
  IndianRupee,
  Star,
  Settings,
  ClipboardList
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard Overview', path: '/' },
  { icon: Building2, label: 'PG Listings', path: '/listings' },
  { icon: Users, label: 'Leads', path: '/leads' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: ClipboardList, label: 'Plans', path: '/plans' },
  { icon: IndianRupee, label: 'Revenue Analytics', path: '/revenue' },
  { icon: Star, label: 'Reviews & Ratings', path: '/reviews' },
  { icon: Settings, label: 'Settings', path: '/settings' }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-20 ${
        isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      }`}
    >
      <div className="pt-16">
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;