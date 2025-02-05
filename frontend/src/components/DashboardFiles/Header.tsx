import React from 'react';
import { LogOut, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onLogout: () => void;
  user: {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    role: string;
    emailVerified: boolean;
  };
}

export function Header({ onMenuClick, onLogout, user }: HeaderProps) {
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
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Welcome, {user.fullName} ({user.username})
            </h2>
            <p className="text-sm text-gray-500">
              {user.email} | {user.phone} | {user.role}
            </p>
          </div>
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
