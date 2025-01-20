import React from 'react';
import { LogOut, Moon, Sun } from 'lucide-react';
import { useApp } from './AppContext';

export function Navbar() {
  const { state, dispatch } = useApp();
  const { user, theme } = state;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between h-auto sm:h-16 items-center py-2 sm:py-0">
          <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Rental Manager
            </h1>
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{user.role}</div>
            </div>
            
            <div className="hidden sm:block">
              <button
                onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
            
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => {/* Add logout handler */}}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}