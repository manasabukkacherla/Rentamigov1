import React from 'react';
import { Bell, X, Info, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import { Notification } from './types';
import { Link } from 'react-router-dom';

interface NotificationDropdownProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

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
      return 'text-black bg-black/5';
    case 'success':
      return 'text-black bg-black/5';
    case 'warning':
      return 'text-black bg-black/5';
    case 'error':
      return 'text-black bg-black/5';
    default:
      return 'text-black bg-black/5';
  }
};

export function NotificationDropdown({ notifications, isOpen, onClose, onMarkAsRead }: NotificationDropdownProps) {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="fixed right-2 top-16 sm:right-4 z-50 w-full max-w-sm bg-white rounded-xl shadow-lg border border-black/10 overflow-hidden">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-black/10 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-black">Notifications</h3>
            <p className="text-xs text-black/60">{unreadCount} unread</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-black/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-[60vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-black/60">
              No notifications yet
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`p-3 sm:p-4 hover:bg-black/5 transition-colors ${!notification.read ? 'bg-black/[0.02]' : ''}`}
                  >
                    <div className="flex gap-3">
                      <div className={`p-2 rounded-lg shrink-0 ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black">{notification.title}</p>
                        <p className="text-xs text-black/60 mt-0.5 line-clamp-2">{notification.message}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-black/40">{notification.timestamp}</span>
                          {!notification.read && (
                            <button
                              onClick={() => onMarkAsRead(notification.id)}
                              className="text-xs text-red-500 hover:text-red-600"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-black/10">
          <Link
            to="/notifications"
            className="block w-full py-2 text-center text-sm text-black hover:bg-black/5 rounded-lg transition-colors"
            onClick={onClose}
          >
            View all notifications
          </Link>
        </div>
      </div>
    </>
  );
}