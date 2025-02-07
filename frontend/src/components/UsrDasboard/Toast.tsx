import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';
import { Notification } from './types';
import { useNavigate } from 'react-router-dom';

interface ToastProps {
  notification: Notification;
  onClose: () => void;
}

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success': return CheckCircle;
    case 'warning': return AlertTriangle;
    case 'error': return AlertOctagon;
    default: return Info;
  }
};

const getColors = (type: Notification['type']) => {
  switch (type) {
    case 'success': return 'bg-green-50 border-green-100 text-green-500';
    case 'warning': return 'bg-yellow-50 border-yellow-100 text-yellow-500';
    case 'error': return 'bg-red-50 border-red-100 text-red-500';
    default: return 'bg-blue-50 border-blue-100 text-blue-500';
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

  // Default to notifications page
  return '/notifications';
};

export function Toast({ notification, onClose }: ToastProps) {
  const navigate = useNavigate();
  const Icon = getIcon(notification.type);
  const colors = getColors(notification.type);

  // Set up auto-close timer when the toast is mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      // Add fade-out animation before closing
      const element = document.getElementById(`toast-${notification.id}`);
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(100%)';
      }
      // Close after animation
      setTimeout(onClose, 300);
    }, 5000); // Show for 5 seconds

    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click if the close button was clicked
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    // Navigate to the appropriate page based on notification content
    const path = getNavigationPath(notification);
    navigate(path);
    onClose();
  };

  return (
    <div
      id={`toast-${notification.id}`}
      onClick={handleClick}
      className={`
        flex items-center gap-3 p-4 rounded-lg border shadow-lg ${colors}
        animate-slide-in transition-all duration-300 cursor-pointer
        hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
      `}
      style={{ opacity: 1, transform: 'translateX(0)' }}
      role="button"
      tabIndex={0}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-medium">{notification.title}</p>
        <p className="text-sm opacity-80">{notification.message}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          const element = document.getElementById(`toast-${notification.id}`);
          if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateX(100%)';
          }
          setTimeout(onClose, 300);
        }}
        className="p-1 hover:bg-black/5 rounded-lg transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}