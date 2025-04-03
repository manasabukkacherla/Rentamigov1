import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { ChatNotification } from '../../types/chat';

interface ChatSupportProps {
  notifications: ChatNotification[];
  onRespond: (notification: ChatNotification, response: string) => void;
}

export const ChatSupport: React.FC<ChatSupportProps> = ({ notifications, onRespond }) => {
  const [selectedChat, setSelectedChat] = useState<ChatNotification | null>(null);
  const [response, setResponse] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedChat && response.trim()) {
      onRespond(selectedChat, response);
      setResponse('');
    }
  };

  return (
    <div className="h-full flex">
      {/* Chat List */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Support Chats</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {notifications.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 text-left hover:bg-gray-50 ${
                selectedChat?.id === chat.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">{chat.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(chat.timestamp).toLocaleString()}
                  </p>
                </div>
                {chat.status === 'pending' && (
                  <span className="ml-auto px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                    Pending
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold">{selectedChat.title}</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.type === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Type your response..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start responding
          </div>
        )}
      </div>
    </div>
  );
};