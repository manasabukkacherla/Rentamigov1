// client/src/components/MessageList.tsx

import React, { useEffect, useRef } from "react";

interface Message {
  senderId: string;
  text: string;
  createdAt?: string;
  read: boolean;
  isCurrentUser?: boolean; // Add this to distinguish between sender and receiver
}

interface MessageListProps {
  messages: Message[];
  onMarkMessagesAsRead: () => void;
  currentUserId: string; // Add this to identify current user's messages
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onMarkMessagesAsRead,
  currentUserId,
}) => {
  // Calculate the number of unread messages.
  const unreadCount = messages.filter((msg) => !msg.read).length;

  // Reference to the message container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format time for message timestamps
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      if (!message.createdAt) return;

      const date = new Date(message.createdAt);
      const dateString = date.toLocaleDateString([], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!groups[dateString]) {
        groups[dateString] = [];
      }

      groups[dateString].push(message);
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div
      className="message-list"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
      onClick={onMarkMessagesAsRead}
    >
      {Object.keys(messageGroups).length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "#666",
            fontSize: "14px",
          }}
        >
          No messages yet. Start the conversation!
        </div>
      ) : (
        Object.entries(messageGroups).map(([date, dateMessages]) => (
          <div key={date}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                {date}
              </div>
            </div>

            {dateMessages.map((msg, index) => {
              const isCurrentUser = msg.senderId === currentUserId;
const isBot = msg.senderId === "bot";

return (
  <div
    key={index}
    style={{
      display: "flex",
      justifyContent: isCurrentUser ? "flex-end" : "flex-start",
      marginBottom: "8px",
    }}
  >
    <div
      style={{
        maxWidth: "70%",
        padding: "12px 16px",
        borderRadius: isCurrentUser
          ? "18px 18px 4px 18px"
          : isBot
          ? "18px"
          : "18px 18px 18px 4px",
        backgroundColor: isCurrentUser
          ? "#0084ff"
          : isBot
          ? "#fff9c4" // light yellow
          : "#ffffff",
        color: isCurrentUser ? "#ffffff" : "#000000",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <div style={{ wordBreak: "break-word" }}>{msg.text}</div>
      {msg.createdAt && (
        <div
          style={{
            fontSize: "0.7rem",
            color: isCurrentUser
              ? "rgba(255, 255, 255, 0.7)"
              : "#999",
            marginTop: "4px",
            textAlign: "right",
          }}
        >
          {formatTime(msg.createdAt)}
        </div>
      )}
      {isCurrentUser && (
        <div
          style={{
            position: "absolute",
            bottom: "-16px",
            right: "4px",
            fontSize: "0.7rem",
            color: "#0084ff",
          }}
        >
          {msg.read ? "Read" : "Sent"}
        </div>
      )}
    </div>
  </div>
);

            })}
          </div>
        ))
      )}

      {/* Invisible element for auto-scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;