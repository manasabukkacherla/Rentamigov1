import React, { useState } from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, X, Send, Users } from 'lucide-react';
import type { Notification } from '../types';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Maintenance Request',
    message: 'Urgent maintenance required at Luxury Apartment 2B - Water leak reported',
    type: 'warning',
    read: false,
    timestamp: '2025-03-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'New Tenant Inquiry',
    message: 'Emma Wilson has scheduled a viewing for Commercial Space 5A',
    type: 'info',
    read: true,
    timestamp: '2025-03-15T09:15:00Z'
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Monthly rent payment received from John Smith for Apartment 3C',
    type: 'success',
    read: false,
    timestamp: '2025-03-14T16:45:00Z'
  },
  {
    id: '4',
    title: 'System Update',
    message: 'Property management system will undergo maintenance tonight at 2 AM',
    type: 'info',
    read: false,
    timestamp: '2025-03-14T14:20:00Z'
  }
];

const NotificationCard: React.FC<{
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}> = ({ notification, onMarkAsRead }) => {
  const typeIcons = {
    info: <Info className="w-5 h-5 text-gray-600" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertTriangle className="w-5 h-5 text-red-500" />
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`p-4 rounded-xl border ${
      notification.read
        ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'
        : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600'
    }`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {typeIcons[notification.type]}
        </div>
        <div className="flex-grow">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {notification.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTimestamp(notification.timestamp)}
              </span>
              {!notification.read && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
};

const NewNotificationForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Send New Notification</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Recipients
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white">
              <option value="all">All Users</option>
              <option value="tenants">All Tenants</option>
              <option value="staff">All Staff</option>
              <option value="individual">Select Individual</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            placeholder="Notification title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            placeholder="Enter your message"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type
          </label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white">
            <option value="info">Information</option>
            <option value="warning">Warning</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Notification
          </button>
        </div>
      </form>
    </div>
  );
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showNewNotification, setShowNewNotification] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => !n.read);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-light text-gray-900 dark:text-white tracking-tight">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900">
              {unreadCount} unread
            </span>
          )}
        </div>
        <button
          onClick={() => setShowNewNotification(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send Notification
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium ${
              filter === 'all'
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 text-sm font-medium ${
              filter === 'unread'
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Unread
          </button>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="btn btn-secondary text-sm"
          >
            Mark all as read
          </button>
        )}
      </div>

      {showNewNotification && (
        <div className="mb-6">
          <NewNotificationForm onClose={() => setShowNewNotification(false)} />
        </div>
      )}

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;