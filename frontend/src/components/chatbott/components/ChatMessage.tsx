import React from 'react';
import { Message } from '../types/chat';
import { Bot, User, HeadsetIcon } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.type === 'user';
  const isEmployee = message.type === 'employee';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`flex items-start gap-2.5 ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? 'bg-blue-100'
              : isEmployee
              ? 'bg-green-100'
              : 'bg-gray-100'
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-blue-600" />
          ) : isEmployee ? (
            <HeadsetIcon className="w-5 h-5 text-green-600" />
          ) : (
            <Bot className="w-5 h-5 text-gray-600" />
          )}
        </div>
        <div
          className={`max-w-md px-4 py-2 rounded-lg ${
            isUser
              ? 'bg-blue-500 text-white'
              : isEmployee
              ? 'bg-green-500 text-white'
              : 'bg-gray-100'
          }`}
        >
          <p className="text-sm whitespace-pre-line">{message.content}</p>
          <span className="text-xs opacity-75 mt-1 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};