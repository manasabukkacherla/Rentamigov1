// client/src/pages/MessageListPage.tsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Participant {
  _id: string;
  username?: string;
  name?: string; // Add name field for employees
}

interface Conversation {
  _id: string;
  roomId: string;
  lastMessage: string;
  participants: Participant[];
  createdAt: string;
  updatedAt: string;
  unreadCount?: number;
  lastMessageTime?: string;
  isOnline?: boolean;
  lastSeen?: string;
  avatar?: string;
}

const ConversationListPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const userId = sessionStorage.getItem("userId");

  const getOtherUser = (
    participants: Participant[],
    currentUserId: string
  ): Participant | undefined => {
    // Filter out null participants first
    const validParticipants = participants.filter((p) => p !== null);
    return validParticipants.find(
      (participant) => participant._id !== currentUserId
    );
  };

  // Function to get a display name for a participant
  const getDisplayName = (participant: Participant | undefined): string => {
    if (!participant) return "Unknown User";
    // First try username, then name (for employees), then fallback to ID
    return (
      participant.username ||
      participant.name ||
      `User ${participant._id.substring(0, 6)}`
    );
  };

  console.log(getOtherUser);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`/api/conversation?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.message || "Failed to fetch conversations.");
        } else {
          // Filter out null participants from each conversation
          const processedConversations = data.conversations.map(
            (conv: Conversation) => {
              return {
                ...conv,
                participants: conv.participants.filter(
                  (p: Participant | null) => p !== null
                ),
              };
            }
          );

          // Sort conversations by last message time
          const sortedConversations = processedConversations.sort(
            (a: Conversation, b: Conversation) => {
              return (
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
              );
            }
          );
          console.log("Fetched conversations:", sortedConversations);
          console.log("Current userId:", userId);
          setConversations(sortedConversations);
        }
      } catch (err) {
        setError("An error occurred during fetching conversations.");
      }
    };

    fetchConversations();
  }, []);

  const filteredConversations = conversations.filter((conv) => {
    // If there's only one participant, it's likely a self-conversation
    if (conv.participants.length <= 1) {
      return true; // Include self-conversations
    }

    const otherUser = getOtherUser(conv.participants, userId || "");
    console.log("Conversation:", conv._id, "Other user:", otherUser);

    // Use the getDisplayName function to safely get a display name
    const displayName = getDisplayName(otherUser);
    return displayName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  console.log("Filtered conversations:", filteredConversations);
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: "long" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div
      className="conversation-list-container"
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ margin: "0 0 16px 0", color: "#1a1a1a" }}>Messages</h2>
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            fontSize: "14px",
            outline: "none",
            transition: "border-color 0.2s",
          }}
        />
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {filteredConversations.map((conv) => {
          const otherUser = getOtherUser(conv.participants, userId || "");
          console.log(otherUser);
          const displayName = getDisplayName(otherUser);

          return (
            <Link
              key={conv._id}
              to={`/chat/${otherUser?._id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "56px",
                  height: "56px",
                }}
              >
                <img
                  src={
                    conv.avatar ||
                    `https://ui-avatars.com/api/?name=${displayName}&background=random`
                  }
                  alt={displayName}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                {conv.isOnline && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      right: "2px",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#4CAF50",
                      borderRadius: "50%",
                      border: "2px solid #ffffff",
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "4px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#1a1a1a",
                    }}
                  >
                    {displayName}
                  </h3>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#666666",
                    }}
                  >
                    {formatTime(conv.updatedAt)}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#666666",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "400px",
                    }}
                  >
                    {conv.lastMessage}
                  </p>
                  {conv.unreadCount && conv.unreadCount > 0 && (
                    <div
                      style={{
                        backgroundColor: "#0084ff",
                        color: "#ffffff",
                        borderRadius: "50%",
                        minWidth: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "0 6px",
                      }}
                    >
                      {conv.unreadCount}
                    </div>
                  )}
                </div>

                {conv.lastSeen && !conv.isOnline && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666666",
                      marginTop: "4px",
                    }}
                  >
                    Last seen {formatTime(conv.lastSeen)}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationListPage;
