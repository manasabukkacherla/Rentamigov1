import React from 'react';
import { Info, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import { Notification } from '../types';
import { useNavigate } from 'react-router-dom';

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
  },
  {
    id: '3',
    title: 'Maintenance Required',
    message: 'Tenant reported maintenance issue at Seaside Condo',
    type: 'warning',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: '4',
    title: 'Payment Overdue',
    message: 'Rent payment is overdue for Downtown Loft',
    type: 'error',
    timestamp: '1 day ago',
    read: true
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return Info;
    case 'success':
      return CheckCircle;
    case 'warning':
      return AlertTriangle;
    case 'error':
      return AlertOctagon;
    default:
      return Info;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return 'text-blue-500 bg-blue-50 border-blue-100';
    case 'success':
      return 'text-green-500 bg-green-50 border-green-100';
    case 'warning':
      return 'text-yellow-500 bg-yellow-50 border-yellow-100';
    case 'error':
      return 'text-red-500 bg-red-50 border-red-100';
    default:
      return 'text-blue-500 bg-blue-50 border-blue-100';
  }
};

const getNavigationPath = (notification: Notification) => {
  const title = notification.title.toLowerCase();
  const message = notification.message.toLowerCase();

  // Check for lead-related notifications
  if (title.includes('lead') || message.includes('lead')) {
    return '/leads';
  }

  // Check for property-related notifications
  if (
    title.includes('property') ||
    title.includes('maintenance') ||
    message.includes('property') ||
    message.includes('maintenance') ||
    message.includes('rent') ||
    message.includes('tenant')
  ) {
    return '/properties';
  }

  return null;
};

export function Notifications() {
  const navigate = useNavigate();

  const handleNotificationClick = (notification: Notification) => {
    const path = getNavigationPath(notification);
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">Notifications</h1>
      
      <div className="space-y-3">
        {mockNotifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          const colorClass = getNotificationColor(notification.type);
          const path = getNavigationPath(notification);
          
          return (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`
                p-4 rounded-xl border ${!notification.read ? 'bg-white shadow-sm' : 'bg-black/[0.02]'}
                ${path ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
              `}
            >
              <div className="flex gap-4">
                <div className={`p-2 rounded-lg border ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-medium text-black">{notification.title}</h3>
                      <p className="text-sm text-black/70 mt-1">{notification.message}</p>
                      {path && (
                        <p className="text-xs text-black/40 mt-2">Click to view details</p>
                      )}
                    </div>
                    <span className="text-xs text-black/40 whitespace-nowrap">{notification.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}