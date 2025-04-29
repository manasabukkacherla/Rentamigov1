"use client";

import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Socket } from "socket.io-client";
import { SocketContext } from "../../socketContext";
import { MessageCircle, X } from "lucide-react";
import { Chatbot } from "../chatbott/components/Chatbot";
import { ChatNotification } from "../chatbott/types/chat";
import { ChatContext } from "../chatbott/App";

// Notification interface...
export interface NotificationType {
  resourceId?: string;
  message: string;
  read: boolean;
  createdAt: string; // Often you'll use string for dates, but Date can work too if you convert it.
}

// Define response types for "markAsRead" callback
interface MarkAsReadResponseSuccess {
  status: "success";
  notification: NotificationType;
}

interface MarkAsReadResponseError {
  status: "error";
  error: string;
}

type MarkAsReadResponse = MarkAsReadResponseSuccess | MarkAsReadResponseError;

const Headerr: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/Homepage");
  const navigate = useNavigate();
  // Access the socket instance from context
  const socket = useContext<Socket>(SocketContext);
  console.log("we reached here");
  // Local state to store notifications, typed as an array of NotificationType.
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // State to toggle the visibility of the notifications list.
  const [showList, setShowList] = useState<boolean>(false);

  useEffect(() => {
    // When the component mounts, request existing notifications.
    socket.emit("getNotifications");

    // Listen for the server to send the list of saved notifications.
    socket.on("loadNotifications", (data: NotificationType[]) => {
      setNotifications(data);
    });

    // Listen for new notifications emitted by the server.
    socket.on("newNotification", (data: NotificationType) => {
      console.log("Received new notification:", data);
      // Add the new notification to the beginning of the notifications array.
      setNotifications((prev) => [data, ...prev]);
    });

    // Clean up event listeners when the component unmounts.
    return () => {
      socket.off("loadNotifications");
      socket.off("newNotification");
    };
  }, [socket]);

  // Function to toggle the notification list's visibility.
  const toggleNotificationList = (): void => {
    setShowList(!showList);
  };

  // Function to mark a notification as read.
  const markNotificationAsRead = (notificationId: string) => {
    // Emit the "markAsRead" event with the notification ID and provide a callback.
    socket.emit(
      "markAsRead",
      notificationId,
      (response: MarkAsReadResponse) => {
        if (response.status === "success") {
          // Update the local state to reflect the read status.
          setNotifications((prev) =>
            prev.map((n) =>
              n.resourceId === notificationId ? response.notification : n
            )
          );
          console.log("Notification marked as read");
        } else {
          console.error("Failed to mark notification as read:", response.error);
        }
      }
    );
  };
  const [showChatbot, setShowChatbot] = useState(false);
  const { chatNotifications, setChatNotifications } = useContext(ChatContext);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    const activeAndPendingChats = chatNotifications.filter(
      (chat) => chat.status === "active" || chat.status === "pending"
    ).length;
    setTotalRequests(activeAndPendingChats);
  }, [chatNotifications]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // Set active link based on current path
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    setActiveLink(path);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleNewChatNotification = (notification: ChatNotification) => {
    setChatNotifications((prev) => {
      const existingIndex = prev.findIndex((n) => n.id === notification.id);
      if (existingIndex >= 0) {
        const newNotifications = [...prev];
        newNotifications[existingIndex] = notification;
        return newNotifications;
      }
      setCurrentChatId(notification.id);
      return [...prev, notification];
    });
  };

  const navLinks = [
    { name: "Home", path: "/Homepage" },
    { name: "Properties", path: "/allproperties" },
    { name: "For Owners", path: "/owner-page" },
    { name: "Blogs", path: "/Blogs" },
    { name: "About", path: "/Aboutus" },
    { name: "Contact", path: "/Contactus" },
    { name: "My Messages", path: "/messages" },
    { name: "Find Employee", path: "/findEmployee" },
    { name: "Report Bug", path: "/report-bug" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/Privacypolicy" },
    { name: "Terms & Conditions", path: "/Termsandconditions" },
    { name: "Tenancy Policy", path: "/Tenancypolicy" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-black py-3"
        }`}
      >
        <div className="container mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center min-h-[48px]">
            {/* Logo - Responsive */}
            <div
              className="flex items-center cursor-pointer flex-shrink-0"
              onClick={() => navigate("/Homepage")}
            >
              <img
                src="./images/rentamigologou.png"
                alt="Rentamigo Logo"
                className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 object-contain"
              />
              <span
                className={`text-base xs:text-lg sm:text-xl font-bold ml-1 ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Rentamigo
              </span>
            </div>

            {/* Desktop Navigation - Single line, no wrap */}
            <nav className="hidden xl:flex items-center w-auto whitespace-nowrap">
              <ul className="flex gap-x-1 md:gap-x-3 lg:gap-x-5 whitespace-nowrap">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className={`font-medium transition-colors relative no-underline px-1.5 py-1 lg:px-2 rounded-md text-xs sm:text-xs md:text-sm lg:text-base ${
                        activeLink === link.path
                          ? scrolled
                            ? "text-white bg-black"
                            : "text-black bg-white"
                          : scrolled
                          ? "text-gray-800 hover:bg-gray-100"
                          : "text-white hover:bg-gray-800"
                      }`}
                      onClick={() => setActiveLink(link.path)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Section: Notifications, Chat, Auth */}
            <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-4">
              {/* Chat Button - Always visible */}
              <button
                onClick={toggleChatbot}
                className={`p-2 rounded-full transition-colors relative focus:outline-none min-w-[40px] min-h-[40px] xs:min-w-[44px] xs:min-h-[44px] ${
                  scrolled
                    ? "text-black hover:bg-gray-100"
                    : "text-white hover:bg-gray-800"
                }`}
                aria-label="Open chat support"
              >
                <MessageCircle className="w-5 h-5 xs:w-6 xs:h-6 lg:w-6 lg:h-6" />
                {totalRequests > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 xs:w-5 xs:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {totalRequests}
                  </span>
                )}
              </button>

              {/* Notification Panel */}
              <div className="relative">
                <button
                  onClick={toggleNotificationList}
                  className="relative text-xl xs:text-2xl focus:outline-none text-gray-800 p-2 min-w-[40px] min-h-[40px] xs:min-w-[44px] xs:min-h-[44px]"
                  aria-label="Show notifications"
                >
                  🔔
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                {showList && (
                  <div className="absolute right-0 mt-2 w-screen xs:w-72 sm:w-80 max-h-[80vh] sm:max-h-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden transform -translate-x-1/2 sm:translate-x-0 left-1/2 sm:left-auto">
                    <div className="max-h-[80vh] sm:max-h-96 overflow-y-auto custom-scrollbar">
                      <div className="sticky top-0 px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <h3 className="text-base xs:text-lg font-semibold text-gray-800">
                          Notifications
                        </h3>
                      </div>
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No new notifications.
                        </div>
                      ) : (
                        notifications.map((n, index) => (
                          <div
                            key={index}
                            className={`px-4 py-3 border-b last:border-none ${
                              n.read ? "bg-white" : "bg-gray-100"
                            }`}
                          >
                            <p className="text-xs xs:text-sm text-gray-800">{n.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(n.createdAt).toLocaleString()}
                            </p>
                            {!n.read && (
                              <button
                                className="mt-2 inline-block text-xs text-white bg-blue-600 hover:bg-blue-700 transition-colors px-3 py-1 rounded-md"
                                onClick={() =>
                                  markNotificationAsRead(n.resourceId!)
                                }
                              >
                                Mark as Read
                              </button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Button - Desktop */}
              <div className="hidden xl:block">
                <Link
                  to="/Login"
                  className={`font-medium transition-colors no-underline px-2 py-2 lg:px-4 text-xs xs:text-xs lg:text-sm rounded-md ${
                    scrolled
                      ? "text-white bg-black hover:bg-gray-800"
                      : "text-black bg-white hover:bg-gray-200"
                  }`}
                >
                  Sign In
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="xl:hidden focus:outline-none p-2 min-w-[40px] min-h-[40px] xs:min-w-[44px] xs:min-h-[44px]"
                onClick={toggleMenu}
                aria-label="Open mobile menu"
              >
                {isMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                      scrolled ? "text-black" : "text-white"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                      scrolled ? "text-black" : "text-white"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Enhanced animation and spacing */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden bg-white shadow-lg absolute top-full left-0 w-full overflow-hidden z-50"
            >
              <div className="container mx-auto px-2 xs:px-4 py-2">
                <nav className="flex flex-col space-y-1 xs:space-y-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className={`font-medium py-2 px-3 xs:px-4 block transition-colors no-underline rounded-md text-xs xs:text-sm md:text-base ${
                        activeLink === link.path
                          ? "bg-black text-white"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setActiveLink(link.path);
                        setIsMenuOpen(false);
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <p className="text-xs xs:text-sm text-gray-500 mb-2 px-3 xs:px-4">Legal</p>
                    {legalLinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.path}
                        className="font-medium text-gray-800 hover:bg-gray-100 py-2 px-3 xs:px-4 block transition-colors no-underline rounded-md text-xs xs:text-xs md:text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <Link
                      to="/Login"
                      className="font-medium bg-black text-white hover:bg-gray-800 transition-colors no-underline py-2 px-3 xs:px-4 block rounded-md text-xs xs:text-xs md:text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Chatbot - Made fullscreen on mobile */}
      {showChatbot && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <h2 className="text-lg sm:text-xl font-semibold">Chat Support</h2>
              <button
                onClick={toggleChatbot}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Chatbot onNewChatNotification={handleNewChatNotification} currentChat={null} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Headerr;
function setCurrentChatId(id: string) {
  throw new Error("Function not implemented.");
}

