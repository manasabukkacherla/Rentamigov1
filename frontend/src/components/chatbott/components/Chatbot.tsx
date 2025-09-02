import React, { useState, useRef, useEffect } from 'react';
import { Message, MessageType, ChatNotification, UserType } from '../types/chat';
import { predefinedResponses, userTypeResponses } from '../data/responses';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Bot } from 'lucide-react';

interface ChatbotProps {
  onNewChatNotification?: (notification: ChatNotification) => void;
  currentChat: ChatNotification | null;
}

export const Chatbot: React.FC<ChatbotProps> = ({ 
  onNewChatNotification, 
  currentChat 
}) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: Date.now().toString(),
    content: 'Hello! Are you a tenant looking for support or an agent interested in listing properties?',
    type: 'bot',
    timestamp: new Date(),
  }]);
  const [isWaitingForEmployee, setIsWaitingForEmployee] = useState(false);
  const [userType, setUserType] = useState<UserType>('unknown');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset state when currentChat becomes null (chat resolved)
  useEffect(() => {
    if (!currentChat) {
      setMessages([{
        id: Date.now().toString(),
        content: 'Hello! Are you a tenant looking for support or an agent interested in listing properties?',
        type: 'bot',
        timestamp: new Date(),
      }]);
      setIsWaitingForEmployee(false);
      setUserType('unknown');
    }
  }, [currentChat]);

  useEffect(() => {
    if (currentChat) {
      setMessages(currentChat.messages);
      setIsWaitingForEmployee(currentChat.status !== 'resolved');
      setUserType(currentChat.userType);
    }
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (content: string, type: MessageType) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const detectUserType = (message: string): UserType => {
    const lowercaseMsg = message.toLowerCase();
    
    if (lowercaseMsg.includes('tenant') || lowercaseMsg.includes('renter')) {
      return 'tenant';
    }
    if (lowercaseMsg.includes('agent') || lowercaseMsg.includes('broker') || lowercaseMsg.includes('realtor')) {
      return 'agent';
    }
    
    const hasTenantKeywords = userTypeResponses.tenant.some(keyword => 
      lowercaseMsg.includes(keyword)
    );
    const hasAgentKeywords = userTypeResponses.agent.some(keyword => 
      lowercaseMsg.includes(keyword)
    );

    if (hasTenantKeywords && !hasAgentKeywords) return 'tenant';
    if (hasAgentKeywords && !hasTenantKeywords) return 'agent';

    return 'unknown';
  };

  const findResponse = (message: string): string | null => {
    const lowercaseMessage = message.toLowerCase();
    const matchingResponse = predefinedResponses.find((response) =>
      response.keywords.some((keyword) => lowercaseMessage.includes(keyword))
    );
    return matchingResponse?.response || null;
  };

  const handleUserMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage = addMessage(message, 'user');

    if (userType === 'unknown') {
      const detectedType = detectUserType(message);
      if (detectedType !== 'unknown') {
        setUserType(detectedType);
      }
    }

    if (currentChat) {
      // If we already have an active chat, just update it
      const updatedNotification = {
        ...currentChat,
        messages: [...messages, userMessage],
        status: 'active' as const,
      };
      if (onNewChatNotification) {
        onNewChatNotification(updatedNotification);
      }
      return;
    }
    

    const response = findResponse(message);
    if (response) {
      setTimeout(() => {
        const botMessage = addMessage(response, 'bot');
        
        if (response.toLowerCase().includes("i'll connect you with")) {
          setIsWaitingForEmployee(true);
          createNewNotification([...messages, userMessage, botMessage]);
        }
      }, 500);
    } else {
      setIsWaitingForEmployee(true);
      const botMessage = addMessage(
        'I\'ll connect you with a specialist who can better assist you. Please wait a moment.',
        'bot'
      );
      createNewNotification([...messages, userMessage, botMessage]);
    }
  };

  const createNewNotification = (messageHistory: Message[]) => {
    if (onNewChatNotification) {
      const notification: ChatNotification = {
        id: Date.now().toString(),
        userId: 'user-' + Date.now(),
        userType: userType,
        messages: messageHistory,
        status: 'pending',
        timestamp: new Date(),
        title: `New ${userType === 'tenant' ? 'Tenant' : 'Agent'} Support Request`,
      };
      onNewChatNotification(notification);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Bot className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold">Propamigo Assistant</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t">
        <ChatInput
          onSendMessage={handleUserMessage}
          disabled={isWaitingForEmployee && !currentChat}
          placeholder={isWaitingForEmployee && !currentChat ? "Waiting for specialist..." : "Type your message..."}
        />
      </div>
    </div>
  );
};