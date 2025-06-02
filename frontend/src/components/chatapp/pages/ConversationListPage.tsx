// client/src/pages/MessageListPage.tsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chat from "../Chat"; // Make sure this exists and is correctly imported

interface Participant {
  _id: string;
  username?: string;
  name?: string;
  email?: string;
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
  status?: string;
  lastResolvedAt?: string;
}

const StatusCard: React.FC<{ title: string; count: number; color: string }> = ({
  title,
  count,
  color,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        border: `2px solid ${color}`,
        color: "#1a1a1a",
        padding: "16px",
        borderRadius: "12px",
        flex: 1,
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>{count}</p>
    </div>
  );
};

const ConversationListPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const userId = sessionStorage.getItem("userId") || "";

  const getOtherUser = (participants: Participant[], currentUserId: string): Participant | undefined => {
    const validParticipants = participants.filter((p) => p !== null);
    return validParticipants.find((participant) => participant._id !== currentUserId);
  };

  const getDisplayName = (participant: Participant | undefined): string => {
    if (!participant) return "Unknown User";
    return (
      participant.username ||
      participant.name ||
      `User ${participant._id.substring(0, 6)}`
    );
  };

  const refreshCounts = (all: Conversation[]) => {
    return {
      total: all.length,
      pending: all.filter((conv) => {
        const latest = new Date(conv.updatedAt);
        const resolved = conv.lastResolvedAt ? new Date(conv.lastResolvedAt) : null;
        return !resolved || latest > resolved;
      }).length,
      active: all.filter((conv) => conv.status === "active").length,
    };
  };

  const [counts, setCounts] = useState({ total: 0, pending: 0, active: 0 });

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
          const processedConversations = data.conversations.map((conv: Conversation) => {
            return {
              ...conv,
              participants: conv.participants.filter((p: Participant | null) => p !== null),
            };
          });

          const sortedConversations = processedConversations.sort((a: { updatedAt: string | number | Date; }, b: { updatedAt: string | number | Date; }) => {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          });

          setConversations(sortedConversations);
          setCounts(refreshCounts(sortedConversations));
        }
      } catch (err) {
        setError("An error occurred during fetching conversations.");
      }
    };

    fetchConversations();
  }, [userId]);

  const filteredConversations = conversations.filter((conv) => {
    if (conv.participants.length <= 1) return true;
    const otherUser = getOtherUser(conv.participants, userId);
    const displayName = getDisplayName(otherUser);
    return displayName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: "long" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const latestMessageTime = selectedConversation?.updatedAt || new Date().toISOString();
  const isButtonEnabled = !selectedConversation?.lastResolvedAt ||
    new Date(latestMessageTime) > new Date(selectedConversation.lastResolvedAt);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatusCard title="Pending" count={counts.pending} color="#f59e0b" />
        <StatusCard title="Active" count={counts.active} color="#3b82f6" />
        <StatusCard title="Total" count={counts.total} color="#10b981" />
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg"
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-white rounded-lg shadow p-4 overflow-y-auto max-h-[80vh]">
          {filteredConversations.map((conv) => {
            const otherUser = getOtherUser(conv.participants, userId);
            const displayName = getDisplayName(otherUser);

            return (
              <div
                key={conv._id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-4 rounded-md shadow mb-2 cursor-pointer hover:bg-gray-100 ${selectedConversation?._id === conv._id ? "bg-gray-100" : "bg-white"}`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={conv.avatar || `https://ui-avatars.com/api/?name=${displayName}&background=random`}
                    alt={displayName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-sm truncate">{displayName}</h3>
                      <span className="text-xs text-gray-500">{formatTime(conv.updatedAt)}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                    {conv.lastSeen && !conv.isOnline && (
                      <p className="text-xs text-gray-400 mt-1">Last seen {formatTime(conv.lastSeen)}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-span-2 bg-white rounded-lg shadow p-4">
          {selectedConversation ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold">
                    {getDisplayName(getOtherUser(selectedConversation.participants, userId))}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {getOtherUser(selectedConversation.participants, userId)?.email || ""}
                  </p>
                </div>
                <span className="text-xs px-3 py-1 bg-yellow-200 rounded-full">
                  {selectedConversation.status === "resolved"
                    ? "Resolved"
                    : selectedConversation.lastMessage
                      ? "Active"
                      : "Pending"}
                </span>
              </div>

              <Chat
                currentUserId={userId}
                otherUserId={getOtherUser(selectedConversation.participants, userId)?._id || ""}
                otherUsername={getDisplayName(getOtherUser(selectedConversation.participants, userId))}
              />

              <button
                className={`mt-4 text-white px-4 py-2 rounded ${isButtonEnabled ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={!isButtonEnabled}
                onClick={async () => {
                  if (!selectedConversation || !isButtonEnabled) return;

                  try {
                    const response = await fetch(`/api/conversation/${selectedConversation._id}/status`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                      },
                      body: JSON.stringify({ status: "resolved", lastResolvedAt: new Date().toISOString() }),
                    });

                    if (response.ok) {
                      const updatedConv = {
                        ...selectedConversation,
                        status: "resolved",
                        lastResolvedAt: new Date().toISOString(),
                      };
                      setSelectedConversation(updatedConv);
                      const newList = conversations.map(c => (c._id === updatedConv._id ? updatedConv : c));
                      setConversations(newList);
                      setCounts(refreshCounts(newList));
                    } else {
                      console.error("Failed to update status");
                    }
                  } catch (error) {
                    console.error("Error updating status:", error);
                  }
                }}
              >
                Mark as Resolved
              </button>
            </>
          ) : (
            <p className="text-center text-gray-500">Select a conversation</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationListPage;
