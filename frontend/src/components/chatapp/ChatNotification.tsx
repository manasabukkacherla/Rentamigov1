// client/src/components/ChatNotification.tsx

import React from "react";

interface ChatNotificationProps {
  message: string;
}

const ChatNotification: React.FC<ChatNotificationProps> = ({ message }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#ffd700",
        padding: "10px 15px",
        borderRadius: "5px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <p style={{ margin: 0, fontWeight: "bold" }}>Notification</p>
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  );
};

export default ChatNotification;