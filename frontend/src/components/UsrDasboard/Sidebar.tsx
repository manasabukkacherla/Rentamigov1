import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Home,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  CreditCard,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { NotificationDropdown } from "./NotificationDropdown";
import { Notification } from "./types";
import { LogoutAnimation } from "./LogoutAnimation";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/Userdashboard" }, // ✅ Fixed path
  { icon: Home, label: "Properties", path: "properties" }, // ✅ Fixed path
  { icon: Users, label: "Leads", path: "leads" }, // ✅ Fixed path
  { icon: Bell, label: "Notifications", path: "notifications" }, // ✅ Fixed path
  { icon: Bell, label: "My Messages", path: "/messages" }, // ✅ Fixed path
  { icon: Bell, label: "Chat", path: "/findEmployee" }, // ✅ Fixed path
  { icon: CreditCard, label: "Plans", path: "plans" },
  { icon: Settings, label: "Settings", path: "settings" }, // ✅ Fixed path
];

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Lead",
    message: "You have received a new lead for Luxury Villa with Pool",
    type: "success",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    title: "Payment Received",
    message: "Rent payment received for Modern City Apartment",
    type: "info",
    timestamp: "1 hour ago",
    read: true,
  },
];

interface SidebarProps {
  onNewNotification: (notification: Notification) => void;
}

export function Sidebar({ onNewNotification }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const menuButton = document.getElementById("menu-button");

      if (
        isMobileMenuOpen &&
        sidebar &&
        menuButton &&
        !sidebar.contains(event.target as Node) &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    setIsLoggingOut(true);

    // Clear session storage
    sessionStorage.clear();

    setTimeout(() => {
      navigate("/Login"); // Redirect to Login page
      window.location.reload(); // Force reload to clear all state
    }, 2000);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: "New Property Inquiry",
        message: "You have a new inquiry for Luxury Villa",
        type: "success",
        timestamp: "Just now",
        read: false,
      };
      onNewNotification(newNotification);
    }, 30000);

    return () => clearInterval(interval);
  }, [onNewNotification]);

  if (isLoggingOut) {
    return <LogoutAnimation />;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        id="menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-0 left-0 p-4 z-50"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-black" />
        ) : (
          <Menu className="w-5 h-5 text-black" />
        )}
      </button>

      {/* Sidebar */}
     <aside
  id="sidebar"
  className={`fixed top-0 left-0 h-full bg-white border-r border-black/10 z-40
    transform transition-transform duration-300 ease-in-out
    ${
      isMobileMenuOpen
        ? "translate-x-0"
        : "-translate-x-full lg:translate-x-0"
    }
    w-64 flex flex-col justify-between
  `}
>
  {/* Top Section: Nav */}
  <div>
    <nav className="mt-14 lg:mt-16 flex flex-col gap-y-2 px-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          location.pathname === item.path ||
          location.pathname === `/Userdashboard/${item.path}`;

        return (
          <NavLink
            key={item.path}
            to={
              item.path.startsWith("/")
                ? item.path
                : `/Userdashboard/${item.path}`
            }
            className={`flex items-center px-4 py-2 rounded-md text-black/70 hover:bg-black/5 transition-colors text-sm sm:text-base no-underline ${
              isActive
                ? "bg-black/5 border-r-4 border-black text-black font-semibold"
                : ""
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  </div>

  {/* Bottom Section: User Info + Logout */}
  <div className="border-t border-black/10">
    <div className="p-4 border-b border-black/10">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium">
          JD
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-black truncate">John Doe</p>
          <p className="text-xs text-black/60 truncate">john@example.com</p>
        </div>
      </div>
    </div>

    <button
      onClick={handleLogout}
      className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-black/5 transition-colors text-sm sm:text-base"
    >
      <LogOut className="w-5 h-5 mr-3" />
      <span>Logout</span>
    </button>
  </div>
</aside>


      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
