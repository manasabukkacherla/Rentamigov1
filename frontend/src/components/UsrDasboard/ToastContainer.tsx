import React from 'react';
import { Toast } from './Toast';
import { Notification } from './types';

interface ToastContainerProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export function ToastContainer({ notifications, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onClose={() => onClose(notification.id)}
        />
      ))}
    </div>
  );
}