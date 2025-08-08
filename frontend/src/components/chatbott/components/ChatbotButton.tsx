import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Chatbot } from './Chatbot';

export const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-110"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-full max-w-[320px] h-[450px] shadow-2xl rounded-lg overflow-hidden">
          <Chatbot />
        </div>
      )}
    </>
  );
};