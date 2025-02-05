import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Dashboard } from './Dashboard';
import { Properties } from './Properties';
import { Settings } from './Settings';
import { Leads } from './Leads';
import Login from "../Logins/Login";

export interface Property {
  id: number;
  image: string;
  title: string;
  address: string;
  price: string;
  status: 'Occupied' | 'Available' | 'Maintenance';
}

const initialProperties: Property[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    title: "Modern Apartment",
    address: "123 Main St, Suite 4B",
    price: "$2,500/month",
    status: "Occupied"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    title: "Luxury Condo",
    address: "456 Park Ave, Unit 12",
    price: "$3,200/month",
    status: "Available"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    title: "Family Home",
    address: "789 Oak Rd",
    price: "$4,000/month",
    status: "Maintenance"
  }
];

function CommonDashboard() {
  const navigate = useNavigate(); // Hook for navigation
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      navigate('/Login'); // Redirect to login if no user found
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session storage
    setIsAuthenticated(false);
    navigate("/Login"); // Redirect to login page
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  const handleUpdateProperty = (updatedProperty: Property) => {
    setProperties(properties.map(property =>
      property.id === updatedProperty.id ? updatedProperty : property
    ));
  };

  const handleDeleteProperty = (propertyId: number) => {
    setProperties(properties.filter(property => property.id !== propertyId));
  };

  const handleStatusChange = (propertyId: number, newStatus: Property['status']) => {
    setProperties(properties.map(property =>
      property.id === propertyId ? { ...property, status: newStatus } : property
    ));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} properties={properties} />;
      case 'properties':
        return (
          <Properties 
            properties={properties}
            onUpdateProperty={handleUpdateProperty}
            onDeleteProperty={handleDeleteProperty}
            onStatusChange={handleStatusChange}
          />
        );
      case 'settings':
        return <Settings />;
      case 'leads':
        return <Leads />;
      default:
        return <Dashboard onNavigate={handleNavigate} properties={properties} />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated || !user) {
    return <Login onSwitchToSignup={() => {}} onLoginSuccess={() => {}} />;
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 sm:hidden transition-opacity duration-200 ease-in-out ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      
      <div className={`fixed sm:sticky top-0 w-64 h-screen z-40 sm:z-auto transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
        />
      </div>

      <div className="flex-1 flex flex-col min-h-screen sm:min-h-0">
        <Header 
          onMenuClick={toggleSidebar} 
          onLogout={handleLogout} 
          user={user} 
        />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default CommonDashboard;
