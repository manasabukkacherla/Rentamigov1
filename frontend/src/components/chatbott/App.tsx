import React, { useState, useEffect } from 'react';
import { Chatbot } from './components/Chatbot';
import { ChatNotification } from './types/chat';
import EmployeeDashboard from './components/EmployeeDashboard';

// Create a context to share chat notifications
export const ChatContext = React.createContext<{
  chatNotifications: ChatNotification[];
  setChatNotifications: React.Dispatch<React.SetStateAction<ChatNotification[]>>;
}>({
  chatNotifications: [],
  setChatNotifications: () => {},
});

function Chatbottt() {
  const [chatNotifications, setChatNotifications] = useState<ChatNotification[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [totalRequests, setTotalRequests] = useState(0);

  // Update total requests whenever chat notifications change
  useEffect(() => {
    const activeAndPendingChats = chatNotifications.filter(
      chat => chat.status === 'active' || chat.status === 'pending'
    ).length;
    setTotalRequests(activeAndPendingChats);
  }, [chatNotifications]);

  const handleNewChatNotification = (notification: ChatNotification) => {
    setChatNotifications(prev => {
      const existingIndex = prev.findIndex(n => n.id === notification.id);
      if (existingIndex >= 0) {
        const newNotifications = [...prev];
        newNotifications[existingIndex] = notification;
        return newNotifications;
      }
      setCurrentChatId(notification.id);
      return [...prev, notification];
    });
  };

  const handleRespondToChat = (notification: ChatNotification, response: string) => {
    const isResolved = response === '--- Chat marked as resolved ---';
    
    const updatedNotification = {
      ...notification,
      messages: [
        ...notification.messages,
        ...(isResolved ? [] : [{
          id: Date.now().toString(),
          content: response,
          type: 'employee' as const,
          timestamp: new Date(),
        }]),
      ],
      status: isResolved ? 'resolved' as const : 'active' as const,
    };

    setChatNotifications(prev =>
      prev.map(n => (n.id === notification.id ? updatedNotification : n))
    );

    // Reset currentChatId when chat is resolved
    if (isResolved) {
      setCurrentChatId(null);
    }
  };

  const getCurrentChat = () => {
    if (!currentChatId) return null;
    const chat = chatNotifications.find(n => n.id === currentChatId);
    return chat?.status === 'resolved' ? null : chat;
  };

  return (
    <ChatContext.Provider value={{ chatNotifications, setChatNotifications }}>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-2rem)]">
              <div className="h-full">
                <Chatbot 
                  onNewChatNotification={handleNewChatNotification}
                  chatNotifications={chatNotifications}
                  currentChat={getCurrentChat()}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-2rem)]">
              <EmployeeDashboard
                chatNotifications={chatNotifications}
                onRespondToChat={handleRespondToChat}
                totalRequests={totalRequests}
              />
            </div>
          </div>
        </div>
      </div>
    </ChatContext.Provider>
  );
}

export default Chatbottt;