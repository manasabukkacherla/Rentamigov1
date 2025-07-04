import React from 'react';
import { Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'New Property Listed',
      message: 'Luxury Villa in Beverly Hills has been successfully listed.',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Subscription Expiring',
      message: 'Premium subscription for John Doe will expire in 3 days.',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Employee Added',
      message: 'Sarah Johnson has been added as a Sales Executive.',
      time: '2 hours ago'
    },
    {
      id: 4,
      type: 'success',
      title: 'Property Sold',
      message: 'Beach House in Malibu has been marked as sold.',
      time: '3 hours ago'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="ml-4 flex-1">
                <p className="font-medium text-gray-900">{notification.title}</p>
                <p className="mt-1 text-gray-500">{notification.message}</p>
                <p className="mt-2 text-sm text-gray-400">{notification.time}</p>
              </div>
              <button className="ml-4 text-gray-400 hover:text-gray-600">
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="text-gray-600 hover:text-gray-900">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default Notifications;