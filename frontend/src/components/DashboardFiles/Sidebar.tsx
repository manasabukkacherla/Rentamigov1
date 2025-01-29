import React from 'react';
import { Home, Building2, Settings, Users } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { icon: Home, text: 'Dashboard', id: 'dashboard' },
  { icon: Building2, text: 'Properties', id: 'properties' },
  { icon: Users, text: 'Leads', id: 'leads' },
  { icon: Settings, text: 'Settings', id: 'settings' },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="h-full bg-white border-r border-gray-200 p-4 sm:p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=96&h=96&fit=crop&auto=format"
          alt="RentEase Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
        />
        <h1 className="text-lg sm:text-xl font-bold">RentEase</h1>
      </div>
      
      <nav className="space-y-1 sm:space-y-2 flex-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.id);
            }}
            className={`flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
              currentPage === item.id
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">{item.text}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}