import React, { useState } from 'react';
import { MessageCircle, Send, Users } from 'lucide-react';
import type { ChatNotification, Message } from '../types/chat';

interface NotificationsProps {
  chatNotifications?: ChatNotification[];
  onRespondToChat?: (notification: ChatNotification, response: string) => void;
  totalRequests: number;
}

const ChatNotificationCard: React.FC<{
  notification: ChatNotification;
  onRespond: (notification: ChatNotification, response: string) => void;
}> = ({ notification, onRespond }) => {
  const [response, setResponse] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (response.trim()) {
      onRespond(notification, response.trim());
      setResponse('');
    }
  };

  const getUserTypeLabel = () => {
    return notification.userType === 'tenant' ? 'Tenant' : 
           notification.userType === 'agent' ? 'Agent' : 'User';
  };

  const getUserTypeColor = () => {
    return notification.userType === 'tenant' ? 'bg-green-100 text-green-800' : 
           notification.userType === 'agent' ? 'bg-purple-100 text-purple-800' : 
           'bg-gray-100 text-gray-800';
  };

  const handleMarkAsResolved = () => {
    onRespond(notification, '--- Chat marked as resolved ---');
  };

  return (
    <div className="p-4 rounded-xl border bg-white border-blue-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <MessageCircle className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900">
                {notification.title}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getUserTypeColor()}`}>
                {getUserTypeLabel()}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                notification.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                notification.status === 'active' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(notification.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 mb-3 max-h-60 overflow-y-auto">
            {notification.messages.map((message: Message) => (
              <div key={message.id} className={`mb-2 ${
                message.type === 'user' ? 'text-blue-600' : 
                message.type === 'employee' ? 'text-green-600' : 'text-gray-600'
              }`}>
                <span className="font-medium">
                  {message.type === 'user' ? `${getUserTypeLabel()}: ` : 
                   message.type === 'employee' ? 'Employee: ' : 'Bot: '}
                </span>
                {message.content}
              </div>
            ))}
          </div>
          {notification.status !== 'resolved' && (
            <div className="space-y-3">
              <form onSubmit={handleSubmit} className="mt-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response..."
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!response.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
              <button
                onClick={handleMarkAsResolved}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Mark as Resolved
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Notifications: React.FC<NotificationsProps> = ({
  chatNotifications = [],
  onRespondToChat,
  totalRequests
}) => {
  const pendingChats = chatNotifications.filter(n => n.status === 'pending').length;
  const activeChats = chatNotifications.filter(n => n.status === 'active').length;

  const handleRespondToChat = (notification: ChatNotification, response: string) => {
    if (onRespondToChat) {
      onRespondToChat(notification, response);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Chat Support
            </h2>
            {pendingChats > 0 && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                {pendingChats} pending
              </span>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <h3 className="text-xl font-semibold text-gray-900">{pendingChats}</h3>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <h3 className="text-xl font-semibold text-gray-900">{activeChats}</h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <h3 className="text-xl font-semibold text-gray-900">{totalRequests}</h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {chatNotifications.length > 0 ? (
            chatNotifications.map((notification) => (
              <ChatNotificationCard
                key={notification.id}
                notification={notification}
                onRespond={handleRespondToChat}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No chat support requests at the moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;