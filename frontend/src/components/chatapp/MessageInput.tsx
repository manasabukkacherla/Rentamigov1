// client/src/components/MessageInput.tsx

import React, { useState, useEffect, useRef } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
  onTyping?: (isTyping: boolean) => void;
}

interface Conversation {
  roomId: string;
  otherUserId: string;
  lastMessage: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, onTyping }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // This function is called when the send button is clicked.
  const handleSend = () => {
    // Only send if text is not empty (trim any extra spaces)
    if (text.trim() !== "") {
      onSend(text);
      // Clear the input after sending
      setText("");
      // Notify that user stopped typing
      if (onTyping) {
        onTyping(false);
      }
    }
  };

  // Handle typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);

    // Notify that user is typing
    if (onTyping) {
      onTyping(true);

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to stop typing indicator after 2 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 2000);
    }
  };

  // Handle key press for Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch("/api/message", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          setError(data.message || "Registration failed.");
        } else {
          setConversations(data);
        }
      } catch (err) {
        setError("An error occurred during fetching conversations.");
      }
    };
  }, []);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#ffffff",
      }}
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{
          flex: 1,
          padding: "12px 16px",
          border: "1px solid #e0e0e0",
          borderRadius: "24px",
          fontSize: "14px",
          outline: "none",
          transition: "border-color 0.2s",
          backgroundColor: "#f0f2f5",
        }}
      />
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        style={{
          marginLeft: "12px",
          padding: "12px 20px",
          borderRadius: "24px",
          cursor: text.trim() ? "pointer" : "not-allowed",
          backgroundColor: text.trim() ? "#0084ff" : "#e0e0e0",
          color: "white",
          border: "none",
          fontWeight: "600",
          fontSize: "14px",
          transition: "background-color 0.2s",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;