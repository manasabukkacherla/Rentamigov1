import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  Bell,
  Settings,
  Sun,
  Moon,
  UserPlus,
  X,
  LogOut,
  Waves as Wave,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoutAnimation from "./Logoutanimation";
import { Chatbot } from "@/components/chatbott/components/Chatbot";
import EmployeeDashboard from "@/components/chatbott/components/EmployeeDashboard";
import { ChatNotification } from "@/components/chatbott/types/chat";

interface SidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  darkMode,
  toggleDarkMode,
  activeTab,
  onTabChange,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [showLogoutAnimation, setShowLogoutAnimation] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatNotifications, setChatNotifications] = useState<
    ChatNotification[]
  >([]);
  const [totalRequests, setTotalRequests] = useState(0);

  // Update total requests whenever chat notifications change
  useEffect(() => {
    const activeAndPendingChats = chatNotifications.filter(
      (chat) => chat.status === "active" || chat.status === "pending"
    ).length;
    setTotalRequests(activeAndPendingChats);
  }, [chatNotifications]);

  const handleNewChatNotification = (notification: ChatNotification) => {
    setChatNotifications((prev) => {
      const existingIndex = prev.findIndex((n) => n.id === notification.id);
      if (existingIndex >= 0) {
        const newNotifications = [...prev];
        newNotifications[existingIndex] = notification;
        return newNotifications;
      }
      return [...prev, notification];
    });
  };

  const handleRespondToChat = (
    notification: ChatNotification,
    response: string
  ) => {
    const isResolved = response === "--- Chat marked as resolved ---";

    const updatedNotification = {
      ...notification,
      messages: [
        ...notification.messages,
        ...(isResolved
          ? []
          : [
              {
                id: Date.now().toString(),
                content: response,
                type: "employee" as const,
                timestamp: new Date(),
              },
            ]),
      ],
      status: isResolved ? ("resolved" as const) : ("active" as const),
    };

    setChatNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? updatedNotification : n))
    );
  };

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "properties", icon: Building2, label: "Properties" },
    { id: "leads", icon: UserPlus, label: "Leads" },
    { id: "users", icon: Users, label: "Users" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "messages", icon: MessageCircle, label: "My Messages" },
  ];

  const handleLogout = () => {
    onClose();
    setShowLogoutAnimation(true);
  };

  const completeLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  if (showLogoutAnimation) {
    return <LogoutAnimation onAnimationComplete={completeLogout} />;
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center z-30">
        <div className="flex-1 flex items-center justify-between px-4 max-w-[100vw]">
          <button
            onClick={() => onTabChange("menu")}
            className="p-2 -ml-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h1 className="text-xl font-bold text-black absolute left-1/2 transform -translate-x-1/2">
            PropManager
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200
        transition-transform duration-300 ease-in-out z-50
        w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
        lg:top-0 pt-0 lg:pt-0
      `}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Header */}
          <div>
            <div className="p-2">
              <h1 className="text-xl font-bold text-black">PropManager</h1>
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-y-4 px-2 mt-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${
                      isActive ? "bg-gray-100 text-black" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Chat Support */}
            <div className="px-3 py-2">
              <button
                onClick={toggleChatbot}
                className={`w-full flex items-center text-gray-600 hover:bg-gray-100 py-2 px-2 rounded-lg transition-colors ${
                  showChatbot ? "bg-gray-100 text-black" : ""
                }`}
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                <span>Chat Support</span>
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="px-3 py-2 border-t border-gray-200 mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Chat Support View */}
      {showChatbot && (
        <div className="fixed inset-0 z-50 bg-white overflow-hidden">
          <div className="relative h-full">
            <button
              onClick={toggleChatbot}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <EmployeeDashboard
              chatNotifications={chatNotifications}
              onRespondToChat={handleRespondToChat}
              totalRequests={totalRequests}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
