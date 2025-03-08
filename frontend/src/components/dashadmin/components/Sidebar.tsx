import React from 'react';
import { LogOut } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, activeSection, onSectionChange }) => {
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200">
      <div className="h-full flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">PropAdmin</h1>
        </div>

        <nav className="flex-1 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`flex items-center w-full px-4 py-3 mb-2 rounded-lg ${
                  activeSection === item.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;