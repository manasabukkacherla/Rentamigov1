// client/src/pages/ChatPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chat from "../Chat";

interface User {
  _id: string;
  username?: string;
  email?: string;
  name?: string;
  role?: string;
  phone?: string;
  status?: string;
}

const ChatPage: React.FC = () => {
  const { otherUserId } = useParams<{ otherUserId: string }>();
  const navigate = useNavigate();

  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [conversation, setConversation] = useState<any>(null);

  const currentUserId = sessionStorage.getItem("userId") || "";

  const getDisplayName = (user: User | null): string => {
    if (!user) return "Unknown User";
    return user.name || user.username || `User ${user._id.substring(0, 6)}`;
  };

  useEffect(() => {
    const fetchOtherUser = async () => {
      if (!otherUserId) return;

      try {
        setLoading(true);

        let response = await fetch(`/api/user/${otherUserId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        let data = await response.json();

        if (!response.ok || !data.user) {
          response = await fetch(`/api/employees/${otherUserId}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });

          data = await response.json();

          if (response.ok && data.data) {
            setOtherUser({
              _id: data.data._id,
              name: data.data.name,
              email: data.data.email,
              role: data.data.role,
              phone: data.data.phone,
              status: data.data.status,
            });
            return;
          }
        }

        if (!response.ok) {
          setError(data.message || "Failed to fetch user information");
        } else if (data.user) {
          setOtherUser(data.user);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("An error occurred while fetching user information");
      } finally {
        setLoading(false);
      }
    };

    fetchOtherUser();
  }, [otherUserId]);

  if (!otherUserId) {
    return <p>Error: No conversation selected.</p>;
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
        <button
          onClick={() => navigate("/messages")}
          style={{
            padding: "10px 16px",
            backgroundColor: "#0084ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Back to Messages
        </button>
      </div>
    );
  }

  const displayName = getDisplayName(otherUser);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            overflow: "hidden",
            marginRight: "16px",
          }}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${displayName}&background=random`}
            alt={displayName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          <h2
            style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "600" }}
          >
            {displayName}
          </h2>
          <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
            {otherUser?.email || ""}
          </p>
        </div>

        {conversation?.status === "resolved" ? (
          <span className="text-xs px-3 py-1 bg-yellow-200 rounded-full ml-auto">
            Resolved
          </span>
        ) : (
          <span className="text-xs px-3 py-1 bg-blue-200 rounded-full ml-auto">
            Active
          </span>
        )}
      </div>

      <Chat
        currentUserId={currentUserId}
        otherUserId={otherUserId}
        otherUsername={displayName}
        onConversationUpdate={(updatedConv) => setConversation(updatedConv)}
      />
    </div>
  );
};

export default ChatPage;
