import React from 'react';
import { LogOut, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onLogout: () => void;
}

export function Header({ onMenuClick, onLogout }: HeaderProps) {
  const userName = "John Doe"; // This would typically come from your auth context/state

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="sm:hidden p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Welcome, {userName}</h2>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}