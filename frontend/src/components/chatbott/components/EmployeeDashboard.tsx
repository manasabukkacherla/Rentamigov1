import React from 'react';
import Notifications from './Notifications';
import { ChatNotification } from '../types/chat';

interface EmployeeDashboardProps {
  chatNotifications: ChatNotification[];
  onRespondToChat: (notification: ChatNotification, response: string) => void;
  totalRequests: number;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  chatNotifications,
  onRespondToChat,
  totalRequests,
}) => {
  return (
    <div className="h-full">
      <Notifications
        chatNotifications={chatNotifications}
        onRespondToChat={onRespondToChat}
        totalRequests={totalRequests}
      />
    </div>
  );
};

export default EmployeeDashboard;