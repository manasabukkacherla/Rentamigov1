import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Dashboard } from './Dashboard';
import { Properties } from './Properties';
import { Settings } from './Settings';
import { Leads } from './Leads';
import Login from '../Logins/Login';


function CommonDashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // In a real app, this would be managed by an auth system

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <Properties />;
      case 'settings':
        return <Settings />;
      case 'leads':
        return <Leads />;
      default:
        return <Dashboard />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return <Login onSwitchToSignup={function (): void {
      throw new Error('Function not implemented.');
    } } onLoginSuccess={function (email: string): void {
      throw new Error('Function not implemented.');
    } } />;
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 sm:hidden transition-opacity duration-200 ease-in-out ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div className={`fixed sm:sticky top-0 w-64 h-screen z-40 sm:z-auto transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={(page) => {
            setCurrentPage(page);
            setIsSidebarOpen(false);
          }} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen sm:min-h-0">
        <Header onMenuClick={toggleSidebar} onLogout={handleLogout} />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default CommonDashboard;