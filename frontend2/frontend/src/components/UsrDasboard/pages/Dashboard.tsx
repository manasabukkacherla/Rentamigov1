import React, { useState, useEffect  } from 'react';
import { Home, Users, TrendingUp, DollarSign, Plus, Download, Bell, ArrowUpRight } from 'lucide-react';
import { StatCard } from '../StatCard';
import { Link } from 'react-router-dom';
import { Notification } from '../types';
import { CircularChart } from '../CircularChart';

const mockStats = {
  totalProperties: 24,
  totalLeads: 156,
  convertedLeads: 98,
  rentedProperties: 16,
  availableProperties: 8,
  soldProperties: 4,
};

const performanceMetrics = [
  {
    label: 'Available Properties',
    value: mockStats.availableProperties,
    color: 'rgb(0, 0, 0)',
    icon: Home
  },
  {
    label: 'Rented Properties',
    value: mockStats.rentedProperties,
    color: 'rgba(0, 0, 0, 0.8)',
    icon: DollarSign
  },
  {
    label: 'Sold Properties',
    value: mockStats.soldProperties,
    color: 'rgba(0, 0, 0, 0.6)',
    icon: TrendingUp
  },
  {
    label: 'Total Leads',
    value: mockStats.totalLeads,
    color: 'rgba(0, 0, 0, 0.4)',
    icon: Users
  },
  {
    label: 'Converted Leads',
    value: mockStats.convertedLeads,
    color: 'rgba(0, 0, 0, 0.2)',
    icon: Bell
  }
];

const recentActivities = [
  { id: 1, type: 'property', message: 'New property listing added: Luxury Villa', time: '2 hours ago' },
  { id: 2, type: 'lead', message: 'New lead received for Modern Apartment', time: '3 hours ago' },
  { id: 3, type: 'status', message: 'Property status updated to Rented', time: '5 hours ago' },
];

const quickActions = [
  { 
    icon: Plus, 
    label: 'Add Property', 
    link: '/properties' 
  },
  { 
    icon: Download, 
    label: 'Export Leads', 
    link: '/leads' 
  },
  { 
    icon: Bell, 
    label: 'View Notifications', 
    link: '/notifications' 
  },
];

// Demo notifications for testing
const demoNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Lead',
    message: 'You have received a new lead for Luxury Villa',
    type: 'success',
    timestamp: 'Just now',
    read: false
  },
  {
    id: '2',
    title: 'Payment Due',
    message: 'Rent payment is due for Modern Apartment',
    type: 'warning',
    timestamp: 'Just now',
    read: false
  },
  {
    id: '3',
    title: 'System Update',
    message: 'The system will undergo maintenance in 2 hours',
    type: 'info',
    timestamp: 'Just now',
    read: false
  },
  {
    id: '4',
    title: 'Error Detected',
    message: 'Failed to process payment for Downtown Loft',
    type: 'error',
    timestamp: 'Just now',
    read: false
  }
];

export function Dashboard() {
  const [selectedMetricIndex, setSelectedMetricIndex] = useState<number | null>(null);
  const [username, setUsername] = useState<string>('User'); // Default value
  const [role, setRole] = useState<string>(''); // Default value
  const [objectId, setObjectId] = useState<string>('');

  useEffect(() => {
    // Retrieve and parse user data from sessionStorage
    const storedUser = sessionStorage.getItem('user');

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.username) setUsername(userData.username);
        if (userData.role) setRole(userData.role);
        if (userData.objectId) setObjectId(userData.objectId); // Now this will work!

        // ✅ Log session data to verify
        console.log("Session User Data:", userData);
      } catch (error) {
        console.error("Error parsing session user data:", error);
      }
    }
  }, []);

  
  // Function to get a random notification from the demo list
  const getRandomNotification = () => {
    const randomIndex = Math.floor(Math.random() * demoNotifications.length);
    const notification = demoNotifications[randomIndex];
    return {
      ...notification,
      id: Date.now().toString(),
      timestamp: 'Just now'
    };
    
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-3 sm:space-y-6 bg-white min-h-screen">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-white border border-black/10 rounded-lg sm:rounded-xl p-3 sm:p-6 md:p-8 shadow-md sm:shadow-xl">
        <div className="relative z-10">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-3 text-black">
            Welcome back, {username}! <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-black/70 text-xs sm:text-base md:text-lg max-w-lg">
            Your Role: <strong>{role}</strong>
          </p>
          
          {/* Demo Toast Button */}
          <button
            onClick={() => {
              const notification = getRandomNotification();
              const event = new CustomEvent('showToast', { detail: notification });
              window.dispatchEvent(event);
            }}
            className="mt-4 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors"
          >
            Show Random Notification
          </button>
        </div>
        <div className="absolute top-0 right-0 w-24 sm:w-48 md:w-64 h-24 sm:h-48 md:h-64 bg-black/5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-16 sm:w-32 md:w-48 h-16 sm:h-32 md:h-48 bg-black/5 rounded-full filter blur-2xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

       {/* Quick Actions */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={`/Userdashboard${action.link}`}
              className="relative overflow-hidden bg-white border border-black/10 shadow-md hover:shadow-lg transition-all rounded-xl p-4 flex items-center justify-between no-underline"
              style={{ textDecoration: 'none' }}
            >
              <div className="relative z-10 flex items-center space-x-3">
                <div className="bg-black text-white p-2.5 rounded-lg">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-base font-semibold text-black">{action.label}</span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-black transform group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
            </Link>
          );
        })}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <StatCard
          title="Total Properties"
          value={mockStats.totalProperties}
          icon={Home}
          trend={12}
        />
        <StatCard
          title="Total Leads"
          value={mockStats.totalLeads}
          icon={Users}
          trend={8}
        />
        <StatCard
          title="Available Properties"
          value={mockStats.availableProperties}
          icon={TrendingUp}
        />
        <StatCard
          title="Rented Properties"
          value={mockStats.rentedProperties}
          icon={DollarSign}
          trend={15}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
        {/* Recent Activity */}
        <div className="bg-white border border-black/10 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-2.5 sm:p-4 md:p-5">
          <h2 className="text-sm sm:text-lg md:text-xl font-semibold mb-2 sm:mb-4 text-black">Recent Activity</h2>
          <div className="space-y-2 sm:space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-black/5 rounded-lg">
                <div className="bg-black text-white p-1.5 rounded-full shrink-0">
                  {activity.type === 'property' ? <Home className="w-3 h-3 sm:w-4 sm:h-4" /> :
                   activity.type === 'lead' ? <Users className="w-3 h-3 sm:w-4 sm:h-4" /> :
                   <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-black line-clamp-2">{activity.message}</p>
                  <p className="text-[10px] sm:text-xs text-black/50 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white border border-black/10 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-2.5 sm:p-4 md:p-5">
          <h2 className="text-sm sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 text-black">Performance Overview</h2>
          
          <div className="flex flex-col items-center gap-6">
            {/* Circular Chart */}
            <div className="w-full flex justify-center">
              <CircularChart 
                data={performanceMetrics.map((metric, index) => ({
                  label: metric.label,
                  value: metric.value,
                  color: metric.color
                }))}
                size={250}
                selectedIndex={selectedMetricIndex}
                onSegmentClick={(index) => setSelectedMetricIndex(index === selectedMetricIndex ? null : index)}
              />
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
              {performanceMetrics.map((metric, index) => {
                const Icon = metric.icon;
                const isSelected = selectedMetricIndex === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedMetricIndex(isSelected ? null : index)}
                    className={`
                      p-4 rounded-xl text-left transition-all duration-300
                      ${isSelected 
                        ? 'bg-black text-white scale-105 shadow-lg' 
                        : 'bg-black/5 text-black hover:bg-black/10'
                      }
                    `}
                  >
                    <div className={`
                      p-2 rounded-lg w-min mb-2
                      ${isSelected ? 'bg-white/20' : 'bg-black/10'}
                    `}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-lg font-semibold">
                      {metric.value}
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-white/70' : 'text-black/60'}`}>
                      {metric.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

