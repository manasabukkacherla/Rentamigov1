import React, { useState, useRef, useEffect, useContext } from 'react';
import { Bot } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'bot' | 'user';
  timestamp: Date;
}

type MessageType = 'bot' | 'user';

interface ChatNotification {
  id: string;
  userId: string;
  userType: string;
  messages: Message[];
  status: 'pending' | 'active' | 'resolved';
  timestamp: Date;
  title: string;
}

interface ChatbotProps {
  onNewChatNotification?: (notification: ChatNotification) => void;
  currentChat: ChatNotification | null;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onNewChatNotification, currentChat }) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: Date.now().toString(),
    content: 'Hello! Are you a tenant looking for support or an agent interested in listing properties?',
    type: 'bot',
    timestamp: new Date(),
  }]);

  const [isWaitingForEmployee, setIsWaitingForEmployee] = useState(false);
  const [userType, setUserType] = useState<string>('unknown');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleUserMessage = (message: string) => {
    if (!message.trim()) return;

    const userMessage = addMessage(message, 'user');

    const response = 'I\'ll connect you with a specialist who can better assist you. Please wait a moment.';
    const botMessage = addMessage(response, 'bot');

    setIsWaitingForEmployee(true);
    setTimeout(() => {
      setIsWaitingForEmployee(false);
    }, 2000);

    const notification: ChatNotification = {
      id: Date.now().toString(),
      userId: 'user-' + Date.now(),
      userType: userType,
      messages: [...messages, userMessage, botMessage],
      status: 'pending',
      timestamp: new Date(),
      title: `New ${userType === 'tenant' ? 'Tenant' : 'Agent'} Support Request`,
    };

    if (onNewChatNotification) {
      onNewChatNotification(notification);
    }

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Bot className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold">Rentamigo Assistant</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto mb-20">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-container fixed bottom-0 left-0 w-full p-4 border-t bg-white">
        <input
          type="text"
          className="w-full p-3 border rounded-md"
          placeholder={isWaitingForEmployee ? "Waiting for specialist..." : "Type your message..."}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleUserMessage((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = '';
            }
          }}
          disabled={isWaitingForEmployee}
        />
      </div>
    </div>
  );
};

// Styles
const styles = `
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .h-screen { height: 100vh; }
  .bg-white { background-color: white; }
  .rounded-lg { border-radius: 10px; }
  .shadow-lg { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
  .overflow-hidden { overflow: hidden; }
  .items-center { align-items: center; }
  .gap-2 { gap: 8px; }
  .p-4 { padding: 16px; }
  .border-b { border-bottom: 1px solid #ddd; }
  .space-y-4 { margin-bottom: 16px; }
  .message { padding: 10px; margin-bottom: 8px; }
  .message.bot { background-color: #e0f7fa; }
  .message.user { background-color: #f1f1f1; }
  .message-content { max-width: 80%; }
  .message-content { display: inline-block; padding: 8px 12px; border-radius: 4px; }
  .w-full { width: 100%; }
  .p-3 { padding: 12px; }
  .border { border: 1px solid #ddd; }
  .rounded-md { border-radius: 4px; }
  .fixed { position: fixed; }
  .bottom-0 { bottom: 0; }
  .left-0 { left: 0; }
  .chat-input-container { background-color: white; border-top: 1px solid #ddd; }
`;

const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = styles;
head.appendChild(style);
