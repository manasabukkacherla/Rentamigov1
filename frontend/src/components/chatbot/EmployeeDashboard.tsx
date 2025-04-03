import React, { useState } from 'react';
import { Users, MessageCircle } from 'lucide-react';
import Notifications from '../Empdashboaed/components/Notifications';
import { ChatNotification } from '@/types/chat';

interface EmployeeDashboardProps {
  chatNotifications: ChatNotification[];
  onRespondToChat: (notification: ChatNotification, response: string) => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  chatNotifications,
  onRespondToChat,
}) => {
  const pendingChats = chatNotifications.filter(n => n.status === 'pending').length;
  const activeChats = chatNotifications.filter(n => n.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Requests</p>
                <h3 className="text-2xl font-semibold text-gray-900">{pendingChats}</h3>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Chats</p>
                <h3 className="text-2xl font-semibold text-gray-900">{activeChats}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <h3 className="text-2xl font-semibold text-gray-900">{chatNotifications.length}</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Chat Support Interface */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Notifications
            chatNotifications={chatNotifications}
            onRespondToChat={onRespondToChat}
            defaultFilter="chat"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;